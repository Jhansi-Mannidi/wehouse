"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useRole } from "@/lib/role-context"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { DashboardHeader, type StatCardProps } from "@/components/shell/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FolderKanban,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Phone,
  CheckSquare,
  FileText,
} from "lucide-react"

interface TaskItemProps {
  title: string
  subtitle: string
  time: string
  type: "call" | "meeting" | "task"
  priority?: "high" | "medium" | "low"
}

function TaskItem({ title, subtitle, time, type, priority = "medium" }: TaskItemProps) {
  const priorityColors = {
    high: "bg-destructive text-destructive-foreground",
    medium: "bg-warning text-warning-foreground",
    low: "bg-muted text-muted-foreground",
  }

  const typeIcons = {
    call: <Phone className="size-4" />,
    meeting: <Calendar className="size-4" />,
    task: <Clock className="size-4" />,
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border p-3">
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
        {typeIcons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge className={priorityColors[priority]} variant="secondary">
          {priority}
        </Badge>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const { isLoading, user } = useAuth()
  const { selectedRole } = useRole()

  // Redirect Super Admin to Management Dashboard
  React.useEffect(() => {
    if (!isLoading && selectedRole === "super_admin") {
      router.replace("/dashboard/management")
    }
  }, [isLoading, selectedRole, router])

  // Show loading state only briefly
  if (isLoading || selectedRole === "super_admin") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Stats for Super Admin dashboard
  const stats: StatCardProps[] = [
    {
      icon: Users,
      iconColor: "text-chart-1",
      iconBgColor: "bg-chart-1/10",
      label: "Total Leads",
      value: 355,
      subtext: "+43 this week",
      subtextColor: "text-success",
    },
    {
      icon: CheckSquare,
      iconColor: "text-chart-2",
      iconBgColor: "bg-chart-2/10",
      label: "Pending Tasks",
      value: 89,
      subtext: "12 due today",
      subtextColor: "text-destructive",
    },
    {
      icon: FolderKanban,
      iconColor: "text-chart-3",
      iconBgColor: "bg-chart-3/10",
      label: "Active Projects",
      value: 42,
      subtext: "+5 this month",
      subtextColor: "text-success",
    },
    {
      icon: FileText,
      iconColor: "text-chart-4",
      iconBgColor: "bg-chart-4/10",
      label: "Reports Generated",
      value: 156,
      subtext: "+23 this week",
      subtextColor: "text-success",
    },
  ]

  return (
    <DashboardLayout
      userEmail={user?.email || "admin@wehouse.in"}
    >
      <div className="space-y-6">
        {/* Dashboard Header with Stats */}
        <DashboardHeader stats={stats} />

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{"Today's Tasks"}</CardTitle>
                <CardDescription>Your scheduled activities for today</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <TaskItem
                title="Follow up with Priya Patel"
                subtitle="Interested in 3BHK Villa - Whitefield"
                time="10:00 AM"
                type="call"
                priority="high"
              />
              <TaskItem
                title="Site Visit - Villa #234"
                subtitle="With Amit Kumar & family"
                time="2:00 PM"
                type="meeting"
                priority="high"
              />
              <TaskItem
                title="Send Quote to Ramesh Gupta"
                subtitle="4BHK Villa - Electronic City"
                time="4:00 PM"
                type="task"
                priority="medium"
              />
              <TaskItem
                title="Review contract documents"
                subtitle="For Sunita Reddy - HSR Layout"
                time="5:30 PM"
                type="task"
                priority="low"
              />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>{"This month's metrics"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-chart-1" />
                  <span className="text-sm">Calls Made</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">127</span>
                  <TrendingUp className="size-4 text-success" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-chart-2" />
                  <span className="text-sm">Site Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">34</span>
                  <TrendingUp className="size-4 text-success" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-chart-3" />
                  <span className="text-sm">Quotes Sent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">18</span>
                  <TrendingDown className="size-4 text-destructive" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-chart-4" />
                  <span className="text-sm">Deals Closed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">8</span>
                  <TrendingUp className="size-4 text-success" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-sm text-muted-foreground">Target Achievement</p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-chart-1 to-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Amit Singh", action: "closed a deal", target: "Villa #456 - Electronic City", time: "2 min ago", color: "bg-chart-4" },
                { user: "Priya Sharma", action: "added a new lead", target: "Rahul Mehta - Whitefield", time: "15 min ago", color: "bg-chart-1" },
                { user: "Rajesh Kumar", action: "completed site visit", target: "Villa #234 - HSR Layout", time: "1 hour ago", color: "bg-chart-2" },
                { user: "Sunita Patel", action: "sent quote to", target: "Vikram Reddy - Sarjapur", time: "2 hours ago", color: "bg-chart-3" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`size-2 rounded-full ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
