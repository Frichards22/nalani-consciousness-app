"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, TrendingUp, Loader2, CheckCircle, Heart } from "lucide-react"

const soulQuestions = [
  {
    id: "soul-purpose",
    question: "What makes your soul feel most alive and on purpose?",
    subtext: "This reveals your deepest calling and spiritual alignment",
    category: "Purpose & Calling",
  },
  {
    id: "money-feeling",
    question: "When you think about having unlimited money, what's the first emotion that comes up?",
    subtext: "Your body's response reveals your true relationship with abundance",
    category: "Money Consciousness",
  },
  {
    id: "divine-connection",
    question: "How do you experience your connection to something greater than yourself?",
    subtext: "This shows your spiritual development and divine partnership",
    category: "Divine Connection",
  },
  {
    id: "inner-wisdom",
    question: "Describe a time when you trusted your intuition completely. What happened?",
    subtext: "Your relationship with inner guidance reveals consciousness level",
    category: "Intuitive Wisdom",
  },
  {
    id: "worthiness-blocks",
    question: "What story do you tell yourself about why you can't have everything you desire?",
    subtext: "This uncovers the core worthiness patterns affecting your reality",
    category: "Worthiness & Blocks",
  },
  {
    id: "love-expression",
    question: "How do you express love to yourself when no one is watching?",
    subtext: "Self-love is the foundation of all abundance and manifestation",
    category: "Self-Love & Care",
  },
  {
    id: "quantum-vision",
    question: "If you knew you couldn't fail, what would you create in the world?",
    subtext: "This reveals your soul's highest vision and quantum potential",
    category: "Quantum Vision",
  },
]

interface SoulAssessmentProps {
  onUpdateStats?: (updates: Record<string, Record<string, number>>) => void
  currentStats?: any
}

export default function SoulAssessmentQA({ onUpdateStats, currentStats }: SoulAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, any>>({})
  const [showAIResponse, setShowAIResponse] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentAI, setCurrentAI] = useState<any>(null)

  const currentQuestion = soulQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / soulQuestions.length) * 100

  const handleResponse = (questionId: string, answer: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }))
  }

  const getELICoaching = (question: any, response: string): any => {
    const responseText = response.toLowerCase()

    // First, acknowledge what they actually wrote with ELI's personality
    let acknowledgment = ""

    // Handle specific responses with ELI's humor and wisdom
    if (responseText.includes("devil") || responseText.includes("satan") || responseText.includes("hell")) {
      acknowledgment =
        "😈 **THE DEVIL?! I'm CACKLING!** You know what, gorgeous? That's the most honest answer I've heard all day. Most people give me some sanitized spiritual bullshit, but you went THERE. "
    } else if (responseText.includes("nothing") || responseText.includes("don't") || responseText.includes("can't")) {
      acknowledgment =
        "💔 **Oh honey, I feel that disconnection in my bones.** That 'nothing' you're feeling? It's not emptiness - it's your soul crying out for something REAL. "
    } else if (responseText.includes("nature") || responseText.includes("trees") || responseText.includes("ocean")) {
      acknowledgment =
        "🌿 **YES! Nature is where the magic happens!** You're one of those souls who remembers that the Divine isn't in some distant heaven - it's in every leaf, every wave, every breath. "
    } else if (
      responseText.includes("meditation") ||
      responseText.includes("prayer") ||
      responseText.includes("church")
    ) {
      acknowledgment =
        "🙏 **Beautiful! You've found your sacred practice.** Whether it's meditation, prayer, or sitting in church - you know how to tune into something bigger. "
    } else if (responseText.includes("music") || responseText.includes("dance") || responseText.includes("art")) {
      acknowledgment =
        "🎵 **Art as spiritual practice? GENIUS!** You understand that creativity IS divinity expressing itself through you. "
    } else if (responseText.includes("fuck") || responseText.includes("shit") || responseText.includes("damn")) {
      acknowledgment = "🔥 **I LOVE the raw honesty!** No spiritual bypassing here - you're keeping it 100% real. "
    } else if (responseText.length < 5) {
      acknowledgment = `💫 **'${response}' - short and powerful!** Sometimes the deepest truths need the fewest words. `
    } else {
      acknowledgment = `✨ **Thank you for sharing: "${response}"** - I can feel the authenticity in your words. `
    }

    // Then provide specific coaching based on the question category
    switch (question.category) {
      case "Purpose & Calling":
        if (responseText.includes("money") || responseText.includes("rich") || responseText.includes("wealth")) {
          return {
            analysis:
              acknowledgment +
              "Here's the plot twist: when you're truly on purpose, money becomes your PARTNER, not your goal. Your soul's calling is the magnet that draws abundance to you. **DO THIS:** Write down 3 ways your purpose could generate income. Your soul's work is meant to be profitable!",
            insight: "Purpose + Profit = Your soul's true expression. You're not meant to be broke and spiritual.",
            guidance:
              "Start the Purpose-to-Profit Practice from Chapter 8: Ask your soul 'How can I serve AND prosper?' every morning for 7 days.",
            statBoosts: { purpose: 15, abundance: 10 },
          }
        }
        if (responseText.includes("help") || responseText.includes("serve") || responseText.includes("heal")) {
          return {
            analysis:
              acknowledgment +
              "Your soul is wired for SERVICE - that's your abundance frequency! But here's what most healers get wrong: you can't pour from an empty cup. Your service is MORE powerful when you're financially free. **PRACTICE:** The Wealthy Healer Meditation - visualize yourself serving from overflow, not depletion.",
            insight: "Service without self-care is martyrdom, not ministry. You're meant to heal AND be wealthy.",
            guidance:
              "Do the Receiving Practice: Allow yourself to receive one gift daily for 30 days. This expands your capacity to serve from abundance.",
            statBoosts: { service: 12, receiving: 8 },
          }
        }
        return {
          analysis:
            acknowledgment +
            "Your purpose is your soul's GPS to abundance. When you're aligned with what makes you feel most alive, money flows naturally. **TRUTH BOMB:** You don't find your purpose - you REMEMBER it. It's been calling to you your whole life.",
          insight: "Your purpose isn't separate from your prosperity - it's the pathway to it.",
          guidance:
            "Do the Soul Calling Meditation: Sit quietly and ask 'What wants to be born through me?' Trust the first answer.",
          statBoosts: { clarity: 10, alignment: 8 },
        }

      case "Money Consciousness":
        if (responseText.includes("fear") || responseText.includes("scared") || responseText.includes("panic")) {
          return {
            analysis:
              acknowledgment +
              "That fear is your nervous system protecting you from old wounds. But gorgeous, you're not that scared little one anymore. **HEALING PRACTICE:** Do the 90-Second Fear Flush from the book: Breathe in for 4, hold for 4, out for 6. While breathing, say 'I am safe to receive abundance.' This literally rewires your amygdala.",
            insight:
              "Fear is just excitement without breath. Your nervous system needs to learn that abundance is safe.",
            guidance:
              "Practice the Money Safety Meditation daily: Hold cash while saying 'Money is safe. I am safe. We are safe together.'",
            statBoosts: { safety: 15, courage: 10 },
          }
        }
        if (responseText.includes("excited") || responseText.includes("joy") || responseText.includes("happy")) {
          return {
            analysis:
              acknowledgment +
              "THAT'S your wealth frequency! That excitement is your soul recognizing its birthright. You're not just 'ready' for money - you're WIRED for it. **AMPLIFY THIS:** Do the Abundance Activation: Spend 5 minutes daily feeling into having unlimited money. Let that joy expand through your whole body.",
            insight: "Joy is your abundance GPS. The more you feel it, the more you attract what creates it.",
            guidance:
              "Create an Abundance Anchor: Touch your heart and say 'I choose joy' every time you think about money.",
            statBoosts: { joy: 20, magnetism: 15 },
          }
        }
        return {
          analysis:
            acknowledgment +
            "Your first emotional response to money is your wealth thermostat. Whatever came up is perfect information about your current frequency. **REMEMBER:** You can change your money story at any moment. You're not stuck with old programming.",
          insight: "Your emotions around money are your guidance system - they show you exactly what needs healing.",
          guidance:
            "Do the Emotional Freedom Technique: Tap on your karate chop point while saying 'Even though I have this feeling about money, I deeply love and accept myself.'",
          statBoosts: { awareness: 12, acceptance: 8 },
        }

      case "Divine Connection":
        if (responseText.includes("devil") || responseText.includes("dark") || responseText.includes("evil")) {
          return {
            analysis:
              acknowledgment +
              "Plot twist: even the 'devil' is part of the Divine! Your willingness to go to the shadow shows spiritual MATURITY. Most people only want the light and love parts. But integration is where the real power is. **SHADOW WORK:** Ask yourself: 'What would my dark side teach me about money?' Sometimes our 'demons' hold our greatest gifts.",
            insight:
              "The shadow isn't your enemy - it's your unexpressed power. Your darkness holds keys to your abundance.",
            guidance:
              "Do the Shadow Integration Practice: Have a conversation with your 'dark side' about money. What does it want? What is it protecting?",
            statBoosts: { integration: 20, power: 15 },
          }
        }
        if (responseText.includes("nothing") || responseText.includes("don't") || responseText.includes("alone")) {
          return {
            analysis:
              acknowledgment +
              "That disconnection you feel? It's not because the Divine isn't there - it's because you've been taught to look for it outside yourself. **TRUTH:** You ARE the Divine expressing itself in human form. The connection you're seeking is the connection to your own soul. **START HERE:** Put your hand on your heart and say 'I am Divine. I am enough. I am home.'",
            insight: "You're not disconnected from the Divine - you ARE the Divine having a human experience.",
            guidance:
              "Practice the Self-Recognition Meditation: Look in the mirror daily and say 'I see the Divine in you' to yourself.",
            statBoosts: { selfLove: 18, recognition: 12 },
          }
        }
        return {
          analysis:
            acknowledgment +
            "Your connection to the Divine is your secret weapon for abundance. When you know you're co-creating with the universe, scarcity becomes impossible. **COSMIC TRUTH:** The same force that grows flowers and moves planets wants to prosper you. Let it.",
          insight:
            "Divine partnership isn't about religion - it's about remembering you're part of something infinite.",
          guidance:
            "Practice Divine Co-creation: Before any money decision, ask 'What would Love do?' and trust the first answer.",
          statBoosts: { trust: 15, partnership: 12 },
        }

      case "Intuitive Wisdom":
        if (responseText.includes("ignored") || responseText.includes("wrong") || responseText.includes("mistake")) {
          return {
            analysis:
              acknowledgment +
              "Your intuition has been trying to save you from settling for crumbs when you deserve the whole feast! Every time you override your inner knowing, you're telling the universe 'I don't trust my own guidance.' **REBUILD TRUST:** Start with tiny decisions - which coffee to order, which route to take. Your intuition is your wealth compass.",
            insight: "Your intuition is never wrong - you just might misinterpret the timing or the message.",
            guidance:
              "Do the Intuition Strengthening Practice: Ask your body 'yes or no' questions and notice the physical sensations. Yes feels expansive, no feels contractive.",
            statBoosts: { trust: 15, intuition: 12 },
          }
        }
        return {
          analysis:
            acknowledgment +
            "Your intuition is your direct line to divine intelligence. The more you trust it, the more it guides you toward abundance. **MONEY INTUITION:** Start asking your inner wisdom about financial decisions. 'Should I buy this?' 'Is this investment aligned?' Your soul knows the way to wealth.",
          insight: "Intuition is the language of abundance. When you trust your inner knowing, you trust the flow.",
          guidance:
            "Practice the Money Intuition Check: Before any purchase, pause and ask 'Does this feel expansive or contractive?' Trust the first sensation.",
          statBoosts: { intuition: 18, flow: 10 },
        }

      case "Worthiness & Blocks":
        if (
          responseText.includes("not good enough") ||
          responseText.includes("don't deserve") ||
          responseText.includes("unworthy")
        ) {
          return {
            analysis:
              acknowledgment +
              "That 'not good enough' story? It's not even YOURS. You inherited it like an old coat that never fit right. **WORTHINESS TRUTH:** You were born worthy. You didn't earn it, you can't lose it, and you don't need to prove it. **PRACTICE:** Look in the mirror daily and say 'I am worthy of abundance simply because I exist.'",
            insight:
              "Worthiness isn't earned - it's your birthright. You're worthy because you're alive, not because of what you do.",
            guidance:
              "Do the Worthiness Reclamation: Write 'I am worthy of abundance' 100 times. Feel it in your body as you write.",
            statBoosts: { worthiness: 25, selfLove: 15 },
          }
        }
        return {
          analysis:
            acknowledgment +
            "Every 'I can't have' story is just old programming asking to be updated. **REWRITE TIME:** You get to be the author of your new money story. What if instead of 'I can't have everything I desire,' you said 'I'm learning to receive everything my soul calls in'?",
          insight: "Your blocks aren't permanent - they're just outdated software that needs updating.",
          guidance:
            "Practice the Story Rewrite: Take your limiting belief and flip it. 'I can't have money' becomes 'Money flows to me easily.'",
          statBoosts: { empowerment: 20, possibility: 12 },
        }

      case "Self-Love & Care":
        if (responseText.includes("nothing") || responseText.includes("don't") || responseText.includes("can't")) {
          return {
            analysis:
              acknowledgment +
              "Oh gorgeous, that breaks my heart and fires me up at the same time. You've been so busy taking care of everyone else that you forgot YOU matter too. **SELF-LOVE EMERGENCY:** Right now, put your hand on your heart and say 'I matter. I am worthy of love. I choose to care for myself.' This is where your money healing begins.",
            insight:
              "Self-love isn't selfish - it's the foundation of all abundance. You can't receive what you won't give yourself.",
            guidance:
              "Start the Daily Self-Love Practice: Do ONE loving thing for yourself daily - a bath, a walk, a compliment. Build the muscle of receiving your own love.",
            statBoosts: { selfLove: 25, receiving: 15 },
          }
        }
        return {
          analysis:
            acknowledgment +
            "Self-love is the foundation of all abundance. When you know how to love yourself, you teach others how to love you - including money. **SELF-LOVE = WEALTH:** The more you value yourself, the more valuable you become to the world.",
          insight: "How you treat yourself is how you teach money to treat you. Self-love is your abundance practice.",
          guidance:
            "Upgrade your self-love practice: Ask yourself 'How can I love myself more luxuriously today?' and follow through.",
          statBoosts: { selfLove: 20, value: 15 },
        }

      case "Quantum Vision":
        if (responseText.includes("nothing") || responseText.includes("don't know") || responseText.includes("can't")) {
          return {
            analysis:
              acknowledgment +
              "That 'I don't know' is actually your soul protecting you from dreaming too small! Your vision is so big it scares your human mind. **PERMISSION SLIP:** You're allowed to want everything your heart desires. You're allowed to dream bigger than your current reality. **VISION ACTIVATION:** If you knew you couldn't fail, what would you create?",
            insight:
              "Your 'I don't know' is often 'I'm afraid to want that much.' Your soul's vision is bigger than your fear.",
            guidance:
              "Do the Quantum Visioning Practice: Meditate on 'What wants to be born through me?' Trust whatever comes up, no matter how impossible it seems.",
            statBoosts: { vision: 20, courage: 15 },
          }
        }
        return {
          analysis:
            acknowledgment +
            "THAT vision? That's not just a dream - it's a download from your future self. Your soul doesn't give you visions to torture you - it gives them to you because they're POSSIBLE. **QUANTUM TRUTH:** Your vision exists in the quantum field, waiting for you to align with it.",
          insight: "Your vision isn't fantasy - it's prophecy. Your soul only shows you what's possible for you.",
          guidance:
            "Practice Vision Embodiment: Spend 10 minutes daily living AS IF your vision is already real. Feel it in your body.",
          statBoosts: { manifestation: 25, alignment: 18 },
        }

      default:
        return {
          analysis:
            acknowledgment +
            "Your authentic response is perfect information about where you are right now. **REMEMBER:** You're not broken, you're not behind. You're exactly where you need to be for your next breakthrough. Trust the process, gorgeous soul.",
          insight: "Every response reveals another layer of your consciousness. You're exactly where you need to be.",
          guidance: "Trust your journey. Every step is leading you to your highest expression of abundance and joy.",
          statBoosts: { trust: 10, acceptance: 8 },
        }
    }
  }

  const getAIAnalysis = async () => {
    const response = responses[currentQuestion.id]
    if (!response || response.length < 3) return

    setIsLoading(true)

    // Get ELI's contextual coaching immediately
    const coaching = getELICoaching(currentQuestion, response)

    setAiAnalysis((prev) => ({ ...prev, [currentQuestion.id]: coaching }))
    setCurrentAI(coaching)
    setShowAIResponse(true)

    // Apply stat boosts if the function exists
    if (coaching.statBoosts && onUpdateStats) {
      const updates = {
        consciousness: coaching.statBoosts,
        wealthConsciousness: {},
        moneyIntimacy: {},
      }
      onUpdateStats(updates)
    }

    setIsLoading(false)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < soulQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowAIResponse(false)
      setCurrentAI(null)
    } else {
      completeAssessment()
    }
  }

  const completeAssessment = () => {
    setIsComplete(true)
    setShowResults(true)
  }

  if (showResults) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">✨</div>
          <CardTitle className="text-3xl font-bold text-purple-300">Soul Assessment Complete!</CardTitle>
          <p className="text-purple-200">Your consciousness has been beautifully calibrated</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="bg-purple-800/20 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <p className="text-xl text-white font-bold italic">
                "Your soul is ready for quantum transformation, gorgeous being. Every answer revealed another layer of
                your divine magnificence."
              </p>
              <p className="text-purple-400 mt-2">— ELI</p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => setShowResults(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg px-8 py-3"
            >
              🚀 Continue Your Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-indigo-400" />
            <div>
              <CardTitle className="text-2xl text-indigo-300">Soul Assessment</CardTitle>
              <p className="text-indigo-200">7 thought-provoking questions with ELI's authentic coaching</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500">
            {currentQuestionIndex + 1} / {soulQuestions.length}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-indigo-300">Progress</span>
            <span className="text-indigo-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Question */}
        <Card className="bg-blue-900/30 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <Badge className="bg-blue-600">{currentQuestion.category}</Badge>
            </div>
            <CardTitle className="text-xl text-blue-200">{currentQuestion.question}</CardTitle>
            <p className="text-blue-300 italic">{currentQuestion.subtext}</p>
          </CardHeader>

          <CardContent>
            <textarea
              placeholder="Share your authentic truth... ELI will provide personalized coaching based on exactly what you write."
              value={responses[currentQuestion.id] || ""}
              onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
              className="w-full min-h-[120px] text-lg p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="text-right text-sm text-blue-300 mt-2">
              {(responses[currentQuestion.id] || "").length} characters
            </div>
          </CardContent>
        </Card>

        {/* ELI's Coaching Response */}
        {showAIResponse && currentAI && (
          <Card className="bg-green-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-300">
                <Heart className="h-5 w-5" />
                ELI's Personalized Coaching
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-800/20 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">💫 Coaching Insight:</h4>
                <div className="text-white leading-relaxed whitespace-pre-line">{currentAI.analysis}</div>
              </div>

              <div className="p-4 bg-blue-800/20 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">🔮 Soul Insight:</h4>
                <p className="text-white italic">{currentAI.insight}</p>
              </div>

              <div className="p-4 bg-yellow-800/20 rounded-lg">
                <h4 className="font-semibold text-yellow-300 mb-2">🎯 Next Step:</h4>
                <p className="text-white">{currentAI.guidance}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1)
                setShowAIResponse(false)
                setCurrentAI(null)
              }
            }}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            ← Previous
          </Button>

          <div className="flex gap-3">
            {!showAIResponse && responses[currentQuestion.id] && responses[currentQuestion.id].length > 2 && (
              <Button onClick={getAIAnalysis} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ELI is coaching...
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Get ELI's Coaching
                  </>
                )}
              </Button>
            )}

            {showAIResponse && (
              <Button onClick={nextQuestion} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                {currentQuestionIndex === soulQuestions.length - 1 ? (
                  <>
                    Complete Assessment <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next Question <TrendingUp className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {soulQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded ${
                index < currentQuestionIndex
                  ? "bg-green-500"
                  : index === currentQuestionIndex
                    ? "bg-indigo-500"
                    : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
