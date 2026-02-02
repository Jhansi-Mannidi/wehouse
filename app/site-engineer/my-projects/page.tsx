"use client"

import * as React from "react"
import Link from "next/link"
import {
  Building2,
  Search,
  Filter,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  MapPin,
  User,
  Star,
  MessageSquare,
  Lock,
  Unlock,
  FileText,
  ArrowLeft,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for My Projects
const projectsData = [
  {
    id: "WH-HYD-2024-001",
    customer: "Rajesh Kumar",
    type: "3BHK Villa",
    location: "Whitefield",
    progress: 45,
    status: "on_track",
    currentMilestone: "M11 - Internal Plastering",
    milestoneStatus: "In Progress",
    paidMilestones: 11,
    unlockedMilestones: 2,
    lockedMilestones: 11,
    openTickets: 1,
    avgRating: 4.5,
    totalMilestones: 24,
  },
  {
    id: "WH-HYD-2024-002",
    customer: "Priya Sharma",
    type: "4BHK Villa",
    location: "Electronic City",
    progress: 62,
    status: "at_risk",
    currentMilestone: "M15 - Flooring",
    milestoneStatus: "In Progress",
    delayDays: 3,
    delayReason: "Material delivery delayed",
    paidMilestones: 15,
    unlockedMilestones: 1,
    lockedMilestones: 8,
    openTickets: 2,
    avgRating: 4.2,
    totalMilestones: 24,
  },
  {
    id: "WH-HYD-2024-003",
    customer: "Venkat Menon",
    type: "2BHK Apartment",
    location: "HSR Layout",
    progress: 28,
    status: "on_track",
    currentMilestone: "M7 - Roof Slab",
    milestoneStatus: "In Progress",
    paidMilestones: 7,
    unlockedMilestones: 1,
    lockedMilestones: 16,
    openTickets: 0,
    avgRating: 4.8,
    totalMilestones: 24,
  },
  {
    id: "WH-HYD-2024-004",
    customer: "Sunita Reddy",
    type: "3BHK Villa",
    location: "Koramangala",
    progress: 85,
    status: "on_track",
    currentMilestone: "M21 - Painting",
    milestoneStatus: "In Progress",
    paidMilestones: 21,
    unlockedMilestones: 1,
    lockedMilestones: 2,
    openTickets: 0,
    avgRating: 4.9,
    totalMilestones: 24,
  },
  {
    id: "WH-HYD-2024-005",
    customer: "Amit Patel",
    type: "5BHK Villa",
    location: "Sarjapur Road",
    progress: 12,
    status: "on_track",
    currentMilestone: "M3 - Plinth Beam",
    milestoneStatus: "Unlocked",
    paidMilestones: 3,
    unlockedMilestones: 1,
    lockedMilestones: 20,
    openTickets: 0,
    avgRating: null,
    totalMilestones: 24,
  },
]

const statusFilters = [
  { label: "All Status", value: "all" },
  { label: "On Track", value: "on_track" },
  { label: "At Risk", value: "at_risk" },
  { label: "Delayed", value: "delayed" },
  { label: "Completed", value: "completed" },
]

// Project Card Component
function ProjectCard({
  project,
}: {
  project: (typeof projectsData)[0]
}) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "on_track":
        return { label: "ON TRACK", color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" }
      case "at_risk":
        return { label: "AT RISK", color: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" }
      case "delayed":
        return { label: "DELAYED", color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" }
      case "completed":
        return { label: "COMPLETED", color: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" }
      default:
        return { label: status.toUpperCase(), color: "bg-gray-100 text-gray-700", dot: "bg-gray-500" }
    }
  }

  const statusConfig = getStatusConfig(project.status)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-bold text-base">{project.id}</p>
          </div>
          <Badge variant="outline" className={cn("text-xs font-semibold", statusConfig.color)}>
            <span className={cn("size-1.5 rounded-full mr-1.5", statusConfig.dot)} />
            {statusConfig.label}
          </Badge>
        </div>

        {/* Customer Info */}
        <div className="space-y-1 mb-4">
          <p className="text-sm flex items-center gap-2">
            <User className="size-4 text-muted-foreground" />
            <span className="font-medium">{project.customer}</span>
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Building2 className="size-4" />
            {project.type}
            <span className="mx-1">|</span>
            <MapPin className="size-3" />
            {project.location}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2.5" />
        </div>

        {/* Current Milestone */}
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Current Milestone</p>
          <p className="font-medium text-sm">{project.currentMilestone}</p>
          <Badge variant="secondary" className="mt-1.5 text-xs">
            {project.milestoneStatus}
          </Badge>
        </div>

        {/* Delay Alert */}
        {project.status === "at_risk" && project.delayDays && (
          <div className="flex items-start gap-2 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg mb-4">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{project.delayDays} days behind schedule</p>
              <p className="text-xs text-yellow-600 mt-0.5">Reason: {project.delayReason}</p>
            </div>
          </div>
        )}

        {/* Milestone Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-green-600" />
            <span className="font-semibold text-foreground">{project.paidMilestones}</span> Paid
          </span>
          <span className="flex items-center gap-1.5">
            <Unlock className="size-3.5 text-orange-600" />
            <span className="font-semibold text-foreground">{project.unlockedMilestones}</span> Unlocked
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="size-3.5 text-gray-400" />
            <span className="font-semibold text-foreground">{project.lockedMilestones}</span> Locked
          </span>
        </div>

        {/* Tickets & Rating */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="size-3.5" />
            Open Tickets: <span className="font-semibold text-foreground">{project.openTickets}</span>
          </span>
          {project.avgRating && (
            <span className="flex items-center gap-1.5">
              <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
              Avg Rating: <span className="font-semibold text-foreground">{project.avgRating.toFixed(1)}</span>
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-stretch gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1 h-9 text-xs bg-transparent justify-center" asChild>
            <Link href="/site-engineer/milestones">View Project</Link>
          </Button>
          <Button variant="default" size="sm" className="flex-1 h-9 text-xs justify-center" asChild>
            <Link href="/site-engineer/milestones">Update Progress</Link>
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-transparent flex items-center justify-center" asChild>
            <Link href={`/site-engineer/daily-report?project=${project.id}`}>
              <FileText className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MyProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  // Filter projects
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Stats
  const stats = {
    active: projectsData.length,
    onTrack: projectsData.filter((p) => p.status === "on_track").length,
    atRisk: projectsData.filter((p) => p.status === "at_risk").length,
    completed: projectsData.filter((p) => p.status === "completed").length,
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/site-engineer/dashboard">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">My Projects</h1>
            <p className="text-muted-foreground text-sm">Manage your assigned construction projects</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                <Filter className="size-4 mr-2" />
                {statusFilters.find((f) => f.value === statusFilter)?.label}
                <ChevronDown className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={cn(statusFilter === filter.value && "bg-accent")}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="size-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No projects found</p>
              <p className="text-sm text-muted-foreground/70">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
