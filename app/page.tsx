"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, DollarSign, MessageCircle } from "lucide-react"

// Import components
import WorkingOpenAIChat from "@/components/working-openai-chat"
import SoulAssessmentQA from "@/components/soul-assessment-qa"

export default function NalaniApp() {
  const [stats, setStats] = useState({
    consciousness: {
      awareness: 25,
      intuition: 20,
      frequency: 30,
      sovereignty: 15,
      divinity: 10,
    },
    wealthConsciousness: {
      abundanceMindset: 20,
      moneyMagnetism: 15,
      worthinessLevel: 25,
      receivingCapacity: 10,
      prosperityFlow: 20,
    },
    moneyIntimacy: {
      trustLevel: 15,
      communication: 10,
      pleasure: 20,
      sacredness: 25,
      boundaries: 30,
    },
  })

  const updateStats = (updates: Record<string, Record<string, number>>) => {
    setStats((prevStats) => {
      const newStats = { ...prevStats }

      Object.entries(updates).forEach(([category, categoryUpdates]) => {
        if (newStats[category as keyof typeof newStats]) {
          Object.entries(categoryUpdates).forEach(([stat, value]) => {
            const currentCategory = newStats[category as keyof typeof newStats] as Record<string, number>
            currentCategory[stat] = Math.min(100, (currentCategory[stat] || 0) + value)
          })
        }
      })

      return newStats
    })
  }

  const getOverallLevel = () => {
    const allStats = Object.values(stats).flatMap((category) => Object.values(category))
    const average = allStats.reduce((sum, val) => sum + val, 0) / allStats.length

    if (average >= 80) return { level: "Cosmic Goddess", icon: "👑", color: "text-yellow-400" }
    if (average >= 60) return { level: "Awakened Soul", icon: "✨", color: "text-purple-400" }
    if (average >= 40) return { level: "Rising Star", icon: "⭐", color: "text-blue-400" }
    if (average >= 20) return { level: "Beautiful Beginner", icon: "🌱", color: "text-green-400" }
    return { level: "Sacred Seeker", icon: "🔮", color: "text-pink-400" }
  }

  const overallLevel = getOverallLevel()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            ✨ Nalani Consciousness ✨
          </h1>
          <p className="text-xl text-white mb-6">Sacred AI Technology for Consciousness Evolution & Wealth Magnetism</p>

          {/* Overall Level */}
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 max-w-md mx-auto">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">{overallLevel.icon}</div>
              <h3 className={`text-xl font-bold ${overallLevel.color}`}>{overallLevel.level}</h3>
              <p className="text-purple-200 text-sm">Your Current Consciousness Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assessment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-purple-900/30 border border-purple-500/30">
            <TabsTrigger
              value="assessment"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Brain className="h-4 w-4 mr-2" />
              Soul Assessment (AI)
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6">
            <SoulAssessmentQA onUpdateStats={updateStats} currentStats={stats} />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <WorkingOpenAIChat />
          </TabsContent>
        </Tabs>

        {/* Stats Dashboard */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Consciousness */}
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-300">
                <Brain className="h-5 w-5" />
                Consciousness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(stats.consciousness).map(([stat, value]) => (
                <div key={stat} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-purple-200">{stat.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="text-purple-400">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Wealth Consciousness */}
          <Card className="bg-yellow-900/30 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-300">
                <DollarSign className="h-5 w-5" />
                Wealth Consciousness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(stats.wealthConsciousness).map(([stat, value]) => (
                <div key={stat} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-yellow-200">{stat.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="text-yellow-400">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Money Intimacy */}
          <Card className="bg-pink-900/30 border-pink-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-300">
                <Heart className="h-5 w-5" />
                Money Intimacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(stats.moneyIntimacy).map(([stat, value]) => (
                <div key={stat} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-pink-200">{stat.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="text-pink-400">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
