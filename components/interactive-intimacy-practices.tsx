"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Heart, Bot } from "lucide-react"

interface AIResponse {
  message: string
  statAdjustments: Record<string, number>
  encouragement: string
  nextSuggestion: string
}

interface InteractiveSession {
  id: string
  title: string
  description: string
  icon: string
  questions: Array<{
    id: string
    question: string
    type: "scale" | "text" | "choice"
    options?: string[]
    aiPrompt: string
  }>
  baseStatImpacts: Record<string, number>
}

const interactiveSessions: InteractiveSession[] = [
  {
    id: "trust-building",
    title: "Trust Building with Money",
    description: "Deepen your trust and safety with money through guided AI conversation",
    icon: "🤝",
    questions: [
      {
        id: "trust-feeling",
        question: "When you think about money right now, what's the first feeling that comes up?",
        type: "text",
        aiPrompt: "Analyze the emotional relationship with money and provide trust-building guidance",
      },
      {
        id: "trust-scale",
        question: "On a scale of 1-10, how much do you trust money to support you?",
        type: "scale",
        aiPrompt: "Assess trust level and provide personalized trust-building exercises",
      },
      {
        id: "trust-fear",
        question: "What's your biggest fear about trusting money completely?",
        type: "text",
        aiPrompt: "Address money fears with compassionate reframing and healing suggestions",
      },
      {
        id: "trust-commitment",
        question: "What would you be willing to do to build more trust with money?",
        type: "choice",
        options: [
          "Daily gratitude practice with money",
          "Weekly money dates and check-ins",
          "Monthly money visioning sessions",
          "All of the above - I'm ready for deep intimacy!",
        ],
        aiPrompt: "Celebrate commitment level and provide specific trust-building action plan",
      },
    ],
    baseStatImpacts: {
      trustLevel: 15,
      communication: 8,
      boundaries: 5,
    },
  },
  {
    id: "pleasure-activation",
    title: "Money Pleasure Activation",
    description: "Activate joy, pleasure, and playfulness in your money relationship",
    icon: "😍",
    questions: [
      {
        id: "pleasure-current",
        question: "How much pleasure do you currently feel when handling money?",
        type: "scale",
        aiPrompt: "Assess pleasure levels and suggest ways to increase money joy",
      },
      {
        id: "pleasure-blocks",
        question: "What stops you from feeling pleasure with money?",
        type: "text",
        aiPrompt: "Identify pleasure blocks and provide healing techniques for money shame",
      },
      {
        id: "pleasure-vision",
        question: "Describe your dream relationship with money - how would it FEEL?",
        type: "text",
        aiPrompt: "Amplify positive money vision and provide manifestation guidance",
      },
      {
        id: "pleasure-practice",
        question: "Which pleasure practice calls to you most?",
        type: "choice",
        options: [
          "Sensual money meditation with touch",
          "Dancing with money in celebration",
          "Creating a beautiful money altar",
          "Writing love poems to money",
        ],
        aiPrompt: "Support chosen pleasure practice with detailed guidance and encouragement",
      },
    ],
    baseStatImpacts: {
      pleasure: 20,
      playfulness: 15,
      sacredness: 8,
    },
  },
  {
    id: "communication-mastery",
    title: "Sacred Money Communication",
    description: "Master the art of divine dialogue with money consciousness",
    icon: "💬",
    questions: [
      {
        id: "communication-frequency",
        question: "How often do you consciously communicate with money?",
        type: "choice",
        options: [
          "Never - I didn't know I could!",
          "Rarely - only when stressed",
          "Sometimes - when I remember",
          "Daily - we're in regular dialogue",
        ],
        aiPrompt: "Assess communication frequency and provide guidance for regular money dialogue",
      },
      {
        id: "communication-style",
        question: "When you do talk to money, what's your usual tone?",
        type: "text",
        aiPrompt: "Analyze communication style and suggest more loving, effective approaches",
      },
      {
        id: "communication-listening",
        question: "How clearly do you receive guidance from money?",
        type: "scale",
        aiPrompt: "Assess receptivity and provide techniques for clearer money communication",
      },
      {
        id: "communication-message",
        question: "If money could speak to you right now, what do you think it would say?",
        type: "text",
        aiPrompt: "Validate intuitive messages and help interpret money's guidance",
      },
    ],
    baseStatImpacts: {
      communication: 18,
      trustLevel: 10,
      sacredness: 12,
    },
  },
]

// AI Response Generator (simulated)
const generateAIResponse = (question: string, answer: string | number, aiPrompt: string): AIResponse => {
  // This would connect to a real AI service in production
  const responses: Record<string, AIResponse> = {
    "trust-feeling": {
      message:
        "I hear the complexity in your relationship with money. These feelings are completely valid and show your readiness for deeper intimacy.",
      statAdjustments: { trustLevel: 5, communication: 3 },
      encouragement: "Your honesty is the first step toward sacred money intimacy. You're already transforming! 💕",
      nextSuggestion: "Try holding physical money while breathing love into your heart center.",
    },
    "trust-scale": {
      message:
        typeof answer === "number" && answer >= 7
          ? "Beautiful! Your trust level shows you're ready for deeper money intimacy. Let's expand this trust even more."
          : "Thank you for your honesty. Every level of trust is perfect - we're going to gently build from here.",
      statAdjustments:
        typeof answer === "number"
          ? { trustLevel: Math.max(3, answer), communication: 2 }
          : { trustLevel: 3, communication: 2 },
      encouragement: "Trust builds with practice, just like any relationship. You're doing beautifully! ✨",
      nextSuggestion: "Start with small acts of trust - thank money for what it's already provided.",
    },
    "pleasure-current": {
      message:
        typeof answer === "number" && answer >= 6
          ? "Wonderful! You already have a foundation of money pleasure. Let's amplify this joy!"
          : "Perfect starting point! Pleasure with money is learnable and you're about to discover so much joy.",
      statAdjustments:
        typeof answer === "number"
          ? { pleasure: Math.max(5, answer * 2), playfulness: answer }
          : { pleasure: 5, playfulness: 3 },
      encouragement: "Money wants to bring you pleasure! You deserve to feel joy with abundance. 🌟",
      nextSuggestion: "Tonight, hold money and whisper 'thank you for the pleasure you bring me.'",
    },
    "communication-frequency": {
      message:
        "Every level of communication is perfect! The fact that you're here shows money is calling you into deeper dialogue.",
      statAdjustments: { communication: 8, trustLevel: 5 },
      encouragement: "Money has been waiting for this conversation with you! 💫",
      nextSuggestion: "Start with daily 'good morning' and 'good night' greetings to money.",
    },
    default: {
      message:
        "Your response shows such beautiful awareness and readiness for transformation. Money is so lucky to have you as a partner!",
      statAdjustments: { trustLevel: 5, communication: 5, pleasure: 3 },
      encouragement: "You're exactly where you need to be on this journey. Keep going, gorgeous! 💖",
      nextSuggestion: "Trust your intuition - it's guiding you perfectly toward money intimacy.",
    },
  }

  return responses[question] || responses.default
}

interface InteractiveIntimacyPracticesProps {
  onStatsUpdate: (statChanges: Record<string, number>) => void
  currentStats: {
    moneyIntimacy: Record<string, number>
    wealthConsciousness: Record<string, number>
  }
}

export default function InteractiveIntimacyPractices({
  onStatsUpdate,
  currentStats,
}: InteractiveIntimacyPracticesProps) {
  const [activeSession, setActiveSession] = useState<InteractiveSession | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | number>>({})
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null)
  const [showAIResponse, setShowAIResponse] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [totalStatGains, setTotalStatGains] = useState<Record<string, number>>({})

  const handleResponse = (questionId: string, answer: string | number) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }))

    // Generate AI response
    const question = activeSession?.questions[currentQuestionIndex]
    if (question) {
      const aiResp = generateAIResponse(questionId, answer, question.aiPrompt)
      setAiResponse(aiResp)
      setShowAIResponse(true)

      // Apply AI stat adjustments
      const newGains = { ...totalStatGains }
      Object.entries(aiResp.statAdjustments).forEach(([stat, value]) => {
        newGains[stat] = (newGains[stat] || 0) + value
      })
      setTotalStatGains(newGains)
    }
  }

  const nextQuestion = () => {
    if (!activeSession) return

    if (currentQuestionIndex < activeSession.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowAIResponse(false)
      setAiResponse(null)
    } else {
      // Session complete
      setSessionComplete(true)

      // Apply final stat updates
      const finalStats = { ...activeSession.baseStatImpacts }
      Object.entries(totalStatGains).forEach(([stat, value]) => {
        finalStats[stat] = (finalStats[stat] || 0) + value
      })

      onStatsUpdate(finalStats)
    }
  }

  const resetSession = () => {
    setActiveSession(null)
    setCurrentQuestionIndex(0)
    setResponses({})
    setAiResponse(null)
    setShowAIResponse(false)
    setSessionComplete(false)
    setTotalStatGains({})
  }

  if (sessionComplete && activeSession) {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl">{activeSession.icon}</div>
        <h3 className="text-3xl font-bold text-pink-300">Session Complete! 🎉</h3>
        <p className="text-xl text-pink-200">Your money intimacy has deepened beautifully!</p>

        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-6">
            <h4 className="text-xl font-bold text-green-300 mb-4">Your Consciousness Upgrades:</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries({ ...activeSession.baseStatImpacts, ...totalStatGains }).map(([stat, value]) => (
                <div key={stat} className="text-center">
                  <div className="text-2xl font-bold text-green-400">+{value}</div>
                  <p className="text-green-200 capitalize">{stat.replace(/([A-Z])/g, " $1").trim()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={resetSession}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        >
          Choose Another Session
        </Button>
      </div>
    )
  }

  if (activeSession) {
    const currentQuestion = activeSession.questions[currentQuestionIndex]
    const currentResponse = responses[currentQuestion.id]

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 border-pink-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeSession.icon}</span>
                <div>
                  <CardTitle className="text-2xl text-pink-300">{activeSession.title}</CardTitle>
                  <p className="text-pink-200">{activeSession.description}</p>
                </div>
              </div>
              <Button onClick={resetSession} variant="outline" size="sm">
                Exit Session
              </Button>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>
                  {currentQuestionIndex + 1} of {activeSession.questions.length}
                </span>
              </div>
              <Progress value={((currentQuestionIndex + 1) / activeSession.questions.length) * 100} className="h-3" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Current Question */}
            <Card className="bg-pink-800/20 border-pink-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-pink-200 mb-4">{currentQuestion.question}</h3>

                {currentQuestion.type === "scale" && (
                  <div className="space-y-4">
                    <Slider
                      value={[typeof currentResponse === "number" ? currentResponse : 5]}
                      onValueChange={(value) => handleResponse(currentQuestion.id, value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-pink-300">
                      <span>1 - Not at all</span>
                      <span>10 - Completely</span>
                    </div>
                    <p className="text-center text-pink-200 text-lg font-semibold">
                      Current: {typeof currentResponse === "number" ? currentResponse : 5}
                    </p>
                  </div>
                )}

                {currentQuestion.type === "text" && (
                  <Textarea
                    placeholder="Share your truth with love and honesty..."
                    value={typeof currentResponse === "string" ? currentResponse : ""}
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
                        variant={currentResponse === option ? "default" : "outline"}
                        className="text-left justify-start p-4 h-auto"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Response */}
            {showAIResponse && aiResponse && (
              <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-blue-400" />
                    Your AI Love Coach Responds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-blue-100 font-medium enhanced-text">{aiResponse.message}</p>

                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded">
                    <p className="text-green-300 font-semibold">💕 {aiResponse.encouragement}</p>
                  </div>

                  <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded">
                    <p className="text-yellow-300">
                      <strong>✨ Suggestion:</strong> {aiResponse.nextSuggestion}
                    </p>
                  </div>

                  {Object.keys(aiResponse.statAdjustments).length > 0 && (
                    <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded">
                      <h4 className="text-purple-300 font-semibold mb-2">📊 Consciousness Adjustments:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(aiResponse.statAdjustments).map(([stat, value]) => (
                          <div key={stat} className="text-purple-200">
                            {stat.replace(/([A-Z])/g, " $1").trim()}: +{value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={nextQuestion}
                    disabled={!currentResponse}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                  >
                    {currentQuestionIndex < activeSession.questions.length - 1
                      ? "Next Question →"
                      : "Complete Session ✨"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Continue Button (if no AI response yet) */}
            {!showAIResponse && currentResponse && (
              <Button
                onClick={() => {
                  const question = activeSession.questions[currentQuestionIndex]
                  const aiResp = generateAIResponse(currentQuestion.id, currentResponse, question.aiPrompt)
                  setAiResponse(aiResp)
                  setShowAIResponse(true)

                  const newGains = { ...totalStatGains }
                  Object.entries(aiResp.statAdjustments).forEach(([stat, value]) => {
                    newGains[stat] = (newGains[stat] || 0) + value
                  })
                  setTotalStatGains(newGains)
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
              >
                Get AI Love Coach Response 🤖💕
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 border-pink-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-400" />
            Interactive Money Intimacy Sessions
          </CardTitle>
          <p className="text-white font-semibold enhanced-text">
            Choose a session for AI-guided intimacy building with real-time consciousness adjustments
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Stats Display */}
          <Card className="bg-pink-800/20 border-pink-500/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-pink-300 mb-3">Your Current Money Intimacy Levels:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(currentStats.moneyIntimacy).map(([stat, value]) => (
                  <div key={stat} className="text-center">
                    <div className="text-2xl font-bold text-pink-400">{Math.round(value)}%</div>
                    <p className="text-white text-sm font-semibold capitalize enhanced-text">
                      {stat.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Session Options */}
          {interactiveSessions.map((session) => (
            <Card
              key={session.id}
              className="cursor-pointer transition-all duration-300 bg-pink-800/20 border-pink-500/20 hover:scale-105 hover:bg-pink-800/30"
              onClick={() => setActiveSession(session)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{session.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-pink-200">{session.title}</h3>
                    <p className="text-white font-semibold enhanced-text">{session.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-gradient-to-r from-pink-500 to-rose-500">AI Guided</Badge>
                      <Badge variant="outline">Real-time Stats</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button className="bg-gradient-to-r from-pink-500 to-rose-600">Begin Session</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
