"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  IndianRupee,
  Building2,
  Users,
  Hammer,
  MoreVertical,
  ChevronRight
} from "lucide-react"

export function CardShowcase() {
  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Stat Cards (KPI)</h4>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Turnkey Partners"
            value="355"
            breakdown={[
              { label: "Approved", value: "276" },
              { label: "Rejected", value: "52" },
              { label: "Pending", value: "27" },
            ]}
            color="teal"
          />
          <StatCard
            title="Total Skilled Workers"
            value="499"
            breakdown={[
              { label: "Approved", value: "446" },
              { label: "Rejected", value: "38" },
              { label: "Pending", value: "15" },
            ]}
            color="blue"
          />
          <StatCard
            title="Total Architect Partners"
            value="93"
            breakdown={[
              { label: "Approved", value: "78" },
              { label: "Rejected", value: "11" },
              { label: "Pending", value: "4" },
            ]}
            color="pink"
          />
          <StatCard
            title="Total Interior Partners"
            value="161"
            breakdown={[
              { label: "Approved", value: "136" },
              { label: "Rejected", value: "15" },
              { label: "Pending", value: "10" },
            ]}
            color="orange"
          />
        </div>
      </div>

      {/* Lead Cards */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Lead Cards</h4>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <LeadCard
            name="Rajesh Sharma"
            status="qualified"
            phone="+91 98765 43210"
            email="rajesh.sharma@email.com"
            location="Hyderabad"
            budget="75 Lakhs"
            source="Website"
            assignedTo="Priya S."
          />
          <LeadCard
            name="Anjali Reddy"
            status="proposal"
            phone="+91 87654 32109"
            email="anjali.reddy@email.com"
            location="Bangalore"
            budget="1.2 Crores"
            source="Referral"
            assignedTo="Amit P."
          />
          <LeadCard
            name="Vikram Patel"
            status="new"
            phone="+91 76543 21098"
            email="vikram.patel@email.com"
            location="Chennai"
            budget="50 Lakhs"
            source="Facebook"
            assignedTo="Unassigned"
          />
        </div>
      </div>

      {/* Project Cards */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Project Cards</h4>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            id="WH-2024-001"
            name="Sharma Villa"
            client="Rajesh Sharma"
            location="Jubilee Hills, Hyderabad"
            status="in-progress"
            progress={65}
            currentPhase="Foundation"
            startDate="15 Jan 2024"
            budget="75 Lakhs"
          />
          <ProjectCard
            id="WH-2024-002"
            name="Reddy Residence"
            client="Anjali Reddy"
            location="Whitefield, Bangalore"
            status="on-hold"
            progress={35}
            currentPhase="Design Approval"
            startDate="01 Feb 2024"
            budget="1.2 Crores"
          />
          <ProjectCard
            id="WH-2024-003"
            name="Patel Home"
            client="Vikram Patel"
            location="Anna Nagar, Chennai"
            status="completed"
            progress={100}
            currentPhase="Handover"
            startDate="10 Oct 2023"
            budget="50 Lakhs"
          />
        </div>
      </div>

      {/* Task Cards */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Task Cards</h4>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TaskCard
            title="Foundation Inspection"
            project="Sharma Villa"
            dueDate="Today"
            priority="high"
            assignee="Rahul M."
          />
          <TaskCard
            title="Material Procurement"
            project="Reddy Residence"
            dueDate="Tomorrow"
            priority="medium"
            assignee="Suresh K."
          />
          <TaskCard
            title="Design Review Meeting"
            project="Patel Home"
            dueDate="Next Week"
            priority="low"
            assignee="Priya S."
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  breakdown,
  color,
}: {
  title: string
  value: string
  breakdown: { label: string; value: string }[]
  color: "teal" | "blue" | "pink" | "orange"
}) {
  const colorClasses = {
    teal: "bg-chart-1",
    blue: "bg-chart-2",
    pink: "bg-chart-3",
    orange: "bg-chart-4",
  }

  return (
    <Card className={`${colorClasses[color]} border-none text-white`}>
      <CardHeader className="pb-2">
        <CardDescription className="text-white/80 text-xs">{title}</CardDescription>
        <CardTitle className="text-4xl font-bold tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-xs">
          {breakdown.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-semibold tabular-nums">{item.value}</p>
              <p className="text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function LeadCard({
  name,
  status,
  phone,
  email,
  location,
  budget,
  source,
  assignedTo,
}: {
  name: string
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost"
  phone: string
  email: string
  location: string
  budget: string
  source: string
  assignedTo: string
}) {
  const statusConfig = {
    new: { label: "New", variant: "default" as const },
    contacted: { label: "Contacted", variant: "secondary" as const },
    qualified: { label: "Qualified", variant: "default" as const },
    proposal: { label: "Proposal", variant: "default" as const },
    won: { label: "Won", variant: "default" as const },
    lost: { label: "Lost", variant: "destructive" as const },
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-semibold">{name}</CardTitle>
            <Badge 
              variant={statusConfig[status].variant}
              className={
                status === "qualified" ? "bg-success text-success-foreground" :
                status === "proposal" ? "bg-warning text-warning-foreground" :
                status === "won" ? "bg-success text-success-foreground" :
                status === "new" ? "bg-info text-info-foreground" : ""
              }
            >
              {statusConfig[status].label}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-3.5 w-3.5" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-3.5 w-3.5" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <IndianRupee className="h-3.5 w-3.5" />
          <span>{budget}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        <span>Source: {source}</span>
        <span>Assigned: {assignedTo}</span>
      </CardFooter>
    </Card>
  )
}

function ProjectCard({
  id,
  name,
  client,
  location,
  status,
  progress,
  currentPhase,
  startDate,
  budget,
}: {
  id: string
  name: string
  client: string
  location: string
  status: "planning" | "in-progress" | "on-hold" | "completed"
  progress: number
  currentPhase: string
  startDate: string
  budget: string
}) {
  const statusConfig = {
    planning: { label: "Planning", className: "bg-info text-info-foreground" },
    "in-progress": { label: "In Progress", className: "bg-success text-success-foreground" },
    "on-hold": { label: "On Hold", className: "bg-warning text-warning-foreground" },
    completed: { label: "Completed", className: "bg-chart-1 text-white" },
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-mono text-muted-foreground">{id}</p>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          </div>
          <Badge className={statusConfig[status].className}>
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{client}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{location}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Hammer className="h-4 w-4 text-accent" />
          <span className="font-medium">{currentPhase}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{startDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <IndianRupee className="h-3 w-3" />
          <span>{budget}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function TaskCard({
  title,
  project,
  dueDate,
  priority,
  assignee,
}: {
  title: string
  project: string
  dueDate: string
  priority: "high" | "medium" | "low"
  assignee: string
}) {
  const priorityConfig = {
    high: { label: "High", className: "bg-destructive text-destructive-foreground" },
    medium: { label: "Medium", className: "bg-warning text-warning-foreground" },
    low: { label: "Low", className: "bg-muted text-muted-foreground" },
  }

  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Badge className={priorityConfig[priority].className} variant="secondary">
            {priorityConfig[priority].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-3.5 w-3.5" />
          <span>{project}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{dueDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarFallback className="text-[10px] bg-secondary">
              {assignee.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span>{assignee}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
