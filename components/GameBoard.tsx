"use client";

import { motion } from "framer-motion";
import type { Choice } from "@/hooks/useGame";
import { useFarcaster } from "./providers";

interface GameBoardProps {
  onChoice: (choice: Choice) => void;
  disabled: boolean;
}

const CHOICES = [
  { emoji: "🪨", name: "Rock", index: 0 as Choice },
  { emoji: "📄", name: "Paper", index: 1 as Choice },
  { emoji: "✂️", name: "Scissors", index: 2 as Choice },
];

export function GameBoard({ onChoice, disabled }: GameBoardProps) {
  const { isInFarcaster } = useFarcaster();

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Disable animations in Farcaster for better performance
  const shouldAnimate = !isInFarcaster && !prefersReducedMotion;

  return (
    <div className="space-y-4 sm:space-y-5">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
        Choose Your Move
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {CHOICES.map((choice) => (
          <motion.button
            key={choice.index}
            onClick={() => onChoice(choice.index)}
            disabled={disabled}
            whileTap={!disabled && shouldAnimate ? { scale: 0.95 } : {}}
            className="flex flex-col items-center justify-center gap-1 sm:gap-2 p-4 sm:p-6 min-h-[100px] sm:min-h-[120px] bg-white/80 backdrop-blur-lg rounded-2xl border-2 border-gray-700 shadow-lg active:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:bg-white/90"
            style={{
              boxShadow: !disabled
                ? "0 0 0 3px #FCFF52, 0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            aria-label={`Choose ${choice.name}`}
          >
            <span
              className="text-4xl sm:text-5xl"
              role="img"
              aria-label={choice.name}
            >
              {choice.emoji}
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-900">
              {choice.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
