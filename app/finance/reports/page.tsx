"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Download,
  Calendar,
  Filter,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Users,
  FileText,
  Wallet,
  CreditCard,
  Receipt,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts"

// Mock data for reports
const revenueData = [
  { month: "Jan", revenue: 4500000, expenses: 3200000 },
  { month: "Feb", revenue: 5200000, expenses: 3500000 },
  { month: "Mar", revenue: 4800000, expenses: 3100000 },
  { month: "Apr", revenue: 6100000, expenses: 4200000 },
  { month: "May", revenue: 5500000, expenses: 3800000 },
  { month: "Jun", revenue: 7200000, expenses: 4500000 },
  { month: "Jul", revenue: 6800000, expenses: 4100000 },
  { month: "Aug", revenue: 7500000, expenses: 4800000 },
  { month: "Sep", revenue: 8200000, expenses: 5100000 },
  { month: "Oct", revenue: 7800000, expenses: 4900000 },
  { month: "Nov", revenue: 8500000, expenses: 5300000 },
  { month: "Dec", revenue: 9200000, expenses: 5800000 },
]

const expenseBreakdown = [
  { name: "Materials", value: 45, amount: 24500000, color: "#f59e0b" },
  { name: "Labour", value: 25, amount: 13600000, color: "#3b82f6" },
  { name: "Equipment", value: 12, amount: 6500000, color: "#10b981" },
  { name: "Overhead", value: 10, amount: 5400000, color: "#8b5cf6" },
  { name: "Others", value: 8, amount: 4300000, color: "#6b7280" },
]

const cashFlowData = [
  { week: "W1", inflow: 2500000, outflow: 1800000 },
  { week: "W2", inflow: 3200000, outflow: 2100000 },
  { week: "W3", inflow: 2800000, outflow: 2400000 },
  { week: "W4", inflow: 3500000, outflow: 2200000 },
]

const projectFinancials = [
  {
    name: "Villa Construction - Whitefield",
    budget: 15000000,
    spent: 9500000,
    invoiced: 10500000,
    collected: 8750000,
    status: "on-track",
  },
  {
    name: "Apartment Complex - HSR Layout",
    budget: 45000000,
    spent: 28000000,
    invoiced: 32000000,
    collected: 28500000,
    status: "on-track",
  },
  {
    name: "Commercial Building - MG Road",
    budget: 25000000,
    spent: 18500000,
    invoiced: 15000000,
    collected: 12000000,
    status: "at-risk",
  },
  {
    name: "Duplex House - Koramangala",
    budget: 8000000,
    spent: 7200000,
    invoiced: 7500000,
    collected: 7500000,
    status: "completed",
  },
  {
    name: "Office Space - Indiranagar",
    budget: 12000000,
    spent: 11500000,
    invoiced: 10000000,
    collected: 7500000,
    status: "over-budget",
  },
]

const vendorPayments = [
  { name: "Steel Suppliers Ltd", amount: 8500000, pending: 1200000 },
  { name: "Cement World", amount: 5200000, pending: 800000 },
  { name: "BuildRight Services", amount: 4800000, pending: 500000 },
  { name: "Electrical Plus", amount: 3200000, pending: 450000 },
  { name: "Plumbing Solutions", amount: 2800000, pending: 300000 },
]

const statusColors = {
  "on-track": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "at-risk": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "over-budget": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "completed": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

export default function ReportsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [timePeriod, setTimePeriod] = useState("year")
  const [reportType, setReportType] = useState("overview")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Export reports to CSV
  const handleExport = () => {
    const headers = ["Month", "Revenue", "Expenses", "Net Profit", "Profit Margin"]
    const csvData = revenueData.map(d => [
      d.month,
      d.revenue,
      d.expenses,
      d.revenue - d.expenses,
      `${Math.round(((d.revenue - d.expenses) / d.revenue) * 100)}%`
    ])
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `financial_report_${timePeriod}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Export Successful",
      description: "Financial report has been exported to CSV file.",
    })
  }

  // Calculate totals
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0)
  const totalExpenses = revenueData.reduce((sum, d) => sum + d.expenses, 0)
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = Math.round((netProfit / totalRevenue) * 100)

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(1)} Cr`
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)} L`
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatFullCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Financial Reports</h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive financial analytics and insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Desktop Time Period */}
            <div className="hidden md:flex items-center gap-2">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          
            {/* Mobile Filter */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 md:hidden bg-transparent">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Report Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium">Time Period</label>
                    <Select value={timePeriod} onValueChange={setTimePeriod}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setIsFilterOpen(false)}>
                    Apply
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <Badge variant="outline" className="gap-1 text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  12%
                </Badge>
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <Badge variant="outline" className="gap-1 text-amber-600 dark:text-amber-400">
                  <ArrowUpRight className="h-3 w-3" />
                  8%
                </Badge>
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">Total Expenses</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(totalExpenses)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <Badge variant="outline" className="gap-1 text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  15%
                </Badge>
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">Net Profit</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(netProfit)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <PieChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">Profit Margin</p>
                <p className="text-xl font-bold text-foreground">{profitMargin}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Revenue vs Expenses Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue vs Expenses</CardTitle>
              <CardDescription>Monthly comparison for the year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      className="text-xs" 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => formatFullCurrency(value)}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Revenue" />
                    <Bar dataKey="expenses" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expense Breakdown & Cash Flow */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Expense Breakdown</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="h-[200px] w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number, name: string, props: { payload: { amount: number } }) => 
                            [formatFullCurrency(props.payload.amount), name]
                          }
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2">
                    {expenseBreakdown.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-foreground">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{item.value}%</span>
                          <p className="text-xs text-muted-foreground">{formatCurrency(item.amount)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cash Flow */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Cash Flow</CardTitle>
                <CardDescription>Inflow vs Outflow this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis 
                        className="text-xs" 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number) => formatFullCurrency(value)}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="inflow" 
                        stackId="1"
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                        name="Inflow"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="outflow" 
                        stackId="2"
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.3}
                        name="Outflow"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-sm text-muted-foreground">Inflow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm text-muted-foreground">Outflow</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      className="text-xs" 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => formatFullCurrency(value)}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Vendor Payments</CardTitle>
              <CardDescription>Highest paid vendors with pending amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorPayments.map((vendor, idx) => (
                  <div key={vendor.name} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{vendor.name}</p>
                        <p className="font-semibold text-foreground">{formatCurrency(vendor.amount)}</p>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Pending: {formatCurrency(vendor.pending)}</span>
                        <span>{Math.round((vendor.pending / vendor.amount) * 100)}% pending</span>
                      </div>
                      <Progress 
                        value={100 - Math.round((vendor.pending / vendor.amount) * 100)} 
                        className="mt-2 h-1.5 [&>div]:bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Project Financial Summary</CardTitle>
              <CardDescription>Budget, spending, and collection status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Project</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Budget</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Spent</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Invoiced</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Collected</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectFinancials.map((project) => (
                      <tr key={project.name} className="border-b last:border-0">
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground">{project.name}</p>
                        </td>
                        <td className="px-4 py-3 text-right text-sm">{formatCurrency(project.budget)}</td>
                        <td className="px-4 py-3 text-right text-sm">
                          <span className={cn(
                            project.spent > project.budget ? "text-red-600 dark:text-red-400" : ""
                          )}>
                            {formatCurrency(project.spent)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm">{formatCurrency(project.invoiced)}</td>
                        <td className="px-4 py-3 text-right text-sm">{formatCurrency(project.collected)}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge className={cn("text-xs", statusColors[project.status as keyof typeof statusColors])}>
                            {project.status.replace("-", " ")}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="flex flex-col gap-3 p-4 md:hidden">
                {projectFinancials.map((project) => (
                  <Card key={project.name} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <p className="font-medium text-foreground line-clamp-1">{project.name}</p>
                        <Badge className={cn("text-xs ml-2", statusColors[project.status as keyof typeof statusColors])}>
                          {project.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="font-medium">{formatCurrency(project.budget)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Spent</p>
                          <p className={cn(
                            "font-medium",
                            project.spent > project.budget ? "text-red-600 dark:text-red-400" : ""
                          )}>
                            {formatCurrency(project.spent)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Invoiced</p>
                          <p className="font-medium">{formatCurrency(project.invoiced)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Collected</p>
                          <p className="font-medium">{formatCurrency(project.collected)}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Budget Utilization</span>
                          <span>{Math.round((project.spent / project.budget) * 100)}%</span>
                        </div>
                        <Progress 
                          value={Math.min((project.spent / project.budget) * 100, 100)} 
                          className={cn(
                            "h-1.5",
                            project.spent > project.budget ? "[&>div]:bg-red-500" : "[&>div]:bg-primary"
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Tab */}
        <TabsContent value="cashflow" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Cash Flow</CardTitle>
              <CardDescription>Net cash position over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      className="text-xs" 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number, name: string) => [formatFullCurrency(value), name === "revenue" ? "Inflow" : "Outflow"]}
                    />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="revenue" />
                    <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-sm text-muted-foreground">Cash Inflow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm text-muted-foreground">Cash Outflow</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
