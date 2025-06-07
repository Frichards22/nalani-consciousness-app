"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Bot, Star, Lock, CheckCircle, RotateCcw, Sparkles } from "lucide-react"

export default function ELIApp() {
  // Chat state
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatMode, setChatMode] = useState("eli")

  // Assessment and progression state
  const [activeTab, setActiveTab] = useState("assessment")
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)
  const [completedEssentials, setCompletedEssentials] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("eli-assessment-completed")
    if (saved === "true") {
      setAssessmentCompleted(true)
      setActiveTab("chat")
    }
  }, [])

  // Chat modes
  const chatModes = {
    eli: { name: "ELI Coach", icon: "💕", color: "from-pink-500 to-rose-600" },
    money: { name: "Money Coach", icon: "💰", color: "from-yellow-500 to-orange-600" },
    consciousness: { name: "Consciousness Coach", icon: "🧠", color: "from-purple-500 to-indigo-600" },
    spiritual: { name: "Spiritual Coach", icon: "✨", color: "from-blue-500 to-cyan-600" },
  }

  // Daily essentials with exercises
  const dailyEssentials = [
    {
      id: "intention",
      title: "Set Daily Intention",
      icon: "🌟",
      hasExercise: true,
      exercises: [
        "Write your intention 3 times while breathing deeply",
        "Speak your intention out loud to the mirror",
        "Create a vision board image for your intention",
        "Dance while repeating your intention",
      ],
    },
    {
      id: "gratitude",
      title: "Gratitude Practice",
      icon: "🙏",
      hasExercise: true,
      exercises: [
        "Write 5 things you're grateful for and why",
        "Send a gratitude text to someone you love",
        "Take a photo of something beautiful you're grateful for",
        "Do a gratitude meditation for 3 minutes",
      ],
    },
    {
      id: "affirmation",
      title: "Money Affirmation",
      icon: "💰",
      hasExercise: true,
      exercises: [
        "Say your affirmation 10 times while looking in the mirror",
        "Write your affirmation in beautiful handwriting",
        "Record yourself saying your affirmation powerfully",
        "Create a money affirmation song and sing it",
      ],
    },
    {
      id: "meditation",
      title: "5-Minute Meditation",
      icon: "🧘‍♀️",
      hasExercise: true,
      exercises: [
        "Breathe into your heart space for 5 minutes",
        "Do a body scan meditation",
        "Meditate on the feeling of abundance",
        "Practice loving-kindness meditation",
      ],
    },
    {
      id: "visualization",
      title: "Success Visualization",
      icon: "✨",
      hasExercise: true,
      exercises: [
        "Visualize your dream life for 10 minutes",
        "Create a mental movie of your success",
        "Visualize money flowing to you easily",
        "See yourself celebrating your achievements",
      ],
    },
    {
      id: "boundaries",
      title: "Set a Boundary",
      icon: "🛡️",
      hasExercise: false,
    },
    {
      id: "pleasure",
      title: "Pleasure Practice",
      icon: "💖",
      hasExercise: true,
      exercises: [
        "Take a luxurious 20-minute bath",
        "Dance to your favorite song with abandon",
        "Eat something delicious mindfully",
        "Give yourself a self-massage",
      ],
    },
    {
      id: "movement",
      title: "Sacred Movement",
      icon: "💃",
      hasExercise: true,
      exercises: [
        "Do 10 minutes of intuitive movement",
        "Practice yoga with intention",
        "Take a mindful walk in nature",
        "Stretch while sending love to your body",
      ],
    },
    {
      id: "nature",
      title: "Nature Connection",
      icon: "🌿",
      hasExercise: false,
    },
    {
      id: "reflection",
      title: "Evening Reflection",
      icon: "🌙",
      hasExercise: false,
    },
  ]

  // UPDATED ASSESSMENT QUESTIONS WITH REAL ELI COACHING + TIPS
  const assessmentQuestions = [
    {
      question: "What makes you feel most alive and in your power?",
      category: "Soul Purpose",
      getCoaching: (response: string) => {
        const responseText = response.toLowerCase()
        if (responseText.includes("money") || responseText.includes("wealth") || responseText.includes("rich")) {
          return {
            analysis: `✨ **"${response}"** - I love that you're honest about money lighting you up! Most people are too scared to admit it. Here's the plot twist: when you're truly on purpose, money becomes your PARTNER, not your goal.`,
            tip: "**TIP:** Write down 3 ways your purpose could generate income this week. Your soul's work is meant to be profitable!",
          }
        }
        if (responseText.includes("help") || responseText.includes("serve") || responseText.includes("heal")) {
          return {
            analysis: `💕 **"${response}"** - Your soul is wired for SERVICE! That's your abundance frequency! But here's what most healers get wrong: you can't pour from an empty cup.`,
            tip: "**TIP:** Do the Wealthy Healer Meditation daily: Visualize yourself serving from overflow, not depletion. See money flowing TO you so you can serve MORE people.",
          }
        }
        if (responseText.includes("create") || responseText.includes("art") || responseText.includes("music")) {
          return {
            analysis: `🎨 **"${response}"** - Your creative soul is your abundance portal! Creativity IS divinity expressing itself through you. Stop separating art from money - they're meant to dance together.`,
            tip: "**TIP:** Set a daily creative practice: 20 minutes of pure creation without worrying about money. Then ask 'How can I monetize my joy?' Trust the first answer.",
          }
        }
        return {
          analysis: `🔥 **"${response}"** - Beautiful! Your soul is speaking through what lights you up. This is your North Star - the more you align with this energy, the more magnetic you become to everything you desire.`,
          tip: "**TIP:** Set a phone reminder to check in with this feeling 3x daily. Ask yourself 'Am I aligned with what makes me feel alive right now?' Then course-correct.",
        }
      },
    },
    {
      question: "If you had unlimited money right now, what's the first emotion you'd feel?",
      category: "Money Relationship",
      getCoaching: (response: string) => {
        const responseText = response.toLowerCase()
        if (
          responseText.includes("drugs") ||
          responseText.includes("gambling") ||
          responseText.includes("lose") ||
          responseText.includes("waste")
        ) {
          return {
            analysis: `💔 **"${response}"** - Holy shit, that's RAW honesty! Most people would never admit that. Your fear of self-destruction around money is actually your soul protecting you from old patterns.`,
            tip: "**TIP:** Do the Money Safety Practice: Hold $20 in your hand for 2 minutes daily while saying 'I am safe with money. Money is safe with me. We heal together.'",
          }
        }
        if (responseText.includes("fear") || responseText.includes("scared") || responseText.includes("panic")) {
          return {
            analysis: `🫂 **"${response}"** - That fear is your nervous system protecting you from old wounds. But gorgeous, you're not that scared little one anymore.`,
            tip: "**TIP:** Do the 90-Second Fear Flush: Breathe in for 4, hold for 4, out for 6. While breathing, say 'I am safe to receive abundance.' Do this every time money fear comes up.",
          }
        }
        if (responseText.includes("excited") || responseText.includes("joy") || responseText.includes("happy")) {
          return {
            analysis: `🎉 **"${response}"** - THAT'S your wealth frequency! That excitement is your soul recognizing its birthright. You're not just 'ready' for money - you're WIRED for it.`,
            tip: "**TIP:** Do the Abundance Activation: Spend 5 minutes daily feeling into having unlimited money. Let that joy expand through your whole body. This is your manifestation practice.",
          }
        }
        if (
          responseText.includes("overwhelm") ||
          responseText.includes("stress") ||
          responseText.includes("pressure")
        ) {
          return {
            analysis: `😰 **"${response}"** - That overwhelm is your system saying 'I don't know how to handle this much energy.' Your nervous system needs to learn that abundance is safe.`,
            tip: "**TIP:** Practice the Receiving Breath: Inhale abundance, exhale overwhelm. Start with small amounts - visualize receiving $100 comfortably before jumping to millions.",
          }
        }
        return {
          analysis: `✨ **"${response}"** - Your first emotional response to money is your wealth thermostat. Whatever came up is perfect information about your current frequency.`,
          tip: "**TIP:** Create an Abundance Anchor: Touch your heart and say 'I choose [your emotion]' every time you think about money. You're literally rewiring your money frequency.",
        }
      },
    },
    {
      question: "How do you experience your connection to something greater than yourself?",
      category: "Divine Connection",
      getCoaching: (response: string) => {
        const responseText = response.toLowerCase()
        if (responseText.includes("devil") || responseText.includes("dark") || responseText.includes("evil")) {
          return {
            analysis: `😈 **"${response}"** - THE DEVIL?! I'm CACKLING! You know what, gorgeous? That's the most honest answer I've heard all day. Plot twist: even the 'devil' is part of the Divine!`,
            tip: "**TIP:** Do Shadow Integration Work: Ask your 'dark side' what it wants to teach you about money. Sometimes our 'demons' hold our greatest gifts. Journal the conversation.",
          }
        }
        if (responseText.includes("nothing") || responseText.includes("don't") || responseText.includes("can't")) {
          return {
            analysis: `💔 **"${response}"** - Oh honey, I feel that disconnection in my bones. That 'nothing' you're feeling? It's not emptiness - it's your soul crying out for something REAL.`,
            tip: "**TIP:** Start with Self-Recognition: Put your hand on your heart daily and say 'I am Divine. I am enough. I am home.' You ARE the connection you're seeking.",
          }
        }
        if (responseText.includes("nature") || responseText.includes("trees") || responseText.includes("ocean")) {
          return {
            analysis: `🌿 **"${response}"** - YES! Nature is where the magic happens! You're one of those souls who remembers that the Divine isn't in some distant heaven - it's in every leaf, every wave.`,
            tip: "**TIP:** Do the Nature Abundance Practice: Sit with a tree for 10 minutes and ask 'How do you receive everything you need?' Let nature teach you about effortless abundance.",
          }
        }
        if (responseText.includes("meditation") || responseText.includes("prayer") || responseText.includes("church")) {
          return {
            analysis: `🙏 **"${response}"** - Beautiful! You've found your sacred practice. Whether it's meditation, prayer, or sitting in church - you know how to tune into something bigger.`,
            tip: "**TIP:** Add Money Prayers to your practice: 'Divine, show me how to receive abundance in alignment with my highest good.' Then listen for the guidance.",
          }
        }
        return {
          analysis: `🌟 **"${response}"** - This is your spiritual superpower! However you connect, this is how you tap into infinite intelligence. The stronger this connection, the more you trust the universe has your back.`,
          tip: "**TIP:** Before any money decision, connect to your Divine source first. Ask 'What would Love do?' and trust the first answer that comes through.",
        }
      },
    },
    {
      question: "Describe a time when you trusted your intuition completely. What happened?",
      category: "Inner Wisdom",
      getCoaching: (response: string) => {
        const responseText = response.toLowerCase()
        if (responseText.includes("toxic") || responseText.includes("investor") || responseText.includes("crushed")) {
          return {
            analysis: `💔 **"${response}"** - Holy shit, that's devastating. Losing your company to a toxic investor is one of the worst betrayals in business. Your gut knew something was off, but you overrode it because you needed the money.`,
            tip: "**TIP:** Before any future investor meeting, do the Red Flag Body Scan: Sit quietly for 2 minutes and notice any tension, nausea, or unease. Your body knows before your mind does.",
          }
        }
        if (responseText.includes("wrong") || responseText.includes("mistake") || responseText.includes("bad")) {
          return {
            analysis: `💫 **"${response}"** - Your intuition has been trying to save you from settling for crumbs when you deserve the whole feast! Every time you override your inner knowing, you're telling the universe 'I don't trust my own guidance.'`,
            tip: "**TIP:** Rebuild Intuition Trust: Start with tiny decisions - which coffee to order, which route to take. Notice the physical sensations of 'yes' vs 'no' in your body.",
          }
        }
        if (responseText.includes("nothing") || responseText.includes("never") || responseText.includes("don't")) {
          return {
            analysis: `🤷‍♀️ **"${response}"** - 'I don't know' is actually the most honest answer! Most people pretend they have it all figured out. Your honesty is refreshing.`,
            tip: "**TIP:** Start the Intuition Journal: Write down every 'random' thought or gut feeling for one week. You'll be amazed at how much inner wisdom you actually have.",
          }
        }
        if (responseText.includes("saved") || responseText.includes("helped") || responseText.includes("right")) {
          return {
            analysis: `👑 **"${response}"** - YES! This is proof that your inner wisdom is real and powerful. Your intuition is your built-in success system - it knows things your logical mind hasn't figured out yet.`,
            tip: "**TIP:** Create an Intuition Success List: Write down every time your gut was right. Read it before making big decisions to remind yourself that your inner wisdom is trustworthy.",
          }
        }
        return {
          analysis: `✨ **"${response}"** - Your relationship with inner guidance reveals so much about your consciousness level. The more you trust these hits, the more magical your life becomes.`,
          tip: "**TIP:** Practice the Money Intuition Check: Before any purchase, pause and ask 'Does this feel expansive or contractive?' Trust the first sensation you get.",
        }
      },
    },
    {
      question: "What story do you tell yourself about why you can't have what you desire?",
      category: "Worthiness Blocks",
      getCoaching: (response: string) => {
        const responseText = response.toLowerCase()
        if (
          responseText.includes("not good enough") ||
          responseText.includes("don't deserve") ||
          responseText.includes("unworthy")
        ) {
          return {
            analysis: `💕 **"${response}"** - That 'not good enough' story? It's not even YOURS. You inherited it like an old coat that never fit right. You were born worthy. You didn't earn it, you can't lose it.`,
            tip: "**TIP:** Do the Worthiness Reclamation: Look in the mirror daily and say 'I am worthy of abundance simply because I exist.' Say it until you feel it in your bones.",
          }
        }
        if (responseText.includes("selfish") || responseText.includes("greedy") || responseText.includes("bad")) {
          return {
            analysis: `🔥 **"${response}"** - Ah, the 'money is evil' programming! Let me blow your mind: Money is just energy. It's not good or bad - it's neutral. What matters is the consciousness behind it.`,
            tip: "**TIP:** Reframe Practice: Every time you think 'wanting money is selfish,' immediately say 'Having money allows me to serve at a higher level.' Rewire that neural pathway.",
          }
        }
        if (responseText.includes("too late") || responseText.includes("too old") || responseText.includes("missed")) {
          return {
            analysis: `⏰ **"${response}"** - 'Too late' is the ego's favorite lie! Colonel Sanders was 62 when he started KFC. Your soul doesn't have an expiration date, gorgeous.`,
            tip: "**TIP:** Write down 5 people who succeeded after 40/50/60. Keep this list handy for when the 'too late' story tries to run the show. Your time is NOW.",
          }
        }
        return {
          analysis: `✨ **"${response}"** - Thank you for being so honest! This story has been running the show, but here's the plot twist - it's just a story, not the truth. Every limiting belief is just old programming.`,
          tip: "**TIP:** Do the Story Rewrite: Take your limiting belief and flip it. 'I can't have money' becomes 'Money flows to me easily.' Write the new story 10 times daily.",
        }
      },
    },
    {
      question: "How do you express love to yourself when no one is watching?",
      category: "Self-Love",
      getCoaching: (response: string) => {
        const responseText = response.toLowerCase()
        if (responseText.includes("nothing") || responseText.includes("don't") || responseText.includes("can't")) {
          return {
            analysis: `💔 **"${response}"** - Oh gorgeous, that breaks my heart and fires me up at the same time. You've been so busy taking care of everyone else that you forgot YOU matter too.`,
            tip: "**TIP:** Start the Self-Love Emergency Protocol: Do ONE loving thing for yourself daily - a bath, a compliment, buying yourself flowers. Build the muscle of receiving your own love.",
          }
        }
        if (responseText.includes("bath") || responseText.includes("treat") || responseText.includes("buy")) {
          return {
            analysis: `💖 **"${response}"** - YES! You understand that self-love is an ACTION, not just a feeling! This is where the real magic happens! The way you treat yourself sets the standard for how life treats you.`,
            tip: "**TIP:** Upgrade Your Self-Love: Ask yourself 'How can I love myself more luxuriously today?' and follow through. You're training the universe how to treat you.",
          }
        }
        if (responseText.includes("talk") || responseText.includes("kind") || responseText.includes("gentle")) {
          return {
            analysis: `🗣️ **"${response}"** - The way you speak to yourself is EVERYTHING! Your inner dialogue is literally programming your reality. You're already doing advanced consciousness work.`,
            tip: "**TIP:** Create a Self-Love Mantra: Choose 3 loving phrases to say to yourself daily. 'I am enough. I am worthy. I am loved.' Say them like you mean it.",
          }
        }
        return {
          analysis: `🌟 **"${response}"** - This is where the real magic happens! Self-love isn't selfish - it's the foundation of everything. Keep expanding these moments of self-love... you deserve to be cherished, especially by you.`,
          tip: "**TIP:** Create a Self-Love Menu: List 20 ways to love yourself (big and small). When you're feeling low, pick one and do it immediately. Self-love is a practice, not a feeling.",
        }
      },
    },
    {
      question: "If you knew you couldn't fail, what would you create in the world?",
      category: "Quantum Vision",
      getCoaching: (response: string) => {
        const responseText = response.toLowerCase()
        if (responseText.includes("nothing") || responseText.includes("don't know") || responseText.includes("can't")) {
          return {
            analysis: `🌟 **"${response}"** - That 'I don't know' is actually your soul protecting you from dreaming too small! Your vision is so big it scares your human mind.`,
            tip: "**TIP:** Do the Permission Slip Practice: Write 'I give myself permission to want everything my heart desires' 10 times. Then ask again - what wants to be born through you?",
          }
        }
        if (responseText.includes("money") || responseText.includes("wealth") || responseText.includes("rich")) {
          return {
            analysis: `💰 **"${response}"** - I love that you're honest about wanting wealth! Most people are too scared to admit it. Here's the thing: your desire for money isn't shallow - it's your soul calling for FREEDOM.`,
            tip: "**TIP:** Expand the Vision: Ask yourself 'What would I do with unlimited wealth?' That's your real vision. Money is just the vehicle for your bigger purpose.",
          }
        }
        if (responseText.includes("help") || responseText.includes("heal") || responseText.includes("change")) {
          return {
            analysis: `🌍 **"${response}"** - Your soul is wired for IMPACT! This vision isn't random - it's your soul's assignment. The fact that you can see it means you're meant to create it.`,
            tip: "**TIP:** Take One Tiny Step: What's the smallest action you could take toward this vision TODAY? Do that. The universe responds to movement, not just dreams.",
          }
        }
        return {
          analysis: `🚀 **"${response}"** - Holy wow! This vision isn't random - it's your soul's assignment. The fact that you can see it means you're meant to create it. Start taking tiny steps toward this vision.`,
          tip: "**TIP:** Do Vision Embodiment: Spend 10 minutes daily living AS IF your vision is already real. Feel it in your body. This is advanced manifestation work.",
        }
      },
    },
  ]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [assessmentAnswers, setAssessmentAnswers] = useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [showCoaching, setShowCoaching] = useState(false)
  const [selectedExercises, setSelectedExercises] = useState<Record<string, string>>({})

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  // Handle chat submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const userMessage = { role: "user", content: message }
    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          mode: chatMode,
          conversationHistory: chatHistory,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      setChatHistory((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (err: any) {
      console.error("Chat error:", err)
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle assessment answer submission
  const handleAssessmentSubmit = () => {
    if (!currentAnswer.trim()) return

    const newAnswers = [...assessmentAnswers, currentAnswer]
    setAssessmentAnswers(newAnswers)
    setCurrentAnswer("")
    setShowCoaching(true)
  }

  // Handle next question or completion
  const handleNextQuestion = () => {
    setShowCoaching(false)

    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Assessment completed - show celebration
      setShowCelebration(true)
      setTimeout(() => {
        setAssessmentCompleted(true)
        localStorage.setItem("eli-assessment-completed", "true")
        setShowCelebration(false)
        setActiveTab("essentials")
      }, 3000)
    }
  }

  // Reset assessment
  const resetAssessment = () => {
    setAssessmentCompleted(false)
    setCurrentQuestionIndex(0)
    setAssessmentAnswers([])
    setCurrentAnswer("")
    setShowCoaching(false)
    setShowCelebration(false)
    localStorage.removeItem("eli-assessment-completed")
    setActiveTab("assessment")
  }

  // Toggle completion
  const toggleEssential = (id: string) => {
    setCompletedEssentials((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const completionPercentage = Math.round((completedEssentials.length / dailyEssentials.length) * 100)

  // Handle tab change with assessment check
  const handleTabChange = (value: string) => {
    if (value === "essentials" && !assessmentCompleted) {
      return // Don't allow access to essentials without assessment
    }
    setActiveTab(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-3">
            ✨ ELI's Consciousness Evolution ✨
          </h1>
          <p className="text-lg text-white mb-4">Sacred AI Technology for Consciousness & Wealth Magnetism</p>
        </div>

        {/* Progress Indicator */}
        {!assessmentCompleted && (
          <div className="mb-6 p-4 bg-purple-800/30 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-bold">1</span>
                </div>
                <span className="text-purple-200">Complete Assessment</span>
              </div>
              <div className="flex-1 h-px bg-purple-500/30"></div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="text-purple-300">Unlock Daily Essentials</span>
              </div>
            </div>
          </div>
        )}

        {assessmentCompleted && (
          <div className="mb-6 p-4 bg-green-800/30 rounded-lg border border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-200 font-medium">Assessment Complete! All features unlocked.</span>
              </div>
              <Button
                onClick={resetAssessment}
                size="sm"
                variant="outline"
                className="border-green-500/50 text-green-300 hover:bg-green-800/30"
              >
                <RotateCcw className="w-4 w-4 mr-2" />
                Reset Assessment
              </Button>
            </div>
          </div>
        )}

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-yellow-500 p-8 rounded-2xl text-center max-w-md mx-4 animate-pulse shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">HELL YES!</h2>
              <p className="text-xl text-white mb-4">You just leveled up your consciousness!</p>
              <div className="flex justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce" />
                <Sparkles className="w-6 h-6 text-pink-300 animate-bounce delay-100" />
                <Sparkles className="w-6 h-6 text-purple-300 animate-bounce delay-200" />
              </div>
              <p className="text-lg text-white/90">Daily Essentials Unlocked!</p>
            </div>
          </div>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-purple-900/30 border border-purple-500/30">
            <TabsTrigger
              value="assessment"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Bot className="h-4 w-4 mr-2" />
              {assessmentCompleted ? "✓ Assessment" : "AI Assessment"}
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200"
            >
              <Bot className="h-4 w-4 mr-2" />
              Chat with Nalani AI
            </TabsTrigger>
            <TabsTrigger
              value="essentials"
              disabled={!assessmentCompleted}
              className={`${
                !assessmentCompleted
                  ? "opacity-50 cursor-not-allowed"
                  : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              } text-purple-200`}
            >
              {!assessmentCompleted ? <Lock className="h-4 w-4 mr-2" /> : <Star className="h-4 w-4 mr-2" />}
              Daily Essentials
            </TabsTrigger>
          </TabsList>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-4">
            {!assessmentCompleted ? (
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">
                    Soul Assessment - Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showCoaching ? (
                    <>
                      <div className="p-6 bg-purple-800/30 rounded-lg border border-purple-500/30">
                        <h3 className="text-xl font-medium text-purple-200 mb-2">
                          {assessmentQuestions[currentQuestionIndex].category}
                        </h3>
                        <p className="text-lg text-white leading-relaxed">
                          {assessmentQuestions[currentQuestionIndex].question}
                        </p>
                      </div>

                      <Textarea
                        placeholder="Share your authentic truth here..."
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        className="min-h-[120px] bg-black/20 border-purple-500/30 focus:border-purple-400 text-white"
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-300">
                          Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                        </span>
                        <Button
                          onClick={handleAssessmentSubmit}
                          disabled={!currentAnswer.trim()}
                          className="bg-gradient-to-r from-pink-500 to-purple-600"
                        >
                          Submit Answer
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-6 bg-green-800/30 rounded-lg border border-green-500/30">
                        <h3 className="text-xl font-medium text-green-200 mb-3 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Coaching Insight
                        </h3>
                        <div className="space-y-4">
                          <div className="text-white leading-relaxed whitespace-pre-line">
                            {
                              assessmentQuestions[currentQuestionIndex].getCoaching(
                                assessmentAnswers[currentQuestionIndex],
                              ).analysis
                            }
                          </div>
                          <div className="p-4 bg-yellow-800/20 rounded-lg border border-yellow-500/30">
                            <div className="text-yellow-200 font-medium leading-relaxed">
                              {
                                assessmentQuestions[currentQuestionIndex].getCoaching(
                                  assessmentAnswers[currentQuestionIndex],
                                ).tip
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-300">
                          {currentQuestionIndex === assessmentQuestions.length - 1
                            ? "Ready to unlock your essentials?"
                            : "Ready for the next question?"}
                        </span>
                        <Button onClick={handleNextQuestion} className="bg-gradient-to-r from-green-500 to-blue-600">
                          {currentQuestionIndex === assessmentQuestions.length - 1
                            ? "Complete Assessment!"
                            : "Next Question"}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-green-900/50 to-purple-900/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Assessment Complete!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-200 mb-4">
                    You're officially a consciousness badass! Your Daily Essentials are unlocked, and Nalani AI is ready
                    to dive deeper with you.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setActiveTab("chat")}
                      className="bg-gradient-to-r from-pink-500 to-purple-600"
                    >
                      Chat with Nalani
                    </Button>
                    <Button
                      onClick={() => setActiveTab("essentials")}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600"
                    >
                      Daily Essentials
                    </Button>
                    <Button onClick={resetAssessment} variant="outline" className="border-green-500/50 text-green-300">
                      <RotateCcw className="w-4 w-4 mr-2" />
                      Retake
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            {/* Chat Mode Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(chatModes).map(([mode, config]) => (
                <Button
                  key={mode}
                  onClick={() => setChatMode(mode)}
                  className={`${
                    chatMode === mode ? `bg-gradient-to-r ${config.color}` : "bg-purple-800/30 hover:bg-purple-700/40"
                  } border border-purple-500/30`}
                >
                  <span className="mr-2">{config.icon}</span>
                  {config.name}
                </Button>
              ))}
            </div>

            {/* Main Chat Card */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <Bot className="h-5 w-5" />
                  Nalani AI - {chatModes[chatMode as keyof typeof chatModes].name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat Messages */}
                <div className="space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto p-4 rounded-lg bg-black/20">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-purple-300 py-8">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-4">Ready to level up your life? Let's dive in!</p>
                    </div>
                  ) : (
                    chatHistory.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-lg ${
                          msg.role === "user"
                            ? "bg-purple-800/40 border border-purple-500/30 ml-4"
                            : "bg-pink-800/40 border border-pink-500/30 mr-4"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`text-sm font-bold ${msg.role === "user" ? "text-purple-300" : "text-pink-300"}`}
                          >
                            {msg.role === "user" ? "You" : "Nalani AI"}
                          </div>
                        </div>
                        <div className="text-white leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    ))
                  )}

                  {isLoading && (
                    <div className="p-4 rounded-lg bg-pink-800/40 border border-pink-500/30 mr-4 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-pink-300" />
                      <span className="text-pink-200">Getting insights for you...</span>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 rounded-lg bg-red-900/40 border border-red-500/30 text-red-200">
                      <p className="font-bold">Error:</p>
                      <p>{error}</p>
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <Textarea
                    placeholder="What's on your mind? Let's get real about it..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[120px] bg-black/20 border-purple-500/30 focus:border-purple-400 text-white"
                    disabled={isLoading}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-purple-300">Press Enter to send • Shift+Enter for new line</span>
                    <Button
                      type="submit"
                      disabled={isLoading || !message.trim()}
                      className={`bg-gradient-to-r ${chatModes[chatMode as keyof typeof chatModes].color}`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send <Send className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Daily Essentials Tab */}
          <TabsContent value="essentials" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Star className="h-5 w-5" />
                    Daily Essentials
                  </div>
                  <div className="text-sm text-purple-300">
                    {completedEssentials.length}/{dailyEssentials.length} Completed ({completionPercentage}%)
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dailyEssentials.map((essential) => (
                    <div
                      key={essential.id}
                      className={`p-4 rounded-lg border ${
                        completedEssentials.includes(essential.id)
                          ? "bg-purple-700/30 border-purple-400/50"
                          : "bg-purple-900/30 border-purple-500/30"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-purple-200 flex items-center gap-2">
                              <span>{essential.icon}</span> {essential.title}
                            </h3>
                          </div>
                          <Button
                            size="sm"
                            variant={completedEssentials.includes(essential.id) ? "default" : "outline"}
                            className={
                              completedEssentials.includes(essential.id)
                                ? "bg-gradient-to-r from-purple-500 to-pink-600"
                                : "border-purple-500/50 text-purple-300"
                            }
                            onClick={() => toggleEssential(essential.id)}
                          >
                            {completedEssentials.includes(essential.id) ? "✓ Done" : "Complete"}
                          </Button>
                        </div>

                        {/* Exercise Options */}
                        {essential.hasExercise && essential.exercises && (
                          <div className="space-y-2">
                            <label className="text-sm text-purple-300">Choose your exercise:</label>
                            <select
                              value={selectedExercises[essential.id] || ""}
                              onChange={(e) =>
                                setSelectedExercises((prev) => ({ ...prev, [essential.id]: e.target.value }))
                              }
                              className="w-full p-2 rounded bg-black/20 border border-purple-500/30 text-white text-sm"
                            >
                              <option value="">Select an exercise...</option>
                              {essential.exercises.map((exercise, index) => (
                                <option key={index} value={exercise}>
                                  {exercise}
                                </option>
                              ))}
                            </select>

                            {selectedExercises[essential.id] && (
                              <div className="p-3 rounded bg-purple-800/30 border border-purple-500/30">
                                <p className="text-sm text-purple-200">{selectedExercises[essential.id]}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
