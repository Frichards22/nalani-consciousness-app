"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Flame, Star, Sparkles, CheckCircle, Heart, Brain, Crown } from "lucide-react"

interface DailyEssential {
  id: string
  title: string
  description: string
  icon: string
  category: "consciousness" | "wealth" | "intimacy" | "spiritual"
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  instructions: string[]
  benefits: string[]
  statBoosts: Record<string, number>
  unlockLevel: number
  inspirationalQuote: string
}

interface CompletedPractice {
  id: string
  completedAt: string
  reflection: string
  intensity: number
  insights: string[]
}

const dailyEssentials: DailyEssential[] = [
  // CONSCIOUSNESS PRACTICES
  {
    id: "morning-awareness",
    title: "Sacred Morning Awakening",
    description: "Begin each day by consciously choosing your frequency and intention",
    icon: "🌅",
    category: "consciousness",
    duration: "10 minutes",
    difficulty: "beginner",
    instructions: [
      "Before reaching for your phone, place both hands on your heart",
      "Take 5 deep breaths, feeling your consciousness expanding with each inhale",
      "Ask yourself: 'What energy do I choose to embody today?'",
      "Visualize golden light filling every cell of your being",
      "Set a clear intention for how you want to show up in the world today",
      "Speak this intention aloud: 'Today I choose to be...'",
    ],
    benefits: ["Increased daily awareness", "Intentional living", "Higher frequency", "Conscious choice-making"],
    statBoosts: { awareness: 8, frequency: 10, sovereignty: 5 },
    unlockLevel: 1,
    inspirationalQuote: "Every morning is a chance to choose your consciousness frequency for the day.",
  },
  {
    id: "presence-practice",
    title: "Quantum Presence Activation",
    description: "Anchor yourself in the present moment where all power exists",
    icon: "⚡",
    category: "consciousness",
    duration: "15 minutes",
    difficulty: "intermediate",
    instructions: [
      "Sit comfortably and close your eyes",
      "Notice your breath without trying to change it",
      "When thoughts arise, gently label them 'thinking' and return to breath",
      "Feel the aliveness in your hands, then your whole body",
      "Expand your awareness to include sounds around you",
      "Rest in the spaciousness of pure awareness",
      "End by affirming: 'I am present, I am powerful, I am here now'",
    ],
    benefits: ["Present moment mastery", "Reduced mental chatter", "Increased inner peace", "Quantum awareness"],
    statBoosts: { awareness: 12, frequency: 8, sovereignty: 6 },
    unlockLevel: 2,
    inspirationalQuote: "In the present moment, you have access to infinite possibilities.",
  },

  // WEALTH CONSCIOUSNESS PRACTICES
  {
    id: "money-appreciation",
    title: "Sacred Money Appreciation Ritual",
    description: "Transform your relationship with money through genuine gratitude and reverence",
    icon: "💰",
    category: "wealth",
    duration: "12 minutes",
    difficulty: "beginner",
    instructions: [
      "Gather all the physical money you have available",
      "Create a beautiful, sacred space with candles or flowers",
      "Hold each bill and coin with reverence, as if holding something precious",
      "Thank each piece specifically: 'Thank you for the food you've provided...'",
      "Share your dreams with money: 'I would love for us to create...'",
      "End by saying: 'I honor you, I appreciate you, I welcome more of you'",
    ],
    benefits: ["Money magnetism", "Abundance mindset", "Healed money wounds", "Sacred relationship"],
    statBoosts: { abundanceMindset: 15, moneyMagnetism: 12, wealthFrequency: 8 },
    unlockLevel: 1,
    inspirationalQuote: "Gratitude is the fastest way to transform your relationship with money.",
  },
  {
    id: "wealth-embodiment",
    title: "Future Self Wealth Embodiment",
    description: "Step into the energy and consciousness of your wealthy future self",
    icon: "👑",
    category: "wealth",
    duration: "20 minutes",
    difficulty: "intermediate",
    instructions: [
      "Sit in a comfortable position and close your eyes",
      "Imagine yourself 3 years from now, having achieved your wealth goals",
      "See yourself in your dream environment - home, car, lifestyle",
      "Notice how this future you walks, talks, and carries themselves",
      "Feel the confidence, peace, and joy of financial freedom in your body",
      "Ask your future self: 'What do I need to know? What should I do next?'",
      "Listen for guidance, then thank your future self",
      "Carry this energy with you throughout your day",
    ],
    benefits: ["Wealth consciousness expansion", "Future self alignment", "Confidence building", "Clear guidance"],
    statBoosts: { wealthFrequency: 18, receivingCapacity: 15, worthinessLevel: 12 },
    unlockLevel: 2,
    inspirationalQuote: "Your future wealthy self is calling you forward into your highest potential.",
  },
  {
    id: "abundance-activation",
    title: "Cellular Abundance Activation",
    description: "Reprogram your cells and DNA for unlimited abundance reception",
    icon: "🧬",
    category: "wealth",
    duration: "25 minutes",
    difficulty: "advanced",
    instructions: [
      "Lie down comfortably and breathe deeply",
      "Visualize golden light entering through your crown chakra",
      "See this light traveling to every cell in your body",
      "Speak to your cells: 'You are safe to receive unlimited abundance'",
      "Imagine your DNA strands lighting up with wealth codes",
      "Feel ancient abundance wisdom awakening within you",
      "Visualize money flowing to you from all directions",
      "End by affirming: 'I am abundance. Abundance is my natural state.'",
    ],
    benefits: ["DNA reprogramming", "Cellular transformation", "Abundance embodiment", "Quantum wealth activation"],
    statBoosts: { wealthFrequency: 25, moneyMagnetism: 20, receivingCapacity: 18 },
    unlockLevel: 3,
    inspirationalQuote: "Your cells remember abundance - you're simply awakening what's already within you.",
  },

  // MONEY INTIMACY PRACTICES
  {
    id: "money-dialogue",
    title: "Sacred Money Dialogue",
    description: "Have an intimate, honest conversation with money as your beloved partner",
    icon: "💕",
    category: "intimacy",
    duration: "15 minutes",
    difficulty: "beginner",
    instructions: [
      "Hold physical money in your hands like holding a lover's hands",
      "Look at the money and say: 'Hello, beautiful. I see you.'",
      "Share honestly: 'I want to tell you how I've been feeling about us...'",
      "Ask money: 'What do you need from me? How can I love you better?'",
      "Listen with your heart for money's response (feelings, images, knowing)",
      "Share your dreams: 'I would love for us to create together...'",
      "End with: 'I love you and I'm committed to our relationship'",
    ],
    benefits: ["Sacred communication", "Intimacy building", "Trust development", "Partnership creation"],
    statBoosts: { communication: 18, trustLevel: 12, sacredness: 15 },
    unlockLevel: 1,
    inspirationalQuote: "Money is waiting for you to recognize it as a conscious partner, not just a tool.",
  },
  {
    id: "money-pleasure",
    title: "Money Pleasure & Joy Activation",
    description: "Awaken sensual pleasure, joy, and playfulness in your money relationship",
    icon: "😍",
    category: "intimacy",
    duration: "18 minutes",
    difficulty: "intermediate",
    instructions: [
      "Put on music that makes you feel sensual and alive",
      "Hold money and begin moving your body in ways that feel good",
      "Dance with money as your partner - be playful and free",
      "Laugh, smile, and let yourself feel genuine pleasure with money",
      "Caress the money gently, appreciating its texture and energy",
      "Say: 'Money, you bring me so much joy and pleasure!'",
      "End with a kiss to your money (yes, really!) and a big smile",
    ],
    benefits: ["Pleasure activation", "Playful relationship", "Joy embodiment", "Sensual connection"],
    statBoosts: { pleasure: 20, playfulness: 18, boundaries: 8 },
    unlockLevel: 2,
    inspirationalQuote: "When you can feel pleasure with money, you open the floodgates of abundance.",
  },
  {
    id: "money-forgiveness",
    title: "Sacred Money Forgiveness Ceremony",
    description: "Heal past money wounds through compassionate forgiveness and release",
    icon: "🕊️",
    category: "intimacy",
    duration: "22 minutes",
    difficulty: "intermediate",
    instructions: [
      "Create a sacred space with candles and soft music",
      "Hold money and breathe deeply into your heart",
      "Say: 'Money, I want to clear the space between us'",
      "Share any resentments: 'I've been angry that you...'",
      "Express your pain: 'It hurt when...'",
      "Take responsibility: 'I'm sorry for the times I...'",
      "Offer forgiveness: 'I forgive you, I forgive myself, I forgive our past'",
      "Visualize golden light healing the relationship",
      "End with: 'We have a clean slate. I'm ready for a new beginning.'",
    ],
    benefits: ["Wound healing", "Forgiveness mastery", "Clean slate creation", "Heart opening"],
    statBoosts: { trustLevel: 16, communication: 14, sacredness: 12, boundaries: 10 },
    unlockLevel: 2,
    inspirationalQuote: "Forgiveness is the key that unlocks the door to infinite abundance.",
  },

  // SPIRITUAL EVOLUTION PRACTICES
  {
    id: "divine-partnership",
    title: "Divine Partnership Meditation",
    description: "Deepen your conscious partnership with the Universe/Source/Divine",
    icon: "✨",
    category: "spiritual",
    duration: "20 minutes",
    difficulty: "intermediate",
    instructions: [
      "Create sacred space with meaningful objects or candles",
      "Sit quietly and breathe into your heart center",
      "Say: 'Divine Source, I open to deeper partnership with you'",
      "Feel yourself surrounded by infinite love and support",
      "Ask: 'What do you want me to know about my wealth journey?'",
      "Listen with your whole being for divine guidance",
      "Ask: 'How can I serve while I prosper?'",
      "End with gratitude: 'Thank you for this sacred partnership'",
    ],
    benefits: ["Divine connection", "Spiritual guidance", "Universal support", "Sacred purpose"],
    statBoosts: { divinity: 20, sovereignty: 15, frequency: 12 },
    unlockLevel: 2,
    inspirationalQuote: "When you partner with the Divine, you become an unstoppable force for good.",
  },
  {
    id: "manifestation-mastery",
    title: "Quantum Manifestation Mastery",
    description: "Master the art of conscious co-creation with universal intelligence",
    icon: "🌟",
    category: "spiritual",
    duration: "25 minutes",
    difficulty: "advanced",
    instructions: [
      "Write your manifestation desire on beautiful paper",
      "Hold the paper and feel the emotion of already having it",
      "Visualize quantum particles rearranging to create your desire",
      "Say: 'I am a powerful co-creator with the Universe'",
      "Feel yourself as the source of creation, not separate from it",
      "See your desire already existing in the quantum field",
      "Release attachment: 'This or something better for my highest good'",
      "Burn or bury the paper as an offering to the Universe",
    ],
    benefits: ["Manifestation mastery", "Quantum consciousness", "Co-creation abilities", "Divine trust"],
    statBoosts: { magnetism: 18, sovereignty: 20, divinity: 15 },
    unlockLevel: 3,
    inspirationalQuote: "You are not separate from the creative force of the Universe - you ARE it.",
  },
  {
    id: "goddess-embodiment",
    title: "Divine Goddess Embodiment",
    description: "Step fully into your power as a divine goddess and sovereign creator",
    icon: "👸",
    category: "spiritual",
    duration: "30 minutes",
    difficulty: "advanced",
    instructions: [
      "Dress in something that makes you feel divine and powerful",
      "Stand before a mirror and see your goddess self",
      "Place your hands on your heart and breathe deeply",
      "Speak your power: 'I am a divine goddess, sovereign and free'",
      "Feel ancient wisdom flowing through your veins",
      "See yourself crowned with light and surrounded by abundance",
      "Claim your throne: 'I claim my power, my wealth, my divine birthright'",
      "Walk through your day carrying this goddess energy",
    ],
    benefits: ["Divine embodiment", "Sovereign power", "Goddess activation", "Royal consciousness"],
    statBoosts: { divinity: 25, sovereignty: 22, magnetism: 18, frequency: 15 },
    unlockLevel: 3,
    inspirationalQuote: "You are not becoming a goddess - you are remembering that you always were one.",
  },
]

interface DailyEssentialsProps {
  currentStats: any
  onStatsUpdate: (statChanges: Record<string, number>) => void
  userLevel: number
  assessmentCompleted: boolean
}

export default function DailyEssentials({
  currentStats,
  onStatsUpdate,
  userLevel,
  assessmentCompleted,
}: DailyEssentialsProps) {
  const [selectedPractice, setSelectedPractice] = useState<DailyEssential | null>(null)
  const [completedToday, setCompletedToday] = useState<string[]>([])
  const [practiceInProgress, setPracticeInProgress] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [reflection, setReflection] = useState("")
  const [intensity, setIntensity] = useState(7)
  const [insights, setInsights] = useState("")
  const [showCompletion, setShowCompletion] = useState(false)

  // Load completed practices for today
  useEffect(() => {
    const today = new Date().toDateString()
    const saved = localStorage.getItem(`daily-essentials-${today}`)
    if (saved) {
      setCompletedToday(JSON.parse(saved))
    }
  }, [])

  // Filter practices based on user level and assessment completion
  const availablePractices = dailyEssentials.filter((practice) => {
    if (!assessmentCompleted && practice.unlockLevel > 1) return false
    return practice.unlockLevel <= userLevel
  })

  const getRecommendedPractices = () => {
    if (!assessmentCompleted) {
      return availablePractices.filter((p) => p.unlockLevel === 1).slice(0, 3)
    }

    // Recommend based on lowest stats
    const consciousness =
      Object.values(currentStats.consciousness).reduce((a, b) => a + b, 0) /
      Object.values(currentStats.consciousness).length
    const wealth =
      Object.values(currentStats.wealthConsciousness).reduce((a, b) => a + b, 0) /
      Object.values(currentStats.wealthConsciousness).length
    const intimacy =
      Object.values(currentStats.moneyIntimacy).reduce((a, b) => a + b, 0) /
      Object.values(currentStats.moneyIntimacy).length

    const lowestArea =
      consciousness <= wealth && consciousness <= intimacy
        ? "consciousness"
        : wealth <= intimacy
          ? "wealth"
          : "intimacy"

    return availablePractices.filter((p) => p.category === lowestArea || p.category === "spiritual").slice(0, 4)
  }

  const startPractice = (practice: DailyEssential) => {
    setSelectedPractice(practice)
    setPracticeInProgress(true)
    setCurrentStep(0)
    setReflection("")
    setInsights("")
    setIntensity(7)
  }

  const nextStep = () => {
    if (selectedPractice && currentStep < selectedPractice.instructions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completePractice()
    }
  }

  const completePractice = () => {
    if (!selectedPractice) return

    // Apply stat boosts
    onStatsUpdate(selectedPractice.statBoosts)

    // Save completion
    const today = new Date().toDateString()
    const newCompleted = [...completedToday, selectedPractice.id]
    setCompletedToday(newCompleted)
    localStorage.setItem(`daily-essentials-${today}`, JSON.stringify(newCompleted))

    // Save detailed completion data
    const completionData: CompletedPractice = {
      id: selectedPractice.id,
      completedAt: new Date().toISOString(),
      reflection,
      intensity,
      insights: insights.split("\n").filter((i) => i.trim()),
    }

    const allCompletions = JSON.parse(localStorage.getItem("all-practice-completions") || "[]")
    allCompletions.push(completionData)
    localStorage.setItem("all-practice-completions", JSON.stringify(allCompletions))

    setShowCompletion(true)
    setPracticeInProgress(false)
  }

  const resetPractice = () => {
    setSelectedPractice(null)
    setPracticeInProgress(false)
    setCurrentStep(0)
    setShowCompletion(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "consciousness":
        return <Brain className="h-5 w-5" />
      case "wealth":
        return <Crown className="h-5 w-5" />
      case "intimacy":
        return <Heart className="h-5 w-5" />
      case "spiritual":
        return <Star className="h-5 w-5" />
      default:
        return <Flame className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "consciousness":
        return "from-blue-500 to-indigo-600"
      case "wealth":
        return "from-yellow-500 to-orange-600"
      case "intimacy":
        return "from-pink-500 to-rose-600"
      case "spiritual":
        return "from-purple-500 to-violet-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400"
      case "intermediate":
        return "text-yellow-400"
      case "advanced":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  if (!assessmentCompleted) {
    return (
      <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-400" />
            Daily Consciousness & Wealth Essentials
          </CardTitle>
          <p className="text-purple-200">
            Complete your AI Consciousness Assessment first to unlock personalized daily practices
          </p>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h3 className="text-2xl font-bold mb-4">Assessment Required</h3>
          <p className="text-white font-semibold mb-6 enhanced-text">
            Your daily essentials will be personalized based on your consciousness assessment results
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {dailyEssentials
              .filter((p) => p.unlockLevel === 1)
              .slice(0, 3)
              .map((practice) => (
                <Card key={practice.id} className="bg-purple-800/20 border-purple-500/20">
                  <CardContent className="p-4 text-center">
                    <span className="text-3xl">{practice.icon}</span>
                    <h4 className="font-bold text-purple-200 mt-2">{practice.title}</h4>
                    <p className="text-purple-300 text-sm mt-1">{practice.description}</p>
                    <Badge className="mt-2 bg-purple-600">Preview Available</Badge>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showCompletion && selectedPractice) {
    return (
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <CardTitle className="text-3xl font-bold text-green-300">Practice Complete!</CardTitle>
          <p className="text-xl text-green-200">You've completed: {selectedPractice.title}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Inspirational Quote */}
          <Card className="bg-green-800/20 border-green-500/20">
            <CardContent className="p-4 text-center">
              <p className="text-green-200 italic text-lg">"{selectedPractice.inspirationalQuote}"</p>
            </CardContent>
          </Card>

          {/* Stat Boosts */}
          <Card className="bg-green-800/20 border-green-500/20">
            <CardContent className="p-4">
              <h4 className="font-bold text-green-300 mb-3">✨ Consciousness Upgrades:</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedPractice.statBoosts).map(([stat, value]) => (
                  <div key={stat} className="text-center">
                    <div className="text-2xl font-bold text-green-400">+{value}</div>
                    <p className="text-green-200 text-sm capitalize">{stat.replace(/([A-Z])/g, " $1").trim()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reflection Summary */}
          {reflection && (
            <Card className="bg-blue-800/20 border-blue-500/20">
              <CardContent className="p-4">
                <h4 className="font-bold text-blue-300 mb-2">💭 Your Reflection:</h4>
                <p className="text-blue-200">{reflection}</p>
              </CardContent>
            </Card>
          )}

          {/* Integration Guidance */}
          <Card className="bg-purple-800/20 border-purple-500/20">
            <CardContent className="p-4">
              <h4 className="font-bold text-purple-300 mb-3">🌟 Integration Guidance:</h4>
              <div className="space-y-2 text-purple-200">
                <p>• Carry this new frequency with you throughout your day</p>
                <p>• Notice how this practice affects your energy and interactions</p>
                <p>• Return to this feeling whenever you need a consciousness boost</p>
                <p>• Consider making this a regular part of your spiritual practice</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={resetPractice}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              Choose Another Practice
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (practiceInProgress && selectedPractice) {
    return (
      <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedPractice.icon}</span>
              <div>
                <CardTitle className="text-2xl text-indigo-300">{selectedPractice.title}</CardTitle>
                <p className="text-indigo-200">
                  {selectedPractice.duration} • {selectedPractice.difficulty}
                </p>
              </div>
            </div>
            <Button onClick={resetPractice} variant="outline" size="sm">
              Exit Practice
            </Button>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>
                Step {currentStep + 1} of {selectedPractice.instructions.length}
              </span>
            </div>
            <Progress value={((currentStep + 1) / selectedPractice.instructions.length) * 100} className="h-3" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Step */}
          <Card className="bg-indigo-800/20 border-indigo-500/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-indigo-200 mb-4">
                Step {currentStep + 1}: {selectedPractice.instructions[currentStep]}
              </h3>

              {currentStep === 0 && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded mb-4">
                  <p className="text-yellow-200">
                    🌟 <strong>Sacred Space:</strong> Create a peaceful environment free from distractions. This is your
                    time for transformation.
                  </p>
                </div>
              )}

              {currentStep === selectedPractice.instructions.length - 1 && (
                <div className="space-y-4 mt-6">
                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded">
                    <p className="text-green-200">
                      ✨ <strong>Integration:</strong> Take a moment to feel the shift in your consciousness and energy.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-indigo-300 mb-2">How was this practice for you?</h4>
                    <Textarea
                      placeholder="Share your experience, feelings, or any insights that came up..."
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-indigo-300 mb-2">Practice Intensity (1-10):</h4>
                    <Slider
                      value={[intensity]}
                      onValueChange={(value) => setIntensity(value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-center text-indigo-200 mt-2">Current: {intensity}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-indigo-300 mb-2">Key Insights (optional):</h4>
                    <Textarea
                      placeholder="Any realizations, downloads, or guidance you received..."
                      value={insights}
                      onChange={(e) => setInsights(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits Preview */}
          <Card className="bg-green-800/20 border-green-500/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-300 mb-2">🎁 Practice Benefits:</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedPractice.benefits.map((benefit, index) => (
                  <div key={index} className="text-green-200 text-sm">
                    ✨ {benefit}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={nextStep}
              disabled={currentStep === selectedPractice.instructions.length - 1 && !reflection.trim()}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              {currentStep === selectedPractice.instructions.length - 1 ? "Complete Practice ✨" : "Next Step →"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const recommendedPractices = getRecommendedPractices()
  const todayCompletionCount = completedToday.length

  return (
    <div className="space-y-6">
      {/* Daily Progress */}
      <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-400" />
            Daily Consciousness & Wealth Essentials
          </CardTitle>
          <p className="text-white font-semibold enhanced-text">
            Sacred practices for consciousness evolution and wealth mastery
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">{todayCompletionCount}</div>
              <p className="text-emerald-200 font-semibold enhanced-text">Practices Completed Today</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">{availablePractices.length}</div>
              <p className="text-emerald-200 font-medium">Available Practices</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{userLevel}</div>
              <p className="text-emerald-200 font-medium">Current Level</p>
            </div>
          </div>

          {todayCompletionCount > 0 && (
            <Card className="bg-green-800/20 border-green-500/20 mb-6">
              <CardContent className="p-4">
                <h4 className="font-bold text-green-300 mb-2">🎉 Today's Completed Practices:</h4>
                <div className="flex flex-wrap gap-2">
                  {completedToday.map((practiceId) => {
                    const practice = dailyEssentials.find((p) => p.id === practiceId)
                    return practice ? (
                      <Badge key={practiceId} className="bg-green-600">
                        {practice.icon} {practice.title}
                      </Badge>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Recommended Practices */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" />
            Recommended for You Today
          </CardTitle>
          <p className="text-blue-200">Based on your consciousness assessment and current development areas</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendedPractices.map((practice) => (
              <Card
                key={practice.id}
                className={`cursor-pointer transition-all duration-300 ${
                  completedToday.includes(practice.id)
                    ? "bg-green-800/20 border-green-500/30"
                    : "bg-blue-800/20 border-blue-500/20 hover:scale-105 hover:bg-blue-800/30"
                }`}
                onClick={() => !completedToday.includes(practice.id) && startPractice(practice)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{practice.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-blue-200 mb-1">{practice.title}</h3>
                      <p className="text-blue-300 text-sm mb-3 font-medium enhanced-text">{practice.description}</p>

                      <div className="flex gap-2 mb-3">
                        <Badge className="bg-blue-600">{practice.duration}</Badge>
                        <Badge variant="outline" className="capitalize">
                          {practice.difficulty}
                        </Badge>
                        <Badge className={`bg-gradient-to-r ${getCategoryColor(practice.category)}`}>
                          {getCategoryIcon(practice.category)}
                          <span className="ml-1 capitalize">{practice.category}</span>
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-300 text-sm">Benefits:</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {practice.benefits.slice(0, 4).map((benefit, index) => (
                            <div key={index} className="text-blue-200 text-xs font-medium enhanced-text-light">
                              ✨ {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {completedToday.includes(practice.id) ? (
                        <div className="flex items-center gap-2 mt-3 text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-semibold">Completed Today!</span>
                        </div>
                      ) : (
                        <Button
                          className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            startPractice(practice)
                          }}
                        >
                          Begin Practice
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Available Practices by Category */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-400" />
            All Available Practices
          </CardTitle>
          <p className="text-purple-200">Complete practices to unlock higher levels and advanced techniques</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {["consciousness", "wealth", "intimacy", "spiritual"].map((category) => {
              const categoryPractices = availablePractices.filter((p) => p.category === category)
              if (categoryPractices.length === 0) return null

              return (
                <div key={category} className="space-y-3">
                  <h4 className="font-bold text-xl capitalize flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {category} Practices
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categoryPractices.map((practice) => (
                      <Card
                        key={practice.id}
                        className={`cursor-pointer transition-all duration-300 ${
                          completedToday.includes(practice.id)
                            ? "bg-green-800/20 border-green-500/30"
                            : practice.unlockLevel <= userLevel
                              ? "bg-purple-800/20 border-purple-500/20 hover:scale-105"
                              : "bg-gray-800/20 border-gray-600/30 opacity-60"
                        }`}
                        onClick={() => {
                          if (practice.unlockLevel <= userLevel && !completedToday.includes(practice.id)) {
                            startPractice(practice)
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-3xl">{practice.icon}</span>
                            <div className="flex-1">
                              <h5 className="font-bold text-lg text-purple-200 mb-1">{practice.title}</h5>
                              <p className="text-purple-300 text-sm mb-3 font-medium enhanced-text">
                                {practice.description}
                              </p>

                              <div className="flex gap-2 mb-3">
                                <Badge className="text-xs">{practice.duration}</Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getDifficultyColor(practice.difficulty)}`}
                                >
                                  {practice.difficulty}
                                </Badge>
                              </div>

                              <div className="text-center">
                                {completedToday.includes(practice.id) ? (
                                  <Badge className="bg-green-600">✓ Completed</Badge>
                                ) : practice.unlockLevel <= userLevel ? (
                                  <Button size="sm" className={`bg-gradient-to-r ${getCategoryColor(category)}`}>
                                    Start Practice
                                  </Button>
                                ) : (
                                  <Badge variant="outline">Level {practice.unlockLevel} Required</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
