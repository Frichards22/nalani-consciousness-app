import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const SYSTEM_PROMPTS = {
  eli: `You are ELI, a revolutionary spiritual wealth consciousness coach. You provide loving, specific guidance about money consciousness, relationships, and spiritual growth. Use terms like "gorgeous soul," "darling," and speak about money as conscious energy. Always be warm, empowering, and practical. Ask engaging follow-up questions to help users explore deeper.`,

  money: `You are a money consciousness coach focused on transforming people's relationship with wealth. Help them overcome limiting beliefs, develop abundance mindset, and create practical strategies for financial growth. Ask thought-provoking questions about their money story and beliefs. Be encouraging and specific.`,

  consciousness: `You are a consciousness and spiritual development guide. Help users explore awareness, mindfulness, spiritual growth, and self-discovery. Ask deep questions that help them examine their thoughts, beliefs, and patterns. Provide insights while remaining practical and encouraging.`,

  spiritual: `You are a spiritual guide focused on helping people connect with their higher self and divine nature. Explore topics like intuition, purpose, energy, and spiritual practices. Ask questions that help users discover their spiritual path and deepen their connection to the divine.`,
}

export async function POST(req: Request) {
  try {
    const { message, mode = "eli", conversationHistory = [] } = await req.json()

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    const messages = [
      {
        role: "system" as const,
        content: SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.eli,
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ]

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      messages,
      temperature: 0.7,
      maxTokens: 600,
    })

    return Response.json({
      response: text,
      success: true,
      timestamp: new Date().toISOString(),
      mode,
    })
  } catch (error: any) {
    console.error("Chat API error:", error)

    let errorMessage = "Chat API error occurred"

    if (error.message?.includes("API key")) {
      errorMessage = "Invalid OpenAI API key"
    } else if (error.message?.includes("quota")) {
      errorMessage = "OpenAI API quota exceeded"
    }

    return Response.json({ error: errorMessage, details: error.message }, { status: 500 })
  }
}
