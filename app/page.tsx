"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  TrendingUp,
  ArrowUpDown,
  MoreHorizontal,
  Settings,
  Moon,
  Sun,
  Bell,
  PanelLeftClose,
  DollarSign,
  ShoppingCart,
  PieChart,
  TreePine,
  Leaf,
  MapPin,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StatRectangle } from "@/components/stat-rectangle"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { StatCard } from "@/components/stat-card"

export default function OverviewPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex min-h-screen w-full">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <main className={`flex-1 ${sidebarCollapsed ? "ml-16" : "ml-64"} w-full min-h-screen transition-all duration-300`}>
          <div className="mx-auto px-4 max-w-full">
            <Header />

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-[var(--foreground)]">Overview</h1>
                  <p className="text-xs">MOCHA ASSET-BACKED BONDS</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-64 bg-[var(--card)] border-0 text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                  />
                  <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[var(--muted-foreground)] bg-[var(--secondary)] px-1.5 py-0.5 rounded">
                    ⌘K
                  </kbd>
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
                    title="Available Bonds"
                    value="153"
                    change="+12"
                    changeType="positive"
                    icon={<ShoppingCart className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Available Bonds"
                    value="153"
                    change="+12"
                    changeType="positive"
                    icon={<ShoppingCart className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Available Bonds"
                    value="153"
                    change="+12"
                    changeType="positive"
                    icon={<ShoppingCart className="w-5 h-5" />}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-[#1C1C1C] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                          <span className="text-sm text-[var(--muted-foreground)]">Portfolio Value</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-[var(--foreground)]">Current</span>
                            <span className="text-sm text-[var(--muted-foreground)]">Projected</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-3xl font-bold mb-1 text-[var(--foreground)]">$15,420</div>
                        <div className="text-sm text-[var(--muted-foreground)]">154 MABB Tokens • 10% APY</div>
                      </div>

                      <div className="mb-4">
                        <svg width="100%" height="120" className="mb-3">
                          <polyline
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="2"
                            points="0,90 50,85 100,80 150,75 200,70 250,65 300,60 350,55 400,50 450,45 500,40"
                          />
                        </svg>

                        <div className="flex items-end gap-1 h-8">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className="bg-[var(--primary)] opacity-30 flex-1"
                              style={{ height: `${Math.random() * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                          {["1D", "1W", "1M", "1Y", "Max"].map((period) => (
                            <Button
                              key={period}
                              variant={selectedTimeframe === period ? "default" : "ghost"}
                              size="sm"
                              className={`text-xs border-0 rounded-lg ${
                                selectedTimeframe === period
                                  ? "bg-[var(--primary)] text-white"
                                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                              }`}
                              onClick={() => setSelectedTimeframe(period)}
                            >
                              {period}
                            </Button>
                          ))}
                        </div>
                        <div className="text-right text-xs text-[var(--muted-foreground)]">
                          <div>$20k</div>
                          <div>$15k</div>
                          <div>$10k</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        <Button className="bg-[var(--primary)] text-white hover:bg-[#6b3416] border-0 rounded-lg">
                          Buy Bonds
                        </Button>
                        <Button
                          variant="outline"
                          className="border-0 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] bg-transparent rounded-lg"
                        >
                          View Trees
                        </Button>
                        <Button
                          variant="outline"
                          className="border-0 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] bg-transparent rounded-lg"
                        >
                          Withdraw
                        </Button>
                        <Button
                          variant="outline"
                          className="border-0 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] bg-transparent rounded-lg"
                        >
                          Reports
                        </Button>
                      </div>
                    </div>

                    <div className="bg-[#1C1C1C] rounded-lg">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b" style={{ borderColor: "var(--card)" }}>
                              <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                                Investment
                              </th>
                              <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                                Daily Yield
                              </th>
                              <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                                Balance
                              </th>
                              <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">APY</th>
                              <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                                Status
                              </th>
                              <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                                Start Date
                              </th>
                              <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                                Trees
                              </th>
                              <th className="w-10"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b" style={{ borderColor: "var(--card)" }}>
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center">
                                    <TreePine className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-[var(--foreground)]">MABB Series A</div>
                                    <div className="text-sm text-[var(--muted-foreground)]">Embu County, Kenya</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-green-400">+$4.22</td>
                              <td className="p-3 text-[var(--foreground)]">$15,420.00</td>
                              <td className="p-3 text-green-400">10.00%</td>
                              <td className="p-3">
                                <Badge variant="secondary" className="bg-green-100 text-green-800 border-0">
                                  Active
                                </Badge>
                              </td>
                              <td className="p-3 text-[var(--muted-foreground)]">15.01.2025</td>
                              <td className="p-3">
                                <div className="flex items-center gap-1">
                                  <TreePine className="w-3 h-3 text-[var(--primary)]" />
                                  <span className="text-sm text-[var(--foreground)]">154</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <Button variant="ghost" size="icon" className="w-8 h-8 border-0">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-b" style={{ borderColor: "var(--card)" }}>
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                    <Leaf className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-[var(--foreground)]">Premium Coffee Trees</div>
                                    <div className="text-sm text-[var(--muted-foreground)]">High-yield variety</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-green-400">+$2.74</td>
                              <td className="p-3 text-[var(--foreground)]">$10,000.00</td>
                              <td className="p-3 text-green-400">10.00%</td>
                              <td className="p-3">
                                <Badge variant="secondary" className="bg-green-100 text-green-800 border-0">
                                  Active
                                </Badge>
                              </td>
                              <td className="p-3 text-[var(--muted-foreground)]">20.02.2025</td>
                              <td className="p-3">
                                <div className="flex items-center gap-1">
                                  <TreePine className="w-3 h-3 text-green-600" />
                                  <span className="text-sm text-[var(--foreground)]">100</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <Button variant="ghost" size="icon" className="w-8 h-8 border-0">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#1C1C1C] rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Buy Coffee Bonds</h3>

                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-[var(--muted-foreground)] mb-2 block">Investment Amount</label>
                          <div className="flex items-center justify-between bg-[#1C1C1C] rounded-lg p-3 border-0">
                            <div className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5 text-[var(--primary)]" />
                              <Input
                                type="number"
                                placeholder="100"
                                className="border-0 bg-transparent text-[var(--foreground)] p-0 text-lg font-medium"
                              />
                            </div>
                            <span className="text-sm text-[var(--muted-foreground)]">USD</span>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center">
                            <ArrowUpDown className="w-4 h-4" />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-[var(--muted-foreground)] mb-2 block">You Get</label>
                          <div className="flex items-center justify-between bg-[#1C1C1C] rounded-lg p-3 border-0">
                            <div className="flex items-center gap-3">
                              <TreePine className="w-5 h-5 text-[var(--primary)]" />
                              <span className="font-medium text-[var(--foreground)] text-lg">1</span>
                            </div>
                            <span className="text-sm text-[var(--muted-foreground)]">MABB Token</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-[var(--secondary)] rounded-lg border-0">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-[var(--muted-foreground)]">Annual Yield</span>
                          <span className="text-[var(--foreground)] font-medium">10% Fixed</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-[var(--muted-foreground)]">Term</span>
                          <span className="text-[var(--foreground)]">5 Years</span>
                        </div>
                        <div className="text-xs text-[var(--muted-foreground)]">
                          Secured by <span className="text-[var(--foreground)]">Geo-tagged Coffee Trees</span>
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-[var(--primary)] hover:bg-[#6b3416] text-white border-0 rounded-lg">
                        Purchase Bonds
                      </Button>
                    </div>

                    <div className="bg-[#1C1C1C] rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Your Trees</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-[var(--primary)]" />
                          <div>
                            <div className="text-sm font-medium text-[var(--foreground)]">Embu County</div>
                            <div className="text-xs text-[var(--muted-foreground)]">Kenya</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <TreePine className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="text-sm font-medium text-[var(--foreground)]">154 Trees</div>
                            <div className="text-xs text-[var(--muted-foreground)]">Geo-tagged & Verified</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-0 bg-transparent text-[var(--muted-foreground)] hover:bg-[var(--secondary)] rounded-lg"
                        >
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}