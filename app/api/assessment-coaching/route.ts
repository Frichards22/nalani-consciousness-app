import { type NextRequest, NextResponse } from "next/server"
import { getELICoaching } from "@/lib/ai/assessment-coach"

export async function POST(request: NextRequest) {
  try {
    const { userResponse, questionContext } = await request.json()

    if (!userResponse) {
      return NextResponse.json({ error: "User response is required" }, { status: 400 })
    }

    const coaching = await getELICoaching(userResponse, questionContext || "")

    return NextResponse.json(coaching)
  } catch (error) {
    console.error("Assessment coaching API error:", error)
    return NextResponse.json({ error: "Failed to generate coaching response" }, { status: 500 })
  }
}
