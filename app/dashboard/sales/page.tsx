"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useFilters } from "@/lib/filter-context"
import { getFilteredSalesMetrics } from "@/lib/sales-metrics"
import { categoryLabels, locationLabels } from "@/lib/dashboard-metrics"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Users,
  CheckSquare,
  Building2,
  FileText,
  Phone,
  Calendar,
  Clock,
  File,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  X,
  FolderOpen,
} from "lucide-react"

// Task icon mapping
const taskIcons = {
  phone: Phone,
  calendar: Calendar,
  clock: Clock,
  file: File,
}

// Activity color mapping
const activityColors = {
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
}

export default function SalesExecutiveDashboard() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()
  const { category, location, setCategory, setLocation } = useFilters()
  const router = useRouter()
  const [isMounted, setIsMounted] = React.useState(false)
  
  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Get filtered metrics
  const metrics = React.useMemo(() => {
    return getFilteredSalesMetrics(category, location)
  }, [category, location])

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [authLoading, isAuthenticated, router])

  // Show loading state
  if (authLoading) {
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

  const hasActiveFilters = category !== "all" || location !== "all"

  // Build subtitle
  let filterSubtitle = ""
  if (category === "all" && location === "all") {
    filterSubtitle = "All Categories & Locations"
  } else if (category === "all") {
    filterSubtitle = locationLabels[location] || location
  } else if (location === "all") {
    filterSubtitle = categoryLabels[category] || category
  } else {
    filterSubtitle = `${categoryLabels[category] || category} in ${locationLabels[location] || location}`
  }

  // Empty state
  if (!metrics) {
    return (
      <DashboardLayout userEmail={user?.email || "rahul@wehouse.in"}>
        <div className="space-y-6">
          {/* Filter indicator */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border">
              <span className="text-sm text-muted-foreground">Filters:</span>
              {category !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {categoryLabels[category] || category}
                  <button type="button" onClick={() => setCategory("all")} className="ml-1 hover:text-destructive">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              {location !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {locationLabels[location] || location}
                  <button type="button" onClick={() => setLocation("all")} className="ml-1 hover:text-destructive">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-xs"
                onClick={() => {
                  setCategory("all")
                  setLocation("all")
                }}
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Empty state */}
          <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FolderOpen className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
              <p className="text-muted-foreground max-w-md">
                No sales data found for {filterSubtitle}. Try adjusting your filters or check back later.
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setCategory("all")
                  setLocation("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userEmail={user?.email || "rahul@wehouse.in"}>
      <div className={`space-y-6 ${isMounted ? 'dashboard-fade-in' : ''}`}>
        {/* Filter indicator */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border">
            <span className="text-sm text-muted-foreground">Filters:</span>
            {category !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {categoryLabels[category] || category}
                <button type="button" onClick={() => setCategory("all")} className="ml-1 hover:text-destructive">
                  <X className="size-3" />
                </button>
              </Badge>
            )}
            {location !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {locationLabels[location] || location}
                <button type="button" onClick={() => setLocation("all")} className="ml-1 hover:text-destructive">
                  <X className="size-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-xs"
              onClick={() => {
                setCategory("all")
                setLocation("all")
              }}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Stats Cards Row */}
        <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${isMounted ? 'dashboard-slide-up dashboard-stagger-1' : ''}`}>
            {/* Total Leads */}
            <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 bg-card">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Total Leads</p>
                    <p className="text-2xl font-bold text-foreground mb-1">{metrics.stats.totalLeads.value}</p>
                    <p className={`text-xs font-medium flex items-center gap-1 ${metrics.stats.totalLeads.changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                      {metrics.stats.totalLeads.changeType === "positive" && <TrendingUp className="size-3" />}
                      {metrics.stats.totalLeads.change}
                    </p>
                  </div>
                  <div className="flex items-center justify-center size-10 rounded-lg bg-muted/50 dark:bg-muted/30 shrink-0">
                    <Users className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 bg-card">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 dark:bg-green-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Pending Tasks</p>
                    <p className="text-2xl font-bold text-foreground mb-1">{metrics.stats.pendingTasks.value}</p>
                    <p className="text-xs font-medium text-orange-600 dark:text-orange-400">{metrics.stats.pendingTasks.dueToday} due today</p>
                  </div>
                  <div className="flex items-center justify-center size-10 rounded-lg bg-muted/50 dark:bg-muted/30 shrink-0">
                    <CheckSquare className="size-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Projects */}
            <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 bg-card">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 dark:bg-amber-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Active Projects</p>
                    <p className="text-2xl font-bold text-foreground mb-1">{metrics.stats.activeProjects.value}</p>
                    <p className={`text-xs font-medium flex items-center gap-1 ${metrics.stats.activeProjects.changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                      {metrics.stats.activeProjects.changeType === "positive" && <TrendingUp className="size-3" />}
                      {metrics.stats.activeProjects.change}
                    </p>
                  </div>
                  <div className="flex items-center justify-center size-10 rounded-lg bg-muted/50 dark:bg-muted/30 shrink-0">
                    <Building2 className="size-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports Generated */}
            <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 bg-card">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 dark:bg-rose-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Reports Generated</p>
                    <p className="text-2xl font-bold text-foreground mb-1">{metrics.stats.reportsGenerated.value}</p>
                    <p className={`text-xs font-medium flex items-center gap-1 ${metrics.stats.reportsGenerated.changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                      {metrics.stats.reportsGenerated.changeType === "positive" && <TrendingUp className="size-3" />}
                      {metrics.stats.reportsGenerated.change}
                    </p>
                  </div>
                  <div className="flex items-center justify-center size-10 rounded-lg bg-muted/50 dark:bg-muted/30 shrink-0">
                    <FileText className="size-5 text-rose-600 dark:text-rose-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Today's Tasks and Performance Row */}
        <div className={`grid gap-6 lg:grid-cols-3 ${isMounted ? 'dashboard-slide-up dashboard-stagger-2' : ''}`}>
          {/* Today's Tasks - Takes 2 columns */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">{"Today's Tasks"}</CardTitle>
                  <CardDescription className="mt-1">Your scheduled activities for today</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent hover:bg-[hsl(var(--hover-bg))]">
                  View All
                  <ChevronRight className="size-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {metrics.tasks.map((task, index) => {
                  const IconComponent = taskIcons[task.icon]
                  const priorityColors = {
                    high: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800",
                    medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800",
                    low: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
                  }
                  const iconColors = {
                    high: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
                    medium: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
                    low: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                  }
                  return (
                    <div 
                      key={task.id} 
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md bg-card transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`flex items-center justify-center size-11 rounded-xl ${iconColors[task.priority]} transition-transform group-hover:scale-110`}>
                        <IconComponent className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate mb-0.5">{task.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{task.description}</p>
                      </div>
                      <Badge className={`${priorityColors[task.priority]} border font-medium capitalize`}>{task.priority}</Badge>
                      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{task.time}</span>
                    </div>
                  )
                })}
            </CardContent>
          </Card>

          {/* Performance Panel */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="text-xl font-semibold">Performance</CardTitle>
              <CardDescription className="mt-1">{"This month's metrics"}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-blue-500 shadow-sm" />
                  <span className="text-sm font-medium text-foreground">Calls Made</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{metrics.performance.callsMade.value}</span>
                  {metrics.performance.callsMade.trend === "up" ? (
                    <TrendingUp className="size-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="size-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-green-500 shadow-sm" />
                  <span className="text-sm font-medium text-foreground">Site Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{metrics.performance.siteVisits.value}</span>
                  {metrics.performance.siteVisits.trend === "up" ? (
                    <TrendingUp className="size-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="size-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-pink-500 shadow-sm" />
                  <span className="text-sm font-medium text-foreground">Quotes Sent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{metrics.performance.quotesSent.value}</span>
                  {metrics.performance.quotesSent.trend === "up" ? (
                    <TrendingUp className="size-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="size-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-orange-500 shadow-sm" />
                  <span className="text-sm font-medium text-foreground">Deals Closed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{metrics.performance.dealsClosed.value}</span>
                  {metrics.performance.dealsClosed.trend === "up" ? (
                    <TrendingUp className="size-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="size-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="text-center mb-3">
                  <span className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">{metrics.performance.targetAchievement}%</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground text-center mb-3">Target Achievement</p>
                <div className="relative">
                  <Progress value={metrics.performance.targetAchievement} className="h-3 bg-muted" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-foreground">{metrics.performance.targetAchievement}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className={`border-border/50 shadow-sm ${isMounted ? 'dashboard-slide-up dashboard-stagger-3' : ''}`}>
          <CardHeader className="pb-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
                <CardDescription className="mt-1">Latest updates from your team</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--hover-bg))]">
                View All <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
                {metrics.recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`size-3 rounded-full mt-1.5 shadow-sm ${activityColors[activity.color]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold text-foreground">{activity.user}</span>
                        <span className="text-muted-foreground"> {activity.action} </span>
                        <span className="font-semibold text-foreground">{activity.target}</span>
                        <span className="text-muted-foreground"> - {activity.location}</span>
                      </p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className={`border-border/50 shadow-sm ${isMounted ? 'dashboard-slide-up dashboard-stagger-4' : ''}`}>
          <CardHeader className="pb-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Sales Funnel</CardTitle>
                <CardDescription className="mt-1">Lead progression through stages</CardDescription>
              </div>
              <Badge variant="secondary" className="px-3 py-1.5 font-semibold bg-muted/80 border border-border/50">
                Conversion: {metrics.funnel.conversionRate}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
                {metrics.funnel.stages.map((stage, index) => {
                  const colors = [
                    { bg: "bg-blue-500", gradient: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/30" },
                    { bg: "bg-teal-500", gradient: "from-teal-500 to-teal-600", shadow: "shadow-teal-500/30" },
                    { bg: "bg-amber-500", gradient: "from-amber-500 to-amber-600", shadow: "shadow-amber-500/30" },
                    { bg: "bg-pink-500", gradient: "from-pink-500 to-pink-600", shadow: "shadow-pink-500/30" },
                    { bg: "bg-purple-500", gradient: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/30" },
                    { bg: "bg-green-500", gradient: "from-green-500 to-green-600", shadow: "shadow-green-500/30" },
                  ]
                  const colorConfig = colors[index % colors.length]
                  return (
                    <div key={stage.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{stage.name}</span>
                        <span className="text-sm font-bold text-foreground">{stage.count}</span>
                      </div>
                      <div className="relative h-3 rounded-full bg-muted/50 overflow-hidden border border-border/30">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000 ease-out chart-bar-animate-horizontal flex items-center justify-end pr-2",
                            `bg-gradient-to-r ${colorConfig.gradient} shadow-lg ${colorConfig.shadow}`
                          )}
                          style={{ 
                            '--target-width': `${stage.percentage}%`,
                            '--bar-delay': `${index * 0.1}s`,
                            width: `${stage.percentage}%`
                          } as React.CSSProperties & { '--target-width': string; '--bar-delay': string }}
                        >
                          <span className="text-[10px] font-bold text-white drop-shadow-sm">{stage.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
