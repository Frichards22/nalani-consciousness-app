"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles } from "lucide-react"

const questions = [
  {
    id: 1,
    category: "Soul Purpose",
    question: "What makes you feel most alive and in your power?",
  },
  {
    id: 2,
    category: "Money Relationship",
    question: "If you had unlimited money right now, what's the first emotion you'd feel?",
  },
  {
    id: 3,
    category: "Divine Connection",
    question: "How do you experience your connection to something greater than yourself?",
  },
  {
    id: 4,
    category: "Inner Wisdom",
    question: "Describe a time when you trusted your intuition completely. What happened?",
  },
  {
    id: 5,
    category: "Worthiness Blocks",
    question: "What story do you tell yourself about why you can't have what you desire?",
  },
  {
    id: 6,
    category: "Self-Love",
    question: "How do you express love to yourself when no one is watching?",
  },
  {
    id: 7,
    category: "Quantum Vision",
    question: "If you knew you couldn't fail, what would you create in the world?",
  },
]

export default function WorkingAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [coaching, setCoaching] = useState<{ analysis: string; tip: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCoaching, setShowCoaching] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const getCoaching = async () => {
    if (!currentAnswer.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/assessment-coaching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userResponse: currentAnswer,
          questionContext: `${currentQuestion.category}: ${currentQuestion.question}`,
        }),
      })

      if (!response.ok) throw new Error("Failed to get coaching")

      const data = await response.json()
      setCoaching(data)
      setShowCoaching(true)
    } catch (error) {
      console.error("Coaching error:", error)
      // Fallback coaching
      setCoaching({
        analysis: `✨ **"${currentAnswer}"** - Thank you for sharing your truth. Your honesty is the first step toward transformation.`,
        tip: "**TIP:** Trust your journey. Every step is leading you to your highest expression of abundance and joy.",
      })
      setShowCoaching(true)
    } finally {
      setIsLoading(false)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentAnswer("")
      setCoaching(null)
      setShowCoaching(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-purple-300">
          Soul Assessment - Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question */}
        <div className="p-6 bg-purple-800/30 rounded-lg border border-purple-500/30">
          <h3 className="text-xl font-medium text-purple-200 mb-2">{currentQuestion.category}</h3>
          <p className="text-lg text-white leading-relaxed">{currentQuestion.question}</p>
        </div>

        {/* Answer Input */}
        {!showCoaching && (
          <div className="space-y-4">
            <Textarea
              placeholder="Share your authentic truth here..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="min-h-[120px] bg-black/20 border-purple-500/30 focus:border-purple-400 text-white"
            />

            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-300">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <Button
                onClick={getCoaching}
                disabled={!currentAnswer.trim() || isLoading}
                className="bg-gradient-to-r from-pink-500 to-purple-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Getting ELI's Coaching...
                  </>
                ) : (
                  "Get ELI's Coaching"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Coaching Response */}
        {showCoaching && coaching && (
          <div className="space-y-4">
            <div className="p-6 bg-green-800/30 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-medium text-green-200 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                ELI's Coaching
              </h3>

              <div className="space-y-4">
                <div className="text-white leading-relaxed whitespace-pre-line">{coaching.analysis}</div>

                <div className="p-4 bg-yellow-800/20 rounded-lg border border-yellow-500/30">
                  <div className="text-yellow-200 font-medium leading-relaxed whitespace-pre-line">{coaching.tip}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-300">
                {currentQuestionIndex === questions.length - 1
                  ? "Assessment complete!"
                  : "Ready for the next question?"}
              </span>
              {currentQuestionIndex < questions.length - 1 && (
                <Button onClick={nextQuestion} className="bg-gradient-to-r from-green-500 to-blue-600">
                  Next Question
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
