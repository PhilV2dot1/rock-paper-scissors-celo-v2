import sdk from "@farcaster/miniapp-sdk";

// Check if running in Farcaster context
export function isFarcasterContext(): boolean {
  if (typeof window === "undefined") return false;

  // Check for Farcaster SDK availability
  return (
    (window as any).fc !== undefined ||
    (window as any).farcaster !== undefined ||
    document.referrer.includes("warpcast.com")
  );
}

export async function initializeFarcaster(): Promise<boolean> {
  try {
    // ALWAYS call ready() to dismiss splash screen, even if not in Farcaster
    await sdk.actions.ready();
    console.log("Farcaster SDK ready() called successfully");

    // Check if we're actually in Farcaster context
    if (!isFarcasterContext()) {
      console.log("Not in Farcaster context, SDK ready but features disabled");
      return false;
    }

    console.log("Farcaster SDK initialized successfully");
    return true;
  } catch (error) {
    console.error("Failed to initialize Farcaster SDK:", error);
    // Still try to call ready() even on error to dismiss splash
    try {
      await sdk.actions.ready();
    } catch (readyError) {
      console.error("Failed to call ready():", readyError);
    }
    return false;
  }
}

export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
}

export async function getFarcasterUser(): Promise<FarcasterUser | null> {
  if (!isFarcasterContext()) return null;

  try {
    const context = await sdk.context;
    if (!context || !context.user) return null;

    return {
      fid: context.user.fid,
      username: context.user.username || "",
      displayName: context.user.displayName || "",
      pfpUrl: context.user.pfpUrl || "",
    };
  } catch (error) {
    console.error("Failed to get Farcaster user:", error);
    return null;
  }
}

export interface GameStats {
  wins: number;
  losses: number;
  ties: number;
}

export async function shareOnFarcaster(text: string, embeds?: string[]) {
  const embedsParam =
    embeds?.map((e) => `embeds[]=${encodeURIComponent(e)}`).join("&") || "";
  const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}${embedsParam ? "&" + embedsParam : ""}`;

  if (!isFarcasterContext()) {
    // Outside Farcaster, open in new window
    window.open(shareUrl, "_blank");
    return;
  }

  try {
    await sdk.actions.openUrl(shareUrl);
  } catch (error) {
    console.error("Failed to open Farcaster share URL:", error);
    // Fallback: open in new window
    window.open(shareUrl, "_blank");
  }
}

export async function shareGameResult(
  result: "win" | "lose" | "tie",
  stats: GameStats,
  appUrl: string
) {
  const emojis = {
    win: "🎉",
    lose: "😢",
    tie: "🤝",
  };

  const messages = {
    win: "I won!",
    lose: "I lost",
    tie: "Draw!",
  };

  const text = `I just played Rock Paper Scissors on Celo!\n\n${emojis[result]} ${messages[result]}\n\nStats: ${stats.wins}W / ${stats.losses}L / ${stats.ties}T\n\nPlay now:`;

  await shareOnFarcaster(text, [appUrl]);
}
