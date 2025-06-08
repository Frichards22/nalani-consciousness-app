"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp } from "lucide-react"
import type { UserLevel } from "@/lib/level-system"

interface LevelDisplayProps {
  userLevel: UserLevel
  recentXpGains?: Array<{ source: string; amount: number; description: string }>
}

export default function LevelDisplay({ userLevel, recentXpGains = [] }: LevelDisplayProps) {
  const progressPercentage = userLevel.xpToNext > 0 ? (userLevel.xp / (userLevel.xp + userLevel.xpToNext)) * 100 : 100

  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{userLevel.avatar}</span>
            <div>
              <h3 className="text-2xl font-bold text-purple-300">
                Level {userLevel.level}: {userLevel.title}
              </h3>
              <p className="text-purple-200">{userLevel.description}</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">{userLevel.multiplier}x Multiplier</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* XP Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-300">Progress to Next Level</span>
            <span className="text-purple-300">
              {userLevel.xp.toLocaleString()} / {(userLevel.xp + userLevel.xpToNext).toLocaleString()} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          {userLevel.xpToNext > 0 && (
            <p className="text-sm text-purple-400 text-center">
              {userLevel.xpToNext.toLocaleString()} XP to next level
            </p>
          )}
        </div>

        {/* Unlocked Features */}
        <div>
          <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Unlocked Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {userLevel.unlockedFeatures.map((feature, index) => (
              <Badge key={index} variant="outline" className="border-purple-400 text-purple-200">
                ✨ {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent XP Gains */}
        {recentXpGains.length > 0 && (
          <div>
            <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Recent XP Gains
            </h4>
            <div className="space-y-1">
              {recentXpGains.slice(0, 3).map((gain, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-green-200">{gain.description}</span>
                  <span className="text-green-400 font-bold">+{gain.amount} XP</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userLevel.totalXp.toLocaleString()}</div>
            <p className="text-sm text-purple-300">Total XP</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{userLevel.level}</div>
            <p className="text-sm text-purple-300">Current Level</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
