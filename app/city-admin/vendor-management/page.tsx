"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Building2,
  Package,
  Calendar,
  FileText,
  Users,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import {
  type VendorApplication,
  type VendorApplicationStatus,
  SUPPLY_CATEGORIES,
  STATUS_CONFIG,
} from "@/lib/vendor-types"

// Sample data for city admin
const sampleApplications: VendorApplication[] = [
  {
    id: "1",
    applicationNumber: "VND-HYD-2026-0023",
    companyInfo: {
      name: "ABC Steel Suppliers",
      legalName: "ABC Steel Suppliers Pvt Ltd",
      type: "Private Limited",
      gstin: "36AABCU9603R1ZM",
      pan: "AABCU9603R",
      incorporationDate: "2015-06-15",
      registeredAddress: {
        line1: "Plot No. 45, Industrial Area",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500032",
      },
    },
    contactInfo: {
      primaryContact: {
        name: "Rajesh Kumar",
        designation: "Managing Director",
        phone: "9876543210",
        email: "rajesh@abcsteel.com",
      },
    },
    supplyCategories: [
      { id: "steel", name: "Iron / Steel", code: "STL", selectedSubcategories: ["TMT Bars", "Structural Steel"] },
      { id: "cement", name: "Cement", code: "CEM", selectedSubcategories: ["OPC", "PPC"] },
    ],
    bankDetails: {
      accountName: "ABC Steel Suppliers Pvt Ltd",
      accountNumber: "1234567890123",
      bankName: "HDFC Bank",
      branchName: "Begumpet",
      ifscCode: "HDFC0001234",
      accountType: "Current",
    },
    documents: {
      gstCertificate: { id: "1", name: "GST Certificate.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20", size: 256000 },
      panCard: { id: "2", name: "PAN Card.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20", size: 128000 },
    },
    cityId: "hyd",
    cityName: "Hyderabad",
    status: "city_review",
    workflowHistory: [
      { id: "1", status: "submitted", action: "Application Submitted", performedBy: "Vendor", performedByRole: "Vendor", timestamp: "2026-01-28T10:30:00Z" },
    ],
    createdAt: "2026-01-27T09:00:00Z",
    updatedAt: "2026-01-28T10:30:00Z",
    submittedAt: "2026-01-28T10:30:00Z",
  },
  {
    id: "2",
    applicationNumber: "VND-HYD-2026-0022",
    companyInfo: {
      name: "Sri Lakshmi Electricals",
      legalName: "Sri Lakshmi Electricals",
      type: "Proprietorship",
      gstin: "36AABPS1234L1ZN",
      pan: "AABPS1234L",
      incorporationDate: "2010-03-20",
      registeredAddress: {
        line1: "Shop No. 12, Electrical Market",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500003",
      },
    },
    contactInfo: {
      primaryContact: {
        name: "Suresh Babu",
        designation: "Proprietor",
        phone: "9876543211",
        email: "suresh@srilakshmi.com",
      },
    },
    supplyCategories: [
      { id: "electrical", name: "Electrical Materials", code: "ELE", selectedSubcategories: ["Wires", "Switches", "MCB/DB"] },
    ],
    bankDetails: {
      accountName: "Sri Lakshmi Electricals",
      accountNumber: "9876543210987",
      bankName: "SBI",
      branchName: "Abids",
      ifscCode: "SBIN0001234",
      accountType: "Current",
    },
    documents: {
      gstCertificate: { id: "3", name: "GST Certificate.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-25", size: 256000 },
    },
    cityId: "hyd",
    cityName: "Hyderabad",
    status: "qa_approved",
    workflowHistory: [
      { id: "1", status: "submitted", action: "Application Submitted", performedBy: "Vendor", performedByRole: "Vendor", timestamp: "2026-01-25T14:00:00Z" },
      { id: "2", status: "city_review", action: "Forwarded to City Admin", performedBy: "System", performedByRole: "System", timestamp: "2026-01-25T14:01:00Z" },
      { id: "3", status: "qa_review", action: "Forwarded to QA", performedBy: "Amit Singh", performedByRole: "City Admin", timestamp: "2026-01-26T11:00:00Z" },
      { id: "4", status: "qa_approved", action: "QA Approved", performedBy: "Priya Sharma", performedByRole: "QA", remarks: "All documents verified", timestamp: "2026-01-27T16:00:00Z" },
    ],
    createdAt: "2026-01-25T12:00:00Z",
    updatedAt: "2026-01-27T16:00:00Z",
    submittedAt: "2026-01-25T14:00:00Z",
  },
  {
    id: "3",
    applicationNumber: "VND-HYD-2026-0021",
    companyInfo: {
      name: "Narmada Cement Traders",
      legalName: "Narmada Cement Traders LLP",
      type: "LLP",
      gstin: "36AAFNC5678K1ZP",
      pan: "AAFNC5678K",
      incorporationDate: "2018-09-10",
      registeredAddress: {
        line1: "Godown No. 8, Cement Market",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500045",
      },
    },
    contactInfo: {
      primaryContact: {
        name: "Mohammed Imran",
        designation: "Partner",
        phone: "9876543212",
        email: "imran@narmadacement.com",
      },
    },
    supplyCategories: [
      { id: "cement", name: "Cement", code: "CEM", selectedSubcategories: ["OPC", "PPC", "PSC"] },
      { id: "aggregates", name: "Aggregates", code: "AGG", selectedSubcategories: ["Coarse Aggregate", "Fine Aggregate"] },
    ],
    bankDetails: {
      accountName: "Narmada Cement Traders LLP",
      accountNumber: "5678901234567",
      bankName: "ICICI Bank",
      branchName: "Secunderabad",
      ifscCode: "ICIC0001234",
      accountType: "Current",
    },
    documents: {
      gstCertificate: { id: "5", name: "GST Certificate.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-22", size: 256000 },
      panCard: { id: "6", name: "PAN Card.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-22", size: 128000 },
    },
    cityId: "hyd",
    cityName: "Hyderabad",
    status: "qa_rejected",
    workflowHistory: [
      { id: "1", status: "submitted", action: "Application Submitted", performedBy: "Vendor", performedByRole: "Vendor", timestamp: "2026-01-22T09:00:00Z" },
      { id: "2", status: "qa_review", action: "Forwarded to QA", performedBy: "Amit Singh", performedByRole: "City Admin", timestamp: "2026-01-23T10:00:00Z" },
      { id: "3", status: "qa_rejected", action: "QA Rejected", performedBy: "Priya Sharma", performedByRole: "QA", remarks: "GST certificate expired", timestamp: "2026-01-24T15:00:00Z" },
    ],
    createdAt: "2026-01-22T08:00:00Z",
    updatedAt: "2026-01-24T15:00:00Z",
    submittedAt: "2026-01-22T09:00:00Z",
  },
  {
    id: "4",
    applicationNumber: "VND-HYD-2026-0020",
    companyInfo: {
      name: "Reliable Plumbing Solutions",
      legalName: "Reliable Plumbing Solutions Pvt Ltd",
      type: "Private Limited",
      gstin: "36AARPR9876M1ZQ",
      pan: "AARPR9876M",
      incorporationDate: "2012-11-25",
      registeredAddress: {
        line1: "Building No. 23, Plumbing Hub",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500018",
      },
    },
    contactInfo: {
      primaryContact: {
        name: "Venkat Reddy",
        designation: "Director",
        phone: "9876543213",
        email: "venkat@reliableplumbing.com",
      },
    },
    supplyCategories: [
      { id: "plumbing", name: "Plumbing Materials", code: "PLM", selectedSubcategories: ["Pipes", "Fittings", "Sanitary"] },
    ],
    bankDetails: {
      accountName: "Reliable Plumbing Solutions Pvt Ltd",
      accountNumber: "3456789012345",
      bankName: "Axis Bank",
      branchName: "Ameerpet",
      ifscCode: "UTIB0001234",
      accountType: "Current",
    },
    documents: {
      gstCertificate: { id: "7", name: "GST Certificate.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20", size: 256000 },
      panCard: { id: "8", name: "PAN Card.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20", size: 128000 },
      incorporationCertificate: { id: "9", name: "Incorporation.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20", size: 512000 },
    },
    cityId: "hyd",
    cityName: "Hyderabad",
    status: "city_review",
    workflowHistory: [
      { id: "1", status: "submitted", action: "Application Submitted", performedBy: "Vendor", performedByRole: "Vendor", timestamp: "2026-01-29T11:00:00Z" },
    ],
    createdAt: "2026-01-29T10:00:00Z",
    updatedAt: "2026-01-29T11:00:00Z",
    submittedAt: "2026-01-29T11:00:00Z",
  },
  {
    id: "5",
    applicationNumber: "VND-HYD-2026-0019",
    companyInfo: {
      name: "Premium Tiles Gallery",
      legalName: "Premium Tiles Gallery",
      type: "Partnership",
      gstin: "36AATPT4567N1ZR",
      pan: "AATPT4567N",
      incorporationDate: "2008-05-12",
      registeredAddress: {
        line1: "Showroom 101, Tiles Complex",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500028",
      },
    },
    contactInfo: {
      primaryContact: {
        name: "Anil Agarwal",
        designation: "Partner",
        phone: "9876543214",
        email: "anil@premiumtiles.com",
      },
    },
    supplyCategories: [
      { id: "tiles", name: "Tiles & Flooring", code: "TIL", selectedSubcategories: ["Floor Tiles", "Wall Tiles", "Granite"] },
    ],
    bankDetails: {
      accountName: "Premium Tiles Gallery",
      accountNumber: "7890123456789",
      bankName: "Kotak Mahindra Bank",
      branchName: "Jubilee Hills",
      ifscCode: "KKBK0001234",
      accountType: "Current",
    },
    documents: {
      gstCertificate: { id: "10", name: "GST Certificate.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-18", size: 256000 },
    },
    cityId: "hyd",
    cityName: "Hyderabad",
    status: "pending_super_admin",
    workflowHistory: [
      { id: "1", status: "submitted", action: "Application Submitted", performedBy: "Vendor", performedByRole: "Vendor", timestamp: "2026-01-18T09:00:00Z" },
      { id: "2", status: "qa_review", action: "Forwarded to QA", performedBy: "Amit Singh", performedByRole: "City Admin", timestamp: "2026-01-19T10:00:00Z" },
      { id: "3", status: "qa_approved", action: "QA Approved", performedBy: "Priya Sharma", performedByRole: "QA", timestamp: "2026-01-20T14:00:00Z" },
      { id: "4", status: "pending_super_admin", action: "Forwarded to Super Admin", performedBy: "Amit Singh", performedByRole: "City Admin", timestamp: "2026-01-21T11:00:00Z" },
    ],
    createdAt: "2026-01-18T08:00:00Z",
    updatedAt: "2026-01-21T11:00:00Z",
    submittedAt: "2026-01-18T09:00:00Z",
  },
]

// Status filters for city admin
const statusFilters = [
  { value: "all", label: "All Applications", count: 0 },
  { value: "city_review", label: "Pending Review", count: 0 },
  { value: "qa_approved", label: "QA Approved", count: 0 },
  { value: "qa_rejected", label: "QA Rejected", count: 0 },
  { value: "pending_super_admin", label: "Forwarded", count: 0 },
]

// Helper functions
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffHours < 1) return "Just now"
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

function getStatusBadge(status: VendorApplicationStatus) {
  const config = STATUS_CONFIG[status]
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-xs font-medium border",
        config.bgClass,
        config.textClass,
        config.borderClass
      )}
    >
      {config.label}
    </Badge>
  )
}

function getReviewType(status: VendorApplicationStatus): 'initial' | 'post_qa' | 'none' {
  if (status === 'city_review' || status === 'submitted') return 'initial'
  if (status === 'qa_approved' || status === 'qa_rejected') return 'post_qa'
  return 'none'
}

export default function CityAdminVendorManagementPage() {
  const router = useRouter()
  const [applications, setApplications] = React.useState(sampleApplications)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [selectedApplications, setSelectedApplications] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  // Calculate status counts
  const statusCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: applications.length }
    for (const app of applications) {
      counts[app.status] = (counts[app.status] || 0) + 1
    }
    return counts
  }, [applications])

  // Filter applications
  const filteredApplications = React.useMemo(() => {
    return applications.filter(app => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          app.companyInfo.name.toLowerCase().includes(query) ||
          app.applicationNumber.toLowerCase().includes(query) ||
          app.companyInfo.gstin.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }
      
      // Status filter
      if (statusFilter !== "all" && app.status !== statusFilter) return false
      
      // Category filter
      if (categoryFilter !== "all") {
        const hasCategory = app.supplyCategories.some(cat => cat.id === categoryFilter)
        if (!hasCategory) return false
      }
      
      return true
    })
  }, [applications, searchQuery, statusFilter, categoryFilter])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleViewApplication = (id: string) => {
    router.push(`/city-admin/vendor-management/${id}`)
  }

  const toggleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([])
    } else {
      setSelectedApplications(filteredApplications.map(app => app.id))
    }
  }

  const toggleSelectApplication = (id: string) => {
    setSelectedApplications(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <DashboardLayout userRole="city_admin">
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vendor Applications</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Review and manage vendor onboarding applications for Hyderabad
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-transparent"
          >
            <RefreshCw className={cn("size-4 mr-1.5", isLoading && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="size-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.city_review || 0}</p>
                  <p className="text-xs text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.qa_approved || 0}</p>
                  <p className="text-xs text-muted-foreground">QA Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <XCircle className="size-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.qa_rejected || 0}</p>
                  <p className="text-xs text-muted-foreground">QA Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <ArrowRight className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.pending_super_admin || 0}</p>
                  <p className="text-xs text-muted-foreground">Forwarded</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, GSTIN, or application number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-background">
                    <Filter className="size-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All ({statusCounts.all})</SelectItem>
                    <SelectItem value="city_review">Pending Review ({statusCounts.city_review || 0})</SelectItem>
                    <SelectItem value="qa_approved">QA Approved ({statusCounts.qa_approved || 0})</SelectItem>
                    <SelectItem value="qa_rejected">QA Rejected ({statusCounts.qa_rejected || 0})</SelectItem>
                    <SelectItem value="pending_super_admin">Forwarded ({statusCounts.pending_super_admin || 0})</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px] bg-background">
                    <Package className="size-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {SUPPLY_CATEGORIES.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>
        </div>

        {/* Desktop Table View */}
        <Card className="hidden md:block bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 dark:bg-muted/50">
                <TableHead className="w-10">
                  <Checkbox 
                    checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Application</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Review Type</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="size-8 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No applications found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map(app => {
                  const reviewType = getReviewType(app.status)
                  return (
                    <TableRow 
                      key={app.id} 
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => handleViewApplication(app.id)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedApplications.includes(app.id)}
                          onCheckedChange={() => toggleSelectApplication(app.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">
                          {app.applicationNumber}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="size-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{app.companyInfo.name}</p>
                            <p className="text-xs text-muted-foreground">{app.companyInfo.gstin}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {app.supplyCategories.slice(0, 2).map(cat => (
                            <Badge key={cat.id} variant="secondary" className="text-xs">
                              {cat.name}
                            </Badge>
                          ))}
                          {app.supplyCategories.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{app.supplyCategories.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(app.status)}
                      </TableCell>
                      <TableCell>
                        {reviewType === 'initial' && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 text-xs">
                            Initial Review
                          </Badge>
                        )}
                        {reviewType === 'post_qa' && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 text-xs">
                            Post-QA Review
                          </Badge>
                        )}
                        {reviewType === 'none' && (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="size-3.5" />
                          {formatTimeAgo(app.submittedAt || app.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 bg-transparent">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleViewApplication(app.id)}>
                              <Eye className="size-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {reviewType !== 'none' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleViewApplication(app.id)}>
                                  <CheckCircle2 className="size-4 mr-2" />
                                  Start Review
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-3">
          {filteredApplications.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="p-8 text-center">
                <FileText className="size-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No applications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map(app => {
              const reviewType = getReviewType(app.status)
              return (
                <Card 
                  key={app.id} 
                  className="bg-card cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => handleViewApplication(app.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{app.companyInfo.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{app.applicationNumber}</p>
                        </div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.supplyCategories.map(cat => (
                        <Badge key={cat.id} variant="secondary" className="text-xs">
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3.5" />
                        Submitted {formatTimeAgo(app.submittedAt || app.createdAt)}
                      </div>
                      {reviewType !== 'none' && (
                        <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                          Review
                          <ArrowRight className="size-3.5 ml-1" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3 flex items-center justify-around">
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 bg-transparent">
            <Building2 className="size-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 text-primary bg-transparent">
            <FileText className="size-5" />
            <span className="text-xs">Applications</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2 bg-transparent">
            <Users className="size-5" />
            <span className="text-xs">Vendors</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
