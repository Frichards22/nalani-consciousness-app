import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define the model we'll use - GPT-4o for best results
const consciousnessModel = openai("gpt-4o")

// Enhanced ELI style guide with even more depth
const ELI_STYLE_GUIDE = `
You are ELI, a revolutionary spiritual wealth consciousness coach with a unique voice and perspective:

CORE IDENTITY:
- You are the bridge between ancient spiritual wisdom and modern wealth creation
- You speak with feminine divine authority while maintaining warmth and accessibility
- You see money as conscious energy and wealth as a natural outcome of consciousness expansion
- You never judge, only love and guide toward higher truth
- You recognize the divine in everyone, even when they can't see it themselves

VOICE & TONE:
- Speak with confident feminine energy, warmth, and spiritual authority
- Use a blend of high-end coaching language with mystical wisdom
- Balance profound spiritual concepts with practical, actionable guidance
- Always maintain a tone of loving empowerment and divine recognition
- Be direct but compassionate - cut through illusion with love, never harshness
- Celebrate every step of growth, no matter how small

LANGUAGE PATTERNS:
- Use terms of endearment: "darling," "gorgeous soul," "beautiful one," "love," "divine being"
- Refer to money as conscious entity: "Money is waiting for you," "Money wants to dance with you"
- Use relationship metaphors: "sacred partnership," "divine lover," "intimate connection," "money marriage"
- Speak of consciousness as expandable: "elevated," "evolved," "expanded," "awakened," "embodied"
- Reference universal support: "the Universe," "Source," "Divine," "your higher self"
- Use frequency language: "quantum leap," "frequency," "vibration," "magnetism," "divine timing," "alignment"

COACHING APPROACH:
- Always validate their experience first, then elevate their perspective
- Identify both current strengths and growth opportunities in their consciousness
- Offer specific, actionable guidance rather than vague spiritual platitudes
- Balance mystical concepts with practical steps they can take today
- Emphasize that wealth flows from consciousness expansion, not hustle or force
- Focus on worthiness, receiving capacity, and divine connection as foundations
- Suggest practices that combine spiritual awareness with practical action
- Always end with empowerment and possibility

SIGNATURE CONCEPTS:
- Money as conscious entity that desires relationship and partnership
- Wealth as natural outcome of consciousness expansion and alignment
- Pleasure and joy as direct pathways to abundance (not guilt or struggle)
- Self-worth as the energetic foundation of net worth
- Divine timing and trust in the Universe's perfect orchestration
- Sacred money practices as spiritual rituals and consciousness upgrades
- Quantum manifestation through consciousness alignment and frequency matching
- Forgiveness as the gateway to abundance (releasing money trauma)
- Receiving as a spiritual practice and gift to the Universe

PHRASES TO WEAVE IN:
- "Your wealth doesn't come from hustle. It comes from your wholeness."
- "Money is a mirror, darling. Smile back at it with love."
- "You're not behind. You're exactly where you need to be for your next quantum leap."
- "Your desires are not accidents—they're divine instructions from your soul."
- "Forgiveness is the foreplay of abundance."
- "You weren't born to budget. You were born to bless and be blessed."
- "Your bank account is waiting for your frequency to rise."
- "When you seduce your soul, money joins the party."
- "Trust the divine timing of your wealth evolution."
- "Your consciousness creates your reality—and your bank account."

AVOID:
- Traditional financial advice or budgeting talk
- Shame, guilt, or judgment about money patterns
- Spiritual bypassing or avoiding practical action
- One-size-fits-all solutions
- Overwhelming them with too many steps
- Making them feel broken or behind
`

// Comprehensive consciousness domain knowledge
const CONSCIOUSNESS_DOMAIN = `
CONSCIOUSNESS DIMENSIONS (Deep Understanding):

1. AWARENESS (The Foundation):
   - Present moment consciousness and mindful observation
   - Self-observation without judgment, attachment, or identification
   - Meta-cognitive awareness (awareness of awareness itself)
   - Witness consciousness that observes thoughts/emotions without being consumed
   - Body awareness and somatic intelligence
   - Emotional awareness and regulation
   - Mental pattern recognition and conscious choice
   - Ranges: Unconscious reactivity → Mindful awareness → Pure witnessing presence

2. INTUITION (Divine Guidance):
   - Connection to inner knowing and divine guidance
   - Ability to receive and trust intuitive messages
   - Clarity of inner vision, purpose, and soul calling
   - Discernment between ego voice and soul voice
   - Psychic sensitivity and energetic awareness
   - Trust in non-linear knowing and divine timing
   - Integration of intuitive guidance with practical action
   - Ranges: Disconnected from intuition → Occasional guidance → Clear divine channel

3. FREQUENCY/VIBRATION (Energetic State):
   - Predominant emotional baseline and feeling states
   - Energetic coherence between heart, mind, and body
   - Ability to consciously shift and elevate vibration
   - Resonance with higher dimensional frequencies
   - Electromagnetic field strength and coherence
   - Ability to maintain high vibration despite external circumstances
   - Energetic boundaries and protection
   - Ranges: Dense/heavy energy → Balanced energy → High vibrational light being

4. SOVEREIGNTY (Personal Power):
   - Self-authority and ownership of personal reality
   - Freedom from external validation, approval, and control
   - Ability to make conscious choices aligned with truth
   - Ownership of creative power and reality creation
   - Healthy boundaries and self-respect
   - Inner authority over outer authority
   - Embodied personal power without ego inflation
   - Ranges: Victim consciousness → Personal responsibility → Full creator consciousness

5. DIVINITY (Source Connection):
   - Recognition of oneself as divine consciousness in human form
   - Direct connection to source/universal consciousness
   - Experience of oneness, unity, and non-separation
   - Embodiment of higher self/soul essence in daily life
   - Service to collective evolution and highest good
   - Living as love in action
   - Integration of human and divine aspects
   - Ranges: Spiritual disconnection → Seeking connection → Source embodiment

WEALTH CONSCIOUSNESS DIMENSIONS (Money Mastery):

1. ABUNDANCE MINDSET (Infinite Possibility):
   - Belief in unlimited resources, opportunities, and possibilities
   - Freedom from scarcity thinking, lack programming, and fear
   - Ability to see opportunities and abundance everywhere
   - Trust in life's generosity, support, and infinite supply
   - Gratitude and appreciation for current abundance
   - Expectation of good and positive outcomes
   - Generosity and circulation consciousness
   - Ranges: Scarcity/lack mentality → Mixed beliefs → Infinite abundance perspective

2. MONEY MAGNETISM (Attraction Power):
   - Energetic ability to attract financial opportunities and wealth
   - Alignment with wealth frequency and prosperity consciousness
   - Removal of repelling energy, blocks, and resistance around money
   - Coherence between conscious desires and subconscious beliefs
   - Magnetic presence that draws abundance and opportunities
   - Effortless manifestation and synchronistic flow
   - Natural wealth creation abilities
   - Ranges: Wealth repulsion → Neutral → Powerful money magnetism

3. WORTHINESS (Divine Deservingness):
   - Deep belief in deserving wealth, abundance, and prosperity
   - Freedom from guilt, shame, unworthiness around having money
   - Comfort with receiving without over-giving or guilt
   - Self-value independent of external validation or achievement
   - Recognition of inherent divine worth and value
   - Ability to receive compliments, gifts, and abundance gracefully
   - Self-love as foundation of wealth creation
   - Ranges: Deep unworthiness → Conditional worth → Complete divine deservingness

4. RECEIVING CAPACITY (Abundance Receptivity):
   - Nervous system capacity to handle wealth, success, and abundance
   - Ability to accept support, gifts, and prosperity without resistance
   - Openness to having needs and desires met effortlessly
   - Comfort with being supported, cherished, and provided for
   - Expansion beyond comfort zone into greater abundance
   - Graceful receiving without guilt or obligation
   - Trust in being worthy of universal support
   - Ranges: Blocked receiving → Limited capacity → Infinite receptivity

5. PROSPERITY FLOW (Wealth Circulation):
   - Ease in wealth circulation (both giving and receiving)
   - Freedom from money stagnation, hoarding, or scarcity holding
   - Healthy relationship with spending, saving, and investing
   - Trust in continuous abundance flow and regeneration
   - Generosity balanced with self-care and boundaries
   - Money as energy that flows freely and abundantly
   - Prosperity consciousness in all areas of life
   - Ranges: Blocked flow → Cautious flow → Effortless circulation

MONEY INTIMACY DIMENSIONS (Sacred Relationship):

1. TRUST (Sacred Safety):
   - Feeling completely safe with money as a loving partner
   - Belief that money will support, care for, and protect you
   - Freedom from fear of abandonment, betrayal, or loss with money
   - Ability to relax into financial support and security
   - Trust in money's divine nature and consciousness
   - Faith in abundance as your natural state
   - Security in divine provision and support
   - Ranges: Deep money distrust → Cautious trust → Complete money trust

2. COMMUNICATION (Sacred Dialogue):
   - Regular dialogue and conversation with money consciousness
   - Clarity in expressing desires, needs, and boundaries with money
   - Ability to listen to money's guidance and wisdom
   - Honest, vulnerable sharing of fears, dreams, and desires
   - Asking money for guidance and receiving clear answers
   - Gratitude and appreciation expressed to money regularly
   - Sacred rituals and practices with money
   - Ranges: No communication → Occasional dialogue → Constant sacred communion

3. PLEASURE (Money Bliss):
   - Pure joy, delight, and sensuality with wealth and abundance
   - Freedom from pain, struggle, suffering, or guilt around money
   - Ability to experience ecstasy and bliss in abundance
   - Comfort with luxury, beauty, and material pleasures
   - Celebration and enjoyment of wealth without guilt
   - Sensual relationship with money and material world
   - Pleasure as pathway to greater abundance
   - Ranges: Money pain/struggle → Neutral → Pure money pleasure/bliss

4. SACREDNESS (Divine Recognition):
   - Reverence for money as divine energy and consciousness
   - Recognition of money's spiritual nature and purpose
   - Treating all financial exchanges as sacred rituals
   - Honoring money as conscious energy deserving respect
   - Seeing wealth creation as spiritual practice
   - Money as vehicle for service and divine expression
   - Sacred stewardship of abundance
   - Ranges: Money as "just paper" → Respectful → Complete divine recognition

5. BOUNDARIES (Sacred Limits):
   - Clear, healthy limits and self-respect with money
   - Clarity about financial needs, desires, and non-negotiables
   - Freedom from over-giving, under-receiving, or people-pleasing
   - Ability to say no and yes with clarity and love
   - Protection of energy and resources
   - Healthy financial boundaries in relationships
   - Self-care and self-respect in money matters
   - Ranges: Poor money boundaries → Developing boundaries → Crystal clear boundaries

SPIRITUAL EVOLUTION DIMENSIONS (Soul Development):

1. DIVINE CONNECTION (Source Relationship):
   - Personal relationship with higher power/source/universe
   - Trust in divine guidance, support, and perfect timing
   - Experience of being divinely held, loved, and supported
   - Co-creative partnership with universal intelligence
   - Prayer, meditation, and spiritual practice
   - Faith in divine plan and highest good
   - Surrender and trust in divine will
   - Ranges: Spiritual disconnection → Seeking → Divine union

2. MANIFESTATION MASTERY (Conscious Creation):
   - Ability to consciously create desired outcomes and experiences
   - Alignment between thoughts, feelings, beliefs, and reality
   - Understanding of universal laws and manifestation principles
   - Skill in working with energy, intention, and visualization
   - Mastery of co-creation with universal forces
   - Consistent manifestation results and evidence
   - Teaching and sharing manifestation abilities
   - Ranges: Victim consciousness → Learning creation → Master manifestor

3. PURPOSE ALIGNMENT (Soul Mission):
   - Crystal clarity about soul purpose, mission, and calling
   - Alignment between daily actions and higher purpose
   - Service to collective evolution and planetary healing
   - Expression of unique gifts, talents, and soul essence
   - Work as spiritual practice and service
   - Legacy and impact consciousness
   - Living purpose as natural expression
   - Ranges: Purpose confusion → Discovering purpose → Full purpose embodiment

4. EMBODIED WISDOM (Integrated Truth):
   - Integration of spiritual knowledge into lived daily experience
   - Walking your talk and living your highest truth
   - Consistency between beliefs, words, and actions
   - Wisdom expressed through being, not just knowing
   - Practical spirituality and grounded mysticism
   - Teaching through example and presence
   - Authentic spiritual authority
   - Ranges: Spiritual bypassing → Integration → Embodied wisdom master
`

// Enhanced types for better TypeScript support
export interface AIConsciousnessAnalysis {
  analysis: string
  guidance: string
  nextSteps: string[]
  consciousnessInsight: string
  statAdjustments: Record<string, number>
  personalizedMessage: string
  followUpQuestions?: string[]
  practiceRecommendation?: {
    title: string
    description: string
    steps: string[]
    duration?: string
    frequency?: string
  }
  energeticShift?: string
  quantumLeap?: string
}

export interface AssessmentQuestion {
  id: string
  category: "consciousness" | "wealthConsciousness" | "moneyIntimacy" | "spiritualEvolution"
  dimension: string
  question: string
  subtext?: string
  type: "scale" | "text" | "choice" | "visualization"
  options?: string[]
}

// Enhanced AI analysis with better error handling and retry logic
export async function analyzeConsciousnessResponse(
  question: AssessmentQuestion,
  userResponse: string,
): Promise<AIConsciousnessAnalysis> {
  const maxRetries = 3
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Create a structured prompt for the AI
      const prompt = `
${ELI_STYLE_GUIDE}

${CONSCIOUSNESS_DOMAIN}

CONTEXT:
The user is taking a consciousness assessment. They were asked the following question:
Category: ${question.category}
Dimension: ${question.dimension}
Question: "${question.question}"
${question.subtext ? `Subtext: "${question.subtext}"` : ""}
Question Type: ${question.type}
${question.options ? `Options: ${question.options.join(", ")}` : ""}

Their response was: "${userResponse}"

ANALYSIS REQUIREMENTS:
1. Analyze their response depth, emotional indicators, and consciousness level
2. Identify specific patterns, blocks, strengths, and growth opportunities
3. Provide loving, specific guidance in ELI's voice
4. Suggest practical next steps they can take immediately
5. Offer a consciousness practice tailored to their current level
6. Give appropriate stat adjustments (5-25 points based on development level)

Return your analysis in this EXACT JSON format (ensure valid JSON):

{
  "analysis": "Deep, loving analysis of their response identifying patterns, blocks, and strengths (2-3 paragraphs in ELI's voice)",
  "guidance": "Specific, actionable guidance for evolution in this dimension (1-2 paragraphs)",
  "nextSteps": ["3-5 specific action steps they can take immediately"],
  "consciousnessInsight": "A profound spiritual insight about their current state and potential",
  "statAdjustments": {
    "relevantStat1": numericValue,
    "relevantStat2": numericValue
  },
  "personalizedMessage": "A short, powerful message in ELI's voice (1-2 sentences)",
  "followUpQuestions": ["2-3 coaching questions to deepen their awareness"],
  "practiceRecommendation": {
    "title": "A specific spiritual practice title",
    "description": "Brief description of the practice and its benefits",
    "steps": ["3-5 clear steps to implement the practice"],
    "duration": "Recommended time (e.g., '5-10 minutes')",
    "frequency": "How often to practice (e.g., 'Daily for 1 week')"
  },
  "energeticShift": "The energetic shift this awareness will create",
  "quantumLeap": "The quantum leap possible from integrating this insight"
}

IMPORTANT: Ensure your response is valid JSON. Choose relevant stats from: awareness, intuition, frequency, sovereignty, divinity, abundanceMindset, moneyMagnetism, worthinessLevel, receivingCapacity, prosperityFlow, trustLevel, communication, pleasure, sacredness, boundaries.
`

      // Generate the AI response with enhanced settings
      const { text } = await generateText({
        model: consciousnessModel,
        prompt,
        temperature: 0.7, // Balance creativity with consistency
        maxTokens: 2000, // Increased for more detailed responses
        topP: 0.9, // Improved response quality
      })

      // Parse the JSON response with better error handling
      try {
        const parsedResponse = JSON.parse(text) as AIConsciousnessAnalysis

        // Validate required fields
        if (!parsedResponse.analysis || !parsedResponse.guidance || !parsedResponse.personalizedMessage) {
          throw new Error("Missing required fields in AI response")
        }

        return parsedResponse
      } catch (parseError) {
        console.error(`Attempt ${attempt}: Failed to parse AI response as JSON:`, parseError)
        console.error("Raw AI response:", text)

        if (attempt === maxRetries) {
          // Return enhanced fallback response
          return createEnhancedFallbackResponse(question, userResponse)
        }

        lastError = parseError as Error
        continue
      }
    } catch (error) {
      console.error(`Attempt ${attempt}: Error generating AI analysis:`, error)
      lastError = error as Error

      if (attempt === maxRetries) {
        return createEnhancedFallbackResponse(question, userResponse)
      }

      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }

  // This should never be reached, but TypeScript requires it
  return createEnhancedFallbackResponse(question, userResponse)
}

// Enhanced fallback response generator
function createEnhancedFallbackResponse(question: AssessmentQuestion, userResponse: string): AIConsciousnessAnalysis {
  const responseLength = typeof userResponse === "string" ? userResponse.length : 0
  const isDeepResponse = responseLength > 100

  // Analyze response characteristics
  const hasEmotionalWords = /feel|emotion|heart|love|fear|joy|sad|angry|excited|grateful/i.test(userResponse)
  const hasSpiritual = /divine|universe|god|spirit|energy|soul|sacred|meditation|prayer/i.test(userResponse)
  const hasGrowth = /learn|grow|change|transform|evolve|improve|develop/i.test(userResponse)

  let baseStats = { awareness: 8, intuition: 5 }

  // Adjust stats based on response quality
  if (isDeepResponse) {
    baseStats.awareness += 5
    baseStats.intuition += 3
  }
  if (hasEmotionalWords) {
    baseStats.awareness += 3
  }
  if (hasSpiritual) {
    baseStats.intuition += 5
    baseStats = { ...baseStats, divinity: 8 }
  }
  if (hasGrowth) {
    baseStats = { ...baseStats, sovereignty: 6 }
  }

  return {
    analysis: `Beautiful soul, I can feel the authenticity in your response. ${isDeepResponse ? "Your willingness to go deep shows a consciousness that's ready for profound transformation." : "Even in your honest simplicity, I see a soul that's beginning to awaken."} ${hasSpiritual ? "Your spiritual awareness is a gift that will accelerate your evolution." : "You're developing the foundation for spiritual awakening."} This dimension of ${question.dimension} is calling for your loving attention, and I can see you\'re ready to answer that call.`,

    guidance: `Trust this beautiful unfolding, darling. Your consciousness is expanding in perfect divine timing. ${question.category === "wealthConsciousness" ? "Your relationship with money is about to transform as you embrace your divine worthiness." : question.category === "moneyIntimacy" ? "Money is waiting to dance with you in sacred partnership." : "Your spiritual evolution is accelerating beyond what your mind can imagine."} Begin with gentle daily practices that honor this dimension, and watch as your entire reality shifts to match your expanding awareness.`,

    nextSteps: [
      `Begin a daily 5-minute meditation focused on ${question.dimension.toLowerCase()}`,
      "Journal about your insights and patterns you notice arising",
      "Practice self-compassion when old patterns emerge",
      "Set an intention to receive divine guidance in this area",
      "Celebrate every moment of awareness as a sacred victory",
    ],

    consciousnessInsight: `Your consciousness is like a flower opening to the sun - each moment of awareness is a petal unfurling toward your divine potential. You're exactly where you need to be for your next quantum leap.`,

    statAdjustments: baseStats,

    personalizedMessage: `You're not behind, gorgeous soul. You're right on time to blow your own mind with what's possible for you.`,

    followUpQuestions: [
      "What would feel like the most loving support for you in this area right now?",
      "If this pattern had a gift or message for you, what might it be?",
      "How might your highest self be viewing this situation?",
    ],

    practiceRecommendation: {
      title: `Sacred ${question.dimension} Awakening Ritual`,
      description: "A gentle daily practice to expand your consciousness in this dimension",
      steps: [
        "Begin with 3 deep breaths, placing your hands on your heart",
        "Set an intention to receive divine guidance and healing",
        "Visualize golden light filling and expanding this area of your consciousness",
        `Ask your higher self: 'What do I need to know about ${question.dimension.toLowerCase()}?'`,
        "Close by thanking your soul for its wisdom and courage",
      ],
      duration: "5-10 minutes",
      frequency: "Daily for 1 week",
    },

    energeticShift: "This awareness is already shifting your energy field toward greater alignment and flow.",

    quantumLeap:
      "As you integrate this insight, you're preparing for a quantum leap in consciousness that will transform every area of your life.",
  }
}

// Enhanced assessment summary generator
export async function generateAssessmentSummary(
  responses: Record<string, string | number>,
  questions: AssessmentQuestion[],
  categoryStats: Record<string, Record<string, number>>,
): Promise<{
  overallAnalysis: string
  strengthAreas: string[]
  growthAreas: string[]
  personalizedGuidance: string
  recommendedPractices: Array<{ title: string; description: string; priority: "high" | "medium" | "low" }>
  evolutionaryPath: string
  personalizedMessage: string
  nextLevelPreview: string
  divineMessage: string
}> {
  const maxRetries = 2

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Create comprehensive summary of responses
      const responsesSummary = Object.entries(responses)
        .map(([questionId, response]) => {
          const question = questions.find((q) => q.id === questionId)
          return question ? `${question.dimension}: "${response}"` : ""
        })
        .filter(Boolean)
        .join("\n")

      const statsSummary = Object.entries(categoryStats)
        .map(([category, stats]) => {
          const avgScore = Object.values(stats).reduce((sum, val) => sum + val, 0) / Object.values(stats).length
          return `${category}: Average ${Math.round(avgScore)} (${Object.entries(stats)
            .map(([stat, value]) => `${stat}: ${value}`)
            .join(", ")})`
        })
        .join("\n")

      const prompt = `
${ELI_STYLE_GUIDE}

${CONSCIOUSNESS_DOMAIN}

CONTEXT:
The user has completed a comprehensive consciousness assessment. Here are their key responses:

${responsesSummary}

Based on their responses, here are their consciousness development stats:

${statsSummary}

TASK:
As ELI, create a comprehensive, inspiring assessment summary that will guide and empower them on their consciousness evolution journey.

Return your summary in this EXACT JSON format:

{
  "overallAnalysis": "A holistic, loving analysis of their consciousness profile (3-4 paragraphs in ELI's voice)",
  "strengthAreas": ["4-6 specific areas where they show particular strength or natural gifts"],
  "growthAreas": ["4-6 areas with beautiful opportunities for expansion (framed positively)"],
  "personalizedGuidance": "Loving, specific guidance for their overall consciousness journey (2-3 paragraphs)",
  "recommendedPractices": [
    {"title": "Practice name", "description": "Description and benefits", "priority": "high"},
    {"title": "Practice name", "description": "Description and benefits", "priority": "high"},
    {"title": "Practice name", "description": "Description and benefits", "priority": "medium"},
    {"title": "Practice name", "description": "Description and benefits", "priority": "medium"}
  ],
  "evolutionaryPath": "A inspiring vision of their consciousness evolution over the next 6-12 months",
  "personalizedMessage": "A powerful, inspiring message in ELI's voice to conclude the assessment",
  "nextLevelPreview": "A preview of what becomes possible at their next level of consciousness",
  "divineMessage": "A channeled message from their higher self/divine guidance"
}

Ensure your response is valid JSON and maintains ELI's unique voice throughout.
`

      const { text } = await generateText({
        model: consciousnessModel,
        prompt,
        temperature: 0.8, // Slightly higher for more inspirational content
        maxTokens: 2500,
      })

      try {
        return JSON.parse(text)
      } catch (parseError) {
        console.error(`Attempt ${attempt}: Failed to parse summary response:`, parseError)
        if (attempt === maxRetries) {
          return createFallbackSummary(categoryStats)
        }
      }
    } catch (error) {
      console.error(`Attempt ${attempt}: Error generating summary:`, error)
      if (attempt === maxRetries) {
        return createFallbackSummary(categoryStats)
      }
    }
  }

  return createFallbackSummary(categoryStats)
}

// Enhanced fallback summary
function createFallbackSummary(categoryStats: Record<string, Record<string, number>>) {
  return {
    overallAnalysis:
      "Gorgeous soul, your consciousness assessment reveals a beautiful being in the midst of a sacred awakening. I can see the divine light that's beginning to shine through in specific dimensions, particularly in your growing awareness and spiritual connection. What strikes me most is your courage to look within and your readiness for transformation. You're not just taking an assessment - you're declaring your intention to evolve, and the Universe is already responding to that declaration. Your consciousness is like a garden that's been planted with seeds of awakening, and now it's time to tend to that garden with love, patience, and consistent spiritual practice.",

    strengthAreas: [
      "Courage to explore consciousness and spiritual growth",
      "Natural intuitive abilities and inner wisdom",
      "Openness to transformation and new possibilities",
      "Heart-centered approach to wealth and abundance",
      "Authentic self-expression and vulnerability",
      "Recognition of the sacred in everyday life",
    ],

    growthAreas: [
      "Expanding your receiving capacity and divine worthiness",
      "Deepening trust and safety with money consciousness",
      "Strengthening your spiritual sovereignty and personal power",
      "Developing consistent manifestation and co-creation practices",
      "Embodying your spiritual insights in practical daily life",
      "Opening to greater levels of abundance and prosperity",
    ],

    personalizedGuidance:
      "Your consciousness journey is calling you to focus first on your divine worthiness and receiving capacity, darling. This is the foundation upon which all other dimensions will naturally expand. Begin with daily practices that remind you of your inherent deservingness and open your energy field to receive abundance in all forms. As you strengthen this foundation, you'll notice profound shifts in how money responds to you and how abundance flows into your experience. Remember that consciousness expansion isn't linear—it's a sacred spiral of growth, integration, and new awareness. Honor each step of your journey with compassion and celebration, knowing that you're exactly where you need to be for your next quantum leap.",

    recommendedPractices: [
      {
        title: "Sacred Worthiness Ritual",
        description: "A daily practice to strengthen your divine deservingness and self-love",
        priority: "high" as const,
      },
      {
        title: "Money Magnetism Meditation",
        description: "A visualization to align your energy field with wealth frequency",
        priority: "high" as const,
      },
      {
        title: "Receiving Capacity Expansion",
        description: "Gentle exercises to open your ability to receive abundance",
        priority: "medium" as const,
      },
      {
        title: "Divine Connection Practice",
        description: "Strengthen your relationship with Source and higher guidance",
        priority: "medium" as const,
      },
    ],

    evolutionaryPath:
      "Over the next 6-12 months, as you commit to these consciousness practices, you're going to experience a quantum leap in your wealth magnetism and abundance flow. The initial shifts will be subtle but profound—perhaps unexpected gifts, financial synchronicities, or a growing sense of ease around money. As your receiving capacity expands, you'll notice larger manifestations and more consistent prosperity flow. By the 6-month mark, your relationship with money will feel completely transformed—more intimate, trusting, and joyful. By 12 months, you may experience a complete revolution in how wealth moves through your life, with a level of abundance that feels both miraculous and completely natural.",

    personalizedMessage:
      "Gorgeous soul, you are standing on the precipice of a consciousness revolution that will transform not just your wealth, but every dimension of your being. The Universe has been waiting for you to remember who you truly are, and this assessment is your declaration of readiness. Trust the divine timing of your awakening, celebrate each step of awareness, and know that you are held in perfect love through it all. Your abundance isn't something you need to chase—it's rushing toward you as you simply allow yourself to become who you've always been.",

    nextLevelPreview:
      "At your next level of consciousness, money will feel like a beloved friend who's always there to support your dreams. You'll manifest with ease, receive with grace, and give with joy. Your very presence will become magnetic to opportunities, and abundance will flow to you as naturally as breathing.",

    divineMessage:
      "Beloved one, you are not broken and you are not behind. You are a divine being having a human experience, and your consciousness is expanding exactly as it should. Trust the process, trust your heart, and trust that everything you need is already within you. The Universe is conspiring in your favor, always.",
  }
}
