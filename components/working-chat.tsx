"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Bot } from "lucide-react"

export default function WorkingChat() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    // Add user message to chat
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
          mode: "eli",
          conversationHistory: chatHistory,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      // Add AI response to chat
      setChatHistory((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (err: any) {
      console.error("Chat error:", err)
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-300">
          <Bot className="h-5 w-5" />
          Chat with ELI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <div className="space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto p-4 rounded-lg bg-black/20">
          {chatHistory.length === 0 ? (
            <div className="text-center text-purple-300 py-8">
              <Bot className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Ask ELI anything about consciousness, wealth, or spiritual growth...</p>
            </div>
          ) : (
            chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-purple-800/40 border border-purple-500/30 ml-8"
                    : "bg-pink-800/40 border border-pink-500/30 mr-8"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`text-xs font-bold ${msg.role === "user" ? "text-purple-300" : "text-pink-300"}`}>
                    {msg.role === "user" ? "You" : "ELI"}
                  </div>
                </div>
                <div className="text-white">{msg.content}</div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="p-3 rounded-lg bg-pink-800/40 border border-pink-500/30 mr-8 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-pink-300" />
              <span className="text-pink-200">ELI is responding...</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-900/40 border border-red-500/30 text-red-200">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Textarea
            placeholder="Ask about consciousness, wealth, or spiritual growth..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] bg-black/20 border-purple-500/30 focus:border-purple-400 text-white"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
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
  )
}
