"use client"

import * as React from "react"
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, ChevronRight, X, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AIInsight {
  id: string
  type: "prediction" | "alert" | "recommendation" | "trend"
  title: string
  description: string
  value?: string
  change?: number
  confidence?: number
  action?: string
}

interface AIInsightsCardProps {
  title?: string
  insights: AIInsight[]
  onRefresh?: () => void
  onDismiss?: (id: string) => void
  className?: string
}

export function AIInsightsCard({
  title = "AI Insights",
  insights,
  onRefresh,
  onDismiss,
  className,
}: AIInsightsCardProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onRefresh?.()
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "prediction":
        return <TrendingUp className="size-4" />
      case "alert":
        return <AlertTriangle className="size-4" />
      case "recommendation":
        return <Lightbulb className="size-4" />
      case "trend":
        return <TrendingDown className="size-4" />
      default:
        return <Sparkles className="size-4" />
    }
  }

  const getInsightColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "prediction":
        return "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
      case "alert":
        return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
      case "recommendation":
        return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
      case "trend":
        return "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700"
    }
  }

  return (
    <Card className={cn("border-[#f6a404]/30 bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#f6a404] text-white">
              <Sparkles className="size-4" />
            </div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <Badge variant="secondary" className="bg-[#f6a404]/10 text-[#f6a404] border-[#f6a404]/20 text-[10px] font-medium">
              AI Powered
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 bg-transparent"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("size-4 text-muted-foreground", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              "relative rounded-lg border p-3 transition-all hover:shadow-sm",
              getInsightColor(insight.type)
            )}
          >
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 size-6 bg-transparent opacity-50 hover:opacity-100"
                onClick={() => onDismiss(insight.id)}
              >
                <X className="size-3" />
              </Button>
            )}
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">{insight.title}</p>
                  {insight.confidence && (
                    <span className="text-[10px] opacity-70">{insight.confidence}% confidence</span>
                  )}
                </div>
                <p className="text-xs opacity-80 leading-relaxed">{insight.description}</p>
                {insight.value && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold">{insight.value}</span>
                    {insight.change !== undefined && (
                      <span className={cn(
                        "text-xs font-medium flex items-center gap-0.5",
                        insight.change >= 0 ? "text-emerald-600" : "text-red-600"
                      )}>
                        {insight.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        {insight.change >= 0 ? "+" : ""}{insight.change}%
                      </span>
                    )}
                  </div>
                )}
                {insight.action && (
                  <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-xs font-medium">
                    {insight.action}
                    <ChevronRight className="size-3 ml-0.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Finance-specific AI predictions component
interface FinanceAIPredictionsProps {
  className?: string
}

export function FinanceAIPredictions({ className }: FinanceAIPredictionsProps) {
  const insights: AIInsight[] = [
    {
      id: "1",
      type: "prediction",
      title: "Next Month Collection Forecast",
      description: "Based on payment patterns and scheduled milestones, predicted collections for February 2026.",
      value: "₹3.2Cr",
      change: 15,
      confidence: 87,
      action: "View breakdown",
    },
    {
      id: "2",
      type: "alert",
      title: "Cash Flow Alert",
      description: "Vendor payments of ₹45L due in next 10 days. Consider accelerating 3 pending collections.",
      confidence: 92,
      action: "View recommendations",
    },
    {
      id: "3",
      type: "recommendation",
      title: "Collection Optimization",
      description: "Sending reminders on Tuesdays at 10 AM shows 23% higher response rate for your customer base.",
      action: "Schedule reminders",
    },
  ]

  return <AIInsightsCard title="AI Finance Insights" insights={insights} className={className} />
}

// Lead scoring AI component
interface LeadAIInsightsProps {
  className?: string
}

export function LeadAIInsights({ className }: LeadAIInsightsProps) {
  const insights: AIInsight[] = [
    {
      id: "1",
      type: "prediction",
      title: "High-Value Lead Alert",
      description: "3 leads from Gachibowli area show 85%+ conversion probability based on engagement patterns.",
      confidence: 85,
      action: "View leads",
    },
    {
      id: "2",
      type: "trend",
      title: "Source Performance",
      description: "Facebook leads from Hyderabad converting 2.3x better than Google Ads this month.",
      change: 23,
      action: "Optimize campaigns",
    },
    {
      id: "3",
      type: "recommendation",
      title: "Follow-up Timing",
      description: "Leads contacted within 15 minutes have 4x higher conversion. Currently averaging 2 hours.",
      action: "Set up auto-alerts",
    },
  ]

  return <AIInsightsCard title="AI Lead Insights" insights={insights} className={className} />
}

// Project timeline AI component
interface ProjectAIInsightsProps {
  className?: string
}

export function ProjectAIInsights({ className }: ProjectAIInsightsProps) {
  const insights: AIInsight[] = [
    {
      id: "1",
      type: "prediction",
      title: "Completion Estimate",
      description: "Based on current progress and weather patterns, estimated completion is March 25, 2026.",
      confidence: 91,
      action: "View timeline",
    },
    {
      id: "2",
      type: "alert",
      title: "Potential Delay Risk",
      description: "External plastering may face 3-day delay due to predicted rainfall next week.",
      confidence: 78,
      action: "View alternatives",
    },
    {
      id: "3",
      type: "recommendation",
      title: "Quality Check Due",
      description: "Internal plastering at 60% - optimal time for mid-milestone quality inspection.",
      action: "Schedule inspection",
    },
  ]

  return <AIInsightsCard title="AI Project Insights" insights={insights} className={className} />
}
