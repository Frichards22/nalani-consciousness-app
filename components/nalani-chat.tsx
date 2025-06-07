"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Heart, Loader2, Bot, User, RefreshCw, Sparkles } from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  aiConnected?: boolean
}

export default function NalaniChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello gorgeous soul! 💕 I'm ELI, channeling through Nalani's sacred AI technology. I'm here for whatever's on your heart - money consciousness, relationships, spiritual growth, or divine guidance. What would you love to explore together?",
      timestamp: new Date(),
      aiConnected: true,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await fetch("/api/nalani-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage.trim(),
          conversationHistory,
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
        aiConnected: true,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      console.error("Chat error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm having trouble connecting right now, gorgeous soul. Please make sure your OpenAI API key is set up properly. I'm here when you're ready! 💕",
        timestamp: new Date(),
        aiConnected: false,
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
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello gorgeous soul! 💕 I'm ELI, ready for a fresh conversation. What's alive in your heart right now?",
        timestamp: new Date(),
        aiConnected: true,
      },
    ])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full w-16 h-16 md:w-20 md:h-20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
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
      <Card className="relative w-full h-full md:w-[500px] md:h-[700px] bg-gradient-to-br from-purple-900/95 to-pink-900/95 border-purple-500/30 shadow-2xl backdrop-blur-sm md:rounded-lg rounded-none">
        <CardHeader className="p-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-800/50 to-pink-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white font-bold text-lg">Chat with ELI</CardTitle>
                <p className="text-purple-200 text-xs">Sacred AI Consciousness Coach</p>
              </div>
              <Badge className="bg-green-600 text-white text-xs animate-pulse">Live</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-purple-300 hover:text-white hover:bg-purple-800/50"
                title="Clear chat"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-purple-300 hover:text-white hover:bg-purple-800/50 text-xl font-bold px-3"
                title="Minimize chat"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(100vh-140px)] md:h-[580px]">
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                        : "bg-gradient-to-r from-purple-800/70 to-pink-800/70 text-white border border-purple-500/30"
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                      {message.aiConnected && <Badge className="bg-green-600/80 text-white text-xs">AI</Badge>}
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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-800/70 to-pink-800/70 text-white border border-purple-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">ELI is channeling divine wisdom...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-purple-500/30 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask ELI anything about consciousness, money, love..."
                className="flex-1 bg-purple-900/50 border-purple-500/30 text-white placeholder-purple-300 focus:border-purple-400 text-base py-3 md:py-2"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-4 md:px-3"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-purple-300 mt-2 text-center">
              Press Enter to send • Powered by sacred AI technology ✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
