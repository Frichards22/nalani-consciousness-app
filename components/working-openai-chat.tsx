"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Heart, Loader2, Bot, User, RefreshCw, DollarSign, Brain, Zap, AlertCircle } from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system" | "error"
  content: string
  timestamp: Date
  mode: "eli" | "general" | "money" | "consciousness"
}

export default function WorkingOpenAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatMode, setChatMode] = useState<"eli" | "general" | "money" | "consciousness">("eli")
  const [connectionStatus, setConnectionStatus] = useState<"untested" | "connected" | "error">("untested")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessages = {
      eli: "Hello gorgeous soul! 💕 I'm ELI, your spiritual wealth consciousness coach. What's alive in your heart today?",
      general: "Hi! I'm your AI assistant powered by OpenAI. I can help with any questions or conversations.",
      money: "Welcome to your money consciousness session! 💰 I'm here to transform your relationship with wealth.",
      consciousness: "🧠✨ Ready to explore consciousness? I'm here to guide your spiritual awakening.",
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

  // Test connection on mount
  useEffect(() => {
    testConnection()
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Test OpenAI connection
  const testConnection = async () => {
    try {
      console.log("Testing connection...")
      const response = await fetch("/api/test-connection", {
        method: "GET",
      })

      console.log("Test response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Test response data:", data)

      if (data.connected) {
        setConnectionStatus("connected")
        console.log("OpenAI connection successful")
      } else {
        throw new Error(data.error || "Connection failed")
      }
    } catch (error: any) {
      console.error("Connection test failed:", error)
      setConnectionStatus("error")
    }
  }

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
      console.log("Sending message to API...")
      const response = await fetch("/api/working-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage.trim(),
          mode: chatMode,
          conversationHistory: messages
            .filter((msg) => msg.role === "user" || msg.role === "assistant")
            .slice(-5)
            .map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
        }),
      })

      console.log("API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API response received:", data)

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
        mode: chatMode,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setConnectionStatus("connected")
    } catch (error: any) {
      console.error("Chat error:", error)
      setConnectionStatus("error")

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "error",
        content: `I'm having trouble connecting right now. Error: ${error.message}`,
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
        return <Bot className="h-4 w-4" />
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

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900/95 to-black/95 border-gray-700/30 shadow-2xl backdrop-blur-sm">
      <CardHeader className="p-4 border-b border-gray-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getModeIcon(chatMode)}
            <CardTitle className="text-white font-bold text-xl">
              {chatMode === "eli"
                ? "ELI Chat"
                : chatMode === "general"
                  ? "AI Assistant"
                  : chatMode === "money"
                    ? "Money Coach"
                    : "Consciousness Guide"}
            </CardTitle>
            <Badge
              className={`${
                connectionStatus === "connected"
                  ? "bg-green-600"
                  : connectionStatus === "error"
                    ? "bg-red-600"
                    : "bg-yellow-600"
              } text-white text-xs`}
            >
              {connectionStatus === "connected" ? "Connected" : connectionStatus === "error" ? "Error" : "Checking..."}
            </Badge>
          </div>
          <div className="flex gap-2">
            {connectionStatus === "error" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={testConnection}
                className="text-red-400 hover:text-white hover:bg-red-800/50"
              >
                <AlertCircle className="h-4 w-4 mr-1" /> Retry
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              <RefreshCw className="h-4 w-4" />
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

      <CardContent className="p-0 flex flex-col h-[600px]">
        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role !== "user" && (
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        message.role === "error" ? "bg-red-600" : `bg-gradient-to-r ${getModeColor(message.mode)}`
                      } flex items-center justify-center`}
                    >
                      {message.role === "error" ? (
                        <AlertCircle className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : message.role === "error"
                        ? "bg-red-900/50 text-white border border-red-700/30"
                        : "bg-gray-800/50 text-white border border-gray-700/30"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <Badge
                      className={`${
                        message.role === "error" ? "bg-red-600" : `bg-gradient-to-r ${getModeColor(message.mode)}`
                      } text-white text-xs`}
                    >
                      {message.role === "error" ? "ERROR" : message.mode.toUpperCase()}
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
              className="flex-1 bg-gray-800/50 border-gray-700/30 text-white placeholder-gray-400 focus:border-gray-600 resize-none min-h-[60px] max-h-[120px]"
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
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-400">Shift+Enter for new line • Enter to send</p>
            <p className="text-xs text-gray-400">
              {connectionStatus === "connected"
                ? "✓ OpenAI Connected"
                : connectionStatus === "error"
                  ? "⚠️ Connection Error"
                  : "⏳ Checking Connection..."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
