"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Bot, Star } from "lucide-react"

export default function ELIApp() {
  // Chat state
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatMode, setChatMode] = useState("eli")

  // Daily Essentials state
  const [activeTab, setActiveTab] = useState("chat")
  const [completedEssentials, setCompletedEssentials] = useState<string[]>([])

  // Chat modes
  const chatModes = {
    eli: { name: "ELI Coach", icon: "💕", color: "from-pink-500 to-rose-600" },
    money: { name: "Money Coach", icon: "💰", color: "from-yellow-500 to-orange-600" },
    consciousness: { name: "Consciousness Coach", icon: "🧠", color: "from-purple-500 to-indigo-600" },
    spiritual: { name: "Spiritual Coach", icon: "✨", color: "from-blue-500 to-cyan-600" },
  }

  // Simple daily essentials
  const dailyEssentials = [
    { id: "intention", title: "Set Daily Intention", icon: "🌟" },
    { id: "gratitude", title: "Gratitude Practice", icon: "🙏" },
    { id: "affirmation", title: "Money Affirmation", icon: "💰" },
    { id: "meditation", title: "5-Minute Meditation", icon: "🧘‍♀️" },
    { id: "visualization", title: "Success Visualization", icon: "✨" },
    { id: "boundaries", title: "Set a Boundary", icon: "🛡️" },
    { id: "pleasure", title: "Pleasure Practice", icon: "💖" },
    { id: "movement", title: "Sacred Movement", icon: "💃" },
    { id: "nature", title: "Nature Connection", icon: "🌿" },
    { id: "reflection", title: "Evening Reflection", icon: "🌙" },
  ]

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  // Handle chat submission
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

  // Toggle completion
  const toggleEssential = (id: string) => {
    setCompletedEssentials((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const completionPercentage = Math.round((completedEssentials.length / dailyEssentials.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-3">
            ✨ ELI's Consciousness Evolution ✨
          </h1>
          <p className="text-lg text-white mb-4">Sacred AI Technology for Consciousness & Wealth Magnetism</p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-purple-900/30 border border-purple-500/30">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Bot className="h-4 w-4 mr-2" />
              Chat with Nalani AI
            </TabsTrigger>
            <TabsTrigger
              value="essentials"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Star className="h-4 w-4 mr-2" />
              Daily Essentials
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            {/* Chat Mode Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <Bot className="h-5 w-5" />
                  Nalani AI - {chatModes[chatMode as keyof typeof chatModes].name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat Messages */}
                <div className="space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto p-4 rounded-lg bg-black/20">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-purple-300 py-8">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-4">Ready to transform your life? Ask me anything!</p>
                    </div>
                  ) : (
                    chatHistory.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-lg ${
                          msg.role === "user"
                            ? "bg-purple-800/40 border border-purple-500/30 ml-4"
                            : "bg-pink-800/40 border border-pink-500/30 mr-4"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`text-sm font-bold ${msg.role === "user" ? "text-purple-300" : "text-pink-300"}`}
                          >
                            {msg.role === "user" ? "You" : "Nalani AI"}
                          </div>
                        </div>
                        <div className="text-white leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    ))
                  )}

                  {isLoading && (
                    <div className="p-4 rounded-lg bg-pink-800/40 border border-pink-500/30 mr-4 flex items-center gap-2">
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
                    placeholder="Ask about consciousness, wealth, spirituality, or self-love... (Press Enter to send)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[120px] bg-black/20 border-purple-500/30 focus:border-purple-400 text-white"
                    disabled={isLoading}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-purple-300">Press Enter to send • Shift+Enter for new line</span>
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
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Daily Essentials Tab */}
          <TabsContent value="essentials" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Star className="h-5 w-5" />
                    Daily Essentials
                  </div>
                  <div className="text-sm text-purple-300">
                    {completedEssentials.length}/{dailyEssentials.length} Completed ({completionPercentage}%)
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dailyEssentials.map((essential) => (
                    <div
                      key={essential.id}
                      className={`p-4 rounded-lg border ${
                        completedEssentials.includes(essential.id)
                          ? "bg-purple-700/30 border-purple-400/50"
                          : "bg-purple-900/30 border-purple-500/30"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-purple-200 flex items-center gap-2">
                            <span>{essential.icon}</span> {essential.title}
                          </h3>
                        </div>
                        <Button
                          size="sm"
                          variant={completedEssentials.includes(essential.id) ? "default" : "outline"}
                          className={
                            completedEssentials.includes(essential.id)
                              ? "bg-gradient-to-r from-purple-500 to-pink-600"
                              : "border-purple-500/50 text-purple-300"
                          }
                          onClick={() => toggleEssential(essential.id)}
                        >
                          {completedEssentials.includes(essential.id) ? "✓ Done" : "Complete"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
