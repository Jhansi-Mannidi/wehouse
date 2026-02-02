"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Star,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShoppingCart,
  BarChart3,
  Info,
  ExternalLink,
  Phone,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  CATALOG_MATERIALS,
  CATALOG_CATEGORIES,
  PRICE_HISTORY,
  type CatalogMaterial,
  type MaterialBrand,
} from "@/lib/procurement-types"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value)
}

// Brand Card Component
function BrandCard({
  brand,
  material,
  onSelect,
}: {
  brand: MaterialBrand
  material: CatalogMaterial
  onSelect: () => void
}) {
  return (
    <Card className={`transition-all ${brand.isPreferred ? "border-primary" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Building2 className="size-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{brand.name}</h4>
              <p className="text-xs text-muted-foreground">Grade: {brand.grade}</p>
            </div>
          </div>
          {brand.isPreferred && (
            <Badge className="bg-primary/10 text-primary border-0">Preferred</Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(brand.pricePerUnit)}
              <span className="text-xs font-normal text-muted-foreground">/{brand.unit}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Rating</p>
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{brand.qualityRating}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">MOQ</p>
            <p className="font-medium">{formatNumber(brand.moq)} {brand.unit}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lead Time</p>
            <p className="font-medium">{brand.leadTime} days</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-xs text-muted-foreground">
            Updated: {new Date(brand.lastUpdated).toLocaleDateString("en-IN")}
          </span>
          <Button size="sm" onClick={onSelect}>
            <ShoppingCart className="size-3 mr-1" />
            Select
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Price Comparison Table
function PriceComparisonTable({ brands }: { brands: MaterialBrand[] }) {
  const sortedBrands = [...brands].sort((a, b) => a.pricePerUnit - b.pricePerUnit)
  const lowestPrice = sortedBrands[0]?.pricePerUnit || 0

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Brand</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Price/Unit</TableHead>
          <TableHead>Diff</TableHead>
          <TableHead>MOQ</TableHead>
          <TableHead>Lead Time</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedBrands.map((brand, index) => {
          const priceDiff = ((brand.pricePerUnit - lowestPrice) / lowestPrice) * 100
          return (
            <TableRow key={brand.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{brand.name}</span>
                  {brand.isPreferred && (
                    <Badge variant="outline" className="text-xs">Preferred</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{brand.grade}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(brand.pricePerUnit)}
                <span className="text-xs text-muted-foreground">/{brand.unit}</span>
              </TableCell>
              <TableCell>
                {index === 0 ? (
                  <Badge className="bg-green-100 text-green-700 border-0">Lowest</Badge>
                ) : (
                  <span className="text-destructive">+{priceDiff.toFixed(1)}%</span>
                )}
              </TableCell>
              <TableCell>{formatNumber(brand.moq)}</TableCell>
              <TableCell>{brand.leadTime} days</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  {brand.qualityRating}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Active
                </Badge>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default function MaterialDetailPage() {
  const params = useParams()
  const router = useRouter()
  const materialId = params.id as string

  const material = CATALOG_MATERIALS.find((m) => m.id === materialId)
  const category = material
    ? CATALOG_CATEGORIES.find((c) => c.id === material.categoryId)
    : null
  const priceHistory = PRICE_HISTORY[materialId] || []

  if (!material) {
    return (
      <DashboardLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="size-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Material Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The material you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const preferredBrand = material.brands.find((b) => b.isPreferred)
  const priceChange = priceHistory.length >= 2
    ? ((priceHistory[priceHistory.length - 1].price - priceHistory[priceHistory.length - 2].price) /
        priceHistory[priceHistory.length - 2].price) *
      100
    : 0

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4 bg-transparent hover:bg-muted"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Materials
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="flex size-14 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${category?.color}15`, color: category?.color }}
              >
                <Package className="size-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-foreground">{material.name}</h1>
                  <Badge variant="outline">{material.code}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{material.description}</p>
                <div className="flex items-center gap-3">
                  <Badge
                    style={{
                      backgroundColor: `${category?.color}15`,
                      color: category?.color,
                      border: "none",
                    }}
                  >
                    {category?.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    HSN: {material.hsnCode} | GST: {material.gstRate}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-transparent">
                <BarChart3 className="size-4 mr-2" />
                Analytics
              </Button>
              <Button>
                <ShoppingCart className="size-4 mr-2" />
                Create PO
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Average Price</p>
              <p className="text-2xl font-bold">{formatCurrency(material.avgPrice)}</p>
              <div className="flex items-center gap-1 mt-1">
                {priceChange >= 0 ? (
                  <TrendingUp className="size-3 text-destructive" />
                ) : (
                  <TrendingDown className="size-3 text-green-600" />
                )}
                <span
                  className={`text-xs ${priceChange >= 0 ? "text-destructive" : "text-green-600"}`}
                >
                  {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(1)}% this month
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Price Range</p>
              <p className="text-2xl font-bold">
                {formatCurrency(material.priceRange.min)} - {formatCurrency(material.priceRange.max)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">per {material.defaultUnit}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Monthly Usage</p>
              <p className="text-2xl font-bold">{formatNumber(material.avgMonthlyUsage)}</p>
              <p className="text-xs text-muted-foreground mt-1">{material.defaultUnit} avg/month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Consumed</p>
              <p className="text-2xl font-bold">{formatNumber(material.totalConsumed)}</p>
              <p className="text-xs text-muted-foreground mt-1">{material.defaultUnit} (all time)</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="brands" className="space-y-4">
          <TabsList>
            <TabsTrigger value="brands">Brands & Pricing</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="history">Price History</TabsTrigger>
            <TabsTrigger value="usage">Usage Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="brands" className="space-y-4">
            {/* Brand Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {material.brands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  material={material}
                  onSelect={() => {}}
                />
              ))}
            </div>

            {/* Price Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Comparison</CardTitle>
                <CardDescription>Compare prices across all available brands</CardDescription>
              </CardHeader>
              <CardContent>
                <PriceComparisonTable brands={material.brands} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {material.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <span className="text-sm text-muted-foreground">{spec.name}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {material.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Trend (6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                {priceHistory.length > 0 ? (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceHistory}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString("en-IN", { month: "short" })
                          }
                          className="text-xs"
                        />
                        <YAxis
                          tickFormatter={(value) => `₹${value}`}
                          className="text-xs"
                        />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Price"]}
                          labelFormatter={(label) =>
                            new Date(label).toLocaleDateString("en-IN", {
                              month: "long",
                              year: "numeric",
                            })
                          }
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No price history available
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Projects by Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Villa Serenity - Phase 2", usage: 2500, percent: 85 },
                    { name: "Greenfield Residency", usage: 1800, percent: 65 },
                    { name: "Urban Heights Tower", usage: 1200, percent: 45 },
                    { name: "Palm Grove Villas", usage: 800, percent: 30 },
                  ].map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-muted-foreground">
                          {formatNumber(project.usage)} {material.defaultUnit}
                        </span>
                      </div>
                      <Progress value={project.percent} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Brand Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {material.brands.map((brand, index) => {
                    const percent = Math.floor(Math.random() * 40) + 10
                    return (
                      <div key={brand.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{brand.name}</span>
                          <span className="text-muted-foreground">{percent}%</span>
                        </div>
                        <Progress value={percent} className="h-2" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
