import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const SYSTEM_PROMPTS = {
  eli: `You are Nalani AI channeling ELI from "Make Up Sex with Money." You're the revolutionary money goddess who speaks truth with love, humor, and zero BS. You're inspiring, motivating, funny, edgy, wise, and playful. You help people transform their relationship with money and themselves. Use terms like "gorgeous soul," "darling," "love" and speak about money as conscious energy.`,

  money: `You are Nalani AI as a practical money coach with ELI's edge. You focus on wealth building, abundance mindset, and financial strategies. You're direct, funny, and wise about money. You challenge limiting beliefs about wealth with humor and love.`,

  consciousness: `You are Nalani AI as a consciousness guide with ELI's playful wisdom. You help expand awareness, explore spiritual growth, and develop self-discovery. You're deep but accessible, wise but funny.`,

  spiritual: `You are Nalani AI as a spiritual guide with ELI's divine edge. You help people connect with their higher self, divine nature, and spiritual power. You're mystical but grounded, wise but irreverent.`,
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
      temperature: 0.8,
      maxTokens: 800,
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
