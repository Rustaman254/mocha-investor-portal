"use client"
import { X, MapPin, TreePine, Calendar, DollarSign, TrendingUp, Users, Leaf, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface BondDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  bondData: {
    series: string
    description: string
    location: string
    price: string
    apy: string
    available: string
    rating: string
    term: string
    farmDetails: {
      farmName: string
      farmSize: string
      treeCount: string
      altitude: string
      soilType: string
      certifications: string[]
      harvestSeason: string
      expectedYield: string
    }
  }
}

export function BondDetailsModal({ isOpen, onClose, bondData }: BondDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--card)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{bondData.series}</h2>
              <p className="text-sm text-[var(--muted-foreground)]">{bondData.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Bond Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-[var(--background)] border-[var(--border)]">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-[var(--primary)] mx-auto mb-2" />
                <div className="text-lg font-semibold text-[var(--foreground)]">{bondData.price}</div>
                <div className="text-sm text-[var(--muted-foreground)]">Bond Price</div>
              </CardContent>
            </Card>
            <Card className="bg-[var(--background)] border-[var(--border)]">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-lg font-semibold text-green-400">{bondData.apy}</div>
                <div className="text-sm text-[var(--muted-foreground)]">Annual Yield</div>
              </CardContent>
            </Card>
            <Card className="bg-[var(--background)] border-[var(--border)]">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-[var(--primary)] mx-auto mb-2" />
                <div className="text-lg font-semibold text-[var(--foreground)]">{bondData.available}</div>
                <div className="text-sm text-[var(--muted-foreground)]">Available</div>
              </CardContent>
            </Card>
            <Card className="bg-[var(--background)] border-[var(--border)]">
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 text-[var(--primary)] mx-auto mb-2" />
                <div className="text-lg font-semibold text-[var(--foreground)]">{bondData.term}</div>
                <div className="text-sm text-[var(--muted-foreground)]">Term Length</div>
              </CardContent>
            </Card>
          </div>

          {/* Farm Details */}
          <Card className="bg-[var(--background)] border-[var(--border)]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <TreePine className="w-5 h-5 text-[var(--primary)]" />
                Farm Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <div>
                      <div className="text-sm text-[var(--muted-foreground)]">Location</div>
                      <div className="text-[var(--foreground)]">{bondData.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TreePine className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <div>
                      <div className="text-sm text-[var(--muted-foreground)]">Farm Name</div>
                      <div className="text-[var(--foreground)]">{bondData.farmDetails.farmName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <div>
                      <div className="text-sm text-[var(--muted-foreground)]">Farm Size</div>
                      <div className="text-[var(--foreground)]">{bondData.farmDetails.farmSize}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TreePine className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <div>
                      <div className="text-sm text-[var(--muted-foreground)]">Tree Count</div>
                      <div className="text-[var(--foreground)]">{bondData.farmDetails.treeCount}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <div>
                      <div className="text-sm text-[var(--muted-foreground)]">Altitude</div>
                      <div className="text-[var(--foreground)]">{bondData.farmDetails.altitude}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <div>
                      <div className="text-sm text-[var(--muted-foreground)]">Soil Type</div>
                      <div className="text-[var(--foreground)]">{bondData.farmDetails.soilType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <div>
                      <div className="text-sm text-[var(--muted-foreground)]">Harvest Season</div>
                      <div className="text-[var(--foreground)]">{bondData.farmDetails.harvestSeason}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-[var(--muted-foreground)]" />
                    <div>
                      <div className="text-sm text-[var(--muted-foreground)]">Expected Yield</div>
                      <div className="text-[var(--foreground)]">{bondData.farmDetails.expectedYield}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-6">
                <div className="text-sm text-[var(--muted-foreground)] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certifications
                </div>
                <div className="flex flex-wrap gap-2">
                  {bondData.farmDetails.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose} className="border-[var(--border)] bg-transparent">
              Close
            </Button>
            <Button className="bg-[var(--primary)] text-white hover:bg-[#6b3416]">Invest in {bondData.series}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
