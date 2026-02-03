"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Building2,
  IndianRupee,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Receipt,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  getCityAdminBranchData,
  getCityAdminFinancialSummary,
  getProjectManagerSummaries,
  getCityAdminAnalytics,
  getBranchOptionsForCity,
  type BranchRow,
  type BranchStatus,
} from "@/lib/city-admin-dashboard-data"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
} from "recharts"

// Status badge for branch/project health
function StatusBadge({ status, delayDays }: { status: BranchStatus; delayDays?: number }) {
  const config = {
    on_track: {
      label: "On track",
      className: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-400 dark:border-green-800",
    },
    at_risk: {
      label: "At risk",
      className: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800",
    },
    delayed: {
      label: delayDays ? `${delayDays}d delay` : "Delayed",
      className: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-800",
    },
  }
  const { label, className } = config[status]
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border", className)}>
      {status === "on_track" && <CheckCircle2 className="size-3 mr-1" />}
      {status === "at_risk" && <AlertTriangle className="size-3 mr-1" />}
      {status === "delayed" && <Clock className="size-3 mr-1" />}
      {label}
    </Badge>
  )
}

// KPI stat card
function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string
  value: string | number
  subtext?: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
}) {
  return (
    <Card className="bg-card border-border shadow-sm overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
              {title}
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mt-1 truncate">
              {value}
            </p>
            {subtext && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>
            )}
          </div>
          <div className={cn("flex size-10 sm:size-12 items-center justify-center rounded-lg shrink-0", iconBg)}>
            <Icon className={cn("size-5 sm:size-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Branch row as card for mobile
function BranchCard({ branch }: { branch: BranchRow }) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                {branch.cityCode}
              </span>
              <span className="font-semibold text-foreground truncate">{branch.branchName}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{branch.city}</p>
          </div>
          <StatusBadge status={branch.status} delayDays={branch.delayDays} />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">PM</span>
            <p className="font-medium text-foreground truncate">{branch.projectManager}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Projects</span>
            <p className="font-medium text-foreground">{branch.activeProjects} / {branch.projectsCount}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Revenue</span>
            <p className="font-medium text-foreground">{branch.revenue}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Pending</span>
            <p className="font-medium text-foreground">{branch.pendingPayment}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-2 border-t border-border">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            Start: {branch.startDate}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            End: {branch.endDate}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-2 text-primary" asChild>
          <Link href={`/projects?branch=${branch.id}`}>
            View projects
            <ChevronRight className="size-4 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

// City Admin dashboard is scoped to Hyderabad only; only branch is selectable
const CITY_ADMIN_CITY = "hyderabad"

export default function CityAdminDashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [isMounted, setIsMounted] = React.useState(false)
  const [selectedBranch, setSelectedBranch] = React.useState<string>("all")

  const allBranches = React.useMemo(() => getCityAdminBranchData(), [])
  const branchOptions = React.useMemo(
    () => getBranchOptionsForCity(CITY_ADMIN_CITY),
    []
  )

  const branches = React.useMemo(() => {
    let list = allBranches.filter((b) => b.cityValue === CITY_ADMIN_CITY)
    if (selectedBranch !== "all") {
      list = list.filter((b) => b.branchValue === selectedBranch)
    }
    return list
  }, [allBranches, selectedBranch])

  const financial = React.useMemo(() => getCityAdminFinancialSummary(branches), [branches])
  const pmSummaries = React.useMemo(() => getProjectManagerSummaries(branches), [branches])
  const analytics = React.useMemo(() => getCityAdminAnalytics(branches, CITY_ADMIN_CITY), [branches])

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  const branchLabel = selectedBranch === "all" ? "All Branches" : branchOptions.find((b) => b.value === selectedBranch)?.label ?? selectedBranch

  return (
    <DashboardLayout userEmail={user?.email || "cityadmin@wehouse.in"} showFilters={false}>
      <div className={cn("space-y-6", isMounted && "dashboard-fade-in")}>
        {/* Header with Branch dropdown only (city is fixed — Hyderabad) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">City Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Hyderabad · {branchLabel}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-[160px] sm:w-[200px] bg-card border-border text-foreground">
                <Building2 className="size-4 mr-2 text-muted-foreground shrink-0" />
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branchOptions.map((b) => (
                  <SelectItem key={b.value} value={b.value} className="text-foreground">
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 shrink-0">
              <Calendar className="size-4" />
              As of {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* KPI row */}
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
            isMounted && "dashboard-slide-up dashboard-stagger-1"
          )}
        >
          <StatCard
            title="Total Branches"
            value={financial.totalBranches}
            subtext="Hyderabad"
            icon={Building2}
            iconBg="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="Total Revenue"
            value={financial.totalRevenue}
            subtext={financial.monthChange + " vs last month"}
            icon={IndianRupee}
            iconBg="bg-green-100 dark:bg-green-900/30"
            iconColor="text-green-600 dark:text-green-400"
          />
          <StatCard
            title="Active Projects"
            value={financial.activeProjects}
            subtext={branchLabel}
            icon={TrendingUp}
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            title="Pending Payments"
            value={financial.pendingPayments}
            subtext="Outstanding"
            icon={Receipt}
            iconBg="bg-amber-100 dark:bg-amber-900/30"
            iconColor="text-amber-600 dark:text-amber-400"
          />
        </div>

        {/* Financial summary card */}
        <Card className={cn("bg-card border-border", isMounted && "dashboard-slide-up dashboard-stagger-2")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <DollarSign className="size-4 text-primary" />
              </div>
              Financial Summary
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Revenue & payments for Hyderabad · {branchLabel}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Revenue</p>
                <p className="text-lg font-semibold text-foreground mt-1">{financial.totalRevenue}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Revenue MTD</p>
                <p className="text-lg font-semibold text-foreground mt-1">{financial.revenueMTD}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pending Payments</p>
                <p className="text-lg font-semibold text-foreground mt-1">{financial.pendingPayments}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 bg-transparent border-border" asChild>
              <Link href="/finance/reports">
                View finance reports
                <ChevronRight className="size-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className={cn("bg-card border-border", isMounted && "dashboard-slide-up dashboard-stagger-2")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <BarChart3 className="size-4 text-primary" />
              </div>
              Analytics — Hyderabad
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Revenue, pipeline, leads, branch performance & project health for Hyderabad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* City highlights (Hyderabad / city KPIs) */}
            {analytics.cityHighlights.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {analytics.cityHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-3 space-y-0.5"
                  >
                    <p className="text-xs font-medium text-muted-foreground truncate">{item.title}</p>
                    <p className="text-lg font-semibold text-foreground truncate">{item.value}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{item.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Revenue vs Target (last 12 months) */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Revenue vs Target (last 12 months)</h4>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.revenueByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="cityAdminRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v} Cr`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`₹${value} Cr`, ""]}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#cityAdminRevenue)" name="Revenue" />
                    {analytics.revenueByMonth.some((d) => d.target != null) && (
                      <Line type="monotone" dataKey="target" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2 }} name="Target" />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Branch performance (revenue by branch) */}
            {analytics.branchPerformance.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Branch performance (revenue)</h4>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics.branchPerformance}
                      layout="vertical"
                      margin={{ top: 4, right: 8, left: 80, bottom: 4 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `₹${v} Cr`} />
                      <YAxis type="category" dataKey="branchName" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={76} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number, _name: string, item: { payload?: { branchName?: string; revenue: number; projects?: number } }) => [
                          `₹${value} Cr · ${item.payload?.projects ?? 0} projects`,
                          item.payload?.branchName ?? "",
                        ]}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Revenue (Cr)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Pipeline & Leads trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Pipeline & Won (last 12 months)</h4>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.pipelineByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `₹${v} Cr`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`₹${value} Cr`, ""]}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Line type="monotone" dataKey="pipeline" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 2 }} name="Pipeline" />
                      <Line type="monotone" dataKey="won" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 2 }} name="Won" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Leads & Converted (last 12 months)</h4>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.leadsByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="cityAdminLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px" }} />
                      <Area type="monotone" dataKey="leads" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#cityAdminLeads)" name="Leads" />
                      <Line type="monotone" dataKey="converted" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 2 }} name="Converted" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project status distribution */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Project status</h4>
                {analytics.statusDistribution.length > 0 ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="h-[180px] w-full max-w-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analytics.statusDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                          >
                            {analytics.statusDistribution.map((entry, i) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                            formatter={(value: number, name: string) => [value, name]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-2">
                      {analytics.statusDistribution.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-foreground">{item.name}</span>
                          </div>
                          <span className="font-medium text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-8 text-center">No project status data for this selection.</p>
                )}
              </div>
              {/* Projects trend */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Projects over time</h4>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.projectsTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [value, "Projects"]}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Bar dataKey="projects" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Projects" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Branches: desktop table + mobile cards (one city) */}
        <Card className={cn("bg-card border-border", isMounted && "dashboard-slide-up dashboard-stagger-3")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <MapPin className="size-4 text-primary" />
              </div>
              Branches — Hyderabad
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {branchLabel} · PM, projects, financials, start & end dates
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            {branches.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <Building2 className="size-10 mx-auto mb-3 opacity-50" />
                <p className="font-medium text-foreground">No branches in this selection</p>
                <p className="text-sm mt-1">Choose another city or branch from the dropdowns above.</p>
              </div>
            ) : (
              <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium">City / Branch</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Project Manager</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">Projects</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">Revenue</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">Pending</TableHead>
                    <TableHead className="text-muted-foreground font-medium">Start Date</TableHead>
                    <TableHead className="text-muted-foreground font-medium">End Date</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id} className="border-border">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {branch.cityCode}
                          </span>
                          <span className="text-foreground">{branch.branchName}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{branch.city}</span>
                      </TableCell>
                      <TableCell className="text-foreground">{branch.projectManager}</TableCell>
                      <TableCell className="text-right text-foreground">
                        {branch.activeProjects} / {branch.projectsCount}
                      </TableCell>
                      <TableCell className="text-right text-foreground">{branch.revenue}</TableCell>
                      <TableCell className="text-right text-foreground">{branch.pendingPayment}</TableCell>
                      <TableCell className="text-muted-foreground">{branch.startDate}</TableCell>
                      <TableCell className="text-muted-foreground">{branch.endDate}</TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={branch.status} delayDays={branch.delayDays} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden space-y-3 px-4 pb-4">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Project managers overview */}
        <Card className={cn("bg-card border-border", isMounted && "dashboard-slide-up dashboard-stagger-4")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Users className="size-4 text-primary" />
              </div>
              Project Managers — Hyderabad
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {branchLabel} · PM and project health
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pmSummaries.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground text-sm">No project managers in this selection.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pmSummaries.slice(0, 9).map((pm) => (
                    <div
                      key={`${pm.branchId}-${pm.name}`}
                      className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{pm.name}</span>
                        <span className="text-xs text-muted-foreground">{pm.city} · {pm.branchName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Projects:</span>
                        <span className="font-medium text-foreground">{pm.projectsCount}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs">
                          On track {pm.onTrack}
                        </Badge>
                        {pm.atRisk > 0 && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 text-xs">
                            At risk {pm.atRisk}
                          </Badge>
                        )}
                        {pm.delayed > 0 && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 text-xs">
                            Delayed {pm.delayed}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent border-border" asChild>
                  <Link href="/projects">
                    View all projects
                    <ChevronRight className="size-4 ml-1" />
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
