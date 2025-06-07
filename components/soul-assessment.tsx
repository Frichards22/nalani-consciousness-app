"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Bot, Sparkles, TrendingUp, Loader2, CheckCircle } from "lucide-react"

// Simple questions array
const soulQuestions = [
  {
    id: "soul-purpose",
    question: "What makes your soul feel most alive and on purpose?",
    subtext: "This reveals your deepest calling and spiritual alignment",
    category: "Purpose & Calling",
  },
  {
    id: "money-feeling",
    question: "When you think about having unlimited money, what's the first emotion that comes up?",
    subtext: "Your body's response reveals your true relationship with abundance",
    category: "Money Consciousness",
  },
  {
    id: "divine-connection",
    question: "How do you experience your connection to something greater than yourself?",
    subtext: "This shows your spiritual development and divine partnership",
    category: "Divine Connection",
  },
  {
    id: "inner-wisdom",
    question: "Describe a time when you trusted your intuition completely. What happened?",
    subtext: "Your relationship with inner guidance reveals consciousness level",
    category: "Intuitive Wisdom",
  },
  {
    id: "worthiness-blocks",
    question: "What story do you tell yourself about why you can't have everything you desire?",
    subtext: "This uncovers the core worthiness patterns affecting your reality",
    category: "Worthiness & Blocks",
  },
  {
    id: "love-expression",
    question: "How do you express love to yourself when no one is watching?",
    subtext: "Self-love is the foundation of all abundance and manifestation",
    category: "Self-Love & Care",
  },
  {
    id: "quantum-vision",
    question: "If you knew you couldn't fail, what would you create in the world?",
    subtext: "This reveals your soul's highest vision and quantum potential",
    category: "Quantum Vision",
  },
]

interface AIAnalysis {
  analysis: string
  insight: string
  guidance: string
  statAdjustments?: {
    consciousness?: number
    wealthConsciousness?: number
    moneyIntimacy?: number
  }
}

interface SoulAssessmentProps {
  analyzeAssessmentResponse: (question: any, response: string, previousResponses?: any) => Promise<AIAnalysis>
  createFallbackResponse: (question: any, response: string) => AIAnalysis
  onUpdateStats?: (updates: any) => void
}

export default function SoulAssessment({
  analyzeAssessmentResponse,
  createFallbackResponse,
  onUpdateStats,
}: SoulAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [showAIResponse, setShowAIResponse] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [aiResponse, setAiResponse] = useState<AIAnalysis>({
    analysis: "",
    insight: "",
    guidance: "",
  })
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, AIAnalysis>>({})
  const [currentAI, setCurrentAI] = useState<AIAnalysis>({
    analysis: "",
    insight: "",
    guidance: "",
  })

  const currentQuestion = soulQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / soulQuestions.length) * 100

  const handleResponse = (questionId: string, answer: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }))
  }

  const getAIAnalysis = async () => {
    const response = responses[currentQuestion.id]
    if (!response || response.length < 3) return

    setIsLoading(true)

    try {
      // Get previous responses from localStorage if they exist
      const previousResponses = localStorage.getItem("previousAssessmentResponses")
      const parsedPrevious = previousResponses ? JSON.parse(previousResponses) : undefined

      // Call our AI analyzer
      const coaching = await analyzeAssessmentResponse(currentQuestion, response, parsedPrevious)

      setAiAnalysis((prev) => ({ ...prev, [currentQuestion.id]: coaching }))
      setCurrentAI(coaching)
      setAiResponse(coaching)
      setShowAIResponse(true)

      // Apply stat boosts if the function exists
      if (coaching.statAdjustments && onUpdateStats) {
        const updates = {
          consciousness: coaching.statAdjustments,
          wealthConsciousness: {},
          moneyIntimacy: {},
        }
        onUpdateStats(updates)
      }

      // Store this response for future comparison
      const updatedResponses = parsedPrevious || {}
      updatedResponses[currentQuestion.id] = response
      localStorage.setItem("previousAssessmentResponses", JSON.stringify(updatedResponses))
    } catch (error) {
      console.error("Error getting AI analysis:", error)
      // Use our fallback function directly in case of error
      const fallback = createFallbackResponse(currentQuestion, response)
      setAiAnalysis((prev) => ({ ...prev, [currentQuestion.id]: fallback }))
      setCurrentAI(fallback)
      setAiResponse(fallback)
      setShowAIResponse(true)
    }

    setIsLoading(false)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < soulQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowAIResponse(false)
    } else {
      setShowResults(true)
    }
  }

  if (showResults) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">✨</div>
          <CardTitle className="text-3xl font-bold text-purple-300">Soul Assessment Complete!</CardTitle>
          <p className="text-purple-200">Your consciousness has been beautifully calibrated</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="bg-purple-800/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <p className="text-xl text-white font-bold italic">
                "Your soul is ready for quantum transformation, gorgeous being. Every answer revealed another layer of
                your divine magnificence."
              </p>
              <p className="text-purple-400 mt-2">— ELI</p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => {
                setShowResults(false)
                setCurrentQuestionIndex(0)
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg px-8 py-3"
            >
              🚀 Start Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-indigo-400" />
            <div>
              <CardTitle className="text-2xl text-indigo-300">Soul Assessment</CardTitle>
              <p className="text-indigo-200">7 thought-provoking questions with AI analysis</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500">
            {currentQuestionIndex + 1} / {soulQuestions.length}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-indigo-300">Progress</span>
            <span className="text-indigo-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Question */}
        <Card className="bg-blue-900/30 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <Badge className="bg-blue-600">{currentQuestion.category}</Badge>
            </div>
            <CardTitle className="text-xl text-blue-200">{currentQuestion.question}</CardTitle>
            <p className="text-blue-300 italic">{currentQuestion.subtext}</p>
          </CardHeader>

          <CardContent>
            <textarea
              placeholder="Share your authentic truth... The AI will analyze your response with spiritual depth."
              value={responses[currentQuestion.id] || ""}
              onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
              className="w-full min-h-[120px] text-lg p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="text-right text-sm text-blue-300 mt-2">
              {(responses[currentQuestion.id] || "").length} characters
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        {showAIResponse && (
          <Card className="bg-green-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-300">
                <Bot className="h-5 w-5" />
                ELI's Soul Reading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-800/20 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">✨ Analysis:</h4>
                <p className="text-white">{aiResponse.analysis}</p>
              </div>

              <div className="p-4 bg-blue-800/20 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">🔮 Soul Insight:</h4>
                <p className="text-white italic">{aiResponse.insight}</p>
              </div>

              <div className="p-4 bg-yellow-800/20 rounded-lg">
                <h4 className="font-semibold text-yellow-300 mb-2">🎯 Next Step:</h4>
                <p className="text-white">{aiResponse.guidance}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1)
                setShowAIResponse(false)
              }
            }}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            ← Previous
          </Button>

          <div className="flex gap-3">
            {!showAIResponse && responses[currentQuestion.id] && responses[currentQuestion.id].length > 10 && (
              <Button onClick={getAIAnalysis} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    AI Analyzing...
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    Get AI Analysis
                  </>
                )}
              </Button>
            )}

            {showAIResponse && (
              <Button onClick={nextQuestion} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                {currentQuestionIndex === soulQuestions.length - 1 ? (
                  <>
                    Complete Assessment <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next Question <TrendingUp className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {soulQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded ${
                index < currentQuestionIndex
                  ? "bg-green-500"
                  : index === currentQuestionIndex
                    ? "bg-indigo-500"
                    : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
