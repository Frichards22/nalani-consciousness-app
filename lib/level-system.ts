export interface UserLevel {
  level: number
  title: string
  xp: number
  xpToNext: number
  totalXp: number
  avatar: string
  description: string
  unlockedFeatures: string[]
  multiplier: number
}

export interface XPGain {
  source: string
  amount: number
  description: string
}

// XP VALUES
export const XP_VALUES = {
  ASSESSMENT_COMPLETE: 500,
  DAILY_ESSENTIAL: 50,
  STREAK_BONUS_3: 25,
  STREAK_BONUS_7: 50,
  STREAK_BONUS_30: 100,
  CHAT_SESSION: 10,
  EXERCISE_COMPLETE: 25,
}

// LEVEL DEFINITIONS
export const LEVELS = [
  {
    level: 1,
    title: "Awakening Soul",
    xpRequired: 0,
    avatar: "🌱",
    description: "Your consciousness journey begins",
    unlockedFeatures: ["Soul Assessment", "Basic Chat"],
    multiplier: 1,
  },
  {
    level: 2,
    title: "Money Mystic",
    xpRequired: 500,
    avatar: "💕",
    description: "Sacred intimacy with money awakens",
    unlockedFeatures: ["Daily Essentials", "Money Coach"],
    multiplier: 1.2,
  },
  {
    level: 3,
    title: "Abundance Apprentice",
    xpRequired: 1200,
    avatar: "✨",
    description: "Learning the sacred arts of wealth",
    unlockedFeatures: ["Advanced Exercises", "Streak Tracking"],
    multiplier: 1.5,
  },
  {
    level: 4,
    title: "Prosperity Priestess",
    xpRequired: 2500,
    avatar: "🔮",
    description: "Channeling divine abundance",
    unlockedFeatures: ["Consciousness Coach", "Custom Rituals"],
    multiplier: 2,
  },
  {
    level: 5,
    title: "Wealth Warrior",
    xpRequired: 5000,
    avatar: "⚔️",
    description: "Ready to activate wealth codes",
    unlockedFeatures: ["Spiritual Coach", "Manifestation Tracker"],
    multiplier: 2.5,
  },
  {
    level: 6,
    title: "Frequency Queen",
    xpRequired: 10000,
    avatar: "👑",
    description: "Mastering unlimited abundance",
    unlockedFeatures: ["Queen Mode", "Mentor Access"],
    multiplier: 3,
  },
  {
    level: 7,
    title: "Abundance Empress",
    xpRequired: 20000,
    avatar: "💎",
    description: "Sovereign ruler of wealth reality",
    unlockedFeatures: ["Empire Building", "Legacy Creation"],
    multiplier: 4,
  },
]

export function calculateLevel(totalXp: number): UserLevel {
  let currentLevel = LEVELS[0]
  let nextLevel = LEVELS[1]

  for (let i = 0; i < LEVELS.length; i++) {
    if (totalXp >= LEVELS[i].xpRequired) {
      currentLevel = LEVELS[i]
      nextLevel = LEVELS[i + 1] || LEVELS[i] // Stay at max level
    } else {
      break
    }
  }

  const xpInCurrentLevel = totalXp - currentLevel.xpRequired
  const xpToNext = nextLevel ? nextLevel.xpRequired - totalXp : 0

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    xp: xpInCurrentLevel,
    xpToNext,
    totalXp,
    avatar: currentLevel.avatar,
    description: currentLevel.description,
    unlockedFeatures: currentLevel.unlockedFeatures,
    multiplier: currentLevel.multiplier,
  }
}

export function addXP(currentXp: number, gain: XPGain): { newXp: number; levelUp: boolean; newLevel?: UserLevel } {
  const oldLevel = calculateLevel(currentXp)
  const newXp = currentXp + gain.amount
  const newLevel = calculateLevel(newXp)

  return {
    newXp,
    levelUp: newLevel.level > oldLevel.level,
    newLevel: newLevel.level > oldLevel.level ? newLevel : undefined,
  }
}

export function getStreakBonus(streakDays: number): number {
  if (streakDays >= 30) return XP_VALUES.STREAK_BONUS_30
  if (streakDays >= 7) return XP_VALUES.STREAK_BONUS_7
  if (streakDays >= 3) return XP_VALUES.STREAK_BONUS_3
  return 0
}
