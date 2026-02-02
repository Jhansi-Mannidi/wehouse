"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  Search,
  Filter,
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Eye,
  Send,
  XCircle,
  Users,
  Calendar,
  TrendingUp,
  IndianRupee,
  LayoutGrid,
  List,
  MapPin,
  Gavel,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
  SCOPE_STATUS_COLORS,
  MATERIAL_CATEGORIES,
  SAMPLE_PROJECTS,
  type ScopeOfWork,
  type ScopeStatus,
} from "@/lib/procurement-types"

// Extended Sample scopes data with budget info
interface ExtendedScope extends ScopeOfWork {
  estimatedBudget?: number
  quantity?: number
  unit?: string
}

const sampleScopes: ExtendedScope[] = [
  {
    id: 'sow_1',
    scopeNumber: 'SCP-HYD-STL-2026-0015',
    projectId: 'prj_001',
    projectName: 'Gachibowli Villa Project',
    projectCode: 'PRJ-HYD-2026-0089',
    siteAddress: 'Plot 42, Gachibowli, Hyderabad',
    cityId: 'hyd',
    categoryId: 'cat_iron',
    categoryName: 'Steel & Iron',
    title: 'Steel Supply for Foundation Work',
    description: 'TMT steel bars and binding wire for foundation',
    materials: [],
    qualityStandards: [],
    deliveryRequirements: {} as never,
    bidStartDate: '2026-01-15',
    bidEndDate: '2026-01-25',
    invitedVendors: ['v1', 'v2', 'v3', 'v4', 'v5'],
    status: 'BIDDING_ACTIVE',
    totalBids: 3,
    createdBy: 'user_1',
    createdAt: '2026-01-10',
    updatedAt: '2026-01-15',
    sentAt: '2026-01-15',
    estimatedBudget: 3250000,
    quantity: 50,
    unit: 'MT',
  },
  {
    id: 'sow_2',
    scopeNumber: 'SCP-HYD-CEM-2026-0016',
    projectId: 'prj_002',
    projectName: 'Jubilee Hills Apartments',
    projectCode: 'PRJ-HYD-2026-0092',
    siteAddress: 'Road No. 36, Jubilee Hills, Hyderabad',
    cityId: 'hyd',
    categoryId: 'cat_cement',
    categoryName: 'Cement',
    title: 'Cement Supply for Structure',
    description: 'OPC 53 grade cement for structural work',
    materials: [],
    qualityStandards: [],
    deliveryRequirements: {} as never,
    bidStartDate: '2026-01-12',
    bidEndDate: '2026-01-22',
    invitedVendors: ['v1', 'v2', 'v3'],
    status: 'EVALUATION',
    totalBids: 3,
    createdBy: 'user_1',
    createdAt: '2026-01-08',
    updatedAt: '2026-01-22',
    sentAt: '2026-01-12',
    closedAt: '2026-01-22',
    estimatedBudget: 1850000,
    quantity: 500,
    unit: 'Bags',
  },
  {
    id: 'sow_3',
    scopeNumber: 'SCP-HYD-ELC-2026-0014',
    projectId: 'prj_001',
    projectName: 'Gachibowli Villa Project',
    projectCode: 'PRJ-HYD-2026-0089',
    siteAddress: 'Plot 42, Gachibowli, Hyderabad',
    cityId: 'hyd',
    categoryId: 'cat_elec',
    categoryName: 'Electrical',
    title: 'Electrical Wiring & Fittings',
    description: 'Complete electrical wiring and fittings',
    materials: [],
    qualityStandards: [],
    deliveryRequirements: {} as never,
    bidStartDate: '2026-01-05',
    bidEndDate: '2026-01-15',
    invitedVendors: ['v1', 'v2', 'v3', 'v4'],
    status: 'ASSIGNED',
    totalBids: 4,
    createdBy: 'user_1',
    createdAt: '2026-01-02',
    updatedAt: '2026-01-18',
    sentAt: '2026-01-05',
    closedAt: '2026-01-15',
    estimatedBudget: 950000,
    quantity: 1,
    unit: 'Lot',
  },
  {
    id: 'sow_4',
    scopeNumber: 'SCP-HYD-TIL-2026-0017',
    projectId: 'prj_002',
    projectName: 'Jubilee Hills Apartments',
    projectCode: 'PRJ-HYD-2026-0092',
    siteAddress: 'Road No. 36, Jubilee Hills, Hyderabad',
    cityId: 'hyd',
    categoryId: 'cat_tiles',
    categoryName: 'Tiles & Flooring',
    title: 'Vitrified Tiles for Common Areas',
    description: 'Vitrified tiles for lobby and corridors',
    materials: [],
    qualityStandards: [],
    deliveryRequirements: {} as never,
    bidStartDate: '2026-01-28',
    bidEndDate: '2026-02-07',
    invitedVendors: ['v1', 'v2'],
    status: 'DRAFT',
    createdBy: 'user_1',
    createdAt: '2026-01-18',
    updatedAt: '2026-01-18',
    estimatedBudget: 1200000,
    quantity: 2500,
    unit: 'Sqft',
  },
  {
    id: 'sow_5',
    scopeNumber: 'SCP-HYD-PLB-2026-0018',
    projectId: 'prj_001',
    projectName: 'Gachibowli Villa Project',
    projectCode: 'PRJ-HYD-2026-0089',
    siteAddress: 'Plot 42, Gachibowli, Hyderabad',
    cityId: 'hyd',
    categoryId: 'cat_plumb',
    categoryName: 'Plumbing',
    title: 'Plumbing Materials Supply',
    description: 'CPVC pipes and fittings for plumbing',
    materials: [],
    qualityStandards: [],
    deliveryRequirements: {} as never,
    bidStartDate: '2026-01-18',
    bidEndDate: '2026-01-28',
    invitedVendors: ['v1', 'v2', 'v3'],
    status: 'SENT',
    totalBids: 0,
    createdBy: 'user_1',
    createdAt: '2026-01-16',
    updatedAt: '2026-01-18',
    sentAt: '2026-01-18',
    estimatedBudget: 780000,
    quantity: 1,
    unit: 'Lot',
  },
  {
    id: 'sow_6',
    scopeNumber: 'SCP-HYD-PNT-2026-0019',
    projectId: 'prj_002',
    projectName: 'Jubilee Hills Apartments',
    projectCode: 'PRJ-HYD-2026-0092',
    siteAddress: 'Road No. 36, Jubilee Hills, Hyderabad',
    cityId: 'hyd',
    categoryId: 'cat_paints',
    categoryName: 'Paints',
    title: 'Interior & Exterior Paints',
    description: 'Premium quality paints for all areas',
    materials: [],
    qualityStandards: [],
    deliveryRequirements: {} as never,
    bidStartDate: '2026-01-10',
    bidEndDate: '2026-01-20',
    invitedVendors: ['v1', 'v2', 'v3', 'v4'],
    status: 'ASSIGNED',
    totalBids: 4,
    createdBy: 'user_1',
    createdAt: '2026-01-05',
    updatedAt: '2026-01-22',
    sentAt: '2026-01-10',
    closedAt: '2026-01-20',
    estimatedBudget: 560000,
    quantity: 1200,
    unit: 'Ltr',
  },
]

function getStatusLabel(status: ScopeStatus): string {
  const labels: Record<ScopeStatus, string> = {
    DRAFT: 'Draft',
    SENT: 'Sent',
    BIDDING_ACTIVE: 'Bidding Active',
    BIDDING_CLOSED: 'Closed',
    EVALUATION: 'Evaluation',
    ASSIGNED: 'Assigned',
    CANCELLED: 'Cancelled',
  }
  return labels[status]
}

function getStatusIcon(status: ScopeStatus) {
  switch (status) {
    case 'DRAFT': return FileText
    case 'SENT': return Send
    case 'BIDDING_ACTIVE': return Clock
    case 'BIDDING_CLOSED': return AlertCircle
    case 'EVALUATION': return Users
    case 'ASSIGNED': return CheckCircle2
    case 'CANCELLED': return XCircle
    default: return FileText
  }
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)} Cr`
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)} L`
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)} K`
  return amount.toLocaleString('en-IN')
}

function getDaysRemaining(endDate: string): number {
  const end = new Date(endDate)
  const now = new Date()
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

interface ScopeCardProps {
  scope: ExtendedScope
  onClick: () => void
  viewMode: 'list' | 'grid'
}

function ScopeCard({ scope, onClick, viewMode }: ScopeCardProps) {
  const router = useRouter()
  const StatusIcon = getStatusIcon(scope.status)
  const statusColors = SCOPE_STATUS_COLORS[scope.status]
  const daysRemaining = scope.bidEndDate ? getDaysRemaining(scope.bidEndDate) : 0
  const bidProgress = scope.totalBids && scope.invitedVendors.length 
    ? (scope.totalBids / scope.invitedVendors.length) * 100 
    : 0
  
  if (viewMode === 'grid') {
    return (
      <Card className="p-4 cursor-pointer hover:border-primary/50 transition-all bg-card hover:shadow-md" onClick={onClick}>
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${statusColors.bg} ${statusColors.text} text-xs`}>
            <StatusIcon className="size-3 mr-1" />
            {getStatusLabel(scope.status)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="size-7 bg-transparent hover:bg-muted">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onClick() }}>
                <Eye className="size-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {scope.status === 'DRAFT' && (
                <DropdownMenuItem>
                  <Send className="size-4 mr-2" />
                  Send to Vendors
                </DropdownMenuItem>
              )}
              {(scope.status === 'BIDDING_ACTIVE' || scope.status === 'EVALUATION') && (
                <>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/procurement/scopes/${scope.id}/compare`) }}>
                    <Gavel className="size-4 mr-2" />
                    Compare Bids
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-xs font-mono text-muted-foreground mb-1">{scope.scopeNumber}</p>
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{scope.title}</h3>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Badge variant="outline" className="text-xs font-normal">{scope.categoryName}</Badge>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <MapPin className="size-3" />
          <span className="truncate">{scope.projectName}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="text-muted-foreground">
            {scope.quantity} {scope.unit}
          </span>
          <span className="font-medium text-foreground">
            Rs {formatCurrency(scope.estimatedBudget || 0)}
          </span>
        </div>
        
        {scope.status === 'BIDDING_ACTIVE' && (
          <div className="space-y-2 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Bids: {scope.totalBids}/{scope.invitedVendors.length}</span>
              <span className={`font-medium ${daysRemaining <= 2 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {daysRemaining > 0 ? `${daysRemaining}d left` : 'Expired'}
              </span>
            </div>
            <Progress value={bidProgress} className="h-1.5" />
          </div>
        )}
        
        {scope.status === 'DRAFT' && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-3 bg-transparent"
            onClick={(e) => { e.stopPropagation() }}
          >
            <Send className="size-3 mr-2" />
            Send to Vendors
          </Button>
        )}
      </Card>
    )
  }
  
  // List view
  return (
    <Card className="p-4 cursor-pointer hover:border-primary/50 transition-all bg-card hover:shadow-md" onClick={onClick}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono text-muted-foreground">{scope.scopeNumber}</span>
            <Badge className={`${statusColors.bg} ${statusColors.text} text-xs`}>
              <StatusIcon className="size-3 mr-1" />
              {getStatusLabel(scope.status)}
            </Badge>
          </div>
          <h3 className="font-semibold text-foreground mb-1">{scope.title}</h3>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {scope.projectName}
            </span>
            <Badge variant="outline" className="text-xs font-normal">{scope.categoryName}</Badge>
          </div>
        </div>
        
        <div className="text-right shrink-0">
          <p className="font-semibold text-foreground">Rs {formatCurrency(scope.estimatedBudget || 0)}</p>
          <p className="text-xs text-muted-foreground">{scope.quantity} {scope.unit}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {scope.invitedVendors.length} vendors
          </span>
          {scope.totalBids !== undefined && scope.totalBids > 0 && (
            <span className="flex items-center gap-1">
              <Gavel className="size-3" />
              {scope.totalBids} bids
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {scope.bidStartDate} - {scope.bidEndDate}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {scope.status === 'BIDDING_ACTIVE' && daysRemaining > 0 && (
            <Badge variant={daysRemaining <= 2 ? "destructive" : "secondary"} className="text-xs">
              <Clock className="size-3 mr-1" />
              {daysRemaining}d left
            </Badge>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="size-8 bg-transparent hover:bg-muted">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onClick() }}>
                <Eye className="size-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {scope.status === 'DRAFT' && (
                <>
                  <DropdownMenuItem>
                    <FileText className="size-4 mr-2" />
                    Edit Scope
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Send className="size-4 mr-2" />
                    Send to Vendors
                  </DropdownMenuItem>
                </>
              )}
              {(scope.status === 'BIDDING_ACTIVE' || scope.status === 'EVALUATION') && (
                <>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/procurement/scopes/${scope.id}/compare`) }}>
                    <Gavel className="size-4 mr-2" />
                    Compare Bids
                  </DropdownMenuItem>
                </>
              )}
              {scope.status === 'ASSIGNED' && (
                <DropdownMenuItem>
                  <ArrowRight className="size-4 mr-2" />
                  Create PO
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}

export default function ScopesListPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("all")
  const [projectFilter, setProjectFilter] = React.useState("all")
  const [activeTab, setActiveTab] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list')
  
  const filterByStatus = (status: string) => {
    if (status === 'all') return sampleScopes
    if (status === 'active') return sampleScopes.filter(s => ['BIDDING_ACTIVE', 'SENT'].includes(s.status))
    if (status === 'evaluation') return sampleScopes.filter(s => s.status === 'EVALUATION')
    if (status === 'completed') return sampleScopes.filter(s => ['ASSIGNED', 'BIDDING_CLOSED'].includes(s.status))
    if (status === 'draft') return sampleScopes.filter(s => s.status === 'DRAFT')
    return sampleScopes
  }
  
  const filteredScopes = filterByStatus(activeTab).filter(scope => {
    if (searchQuery && !scope.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !scope.scopeNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (categoryFilter !== 'all' && scope.categoryId !== categoryFilter) return false
    if (projectFilter !== 'all' && scope.projectId !== projectFilter) return false
    return true
  })
  
  const stats = {
    total: sampleScopes.length,
    draft: sampleScopes.filter(s => s.status === 'DRAFT').length,
    sent: sampleScopes.filter(s => s.status === 'SENT').length,
    active: sampleScopes.filter(s => ['BIDDING_ACTIVE'].includes(s.status)).length,
    closed: sampleScopes.filter(s => ['ASSIGNED', 'BIDDING_CLOSED', 'EVALUATION'].includes(s.status)).length,
    totalBudget: sampleScopes.reduce((sum, s) => sum + (s.estimatedBudget || 0), 0),
    draftBudget: sampleScopes.filter(s => s.status === 'DRAFT').reduce((sum, s) => sum + (s.estimatedBudget || 0), 0),
    sentBudget: sampleScopes.filter(s => s.status === 'SENT').reduce((sum, s) => sum + (s.estimatedBudget || 0), 0),
    activeBudget: sampleScopes.filter(s => s.status === 'BIDDING_ACTIVE').reduce((sum, s) => sum + (s.estimatedBudget || 0), 0),
    closedBudget: sampleScopes.filter(s => ['ASSIGNED', 'BIDDING_CLOSED', 'EVALUATION'].includes(s.status)).reduce((sum, s) => sum + (s.estimatedBudget || 0), 0),
  }
  
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Material Scopes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create scopes, invite vendors, and manage bids
            </p>
          </div>
          <Button onClick={() => router.push('/procurement/scopes/create')} className="w-full sm:w-auto">
            <Plus className="size-4 mr-2" />
            Create New Scope
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Card className="p-4 bg-card hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('draft')}>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                <FileText className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.draft}</p>
                <p className="text-xs text-muted-foreground">Draft</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
              Rs {formatCurrency(stats.draftBudget)}
            </p>
          </Card>
          
          <Card className="p-4 bg-card hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('all')}>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Send className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.sent}</p>
                <p className="text-xs text-muted-foreground">Sent</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
              Rs {formatCurrency(stats.sentBudget)}
            </p>
          </Card>
          
          <Card className="p-4 bg-card hover:shadow-md transition-shadow cursor-pointer border-primary/20" onClick={() => setActiveTab('active')}>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
              Rs {formatCurrency(stats.activeBudget)}
            </p>
          </Card>
          
          <Card className="p-4 bg-card hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('completed')}>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.closed}</p>
                <p className="text-xs text-muted-foreground">Closed</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
              Rs {formatCurrency(stats.closedBudget)}
            </p>
          </Card>
          
          <Card className="p-4 bg-card hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <IndianRupee className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
            <p className="text-xs font-medium text-primary mt-2 pt-2 border-t border-border">
              Rs {formatCurrency(stats.totalBudget)}
            </p>
          </Card>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="draft">Drafts ({stats.draft})</TabsTrigger>
              <TabsTrigger value="active">Active ({stats.active + stats.sent})</TabsTrigger>
              <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
              <TabsTrigger value="completed">Closed ({stats.closed})</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search scopes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {SAMPLE_PROJECTS.map(proj => (
                    <SelectItem key={proj.id} value={proj.id}>{proj.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] bg-background">
                  <Filter className="size-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {MATERIAL_CATEGORIES.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-1 border border-border rounded-lg p-1 self-end sm:self-auto">
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="size-8 p-0"
                onClick={() => setViewMode('list')}
              >
                <List className="size-4" />
              </Button>
              <Button 
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                size="sm" 
                className="size-8 p-0"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="size-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scopes List/Grid */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-3"
        }>
          {filteredScopes.map(scope => (
            <ScopeCard
              key={scope.id}
              scope={scope}
              onClick={() => router.push(`/procurement/scopes/${scope.id}`)}
              viewMode={viewMode}
            />
          ))}
        </div>
        
        {filteredScopes.length === 0 && (
          <Card className="p-12 text-center bg-card">
            <FileText className="size-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold text-foreground mb-1">No scopes found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery || categoryFilter !== 'all' || projectFilter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Create your first material scope to get started'}
            </p>
            <Button 
              onClick={() => router.push('/procurement/scopes/create')}
            >
              <Plus className="size-4 mr-2" />
              Create New Scope
            </Button>
          </Card>
        )}
        
        {/* Mobile FAB */}
        <div className="fixed bottom-20 right-4 sm:hidden">
          <Button 
            size="lg" 
            className="size-14 rounded-full shadow-lg"
            onClick={() => router.push('/procurement/scopes/create')}
          >
            <Plus className="size-6" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
