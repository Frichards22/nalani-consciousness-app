"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Star, Lock, CheckCircle, RotateCcw, Sparkles } from "lucide-react"
import SoulWealthAssessment from "@/components/soul-wealth-assessment"
import EnhancedNalaniChat from "@/components/enhanced-nalani-chat"

export default function ELIApp() {
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
      setActiveTab("essentials")
    }
  }, [])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-3">
            ✨ ELI's Consciousness Evolution ✨
          </h1>

          {/* Book Reference */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl italic text-pink-300 font-light">
              From <span className="text-yellow-400 font-medium">"Makeup Sex with Money"</span>
            </p>
            <p className="text-sm text-purple-200 mt-1">
              💋 Where healing your money wounds becomes foreplay for abundance 💋
            </p>
          </div>

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
          <TabsList className="grid w-full grid-cols-2 bg-purple-900/30 border border-purple-500/30">
            <TabsTrigger
              value="assessment"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Bot className="h-4 w-4 mr-2" />
              {assessmentCompleted ? "✓ Soul Wealth Assessment" : "Soul Wealth Assessment"}
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
                            <h3 className="font-medium text-white flex items-center gap-2">
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
                            <label className="text-sm text-purple-300">Choose your exercise:</label>
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
                                <p className="text-sm text-white">{selectedExercises[essential.id]}</p>
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

        {/* Floating Enhanced Chat */}
        <EnhancedNalaniChat />
      </div>
    </div>
  )
}
