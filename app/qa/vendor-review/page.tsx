"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileText,
  Building2,
  Star,
  TrendingUp,
  ChevronRight,
  Calendar,
  User,
  BarChart3,
  ClipboardCheck,
} from "lucide-react"
import { SUPPLY_CATEGORIES, STATUS_CONFIG } from "@/lib/vendor-types"
import type { VendorApplication, VendorApplicationStatus } from "@/lib/vendor-types"

// Sample data for QA review
const sampleApplications: (VendorApplication & { assignedQA?: string; priority?: 'high' | 'medium' | 'low'; daysInQueue?: number })[] = [
  {
    id: "VND-HYD-2026-0023",
    applicationNumber: "VND-HYD-2026-0023",
    companyInfo: {
      name: "ABC Steel Suppliers",
      legalName: "ABC Steel Suppliers Pvt Ltd",
      type: "Private Limited",
      gstin: "36AABCU9603R1ZM",
      pan: "AABCU9603R",
      incorporationDate: "2018-05-15",
      registeredAddress: { line1: "Plot 45, Industrial Area", city: "Hyderabad", state: "TG", pincode: "500032" },
    },
    contactInfo: {
      primaryContact: { name: "Rajesh Kumar", designation: "Director", phone: "9876543210", email: "rajesh@abcsteel.com" },
    },
    supplyCategories: [
      { id: "steel", name: "Iron / Steel", code: "STL", subcategories: ["TMT Bars", "Structural Steel"] },
    ],
    bankDetails: { accountName: "ABC Steel Suppliers", accountNumber: "1234567890", bankName: "HDFC Bank", branchName: "Secunderabad", ifscCode: "HDFC0001234", accountType: "Current" },
    documents: {},
    cityId: "hyderabad",
    cityName: "Hyderabad",
    status: "qa_review",
    workflowHistory: [],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
    submittedAt: "2026-01-15T10:00:00Z",
    classification: { vendorType: "Fixed", creditLimit: 500000, paymentTerms: "30 Days" },
    assignedQA: "Priya Sharma",
    priority: "high",
    daysInQueue: 2,
  },
  {
    id: "VND-HYD-2026-0024",
    applicationNumber: "VND-HYD-2026-0024",
    companyInfo: {
      name: "Premium Electricals",
      legalName: "Premium Electricals LLP",
      type: "LLP",
      gstin: "36AABFP1234R1ZX",
      pan: "AABFP1234R",
      incorporationDate: "2020-03-10",
      registeredAddress: { line1: "Shop 12, Electrical Market", city: "Hyderabad", state: "TG", pincode: "500003" },
    },
    contactInfo: {
      primaryContact: { name: "Suresh Reddy", designation: "Partner", phone: "9876543211", email: "suresh@premiumelec.com" },
    },
    supplyCategories: [
      { id: "electrical", name: "Electrical Materials", code: "ELE", subcategories: ["Wires", "Switches", "MCB/DB"] },
    ],
    bankDetails: { accountName: "Premium Electricals LLP", accountNumber: "9876543210", bankName: "ICICI Bank", branchName: "Ameerpet", ifscCode: "ICIC0001234", accountType: "Current" },
    documents: {},
    cityId: "hyderabad",
    cityName: "Hyderabad",
    status: "qa_review",
    workflowHistory: [],
    createdAt: "2026-01-18T09:00:00Z",
    updatedAt: "2026-01-22T11:00:00Z",
    submittedAt: "2026-01-18T09:00:00Z",
    classification: { vendorType: "Fixed", creditLimit: 300000, paymentTerms: "15 Days" },
    assignedQA: "Priya Sharma",
    priority: "medium",
    daysInQueue: 4,
  },
  {
    id: "VND-BLR-2026-0015",
    applicationNumber: "VND-BLR-2026-0015",
    companyInfo: {
      name: "Bangalore Cement Traders",
      legalName: "Bangalore Cement Traders",
      type: "Proprietorship",
      gstin: "29AABCB1234R1ZM",
      pan: "AABCB1234R",
      incorporationDate: "2015-08-20",
      registeredAddress: { line1: "Cement Godown, Industrial Layout", city: "Bangalore", state: "KA", pincode: "560058" },
    },
    contactInfo: {
      primaryContact: { name: "Venkat Rao", designation: "Proprietor", phone: "9876543212", email: "venkat@blrcement.com" },
    },
    supplyCategories: [
      { id: "cement", name: "Cement", code: "CEM", subcategories: ["OPC", "PPC"] },
    ],
    bankDetails: { accountName: "Bangalore Cement Traders", accountNumber: "5678901234", bankName: "SBI", branchName: "Whitefield", ifscCode: "SBIN0001234", accountType: "Current" },
    documents: {},
    cityId: "bangalore",
    cityName: "Bangalore",
    status: "qa_review",
    workflowHistory: [],
    createdAt: "2026-01-20T08:00:00Z",
    updatedAt: "2026-01-23T16:00:00Z",
    submittedAt: "2026-01-20T08:00:00Z",
    classification: { vendorType: "Temporary", paymentTerms: "7 Days" },
    priority: "low",
    daysInQueue: 1,
  },
  {
    id: "VND-HYD-2026-0020",
    applicationNumber: "VND-HYD-2026-0020",
    companyInfo: {
      name: "Quality Plumbing Solutions",
      legalName: "Quality Plumbing Solutions Pvt Ltd",
      type: "Private Limited",
      gstin: "36AABCQ1234R1ZM",
      pan: "AABCQ1234R",
      incorporationDate: "2019-11-05",
      registeredAddress: { line1: "Building 8, Sanitary Complex", city: "Hyderabad", state: "TG", pincode: "500018" },
    },
    contactInfo: {
      primaryContact: { name: "Mohan Das", designation: "CEO", phone: "9876543213", email: "mohan@qualityplumb.com" },
    },
    supplyCategories: [
      { id: "plumbing", name: "Plumbing Materials", code: "PLM", subcategories: ["Pipes", "Fittings", "Sanitary"] },
    ],
    bankDetails: { accountName: "Quality Plumbing Solutions", accountNumber: "3456789012", bankName: "Axis Bank", branchName: "Jubilee Hills", ifscCode: "UTIB0001234", accountType: "Current" },
    documents: {},
    cityId: "hyderabad",
    cityName: "Hyderabad",
    status: "qa_approved",
    workflowHistory: [],
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-19T15:00:00Z",
    submittedAt: "2026-01-10T10:00:00Z",
    classification: { vendorType: "Fixed", creditLimit: 400000, paymentTerms: "30 Days" },
    assignedQA: "Amit Singh",
  },
  {
    id: "VND-HYD-2026-0019",
    applicationNumber: "VND-HYD-2026-0019",
    companyInfo: {
      name: "XYZ Hardware Store",
      legalName: "XYZ Hardware Store",
      type: "Proprietorship",
      gstin: "36AABCX1234R1ZM",
      pan: "AABCX1234R",
      incorporationDate: "2022-02-15",
      registeredAddress: { line1: "Shop 5, Hardware Market", city: "Hyderabad", state: "TG", pincode: "500027" },
    },
    contactInfo: {
      primaryContact: { name: "Ravi Teja", designation: "Owner", phone: "9876543214", email: "ravi@xyzhardware.com" },
    },
    supplyCategories: [
      { id: "hardware", name: "Hardware & Fixtures", code: "HRD", subcategories: ["Door Hardware", "Window Hardware"] },
    ],
    bankDetails: { accountName: "XYZ Hardware Store", accountNumber: "7890123456", bankName: "Kotak Bank", branchName: "Begumpet", ifscCode: "KKBK0001234", accountType: "Current" },
    documents: {},
    cityId: "hyderabad",
    cityName: "Hyderabad",
    status: "qa_rejected",
    workflowHistory: [],
    createdAt: "2026-01-08T09:00:00Z",
    updatedAt: "2026-01-17T12:00:00Z",
    submittedAt: "2026-01-08T09:00:00Z",
    classification: { vendorType: "Temporary", paymentTerms: "7 Days" },
    assignedQA: "Amit Singh",
  },
]

// Stats Card Component
function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  color = "primary" 
}: { 
  title: string
  value: number | string
  description?: string
  icon: React.ElementType
  trend?: { value: number; positive: boolean }
  color?: "primary" | "success" | "warning" | "destructive"
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary dark:bg-primary/20",
    success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    destructive: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  }
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold">{value}</p>
              {trend && (
                <span className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                )}>
                  {trend.positive ? "+" : ""}{trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", colorClasses[color])}>
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Priority Badge Component
function PriorityBadge({ priority }: { priority?: 'high' | 'medium' | 'low' }) {
  if (!priority) return null
  
  const config = {
    high: { label: "High", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
    medium: { label: "Medium", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    low: { label: "Low", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  }
  
  return (
    <Badge variant="outline" className={cn("text-xs border-0", config[priority].className)}>
      {config[priority].label}
    </Badge>
  )
}

// Application Card Component (Mobile)
function ApplicationCard({ 
  application, 
  onClick 
}: { 
  application: typeof sampleApplications[0]
  onClick: () => void 
}) {
  const statusConfig = STATUS_CONFIG[application.status]
  
  return (
    <Card 
      className="cursor-pointer hover:border-primary/50 transition-colors"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{application.companyInfo.name}</h3>
            <p className="text-xs text-muted-foreground">{application.applicationNumber}</p>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "ml-2 shrink-0 text-xs",
              statusConfig.bgClass,
              statusConfig.textClass,
              statusConfig.borderClass
            )}
          >
            {statusConfig.label}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {application.supplyCategories.map(cat => (
            <Badge key={cat.id} variant="secondary" className="text-xs">
              {cat.name}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Building2 className="size-3.5" />
            <span>{application.cityName}</span>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={application.priority} />
            {application.daysInQueue && (
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {application.daysInQueue}d
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <div className="text-xs">
            <span className="text-muted-foreground">Type: </span>
            <span className="font-medium">{application.classification?.vendorType || "Not set"}</span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs bg-transparent">
            Review <ChevronRight className="size-3.5 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function QAVendorReviewPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [priorityFilter, setPriorityFilter] = React.useState("all")
  const [activeTab, setActiveTab] = React.useState("pending")
  
  // Filter applications
  const filteredApplications = React.useMemo(() => {
    return sampleApplications.filter(app => {
      // Tab filter
      if (activeTab === "pending" && app.status !== "qa_review") return false
      if (activeTab === "approved" && app.status !== "qa_approved") return false
      if (activeTab === "rejected" && app.status !== "qa_rejected") return false
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !app.companyInfo.name.toLowerCase().includes(query) &&
          !app.applicationNumber.toLowerCase().includes(query) &&
          !app.companyInfo.gstin.toLowerCase().includes(query)
        ) {
          return false
        }
      }
      
      // Category filter
      if (categoryFilter !== "all") {
        if (!app.supplyCategories.some(cat => cat.id === categoryFilter)) {
          return false
        }
      }
      
      // Priority filter
      if (priorityFilter !== "all" && app.priority !== priorityFilter) {
        return false
      }
      
      return true
    })
  }, [searchQuery, categoryFilter, priorityFilter, activeTab])
  
  // Calculate stats
  const stats = React.useMemo(() => {
    const pending = sampleApplications.filter(a => a.status === "qa_review")
    const approved = sampleApplications.filter(a => a.status === "qa_approved")
    const rejected = sampleApplications.filter(a => a.status === "qa_rejected")
    
    return {
      pending: pending.length,
      approved: approved.length,
      rejected: rejected.length,
      avgDaysInQueue: pending.length > 0 
        ? Math.round(pending.reduce((sum, a) => sum + (a.daysInQueue || 0), 0) / pending.length)
        : 0,
    }
  }, [])
  
  return (
    <DashboardLayout userRole="quality_assurance_officer">
      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">QA Vendor Review</h1>
            <p className="text-muted-foreground">
              Evaluate vendor applications for quality standards and compliance
            </p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Pending Review"
            value={stats.pending}
            description="Applications awaiting evaluation"
            icon={Clock}
            color="warning"
          />
          <StatsCard
            title="Approved"
            value={stats.approved}
            description="This month"
            icon={CheckCircle2}
            color="success"
            trend={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Rejected"
            value={stats.rejected}
            description="This month"
            icon={XCircle}
            color="destructive"
          />
          <StatsCard
            title="Avg. Review Time"
            value={`${stats.avgDaysInQueue}d`}
            description="Average days in queue"
            icon={BarChart3}
            color="primary"
          />
        </div>
        
        {/* Main Content */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Review and evaluate vendor applications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="pending" className="gap-1.5">
                  <Clock className="size-4" />
                  <span className="hidden sm:inline">Pending</span>
                  <Badge variant="secondary" className="ml-1">{stats.pending}</Badge>
                </TabsTrigger>
                <TabsTrigger value="approved" className="gap-1.5">
                  <CheckCircle2 className="size-4" />
                  <span className="hidden sm:inline">Approved</span>
                  <Badge variant="secondary" className="ml-1">{stats.approved}</Badge>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="gap-1.5">
                  <XCircle className="size-4" />
                  <span className="hidden sm:inline">Rejected</span>
                  <Badge variant="secondary" className="ml-1">{stats.rejected}</Badge>
                </TabsTrigger>
              </TabsList>
              
              {/* Filters */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID, or GSTIN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {SUPPLY_CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {activeTab === "pending" && (
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
              
              <TabsContent value="pending" className="mt-0">
                {/* Desktop Table */}
                <div className="hidden md:block rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 dark:bg-muted/50">
                        <TableHead>Vendor</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>In Queue</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-32 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <ClipboardCheck className="size-8" />
                              <p>No applications pending review</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredApplications.map(app => (
                          <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50" onClick={() => router.push(`/qa/vendor-review/${app.id}`)}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{app.companyInfo.name}</p>
                                <p className="text-xs text-muted-foreground">{app.applicationNumber}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {app.supplyCategories.map(cat => (
                                  <Badge key={cat.id} variant="secondary" className="text-xs">
                                    {cat.code}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{app.cityName}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {app.classification?.vendorType || "N/A"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <PriorityBadge priority={app.priority} />
                            </TableCell>
                            <TableCell>
                              <span className="flex items-center gap-1 text-sm">
                                <Clock className="size-3.5 text-muted-foreground" />
                                {app.daysInQueue}d
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="sm">
                                Start Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Mobile Cards */}
                <div className="md:hidden grid gap-3">
                  {filteredApplications.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                      <ClipboardCheck className="size-8" />
                      <p>No applications pending review</p>
                    </div>
                  ) : (
                    filteredApplications.map(app => (
                      <ApplicationCard 
                        key={app.id} 
                        application={app} 
                        onClick={() => router.push(`/qa/vendor-review/${app.id}`)}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="approved" className="mt-0">
                {/* Desktop Table */}
                <div className="hidden md:block rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 dark:bg-muted/50">
                        <TableHead>Vendor</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Approved By</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-32 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <CheckCircle2 className="size-8" />
                              <p>No approved applications</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredApplications.map(app => (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{app.companyInfo.name}</p>
                                <p className="text-xs text-muted-foreground">{app.applicationNumber}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {app.supplyCategories.map(cat => (
                                  <Badge key={cat.id} variant="secondary" className="text-xs">
                                    {cat.code}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{app.cityName}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="size-4 fill-amber-400 text-amber-400" />
                                <span className="font-medium">4.2</span>
                                <span className="text-muted-foreground">/5</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                <User className="size-3.5 text-muted-foreground" />
                                <span className="text-sm">{app.assignedQA || "N/A"}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" onClick={() => router.push(`/qa/vendor-review/${app.id}`)}>
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Mobile Cards */}
                <div className="md:hidden grid gap-3">
                  {filteredApplications.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                      <CheckCircle2 className="size-8" />
                      <p>No approved applications</p>
                    </div>
                  ) : (
                    filteredApplications.map(app => (
                      <ApplicationCard 
                        key={app.id} 
                        application={app} 
                        onClick={() => router.push(`/qa/vendor-review/${app.id}`)}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="rejected" className="mt-0">
                {/* Desktop Table */}
                <div className="hidden md:block rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 dark:bg-muted/50">
                        <TableHead>Vendor</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Rejected By</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-32 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <XCircle className="size-8" />
                              <p>No rejected applications</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredApplications.map(app => (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{app.companyInfo.name}</p>
                                <p className="text-xs text-muted-foreground">{app.applicationNumber}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {app.supplyCategories.map(cat => (
                                  <Badge key={cat.id} variant="secondary" className="text-xs">
                                    {cat.code}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{app.cityName}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="size-4 fill-red-400 text-red-400" />
                                <span className="font-medium text-red-600 dark:text-red-400">1.8</span>
                                <span className="text-muted-foreground">/5</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                <User className="size-3.5 text-muted-foreground" />
                                <span className="text-sm">{app.assignedQA || "N/A"}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" onClick={() => router.push(`/qa/vendor-review/${app.id}`)}>
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Mobile Cards */}
                <div className="md:hidden grid gap-3">
                  {filteredApplications.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                      <XCircle className="size-8" />
                      <p>No rejected applications</p>
                    </div>
                  ) : (
                    filteredApplications.map(app => (
                      <ApplicationCard 
                        key={app.id} 
                        application={app} 
                        onClick={() => router.push(`/qa/vendor-review/${app.id}`)}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
