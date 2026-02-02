"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  TrendingUp,
  TrendingDown,
  Package,
  FileStack,
  ShoppingCart,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Search,
  Filter,
  ChevronRight,
  Plus,
  Users,
  Truck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  BarChart3,
  Building2,
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

// Mock Dashboard Data
const dashboardSummary = {
  totalBudget: 125000000,
  totalSpent: 82000000,
  totalRemaining: 43000000,
  activeProjects: 24,
  pendingPOs: 156,
  pendingScopes: 12,
  overdueDeliveries: 2,
}

const projectBudgets = [
  {
    projectId: "PRJ-HYD-2026-001",
    projectName: "Lakshmi Residency - G+2",
    projectCode: "LR-001",
    city: "Hyderabad",
    totalBudget: 5000000,
    spent: 3200000,
    utilizationPercent: 64,
    status: "on-track" as const,
  },
  {
    projectId: "PRJ-HYD-2026-002",
    projectName: "Green Valley Villas",
    projectCode: "GVV-002",
    city: "Hyderabad",
    totalBudget: 7500000,
    spent: 6800000,
    utilizationPercent: 91,
    status: "at-risk" as const,
  },
  {
    projectId: "PRJ-BLR-2026-003",
    projectName: "Sunrise Apartments",
    projectCode: "SA-003",
    city: "Bangalore",
    totalBudget: 4200000,
    spent: 4500000,
    utilizationPercent: 107,
    status: "over-budget" as const,
  },
  {
    projectId: "PRJ-CHN-2026-004",
    projectName: "Marina Heights",
    projectCode: "MH-004",
    city: "Chennai",
    totalBudget: 6000000,
    spent: 2800000,
    utilizationPercent: 47,
    status: "on-track" as const,
  },
  {
    projectId: "PRJ-HYD-2026-005",
    projectName: "Royal Enclave",
    projectCode: "RE-005",
    city: "Hyderabad",
    totalBudget: 8500000,
    spent: 6500000,
    utilizationPercent: 76,
    status: "on-track" as const,
  },
]

const materialSpending = [
  { categoryId: "steel", categoryName: "Steel", totalSpent: 22960000, percentOfTotal: 28, trend: "up", trendPercent: 5.2, color: "#6366F1" },
  { categoryId: "cement", categoryName: "Cement", totalSpent: 18040000, percentOfTotal: 22, trend: "stable", trendPercent: 0.5, color: "#64748B" },
  { categoryId: "electrical", categoryName: "Electrical", totalSpent: 14760000, percentOfTotal: 18, trend: "down", trendPercent: -2.1, color: "#F59E0B" },
  { categoryId: "plumbing", categoryName: "Plumbing", totalSpent: 9840000, percentOfTotal: 12, trend: "up", trendPercent: 3.8, color: "#3B82F6" },
  { categoryId: "tiles", categoryName: "Tiles", totalSpent: 16400000, percentOfTotal: 20, trend: "stable", trendPercent: 1.2, color: "#10B981" },
]

const consumptionTrends = [
  { month: "Aug", steel: 280, cement: 220, electrical: 180, plumbing: 120 },
  { month: "Sep", steel: 320, cement: 240, electrical: 190, plumbing: 140 },
  { month: "Oct", steel: 290, cement: 260, electrical: 170, plumbing: 130 },
  { month: "Nov", steel: 350, cement: 280, electrical: 200, plumbing: 160 },
  { month: "Dec", steel: 380, cement: 300, electrical: 220, plumbing: 180 },
  { month: "Jan", steel: 420, cement: 320, electrical: 240, plumbing: 200 },
]

const alerts = [
  { id: "ALT-001", severity: "critical" as const, title: "Budget Exceeded", message: "Project GVV-002 has exceeded 90% of allocated budget", time: "2 hours ago", action: "/projects/PRJ-HYD-2026-002" },
  { id: "ALT-002", severity: "warning" as const, title: "Low Stock Alert", message: "Cement stock running low at 3 sites", time: "4 hours ago", action: "/procurement/inventory" },
  { id: "ALT-003", severity: "info" as const, title: "New Bids Received", message: "5 new bids received for SCP-2026-089", time: "6 hours ago", action: "/procurement/scopes/SCP-2026-089" },
  { id: "ALT-004", severity: "warning" as const, title: "Delivery Overdue", message: "PO-2026-145 delivery is 2 days overdue", time: "1 day ago", action: "/procurement/orders/PO-2026-145" },
]

const recentActivity = [
  { id: "ACT-001", type: "po_approved", title: "PO Approved", description: "PO-2026-158 approved for TMT Steel", user: "Rajesh Kumar", time: "10 mins ago", icon: CheckCircle2, color: "text-green-500" },
  { id: "ACT-002", type: "scope_created", title: "Scope Created", description: "New scope created for Electrical work", user: "Priya Sharma", time: "45 mins ago", icon: FileStack, color: "text-blue-500" },
  { id: "ACT-003", type: "bid_received", title: "Bid Received", description: "ABC Steel submitted bid for SCP-089", user: "System", time: "1 hour ago", icon: ArrowUpRight, color: "text-amber-500" },
  { id: "ACT-004", type: "delivery", title: "Delivery Completed", description: "Cement delivery completed at LR-001", user: "Driver: Ramesh", time: "2 hours ago", icon: Truck, color: "text-primary" },
  { id: "ACT-005", type: "vendor_added", title: "Vendor Onboarded", description: "XYZ Electricals approved and added", user: "Admin", time: "3 hours ago", icon: Building2, color: "text-violet-500" },
]

function formatCurrency(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Cr`
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    const duration = 1000
    const steps = 30
    const stepValue = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {prefix}
      {displayValue >= 10000000
        ? `${(displayValue / 10000000).toFixed(1)} Cr`
        : displayValue >= 100000
        ? `${(displayValue / 100000).toFixed(1)} L`
        : displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = "primary",
  progress,
}: {
  title: string
  value: number
  subtitle: string
  icon: React.ElementType
  trend?: "up" | "down"
  trendValue?: string
  color?: "primary" | "green" | "amber" | "red"
  progress?: number
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    red: "bg-red-500/10 text-red-600 dark:text-red-400",
  }

  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">
              <AnimatedNumber value={value} prefix="₹" />
            </p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            {progress !== undefined && (
              <div className="mt-3">
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
          <div className={cn("flex size-10 md:size-12 shrink-0 items-center justify-center rounded-xl", colorClasses[color])}>
            <Icon className="size-5 md:size-6" />
          </div>
        </div>
        {trend && trendValue && (
          <div className="flex items-center gap-1 mt-3">
            {trend === "up" ? (
              <TrendingUp className="size-3 text-green-500" />
            ) : (
              <TrendingDown className="size-3 text-red-500" />
            )}
            <span className={cn("text-xs font-medium", trend === "up" ? "text-green-600" : "text-red-600")}>
              {trendValue}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ProjectBudgetTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortBy, setSortBy] = React.useState("utilization")

  const statusColors = {
    "on-track": "bg-green-500",
    "at-risk": "bg-amber-500",
    "over-budget": "bg-red-500",
  }

  const statusLabels = {
    "on-track": "On Track",
    "at-risk": "At Risk",
    "over-budget": "Over Budget",
  }

  const filteredProjects = projectBudgets
    .filter((p) => p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || p.projectCode.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "utilization") return b.utilizationPercent - a.utilizationPercent
      if (sortBy === "budget") return b.totalBudget - a.totalBudget
      return a.projectName.localeCompare(b.projectName)
    })

  return (
    <Card className="lg:col-span-3">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-lg">Project Budget Utilization</CardTitle>
            <CardDescription>Track budget usage across all active projects</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[150px] md:w-[200px] h-9"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utilization">Utilization</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="hidden md:table-cell">City</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="hidden sm:table-cell">Utilization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[40px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow
                  key={project.projectId}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/projects/${project.projectId}`)}
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{project.projectName}</span>
                      <span className="text-xs text-muted-foreground">{project.projectCode}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{project.city}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(project.totalBudget)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(project.spent)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={Math.min(project.utilizationPercent, 100)}
                        className={cn("h-2 w-20", project.status === "over-budget" && "[&>div]:bg-red-500", project.status === "at-risk" && "[&>div]:bg-amber-500")}
                      />
                      <span className="text-sm font-medium">{project.utilizationPercent}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1.5">
                      <span className={cn("size-2 rounded-full", statusColors[project.status])} />
                      <span className="hidden sm:inline">{statusLabels[project.status]}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function MaterialSpendingChart() {
  const chartData = materialSpending.map((item) => ({
    name: item.categoryName,
    value: item.percentOfTotal,
    fill: item.color,
  }))

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Material-wise Spending</CardTitle>
        <CardDescription>Distribution by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="size-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
                          <span className="font-medium">{payload[0].name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{payload[0].value}% of total</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {materialSpending.slice(0, 4).map((item) => (
            <div key={item.categoryId} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.categoryName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.percentOfTotal}%</span>
                {item.trend === "up" && <TrendingUp className="size-3 text-red-500" />}
                {item.trend === "down" && <TrendingDown className="size-3 text-green-500" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ConsumptionTrendsChart() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Consumption Trends</CardTitle>
            <CardDescription>Material spending over time (in Lakhs)</CardDescription>
          </div>
          <Select defaultValue="6m">
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={consumptionTrends}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-sm">
                        <p className="font-medium mb-2">{label}</p>
                        {payload.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-muted-foreground">{entry.name}:</span>
                            <span className="font-medium">₹{entry.value}L</span>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="steel" stroke="#6366F1" strokeWidth={2} dot={false} name="Steel" />
              <Line type="monotone" dataKey="cement" stroke="#64748B" strokeWidth={2} dot={false} name="Cement" />
              <Line type="monotone" dataKey="electrical" stroke="#F59E0B" strokeWidth={2} dot={false} name="Electrical" />
              <Line type="monotone" dataKey="plumbing" stroke="#3B82F6" strokeWidth={2} dot={false} name="Plumbing" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function AlertsWidget() {
  const router = useRouter()

  const alertStyles = {
    critical: { 
      borderColor: "border-l-red-500",
      bgColor: "bg-card"
    },
    warning: { 
      borderColor: "border-l-orange-500",
      bgColor: "bg-card"
    },
    info: { 
      borderColor: "border-l-teal-500",
      bgColor: "bg-card"
    },
  }

  return (
    <Card className="lg:col-span-2 overflow-hidden border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Alerts & Actions</CardTitle>
          <Badge variant="destructive" className="text-xs">{alerts.filter((a) => a.severity === "critical").length} Critical</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const style = alertStyles[alert.severity]
          return (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-lg border-l-4 cursor-pointer transition-colors hover:bg-muted/30 relative",
                style.borderColor,
                style.bgColor
              )}
              onClick={() => router.push(alert.action)}
            >
              {/* Top border with gradient fade */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
              {/* Bottom border with gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
              <div className="flex items-start justify-between gap-3 relative z-10">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{alert.time}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function RecentActivityTimeline() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="relative">
                  <div className={cn("flex size-8 items-center justify-center rounded-full bg-muted", activity.color)}>
                    <Icon className="size-4" />
                  </div>
                  {index < recentActivity.length - 1 && (
                    <div className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProcurementDashboardPage() {
  const router = useRouter()
  const [timeFilter, setTimeFilter] = React.useState("this-month")

  const utilizationPercent = Math.round((dashboardSummary.totalSpent / dashboardSummary.totalBudget) * 100)

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Procurement Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of procurement activities and budget utilization
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[150px]">
                <Calendar className="size-4 mr-2" />
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => router.push("/procurement/scopes/create")}>
              <Plus className="size-4 mr-2" />
              <span className="hidden sm:inline">Create Scope</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Budget"
            value={dashboardSummary.totalBudget}
            subtitle={`${utilizationPercent}% utilized`}
            icon={BarChart3}
            color="primary"
            progress={utilizationPercent}
          />
          <StatCard
            title="Total Spent"
            value={dashboardSummary.totalSpent}
            subtitle={`${dashboardSummary.pendingPOs} pending POs`}
            icon={ShoppingCart}
            color="amber"
            trend="up"
            trendValue="+8.2%"
          />
          <StatCard
            title="Remaining"
            value={dashboardSummary.totalRemaining}
            subtitle={`${100 - utilizationPercent}% of budget`}
            icon={Package}
            color="green"
          />
          <StatCard
            title="Active Projects"
            value={dashboardSummary.activeProjects}
            subtitle={`${dashboardSummary.pendingScopes} pending scopes`}
            icon={FileStack}
            color="primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <ProjectBudgetTable />
          <MaterialSpendingChart />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <ConsumptionTrendsChart />
          <AlertsWidget />
        </div>

        {/* Activity Timeline */}
        <RecentActivityTimeline />

        {/* Mobile FAB */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <Button size="lg" className="size-14 rounded-full shadow-lg" onClick={() => router.push("/procurement/scopes/create")}>
            <Plus className="size-6" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
