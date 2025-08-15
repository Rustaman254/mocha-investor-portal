"use client"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  TreePine,
  DollarSign,
  BarChart3,
  MapPin,
  Star,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatCard } from "@/components/stat-card"
import { BondDetailsModal } from "@/components/bond-details-modal"
import Header from "@/components/header"
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import Sidebar from "@/components/sidebar"
import vault from "@/app/Abi/MochaTreeRightsABI.json"
import { useAccount, useReadContract, useReadContracts, useWriteContract, usePublicClient } from "wagmi"


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

const client = createThirdwebClient({
  clientId: "e3f84c8714d65ddfb2c6b154bd40f4c3",
});

const bondData = [
    {
      series: "MABB Series B",
      description: "Premium Coffee Trees",
      location: "Embu County, Kenya",
      price: "$100.00",
      apy: "10.00%",
      available: "47/100",
      rating: "4.8",
      term: "5 Years",
      color: "bg-[var(--primary)]",
      farmDetails: {
        farmName: "Embu Premium Estate",
        farmSize: "25 hectares",
        treeCount: "2,500 trees",
        altitude: "1,400-1,600m",
        soilType: "Volcanic red soil",
        certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
        harvestSeason: "October - December",
        expectedYield: "15 tons/year",
      },
    },
    {
      series: "MABB Series C",
      description: "Organic Arabica",
      location: "Nyeri County, Kenya",
      price: "$120.00",
      apy: "10.00%",
      available: "23/50",
      rating: "4.9",
      term: "5 Years",
      color: "bg-green-600",
      farmDetails: {
        farmName: "Nyeri Organic Cooperative",
        farmSize: "18 hectares",
        treeCount: "1,800 trees",
        altitude: "1,500-1,700m",
        soilType: "Rich volcanic loam",
        certifications: ["Organic", "UTZ Certified", "Bird Friendly"],
        harvestSeason: "November - January",
        expectedYield: "12 tons/year",
      },
    },
    {
      series: "MABB Series D",
      description: "High-Altitude Variety",
      location: "Kiambu County, Kenya",
      price: "$150.00",
      apy: "10.00%",
      available: "12/25",
      rating: "4.7",
      term: "5 Years",
      color: "bg-orange-600",
      farmDetails: {
        farmName: "Kiambu Highland Farm",
        farmSize: "12 hectares",
        treeCount: "1,200 trees",
        altitude: "1,600-1,800m",
        soilType: "High-altitude volcanic soil",
        certifications: ["Specialty Coffee", "Direct Trade", "Carbon Neutral"],
        harvestSeason: "December - February",
        expectedYield: "8 tons/year",
      },
    },
  ]

export default function MarketplacePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [selectedBond, setSelectedBond] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const { data: activeFarmIds, isLoading: isLoadingActiveFarmIds, error: activeFarmIdsError } = useReadContract({
    address: MOCHA_TREE_CONTRACT_ADDRESS,
    abi: MOCHA_TREE_CONTRACT_ABI,
    functionName: 'getActiveFarmIds',
    chainId: scrollSepolia.id,
  });

  const farmConfigContracts = activeFarmIds
    ? activeFarmIds.map((farmId) => ({
        address: MOCHA_TREE_CONTRACT_ADDRESS,
        abi: MOCHA_TREE_CONTRACT_ABI,
        functionName: 'getFarmConfig',
        args: [farmId],
        chainId: scrollSepolia.id,
      }))
    : [];

  const contract = getContract({
    client,
    address: MOCHA_TREE_CONTRACT_ADDRESS,
    chain: scrollSepolia,
  });

  const handleRowClick = (bond: any) => {
    setSelectedBond(bond)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <main className={`flex-1 ${sidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300`}>
          <div className="mx-auto px-3">
            <Header />

            <div className="p-3">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[var(--foreground)]">Marketplace</h1>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-[#1C1C1C] border-0 text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                    <Input
                      placeholder="Search bonds..."
                      className="pl-10 w-64 bg-[#1C1C1C] border-0 rounded-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="mb-8"></div>

                <div className="grid grid-cols-4 gap-3">
                  <StatCard
                    title="Available Bonds"
                    value="153"
                    change="+12"
                    changeType="positive"
                    icon={<ShoppingCart className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Total Value"
                    value="$1.2M"
                    change="+8.5%"
                    changeType="positive"
                    icon={<DollarSign className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Avg. Yield"
                    value="10%"
                    change="Fixed"
                    changeType="neutral"
                    icon={<BarChart3 className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Active Farms"
                    value="24"
                    change="+2"
                    changeType="positive"
                    icon={<TreePine className="w-5 h-5" />}
                  />
                </div>

                <div className="bg-[#1C1C1C] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-[var(--foreground)]">Available Bond Series</h2>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-[#1C1C1C] text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors flex items-center gap-2 border-0">
                        <Filter className="w-4 h-4" />
                        Filter by Location
                      </button>
                      <button className="px-4 py-2 bg-[#1C1C1C] text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors border-0">
                        Sort by Yield
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b" style={{ borderColor: "var(--card)" }}>
                          <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                            Bond Series
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">Location</th>
                          <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">Price</th>
                          <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">APY</th>
                          <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                            Available
                          </th>
                          <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">Rating</th>
                          <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">Term</th>
                          <th className="w-32"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {bondData.map((bond, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-[var(--muted)] hover:bg-opacity-50 cursor-pointer transition-colors"
                            style={{ borderColor: "var(--card)" }}
                            onClick={() => handleRowClick(bond)}
                          >
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 ${bond.color} rounded-full flex items-center justify-center`}>
                                  <TreePine className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-medium text-[var(--foreground)]">{bond.series}</div>
                                  <div className="text-sm text-[var(--muted-foreground)]">{bond.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-[var(--muted-foreground)]" />
                                <span className="text-[var(--foreground)]">{bond.location}</span>
                              </div>
                            </td>
                            <td className="p-3 text-[var(--foreground)] font-medium">{bond.price}</td>
                            <td className="p-3 text-green-400 font-medium">{bond.apy}</td>
                            <td className="p-3 text-[var(--foreground)]">{bond.available}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-[var(--foreground)]">{bond.rating}</span>
                              </div>
                            </td>
                            <td className="p-3 text-[var(--muted-foreground)]">{bond.term}</td>
                            <td className="p-3">
                              <button
                                className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[#6b3416] transition-colors border-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Handle buy action
                                }}
                              >
                                Buy Now
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <BondDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} bondData={selectedBond} />
    </div>
  )
}
