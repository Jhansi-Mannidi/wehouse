"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  Search,
  Filter,
  ChevronRight,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Users,
  LayoutGrid,
  LayoutList,
  ChevronDown,
  X,
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/role-context"
import { useAI } from "@/lib/ai-context"
import { Sparkles, AlertTriangle, Lightbulb, RefreshCw, Clock, DollarSign, BarChart3 } from "lucide-react"

// Mock Projects Data
const projects = [
  {
    id: "PRJ-HYD-2026-001",
    name: "Lakshmi Residency - G+2",
    code: "LR-001",
    city: "Hyderabad",
    address: "Plot 42, Gachibowli",
    totalBudget: 5000000,
    budgetSpent: 3200000,
    budgetRemaining: 1800000,
    utilizationPercent: 64,
    projectManager: "Rajesh Kumar",
    pmPhone: "+91 98765 43210",
    status: "active" as const,
    startDate: "2025-06-15",
    expectedEndDate: "2026-03-20",
    materialsCount: 12,
    pendingOrders: 3,
  },
  {
    id: "PRJ-HYD-2026-002",
    name: "Green Valley Villas",
    code: "GVV-002",
    city: "Hyderabad",
    address: "Road No. 12, Jubilee Hills",
    totalBudget: 7500000,
    budgetSpent: 6800000,
    budgetRemaining: 700000,
    utilizationPercent: 91,
    projectManager: "Priya Sharma",
    pmPhone: "+91 98765 43211",
    status: "at-risk" as const,
    startDate: "2025-04-01",
    expectedEndDate: "2026-01-15",
    materialsCount: 18,
    pendingOrders: 5,
  },
  {
    id: "PRJ-BLR-2026-003",
    name: "Sunrise Apartments",
    code: "SA-003",
    city: "Bangalore",
    address: "ITPL Road, Whitefield",
    totalBudget: 4200000,
    budgetSpent: 4500000,
    budgetRemaining: -300000,
    utilizationPercent: 107,
    projectManager: "Vikram Singh",
    pmPhone: "+91 98765 43212",
    status: "over-budget" as const,
    startDate: "2025-03-10",
    expectedEndDate: "2025-12-30",
    materialsCount: 15,
    pendingOrders: 2,
  },
  {
    id: "PRJ-CHN-2026-004",
    name: "Marina Heights",
    code: "MH-004",
    city: "Chennai",
    address: "OMR, Sholinganallur",
    totalBudget: 6000000,
    budgetSpent: 2800000,
    budgetRemaining: 3200000,
    utilizationPercent: 47,
    projectManager: "Anitha Krishnan",
    pmPhone: "+91 98765 43213",
    status: "active" as const,
    startDate: "2025-08-01",
    expectedEndDate: "2026-06-30",
    materialsCount: 10,
    pendingOrders: 1,
  },
  {
    id: "PRJ-HYD-2026-005",
    name: "Royal Enclave",
    code: "RE-005",
    city: "Hyderabad",
    address: "Hi-Tech City, Madhapur",
    totalBudget: 8500000,
    budgetSpent: 6500000,
    budgetRemaining: 2000000,
    utilizationPercent: 76,
    projectManager: "Suresh Reddy",
    pmPhone: "+91 98765 43214",
    status: "active" as const,
    startDate: "2025-05-20",
    expectedEndDate: "2026-04-15",
    materialsCount: 22,
    pendingOrders: 4,
  },
  {
    id: "PRJ-MUM-2026-006",
    name: "Ocean View Towers",
    code: "OVT-006",
    city: "Mumbai",
    address: "Andheri West",
    totalBudget: 12000000,
    budgetSpent: 5400000,
    budgetRemaining: 6600000,
    utilizationPercent: 45,
    projectManager: "Amit Patil",
    pmPhone: "+91 98765 43215",
    status: "active" as const,
    startDate: "2025-09-01",
    expectedEndDate: "2026-08-30",
    materialsCount: 28,
    pendingOrders: 6,
  },
  {
    id: "PRJ-PUN-2026-007",
    name: "Harmony Gardens",
    code: "HG-007",
    city: "Pune",
    address: "Hinjewadi Phase 2",
    totalBudget: 3800000,
    budgetSpent: 3600000,
    budgetRemaining: 200000,
    utilizationPercent: 95,
    projectManager: "Neha Kulkarni",
    pmPhone: "+91 98765 43216",
    status: "at-risk" as const,
    startDate: "2025-02-15",
    expectedEndDate: "2025-11-30",
    materialsCount: 14,
    pendingOrders: 2,
  },
  {
    id: "PRJ-HYD-2026-008",
    name: "Skyline Plaza",
    code: "SP-008",
    city: "Hyderabad",
    address: "Financial District",
    totalBudget: 15000000,
    budgetSpent: 8200000,
    budgetRemaining: 6800000,
    utilizationPercent: 55,
    projectManager: "Karthik Rao",
    pmPhone: "+91 98765 43217",
    status: "active" as const,
    startDate: "2025-07-01",
    expectedEndDate: "2026-09-30",
    materialsCount: 35,
    pendingOrders: 8,
  },
]

// Summary calculations helper
function calculateSummary(projectList: typeof projects) {
  return {
    totalBudget: projectList.reduce((sum, p) => sum + p.totalBudget, 0),
    totalSpent: projectList.reduce((sum, p) => sum + p.budgetSpent, 0),
    totalRemaining: projectList.reduce((sum, p) => sum + p.budgetRemaining, 0),
    activeProjects: projectList.filter((p) => p.status === "active").length,
    atRiskProjects: projectList.filter((p) => p.status === "at-risk").length,
    overBudgetProjects: projectList.filter((p) => p.status === "over-budget").length,
    totalProjects: projectList.length,
  }
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

function SummaryCards({ summary }: { summary: any }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Budget</p>
              <p className="text-lg md:text-2xl font-bold text-foreground mt-0.5">
                {formatCurrency(summary.totalBudget)}
              </p>
            </div>
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <IndianRupee className="size-5 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {summary.totalProjects} projects
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Spent</p>
              <p className="text-lg md:text-2xl font-bold text-foreground mt-0.5">
                {formatCurrency(summary.totalSpent)}
              </p>
            </div>
            <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <TrendingUp className="size-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-2">
            <Progress
              value={(summary.totalSpent / summary.totalBudget) * 100}
              className="h-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {((summary.totalSpent / summary.totalBudget) * 100).toFixed(1)}% utilized
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Remaining</p>
              <p className="text-lg md:text-2xl font-bold text-foreground mt-0.5">
                {formatCurrency(summary.totalRemaining)}
              </p>
            </div>
            <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingDown className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Available for allocation
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Status Overview</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium">{summary.activeProjects}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-amber-500" />
                  <span className="text-sm font-medium">{summary.atRiskProjects}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">{summary.overBudgetProjects}</span>
                </div>
              </div>
            </div>
            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Building2 className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Active / At Risk / Over Budget
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Comprehensive AI Insights Component for Projects
function ProjectsAIInsights() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"all" | "cost" | "time" | "risk">("all")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const insights = [
    {
      id: "cost-1",
      category: "cost",
      type: "prediction" as const,
      icon: DollarSign,
      title: "Cost Overrun Alert - Sunrise Apartments",
      description: "Project is 7% over budget (₹3L excess). At current spend rate, may exceed by ₹5.2L by completion. Consider material cost optimization.",
      value: "₹5.2L",
      trend: "risk",
      confidence: 89,
      priority: "high",
      action: "Review budget allocation",
    },
    {
      id: "cost-2",
      category: "cost",
      type: "recommendation" as const,
      icon: Lightbulb,
      title: "Bulk Purchase Opportunity",
      description: "Cement requirements across Green Valley, Royal Enclave, and Lakshmi Residency total 2,400 bags. Bulk order can save ₹1.8L (12% discount).",
      value: "₹1.8L Savings",
      trend: "positive",
      confidence: 95,
      priority: "medium",
      action: "Create bulk PO",
    },
    {
      id: "time-1",
      category: "time",
      type: "alert" as const,
      icon: Clock,
      title: "Potential Delay - Harmony Gardens",
      description: "Based on current progress (68%), project may be delayed by 18-22 days. External plastering phase taking longer than estimated.",
      value: "18-22 Days",
      trend: "risk",
      confidence: 82,
      priority: "high",
      action: "View timeline impact",
    },
    {
      id: "time-2",
      category: "time",
      type: "prediction" as const,
      icon: Calendar,
      title: "Optimal Delivery Windows",
      description: "Schedule steel deliveries for Ocean View Towers between Feb 5-10. Traffic and site accessibility analysis shows 40% faster unloading.",
      value: "40% Faster",
      trend: "positive",
      confidence: 78,
      priority: "low",
      action: "Update delivery schedule",
    },
    {
      id: "risk-1",
      category: "risk",
      type: "alert" as const,
      icon: AlertTriangle,
      title: "Vendor Payment Overdue",
      description: "3 vendors have payments pending beyond 30 days totaling ₹8.4L. May affect material delivery for Marina Heights and Skyline Plaza.",
      value: "₹8.4L Pending",
      trend: "risk",
      confidence: 100,
      priority: "high",
      action: "Process payments",
    },
    {
      id: "profit-1",
      category: "cost",
      type: "trend" as const,
      icon: BarChart3,
      title: "Profit Margin Forecast",
      description: "Based on current execution, portfolio profit margin projected at 14.2% vs planned 16%. Main variance from steel price increase.",
      value: "14.2%",
      trend: "warning",
      confidence: 86,
      priority: "medium",
      action: "View detailed analysis",
    },
  ]

  const filteredInsights = activeTab === "all" ? insights : insights.filter(i => i.category === activeTab)

  const getInsightColor = (trend: string) => {
    switch (trend) {
      case "positive": return "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800"
      case "risk": return "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
      case "warning": return "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
      default: return "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
    }
  }

  const getIconColor = (trend: string) => {
    switch (trend) {
      case "positive": return "text-emerald-600 dark:text-emerald-400"
      case "risk": return "text-red-600 dark:text-red-400"
      case "warning": return "text-amber-600 dark:text-amber-400"
      default: return "text-blue-600 dark:text-blue-400"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "medium": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      default: return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    }
  }

  return (
    <Card className="border-[#f6a404]/30 bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-yellow-950/20">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f6a404] to-amber-500 text-white shadow-lg shadow-amber-500/20">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-bold">AI Project Insights</CardTitle>
                <Badge className="bg-gradient-to-r from-[#f6a404] to-amber-500 text-white border-0 text-[10px] font-semibold px-2">
                  POWERED BY AI
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time analysis across all projects</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border bg-background/80 p-1">
              {[
                { id: "all", label: "All" },
                { id: "cost", label: "Cost" },
                { id: "time", label: "Time" },
                { id: "risk", label: "Risk" },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  size="sm"
                  className={cn("h-7 px-3 text-xs", activeTab !== tab.id && "bg-transparent")}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                >
                  {tab.label}
                </Button>
              ))}
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredInsights.map((insight) => {
            const Icon = insight.icon
            return (
              <div
                key={insight.id}
                className={cn(
                  "relative rounded-xl border p-4 transition-all hover:shadow-md cursor-pointer group",
                  getInsightColor(insight.trend)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("mt-0.5 p-2 rounded-lg bg-white/80 dark:bg-black/20", getIconColor(insight.trend))}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground leading-tight">{insight.title}</p>
                      <Badge className={cn("text-[10px] shrink-0", getPriorityBadge(insight.priority))}>
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{insight.description}</p>
                    {insight.value && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn("text-lg font-bold", getIconColor(insight.trend))}>{insight.value}</span>
                        <span className="text-[10px] text-muted-foreground bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    )}
                    <Button 
                      variant="link" 
                      size="sm" 
                      className={cn("h-auto p-0 text-xs font-medium group-hover:underline", getIconColor(insight.trend))}
                    >
                      {insight.action}
                      <ChevronRight className="size-3 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* AI Summary Stats */}
        <div className="mt-4 pt-4 border-t border-[#f6a404]/20 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹3.2L</p>
            <p className="text-xs text-muted-foreground">Potential Savings Identified</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">2</p>
            <p className="text-xs text-muted-foreground">Projects At Risk</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">14.2%</p>
            <p className="text-xs text-muted-foreground">Projected Margin</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">92%</p>
            <p className="text-xs text-muted-foreground">On-Time Delivery Rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FilterSheet({
  filters,
  setFilters,
}: {
  filters: { status: string; city: string; budgetRange: string }
  setFilters: React.Dispatch<React.SetStateAction<{ status: string; city: string; budgetRange: string }>>
}) {
  const cities = [...new Set(projects.map((p) => p.city))]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 md:hidden bg-transparent">
          <Filter className="size-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[60vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={filters.status} onValueChange={(v) => setFilters((f) => ({ ...f, status: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="over-budget">Over Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">City</label>
            <Select value={filters.city} onValueChange={(v) => setFilters((f) => ({ ...f, city: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Budget Range</label>
            <Select value={filters.budgetRange} onValueChange={(v) => setFilters((f) => ({ ...f, budgetRange: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="0-50">Under 50 Lakhs</SelectItem>
                <SelectItem value="50-100">50L - 1 Crore</SelectItem>
                <SelectItem value="100+">Above 1 Crore</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => setFilters({ status: "all", city: "all", budgetRange: "all" })}
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function ProjectCard({ project, onClick }: { project: (typeof projects)[0]; onClick: () => void }) {
  const status = statusConfig[project.status]

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
            <p className="text-xs text-muted-foreground">{project.code}</p>
          </div>
          <Badge variant="outline" className={cn("shrink-0 ml-2 gap-1", status.bgColor, status.textColor)}>
            <span className={cn("size-1.5 rounded-full", status.dotColor)} />
            {status.label}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <MapPin className="size-3" />
          <span className="truncate">{project.city} - {project.address}</span>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Budget Utilization</span>
            <span className={cn("font-medium", project.utilizationPercent > 100 && "text-red-600 dark:text-red-400")}>
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

        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground">Total Budget</p>
            <p className="font-semibold text-foreground">{formatCurrency(project.totalBudget)}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground">Spent</p>
            <p className="font-semibold text-foreground">{formatCurrency(project.budgetSpent)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Users className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{project.projectManager}</span>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectTable({
  filteredProjects,
  onRowClick,
}: {
  filteredProjects: typeof projects
  onRowClick: (id: string) => void
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Project</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Total Budget</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="min-w-[160px]">Utilization</TableHead>
                <TableHead>Project Manager</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[40px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => {
                const status = statusConfig[project.status]
                return (
                  <TableRow
                    key={project.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onRowClick(project.id)}
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{project.name}</span>
                        <span className="text-xs text-muted-foreground">{project.code}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.city}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(project.totalBudget)}
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(project.budgetSpent)}</TableCell>
                    <TableCell
                      className={cn(
                        "text-right",
                        project.budgetRemaining < 0 && "text-red-600 dark:text-red-400"
                      )}
                    >
                      {formatCurrency(project.budgetRemaining)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={Math.min(project.utilizationPercent, 100)}
                          className={cn(
                            "h-2 w-20",
                            project.status === "over-budget" && "[&>div]:bg-red-500",
                            project.status === "at-risk" && "[&>div]:bg-amber-500"
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm font-medium min-w-[40px]",
                            project.utilizationPercent > 100 && "text-red-600 dark:text-red-400"
                          )}
                        >
                          {project.utilizationPercent}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{project.projectManager}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("gap-1", status.bgColor, status.textColor)}>
                        <span className={cn("size-1.5 rounded-full", status.dotColor)} />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ChevronDown className="size-4 text-muted-foreground" />
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

export default function ProcurementProjectsPage() {
  const router = useRouter()
  const { selectedRole: role } = useRole()
  const { aiEnabled } = useAI()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = React.useState("utilization")
  const [filters, setFilters] = React.useState({
    status: "all",
    city: "all",
    budgetRange: "all",
  })

  // Role-based access check
  const allowedRoles = ["procurement_manager", "city_admin", "super_admin"]
  if (!role || !allowedRoles.includes(role)) {
    const displayRole = role
      ? role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Unknown"
    return <AccessDenied currentRole={displayRole} />
  }

  // Procurement Manager's assigned city (simulated - in real app, this would come from user data)
  const PROCUREMENT_MANAGER_CITY = "Hyderabad"
  const isProcurementManager = role === "procurement_manager"
  const isSuperAdmin = role === "super_admin"

  // Get base projects based on role
  // Procurement Manager only sees projects from their assigned city
  // Super Admin and City Admin see all projects
  const baseProjects = isProcurementManager
    ? projects.filter((p) => p.city === PROCUREMENT_MANAGER_CITY)
    : projects

  // Calculate summary based on role-filtered projects
  const summary = calculateSummary(baseProjects)

  const cities = [...new Set(baseProjects.map((p) => p.city))]

  const filteredProjects = baseProjects
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.projectManager.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filters.status === "all" || p.status === filters.status
      const matchesCity = filters.city === "all" || p.city === filters.city
      const matchesBudget =
        filters.budgetRange === "all" ||
        (filters.budgetRange === "0-50" && p.totalBudget < 5000000) ||
        (filters.budgetRange === "50-100" && p.totalBudget >= 5000000 && p.totalBudget < 10000000) ||
        (filters.budgetRange === "100+" && p.totalBudget >= 10000000)
      return matchesSearch && matchesStatus && matchesCity && matchesBudget
    })
    .sort((a, b) => {
      if (sortBy === "utilization") return b.utilizationPercent - a.utilizationPercent
      if (sortBy === "budget") return b.totalBudget - a.totalBudget
      if (sortBy === "spent") return b.budgetSpent - a.budgetSpent
      return a.name.localeCompare(b.name)
    })

  const handleProjectClick = (projectId: string) => {
    router.push(`/procurement/projects/${projectId}`)
  }

  const activeFiltersCount = [filters.status, filters.city, filters.budgetRange].filter(
    (f) => f !== "all"
  ).length

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Projects Overview</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Budget tracking and material procurement view
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {role?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* AI Insights - Shown when AI is enabled */}
        {aiEnabled && <ProjectsAIInsights />}

        {/* Filters and Search */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 md:max-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, managers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Mobile Filter Sheet */}
            <FilterSheet filters={filters} setFilters={setFilters} />

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-2">
              <Select value={filters.status} onValueChange={(v) => setFilters((f) => ({ ...f, status: v }))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                  <SelectItem value="over-budget">Over Budget</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.city} onValueChange={(v) => setFilters((f) => ({ ...f, city: v }))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.budgetRange} onValueChange={(v) => setFilters((f) => ({ ...f, budgetRange: v }))}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="0-50">Under 50 Lakhs</SelectItem>
                  <SelectItem value="50-100">50L - 1 Crore</SelectItem>
                  <SelectItem value="100+">Above 1 Crore</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ status: "all", city: "all", budgetRange: "all" })}
                className="text-muted-foreground"
              >
                Clear ({activeFiltersCount})
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utilization">Utilization</SelectItem>
                <SelectItem value="budget">Total Budget</SelectItem>
                <SelectItem value="spent">Amount Spent</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden md:flex items-center border rounded-lg p-0.5">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="size-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {baseProjects.length} projects
        </p>

        {/* Projects List/Grid */}
        {viewMode === "grid" || typeof window !== "undefined" && window.innerWidth < 768 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project.id)}
              />
            ))}
          </div>
        ) : (
          <ProjectTable filteredProjects={filteredProjects} onRowClick={handleProjectClick} />
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="size-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-1">No projects found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                Try adjusting your filters or search terms to find what you are looking for.
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setFilters({ status: "all", city: "all", budgetRange: "all" })
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
