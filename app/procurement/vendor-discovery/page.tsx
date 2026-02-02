"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  Zap,
  Hammer,
  Grid3X3,
  Package,
  Mountain,
  Droplet,
  Paintbrush,
  TreePine,
  Wrench,
  Square,
  Box,
  Truck,
  TrendingUp,
  Search,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MATERIAL_CATEGORIES, type MaterialCategory } from "@/lib/procurement-types"

// Icon mapping
const categoryIcons: Record<string, React.ElementType> = {
  Zap,
  Hammer,
  Grid3X3,
  Package,
  Mountain,
  Droplet,
  Paintbrush,
  TreePine,
  Wrench,
  Square,
  Box,
  Truck,
}

interface CategoryCardProps {
  category: MaterialCategory
  onClick: () => void
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
  const IconComponent = categoryIcons[category.icon] || Package
  
  return (
    <Card
      className="group cursor-pointer p-6 text-center transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 bg-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="mb-4 flex items-center justify-center">
        <div className="rounded-xl bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
          <IconComponent className="size-8 text-primary" />
        </div>
      </div>
      <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">{category.vendorCount} vendors</p>
      {category.newVendors && category.newVendors > 0 && (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700">
          <TrendingUp className="size-3 mr-1" />
          {category.newVendors} new
        </Badge>
      )}
    </Card>
  )
}

export default function VendorDiscoveryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const filteredCategories = MATERIAL_CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const handleCategoryClick = (category: MaterialCategory) => {
    router.push(`/procurement/vendor-discovery/${category.code.toLowerCase()}`)
  }
  
  const totalVendors = MATERIAL_CATEGORIES.reduce((sum, cat) => sum + cat.vendorCount, 0)
  const totalNewVendors = MATERIAL_CATEGORIES.reduce((sum, cat) => sum + (cat.newVendors || 0), 0)
  
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Discovery</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse material categories to discover registered vendors
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-card">
            <p className="text-sm text-muted-foreground">Total Categories</p>
            <p className="text-2xl font-bold text-foreground">{MATERIAL_CATEGORIES.length}</p>
          </Card>
          <Card className="p-4 bg-card">
            <p className="text-sm text-muted-foreground">Total Vendors</p>
            <p className="text-2xl font-bold text-foreground">{totalVendors}</p>
          </Card>
          <Card className="p-4 bg-card">
            <p className="text-sm text-muted-foreground">New This Month</p>
            <p className="text-2xl font-bold text-emerald-600">{totalNewVendors}</p>
          </Card>
          <Card className="p-4 bg-card">
            <p className="text-sm text-muted-foreground">Active Scopes</p>
            <p className="text-2xl font-bold text-primary">12</p>
          </Card>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        
        {/* Category Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Select Material Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Package className="size-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No categories found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
