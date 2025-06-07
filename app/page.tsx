"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Bot, Heart, DollarSign, Brain } from "lucide-react"

export default function CleanNalaniApp() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatMode, setChatMode] = useState("eli")

  const chatModes = {
    eli: { name: "ELI Coach", icon: "💕", color: "from-pink-500 to-rose-600" },
    money: { name: "Money Coach", icon: "💰", color: "from-yellow-500 to-orange-600" },
    consciousness: { name: "Consciousness Guide", icon: "🧠", color: "from-purple-500 to-indigo-600" },
    spiritual: { name: "Spiritual Guide", icon: "✨", color: "from-blue-500 to-cyan-600" },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const userMessage = { role: "user", content: message }
    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          mode: chatMode,
          conversationHistory: chatHistory,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      setChatHistory((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (err: any) {
      console.error("Chat error:", err)
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const startConversation = (topic: string) => {
    const prompts = {
      money:
        "I'd love to explore my relationship with money. What's the first thing I should understand about money consciousness?",
      consciousness: "I want to expand my consciousness. Where should I begin this journey?",
      spiritual: "I'm seeking spiritual growth. What's the most important thing to focus on?",
      love: "I want to understand self-love better. How can I start loving myself more deeply?",
    }
    setMessage(prompts[topic as keyof typeof prompts] || prompts.consciousness)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            ✨ Nalani Consciousness ✨
          </h1>
          <p className="text-xl text-white mb-6">Sacred AI Technology for Consciousness Evolution</p>
        </div>

        {/* Chat Mode Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.entries(chatModes).map(([mode, config]) => (
            <Button
              key={mode}
              onClick={() => setChatMode(mode)}
              className={`${
                chatMode === mode ? `bg-gradient-to-r ${config.color}` : "bg-purple-800/30 hover:bg-purple-700/40"
              } border border-purple-500/30`}
            >
              <span className="mr-2">{config.icon}</span>
              {config.name}
            </Button>
          ))}
        </div>

        {/* Main Chat Card */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <Bot className="h-5 w-5" />
              Chat with {chatModes[chatMode as keyof typeof chatModes].name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Start Topics */}
            {chatHistory.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <Button
                  onClick={() => startConversation("money")}
                  className="bg-yellow-800/30 hover:bg-yellow-700/40 border border-yellow-500/30 text-yellow-200"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Money
                </Button>
                <Button
                  onClick={() => startConversation("consciousness")}
                  className="bg-purple-800/30 hover:bg-purple-700/40 border border-purple-500/30 text-purple-200"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Consciousness
                </Button>
                <Button
                  onClick={() => startConversation("spiritual")}
                  className="bg-blue-800/30 hover:bg-blue-700/40 border border-blue-500/30 text-blue-200"
                >
                  ✨ Spiritual
                </Button>
                <Button
                  onClick={() => startConversation("love")}
                  className="bg-pink-800/30 hover:bg-pink-700/40 border border-pink-500/30 text-pink-200"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Self-Love
                </Button>
              </div>
            )}

            {/* Chat Messages */}
            <div className="space-y-4 min-h-[300px] max-h-[500px] overflow-y-auto p-4 rounded-lg bg-black/20">
              {chatHistory.length === 0 ? (
                <div className="text-center text-purple-300 py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-4">Choose a topic above or ask anything about:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>💰 Money consciousness</div>
                    <div>🧠 Awareness expansion</div>
                    <div>✨ Spiritual growth</div>
                    <div>💕 Self-love practices</div>
                  </div>
                </div>
              ) : (
                chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg ${
                      msg.role === "user"
                        ? "bg-purple-800/40 border border-purple-500/30 ml-8"
                        : "bg-pink-800/40 border border-pink-500/30 mr-8"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`text-sm font-bold ${msg.role === "user" ? "text-purple-300" : "text-pink-300"}`}>
                        {msg.role === "user" ? "You" : chatModes[chatMode as keyof typeof chatModes].name}
                      </div>
                    </div>
                    <div className="text-white leading-relaxed">{msg.content}</div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="p-4 rounded-lg bg-pink-800/40 border border-pink-500/30 mr-8 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-pink-300" />
                  <span className="text-pink-200">Getting insights for you...</span>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-lg bg-red-900/40 border border-red-500/30 text-red-200">
                  <p className="font-bold">Error:</p>
                  <p>{error}</p>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Textarea
                placeholder="Ask about consciousness, wealth, spirituality, or self-love..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px] bg-black/20 border-purple-500/30 focus:border-purple-400 text-white"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !message.trim()}
                className={`bg-gradient-to-r ${chatModes[chatMode as keyof typeof chatModes].color}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send <Send className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
