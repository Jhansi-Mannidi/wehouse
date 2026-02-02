"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronRight,
  Star,
  TrendingUp,
  TrendingDown,
  Package,
  Plus,
  ArrowUpDown,
  Zap,
  Layers,
  Grid3X3,
  Droplets,
  Mountain,
  Paintbrush,
  TreePine,
  Wrench,
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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

// Material Card Component for grid view
function MaterialCard({
  material,
  onClick,
}: {
  material: CatalogMaterial
  onClick: () => void
}) {
  const preferredBrand = material.brands.find((b) => b.isPreferred)
  const priceChange = Math.random() > 0.5 ? 2.5 : -1.8

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Package className="size-5 text-muted-foreground" />
          </div>
          <Badge variant="outline" className="text-xs">
            {material.code}
          </Badge>
        </div>

        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{material.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {material.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold">
              {formatCurrency(material.avgPrice)}
              <span className="text-xs font-normal text-muted-foreground">
                /{material.defaultUnit}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            {priceChange > 0 ? (
              <TrendingUp className="size-3 text-destructive" />
            ) : (
              <TrendingDown className="size-3 text-green-600" />
            )}
            <span
              className={`text-xs ${priceChange > 0 ? "text-destructive" : "text-green-600"}`}
            >
              {priceChange > 0 ? "+" : ""}{priceChange}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            <span>{preferredBrand?.qualityRating || "-"}</span>
          </div>
          <span>{material.brands.length} brands</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CategoryMaterialsPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.category as string

  const [searchTerm, setSearchTerm] = React.useState("")
  const [subCategory, setSubCategory] = React.useState<string>("all")
  const [sortBy, setSortBy] = React.useState<string>("name")
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid")

  const category = CATALOG_CATEGORIES.find((c) => c.id === categoryId)
  const IconComponent = category ? categoryIcons[category.icon] || Package : Package

  // Get materials for this category (mock - in real app would filter from all materials)
  const categoryMaterials = CATALOG_MATERIALS.filter(
    (m) => m.categoryId === categoryId
  )

  // Filter and sort
  const filteredMaterials = React.useMemo(() => {
    return categoryMaterials
      .filter((material) => {
        const matchesSearch =
          material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.code.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesSubCategory =
          subCategory === "all" || material.subCategoryId === subCategory
        return matchesSearch && matchesSubCategory
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.avgPrice - b.avgPrice
          case "price-desc":
            return b.avgPrice - a.avgPrice
          case "rating":
            const aRating = a.brands.find((br) => br.isPreferred)?.qualityRating || 0
            const bRating = b.brands.find((br) => br.isPreferred)?.qualityRating || 0
            return bRating - aRating
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [categoryMaterials, searchTerm, subCategory, sortBy])

  if (!category) {
    return (
      <DashboardLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="size-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Category Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The category you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push("/procurement/materials")}>
              Back to Materials
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/procurement/materials")}
            className="mb-4 bg-transparent hover:bg-muted"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Categories
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="flex size-14 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${category.color}15`, color: category.color }}
              >
                <IconComponent className="size-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="secondary">{category.materialCount} materials</Badge>
                  <span className="text-sm text-muted-foreground">
                    {category.subCategories.length} sub-categories
                  </span>
                </div>
              </div>
            </div>
            <Button>
              <Plus className="size-4 mr-2" />
              Add Material
            </Button>
          </div>
        </div>

        {/* Sub-category Pills */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={subCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSubCategory("all")}
            className={subCategory !== "all" ? "bg-transparent" : ""}
          >
            All ({category.materialCount})
          </Button>
          {category.subCategories.map((sub) => (
            <Button
              key={sub.id}
              variant={subCategory === sub.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSubCategory(sub.id)}
              className={subCategory !== sub.id ? "bg-transparent" : ""}
            >
              {sub.name} ({sub.materialCount})
            </Button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full md:w-[300px]"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="size-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode !== "grid" ? "bg-transparent" : ""}
              >
                <Grid3X3 className="size-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className={viewMode !== "table" ? "bg-transparent" : ""}
              >
                <LayoutGrid className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredMaterials.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="size-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Materials Found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm
                  ? `No materials matching "${searchTerm}"`
                  : "No materials in this category yet."}
              </p>
              <Button>
                <Plus className="size-4 mr-2" />
                Add First Material
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onClick={() =>
                  router.push(`/procurement/materials/detail/${material.id}`)
                }
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
                    <TableHead>Code</TableHead>
                    <TableHead>Avg. Price</TableHead>
                    <TableHead>Price Range</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Brands</TableHead>
                    <TableHead className="w-[40px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.map((material) => {
                    const preferredBrand = material.brands.find((b) => b.isPreferred)
                    return (
                      <TableRow
                        key={material.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() =>
                          router.push(`/procurement/materials/detail/${material.id}`)
                        }
                      >
                        <TableCell>
                          <span className="font-medium">{material.name}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{material.code}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {formatCurrency(material.avgPrice)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            /{material.defaultUnit}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatCurrency(material.priceRange.min)} -{" "}
                          {formatCurrency(material.priceRange.max)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="size-3 fill-amber-400 text-amber-400" />
                            <span>{preferredBrand?.qualityRating || "-"}</span>
                          </div>
                        </TableCell>
                        <TableCell>{material.brands.length} brands</TableCell>
                        <TableCell>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
