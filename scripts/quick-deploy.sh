#!/bin/bash

echo "🚀 QUICK DEPLOYMENT TO VERCEL"
echo "=============================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Set environment variables
echo "🔐 Setting up environment variables..."
echo "OPENAI_API_KEY=your-key-here" > .env.local
echo "NEXT_PUBLIC_APP_NAME=ELI Frequency" >> .env.local

# Build check
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo "✅ DEPLOYMENT COMPLETE!"
    echo "🌟 Your app is now live!"
    echo ""
    echo "📋 NEXT STEPS:"
    echo "1. Add your OpenAI API key in Vercel dashboard"
    echo "2. Set project to private in Vercel settings"
    echo "3. Test the live app"
    
else
    echo "❌ Build failed. Check errors above."
fi
