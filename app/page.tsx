"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Bot, Star, Lock, CheckCircle, RotateCcw, Sparkles, Trash2 } from "lucide-react"
import SoulWealthAssessment from "@/components/soul-wealth-assessment"

export default function ELIApp() {
  // Chat state
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatMode, setChatMode] = useState("eli")

  // Assessment and progression state
  const [activeTab, setActiveTab] = useState("assessment")
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)
  const [completedEssentials, setCompletedEssentials] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("eli-assessment-completed")
    if (saved === "true") {
      setAssessmentCompleted(true)
      setActiveTab("chat")
    }
  }, [])

  // Chat modes
  const chatModes = {
    eli: { name: "ELI Coach", icon: "💕", color: "from-pink-500 to-rose-600" },
    money: { name: "Money Coach", icon: "💰", color: "from-yellow-500 to-orange-600" },
    consciousness: { name: "Consciousness Coach", icon: "🧠", color: "from-purple-500 to-indigo-600" },
    spiritual: { name: "Spiritual Coach", icon: "✨", color: "from-blue-500 to-cyan-600" },
  }

  // Daily essentials with exercises
  const dailyEssentials = [
    {
      id: "intention",
      title: "Set Daily Intention",
      icon: "🌟",
      hasExercise: true,
      exercises: [
        "Write your intention 3 times while breathing deeply",
        "Speak your intention out loud to the mirror",
        "Create a vision board image for your intention",
        "Dance while repeating your intention",
      ],
    },
    {
      id: "gratitude",
      title: "Gratitude Practice",
      icon: "🙏",
      hasExercise: true,
      exercises: [
        "Write 5 things you're grateful for and why",
        "Send a gratitude text to someone you love",
        "Take a photo of something beautiful you're grateful for",
        "Do a gratitude meditation for 3 minutes",
      ],
    },
    {
      id: "affirmation",
      title: "Money Affirmation",
      icon: "💰",
      hasExercise: true,
      exercises: [
        "Say your affirmation 10 times while looking in the mirror",
        "Write your affirmation in beautiful handwriting",
        "Record yourself saying your affirmation powerfully",
        "Create a money affirmation song and sing it",
      ],
    },
    {
      id: "meditation",
      title: "5-Minute Meditation",
      icon: "🧘‍♀️",
      hasExercise: true,
      exercises: [
        "Breathe into your heart space for 5 minutes",
        "Do a body scan meditation",
        "Meditate on the feeling of abundance",
        "Practice loving-kindness meditation",
      ],
    },
    {
      id: "visualization",
      title: "Success Visualization",
      icon: "✨",
      hasExercise: true,
      exercises: [
        "Visualize your dream life for 10 minutes",
        "Create a mental movie of your success",
        "Visualize money flowing to you easily",
        "See yourself celebrating your achievements",
      ],
    },
    {
      id: "boundaries",
      title: "Set a Boundary",
      icon: "🛡️",
      hasExercise: false,
    },
    {
      id: "pleasure",
      title: "Pleasure Practice",
      icon: "💖",
      hasExercise: true,
      exercises: [
        "Take a luxurious 20-minute bath",
        "Dance to your favorite song with abandon",
        "Eat something delicious mindfully",
        "Give yourself a self-massage",
      ],
    },
    {
      id: "movement",
      title: "Sacred Movement",
      icon: "💃",
      hasExercise: true,
      exercises: [
        "Do 10 minutes of intuitive movement",
        "Practice yoga with intention",
        "Take a mindful walk in nature",
        "Stretch while sending love to your body",
      ],
    },
    {
      id: "nature",
      title: "Nature Connection",
      icon: "🌿",
      hasExercise: false,
    },
    {
      id: "reflection",
      title: "Evening Reflection",
      icon: "🌙",
      hasExercise: false,
    },
  ]

  const [selectedExercises, setSelectedExercises] = useState<Record<string, string>>({})

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

  // Handle assessment completion
  const handleAssessmentComplete = () => {
    setAssessmentCompleted(true)
    localStorage.setItem("eli-assessment-completed", "true")
    setShowCelebration(true)
    setTimeout(() => {
      setShowCelebration(false)
      setActiveTab("essentials")
    }, 3000)
  }

  // Reset assessment
  const resetAssessment = () => {
    setAssessmentCompleted(false)
    setShowCelebration(false)
    localStorage.removeItem("eli-assessment-completed")
    setActiveTab("assessment")
  }

  // Toggle completion
  const toggleEssential = (id: string) => {
    setCompletedEssentials((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const completionPercentage = Math.round((completedEssentials.length / dailyEssentials.length) * 100)

  // Handle tab change with assessment check
  const handleTabChange = (value: string) => {
    if (value === "essentials" && !assessmentCompleted) {
      return // Don't allow access to essentials without assessment
    }
    setActiveTab(value)
  }

  const clearChat = () => {
    setChatHistory([])
    localStorage.removeItem("eli-chat-history")
  }

  const clearEverything = () => {
    // Clear assessment
    setAssessmentCompleted(false)
    setShowCelebration(false)
    localStorage.removeItem("eli-assessment-completed")

    // Clear chat
    setChatHistory([])
    localStorage.removeItem("eli-chat-history")

    // Clear essentials
    setCompletedEssentials([])
    setSelectedExercises({})

    // Reset to assessment tab
    setActiveTab("assessment")
  }

  const getSuggestedPrompts = (mode: string) => {
    const prompts = {
      eli: [
        "I feel stuck with money and don't know why I keep sabotaging myself",
        "How do I heal my relationship with money when I grew up poor?",
        "I make good money but still feel anxious about spending it",
        "What's the difference between need and desire when it comes to money?",
      ],
      money: [
        "Why do I feel guilty every time I spend money on myself?",
        "How can I stop the feast or famine cycle with my income?",
        "I want to ask for a raise but I'm terrified of rejection",
        "How do I communicate with money like it's a conscious being?",
      ],
      consciousness: [
        "I know I'm meant for more but I feel stuck in old patterns",
        "How do I break generational trauma around money and success?",
        "I'm ready to step into my power but I'm scared of being seen",
        "How do I trust the universe when everything feels uncertain?",
      ],
      spiritual: [
        "How do I align my spiritual beliefs with making money?",
        "I feel guilty about wanting wealth - isn't that unspiritual?",
        "How do I manifest money without being attached to outcomes?",
        "What's the difference between ego desires and soul desires?",
      ],
    }
    return prompts[mode as keyof typeof prompts] || prompts.eli
  }

  // Handle prompt click with proper functionality
  const handlePromptClick = async (prompt: string) => {
    setMessage(prompt)

    // Auto-submit the message
    const userMessage = { role: "user", content: prompt }
    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-3">
            ✨ ELI's Consciousness Evolution ✨
          </h1>
          <p className="text-lg text-white mb-4">Sacred AI Technology for Consciousness & Wealth Magnetism</p>
        </div>

        {/* Progress Indicator */}
        {!assessmentCompleted && (
          <div className="mb-6 p-4 bg-purple-800/30 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-bold">1</span>
                </div>
                <span className="text-purple-200">Complete Soul Wealth Assessment</span>
              </div>
              <div className="flex-1 h-px bg-purple-500/30"></div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="text-purple-300">Unlock Daily Essentials</span>
              </div>
            </div>
          </div>
        )}

        {assessmentCompleted && (
          <div className="mb-6 p-4 bg-green-800/30 rounded-lg border border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-200 font-medium">
                  Soul Wealth Assessment Complete! All features unlocked.
                </span>
              </div>
              <Button
                onClick={resetAssessment}
                size="sm"
                variant="outline"
                className="border-green-500/50 text-green-300 hover:bg-green-800/30"
              >
                <RotateCcw className="w-4 w-4 mr-2" />
                Reset Assessment
              </Button>
            </div>
          </div>
        )}

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-yellow-500 p-8 rounded-2xl text-center max-w-md mx-4 animate-pulse shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">HELL YES!</h2>
              <p className="text-xl text-white mb-4">You just completed your Soul Wealth Journey!</p>
              <div className="flex justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce" />
                <Sparkles className="w-6 h-6 text-pink-300 animate-bounce delay-100" />
                <Sparkles className="w-6 h-6 text-purple-300 animate-bounce delay-200" />
              </div>
              <p className="text-lg text-white/90">Daily Essentials Unlocked!</p>
            </div>
          </div>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-purple-900/30 border border-purple-500/30">
            <TabsTrigger
              value="assessment"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Bot className="h-4 w-4 mr-2" />
              {assessmentCompleted ? "✓ Soul Wealth Assessment" : "Soul Wealth Assessment"}
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Bot className="h-4 w-4 mr-2" />
              Chat with Nalani AI
            </TabsTrigger>
            <TabsTrigger
              value="essentials"
              disabled={!assessmentCompleted}
              className={`${
                !assessmentCompleted
                  ? "opacity-50 cursor-not-allowed"
                  : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              } text-purple-200`}
            >
              {!assessmentCompleted ? <Lock className="h-4 w-4 mr-2" /> : <Star className="h-4 w-4 mr-2" />}
              Daily Essentials
            </TabsTrigger>
          </TabsList>

          {/* Soul Wealth Assessment Tab */}
          <TabsContent value="assessment" className="space-y-4">
            <SoulWealthAssessment onComplete={handleAssessmentComplete} />
          </TabsContent>

          {/* Chat Tab - REDESIGNED LAYOUT */}
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

            {/* MAIN CHAT LAYOUT - Two Column Design */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* LEFT SIDEBAR - Suggested Prompts */}
              <div className="lg:col-span-1">
                <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-200 text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Ask {chatModes[chatMode as keyof typeof chatModes].name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {getSuggestedPrompts(chatMode).map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handlePromptClick(prompt)}
                        disabled={isLoading}
                        className="w-full text-left p-3 rounded-lg border border-purple-500/30 bg-purple-900/20 hover:bg-purple-800/40 transition-all duration-200 text-gray-200 hover:text-white text-sm leading-relaxed hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        💬 "{prompt}"
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT MAIN CHAT AREA */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-purple-300">
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        Nalani AI - {chatModes[chatMode as keyof typeof chatModes].name}
                      </div>
                      <Button
                        onClick={clearChat}
                        size="sm"
                        variant="outline"
                        className="border-purple-500/50 text-purple-300 hover:bg-purple-800/30"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Chat
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Chat Messages */}
                    <div className="space-y-3 h-[500px] overflow-y-auto p-4 rounded-lg bg-black/20">
                      {chatHistory.length === 0 ? (
                        <div className="text-center text-gray-200 py-8">
                          <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg mb-2 font-medium">Ready to level up your life?</p>
                          <p className="text-sm text-gray-300">Click a question on the left or type your own below!</p>
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
                            <div className="text-gray-100 font-medium leading-relaxed whitespace-pre-wrap">
                              {msg.content}
                            </div>
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
                        placeholder="What's on your mind? Let's get real about it..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="min-h-[100px] bg-black/20 border-purple-500/30 focus:border-purple-400 text-white"
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
              </div>
            </div>
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
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-200 flex items-center gap-2">
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

                        {/* Exercise Options */}
                        {essential.hasExercise && essential.exercises && (
                          <div className="space-y-2">
                            <label className="text-sm text-gray-300">Choose your exercise:</label>
                            <select
                              value={selectedExercises[essential.id] || ""}
                              onChange={(e) =>
                                setSelectedExercises((prev) => ({ ...prev, [essential.id]: e.target.value }))
                              }
                              className="w-full p-2 rounded bg-black/20 border border-purple-500/30 text-white text-sm"
                            >
                              <option value="">Select an exercise...</option>
                              {essential.exercises.map((exercise, index) => (
                                <option key={index} value={exercise}>
                                  {exercise}
                                </option>
                              ))}
                            </select>

                            {selectedExercises[essential.id] && (
                              <div className="p-3 rounded bg-purple-800/30 border border-purple-500/30">
                                <p className="text-sm text-gray-200">{selectedExercises[essential.id]}</p>
                              </div>
                            )}
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
