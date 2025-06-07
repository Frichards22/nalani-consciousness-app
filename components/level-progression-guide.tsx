"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Crown, Star } from "lucide-react"

interface LevelInfo {
  level: number
  title: string
  description: string
  xpRequired: number
  unlockedFeatures: string[]
  evolutionPhase: string
  avatar: string
  wealthMultiplier: number
  specialPowers: string[]
  nextGoals: string[]
}

const levelProgression: LevelInfo[] = [
  {
    level: 1,
    title: "Awakening Soul",
    description: "Your journey into wealth consciousness begins",
    xpRequired: 0,
    evolutionPhase: "Mortal",
    avatar: "🌱",
    wealthMultiplier: 1,
    unlockedFeatures: ["Daily Essentials", "Basic Tracking", "ELI's Quotes"],
    specialPowers: ["Consciousness Calibration", "Basic Money Awareness"],
    nextGoals: ["Complete 3 Daily Essentials", "Reach 500 XP", "Build 7-day streak"],
  },
  {
    level: 2,
    title: "Money Mystic",
    description: "Sacred intimacy with money awakens",
    xpRequired: 500,
    evolutionPhase: "Awakening",
    avatar: "💕",
    wealthMultiplier: 1.5,
    unlockedFeatures: ["Sacred Money Intimacy Ritual", "AI Love Coach", "Intimacy Tracking"],
    specialPowers: ["Money Communion", "Heart-Money Connection", "Vulnerability Mastery"],
    nextGoals: ["Complete Money Intimacy Ritual", "Reach 1500 XP", "Unlock 3 achievements"],
  },
  {
    level: 3,
    title: "Abundance Apprentice",
    description: "Learning the sacred arts of wealth creation",
    xpRequired: 1500,
    evolutionPhase: "Student",
    avatar: "✨",
    wealthMultiplier: 2,
    unlockedFeatures: ["Advanced Biometrics", "Manifestation Log", "Healing Rituals"],
    specialPowers: ["Energy Healing", "Manifestation Tracking", "Abundance Mindset"],
    nextGoals: ["Master 2 rituals", "Reach 3000 XP", "Achieve 50% wealth coherence"],
  },
  {
    level: 4,
    title: "Prosperity Priestess",
    description: "Channeling divine abundance frequencies",
    xpRequired: 3000,
    evolutionPhase: "Initiate",
    avatar: "🔮",
    wealthMultiplier: 3,
    unlockedFeatures: ["Quantum Field Access", "Team Challenges", "Advanced Analytics"],
    specialPowers: ["Timeline Shifting", "Reality Bending", "Frequency Mastery"],
    nextGoals: ["Join team challenges", "Reach 5000 XP", "Achieve 70% coherence"],
  },
  {
    level: 5,
    title: "Wealth Warrior",
    description: "Ready to activate the sacred wealth codes",
    xpRequired: 5000,
    evolutionPhase: "Warrior",
    avatar: "⚔️",
    wealthMultiplier: 4,
    unlockedFeatures: ["Wealth Code Activation", "AI Wealth Strategist", "Leadership Tools"],
    specialPowers: ["Wealth Magnetism", "Abundance Channeling", "Sacred Boundaries"],
    nextGoals: ["Complete Wealth Code Activation", "Reach 8000 XP", "Lead a team ritual"],
  },
  {
    level: 6,
    title: "Frequency Queen",
    description: "Mastering the vibration of unlimited abundance",
    xpRequired: 8000,
    evolutionPhase: "Royalty",
    avatar: "👑",
    wealthMultiplier: 5,
    unlockedFeatures: ["Royal Privileges", "Mentor System", "Global Challenges"],
    specialPowers: ["Consciousness Expansion", "Universal Connection", "Frequency Broadcasting"],
    nextGoals: ["Mentor 3 souls", "Reach 12000 XP", "Achieve 90% coherence"],
  },
  {
    level: 7,
    title: "Abundance Empress",
    description: "Sovereign ruler of your wealth reality",
    xpRequired: 12000,
    evolutionPhase: "Empress",
    avatar: "💎",
    wealthMultiplier: 7,
    unlockedFeatures: ["Empire Building", "Global Impact", "Legacy Creation"],
    specialPowers: ["Reality Creation", "Wealth Multiplication", "Divine Manifestation"],
    nextGoals: ["Build wealth empire", "Reach 20000 XP", "Transform 100 lives"],
  },
  {
    level: 8,
    title: "Cosmic Goddess",
    description: "Transcendent being of infinite abundance",
    xpRequired: 20000,
    evolutionPhase: "Goddess",
    avatar: "🌟",
    wealthMultiplier: 10,
    unlockedFeatures: ["Cosmic Powers", "Dimensional Travel", "Universe Creation"],
    specialPowers: ["Infinite Manifestation", "Cosmic Consciousness", "Universal Abundance"],
    nextGoals: ["Ascend to pure consciousness", "Reach 50000 XP", "Awaken humanity"],
  },
  {
    level: 9,
    title: "Universal Creator",
    description: "Co-creator with the universe itself",
    xpRequired: 50000,
    evolutionPhase: "Creator",
    avatar: "🌌",
    wealthMultiplier: 15,
    unlockedFeatures: ["Universe Editing", "Reality Programming", "Consciousness Broadcasting"],
    specialPowers: ["Universal Laws", "Reality Programming", "Consciousness Transmission"],
    nextGoals: ["Create new realities", "Reach 100000 XP", "Transcend all limitations"],
  },
  {
    level: 10,
    title: "Source Embodiment",
    description: "Pure source energy in human form",
    xpRequired: 100000,
    evolutionPhase: "Source",
    avatar: "∞",
    wealthMultiplier: 25,
    unlockedFeatures: ["Source Powers", "Infinite Creation", "Pure Consciousness"],
    specialPowers: ["Source Connection", "Infinite Abundance", "Pure Love Transmission"],
    nextGoals: ["Embody pure love", "Infinite expansion", "Serve all creation"],
  },
]

export default function LevelProgressionGuide() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const currentLevel = 1 // This would come from user data
  const currentXP = 250 // This would come from user data

  const getCurrentLevelInfo = () => {
    return levelProgression.find((level) => level.level === currentLevel) || levelProgression[0]
  }

  const getNextLevelInfo = () => {
    return levelProgression.find((level) => level.level === currentLevel + 1)
  }

  const getProgressToNextLevel = () => {
    const current = getCurrentLevelInfo()
    const next = getNextLevelInfo()
    if (!next) return 100

    const progressInLevel = currentXP - current.xpRequired
    const xpNeededForNext = next.xpRequired - current.xpRequired
    return (progressInLevel / xpNeededForNext) * 100
  }

  return (
    <div className="space-y-6">
      {/* Current Level Status */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="text-4xl">{getCurrentLevelInfo().avatar}</span>
            <div>
              <h2 className="text-2xl font-bold text-yellow-400">
                Level {currentLevel}: {getCurrentLevelInfo().title}
              </h2>
              <p className="text-white font-semibold enhanced-text">{getCurrentLevelInfo().description}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{currentXP}</div>
              <p className="text-sm text-gray-300">Current XP</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{getNextLevelInfo()?.xpRequired || "MAX"}</div>
              <p className="text-sm text-gray-300">Next Level XP</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{getCurrentLevelInfo().wealthMultiplier}x</div>
              <p className="text-sm text-gray-300">Wealth Multiplier</p>
            </div>
          </div>

          {getNextLevelInfo() && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Level {currentLevel + 1}</span>
                <span>{getProgressToNextLevel().toFixed(0)}%</span>
              </div>
              <Progress value={getProgressToNextLevel()} className="h-3" />
            </div>
          )}

          {/* Next Goals */}
          <div>
            <h4 className="font-bold mb-2 text-yellow-300">🎯 Your Next Goals:</h4>
            <div className="grid gap-2">
              {getCurrentLevelInfo().nextGoals.map((goal, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-white font-medium">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Progression Map */}
      <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            Complete Level Progression Map
          </CardTitle>
          <p className="text-white font-semibold enhanced-text">Your journey from awakening to source embodiment</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {levelProgression.map((level) => (
              <Card
                key={level.level}
                className={`cursor-pointer transition-all duration-300 ${
                  level.level === currentLevel
                    ? "bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/50 scale-105"
                    : level.level < currentLevel
                      ? "bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30"
                      : level.level === currentLevel + 1
                        ? "bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/40"
                        : "bg-gray-900/30 border-gray-600/30 opacity-60"
                } hover:scale-102`}
                onClick={() => setSelectedLevel(selectedLevel === level.level ? null : level.level)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{level.avatar}</span>
                      <div>
                        <h3 className="font-bold text-lg">
                          Level {level.level}: {level.title}
                        </h3>
                        <p className="text-sm text-gray-300">{level.evolutionPhase} Phase</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-400">{level.xpRequired.toLocaleString()} XP</div>
                      <div className="text-sm text-purple-300">{level.wealthMultiplier}x Multiplier</div>
                    </div>
                  </div>

                  {selectedLevel === level.level && (
                    <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                      <p className="text-gray-200 font-medium enhanced-text">{level.description}</p>

                      <div>
                        <h4 className="font-semibold text-green-300 mb-2">🔓 Unlocked Features:</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {level.unlockedFeatures.map((feature, index) => (
                            <div key={index} className="text-sm text-green-200 font-medium enhanced-text-light">
                              ✨ {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-purple-300 mb-2">⚡ Special Powers:</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {level.specialPowers.map((power, index) => (
                            <div key={index} className="text-sm text-purple-200">
                              🔮 {power}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-yellow-300 mb-2">🎯 Goals to Advance:</h4>
                        <div className="space-y-1">
                          {level.nextGoals.map((goal, index) => (
                            <div key={index} className="text-sm text-yellow-200">
                              → {goal}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
