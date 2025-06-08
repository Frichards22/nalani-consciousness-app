"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, Sparkles, TrendingUp, Crown, Loader2 } from "lucide-react"
import { scoreAssessment, type AssessmentScores } from "@/lib/ai/assessment-scorer"
import { getRandomQuote } from "@/lib/book-quotes"
import AssessmentResults from "./assessment-results"

// The 7 Stages from "Make Up Sex with Money"
const bookStages = [
  {
    id: "stage-1",
    title: "Stage 1: The Breakup",
    subtitle: "Recognizing Your Money Wounds",
    description:
      "Every relationship with money starts with acknowledging what's broken. This is where we get honest about the pain.",
    question: "What's your biggest money wound? The story you tell yourself about why you can't have what you want?",
    getQuote: () => getRandomQuote("stage-1"),
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
    getQuote: () => getRandomQuote("stage-2"),
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
    getQuote: () => getRandomQuote("stage-3"),
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
    getQuote: () => getRandomQuote("stage-4"),
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
    getQuote: () => getRandomQuote("stage-5"),
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
    getQuote: () => getRandomQuote("stage-6"),
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
    getQuote: () => getRandomQuote("stage-7"),
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

export default function SoulWealthAssessment({ onComplete }: SoulWealthAssessmentProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [showBookWisdom, setShowBookWisdom] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<string>("")
  const [isLoadingWisdom, setIsLoadingWisdom] = useState(false)
  const [bookWisdom, setBookWisdom] = useState<string>("")
  const [assessmentScores, setAssessmentScores] = useState<AssessmentScores | null>(null)
  const [isScoring, setIsScoring] = useState(false)

  const currentStage = bookStages[currentStageIndex]
  const progress = ((currentStageIndex + 1) / bookStages.length) * 100

  const handleResponse = (stageId: string, answer: string) => {
    setResponses((prev) => ({ ...prev, [stageId]: answer }))
  }

  const getBookWisdom = async () => {
    const response = responses[currentStage.id]
    if (!response || response.length < 10) return

    setIsLoadingWisdom(true)

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

      if (data.response) {
        setBookWisdom(data.response)
        setShowBookWisdom(true)
      }
    } catch (error) {
      console.error("Error getting book wisdom:", error)
      // Fallback to stage-specific wisdom
      setBookWisdom(`Beautiful soul, your response to ${currentStage.title} shows you're ready for deep transformation. ${currentStage.bookQuote} 

Your next step is to choose one of the exercises and commit to it for the next 7 days. This is how real change happens - one conscious choice at a time.`)
      setShowBookWisdom(true)
    }

    setIsLoadingWisdom(false)
  }

  const nextStage = async () => {
    if (currentStageIndex < bookStages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1)
      setShowBookWisdom(false)
      setBookWisdom("")
      setSelectedExercise("")
    } else {
      // Assessment completed - get AI scoring
      setIsScoring(true)
      try {
        const scores = await scoreAssessment(responses)
        setAssessmentScores(scores)
      } catch (error) {
        console.error("Scoring failed:", error)
      }
      setIsScoring(false)
      setIsComplete(true)
      if (onComplete) onComplete()
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
  }

  const clearAll = () => {
    setCurrentStageIndex(0)
    setResponses({})
    setShowBookWisdom(false)
    setIsComplete(false)
    setSelectedExercise("")
    setBookWisdom("")
    setAssessmentScores(null)
    // Clear localStorage
    localStorage.removeItem("eli-assessment-completed")
    localStorage.removeItem("eli-chat-history")
  }

  if (isComplete && assessmentScores) {
    return <AssessmentResults scores={assessmentScores} onReset={resetAssessment} onClearAll={clearAll} />
  }

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
              placeholder="Share your truth here... ELI's wisdom from the book will guide you."
              value={responses[currentStage.id] || ""}
              onChange={(e) => handleResponse(currentStage.id, e.target.value)}
              className="w-full min-h-[120px] text-lg p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Book Quote */}
            <div className="p-4 bg-yellow-800/20 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-200 italic leading-relaxed">{currentStage.getQuote()}</p>
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
                Wisdom from "Make Up Sex with Money"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-green-800/20 rounded-lg">
                <p className="text-white leading-relaxed whitespace-pre-line">{bookWisdom}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={() => {
              if (currentStageIndex > 0) {
                setCurrentStageIndex(currentStageIndex - 1)
                setShowBookWisdom(false)
                setBookWisdom("")
              }
            }}
            disabled={currentStageIndex === 0}
            variant="outline"
          >
            ← Previous Stage
          </Button>

          <div className="flex gap-3">
            {!showBookWisdom && responses[currentStage.id] && responses[currentStage.id].length > 10 && (
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

            {showBookWisdom && (
              <Button onClick={nextStage} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                {currentStageIndex === bookStages.length - 1 ? (
                  <>
                    Complete Journey <Crown className="h-4 w-4 ml-2" />
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
              className={`h-2 w-8 rounded ${
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
