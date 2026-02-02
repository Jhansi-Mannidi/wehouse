"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Circle, Clock, ChevronRight, Camera, AlertCircle, TrendingUp, ClipboardCheck, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { 
  UploadImagesModal, 
  CreateTicketModal, 
  UpdateProgressModal, 
  QualityCheckModal 
} from "@/components/site-engineer/milestone-modals"

interface Subtask {
  id: string
  name: string
  status: "completed" | "in-progress" | "pending"
  progress?: number
}

interface Milestone {
  id: string
  number: number
  name: string
  status: "completed" | "in-progress" | "pending"
  progress?: number
  etc: string
  subtasks: Subtask[]
}

// Flat list of all milestones
const milestones: Milestone[] = [
  { 
    id: "m1", number: 1, name: "Survey", status: "completed", etc: "Apr 4, 2025",
    subtasks: [
      { id: "m1-1", name: "Site visit", status: "completed" },
      { id: "m1-2", name: "Site cleaning", status: "completed" },
      { id: "m1-3", name: "Total station survey", status: "completed" },
      { id: "m1-4", name: "Survey report", status: "completed" },
    ]
  },
  { 
    id: "m2", number: 2, name: "Preliminary Work", status: "completed", etc: "Apr 11, 2025",
    subtasks: [
      { id: "m2-1", name: "Pooja pit", status: "completed" },
      { id: "m2-2", name: "Soil test", status: "completed" },
      { id: "m2-3", name: "Electrical meter", status: "completed" },
      { id: "m2-4", name: "Bore", status: "completed" },
      { id: "m2-5", name: "Bore Motor", status: "completed" },
    ]
  },
  { 
    id: "m3", number: 3, name: "Excavation", status: "completed", etc: "Apr 14, 2025",
    subtasks: [
      { id: "m3-1", name: "Site cleaning", status: "completed" },
      { id: "m3-2", name: "Survey for footing marking", status: "completed" },
      { id: "m3-3", name: "Excavation", status: "completed" },
      { id: "m3-4", name: "Dressing", status: "completed" },
      { id: "m3-5", name: "Drawings", status: "completed" },
    ]
  },
  { 
    id: "m4", number: 4, name: "Sub-Structure", status: "completed", etc: "May 19, 2025",
    subtasks: [
      { id: "m4-1", name: "PCC", status: "completed" },
      { id: "m4-2", name: "Marking", status: "completed" },
      { id: "m4-3", name: "Footing", status: "completed" },
      { id: "m4-4", name: "Column", status: "completed" },
      { id: "m4-5", name: "Plinth Beam", status: "completed" },
      { id: "m4-6", name: "Backfilling", status: "completed" },
      { id: "m4-7", name: "Curing", status: "completed" },
      { id: "m4-8", name: "Sump Works", status: "completed" },
    ]
  },
  { 
    id: "m5", number: 5, name: "Super-Structure", status: "completed", etc: "Jun 13, 2025",
    subtasks: [
      { id: "m5-1", name: "Column", status: "completed" },
      { id: "m5-2", name: "Beam & Slab", status: "completed" },
      { id: "m5-3", name: "Staircase", status: "completed" },
      { id: "m5-4", name: "Staircase works", status: "completed" },
      { id: "m5-5", name: "Curing", status: "completed" },
      { id: "m5-6", name: "Drawings", status: "completed" },
    ]
  },
  { 
    id: "m6", number: 6, name: "Bricks Work", status: "completed", etc: "Jun 23, 2025",
    subtasks: [
      { id: "m6-1", name: "BW Marking", status: "completed" },
      { id: "m6-2", name: "Window Position & Sizes", status: "completed" },
      { id: "m6-3", name: "Door Frame Fixing", status: "completed" },
      { id: "m6-4", name: "Curing", status: "completed" },
      { id: "m6-5", name: "Wall Electrical Conduiting", status: "completed" },
      { id: "m6-6", name: "Drawings", status: "completed" },
    ]
  },
  { 
    id: "m7", number: 7, name: "Plaster", status: "completed", etc: "Aug 2, 2025",
    subtasks: [
      { id: "m7-1", name: "1st Coat Plastering", status: "completed" },
      { id: "m7-2", name: "2nd Coat Plastering", status: "completed" },
      { id: "m7-3", name: "Scaffolding", status: "completed" },
      { id: "m7-4", name: "External Plastering works", status: "completed" },
      { id: "m7-5", name: "Curing", status: "completed" },
    ]
  },
  { 
    id: "m8", number: 8, name: "Elevation", status: "completed", etc: "Aug 7, 2025",
    subtasks: [
      { id: "m8-1", name: "Plan", status: "completed" },
      { id: "m8-2", name: "Marking", status: "completed" },
      { id: "m8-3", name: "Elevation Plastering", status: "completed" },
      { id: "m8-4", name: "Elevation elements provision", status: "completed" },
      { id: "m8-5", name: "Drawings", status: "completed" },
    ]
  },
  { 
    id: "m9", number: 9, name: "Plumbing", status: "in-progress", progress: 70, etc: "Aug 12, 2025",
    subtasks: [
      { id: "m9-1", name: "UVC, CPVC Pipe Fittings", status: "completed" },
      { id: "m9-2", name: "Drainage line", status: "completed" },
      { id: "m9-3", name: "Mainline connection", status: "in-progress" },
      { id: "m9-4", name: "Drawings", status: "pending" },
    ]
  },
  { 
    id: "m10", number: 10, name: "Internal Painting", status: "in-progress", progress: 40, etc: "Aug 17, 2025",
    subtasks: [
      { id: "m10-1", name: "Putty", status: "completed" },
      { id: "m10-2", name: "Painting", status: "in-progress" },
      { id: "m10-3", name: "1st Coat Putty", status: "pending" },
      { id: "m10-4", name: "2nd Coat Putty", status: "pending" },
      { id: "m10-5", name: "Sanding/ Paper coat", status: "pending" },
    ]
  },
  { 
    id: "m11", number: 11, name: "Electrical Wiring", status: "completed", etc: "Aug 22, 2025",
    subtasks: [
      { id: "m11-1", name: "Purchase", status: "completed" },
      { id: "m11-2", name: "Wiring works", status: "completed" },
    ]
  },
  { 
    id: "m12", number: 12, name: "Flooring", status: "completed", etc: "Aug 30, 2025",
    subtasks: [
      { id: "m12-1", name: "Electrical line", status: "completed" },
      { id: "m12-2", name: "Plumbing line", status: "completed" },
      { id: "m12-3", name: "Level", status: "completed" },
      { id: "m12-4", name: "Laying", status: "completed" },
    ]
  },
  { 
    id: "m13", number: 13, name: "Windows", status: "completed", etc: "Sep 3, 2025",
    subtasks: [
      { id: "m13-1", name: "Measurement", status: "completed" },
      { id: "m13-2", name: "Procurement", status: "completed" },
      { id: "m13-3", name: "Install", status: "completed" },
      { id: "m13-4", name: "Glass", status: "completed" },
      { id: "m13-5", name: "Mosquito mesh", status: "completed" },
    ]
  },
  { 
    id: "m14", number: 14, name: "Doors", status: "pending", etc: "Sep 7, 2025",
    subtasks: [
      { id: "m14-1", name: "Measurement", status: "pending" },
      { id: "m14-2", name: "Door Fixing", status: "pending" },
      { id: "m14-3", name: "Door Install", status: "pending" },
      { id: "m14-4", name: "Hardware", status: "pending" },
    ]
  },
  { 
    id: "m15", number: 15, name: "Sanitary Fixtures", status: "pending", etc: "Sep 15, 2025",
    subtasks: [
      { id: "m15-1", name: "Sanitary Purchase", status: "pending" },
      { id: "m15-2", name: "Sanitary Install", status: "pending" },
      { id: "m15-3", name: "Overhead Tank works", status: "pending" },
    ]
  },
  { 
    id: "m16", number: 16, name: "Painting", status: "pending", etc: "Sep 25, 2025",
    subtasks: [
      { id: "m16-1", name: "Primer & texture", status: "pending" },
      { id: "m16-2", name: "Primary coat", status: "pending" },
      { id: "m16-3", name: "Secondary", status: "pending" },
      { id: "m16-4", name: "Door Frame and Gola paints", status: "pending" },
    ]
  },
  { 
    id: "m17", number: 17, name: "Switch Gears", status: "pending", etc: "Sep 29, 2025",
    subtasks: [
      { id: "m17-1", name: "Switch", status: "pending" },
      { id: "m17-2", name: "Socket", status: "pending" },
      { id: "m17-3", name: "Wiring", status: "pending" },
      { id: "m17-4", name: "DB connection", status: "pending" },
      { id: "m17-5", name: "Main line connection", status: "pending" },
      { id: "m17-6", name: "Plate fixing", status: "pending" },
    ]
  },
  { 
    id: "m18", number: 18, name: "External Flooring", status: "pending", etc: "Oct 4, 2025",
    subtasks: [
      { id: "m18-1", name: "Floor Levelling", status: "pending" },
      { id: "m18-2", name: "Set Back PCC", status: "pending" },
      { id: "m18-3", name: "Parking flooring", status: "pending" },
      { id: "m18-4", name: "Terrace waterproofing", status: "pending" },
    ]
  },
  { 
    id: "m19", number: 19, name: "Compound Wall", status: "pending", etc: "Oct 22, 2025",
    subtasks: [
      { id: "m19-1", name: "Excavation", status: "pending" },
      { id: "m19-2", name: "CR Test", status: "pending" },
      { id: "m19-3", name: "Backfill", status: "pending" },
      { id: "m19-4", name: "Plaster", status: "pending" },
      { id: "m19-5", name: "Selta columns", status: "pending" },
      { id: "m19-6", name: "Ramp Works", status: "pending" },
    ]
  },
  { 
    id: "m20", number: 20, name: "Fabrication", status: "pending", etc: "Oct 27, 2025",
    subtasks: [
      { id: "m20-1", name: "MS works", status: "pending" },
      { id: "m20-2", name: "SS railing works", status: "pending" },
    ]
  },
  { 
    id: "m21", number: 21, name: "Rain Water Harvesting", status: "pending", etc: "Oct 29, 2025",
    subtasks: [
      { id: "m21-1", name: "Pit provision", status: "pending" },
    ]
  },
  { 
    id: "m22", number: 22, name: "Inspection", status: "pending", etc: "Oct 30, 2025",
    subtasks: [
      { id: "m22-1", name: "Deep Cleaning", status: "pending" },
      { id: "m22-2", name: "Plumbing Leakage Checks", status: "pending" },
      { id: "m22-3", name: "Electrical Checks", status: "pending" },
      { id: "m22-4", name: "Doors and Windows Check", status: "pending" },
      { id: "m22-5", name: "Painting Touch-ups", status: "pending" },
    ]
  },
  { 
    id: "m23", number: 23, name: "Hardware Material", status: "pending", etc: "Oct 31, 2025",
    subtasks: [
      { id: "m23-1", name: "Hinges", status: "pending" },
      { id: "m23-2", name: "Lock", status: "pending" },
      { id: "m23-3", name: "Kit drop", status: "pending" },
      { id: "m23-4", name: "Tower bolt", status: "pending" },
      { id: "m23-5", name: "Door stopper", status: "pending" },
      { id: "m23-6", name: "Screws", status: "pending" },
      { id: "m23-7", name: "Door handle", status: "pending" },
    ]
  },
  { 
    id: "m24", number: 24, name: "Handover", status: "pending", etc: "Oct 31, 2025",
    subtasks: [
      { id: "m24-1", name: "Handover", status: "pending" },
    ]
  },
]

export default function SiteEngineerMilestonesPage() {
  const [selectedMilestone, setSelectedMilestone] = React.useState<Milestone>(milestones[9]) // Default to Internal Painting
  const [expandedSubtask, setExpandedSubtask] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [milestonesData, setMilestonesData] = React.useState<Milestone[]>(milestones)
  
  // Modal states
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false)
  const [ticketModalOpen, setTicketModalOpen] = React.useState(false)
  const [progressModalOpen, setProgressModalOpen] = React.useState(false)
  const [qualityModalOpen, setQualityModalOpen] = React.useState(false)
  const [selectedSubtask, setSelectedSubtask] = React.useState<string>("")
  const [selectedSubtaskId, setSelectedSubtaskId] = React.useState<string>("")
  const [selectedSubtaskProgress, setSelectedSubtaskProgress] = React.useState<number>(0)
  
  // Track actions
  const [uploadedImages, setUploadedImages] = React.useState<Set<string>>(new Set())
  const [createdTickets, setCreatedTickets] = React.useState<Set<string>>(new Set())
  const [qualityChecked, setQualityChecked] = React.useState<Set<string>>(new Set())

  // Filter milestones based on search
  const filteredMilestones = React.useMemo(() => {
    if (!searchQuery.trim()) return milestonesData
    return milestonesData.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [milestonesData, searchQuery])

  // Action handlers
  const handleUploadImages = (subtaskId: string, subtaskName: string) => {
    setSelectedSubtaskId(subtaskId)
    setSelectedSubtask(subtaskName)
    setUploadModalOpen(true)
  }

  const handleCreateTicket = (subtaskId: string, subtaskName: string) => {
    setSelectedSubtaskId(subtaskId)
    setSelectedSubtask(subtaskName)
    setTicketModalOpen(true)
  }

  const handleUpdateProgress = (subtaskId: string, subtaskName: string, currentProgress: number = 0) => {
    setSelectedSubtaskId(subtaskId)
    setSelectedSubtask(subtaskName)
    setSelectedSubtaskProgress(currentProgress)
    setProgressModalOpen(true)
  }

  const handleQualityCheck = (subtaskId: string, subtaskName: string) => {
    setSelectedSubtaskId(subtaskId)
    setSelectedSubtask(subtaskName)
    setQualityModalOpen(true)
  }

  // Success handlers
  const handleUploadSuccess = (subtaskId: string) => {
    setUploadedImages(prev => new Set(prev).add(subtaskId))
  }

  const handleTicketSuccess = (subtaskId: string) => {
    setCreatedTickets(prev => new Set(prev).add(subtaskId))
  }

  const handleProgressSuccess = (subtaskId: string, newStatus: "completed" | "in-progress" | "pending") => {
    setMilestonesData(prevMilestones => {
      return prevMilestones.map(milestone => ({
        ...milestone,
        subtasks: milestone.subtasks.map(subtask => 
          subtask.id === subtaskId ? { ...subtask, status: newStatus } : subtask
        )
      }))
    })
    // Update selected milestone too
    setSelectedMilestone(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(subtask => 
        subtask.id === subtaskId ? { ...subtask, status: newStatus } : subtask
      )
    }))
  }

  const handleQualitySuccess = (subtaskId: string) => {
    setQualityChecked(prev => new Set(prev).add(subtaskId))
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <div className="bg-card border-b px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="shrink-0" asChild>
            <Link href="/site-engineer/my-projects">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-bold">Project Milestones</h1>
            <p className="text-xs text-muted-foreground">WH-HYD-2024-001 - Rajesh Kumar</p>
          </div>
        </div>

        {/* Main Content - Side by Side Layout (40% / 60%) on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)]">
          {/* Left Panel - Milestones List (40% on desktop, full on mobile) */}
          <div className="w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r bg-card flex flex-col max-h-[40vh] lg:max-h-full">
            <div className="p-3 border-b">
              <h2 className="text-sm font-bold mb-2">Milestones</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search for Milestone"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-sm"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3">
              {/* Milestones with connecting line */}
              <div className="relative">
                {filteredMilestones.map((milestone, index) => {
                  const isSelected = selectedMilestone.id === milestone.id
                  const completedSubtasks = milestone.subtasks.filter(s => s.status === "completed").length
                  const totalSubtasks = milestone.subtasks.length
                  const progressPercent = Math.round((completedSubtasks / totalSubtasks) * 100)
                  const isLast = index === filteredMilestones.length - 1
                  
                  return (
                    <div key={milestone.id} className="relative flex gap-3 pb-3">
                      {/* Timeline - Dot and Connecting Line */}
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "size-3.5 rounded-full shrink-0 z-10 ring-2 ring-white dark:ring-slate-900",
                          milestone.status === "completed" 
                            ? "bg-emerald-500" 
                            : milestone.status === "in-progress"
                              ? "bg-[#f6a404]"
                              : "bg-slate-300"
                        )} />
                        {!isLast && (
                          <div className={cn(
                            "w-0.5 flex-1 min-h-[100px]",
                            milestone.status === "completed" 
                              ? "bg-emerald-400" 
                              : "bg-slate-200 dark:bg-slate-700"
                          )} />
                        )}
                      </div>
                      
                      {/* Milestone Card */}
                      <Card 
                        className={cn(
                          "flex-1 cursor-pointer transition-all hover:shadow-md",
                          isSelected 
                            ? "ring-2 ring-[#f6a404] border-[#f6a404]" 
                            : "border-slate-200 dark:border-slate-700"
                        )}
                        onClick={() => setSelectedMilestone(milestone)}
                      >
                        <CardContent className="p-3">
                          {/* Milestone Name + Status at Top */}
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold">{milestone.name}</p>
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                "text-[10px] shrink-0",
                                milestone.status === "completed" 
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                                  : milestone.status === "in-progress"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                                    : "bg-muted text-muted-foreground"
                              )}
                            >
                              {milestone.status === "completed" ? "Completed" : milestone.status === "in-progress" ? "In Progress" : "Pending"}
                            </Badge>
                          </div>
                          
                          {/* Progress Bar */}
                          <Progress value={progressPercent} className="h-1.5 mb-3" />
                          
                          {/* Milestone Number and ETC */}
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-[10px] text-muted-foreground">Milestone</p>
                              <p className="text-xl font-bold">{milestone.number}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-muted-foreground">ETC</p>
                              <p className="text-sm font-medium">{milestone.etc.replace(", 2025", "")} <span className="text-muted-foreground">2025</span></p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Tasks (60% on desktop, full on mobile) */}
          <div className="w-full lg:w-3/5 bg-card flex flex-col flex-1">
            <div className="p-3 border-b flex items-center justify-between">
              <h2 className="text-sm font-bold">{selectedMilestone.name} - Tasks</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px]">Block</Badge>
                <Badge className="text-[10px] bg-emerald-500">Resume</Badge>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {selectedMilestone.subtasks.map((subtask, index) => {
                const isExpanded = expandedSubtask === subtask.id
                
                return (
                  <div 
                    key={subtask.id} 
                    className={cn(
                      "rounded-lg border transition-all",
                      subtask.status === "completed"
                        ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800/30"
                        : subtask.status === "in-progress"
                          ? "bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30"
                          : "bg-card border-border"
                    )}
                  >
                    {/* Subtask Header */}
                    <div 
                      className="flex items-center justify-between p-3 cursor-pointer"
                      onClick={() => setExpandedSubtask(isExpanded ? null : subtask.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{index + 1}. {subtask.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={cn(
                            "text-[10px] px-2.5 py-0.5",
                            subtask.status === "completed"
                              ? "bg-lime-400 hover:bg-lime-400 text-lime-900 dark:bg-lime-500 dark:text-lime-950 border-0"
                              : subtask.status === "in-progress"
                                ? "bg-amber-400 hover:bg-amber-400 text-amber-900 dark:bg-amber-500 dark:text-amber-950 border-0"
                                : "bg-muted hover:bg-muted text-muted-foreground border-0"
                          )}
                        >
                          {subtask.status === "completed" ? "Completed" : subtask.status === "in-progress" ? "In Progress" : "Pending"}
                        </Badge>
                        <ChevronRight className={cn(
                          "size-4 text-muted-foreground transition-transform",
                          isExpanded && "rotate-90"
                        )} />
                      </div>
                    </div>
                    
                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-3 pb-3 space-y-3 border-t">
                        {/* Action Buttons - 2x2 on mobile, 4 cols on desktop */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className={cn(
                              "h-8 text-xs transition-colors bg-transparent justify-center",
                              uploadedImages.has(subtask.id)
                                ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                                : "border-border hover:bg-muted hover:text-foreground"
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleUploadImages(subtask.id, subtask.name)
                            }}
                          >
                            <Camera className="size-3.5 mr-1.5" />
                            {uploadedImages.has(subtask.id) ? "Images Added" : "Image Upload"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={cn(
                              "h-8 text-xs transition-colors bg-transparent justify-center",
                              createdTickets.has(subtask.id)
                                ? "border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/30"
                                : "border-border hover:bg-muted hover:text-foreground"
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCreateTicket(subtask.id, subtask.name)
                            }}
                          >
                            <AlertCircle className="size-3.5 mr-1.5" />
                            {createdTickets.has(subtask.id) ? "Ticket Created" : "Create Ticket"}
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 text-xs bg-[#f6a404] hover:bg-[#e09503] text-white justify-center"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleUpdateProgress(subtask.id, subtask.name, subtask.progress || 0)
                            }}
                          >
                            <TrendingUp className="size-3.5 mr-1.5" />
                            Update Progress
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={cn(
                              "h-8 text-xs transition-colors bg-transparent justify-center",
                              qualityChecked.has(subtask.id)
                                ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                                : "border-border hover:bg-muted hover:text-foreground"
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleQualityCheck(subtask.id, subtask.name)
                            }}
                            disabled={subtask.status !== "completed"}
                          >
                            <ClipboardCheck className="size-3.5 mr-1.5" />
                            {qualityChecked.has(subtask.id) ? "QC Done" : "Quality Check"}
                          </Button>
                        </div>

                        {/* Task Description (if images uploaded) */}
                        {uploadedImages.has(subtask.id) && (
                          <div className="pt-2 border-t">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Task Description</p>
                            <p className="text-xs font-medium mb-2">{subtask.name.toUpperCase()} WORKS COMPLETED</p>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="size-14 rounded bg-slate-200 dark:bg-slate-700 shrink-0 flex items-center justify-center">
                                  <Camera className="size-4 text-muted-foreground" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Modals */}
        <UploadImagesModal
          open={uploadModalOpen}
          onOpenChange={setUploadModalOpen}
          subtaskName={selectedSubtask}
          subtaskId={selectedSubtaskId}
          onSubmitSuccess={handleUploadSuccess}
        />
        <CreateTicketModal
          open={ticketModalOpen}
          onOpenChange={setTicketModalOpen}
          subtaskName={selectedSubtask}
          subtaskId={selectedSubtaskId}
          onSubmitSuccess={handleTicketSuccess}
        />
        <UpdateProgressModal
          open={progressModalOpen}
          onOpenChange={setProgressModalOpen}
          subtaskName={selectedSubtask}
          subtaskId={selectedSubtaskId}
          currentProgress={selectedSubtaskProgress}
          onSubmitSuccess={handleProgressSuccess}
        />
        <QualityCheckModal
          open={qualityModalOpen}
          onOpenChange={setQualityModalOpen}
          subtaskName={selectedSubtask}
          subtaskId={selectedSubtaskId}
          onSubmitSuccess={handleQualitySuccess}
        />
      </div>
    </DashboardLayout>
  )
}
