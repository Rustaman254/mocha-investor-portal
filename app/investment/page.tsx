"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  TreePine,
  Menu,
  DollarSign,
  Activity,
  BarChart3,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { StatRectangle } from "@/components/stat-rectangle"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"

export default function InvestmentPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <main className={`flex-1 ${sidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300`}>
          <div className="mx-auto px-3">
            <Header />

            <div className="p-3">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[var(--foreground)]">My Investments</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <Input
                    placeholder="Search investments..."
                    className="pl-10 w-64 bg-[var(--card)] border-0 text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="mb-8"></div>

                <div className="grid grid-cols-4 gap-3">
                  <StatCard
                    title="Total Invested"
                    value="$25,420"
                    change="+15.2%"
                    changeType="positive"
                    icon={<DollarSign className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Active Bonds"
                    value="254"
                    change="+12"
                    changeType="positive"
                    icon={<Activity className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Monthly Yield"
                    value="$212.50"
                    change="+8.3%"
                    changeType="positive"
                    icon={<BarChart3 className="w-5 h-5" />}
                  />
                  <StatCard
                    title="Total Trees"
                    value="254"
                    change="+12"
                    changeType="positive"
                    icon={<TreePine className="w-5 h-5" />}
                  />
                </div>

                <Card className="bg-[var(--card)] border-0">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[var(--border)]">
                            <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                              Investment
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">Amount</th>
                            <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                              Current Value
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                              Monthly Yield
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">Status</th>
                            <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">
                              Purchase Date
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-[var(--muted-foreground)]">Trees</th>
                            <th className="w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[var(--border)]">
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
                            <td className="p-3 text-[var(--foreground)]">$15,420.00</td>
                            <td className="p-3 text-green-400 font-medium">$17,234.50</td>
                            <td className="p-3 text-green-400">+$128.50</td>
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
                          <tr className="border-b border-[var(--border)]">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                  <TreePine className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-medium text-[var(--foreground)]">MABB Series B</div>
                                  <div className="text-sm text-[var(--muted-foreground)]">Nyeri County, Kenya</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-[var(--foreground)]">$10,000.00</td>
                            <td className="p-3 text-green-400 font-medium">$11,180.00</td>
                            <td className="p-3 text-green-400">+$83.33</td>
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
