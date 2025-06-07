"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function SimpleAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions = [
    "How connected do you feel to your inner wisdom?",
    "How comfortable are you with receiving money?",
    "How much do you trust your intuition?",
    "How worthy do you feel of abundance?",
    "How aligned are you with your purpose?",
  ]

  const handleAnswer = (value: number[]) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value[0]
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const getAverageScore = () => {
    return Math.round(answers.reduce((sum, score) => sum + score, 0) / answers.length)
  }

  const getConsciousnessLevel = (score: number) => {
    if (score >= 80) return { level: "Divine Embodiment", emoji: "👑", color: "text-amber-400" }
    if (score >= 60) return { level: "Awakened Goddess", emoji: "🔮", color: "text-purple-400" }
    if (score >= 40) return { level: "Rising Goddess", emoji: "🌙", color: "text-blue-400" }
    return { level: "Awakening Soul", emoji: "🌟", color: "text-pink-400" }
  }

  if (showResults) {
    const score = getAverageScore()
    const level = getConsciousnessLevel(score)

    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900/95 to-black/95 border-gray-700/30">
        <CardHeader>
          <CardTitle className="text-center text-white text-2xl">Your Consciousness Assessment</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl mb-4">{level.emoji}</div>
          <h3 className={`text-3xl font-bold ${level.color}`}>{level.level}</h3>
          <div className="text-4xl font-bold text-white">{score}/100</div>
          <p className="text-gray-300 text-lg">
            You're on a beautiful journey of consciousness expansion. Keep growing, gorgeous soul! 💕
          </p>
          <Button
            onClick={() => {
              setCurrentQuestion(0)
              setAnswers([])
              setShowResults(false)
            }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
          >
            Take Assessment Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900/95 to-black/95 border-gray-700/30">
      <CardHeader>
        <CardTitle className="text-center text-white text-xl">Consciousness Assessment</CardTitle>
        <p className="text-center text-gray-300">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg text-white font-medium text-center">{questions[currentQuestion]}</h3>

        <div className="space-y-4">
          <Slider
            value={[answers[currentQuestion] || 50]}
            onValueChange={handleAnswer}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>Not at all</span>
            <span>Completely</span>
          </div>
          <div className="text-center text-2xl font-bold text-white">{answers[currentQuestion] || 50}/100</div>
        </div>

        <Button
          onClick={nextQuestion}
          disabled={!answers[currentQuestion]}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
        </Button>
      </CardContent>
    </Card>
  )
}
