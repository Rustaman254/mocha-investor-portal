import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { WagmiProvider } from 'wagmi';
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {wagmiConfig} from "@/lib/config";
const queryClient = new QueryClient();

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
             {/* <ThirdwebProvider> */}
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
                    {children}
                </ThemeProvider>
             {/* </ThirdwebProvider> */}
        </QueryClientProvider>
    </WagmiProvider>
  )
}
