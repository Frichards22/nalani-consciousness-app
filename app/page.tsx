"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Send, Bot, Heart, DollarSign, Brain, Star, Sparkles } from "lucide-react"

export default function ELIApp() {
  // Chat state
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatMode, setChatMode] = useState("eli")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Daily Essentials state
  const [activeTab, setActiveTab] = useState("chat")
  const [completedEssentials, setCompletedEssentials] = useState<string[]>([])
  const [selectedEssentials, setSelectedEssentials] = useState<Record<string, string>>({})

  // Chat modes configuration with ELI's voice
  const chatModes = {
    eli: {
      name: "ELI Coach",
      icon: "💕",
      color: "from-pink-500 to-rose-600",
      description: "The OG money goddess herself - raw, real, and revolutionary",
    },
    money: {
      name: "Money Coach",
      icon: "💰",
      color: "from-yellow-500 to-orange-600",
      description: "Practical wealth building with zero BS and maximum magnetism",
    },
    consciousness: {
      name: "Consciousness Coach",
      icon: "🧠",
      color: "from-purple-500 to-indigo-600",
      description: "Deep spiritual insights that'll blow your mind and expand your reality",
    },
    spiritual: {
      name: "Spiritual Coach",
      icon: "✨",
      color: "from-blue-500 to-cyan-600",
      description: "Divine connection with humor, edge, and infinite wisdom",
    },
  }

  // Daily Essentials with dropdown options
  const dailyEssentials = [
    {
      id: "intention",
      title: "Set Daily Intention",
      icon: "🌟",
      description: "Set your intention for the day",
      options: [
        "Today I choose to receive abundance effortlessly",
        "I am magnetic to opportunities that align with my highest good",
        "I trust my intuition and act from my power",
        "I am worthy of all the love and wealth flowing to me",
        "I release what no longer serves and welcome what does",
        "I am the CEO of my own life and I make empowered choices",
        "I attract wealth by being authentically me",
        "I am open to receiving in ways I never imagined",
      ],
    },
    {
      id: "gratitude",
      title: "Gratitude Practice",
      icon: "🙏",
      description: "What are you grateful for today?",
      options: [
        "My body and all it does for me",
        "The money that flows to me easily",
        "My intuition and inner wisdom",
        "The people who love and support me",
        "My ability to create and manifest",
        "The abundance that surrounds me",
        "My courage to be authentically me",
        "The lessons that help me grow",
      ],
    },
    {
      id: "affirmation",
      title: "Money Affirmation",
      icon: "💰",
      description: "Repeat your wealth affirmation",
      options: [
        "Money loves me and I love money back",
        "I am a money magnet and wealth flows to me",
        "I deserve to be wealthy and I receive it now",
        "Money is my friend and we have a beautiful relationship",
        "I am worthy of abundance in all forms",
        "Wealth is my birthright and I claim it",
        "I attract money by being my authentic self",
        "Money comes to me from expected and unexpected sources",
      ],
    },
    {
      id: "meditation",
      title: "5-Minute Meditation",
      icon: "🧘‍♀️",
      description: "Brief consciousness meditation",
      options: [
        "Breathe into your heart space and feel love",
        "Connect with your inner wisdom and guidance",
        "Visualize golden light filling your entire being",
        "Feel gratitude for your body and breath",
        "Send love to every cell in your body",
        "Connect with the abundance of the universe",
        "Feel your connection to all that is",
        "Breathe in peace, breathe out anything that doesn't serve",
      ],
    },
    {
      id: "visualization",
      title: "Success Visualization",
      icon: "✨",
      description: "Visualize your desired outcome",
      options: [
        "See yourself living your dream life with ease",
        "Visualize money flowing to you effortlessly",
        "Imagine yourself confident and radiant",
        "See yourself making empowered decisions",
        "Visualize your ideal relationship with money",
        "Imagine yourself helping others from your abundance",
        "See yourself celebrating your success",
        "Visualize your future self thanking present you",
      ],
    },
    {
      id: "boundaries",
      title: "Set a Boundary",
      icon: "🛡️",
      description: "Practice saying no to something",
      options: [
        "Say no to something that drains your energy",
        "Set a boundary around your time",
        "Say no to people-pleasing behavior",
        "Set a financial boundary",
        "Say no to negative self-talk",
        "Set a boundary around your emotional energy",
        "Say no to activities that don't align with your values",
        "Set a boundary around your personal space",
      ],
    },
    {
      id: "pleasure",
      title: "Pleasure Practice",
      icon: "💖",
      description: "Do something purely for joy",
      options: [
        "Take a luxurious bath or shower",
        "Eat something delicious mindfully",
        "Dance to your favorite song",
        "Spend time in nature",
        "Call someone who makes you laugh",
        "Do something creative just for fun",
        "Wear something that makes you feel amazing",
        "Give yourself a compliment",
      ],
    },
    {
      id: "movement",
      title: "Sacred Movement",
      icon: "💃",
      description: "Move your body with intention",
      options: [
        "Dance like nobody's watching",
        "Do gentle stretches with gratitude",
        "Take a walk in nature",
        "Do yoga or tai chi",
        "Shake out any stuck energy",
        "Move in a way that feels good",
        "Exercise with joy, not punishment",
        "Breathe deeply while moving",
      ],
    },
    {
      id: "nature",
      title: "Nature Connection",
      icon: "🌿",
      description: "Spend time connecting with nature",
      options: [
        "Sit outside and breathe fresh air",
        "Touch a tree and feel its energy",
        "Watch the sky and clouds",
        "Listen to birds or nature sounds",
        "Feel the sun on your skin",
        "Walk barefoot on the earth",
        "Water plants with love",
        "Watch the sunrise or sunset",
      ],
    },
    {
      id: "reflection",
      title: "Evening Reflection",
      icon: "🌙",
      description: "Reflect on your day's growth",
      options: [
        "What did I learn about myself today?",
        "How did I show up powerfully today?",
        "What am I most proud of today?",
        "How did I practice self-love today?",
        "What abundance did I notice today?",
        "How did I trust my intuition today?",
        "What boundary did I honor today?",
        "How did I grow today?",
      ],
    },
  ]

  // Handle Enter key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

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

  // Start conversation with predefined topics
  const startConversation = (topic: string) => {
    const prompts = {
      money: "I want to transform my relationship with money. Where do I start?",
      consciousness: "I'm ready to expand my consciousness. What's the first step?",
      spiritual: "I want to connect with my spiritual power. How do I begin?",
      love: "I want to love myself more deeply. What would you tell me?",
    }
    setMessage(prompts[topic as keyof typeof prompts] || prompts.consciousness)
  }

  // Toggle completion of daily essentials
  const toggleEssential = (id: string) => {
    setCompletedEssentials((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Calculate completion percentage
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(chatModes).map(([mode, config]) => (
                <Button
                  key={mode}
                  onClick={() => setChatMode(mode)}
                  className={`${
                    chatMode === mode ? `bg-gradient-to-r ${config.color}` : "bg-purple-800/30 hover:bg-purple-700/40"
                  } border border-purple-500/30 h-auto p-3 flex flex-col items-start text-left`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{config.icon}</span>
                    <span className="font-medium">{config.name}</span>
                  </div>
                  <span className="text-xs opacity-80">{config.description}</span>
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
                {/* Quick Start Topics - Smaller */}
                {chatHistory.length === 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    <Button
                      size="sm"
                      onClick={() => startConversation("money")}
                      className="bg-yellow-800/30 hover:bg-yellow-700/40 border border-yellow-500/30 text-yellow-200 text-xs"
                    >
                      <DollarSign className="h-3 w-3 mr-1" />
                      Money
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => startConversation("consciousness")}
                      className="bg-purple-800/30 hover:bg-purple-700/40 border border-purple-500/30 text-purple-200 text-xs"
                    >
                      <Brain className="h-3 w-3 mr-1" />
                      Consciousness
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => startConversation("spiritual")}
                      className="bg-blue-800/30 hover:bg-blue-700/40 border border-blue-500/30 text-blue-200 text-xs"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Spiritual
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => startConversation("love")}
                      className="bg-pink-800/30 hover:bg-pink-700/40 border border-pink-500/30 text-pink-200 text-xs"
                    >
                      <Heart className="h-3 w-3 mr-1" />
                      Self-Love
                    </Button>
                  </div>
                )}

                {/* Chat Messages - More Space */}
                <div className="space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto p-4 rounded-lg bg-black/20">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-purple-300 py-4">
                      <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm mb-2">Ready to transform your life? Pick a topic or ask anything!</p>
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

                {/* Input Form - More Space */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Ask about consciousness, wealth, spirituality, or self-love... (Press Enter to send, Shift+Enter for new line)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[120px] max-h-[200px] bg-black/20 border-purple-500/30 focus:border-purple-400 text-white resize-none"
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
                {/* Daily Practices */}
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
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-purple-200 flex items-center gap-2">
                              <span>{essential.icon}</span> {essential.title}
                            </h3>
                            <p className="text-sm text-purple-300">{essential.description}</p>
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

                        {/* Dropdown Options */}
                        <Select
                          value={selectedEssentials[essential.id] || ""}
                          onValueChange={(value) =>
                            setSelectedEssentials((prev) => ({ ...prev, [essential.id]: value }))
                          }
                        >
                          <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                            <SelectValue placeholder="Choose an option or create your own..." />
                          </SelectTrigger>
                          <SelectContent className="bg-purple-900 border-purple-500/30">
                            {essential.options.map((option, index) => (
                              <SelectItem key={index} value={option} className="text-white hover:bg-purple-800">
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {selectedEssentials[essential.id] && (
                          <div className="p-2 rounded bg-purple-800/30 border border-purple-500/30">
                            <p className="text-sm text-purple-200">{selectedEssentials[essential.id]}</p>
                          </div>
                        )}
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
