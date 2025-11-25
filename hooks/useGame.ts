"use client";

import { useState, useCallback, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from "wagmi";
import { parseEventLogs } from "viem";
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
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);

  // Wagmi hooks
  const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
  const { data: receipt, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash });
  const publicClient = usePublicClient();

  // Get on-chain stats (no profile check needed with new contract)
  const { data: onchainStats, refetch: refetchStats } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'obtenirStats',
    account: address, // Explicitly set account for read simulation
    // No args - obtenirStats uses msg.sender automatically
    query: {
      enabled: isConnected && !!address && mode === "onchain",
      gcTime: 0, // Don't cache
      staleTime: 0, // Always consider stale
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  });

  // Update stats from on-chain data
  useEffect(() => {
    if (mode === "onchain" && onchainStats) {
      // Convert readonly tuple to array for easier access
      const statsArray = Array.from(onchainStats);
      const newStats = {
        wins: Number(statsArray[0] || 0),
        losses: Number(statsArray[1] || 0),
        ties: Number(statsArray[2] || 0),
        currentStreak: Number(statsArray[5] || 0),
        bestStreak: Number(statsArray[6] || 0),
      };
      setStats(newStats);
    }
  }, [onchainStats, mode]);

  // Parse transaction receipt logs for INSTANT results (no polling delay!)
  useEffect(() => {
    if (receipt && pendingChoice !== null && address) {
      try {
        console.log("📝 Parsing transaction receipt logs...", receipt);

        // Parse PartieJouee events from transaction receipt
        const events = parseEventLogs({
          abi: CONTRACT_ABI,
          eventName: ['PartieJouee'],
          logs: receipt.logs,
        });

        console.log("🔍 Parsed events:", events);

        // Find event for current user
        const userEvent = events.find((event: any) =>
          event.args.joueur?.toLowerCase() === address.toLowerCase()
        );

        if (userEvent) {
          console.log("🎮 PartieJouee event found in receipt:", userEvent.args);

          const { choixJoueur, choixOrdinateur, resultat } = userEvent.args;

          // Convert smart contract result string to our GameResult type
          let result: GameResult = "tie";
          const resultStr = (resultat as string)?.toLowerCase() || "";

          if (resultStr.includes("victoire") || resultStr.includes("win")) {
            result = "win";
          } else if (resultStr.includes("defaite") || resultStr.includes("défaite") || resultStr.includes("lose") || resultStr.includes("loss")) {
            result = "lose";
          } else {
            result = "tie";
          }

          const messages = {
            win: "🎉 You Win!",
            lose: "😞 You Lose",
            tie: "🤝 It's a Tie!",
          };

          // Now we have EXACT data from blockchain receipt - INSTANT!
          const playerChoice = Number(choixJoueur) as Choice;
          const computerChoice = Number(choixOrdinateur) as Choice;

          const playResult: PlayResult = {
            playerChoice,
            computerChoice,
            result,
            message: `${CHOICES[playerChoice]} vs ${CHOICES[computerChoice]} • ${messages[result]}`,
          };

          setLastResult(playResult);
          setMessage(messages[result]);

          // Update stats OPTIMISTICALLY (instant update, no refetch needed)
          setStats(prev => ({
            wins: result === "win" ? prev.wins + 1 : prev.wins,
            losses: result === "lose" ? prev.losses + 1 : prev.losses,
            ties: result === "tie" ? prev.ties + 1 : prev.ties,
            currentStreak: result === "win" ? (prev.currentStreak || 0) + 1 : 0,
            bestStreak:
              result === "win" && (prev.currentStreak || 0) + 1 > (prev.bestStreak || 0)
                ? (prev.currentStreak || 0) + 1
                : prev.bestStreak || 0,
          }));

          // Optional: Refetch in background to verify (2 seconds later)
          setTimeout(() => {
            console.log("🔄 Background stats verification refetch");
            refetchStats();
          }, 2000);

          setStatus("finished");
          setPendingChoice(null);
          setIsTransactionInProgress(false);

          console.log("✅ Game result processed INSTANTLY from receipt!");
        } else {
          console.warn("⚠️ No PartieJouee event found in receipt for user");
          // Fallback: just refetch stats
          setMessage("✅ Transaction confirmed");
          setStatus("finished");
          setPendingChoice(null);
          setIsTransactionInProgress(false);
          refetchStats();
        }
      } catch (error) {
        console.error("❌ Error parsing receipt logs:", error);
        setMessage("✅ Transaction confirmed - refresh to see result");
        setStatus("finished");
        setPendingChoice(null);
        setIsTransactionInProgress(false);
        refetchStats();
      }
    }
  }, [receipt, pendingChoice, address, refetchStats]);

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

      // Prevent double transactions
      if (isTransactionInProgress) {
        setMessage("⏳ Please wait for current transaction to complete");
        return;
      }

      setIsTransactionInProgress(true);
      setStatus("processing");
      setMessage("⏳ Sending transaction...");
      setPendingChoice(playerChoice);

      // Clear previous result while waiting
      setLastResult(null);

      try {
        // Call smart contract (profile created automatically if needed)
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'jouer',
          args: [BigInt(playerChoice)],
        });

        // Message will be updated when event is received
        setMessage("⏳ Waiting for confirmation...");

      } catch (error) {
        console.error("Transaction error:", error);
        setStatus("idle");
        setMessage("❌ Transaction failed");
        setPendingChoice(null);
        setIsTransactionInProgress(false);
      }
    },
    [isConnected, writeContract, isTransactionInProgress]
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
    isPending: isWritePending || (status === "processing" && pendingChoice !== null),
    play,
    startGame,
    resetStats,
    switchMode,
    setMode,
  };
}
