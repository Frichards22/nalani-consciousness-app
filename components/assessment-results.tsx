"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Heart, Brain, Sparkles, Target } from "lucide-react"
import type { AssessmentScores } from "@/lib/ai/assessment-scorer"

interface AssessmentResultsProps {
  scores: AssessmentScores
  onReset: () => void
  onClearAll: () => void
  onComplete?: () => void
}

export default function AssessmentResults({ scores, onReset, onClearAll, onComplete }: AssessmentResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400"
    if (score >= 6) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Exceptional"
    if (score >= 8) return "Strong"
    if (score >= 7) return "Good"
    if (score >= 6) return "Developing"
    if (score >= 5) return "Emerging"
    return "Needs Attention"
  }

  const scoreMetrics = [
    {
      label: "Consciousness Level",
      score: scores.consciousnessLevel,
      icon: Brain,
      description: "Self-awareness & emotional intelligence",
    },
    {
      label: "Money Relationship",
      score: scores.moneyRelationship,
      icon: TrendingUp,
      description: "Abundance mindset & healthy money beliefs",
    },
    {
      label: "Self-Love Index",
      score: scores.selfLoveIndex,
      icon: Heart,
      description: "Self-worth & self-care practices",
    },
    {
      label: "Spiritual Connection",
      score: scores.spiritualConnection,
      icon: Sparkles,
      description: "Connection to divine/universe",
    },
    {
      label: "Healing Readiness",
      score: scores.healingReadiness,
      icon: Target,
      description: "Willingness to change & do the work",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <CardTitle className="text-3xl font-bold text-purple-300">Your Soul Wealth Score</CardTitle>
          <div className="text-6xl font-bold text-white mb-2">{scores.overallScore}/10</div>
          <Badge className={`text-lg px-4 py-2 ${getScoreColor(scores.overallScore)}`}>
            {getScoreLabel(scores.overallScore)}
          </Badge>
        </CardHeader>
      </Card>

      {/* Detailed Scores */}
      <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-300">Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scoreMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-indigo-400" />
                    <span className="font-medium text-indigo-200">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getScoreColor(metric.score)}`}>{metric.score}/10</span>
                    <Badge variant="outline" className="text-xs">
                      {getScoreLabel(metric.score)}
                    </Badge>
                  </div>
                </div>
                <Progress value={metric.score * 10} className="h-2" />
                <p className="text-sm text-indigo-300">{metric.description}</p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scores.insights.map((insight, index) => (
            <div key={index} className="p-3 bg-green-800/20 rounded-lg border border-green-500/20">
              <p className="text-green-200 leading-relaxed">💡 {insight}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scores.nextSteps.map((step, index) => (
            <div key={index} className="p-3 bg-yellow-800/20 rounded-lg border border-yellow-500/20">
              <p className="text-yellow-200 leading-relaxed">🎯 {step}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <p className="text-white text-lg">🔥 BOOM! Your Daily Essentials are now UNLOCKED</p>
        <p className="text-purple-200">Time to live this transformation every damn day</p>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => {
              if (onComplete) onComplete()
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg px-8 py-3"
          >
            🚀 Start Daily Practice
          </Button>
          <Button onClick={onReset} variant="outline" className="border-purple-500/50 text-purple-300">
            Journey Again
          </Button>
        </div>
      </div>
    </div>
  )
}
