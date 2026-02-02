"use client"

import * as React from "react"
import Link from "next/link"
import {
  Building2,
  ClipboardList,
  AlertCircle,
  FileText,
  MessageSquare,
  GitPullRequest,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  User,
  Calendar,
  Star,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for Site Engineer Dashboard
const siteEngineerData = {
  name: "Ravi Kumar",
  city: "Hyderabad",
  stats: {
    myProjects: 5,
    activeMilestones: 8,
    pendingActions: 12,
    openTickets: 3,
    changeRequests: 2,
    dailyReportsDue: 2,
  },
  priorities: [
    {
      id: 1,
      priority: "high",
      type: "milestone",
      title: "Complete plastering - Rajesh Kumar (M11)",
      subtitle: "Progress: 65% - Target: 80%",
      due: "Today",
      projectId: "WH-HYD-2024-001",
    },
    {
      id: 2,
      priority: "medium",
      type: "ticket",
      title: "Respond to ticket - Quality Issue (TKT-00045)",
      subtitle: "Customer: Rajesh Kumar | M11: Internal Plastering",
      due: "Open: 2 days",
      ticketId: "TKT-00045",
    },
    {
      id: 3,
      priority: "info",
      type: "report",
      title: "Daily report due - Venkat Menon project",
      subtitle: "WH-HYD-2024-003",
      due: "Due: 7 PM",
      projectId: "WH-HYD-2024-003",
    },
    {
      id: 4,
      priority: "medium",
      type: "change_request",
      title: "Review change request - Tile upgrade (CR-00012)",
      subtitle: "Customer: Priya Sharma | M15: Flooring",
      due: "Pending: 1 day",
      crId: "CR-00012",
    },
  ],
  recentProjects: [
    {
      id: "WH-HYD-2024-001",
      customer: "Rajesh Kumar",
      type: "3BHK Villa",
      location: "Whitefield",
      progress: 45,
      status: "on_track",
      currentMilestone: "M11 - Internal Plastering",
      paidMilestones: 11,
      unlockedMilestones: 2,
      lockedMilestones: 11,
      openTickets: 1,
      avgRating: 4.5,
    },
    {
      id: "WH-HYD-2024-002",
      customer: "Priya Sharma",
      type: "4BHK Villa",
      location: "Electronic City",
      progress: 62,
      status: "at_risk",
      currentMilestone: "M15 - Flooring",
      delayDays: 3,
      delayReason: "Material delivery delayed",
      paidMilestones: 15,
      unlockedMilestones: 1,
      lockedMilestones: 8,
      openTickets: 2,
      avgRating: 4.2,
    },
    {
      id: "WH-HYD-2024-003",
      customer: "Venkat Menon",
      type: "2BHK Apartment",
      location: "HSR Layout",
      progress: 28,
      status: "on_track",
      currentMilestone: "M7 - Roof Slab",
      paidMilestones: 7,
      unlockedMilestones: 1,
      lockedMilestones: 16,
      openTickets: 0,
      avgRating: 4.8,
    },
  ],
}

// KPI Card Component
function KPICard({
  icon: Icon,
  label,
  value,
  variant = "default",
}: {
  icon: React.ElementType
  label: string
  value: number | string
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info"
}) {
  const variantStyles = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info",
  }
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-xl", variantStyles[variant])}>
            <Icon className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Priority Item Component
function PriorityItem({
  item,
}: {
  item: (typeof siteEngineerData.priorities)[0]
}) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return { color: "bg-destructive", badge: "destructive" as const, label: "HIGH" }
      case "medium":
        return { color: "bg-warning", badge: "warning" as const, label: "MED" }
      case "info":
        return { color: "bg-info", badge: "info" as const, label: "INFO" }
      default:
        return { color: "bg-muted", badge: "secondary" as const, label: priority.toUpperCase() }
    }
  }

  const config = getPriorityConfig(item.priority)

  return (
    <div className="flex items-start gap-4 p-4 border border-border rounded-xl hover:bg-muted/30 hover:border-primary/20 transition-all duration-200">
      <div className={cn("w-1 h-full min-h-[60px] rounded-full", config.color)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant={config.badge} className="text-xs font-semibold">
            {config.label}
          </Badge>
          <span className="text-xs text-muted-foreground">{item.due}</span>
        </div>
        <p className="font-semibold text-sm">{item.title}</p>
        <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
        <div className="flex items-center gap-2 mt-3">
          {item.type === "milestone" && (
            <>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent" asChild>
                <Link href={`/projects/${item.projectId}/milestones`}>Update Progress</Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
                <Link href={`/projects/${item.projectId}`}>View Project</Link>
              </Button>
            </>
          )}
          {item.type === "ticket" && (
            <>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent" asChild>
                <Link href={`/site-engineer/tickets/${item.ticketId}`}>View Ticket</Link>
              </Button>
              <Button size="sm" className="h-8 text-xs">
                Respond
              </Button>
            </>
          )}
          {item.type === "report" && (
            <Button size="sm" className="h-8 text-xs" asChild>
              <Link href={`/site-engineer/daily-report?project=${item.projectId}`}>Submit Report</Link>
            </Button>
          )}
          {item.type === "change_request" && (
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent" asChild>
              <Link href={`/site-engineer/change-requests/${item.crId}`}>Review Request</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({
  project,
}: {
  project: (typeof siteEngineerData.recentProjects)[0]
}) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "on_track":
        return { label: "ON TRACK", variant: "success" as const }
      case "at_risk":
        return { label: "AT RISK", variant: "warning" as const }
      case "delayed":
        return { label: "DELAYED", variant: "destructive" as const }
      default:
        return { label: status.toUpperCase(), variant: "secondary" as const }
    }
  }

  const statusConfig = getStatusConfig(project.status)

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-bold">{project.id}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
              <User className="size-3" />
              {project.customer}
            </p>
          </div>
          <Badge variant={statusConfig.variant}>
            {statusConfig.label}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="font-medium">{project.type}</span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {project.location}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground font-medium">Progress</span>
            <span className="font-bold">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2.5" />
        </div>

        <p className="text-xs mb-4">
          <span className="text-muted-foreground">Current: </span>
          <span className="font-semibold">{project.currentMilestone}</span>
        </p>

        {project.status === "at_risk" && project.delayDays && (
          <div className="flex items-center gap-2 text-xs bg-warning/10 text-warning p-3 rounded-lg mb-4">
            <AlertTriangle className="size-4" />
            <span className="font-medium">{project.delayDays} days behind - {project.delayReason}</span>
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-success" />
            Paid: {project.paidMilestones}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            Unlocked: {project.unlockedMilestones}
          </span>
          <span className="flex items-center gap-1.5">
            <AlertCircle className="size-3.5 text-muted-foreground" />
            Locked: {project.lockedMilestones}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="size-3.5" />
            Tickets: {project.openTickets}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5 text-primary fill-primary" />
            {project.avgRating.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
            <Link href={`/projects/${project.id}`}>View Project</Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/projects/${project.id}/milestones`}>Update Progress</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SiteEngineerDashboardPage() {
  const [isMounted, setIsMounted] = React.useState(false)
  
  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  const { stats, priorities, recentProjects, name, city } = siteEngineerData

  return (
    <DashboardLayout>
      <div className={`space-y-8 ${isMounted ? 'dashboard-fade-in' : ''}`}>
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Welcome, {name}!
            </h1>
            <p className="text-muted-foreground flex items-center gap-3 mt-2">
              <Badge variant="gold" className="text-xs">Site Engineer</Badge>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {city}
              </span>
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/site-engineer/daily-report">
              <FileText className="size-5 mr-2" />
              Submit Daily Report
            </Link>
          </Button>
        </div>

        {/* KPI Cards */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${isMounted ? 'dashboard-slide-up dashboard-stagger-1' : ''}`}>
          <KPICard
            icon={Building2}
            label="My Projects"
            value={stats.myProjects}
            variant="info"
          />
          <KPICard
            icon={ClipboardList}
            label="Active Milestones"
            value={stats.activeMilestones}
            variant="success"
          />
          <KPICard
            icon={AlertCircle}
            label="Pending Actions"
            value={stats.pendingActions}
            variant="warning"
          />
          <KPICard
            icon={MessageSquare}
            label="Open Tickets"
            value={stats.openTickets}
            variant="danger"
          />
          <KPICard
            icon={GitPullRequest}
            label="Change Requests"
            value={stats.changeRequests}
            variant="primary"
          />
          <KPICard
            icon={FileText}
            label="Reports Due"
            value={stats.dailyReportsDue}
            variant="info"
          />
        </div>

        {/* Today's Priorities */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Calendar className="size-5 text-primary" />
                </div>
                Today's Priorities
              </span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/site-engineer/tasks">
                  View All
                  <ChevronRight className="size-4 ml-1" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorities.map((item) => (
              <PriorityItem key={item.id} item={item} />
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/site-engineer/my-projects">
              <Building2 className="size-4 mr-2" />
              View All Projects
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/site-engineer/tickets">
              <MessageSquare className="size-4 mr-2" />
              View Tickets
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/site-engineer/change-requests">
              <GitPullRequest className="size-4 mr-2" />
              Change Requests
            </Link>
          </Button>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">My Projects</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/site-engineer/my-projects">
                View All
                <ChevronRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
