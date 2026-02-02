"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  Search,
  Filter,
  ChevronRight,
  Package,
  Star,
  TrendingUp,
  TrendingDown,
  Zap,
  Layers,
  Grid3X3,
  Droplets,
  Mountain,
  Paintbrush,
  TreePine,
  Wrench,
  LayoutGrid,
  Plus,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CATALOG_CATEGORIES,
  CATALOG_MATERIALS,
  type CatalogCategory,
  type CatalogMaterial,
} from "@/lib/procurement-types"

// Icon mapping for categories
const categoryIcons: Record<string, React.ElementType> = {
  Zap: Zap,
  Layers: Layers,
  Package: Package,
  Grid3X3: Grid3X3,
  Droplets: Droplets,
  Mountain: Mountain,
  Paintbrush: Paintbrush,
  TreePine: TreePine,
  Wrench: Wrench,
  LayoutGrid: LayoutGrid,
}

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

// Category Card Component
function CategoryCard({
  category,
  onClick,
}: {
  category: CatalogCategory
  onClick: () => void
}) {
  const IconComponent = categoryIcons[category.icon] || Package

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            <IconComponent className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{category.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {category.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {category.materialCount} materials
              </Badge>
              <span className="text-xs text-muted-foreground">
                {category.subCategories.length} sub-categories
              </span>
            </div>
          </div>
          <ChevronRight className="size-4 text-muted-foreground shrink-0" />
        </div>
      </CardContent>
    </Card>
  )
}

// Material Row Component
function MaterialRow({
  material,
  onClick,
}: {
  material: CatalogMaterial
  onClick: () => void
}) {
  const category = CATALOG_CATEGORIES.find((c) => c.id === material.categoryId)
  const priceChange = Math.random() > 0.5 ? 2.5 : -1.8 // Mock price change
  const isPositive = priceChange > 0

  return (
    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={onClick}>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{material.name}</span>
          <span className="text-xs text-muted-foreground">{material.code}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          style={{
            borderColor: category?.color,
            color: category?.color,
          }}
        >
          {category?.name}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{formatCurrency(material.avgPrice)}</span>
          <span className="text-xs text-muted-foreground">per {material.defaultUnit}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="size-3 text-destructive" />
          ) : (
            <TrendingDown className="size-3 text-green-600" />
          )}
          <span className={isPositive ? "text-destructive" : "text-green-600"}>
            {isPositive ? "+" : ""}{priceChange}%
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span>{material.brands.find((b) => b.isPreferred)?.qualityRating || "-"}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{material.brands.length} brands</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">{formatNumber(material.avgMonthlyUsage)} {material.defaultUnit}/mo</span>
      </TableCell>
      <TableCell>
        <ChevronRight className="size-4 text-muted-foreground" />
      </TableCell>
    </TableRow>
  )
}

export default function MaterialsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [sortBy, setSortBy] = React.useState<string>("name")
  const [viewMode, setViewMode] = React.useState<"categories" | "list">("categories")

  // Filter materials
  const filteredMaterials = React.useMemo(() => {
    return CATALOG_MATERIALS.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory =
        selectedCategory === "all" || material.categoryId === selectedCategory
      return matchesSearch && matchesCategory
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.avgPrice - b.avgPrice
        case "price-desc":
          return b.avgPrice - a.avgPrice
        case "usage":
          return b.avgMonthlyUsage - a.avgMonthlyUsage
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }, [searchTerm, selectedCategory, sortBy])

  // Stats
  const totalMaterials = CATALOG_CATEGORIES.reduce((sum, cat) => sum + cat.materialCount, 0)
  const totalCategories = CATALOG_CATEGORIES.length

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Materials Catalog</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and manage construction materials with brand-wise pricing
            </p>
          </div>
          <Button onClick={() => router.push("/procurement/materials/add")}>
            <Plus className="size-4 mr-2" />
            Add Material
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatNumber(totalMaterials)}</p>
                  <p className="text-xs text-muted-foreground">Total Materials</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Grid3X3 className="size-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCategories}</p>
                  <p className="text-xs text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Star className="size-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Preferred Brands</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
                  <TrendingUp className="size-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-xs text-muted-foreground">Price Updates Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle and Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "categories" | "list")}>
            <TabsList>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="list">All Materials</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-[250px]"
              />
            </div>
            {viewMode === "list" && (
              <>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="size-4 mr-2" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CATALOG_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <ArrowUpDown className="size-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="usage">Monthly Usage</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        {viewMode === "categories" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATALOG_CATEGORIES.filter(
              (cat) =>
                cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cat.description.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => router.push(`/procurement/materials/${category.id}`)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Avg. Price</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Brands</TableHead>
                    <TableHead>Avg. Usage</TableHead>
                    <TableHead className="w-[40px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.map((material) => (
                    <MaterialRow
                      key={material.id}
                      material={material}
                      onClick={() => router.push(`/procurement/materials/detail/${material.id}`)}
                    />
                  ))}
                  {filteredMaterials.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No materials found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
