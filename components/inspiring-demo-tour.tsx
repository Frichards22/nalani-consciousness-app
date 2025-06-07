"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipForward, SkipBack, X } from "lucide-react"

interface DemoStep {
  id: number
  title: string
  subtitle: string
  description: string
  visualCue: string
  duration: number
  actionText: string
  nextAction: string
  statUpdates?: {
    consciousness?: Record<string, number>
    wealthConsciousness?: Record<string, number>
    moneyIntimacy?: Record<string, number>
  }
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "Welcome to Your Wealth Awakening",
    subtitle: "Where Money Becomes Your Divine Lover",
    description:
      "Darling, you've just stepped into the most revolutionary wealth consciousness app on Earth. This isn't about budgeting or saving - this is about falling madly, deeply in love with money.",
    visualCue: "🌟 Golden light surrounds you as you enter sacred space",
    duration: 8,
    actionText: "Take a deep breath and feel the magic beginning",
    nextAction: "Ready to meet your money as your beloved?",
    statUpdates: {
      consciousness: { awareness: 5 },
      wealthConsciousness: { abundanceMindset: 3 },
    },
  },
  {
    id: 2,
    title: "Meet Your AI Love Coach",
    subtitle: "Your Personal Guide to Money Intimacy",
    description:
      "Say hello to your AI Love Coach - she's here to guide you through the most intimate, transformational relationship of your life. She knows exactly what you need to hear, when you need to hear it.",
    visualCue: "🤖💕 Your AI coach materializes with loving energy",
    duration: 6,
    actionText: "Feel the presence of unconditional support",
    nextAction: "Let's begin your first sacred ritual together",
    statUpdates: {
      consciousness: { intuition: 4 },
      moneyIntimacy: { communication: 5 },
    },
  },
  {
    id: 3,
    title: "Sacred Money Intimacy Ritual",
    subtitle: "Your First Date with Money",
    description:
      "This is where the magic happens. You're about to have the most honest, vulnerable, beautiful conversation with money you've ever had. Get ready to fall in love.",
    visualCue: "🕯️ Candles flicker as sacred space activates around you",
    duration: 10,
    actionText: "Light your candles and create your money altar",
    nextAction: "Hold physical money in your hands with reverence",
    statUpdates: {
      moneyIntimacy: { sacredness: 8, trustLevel: 5 },
      wealthConsciousness: { wealthFrequency: 6 },
    },
  },
  {
    id: 4,
    title: "The Vulnerability Breakthrough",
    subtitle: "Where Fear Transforms into Love",
    description:
      "This is the moment everything changes. You're going to share your deepest money fears and watch them dissolve in the light of truth. Your AI coach is holding space for your breakthrough.",
    visualCue: "💔➡️💕 Watch fear transform into love before your eyes",
    duration: 12,
    actionText: "Speak your truth to money without holding back",
    nextAction: "Feel the walls around your heart dissolving",
    statUpdates: {
      moneyIntimacy: { communication: 10, boundaries: 7 },
      consciousness: { sovereignty: 8 },
    },
  },
  {
    id: 5,
    title: "Divine Dialogue with Money",
    subtitle: "When Money Speaks Back to You",
    description:
      "Now comes the miracle - money is going to speak to you. Through sensations, images, knowing. Your AI coach will help you interpret every message. This is where you become a money whisperer.",
    visualCue: "👂✨ Golden light flows between you and money",
    duration: 8,
    actionText: "Listen with your whole being to money's wisdom",
    nextAction: "Receive money's guidance with an open heart",
    statUpdates: {
      consciousness: { intuition: 12, magnetism: 8 },
      moneyIntimacy: { communication: 8, trustLevel: 6 },
    },
  },
  {
    id: 6,
    title: "Sacred Vows & Commitment",
    subtitle: "Your Wedding Ceremony with Money",
    description:
      "This is your wedding day with money! Your AI coach is your officiant as you exchange sacred vows. You're promising to love, honor, and cherish money as your divine partner in abundance.",
    visualCue: "💍💒 Golden rings of light bind you and money in sacred union",
    duration: 6,
    actionText: "Exchange vows with money as your beloved",
    nextAction: "Seal your union with a kiss to your money",
    statUpdates: {
      moneyIntimacy: { trustLevel: 12, sacredness: 10, pleasure: 8 },
      wealthConsciousness: { moneyMagnetism: 10 },
    },
  },
  {
    id: 7,
    title: "Level Up Celebration",
    subtitle: "You're Now a Money Mystic!",
    description:
      "CONGRATULATIONS! You've just completed your first sacred ritual and leveled up to Money Mystic! Your wealth consciousness has permanently shifted. Feel the new energy flowing through you.",
    visualCue: "🎉👑 Golden crown appears as you ascend to Level 2",
    duration: 5,
    actionText: "Celebrate your transformation with joy",
    nextAction: "Share your breakthrough with the goddess community",
    statUpdates: {
      consciousness: { frequency: 15, divinity: 8 },
      wealthConsciousness: { abundanceMindset: 12, prosperityFlow: 10 },
      moneyIntimacy: { playfulness: 10 },
    },
  },
  {
    id: 8,
    title: "Your Infinite Journey",
    subtitle: "From Awakening Soul to Source Embodiment",
    description:
      "This is just the beginning, beautiful soul. You have 10 levels of consciousness evolution ahead of you - from Awakening Soul to Source Embodiment. Each level unlocks new powers, new possibilities, new realities.",
    visualCue: "∞🌌 Infinite spiral of consciousness expansion opens before you",
    duration: 10,
    actionText: "Embrace your infinite potential",
    nextAction: "Begin your daily practice and watch miracles unfold",
    statUpdates: {
      consciousness: { awareness: 10, frequency: 10, divinity: 12 },
      wealthConsciousness: { abundanceMindset: 15, receivingCapacity: 12 },
      moneyIntimacy: { sacredness: 8, pleasure: 6 },
    },
  },
]

interface InspiringDemoTourProps {
  onUpdateStats?: (updates: Record<string, Record<string, number>>) => void
  currentStats?: any
  onClose?: () => void
}

export default function InspiringDemoTour({ onUpdateStats, currentStats, onClose }: InspiringDemoTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showDemo, setShowDemo] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentStep < demoSteps.length) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (demoSteps[currentStep].duration * 10)
          if (newProgress >= 100) {
            if (currentStep < demoSteps.length - 1) {
              // Apply stat updates when step completes
              const stepData = demoSteps[currentStep]
              if (stepData.statUpdates && onUpdateStats) {
                onUpdateStats(stepData.statUpdates)
              }

              setCompletedSteps((prev) => [...prev, currentStep])
              setCurrentStep(currentStep + 1)
              return 0
            } else {
              setIsPlaying(false)
              return 100
            }
          }
          return newProgress
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, onUpdateStats])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      // Apply stat updates when manually advancing
      const stepData = demoSteps[currentStep]
      if (stepData.statUpdates && onUpdateStats) {
        onUpdateStats(stepData.statUpdates)
      }

      setCompletedSteps((prev) => [...prev, currentStep])
      setCurrentStep(currentStep + 1)
      setProgress(0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
    }
  }

  const handleStepSelect = (stepIndex: number) => {
    // Apply stat updates for all steps up to the selected one
    if (onUpdateStats) {
      for (let i = Math.min(...completedSteps, stepIndex); i <= stepIndex; i++) {
        const stepData = demoSteps[i]
        if (stepData.statUpdates && !completedSteps.includes(i)) {
          onUpdateStats(stepData.statUpdates)
        }
      }
    }

    setCompletedSteps((prev) => {
      const newCompleted = [...prev]
      for (let i = 0; i <= stepIndex; i++) {
        if (!newCompleted.includes(i)) {
          newCompleted.push(i)
        }
      }
      return newCompleted
    })

    setCurrentStep(stepIndex)
    setProgress(0)
  }

  const currentStepData = demoSteps[currentStep]

  if (!showDemo) {
    return (
      <Card className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border-pink-500/30">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            ✨ Interactive Transformation Experience ✨
          </CardTitle>
          <p className="text-xl text-pink-200 mt-2">Experience the magic of wealth consciousness transformation</p>
          <p className="text-pink-300 mt-3 font-medium enhanced-text">
            See exactly how this revolutionary app will transform your relationship with money forever - AND watch your
            consciousness levels rise in real-time!
          </p>
        </CardHeader>
        <CardContent className="text-center pt-0">
          <Button
            onClick={() => setShowDemo(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 text-lg"
          >
            🎬 Start Your Interactive Journey
          </Button>
          <p className="text-sm text-pink-400 mt-4">8 transformational steps that will change your life forever</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Demo Player */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-yellow-400">{currentStepData.title}</CardTitle>
              <p className="text-lg text-purple-200">{currentStepData.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">
                Step {currentStep + 1} of {demoSteps.length}
              </Badge>
              {onClose && (
                <Button onClick={onClose} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {/* Visual Cue */}
          <div className="text-center p-6 bg-black/20 rounded-lg border border-white/10">
            <div className="text-4xl mb-4">{currentStepData.visualCue}</div>
            <p className="text-xl text-gray-200 leading-relaxed font-medium enhanced-text">
              {currentStepData.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-purple-300">Progress</span>
              <span className="text-purple-300">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Action Text */}
          <div className="text-center p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded">
            <p className="text-lg font-bold text-yellow-300 enhanced-text-bold">💫 {currentStepData.actionText}</p>
          </div>

          {/* Next Action */}
          <div className="text-center p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded">
            <p className="text-lg font-bold text-green-300 enhanced-text-bold">🎯 {currentStepData.nextAction}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline" size="sm">
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button onClick={handlePlay} className="bg-gradient-to-r from-purple-500 to-pink-600" size="lg">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>

            <Button onClick={handleNext} disabled={currentStep === demoSteps.length - 1} variant="outline" size="sm">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Step Navigation */}
          <div className="grid grid-cols-4 gap-2">
            {demoSteps.map((step, index) => (
              <Button
                key={step.id}
                onClick={() => handleStepSelect(index)}
                variant={index === currentStep ? "default" : "outline"}
                size="sm"
                className={`text-xs ${
                  index === currentStep
                    ? "bg-gradient-to-r from-purple-500 to-pink-600"
                    : completedSteps.includes(index)
                      ? "bg-green-600"
                      : ""
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {/* Exit Demo */}
          <div className="text-center">
            <Button onClick={() => setShowDemo(false)} variant="outline" className="text-gray-400">
              Exit Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
