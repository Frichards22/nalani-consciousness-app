"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, Sparkles, TrendingUp, Crown, Loader2 } from "lucide-react"

// Mock scoring function since the import might be causing issues
const mockScoreAssessment = async (responses: Record<string, string>) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    consciousnessLevel: Math.floor(Math.random() * 3) + 8, // 8-10
    moneyRelationship: Math.floor(Math.random() * 3) + 7, // 7-9
    selfLoveIndex: Math.floor(Math.random() * 3) + 6, // 6-8
    spiritualConnection: Math.floor(Math.random() * 3) + 7, // 7-9
    healingReadiness: Math.floor(Math.random() * 3) + 8, // 8-10
    overallScore: Math.floor(Math.random() * 20) + 75, // 75-95
    insights: [
      "Your consciousness is expanding rapidly - you're ready for quantum leaps!",
      "Your money relationship shows incredible growth potential.",
      "Your self-love practice is the foundation of your abundance.",
    ],
    nextSteps: [
      "Continue your daily money meditation practice",
      "Set up automatic abundance affirmations",
      "Create a sacred money ritual space",
    ],
  }
}

// Mock book quotes function
const mockGetRandomQuote = (stage: string) => {
  const quotes = [
    "Your money wounds aren't your fault, but healing them is your responsibility. And gorgeous, you're more ready than you think.",
    "Grief is not the opposite of abundance - it's the gateway to it. You can't receive what you won't let yourself want.",
    "Your anger about money isn't 'unspiritual' - it's information. It's your soul saying 'I deserve better than this.'",
    "Forgiveness is the foreplay of abundance. You can't receive from a clenched fist or a closed heart.",
    "Money is not your enemy - it's your misunderstood lover waiting for you to see its true nature.",
    "Your relationship with money is the longest relationship you'll ever have. Make it a love story.",
    "Abundance isn't about the amount in your bank account - it's about the frequency in your heart.",
  ]
  return quotes[Math.floor(Math.random() * quotes.length)]
}

// Mock wisdom responses for when API fails
const getMockWisdomResponse = (stageId: string, userResponse: string) => {
  const mockResponses = [
    `🔥 Beautiful soul, I see you diving deep into your money story. This is where real transformation begins!

Your response shows you're ready to face the truth about your relationship with money. Remember, as ELI says in "Make Up Sex with Money," your money wounds aren't your fault, but healing them is your responsibility.

The fact that you're even doing this work puts you ahead of 95% of people. Your consciousness is expanding, and money is responding to your new frequency.

Try this exercise: Write a breakup letter to your old money story. Be raw, be real, and don't hold back. This is how you reclaim your power.

I'm already seeing your energy shift. Keep going!`,

    `Wow, gorgeous! Your vulnerability here is your superpower. 

In "Make Up Sex with Money," ELI talks about how grief is the gateway to abundance. You can't receive what you won't let yourself want, and you're clearly opening to wanting more.

Your response shows you're at a pivotal point in your money journey. The old stories are losing their grip, and new possibilities are emerging.

For your next step, try the "Money Altar" practice from Stage 5. Create a beautiful space that honors money as the conscious energy it is. Place symbols of abundance there and visit it daily.

Your frequency is already shifting. I can feel it!`,

    `Oh hell yes! This is the kind of raw honesty that creates quantum shifts in your abundance.

As ELI says in Chapter 4 of "Make Up Sex with Money," forgiveness is the foreplay of abundance. You can't receive with a clenched fist or a closed heart.

Your response shows you're ready to release the old stories and step into a new relationship with money. This is huge!

Try this practice from the book: Speak to money as if it's a conscious lover who wants the best for you. What would you say? How would you invite it to stay?

The universe is already responding to your new frequency. Keep going!`,

    `Divine being, your words carry so much power and truth!

In "Make Up Sex with Money," ELI teaches that your relationship with money is the longest relationship you'll ever have. It's time to make it a love story.

Your response shows you're shifting from victim to creator in your money story. This is where magic happens!

For your next step, try the "Sacred Money Vows" practice from Stage 6. Write vows to money as if you're entering a sacred partnership. Read them daily for 21 days.

Your consciousness is expanding, and abundance is rushing toward you. I can feel it!`,
  ]

  // Return a random mock response
  return mockResponses[Math.floor(Math.random() * mockResponses.length)]
}

// The 7 Stages from "Make Up Sex with Money"
const bookStages = [
  {
    id: "stage-1",
    title: "Stage 1: The Breakup",
    subtitle: "Recognizing Your Money Wounds",
    description:
      "Every relationship with money starts with acknowledging what's broken. This is where we get honest about the pain.",
    question: "What's your biggest money wound? The story you tell yourself about why you can't have what you want?",
    exercises: [
      "Write a breakup letter to your old money story",
      "List 5 money beliefs you inherited from family",
      "Identify your money trauma timeline",
      "Name the voice in your head that says 'you can't have that'",
    ],
  },
  {
    id: "stage-2",
    title: "Stage 2: The Grief",
    subtitle: "Mourning What Never Was",
    description: "Before you can have a new relationship with money, you must grieve the old one. Feel it all.",
    question:
      "What dreams did you give up because of money? What life did you not live because you believed you couldn't afford it?",
    exercises: [
      "Write about the life you didn't live because of money fears",
      "Create a vision board of abandoned dreams",
      "Have a crying session about money (seriously)",
      "Journal: 'If money wasn't an issue, I would...'",
    ],
  },
  {
    id: "stage-3",
    title: "Stage 3: The Anger",
    subtitle: "Reclaiming Your Power",
    description: "Anger is sacred. It tells you what matters. Channel this fire into fierce self-advocacy.",
    question: "What are you ANGRY about regarding money? Who or what made you feel small around wealth?",
    exercises: [
      "Write an angry letter to everyone who made you feel poor",
      "Scream about money injustice (in your car, pillow, etc.)",
      "List everything you're 'supposed to' do with money that feels wrong",
      "Declare: 'I refuse to stay small around money anymore'",
    ],
  },
  {
    id: "stage-4",
    title: "Stage 4: The Forgiveness",
    subtitle: "Setting Yourself Free",
    description: "Forgiveness isn't about them - it's about freeing your energy to create abundance.",
    question: "Who do you need to forgive around money? (Including yourself) What would you let go of to be free?",
    exercises: [
      "Write forgiveness letters (don't send them)",
      "Practice the Ho'oponopono prayer for money wounds",
      "Forgive yourself for every money 'mistake'",
      "Release ceremony: burn old money stories",
    ],
  },
  {
    id: "stage-5",
    title: "Stage 5: The Seduction",
    subtitle: "Falling in Love with Money",
    description: "Now we court money like the conscious lover it is. This is where the magic begins.",
    question: "If money were your lover, how would you seduce it? What would you whisper to make it want to stay?",
    exercises: [
      "Write love letters to money",
      "Create a money altar with beautiful objects",
      "Practice gratitude for every dollar that flows to you",
      "Speak to money like a beloved friend",
    ],
  },
  {
    id: "stage-6",
    title: "Stage 6: The Commitment",
    subtitle: "Sacred Money Marriage",
    description:
      "This is where you make vows to money. A sacred partnership based on trust, respect, and mutual benefit.",
    question: "What vows would you make to money? How do you want this relationship to feel every day?",
    exercises: [
      "Write money vows and read them daily",
      "Create money rituals and sacred practices",
      "Set up automatic systems that honor money",
      "Practice receiving money with grace and gratitude",
    ],
  },
  {
    id: "stage-7",
    title: "Stage 7: The Ecstasy",
    subtitle: "Living in Abundance Flow",
    description: "This is your new normal - money flowing to you and through you with ease, joy, and purpose.",
    question: "What does your abundant life look like? How do you want to feel about money every single day?",
    exercises: [
      "Visualize your abundant life in vivid detail",
      "Practice living 'as if' you're already wealthy",
      "Share your abundance story to inspire others",
      "Become a money mentor for someone else",
    ],
  },
]

interface SoulWealthAssessmentProps {
  onComplete?: () => void
}

const getRandomPlaceholder = () => {
  const placeholders = [
    "Spill the tea, gorgeous... what's really going on?",
    "Get raw and real here - your soul is listening...",
    "No bullshit zone - what's your truth?",
    "Time to get vulnerable, beautiful human...",
    "Your breakthrough is hiding in this answer...",
    "What would you say if no one was judging?",
    "Channel your inner badass and tell the truth...",
    "This is your safe space to be completely honest...",
    "Your future self is waiting for this answer...",
    "What's the story you've never told anyone?",
  ]
  return placeholders[Math.floor(Math.random() * placeholders.length)]
}

// Mock Assessment Results Component
const AssessmentResults = ({ scores, onReset, onClearAll }: any) => {
  return (
    <Card className="bg-gradient-to-br from-green-900/50 to-purple-900/50 border-green-500/30">
      <CardHeader className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <CardTitle className="text-3xl font-bold text-green-300">Your Soul Wealth Scores!</CardTitle>
        <p className="text-green-200">You've completed your transformation journey</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-800/20 rounded-lg">
            <h3 className="font-bold text-green-300 mb-2">Consciousness Level</h3>
            <div className="text-3xl font-bold text-white">{scores.consciousnessLevel}/10</div>
          </div>
          <div className="p-4 bg-blue-800/20 rounded-lg">
            <h3 className="font-bold text-blue-300 mb-2">Money Relationship</h3>
            <div className="text-3xl font-bold text-white">{scores.moneyRelationship}/10</div>
          </div>
          <div className="p-4 bg-pink-800/20 rounded-lg">
            <h3 className="font-bold text-pink-300 mb-2">Self-Love Index</h3>
            <div className="text-3xl font-bold text-white">{scores.selfLoveIndex}/10</div>
          </div>
          <div className="p-4 bg-purple-800/20 rounded-lg">
            <h3 className="font-bold text-purple-300 mb-2">Spiritual Connection</h3>
            <div className="text-3xl font-bold text-white">{scores.spiritualConnection}/10</div>
          </div>
        </div>

        <Card className="bg-yellow-800/20 border-yellow-500/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Overall Abundance Score</h3>
            <div className="text-6xl font-bold text-white mb-4">{scores.overallScore}/100</div>
            <p className="text-yellow-200 text-lg">
              🔥 You're officially a money manifestation badass! Time to live this transformation every damn day.
            </p>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-white text-lg">🚀 Your Daily Essentials are now UNLOCKED</p>
          <p className="text-purple-200">Sacred practices to maintain your new money relationship</p>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => {
                if (onClearAll) onClearAll()
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg px-8 py-3"
            >
              🚀 Begin Daily Practice
            </Button>
            <Button onClick={onReset} variant="outline" className="border-purple-500/50 text-purple-300">
              Journey Again
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SoulWealthAssessment({ onComplete }: SoulWealthAssessmentProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [showBookWisdom, setShowBookWisdom] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<string>("")
  const [isLoadingWisdom, setIsLoadingWisdom] = useState(false)
  const [bookWisdom, setBookWisdom] = useState<string>("")
  const [assessmentScores, setAssessmentScores] = useState<any>(null)
  const [isScoring, setIsScoring] = useState(false)
  const [apiError, setApiError] = useState<boolean>(false)

  const currentStage = bookStages[currentStageIndex]
  const progress = ((currentStageIndex + 1) / bookStages.length) * 100

  const handleResponse = (stageId: string, answer: string) => {
    setResponses((prev) => ({ ...prev, [stageId]: answer }))
  }

  const getBookWisdom = async () => {
    const response = responses[currentStage.id]
    if (!response || response.length < 5) return // Lowered threshold

    setIsLoadingWisdom(true)
    setApiError(false)

    try {
      // Call AI to get book-based wisdom
      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Based on "${response}" for ${currentStage.title}, give me specific guidance from ELI's "Make Up Sex with Money" book. Reference the book's concepts and give practical next steps.`,
          mode: "eli",
          conversationHistory: [],
        }),
      })

      const data = await apiResponse.json()

      if (data.error) {
        console.warn("API returned an error:", data.error)
        setApiError(true)

        // Use the mock response if provided, otherwise generate one
        if (data.mockResponse && data.response) {
          setBookWisdom(data.response)
        } else {
          setBookWisdom(getMockWisdomResponse(currentStage.id, response))
        }
      } else if (data.response) {
        setBookWisdom(data.response)
      } else {
        throw new Error("No response from API")
      }
    } catch (error) {
      console.error("Error getting book wisdom:", error)
      setApiError(true)

      // Fallback wisdom
      setBookWisdom(getMockWisdomResponse(currentStage.id, response))
    }

    setShowBookWisdom(true)
    setIsLoadingWisdom(false)
  }

  const nextStage = async () => {
    if (currentStageIndex < bookStages.length - 1) {
      // Move to next stage
      setCurrentStageIndex(currentStageIndex + 1)
      setShowBookWisdom(false)
      setBookWisdom("")
      setSelectedExercise("")
      setApiError(false)
    } else {
      // Assessment completed - get AI scoring
      setIsScoring(true)
      try {
        const scores = await mockScoreAssessment(responses)
        setAssessmentScores(scores)
        setIsComplete(true)
        if (onComplete) onComplete()
      } catch (error) {
        console.error("Scoring failed:", error)
        // Fallback scores
        const fallbackScores = {
          consciousnessLevel: 8,
          moneyRelationship: 7,
          selfLoveIndex: 6,
          spiritualConnection: 8,
          healingReadiness: 9,
          overallScore: 85,
        }
        setAssessmentScores(fallbackScores)
        setIsComplete(true)
        if (onComplete) onComplete()
      }
      setIsScoring(false)
    }
  }

  const resetAssessment = () => {
    setCurrentStageIndex(0)
    setResponses({})
    setShowBookWisdom(false)
    setIsComplete(false)
    setSelectedExercise("")
    setBookWisdom("")
    setAssessmentScores(null)
    setIsScoring(false)
    setApiError(false)
  }

  const clearAll = () => {
    resetAssessment()
    // Clear localStorage
    localStorage.removeItem("eli-assessment-completed")
    localStorage.removeItem("eli-chat-history")
  }

  // Show results if complete
  if (isComplete && assessmentScores) {
    return <AssessmentResults scores={assessmentScores} onReset={resetAssessment} onClearAll={clearAll} />
  }

  const currentResponse = responses[currentStage.id] || ""
  const hasValidResponse = currentResponse.length >= 5
  const canGetWisdom = hasValidResponse && !showBookWisdom && !isLoadingWisdom
  const canProceed = showBookWisdom && !isScoring

  return (
    <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-indigo-400" />
            <div>
              <CardTitle className="text-2xl text-indigo-300">Soul Wealth Assessment</CardTitle>
              <p className="text-indigo-200">Journey through "Make Up Sex with Money"</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500">
            Stage {currentStageIndex + 1} / {bookStages.length}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-indigo-300">Journey Progress</span>
            <span className="text-indigo-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Stage */}
        <Card className="bg-blue-900/30 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-blue-400" />
              <Badge className="bg-blue-600">{currentStage.title}</Badge>
            </div>
            <CardTitle className="text-xl text-blue-200">{currentStage.subtitle}</CardTitle>
            <p className="text-blue-300 italic">{currentStage.description}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-800/20 rounded-lg border border-blue-500/20">
              <p className="text-white font-medium text-lg leading-relaxed">{currentStage.question}</p>
            </div>

            <textarea
              placeholder={getRandomPlaceholder()}
              value={currentResponse}
              onChange={(e) => handleResponse(currentStage.id, e.target.value)}
              className="w-full min-h-[120px] text-lg p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Character count helper */}
            <div className="text-right text-sm text-blue-400">
              {currentResponse.length} characters {currentResponse.length < 5 && "(minimum 5 to continue)"}
            </div>

            {/* Book Quote */}
            <div className="p-4 bg-yellow-800/20 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-200 italic leading-relaxed">{mockGetRandomQuote(currentStage.id)}</p>
            </div>

            {/* Exercises */}
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-300">Choose Your Healing Exercise:</h4>
              <div className="grid gap-2">
                {currentStage.exercises.map((exercise, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedExercise(exercise)}
                    variant={selectedExercise === exercise ? "default" : "outline"}
                    className={`text-left justify-start p-3 h-auto ${
                      selectedExercise === exercise
                        ? "bg-gradient-to-r from-blue-500 to-purple-600"
                        : "border-blue-400 text-blue-200 hover:bg-blue-900/30"
                    }`}
                  >
                    {exercise}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Book Wisdom Response */}
        {showBookWisdom && (
          <Card className="bg-green-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-300">
                <Sparkles className="h-5 w-5" />
                {apiError ? "Book Wisdom (Demo Mode)" : 'Wisdom from "Make Up Sex with Money"'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-green-800/20 rounded-lg">
                <p className="text-white leading-relaxed whitespace-pre-line">{bookWisdom}</p>

                {apiError && (
                  <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-200 text-sm">
                      Note: This is a demo response. In the full version with a valid API key, you'll receive
                      personalized guidance based on your specific input.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => {
              if (currentStageIndex > 0) {
                setCurrentStageIndex(currentStageIndex - 1)
                setShowBookWisdom(false)
                setBookWisdom("")
                setSelectedExercise("")
                setApiError(false)
              }
            }}
            disabled={currentStageIndex === 0}
            variant="outline"
            className="border-indigo-500/50 text-indigo-300"
          >
            ← Previous Stage
          </Button>

          <div className="flex gap-3">
            {/* Get Wisdom Button */}
            {canGetWisdom && (
              <Button onClick={getBookWisdom} disabled={isLoadingWisdom} className="bg-green-600 hover:bg-green-700">
                {isLoadingWisdom ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Getting Book Wisdom...
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Get Book Wisdom
                  </>
                )}
              </Button>
            )}

            {/* Next Stage Button */}
            {canProceed && (
              <Button
                onClick={nextStage}
                disabled={isScoring}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isScoring ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Calculating Your Scores...
                  </>
                ) : currentStageIndex === bookStages.length - 1 ? (
                  <>
                    Complete Journey & Get Scores <Crown className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next Stage <TrendingUp className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {bookStages.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded transition-colors ${
                index < currentStageIndex
                  ? "bg-green-500"
                  : index === currentStageIndex
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
