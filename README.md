# 🪨📄✂️ Rock Paper Scissors on Celo

A modern, interactive Rock Paper Scissors game built on Celo blockchain with Farcaster integration.

## ✨ Features

- **🎮 Dual Game Modes**
  - **Free Play**: Instant gameplay without wallet connection
  - **On-Chain**: Play on Celo blockchain with wallet integration

- **📊 Complete Statistics**
  - Track wins, losses, and ties
  - Win rate calculation
  - Persistent stats in on-chain mode

- **🔗 Farcaster Integration**
  - Share results directly to Farcaster
  - Seamless miniapp experience
  - Social engagement features

- **🎨 Modern UI/UX**
  - Unified design with Celo ecosystem apps
  - Smooth animations with Framer Motion
  - Responsive design for all devices
  - Professional styling with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Celo, Wagmi, Viem
- **Farcaster**: @farcaster/miniapp-sdk, @farcaster/miniapp-wagmi-connector
- **Animations**: Framer Motion
- **State Management**: @tanstack/react-query

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rock-paper-scissors-celo-v2
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Project Structure

```
rock-paper-scissors-celo-v2/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main game page
│   └── globals.css         # Global styles
├── components/
│   ├── providers.tsx       # Wagmi & React Query providers
│   ├── GameBoard.tsx       # Choice buttons (Rock/Paper/Scissors)
│   ├── GameStatus.tsx      # Result display
│   ├── PlayerStats.tsx     # Statistics panel
│   ├── ModeToggle.tsx      # Free/On-Chain mode switcher
│   ├── WalletConnect.tsx   # Wallet connection UI
│   └── FarcasterShare.tsx  # Share to Farcaster button
├── hooks/
│   └── useGame.ts          # Game logic hook
├── lib/
│   ├── wagmi.ts            # Wagmi configuration
│   ├── farcaster.ts        # Farcaster SDK utilities
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## 🎮 How to Play

1. **Choose Your Mode**
   - Click "🆓 Free Play" for instant gameplay
   - Click "⛓️ On-Chain" to play on Celo blockchain

2. **Connect Wallet** (On-Chain mode only)
   - Click "Connect" to connect your wallet
   - Supports Farcaster wallet and injected wallets

3. **Make Your Move**
   - Choose Rock 🪨, Paper 📄, or Scissors ✂️
   - Wait for the computer's choice
   - See the result instantly!

4. **Share Your Results**
   - Click "📣 Share on Farcaster" after each game
   - Show off your wins to the community!

## 🔗 Farcaster Miniapp

This app is designed as a Farcaster miniapp and includes:

- Automatic SDK initialization
- Wallet connection via Farcaster
- Share functionality
- Proper manifest configuration

### Deploy to Farcaster

1. Deploy your app to Vercel or any hosting platform
2. Update `NEXT_PUBLIC_URL` in your environment variables
3. Create a Farcaster miniapp manifest
4. Update the manifest ID in `next.config.js`

## 🎨 Design System

The app follows a unified design system with other Celo ecosystem apps:

- **Colors**:
  - Celo Yellow (#FCFF52) for accents
  - Gray gradient backgrounds
  - Black borders for depth

- **Components**:
  - Rounded corners (2xl = 16px)
  - Thick borders (2px)
  - Yellow shadow/glow effects
  - Glassmorphism with backdrop-blur

## 🔜 Future Enhancements

- [ ] Smart contract integration for on-chain gameplay
- [ ] Player profiles with NFT avatars
- [ ] Tournament mode
- [ ] Leaderboard system
- [ ] Achievement system
- [ ] Multiplayer challenges

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ for the Celo and Farcaster communities
