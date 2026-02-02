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
  Lock,
  Unlock,
  ChevronDown,
  ChevronRight,
  Star,
  Camera,
  FileText,
  Play,
  User,
  AlertCircle,
  MessageSquare,
  Phone,
  IndianRupee,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, ImagePlus, Upload } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  mockProject,
  mockMilestones,
  formatCurrency,
  type Milestone,
  type MilestoneStatus,
} from "@/lib/milestone-data"

// Milestone Card Component
function MilestoneCard({
  milestone,
  onViewDetails,
  onUpdateProgress,
  onMarkComplete,
}: {
  milestone: Milestone
  onViewDetails: (milestone: Milestone) => void
  onUpdateProgress: (milestone: Milestone) => void
  onMarkComplete: (milestone: Milestone) => void
}) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const getStatusConfig = (status: MilestoneStatus) => {
    switch (status) {
      case "reviewed":
        return {
          icon: CheckCircle2,
          label: "Completed",
          borderColor: "border-l-green-500",
          bgColor: "bg-green-50",
          badgeClass: "bg-green-100 text-green-700",
        }
      case "completed":
        return {
          icon: CheckCircle2,
          label: "Completed",
          borderColor: "border-l-green-500",
          bgColor: "bg-green-50",
          badgeClass: "bg-green-100 text-green-700",
        }
      case "in_progress":
        return {
          icon: Clock,
          label: "In Progress",
          borderColor: "border-l-blue-500",
          bgColor: "bg-blue-50",
          badgeClass: "bg-blue-100 text-blue-700",
        }
      case "unlocked":
        return {
          icon: Unlock,
          label: "Unlocked",
          borderColor: "border-l-orange-500",
          bgColor: "bg-orange-50",
          badgeClass: "bg-orange-100 text-orange-700",
        }
      case "locked":
        return {
          icon: Lock,
          label: "Locked",
          borderColor: "border-l-gray-300",
          bgColor: "bg-gray-50/60",
          badgeClass: "bg-gray-100 text-gray-500",
        }
      default:
        return {
          icon: Circle,
          label: status,
          borderColor: "border-l-gray-300",
          bgColor: "bg-background",
          badgeClass: "bg-gray-100 text-gray-500",
        }
    }
  }

  const config = getStatusConfig(milestone.status)
  const StatusIcon = config.icon
  const isLocked = milestone.status === "locked"
  const isCompleted = milestone.status === "completed" || milestone.status === "reviewed"
  const hasReview = milestone.review !== undefined

  return (
    <Card
      className={cn(
        "border-l-4 transition-all",
        config.borderColor,
        config.bgColor,
        isLocked && "opacity-70"
      )}
    >
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <StatusIcon
                  className={cn(
                    "size-5 mt-0.5 shrink-0",
                    isCompleted && "text-green-600",
                    milestone.status === "in_progress" && "text-blue-600",
                    milestone.status === "unlocked" && "text-orange-600",
                    isLocked && "text-gray-400"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">
                      M{milestone.number}: {milestone.name}
                    </span>
                    <Badge variant="outline" className={cn("text-xs", config.badgeClass)}>
                      {config.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <IndianRupee className="size-3" />
                      {formatCurrency(milestone.payment.amount)} 
                      {milestone.payment.status === "paid" ? (
                        <span className="text-green-600">(Paid)</span>
                      ) : (
                        <span className="text-orange-600">(Pending)</span>
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {milestone.plannedStart} - {milestone.plannedEnd}
                    </span>
                    {milestone.status === "in_progress" && (
                      <span className="flex items-center gap-1">
                        Progress: {milestone.progress}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "size-5 text-muted-foreground transition-transform shrink-0",
                  isExpanded && "rotate-180"
                )}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 pb-4">
            {/* Progress bar for in-progress milestones */}
            {milestone.status === "in_progress" && (
              <div className="mb-4">
                <Progress value={milestone.progress} className="h-2" />
              </div>
            )}

            {/* Steps */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-muted-foreground">Steps:</p>
              <div className="space-y-1.5">
                {milestone.steps.map((step) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-2 text-sm",
                      isLocked && "opacity-60"
                    )}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle2 className="size-4 text-green-600 shrink-0" />
                    ) : step.status === "in_progress" ? (
                      <div className="relative">
                        <Circle className="size-4 text-blue-600 shrink-0" />
                        <span className="absolute -right-1 -top-1 size-2 bg-blue-600 rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <Circle className="size-4 text-gray-300 shrink-0" />
                    )}
                    <span
                      className={cn(
                        step.status === "completed" && "text-muted-foreground line-through",
                        step.status === "in_progress" && "text-foreground font-medium"
                      )}
                    >
                      {step.name}
                      {step.status === "in_progress" && ` (${step.progress}%)`}
                      {step.status === "in_progress" && (
                        <span className="ml-1 text-xs text-blue-600">Current</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Review (for completed milestones) */}
            {isCompleted && hasReview && milestone.review && (
              <div className="mb-4 p-3 rounded-lg bg-background border">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="size-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">Customer Review</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-4",
                        i < milestone.review!.overallRating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">
                    {milestone.review.overallRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  &quot;{milestone.review.description}&quot;
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  - {milestone.review.reviewerName}, {milestone.review.reviewDate}
                </p>
              </div>
            )}

            {/* Awaiting Review (for completed without review) */}
            {milestone.status === "completed" && !hasReview && (
              <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Awaiting Customer Review
                  </span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Customer has not yet submitted their review for this milestone.
                </p>
              </div>
            )}

            {/* Locked Warning */}
            {isLocked && (
              <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">
                    Awaiting customer payment to unlock this milestone
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(milestone)}
              >
                View Details
              </Button>
              {milestone.status === "in_progress" && (
                <>
                  <Button variant="outline" size="sm" onClick={() => onUpdateProgress(milestone)}>
                    Update Progress
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="size-4 mr-1" />
                    Add Photos
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="size-4 mr-1" />
                    Daily Report
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onMarkComplete(milestone)}>
                    <CheckCircle2 className="size-4 mr-1" />
                    Mark Complete
                  </Button>
                </>
              )}
              {milestone.status === "unlocked" && (
                <>
                  <Button size="sm" className="bg-primary">
                    <Play className="size-4 mr-1" />
                    Start Milestone
                  </Button>
                  <Button variant="outline" size="sm">
                    Plan Materials
                  </Button>
                </>
              )}
              {isLocked && (
                <>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="size-4 mr-1" />
                    Notify Customer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="size-4 mr-1" />
                    Contact PM
                  </Button>
                </>
              )}
              {isCompleted && (
                <>
                  <Button variant="outline" size="sm">
                    <Camera className="size-4 mr-1" />
                    View Photos
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="size-4 mr-1" />
                    Quality Report
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

// Locked Milestone Detail Modal
function LockedMilestoneModal({
  milestone,
  isOpen,
  onClose,
}: {
  milestone: Milestone | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!milestone) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Lock className="size-5 text-gray-500" />
            <DialogTitle>
              M{milestone.number}: {milestone.name}
            </DialogTitle>
            <Badge variant="outline" className="bg-gray-100 text-gray-500">
              Locked
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Banner */}
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800">
                  This Milestone is Locked
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  Payment of {formatCurrency(milestone.payment.amount)} is pending from
                  customer. Work cannot begin until payment is received.
                </p>
                <div className="mt-3 text-sm text-amber-700">
                  <p className="font-medium">You can view milestone details but CANNOT:</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>Start work on any step</li>
                    <li>Add progress updates</li>
                    <li>Upload photos</li>
                    <li>Submit daily reports</li>
                  </ul>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="size-4 mr-1" />
                    Notify Customer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="size-4 mr-1" />
                    Contact Project Manager
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Details */}
          <div>
            <h4 className="font-medium text-foreground mb-3">
              Milestone Details (View Only)
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Description</p>
                <p className="font-medium">{milestone.description}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Amount</p>
                <p className="font-medium">{formatCurrency(milestone.payment.amount)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Planned Duration</p>
                <p className="font-medium">{milestone.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Workers Required</p>
                <p className="font-medium">{milestone.workersRequired || "TBD"}</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h4 className="font-medium text-foreground mb-3">
              Steps Included ({milestone.steps.length} Steps)
            </h4>
            <div className="space-y-2">
              {milestone.steps.map((step, index) => (
                <div
                  key={step.id}
                  className="p-3 rounded-lg border bg-gray-50/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Step {index + 1}: {step.name}
                      </span>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-500 text-xs">
                      <Lock className="size-3 mr-1" />
                      Locked
                    </Badge>
                  </div>
                  {step.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Duration: {step.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          {milestone.materials && milestone.materials.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-3">
                Materials Required (View Only)
              </h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium">Material</th>
                      <th className="text-left p-3 font-medium">Quantity</th>
                      <th className="text-right p-3 font-medium">Est. Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {milestone.materials.map((material, index) => (
                      <tr key={index}>
                        <td className="p-3">{material.name}</td>
                        <td className="p-3">{material.quantity}</td>
                        <td className="p-3 text-right">Rs. {material.estimatedCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Progress Update Modal
function ProgressUpdateModal({
  milestone,
  isOpen,
  onClose,
}: {
  milestone: Milestone | null
  isOpen: boolean
  onClose: () => void
}) {
  const [stepProgress, setStepProgress] = React.useState<Record<string, number>>({})
  const [stepNotes, setStepNotes] = React.useState<Record<string, string>>({})
  const [overallNotes, setOverallNotes] = React.useState("")
  const [photoCategory, setPhotoCategory] = React.useState("progress")

  React.useEffect(() => {
    if (milestone) {
      const initialProgress: Record<string, number> = {}
      milestone.steps.forEach((step) => {
        initialProgress[step.id] = step.progress || 0
      })
      setStepProgress(initialProgress)
    }
  }, [milestone])

  if (!milestone) return null

  const calculateOverallProgress = () => {
    const values = Object.values(stepProgress)
    if (values.length === 0) return 0
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Milestone Progress</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Milestone Info */}
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700">
              <Clock className="size-4" />
              <span className="font-medium">M{milestone.number}: {milestone.name}</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">Current Progress: {milestone.progress}%</p>
          </div>

          {/* Step Progress */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Step Progress</h4>
            <div className="space-y-4">
              {milestone.steps.map((step, index) => (
                <div key={step.id} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm">Step {index + 1}: {step.name}</span>
                    <Badge variant="outline" className={cn(
                      "text-xs",
                      (stepProgress[step.id] || 0) === 100 && "bg-green-100 text-green-700",
                      (stepProgress[step.id] || 0) > 0 && (stepProgress[step.id] || 0) < 100 && "bg-blue-100 text-blue-700",
                      (stepProgress[step.id] || 0) === 0 && "bg-gray-100 text-gray-700"
                    )}>
                      {(stepProgress[step.id] || 0) === 100 ? "Complete" : (stepProgress[step.id] || 0) > 0 ? "In Progress" : "Not Started"}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span className="font-semibold text-foreground">{stepProgress[step.id] || 0}%</span>
                    </div>
                    <Slider
                      value={[stepProgress[step.id] || 0]}
                      onValueChange={(value) =>
                        setStepProgress((prev) => ({ ...prev, [step.id]: value[0] }))
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`notes-${step.id}`} className="text-xs text-muted-foreground">Notes</Label>
                    <Textarea
                      id={`notes-${step.id}`}
                      placeholder="Add notes for this step..."
                      value={stepNotes[step.id] || ""}
                      onChange={(e) => setStepNotes((prev) => ({ ...prev, [step.id]: e.target.value }))}
                      className="mt-1 min-h-[60px] text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Photos */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Add Photos</h4>
            <div className="p-4 rounded-lg border border-dashed">
              <div className="flex flex-wrap gap-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="size-20 rounded-lg bg-muted flex items-center justify-center">
                    <ImagePlus className="size-6 text-muted-foreground" />
                  </div>
                ))}
                <button className="size-20 rounded-lg border-2 border-dashed flex items-center justify-center hover:bg-muted/50 transition-colors">
                  <Plus className="size-6 text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground">Photo Category:</Label>
                <select
                  value={photoCategory}
                  onChange={(e) => setPhotoCategory(e.target.value)}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="progress">Progress</option>
                  <option value="quality">Quality</option>
                  <option value="issue">Issue</option>
                  <option value="material">Material</option>
                  <option value="safety">Safety</option>
                </select>
              </div>
            </div>
          </div>

          {/* Overall Notes */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Overall Notes</h4>
            <Textarea
              placeholder="Add any additional notes about today's progress..."
              value={overallNotes}
              onChange={(e) => setOverallNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Calculated Progress */}
          <div className="p-3 rounded-lg bg-muted">
            <p className="text-sm">
              <span className="text-muted-foreground">Calculated Overall Progress: </span>
              <span className="font-bold text-foreground">{calculateOverallProgress()}%</span>
              <span className="text-xs text-muted-foreground ml-2">(based on step completion)</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" className="bg-transparent" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              Save Progress Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Mark Complete Modal
function MarkCompleteModal({
  milestone,
  isOpen,
  onClose,
}: {
  milestone: Milestone | null
  isOpen: boolean
  onClose: () => void
}) {
  const [checklist, setChecklist] = React.useState({
    allStepsComplete: true,
    photosUploaded: true,
    qualityChecklist: true,
    siteCleaned: true,
    customerWalkthrough: false,
  })
  const [completionNotes, setCompletionNotes] = React.useState("")

  if (!milestone) return null

  const allRequiredChecked = checklist.allStepsComplete && checklist.photosUploaded && checklist.qualityChecklist && checklist.siteCleaned

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mark Milestone as Complete</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Milestone Info */}
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700">
              <Clock className="size-4" />
              <span className="font-medium">M{milestone.number}: {milestone.name}</span>
            </div>
          </div>

          {/* Completion Checklist */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Completion Checklist</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="allStepsComplete"
                  checked={checklist.allStepsComplete}
                  onCheckedChange={(checked) =>
                    setChecklist((prev) => ({ ...prev, allStepsComplete: checked === true }))
                  }
                />
                <Label htmlFor="allStepsComplete" className="text-sm cursor-pointer">All steps are 100% complete</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="photosUploaded"
                  checked={checklist.photosUploaded}
                  onCheckedChange={(checked) =>
                    setChecklist((prev) => ({ ...prev, photosUploaded: checked === true }))
                  }
                />
                <Label htmlFor="photosUploaded" className="text-sm cursor-pointer">All required photos uploaded</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="qualityChecklist"
                  checked={checklist.qualityChecklist}
                  onCheckedChange={(checked) =>
                    setChecklist((prev) => ({ ...prev, qualityChecklist: checked === true }))
                  }
                />
                <Label htmlFor="qualityChecklist" className="text-sm cursor-pointer">Quality checklist completed</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="siteCleaned"
                  checked={checklist.siteCleaned}
                  onCheckedChange={(checked) =>
                    setChecklist((prev) => ({ ...prev, siteCleaned: checked === true }))
                  }
                />
                <Label htmlFor="siteCleaned" className="text-sm cursor-pointer">Site cleaned and materials cleared</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="customerWalkthrough"
                  checked={checklist.customerWalkthrough}
                  onCheckedChange={(checked) =>
                    setChecklist((prev) => ({ ...prev, customerWalkthrough: checked === true }))
                  }
                />
                <Label htmlFor="customerWalkthrough" className="text-sm cursor-pointer">Customer walkthrough done (optional)</Label>
              </div>
            </div>
          </div>

          {/* Completion Notes */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Completion Notes</h4>
            <Textarea
              placeholder="Describe the completed work, any observations, or notes for the customer..."
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Final Photos */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Final Photos (Minimum 3 required)</h4>
            <div className="p-4 rounded-lg border border-dashed">
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="size-20 rounded-lg bg-muted flex items-center justify-center">
                    <ImagePlus className="size-6 text-muted-foreground" />
                  </div>
                ))}
                <button className="size-20 rounded-lg border-2 border-dashed flex items-center justify-center hover:bg-muted/50 transition-colors">
                  <Plus className="size-6 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="size-5 text-amber-600 mt-0.5 shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Important:</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-amber-700">
                  <li>Marking complete will notify the customer</li>
                  <li>Customer will be prompted to review this milestone</li>
                  <li>Ensure all work is genuinely complete before marking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" className="bg-transparent" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={!allRequiredChecked} className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="size-4 mr-2" />
              Mark as Complete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function SiteEngineerMilestonesPage() {
  const params = useParams()
  const [selectedMilestone, setSelectedMilestone] = React.useState<Milestone | null>(null)
  const [showLockedModal, setShowLockedModal] = React.useState(false)
  const [showProgressModal, setShowProgressModal] = React.useState(false)
  const [showCompleteModal, setShowCompleteModal] = React.useState(false)

  // Calculate stats
  const stats = React.useMemo(() => {
    const completed = mockMilestones.filter(
      (m) => m.status === "completed" || m.status === "reviewed"
    ).length
    const inProgress = mockMilestones.filter(
      (m) => m.status === "in_progress"
    ).length
    const unlocked = mockMilestones.filter((m) => m.status === "unlocked").length
    const locked = mockMilestones.filter((m) => m.status === "locked").length
    const paidAmount = mockMilestones
      .filter((m) => m.payment.status === "paid")
      .reduce((sum, m) => sum + m.payment.amount, 0)

    return { completed, inProgress, unlocked, locked, paidAmount }
  }, [])

  const handleViewDetails = (milestone: Milestone) => {
    if (milestone.status === "locked") {
      setSelectedMilestone(milestone)
      setShowLockedModal(true)
    }
    // For other statuses, could open different modals or navigate
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Link href={`/projects/${params.id}`}>
              <Button variant="ghost" size="icon" className="size-9">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Project Milestones
              </h1>
              <p className="text-muted-foreground">
                {mockProject.customerName} - {mockProject.projectType}
              </p>
              <p className="text-sm text-muted-foreground">
                {mockProject.id} | {mockProject.location}
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardContent className="py-4">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium">
                      {stats.completed} of {mockMilestones.length} Milestones ({Math.round((stats.completed / mockMilestones.length) * 100)}%)
                    </span>
                  </div>
                  <Progress
                    value={(stats.completed / mockMilestones.length) * 100}
                    className="h-2"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <IndianRupee className="size-4" />
                      <span className="text-sm font-medium">Paid</span>
                    </div>
                    <p className="text-lg font-bold text-green-800 mt-1">
                      {formatCurrency(stats.paidAmount)}
                    </p>
                    <p className="text-xs text-green-600">
                      {mockMilestones.filter(m => m.payment.status === "paid").length} milestones
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Unlock className="size-4" />
                      <span className="text-sm font-medium">Unlocked</span>
                    </div>
                    <p className="text-lg font-bold text-blue-800 mt-1">
                      {stats.unlocked}
                    </p>
                    <p className="text-xs text-blue-600">Ready to start</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Lock className="size-4" />
                      <span className="text-sm font-medium">Locked</span>
                    </div>
                    <p className="text-lg font-bold text-gray-800 mt-1">
                      {stats.locked}
                    </p>
                    <p className="text-xs text-gray-600">Pending payment</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="size-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                    <p className="text-lg font-bold text-green-800 mt-1">
                      {stats.completed}
                    </p>
                    <p className="text-xs text-green-600">Done</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestone List */}
        <div className="space-y-4">
          {mockMilestones.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onViewDetails={handleViewDetails}
              onUpdateProgress={(m) => {
                setSelectedMilestone(m)
                setShowProgressModal(true)
              }}
              onMarkComplete={(m) => {
                setSelectedMilestone(m)
                setShowCompleteModal(true)
              }}
            />
          ))}
        </div>

        {/* Locked Milestone Modal */}
        <LockedMilestoneModal
          milestone={selectedMilestone}
          isOpen={showLockedModal}
          onClose={() => setShowLockedModal(false)}
        />

        {/* Progress Update Modal */}
        <ProgressUpdateModal
          milestone={selectedMilestone}
          isOpen={showProgressModal}
          onClose={() => setShowProgressModal(false)}
        />

        {/* Mark Complete Modal */}
        <MarkCompleteModal
          milestone={selectedMilestone}
          isOpen={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
        />
      </div>
    </DashboardLayout>
  )
}
