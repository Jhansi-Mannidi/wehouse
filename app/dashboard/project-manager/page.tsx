"use client"

import * as React from "react"
import Link from "next/link"
import {
  FolderKanban,
  Users,
  IndianRupee,
  Ticket,
  MapPin,
  BarChart3,
  ChevronRight,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wrench,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  HYDERABAD_PROJECTS,
  HYDERABAD_SITE_ENGINEERS,
  HYDERABAD_TICKETS,
  getProjectManagerAnalytics,
  type ProjectItem,
  type SiteEngineerItem,
  type TicketItem,
  type ProjectStage,
} from "@/lib/project-manager-dashboard-data"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Stage badge
function StageBadge({ stage }: { stage: ProjectStage }) {
  const labels: Record<ProjectStage, string> = {
    planning: "Planning",
    design: "Design",
    foundation: "Foundation",
    structure: "Structure",
    mep: "MEP",
    finishing: "Finishing",
    handover: "Handover",
  }
  const classes: Record<ProjectStage, string> = {
    planning: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    design: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    foundation: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    structure: "bg-primary/10 text-primary",
    mep: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400",
    finishing: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
    handover: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  }
  return (
    <Badge variant="secondary" className={cn("text-xs font-medium border-0", classes[stage])}>
      {labels[stage]}
    </Badge>
  )
}

// KPI stat card
function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string
  value: string | number
  subtext?: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
}) {
  return (
    <Card className="bg-card border-border shadow-sm overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mt-1 truncate">{value}</p>
            {subtext && <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>}
          </div>
          <div className={cn("flex size-10 sm:size-12 items-center justify-center rounded-lg shrink-0", iconBg)}>
            <Icon className={cn("size-5 sm:size-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProjectManagerDashboardPage() {
  const [isMounted, setIsMounted] = React.useState(false)
  const analytics = React.useMemo(() => getProjectManagerAnalytics(), [])

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <DashboardLayout showFilters={false}>
      <div className={cn("space-y-6", isMounted && "dashboard-fade-in")}>
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Project Manager Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5 flex items-center gap-1.5">
              <MapPin className="size-4" />
              Hyderabad
            </p>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 shrink-0">
            <Calendar className="size-4" />
            As of {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>

        {/* KPI row */}
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
            isMounted && "dashboard-slide-up dashboard-stagger-1"
          )}
        >
          <StatCard
            title="Total Projects"
            value={HYDERABAD_PROJECTS.length}
            subtext="Hyderabad"
            icon={FolderKanban}
            iconBg="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="Site Engineers"
            value={HYDERABAD_SITE_ENGINEERS.length}
            subtext="Active"
            icon={Users}
            iconBg="bg-green-100 dark:bg-green-900/30"
            iconColor="text-green-600 dark:text-green-400"
          />
          <StatCard
            title="Budget Utilized"
            value={analytics.budgetSummary.utilizedPercent + "%"}
            subtext={analytics.budgetSummary.totalSpent + " of " + analytics.budgetSummary.totalBudget}
            icon={IndianRupee}
            iconBg="bg-amber-100 dark:bg-amber-900/30"
            iconColor="text-amber-600 dark:text-amber-400"
          />
          <StatCard
            title="Open Tickets"
            value={analytics.ticketSummary.open + analytics.ticketSummary.inProgress}
            subtext={analytics.ticketSummary.resolved + " resolved"}
            icon={Ticket}
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />
        </div>

        {/* Analytics: Projects by stage + Budget by project */}
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", isMounted && "dashboard-slide-up dashboard-stagger-2")}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <BarChart3 className="size-4 text-primary" />
                </div>
                Projects by Stage
              </CardTitle>
              <CardDescription className="text-muted-foreground">Hyderabad — current stage distribution</CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.projectsByStage.length > 0 ? (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="h-[200px] w-full max-w-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analytics.projectsByStage}
                          dataKey="count"
                          nameKey="label"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={2}
                          label={({ name, count }) => `${name}: ${count}`}
                        >
                          {analytics.projectsByStage.map((entry, i) => (
                            <Cell key={entry.stage} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number, name: string) => [value, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    {analytics.projectsByStage.map((item) => (
                      <div key={item.stage} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        <span className="font-medium text-foreground">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-8 text-center">No project stage data.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <IndianRupee className="size-4 text-primary" />
                </div>
                Budget by Project
              </CardTitle>
              <CardDescription className="text-muted-foreground">Spent vs budget (₹ Cr)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics.budgetByProject}
                    layout="vertical"
                    margin={{ top: 4, right: 8, left: 60, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `₹${v}`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={58} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, _name: string, props: { payload: { budget: number; percent: number } }) => [
                        `₹${value} Cr (${props.payload.percent}% of ₹${props.payload.budget} Cr)`,
                        "Spent",
                      ]}
                    />
                    <Bar dataKey="spent" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Spent (Cr)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects table + Site engineers */}
        <div className={cn("grid grid-cols-1 xl:grid-cols-3 gap-6", isMounted && "dashboard-slide-up dashboard-stagger-3")}>
          <Card className="xl:col-span-2 bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-foreground">Projects — Hyderabad</CardTitle>
                  <CardDescription className="text-muted-foreground">Stage, budget & progress</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 bg-transparent border-border" asChild>
                  <Link href="/projects">
                    View all
                    <ChevronRight className="size-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground font-medium">Project</TableHead>
                      <TableHead className="text-muted-foreground font-medium">Stage</TableHead>
                      <TableHead className="text-muted-foreground font-medium text-right">Budget</TableHead>
                      <TableHead className="text-muted-foreground font-medium text-right">Spent</TableHead>
                      <TableHead className="text-muted-foreground font-medium text-center">Progress</TableHead>
                      <TableHead className="text-muted-foreground font-medium text-center">Tickets</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {HYDERABAD_PROJECTS.map((project) => (
                      <TableRow key={project.id} className="border-border">
                        <TableCell className="font-medium text-foreground">{project.name}</TableCell>
                        <TableCell><StageBadge stage={project.stage} /></TableCell>
                        <TableCell className="text-right text-foreground text-sm">₹{project.budgetCr} Cr</TableCell>
                        <TableCell className="text-right text-muted-foreground text-sm">₹{project.spentCr} Cr</TableCell>
                        <TableCell className="text-center">
                          <Progress value={project.progress} className="h-2 w-20 mx-auto" />
                          <span className="text-xs text-muted-foreground block mt-0.5">{project.progress}%</span>
                        </TableCell>
                        <TableCell className="text-center">
                          {project.openTickets > 0 ? (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 text-xs">
                              {project.openTickets}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Mobile cards */}
              <div className="md:hidden space-y-3 px-4 pb-4">
                {HYDERABAD_PROJECTS.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Users className="size-4 text-primary" />
                </div>
                Site Engineers
              </CardTitle>
              <CardDescription className="text-muted-foreground">Hyderabad — assigned projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {HYDERABAD_SITE_ENGINEERS.map((se) => (
                  <div
                    key={se.id}
                    className="rounded-lg border border-border bg-muted/20 dark:bg-muted/10 p-3 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm">{se.name}</span>
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {se.projectsCount} projects
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Wrench className="size-3.5" />
                      <span>{se.activeTickets} active tickets</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent border-border" asChild>
                <Link href="/projects">
                  View projects
                  <ChevronRight className="size-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Raise ticketing + Recent tickets */}
        <Card className={cn("bg-card border-border", isMounted && "dashboard-slide-up dashboard-stagger-4")}>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <Ticket className="size-4 text-primary" />
                  </div>
                  Ticketing
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Open: {analytics.ticketSummary.open} · In progress: {analytics.ticketSummary.inProgress} · Resolved: {analytics.ticketSummary.resolved}
                </CardDescription>
              </div>
              <Button size="sm" className="shrink-0 w-full sm:w-auto">
                <Plus className="size-4 mr-2" />
                Raise Ticket
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {HYDERABAD_TICKETS.slice(0, 5).map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-muted-foreground" asChild>
              <Link href="/site-engineer/tickets">
                View all tickets
                <ChevronRight className="size-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <span className="font-semibold text-foreground truncate">{project.name}</span>
          <StageBadge stage={project.stage} />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Budget</span>
            <p className="font-medium text-foreground">₹{project.budgetCr} Cr</p>
          </div>
          <div>
            <span className="text-muted-foreground">Spent</span>
            <p className="font-medium text-foreground">₹{project.spentCr} Cr</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">Open tickets</span>
          {project.openTickets > 0 ? (
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 text-xs">
              {project.openTickets}
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </div>
        <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
          <Link href={`/projects/${project.id}`}>
            View project
            <ChevronRight className="size-4 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function TicketRow({ ticket }: { ticket: TicketItem }) {
  const statusConfig = {
    open: { label: "Open", icon: AlertTriangle, className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
    in_progress: { label: "In progress", icon: Clock, className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
    resolved: { label: "Resolved", icon: CheckCircle2, className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  }
  const priorityConfig = {
    high: "text-red-600 dark:text-red-400",
    medium: "text-amber-600 dark:text-amber-400",
    low: "text-muted-foreground",
  }
  const config = statusConfig[ticket.status]
  const Icon = config.icon
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{ticket.title}</p>
        <p className="text-xs text-muted-foreground truncate">{ticket.projectName}</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className={cn("text-xs border-0", config.className)}>
          <Icon className="size-3 mr-1" />
          {config.label}
        </Badge>
        <span className={cn("text-xs font-medium capitalize", priorityConfig[ticket.priority])}>{ticket.priority}</span>
        <span className="text-xs text-muted-foreground">
          {new Date(ticket.raisedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </span>
      </div>
    </div>
  )
}
