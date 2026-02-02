"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  Receipt,
  Search,
  Filter,
  Download,
  Plus,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  User,
  Calendar,
  FileText,
  MoreHorizontal,
  Eye,
  Send,
  Printer,
  Copy,
  Mail,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Mock data for invoices
const invoices = [
  {
    id: "INV-2024-001",
    customer: "Ramesh Kumar",
    project: "Villa Construction - Whitefield",
    issueDate: "2024-01-10",
    dueDate: "2024-01-25",
    amount: 500000,
    paidAmount: 500000,
    status: "paid",
    items: 5,
    email: "ramesh.kumar@email.com",
  },
  {
    id: "INV-2024-002",
    customer: "Priya Sharma",
    project: "Duplex House - Koramangala",
    issueDate: "2024-01-12",
    dueDate: "2024-01-27",
    amount: 750000,
    paidAmount: 375000,
    status: "partial",
    items: 8,
    email: "priya.sharma@email.com",
  },
  {
    id: "INV-2024-003",
    customer: "Anil Reddy",
    project: "Office Space - Indiranagar",
    issueDate: "2024-01-05",
    dueDate: "2024-01-20",
    amount: 1200000,
    paidAmount: 0,
    status: "overdue",
    items: 12,
    email: "anil.reddy@email.com",
  },
  {
    id: "INV-2024-004",
    customer: "Meera Joshi",
    project: "Residential Villa - Sarjapur",
    issueDate: "2024-01-14",
    dueDate: "2024-01-29",
    amount: 850000,
    paidAmount: 0,
    status: "pending",
    items: 6,
    email: "meera.joshi@email.com",
  },
  {
    id: "INV-2024-005",
    customer: "Suresh Patel",
    project: "Apartment Complex - HSR Layout",
    issueDate: "2024-01-08",
    dueDate: "2024-01-23",
    amount: 2500000,
    paidAmount: 2500000,
    status: "paid",
    items: 15,
    email: "suresh.patel@email.com",
  },
  {
    id: "INV-2024-006",
    customer: "Lakshmi Venkat",
    project: "Commercial Building - MG Road",
    issueDate: "2024-01-15",
    dueDate: "2024-01-30",
    amount: 1800000,
    paidAmount: 0,
    status: "draft",
    items: 10,
    email: "lakshmi.venkat@email.com",
  },
  {
    id: "INV-2024-007",
    customer: "Vikram Singh",
    project: "Row House - Electronic City",
    issueDate: "2024-01-11",
    dueDate: "2024-01-26",
    amount: 650000,
    paidAmount: 650000,
    status: "paid",
    items: 7,
    email: "vikram.singh@email.com",
  },
  {
    id: "INV-2024-008",
    customer: "Anjali Desai",
    project: "Farmhouse - Devanahalli",
    issueDate: "2024-01-13",
    dueDate: "2024-01-28",
    amount: 950000,
    paidAmount: 500000,
    status: "partial",
    items: 9,
    email: "anjali.desai@email.com",
  },
]

const statusConfig = {
  paid: { label: "Paid", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  partial: { label: "Partial", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Clock },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle },
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400", icon: FileText },
}

export default function InvoicesPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Export invoices to CSV
  const handleExport = () => {
    const headers = ["Invoice ID", "Customer", "Project", "Issue Date", "Due Date", "Amount", "Paid Amount", "Status", "Email"]
    const csvData = invoices.map(inv => [
      inv.id,
      inv.customer,
      inv.project,
      inv.issueDate,
      inv.dueDate,
      inv.amount,
      inv.paidAmount,
      inv.status,
      inv.email
    ])
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `invoices_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Export Successful",
      description: "Invoices data has been exported to CSV file.",
    })
  }

  // Calculate summary stats
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
  const totalPending = invoices
    .filter(inv => inv.status === "pending" || inv.status === "partial")
    .reduce((sum, inv) => sum + (inv.amount - inv.paidAmount), 0)
  const totalOverdue = invoices
    .filter(inv => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0)

  // Helper function to check if date is within range
  const isDateInRange = (dateStr: string, range: string): boolean => {
    if (range === "all") return true
    
    const date = new Date(dateStr)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    switch (range) {
      case "week": {
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return date >= weekAgo && date <= today
      }
      case "month": {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        return date >= monthStart && date <= today
      }
      case "quarter": {
        const quarter = Math.floor(now.getMonth() / 3)
        const quarterStart = new Date(now.getFullYear(), quarter * 3, 1)
        return date >= quarterStart && date <= today
      }
      default:
        return true
    }
  }

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter
    const matchesDateRange = isDateInRange(inv.issueDate, dateRange)
    return matchesSearch && matchesStatus && matchesDateRange
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

  const getPaymentProgress = (paid: number, total: number) => {
    return Math.round((paid / total) * 100)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track all customer invoices
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" className="gap-2 bg-[hsl(var(--hover-bg))] text-foreground">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Invoice</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Receipt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Invoiced</p>
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(totalInvoiced)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Paid</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(totalPaid)}
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
                  {formatCurrency(totalPending)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Overdue</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(totalOverdue)}
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
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden items-center gap-2 md:flex">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
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
                  <SheetTitle>Filter Invoices</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
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
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
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

      {/* Invoices Table (Desktop) */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Progress</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => {
                const StatusIcon = statusConfig[inv.status as keyof typeof statusConfig].icon
                const progress = getPaymentProgress(inv.paidAmount, inv.amount)
                return (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                          <Receipt className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{inv.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {inv.items} items • {formatDate(inv.issueDate)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{inv.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground line-clamp-1">{inv.project}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{formatDate(inv.dueDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("gap-1", statusConfig[inv.status as keyof typeof statusConfig].color)}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[inv.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{progress}%</span>
                          <span className="text-muted-foreground">
                            {formatCurrency(inv.paidAmount)}
                          </span>
                        </div>
                        <Progress 
                          value={progress} 
                          className={cn(
                            "h-1.5",
                            progress === 100 ? "[&>div]:bg-emerald-500" :
                            progress > 0 ? "[&>div]:bg-blue-500" : "[&>div]:bg-gray-300"
                          )}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-foreground">
                        {formatCurrency(inv.amount)}
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
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
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

      {/* Invoices Cards (Mobile) */}
      <div className="flex flex-col gap-3 md:hidden">
        {invoices.map((inv) => {
          const StatusIcon = statusConfig[inv.status as keyof typeof statusConfig].icon
          const progress = getPaymentProgress(inv.paidAmount, inv.amount)
          return (
            <Card key={inv.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Receipt className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{inv.id}</p>
                      <p className="text-xs text-muted-foreground">{inv.customer}</p>
                    </div>
                  </div>
                  <Badge className={cn("gap-1 text-xs", statusConfig[inv.status as keyof typeof statusConfig].color)}>
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig[inv.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                
                <p className="mt-3 text-sm text-muted-foreground line-clamp-1">{inv.project}</p>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Payment Progress ({progress}%)</span>
                    <span className="font-medium">{formatCurrency(inv.paidAmount)} / {formatCurrency(inv.amount)}</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={cn(
                      "h-2",
                      progress === 100 ? "[&>div]:bg-emerald-500" :
                      progress > 0 ? "[&>div]:bg-blue-500" : "[&>div]:bg-gray-300"
                    )}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    Due: {formatDate(inv.dueDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {invoices.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Receipt className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-foreground">No invoices found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  )
}
