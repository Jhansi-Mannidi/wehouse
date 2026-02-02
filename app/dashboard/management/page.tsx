"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  TrendingUp, 
  TrendingDown,
  Building2,
  IndianRupee,
  Users,
  CheckCircle2,
  Star,
  ChevronRight,
  AlertTriangle,
  Clock,
  MapPin,
  ExternalLink,
  Filter,
  X,
  Inbox
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useFilters } from "@/lib/filter-context"
import { getFilteredMetrics, categoryLabels, locationLabels, type DashboardMetrics } from "@/lib/dashboard-metrics"
import type { ProjectCategory, Location } from "@/components/shell/header-filters"
import { locationBranches } from "@/components/shell/header-filters"
import { DateRangePicker, type DateRangePreset, type DateRange } from "@/components/ui/date-range-picker"
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Empty State Component
function EmptyState({ 
  category, 
  location,
  onClearFilters 
}: { 
  category: ProjectCategory
  location: Location
  onClearFilters: () => void
}) {
  return (
    <Card className="col-span-full">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="flex items-center justify-center size-16 rounded-full bg-muted mb-4">
          <Inbox className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
          No {categoryLabels[category]} projects in {locationLabels[location]} yet.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onClearFilters} className="bg-transparent">
            Clear Filters
          </Button>
          <Button>
            Create New Project
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Filter Indicator Bar
function FilterIndicator({
  category,
  location,
  branch,
  onClearCategory,
  onClearLocation,
  onClearBranch,
  onClearAll
  }: {
  category: ProjectCategory
  location: Location
  branch: string
  onClearCategory: () => void
  onClearLocation: () => void
  onClearBranch: () => void
  onClearAll: () => void
  }) {
  const hasFilters = category !== "all" || location !== "all" || branch !== "all"
  
  if (!hasFilters) return null
  
  return (
  <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
  <span className="text-sm text-muted-foreground">Showing results for:</span>
  <div className="flex items-center gap-2 flex-wrap">
  {category !== "all" && (
  <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary hover:bg-primary/20">
  {categoryLabels[category]}
  <button onClick={onClearCategory} className="ml-1 hover:text-primary/80">
  <X className="size-3" />
  </button>
  </Badge>
  )}
  {location !== "all" && (
  <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary hover:bg-primary/20">
            {locationLabels[location]}
            <button onClick={onClearLocation} className="ml-1 hover:text-primary/80">
              <X className="size-3" />
            </button>
          </Badge>
        )}
        {branch !== "all" && location !== "all" && (() => {
          const branchLabel = locationBranches[location]?.find(b => b.value === branch)?.label || branch
          return (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary hover:bg-primary/20">
              {branchLabel}
              <button onClick={onClearBranch} className="ml-1 hover:text-primary/80">
                <X className="size-3" />
              </button>
            </Badge>
          )
        })()}
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearAll}
        className="ml-auto text-xs text-muted-foreground hover:text-foreground"
      >
        Clear All
      </Button>
    </div>
  )
}

// KPI Card Component
function KPICard({
  title,
  value,
  change,
  changeLabel,
  trend,
  icon: Icon,
  iconBg,
  iconColor = "text-blue-600 dark:text-blue-400",
}: {
  title: string
  value: string
  change: string
  changeLabel: string
  trend: "up" | "down" | "neutral"
  icon: React.ElementType
  iconBg: string
  iconColor?: string
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5 flex-1">
            <p className="card-label">{title}</p>
            <p className="kpi-value">{value}</p>
            <div className="flex items-center gap-1.5">
              {trend === "up" ? (
                <TrendingUp className="size-3.5 text-green-600" />
              ) : trend === "down" ? (
                <TrendingDown className="size-3.5 text-red-600" />
              ) : null}
              <span className={cn(
                "text-xs font-medium",
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
              )}>
                {change}
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          </div>
          <div className={cn("flex items-center justify-center size-8 rounded-full shrink-0", iconBg)}>
            <Icon className={cn("size-4", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Revenue vs Target Chart Component
function RevenueVsTargetChart() {
  const revenueVsTargetData = [
    { month: "Jan", revenue: 120, target: 115 },
    { month: "Feb", revenue: 130, target: 125 },
    { month: "Mar", revenue: 145, target: 135 },
    { month: "Apr", revenue: 140, target: 150 },
    { month: "May", revenue: 165, target: 160 },
    { month: "Jun", revenue: 180, target: 170 },
    { month: "Jul", revenue: 175, target: 165 },
    { month: "Aug", revenue: 190, target: 175 },
    { month: "Sep", revenue: 200, target: 185 },
    { month: "Oct", revenue: 195, target: 190 },
    { month: "Nov", revenue: 210, target: 195 },
    { month: "Dec", revenue: 225, target: 200 },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Revenue vs Target (Last 12 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueVsTargetData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `${value}K`}
                domain={[0, 250]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [`${value}K`, '']}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                name="Target"
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="line"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Revenue Chart Component
type ChartDataType = "revenue" | "projects" | "leads"

function RevenueChart({ metrics }: { metrics: DashboardMetrics }) {
  const [chartType, setChartType] = React.useState<ChartDataType>("revenue")
  const months = ["F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D", "J"]
  
  // Different data sets based on selected type
  const chartData: Record<ChartDataType, { values: number[]; totalLabel: string; total: string; avgLabel: string; avg: string; growth: string }> = {
    revenue: {
      values: metrics.revenueChart.values,
      totalLabel: "Total FY",
      total: metrics.revenueChart.totalFY,
      avgLabel: "Avg Monthly",
      avg: metrics.revenueChart.avgMonthly,
      growth: metrics.revenueChart.growth,
    },
    projects: {
      values: [8, 12, 15, 18, 22, 19, 24, 28, 32, 38, 42, 45].map(v => v * (metrics.primary.totalProjects / 245)),
      totalLabel: "Total Projects",
      total: metrics.primary.totalProjects.toString(),
      avgLabel: "Avg Monthly",
      avg: Math.round(metrics.primary.totalProjects / 12).toString(),
      growth: "+18%",
    },
    leads: {
      values: [25, 32, 38, 42, 48, 45, 52, 58, 65, 72, 78, 85].map(v => v * (metrics.leadSources.total / 438)),
      totalLabel: "Total Leads",
      total: metrics.leadSources.total.toString(),
      avgLabel: "Avg Monthly",
      avg: Math.round(metrics.leadSources.total / 12).toString(),
      growth: "+22%",
    },
  }
  
  const currentData = chartData[chartType]
  const maxValue = Math.max(...currentData.values)
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" />
            {chartType === "revenue" ? "Revenue" : chartType === "projects" ? "Projects" : "Leads"} Trend (12 months)
          </CardTitle>
          <Select value={chartType} onValueChange={(value) => setChartType(value as ChartDataType)}>
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="leads">Leads</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] md:h-[250px] flex items-end justify-between gap-1 pt-4">
          {currentData.values.map((value, index) => {
            const barHeight = (value / maxValue) * 160
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                <div 
                  className={cn(
                    "w-full rounded-t-sm transition-all hover:opacity-80 chart-bar-animate",
                    index === currentData.values.length - 1 
                      ? "bg-primary dark:bg-primary/90" 
                      : "bg-primary/40 dark:bg-primary/30"
                  )}
                  style={{ 
                    '--target-height': `${barHeight}px`,
                    '--bar-delay': `${index * 0.05}s`,
                    height: `${barHeight}px`
                  } as React.CSSProperties & { '--target-height': string; '--bar-delay': string }}
                  title={`${months[index]}: ${value.toLocaleString()}`}
                />
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium">{months[index]}</span>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mt-4 pt-4 border-t">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground">{currentData.totalLabel}</p>
            <p className="text-base sm:text-lg font-semibold">{currentData.total}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground">{currentData.avgLabel}</p>
            <p className="text-base sm:text-lg font-semibold">{currentData.avg}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Growth</p>
            <p className="text-base sm:text-lg font-semibold text-green-600 dark:text-green-400">{currentData.growth}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sales Pipeline Component
function SalesPipeline({ metrics, onViewPipeline }: { metrics: DashboardMetrics; onViewPipeline: () => void }) {
  
  const stageConfig = [
    { name: "New", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-500", gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" },
    { name: "Contacted", color: "from-cyan-500 to-cyan-600", bgColor: "bg-cyan-500", gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" },
    { name: "Qualified", color: "from-yellow-500 to-yellow-600", bgColor: "bg-yellow-500", gradient: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)" },
    { name: "Site Visit", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-500", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { name: "Negotiation", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-500", gradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)" },
    { name: "Won", color: "from-green-500 to-green-600", bgColor: "bg-green-500", gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
  ]
  
  const stages = metrics.pipeline.stages.map((stage, index) => ({
    ...stage,
    ...stageConfig[index] || stageConfig[0],
  }))
  
  const maxCount = Math.max(...stages.map(s => s.count))
  
  return (
    <Card className="h-full overflow-hidden relative bg-gradient-to-br from-card via-card to-card/95 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -ml-12 -mb-12" />
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-base font-semibold flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Filter className="size-4 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Sales Pipeline
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const barWidth = (stage.count / maxCount) * 100
            const percentage = ((stage.count / maxCount) * 100).toFixed(0)
            
            return (
              <div key={stage.name} className="group">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-sm font-medium text-foreground/90 w-28 shrink-0">{stage.name}</span>
                  <div className="flex-1 h-7 bg-muted/60 rounded-full overflow-hidden relative shadow-inner">
                    {/* Animated gradient bar with shine effect */}
                    <div 
                      className={cn(
                        "h-full rounded-full relative overflow-hidden transition-all duration-500 ease-out chart-bar-animate-horizontal shadow-sm",
                        `bg-gradient-to-r ${stage.color}`
                      )}
                      style={{ 
                        width: `${barWidth}%`,
                        animationDelay: `${index * 0.08}s`,
                        background: stage.gradient,
                        boxShadow: `0 2px 8px ${stage.bgColor}40, inset 0 1px 0 rgba(255,255,255,0.2)`
                      } as React.CSSProperties & { '--target-width': string; '--bar-delay': string }}
                    >
                      {/* Shine effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      {/* Percentage indicator on bar - always show percentage for all stages */}
                      {barWidth > 5 ? (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white drop-shadow-sm whitespace-nowrap">
                          {percentage}%
                        </span>
                      ) : barWidth > 0 ? (
                        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-bold text-white drop-shadow-sm whitespace-nowrap">
                          {percentage}%
                        </span>
                      ) : null}
                    </div>
                    <span className="text-sm font-bold text-foreground w-12 text-right tabular-nums">{stage.count}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Enhanced Metrics Section */}
        <div className="mt-6 pt-5 border-t border-border/50">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 hover:from-primary/10 hover:via-primary/15 hover:to-primary/10 transition-all shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 shadow-sm">
                <IndianRupee className="size-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">Pipeline Value</span>
            </div>
            <span className="text-xl font-bold text-foreground tabular-nums">{metrics.pipeline.value}</span>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <Button 
          variant="outline" 
          className="w-full mt-5 bg-[hsl(var(--hover-bg))] hover:bg-[hsl(var(--hover-bg))]/80 text-foreground border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group" 
          onClick={onViewPipeline}
        >
          <span className="font-medium">View Pipeline</span>
          <ChevronRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Project Health Component
function ProjectHealth({ metrics, onViewAllProjects }: { metrics: DashboardMetrics; onViewAllProjects: () => void }) {
  const delayedProjects = [
    { name: "Anil S.", days: 7, reason: "Labor issue" },
    { name: "Kumar R.", days: 4, reason: "Material delay" },
    { name: "Venkat P.", days: 3, reason: "Weather" },
  ].slice(0, Math.min(3, metrics.primary.delayed.count))
  
  return (
    <Card className="h-full overflow-hidden relative bg-gradient-to-br from-card via-card to-card/95 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-base font-semibold flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Building2 className="size-4 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Project Health
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="rounded-xl border-2 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 dark:from-green-950/30 dark:to-green-900/20 dark:border-green-800 p-4 text-center shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="size-3 rounded-full bg-green-500 shadow-sm" />
              <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">On Track</span>
            </div>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">{metrics.primary.onTrack.count}</p>
            <p className="text-xs font-medium text-green-600 dark:text-green-500">{metrics.primary.onTrack.percentage}%</p>
          </div>
          <div className="rounded-xl border-2 bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200 dark:from-yellow-950/30 dark:to-yellow-900/20 dark:border-yellow-800 p-4 text-center shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="size-3 rounded-full bg-yellow-500 shadow-sm" />
              <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">At Risk</span>
            </div>
            <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-1">{metrics.primary.atRisk.count}</p>
            <p className="text-xs font-medium text-yellow-600 dark:text-yellow-500">{metrics.primary.atRisk.percentage}%</p>
          </div>
          <div className="rounded-xl border-2 bg-gradient-to-br from-red-50 to-red-100/50 border-red-200 dark:from-red-950/30 dark:to-red-900/20 dark:border-red-800 p-4 text-center shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="size-3 rounded-full bg-red-500 shadow-sm" />
              <span className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide">Delayed</span>
            </div>
            <p className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">{metrics.primary.delayed.count}</p>
            <p className="text-xs font-medium text-red-600 dark:text-red-500">{metrics.primary.delayed.percentage}%</p>
          </div>
        </div>
        
        {delayedProjects.length > 0 && (
          <div className="space-y-2.5 mb-4">
            <p className="text-sm font-semibold text-foreground mb-2">Delayed Projects:</p>
            {delayedProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 dark:from-red-950/30 dark:to-red-900/20 dark:border-red-800 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-semibold text-foreground">{project.name}</span>
                  <Badge variant="secondary" className="bg-red-200 text-red-800 text-xs font-semibold dark:bg-red-900/50 dark:text-red-400 border-0">
                    {project.days}d delay
                  </Badge>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{project.reason}</span>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full mt-4 bg-[hsl(var(--hover-bg))] hover:bg-[hsl(var(--hover-bg))]/80 text-foreground border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group" 
          onClick={onViewAllProjects}
        >
          <span className="font-medium">View All Projects</span>
          <ChevronRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Team Performance Component
function TeamPerformance({ metrics }: { metrics: DashboardMetrics }) {
  const topPerformers = metrics.teamPerformance.topPerformers
  const responseTimes = metrics.teamPerformance.responseTimes
  
  return (
    <Card className="h-full overflow-hidden relative bg-gradient-to-br from-card via-card to-card/95 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative background */}
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-primary/5 rounded-full blur-2xl -ml-14 -mb-14" />
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-base font-semibold flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Users className="size-4 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Team Performance
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="mb-5">
          <p className="text-sm font-semibold text-foreground mb-3">Top Performers (Conversions)</p>
          <div className="space-y-2.5">
            {topPerformers.map((performer) => (
              <div key={performer.rank} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-gradient-to-r from-muted/60 to-muted/40 border border-border/50 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "flex items-center justify-center size-7 rounded-full text-xs font-bold text-white shadow-md",
                    performer.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : 
                    performer.rank === 2 ? "bg-gradient-to-br from-gray-400 to-gray-600" : "bg-gradient-to-br from-orange-400 to-orange-600"
                  )}>
                    {performer.rank}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{performer.name}</span>
                </div>
                <span className="text-sm font-bold text-primary">{performer.deals} deals</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Response Time (Avg)</p>
          <div className="space-y-2.5">
            {responseTimes.map((item) => (
              <div key={item.city} className="flex items-center justify-between py-2.5 px-4 rounded-lg border border-border/50 bg-gradient-to-r from-card/50 to-card/30 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2.5">
                  <MapPin className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{item.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{item.time}</span>
                  {item.status === "good" ? (
                    <CheckCircle2 className="size-4 text-green-500" />
                  ) : item.status === "warning" ? (
                    <AlertTriangle className="size-4 text-yellow-500" />
                  ) : (
                    <AlertTriangle className="size-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-5 bg-[hsl(var(--hover-bg))] hover:bg-[hsl(var(--hover-bg))]/80 text-foreground border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group"
        >
          <span className="font-medium">View Team Report</span>
          <ChevronRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

// City Performance Component
function CityPerformance({ metrics }: { metrics: DashboardMetrics }) {
  const cities = metrics.cityPerformance
  
  return (
    <Card className="h-full overflow-hidden relative bg-gradient-to-br from-card via-card to-card/95 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-base font-semibold flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <MapPin className="size-4 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Performance by City
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">City</th>
                <th className="text-center py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Projects</th>
                <th className="text-center py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Revenue</th>
                <th className="text-right py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Conv.%</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.city} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                        <span className="text-xs font-bold text-primary">{city.code}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{city.city}</span>
                    </div>
                  </td>
                  <td className="text-center py-3.5 text-sm font-bold text-foreground">{city.projects}</td>
                  <td className="text-center py-3.5 text-sm font-bold text-foreground">{city.revenue}</td>
                  <td className="text-right py-3.5">
                    <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-400 font-semibold border-0 shadow-sm">
                      {city.convRate}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Lead Sources Component
function LeadSources({ metrics }: { metrics: DashboardMetrics }) {
  const { total, sources, bestROI } = metrics.leadSources
  
  // Map colors to Tailwind classes
  const colorMap: Record<string, string> = {
    "#3b82f6": "bg-blue-500",
    "#ef4444": "bg-red-500",
    "#a855f7": "bg-purple-500",
    "#22c55e": "bg-green-500",
    "#f97316": "bg-orange-500",
  }
  
  return (
    <Card className="h-full overflow-hidden relative bg-gradient-to-br from-card via-card to-card/95 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative background */}
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-primary/5 rounded-full blur-2xl -mr-14 -mb-14" />
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-base font-semibold flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <TrendingUp className="size-4 text-primary" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Lead Sources
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        {/* Enhanced Pie Chart */}
        <div className="relative mx-auto w-44 h-44 mb-5">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {sources.reduce((acc, source, index) => {
              const offset = acc.offset
              const circumference = 2 * Math.PI * 40
              const strokeDasharray = (source.percentage / 100) * circumference
              const strokeDashoffset = -offset * circumference / 100
              const colorClass = colorMap[source.color] || "bg-gray-500"
              
              acc.elements.push(
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  strokeWidth="20"
                  className={colorClass.replace("bg-", "stroke-")}
                  strokeDasharray={`${strokeDasharray} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
              )
              acc.offset += source.percentage
              return acc
            }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{total}</p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total Leads</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {sources.map((source) => (
            <div key={source.name} className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-muted/40 border border-border/30 hover:bg-muted/60 transition-all">
              <div className={cn("size-3.5 rounded-full shadow-sm", colorMap[source.color] || "bg-gray-500")} />
              <span className="text-xs font-medium text-foreground flex-1">{source.name}</span>
              <span className="text-xs font-bold text-foreground">{source.percentage}%</span>
            </div>
          ))}
        </div>
        
        <div className="mt-5 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 dark:from-green-950/30 dark:to-green-900/20 dark:border-green-800">
            <span className="text-sm font-semibold text-muted-foreground">Best ROI</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-400 font-semibold border-0 shadow-sm">
                {bestROI.source}
              </Badge>
              <span className="text-sm font-bold text-green-700 dark:text-green-400">{bestROI.cost}</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-5 bg-[hsl(var(--hover-bg))] hover:bg-[hsl(var(--hover-bg))]/80 text-foreground border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group"
        >
          <span className="font-medium">View Source Analysis</span>
          <ChevronRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Alerts Component - Simple card style with left colored bar
function AlertsSection({ metrics }: { metrics: DashboardMetrics }) {
  const alerts = [
    ...(metrics.alerts.paymentsOverdue.count > 0 ? [{
      title: "Payments Overdue",
      description: `${metrics.alerts.paymentsOverdue.count} payments overdue (${metrics.alerts.paymentsOverdue.amount} total)`,
      time: "1h ago",
      borderColor: "border-l-red-500",
    }] : []),
    ...(metrics.alerts.uncontactedLeads > 0 ? [{
      title: "Uncontacted Leads",
      description: `${metrics.alerts.uncontactedLeads} leads uncontacted >24 hours`,
      time: "2h ago",
      borderColor: "border-l-orange-500",
    }] : []),
    ...(metrics.primary.atRisk.count > 0 ? [{
      title: "Projects At Risk",
      description: `${metrics.primary.atRisk.count} projects at risk of delay`,
      time: "3h ago",
      borderColor: "border-l-teal-500",
    }] : []),
    {
      title: "Quality Inspections",
      description: `${Math.max(1, Math.round(metrics.primary.activeProjects * 0.2))} quality inspections pending`,
      time: "4h ago",
      borderColor: "border-l-orange-400",
    },
  ]
  
  return (
    <Card className="overflow-hidden border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
            <AlertTriangle className="size-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <span className="text-foreground">
            Requires Attention
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={index} 
              className={cn(
                "p-4 rounded-lg border-l-4 bg-card hover:bg-muted/30 transition-colors cursor-pointer relative",
                alert.borderColor
              )}
            >
              {/* Top border with gradient fade */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
              {/* Bottom border with gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
              <div className="flex flex-col gap-1 relative z-10">
                <h4 className="text-sm font-semibold text-foreground">{alert.title}</h4>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Main Page Component
export default function ManagementDashboard() {
  const router = useRouter()
  const { category, location, branch, setCategory, setLocation, setBranch } = useFilters()
  const [metrics, setMetrics] = React.useState<DashboardMetrics | null>(null)
  const [dateRangePreset, setDateRangePreset] = React.useState<DateRangePreset>("last_30_days")
  const [dateRange, setDateRange] = React.useState<DateRange | null>(null)
  
  // Update metrics when filters change (including date range) - no loading delay
  React.useEffect(() => {
    const newMetrics = getFilteredMetrics(category, location, branch)
    setMetrics(newMetrics)
  }, [category, location, branch, dateRangePreset, dateRange])
  
  // Navigation handlers
  const handleViewAllProjects = () => router.push("/projects")
  const handleViewPipeline = () => router.push("/crm/pipeline")
  
  const handleClearCategory = () => setCategory("all")
  const handleClearLocation = () => setLocation("all")
  const handleClearBranch = () => setBranch("all")
  const handleClearAll = () => {
    setCategory("all")
    setLocation("all")
    setBranch("all")
  }
  
  // Build dynamic title
  let dashboardTitle = metrics?.subtitle || "All Projects"
  if (branch !== "all" && location !== "all") {
    const branchLabel = locationBranches[location]?.find(b => b.value === branch)?.label || branch
    dashboardTitle = `${locationLabels[location]} - ${branchLabel}`
  }
  
  const [isMounted, setIsMounted] = React.useState(false)
  
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <DashboardLayout>
      <div className={`space-y-6 ${isMounted ? 'dashboard-fade-in' : ''}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard Overview</h1>
            <p className="text-description mt-0.5">{dashboardTitle}</p>
          </div>
          <DateRangePicker
            value={dateRangePreset}
            onChange={(preset, range) => {
              setDateRangePreset(preset)
              setDateRange(range)
            }}
          />
        </div>
        
        {/* Filter Indicator */}
        <FilterIndicator 
          category={category}
          location={location}
          branch={branch}
          onClearCategory={handleClearCategory}
          onClearLocation={handleClearLocation}
          onClearBranch={handleClearBranch}
          onClearAll={handleClearAll}
        />
        
        {/* Empty State */}
        {!metrics && (
          <EmptyState 
            category={category}
            location={location}
            onClearFilters={handleClearAll}
          />
        )}
        
        {/* Dashboard Content */}
        {metrics && (
          <>
            {/* KPI Cards Row */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${isMounted ? 'dashboard-slide-up dashboard-stagger-1' : ''}`}>
              <KPICard
                title="Total Projects"
                value={metrics.primary.totalProjects.toString()}
                change={metrics.secondary.monthChange}
                changeLabel="vs last month"
                trend="up"
                icon={Building2}
                iconBg="bg-blue-100 dark:bg-blue-900/30"
                iconColor="text-blue-600 dark:text-blue-400"
              />
              <KPICard
                title="Active Projects"
                value={metrics.primary.activeProjects.toString()}
                change={`${metrics.primary.onTrack.percentage}% on track`}
                changeLabel=""
                trend="neutral"
                icon={CheckCircle2}
                iconBg="bg-green-100 dark:bg-green-900/30"
                iconColor="text-green-600 dark:text-green-400"
              />
              <KPICard
                title="Revenue MTD"
                value={metrics.secondary.thisMonth}
                change={metrics.secondary.monthChange}
                changeLabel="vs LM"
                trend="up"
                icon={IndianRupee}
                iconBg="bg-blue-100 dark:bg-blue-900/30"
                iconColor="text-blue-600 dark:text-blue-400"
              />
              <KPICard
                title="Total Revenue"
                value={metrics.secondary.totalRevenue}
                change={metrics.revenueChart.growth}
                changeLabel="YoY"
                trend="up"
                icon={TrendingUp}
                iconBg="bg-purple-100 dark:bg-purple-900/30"
                iconColor="text-purple-600 dark:text-purple-400"
              />
              <KPICard
                title="Team Members"
                value={metrics.secondary.teamMembers.toString()}
                change={`${metrics.secondary.pendingProjects} pending`}
                changeLabel="tasks"
                trend="neutral"
                icon={Users}
                iconBg="bg-cyan-100 dark:bg-cyan-900/30"
                iconColor="text-cyan-600 dark:text-cyan-400"
              />
            </div>
            
            {/* Charts Row */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isMounted ? 'dashboard-slide-up dashboard-stagger-2' : ''}`}>
              <RevenueChart metrics={metrics} />
              <SalesPipeline metrics={metrics} onViewPipeline={handleViewPipeline} />
            </div>
            
            {/* Revenue vs Target Chart Row */}
            <div className={`grid grid-cols-1 gap-6 ${isMounted ? 'dashboard-slide-up dashboard-stagger-2' : ''}`}>
              <RevenueVsTargetChart />
            </div>
            
            {/* Project Health & Team Performance */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isMounted ? 'dashboard-slide-up dashboard-stagger-3' : ''}`}>
              <ProjectHealth metrics={metrics} onViewAllProjects={handleViewAllProjects} />
              <TeamPerformance metrics={metrics} />
            </div>
            
            {/* City Performance & Lead Sources */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isMounted ? 'dashboard-slide-up dashboard-stagger-4' : ''}`}>
              <CityPerformance metrics={metrics} />
              <LeadSources metrics={metrics} />
            </div>
            
            {/* Alerts Section */}
            <AlertsSection metrics={metrics} />
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
