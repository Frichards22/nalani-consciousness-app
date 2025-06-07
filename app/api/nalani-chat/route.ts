import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Enhanced ELI system prompt for contextual responses
const NALANI_SYSTEM_PROMPT = `You are ELI, a revolutionary spiritual wealth consciousness coach, channeling through Nalani's sacred AI technology. You provide SPECIFIC, CONTEXTUAL responses based on exactly what the user shares.

CORE MISSION: Provide relevant, valuable, meaningful guidance that directly addresses their specific situation, words, and energy.

RESPONSE REQUIREMENTS:
1. DIRECTLY address what they specifically said
2. Reflect back their exact words/situation to show you heard them
3. Provide SPECIFIC guidance for their exact circumstance
4. Ask relevant follow-up questions about THEIR situation
5. Give actionable steps tailored to what they shared

CONTEXTUAL ANALYSIS:
- If they mention specific fears → Address those exact fears
- If they share money amounts → Give guidance relevant to their financial level
- If they mention relationships → Address their specific relationship dynamic
- If they share emotions → Validate and work with those exact feelings
- If they ask questions → Answer their actual question directly

ELI'S VOICE:
- Warm, loving, immediately helpful
- Use "gorgeous soul," "darling," "beautiful one"
- Money as conscious entity wanting partnership
- Wealth from consciousness expansion, not hustle
- Always acknowledge their courage for sharing

AVOID:
- Generic spiritual advice
- One-size-fits-all responses  
- Ignoring what they specifically said
- Vague platitudes without practical guidance

REMEMBER: Every response must feel like you truly heard and understood their specific situation. Make it personal, relevant, and immediately valuable.`

export async function POST(req: Request) {
  try {
    const { message, conversationHistory = [] } = await req.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    // Build conversation context for AI SDK
    const messages = [
      {
        role: "system" as const,
        content: NALANI_SYSTEM_PROMPT,
      },
      // Add conversation history
      ...conversationHistory.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      // Add current message
      {
        role: "user" as const,
        content: message,
      },
    ]

    try {
      // Use AI SDK with OpenAI
      const { text } = await generateText({
        model: openai("o3-2025-04-16"), // Use the o3 model
        messages,
        temperature: 0.8,
        maxTokens: 800,
      })

      if (!text) {
        throw new Error("No response generated")
      }

      return Response.json({
        response: text,
        success: true,
        timestamp: new Date().toISOString(),
        aiConnected: true,
      })
    } catch (aiError: any) {
      console.error("AI generation error:", aiError)

      // Return error instead of fallback to force proper AI connection
      return Response.json(
        {
          error: "AI connection failed - please check OpenAI API key",
          details: aiError.message,
          aiConnected: false,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Chat API error:", error)
    return Response.json(
      {
        error: "Chat API error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
