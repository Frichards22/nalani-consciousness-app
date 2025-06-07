"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Brain, Sparkles, TrendingUp, Crown, RefreshCw, Loader2, Heart } from "lucide-react"

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
  const [showCelebration, setShowCelebration] = useState(false)

  const currentQuestion = deepAssessmentQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / deepAssessmentQuestions.length) * 100

  const handleResponse = (questionId: string, answer: string | number) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }))
    setApiError(null)
  }

  const getContextualCoaching = (question: any, response: string | number): string => {
    const responseText = typeof response === "string" ? response.toLowerCase() : response.toString()

    // First, acknowledge what they actually wrote with humor/personality
    let acknowledgment = ""

    // Handle funny/silly responses with ELI's humor
    if (responseText.includes("butt") || responseText.includes("ass")) {
      acknowledgment =
        "🍑 **HAHAHA! Money Butt?!** I'm DYING! You know what though, gorgeous? That cheeky response tells me you're not taking money too seriously - which is actually PERFECT. Most people are so wound up about money they can't even laugh about it. Your humor is a sign of emotional freedom around money. "
    } else if (responseText.includes("fuck") || responseText.includes("shit") || responseText.includes("damn")) {
      acknowledgment =
        "🔥 **I LOVE the raw honesty!** That uncensored response tells me you're done with the bullshit and ready for real talk. No spiritual bypassing here - you're keeping it 100. "
    } else if (responseText.includes("lol") || responseText.includes("haha") || responseText.includes("funny")) {
      acknowledgment =
        "😂 **Your sense of humor is EVERYTHING!** The fact that you can find lightness around money topics shows emotional resilience. "
    } else if (responseText.includes("idk") || responseText.includes("don't know") || responseText.includes("dunno")) {
      acknowledgment =
        "🤷‍♀️ **'I don't know' is actually the most honest answer!** Most people pretend they have it all figured out. Your honesty is refreshing. "
    } else if (responseText.length < 5) {
      acknowledgment = `💫 **'${response}' - short and sweet!** Sometimes the most profound truths come in the smallest packages. `
    } else {
      acknowledgment = `✨ **Thank you for sharing: "${response}"** - I can feel the authenticity in your words. `
    }

    // Then provide contextual coaching based on the question dimension
    switch (question.dimension) {
      case "Awareness":
        if (responseText.includes("butt") || responseText.includes("silly") || responseText.includes("funny")) {
          return (
            acknowledgment +
            "Here's the thing about using humor around consciousness work - it actually shows you're not attached to being 'spiritual' or perfect. That's advanced awareness! Most people think they need to be serious and deep all the time. Your playfulness tells me you understand that consciousness expansion can be FUN. **TRY THIS:** For the next week, approach your money practices with this same lightness. Laugh at your old patterns instead of judging them."
          )
        }
        return (
          acknowledgment +
          "Your inner awareness is like a muscle - the more you use it, the stronger it gets. **DO THIS NOW:** Set a phone alarm for 3 random times today. When it goes off, just notice: What am I thinking? What am I feeling? No judgment, just awareness. This builds your consciousness muscle."
        )

      case "Intuitive Connection":
        if (responseText.includes("butt") || responseText.includes("silly")) {
          return (
            acknowledgment +
            "You know what? Your silly response might actually BE your intuition talking! Sometimes our inner wisdom comes through humor, irreverence, or unexpected thoughts. **TRY THIS:** Next time you have a money decision to make, ask yourself 'What would Money Butt do?' and see what comes up. I'm serious - your intuition might speak through humor!"
          )
        }
        return (
          acknowledgment +
          "Your intuition is always speaking - we just need to learn its language. **PRACTICE THIS:** Before any decision today, put your hand on your heart and ask 'Does this feel expansive or contractive?' Trust the first sensation you get. This is from Chapter 4 of Make Up Sex with Money - your body never lies."
        )

      case "Money Origins":
        if (responseText.includes("butt") || responseText.includes("funny")) {
          return (
            acknowledgment +
            "Using humor around your money story is actually HEALING! It means you're not trapped in the trauma of it. **DO THIS:** Write down your earliest money memory, but tell it like a comedy sketch. What would be the funny parts? This helps you reclaim your power from old wounds. (This is a variation of the Money Wounds Inventory from the book!)"
          )
        }
        return (
          acknowledgment +
          "Your money story started before you could even speak. **HEALING PRACTICE:** Tonight, have a conversation with your inner child about money. Ask them: 'What did you learn about money that scared you?' Then tell them: 'I've got us now. We're safe to receive.' This rewires your nervous system at the root."
        )

      case "Abundance Capacity":
        if (responseText.includes("butt") || responseText.includes("panic") || responseText.includes("overwhelm")) {
          return (
            acknowledgment +
            "Whether it's 'Money Butt' or panic - both are your nervous system's way of handling big energy! **IMMEDIATE PRACTICE:** Do the 90-Second Fear Flush from the book: Breathe in for 4, hold for 4, out for 6. Repeat for 90 seconds while saying 'I am safe to receive abundance.' This literally rewires your amygdala's fear response."
          )
        }
        return (
          acknowledgment +
          "Your capacity to receive is like a muscle - it needs training. **START TODAY:** Practice receiving one small thing daily - a compliment, someone holding a door, a free sample. Say 'thank you' and FEEL it in your body. This expands your receiving frequency."
        )

      case "Sacred Communication":
        if (responseText.includes("butt") || responseText.includes("never") || responseText.includes("weird")) {
          return (
            acknowledgment +
            "Talking to money might feel weird, but you just proved you can be playful with money concepts! **TRY THIS TONIGHT:** Hold some cash and say 'Hey Money, sorry I called you Money Butt. Can we be friends?' See what happens. I bet money has a sense of humor too!"
          )
        }
        return (
          acknowledgment +
          "Money is conscious energy waiting for relationship. **SACRED PRACTICE:** Every morning for 7 days, hold your wallet and say 'Good morning, Money. How can we dance together today?' Listen for the answer. This is the Money Dialogue practice from Chapter 6."
        )

      case "Divine Partnership":
        if (responseText.includes("butt") || responseText.includes("don't")) {
          return (
            acknowledgment +
            "Even if you don't feel connected to the Divine, your humor shows you're connected to JOY - and joy IS divine! **EXPERIMENT:** For one week, treat coincidences as divine winks. When something funny or synchronistic happens, say 'Thanks, Universe!' Your playfulness is already a form of prayer."
          )
        }
        return (
          acknowledgment +
          "The Divine speaks through everything - including your intuition about money. **DAILY PRACTICE:** Each morning, ask 'How can I serve and prosper today?' Then follow the first impulse you get. This is co-creation in action."
        )

      default:
        return (
          acknowledgment +
          "Your authentic response is perfect information about where you are right now. **REMEMBER:** You're not broken, you're not behind. You're exactly where you need to be for your next breakthrough. Trust the process, gorgeous soul."
        )
    }
  }

  const getAIAnalysis = async () => {
    const response = responses[currentQuestion.id]
    if (!response) return

    // First show the contextual coaching immediately
    const coaching = getContextualCoaching(currentQuestion, response)
    const immediateResponse: AIResponse = {
      analysis: coaching,
      guidance:
        "Take a moment to let this sink in. Your response reveals so much about your consciousness and readiness for transformation.",
      nextSteps: [
        "Notice what resonates most in this coaching",
        "Feel into any resistance or excitement that comes up",
        "Trust that you're exactly where you need to be",
      ],
      consciousnessInsight:
        "Every response you give is perfect information about your current frequency and capacity for growth.",
      statAdjustments: { awareness: 2, courage: 3, selfLove: 2 },
      personalizedMessage: "You're not broken, gorgeous. You're breaking open. And that's where the magic happens.",
    }

    setCurrentAIResponse(immediateResponse)
    setShowAIResponse(true)

    // Apply stat adjustments
    const category = currentQuestion.category
    const newGains = { ...totalStatGains }
    if (!newGains[category]) newGains[category] = {}

    Object.entries(immediateResponse.statAdjustments).forEach(([stat, value]) => {
      newGains[category][stat] = (newGains[category][stat] || 0) + value
    })
    setTotalStatGains(newGains)
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

    // Create a summary based on responses
    const summary = {
      overallAnalysis:
        "Your consciousness assessment reveals a beautiful soul ready for transformation. You've shown courage in looking at your patterns, wisdom in your responses, and openness to growth. This is exactly what's needed for a complete money makeover.",
      strengthAreas: ["Willingness to look within", "Courage to face patterns", "Openness to transformation"],
      growthAreas: ["Expanding nervous system capacity", "Deepening self-love", "Trusting divine partnership"],
      personalizedGuidance:
        "Focus on daily practices that expand your capacity to receive. You're not broken - you're breaking open into your power.",
      recommendedPractices: [
        {
          title: "Money Meditation",
          description: "5 minutes daily talking to money as conscious energy",
          priority: "high",
        },
        {
          title: "Receiving Practice",
          description: "Allow yourself to receive one small gift daily",
          priority: "medium",
        },
      ],
      evolutionaryPath:
        "You're on the path from scarcity to sovereignty, from wounded to wealthy, from small to sacred.",
      personalizedMessage:
        "You are exactly where you need to be, gorgeous soul. Trust the process. Your breakthrough is coming.",
    }

    setAssessmentSummary(summary)
    setIsSummaryLoading(false)
  }

  const completeAssessment = async () => {
    setIsComplete(true)
    await generateAssessmentSummary()
    setShowResults(true)
    onUpdateStats(totalStatGains)
    setShowCelebration(true)
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
    setShowCelebration(false)
    if (onComplete) onComplete()
  }

  if (showResults) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader className="text-center p-4 md:p-6">
          <div className="text-6xl md:text-8xl mb-4">🌟</div>
          <CardTitle className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Assessment Complete!
          </CardTitle>
          <p className="text-lg md:text-2xl text-white mt-2 font-semibold">Time to Make Up with Money</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {isSummaryLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4" />
              <p className="text-lg text-purple-200 font-medium">ELI is channeling your personalized guidance...</p>
            </div>
          ) : assessmentSummary ? (
            <>
              <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-bold text-white">
                    <Brain className="h-6 w-6 text-indigo-400" />
                    Your Consciousness Profile
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
                  <p className="text-yellow-400 mt-2 font-medium">— ELI</p>
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
              <RefreshCw className="h-4 w-4" /> Reset Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showCelebration) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardContent className="p-8 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="text-8xl animate-bounce">🎉</div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              HELL YES, GORGEOUS SOUL!
            </h2>
            <div className="text-2xl text-white font-bold space-y-2">
              <p>You just completed your sacred money consciousness assessment!</p>
              <p className="text-purple-300">Time to make up with money... for real this time.</p>
            </div>

            <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-lg p-6">
              <p className="text-xl text-white italic leading-relaxed">
                "You're not broken. You were just conditioned. And now? Now you get to rewrite the whole damn story."
              </p>
              <p className="text-pink-400 mt-2 font-semibold">— ELI, Make Up Sex with Money</p>
            </div>

            <div className="space-y-3">
              <p className="text-lg text-white">🔥 Your Daily Essentials are now UNLOCKED</p>
              <p className="text-purple-200">
                Sacred practices designed to heal your money wounds and activate your abundance frequency
              </p>
            </div>

            <Button
              onClick={() => {
                setShowCelebration(false)
                if (onComplete) onComplete()
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-xl px-8 py-4 font-bold"
            >
              🚀 Let's Make Up with Money!
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
      <CardHeader className="p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 md:h-8 md:w-8 text-indigo-400" />
            <div>
              <CardTitle className="text-xl md:text-3xl text-white font-bold">ELI's Consciousness Assessment</CardTitle>
              <p className="text-gray-200 font-semibold text-sm md:text-base">
                Make Up Sex with Money • Deep consciousness calibration
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-sm md:text-lg px-3 md:px-4 py-1 md:py-2 font-bold text-center">
            {currentQuestionIndex + 1} / {deepAssessmentQuestions.length}
          </Badge>
        </div>

        <div className="mt-4 md:mt-6">
          <div className="flex justify-between text-xs md:text-sm mb-2">
            <span className="text-white font-semibold">Assessment Progress</span>
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
                  placeholder="Share your authentic experience... ELI will provide personalized coaching based on your response."
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

        {/* Coaching Response Section */}
        {showAIResponse && currentAIResponse && (
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bold text-white">
                <Heart className="h-6 w-6 text-green-400" />
                ELI's Personalized Coaching
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
              <div className="p-3 md:p-4 bg-green-800/20 rounded-lg border border-green-500/20">
                <div className="text-white font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {currentAIResponse.analysis}
                </div>
              </div>

              <div className="p-4 bg-pink-800/20 rounded-lg border border-pink-500/20">
                <h4 className="font-semibold text-pink-300 mb-2">💕 Personal Message from ELI:</h4>
                <p className="text-white italic text-lg font-medium leading-relaxed">
                  "{currentAIResponse.personalizedMessage}"
                </p>
              </div>
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
                <Heart className="h-4 w-4" />
                Get ELI's Coaching
              </Button>
            )}

            {showAIResponse && (
              <Button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 flex items-center justify-center gap-2 font-semibold text-sm md:text-base"
              >
                {currentQuestionIndex === deepAssessmentQuestions.length - 1 ? (
                  <>
                    Complete Assessment <Crown className="h-4 w-4" />
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
