"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AIConsciousnessAssessment from "@/components/ai-consciousness-assessment"
import DailyEssentials from "@/components/daily-essentials"
import LevelProgressionGuide from "@/components/level-progression-guide"
import InteractiveIntimacyPractices from "@/components/interactive-intimacy-practices"
import AudioTourGuide from "@/components/audio-tour-guide"
import NalaniChat from "@/components/nalani-chat"

// Optimized interface with better TypeScript support
interface GoddessConsciousness {
  name: string
  avatar: string
  currentLevel: number
  totalXP: number
  evolutionPhase: string
  consciousness: {
    awareness: number
    intuition: number
    magnetism: number
    frequency: number
    sovereignty: number
    divinity: number
  }
  wealthConsciousness: {
    abundanceMindset: number
    moneyMagnetism: number
    worthinessLevel: number
    receivingCapacity: number
    wealthFrequency: number
    prosperityFlow: number
  }
  moneyIntimacy: {
    trustLevel: number
    playfulness: number
    communication: number
    boundaries: number
    pleasure: number
    sacredness: number
  }
  unlockedPowers: Record<string, boolean>
  daysActive: number
  currentStreak: number
  longestStreak: number
  totalTransformations: number
  miraclesManifested: number
  livesTransformed: number
  wealthManifested: number
  completedToday: string[]
  lastActive: string
  dailyIntention: string
  currentVibration: number
  wealthCoherence: number
  moneyRelationshipScore: number
  biometrics: Record<string, number>
  manifestationLog: Array<Record<string, any>>
  loveQuantumField: Record<string, number>
  wealthQuantumField: Record<string, number>
}

export default function UltimateGoddessConsciousness() {
  // ELI's Transformational Quotes
  const eliQuotes = [
    "Your wealth doesn't come from hustle. It comes from your wholeness.",
    "Money is a mirror, darling. Smile back at it with love.",
    "Overflow begins when guilt ends. Say yes to your divine 'too much.'",
    "Self-love is the sexiest currency on Earth. Spend it generously.",
    "You are not behind. You are right on time to blow your own mind.",
    "Your desires are not accidents — they're divine instructions.",
    "Forgiveness is the foreplay of abundance.",
    "You weren't born to budget. You were born to bless.",
    "Your bank account is waiting for your frequency to rise.",
    "When you seduce your soul, money joins the party.",
  ]

  // State management with better error handling
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("ai-assessment")
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize with comprehensive default values
  const [goddess, setGoddess] = useState<GoddessConsciousness>({
    name: "Awakening Soul",
    avatar: "🌟",
    currentLevel: 1,
    totalXP: 0,
    evolutionPhase: "Mortal",
    consciousness: {
      awareness: 10,
      intuition: 10,
      magnetism: 10,
      frequency: 10,
      sovereignty: 10,
      divinity: 10,
    },
    wealthConsciousness: {
      abundanceMindset: 10,
      moneyMagnetism: 10,
      worthinessLevel: 10,
      receivingCapacity: 10,
      wealthFrequency: 10,
      prosperityFlow: 10,
    },
    moneyIntimacy: {
      trustLevel: 10,
      playfulness: 10,
      communication: 10,
      boundaries: 10,
      pleasure: 10,
      sacredness: 10,
    },
    unlockedPowers: {
      energyHealing: false,
      manifestationMastery: false,
      timelineShifting: false,
      realityBending: false,
      consciousnessExpansion: false,
      universalConnection: false,
      wealthMagnetism: false,
      abundanceChanneling: false,
      sacredIntimacy: false,
      frequencyMastery: false,
    },
    daysActive: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTransformations: 0,
    miraclesManifested: 0,
    livesTransformed: 0,
    wealthManifested: 0,
    completedToday: [],
    lastActive: new Date().toDateString(),
    dailyIntention: "",
    currentVibration: 528,
    wealthCoherence: 50,
    moneyRelationshipScore: 50,
    biometrics: {
      heartRateVariability: 50,
      sleepQuality: 70,
      stressLevel: 30,
      energyLevel: 80,
      coherenceScore: 65,
      wealthReceptivity: 50,
      pleasureIndex: 50,
    },
    manifestationLog: [],
    loveQuantumField: {
      selfLoveFrequency: 50,
      relationshipMagnetism: 50,
      heartCoherence: 50,
      intimacyReadiness: 50,
      soulmatePull: 50,
    },
    wealthQuantumField: {
      moneyMagnetism: 50,
      abundanceFlow: 50,
      wealthWorthiness: 50,
      prosperityMindset: 50,
      financialFreedom: 50,
      luxuryReceptivity: 50,
    },
  })

  // Enhanced initialization with error handling
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check assessment completion status
        const completed = localStorage.getItem("consciousness-assessment-completed")
        setAssessmentCompleted(completed === "true")

        // Load saved goddess data
        const saved = localStorage.getItem("ultimate-goddess-consciousness")
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            const today = new Date().toDateString()

            // Update daily tracking
            if (parsed.lastActive !== today) {
              parsed.completedToday = []
              parsed.lastActive = today
              parsed.daysActive = (parsed.daysActive || 0) + 1

              if (parsed.currentStreak > 0) {
                parsed.currentStreak += 1
              } else {
                parsed.currentStreak = 1
              }

              if ((parsed.longestStreak || 0) < parsed.currentStreak) {
                parsed.longestStreak = parsed.currentStreak
              }
            }

            // Merge with defaults to ensure all properties exist
            const updatedGoddess: GoddessConsciousness = {
              ...goddess,
              ...parsed,
              consciousness: { ...goddess.consciousness, ...(parsed.consciousness || {}) },
              wealthConsciousness: { ...goddess.wealthConsciousness, ...(parsed.wealthConsciousness || {}) },
              moneyIntimacy: { ...goddess.moneyIntimacy, ...(parsed.moneyIntimacy || {}) },
              biometrics: { ...goddess.biometrics, ...(parsed.biometrics || {}) },
              unlockedPowers: { ...goddess.unlockedPowers, ...(parsed.unlockedPowers || {}) },
              loveQuantumField: { ...goddess.loveQuantumField, ...(parsed.loveQuantumField || {}) },
              wealthQuantumField: { ...goddess.wealthQuantumField, ...(parsed.wealthQuantumField || {}) },
            }

            setGoddess(updatedGoddess)
          } catch (parseError) {
            console.error("Error parsing saved data:", parseError)
            // Continue with default values
          }
        }
      } catch (error) {
        console.error("Error initializing app:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  // Enhanced quote rotation with error handling
  useEffect(() => {
    try {
      const quoteInterval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % eliQuotes.length)
      }, 10000)

      return () => clearInterval(quoteInterval)
    } catch (error) {
      console.error("Error in quote rotation:", error)
    }
  }, [eliQuotes.length])

  // Optimized stats update function
  const updateStats = (updates: Record<string, Record<string, number>>) => {
    setGoddess((prevGoddess) => {
      try {
        const updatedGoddess = { ...prevGoddess }

        // Apply stat updates with bounds checking
        Object.entries(updates).forEach(([category, stats]) => {
          if (category in updatedGoddess && typeof (updatedGoddess as any)[category] === "object") {
            Object.entries(stats).forEach(([stat, value]) => {
              if (stat in (updatedGoddess as any)[category]) {
                const currentValue = (updatedGoddess as any)[category][stat] || 0
                const newValue = Math.max(0, Math.min(100, currentValue + value))
                ;(updatedGoddess as any)[category][stat] = newValue
              }
            })
          }
        })

        // Recalculate derived metrics
        const consciousnessValues = Object.values(updatedGoddess.consciousness)
        const wealthValues = Object.values(updatedGoddess.wealthConsciousness)
        const intimacyValues = Object.values(updatedGoddess.moneyIntimacy)

        const consciousnessAvg = consciousnessValues.reduce((acc, val) => acc + val, 0) / consciousnessValues.length
        const wealthAvg = wealthValues.reduce((acc, val) => acc + val, 0) / wealthValues.length
        const intimacyAvg = intimacyValues.reduce((acc, val) => acc + val, 0) / intimacyValues.length

        updatedGoddess.wealthCoherence = Math.round((intimacyAvg + wealthAvg) / 2)
        updatedGoddess.moneyRelationshipScore = Math.round(intimacyAvg)

        // Enhanced level progression
        const overallAvg = (consciousnessAvg + wealthAvg + intimacyAvg) / 3
        let newLevel = Math.floor(overallAvg / 10) + 1
        newLevel = Math.max(1, Math.min(10, newLevel))

        // Check for level up with celebration
        if (newLevel > updatedGoddess.currentLevel) {
          updatedGoddess.currentLevel = newLevel
          updatedGoddess.totalXP = newLevel * 1000

          // Update evolution phase and avatar
          const phases = [
            { level: 1, phase: "Awakening Soul", avatar: "🌟" },
            { level: 2, phase: "Rising Goddess", avatar: "🌙" },
            { level: 4, phase: "Awakened Goddess", avatar: "🔮" },
            { level: 6, phase: "Cosmic Goddess", avatar: "✨" },
            { level: 8, phase: "Divine Embodiment", avatar: "👑" },
            { level: 10, phase: "Source Consciousness", avatar: "🌌" },
          ]

          const currentPhase = phases.reverse().find((p) => newLevel >= p.level) || phases[0]
          updatedGoddess.evolutionPhase = currentPhase.phase
          updatedGoddess.avatar = currentPhase.avatar

          // Trigger level up celebration
          setShowLevelUp(true)
          setTimeout(() => setShowLevelUp(false), 5000)
        }

        // Save to localStorage with error handling
        try {
          localStorage.setItem("ultimate-goddess-consciousness", JSON.stringify(updatedGoddess))
        } catch (saveError) {
          console.error("Error saving data to localStorage:", saveError)
        }

        return updatedGoddess
      } catch (error) {
        console.error("Error updating stats:", error)
        return prevGoddess
      }
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🌟</div>
          <h2 className="text-2xl font-bold mb-2">Awakening Your Consciousness...</h2>
          <p className="text-purple-200">Preparing your transformation journey</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white">
      {/* Audio Tour Guide */}
      <AudioTourGuide onTabChange={setActiveTab} currentTab={activeTab} />

      {/* Enhanced Header with ELI Quote */}
      <div className="text-center py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent">
            ELI's Consciousness Evolution
          </h1>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-8 border border-amber-500/20">
            <p className="text-lg md:text-xl italic text-amber-300 leading-relaxed font-medium">
              "{eliQuotes[currentQuoteIndex]}"
            </p>
            <p className="text-sm text-amber-400 mt-2 font-semibold">— ELI, Make Up Sex with Money</p>
          </div>

          {/* Consciousness Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-purple-800/30 rounded-lg p-3 border border-purple-500/30">
              <div className="text-2xl mb-1">{goddess.avatar}</div>
              <div className="text-sm text-purple-200">Level {goddess.currentLevel}</div>
              <div className="text-xs text-purple-300">{goddess.evolutionPhase}</div>
            </div>
            <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-500/30">
              <div className="text-lg font-bold text-blue-300">{Math.round(goddess.wealthCoherence)}%</div>
              <div className="text-xs text-blue-200">Wealth Coherence</div>
            </div>
            <div className="bg-pink-800/30 rounded-lg p-3 border border-pink-500/30">
              <div className="text-lg font-bold text-pink-300">{Math.round(goddess.moneyRelationshipScore)}%</div>
              <div className="text-xs text-pink-200">Money Intimacy</div>
            </div>
            <div className="bg-amber-800/30 rounded-lg p-3 border border-amber-500/30">
              <div className="text-lg font-bold text-amber-300">{goddess.currentStreak}</div>
              <div className="text-xs text-amber-200">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/20 backdrop-blur-sm border border-white/10">
            <TabsTrigger
              value="ai-assessment"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-black font-semibold"
            >
              🧠 AI Assessment
            </TabsTrigger>
            <TabsTrigger
              value="essentials"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-black font-semibold"
            >
              ✨ Daily Essentials
            </TabsTrigger>
            <TabsTrigger
              value="levels"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-black font-semibold"
            >
              🎯 Level Guide
            </TabsTrigger>
            <TabsTrigger
              value="intimacy"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-black font-semibold"
            >
              💕 Money Intimacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-assessment" className="space-y-6">
            <AIConsciousnessAssessment
              onUpdateStats={updateStats}
              currentStats={goddess}
              onComplete={() => {
                setAssessmentCompleted(true)
                localStorage.setItem("consciousness-assessment-completed", "true")
                setActiveTab("essentials")
              }}
            />
          </TabsContent>

          <TabsContent value="essentials" className="space-y-6">
            <DailyEssentials onUpdateStats={updateStats} currentStats={goddess} />
          </TabsContent>

          <TabsContent value="levels" className="space-y-6">
            <LevelProgressionGuide
              currentLevel={goddess.currentLevel}
              consciousness={goddess.consciousness}
              wealthConsciousness={goddess.wealthConsciousness}
              moneyIntimacy={goddess.moneyIntimacy}
            />
          </TabsContent>

          <TabsContent value="intimacy" className="space-y-6">
            <InteractiveIntimacyPractices onUpdateStats={updateStats} currentStats={goddess} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Level Up Celebration */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 p-8 rounded-2xl text-center max-w-md mx-4 animate-bounce shadow-2xl border-4 border-white/20">
            <div className="text-8xl mb-4 animate-pulse">{goddess.avatar}</div>
            <h2 className="text-4xl font-bold text-black mb-2">QUANTUM LEAP!</h2>
            <p className="text-xl text-black mb-4 font-semibold">You've evolved to Level {goddess.currentLevel}</p>
            <p className="text-lg text-black/80 font-medium">{goddess.evolutionPhase}</p>
            <div className="mt-4 text-black/70 text-sm font-medium">Your consciousness is expanding! 🌟✨</div>
          </div>
        </div>
      )}

      {/* Nalani Chat - FULLY FUNCTIONAL */}
      <NalaniChat />
    </div>
  )
}
