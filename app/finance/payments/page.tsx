"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  DollarSign,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  User,
  Calendar,
  CreditCard,
  Banknote,
  MoreHorizontal,
  Eye,
  FileText,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Mock data for transactions
const transactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    type: "incoming",
    description: "Customer Payment - Ramesh Kumar",
    project: "Villa Construction - Whitefield",
    category: "Milestone Payment",
    amount: 250000,
    status: "completed",
    paymentMethod: "Bank Transfer",
    reference: "NEFT/2024/001234",
  },
  {
    id: "TXN-002",
    date: "2024-01-14",
    type: "outgoing",
    description: "Vendor Payment - Steel Suppliers Ltd",
    project: "Apartment Complex - HSR Layout",
    category: "Material Purchase",
    amount: 180000,
    status: "completed",
    paymentMethod: "RTGS",
    reference: "RTGS/2024/005678",
  },
  {
    id: "TXN-003",
    date: "2024-01-14",
    type: "incoming",
    description: "Customer Payment - Priya Sharma",
    project: "Duplex House - Koramangala",
    category: "Advance Payment",
    amount: 500000,
    status: "completed",
    paymentMethod: "Cheque",
    reference: "CHQ/2024/789012",
  },
  {
    id: "TXN-004",
    date: "2024-01-13",
    type: "outgoing",
    description: "Contractor Payment - BuildRight Services",
    project: "Villa Construction - Whitefield",
    category: "Labour Charges",
    amount: 75000,
    status: "pending",
    paymentMethod: "Bank Transfer",
    reference: "NEFT/2024/003456",
  },
  {
    id: "TXN-005",
    date: "2024-01-12",
    type: "outgoing",
    description: "Vendor Payment - Cement World",
    project: "Commercial Building - MG Road",
    category: "Material Purchase",
    amount: 120000,
    status: "failed",
    paymentMethod: "RTGS",
    reference: "RTGS/2024/007890",
  },
  {
    id: "TXN-006",
    date: "2024-01-12",
    type: "incoming",
    description: "Customer Payment - Anil Reddy",
    project: "Office Space - Indiranagar",
    category: "Final Settlement",
    amount: 850000,
    status: "completed",
    paymentMethod: "Bank Transfer",
    reference: "NEFT/2024/004567",
  },
  {
    id: "TXN-007",
    date: "2024-01-11",
    type: "outgoing",
    description: "Equipment Rental - Crane Services",
    project: "Apartment Complex - HSR Layout",
    category: "Equipment",
    amount: 45000,
    status: "completed",
    paymentMethod: "UPI",
    reference: "UPI/2024/123456",
  },
  {
    id: "TXN-008",
    date: "2024-01-10",
    type: "incoming",
    description: "Customer Payment - Meera Joshi",
    project: "Residential Villa - Sarjapur",
    category: "Milestone Payment",
    amount: 300000,
    status: "completed",
    paymentMethod: "Bank Transfer",
    reference: "NEFT/2024/005678",
  },
]

const statusConfig = {
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  failed: { label: "Failed", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
}

const paymentMethodIcons = {
  "Bank Transfer": Banknote,
  "RTGS": Building2,
  "Cheque": FileText,
  "UPI": CreditCard,
}

export default function PaymentsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Export transactions to CSV
  const handleExport = () => {
    const headers = ["ID", "Date", "Type", "Description", "Project", "Category", "Amount", "Status", "Payment Method", "Reference"]
    const csvData = transactions.map(t => [
      t.id,
      t.date,
      t.type,
      t.description,
      t.project,
      t.category,
      t.amount,
      t.status,
      t.paymentMethod,
      t.reference
    ])
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `payments_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Export Successful",
      description: "Payments data has been exported to CSV file.",
    })
  }

  // Calculate summary stats
  const totalIncoming = transactions
    .filter(t => t.type === "incoming" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalOutgoing = transactions
    .filter(t => t.type === "outgoing" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)
  
  const pendingAmount = transactions
    .filter(t => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0)

  // Helper function to check if date is within range
  const isDateInRange = (dateStr: string, range: string): boolean => {
    if (range === "all") return true
    
    const date = new Date(dateStr)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    switch (range) {
      case "today": {
        return date.getTime() === today.getTime()
      }
      case "week": {
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return date >= weekAgo && date <= today
      }
      case "month": {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        return date >= monthStart && date <= today
      }
      default:
        return true
    }
  }

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || t.status === statusFilter
    const matchesType = typeFilter === "all" || t.type === typeFilter
    const matchesDateRange = isDateInRange(t.date, dateRange)
    return matchesSearch && matchesStatus && matchesType && matchesDateRange
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payments</h1>
            <p className="text-sm text-muted-foreground">
              Track all incoming and outgoing transactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" className="gap-2 bg-[hsl(var(--hover-bg))] text-foreground">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Sync</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <ArrowDownLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Received</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(totalIncoming)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                  <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Paid</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(totalOutgoing)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {formatCurrency(pendingAmount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Net Balance</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(totalIncoming - totalOutgoing)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden items-center gap-2 md:flex">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="incoming">Incoming</SelectItem>
                    <SelectItem value="outgoing">Outgoing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 md:hidden bg-transparent">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Transactions</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium">Transaction Type</label>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="incoming">Incoming</SelectItem>
                          <SelectItem value="outgoing">Outgoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date Range</label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => setIsFilterOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table (Desktop) */}
        <Card className="hidden md:block">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => {
                  const StatusIcon = statusConfig[txn.status as keyof typeof statusConfig].icon
                  const MethodIcon = paymentMethodIcons[txn.paymentMethod as keyof typeof paymentMethodIcons] || CreditCard
                  return (
                    <TableRow key={txn.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full",
                            txn.type === "incoming" 
                              ? "bg-emerald-100 dark:bg-emerald-900/30" 
                              : "bg-red-100 dark:bg-red-900/30"
                          )}>
                            {txn.type === "incoming" ? (
                              <ArrowDownLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{txn.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {txn.id} • {formatDate(txn.date)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground">{txn.project}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {txn.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MethodIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{txn.paymentMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("gap-1", statusConfig[txn.status as keyof typeof statusConfig].color)}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[txn.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={cn(
                          "font-semibold",
                          txn.type === "incoming" 
                            ? "text-emerald-600 dark:text-emerald-400" 
                            : "text-red-600 dark:text-red-400"
                        )}>
                          {txn.type === "incoming" ? "+" : "-"}{formatCurrency(txn.amount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Download Receipt
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Transactions Cards (Mobile) */}
        <div className="flex flex-col gap-3 md:hidden">
          {transactions.map((txn) => {
            const StatusIcon = statusConfig[txn.status as keyof typeof statusConfig].icon
            return (
              <Card key={txn.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        txn.type === "incoming" 
                          ? "bg-emerald-100 dark:bg-emerald-900/30" 
                          : "bg-red-100 dark:bg-red-900/30"
                      )}>
                        {txn.type === "incoming" ? (
                          <ArrowDownLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{txn.description}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(txn.date)}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "font-semibold",
                      txn.type === "incoming" 
                        ? "text-emerald-600 dark:text-emerald-400" 
                        : "text-red-600 dark:text-red-400"
                    )}>
                      {txn.type === "incoming" ? "+" : "-"}{formatCurrency(txn.amount)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-normal">
                        {txn.category}
                      </Badge>
                      <Badge className={cn("gap-1 text-xs", statusConfig[txn.status as keyof typeof statusConfig].color)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[txn.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {transactions.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <DollarSign className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-foreground">No transactions found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
