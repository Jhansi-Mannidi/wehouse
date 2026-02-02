"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import {
  ShoppingCart,
  Search,
  Filter,
  Download,
  Plus,
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Building2,
  MapPin,
  Calendar,
  IndianRupee,
  FileText,
  Eye,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  ArrowUpDown,
  Grid3X3,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { useAI } from "@/lib/ai-context"
import { useRole } from "@/lib/role-context"

// Purchase Order type
interface PurchaseOrder {
  id: string
  poNumber: string
  vendor: {
    name: string
    contact: string
    phone: string
  }
  project: {
    name: string
    id: string
    city: string
    area: string
  }
  materials: {
    name: string
    category: string
    quantity: number
    unit: string
    unitPrice: number
    totalPrice: number
  }[]
  totalAmount: number
  status: "draft" | "pending" | "approved" | "ordered" | "shipped" | "delivered" | "cancelled"
  createdDate: string
  expectedDelivery: string
  actualDelivery?: string
  paymentStatus: "pending" | "partial" | "paid"
  paidAmount: number
  notes?: string
}

// Sample purchase orders data
const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-001",
    poNumber: "PO-2026-0001",
    vendor: {
      name: "Ultratech Cement Ltd",
      contact: "Rajesh Kumar",
      phone: "+91 98765 43210",
    },
    project: {
      name: "Sunrise Apartments",
      id: "SA-003",
      city: "Bangalore",
      area: "Whitefield",
    },
    materials: [
      { name: "OPC 53 Grade Cement", category: "Cement", quantity: 500, unit: "bags", unitPrice: 380, totalPrice: 190000 },
      { name: "PPC Cement", category: "Cement", quantity: 300, unit: "bags", unitPrice: 360, totalPrice: 108000 },
    ],
    totalAmount: 298000,
    status: "delivered",
    createdDate: "2026-01-05",
    expectedDelivery: "2026-01-12",
    actualDelivery: "2026-01-11",
    paymentStatus: "paid",
    paidAmount: 298000,
  },
  {
    id: "PO-002",
    poNumber: "PO-2026-0002",
    vendor: {
      name: "JSW Steel Industries",
      contact: "Priya Sharma",
      phone: "+91 87654 32109",
    },
    project: {
      name: "Green Valley Villas",
      id: "GVV-002",
      city: "Hyderabad",
      area: "Gachibowli",
    },
    materials: [
      { name: "TMT Bars 12mm", category: "Iron/Steel", quantity: 10, unit: "tons", unitPrice: 58000, totalPrice: 580000 },
      { name: "TMT Bars 16mm", category: "Iron/Steel", quantity: 8, unit: "tons", unitPrice: 59000, totalPrice: 472000 },
      { name: "Binding Wire", category: "Iron/Steel", quantity: 500, unit: "kg", unitPrice: 65, totalPrice: 32500 },
    ],
    totalAmount: 1084500,
    status: "shipped",
    createdDate: "2026-01-15",
    expectedDelivery: "2026-01-25",
    paymentStatus: "partial",
    paidAmount: 542250,
  },
  {
    id: "PO-003",
    poNumber: "PO-2026-0003",
    vendor: {
      name: "Kajaria Ceramics",
      contact: "Amit Patel",
      phone: "+91 76543 21098",
    },
    project: {
      name: "Royal Enclave",
      id: "RE-005",
      city: "Hyderabad",
      area: "Jubilee Hills",
    },
    materials: [
      { name: "Vitrified Floor Tiles 2x2", category: "Tiles", quantity: 2000, unit: "sqft", unitPrice: 85, totalPrice: 170000 },
      { name: "Wall Tiles 1x2", category: "Tiles", quantity: 1500, unit: "sqft", unitPrice: 65, totalPrice: 97500 },
      { name: "Bathroom Tiles Anti-skid", category: "Tiles", quantity: 800, unit: "sqft", unitPrice: 95, totalPrice: 76000 },
    ],
    totalAmount: 343500,
    status: "ordered",
    createdDate: "2026-01-18",
    expectedDelivery: "2026-02-05",
    paymentStatus: "pending",
    paidAmount: 0,
  },
  {
    id: "PO-004",
    poNumber: "PO-2026-0004",
    vendor: {
      name: "Asian Paints Ltd",
      contact: "Sunita Reddy",
      phone: "+91 65432 10987",
    },
    project: {
      name: "Harmony Gardens",
      id: "HG-007",
      city: "Pune",
      area: "Kothrud",
    },
    materials: [
      { name: "Apex Exterior Emulsion", category: "Paints", quantity: 200, unit: "liters", unitPrice: 450, totalPrice: 90000 },
      { name: "Royale Interior Emulsion", category: "Paints", quantity: 300, unit: "liters", unitPrice: 380, totalPrice: 114000 },
      { name: "Primer", category: "Paints", quantity: 150, unit: "liters", unitPrice: 220, totalPrice: 33000 },
      { name: "Putty", category: "Paints", quantity: 500, unit: "kg", unitPrice: 42, totalPrice: 21000 },
    ],
    totalAmount: 258000,
    status: "approved",
    createdDate: "2026-01-20",
    expectedDelivery: "2026-02-01",
    paymentStatus: "pending",
    paidAmount: 0,
  },
  {
    id: "PO-005",
    poNumber: "PO-2026-0005",
    vendor: {
      name: "Hindware Sanitaryware",
      contact: "Vikram Singh",
      phone: "+91 54321 09876",
    },
    project: {
      name: "Lakshmi Residency",
      id: "LR-001",
      city: "Hyderabad",
      area: "Madhapur",
    },
    materials: [
      { name: "EWC Toilet Set", category: "Sanitaryware", quantity: 24, unit: "sets", unitPrice: 8500, totalPrice: 204000 },
      { name: "Wash Basin", category: "Sanitaryware", quantity: 24, unit: "pcs", unitPrice: 3200, totalPrice: 76800 },
      { name: "CP Fittings Set", category: "Sanitaryware", quantity: 24, unit: "sets", unitPrice: 4500, totalPrice: 108000 },
    ],
    totalAmount: 388800,
    status: "pending",
    createdDate: "2026-01-22",
    expectedDelivery: "2026-02-10",
    paymentStatus: "pending",
    paidAmount: 0,
  },
  {
    id: "PO-006",
    poNumber: "PO-2026-0006",
    vendor: {
      name: "Havells India Ltd",
      contact: "Neha Kulkarni",
      phone: "+91 43210 98765",
    },
    project: {
      name: "Skyline Plaza",
      id: "SP-008",
      city: "Hyderabad",
      area: "Kondapur",
    },
    materials: [
      { name: "MCB Box 8 Way", category: "Electrical", quantity: 50, unit: "pcs", unitPrice: 1200, totalPrice: 60000 },
      { name: "Copper Wire 4 sqmm", category: "Electrical", quantity: 5000, unit: "meters", unitPrice: 85, totalPrice: 425000 },
      { name: "Switches & Sockets Set", category: "Electrical", quantity: 200, unit: "sets", unitPrice: 450, totalPrice: 90000 },
    ],
    totalAmount: 575000,
    status: "delivered",
    createdDate: "2026-01-10",
    expectedDelivery: "2026-01-20",
    actualDelivery: "2026-01-19",
    paymentStatus: "paid",
    paidAmount: 575000,
  },
  {
    id: "PO-007",
    poNumber: "PO-2026-0007",
    vendor: {
      name: "Finolex Pipes",
      contact: "Anand Mehta",
      phone: "+91 32109 87654",
    },
    project: {
      name: "Marina Heights",
      id: "MH-004",
      city: "Chennai",
      area: "OMR",
    },
    materials: [
      { name: "CPVC Pipes 1 inch", category: "Plumbing", quantity: 500, unit: "meters", unitPrice: 120, totalPrice: 60000 },
      { name: "PVC Pipes 4 inch", category: "Plumbing", quantity: 300, unit: "meters", unitPrice: 180, totalPrice: 54000 },
      { name: "Pipe Fittings Assorted", category: "Plumbing", quantity: 1, unit: "lot", unitPrice: 45000, totalPrice: 45000 },
    ],
    totalAmount: 159000,
    status: "shipped",
    createdDate: "2026-01-17",
    expectedDelivery: "2026-01-27",
    paymentStatus: "partial",
    paidAmount: 79500,
  },
  {
    id: "PO-008",
    poNumber: "PO-2026-0008",
    vendor: {
      name: "Century Plyboards",
      contact: "Suresh Agarwal",
      phone: "+91 21098 76543",
    },
    project: {
      name: "Ocean View Towers",
      id: "OVT-006",
      city: "Mumbai",
      area: "Bandra",
    },
    materials: [
      { name: "BWR Plywood 18mm", category: "Wood", quantity: 200, unit: "sheets", unitPrice: 1800, totalPrice: 360000 },
      { name: "MR Plywood 12mm", category: "Wood", quantity: 150, unit: "sheets", unitPrice: 1200, totalPrice: 180000 },
      { name: "Block Board 19mm", category: "Wood", quantity: 100, unit: "sheets", unitPrice: 1500, totalPrice: 150000 },
    ],
    totalAmount: 690000,
    status: "draft",
    createdDate: "2026-01-25",
    expectedDelivery: "2026-02-15",
    paymentStatus: "pending",
    paidAmount: 0,
  },
]

// Status configuration
const statusConfig = {
  draft: { label: "Draft", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", icon: FileText },
  pending: { label: "Pending Approval", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  approved: { label: "Approved", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: CheckCircle2 },
  ordered: { label: "Ordered", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", icon: ShoppingCart },
  shipped: { label: "Shipped", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400", icon: Truck },
  delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
}

const paymentStatusConfig = {
  pending: { label: "Unpaid", color: "text-red-600 dark:text-red-400" },
  partial: { label: "Partial", color: "text-amber-600 dark:text-amber-400" },
  paid: { label: "Paid", color: "text-emerald-600 dark:text-emerald-400" },
}

// Format currency
function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

// AI Insights for Procurement
function ProcurementAIInsights({ className }: { className?: string }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const insights = [
    {
      id: "1",
      type: "prediction" as const,
      title: "Cost Optimization Opportunity",
      description: "Bulk ordering cement across 3 projects can save ₹1.2L. Ultratech offering 8% discount for orders above 1000 bags.",
      value: "₹1.2L",
      change: -8,
      confidence: 94,
      action: "View bulk order",
    },
    {
      id: "2",
      type: "alert" as const,
      title: "Delivery Delay Risk",
      description: "PO-2026-0003 (Kajaria Tiles) may face 4-day delay due to transport strike in Morbi. Consider alternate supplier.",
      confidence: 82,
      action: "View alternatives",
    },
    {
      id: "3",
      type: "recommendation" as const,
      title: "Payment Schedule",
      description: "Clearing ₹5.4L dues to JSW Steel by Jan 30 will unlock 2% early payment discount on next order.",
      value: "₹10.8K",
      confidence: 100,
      action: "Schedule payment",
    },
    {
      id: "4",
      type: "trend" as const,
      title: "Steel Price Forecast",
      description: "TMT bar prices expected to rise 5-7% in Feb due to global demand. Consider advancing steel orders.",
      change: 6,
      confidence: 76,
      action: "View market trends",
    },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction": return <TrendingUp className="size-4" />
      case "alert": return <AlertTriangle className="size-4" />
      case "recommendation": return <Sparkles className="size-4" />
      case "trend": return <TrendingDown className="size-4" />
      default: return <Sparkles className="size-4" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "prediction": return "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
      case "alert": return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
      case "recommendation": return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
      case "trend": return "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800"
      default: return "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700"
    }
  }

  return (
    <Card className={cn("border-[#f6a404]/30 bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#f6a404] text-white">
              <Sparkles className="size-4" />
            </div>
            <CardTitle className="text-base font-semibold">AI Procurement Insights</CardTitle>
            <Badge variant="secondary" className="bg-[#f6a404]/10 text-[#f6a404] border-[#f6a404]/20 text-[10px] font-medium">
              AI Powered
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 bg-transparent"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("size-4 text-muted-foreground", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              "relative rounded-lg border p-3 transition-all hover:shadow-sm cursor-pointer",
              getInsightColor(insight.type)
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">{insight.title}</p>
                  {insight.confidence && (
                    <span className="text-[10px] opacity-70">{insight.confidence}% confidence</span>
                  )}
                </div>
                <p className="text-xs opacity-80 leading-relaxed">{insight.description}</p>
                {insight.value && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold">{insight.value}</span>
                    {insight.change !== undefined && (
                      <span className={cn(
                        "text-xs font-medium flex items-center gap-0.5",
                        insight.change >= 0 ? "text-red-600" : "text-emerald-600"
                      )}>
                        {insight.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        {insight.change >= 0 ? "+" : ""}{insight.change}%
                      </span>
                    )}
                  </div>
                )}
                {insight.action && (
                  <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-xs font-medium">
                    {insight.action}
                    <ChevronRight className="size-3 ml-0.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Procurement Manager's assigned location (simulated)
const PROCUREMENT_MANAGER_LOCATION = "Hyderabad"

export default function PurchaseOrdersPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { aiEnabled } = useAI()
  const { selectedRole } = useRole()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all") // For Super Admin - city filter
  const [areaFilter, setAreaFilter] = useState("all") // For Procurement Manager - branch/area filter
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [sortBy, setSortBy] = useState("date")

  const isSuperAdmin = selectedRole === "super_admin"
  const isProcurementManager = selectedRole === "procurement_manager"

  // Get unique projects, categories, cities, and areas
  const projects = useMemo(() => {
    const unique = new Set(purchaseOrders.map(po => po.project.name))
    return Array.from(unique)
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(purchaseOrders.flatMap(po => po.materials.map(m => m.category)))
    return Array.from(unique)
  }, [])

  // Get unique cities (for Super Admin)
  const cities = useMemo(() => {
    const unique = new Set(purchaseOrders.map(po => po.project.city))
    return Array.from(unique).sort()
  }, [])

  // Get unique areas within the procurement manager's city
  const areas = useMemo(() => {
    const ordersInLocation = purchaseOrders.filter(po => po.project.city === PROCUREMENT_MANAGER_LOCATION)
    const unique = new Set(ordersInLocation.map(po => po.project.area))
    return Array.from(unique).sort()
  }, [])

  // Filter orders
  const filteredOrders = useMemo(() => {
    let filtered = [...purchaseOrders]

    // For Procurement Manager, filter by their assigned location first
    if (isProcurementManager) {
      filtered = filtered.filter(po => po.project.city === PROCUREMENT_MANAGER_LOCATION)
    }

    // For Super Admin, apply location filter if selected
    if (isSuperAdmin && locationFilter !== "all") {
      filtered = filtered.filter(po => po.project.city === locationFilter)
    }

    // For Procurement Manager, apply area/branch filter if selected
    if (isProcurementManager && areaFilter !== "all") {
      filtered = filtered.filter(po => po.project.area === areaFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        po =>
          po.poNumber.toLowerCase().includes(query) ||
          po.vendor.name.toLowerCase().includes(query) ||
          po.project.name.toLowerCase().includes(query) ||
          po.materials.some(m => m.name.toLowerCase().includes(query))
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(po => po.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(po => po.materials.some(m => m.category === categoryFilter))
    }

    if (projectFilter !== "all") {
      filtered = filtered.filter(po => po.project.name === projectFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        case "amount":
          return b.totalAmount - a.totalAmount
        case "vendor":
          return a.vendor.name.localeCompare(b.vendor.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, statusFilter, categoryFilter, projectFilter, sortBy, locationFilter, areaFilter, isSuperAdmin, isProcurementManager])

  // Summary stats
  const stats = useMemo(() => {
    const total = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0)
    const paid = purchaseOrders.reduce((sum, po) => sum + po.paidAmount, 0)
    const pending = total - paid
    const delivered = purchaseOrders.filter(po => po.status === "delivered").length
    const inTransit = purchaseOrders.filter(po => ["shipped", "ordered"].includes(po.status)).length
    const pendingApproval = purchaseOrders.filter(po => ["draft", "pending", "approved"].includes(po.status)).length

    return { total, paid, pending, delivered, inTransit, pendingApproval }
  }, [])

  // Export function
  const handleExport = () => {
    const headers = ["PO Number", "Vendor", "Project", "City", "Materials", "Total Amount", "Status", "Created Date", "Expected Delivery", "Payment Status", "Paid Amount"]
    const csvData = filteredOrders.map(po => [
      po.poNumber,
      po.vendor.name,
      po.project.name,
      po.project.city,
      po.materials.map(m => m.name).join("; "),
      po.totalAmount,
      po.status,
      po.createdDate,
      po.expectedDelivery,
      po.paymentStatus,
      po.paidAmount
    ])
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `purchase_orders_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Export Successful",
      description: "Purchase orders have been exported to CSV file.",
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setCategoryFilter("all")
    setProjectFilter("all")
    setLocationFilter("all")
    setAreaFilter("all")
  }

  const activeFilters = [statusFilter, categoryFilter, projectFilter, locationFilter, areaFilter].filter(f => f !== "all").length

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Purchase Orders</h1>
            <p className="text-sm text-muted-foreground">
              Manage material purchase orders across all projects
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" className="gap-2 bg-[hsl(var(--hover-bg))] text-foreground">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Order</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Orders Value</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(stats.total)}</p>
              <p className="text-xs text-muted-foreground mt-1">{purchaseOrders.length} orders</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Amount Paid</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(stats.paid)}</p>
              <Progress value={(stats.paid / stats.total) * 100} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Payment Pending</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(stats.pending)}</p>
              <p className="text-xs text-muted-foreground mt-1">Due amount</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <p className="text-xs text-muted-foreground">Delivered</p>
              </div>
              <p className="text-xl font-bold text-foreground mt-1">{stats.delivered}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-cyan-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-cyan-500" />
                <p className="text-xs text-muted-foreground">In Transit</p>
              </div>
              <p className="text-xl font-bold text-foreground mt-1">{stats.inTransit}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <p className="text-xl font-bold text-foreground mt-1">{stats.pendingApproval}</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        {aiEnabled && (
          <ProcurementAIInsights />
        )}

        {/* Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search PO number, vendor, project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="ordered">Ordered</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map(proj => (
                    <SelectItem key={proj} value={proj}>{proj}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location filter for Super Admin */}
              {isSuperAdmin && (
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Area/Branch filter for Procurement Manager */}
              {isProcurementManager && (
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {activeFilters > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="bg-transparent text-muted-foreground">
                  Clear filters
                </Button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilters > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFilters}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh]">
                <SheetHeader>
                  <SheetTitle>Filter Orders</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="ordered">Ordered</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    <label className="text-sm font-medium mb-2 block">Project</label>
                    <Select value={projectFilter} onValueChange={setProjectFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Projects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        {projects.map(proj => (
                          <SelectItem key={proj} value={proj}>{proj}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={clearFilters}>
                      Clear All
                    </Button>
                    <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* View Mode & Sort */}
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden md:flex border rounded-lg">
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-r-none bg-transparent"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-l-none bg-transparent"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {purchaseOrders.length} orders
          </p>
        </div>

        {/* Orders List/Grid */}
        {viewMode === "list" ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Details</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Materials</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusConfig[order.status].icon
                    return (
                      <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{order.poNumber}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <Calendar className="h-3 w-3" />
                              {order.createdDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{order.vendor.name}</p>
                            <p className="text-xs text-muted-foreground">{order.vendor.contact}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{order.project.name}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {order.project.city}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <p className="text-sm truncate">{order.materials[0].name}</p>
                            {order.materials.length > 1 && (
                              <p className="text-xs text-muted-foreground">+{order.materials.length - 1} more items</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <p className="font-semibold text-foreground">{formatCurrency(order.totalAmount)}</p>
                          {order.paidAmount > 0 && order.paidAmount < order.totalAmount && (
                            <p className="text-xs text-muted-foreground">
                              Paid: {formatCurrency(order.paidAmount)}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("gap-1", statusConfig[order.status].color)}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[order.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={cn("text-sm font-medium", paymentStatusConfig[order.paymentStatus].color)}>
                            {paymentStatusConfig[order.paymentStatus].label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 bg-transparent">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon
                return (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-foreground">{order.poNumber}</p>
                          <p className="text-xs text-muted-foreground">{order.createdDate}</p>
                        </div>
                        <Badge className={cn("gap-1", statusConfig[order.status].color)}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[order.status].label}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{order.vendor.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{order.project.name} - {order.project.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="h-4 w-4" />
                          <span>{order.materials.length} material(s)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <p className="text-lg font-bold text-foreground">{formatCurrency(order.totalAmount)}</p>
                          <span className={cn("text-xs font-medium", paymentStatusConfig[order.paymentStatus].color)}>
                            {paymentStatusConfig[order.paymentStatus].label}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 bg-transparent">
                          View
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon
              return (
                <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{order.poNumber}</CardTitle>
                        <p className="text-xs text-muted-foreground">{order.createdDate}</p>
                      </div>
                      <Badge className={cn("gap-1", statusConfig[order.status].color)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[order.status].label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium truncate">{order.vendor.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{order.project.name}</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-xs text-muted-foreground mb-1">Materials</p>
                      <p className="text-sm font-medium truncate">{order.materials[0].name}</p>
                      {order.materials.length > 1 && (
                        <p className="text-xs text-muted-foreground">+{order.materials.length - 1} more</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <p className="text-lg font-bold text-foreground">{formatCurrency(order.totalAmount)}</p>
                        <span className={cn("text-xs font-medium", paymentStatusConfig[order.paymentStatus].color)}>
                          {paymentStatusConfig[order.paymentStatus].label}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
