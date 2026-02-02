"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  ImageIcon,
  Users,
  IndianRupee,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  BarChart3,
  List,
  Plus,
  Star,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Types
interface SubTask {
  id: string
  name: string
  progress: number
  status: "completed" | "in_progress" | "pending"
}

interface Milestone {
  id: string
  number: number
  name: string
  description: string
  phase: string
  startDate: string
  endDate: string
  actualStart?: string
  actualEnd?: string
  status: "completed" | "in_progress" | "pending" | "delayed"
  progress: number
  qualityScore?: number
  subTasks?: SubTask[]
  photos?: string[]
  team?: {
    contractor: string
    workers: number
    supervisor: string
  }
  payment?: {
    percentage: number
    amount: number
    status: "paid" | "pending" | "overdue"
  }
}

interface Project {
  id: string
  customerName: string
  projectType: string
  location: string
  area: string
  progress: number
  status: "on_track" | "at_risk" | "delayed"
  dueDate: string
  package: string
}

// Mock project data
const projectData: Project = {
  id: "WH-P-HYD-2026-001",
  customerName: "Rajesh Kumar",
  projectType: "G+2 Residential",
  location: "Kondapur, Hyderabad",
  area: "2,800 sq.ft",
  progress: 65,
  status: "on_track",
  dueDate: "Mar 30, 2026",
  package: "Gold",
}

// Mock milestone data
const milestonesData: Milestone[] = [
  // Phase 1: Foundation
  {
    id: "m1",
    number: 1,
    name: "Site Preparation",
    description: "Clearing, leveling, boundary marking",
    phase: "Foundation",
    startDate: "Nov 1",
    endDate: "Nov 5",
    actualStart: "Nov 1",
    actualEnd: "Nov 5",
    status: "completed",
    progress: 100,
    qualityScore: 4.5,
  },
  {
    id: "m2",
    number: 2,
    name: "PCC & Foundation",
    description: "Plain cement concrete, foundation layout",
    phase: "Foundation",
    startDate: "Nov 6",
    endDate: "Nov 15",
    actualStart: "Nov 6",
    actualEnd: "Nov 14",
    status: "completed",
    progress: 100,
    qualityScore: 4.8,
  },
  {
    id: "m3",
    number: 3,
    name: "Plinth Beam",
    description: "Reinforcement, beam casting",
    phase: "Foundation",
    startDate: "Nov 16",
    endDate: "Nov 22",
    actualStart: "Nov 15",
    actualEnd: "Nov 21",
    status: "completed",
    progress: 100,
    qualityScore: 4.6,
  },
  // Phase 2: Structure
  {
    id: "m4",
    number: 4,
    name: "Ground Floor Columns",
    description: "Column reinforcement & casting",
    phase: "Structure",
    startDate: "Nov 23",
    endDate: "Nov 30",
    actualStart: "Nov 22",
    actualEnd: "Nov 29",
    status: "completed",
    progress: 100,
    qualityScore: 4.7,
  },
  {
    id: "m5",
    number: 5,
    name: "Ground Floor Slab",
    description: "Slab formwork, rebar, casting",
    phase: "Structure",
    startDate: "Dec 1",
    endDate: "Dec 10",
    actualStart: "Nov 30",
    actualEnd: "Dec 9",
    status: "completed",
    progress: 100,
    qualityScore: 4.5,
  },
  {
    id: "m6",
    number: 6,
    name: "First Floor Columns",
    description: "Column reinforcement & casting",
    phase: "Structure",
    startDate: "Dec 11",
    endDate: "Dec 18",
    actualStart: "Dec 10",
    actualEnd: "Dec 17",
    status: "completed",
    progress: 100,
    qualityScore: 4.6,
  },
  {
    id: "m7",
    number: 7,
    name: "First Floor Slab",
    description: "Slab formwork, rebar, casting",
    phase: "Structure",
    startDate: "Dec 19",
    endDate: "Dec 28",
    actualStart: "Dec 18",
    actualEnd: "Dec 27",
    status: "completed",
    progress: 100,
    qualityScore: 4.8,
  },
  {
    id: "m8",
    number: 8,
    name: "Second Floor Columns",
    description: "Column reinforcement & casting",
    phase: "Structure",
    startDate: "Dec 29",
    endDate: "Jan 5",
    actualStart: "Dec 28",
    actualEnd: "Jan 4",
    status: "completed",
    progress: 100,
    qualityScore: 4.5,
  },
  {
    id: "m9",
    number: 9,
    name: "Second Floor Slab",
    description: "Slab formwork, rebar, casting",
    phase: "Structure",
    startDate: "Jan 6",
    endDate: "Jan 15",
    actualStart: "Jan 5",
    actualEnd: "Jan 14",
    status: "completed",
    progress: 100,
    qualityScore: 4.7,
  },
  {
    id: "m10",
    number: 10,
    name: "Roof Slab",
    description: "Roof slab casting with waterproofing",
    phase: "Structure",
    startDate: "Jan 16",
    endDate: "Jan 22",
    actualStart: "Jan 15",
    actualEnd: "Jan 21",
    status: "completed",
    progress: 100,
    qualityScore: 4.9,
  },
  {
    id: "m11",
    number: 11,
    name: "Brickwork",
    description: "External and internal walls",
    phase: "Structure",
    startDate: "Jan 23",
    endDate: "Feb 2",
    actualStart: "Jan 22",
    actualEnd: "Feb 1",
    status: "completed",
    progress: 100,
    qualityScore: 4.4,
  },
  // Phase 3: Finishing
  {
    id: "m12",
    number: 12,
    name: "Internal Plastering",
    description: "Internal wall and ceiling plastering",
    phase: "Finishing",
    startDate: "Jan 20",
    endDate: "Feb 5",
    actualStart: "Jan 20",
    status: "in_progress",
    progress: 60,
    subTasks: [
      { id: "st1", name: "Living room plastering", progress: 100, status: "completed" },
      { id: "st2", name: "Bedroom 1 plastering", progress: 100, status: "completed" },
      { id: "st3", name: "Bedroom 2 plastering", progress: 70, status: "in_progress" },
      { id: "st4", name: "Bedroom 3 plastering", progress: 0, status: "pending" },
      { id: "st5", name: "Kitchen & utility plastering", progress: 0, status: "pending" },
      { id: "st6", name: "Bathroom plastering (3)", progress: 0, status: "pending" },
    ],
    photos: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"],
    team: {
      contractor: "Sri Builders",
      workers: 6,
      supervisor: "Venkat",
    },
    payment: {
      percentage: 10,
      amount: 820000,
      status: "pending",
    },
  },
  {
    id: "m13",
    number: 13,
    name: "External Plastering",
    description: "External wall plastering and finish",
    phase: "Finishing",
    startDate: "Feb 6",
    endDate: "Feb 15",
    status: "pending",
    progress: 0,
  },
  {
    id: "m14",
    number: 14,
    name: "Electrical First Fix",
    description: "Conduit, box fixing",
    phase: "Finishing",
    startDate: "Feb 10",
    endDate: "Feb 18",
    status: "pending",
    progress: 0,
  },
  {
    id: "m15",
    number: 15,
    name: "Plumbing First Fix",
    description: "Concealed piping, drainage",
    phase: "Finishing",
    startDate: "Feb 12",
    endDate: "Feb 20",
    status: "pending",
    progress: 0,
  },
  {
    id: "m16",
    number: 16,
    name: "Flooring",
    description: "Tile/marble/granite flooring",
    phase: "Finishing",
    startDate: "Feb 18",
    endDate: "Mar 1",
    status: "pending",
    progress: 0,
  },
  {
    id: "m17",
    number: 17,
    name: "Bathroom Fittings",
    description: "Sanitary, CP fittings installation",
    phase: "Finishing",
    startDate: "Mar 2",
    endDate: "Mar 6",
    status: "pending",
    progress: 0,
  },
  {
    id: "m18",
    number: 18,
    name: "Electrical Second Fix",
    description: "Wiring, switches, fixtures",
    phase: "Finishing",
    startDate: "Mar 5",
    endDate: "Mar 10",
    status: "pending",
    progress: 0,
  },
  {
    id: "m19",
    number: 19,
    name: "Painting - Primer",
    description: "Wall primer and putty",
    phase: "Finishing",
    startDate: "Mar 8",
    endDate: "Mar 12",
    status: "pending",
    progress: 0,
  },
  {
    id: "m20",
    number: 20,
    name: "Painting - Final",
    description: "Final paint coats",
    phase: "Finishing",
    startDate: "Mar 13",
    endDate: "Mar 18",
    status: "pending",
    progress: 0,
  },
  {
    id: "m21",
    number: 21,
    name: "Doors & Windows",
    description: "Door frames, shutters, windows",
    phase: "Finishing",
    startDate: "Mar 15",
    endDate: "Mar 20",
    status: "pending",
    progress: 0,
  },
  {
    id: "m22",
    number: 22,
    name: "Kitchen Platform",
    description: "Granite platform, sink installation",
    phase: "Finishing",
    startDate: "Mar 18",
    endDate: "Mar 22",
    status: "pending",
    progress: 0,
  },
  {
    id: "m23",
    number: 23,
    name: "Final Touches",
    description: "Cleaning, touch-ups, final inspection",
    phase: "Finishing",
    startDate: "Mar 23",
    endDate: "Mar 28",
    status: "pending",
    progress: 0,
  },
  {
    id: "m24",
    number: 24,
    name: "Handover",
    description: "Final inspection, key handover",
    phase: "Handover",
    startDate: "Mar 25",
    endDate: "Mar 30",
    status: "pending",
    progress: 0,
  },
]

// Group milestones by phase
const phases = [
  { name: "Foundation", status: "completed" as const },
  { name: "Structure", status: "completed" as const },
  { name: "Finishing", status: "in_progress" as const },
  { name: "Handover", status: "pending" as const },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="size-5 text-green-600" />
    case "in_progress":
      return <ImageIcon className="size-5 text-primary fill-primary" />
    case "delayed":
      return <AlertTriangle className="size-5 text-red-600" />
    default:
      return <Circle className="size-5 text-muted-foreground" />
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 border-green-200"
    case "in_progress":
      return "bg-primary/10 text-primary border-primary/20"
    case "delayed":
      return "bg-red-100 text-red-700 border-red-200"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

// Milestone Card Component
function MilestoneCard({
  milestone,
  onClick,
}: {
  milestone: Milestone
  onClick: () => void
}) {
  const isClickable = milestone.status === "in_progress" || milestone.status === "completed"

  return (
    <div
      className={cn(
        "relative pl-8 pb-8 last:pb-0",
        "before:absolute before:left-[9px] before:top-6 before:bottom-0 before:w-[2px]",
        milestone.status === "completed"
          ? "before:bg-green-300"
          : milestone.status === "in_progress"
            ? "before:bg-primary/30"
            : "before:bg-border"
      )}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1">
        {getStatusIcon(milestone.status)}
      </div>

      {/* Content */}
      <div
        className={cn(
          "rounded-xl border bg-card p-4 transition-all",
          isClickable && "cursor-pointer hover:shadow-md hover:border-primary/30",
          milestone.status === "in_progress" && "border-primary/30 bg-primary/5"
        )}
        onClick={isClickable ? onClick : undefined}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground">
                M{milestone.number}
              </span>
              <h4 className="font-semibold text-foreground">{milestone.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{milestone.description}</p>
          </div>
          <Badge variant="outline" className={cn("text-xs shrink-0", getStatusBadge(milestone.status))}>
            {milestone.status === "completed"
              ? "Completed"
              : milestone.status === "in_progress"
                ? "In Progress"
                : milestone.status === "delayed"
                  ? "Delayed"
                  : "Scheduled"}
          </Badge>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            <span>{milestone.startDate} - {milestone.endDate}</span>
          </div>
          {milestone.qualityScore && (
            <div className="flex items-center gap-1 text-yellow-600">
              <Star className="size-3.5 fill-yellow-500" />
              <span>{milestone.qualityScore}/5</span>
            </div>
          )}
        </div>

        {/* Progress bar for in-progress milestones */}
        {milestone.status === "in_progress" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">{milestone.progress}%</span>
            </div>
            <Progress value={milestone.progress} className="h-2" />

            {/* Sub-tasks preview */}
            {milestone.subTasks && milestone.subTasks.length > 0 && (
              <div className="mt-3 pt-3 border-t border-dashed space-y-1.5">
                {milestone.subTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center gap-2 text-xs">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="size-3.5 text-green-600" />
                    ) : task.status === "in_progress" ? (
                      <ImageIcon className="size-3.5 text-primary fill-primary" />
                    ) : (
                      <Circle className="size-3.5 text-muted-foreground" />
                    )}
                    <span className={cn(
                      task.status === "completed" && "text-muted-foreground line-through"
                    )}>
                      {task.name}
                    </span>
                  </div>
                ))}
                {milestone.subTasks.length > 3 && (
                  <p className="text-xs text-muted-foreground pl-5">
                    +{milestone.subTasks.length - 3} more tasks
                  </p>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-dashed">
              <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                <ImageIcon className="size-3 mr-1" />
                Add Photos
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                <ImageIcon className="size-3 mr-1" />
                Quality Check
              </Button>
              <Button size="sm" className="h-7 text-xs">
                Update Progress
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Milestone Detail Modal
function MilestoneDetailModal({
  milestone,
  open,
  onClose,
}: {
  milestone: Milestone | null
  open: boolean
  onClose: () => void
}) {
  if (!milestone) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                M{milestone.number}
              </p>
              <DialogTitle className="text-xl">{milestone.name}</DialogTitle>
            </div>
            <Badge variant="outline" className={cn("text-sm", getStatusBadge(milestone.status))}>
              {milestone.status === "completed"
                ? "Completed"
                : milestone.status === "in_progress"
                  ? `In Progress (${milestone.progress}%)`
                  : "Scheduled"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Timeline Info */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/50">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Planned Duration</p>
              <p className="text-sm font-medium">{milestone.startDate} - {milestone.endDate}</p>
            </div>
            {milestone.actualStart && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Actual Start</p>
                <p className="text-sm font-medium">{milestone.actualStart}</p>
              </div>
            )}
            {milestone.actualEnd ? (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Actual End</p>
                <p className="text-sm font-medium text-green-600">{milestone.actualEnd}</p>
              </div>
            ) : milestone.status === "in_progress" ? (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expected End</p>
                <p className="text-sm font-medium">{milestone.endDate} (on track)</p>
              </div>
            ) : null}
            {milestone.qualityScore && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Quality Score</p>
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{milestone.qualityScore}/5</span>
                </div>
              </div>
            )}
          </div>

          {/* Sub-tasks */}
          {milestone.subTasks && milestone.subTasks.length > 0 && (
            <div className="rounded-xl border p-4">
              <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <ImageIcon className="size-4" />
                Sub-tasks
              </h4>
              <div className="space-y-3">
                {milestone.subTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={task.status === "completed"}
                        className="size-5"
                      />
                      <span className={cn(
                        "text-sm",
                        task.status === "completed" && "text-muted-foreground line-through"
                      )}>
                        {task.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === "in_progress" && (
                        <span className="text-xs text-primary font-medium">{task.progress}%</span>
                      )}
                      {task.status === "completed" ? (
                        <CheckCircle2 className="size-4 text-green-600" />
                      ) : task.status === "in_progress" ? (
                        <ImageIcon className="size-4 text-primary fill-primary" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {milestone.photos && milestone.photos.length > 0 && (
            <div className="rounded-xl border p-4">
              <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <ImageIcon className="size-4" />
                Recent Photos ({milestone.photos.length})
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {milestone.photos.map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg bg-muted flex items-center justify-center"
                  >
                    <ImageIcon className="size-8 text-muted-foreground" />
                  </div>
                ))}
                <button className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Plus className="size-6" />
                </button>
              </div>
            </div>
          )}

          {/* Work Team */}
          {milestone.team && (
            <div className="rounded-xl border p-4">
              <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Users className="size-4" />
                Work Team
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Contractor</p>
                  <p className="text-sm font-medium">{milestone.team.contractor}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Workers</p>
                  <p className="text-sm font-medium">{milestone.team.workers}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Supervisor</p>
                  <p className="text-sm font-medium">{milestone.team.supervisor}</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Info */}
          {milestone.payment && (
            <div className="rounded-xl border p-4">
              <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <IndianRupee className="size-4" />
                Payment Linked
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">
                    {milestone.payment.percentage}% ({formatCurrency(milestone.payment.amount)}) due on milestone completion
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    milestone.payment.status === "paid"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : milestone.payment.status === "overdue"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                  )}
                >
                  {milestone.payment.status.charAt(0).toUpperCase() + milestone.payment.status.slice(1)}
                </Badge>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button variant="outline" className="bg-transparent">
              <ImageIcon className="size-4 mr-2" />
              Add Photos
            </Button>
            <Button variant="outline" className="bg-transparent">
              <ImageIcon className="size-4 mr-2" />
              Request Quality Check
            </Button>
            {milestone.status === "in_progress" && (
              <>
                <Button>
                  <CheckCircle2 className="size-4 mr-2" />
                  Mark Complete
                </Button>
                <Button variant="outline" className="bg-transparent text-red-600 border-red-200 hover:bg-red-50">
                  <ImageIcon className="size-4 mr-2" />
                  Report Delay
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [viewMode, setViewMode] = React.useState<"list" | "gantt">("list")
  const [selectedMilestone, setSelectedMilestone] = React.useState<Milestone | null>(null)
  const [expandedPhases, setExpandedPhases] = React.useState<string[]>(["Foundation", "Structure", "Finishing", "Handover"])

  const togglePhase = (phase: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]
    )
  }

  const getPhaseStatus = (phaseName: string) => {
    const phaseMilestones = milestonesData.filter((m) => m.phase === phaseName)
    if (phaseMilestones.every((m) => m.status === "completed")) return "completed"
    if (phaseMilestones.some((m) => m.status === "in_progress")) return "in_progress"
    if (phaseMilestones.some((m) => m.status === "delayed")) return "delayed"
    return "pending"
  }

  const getPhaseProgress = (phaseName: string) => {
    const phaseMilestones = milestonesData.filter((m) => m.phase === phaseName)
    if (phaseMilestones.length === 0) return 0
    const totalProgress = phaseMilestones.reduce((sum, m) => sum + m.progress, 0)
    return Math.round(totalProgress / phaseMilestones.length)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Link + Header */}
        <div className="space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>

          {/* Project Header Card */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-foreground">
                      {projectData.customerName} - {projectData.projectType}
                    </h1>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-sm",
                        projectData.status === "on_track"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : projectData.status === "at_risk"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-red-100 text-red-700 border-red-200"
                      )}
                    >
                      {projectData.status === "on_track" ? "On Track" : projectData.status === "at_risk" ? "At Risk" : "Delayed"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-mono">{projectData.id}</span>
                    <span className="flex items-center gap-1">
                      <ImageIcon className="size-4" />
                      {projectData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <ImageIcon className="size-4" />
                      {projectData.area}
                    </span>
                    <Badge variant="secondary">{projectData.package} Package</Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-3xl font-bold text-primary">{projectData.progress}%</p>
                  </div>
                  <div className="w-48">
                    <Progress value={projectData.progress} className="h-3" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Due: {projectData.dueDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="milestones" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="reports">Daily Reports</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="space-y-6">
            {/* Milestone Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Construction Milestones</h2>
                <Badge variant="secondary" className="ml-2">
                  {milestonesData.filter((m) => m.status === "completed").length} / {milestonesData.length} Complete
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode !== "list" ? "bg-transparent" : ""}
                >
                  <List className="size-4 mr-1" />
                  List View
                </Button>
                <Button
                  variant={viewMode === "gantt" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("gantt")}
                  className={viewMode !== "gantt" ? "bg-transparent" : ""}
                >
                  <BarChart3 className="size-4 mr-1" />
                  Gantt View
                </Button>
              </div>
            </div>

            {/* Milestones by Phase */}
            <div className="space-y-4">
              {phases.map((phase) => {
                const phaseStatus = getPhaseStatus(phase.name)
                const phaseProgress = getPhaseProgress(phase.name)
                const phaseMilestones = milestonesData.filter((m) => m.phase === phase.name)
                const isExpanded = expandedPhases.includes(phase.name)

                return (
                  <Collapsible
                    key={phase.name}
                    open={isExpanded}
                    onOpenChange={() => togglePhase(phase.name)}
                  >
                    <Card>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isExpanded ? (
                                <ChevronDown className="size-5 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="size-5 text-muted-foreground" />
                              )}
                              <CardTitle className="text-base">
                                Phase: {phase.name}
                              </CardTitle>
                              <Badge
                                variant="outline"
                                className={cn("text-xs", getStatusBadge(phaseStatus))}
                              >
                                {phaseStatus === "completed"
                                  ? "Complete"
                                  : phaseStatus === "in_progress"
                                    ? "In Progress"
                                    : "Pending"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <span className="text-sm font-semibold">{phaseProgress}%</span>
                              </div>
                              <div className="w-24">
                                <Progress value={phaseProgress} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="pl-4 border-l-2 border-muted ml-2">
                            {phaseMilestones.map((milestone) => (
                              <MilestoneCard
                                key={milestone.id}
                                milestone={milestone}
                                onClick={() => setSelectedMilestone(milestone)}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="overview">
            <Card className="p-8 text-center text-muted-foreground">
              <p>Project Overview - Coming Soon</p>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="p-8 text-center text-muted-foreground">
              <p>Daily Reports - Coming Soon</p>
            </Card>
          </TabsContent>

          <TabsContent value="quality">
            <Card className="p-8 text-center text-muted-foreground">
              <p>Quality Checks - Coming Soon</p>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="p-8 text-center text-muted-foreground">
              <p>Payment Schedule - Coming Soon</p>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="p-8 text-center text-muted-foreground">
              <p>Project Documents - Coming Soon</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Milestone Detail Modal */}
        <MilestoneDetailModal
          milestone={selectedMilestone}
          open={!!selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      </div>
    </DashboardLayout>
  )
}
