"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import {
  Star,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  ChevronRight,
  Award,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building2,
  Phone,
  Mail,
  MapPin,
  BarChart3,
  ArrowUpDown,
  Grid3X3,
  List,
  Sparkles,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  IndianRupee,
  Eye,
  MessageSquare,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { useAI } from "@/lib/ai-context"

// Vendor Performance Type
interface VendorPerformance {
  id: string
  name: string
  category: string
  contact: {
    name: string
    phone: string
    email: string
  }
  location: string
  rating: number
  totalOrders: number
  completedOrders: number
  onTimeDelivery: number
  qualityScore: number
  responseTime: number // hours
  totalValue: number
  avgOrderValue: number
  trend: "up" | "down" | "stable"
  status: "excellent" | "good" | "average" | "poor"
  verified: boolean
  lastOrderDate: string
  metrics: {
    month: string
    orders: number
    onTime: number
    quality: number
  }[]
}

// Sample vendors data
const vendorsData: VendorPerformance[] = [
  {
    id: "V001",
    name: "JSW Steel Authorized",
    category: "Steel & Iron",
    contact: { name: "Rajesh Mehta", phone: "9876543210", email: "rajesh@jswdealer.com" },
    location: "Hyderabad",
    rating: 4.9,
    totalOrders: 145,
    completedOrders: 142,
    onTimeDelivery: 96,
    qualityScore: 98,
    responseTime: 2,
    totalValue: 4850000,
    avgOrderValue: 334000,
    trend: "up",
    status: "excellent",
    verified: true,
    lastOrderDate: "2026-01-28",
    metrics: [
      { month: "Oct", orders: 12, onTime: 95, quality: 97 },
      { month: "Nov", orders: 15, onTime: 97, quality: 98 },
      { month: "Dec", orders: 18, onTime: 96, quality: 99 },
      { month: "Jan", orders: 14, onTime: 97, quality: 98 },
    ],
  },
  {
    id: "V002",
    name: "Ultratech Cement Ltd",
    category: "Cement",
    contact: { name: "Suresh Kumar", phone: "9765432109", email: "suresh@ultratech.com" },
    location: "Bangalore",
    rating: 4.7,
    totalOrders: 198,
    completedOrders: 192,
    onTimeDelivery: 94,
    qualityScore: 96,
    responseTime: 3,
    totalValue: 3200000,
    avgOrderValue: 166000,
    trend: "stable",
    status: "excellent",
    verified: true,
    lastOrderDate: "2026-01-27",
    metrics: [
      { month: "Oct", orders: 18, onTime: 93, quality: 95 },
      { month: "Nov", orders: 22, onTime: 94, quality: 96 },
      { month: "Dec", orders: 20, onTime: 95, quality: 97 },
      { month: "Jan", orders: 19, onTime: 94, quality: 96 },
    ],
  },
  {
    id: "V003",
    name: "Havells India Ltd",
    category: "Electrical",
    contact: { name: "Neha Kulkarni", phone: "9654321098", email: "neha@havells.com" },
    location: "Hyderabad",
    rating: 4.8,
    totalOrders: 87,
    completedOrders: 85,
    onTimeDelivery: 92,
    qualityScore: 97,
    responseTime: 4,
    totalValue: 1850000,
    avgOrderValue: 217000,
    trend: "up",
    status: "excellent",
    verified: true,
    lastOrderDate: "2026-01-25",
    metrics: [
      { month: "Oct", orders: 8, onTime: 90, quality: 96 },
      { month: "Nov", orders: 10, onTime: 92, quality: 97 },
      { month: "Dec", orders: 12, onTime: 93, quality: 98 },
      { month: "Jan", orders: 9, onTime: 94, quality: 97 },
    ],
  },
  {
    id: "V004",
    name: "Kajaria Ceramics",
    category: "Tiles & Flooring",
    contact: { name: "Amit Patel", phone: "9543210987", email: "amit@kajaria.com" },
    location: "Pune",
    rating: 4.5,
    totalOrders: 64,
    completedOrders: 60,
    onTimeDelivery: 88,
    qualityScore: 94,
    responseTime: 6,
    totalValue: 2100000,
    avgOrderValue: 350000,
    trend: "down",
    status: "good",
    verified: true,
    lastOrderDate: "2026-01-22",
    metrics: [
      { month: "Oct", orders: 6, onTime: 92, quality: 95 },
      { month: "Nov", orders: 7, onTime: 90, quality: 94 },
      { month: "Dec", orders: 5, onTime: 85, quality: 93 },
      { month: "Jan", orders: 6, onTime: 86, quality: 94 },
    ],
  },
  {
    id: "V005",
    name: "Asian Paints Ltd",
    category: "Paints & Finishes",
    contact: { name: "Priya Sharma", phone: "9432109876", email: "priya@asianpaints.com" },
    location: "Mumbai",
    rating: 4.6,
    totalOrders: 112,
    completedOrders: 108,
    onTimeDelivery: 91,
    qualityScore: 95,
    responseTime: 5,
    totalValue: 1650000,
    avgOrderValue: 153000,
    trend: "stable",
    status: "good",
    verified: true,
    lastOrderDate: "2026-01-26",
    metrics: [
      { month: "Oct", orders: 10, onTime: 90, quality: 94 },
      { month: "Nov", orders: 12, onTime: 91, quality: 95 },
      { month: "Dec", orders: 14, onTime: 92, quality: 96 },
      { month: "Jan", orders: 11, onTime: 91, quality: 95 },
    ],
  },
  {
    id: "V006",
    name: "Metro Plumbing Supplies",
    category: "Plumbing",
    contact: { name: "Vikram Singh", phone: "9321098765", email: "vikram@metroplumb.com" },
    location: "Chennai",
    rating: 4.2,
    totalOrders: 78,
    completedOrders: 72,
    onTimeDelivery: 82,
    qualityScore: 88,
    responseTime: 8,
    totalValue: 980000,
    avgOrderValue: 136000,
    trend: "down",
    status: "average",
    verified: false,
    lastOrderDate: "2026-01-20",
    metrics: [
      { month: "Oct", orders: 8, onTime: 85, quality: 90 },
      { month: "Nov", orders: 7, onTime: 83, quality: 88 },
      { month: "Dec", orders: 6, onTime: 80, quality: 86 },
      { month: "Jan", orders: 5, onTime: 80, quality: 88 },
    ],
  },
  {
    id: "V007",
    name: "Finolex Pipes",
    category: "Plumbing",
    contact: { name: "Anand Mehta", phone: "9210987654", email: "anand@finolex.com" },
    location: "Hyderabad",
    rating: 4.4,
    totalOrders: 56,
    completedOrders: 53,
    onTimeDelivery: 89,
    qualityScore: 92,
    responseTime: 5,
    totalValue: 720000,
    avgOrderValue: 136000,
    trend: "up",
    status: "good",
    verified: true,
    lastOrderDate: "2026-01-24",
    metrics: [
      { month: "Oct", orders: 5, onTime: 88, quality: 91 },
      { month: "Nov", orders: 6, onTime: 89, quality: 92 },
      { month: "Dec", orders: 7, onTime: 90, quality: 93 },
      { month: "Jan", orders: 6, onTime: 90, quality: 92 },
    ],
  },
  {
    id: "V008",
    name: "Century Plyboards",
    category: "Wood & Plywood",
    contact: { name: "Kiran Reddy", phone: "9109876543", email: "kiran@centuryply.com" },
    location: "Bangalore",
    rating: 3.8,
    totalOrders: 42,
    completedOrders: 36,
    onTimeDelivery: 75,
    qualityScore: 82,
    responseTime: 12,
    totalValue: 540000,
    avgOrderValue: 150000,
    trend: "down",
    status: "poor",
    verified: false,
    lastOrderDate: "2026-01-15",
    metrics: [
      { month: "Oct", orders: 5, onTime: 80, quality: 85 },
      { month: "Nov", orders: 4, onTime: 78, quality: 83 },
      { month: "Dec", orders: 3, onTime: 72, quality: 80 },
      { month: "Jan", orders: 4, onTime: 70, quality: 80 },
    ],
  },
]

// Helper functions
const formatCurrency = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`
  return `₹${value.toLocaleString("en-IN")}`
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    case "good": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    case "average": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    case "poor": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    default: return "bg-muted text-muted-foreground"
  }
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-emerald-600 dark:text-emerald-400"
  if (score >= 80) return "text-blue-600 dark:text-blue-400"
  if (score >= 70) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

const getProgressColor = (score: number) => {
  if (score >= 90) return "bg-emerald-500"
  if (score >= 80) return "bg-blue-500"
  if (score >= 70) return "bg-amber-500"
  return "bg-red-500"
}

export default function VendorPerformancePage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { aiEnabled } = useAI()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [selectedVendor, setSelectedVendor] = useState<VendorPerformance | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter and sort vendors
  const filteredVendors = useMemo(() => {
    let filtered = vendorsData.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter
      const matchesStatus = statusFilter === "all" || vendor.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating
        case "orders": return b.totalOrders - a.totalOrders
        case "onTime": return b.onTimeDelivery - a.onTimeDelivery
        case "quality": return b.qualityScore - a.qualityScore
        case "value": return b.totalValue - a.totalValue
        default: return 0
      }
    })

    return filtered
  }, [searchTerm, categoryFilter, statusFilter, sortBy])

  // Summary stats
  const stats = useMemo(() => {
    const total = vendorsData.length
    const excellent = vendorsData.filter(v => v.status === "excellent").length
    const good = vendorsData.filter(v => v.status === "good").length
    const avgOnTime = Math.round(vendorsData.reduce((sum, v) => sum + v.onTimeDelivery, 0) / total)
    const avgQuality = Math.round(vendorsData.reduce((sum, v) => sum + v.qualityScore, 0) / total)
    return { total, excellent, good, avgOnTime, avgQuality }
  }, [])

  const categories = [...new Set(vendorsData.map(v => v.category))]

  // Export handler
  const handleExport = () => {
    const headers = ["Vendor", "Category", "Rating", "Total Orders", "On-Time %", "Quality %", "Total Value", "Status"]
    const csvData = filteredVendors.map(v => [
      v.name, v.category, v.rating, v.totalOrders, v.onTimeDelivery, v.qualityScore, v.totalValue, v.status
    ])
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `vendor_performance_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({ title: "Export Successful", description: "Vendor performance data exported to CSV." })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vendor Performance</h1>
            <p className="text-sm text-muted-foreground">
              Monitor and analyze vendor performance metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Vendors</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Excellent</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.excellent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <ThumbsUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Good</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.good}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Truck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg On-Time</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.avgOnTime}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Quality</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.avgQuality}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        {aiEnabled && (
          <Card className="border-[#f6a404]/30 bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-yellow-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#f6a404] to-amber-500 text-white">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    AI Vendor Insights
                    <Badge className="bg-gradient-to-r from-[#f6a404] to-amber-500 text-white border-0 text-[10px]">AI</Badge>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="size-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Top Performer</span>
                  </div>
                  <p className="text-xs text-muted-foreground">JSW Steel has 96% on-time delivery and 98% quality score. Recommend for steel requirements.</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="size-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Needs Attention</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Century Plyboards showing declining trend. On-time delivery dropped 10% in 3 months.</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="size-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Cost Optimization</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Consider Finolex Pipes for plumbing - improving scores and 15% lower avg order value.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="orders">Total Orders</SelectItem>
                  <SelectItem value="onTime">On-Time %</SelectItem>
                  <SelectItem value="quality">Quality %</SelectItem>
                  <SelectItem value="value">Total Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Mobile Filter */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Filter Vendors</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="orders">Total Orders</SelectItem>
                        <SelectItem value="onTime">On-Time %</SelectItem>
                        <SelectItem value="quality">Quality %</SelectItem>
                        <SelectItem value="value">Total Value</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setIsFilterOpen(false)} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            {/* View Toggle */}
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className={cn("h-8 w-8", viewMode !== "list" && "bg-transparent")}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className={cn("h-8 w-8", viewMode !== "grid" && "bg-transparent")}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredVendors.length} of {vendorsData.length} vendors
        </p>

        {/* Vendor List */}
        {viewMode === "list" ? (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="hidden lg:table-cell text-center">Orders</TableHead>
                  <TableHead className="text-center">On-Time</TableHead>
                  <TableHead className="hidden md:table-cell text-center">Quality</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">Value</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedVendor(vendor)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {vendor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{vendor.name}</p>
                            {vendor.verified && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {vendor.location}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="text-xs">{vendor.category}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{vendor.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-center font-medium">
                      {vendor.totalOrders}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {vendor.trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                        {vendor.trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
                        <span className={cn("font-semibold", getScoreColor(vendor.onTimeDelivery))}>
                          {vendor.onTimeDelivery}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                      <span className={cn("font-semibold", getScoreColor(vendor.qualityScore))}>
                        {vendor.qualityScore}%
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right font-medium">
                      {formatCurrency(vendor.totalValue)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("capitalize", getStatusColor(vendor.status))}>
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedVendor(vendor)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {vendor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-foreground">{vendor.name}</p>
                          {vendor.verified && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{vendor.category}</p>
                      </div>
                    </div>
                    <Badge className={cn("capitalize", getStatusColor(vendor.status))}>
                      {vendor.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{vendor.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {vendor.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">On-Time Delivery</p>
                      <div className="flex items-center gap-2">
                        <Progress value={vendor.onTimeDelivery} className="h-2 flex-1" />
                        <span className={cn("text-sm font-semibold", getScoreColor(vendor.onTimeDelivery))}>
                          {vendor.onTimeDelivery}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Quality Score</p>
                      <div className="flex items-center gap-2">
                        <Progress value={vendor.qualityScore} className="h-2 flex-1" />
                        <span className={cn("text-sm font-semibold", getScoreColor(vendor.qualityScore))}>
                          {vendor.qualityScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Orders: </span>
                      <span className="font-semibold">{vendor.totalOrders}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Value: </span>
                      <span className="font-semibold">{formatCurrency(vendor.totalValue)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Vendor Detail Dialog */}
        <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedVendor && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                        {selectedVendor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="flex items-center gap-2">
                        {selectedVendor.name}
                        {selectedVendor.verified && (
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        )}
                      </DialogTitle>
                      <DialogDescription className="flex items-center gap-2">
                        <Badge variant="outline">{selectedVendor.category}</Badge>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedVendor.location}
                        </span>
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Performance Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="text-2xl font-bold">{selectedVendor.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className={cn("text-2xl font-bold", getScoreColor(selectedVendor.onTimeDelivery))}>
                        {selectedVendor.onTimeDelivery}%
                      </p>
                      <p className="text-xs text-muted-foreground">On-Time</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className={cn("text-2xl font-bold", getScoreColor(selectedVendor.qualityScore))}>
                        {selectedVendor.qualityScore}%
                      </p>
                      <p className="text-xs text-muted-foreground">Quality</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">{selectedVendor.responseTime}h</p>
                      <p className="text-xs text-muted-foreground">Resp. Time</p>
                    </div>
                  </div>

                  {/* Order Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                        <p className="text-2xl font-bold">{selectedVendor.totalOrders}</p>
                        <p className="text-xs text-emerald-600">{selectedVendor.completedOrders} completed</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                        <p className="text-2xl font-bold">{formatCurrency(selectedVendor.totalValue)}</p>
                        <p className="text-xs text-muted-foreground">Avg: {formatCurrency(selectedVendor.avgOrderValue)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedVendor.contact.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedVendor.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedVendor.contact.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Trend */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Monthly Performance Trend</h4>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead className="text-center">Orders</TableHead>
                            <TableHead className="text-center">On-Time %</TableHead>
                            <TableHead className="text-center">Quality %</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedVendor.metrics.map((m) => (
                            <TableRow key={m.month}>
                              <TableCell className="font-medium">{m.month}</TableCell>
                              <TableCell className="text-center">{m.orders}</TableCell>
                              <TableCell className="text-center">
                                <span className={getScoreColor(m.onTime)}>{m.onTime}%</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className={getScoreColor(m.quality)}>{m.quality}%</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Orders
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
