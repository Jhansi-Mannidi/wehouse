"use client"

import * as React from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Users,
  IndianRupee,
  Eye,
  FileText,
  MoreHorizontal,
  Filter,
  Plus,
  HardHat,
  ClipboardCheck,
  Bell,
  Send,
  ChevronRight,
  TrendingUp,
  MapPin,
  Ruler,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"

// Project data
const projects = [
  {
    id: "WH-P-HYD-2026-001",
    customerName: "Rajesh Kumar",
    projectType: "G+2",
    location: "Kondapur",
    city: "Hyderabad",
    area: 3200,
    package: "Silver",
    progress: 65,
    status: "on_track",
    currentMilestone: "Plastering",
    milestoneNumber: 12,
    totalMilestones: 24,
    contractor: "Sri Builders",
    dueDate: "2026-03-30",
    totalValue: 8200000,
    collected: 3800000,
    issues: [],
    todayActivity: "Plastering work - Living room walls",
    workers: 6,
  },
  {
    id: "WH-P-HYD-2026-002",
    customerName: "Sunitha Reddy",
    projectType: "G+1",
    location: "Gachibowli",
    city: "Hyderabad",
    area: 2800,
    package: "Gold",
    progress: 85,
    status: "on_track",
    currentMilestone: "Painting",
    milestoneNumber: 18,
    totalMilestones: 24,
    contractor: "Quality Constructions",
    dueDate: "2026-01-30",
    totalValue: 7500000,
    collected: 6000000,
    issues: [],
    todayActivity: "Interior painting - Bedrooms",
    workers: 4,
  },
  {
    id: "WH-P-HYD-2026-003",
    customerName: "Venkat Menon",
    projectType: "Villa",
    location: "Jubilee Hills",
    city: "Hyderabad",
    area: 5500,
    package: "Gold",
    progress: 32,
    status: "at_risk",
    currentMilestone: "Roof Slab",
    milestoneNumber: 8,
    totalMilestones: 24,
    contractor: "Prime Constructions",
    dueDate: "2026-06-15",
    totalValue: 19000000,
    collected: 4800000,
    issues: ["Material delay", "Weather risk"],
    delayDays: 3,
    todayActivity: "Slab preparation - Formwork",
    workers: 12,
  },
  {
    id: "WH-P-HYD-2026-004",
    customerName: "Anil Sharma",
    projectType: "G+2",
    location: "Banjara Hills",
    city: "Hyderabad",
    area: 4000,
    package: "Platinum",
    progress: 55,
    status: "delayed",
    currentMilestone: "Brickwork",
    milestoneNumber: 10,
    totalMilestones: 24,
    contractor: "Elite Builders",
    dueDate: "2026-04-20",
    totalValue: 13000000,
    collected: 5200000,
    issues: ["7 days delayed", "Labor shortage"],
    delayDays: 7,
    todayActivity: "Quality inspection scheduled",
    workers: 8,
  },
  {
    id: "WH-P-HYD-2026-005",
    customerName: "Priya Nair",
    projectType: "G+1",
    location: "Madhapur",
    city: "Hyderabad",
    area: 2400,
    package: "Bronze",
    progress: 45,
    status: "on_track",
    currentMilestone: "Electrical",
    milestoneNumber: 9,
    totalMilestones: 24,
    contractor: "Sri Builders",
    dueDate: "2026-05-10",
    totalValue: 5800000,
    collected: 2600000,
    issues: [],
    todayActivity: "Electrical conduit work",
    workers: 5,
  },
]

// Pending actions
const pendingActions = [
  {
    id: 1,
    type: "payment",
    severity: "high",
    title: "Payment overdue: Anil Sharma",
    description: "₹12L due 5 days ago",
    action: "Send Reminder",
    projectId: "WH-P-HYD-2026-004",
  },
  {
    id: 2,
    type: "material",
    severity: "medium",
    title: "Material PO pending: Venkat",
    description: "Steel for roof slab",
    action: "Approve PO",
    projectId: "WH-P-HYD-2026-003",
  },
  {
    id: 3,
    type: "report",
    severity: "medium",
    title: "Daily report missing",
    description: "Rajesh K., Sunitha R.",
    action: "Send Reminder",
    projectId: "WH-P-HYD-2026-001",
  },
  {
    id: 4,
    type: "inspection",
    severity: "low",
    title: "Quality inspection due",
    description: "Priya Nair - Electrical work",
    action: "Schedule",
    projectId: "WH-P-HYD-2026-005",
  },
]

const statusConfig = {
  on_track: {
    label: "On Track",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: CheckCircle2,
    dotColor: "bg-green-500",
  },
  at_risk: {
    label: "At Risk",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    icon: AlertTriangle,
    dotColor: "bg-yellow-500",
  },
  delayed: {
    label: "Delayed",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: XCircle,
    dotColor: "bg-red-500",
  },
}

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(0)}L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

// Stats calculation
const stats = {
  active: projects.length,
  onTrack: projects.filter((p) => p.status === "on_track").length,
  atRisk: projects.filter((p) => p.status === "at_risk").length,
  delayed: projects.filter((p) => p.status === "delayed").length,
  completedMTD: 3,
}

export default function ProjectDashboard() {
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [sortBy, setSortBy] = React.useState<string>("progress")
  const [searchQuery, setSearchQuery] = React.useState<string>("")

  const filteredProjects = projects
    .filter((p) => {
      const matchesStatus = 
        statusFilter === "all" || 
        statusFilter === "active" || 
        p.status === statusFilter
      const matchesSearch = searchQuery === "" || 
        p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesStatus && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "progress") return b.progress - a.progress
      if (sortBy === "dueDate") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      if (sortBy === "value") return b.totalValue - a.totalValue
      return 0
    })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Project Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of all active construction projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-transparent">
              <FileText className="size-4 mr-2" />
              Reports
            </Button>
            <Button size="sm">
              <Plus className="size-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Active Projects
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stats.active}</p>
                </div>
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="size-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    On Track
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.onTrack}</p>
                </div>
                <div className="size-10 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="size-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    At Risk
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.atRisk}</p>
                </div>
                <div className="size-10 rounded-full bg-yellow-50 flex items-center justify-center">
                  <AlertTriangle className="size-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Delayed
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-1">{stats.delayed}</p>
                </div>
                <div className="size-10 rounded-full bg-red-50 flex items-center justify-center">
                  <XCircle className="size-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Completed MTD
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{stats.completedMTD}</p>
                </div>
                <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="size-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Status Overview */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Project Status Overview</CardTitle>
                  <CardDescription>Progress across all active projects</CardDescription>
                </div>
              </div>
              
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, project ID, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px] h-9">
                    <Filter className="size-4 mr-2" />
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="active">Active Projects</SelectItem>
                    <SelectItem value="on_track">On Track</SelectItem>
                    <SelectItem value="at_risk">At Risk</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProjects.map((project) => {
                const status = statusConfig[project.status as keyof typeof statusConfig]
                return (
                  <div
                    key={project.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border transition-colors hover:bg-muted/50",
                      status.borderColor
                    )}
                  >
                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground truncate">
                          {project.customerName}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {project.projectType}
                        </Badge>
                        <div
                          className={cn(
                            "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
                            status.bgColor,
                            status.color
                          )}
                        >
                          <div className={cn("size-1.5 rounded-full", status.dotColor)} />
                          {status.label}
                          {project.delayDays && ` (${project.delayDays}d)`}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.location} · {project.area.toLocaleString()} sq ft · {project.package}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="w-48 hidden md:block">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <Progress
                        value={project.progress}
                        className={cn(
                          "h-2",
                          project.status === "delayed" && "[&>div]:bg-red-500",
                          project.status === "at_risk" && "[&>div]:bg-yellow-500",
                          project.status === "on_track" && "[&>div]:bg-green-500"
                        )}
                      />
                    </div>

                    {/* Current Milestone */}
                    <div className="w-40 hidden lg:block text-right">
                      <p className="text-sm font-medium text-foreground">
                        M{project.milestoneNumber}: {project.currentMilestone}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(project.dueDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </p>
                    </div>

                    {/* Actions */}
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/projects/${project.id}`}>
                        <ChevronRight className="size-5" />
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Project Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Active Projects</h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="progress">Sort by Progress</SelectItem>
                <SelectItem value="dueDate">Sort by Due Date</SelectItem>
                <SelectItem value="value">Sort by Value</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const status = statusConfig[project.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              const collectedPercent = Math.round((project.collected / project.totalValue) * 100)

              return (
                <Card
                  key={project.id}
                  className={cn(
                    "overflow-hidden transition-all hover:shadow-md",
                    status.borderColor,
                    "border-t-4"
                  )}
                  style={{ borderTopColor: status.dotColor.replace("bg-", "") }}
                >
                  {/* Header */}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{project.customerName}</CardTitle>
                          <div className={cn("size-2 rounded-full", status.dotColor)} />
                        </div>
                        <CardDescription className="text-xs mt-0.5">
                          {project.id}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Timeline</DropdownMenuItem>
                          <DropdownMenuItem>Download Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Project Details */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2 className="size-4" />
                        <span>{project.projectType}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="size-4" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Ruler className="size-4" />
                        <span>{project.area.toLocaleString()} sq ft</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {project.package}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-semibold">{project.progress}%</span>
                      </div>
                      <Progress
                        value={project.progress}
                        className={cn(
                          "h-2.5",
                          project.status === "delayed" && "[&>div]:bg-red-500",
                          project.status === "at_risk" && "[&>div]:bg-yellow-500",
                          project.status === "on_track" && "[&>div]:bg-green-500"
                        )}
                      />
                    </div>

                    {/* Current Milestone */}
                    <div className="flex items-center justify-between py-2 border-y">
                      <div>
                        <p className="text-sm font-medium">Current: {project.currentMilestone}</p>
                        <p className="text-xs text-muted-foreground">
                          M{project.milestoneNumber} of {project.totalMilestones} milestones
                        </p>
                      </div>
                    </div>

                    {/* Contractor & Due Date */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <HardHat className="size-4 text-muted-foreground" />
                        <span className="truncate">{project.contractor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-muted-foreground" />
                        <span>
                          {new Date(project.dueDate).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Payment Collection */}
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Collected</span>
                        <span className="text-xs font-medium">{collectedPercent}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          {formatCurrency(project.collected)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / {formatCurrency(project.totalValue)}
                        </span>
                      </div>
                    </div>

                    {/* Issues */}
                    {project.issues.length > 0 ? (
                      <div className="flex items-start gap-2 p-2 rounded-lg bg-red-50 text-red-700">
                        <AlertTriangle className="size-4 mt-0.5 flex-shrink-0" />
                        <div className="text-xs">
                          {project.issues.map((issue, i) => (
                            <span key={i}>
                              {issue}
                              {i < project.issues.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 text-green-700">
                        <CheckCircle2 className="size-4" />
                        <span className="text-xs">No issues</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <Eye className="size-4 mr-1.5" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <FileText className="size-4 mr-1.5" />
                        Daily Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Split View: Today's Activities & Pending Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Today's Activities */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck className="size-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Today&apos;s Site Activities</CardTitle>
                  <CardDescription>Scheduled work across all sites</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 4).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <HardHat className="size-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{project.customerName}</h4>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{project.currentMilestone}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.todayActivity}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="size-3.5" />
                          <span>{project.workers} workers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <Bell className="size-4 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Requires Attention</CardTitle>
                  <CardDescription>{pendingActions.length} pending actions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingActions.map((action) => (
                  <div
                    key={action.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border",
                      action.severity === "high" && "border-red-200 bg-red-50/50",
                      action.severity === "medium" && "border-yellow-200 bg-yellow-50/50",
                      action.severity === "low" && "border-blue-200 bg-blue-50/50"
                    )}
                  >
                    <div
                      className={cn(
                        "size-2 rounded-full mt-2 flex-shrink-0",
                        action.severity === "high" && "bg-red-500",
                        action.severity === "medium" && "bg-yellow-500",
                        action.severity === "low" && "bg-blue-500"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{action.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs h-7 bg-transparent",
                        action.severity === "high" && "border-red-300 text-red-700 hover:bg-red-100",
                        action.severity === "medium" && "border-yellow-300 text-yellow-700 hover:bg-yellow-100",
                        action.severity === "low" && "border-blue-300 text-blue-700 hover:bg-blue-100"
                      )}
                    >
                      <Send className="size-3 mr-1" />
                      {action.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
