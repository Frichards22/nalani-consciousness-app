"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Brain, Sparkles, TrendingUp } from "lucide-react"

interface AssessmentQuestion {
  id: string
  category: "consciousness" | "wealthConsciousness" | "moneyIntimacy"
  question: string
  type: "scale" | "text" | "choice"
  options?: string[]
  statMapping: Record<string, number>
}

const assessmentQuestions: AssessmentQuestion[] = [
  // Consciousness Questions
  {
    id: "awareness-1",
    category: "consciousness",
    question: "How aware are you of your thoughts and emotions throughout the day?",
    type: "scale",
    statMapping: { awareness: 10 },
  },
  {
    id: "intuition-1",
    category: "consciousness",
    question: "How often do you trust and follow your intuitive guidance?",
    type: "scale",
    statMapping: { intuition: 10 },
  },
  {
    id: "frequency-1",
    category: "consciousness",
    question: "How would you describe your overall energy frequency?",
    type: "choice",
    options: [
      "Heavy, dense, often negative",
      "Mixed - some high, some low moments",
      "Generally positive and uplifting",
      "High vibration, joyful, magnetic",
      "Pure light, love, and bliss",
    ],
    statMapping: { frequency: 20 },
  },

  // Wealth Consciousness Questions
  {
    id: "abundance-1",
    category: "wealthConsciousness",
    question: "When you think about money, what's your first feeling?",
    type: "choice",
    options: [
      "Fear, anxiety, or stress",
      "Neutral - it's just a tool",
      "Cautious optimism",
      "Excitement and possibility",
      "Pure love and gratitude",
    ],
    statMapping: { abundanceMindset: 20 },
  },
  {
    id: "magnetism-1",
    category: "wealthConsciousness",
    question: "How easily does money flow to you?",
    type: "scale",
    statMapping: { moneyMagnetism: 10 },
  },
  {
    id: "worthiness-1",
    category: "wealthConsciousness",
    question: "Do you feel worthy of unlimited wealth and abundance?",
    type: "scale",
    statMapping: { worthinessLevel: 10 },
  },
  {
    id: "receiving-1",
    category: "wealthConsciousness",
    question: "How comfortable are you receiving money, gifts, or support?",
    type: "scale",
    statMapping: { receivingCapacity: 10 },
  },

  // Money Intimacy Questions
  {
    id: "trust-1",
    category: "moneyIntimacy",
    question: "How much do you trust money to support and care for you?",
    type: "scale",
    statMapping: { trustLevel: 10 },
  },
  {
    id: "communication-1",
    category: "moneyIntimacy",
    question: "Do you ever talk to money or ask for its guidance?",
    type: "choice",
    options: [
      "Never - that sounds crazy",
      "Rarely, only when desperate",
      "Sometimes, when I remember",
      "Regularly, we have conversations",
      "Daily - we're in constant dialogue",
    ],
    statMapping: { communication: 20 },
  },
  {
    id: "pleasure-1",
    category: "moneyIntimacy",
    question: "How much pleasure and joy do you feel when handling money?",
    type: "scale",
    statMapping: { pleasure: 10 },
  },
  {
    id: "sacredness-1",
    category: "moneyIntimacy",
    question: "Do you view money as sacred life force energy?",
    type: "choice",
    options: [
      "No, it's just paper/numbers",
      "I've never thought about it",
      "Maybe, I'm open to the idea",
      "Yes, I'm beginning to see it",
      "Absolutely - money is divine energy",
    ],
    statMapping: { sacredness: 20 },
  },
]

interface InteractiveAssessmentProps {
  onUpdateStats: (updates: Record<string, Record<string, number>>) => void
  currentStats: any
}

export default function InteractiveAssessment({ onUpdateStats, currentStats }: InteractiveAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [calculatedStats, setCalculatedStats] = useState<Record<string, Record<string, number>>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = assessmentQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100

  const handleResponse = (questionId: string, answer: string | number) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      completeAssessment()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateStats = () => {
    const stats: Record<string, Record<string, number>> = {
      consciousness: {},
      wealthConsciousness: {},
      moneyIntimacy: {},
    }

    assessmentQuestions.forEach((question) => {
      const response = responses[question.id]
      if (response !== undefined) {
        let multiplier = 1

        if (question.type === "scale") {
          // Scale responses (1-10)
          multiplier = (response as number) / 10
        } else if (question.type === "choice") {
          // Choice responses (0-4 index)
          const choiceIndex = question.options?.indexOf(response as string) || 0
          multiplier = (choiceIndex + 1) / (question.options?.length || 5)
        }

        Object.entries(question.statMapping).forEach(([stat, baseValue]) => {
          const calculatedValue = Math.round(baseValue * multiplier)
          if (!stats[question.category][stat]) {
            stats[question.category][stat] = 0
          }
          stats[question.category][stat] = Math.max(stats[question.category][stat], calculatedValue)
        })
      }
    })

    return stats
  }

  const completeAssessment = () => {
    const newStats = calculateStats()
    setCalculatedStats(newStats)
    setIsComplete(true)
    setShowResults(true)
  }

  const applyResults = () => {
    onUpdateStats(calculatedStats)
    setShowResults(false)
  }

  const getConsciousnessLevel = (stats: Record<string, number>) => {
    const average = Object.values(stats).reduce((sum, val) => sum + val, 0) / Object.values(stats).length
    if (average >= 80) return "Cosmic Consciousness"
    if (average >= 60) return "Expanded Awareness"
    if (average >= 40) return "Awakening Soul"
    if (average >= 20) return "Developing Awareness"
    return "Beginning Journey"
  }

  const getWealthLevel = (stats: Record<string, number>) => {
    const average = Object.values(stats).reduce((sum, val) => sum + val, 0) / Object.values(stats).length
    if (average >= 80) return "Wealth Goddess"
    if (average >= 60) return "Abundance Magnet"
    if (average >= 40) return "Money Mystic"
    if (average >= 20) return "Wealth Student"
    return "Money Beginner"
  }

  const getIntimacyLevel = (stats: Record<string, number>) => {
    const average = Object.values(stats).reduce((sum, val) => sum + val, 0) / Object.values(stats).length
    if (average >= 80) return "Sacred Union"
    if (average >= 60) return "Intimate Partnership"
    if (average >= 40) return "Growing Connection"
    if (average >= 20) return "Building Trust"
    return "Early Courtship"
  }

  if (showResults) {
    return (
      <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-300">🧠 Your Consciousness Assessment Results</CardTitle>
          <p className="text-blue-200">Your personalized consciousness profile has been calculated!</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Overall Summary */}
          <div className="text-center space-y-4">
            <div className="text-6xl">✨</div>
            <h3 className="text-2xl font-bold text-yellow-400">Assessment Complete!</h3>
            <p className="text-lg text-blue-200">
              Your consciousness has been calibrated across all dimensions. Ready to apply these insights?
            </p>
          </div>

          {/* Detailed Results */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Consciousness */}
            <Card className="bg-purple-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300">🧠 Consciousness</CardTitle>
                <Badge className="bg-purple-600">{getConsciousnessLevel(calculatedStats.consciousness || {})}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(calculatedStats.consciousness || {}).map(([stat, value]) => (
                  <div key={stat} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{stat.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="text-purple-400">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Wealth Consciousness */}
            <Card className="bg-yellow-900/30 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-300">💰 Wealth Consciousness</CardTitle>
                <Badge className="bg-yellow-600">{getWealthLevel(calculatedStats.wealthConsciousness || {})}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(calculatedStats.wealthConsciousness || {}).map(([stat, value]) => (
                  <div key={stat} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{stat.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="text-yellow-400">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Money Intimacy */}
            <Card className="bg-pink-900/30 border-pink-500/30">
              <CardHeader>
                <CardTitle className="text-pink-300">💕 Money Intimacy</CardTitle>
                <Badge className="bg-pink-600">{getIntimacyLevel(calculatedStats.moneyIntimacy || {})}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(calculatedStats.moneyIntimacy || {}).map(([stat, value]) => (
                  <div key={stat} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{stat.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="text-pink-400">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Personalized Insights */}
          <Card className="bg-green-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300">🎯 Your Personalized Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">🌟 Your Strengths:</h4>
                  <ul className="space-y-1 text-sm text-green-200">
                    <li>✨ Ready for consciousness expansion</li>
                    <li>💕 Open to money intimacy</li>
                    <li>🔮 Developing spiritual awareness</li>
                    <li>⚡ Building wealth magnetism</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">🎯 Growth Areas:</h4>
                  <ul className="space-y-1 text-sm text-green-200">
                    <li>🧠 Expand consciousness practices</li>
                    <li>💰 Deepen wealth worthiness</li>
                    <li>💬 Improve money communication</li>
                    <li>🌈 Increase receiving capacity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Apply Results */}
          <div className="text-center space-y-4">
            <Button
              onClick={applyResults}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3"
            >
              ✨ Apply Results & Update My Consciousness ✨
            </Button>
            <p className="text-sm text-blue-300">
              This will update your consciousness levels and unlock personalized practices
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-400" />
            <div>
              <CardTitle className="text-2xl text-blue-300">AI Consciousness Assessment</CardTitle>
              <p className="text-blue-200">Calibrate your consciousness across all dimensions</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
            Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-300">Progress</span>
            <span className="text-blue-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Question */}
        <Card className="bg-blue-800/20 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <Badge className="capitalize">{currentQuestion.category.replace(/([A-Z])/g, " $1").trim()}</Badge>
            </div>

            <h3 className="text-xl font-semibold text-blue-200 mb-6">{currentQuestion.question}</h3>

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
                <div className="flex justify-between text-sm text-blue-300">
                  <span>1 - Not at all</span>
                  <span>10 - Completely</span>
                </div>
                <p className="text-center text-blue-200 text-lg font-semibold">
                  Current: {typeof responses[currentQuestion.id] === "number" ? responses[currentQuestion.id] : 5}
                </p>
              </div>
            )}

            {currentQuestion.type === "text" && (
              <Textarea
                placeholder="Share your honest thoughts and feelings..."
                value={typeof responses[currentQuestion.id] === "string" ? responses[currentQuestion.id] : ""}
                onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                className="min-h-[120px] text-lg"
              />
            )}

            {currentQuestion.type === "choice" && (
              <div className="grid gap-3">
                {currentQuestion.options?.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleResponse(currentQuestion.id, option)}
                    variant={responses[currentQuestion.id] === option ? "default" : "outline"}
                    className="text-left justify-start p-4 h-auto"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            ← Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!responses[currentQuestion.id]}
            className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2"
          >
            {currentQuestionIndex === assessmentQuestions.length - 1 ? (
              <>
                Complete Assessment <TrendingUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Next <TrendingUp className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Question Overview */}
        <div className="grid grid-cols-5 gap-2">
          {assessmentQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded ${
                index < currentQuestionIndex
                  ? "bg-green-500"
                  : index === currentQuestionIndex
                    ? "bg-blue-500"
                    : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
