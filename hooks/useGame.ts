"use client";

import { useState, useCallback, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract-abi";

export type GameMode = "free" | "onchain";
export type GameStatus = "idle" | "playing" | "processing" | "finished";
export type Choice = 0 | 1 | 2; // 0 = Rock, 1 = Paper, 2 = Scissors
export type GameResult = "win" | "lose" | "tie";

export interface GameStats {
  wins: number;
  losses: number;
  ties: number;
  currentStreak?: number;
  bestStreak?: number;
}

export interface PlayResult {
  playerChoice: Choice;
  computerChoice: Choice;
  result: GameResult;
  message: string;
}

const CHOICES = ["🪨 Rock", "📄 Paper", "✂️ Scissors"] as const;

export function useGame() {
  const { address, isConnected } = useAccount();
  const [mode, setMode] = useState<GameMode>("free");
  const [status, setStatus] = useState<GameStatus>("idle");
  const [stats, setStats] = useState<GameStats>({ wins: 0, losses: 0, ties: 0 });
  const [lastResult, setLastResult] = useState<PlayResult | null>(null);
  const [message, setMessage] = useState<string>("");
  const [pendingChoice, setPendingChoice] = useState<Choice | null>(null);

  // Wagmi hooks
  const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
  const { isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash });

  // Check if player exists
  const { data: playerData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'joueurs',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && mode === "onchain",
    }
  });

  const playerExists = playerData && (playerData as any)[6] === true;

  // Get on-chain stats
  const { data: onchainStats, refetch: refetchStats } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'obtenirStats',
    query: {
      enabled: isConnected && !!address && playerExists && mode === "onchain",
    }
  });

  // Update stats from on-chain data
  useEffect(() => {
    if (mode === "onchain" && onchainStats && playerExists) {
      // Convert readonly tuple to array for easier access
      const statsArray = Array.from(onchainStats);
      setStats({
        wins: Number(statsArray[1] || 0),
        losses: Number(statsArray[2] || 0),
        ties: Number(statsArray[3] || 0),
        currentStreak: Number(statsArray[6] || 0),
        bestStreak: Number(statsArray[7] || 0),
      });
    }
  }, [onchainStats, mode, playerExists]);

  // Handle transaction success
  useEffect(() => {
    if (isTxSuccess && pendingChoice !== null) {
      const processResult = async () => {
        await refetchStats();
        setStatus("finished");
        setMessage("✅ Transaction confirmed!");
        setPendingChoice(null);
      };
      processResult();
    }
  }, [isTxSuccess, pendingChoice, refetchStats]);

  // Determine the winner
  const determineWinner = useCallback((player: Choice, computer: Choice): GameResult => {
    if (player === computer) return "tie";
    if (
      (player === 0 && computer === 2) ||
      (player === 1 && computer === 0) ||
      (player === 2 && computer === 1)
    ) {
      return "win";
    }
    return "lose";
  }, []);

  // Play in free mode
  const playFree = useCallback(
    async (playerChoice: Choice) => {
      setStatus("processing");
      setMessage("Playing...");

      // Simulate thinking time
      await new Promise((resolve) => setTimeout(resolve, 500));

      const computerChoice = Math.floor(Math.random() * 3) as Choice;
      const result = determineWinner(playerChoice, computerChoice);

      const messages = {
        win: "🎉 You Win!",
        lose: "😞 You Lose",
        tie: "🤝 It's a Tie!",
      };

      const playResult: PlayResult = {
        playerChoice,
        computerChoice,
        result,
        message: `${CHOICES[playerChoice]} vs ${CHOICES[computerChoice]} • ${messages[result]}`,
      };

      setLastResult(playResult);
      setMessage(messages[result]);

      // Update stats
      setStats((prev) => ({
        wins: result === "win" ? prev.wins + 1 : prev.wins,
        losses: result === "lose" ? prev.losses + 1 : prev.losses,
        ties: result === "tie" ? prev.ties + 1 : prev.ties,
      }));

      setStatus("finished");
    },
    [determineWinner]
  );

  // Play on-chain with smart contract
  const playOnChain = useCallback(
    async (playerChoice: Choice) => {
      if (!isConnected) {
        setMessage("❌ Please connect your wallet first");
        setStatus("idle");
        return;
      }

      if (!playerExists) {
        setMessage("❌ Please create a profile first (coming soon)");
        setStatus("idle");
        return;
      }

      setStatus("processing");
      setMessage("Sending transaction...");
      setPendingChoice(playerChoice);

      try {
        // Generate computer choice locally for display
        const computerChoice = Math.floor(Math.random() * 3) as Choice;
        const result = determineWinner(playerChoice, computerChoice);

        const messages = {
          win: "🎉 You Win!",
          lose: "😞 You Lose",
          tie: "🤝 It's a Tie!",
        };

        const playResult: PlayResult = {
          playerChoice,
          computerChoice,
          result,
          message: `${CHOICES[playerChoice]} vs ${CHOICES[computerChoice]} • ${messages[result]}`,
        };

        setLastResult(playResult);
        setMessage(`${messages[result]} (Confirming...)`);

        // Call smart contract
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'jouer',
          args: [BigInt(playerChoice)],
        });

      } catch (error) {
        console.error("Transaction error:", error);
        setStatus("idle");
        setMessage("❌ Transaction failed");
        setPendingChoice(null);
      }
    },
    [isConnected, playerExists, determineWinner, writeContract]
  );

  // Main play function
  const play = useCallback(
    async (playerChoice: Choice) => {
      if (status === "processing") return;

      setStatus("playing");

      if (mode === "free") {
        await playFree(playerChoice);
      } else {
        await playOnChain(playerChoice);
      }
    },
    [mode, status, playFree, playOnChain]
  );

  // Start a new game
  const startGame = useCallback(() => {
    setStatus("idle");
    setLastResult(null);
    setMessage("");
    setPendingChoice(null);
  }, []);

  // Reset stats (only in free mode)
  const resetStats = useCallback(() => {
    if (mode === "free") {
      setStats({ wins: 0, losses: 0, ties: 0 });
    }
    startGame();
  }, [mode, startGame]);

  // Switch mode
  const switchMode = useCallback((newMode: GameMode) => {
    setMode(newMode);
    setStatus("idle");
    setLastResult(null);
    setMessage("");
    setPendingChoice(null);

    // Reset stats when switching to free mode
    if (newMode === "free") {
      setStats({ wins: 0, losses: 0, ties: 0 });
    }
  }, []);

  return {
    mode,
    status,
    stats,
    lastResult,
    message,
    isConnected,
    playerExists,
    isPending: isWritePending || (status === "processing" && pendingChoice !== null),
    play,
    startGame,
    resetStats,
    switchMode,
    setMode,
  };
}
