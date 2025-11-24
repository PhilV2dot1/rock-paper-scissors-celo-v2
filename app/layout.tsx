import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Rock Paper Scissors on Celo",
  description:
    "Play Rock Paper Scissors on-chain! Free mode or compete on the blockchain.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Rock Paper Scissors on Celo",
    description: "Play Rock Paper Scissors on-chain! Free or On-Chain mode.",
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: `${baseUrl}/og-image.png`,
      button: {
        title: "Play Rock Paper Scissors",
        action: {
          type: "launch_miniapp",
          name: "Rock Paper Scissors on Celo",
          url: baseUrl,
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
