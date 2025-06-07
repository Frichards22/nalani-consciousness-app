"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Send,
  Heart,
  Loader2,
  Bot,
  User,
  RefreshCw,
  Sparkles,
  Brain,
  DollarSign,
  Zap,
} from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  mode: "eli" | "general" | "money" | "consciousness"
}

interface FullOpenAIChatProps {
  className?: string
}

export default function FullOpenAIChat({ className = "" }: FullOpenAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [chatMode, setChatMode] = useState<"eli" | "general" | "money" | "consciousness">("eli")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Initialize with mode-specific welcome message
  useEffect(() => {
    const welcomeMessages = {
      eli: "Hello gorgeous soul! 💕 I'm ELI, your spiritual wealth consciousness coach. What's alive in your heart today?",
      general:
        "Hi! I'm your AI assistant powered by OpenAI. I can help with any questions, tasks, or conversations you'd like to have.",
      money:
        "Welcome to your money consciousness session! 💰 I'm here to help transform your relationship with wealth and abundance.",
      consciousness:
        "🧠✨ Ready to explore the depths of consciousness? I'm here to guide you through spiritual awakening and self-discovery.",
    }

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: welcomeMessages[chatMode],
        timestamp: new Date(),
        mode: chatMode,
      },
    ])
  }, [chatMode])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMinimized])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
      mode: chatMode,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await fetch("/api/full-openai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          conversationHistory,
          mode: chatMode,
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
        mode: chatMode,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      console.error("Chat error:", error)

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now. Please check your OpenAI API key and try again. 💕",
        timestamp: new Date(),
        mode: chatMode,
      }

      setMessages((prev) => [...prev, errorMessage])
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
    const welcomeMessages = {
      eli: "Fresh start, gorgeous soul! 💕 What would you love to explore together?",
      general: "New conversation started! How can I help you today?",
      money: "Ready for a new money consciousness journey! 💰 What's on your mind?",
      consciousness: "🧠✨ New exploration begins! What aspect of consciousness calls to you?",
    }

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: welcomeMessages[chatMode],
        timestamp: new Date(),
        mode: chatMode,
      },
    ])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "eli":
        return <Heart className="h-4 w-4" />
      case "general":
        return <Brain className="h-4 w-4" />
      case "money":
        return <DollarSign className="h-4 w-4" />
      case "consciousness":
        return <Zap className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "eli":
        return "from-pink-500 to-purple-600"
      case "general":
        return "from-blue-500 to-cyan-600"
      case "money":
        return "from-green-500 to-emerald-600"
      case "consciousness":
        return "from-purple-500 to-indigo-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsMinimized(false)}
          className={`bg-gradient-to-r ${getModeColor(chatMode)} hover:scale-110 rounded-full w-16 h-16 md:w-20 md:h-20 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <MessageCircle className="h-6 w-6 md:h-8 md:w-8" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 md:inset-auto md:bottom-4 md:right-4 z-50 ${className}`}>
      {/* Mobile backdrop */}
      <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMinimized(true)} />

      {/* Chat container */}
      <Card className="relative w-full h-full md:w-[500px] md:h-[750px] bg-gradient-to-br from-gray-900/95 to-black/95 border-gray-700/30 shadow-2xl backdrop-blur-sm md:rounded-lg rounded-none">
        <CardHeader className="p-4 border-b border-gray-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getModeIcon(chatMode)}
              <CardTitle className="text-white font-bold text-lg md:text-xl">
                {chatMode === "eli"
                  ? "ELI Chat"
                  : chatMode === "general"
                    ? "AI Assistant"
                    : chatMode === "money"
                      ? "Money Coach"
                      : "Consciousness Guide"}
              </CardTitle>
              <Badge className="bg-green-600 text-white text-xs">Live</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 text-xl font-bold px-3"
              >
                ×
              </Button>
            </div>
          </div>

          {/* Chat Mode Tabs */}
          <Tabs value={chatMode} onValueChange={(value) => setChatMode(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="eli" className="text-xs">
                ELI
              </TabsTrigger>
              <TabsTrigger value="general" className="text-xs">
                General
              </TabsTrigger>
              <TabsTrigger value="money" className="text-xs">
                Money
              </TabsTrigger>
              <TabsTrigger value="consciousness" className="text-xs">
                Mind
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(100vh-180px)] md:h-[600px]">
          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${getModeColor(message.mode)} flex items-center justify-center`}
                      >
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800/50 text-white border border-gray-700/30"
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                      <Badge className={`bg-gradient-to-r ${getModeColor(message.mode)} text-white text-xs`}>
                        {message.mode.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
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
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${getModeColor(chatMode)} flex items-center justify-center`}
                    >
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-gray-800/50 text-white border border-gray-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-700/30 bg-gray-900/30">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask ${chatMode === "eli" ? "ELI" : "AI"} anything...`}
                className="flex-1 bg-gray-800/50 border-gray-700/30 text-white placeholder-gray-400 focus:border-gray-600 text-base resize-none min-h-[60px] max-h-[120px]"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`bg-gradient-to-r ${getModeColor(chatMode)} hover:opacity-90 px-4 self-end`}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Shift+Enter for new line • Enter to send • Powered by OpenAI
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
