# 🚀 Deploy Nalani to elifrequency.com

## Step 1: Prepare Your Code
\`\`\`bash
# Make sure all files are committed
git add .
git commit -m "Ready for deployment to elifrequency.com"
git push origin main
\`\`\`

## Step 2: Deploy to Vercel

### Option A: GitHub Integration (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

### Option B: Vercel CLI
\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
\`\`\`

## Step 3: Add Environment Variables
In Vercel Dashboard:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add:
   - `OPENAI_API_KEY` = your_openai_api_key
   - `NEXT_PUBLIC_APP_NAME` = "ELI Frequency"
   - `NEXT_PUBLIC_APP_DESCRIPTION` = "Sacred AI-Powered Consciousness Evolution"

## Step 4: Configure Custom Domain
1. In Vercel Dashboard → Domains
2. Add domain: `elifrequency.com`
3. Add domain: `www.elifrequency.com`

## Step 5: DNS Configuration
In your domain registrar (GoDaddy, Namecheap, etc.):

### A Records:
- `@` → `76.76.19.61`
- `www` → `76.76.19.61`

### Or CNAME (preferred):
- `www` → `cname.vercel-dns.com`

## Step 6: SSL Certificate
- Vercel automatically generates SSL
- Your site will be HTTPS by default

## 🎯 Verification
- Visit https://elifrequency.com
- Test the chat feature
- Verify AI responses work
- Check mobile responsiveness

## 🚨 Troubleshooting
- DNS changes take 24-48 hours
- Check Vercel deployment logs for errors
- Verify environment variables are set
- Test API endpoints individually
