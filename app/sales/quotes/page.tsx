"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Send,
  Trash2,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// Quote status configuration
const statusConfig = {
  draft: {
    label: "Draft",
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    icon: FileText,
  },
  sent: {
    label: "Sent",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: Send,
  },
  viewed: {
    label: "Viewed",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    icon: Eye,
  },
  accepted: {
    label: "Accepted",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: CheckCircle2,
  },
  expired: {
    label: "Expired",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    icon: Clock,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: XCircle,
  },
}

type QuoteStatus = keyof typeof statusConfig

interface Quote {
  id: string
  quoteNumber: string
  customerName: string
  customerPhone: string
  projectType: string
  plotArea: number
  builtUpArea: number
  package: string
  totalAmount: number
  status: QuoteStatus
  createdAt: string
  validUntil: string
  createdBy: string
}

// Sample data
const quotes: Quote[] = [
  {
    id: "Q001",
    quoteNumber: "WH-2026-0001",
    customerName: "Rajesh Kumar",
    customerPhone: "9876543210",
    projectType: "G+2",
    plotArea: 2400,
    builtUpArea: 4200,
    package: "Gold",
    totalAmount: 8400000,
    status: "sent",
    createdAt: "2026-01-25",
    validUntil: "2026-02-24",
    createdBy: "Rahul Sharma",
  },
  {
    id: "Q002",
    quoteNumber: "WH-2026-0002",
    customerName: "Sunitha Reddy",
    customerPhone: "8765432109",
    projectType: "Apartment",
    plotArea: 1800,
    builtUpArea: 1500,
    package: "Silver",
    totalAmount: 2700000,
    status: "accepted",
    createdAt: "2026-01-24",
    validUntil: "2026-02-23",
    createdBy: "Rahul Sharma",
  },
  {
    id: "Q003",
    quoteNumber: "WH-2026-0003",
    customerName: "Venkat Rao",
    customerPhone: "7654321098",
    projectType: "Villa",
    plotArea: 3200,
    builtUpArea: 3800,
    package: "Gold",
    totalAmount: 7600000,
    status: "viewed",
    createdAt: "2026-01-23",
    validUntil: "2026-02-22",
    createdBy: "Priya Menon",
  },
  {
    id: "Q004",
    quoteNumber: "WH-2026-0004",
    customerName: "Anil Kumar",
    customerPhone: "6543210987",
    projectType: "G+2",
    plotArea: 2000,
    builtUpArea: 3600,
    package: "Bronze",
    totalAmount: 5400000,
    status: "draft",
    createdAt: "2026-01-22",
    validUntil: "2026-02-21",
    createdBy: "Rahul Sharma",
  },
  {
    id: "Q005",
    quoteNumber: "WH-2026-0005",
    customerName: "Meena Sharma",
    customerPhone: "5432109876",
    projectType: "G+1",
    plotArea: 1600,
    builtUpArea: 2400,
    package: "Silver",
    totalAmount: 4320000,
    status: "expired",
    createdAt: "2026-01-10",
    validUntil: "2026-01-25",
    createdBy: "Priya Menon",
  },
  {
    id: "Q006",
    quoteNumber: "WH-2026-0006",
    customerName: "Ravi Teja",
    customerPhone: "4321098765",
    projectType: "G+1",
    plotArea: 1400,
    builtUpArea: 2100,
    package: "Bronze",
    totalAmount: 3150000,
    status: "rejected",
    createdAt: "2026-01-15",
    validUntil: "2026-02-14",
    createdBy: "Rahul Sharma",
  },
]

function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)}Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function QuotesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [selectedQuotes, setSelectedQuotes] = React.useState<string[]>([])

  // Filter quotes
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const stats = {
    total: quotes.length,
    draft: quotes.filter((q) => q.status === "draft").length,
    sent: quotes.filter((q) => q.status === "sent").length,
    accepted: quotes.filter((q) => q.status === "accepted").length,
    totalValue: quotes.reduce((sum, q) => sum + q.totalAmount, 0),
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedQuotes(filteredQuotes.map((q) => q.id))
    } else {
      setSelectedQuotes([])
    }
  }

  const handleSelectQuote = (quoteId: string, checked: boolean) => {
    if (checked) {
      setSelectedQuotes([...selectedQuotes, quoteId])
    } else {
      setSelectedQuotes(selectedQuotes.filter((id) => id !== quoteId))
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Quotes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage customer quotes
            </p>
          </div>
          <Button onClick={() => router.push("/sales/quotes/new")}>
            <Plus className="size-4 mr-2" />
            Create Quote
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Quotes</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Drafts</p>
              <p className="text-2xl font-bold text-slate-600">{stats.draft}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Sent</p>
              <p className="text-2xl font-bold text-blue-600">{stats.sent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Accepted</p>
              <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search quotes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Bulk Actions */}
        {selectedQuotes.length > 0 && (
          <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">
              {selectedQuotes.length} selected
            </span>
            <Button variant="outline" size="sm">
              <Send className="size-4 mr-2" />
              Send Selected
            </Button>
            <Button variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              Export Selected
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedQuotes([])}
            >
              Clear
            </Button>
          </div>
        )}

        {/* Quotes Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedQuotes.length === filteredQuotes.length &&
                        filteredQuotes.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Quote #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => {
                  const status = statusConfig[quote.status]
                  const StatusIcon = status.icon
                  return (
                    <TableRow key={quote.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedQuotes.includes(quote.id)}
                          onCheckedChange={(checked) =>
                            handleSelectQuote(quote.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/sales/quotes/${quote.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {quote.quoteNumber}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{quote.customerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {quote.customerPhone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{quote.projectType}</p>
                          <p className="text-xs text-muted-foreground">
                            {quote.builtUpArea} sq.ft
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            quote.package === "Gold" &&
                              "bg-yellow-100 text-yellow-700",
                            quote.package === "Silver" &&
                              "bg-slate-100 text-slate-700",
                            quote.package === "Bronze" &&
                              "bg-orange-100 text-orange-700"
                          )}
                        >
                          {quote.package}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(quote.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(status.bgColor, status.color)}
                        >
                          <StatusIcon className="size-3 mr-1" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(quote.validUntil)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="size-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="size-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="size-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="size-4 mr-2" />
                              Send to Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="size-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="size-4 mr-2" />
                              Delete
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

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredQuotes.length} of {quotes.length} quotes
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-[hsl(var(--hover-bg))] text-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
