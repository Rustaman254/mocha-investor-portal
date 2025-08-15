// lib/config.ts
import { createConfig, http } from 'wagmi';
import { scroll, scrollSepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [scrollSepolia],
  transports: {
      [scrollSepolia.id]: http(),
  },
});