# 🚀 Deployment Guide - Rock Paper Scissors on Celo

This guide will help you deploy your Rock Paper Scissors game to production with GitHub, Vercel, and Farcaster integration.

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Farcaster account
- Git installed locally

## 🔗 Step 1: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to [https://github.com/new](https://github.com/new)
2. Fill in the repository details:
   - **Repository name**: `rock-paper-scissors-celo-v2`
   - **Description**: "Rock Paper Scissors game on Celo blockchain with Farcaster integration"
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

### Option B: Using GitHub CLI (if installed)

```bash
cd rock-paper-scissors-celo-v2
gh repo create rock-paper-scissors-celo-v2 --public --source=. --remote=origin --push
```

### Manual Push (If using Option A)

After creating the repository on GitHub, run these commands:

```bash
cd rock-paper-scissors-celo-v2

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/rock-paper-scissors-celo-v2.git

# Set the branch name
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🔧 Step 2: Configure for Vercel

### 2.1 Update Environment Variables

The project is already configured for Vercel. You'll need to set these environment variables in Vercel dashboard:

- `NEXT_PUBLIC_URL`: Your production URL (will be provided by Vercel)

### 2.2 Vercel Configuration File

A `vercel.json` has been created for optimal deployment:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

## 🌐 Step 3: Deploy to Vercel

### Using Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose your GitHub account and select `rock-paper-scissors-celo-v2`
5. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Add Environment Variables:
   - Click "Add Environment Variable"
   - Name: `NEXT_PUBLIC_URL`
   - Value: Leave empty for now (we'll update it after first deployment)
7. Click "Deploy"

### After First Deployment

1. Once deployed, copy your Vercel URL (e.g., `https://rock-paper-scissors-celo-v2.vercel.app`)
2. Go to your project settings in Vercel
3. Navigate to "Environment Variables"
4. Update `NEXT_PUBLIC_URL` with your Vercel URL
5. Redeploy the project (Settings → Deployments → Redeploy)

## 🎯 Step 4: Configure Farcaster Miniapp

### 4.1 Create Farcaster Miniapp

1. Go to [Farcaster Developer Portal](https://dev.farcaster.xyz/)
2. Create a new miniapp
3. Fill in the details:
   - **Name**: Rock Paper Scissors on Celo
   - **Icon URL**: `https://your-vercel-url.vercel.app/icon.png`
   - **Splash Image URL**: `https://your-vercel-url.vercel.app/splash.png`
   - **Home URL**: `https://your-vercel-url.vercel.app`
4. Save and copy your manifest ID

### 4.2 Update Next.js Configuration

Update `next.config.js` with your manifest ID:

```javascript
async redirects() {
  return [
    {
      source: '/.well-known/farcaster.json',
      destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/YOUR_MANIFEST_ID_HERE',
      permanent: false,
      statusCode: 307,
    },
  ];
},
```

### 4.3 Push Changes and Redeploy

```bash
git add next.config.js
git commit -m "Update Farcaster manifest ID"
git push
```

Vercel will automatically redeploy.

## ✅ Step 5: Verify Deployment

### Test Your App

1. **Direct Access**: Visit your Vercel URL
2. **Free Play Mode**:
   - Click "🆓 Free Play"
   - Try playing Rock, Paper, Scissors
   - Check stats tracking
3. **On-Chain Mode**:
   - Click "⛓️ On-Chain"
   - Connect your wallet
   - Try a transaction

### Test Farcaster Integration

1. Open Warpcast app
2. Search for your miniapp or use the direct link
3. Launch the miniapp
4. Play a game
5. Try sharing results

## 🔄 Continuous Deployment

Vercel is now configured for automatic deployments:

- **Every push to `main`** → Automatic production deployment
- **Every pull request** → Preview deployment
- **Local changes** → Push to GitHub → Auto-deploy

## 🛠️ Environment Variables Summary

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_URL` | Your production URL | `https://your-app.vercel.app` |

## 📊 Monitoring

### Vercel Analytics

- Go to your project in Vercel
- Click "Analytics" to see:
  - Page views
  - Performance metrics
  - User demographics

### Error Tracking

- Check Vercel Functions logs for errors
- Monitor transaction success/failure rates

## 🚨 Troubleshooting

### Deployment Fails

1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set

### Wallet Connection Issues

1. Check that Wagmi is properly configured for Celo
2. Verify smart contract address is correct
3. Ensure user is on Celo network

### Farcaster Not Loading

1. Verify manifest ID is correct in `next.config.js`
2. Check that redirect is working (test `/.well-known/farcaster.json`)
3. Ensure all images are accessible

## 🎉 Next Steps

Once deployed:

1. **Share your app** on Farcaster and social media
2. **Monitor usage** via Vercel Analytics
3. **Collect feedback** from users
4. **Iterate and improve** based on feedback

## 📞 Support

- Vercel: [vercel.com/support](https://vercel.com/support)
- Farcaster: [docs.farcaster.xyz](https://docs.farcaster.xyz)
- Celo: [docs.celo.org](https://docs.celo.org)

---

Built with ❤️ on Celo and Farcaster
