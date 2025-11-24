import { createConfig, http } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [celo, celoAlfajores],
  connectors: [
    farcasterMiniApp(),
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});
