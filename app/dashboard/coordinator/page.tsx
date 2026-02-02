"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { DashboardHeader, type StatCardProps } from "@/components/shell/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  Inbox,
  Clock,
  MapPin,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronRight,
  Wand2,
  Upload,
  FileText,
  Settings,
  Check,
  X,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

// Chart colors
const chartColors = {
  facebook: "#1877F2",
  google: "#EA4335",
  website: "#14b8a6",
  walkin: "#f59e0b",
  referral: "#8b5cf6",
  today: "#3b82f6",
  yesterday: "#94a3b8",
}

// Team members for assignment
const teamMembers = [
  { id: "rahul", name: "Rahul Sharma", openLeads: 47, contacted: 12, pending: 5, responseTime: 8 },
  { id: "sneha", name: "Sneha Patel", openLeads: 52, contacted: 8, pending: 3, responseTime: 15 },
  { id: "arun", name: "Arun Kumar", openLeads: 38, contacted: 15, pending: 7, responseTime: 22 },
  { id: "priyanka", name: "Priyanka Reddy", openLeads: 41, contacted: 10, pending: 4, responseTime: 11 },
  { id: "vijay", name: "Vijay Singh", openLeads: 35, contacted: 14, pending: 2, responseTime: 9 },
  { id: "meera", name: "Meera Nair", openLeads: 44, contacted: 11, pending: 6, responseTime: 13 },
  { id: "karthik", name: "Karthik R", openLeads: 39, contacted: 9, pending: 5, responseTime: 18 },
  { id: "anita", name: "Anita Desai", openLeads: 43, contacted: 13, pending: 3, responseTime: 10 },
]

// Unassigned leads
const unassignedLeads = [
  { id: 1, name: "Ramesh Gupta", source: "Facebook", area: "Whitefield", time: "5 min ago" },
  { id: 2, name: "Sunita Sharma", source: "Google Ads", area: "Koramangala", time: "12 min ago" },
  { id: 3, name: "Vikram Patel", source: "Website", area: "HSR Layout", time: "18 min ago" },
  { id: 4, name: "Lakshmi Iyer", source: "Referral", area: "Indiranagar", time: "25 min ago" },
  { id: 5, name: "Ajay Menon", source: "Walk-in", area: "Electronic City", time: "32 min ago" },
  { id: 6, name: "Pooja Nair", source: "Facebook", area: "Marathahalli", time: "45 min ago" },
  { id: 7, name: "Deepak Rao", source: "Google Ads", area: "Jayanagar", time: "58 min ago" },
]

// Lead source data for pie chart
const leadSourceData = [
  { name: "Facebook", value: 45, color: chartColors.facebook },
  { name: "Google", value: 25, color: chartColors.google },
  { name: "Website", value: 15, color: chartColors.website },
  { name: "Walk-in", value: 10, color: chartColors.walkin },
  { name: "Referral", value: 5, color: chartColors.referral },
]

// Hourly lead trend data
const hourlyTrendData = [
  { hour: "9AM", today: 3, yesterday: 2 },
  { hour: "10AM", today: 5, yesterday: 4 },
  { hour: "11AM", today: 8, yesterday: 6 },
  { hour: "12PM", today: 4, yesterday: 7 },
  { hour: "1PM", today: 2, yesterday: 3 },
  { hour: "2PM", today: 6, yesterday: 5 },
  { hour: "3PM", today: 9, yesterday: 4 },
  { hour: "4PM", today: 7, yesterday: 8 },
  { hour: "5PM", today: 5, yesterday: 6 },
]

// Lead row component for unassigned queue
function LeadRow({
  lead,
  selected,
  onSelect,
  assignTo,
  onAssign,
}: {
  lead: typeof unassignedLeads[0]
  selected: boolean
  onSelect: (id: number) => void
  assignTo: string
  onAssign: (value: string) => void
}) {
  const sourceColors: Record<string, string> = {
    Facebook: "bg-blue-100 text-blue-700",
    "Google Ads": "bg-red-100 text-red-700",
    Website: "bg-teal-100 text-teal-700",
    "Walk-in": "bg-amber-100 text-amber-700",
    Referral: "bg-purple-100 text-purple-700",
  }

  return (
    <div className="flex items-center gap-4 py-3 px-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
      <Checkbox
        checked={selected}
        onCheckedChange={() => onSelect(lead.id)}
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{lead.name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className={`text-[10px] ${sourceColors[lead.source] || ""}`}>
            {lead.source}
          </Badge>
          <span>{lead.area}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{lead.time}</span>
      <Select value={assignTo} onValueChange={onAssign}>
        <SelectTrigger className="w-[140px] h-8 text-xs">
          <SelectValue placeholder="Assign to..." />
        </SelectTrigger>
        <SelectContent>
          {teamMembers.map((member) => (
            <SelectItem key={member.id} value={member.id} className="text-xs">
              {member.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

// Team performance row
function TeamRow({
  member,
  onClick,
}: {
  member: typeof teamMembers[0]
  onClick?: () => void
}) {
  const getResponseTimeStatus = (time: number) => {
    if (time <= 10) return { color: "text-success", icon: <Check className="size-3" /> }
    if (time <= 15) return { color: "text-muted-foreground", icon: null }
    return { color: "text-destructive", icon: <AlertTriangle className="size-3" /> }
  }

  const status = getResponseTimeStatus(member.responseTime)

  return (
    <div
      className="grid grid-cols-5 gap-4 py-3 px-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer items-center"
      onClick={onClick}
    >
      <div className="font-medium truncate">{member.name}</div>
      <div className="text-center">{member.openLeads}</div>
      <div className="text-center">{member.contacted}</div>
      <div className="text-center">{member.pending}</div>
      <div className={`flex items-center justify-center gap-1 ${status.color}`}>
        {member.responseTime} min
        {status.icon}
      </div>
    </div>
  )
}

// Alert component
function AlertItem({
  type,
  message,
}: {
  type: "error" | "warning" | "info"
  message: string
}) {
  const config = {
    error: { icon: <AlertCircle className="size-4" />, bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" },
    warning: { icon: <AlertTriangle className="size-4" />, bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
    info: { icon: <Info className="size-4" />, bg: "bg-info/10", text: "text-info", border: "border-info/20" },
  }

  const style = config[type]

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${style.bg} ${style.border}`}>
      <div className={style.text}>{style.icon}</div>
      <p className={`text-sm ${style.text}`}>{message}</p>
    </div>
  )
}

export default function SalesCoordinatorDashboard() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [selectedLeads, setSelectedLeads] = React.useState<number[]>([])
  const [leadAssignments, setLeadAssignments] = React.useState<Record<number, string>>({})
  const [isMounted, setIsMounted] = React.useState(false)
  
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Stats for coordinator
  const stats: StatCardProps[] = [
    {
      icon: Inbox,
      iconColor: "text-chart-1",
      iconBgColor: "bg-chart-1/10",
      label: "New Leads (Raw)",
      value: 23,
      subtext: "pending allocation",
    },
    {
      icon: Users,
      iconColor: "text-destructive",
      iconBgColor: "bg-destructive/10",
      label: "Unassigned",
      value: 7,
      subtext: "needs attention",
      subtextColor: "text-destructive",
    },
    {
      icon: Clock,
      iconColor: "text-success",
      iconBgColor: "bg-success/10",
      label: "Avg Response Time",
      value: "12 min",
      subtext: "within target",
      subtextColor: "text-success",
    },
    {
      icon: MapPin,
      iconColor: "text-chart-4",
      iconBgColor: "bg-chart-4/10",
      label: "Today's Conversions",
      value: 3,
      subtext: "site visits scheduled",
    },
  ]

  const handleSelectLead = (id: number) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedLeads.length === unassignedLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(unassignedLeads.map((l) => l.id))
    }
  }

  const handleAssignLead = (leadId: number, memberId: string) => {
    setLeadAssignments((prev) => ({ ...prev, [leadId]: memberId }))
  }

  return (
    <DashboardLayout
      userEmail={user?.email || "priya@wehouse.in"}
    >
      <div className={`space-y-6 ${isMounted ? 'dashboard-fade-in' : ''}`}>
        {/* Dashboard Header with Stats */}
        <div className={isMounted ? 'dashboard-slide-up dashboard-stagger-1' : ''}>
        <DashboardHeader stats={stats} />
        </div>

        {/* Row 2: Lead Allocation Section */}
        <Card className={isMounted ? 'dashboard-slide-up dashboard-stagger-2' : ''}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Unassigned Leads Queue</CardTitle>
                <CardDescription>
                  {unassignedLeads.length} leads awaiting assignment
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent" onClick={handleSelectAll}>
                  {selectedLeads.length === unassignedLeads.length ? (
                    <>
                      <X className="size-3.5 mr-1.5" />
                      Deselect All
                    </>
                  ) : (
                    <>
                      <Check className="size-3.5 mr-1.5" />
                      Select All
                    </>
                  )}
                </Button>
                <Button size="sm" className="bg-[hsl(var(--hover-bg))] hover:bg-[hsl(var(--hover-bg))]/80 text-foreground">
                  <Wand2 className="size-3.5 mr-1.5" />
                  Auto-Assign All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {unassignedLeads.map((lead) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  selected={selectedLeads.includes(lead.id)}
                  onSelect={handleSelectLead}
                  assignTo={leadAssignments[lead.id] || ""}
                  onAssign={(value) => handleAssignLead(lead.id, value)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Row 3: Team Performance Grid */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Team Performance</CardTitle>
                <CardDescription>Click on a team member to view details</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Export Report <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Header row */}
            <div className="grid grid-cols-5 gap-4 py-2 px-4 bg-muted/50 text-xs font-medium text-muted-foreground border-b">
              <div>Executive</div>
              <div className="text-center">Open Leads</div>
              <div className="text-center">Contacted Today</div>
              <div className="text-center">Pending Tasks</div>
              <div className="text-center">Response Time</div>
            </div>
            {/* Data rows */}
            <div className="max-h-[320px] overflow-auto">
              {teamMembers.map((member) => (
                <TeamRow key={member.id} member={member} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Row 4: Charts - Lead Source & Hourly Trend */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Lead Source Today - Pie Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Lead Source Today</CardTitle>
              <CardDescription>Distribution by acquisition channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="w-[180px] h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {leadSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, "Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {leadSourceData.map((source) => (
                    <div key={source.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="size-3 rounded-full"
                          style={{ backgroundColor: source.color }}
                        />
                        <span>{source.name}</span>
                      </div>
                      <span className="font-medium">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hourly Lead Trend - Line Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Hourly Lead Trend</CardTitle>
              <CardDescription>Leads received per hour: today vs yesterday</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="today"
                      stroke={chartColors.today}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="Today"
                    />
                    <Line
                      type="monotone"
                      dataKey="yesterday"
                      stroke={chartColors.yesterday}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3 }}
                      name="Yesterday"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 5: Alerts & Escalations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Alerts & Escalations</CardTitle>
            <CardDescription>Issues requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <AlertItem
              type="error"
              message="5 leads uncontacted for more than 4 hours"
            />
            <AlertItem
              type="warning"
              message="Arun Kumar has 7 overdue tasks"
            />
            <AlertItem
              type="info"
              message="3 site visits not updated with outcomes"
            />
          </CardContent>
        </Card>

        {/* Quick Actions Bar */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          <Button variant="outline" className="h-11 bg-transparent">
            <Inbox className="size-4 mr-2" />
            View Raw Leads
          </Button>
          <Button variant="outline" className="h-11 bg-transparent">
            <Upload className="size-4 mr-2" />
            Bulk Upload
          </Button>
          <Button variant="outline" className="h-11 bg-transparent">
            <FileText className="size-4 mr-2" />
            Team Report
          </Button>
          <Button variant="outline" className="h-11 bg-transparent">
            <Settings className="size-4 mr-2" />
            Source Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
