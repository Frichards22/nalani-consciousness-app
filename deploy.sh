#!/bin/bash

echo "🚀 Deploying Nalani Consciousness App to elifrequency.com"

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Logging into Vercel..."
vercel login

# Deploy the project
echo "🚀 Deploying to Vercel..."
vercel --prod

# Add custom domain
echo "🌐 Adding custom domain..."
vercel domains add elifrequency.com
vercel domains add www.elifrequency.com

echo "✅ Deployment complete!"
echo "🌟 Your app will be live at https://elifrequency.com"
echo ""
echo "📋 Next steps:"
echo "1. Configure DNS settings with your domain provider"
echo "2. Add environment variables in Vercel dashboard"
echo "3. Test the live site"
