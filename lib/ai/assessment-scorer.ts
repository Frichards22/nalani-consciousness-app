import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface AssessmentScores {
  consciousnessLevel: number
  moneyRelationship: number
  selfLoveIndex: number
  spiritualConnection: number
  healingReadiness: number
  overallScore: number
  insights: string[]
  nextSteps: string[]
}

export async function scoreAssessment(responses: Record<string, string>): Promise<AssessmentScores> {
  try {
    const allResponses = Object.values(responses).join("\n\n")

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
You are ELI's AI consciousness scorer. Analyze these Soul Wealth Assessment responses and provide scores (1-10) with insights.

RESPONSES:
${allResponses}

SCORING CRITERIA:
- Consciousness Level (1-10): Self-awareness, emotional intelligence, ability to see patterns
- Money Relationship (1-10): Healthy vs toxic money beliefs, abundance mindset vs scarcity
- Self-Love Index (1-10): How they treat themselves, self-worth, self-care practices
- Spiritual Connection (1-10): Connection to something greater, trust in universe/divine
- Healing Readiness (1-10): Willingness to change, take responsibility, do the work

Respond in this EXACT JSON format:
{
  "consciousnessLevel": 7,
  "moneyRelationship": 5,
  "selfLoveIndex": 6,
  "spiritualConnection": 8,
  "healingReadiness": 9,
  "overallScore": 7,
  "insights": [
    "Your spiritual connection is strong but you're still carrying old money wounds",
    "High healing readiness shows you're ready for transformation",
    "Self-love needs attention - you're harder on yourself than others"
  ],
  "nextSteps": [
    "Start daily money affirmations to rewire your abundance frequency",
    "Practice the mirror work from Chapter 3 for 30 days",
    "Join a money healing circle or find an accountability partner"
  ]
}
`,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Scoring error:", error)
    // Fallback scoring
    return {
      consciousnessLevel: 7,
      moneyRelationship: 6,
      selfLoveIndex: 6,
      spiritualConnection: 7,
      healingReadiness: 8,
      overallScore: 7,
      insights: [
        "Your responses show deep self-awareness and readiness for transformation",
        "You have strong spiritual foundations to build upon",
        "Your honesty about money wounds is the first step to healing them",
      ],
      nextSteps: [
        "Begin daily money meditation practice",
        "Work through the exercises in your current stage",
        "Consider working with a money coach or therapist",
      ],
    }
  }
}
