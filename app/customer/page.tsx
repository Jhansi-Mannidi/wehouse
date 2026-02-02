"use client"

import { cn } from "@/lib/utils"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  MapPin,
  Calendar,
  IndianRupee,
  ArrowRight,
  Building2,
  Clock,
  Sparkles,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { useAI } from "@/lib/ai-context"

// Mock customer projects data with AI insights
const customerProjects = [
  {
    id: "1",
    name: "3BHK Villa - Whitefield",
    location: "Whitefield, Bengaluru",
    type: "Residential Villa",
    progress: 65,
    status: "on-track",
    currentPhase: "Plastering",
    expectedCompletion: "Mar 30, 2026",
    totalAmount: "₹82L",
    paid: "₹18L",
    pending: "₹12L",
    aiInsights: {
      predictedCompletion: "Mar 22, 2026",
      daysAhead: 8,
      confidence: 92,
      trend: "ahead",
      reason: "Consistent progress with no material delays. Current pace suggests early completion.",
    },
  },
  {
    id: "2",
    name: "4BHK Apartment - Koramangala",
    location: "Koramangala, Bengaluru",
    type: "Luxury Apartment",
    progress: 45,
    status: "on-track",
    currentPhase: "Electrical Work",
    expectedCompletion: "Jun 15, 2026",
    totalAmount: "₹1.2Cr",
    paid: "₹54L",
    pending: "₹66L",
    aiInsights: {
      predictedCompletion: "Jun 20, 2026",
      daysDelayed: 5,
      confidence: 85,
      trend: "slight-delay",
      reason: "Minor delay expected due to pending electrical material delivery. Overall on track.",
    },
  },
  {
    id: "3",
    name: "2BHK Flat - HSR Layout",
    location: "HSR Layout, Bengaluru",
    type: "Apartment",
    progress: 28,
    status: "delayed",
    currentPhase: "Foundation",
    expectedCompletion: "Aug 20, 2026",
    totalAmount: "₹55L",
    paid: "₹15L",
    pending: "₹40L",
    aiInsights: {
      predictedCompletion: "Sep 15, 2026",
      daysDelayed: 26,
      confidence: 78,
      trend: "delayed",
      reason: "Foundation work delayed due to heavy rainfall last month. Additional 3-4 weeks needed for soil stabilization.",
    },
  },
]

export default function CustomerProjectsList() {
  const { aiEnabled } = useAI()
  const currentTime = new Date().getHours()
  const greeting = currentTime < 12 ? "Good morning" : currentTime < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{greeting}, Rajesh!</h1>
        <p className="text-muted-foreground">Here are your construction projects</p>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customerProjects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total ongoing constructions</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Investment</CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <IndianRupee className="size-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹2.57Cr</div>
            <p className="text-xs text-muted-foreground mt-1">Across all projects</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Progress</CardTitle>
            <div className="p-2 rounded-lg bg-info/10">
              <Clock className="size-4 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">46%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">My Projects</h2>
        
        <div className="grid gap-6">
          {customerProjects.map((project) => (
            <Card 
              key={project.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                          <Home className="size-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground ml-[4.5rem]">
                        <MapPin className="size-4" />
                        {project.location}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge 
                        variant={project.status === "on-track" ? "success" : "destructive"}
                      >
                        {project.status === "on-track" ? "On Track" : "Delayed"}
                      </Badge>
                      <Button 
                        size="sm"
                        className="font-semibold"
                        asChild
                      >
                        <Link href="/customer/progress">
                          View Details
                          <ArrowRight className="ml-1.5 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Overall Progress</span>
                      <span className="font-bold text-lg">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Current Phase</p>
                      <p className="font-semibold">{project.currentPhase}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Expected</p>
                      <p className="font-semibold flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {project.expectedCompletion}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Paid</p>
                      <p className="font-semibold text-success">{project.paid}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Pending</p>
                      <p className="font-semibold text-primary">{project.pending}</p>
                    </div>
                  </div>

                  {/* AI Insights Section - Only visible when AI is enabled */}
                  {aiEnabled && project.aiInsights && (
                    <div className={cn(
                      "mt-4 p-5 rounded-xl border-2 transition-all",
                      project.aiInsights.trend === "ahead" 
                        ? "bg-success/5 border-success/20"
                        : project.aiInsights.trend === "delayed"
                          ? "bg-destructive/5 border-destructive/20"
                          : "bg-warning/5 border-warning/20"
                    )}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className={cn(
                          "p-2 rounded-xl",
                          project.aiInsights.trend === "ahead" 
                            ? "bg-success/10"
                            : project.aiInsights.trend === "delayed"
                              ? "bg-destructive/10"
                              : "bg-warning/10"
                        )}>
                          <Sparkles className={cn(
                            "size-4",
                            project.aiInsights.trend === "ahead" 
                              ? "text-success"
                              : project.aiInsights.trend === "delayed"
                                ? "text-destructive"
                                : "text-warning"
                          )} />
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          {project.aiInsights.confidence}% confidence
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "p-3 rounded-xl",
                            project.aiInsights.trend === "ahead" 
                              ? "bg-success/10"
                              : project.aiInsights.trend === "delayed"
                                ? "bg-destructive/10"
                                : "bg-warning/10"
                          )}>
                            {project.aiInsights.trend === "ahead" ? (
                              <TrendingUp className="size-5 text-success" />
                            ) : (
                              <AlertTriangle className={cn(
                                "size-5",
                                project.aiInsights.trend === "delayed"
                                  ? "text-destructive"
                                  : "text-warning"
                              )} />
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Predicted Completion</p>
                            <p className="font-bold text-lg">{project.aiInsights.predictedCompletion}</p>
                            {project.aiInsights.daysAhead && (
                              <p className="text-xs text-success font-semibold">
                                {project.aiInsights.daysAhead} days ahead of schedule
                              </p>
                            )}
                            {project.aiInsights.daysDelayed && (
                              <p className={cn(
                                "text-xs font-semibold",
                                project.aiInsights.trend === "delayed"
                                  ? "text-destructive"
                                  : "text-warning"
                              )}>
                                {project.aiInsights.daysDelayed} days behind schedule
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-muted">
                            <AlertTriangle className="size-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1 font-medium">Analysis</p>
                            <p className="text-sm leading-relaxed">{project.aiInsights.reason}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
