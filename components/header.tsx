'use client'

import { StatRectangle } from "./stat-rectangle";
import { Button } from "@/components/ui/button"
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ConnectButton, darkTheme, useReadContract, useActiveAccount } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import vault from "@/app/Abi/MochaTreeRightsABI.json"
import { Bell } from "lucide-react"
import { formatUnits } from "ethers";
import { useEffect, useState } from "react";



const client = createThirdwebClient({
  clientId: "e3f84c8714d65ddfb2c6b154bd40f4c3",
});

const MOCHA_TREE_CONTRACT_ADDRESS = "0x4b02Bada976702E83Cf91Cd0B896852099099352" as const;
const MBT_TOKEN_ADDRESS = "0xb75083585DcB841b8B04ffAC89c78a16f2a5598B" as const;
const MOCHA_TREE_CONTRACT_ABI = vault.abi;

const MBT_TOKEN_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    type: "function",
  },
] as const;

// Define Scroll Sepolia chain
const scrollSepolia = defineChain({
  id: 534351,
  name: "Scroll Sepolia",
  rpc: "https://sepolia-rpc.scroll.io/",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Scroll Sepolia Explorer",
      url: "https://sepolia.scrollscan.dev/",
      apiUrl: "https://api-sepolia.scrollscan.dev/api"
    },
  ],
  testnet: true,
});

const wallets = [
  // inAppWallet({
  //   auth: {
  //     options: ["google", "x"],
  //   },
  // }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("app.backpack"),
  createWallet("com.binance.wallet"),
];

const mochaTreeRightsToken = getContract({
  address: MOCHA_TREE_CONTRACT_ADDRESS,
  chain: scrollSepolia,
  client: client,
});

const mbtToken = getContract({
  address: MBT_TOKEN_ADDRESS,
  chain: scrollSepolia,
  client: client,
});

export default function Header() {
  // Get the active account (connected wallet)
  const account = useActiveAccount();

  // Fetch MBT token decimals
  const { data: decimals } = useReadContract({
    contract: mbtToken,
    method: "function decimals() view returns (uint8)",
    params: [],
  });

  // Fetch MBT balance for the connected account
  const { data: balance } = useReadContract({
    contract: mbtToken,
    method: "function balanceOf(address account) view returns (uint256)",
    params: account ? [account.address] : [],
    queryOptions: {
      enabled: !!account, // Only query if account is connected
    },
  });

  // Fetch total active bonds
  const { data: totalBonds } = useReadContract({
    contract: mochaTreeRightsToken,
    method: "function totalActiveBonds() view returns (uint256)",
    params: [],
  });

  // Fetch active farm IDs
  const { data: farmIds } = useReadContract({
    contract: mochaTreeRightsToken,
    method: "function getActiveFarmIds() view returns (uint256[])",
    params: [],
  });

  // State to store cumulative yield
  const [cumulativeYield, setCumulativeYield] = useState("0");

  // Fetch yield distribution for each farm and calculate cumulative yield
  useEffect(() => {
    async function fetchCumulativeYield() {
      if (farmIds && decimals) {
        let totalYield = BigInt(0);
        for (const farmId of farmIds) {
          const { data: yieldData } = await useReadContract({
            contract: mochaTreeRightsToken,
            method: "function getYieldDistribution(uint256 farmId) view returns ((uint256 totalYield, uint256 distributedYield, uint256 pendingYield, uint256 lastDistribution))",
            params: [farmId],
          });
          if (yieldData) {
            totalYield += BigInt(yieldData.totalYield);
          }
        }
        // Format cumulative yield using MBT decimals
        const formattedYield = formatUnits(totalYield, decimals);
        setCumulativeYield(parseFloat(formattedYield).toFixed(2));
      }
    }
    fetchCumulativeYield();
  }, [farmIds, decimals]);

  // Format the balance (convert from wei to human-readable format)
  const formattedBalance = balance && decimals ? formatUnits(balance, decimals) : "0";

  return (
    <header className="flex items-center justify-between py-6 border-0">
        <div className="flex items-center gap-3 text-sm">
            <StatRectangle 
              label="MBT Balance" 
              value={`${parseFloat(formattedBalance).toFixed(2)} MBT`} 
              valueColor="text-green-400" 
            />
            <StatRectangle 
              label="Total Trees Sold" 
              value={totalBonds ? totalBonds.toString() : "Loading..."} 
              valueColor="text-green-400" 
            />
            <StatRectangle 
              label="Cumulative Yield" 
              value={cumulativeYield ? `${cumulativeYield} MBT` : "Loading..."} 
              valueColor="text-[var(--foreground)]" 
            />
        </div>
        <div className="flex items-center gap-3">
            <span className="text-sm pr-2 text-[var(--foreground)]">
                Account: <span className="text-[var(--primary)]">&nbsp;Investor</span>
            </span>
            <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-[var(--muted-foreground)] mx-4 hover:text-[var(--foreground)] relative border-0 bg-white dark:bg-[#1c1c1c] rounded-md"
            >
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--primary)] rounded-full text-xs flex items-center justify-center text-white">
                    2
                </div>
            </Button>
            <ConnectButton
                client={client}
                connectModal={{ size: "compact" }}
                chain={scrollSepolia}
                connectButton={{ label: "Login" }}
                theme={darkTheme({
                    colors: {
                        modalBg: "hsl(0, 0%, 11%)",
                        primaryButtonBg: "hsl(22, 64%, 20%)",
                        primaryButtonText: "hsl(0, 0%, 100%)",
                        borderColor: "hsl(0, 0%, 11%)",
                        secondaryButtonBg: "hsl(0, 0%, 18%)",
                    },
                })}
                wallets={wallets}
                detailsButton={{
                  displayBalanceToken: {
                    [scrollSepolia.id]: "0xb75083585DcB841b8B04ffAC89c78a16f2a5598B"
                  }
                }}
            />
        </div>
    </header>
  );
}