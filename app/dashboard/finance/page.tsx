"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  AlertCircle,
  Mail,
  CreditCard,
  ArrowRight,
  Download,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  CalendarDays,
  RefreshCw, // Import RefreshCw here
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DateRangePicker, type DateRangePreset, type DateRange } from "@/components/ui/date-range-picker"
import { useAI } from "@/lib/ai-context"
import { FinanceAIPredictions } from "@/components/ai/ai-insights-card"

// Format currency in Indian format
function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

// Stats data
const stats = [
  {
    title: "Collections MTD",
    value: 28000000,
    change: 12,
    changeType: "positive" as const,
    subtitle: "vs last month",
    icon: Wallet,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-muted/50 dark:bg-muted/30",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    title: "Outstanding Receivable",
    value: 42000000,
    change: null,
    subtitle: "45 customers",
    icon: Receipt,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-muted/50 dark:bg-muted/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    title: "Vendor Due Payable",
    value: 18000000,
    change: null,
    subtitle: "23 vendors",
    icon: Building2,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-muted/50 dark:bg-muted/30",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    title: "Cash Flow (Net)",
    value: 10000000,
    change: null,
    subtitle: "Positive",
    icon: TrendingUp,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-muted/50 dark:bg-muted/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    isPositive: true,
  },
  {
    title: "Overdue >30 days",
    value: 4800000,
    change: null,
    subtitle: "8 accounts",
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-muted/50 dark:bg-muted/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
]

// Customer collections data
const collections = [
  {
    id: 1,
    customer: "Anil Sharma",
    project: "WH-P-004",
    amount: 1230000,
    dueDate: "Jan 20",
    status: "overdue",
    overdueDays: 6,
  },
  {
    id: 2,
    customer: "Kumar Reddy",
    project: "WH-P-008",
    amount: 845000,
    dueDate: "Jan 22",
    status: "overdue",
    overdueDays: 4,
  },
  {
    id: 3,
    customer: "Rajesh Kumar",
    project: "WH-P-001",
    amount: 630000,
    dueDate: "Jan 28",
    status: "due",
    overdueDays: 0,
  },
  {
    id: 4,
    customer: "Venkat Murthy",
    project: "WH-P-003",
    amount: 1500000,
    dueDate: "Feb 5",
    status: "upcoming",
    overdueDays: 0,
  },
  {
    id: 5,
    customer: "Sunitha Reddy",
    project: "WH-P-002",
    amount: 410000,
    dueDate: "Feb 10",
    status: "upcoming",
    overdueDays: 0,
  },
]

// Vendor payables data
const payables = [
  {
    id: 1,
    vendor: "Sri Builders",
    type: "TKP",
    amount: 450000,
    project: "WH-P-001",
    status: "pending",
  },
  {
    id: 2,
    vendor: "Prime Construction",
    type: "TKP",
    amount: 620000,
    project: "WH-P-003",
    status: "approved",
  },
  {
    id: 3,
    vendor: "Steel Corp",
    type: "Material",
    amount: 280000,
    project: "Multiple",
    status: "pending",
  },
  {
    id: 4,
    vendor: "Cement Traders",
    type: "Material",
    amount: 145000,
    project: "Multiple",
    status: "approved",
  },
]

// Recent transactions
const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 600000,
    party: "Rajesh Kumar",
    method: "UPI",
    time: "3:45 PM",
    date: "Today",
  },
  {
    id: 2,
    type: "debit",
    amount: 280000,
    party: "Steel Corp",
    method: "NEFT",
    time: "2:30 PM",
    date: "Today",
  },
  {
    id: 3,
    type: "credit",
    amount: 410000,
    party: "Meena Kumari",
    method: "Net Banking",
    time: "11:00 AM",
    date: "Today",
  },
  {
    id: 4,
    type: "debit",
    amount: 450000,
    party: "Sri Builders",
    method: "NEFT",
    time: "5:00 PM",
    date: "Yesterday",
  },
  {
    id: 5,
    type: "credit",
    amount: 1230000,
    party: "Priya Reddy",
    method: "RTGS",
    time: "3:00 PM",
    date: "Yesterday",
  },
  {
    id: 6,
    type: "debit",
    amount: 145000,
    party: "Cement Traders",
    method: "NEFT",
    time: "10:00 AM",
    date: "Yesterday",
  },
]

export default function FinanceDashboardPage() {
  const [selectedCollections, setSelectedCollections] = React.useState<number[]>([])
  const [isMounted, setIsMounted] = React.useState(false)
  
  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  const [selectedPayables, setSelectedPayables] = React.useState<number[]>([])
  const [period, setPeriod] = React.useState("this-month")
  const [dateRangePreset, setDateRangePreset] = React.useState<DateRangePreset>("this_month")
  const [dateRange, setDateRange] = React.useState<DateRange | null>(null)
  const { aiEnabled } = useAI()

  const toggleCollection = (id: number) => {
    setSelectedCollections((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const togglePayable = (id: number) => {
    setSelectedPayables((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const getStatusBadge = (status: string, overdueDays?: number) => {
    switch (status) {
      case "overdue":
        return (
          <Badge variant="destructive" className="text-xs">
            {overdueDays}d Overdue
          </Badge>
        )
      case "due":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs">
            Due Soon
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="secondary" className="text-xs">
            Upcoming
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
            Approved
          </Badge>
        )
      default:
        return null
    }
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce(
    (acc, txn) => {
      if (!acc[txn.date]) {
        acc[txn.date] = []
      }
      acc[txn.date].push(txn)
      return acc
    },
    {} as Record<string, typeof transactions>
  )

  return (
    <DashboardLayout>
      <div className={`space-y-6 ${isMounted ? 'dashboard-fade-in' : ''}`}>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Finance Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Track collections, payments, and cash flow
            </p>
          </div>
          <DateRangePicker
            value={dateRangePreset}
            onChange={(preset, range) => {
              setDateRangePreset(preset)
              setDateRange(range)
            }}
          />
        </div>

        {/* AI Insights - Only shown when AI is enabled */}
        {aiEnabled && (
          <FinanceAIPredictions />
        )}

        {/* Stats Row */}
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 ${isMounted ? 'dashboard-slide-up dashboard-stagger-1' : ''}`}>
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className={cn("border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300", stat.borderColor)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {stat.title}
                    </p>
                    <p className="text-xl font-bold text-foreground mb-1">
                      {stat.isPositive && "+"}
                      {formatCurrency(stat.value)}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                    {stat.change !== null && (
                      <p className={cn(
                        "text-xs font-medium flex items-center gap-1 mt-1",
                        stat.changeType === "positive"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      )}>
                        {stat.changeType === "positive" ? (
                          <TrendingUp className="size-3" />
                        ) : (
                          <TrendingDown className="size-3" />
                        )}
                        {stat.change}%
                      </p>
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg shrink-0",
                      stat.bgColor
                    )}
                  >
                    <stat.icon className={cn("size-5", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collections and Payables Row */}
        <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${isMounted ? 'dashboard-slide-up dashboard-stagger-2' : ''}`}>
          {/* Customer Collections */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-green-100">
                    <Wallet className="size-4 text-green-600" />
                  </div>
                  <CardTitle className="text-base">Customer Collections</CardTitle>
                </div>
                <Select defaultValue="this-month">
                  <SelectTrigger className="w-[130px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="next-month">Next Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Collection Efficiency */}
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Collection Efficiency</span>
                  <span className="text-sm font-semibold">87%</span>
                </div>
                <Progress value={87} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Target: 90%</p>
              </div>

              {/* Collections Table */}
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-8">
                        <Checkbox
                          checked={selectedCollections.length === collections.filter(c => c.status !== "upcoming").length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCollections(collections.filter(c => c.status !== "upcoming").map(c => c.id))
                            } else {
                              setSelectedCollections([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead className="text-xs">Customer</TableHead>
                      <TableHead className="text-xs">Project</TableHead>
                      <TableHead className="text-xs text-right">Amount</TableHead>
                      <TableHead className="text-xs">Due Date</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {collections.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.status !== "upcoming" && (
                            <Checkbox
                              checked={selectedCollections.includes(item.id)}
                              onCheckedChange={() => toggleCollection(item.id)}
                            />
                          )}
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {item.customer}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {item.project}
                        </TableCell>
                        <TableCell className="text-sm font-medium text-right">
                          {formatCurrency(item.amount)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {item.dueDate}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(item.status, item.overdueDays)}
                        </TableCell>
                        <TableCell>
                          {item.status !== "upcoming" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7"
                            >
                              <Mail className="size-3.5 text-muted-foreground" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  disabled={selectedCollections.length === 0}
                >
                  <Mail className="size-3.5 mr-1.5" />
                  Send Bulk Reminder
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="size-3.5 mr-1.5" />
                  Export
                </Button>
                <Button variant="link" size="sm" className="ml-auto text-primary">
                  View All Receivables
                  <ArrowRight className="size-3.5 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Payables */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100">
                  <Building2 className="size-4 text-orange-600" />
                </div>
                <CardTitle className="text-base">Vendor Payments Due</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payables Table */}
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-8">
                        <Checkbox
                          checked={selectedPayables.length === payables.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPayables(payables.map(p => p.id))
                            } else {
                              setSelectedPayables([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead className="text-xs">Vendor</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                      <TableHead className="text-xs text-right">Amount</TableHead>
                      <TableHead className="text-xs">Project</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs w-16"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payables.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedPayables.includes(item.id)}
                            onCheckedChange={() => togglePayable(item.id)}
                          />
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {item.vendor}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-right">
                          {formatCurrency(item.amount)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {item.project}
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant={item.status === "approved" ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "h-7 text-xs",
                              item.status !== "approved" && "bg-transparent"
                            )}
                          >
                            <CreditCard className="size-3 mr-1" />
                            Pay
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  disabled={selectedPayables.length === 0}
                >
                  <CheckCircle2 className="size-3.5 mr-1.5" />
                  Approve Selected
                </Button>
                <Button
                  size="sm"
                  disabled={selectedPayables.length === 0}
                >
                  <CreditCard className="size-3.5 mr-1.5" />
                  Process Payments
                </Button>
                <Button variant="link" size="sm" className="ml-auto text-primary">
                  View All Payables
                  <ArrowRight className="size-3.5 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100">
                  <Receipt className="size-4 text-blue-600" />
                </div>
                <CardTitle className="text-base">Recent Transactions</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[100px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="credits">Credits</SelectItem>
                    <SelectItem value="debits">Debits</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="size-3.5 mr-1.5" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedTransactions).map(([date, txns]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {date}
                    </span>
                  </div>
                  <div className="space-y-2 pl-6 border-l-2 border-muted ml-2">
                    {txns.map((txn) => (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex size-8 items-center justify-center rounded-full",
                              txn.type === "credit"
                                ? "bg-green-100"
                                : "bg-red-100"
                            )}
                          >
                            {txn.type === "credit" ? (
                              <ArrowDownRight className="size-4 text-green-600" />
                            ) : (
                              <ArrowUpRight className="size-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {formatCurrency(txn.amount)}{" "}
                              <span className="font-normal text-muted-foreground">
                                {txn.type === "credit"
                                  ? "received from"
                                  : "paid to"}{" "}
                                {txn.party}
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {txn.method}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {txn.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="link" className="mt-4 text-primary">
              View All Transactions
              <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
