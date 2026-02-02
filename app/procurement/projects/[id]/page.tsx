"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Users,
  Phone,
  IndianRupee,
  Package,
  Truck,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  SortAsc,
  X,
  FileText,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/role-context"

// Mock Project Details
const projectsData: Record<string, {
  id: string
  name: string
  code: string
  city: string
  address: string
  totalBudget: number
  budgetSpent: number
  budgetRemaining: number
  utilizationPercent: number
  projectManager: string
  pmPhone: string
  pmEmail: string
  status: "active" | "at-risk" | "over-budget" | "completed"
  startDate: string
  expectedEndDate: string
  materials: Material[]
}> = {
  "PRJ-HYD-2026-001": {
    id: "PRJ-HYD-2026-001",
    name: "Lakshmi Residency - G+2",
    code: "LR-001",
    city: "Hyderabad",
    address: "Plot 42, Gachibowli, Hyderabad - 500032",
    totalBudget: 5000000,
    budgetSpent: 3200000,
    budgetRemaining: 1800000,
    utilizationPercent: 64,
    projectManager: "Rajesh Kumar",
    pmPhone: "+91 98765 43210",
    pmEmail: "rajesh.kumar@wehouse.com",
    status: "active",
    startDate: "2025-06-15",
    expectedEndDate: "2026-03-20",
    materials: [
      { id: "MAT-001", category: "Steel", name: "TMT Steel Bars - Fe500D", requiredQty: 15000, unit: "KG", allocatedBudget: 1200000, spentBudget: 820000, expectedDelivery: "2025-02-15", deliveryAddress: "Site - Gachibowli", projectManager: "Rajesh Kumar", status: "in-progress" },
      { id: "MAT-002", category: "Cement", name: "OPC 53 Grade Cement", requiredQty: 500, unit: "Bags", allocatedBudget: 300000, spentBudget: 280000, expectedDelivery: "2025-02-10", deliveryAddress: "Site - Gachibowli", projectManager: "Rajesh Kumar", status: "delivered" },
      { id: "MAT-003", category: "Electrical", name: "Copper Wiring (1.5mm)", requiredQty: 2000, unit: "Meters", allocatedBudget: 180000, spentBudget: 0, expectedDelivery: "2025-03-01", deliveryAddress: "Site - Gachibowli", projectManager: "Rajesh Kumar", status: "pending" },
      { id: "MAT-004", category: "Plumbing", name: "CPVC Pipes - 1 inch", requiredQty: 800, unit: "Meters", allocatedBudget: 120000, spentBudget: 95000, expectedDelivery: "2025-02-20", deliveryAddress: "Site - Gachibowli", projectManager: "Rajesh Kumar", status: "in-progress" },
      { id: "MAT-005", category: "Tiles", name: "Vitrified Floor Tiles (2x2)", requiredQty: 1500, unit: "Sqft", allocatedBudget: 450000, spentBudget: 0, expectedDelivery: "2025-04-01", deliveryAddress: "Site - Gachibowli", projectManager: "Rajesh Kumar", status: "pending" },
      { id: "MAT-006", category: "Sand", name: "M-Sand (Fine)", requiredQty: 100, unit: "Cubic Meter", allocatedBudget: 250000, spentBudget: 220000, expectedDelivery: "2025-02-05", deliveryAddress: "Site - Gachibowli", projectManager: "Rajesh Kumar", status: "delivered" },
      { id: "MAT-007", category: "Paints", name: "Interior Emulsion Paint", requiredQty: 200, unit: "Ltr", allocatedBudget: 150000, spentBudget: 0, expectedDelivery: "2025-05-01", deliveryAddress: "Site - Gachibowli", projectManager: "Rajesh Kumar", status: "pending" },
      { id: "MAT-008", category: "Hardware", name: "Door Locks & Handles Set", requiredQty: 25, unit: "Sets", allocatedBudget: 75000, spentBudget: 0, expectedDelivery: "2025-05-15", deliveryAddress: "Site - Gachibowli", projectManager: "Rajesh Kumar", status: "pending" },
    ],
  },
  "PRJ-HYD-2026-002": {
    id: "PRJ-HYD-2026-002",
    name: "Green Valley Villas",
    code: "GVV-002",
    city: "Hyderabad",
    address: "Road No. 12, Jubilee Hills, Hyderabad - 500033",
    totalBudget: 7500000,
    budgetSpent: 6800000,
    budgetRemaining: 700000,
    utilizationPercent: 91,
    projectManager: "Priya Sharma",
    pmPhone: "+91 98765 43211",
    pmEmail: "priya.sharma@wehouse.com",
    status: "at-risk",
    startDate: "2025-04-01",
    expectedEndDate: "2026-01-15",
    materials: [
      { id: "MAT-101", category: "Steel", name: "TMT Steel Bars - Fe500D", requiredQty: 25000, unit: "KG", allocatedBudget: 2000000, spentBudget: 1950000, expectedDelivery: "2025-01-20", deliveryAddress: "Site - Jubilee Hills", projectManager: "Priya Sharma", status: "delivered" },
      { id: "MAT-102", category: "Cement", name: "PPC Cement", requiredQty: 800, unit: "Bags", allocatedBudget: 480000, spentBudget: 480000, expectedDelivery: "2025-01-15", deliveryAddress: "Site - Jubilee Hills", projectManager: "Priya Sharma", status: "delivered" },
      { id: "MAT-103", category: "Electrical", name: "Main Distribution Panel", requiredQty: 5, unit: "Nos", allocatedBudget: 350000, spentBudget: 340000, expectedDelivery: "2025-02-01", deliveryAddress: "Site - Jubilee Hills", projectManager: "Priya Sharma", status: "delivered" },
      { id: "MAT-104", category: "Tiles", name: "Italian Marble Flooring", requiredQty: 3000, unit: "Sqft", allocatedBudget: 1800000, spentBudget: 1750000, expectedDelivery: "2025-01-25", deliveryAddress: "Site - Jubilee Hills", projectManager: "Priya Sharma", status: "in-progress" },
      { id: "MAT-105", category: "Plumbing", name: "Premium Sanitaryware Set", requiredQty: 12, unit: "Sets", allocatedBudget: 600000, spentBudget: 580000, expectedDelivery: "2025-02-10", deliveryAddress: "Site - Jubilee Hills", projectManager: "Priya Sharma", status: "in-progress" },
      { id: "MAT-106", category: "Wood", name: "Teak Wood Doors", requiredQty: 18, unit: "Nos", allocatedBudget: 720000, spentBudget: 700000, expectedDelivery: "2025-02-15", deliveryAddress: "Site - Jubilee Hills", projectManager: "Priya Sharma", status: "in-progress" },
    ],
  },
  "PRJ-BLR-2026-003": {
    id: "PRJ-BLR-2026-003",
    name: "Sunrise Apartments",
    code: "SA-003",
    city: "Bangalore",
    address: "ITPL Road, Whitefield, Bangalore - 560066",
    totalBudget: 4200000,
    budgetSpent: 4500000,
    budgetRemaining: -300000,
    utilizationPercent: 107,
    projectManager: "Vikram Singh",
    pmPhone: "+91 98765 43212",
    pmEmail: "vikram.singh@wehouse.com",
    status: "over-budget",
    startDate: "2025-03-10",
    expectedEndDate: "2025-12-30",
    materials: [
      { id: "MAT-201", category: "Steel", name: "TMT Steel Bars - Fe550", requiredQty: 18000, unit: "KG", allocatedBudget: 1500000, spentBudget: 1650000, expectedDelivery: "2025-01-10", deliveryAddress: "Site - Whitefield", projectManager: "Vikram Singh", status: "delivered" },
      { id: "MAT-202", category: "Cement", name: "OPC 53 Grade Cement", requiredQty: 600, unit: "Bags", allocatedBudget: 360000, spentBudget: 390000, expectedDelivery: "2025-01-08", deliveryAddress: "Site - Whitefield", projectManager: "Vikram Singh", status: "delivered" },
      { id: "MAT-203", category: "Sand", name: "River Sand", requiredQty: 120, unit: "Cubic Meter", allocatedBudget: 300000, spentBudget: 350000, expectedDelivery: "2025-01-05", deliveryAddress: "Site - Whitefield", projectManager: "Vikram Singh", status: "delivered" },
      { id: "MAT-204", category: "Electrical", name: "Complete Wiring Package", requiredQty: 1, unit: "Lot", allocatedBudget: 450000, spentBudget: 480000, expectedDelivery: "2025-01-20", deliveryAddress: "Site - Whitefield", projectManager: "Vikram Singh", status: "in-progress" },
      { id: "MAT-205", category: "Tiles", name: "Ceramic Floor Tiles", requiredQty: 2000, unit: "Sqft", allocatedBudget: 400000, spentBudget: 420000, expectedDelivery: "2025-02-01", deliveryAddress: "Site - Whitefield", projectManager: "Vikram Singh", status: "pending" },
    ],
  },
}

// Add default project data for any other ID
const defaultProject = {
  id: "PRJ-DEFAULT",
  name: "Sample Project",
  code: "SP-000",
  city: "City",
  address: "Project Address",
  totalBudget: 5000000,
  budgetSpent: 2500000,
  budgetRemaining: 2500000,
  utilizationPercent: 50,
  projectManager: "Project Manager",
  pmPhone: "+91 98765 00000",
  pmEmail: "pm@wehouse.com",
  status: "active" as const,
  startDate: "2025-01-01",
  expectedEndDate: "2026-01-01",
  materials: [
    { id: "MAT-D01", category: "Steel", name: "TMT Steel Bars", requiredQty: 10000, unit: "KG", allocatedBudget: 800000, spentBudget: 400000, expectedDelivery: "2025-03-01", deliveryAddress: "Project Site", projectManager: "Project Manager", status: "in-progress" as const },
    { id: "MAT-D02", category: "Cement", name: "OPC Cement", requiredQty: 400, unit: "Bags", allocatedBudget: 240000, spentBudget: 200000, expectedDelivery: "2025-02-15", deliveryAddress: "Project Site", projectManager: "Project Manager", status: "delivered" as const },
    { id: "MAT-D03", category: "Electrical", name: "Electrical Materials", requiredQty: 1, unit: "Lot", allocatedBudget: 300000, spentBudget: 0, expectedDelivery: "2025-04-01", deliveryAddress: "Project Site", projectManager: "Project Manager", status: "pending" as const },
  ],
}

interface Material {
  id: string
  category: string
  name: string
  requiredQty: number
  unit: string
  allocatedBudget: number
  spentBudget: number
  expectedDelivery: string
  deliveryAddress: string
  projectManager: string
  status: "pending" | "in-progress" | "delivered"
}

function formatCurrency(value: number): string {
  const absValue = Math.abs(value)
  if (absValue >= 10000000) {
    return `${value < 0 ? "-" : ""}${(absValue / 10000000).toFixed(2)} Cr`
  }
  if (absValue >= 100000) {
    return `${value < 0 ? "-" : ""}${(absValue / 100000).toFixed(2)} L`
  }
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const statusConfig = {
  active: {
    label: "Active",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    textColor: "text-emerald-700 dark:text-emerald-300",
    dotColor: "bg-emerald-500",
  },
  "at-risk": {
    label: "At Risk",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-300",
    dotColor: "bg-amber-500",
  },
  "over-budget": {
    label: "Over Budget",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-700 dark:text-red-300",
    dotColor: "bg-red-500",
  },
  completed: {
    label: "Completed",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-700 dark:text-blue-300",
    dotColor: "bg-blue-500",
  },
}

const materialStatusConfig = {
  pending: {
    label: "Pending",
    bgColor: "bg-gray-100 dark:bg-gray-800",
    textColor: "text-gray-600 dark:text-gray-400",
  },
  "in-progress": {
    label: "In Progress",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  delivered: {
    label: "Delivered",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
}

const categoryColors: Record<string, string> = {
  Steel: "#6366F1",
  Cement: "#64748B",
  Electrical: "#F59E0B",
  Plumbing: "#3B82F6",
  Tiles: "#10B981",
  Sand: "#D97706",
  Paints: "#EC4899",
  Hardware: "#8B5CF6",
  Wood: "#78716C",
}

function BudgetChart({ materials }: { materials: Material[] }) {
  const categoryData = materials.reduce((acc, mat) => {
    const existing = acc.find((c) => c.name === mat.category)
    if (existing) {
      existing.value += mat.allocatedBudget
    } else {
      acc.push({
        name: mat.category,
        value: mat.allocatedBudget,
        color: categoryColors[mat.category] || "#94A3B8",
      })
    }
    return acc
  }, [] as { name: string; value: number; color: string }[])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Budget by Category</CardTitle>
        <CardDescription>Material-wise budget allocation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="size-3 rounded-full"
                            style={{ backgroundColor: payload[0].payload.color }}
                          />
                          <span className="font-medium">{payload[0].name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(payload[0].value as number)}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 space-y-1.5">
          {categoryData.slice(0, 5).map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MaterialCard({ material, isExpanded, onToggle }: { material: Material; isExpanded: boolean; onToggle: () => void }) {
  const statusStyle = materialStatusConfig[material.status]
  const budgetUtilization = material.allocatedBudget > 0 
    ? (material.spentBudget / material.allocatedBudget) * 100 
    : 0

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <div className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      backgroundColor: `${categoryColors[material.category]}15`,
                      borderColor: `${categoryColors[material.category]}40`,
                      color: categoryColors[material.category],
                    }}
                  >
                    {material.category}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs", statusStyle.bgColor, statusStyle.textColor)}>
                    {statusStyle.label}
                  </Badge>
                </div>
                <h4 className="font-medium text-foreground truncate">{material.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {material.requiredQty.toLocaleString()} {material.unit}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(material.allocatedBudget)}
                  </p>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="size-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator />
          <div className="p-4 bg-muted/30 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Spent</p>
                <p className="text-sm font-medium">{formatCurrency(material.spentBudget)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className={cn(
                  "text-sm font-medium",
                  material.spentBudget > material.allocatedBudget && "text-red-600 dark:text-red-400"
                )}>
                  {formatCurrency(material.allocatedBudget - material.spentBudget)}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Budget Utilization</span>
                <span className={cn(
                  "font-medium",
                  budgetUtilization > 100 && "text-red-600 dark:text-red-400"
                )}>
                  {budgetUtilization.toFixed(0)}%
                </span>
              </div>
              <Progress 
                value={Math.min(budgetUtilization, 100)} 
                className={cn("h-1.5", budgetUtilization > 100 && "[&>div]:bg-red-500")}
              />
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="size-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Delivery:</span>
                <span className="font-medium">{formatDate(material.expectedDelivery)}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium flex-1">{material.deliveryAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">PM:</span>
                <span className="font-medium">{material.projectManager}</span>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

function MaterialsTable({ materials }: { materials: Material[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Material</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Qty Required</TableHead>
                <TableHead className="text-right">Allocated Budget</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Project Manager</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => {
                const statusStyle = materialStatusConfig[material.status]
                return (
                  <TableRow key={material.id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{material.name}</div>
                      <div className="text-xs text-muted-foreground">{material.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          backgroundColor: `${categoryColors[material.category]}15`,
                          borderColor: `${categoryColors[material.category]}40`,
                          color: categoryColors[material.category],
                        }}
                      >
                        {material.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {material.requiredQty.toLocaleString()} {material.unit}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(material.allocatedBudget)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(material.spentBudget)}
                    </TableCell>
                    <TableCell>{formatDate(material.expectedDelivery)}</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={material.deliveryAddress}>
                      {material.deliveryAddress}
                    </TableCell>
                    <TableCell>{material.projectManager}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-xs", statusStyle.bgColor, statusStyle.textColor)}>
                        {statusStyle.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function AccessDenied({ currentRole }: { currentRole: string }) {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="size-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
          <X className="size-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
        <p className="text-muted-foreground max-w-md">
          You do not have permission to access the Procurement Projects module.
          Your current role is <span className="font-medium">{currentRole}</span>.
        </p>
      </div>
    </DashboardLayout>
  )
}

export default function ProjectDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { selectedRole: role } = useRole()
  const projectId = params.id as string

  const [searchTerm, setSearchTerm] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("category")
  const [expandedCards, setExpandedCards] = React.useState<Set<string>>(new Set())

  // Role-based access check
  const allowedRoles = ["procurement_manager", "city_admin", "super_admin"]
  if (!role || !allowedRoles.includes(role)) {
    const displayRole = role
      ? role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Unknown"
    return <AccessDenied currentRole={displayRole} />
  }

  const project = projectsData[projectId] || { ...defaultProject, id: projectId, name: `Project ${projectId}` }
  const projectStatus = statusConfig[project.status]

  const categories = [...new Set(project.materials.map((m) => m.category))]

  const filteredMaterials = project.materials
    .filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || m.category === categoryFilter
      const matchesStatus = statusFilter === "all" || m.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "category") return a.category.localeCompare(b.category)
      if (sortBy === "budget") return b.allocatedBudget - a.allocatedBudget
      if (sortBy === "delivery") return new Date(a.expectedDelivery).getTime() - new Date(b.expectedDelivery).getTime()
      return a.name.localeCompare(b.name)
    })

  // Group materials by category for mobile view
  const groupedMaterials = filteredMaterials.reduce((acc, mat) => {
    if (!acc[mat.category]) {
      acc[mat.category] = []
    }
    acc[mat.category].push(mat)
    return acc
  }, {} as Record<string, Material[]>)

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const summaryStats = {
    totalMaterials: project.materials.length,
    pending: project.materials.filter((m) => m.status === "pending").length,
    inProgress: project.materials.filter((m) => m.status === "in-progress").length,
    delivered: project.materials.filter((m) => m.status === "delivered").length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/procurement">Procurement</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/procurement/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.code}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button and Header */}
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-fit -ml-2"
            onClick={() => router.push("/procurement/projects")}
          >
            <ArrowLeft className="size-4 mr-1" />
            Back to Projects
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">{project.name}</h1>
                <Badge variant="outline" className={cn("gap-1", projectStatus.bgColor, projectStatus.textColor)}>
                  <span className={cn("size-1.5 rounded-full", projectStatus.dotColor)} />
                  {projectStatus.label}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="font-mono">{project.code}</span>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {project.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Project Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="size-4" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium">{project.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Timeline</p>
                  <p className="font-medium">
                    {formatDate(project.startDate)} - {formatDate(project.expectedEndDate)}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <Users className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Project Manager</p>
                  <p className="font-medium">{project.projectManager}</p>
                  <a href={`tel:${project.pmPhone}`} className="text-primary text-xs flex items-center gap-1">
                    <Phone className="size-3" />
                    {project.pmPhone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <IndianRupee className="size-4" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Total Budget</p>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(project.totalBudget)}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Spent</p>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(project.budgetSpent)}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className={cn(
                    "font-semibold",
                    project.utilizationPercent > 100 && "text-red-600 dark:text-red-400",
                    project.utilizationPercent > 80 && project.utilizationPercent <= 100 && "text-amber-600 dark:text-amber-400"
                  )}>
                    {project.utilizationPercent}%
                  </span>
                </div>
                <Progress
                  value={Math.min(project.utilizationPercent, 100)}
                  className={cn(
                    "h-2",
                    project.status === "over-budget" && "[&>div]:bg-red-500",
                    project.status === "at-risk" && "[&>div]:bg-amber-500"
                  )}
                />
              </div>
              <div className={cn(
                "flex items-center justify-between p-2 rounded-lg",
                project.budgetRemaining < 0 ? "bg-red-50 dark:bg-red-900/20" : "bg-emerald-50 dark:bg-emerald-900/20"
              )}>
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span className={cn(
                  "font-bold",
                  project.budgetRemaining < 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
                )}>
                  {formatCurrency(project.budgetRemaining)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Material Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="size-4" />
                Material Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Materials</span>
                <span className="text-lg font-bold">{summaryStats.totalMaterials}</span>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-muted-foreground">Delivered</span>
                  </div>
                  <span className="font-medium">{summaryStats.delivered}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-amber-500" />
                    <span className="text-muted-foreground">In Progress</span>
                  </div>
                  <span className="font-medium">{summaryStats.inProgress}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-gray-400" />
                    <span className="text-muted-foreground">Pending</span>
                  </div>
                  <span className="font-medium">{summaryStats.pending}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Chart (Mobile) */}
        <div className="md:hidden">
          <BudgetChart materials={project.materials} />
        </div>

        {/* Materials Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-foreground">Materials Required</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 md:flex-initial md:w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="delivery">Delivery Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredMaterials.length} of {project.materials.length} materials
          </p>

          {/* Desktop: Table View */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <MaterialsTable materials={filteredMaterials} />
              </div>
              <div>
                <BudgetChart materials={project.materials} />
              </div>
            </div>
          </div>

          {/* Tablet: Table without chart */}
          <div className="hidden md:block lg:hidden">
            <MaterialsTable materials={filteredMaterials} />
          </div>

          {/* Mobile: Card View grouped by category */}
          <div className="md:hidden space-y-4">
            {Object.entries(groupedMaterials).map(([category, mats]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: categoryColors[category] || "#94A3B8" }}
                  />
                  <h3 className="font-medium text-foreground">{category}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {mats.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {mats.map((material) => (
                    <MaterialCard
                      key={material.id}
                      material={material}
                      isExpanded={expandedCards.has(material.id)}
                      onToggle={() => toggleCard(material.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMaterials.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="size-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">No materials found</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  Try adjusting your filters or search terms.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setCategoryFilter("all")
                    setStatusFilter("all")
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
