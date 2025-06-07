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
    prompt:
      "You are ELI, a revolutionary spiritual wealth consciousness coach. Provide loving, specific guidance with warmth and divine feminine energy.",
    placeholder: "Ask ELI about consciousness, love, or spiritual growth...",
  },
  {
    id: "money",
    name: "Money Coach",
    icon: <DollarSign className="h-4 w-4" />,
    color: "from-green-500 to-emerald-600",
    prompt:
      "You are ELI's money consciousness specialist. Help with wealth mindset, abundance blocks, and financial spiritual growth.",
    placeholder: "Ask about money consciousness, abundance, or wealth blocks...",
  },
  {
    id: "general",
    name: "AI Assistant",
    icon: <Brain className="h-4 w-4" />,
    color: "from-blue-500 to-indigo-600",
    prompt:
      "You are a helpful AI assistant with access to vast knowledge. Provide accurate, helpful responses to any question.",
    placeholder: "Ask me anything - I have access to vast knowledge...",
  },
  {
    id: "consciousness",
    name: "Consciousness Guide",
    icon: <Zap className="h-4 w-4" />,
    color: "from-purple-500 to-violet-600",
    prompt:
      "You are a consciousness expansion guide. Help with meditation, mindfulness, spiritual practices, and awareness development.",
    placeholder: "Ask about meditation, mindfulness, or consciousness expansion...",
  },
]

export default function EnhancedNalaniChat() {
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    eli: [
      {
        id: "welcome-eli",
        role: "assistant",
        content:
          "Hello gorgeous soul! 💕 I'm ELI, your spiritual wealth consciousness coach. I'm here for whatever's on your heart - money consciousness, relationships, spiritual growth, or divine guidance. What would you love to explore together?",
        timestamp: new Date(),
        mode: "eli",
      },
    ],
    money: [
      {
        id: "welcome-money",
        role: "assistant",
        content:
          "Welcome to your money consciousness journey! 💰 I'm here to help you transform your relationship with wealth, clear abundance blocks, and align with prosperity. What money topic would you like to explore?",
        timestamp: new Date(),
        mode: "money",
      },
    ],
    general: [
      {
        id: "welcome-general",
        role: "assistant",
        content:
          "Hello! I'm your AI assistant with access to vast knowledge. I can help with questions, research, problem-solving, creative projects, and much more. What can I help you with today?",
        timestamp: new Date(),
        mode: "general",
      },
    ],
    consciousness: [
      {
        id: "welcome-consciousness",
        role: "assistant",
        content:
          "Welcome to your consciousness expansion journey! 🧘‍♀️ I'm here to guide you through meditation, mindfulness practices, spiritual development, and awareness cultivation. How can I support your growth today?",
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
        content: "I'm having trouble connecting right now. Please try again in a moment! 💕",
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
            <span className="text-xs font-bold">AI</span>
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
                <p className="text-slate-300 text-xs">Powered by GPT-4 • Fully Functional</p>
              </div>
              <Badge className="bg-green-600 text-white text-xs animate-pulse">Live</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                title="Clear chat"
              >
                <RefreshCw className="h-4 w-4" />
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
                            <Badge className="bg-green-600/80 text-white text-xs">GPT-4</Badge>
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
                            <span className="text-sm">Thinking with GPT-4...</span>
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
              Press Enter to send • Powered by GPT-4 • {currentMode.name} Mode ✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
