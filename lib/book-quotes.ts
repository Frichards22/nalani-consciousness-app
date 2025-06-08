// Expanded pool of rotating book quotes
export const bookQuotePool = {
  "stage-1": [
    "Your money wounds aren't your fault, but healing them is your responsibility. And gorgeous, you're more ready than you think.",
    "The first step to financial freedom is admitting you're not free. Most people spend their whole lives pretending they're fine with financial mediocrity.",
    "Your relationship with money is the longest relationship you'll ever have. It's time to make it a love story.",
    "Every money wound is a portal to power. The deeper the wound, the greater the potential for transformation.",
    "You can't heal what you won't feel. Your money pain is information, not punishment.",
    "The stories you tell yourself about money become the reality you live. Choose better stories.",
  ],
  "stage-2": [
    "Grief is not the opposite of abundance - it's the gateway to it. You can't receive what you won't let yourself want.",
    "Your tears about money are sacred. They're washing away old programming to make room for new possibilities.",
    "Mourning your financial dreams isn't giving up - it's making space for bigger ones.",
    "The life you didn't live because of money fears is still available to you. It's never too late to choose again.",
    "Your grief about money is your soul recognizing its own worth. Feel it fully, then rise.",
    "Every abandoned dream is a seed waiting for the right season. Your financial spring is coming.",
  ],
  "stage-3": [
    "Your anger about money isn't 'unspiritual' - it's information. It's your soul saying 'I deserve better than this.'",
    "Rage is the rocket fuel of transformation. Channel that fire into fierce self-advocacy.",
    "Your anger at financial injustice is your inner revolutionary awakening. Use it wisely.",
    "The patriarchy taught you that wanting money makes you greedy. Your anger at that lie is sacred.",
    "Your fury about being underpaid, undervalued, and overlooked is your power trying to emerge.",
    "Anger is just love with boundaries. Let it teach you what you will no longer tolerate.",
  ],
  "stage-4": [
    "Forgiveness is the foreplay of abundance. You can't receive from a clenched fist or a closed heart.",
    "Forgiving your money mistakes doesn't mean forgetting the lessons. It means freeing your energy to create differently.",
    "You don't forgive for them - you forgive for you. Your financial freedom depends on it.",
    "Every person who hurt you around money was operating from their own wounds. Hurt people hurt people.",
    "Forgiveness is not about being 'nice' - it's about being free. Free to receive all the abundance waiting for you.",
    "The energy you spend on resentment is energy you can't use for creation. Choose creation.",
  ],
  "stage-5": [
    "Money is not your enemy - it's your misunderstood lover waiting for you to see its true nature.",
    "Seducing money is about becoming irresistible to abundance. What would make you magnetic to wealth?",
    "Money wants to be with someone who appreciates it, respects it, and knows how to have fun with it.",
    "Your relationship with money should feel like the best relationship you've ever had - exciting, supportive, and growth-oriented.",
    "Money is attracted to joy, gratitude, and confidence. Become someone money wants to dance with.",
    "Stop chasing money and start attracting it. Become the person wealth naturally flows to.",
  ],
  "stage-6": [
    "Your relationship with money is the longest relationship you'll ever have. Make it a love story.",
    "Money vows are sacred contracts with abundance. What promises are you ready to make and keep?",
    "Commitment to money means showing up consistently, even when you don't feel like it.",
    "Your money marriage requires the same attention as any relationship - daily care, appreciation, and growth.",
    "The universe is waiting for you to commit to your own abundance. Your half-hearted desires get half-hearted results.",
    "True wealth comes from a committed relationship with money, not a casual fling.",
  ],
  "stage-7": [
    "Abundance isn't about the amount in your bank account - it's about the frequency in your heart.",
    "Living in abundance means knowing that there's always enough - enough money, enough love, enough opportunities.",
    "Your abundant life isn't a destination - it's a way of being. You can choose it right now.",
    "Wealth consciousness is your natural state. Scarcity is the learned behavior.",
    "When you live from abundance, you become a magnet for more abundance. It's the law of attraction in action.",
    "Your job isn't to figure out HOW abundance will come - it's to stay open to receive it in whatever form it takes.",
  ],
}

export function getRandomQuote(stageId: string): string {
  const quotes = bookQuotePool[stageId as keyof typeof bookQuotePool] || bookQuotePool["stage-1"]
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}
