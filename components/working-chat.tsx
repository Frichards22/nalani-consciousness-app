"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, RefreshCw, Sparkles, Brain, Heart, Bot } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  mode?: string
  coaching?: string
}

export default function WorkingChat() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [mode, setMode] = useState<string>("eli")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
      mode,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Generate contextual coaching based on user input
      const coaching = generateContextualCoaching(input, mode)

      // Create assistant response with personalized coaching
      const assistantMessage: Message = {
        role: "assistant",
        content: generateAssistantResponse(input, mode),
        timestamp: new Date(),
        mode,
        coaching,
      }

      // Add a small delay to simulate processing
      setTimeout(() => {
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 800)
    } catch (error) {
      console.error("Error in chat:", error)
      setIsLoading(false)
    }
  }

  const generateContextualCoaching = (userInput: string, chatMode: string): string => {
    const input = userInput.toLowerCase()

    // Money patterns detection
    const hasScarcity = /not enough|lack|struggle|can't afford|poor|broke|debt|bills|worry about money/i.test(input)
    const hasAbundance = /abundance|wealthy|rich|prosperity|flow|receive|deserve|grateful|blessing|money comes/i.test(
      input,
    )
    const hasFear = /afraid|fear|scared|anxious|worry|stress|panic|overwhelm/i.test(input)
    const hasDesire = /want|wish|hope|dream|desire|goal|intention|manifest|create/i.test(input)
    const hasWorthiness = /worth|deserve|enough|value|self-worth|self-love|worthy/i.test(input)
    const hasRelationship = /relationship|partner|marriage|dating|love|connection|intimacy/i.test(input)
    const hasSpiritual = /spiritual|divine|universe|god|source|energy|soul|meditation|prayer/i.test(input)

    // Specific book exercises and practices based on content
    if (chatMode === "eli") {
      if (hasScarcity) {
        return "**TRY THIS:** Do the 'Money Wounds Inventory' from Chapter 3. Write down every negative money belief you've inherited, then ask: 'Whose voice is this really?' For each one, create a counter-statement: 'I release the belief that ___ and claim the truth that ___.' Do this daily for 7 days while placing your hand on your heart to rewire your nervous system."
      }

      if (hasAbundance) {
        return "**PRACTICE THIS:** Use the 'Frequency Amplification' technique from Chapter 7. For 3 minutes each morning, stand with arms wide open and declare: 'I am a magnet for money. Money flows to me easily and abundantly.' Then list 5 specific ways money has already come to you this week. This activates your Reticular Activating System to notice more evidence of abundance."
      }

      if (hasFear) {
        return "**DO THIS NOW:** Try the '90-Second Fear Flush' from Chapter 5. When fear arises: 1) Place one hand on your heart, one on your belly 2) Breathe deeply for 90 seconds while saying 'I am safe with money' 3) Ask 'What would love do instead of fear?' This interrupts your amygdala's fear response and activates your prefrontal cortex."
      }

      if (hasWorthiness) {
        return "**TONIGHT'S HOMEWORK:** Do the 'Worth Reclamation' mirror practice from Chapter 4. Stand before a mirror, look into your eyes, and declare: 'I am worthy because I exist. My worth is my birthright.' Then list 3 ways you've added value to the world today. This rewires your worthiness neural pathways through the power of self-witnessing."
      }

      if (hasRelationship && hasScarcity) {
        return "**TRY THIS EXERCISE:** Complete the 'Parallel Patterns' worksheet from Chapter 9. In two columns, list your relationship patterns and money patterns. Circle the similarities. Then use the 'Ho'oponopono Money Healing' practice: For each pattern, say 'I'm sorry. Please forgive me. Thank you. I love you.' to both money and your partner."
      }

      if (hasSpiritual) {
        return "**SACRED PRACTICE:** Implement the 'Divine Money Connection' ritual from Chapter 6. Create a money altar with symbols of abundance. Each morning, place your hand on your heart and say: 'Divine Source, flow through me as abundance today. Use me as a channel for prosperity.' Then visualize golden light flowing from Source, through your crown chakra, and out your hands as money."
      }

      // Default ELI coaching with specific practice
      return "**START HERE:** Begin with the 'Consciousness Calibration' exercise from Chapter 2. Rate your current money consciousness from 1-10. Then identify which of the 7 Money Archetypes from the book you're currently embodying (Avoider, Worrier, Spender, Hoarder, Giver, Receiver, or Alchemist). This awareness alone will shift your relationship with wealth."
    }

    if (chatMode === "money") {
      if (hasScarcity || hasFear) {
        return "**PRACTICAL STEP:** Use the 'Money Dialogue' technique from page 87. Write a letter from Money to you, then respond as yourself. Ask: 'Money, what do you need from me to feel safe in this relationship?' Then actually implement what Money tells you - even if it's as simple as checking your bank balance daily without judgment."
      }

      if (hasAbundance) {
        return "**ABUNDANCE ACCELERATOR:** Practice the 'Receiving Meditation' from page 112. Sit with palms open upward for 5 minutes daily while breathing deeply and repeating: 'I open to receive all forms of abundance now.' Then immediately afterward, write down 3 unexpected gifts you've received in the past 24 hours."
      }

      // Default money coaching with specific tip
      return "**TRY THIS TODAY:** Implement the 'Sacred Money Date' practice from page 65. Schedule 20 minutes weekly to review your finances with curiosity instead of judgment. Light a candle, play beautiful music, and approach your money as you would a lover - with presence, care and attention. Notice how this shifts your entire relationship with wealth."
    }

    // Default coaching for other modes with specific suggestion
    return "**ACTION STEP:** Use the 'Frequency Finder' tool from page 43. On a scale of 1-10, rate your current emotional state about this situation. Then ask: 'What would raise my frequency by just 1 point?' Take that small action immediately. This incremental approach creates sustainable transformation rather than temporary motivation."
  }

  const generateAssistantResponse = (userInput: string, chatMode: string): string => {
    const input = userInput.toLowerCase()

    if (chatMode === "eli") {
      // ELI mode responses - authentic voice from Make Up Sex with Money
      if (input.includes("help") || input.includes("stuck") || input.includes("struggle")) {
        return "Gorgeous soul, I see you. That struggle isn't a sign you're doing it wrong - it's a sign you're breaking through old patterns. Your consciousness is expanding faster than your reality can keep up. Trust this process. The breakthrough always comes after the resistance, never before it. What if this challenge is actually preparing you for your next level of abundance? What if everything is happening FOR you, not TO you?"
      }

      if (input.includes("money") || input.includes("wealth") || input.includes("abundance")) {
        return "Money is just conscious energy waiting to dance with you, darling. It's not just paper or numbers - it's a mirror reflecting your beliefs about worthiness and receiving. When you shift your relationship with money from fear to love, from scarcity to sacred partnership, everything changes. Your bank account is simply waiting for your frequency to rise. What would change if you treated money as a conscious entity that responds to love, gratitude, and clear communication?"
      }

      if (input.includes("worth") || input.includes("deserve") || input.includes("value")) {
        return "Listen to me, beautiful one: Your worthiness isn't something you earn - it's your birthright. You don't need to hustle for your value. You don't need to prove anything to deserve abundance. Your net worth will never exceed your self-worth, so the most important wealth work you can do is healing that worthiness wound. You are enough. You've always been enough. The Universe is just waiting for you to remember this truth."
      }

      // Default ELI response
      return "Beautiful soul, I see the divine light in you even when you can't see it yourself. You're in the middle of a sacred evolution - breaking patterns, expanding consciousness, and remembering who you truly are. Trust this process. Your awareness is already shifting your frequency, and your reality will soon follow. What if everything is unfolding in divine perfect timing? What if you're exactly where you need to be for your next quantum leap?"
    }

    if (chatMode === "money") {
      // Money Intimacy mode - focused on relationship with money
      return "Money is conscious energy that responds to how you treat it. Think of money as a relationship - it requires trust, communication, respect, and care. How would your financial life change if you approached money as a sacred partnership rather than a necessary evil? The quality of your relationship with money directly impacts how much of it flows to you and through you."
    }

    if (chatMode === "coach") {
      // Coach mode - practical guidance with spiritual foundation
      return "I hear you. Remember that every challenge is an opportunity for growth and every pattern is information, not a life sentence. What if you approached this situation with curiosity instead of judgment? What might shift if you saw this as happening FOR you rather than TO you? Your consciousness creates your reality - and you have the power to choose a new perspective at any moment."
    }

    // Default response for other modes
    return "Thank you for sharing that with me. Your awareness and willingness to explore these thoughts and feelings is the first step toward transformation. What feels like the next aligned step for you in this journey?"
  }

  const resetChat = () => {
    setMessages([])
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
      <CardHeader className="p-4 border-b border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-indigo-400">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-indigo-600 text-white">ELI</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl text-white">ELI Chat</CardTitle>
            <Badge variant="outline" className="ml-2 text-xs font-normal text-indigo-300 border-indigo-400">
              {mode === "eli" ? "ELI Coach" : mode === "money" ? "Money Intimacy" : "Consciousness Coach"}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetChat}
            className="h-8 w-8 text-indigo-300 hover:text-white hover:bg-indigo-700/50"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <Tabs value={mode} onValueChange={setMode} className="w-full">
        <div className="px-4 py-2 bg-indigo-900/30">
          <TabsList className="w-full bg-indigo-800/50">
            <TabsTrigger
              value="eli"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              <div className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>ELI Coach</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="money"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white"
            >
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                <span>Money Intimacy</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="coach"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
            >
              <div className="flex items-center gap-1">
                <Brain className="h-3.5 w-3.5" />
                <span>Consciousness Coach</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-0">
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <Bot className="h-12 w-12 text-indigo-400 mb-4" />
                  <p className="text-indigo-200 font-medium">
                    {mode === "eli"
                      ? "Chat with ELI about money, consciousness, and your spiritual evolution"
                      : mode === "money"
                        ? "Explore your relationship with money and heal your money wounds"
                        : "Get coaching on expanding your consciousness and manifesting your desires"}
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-indigo-600 text-white"
                          : "bg-gradient-to-r from-purple-900/70 to-indigo-900/70 border border-purple-500/30 text-white"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6 border border-purple-400">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback className="bg-purple-600 text-white text-xs">ELI</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-semibold text-purple-300">
                            {message.mode === "eli"
                              ? "ELI Coach"
                              : message.mode === "money"
                                ? "Money Intimacy"
                                : "Consciousness Coach"}
                          </span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{message.content}</p>

                      {/* Coaching Insight - Now contextual and dynamic */}
                      {message.role === "assistant" && message.coaching && (
                        <div className="mt-3 pt-3 border-t border-purple-500/30">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                            <span className="text-sm font-semibold text-pink-400">Coaching Insight</span>
                          </div>
                          <p className="text-sm text-indigo-100">{message.coaching}</p>
                        </div>
                      )}

                      <div className="mt-2 text-right">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 border-t border-indigo-500/30">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "eli"
                  ? "Ask ELI about money, consciousness, or your spiritual journey..."
                  : mode === "money"
                    ? "Share your money story or ask about your relationship with wealth..."
                    : "Ask for guidance on expanding your consciousness..."
              }
              className="min-h-[60px] bg-indigo-900/30 border-indigo-500/50 text-white placeholder:text-indigo-300 focus:border-purple-400"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`px-4 ${
                mode === "eli"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600"
                  : mode === "money"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
              }`}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Tabs>
    </Card>
  )
}
