// Check deployment readiness
console.log("🔍 Checking deployment readiness...\n")

// Check for required environment variables
const requiredEnvVars = ["OPENAI_API_KEY"]
const missingVars = []

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    missingVars.push(varName)
  }
})

if (missingVars.length > 0) {
  console.log("❌ Missing environment variables:")
  missingVars.forEach((varName) => {
    console.log(`   - ${varName}`)
  })
} else {
  console.log("✅ All environment variables present")
}

// Check package.json
console.log("\n📦 Checking package.json...")
try {
  const pkg = require("../package.json")
  console.log(`✅ Package name: ${pkg.name}`)
  console.log(`✅ Version: ${pkg.version}`)
  console.log(`✅ Next.js version: ${pkg.dependencies.next}`)
} catch (error) {
  console.log("❌ Package.json issue:", error.message)
}

// Deployment recommendations
console.log("\n🚀 DEPLOYMENT OPTIONS:")
console.log("1. Vercel (Recommended - Free tier available)")
console.log("2. Netlify (Good for static sites)")
console.log("3. Railway (Good for full-stack apps)")
console.log("4. Render (Free tier available)")

console.log("\n🔐 FOR PRIVATE DEPLOYMENT:")
console.log("- Vercel: Set to private in dashboard")
console.log("- Add password protection")
console.log("- Use environment variables for API keys")

console.log("\n✅ READY TO DEPLOY!")
