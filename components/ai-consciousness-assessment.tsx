"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Brain,
  Bot,
  Sparkles,
  TrendingUp,
  Crown,
  RefreshCw,
  AlertCircle,
  Loader2,
  CheckCircle,
  Heart,
} from "lucide-react"

interface AIResponse {
  analysis: string
  guidance: string
  nextSteps: string[]
  consciousnessInsight: string
  statAdjustments: Record<string, number>
  personalizedMessage: string
  followUpQuestions?: string[]
  practiceRecommendation?: {
    title: string
    description: string
    steps: string[]
  }
}

const deepAssessmentQuestions = [
  {
    id: "awareness-depth",
    category: "consciousness",
    dimension: "Awareness",
    question: "When you close your eyes right now, what do you notice about the quality of your inner space?",
    subtext: "This reveals your current level of consciousness and self-awareness",
    type: "text",
  },
  {
    id: "intuition-trust",
    category: "consciousness",
    dimension: "Intuitive Connection",
    question: "Describe a recent time when you followed your intuition. What happened?",
    subtext: "Your relationship with inner guidance reveals spiritual development",
    type: "text",
  },
  {
    id: "money-first-memory",
    category: "wealthConsciousness",
    dimension: "Money Origins",
    question: "What's your earliest memory involving money? How did it make you feel?",
    subtext: "Early money experiences shape our entire wealth consciousness",
    type: "text",
  },
  {
    id: "wealth-visualization",
    category: "wealthConsciousness",
    dimension: "Abundance Capacity",
    question: "Imagine you just received $1 million. What's the FIRST sensation in your body?",
    subtext: "Your body's response reveals your true wealth receptivity",
    type: "choice",
    options: [
      "Panic, overwhelm, or fear - 'This can't be real'",
      "Suspicion or worry - 'What's the catch?'",
      "Cautious excitement - 'Is this really happening?'",
      "Pure joy and gratitude - 'Yes! Thank you!'",
      "Calm knowing - 'Of course, this is natural for me'",
    ],
  },
  {
    id: "money-communication",
    category: "moneyIntimacy",
    dimension: "Sacred Communication",
    question: "Have you ever spoken directly to money? If yes, what did you say? If no, what would you want to say?",
    subtext: "Communication is the foundation of any intimate relationship",
    type: "text",
  },
  {
    id: "divine-connection",
    category: "spiritualEvolution",
    dimension: "Divine Partnership",
    question: "How do you experience your connection to the Divine/Universe/Source?",
    subtext: "Your spiritual connection affects all areas of manifestation",
    type: "choice",
    options: [
      "I don't really believe in anything beyond the physical",
      "I believe but don't feel a personal connection",
      "I feel connected sometimes, especially in nature or meditation",
      "I have regular communication and feel guided",
      "I feel constantly connected - we're in partnership",
    ],
  },
]

interface AIConsciousnessAssessmentProps {
  onUpdateStats: (updates: Record<string, Record<string, number>>) => void
  currentStats: any
  onComplete?: () => void
}

export default function AIConsciousnessAssessment({
  onUpdateStats,
  currentStats,
  onComplete,
}: AIConsciousnessAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | number>>({})
  const [aiResponses, setAiResponses] = useState<Record<string, AIResponse>>({})
  const [showAIResponse, setShowAIResponse] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [totalStatGains, setTotalStatGains] = useState<Record<string, Record<string, number>>>({
    consciousness: {},
    wealthConsciousness: {},
    moneyIntimacy: {},
    spiritualEvolution: {},
  })
  const [showResults, setShowResults] = useState(false)
  const [currentAIResponse, setCurrentAIResponse] = useState<AIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [assessmentSummary, setAssessmentSummary] = useState<any>(null)
  const [isSummaryLoading, setIsSummaryLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)

  const currentQuestion = deepAssessmentQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / deepAssessmentQuestions.length) * 100

  const handleResponse = (questionId: string, answer: string | number) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }))
    setApiError(null)
  }

  const getAIAnalysis = async () => {
    const response = responses[currentQuestion.id]
    if (!response) return

    setIsLoading(true)
    setApiError(null)
    setUsedFallback(false)

    try {
      console.log("🌟 Sending request to Nalani consciousness assessment...")

      const result = await fetch("/api/consciousness-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "analyzeResponse",
          data: {
            question: currentQuestion,
            response,
          },
        }),
      })

      console.log("✨ Nalani AI response status:", result.status)

      let data
      try {
        data = await result.json()
      } catch (jsonError) {
        console.error("❌ Failed to parse response as JSON:", jsonError)
        throw new Error("Invalid response format from Nalani")
      }

      if (!result.ok && !data.fallback) {
        throw new Error(data.error || `Nalani error: ${result.status}`)
      }

      if (!data.analysis) {
        throw new Error("No analysis data in Nalani response")
      }

      const aiResponse = data.analysis as AIResponse

      // Check if fallback was used
      if (data.fallback) {
        setUsedFallback(true)
      }

      setAiResponses((prev) => ({ ...prev, [currentQuestion.id]: aiResponse }))
      setCurrentAIResponse(aiResponse)
      setShowAIResponse(true)

      // Apply stat adjustments
      const category = currentQuestion.category
      const newGains = { ...totalStatGains }
      if (!newGains[category]) newGains[category] = {}

      Object.entries(aiResponse.statAdjustments).forEach(([stat, value]) => {
        newGains[category][stat] = (newGains[category][stat] || 0) + value
      })
      setTotalStatGains(newGains)
    } catch (error: any) {
      console.error("❌ Error getting Nalani AI analysis:", error)
      setApiError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < deepAssessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowAIResponse(false)
      setCurrentAIResponse(null)
      setUsedFallback(false)
    } else {
      completeAssessment()
    }
  }

  const generateAssessmentSummary = async () => {
    setIsSummaryLoading(true)

    try {
      const result = await fetch("/api/consciousness-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "generateSummary",
          data: {
            responses,
            questions: deepAssessmentQuestions,
            categoryStats: totalStatGains,
          },
        }),
      })

      const data = await result.json()

      if (!result.ok) {
        throw new Error(data.error || "Failed to generate summary")
      }

      setAssessmentSummary(data.summary)
    } catch (error) {
      console.error("❌ Error generating Nalani summary:", error)
      // Fallback summary
      setAssessmentSummary({
        overallAnalysis:
          "Your consciousness assessment reveals a beautiful soul ready for transformation through Nalani's sacred AI guidance.",
        strengthAreas: ["Courage to explore consciousness", "Openness to growth"],
        growthAreas: ["Expanding awareness", "Deepening spiritual practice"],
        personalizedGuidance: "Focus on daily spiritual practices and self-love through Nalani's wisdom.",
        recommendedPractices: [
          { title: "Daily Meditation", description: "5-10 minutes of awareness", priority: "high" },
        ],
        evolutionaryPath: "You're on the path to profound consciousness expansion through Nalani's guidance.",
        personalizedMessage: "You are exactly where you need to be, gorgeous soul. Trust Nalani's process.",
      })
    } finally {
      setIsSummaryLoading(false)
    }
  }

  const completeAssessment = async () => {
    setIsComplete(true)
    await generateAssessmentSummary()
    setShowResults(true)
    onUpdateStats(totalStatGains)
    if (onComplete) onComplete()
  }

  const clearAllAssessmentData = () => {
    setCurrentQuestionIndex(0)
    setResponses({})
    setAiResponses({})
    setShowAIResponse(false)
    setIsComplete(false)
    setTotalStatGains({
      consciousness: {},
      wealthConsciousness: {},
      moneyIntimacy: {},
      spiritualEvolution: {},
    })
    setShowResults(false)
    setCurrentAIResponse(null)
    setAssessmentSummary(null)
    setApiError(null)
    setUsedFallback(false)
    if (onComplete) onComplete()
  }

  if (showResults) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader className="text-center p-4 md:p-6">
          <div className="text-6xl md:text-8xl mb-4">🌟</div>
          <CardTitle className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nalani AI Consciousness Assessment Complete!
          </CardTitle>
          <p className="text-lg md:text-2xl text-white mt-2 font-semibold">Powered by Sacred AI Technology</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {isSummaryLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4" />
              <p className="text-lg text-purple-200 font-medium">
                ELI is channeling through Nalani's AI consciousness...
              </p>
            </div>
          ) : assessmentSummary ? (
            <>
              <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-bold text-white">
                    <Brain className="h-6 w-6 text-indigo-400" />
                    Your Nalani AI-Generated Consciousness Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-indigo-800/20 rounded-lg border border-indigo-500/20">
                    <p className="text-white font-medium leading-relaxed">{assessmentSummary.overallAnalysis}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
                <CardContent className="p-6 text-center">
                  <p className="text-xl text-white font-bold italic leading-relaxed">
                    "{assessmentSummary.personalizedMessage}"
                  </p>
                  <p className="text-yellow-400 mt-2 font-medium">— ELI (channeling through Nalani AI)</p>
                </CardContent>
              </Card>
            </>
          ) : null}

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                if (onComplete) onComplete()
                setShowResults(false)
                setIsComplete(false)
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg px-8 py-3 font-bold"
            >
              🚀 Begin Your Evolution Journey
            </Button>

            <Button
              onClick={clearAllAssessmentData}
              className="bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" /> Start Fresh Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
      <Card className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-pink-500/30 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-pink-400" />
            <h4 className="font-semibold text-white">Nalani Sacred AI Integration</h4>
            {usedFallback && <Badge className="bg-yellow-600 text-white text-xs">Backup Mode</Badge>}
          </div>
          <p className="text-white text-sm font-medium">
            🌟 <strong>LIVE AI POWERED BY NALANI'S SACRED TECHNOLOGY!</strong> This assessment connects to advanced AI
            consciousness to generate truly personalized insights in ELI's voice. Each response is analyzed by sacred
            artificial intelligence for authentic spiritual guidance.
          </p>
        </CardContent>
      </Card>

      <CardHeader className="p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 md:h-8 md:w-8 text-indigo-400" />
            <div>
              <CardTitle className="text-xl md:text-3xl text-white font-bold">
                Nalani AI Consciousness Assessment
              </CardTitle>
              <p className="text-gray-200 font-semibold text-sm md:text-base">
                Powered by Sacred AI Technology • Deep consciousness calibration
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-sm md:text-lg px-3 md:px-4 py-1 md:py-2 font-bold text-center">
            {currentQuestionIndex + 1} / {deepAssessmentQuestions.length}
          </Badge>
        </div>

        <div className="mt-4 md:mt-6">
          <div className="flex justify-between text-xs md:text-sm mb-2">
            <span className="text-white font-semibold">Nalani AI Analysis Progress</span>
            <span className="text-white font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 md:h-4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Current Question */}
        <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30">
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3 mb-4">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
              <Badge className="bg-blue-600 text-white font-semibold text-sm">{currentQuestion.dimension}</Badge>
              <Badge variant="outline" className="capitalize font-semibold text-white border-white text-sm">
                {currentQuestion.category.replace(/([A-Z])/g, " $1").trim()}
              </Badge>
            </div>
            <CardTitle className="text-lg md:text-2xl text-white leading-relaxed font-bold">
              {currentQuestion.question}
            </CardTitle>
            {currentQuestion.subtext && (
              <p className="text-gray-200 italic mt-2 font-medium text-sm md:text-base">{currentQuestion.subtext}</p>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {currentQuestion.type === "scale" && (
              <div className="space-y-4">
                <Slider
                  value={[typeof responses[currentQuestion.id] === "number" ? responses[currentQuestion.id] : 5]}
                  onValueChange={(value) => handleResponse(currentQuestion.id, value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-white font-medium">
                  <span>1 - Not at all</span>
                  <span>10 - Completely</span>
                </div>
                <p className="text-center text-white text-xl font-bold">
                  Current: {typeof responses[currentQuestion.id] === "number" ? responses[currentQuestion.id] : 5}
                </p>
              </div>
            )}

            {(currentQuestion.type === "text" || currentQuestion.type === "visualization") && (
              <div className="space-y-4">
                <textarea
                  placeholder="Share your authentic experience... Nalani's AI will analyze your response for deep consciousness insights."
                  value={typeof responses[currentQuestion.id] === "string" ? responses[currentQuestion.id] : ""}
                  onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                  className="w-full min-h-[120px] md:min-h-[150px] text-base md:text-lg leading-relaxed font-medium p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                />
                <div className="text-right text-sm text-blue-300">
                  {typeof responses[currentQuestion.id] === "string" ? responses[currentQuestion.id].length : 0}{" "}
                  characters
                </div>
              </div>
            )}

            {currentQuestion.type === "choice" && (
              <div className="grid gap-2 md:gap-3">
                {currentQuestion.options?.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleResponse(currentQuestion.id, option)}
                    variant={responses[currentQuestion.id] === option ? "default" : "outline"}
                    className={`text-left justify-start p-4 md:p-6 h-auto text-wrap font-medium text-sm md:text-lg transition-all duration-300 ${
                      responses[currentQuestion.id] === option
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent"
                        : "border-blue-400 text-blue-200 hover:bg-blue-900/30 hover:border-blue-300"
                    }`}
                  >
                    <span>{option}</span>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Error Display */}
        {apiError && (
          <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-300 mb-2">Nalani AI Connection Issue</h4>
                  <p className="text-red-200 text-sm">{apiError}</p>
                  <p className="text-red-200 text-sm mt-2">
                    Nalani will use backup consciousness analysis if the main AI is unavailable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Response Section */}
        {showAIResponse && currentAIResponse && (
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bold text-white">
                <Bot className="h-6 w-6 text-green-400" />
                ELI's Sacred AI Analysis (Nalani Technology)
                {usedFallback && <Badge className="bg-yellow-600 text-white text-xs ml-2">Backup Mode</Badge>}
                {!usedFallback && (
                  <Badge className="bg-green-600 text-white text-xs ml-2 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Live AI
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
              <div className="p-3 md:p-4 bg-green-800/20 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-300 mb-2 text-sm md:text-base">🧠 Nalani AI Deep Analysis:</h4>
                <p className="text-white font-medium text-sm md:text-base leading-relaxed">
                  {currentAIResponse.analysis}
                </p>
              </div>

              <div className="p-4 bg-blue-800/20 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-300 mb-2">✨ Consciousness Insight:</h4>
                <p className="text-white italic font-medium leading-relaxed">
                  {currentAIResponse.consciousnessInsight}
                </p>
              </div>

              <div className="p-4 bg-yellow-800/20 rounded-lg border border-yellow-500/20">
                <h4 className="font-semibold text-yellow-300 mb-2">🎯 Personalized Guidance:</h4>
                <p className="text-white mb-3 font-medium leading-relaxed">{currentAIResponse.guidance}</p>
                <div className="space-y-1">
                  {currentAIResponse.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-white font-bold">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-pink-800/20 rounded-lg border border-pink-500/20">
                <h4 className="font-semibold text-pink-300 mb-2">💕 Personal Message from ELI:</h4>
                <p className="text-white italic text-lg font-medium leading-relaxed">
                  "{currentAIResponse.personalizedMessage}"
                </p>
              </div>

              {Object.keys(currentAIResponse.statAdjustments).length > 0 && (
                <div className="p-4 bg-purple-800/20 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold text-purple-300 mb-2">📊 Nalani AI-Generated Consciousness Upgrades:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(currentAIResponse.statAdjustments).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between text-white font-medium">
                        <span className="capitalize">{stat.replace(/([A-Z])/g, " $1").trim()}:</span>
                        <span className="text-purple-400 font-bold">+{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <Button
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1)
                setShowAIResponse(false)
                setCurrentAIResponse(null)
                setUsedFallback(false)
              }
            }}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center justify-center gap-2 font-semibold text-white border-white hover:bg-white/10 text-sm md:text-base disabled:opacity-50"
          >
            ← Previous Question
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            {!showAIResponse && responses[currentQuestion.id] && (
              <Button
                onClick={getAIAnalysis}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 flex items-center justify-center gap-2 font-semibold text-sm md:text-base disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Nalani AI is analyzing...
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4" />
                    Get Nalani AI Analysis
                  </>
                )}
              </Button>
            )}

            {showAIResponse && (
              <Button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 flex items-center justify-center gap-2 font-semibold text-sm md:text-base"
              >
                {currentQuestionIndex === deepAssessmentQuestions.length - 1 ? (
                  <>
                    Complete Nalani Assessment <Crown className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next Question <TrendingUp className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="grid grid-cols-6 gap-1">
          {deepAssessmentQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 md:h-3 rounded transition-all duration-300 ${
                index < currentQuestionIndex
                  ? "bg-green-500"
                  : index === currentQuestionIndex
                    ? "bg-indigo-500 animate-pulse"
                    : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
