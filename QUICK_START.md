# 🚀 Quick Start Guide

## ✅ What's Done

Your Rock Paper Scissors game is ready! Here's what has been set up:

- ✅ **Smart Contract Integration**: Connected to `0xDeDb830D70cE3f687cad36847Ef5b9b96823A9b0`
- ✅ **Modern Stack**: Next.js 14, Wagmi, Viem, Farcaster miniapp-sdk
- ✅ **Dual Mode**: Free Play + On-Chain gameplay
- ✅ **Git Repository**: Initialized with 2 commits
- ✅ **Unified Design**: Matches Tictactoe-Celo and Solo-Jackpot
- ✅ **Deployment Ready**: Vercel and Farcaster configuration complete

## 📍 Your Project Location

```
C:\Users\Philv2dot1\rock-paper-scissors-celo-v2\
```

## 🏃 Test Locally

The development server is already running at:

**http://localhost:3000**

Try it out:
1. Open your browser to http://localhost:3000
2. Play in Free Mode (no wallet needed)
3. Switch to On-Chain mode and connect wallet
4. Test the game functionality

## 🌐 Deploy to Production (3 Steps)

### Step 1: Push to GitHub (5 minutes)

Follow instructions in [GITHUB_SETUP.md](./GITHUB_SETUP.md)

**Quick version:**
```bash
# 1. Create repo at https://github.com/new
# 2. Then run:
cd rock-paper-scissors-celo-v2
git remote add origin https://github.com/YOUR_USERNAME/rock-paper-scissors-celo-v2.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (5 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click "Deploy" (use default settings)
4. Copy your production URL (e.g., `https://your-app.vercel.app`)
5. Add environment variable:
   - Name: `NEXT_PUBLIC_URL`
   - Value: Your Vercel URL
6. Redeploy

### Step 3: Configure Farcaster (10 minutes)

1. Go to [Farcaster Developer Portal](https://dev.farcaster.xyz/)
2. Create new miniapp:
   - Name: Rock Paper Scissors on Celo
   - Icon: `https://your-vercel-url.vercel.app/icon.png`
   - Splash: `https://your-vercel-url.vercel.app/splash.png`
   - Home URL: Your Vercel URL
3. Copy your manifest ID
4. Update `next.config.js` line 10 with your manifest ID
5. Commit and push:
   ```bash
   git add next.config.js
   git commit -m "Add Farcaster manifest ID"
   git push
   ```

## 📚 Documentation

- **[GITHUB_SETUP.md](./GITHUB_SETUP.md)**: How to create GitHub repository
- **[DEPLOYMENT.md](./DEPLOYMENT.md)**: Complete deployment guide with troubleshooting
- **[README.md](./README.md)**: Project overview and features

## 🎮 Game Features

### Free Play Mode
- No wallet connection required
- Instant gameplay
- Local statistics tracking
- Perfect for testing and casual play

### On-Chain Mode
- Connect Farcaster wallet or any Web3 wallet
- Transactions recorded on Celo blockchain
- Persistent stats via smart contract:
  - Wins, Losses, Ties
  - Current winning streak
  - Best winning streak
  - Win rate percentage

### Social Features
- Share results on Farcaster
- Challenge friends
- Show off your stats

## 🔧 Project Structure

```
rock-paper-scissors-celo-v2/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout with Farcaster metadata
│   ├── page.tsx           # Main game page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── GameBoard.tsx      # Choice buttons (🪨📄✂️)
│   ├── GameStatus.tsx     # Result display
│   ├── PlayerStats.tsx    # Statistics panel
│   ├── ModeToggle.tsx     # Free/On-Chain switcher
│   ├── WalletConnect.tsx  # Wallet connection
│   └── FarcasterShare.tsx # Share button
├── hooks/
│   └── useGame.ts         # Game logic + smart contract calls
├── lib/
│   ├── wagmi.ts           # Wagmi config for Celo
│   ├── farcaster.ts       # Farcaster SDK utilities
│   └── contract-abi.ts    # Smart contract ABI
└── public/                # Static assets

28 files, ~2000 lines of code
```

## 🎨 Design System

Unified with Tictactoe-Celo and Solo-Jackpot:

- **Colors**: Celo Yellow (#FCFF52) + Gray gradients
- **Borders**: 2px black + 6px yellow shadow
- **Corners**: rounded-2xl (16px)
- **Effects**: Backdrop blur, smooth animations

## 🔐 Smart Contract

**Address**: `0xDeDb830D70cE3f687cad36847Ef5b9b96823A9b0`
**Network**: Celo Mainnet
**Explorer**: [View on Celoscan](https://celoscan.io/address/0xDeDb830D70cE3f687cad36847Ef5b9b96823A9b0)

**Functions**:
- `jouer(uint256 _choix)`: Play a game
- `creerProfil(string _nom)`: Create player profile
- `obtenirStats()`: Get player statistics

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start dev server (already running)
npm run build        # Build for production
npm run start        # Start production server

# Git
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub

# After GitHub setup
git remote -v        # Verify remote is set
git log --oneline    # View commit history
```

## 🆘 Need Help?

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Review [README.md](./README.md) for project details
3. Test locally first at http://localhost:3000
4. Verify smart contract on [Celoscan](https://celoscan.io/address/0xDeDb830D70cE3f687cad36847Ef5b9b96823A9b0)

## 🎉 You're All Set!

Your game is ready to deploy. Follow the 3 steps above to go live!

---

Built with ❤️ using Claude Code
