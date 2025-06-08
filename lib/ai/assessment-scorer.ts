export interface AssessmentScores {
  consciousnessLevel: number
  moneyRelationship: number
  selfLoveIndex: number
  spiritualConnection: number
  healingReadiness: number
  overallScore: number
  insights: string[]
  nextSteps: string[]
  methodology: {
    description: string
    factors: string[]
  }
}

export async function scoreAssessment(responses: Record<string, string>): Promise<AssessmentScores> {
  // Combine all responses for analysis
  const allText = Object.values(responses).join(" ").toLowerCase()

  // SCORING METHODOLOGY - Easy to understand!
  const methodology = {
    description: "Your scores are based on 5 key factors that predict wealth consciousness success:",
    factors: [
      "🧠 Self-Awareness: How well you understand your patterns and triggers",
      "💰 Money Mindset: Your relationship with abundance vs scarcity thinking",
      "💕 Self-Love: How you treat and value yourself",
      "✨ Spiritual Connection: Your trust in something greater than yourself",
      "🔥 Healing Readiness: Your willingness to change and do the work",
    ],
  }

  // CONSCIOUSNESS LEVEL (1-10)
  let consciousnessLevel = 5 // Base score

  // Positive indicators (+points)
  if (allText.includes("aware") || allText.includes("realize") || allText.includes("understand"))
    consciousnessLevel += 1
  if (allText.includes("pattern") || allText.includes("trigger") || allText.includes("behavior"))
    consciousnessLevel += 1
  if (allText.includes("responsible") || allText.includes("choice") || allText.includes("decide"))
    consciousnessLevel += 1
  if (allText.includes("growth") || allText.includes("learn") || allText.includes("evolve")) consciousnessLevel += 1

  // Negative indicators (-points)
  if (allText.includes("victim") || allText.includes("blame") || allText.includes("fault")) consciousnessLevel -= 1
  if (allText.includes("can't") || allText.includes("impossible") || allText.includes("never")) consciousnessLevel -= 1

  consciousnessLevel = Math.max(1, Math.min(10, consciousnessLevel))

  // MONEY RELATIONSHIP (1-10)
  let moneyRelationship = 5 // Base score

  // Positive indicators
  if (allText.includes("abundance") || allText.includes("flow") || allText.includes("receive")) moneyRelationship += 1
  if (allText.includes("grateful") || allText.includes("appreciate") || allText.includes("thank"))
    moneyRelationship += 1
  if (allText.includes("deserve") || allText.includes("worthy") || allText.includes("enough")) moneyRelationship += 1
  if (allText.includes("partner") || allText.includes("relationship") || allText.includes("love"))
    moneyRelationship += 1

  // Negative indicators
  if (allText.includes("evil") || allText.includes("bad") || allText.includes("dirty")) moneyRelationship -= 1
  if (allText.includes("fear") || allText.includes("scared") || allText.includes("anxiety")) moneyRelationship -= 1
  if (allText.includes("greedy") || allText.includes("selfish") || allText.includes("wrong")) moneyRelationship -= 1

  moneyRelationship = Math.max(1, Math.min(10, moneyRelationship))

  // SELF-LOVE INDEX (1-10)
  let selfLoveIndex = 5 // Base score

  // Positive indicators
  if (allText.includes("love myself") || allText.includes("care for") || allText.includes("nurture")) selfLoveIndex += 1
  if (allText.includes("boundaries") || allText.includes("no") || allText.includes("protect")) selfLoveIndex += 1
  if (allText.includes("beautiful") || allText.includes("amazing") || allText.includes("powerful")) selfLoveIndex += 1
  if (allText.includes("forgive") || allText.includes("compassion") || allText.includes("gentle")) selfLoveIndex += 1

  // Negative indicators
  if (allText.includes("hate myself") || allText.includes("stupid") || allText.includes("failure")) selfLoveIndex -= 2
  if (allText.includes("not enough") || allText.includes("worthless") || allText.includes("broken")) selfLoveIndex -= 1

  selfLoveIndex = Math.max(1, Math.min(10, selfLoveIndex))

  // SPIRITUAL CONNECTION (1-10)
  let spiritualConnection = 5 // Base score

  // Positive indicators
  if (allText.includes("universe") || allText.includes("divine") || allText.includes("god")) spiritualConnection += 1
  if (allText.includes("trust") || allText.includes("faith") || allText.includes("believe")) spiritualConnection += 1
  if (allText.includes("guided") || allText.includes("intuition") || allText.includes("inner")) spiritualConnection += 1
  if (allText.includes("meditation") || allText.includes("prayer") || allText.includes("spiritual"))
    spiritualConnection += 1

  // Negative indicators
  if (allText.includes("alone") || allText.includes("disconnected") || allText.includes("nothing"))
    spiritualConnection -= 1

  spiritualConnection = Math.max(1, Math.min(10, spiritualConnection))

  // HEALING READINESS (1-10)
  let healingReadiness = 5 // Base score

  // Positive indicators
  if (allText.includes("ready") || allText.includes("willing") || allText.includes("commit")) healingReadiness += 1
  if (allText.includes("change") || allText.includes("transform") || allText.includes("heal")) healingReadiness += 1
  if (allText.includes("work") || allText.includes("practice") || allText.includes("daily")) healingReadiness += 1
  if (allText.includes("excited") || allText.includes("motivated") || allText.includes("determined"))
    healingReadiness += 1

  // Negative indicators
  if (allText.includes("tired") || allText.includes("exhausted") || allText.includes("give up")) healingReadiness -= 1
  if (allText.includes("too hard") || allText.includes("impossible") || allText.includes("can't do"))
    healingReadiness -= 1

  healingReadiness = Math.max(1, Math.min(10, healingReadiness))

  // OVERALL SCORE (weighted average)
  const overallScore =
    Math.round(
      (consciousnessLevel * 0.25 +
        moneyRelationship * 0.25 +
        selfLoveIndex * 0.2 +
        spiritualConnection * 0.15 +
        healingReadiness * 0.15) *
        10,
    ) / 10

  // GENERATE INSIGHTS based on scores
  const insights: string[] = []

  if (consciousnessLevel >= 8) {
    insights.push("Your self-awareness is exceptional! You're operating from a high consciousness level.")
  } else if (consciousnessLevel <= 4) {
    insights.push("Building self-awareness will be your fastest path to transformation.")
  }

  if (moneyRelationship >= 8) {
    insights.push("You have a beautiful, healthy relationship with money! You're ready for abundance.")
  } else if (moneyRelationship <= 4) {
    insights.push("Healing your money wounds is your top priority for wealth creation.")
  }

  if (selfLoveIndex >= 8) {
    insights.push("Your self-love practice is strong! This is your foundation for everything.")
  } else if (selfLoveIndex <= 4) {
    insights.push("Self-love is where your healing journey begins. You deserve to be cherished by you.")
  }

  // GENERATE NEXT STEPS based on lowest scores
  const nextSteps: string[] = []
  const scores = { consciousnessLevel, moneyRelationship, selfLoveIndex, spiritualConnection, healingReadiness }
  const lowestScore = Math.min(...Object.values(scores))

  if (consciousnessLevel === lowestScore) {
    nextSteps.push("Start a daily awareness practice - notice your thoughts and patterns without judgment")
  }
  if (moneyRelationship === lowestScore) {
    nextSteps.push("Begin the Money Love Letters exercise - write to money like a beloved friend")
  }
  if (selfLoveIndex === lowestScore) {
    nextSteps.push("Create a daily self-love ritual - one loving act for yourself every day")
  }
  if (spiritualConnection === lowestScore) {
    nextSteps.push("Develop your spiritual practice - meditation, prayer, or nature connection")
  }
  if (healingReadiness === lowestScore) {
    nextSteps.push("Start small - commit to just one healing practice for 7 days")
  }

  return {
    consciousnessLevel,
    moneyRelationship,
    selfLoveIndex,
    spiritualConnection,
    healingReadiness,
    overallScore,
    insights,
    nextSteps,
    methodology,
  }
}
