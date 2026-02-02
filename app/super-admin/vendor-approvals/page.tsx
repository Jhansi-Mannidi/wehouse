"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  Search,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Star,
  AlertTriangle,
  TrendingUp,
  Users,
  CheckSquare,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { calculateRiskLevel, generateVendorCode } from "@/lib/vendor-types"

// Sample data for pending approvals
const sampleApprovals = [
  {
    id: "VND-HYD-2026-0001",
    companyName: "ABC Steel Suppliers Pvt Ltd",
    vendorType: "Fixed" as const,
    categories: ["Iron / Steel", "Aggregates"],
    cityName: "Hyderabad",
    cityCode: "HYD",
    qaScore: 4.2,
    daysInProcess: 5,
    creditLimit: 500000,
    paymentTerms: "30 Days",
    submittedAt: "2026-01-26",
    qaApprovedAt: "2026-01-28",
    forwardedAt: "2026-01-29",
  },
  {
    id: "VND-BLR-2026-0003",
    companyName: "XYZ Electrical Solutions",
    vendorType: "Temporary" as const,
    categories: ["Electrical Materials"],
    cityName: "Bangalore",
    cityCode: "BLR",
    qaScore: 3.8,
    daysInProcess: 7,
    creditLimit: 200000,
    paymentTerms: "15 Days",
    submittedAt: "2026-01-24",
    qaApprovedAt: "2026-01-27",
    forwardedAt: "2026-01-28",
  },
  {
    id: "VND-HYD-2026-0005",
    companyName: "PQR Plumbing Works",
    vendorType: "Fixed" as const,
    categories: ["Plumbing Materials", "Hardware & Fixtures"],
    cityName: "Hyderabad",
    cityCode: "HYD",
    qaScore: 4.5,
    daysInProcess: 3,
    creditLimit: 350000,
    paymentTerms: "30 Days",
    submittedAt: "2026-01-28",
    qaApprovedAt: "2026-01-29",
    forwardedAt: "2026-01-30",
  },
  {
    id: "VND-CHN-2026-0002",
    companyName: "Chennai Cement Traders",
    vendorType: "Fixed" as const,
    categories: ["Cement", "Sand"],
    cityName: "Chennai",
    cityCode: "CHN",
    qaScore: 4.0,
    daysInProcess: 6,
    creditLimit: 800000,
    paymentTerms: "45 Days",
    submittedAt: "2026-01-25",
    qaApprovedAt: "2026-01-28",
    forwardedAt: "2026-01-29",
  },
  {
    id: "VND-MUM-2026-0004",
    companyName: "Mumbai Tiles & Flooring",
    vendorType: "Temporary" as const,
    categories: ["Tiles & Flooring"],
    cityName: "Mumbai",
    cityCode: "MUM",
    qaScore: 3.5,
    daysInProcess: 8,
    creditLimit: 150000,
    paymentTerms: "7 Days",
    submittedAt: "2026-01-23",
    qaApprovedAt: "2026-01-26",
    forwardedAt: "2026-01-27",
  },
  {
    id: "VND-PUN-2026-0006",
    companyName: "Pune Paints & Finishes",
    vendorType: "Fixed" as const,
    categories: ["Paints & Finishes"],
    cityName: "Pune",
    cityCode: "PUN",
    qaScore: 4.3,
    daysInProcess: 4,
    creditLimit: 400000,
    paymentTerms: "30 Days",
    submittedAt: "2026-01-27",
    qaApprovedAt: "2026-01-29",
    forwardedAt: "2026-01-30",
  },
  {
    id: "VND-HYD-2026-0007",
    companyName: "Kavitha Wood Works",
    vendorType: "Fixed" as const,
    categories: ["Wood & Plywood"],
    cityName: "Hyderabad",
    cityCode: "HYD",
    qaScore: 4.1,
    daysInProcess: 5,
    creditLimit: 300000,
    paymentTerms: "30 Days",
    submittedAt: "2026-01-26",
    qaApprovedAt: "2026-01-28",
    forwardedAt: "2026-01-29",
  },
  {
    id: "VND-BLR-2026-0008",
    companyName: "Bangalore Aggregates Co",
    vendorType: "Temporary" as const,
    categories: ["Aggregates", "Sand"],
    cityName: "Bangalore",
    cityCode: "BLR",
    qaScore: 3.9,
    daysInProcess: 6,
    creditLimit: 250000,
    paymentTerms: "15 Days",
    submittedAt: "2026-01-25",
    qaApprovedAt: "2026-01-27",
    forwardedAt: "2026-01-28",
  },
]

// Sample approved vendors
const approvedVendors = [
  {
    id: "VND-HYD-FIX-001",
    vendorCode: "VND-HYD-FIX-001",
    companyName: "Reliable Steel Corp",
    vendorType: "Fixed" as const,
    categories: ["Iron / Steel"],
    cityName: "Hyderabad",
    creditLimit: 600000,
    status: "Active" as const,
    onboardedAt: "2026-01-20",
  },
  {
    id: "VND-BLR-TMP-001",
    vendorCode: "VND-BLR-TMP-001",
    companyName: "Quick Electrical Supplies",
    vendorType: "Temporary" as const,
    categories: ["Electrical Materials"],
    cityName: "Bangalore",
    creditLimit: 100000,
    status: "Active" as const,
    onboardedAt: "2026-01-18",
  },
  {
    id: "VND-CHN-FIX-001",
    vendorCode: "VND-CHN-FIX-001",
    companyName: "South India Cement",
    vendorType: "Fixed" as const,
    categories: ["Cement"],
    cityName: "Chennai",
    creditLimit: 1000000,
    status: "Active" as const,
    onboardedAt: "2026-01-15",
  },
]

// Sample rejected vendors
const rejectedVendors = [
  {
    id: "VND-MUM-2026-0001",
    companyName: "Low Quality Suppliers",
    vendorType: "Temporary" as const,
    categories: ["Hardware & Fixtures"],
    cityName: "Mumbai",
    qaScore: 2.8,
    rejectedAt: "2026-01-22",
    reason: "Quality standards not met",
  },
]

// City-wise stats
const cityStats = [
  { city: "Hyderabad", code: "HYD", pending: 3, approved: 12, rejected: 1 },
  { city: "Bangalore", code: "BLR", pending: 2, approved: 8, rejected: 0 },
  { city: "Chennai", code: "CHN", pending: 1, approved: 6, rejected: 1 },
  { city: "Mumbai", code: "MUM", pending: 1, approved: 4, rejected: 2 },
  { city: "Pune", code: "PUN", pending: 1, approved: 3, rejected: 0 },
]

export default function SuperAdminVendorApprovalsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("pending")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [cityFilter, setCityFilter] = React.useState("all")
  const [riskFilter, setRiskFilter] = React.useState("all")
  const [selectedVendors, setSelectedVendors] = React.useState<string[]>([])
  const [showBulkApproveDialog, setShowBulkApproveDialog] = React.useState(false)
  const [bulkApproveRemarks, setBulkApproveRemarks] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)

  // Filter pending approvals
  const filteredPending = sampleApprovals.filter((vendor) => {
    const matchesSearch =
      vendor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = cityFilter === "all" || vendor.cityCode === cityFilter
    const riskLevel = calculateRiskLevel(vendor.qaScore)
    const matchesRisk = riskFilter === "all" || riskLevel === riskFilter
    return matchesSearch && matchesCity && matchesRisk
  })

  // Stats calculations
  const stats = {
    pending: sampleApprovals.length,
    approvedToday: 3,
    rejected: rejectedVendors.length,
    avgDays: (sampleApprovals.reduce((sum, v) => sum + v.daysInProcess, 0) / sampleApprovals.length).toFixed(1),
  }

  // Toggle vendor selection
  const toggleVendorSelection = (id: string) => {
    setSelectedVendors((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  // Select all eligible for bulk (score >= 4.0, max 10)
  const selectAllEligible = () => {
    const eligible = filteredPending
      .filter((v) => v.qaScore >= 4.0)
      .slice(0, 10)
      .map((v) => v.id)
    setSelectedVendors(eligible)
  }

  // Clear selection
  const clearSelection = () => {
    setSelectedVendors([])
  }

  // Handle bulk approval
  const handleBulkApprove = async () => {
    if (bulkApproveRemarks.length < 20) {
      toast.error("Please provide remarks (minimum 20 characters)")
      return
    }
    
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast.success(`${selectedVendors.length} vendors approved successfully`)
    setShowBulkApproveDialog(false)
    setBulkApproveRemarks("")
    setSelectedVendors([])
    setIsProcessing(false)
  }

  // Get risk badge
  const getRiskBadge = (qaScore: number) => {
    const risk = calculateRiskLevel(qaScore)
    const config = {
      Low: { bg: "bg-emerald-500/10 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30" },
      Medium: { bg: "bg-yellow-500/10 dark:bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-400", border: "border-yellow-500/30" },
      High: { bg: "bg-red-500/10 dark:bg-red-500/20", text: "text-red-600 dark:text-red-400", border: "border-red-500/30" },
    }
    return (
      <Badge variant="outline" className={cn("text-xs border", config[risk].bg, config[risk].text, config[risk].border)}>
        {risk} Risk
      </Badge>
    )
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Approvals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and approve vendor applications forwarded by City Admin
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="size-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.approvedToday}</p>
                  <p className="text-xs text-muted-foreground">Approved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <XCircle className="size-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <TrendingUp className="size-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.avgDays}</p>
                  <p className="text-xs text-muted-foreground">Avg Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* City-wise Breakdown */}
        <Card className="mb-6 bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="size-4" />
              City-wise Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {cityStats.map((city) => (
                <button
                  key={city.code}
                  onClick={() => setCityFilter(cityFilter === city.code ? "all" : city.code)}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-colors text-left",
                    cityFilter === city.code
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <p className="font-medium text-sm text-foreground">{city.city}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-yellow-600 dark:text-yellow-400">{city.pending} pending</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{city.approved} approved</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="pending" className="data-[state=active]:bg-background">
                Pending ({sampleApprovals.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="data-[state=active]:bg-background">
                Approved ({approvedVendors.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-background">
                Rejected ({rejectedVendors.length})
              </TabsTrigger>
            </TabsList>

            {activeTab === "pending" && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[200px] bg-background"
                  />
                </div>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-[130px] bg-background">
                    <Filter className="size-4 mr-2" />
                    <SelectValue placeholder="Risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk</SelectItem>
                    <SelectItem value="Low">Low Risk</SelectItem>
                    <SelectItem value="Medium">Medium Risk</SelectItem>
                    <SelectItem value="High">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Pending Tab */}
          <TabsContent value="pending" className="mt-0">
            {/* Bulk Actions */}
            {selectedVendors.length > 0 && (
              <div className="mb-4 p-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{selectedVendors.length}</span> vendor(s) selected
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={clearSelection} className="bg-transparent">
                    Clear
                  </Button>
                  <Button size="sm" onClick={() => setShowBulkApproveDialog(true)}>
                    <CheckSquare className="size-4 mr-2" />
                    Bulk Approve
                  </Button>
                </div>
              </div>
            )}

            {selectedVendors.length === 0 && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredPending.filter((v) => v.qaScore >= 4.0).length} vendors eligible for bulk approval (QA Score 4.0+)
                </p>
                <Button variant="outline" size="sm" onClick={selectAllEligible} className="bg-transparent">
                  Select All Eligible
                </Button>
              </div>
            )}

            {/* Desktop Table */}
            <div className="hidden md:block">
              <Card className="bg-card border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedVendors.length === filteredPending.length && filteredPending.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedVendors(filteredPending.map((v) => v.id))
                            } else {
                              setSelectedVendors([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead className="text-center">QA Score</TableHead>
                      <TableHead className="text-center">Risk</TableHead>
                      <TableHead className="text-right">Credit Limit</TableHead>
                      <TableHead className="text-center">Days</TableHead>
                      <TableHead className="w-[50px]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPending.map((vendor) => (
                      <TableRow
                        key={vendor.id}
                        className="border-border cursor-pointer hover:bg-muted/50"
                        onClick={() => router.push(`/super-admin/vendor-approvals/${vendor.id}`)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedVendors.includes(vendor.id)}
                            onCheckedChange={() => toggleVendorSelection(vendor.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{vendor.companyName}</p>
                            <p className="text-xs text-muted-foreground">{vendor.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs border-border">
                            {vendor.cityName}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {vendor.categories.slice(0, 2).map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                            {vendor.categories.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{vendor.categories.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="size-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{vendor.qaScore}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {getRiskBadge(vendor.qaScore)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(vendor.creditLimit)}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "text-sm",
                            vendor.daysInProcess > 7 ? "text-red-500" : "text-muted-foreground"
                          )}>
                            {vendor.daysInProcess}d
                          </span>
                        </TableCell>
                        <TableCell>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredPending.map((vendor) => (
                <Card
                  key={vendor.id}
                  className="bg-card border-border cursor-pointer"
                  onClick={() => router.push(`/super-admin/vendor-approvals/${vendor.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedVendors.includes(vendor.id)}
                          onCheckedChange={() => toggleVendorSelection(vendor.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div>
                          <p className="font-medium text-foreground">{vendor.companyName}</p>
                          <p className="text-xs text-muted-foreground">{vendor.id}</p>
                        </div>
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs border-border">
                        {vendor.cityName}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          vendor.vendorType === "Fixed"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        )}
                      >
                        {vendor.vendorType}
                      </Badge>
                      {getRiskBadge(vendor.qaScore)}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-center pt-3 border-t border-border">
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="size-3 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-foreground">{vendor.qaScore}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">QA Score</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{formatCurrency(vendor.creditLimit)}</p>
                        <p className="text-xs text-muted-foreground">Credit</p>
                      </div>
                      <div>
                        <p className={cn(
                          "font-medium",
                          vendor.daysInProcess > 7 ? "text-red-500" : "text-foreground"
                        )}>
                          {vendor.daysInProcess}d
                        </p>
                        <p className="text-xs text-muted-foreground">In Process</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Approved Tab */}
          <TabsContent value="approved" className="mt-0">
            <div className="hidden md:block">
              <Card className="bg-card border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Vendor Code</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead className="text-right">Credit Limit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Onboarded</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedVendors.map((vendor) => (
                      <TableRow key={vendor.id} className="border-border">
                        <TableCell className="font-mono text-sm">{vendor.vendorCode}</TableCell>
                        <TableCell className="font-medium">{vendor.companyName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs border-border">
                            {vendor.cityName}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              vendor.vendorType === "Fixed"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                            )}
                          >
                            {vendor.vendorType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {vendor.categories.map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(vendor.creditLimit)}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                            {vendor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(vendor.onboardedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Mobile Cards for Approved */}
            <div className="md:hidden space-y-3">
              {approvedVendors.map((vendor) => (
                <Card key={vendor.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">{vendor.companyName}</p>
                        <p className="text-xs font-mono text-muted-foreground">{vendor.vendorCode}</p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                        {vendor.status}
                      </Badge>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                      <span className="text-muted-foreground">Credit Limit</span>
                      <span className="font-medium text-foreground">{formatCurrency(vendor.creditLimit)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rejected Tab */}
          <TabsContent value="rejected" className="mt-0">
            <div className="hidden md:block">
              <Card className="bg-card border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Application ID</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead className="text-center">QA Score</TableHead>
                      <TableHead>Rejection Reason</TableHead>
                      <TableHead>Rejected On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedVendors.map((vendor) => (
                      <TableRow key={vendor.id} className="border-border">
                        <TableCell className="font-mono text-sm">{vendor.id}</TableCell>
                        <TableCell className="font-medium">{vendor.companyName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs border-border">
                            {vendor.cityName}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="size-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{vendor.qaScore}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-red-600 dark:text-red-400">
                          {vendor.reason}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(vendor.rejectedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Mobile Cards for Rejected */}
            <div className="md:hidden space-y-3">
              {rejectedVendors.map((vendor) => (
                <Card key={vendor.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">{vendor.companyName}</p>
                        <p className="text-xs font-mono text-muted-foreground">{vendor.id}</p>
                      </div>
                      <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30">
                        Rejected
                      </Badge>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      {vendor.reason}
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
                      <Star className="size-3 text-yellow-500 fill-yellow-500" />
                      <span>{vendor.qaScore}</span>
                      <span className="mx-2">|</span>
                      <span>{vendor.cityName}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bulk Approve Dialog */}
      <Dialog open={showBulkApproveDialog} onOpenChange={setShowBulkApproveDialog}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Bulk Approve Vendors</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You are about to approve {selectedVendors.length} vendor(s). This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-foreground">Selected Vendors</Label>
              <div className="max-h-32 overflow-y-auto space-y-1 p-2 bg-muted/30 rounded-md">
                {selectedVendors.map((id) => {
                  const vendor = sampleApprovals.find((v) => v.id === id)
                  return vendor ? (
                    <div key={id} className="text-sm flex items-center justify-between">
                      <span className="text-foreground">{vendor.companyName}</span>
                      <div className="flex items-center gap-1">
                        <Star className="size-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-muted-foreground">{vendor.qaScore}</span>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bulkRemarks" className="text-foreground">
                Approval Remarks <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="bulkRemarks"
                placeholder="Enter approval remarks (minimum 20 characters)..."
                value={bulkApproveRemarks}
                onChange={(e) => setBulkApproveRemarks(e.target.value)}
                className="bg-background border-border min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                {bulkApproveRemarks.length}/20 characters minimum
              </p>
            </div>
            
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="size-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Vendor codes will be auto-generated upon approval. Notifications will be sent to vendors and city admins.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowBulkApproveDialog(false)}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkApprove}
              disabled={isProcessing || bulkApproveRemarks.length < 20}
            >
              {isProcessing ? "Processing..." : `Approve ${selectedVendors.length} Vendors`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
