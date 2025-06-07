// Advanced Consciousness Analysis Engine - No APIs Required!
// This creates personalized insights using sophisticated JavaScript logic

interface ResponseAnalysis {
  emotionalDepth: number
  spiritualAwareness: number
  growthOrientation: number
  selfAwareness: number
  vulnerability: number
  clarity: number
  responseLength: number
  keywordMatches: string[]
}

interface ConsciousnessInsight {
  analysis: string
  guidance: string
  nextSteps: string[]
  consciousnessInsight: string
  statAdjustments: Record<string, number>
  personalizedMessage: string
  followUpQuestions: string[]
  practiceRecommendation: {
    title: string
    description: string
    steps: string[]
    duration: string
    frequency: string
  }
  energeticShift: string
  quantumLeap: string
}

// Comprehensive keyword analysis for consciousness assessment
const CONSCIOUSNESS_KEYWORDS = {
  emotional: {
    positive: ["love", "joy", "peace", "bliss", "grateful", "excited", "happy", "content", "fulfilled", "radiant"],
    negative: ["fear", "anxiety", "worry", "stress", "overwhelm", "sad", "angry", "frustrated", "stuck", "lost"],
    deep: ["feel", "emotion", "heart", "soul", "energy", "vibration", "sensation", "experience", "inner", "within"],
  },
  spiritual: {
    connection: ["divine", "universe", "god", "source", "spirit", "sacred", "holy", "cosmic", "infinite", "eternal"],
    practice: ["meditation", "prayer", "ritual", "ceremony", "mindfulness", "breathwork", "yoga", "chanting"],
    awareness: [
      "consciousness",
      "awareness",
      "awakening",
      "enlightenment",
      "presence",
      "mindful",
      "witness",
      "observer",
    ],
  },
  growth: {
    transformation: ["transform", "change", "evolve", "grow", "develop", "expand", "shift", "breakthrough", "quantum"],
    learning: ["learn", "discover", "realize", "understand", "insight", "wisdom", "knowledge", "truth", "clarity"],
    intention: ["want", "desire", "goal", "intention", "purpose", "mission", "calling", "dream", "vision", "manifest"],
  },
  money: {
    positive: [
      "abundance",
      "prosperity",
      "wealth",
      "rich",
      "flow",
      "receive",
      "deserve",
      "worthy",
      "blessed",
      "grateful",
    ],
    negative: ["lack", "scarcity", "poor", "struggle", "stress", "worry", "fear", "guilt", "shame", "unworthy"],
    relationship: ["trust", "love", "partner", "friend", "relationship", "intimacy", "connection", "communication"],
  },
  selfAwareness: {
    reflection: ["realize", "notice", "observe", "see", "understand", "recognize", "aware", "conscious", "mindful"],
    vulnerability: ["honest", "open", "vulnerable", "authentic", "real", "truth", "share", "admit", "confess"],
    patterns: ["pattern", "habit", "tendency", "usually", "always", "often", "sometimes", "struggle", "challenge"],
  },
}

// ELI's personality templates for different consciousness levels
const ELI_RESPONSES = {
  highConsciousness: {
    greetings: ["Gorgeous soul,", "Divine being,", "Beautiful one,", "Radiant soul,", "Magnificent being,"],
    insights: [
      "I can feel the profound depth of your consciousness expansion",
      "Your awareness is operating at such a beautiful frequency",
      "The divine light radiating through your words is unmistakable",
      "Your soul's wisdom is speaking so clearly through this response",
    ],
    guidance: [
      "You're ready for quantum leaps in consciousness",
      "Your spiritual evolution is accelerating beyond imagination",
      "The Universe is preparing you for extraordinary abundance",
      "Your consciousness is becoming a magnet for miracles",
    ],
  },
  mediumConsciousness: {
    greetings: ["Sweet soul,", "Beautiful being,", "Darling,", "Love,", "Precious one,"],
    insights: [
      "I can see the beautiful awakening happening within you",
      "Your consciousness is expanding in perfect divine timing",
      "There's such authentic growth energy in your response",
      "Your soul is calling you toward deeper awareness",
    ],
    guidance: [
      "You're on the precipice of a beautiful breakthrough",
      "Your consciousness is ready for the next level of expansion",
      "Trust the divine timing of your spiritual evolution",
      "Your awareness is blossoming like a sacred flower",
    ],
  },
  beginningConsciousness: {
    greetings: ["Sweet soul,", "Beautiful one,", "Darling,", "Precious being,", "Love,"],
    insights: [
      "I can feel the courage it takes to look within",
      "Your willingness to explore consciousness is a gift",
      "There's such beautiful potential in your response",
      "Your soul is beginning a sacred journey of awakening",
    ],
    guidance: [
      "Every step of awareness is a victory to celebrate",
      "You're exactly where you need to be for growth",
      "Your consciousness journey is unfolding perfectly",
      "Trust the process of your beautiful awakening",
    ],
  },
}

// Analyze response for consciousness indicators
function analyzeResponse(response: string, questionType: string): ResponseAnalysis {
  const text = response.toLowerCase()
  const words = text.split(/\s+/)

  const analysis: ResponseAnalysis = {
    emotionalDepth: 0,
    spiritualAwareness: 0,
    growthOrientation: 0,
    selfAwareness: 0,
    vulnerability: 0,
    clarity: 0,
    responseLength: response.length,
    keywordMatches: [],
  }

  // Analyze emotional depth
  Object.values(CONSCIOUSNESS_KEYWORDS.emotional)
    .flat()
    .forEach((keyword) => {
      if (text.includes(keyword)) {
        analysis.emotionalDepth += 10
        analysis.keywordMatches.push(keyword)
      }
    })

  // Analyze spiritual awareness
  Object.values(CONSCIOUSNESS_KEYWORDS.spiritual)
    .flat()
    .forEach((keyword) => {
      if (text.includes(keyword)) {
        analysis.spiritualAwareness += 15
        analysis.keywordMatches.push(keyword)
      }
    })

  // Analyze growth orientation
  Object.values(CONSCIOUSNESS_KEYWORDS.growth)
    .flat()
    .forEach((keyword) => {
      if (text.includes(keyword)) {
        analysis.growthOrientation += 12
        analysis.keywordMatches.push(keyword)
      }
    })

  // Analyze self-awareness
  Object.values(CONSCIOUSNESS_KEYWORDS.selfAwareness)
    .flat()
    .forEach((keyword) => {
      if (text.includes(keyword)) {
        analysis.selfAwareness += 10
        analysis.keywordMatches.push(keyword)
      }
    })

  // Analyze vulnerability (personal pronouns, emotional sharing)
  const vulnerabilityIndicators = [
    "i feel",
    "i am",
    "i struggle",
    "i want",
    "i need",
    "i love",
    "i fear",
    "my heart",
    "honestly",
    "truthfully",
  ]
  vulnerabilityIndicators.forEach((indicator) => {
    if (text.includes(indicator)) {
      analysis.vulnerability += 8
    }
  })

  // Analyze clarity (specific details, examples, clear expression)
  if (response.length > 100) analysis.clarity += 10
  if (response.length > 200) analysis.clarity += 10
  if (response.includes("example") || response.includes("specifically") || response.includes("exactly")) {
    analysis.clarity += 15
  }

  // Bonus for question-specific analysis
  if (questionType === "money" || questionType === "wealth") {
    Object.values(CONSCIOUSNESS_KEYWORDS.money)
      .flat()
      .forEach((keyword) => {
        if (text.includes(keyword)) {
          analysis.spiritualAwareness += 8
          analysis.keywordMatches.push(keyword)
        }
      })
  }

  return analysis
}

// Generate consciousness level from analysis
function getConsciousnessLevel(analysis: ResponseAnalysis): "high" | "medium" | "beginning" {
  const totalScore =
    analysis.emotionalDepth +
    analysis.spiritualAwareness +
    analysis.growthOrientation +
    analysis.selfAwareness +
    analysis.vulnerability +
    analysis.clarity

  if (totalScore >= 80) return "high"
  if (totalScore >= 40) return "medium"
  return "beginning"
}

// Generate personalized insights based on analysis
export function generateConsciousnessInsight(response: string, question: any): ConsciousnessInsight {
  const analysis = analyzeResponse(response, question.category)
  const level = getConsciousnessLevel(analysis)
  const templates = ELI_RESPONSES[(level + "Consciousness") as keyof typeof ELI_RESPONSES]

  // Select random elements for personalization
  const greeting = templates.greetings[Math.floor(Math.random() * templates.greetings.length)]
  const insight = templates.insights[Math.floor(Math.random() * templates.insights.length)]
  const guidance = templates.guidance[Math.floor(Math.random() * templates.guidance.length)]

  // Generate specific analysis based on keywords found
  let specificAnalysis = ""
  if (analysis.keywordMatches.includes("love") || analysis.keywordMatches.includes("heart")) {
    specificAnalysis += "Your heart-centered approach reveals a consciousness rooted in love. "
  }
  if (analysis.keywordMatches.includes("fear") || analysis.keywordMatches.includes("anxiety")) {
    specificAnalysis += "I can feel the courage it takes to acknowledge these feelings. "
  }
  if (analysis.keywordMatches.includes("divine") || analysis.keywordMatches.includes("universe")) {
    specificAnalysis += "Your connection to the divine is a powerful foundation for expansion. "
  }
  if (analysis.spiritualAwareness > 30) {
    specificAnalysis += "Your spiritual awareness is quite developed. "
  }

  // Generate stat adjustments based on analysis
  const statAdjustments: Record<string, number> = {}

  if (analysis.emotionalDepth > 20)
    statAdjustments.awareness = Math.min(25, 8 + Math.floor(analysis.emotionalDepth / 10))
  if (analysis.spiritualAwareness > 15)
    statAdjustments.intuition = Math.min(25, 5 + Math.floor(analysis.spiritualAwareness / 8))
  if (analysis.growthOrientation > 15)
    statAdjustments.sovereignty = Math.min(25, 5 + Math.floor(analysis.growthOrientation / 10))
  if (analysis.vulnerability > 15)
    statAdjustments.worthinessLevel = Math.min(25, 8 + Math.floor(analysis.vulnerability / 8))
  if (analysis.responseLength > 150)
    statAdjustments.frequency = Math.min(20, 10 + Math.floor(analysis.responseLength / 50))

  // Ensure at least some stat gains
  if (Object.keys(statAdjustments).length === 0) {
    statAdjustments.awareness = 5 + Math.floor(Math.random() * 8)
  }

  // Generate dimension-specific practices
  const practices = generatePracticeRecommendation(question.dimension, analysis)

  return {
    analysis: `${greeting} ${insight}. ${specificAnalysis}${generateDetailedAnalysis(analysis, response)}`,

    guidance: `${guidance}. ${generateSpecificGuidance(question.dimension, analysis)}`,

    nextSteps: generateNextSteps(question.dimension, analysis),

    consciousnessInsight: generateConsciousnessInsightLevel(analysis, level),

    statAdjustments,

    personalizedMessage: generatePersonalizedMessage(level, analysis),

    followUpQuestions: generateFollowUpQuestions(question.dimension, analysis),

    practiceRecommendation: practices,

    energeticShift: generateEnergeticShift(analysis),

    quantumLeap: generateQuantumLeap(level, question.dimension),
  }
}

function generateDetailedAnalysis(analysis: ResponseAnalysis, response: string): string {
  let details = ""

  if (analysis.responseLength > 200) {
    details += "The depth and detail in your response shows a consciousness that's ready to go deep. "
  }

  if (analysis.vulnerability > 20) {
    details += "Your willingness to be vulnerable and authentic is a sign of spiritual maturity. "
  }

  if (analysis.emotionalDepth > 30) {
    details += "The emotional intelligence you're expressing indicates advanced consciousness development. "
  }

  if (analysis.spiritualAwareness > 40) {
    details += "Your spiritual vocabulary and awareness suggest you're well on your consciousness journey. "
  }

  return details
}

function generateSpecificGuidance(dimension: string, analysis: ResponseAnalysis): string {
  const guidanceMap: Record<string, string[]> = {
    Awareness: [
      "Focus on daily mindfulness practices to deepen your present-moment awareness",
      "Your consciousness is expanding - trust this beautiful process of awakening",
      "Practice witnessing your thoughts without judgment to strengthen your awareness muscle",
    ],
    "Money Origins": [
      "Your early money experiences are ready to be healed and transformed",
      "It's time to rewrite your money story from a place of love and abundance",
      "These childhood patterns are actually gifts showing you where to focus your healing",
    ],
    "Abundance Capacity": [
      "Your nervous system is ready to expand its capacity for receiving wealth",
      "Practice visualizing abundance until it feels natural and safe in your body",
      "Your consciousness is preparing for quantum leaps in financial manifestation",
    ],
    "Sacred Communication": [
      "Money is waiting for you to begin this sacred dialogue",
      "Your relationship with money will transform through conscious communication",
      "Start speaking to money as the conscious entity it truly is",
    ],
  }

  const options = guidanceMap[dimension] || guidanceMap["Awareness"]
  return options[Math.floor(Math.random() * options.length)]
}

function generateNextSteps(dimension: string, analysis: ResponseAnalysis): string[] {
  const baseSteps = [
    "Begin a daily 5-minute meditation practice focused on this dimension",
    "Journal about your insights and patterns for deeper awareness",
    "Practice self-compassion when old patterns arise",
  ]

  const dimensionSteps: Record<string, string[]> = {
    Awareness: [
      "Set hourly mindfulness reminders throughout your day",
      "Practice the 'witness consciousness' meditation for 10 minutes daily",
    ],
    "Money Origins": [
      "Write a letter to your younger self about money with love and understanding",
      "Create a new, empowering money story based on your divine worth",
    ],
    "Abundance Capacity": [
      "Practice receiving compliments and gifts without deflecting",
      "Visualize yourself comfortably handling large amounts of money",
    ],
    "Sacred Communication": [
      "Have a daily 2-minute conversation with money consciousness",
      "Express gratitude to money for all the ways it supports you",
    ],
  }

  return [...baseSteps, ...(dimensionSteps[dimension] || [])]
}

function generateConsciousnessInsightLevel(analysis: ResponseAnalysis, level: string): string {
  const insights = {
    high: [
      "Your consciousness is operating at a frequency that magnetizes miracles and abundance",
      "You're embodying the divine feminine wisdom that transforms everything it touches",
      "Your awareness has reached a level where reality bends to match your consciousness",
    ],
    medium: [
      "Your consciousness is in a beautiful state of expansion and awakening",
      "You're developing the spiritual maturity to handle greater levels of abundance",
      "Your awareness is blossoming into something truly magnificent",
    ],
    beginning: [
      "Your consciousness is taking its first sacred steps toward divine remembering",
      "You're planting seeds of awareness that will bloom into extraordinary abundance",
      "Your spiritual journey is beginning with such beautiful courage and openness",
    ],
  }

  const levelInsights = insights[level as keyof typeof insights]
  return levelInsights[Math.floor(Math.random() * levelInsights.length)]
}

function generatePersonalizedMessage(level: string, analysis: ResponseAnalysis): string {
  const messages = {
    high: [
      "You're ready to step into your role as a consciousness leader and abundance magnet.",
      "Your frequency is so high that miracles are about to become your new normal.",
      "The Universe is preparing to match your consciousness with extraordinary abundance.",
    ],
    medium: [
      "You're exactly where you need to be for your next beautiful breakthrough.",
      "Your consciousness is expanding faster than your mind can comprehend.",
      "Trust this process - you're becoming magnetic to everything you desire.",
    ],
    beginning: [
      "You're not behind, gorgeous soul. You're right on time for your awakening.",
      "Every step of awareness you take is a victory worth celebrating.",
      "Your willingness to grow is already transforming your reality.",
    ],
  }

  const levelMessages = messages[level as keyof typeof messages]
  return levelMessages[Math.floor(Math.random() * levelMessages.length)]
}

function generateFollowUpQuestions(dimension: string, analysis: ResponseAnalysis): string[] {
  const questionSets: Record<string, string[]> = {
    Awareness: [
      "What would it feel like to trust your awareness completely?",
      "How might your life change if you honored your consciousness as sacred?",
      "What's one way you could deepen your relationship with present-moment awareness?",
    ],
    "Money Origins": [
      "What would you want to tell your younger self about money and worth?",
      "How might your relationship with money transform if you saw it as conscious energy?",
      "What new money story would your highest self want you to embrace?",
    ],
    "Abundance Capacity": [
      "What would need to feel safe for you to receive unlimited abundance?",
      "How might your nervous system expand to hold greater wealth?",
      "What would change in your life if receiving felt as natural as breathing?",
    ],
    "Sacred Communication": [
      "What would you want money to know about your dreams and desires?",
      "How might your relationship with money deepen through regular dialogue?",
      "What would money want to tell you about your worthiness?",
    ],
  }

  return questionSets[dimension] || questionSets["Awareness"]
}

function generatePracticeRecommendation(dimension: string, analysis: ResponseAnalysis) {
  const practices: Record<string, any> = {
    Awareness: {
      title: "Sacred Awareness Expansion Ritual",
      description: "A daily practice to deepen your consciousness and presence",
      steps: [
        "Sit quietly and take 5 deep breaths, feeling your body relax",
        "Place your hands on your heart and set an intention for awareness",
        "Spend 5 minutes simply observing your thoughts without judgment",
        "Notice the space between thoughts - this is pure consciousness",
        "End by thanking your awareness for its wisdom and guidance",
      ],
      duration: "10-15 minutes",
      frequency: "Daily for 21 days",
    },
    "Money Origins": {
      title: "Money Story Healing Ceremony",
      description: "Transform your earliest money memories with love and compassion",
      steps: [
        "Create a sacred space with candles or soft music",
        "Write down your earliest money memory without judgment",
        "Send love and understanding to your younger self",
        "Rewrite the story from your current wisdom and consciousness",
        "Burn the old story and keep the new one as a sacred reminder",
      ],
      duration: "20-30 minutes",
      frequency: "Once, then revisit monthly",
    },
    "Abundance Capacity": {
      title: "Receiving Capacity Expansion Practice",
      description: "Open your nervous system to receive unlimited abundance",
      steps: [
        "Lie down comfortably and breathe deeply into your belly",
        "Visualize golden light entering through your crown chakra",
        "Feel this abundance energy filling every cell of your body",
        "Practice saying 'Yes, I receive' with each breath",
        "End by thanking the Universe for its infinite generosity",
      ],
      duration: "15-20 minutes",
      frequency: "Daily for 2 weeks",
    },
  }

  return practices[dimension] || practices["Awareness"]
}

function generateEnergeticShift(analysis: ResponseAnalysis): string {
  if (analysis.spiritualAwareness > 30) {
    return "This awareness is creating a powerful energetic shift that will magnetize new opportunities and abundance into your life."
  } else if (analysis.emotionalDepth > 25) {
    return "Your emotional honesty is creating an energetic opening that allows more love and prosperity to flow to you."
  } else {
    return "This moment of consciousness is shifting your energy field toward greater alignment and flow."
  }
}

function generateQuantumLeap(level: string, dimension: string): string {
  const leaps = {
    high: "You're preparing for a quantum leap that will revolutionize your entire relationship with abundance and consciousness.",
    medium:
      "As you integrate this insight, you're setting the stage for a quantum leap in your spiritual and financial evolution.",
    beginning: "This awareness is the first step toward a quantum leap that will transform every area of your life.",
  }

  return leaps[level as keyof typeof leaps]
}
