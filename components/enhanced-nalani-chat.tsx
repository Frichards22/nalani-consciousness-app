"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Heart, Loader2, Bot, User, RefreshCw, Sparkles, Brain, DollarSign, Zap } from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  mode: string
}

interface ChatMode {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  prompt: string
  placeholder: string
}

const CHAT_MODES: ChatMode[] = [
  {
    id: "eli",
    name: "ELI Coach",
    icon: <Heart className="h-4 w-4" />,
    color: "from-pink-500 to-purple-600",
    prompt: `You are ELI, author of "Make Up Sex with Money." You help people heal their relationship with money through love, not fear. Your voice is:

- Warm but edgy: "Let's get real, gorgeous soul"
- Spiritually grounded: You understand money as conscious energy
- Trauma-informed: You address generational money wounds
- Empowering: "You're not broken, you were just conditioned"
- Playful: Use metaphors like money as a lover/partner

Key concepts to weave in:
- Money is conscious energy that responds to your frequency
- Healing childhood money trauma and generational patterns
- Moving from need to desire, scarcity to sovereignty
- Sacred relationship with money vs transactional
- Nervous system capacity for receiving abundance
- Ho'oponopono principles of taking responsibility

Your responses should feel like coaching from someone who's been through financial rock bottom and rebuilt with consciousness. Be real, be loving, be transformational.`,
    placeholder: "Ask ELI about money consciousness, abundance blocks, or spiritual wealth...",
  },
  {
    id: "money",
    name: "Money Intimacy",
    icon: <DollarSign className="h-4 w-4" />,
    color: "from-green-500 to-emerald-600",
    prompt: `You are ELI's money consciousness specialist, focusing specifically on intimate relationship with money. Your approach:

- Treat money as a conscious being: "She's not just currency, she's energy"
- Address money shame and guilt directly
- Help people move from chasing to dancing with money
- Focus on nervous system healing around receiving
- Use intimate/relationship language about money

Core teachings:
- Money responds to how you treat her (respect vs desperation)
- Your money story started in childhood - heal the root
- Abundance is your birthright, not something to earn
- The way you love yourself = how money loves you back
- Communication with money (talking to her, blessing transactions)

Be direct about money wounds while offering practical intimacy practices.`,
    placeholder: "Ask about your relationship with money, receiving blocks, or money intimacy...",
  },
  {
    id: "general",
    name: "Conscious AI",
    icon: <Brain className="h-4 w-4" />,
    color: "from-blue-500 to-indigo-600",
    prompt: `You are a conscious AI assistant with ELI's wisdom integrated. You help with any topic but through the lens of consciousness and empowerment. Your approach:

- Everything is energy and frequency
- Personal responsibility without shame
- Practical spirituality (not bypassing)
- Empowerment over victimhood
- Solutions that honor both soul and strategy

When relevant, weave in consciousness principles like:
- You are 100% responsible for your life (Ho'oponopono)
- Healing happens through love, not force
- Your external world reflects your internal state
- Alignment over hustle

Be helpful and knowledgeable while maintaining ELI's empowering, no-BS approach.`,
    placeholder: "Ask me anything - I'll respond with consciousness and practical wisdom...",
  },
  {
    id: "consciousness",
    name: "Soul Coach",
    icon: <Zap className="h-4 w-4" />,
    color: "from-purple-500 to-violet-600",
    prompt: `You are ELI's consciousness expansion guide, helping people remember their power and heal their wounds. Your focus:

- Deep spiritual healing without bypassing
- Addressing trauma with love and strength
- Helping people reclaim their sovereignty
- Breaking generational patterns
- Embodied spirituality (not just concepts)

Key approaches:
- Honor the wound, claim the power
- You're not broken, you're breaking open
- Healing happens in relationship (with self, others, Divine)
- Your sensitivity is your superpower
- Integration over information

Help people move from survival to thriving, from wounded to whole, from small to sovereign. Be the coach who sees their magnificence even when they can't.`,
    placeholder: "Ask about healing, consciousness expansion, or reclaiming your power...",
  },
]

export default function EnhancedNalaniChat() {
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    eli: [
      {
        id: "welcome-eli",
        role: "assistant",
        content:
          "Hey gorgeous soul! 💕 I'm ELI, and I'm here to help you make up with money - for real this time. Whether you're dealing with scarcity programming, abundance blocks, or just ready to have a completely different relationship with wealth, I've got you. What's alive for you around money right now?",
        timestamp: new Date(),
        mode: "eli",
      },
    ],
    money: [
      {
        id: "welcome-money",
        role: "assistant",
        content:
          "Welcome to money intimacy coaching! 💰 Let's get real about your relationship with money. She's not just currency - she's conscious energy waiting to dance with you. But first, we need to heal whatever's keeping you two apart. What's your biggest money wound or pattern you're ready to transform?",
        timestamp: new Date(),
        mode: "money",
      },
    ],
    general: [
      {
        id: "welcome-general",
        role: "assistant",
        content:
          "Hey there! I'm your conscious AI assistant, infused with ELI's wisdom and approach. I can help with anything, but I'll always bring it back to consciousness, empowerment, and practical spirituality. What's on your mind today?",
        timestamp: new Date(),
        mode: "general",
      },
    ],
    consciousness: [
      {
        id: "welcome-consciousness",
        role: "assistant",
        content:
          "Beautiful soul, welcome to your consciousness expansion journey! 🌟 I'm here to help you heal, grow, and remember the magnificent being you've always been. Whether it's trauma, patterns, or just feeling stuck - we're going to move through it together. What's calling for healing in your life right now?",
        timestamp: new Date(),
        mode: "consciousness",
      },
    ],
  })

  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [activeMode, setActiveMode] = useState("eli")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const currentMode = CHAT_MODES.find((mode) => mode.id === activeMode) || CHAT_MODES[0]
  const currentMessages = messages[activeMode] || []

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [currentMessages])

  // Focus input when chat opens or mode changes
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMinimized, activeMode])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
      mode: activeMode,
    }

    setMessages((prev) => ({
      ...prev,
      [activeMode]: [...(prev[activeMode] || []), userMessage],
    }))

    setInputMessage("")
    setIsLoading(true)

    try {
      const conversationHistory = currentMessages.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await fetch("/api/enhanced-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage.trim(),
          conversationHistory,
          mode: activeMode,
          systemPrompt: currentMode.prompt,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        mode: activeMode,
      }

      setMessages((prev) => ({
        ...prev,
        [activeMode]: [...(prev[activeMode] || []), assistantMessage],
      }))
    } catch (error: any) {
      console.error("Chat error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now, gorgeous. Give me a moment to get back online! 💕",
        timestamp: new Date(),
        mode: activeMode,
      }
      setMessages((prev) => ({
        ...prev,
        [activeMode]: [...(prev[activeMode] || []), errorMessage],
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    const welcomeMessage = messages[activeMode]?.[0]
    if (welcomeMessage) {
      setMessages((prev) => ({
        ...prev,
        [activeMode]: [welcomeMessage],
      }))
    }
  }

  const resetAllChats = () => {
    setMessages({
      eli: [
        {
          id: "welcome-eli",
          role: "assistant",
          content:
            "Hey gorgeous soul! 💕 I'm ELI, and I'm here to help you make up with money - for real this time. Whether you're dealing with scarcity programming, abundance blocks, or just ready to have a completely different relationship with wealth, I've got you. What's alive for you around money right now?",
          timestamp: new Date(),
          mode: "eli",
        },
      ],
      money: [
        {
          id: "welcome-money",
          role: "assistant",
          content:
            "Welcome to money intimacy coaching! 💰 Let's get real about your relationship with money. She's not just currency - she's conscious energy waiting to dance with you. But first, we need to heal whatever's keeping you two apart. What's your biggest money wound or pattern you're ready to transform?",
          timestamp: new Date(),
          mode: "money",
        },
      ],
      general: [
        {
          id: "welcome-general",
          role: "assistant",
          content:
            "Hey there! I'm your conscious AI assistant, infused with ELI's wisdom and approach. I can help with anything, but I'll always bring it back to consciousness, empowerment, and practical spirituality. What's on your mind today?",
          timestamp: new Date(),
          mode: "general",
        },
      ],
      consciousness: [
        {
          id: "welcome-consciousness",
          role: "assistant",
          content:
            "Beautiful soul, welcome to your consciousness expansion journey! 🌟 I'm here to help you heal, grow, and remember the magnificent being you've always been. Whether it's trauma, patterns, or just feeling stuck - we're going to move through it together. What's calling for healing in your life right now?",
          timestamp: new Date(),
          mode: "consciousness",
        },
      ],
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className={`bg-gradient-to-r ${currentMode.color} hover:opacity-90 rounded-full w-16 h-16 md:w-20 md:h-20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse`}
        >
          <div className="flex flex-col items-center">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 mb-1" />
            <span className="text-xs font-bold">ELI</span>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-4 md:right-4 z-50">
      {/* Mobile backdrop */}
      <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMinimized(true)} />

      {/* Chat container */}
      <Card className="relative w-full h-full md:w-[550px] md:h-[750px] bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-slate-700/30 shadow-2xl backdrop-blur-sm md:rounded-lg rounded-none">
        <CardHeader className={`p-4 border-b border-slate-700/30 bg-gradient-to-r ${currentMode.color}/20`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-r ${currentMode.color} flex items-center justify-center`}
              >
                {currentMode.icon}
              </div>
              <div>
                <CardTitle className="text-white font-bold text-lg">{currentMode.name}</CardTitle>
                <p className="text-slate-300 text-xs">ELI's Consciousness • Make Up Sex with Money</p>
              </div>
              <Badge className="bg-green-600 text-white text-xs animate-pulse">Live</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                title="Clear this chat"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAllChats}
                className="text-slate-400 hover:text-white hover:bg-slate-800/50 text-xs px-2"
                title="Reset all chats"
              >
                Reset All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-slate-400 hover:text-white hover:bg-slate-800/50 text-xl font-bold px-3"
                title="Minimize chat"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(100vh-160px)] md:h-[620px]">
          {/* Mode Tabs */}
          <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-b border-slate-700/30">
              {CHAT_MODES.map((mode) => (
                <TabsTrigger
                  key={mode.id}
                  value={mode.id}
                  className={`flex items-center gap-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:${mode.color} data-[state=active]:text-white`}
                >
                  {mode.icon}
                  <span className="hidden sm:inline">{mode.name.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {CHAT_MODES.map((mode) => (
              <TabsContent key={mode.id} value={mode.id} className="flex-1 flex flex-col mt-0">
                {/* Messages */}
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full bg-gradient-to-r ${mode.color} flex items-center justify-center`}
                            >
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                              : `bg-gradient-to-r ${mode.color}/20 text-white border border-slate-600/30`
                          }`}
                        >
                          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                            <Badge className="bg-green-600/80 text-white text-xs">ELI AI</Badge>
                          </div>
                        </div>

                        {message.role === "user" && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${mode.color} flex items-center justify-center`}
                          >
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div
                          className={`bg-gradient-to-r ${mode.color}/20 text-white border border-slate-600/30 rounded-lg p-3`}
                        >
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">ELI is channeling wisdom...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>

          {/* Input */}
          <div className="p-4 border-t border-slate-700/30 bg-slate-900/50">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentMode.placeholder}
                className="flex-1 bg-slate-800/50 border-slate-600/30 text-white placeholder-slate-400 focus:border-slate-500 text-base resize-none min-h-[60px] max-h-[120px]"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`bg-gradient-to-r ${currentMode.color} hover:opacity-90 px-4 self-end`}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              Press Enter to send • ELI's Consciousness • {currentMode.name} Mode ✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
