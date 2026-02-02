"use client"

import * as React from "react"
import {
  Home,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Lock,
  Unlock,
  ChevronDown,
  Star,
  Camera,
  IndianRupee,
  FileText,
  Ticket,
  PenSquare,
  Eye,
  CreditCard,
  Loader2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  mockProject,
  mockMilestones,
  mockTickets,
  mockChangeRequests,
  formatCurrency,
  getTicketStatusColor,
  getTicketTypeLabel,
  type Milestone,
  type MilestoneStatus,
  type TicketType,
  type TicketPriority,
} from "@/lib/milestone-data"

// Star Rating Component
function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
}: {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
}) {
  const [hoverRating, setHoverRating] = React.useState(0)
  const sizeClasses = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          className={cn(
            "transition-colors",
            !readonly && "cursor-pointer hover:scale-110"
          )}
          onMouseEnter={() => !readonly && setHoverRating(i + 1)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          onClick={() => onRatingChange?.(i + 1)}
        >
          <Star
            className={cn(
              sizeClasses[size],
              (hoverRating || rating) > i
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  )
}

// Milestone Card for Customer Portal
function CustomerMilestoneCard({
  milestone,
  onWriteReview,
  onViewDetails,
  onSelectForPayment,
  isSelected,
}: {
  milestone: Milestone
  onWriteReview: (milestone: Milestone) => void
  onViewDetails: (milestone: Milestone) => void
  onSelectForPayment?: (milestone: Milestone) => void
  isSelected?: boolean
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
        }
      case "completed":
        return {
          icon: CheckCircle2,
          label: "Completed",
          borderColor: "border-l-green-500",
          bgColor: "bg-green-50",
        }
      case "in_progress":
        return {
          icon: Clock,
          label: "In Progress",
          borderColor: "border-l-blue-500",
          bgColor: "bg-blue-50",
        }
      case "unlocked":
        return {
          icon: Unlock,
          label: "Unlocked",
          borderColor: "border-l-orange-500",
          bgColor: "bg-orange-50",
        }
      case "locked":
        return {
          icon: Lock,
          label: "Locked",
          borderColor: "border-l-gray-300",
          bgColor: "bg-background",
        }
      default:
        return {
          icon: Circle,
          label: status,
          borderColor: "border-l-gray-300",
          bgColor: "bg-background",
        }
    }
  }

  const config = getStatusConfig(milestone.status)
  const StatusIcon = config.icon
  const isLocked = milestone.status === "locked"
  const isCompleted = milestone.status === "completed" || milestone.status === "reviewed"
  const hasReview = milestone.review !== undefined
  const showPaymentSelect = isLocked && onSelectForPayment

  return (
    <Card className={cn("border-l-4 transition-all", config.borderColor, config.bgColor)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="p-4 cursor-pointer hover:bg-accent/5 transition-colors">
            <div className="flex items-start gap-3">
              {showPaymentSelect && (
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onSelectForPayment?.(milestone)}
                  className="mt-1"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
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
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">
                    M{milestone.number}: {milestone.name}
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(milestone.payment.amount)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {milestone.payment.status === "paid" ? (
                    <span className="text-green-600">Paid on {milestone.payment.paidDate}</span>
                  ) : (
                    <span>Payment Pending</span>
                  )}
                </div>

                {/* Progress bar for in-progress */}
                {milestone.status === "in_progress" && (
                  <div className="mt-2">
                    <Progress value={milestone.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {milestone.progress}% complete
                    </p>
                  </div>
                )}

                {/* Review section for completed */}
                {isCompleted && (
                  <div className="mt-2">
                    {hasReview && milestone.review ? (
                      <div className="flex items-center gap-2">
                        <StarRating rating={milestone.review.overallRating} readonly size="sm" />
                        <span className="text-sm font-medium">
                          {milestone.review.overallRating.toFixed(1)}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Review Pending
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "size-5 text-muted-foreground transition-transform shrink-0",
                  isExpanded && "rotate-180"
                )}
              />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 border-t">
            {/* Review details for completed with review */}
            {isCompleted && hasReview && milestone.review && (
              <div className="mb-4 pt-4">
                <p className="text-sm text-muted-foreground italic">
                  &quot;{milestone.review.description}&quot;
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Reviewed on {milestone.review.reviewDate}
                </p>
              </div>
            )}

            {/* In Progress details */}
            {milestone.status === "in_progress" && (
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Current Step: {milestone.steps.find((s) => s.status === "in_progress")?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expected Completion: {milestone.plannedEnd}
                </p>
              </div>
            )}

            {/* Unlocked details */}
            {milestone.status === "unlocked" && (
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Work will begin after the current milestone completes
                </p>
              </div>
            )}

            {/* Locked details */}
            {isLocked && (
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Work: {milestone.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  Duration: {milestone.duration}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => onViewDetails(milestone)}>
                <Eye className="size-4 mr-1" />
                View Details
              </Button>
              {isCompleted && (
                <Button variant="outline" size="sm">
                  <Camera className="size-4 mr-1" />
                  View Photos
                </Button>
              )}
              {milestone.status === "completed" && !hasReview && (
                <Button size="sm" onClick={() => onWriteReview(milestone)} className="bg-primary">
                  <Star className="size-4 mr-1" />
                  Write Review
                </Button>
              )}
              {hasReview && (
                <Button variant="outline" size="sm" onClick={() => onWriteReview(milestone)}>
                  <PenSquare className="size-4 mr-1" />
                  Edit Review
                </Button>
              )}
              {milestone.status === "in_progress" && (
                <Button variant="outline" size="sm">
                  <Ticket className="size-4 mr-1" />
                  Raise Issue
                </Button>
              )}
              {isLocked && (
                <Button
                  size="sm"
                  className="bg-primary"
                  onClick={() => onSelectForPayment?.(milestone)}
                >
                  <CreditCard className="size-4 mr-1" />
                  Select to Pay
                </Button>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

// Write Review Modal
function WriteReviewModal({
  milestone,
  isOpen,
  onClose,
}: {
  milestone: Milestone | null
  isOpen: boolean
  onClose: () => void
}) {
  const [overallRating, setOverallRating] = React.useState(milestone?.review?.overallRating || 0)
  const [aspectRatings, setAspectRatings] = React.useState({
    workQuality: 0,
    timeliness: 0,
    cleanliness: 0,
    communication: 0,
    materialQuality: 0,
  })
  const [description, setDescription] = React.useState(milestone?.review?.description || "")
  const [confirmed, setConfirmed] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)

  React.useEffect(() => {
    if (milestone?.review) {
      setOverallRating(milestone.review.overallRating)
      if (milestone.review.aspectRatings) {
        setAspectRatings(milestone.review.aspectRatings)
      }
      setDescription(milestone.review.description)
    } else {
      setOverallRating(0)
      setAspectRatings({
        workQuality: 0,
        timeliness: 0,
        cleanliness: 0,
        communication: 0,
        materialQuality: 0,
      })
      setDescription("")
    }
    setConfirmed(false)
    setShowSuccess(false)
  }, [milestone])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  if (!milestone) return null

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="size-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl mb-2">Review Submitted!</DialogTitle>
            <p className="text-muted-foreground mb-4">
              Thank you for your feedback!
            </p>
            <div className="p-4 rounded-lg bg-gray-50 mb-4">
              <p className="font-medium">M{milestone.number}: {milestone.name}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span>Your Rating:</span>
                <StarRating rating={overallRating} readonly size="sm" />
                <span className="font-medium">{overallRating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your review helps us maintain quality standards and improve our services.
            </p>
            <div className="flex gap-2 justify-center mt-6">
              <Button variant="outline" onClick={onClose}>
                View All My Reviews
              </Button>
              <Button onClick={onClose}>
                Back to Milestones
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="size-5 text-yellow-500" />
            Review Milestone
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Milestone Info */}
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <span className="font-medium">
                M{milestone.number}: {milestone.name}
              </span>
              <Badge className="bg-green-100 text-green-700 ml-auto">Completed</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Amount: {formatCurrency(milestone.payment.amount)} | Completed: {milestone.actualEnd}
            </p>
          </div>

          {/* Overall Rating */}
          <div>
            <Label className="text-base font-medium">
              How would you rate this milestone work?
            </Label>
            <div className="flex items-center gap-4 mt-3">
              <StarRating rating={overallRating} onRatingChange={setOverallRating} size="lg" />
              {overallRating > 0 && (
                <span className="text-sm text-muted-foreground">
                  {["Poor", "Fair", "Good", "Very Good", "Excellent"][overallRating - 1]}
                </span>
              )}
            </div>
          </div>

          {/* Aspect Ratings */}
          <div>
            <Label className="text-base font-medium">Rate individual aspects (Optional)</Label>
            <div className="space-y-3 mt-3">
              {[
                { key: "workQuality", label: "Work Quality" },
                { key: "timeliness", label: "Timeliness" },
                { key: "cleanliness", label: "Cleanliness" },
                { key: "communication", label: "Communication" },
                { key: "materialQuality", label: "Material Quality" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{label}:</span>
                  <StarRating
                    rating={aspectRatings[key as keyof typeof aspectRatings]}
                    onRatingChange={(r) =>
                      setAspectRatings((prev) => ({ ...prev, [key]: r }))
                    }
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="review-description" className="text-base font-medium">
              Share your experience *
            </Label>
            <Textarea
              id="review-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write about your experience with this milestone..."
              className="mt-2 min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Min 20 characters | {description.length}/500
            </p>
          </div>

          {/* Photo Upload */}
          <div>
            <Label className="text-base font-medium">Add Photos (Optional)</Label>
            <div className="mt-2 p-4 border-2 border-dashed rounded-lg text-center">
              <Camera className="size-8 mx-auto text-muted-foreground mb-2" />
              <Button variant="outline" size="sm">
                Add Photos
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Share photos of the completed work
              </p>
            </div>
          </div>

          {/* Confirmation */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <Label htmlFor="confirm" className="text-sm">
              I confirm this review is based on my genuine experience
            </Label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={overallRating === 0 || description.length < 20 || !confirmed || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Payment Modal
function PaymentModal({
  selectedMilestones,
  isOpen,
  onClose,
  paymentType,
}: {
  selectedMilestones: Milestone[]
  isOpen: boolean
  onClose: () => void
  paymentType: "single" | "multiple" | "all"
}) {
  const [isProcessing, setIsProcessing] = React.useState(false)

  const subtotal = selectedMilestones.reduce((sum, m) => sum + m.payment.amount, 0)
  const gst = selectedMilestones.reduce((sum, m) => sum + m.payment.gst, 0)
  const total = subtotal + gst

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onClose()
  }

  const getTitle = () => {
    switch (paymentType) {
      case "single":
        return "Pay for Milestone"
      case "multiple":
        return "Pay Multiple Milestones"
      case "all":
        return "Pay All Remaining Milestones"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {paymentType === "all" && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="font-medium text-primary">
                Complete Payment - Unlock All {selectedMilestones.length} Remaining Milestones
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Pay once and enjoy uninterrupted construction progress!
              </p>
            </div>
          )}

          {/* Milestones List */}
          <div className="max-h-60 overflow-y-auto">
            {selectedMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <span className="text-sm">
                  M{milestone.number}: {milestone.name}
                </span>
                <span className="text-sm font-medium">
                  {formatCurrency(milestone.payment.amount)}
                </span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>GST (18%)</span>
              <span>{formatCurrency(gst)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {paymentType === "all" && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle2 className="size-4" />
              <span>Benefits: No interruptions | Priority scheduling | Faster completion</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="size-4 mr-2" />
                Pay {formatCurrency(total)}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Raise Ticket Modal
function RaiseTicketModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [ticketType, setTicketType] = React.useState<TicketType | "">("")
  const [priority, setPriority] = React.useState<TicketPriority>("medium")
  const [subject, setSubject] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [relatedMilestone, setRelatedMilestone] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="size-5" />
            Raise a Ticket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Ticket Type *</Label>
            <Select value={ticketType} onValueChange={(v) => setTicketType(v as TicketType)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quality_issue">Quality Issue</SelectItem>
                <SelectItem value="work_delay">Work Delay</SelectItem>
                <SelectItem value="payment_query">Payment Query</SelectItem>
                <SelectItem value="material_concern">Material Concern</SelectItem>
                <SelectItem value="safety_issue">Safety Issue</SelectItem>
                <SelectItem value="communication_problem">Communication Problem</SelectItem>
                <SelectItem value="general_question">General Question</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Related Milestone (Optional)</Label>
            <Select value={relatedMilestone} onValueChange={setRelatedMilestone}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select milestone" />
              </SelectTrigger>
              <SelectContent>
                {mockMilestones.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    M{m.number}: {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priority *</Label>
            <RadioGroup
              value={priority}
              onValueChange={(v) => setPriority(v as TicketPriority)}
              className="flex gap-4 mt-2"
            >
              {["low", "medium", "high", "urgent"].map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <RadioGroupItem value={p} id={`priority-${p}`} />
                  <Label htmlFor={`priority-${p}`} className="capitalize">
                    {p}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label>Subject *</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of the issue"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about your issue..."
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div>
            <Label>Attach Photos (Optional)</Label>
            <div className="mt-2 p-4 border-2 border-dashed rounded-lg text-center">
              <Camera className="size-8 mx-auto text-muted-foreground mb-2" />
              <Button variant="outline" size="sm">
                Add Photos
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Max 5 photos, 5MB each</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!ticketType || !subject || !description || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Ticket"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Change Request Modal
function ChangeRequestModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [changeType, setChangeType] = React.useState("")
  const [relatedMilestone, setRelatedMilestone] = React.useState("")
  const [requestedChange, setRequestedChange] = React.useState("")
  const [reason, setReason] = React.useState("")
  const [confirmed, setConfirmed] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenSquare className="size-5" />
            Request a Change
          </DialogTitle>
        </DialogHeader>

        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          Change requests may impact timeline and cost.
        </div>

        <div className="space-y-4">
          <div>
            <Label>Change Type *</Label>
            <Select value={changeType} onValueChange={setChangeType}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material_change">Material Change</SelectItem>
                <SelectItem value="design_change">Design Change</SelectItem>
                <SelectItem value="scope_addition">Scope Addition</SelectItem>
                <SelectItem value="scope_reduction">Scope Reduction</SelectItem>
                <SelectItem value="timeline_change">Timeline Change</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Related Milestone *</Label>
            <Select value={relatedMilestone} onValueChange={setRelatedMilestone}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select milestone" />
              </SelectTrigger>
              <SelectContent>
                {mockMilestones.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    M{m.number}: {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Requested Change *</Label>
            <Textarea
              value={requestedChange}
              onChange={(e) => setRequestedChange(e.target.value)}
              placeholder="Describe the change you want..."
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div>
            <Label>Reason</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why do you need this change?"
              className="mt-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="change-confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <Label htmlFor="change-confirm" className="text-sm">
              I understand this may result in additional costs and/or timeline changes
            </Label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!changeType || !relatedMilestone || !requestedChange || !confirmed || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function CustomerProjectPage() {
  const [activeTab, setActiveTab] = React.useState("milestones")
  const [reviewMilestone, setReviewMilestone] = React.useState<Milestone | null>(null)
  const [showReviewModal, setShowReviewModal] = React.useState(false)
  const [selectedForPayment, setSelectedForPayment] = React.useState<Set<string>>(new Set())
  const [showPaymentModal, setShowPaymentModal] = React.useState(false)
  const [paymentType, setPaymentType] = React.useState<"single" | "multiple" | "all">("single")
  const [showTicketModal, setShowTicketModal] = React.useState(false)
  const [showChangeRequestModal, setShowChangeRequestModal] = React.useState(false)

  // Calculate stats
  const completedMilestones = mockMilestones.filter(
    (m) => m.status === "completed" || m.status === "reviewed"
  )
  const inProgressMilestones = mockMilestones.filter((m) => m.status === "in_progress")
  const lockedMilestones = mockMilestones.filter((m) => m.status === "locked")
  const unlockedMilestones = mockMilestones.filter((m) => m.status === "unlocked")

  const paidAmount = mockMilestones
    .filter((m) => m.payment.status === "paid")
    .reduce((sum, m) => sum + m.payment.amount, 0)
  const pendingAmount = mockMilestones
    .filter((m) => m.payment.status === "pending")
    .reduce((sum, m) => sum + m.payment.amount, 0)

  const handleWriteReview = (milestone: Milestone) => {
    setReviewMilestone(milestone)
    setShowReviewModal(true)
  }

  const handleSelectForPayment = (milestone: Milestone) => {
    const newSelected = new Set(selectedForPayment)
    if (newSelected.has(milestone.id)) {
      newSelected.delete(milestone.id)
    } else {
      newSelected.add(milestone.id)
    }
    setSelectedForPayment(newSelected)
  }

  const handlePayNext = () => {
    const nextLocked = lockedMilestones[0]
    if (nextLocked) {
      setSelectedForPayment(new Set([nextLocked.id]))
      setPaymentType("single")
      setShowPaymentModal(true)
    }
  }

  const handlePaySelected = () => {
    if (selectedForPayment.size > 0) {
      setPaymentType("multiple")
      setShowPaymentModal(true)
    }
  }

  const handlePayAll = () => {
    setSelectedForPayment(new Set(lockedMilestones.map((m) => m.id)))
    setPaymentType("all")
    setShowPaymentModal(true)
  }

  const selectedMilestones = mockMilestones.filter((m) => selectedForPayment.has(m.id))

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Home className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Home Construction</h1>
              <p className="text-muted-foreground">
                {mockProject.projectType} | {mockProject.location} | {mockProject.id}
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
                    <span className="font-medium">{mockProject.progress}% Complete</span>
                  </div>
                  <Progress value={mockProject.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <p className="text-xs text-muted-foreground">Total Value</p>
                    <p className="text-lg font-bold">{formatCurrency(mockProject.totalValue)}</p>
                    <p className="text-xs text-muted-foreground">+ GST</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-50">
                    <p className="text-xs text-muted-foreground">Paid</p>
                    <p className="text-lg font-bold text-green-700">{formatCurrency(paidAmount)}</p>
                    <p className="text-xs text-green-600">{Math.round((paidAmount / mockProject.totalValue) * 100)}%</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-orange-50">
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-lg font-bold text-orange-700">{formatCurrency(pendingAmount)}</p>
                    <p className="text-xs text-orange-600">{Math.round((pendingAmount / mockProject.totalValue) * 100)}%</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50">
                    <p className="text-xs text-muted-foreground">Milestones</p>
                    <p className="text-lg font-bold text-blue-700">
                      {completedMilestones.length} of {mockMilestones.length}
                    </p>
                    <p className="text-xs text-blue-600">Paid</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="changes">Changes</TabsTrigger>
          </TabsList>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            {/* Completed Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  Completed Milestones ({completedMilestones.length})
                </h3>
              </div>
              <div className="space-y-3">
                {completedMilestones.map((milestone) => (
                  <CustomerMilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    onWriteReview={handleWriteReview}
                    onViewDetails={() => {}}
                  />
                ))}
              </div>
            </div>

            {/* In Progress Section */}
            {(inProgressMilestones.length > 0 || unlockedMilestones.length > 0) && (
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <Clock className="size-5 text-blue-600" />
                  In Progress ({inProgressMilestones.length + unlockedMilestones.length})
                </h3>
                <div className="space-y-3">
                  {inProgressMilestones.map((milestone) => (
                    <CustomerMilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onWriteReview={handleWriteReview}
                      onViewDetails={() => {}}
                    />
                  ))}
                  {unlockedMilestones.map((milestone) => (
                    <CustomerMilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onWriteReview={handleWriteReview}
                      onViewDetails={() => {}}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pending Payment Section */}
            {lockedMilestones.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Lock className="size-5 text-gray-500" />
                    Pending Payment ({lockedMilestones.length})
                  </h3>
                  <span className="text-sm font-medium text-orange-600">
                    {formatCurrency(pendingAmount)}
                  </span>
                </div>

                {/* Payment Options */}
                <Card className="mb-4">
                  <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground mb-3">Payment Options:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="flex flex-col h-auto py-3 bg-transparent"
                        onClick={handlePayNext}
                      >
                        <span className="font-medium">Pay Next Milestone</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(lockedMilestones[0]?.payment.amount || 0)}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col h-auto py-3 bg-transparent"
                        onClick={handlePaySelected}
                        disabled={selectedForPayment.size === 0}
                      >
                        <span className="font-medium">Pay Selected</span>
                        <span className="text-sm text-muted-foreground">
                          {selectedForPayment.size > 0
                            ? `${selectedForPayment.size} milestone${selectedForPayment.size > 1 ? "s" : ""}`
                            : "Select milestones"}
                        </span>
                      </Button>
                      <Button className="flex flex-col h-auto py-3 bg-primary" onClick={handlePayAll}>
                        <span className="font-medium">Pay All Remaining</span>
                        <span className="text-sm opacity-90">{formatCurrency(pendingAmount)}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  {lockedMilestones.map((milestone) => (
                    <CustomerMilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onWriteReview={handleWriteReview}
                      onViewDetails={() => {}}
                      onSelectForPayment={handleSelectForPayment}
                      isSelected={selectedForPayment.has(milestone.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardContent className="py-4">
                <h3 className="font-semibold mb-4">Payment Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 font-medium">#</th>
                        <th className="text-left p-3 font-medium">Milestone</th>
                        <th className="text-right p-3 font-medium">Amount</th>
                        <th className="text-right p-3 font-medium">GST</th>
                        <th className="text-right p-3 font-medium">Total</th>
                        <th className="text-center p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {mockMilestones.map((m) => (
                        <tr key={m.id} className={m.payment.status === "pending" ? "bg-gray-50/50" : ""}>
                          <td className="p-3">M{m.number}</td>
                          <td className="p-3">{m.name}</td>
                          <td className="p-3 text-right">{formatCurrency(m.payment.amount)}</td>
                          <td className="p-3 text-right">{formatCurrency(m.payment.gst)}</td>
                          <td className="p-3 text-right font-medium">{formatCurrency(m.payment.total)}</td>
                          <td className="p-3 text-center">
                            {m.payment.status === "paid" ? (
                              <Badge className="bg-green-100 text-green-700">Paid</Badge>
                            ) : (
                              <Badge variant="outline" className="text-orange-600 border-orange-300">
                                Pending
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t-2">
                      <tr className="bg-green-50">
                        <td colSpan={4} className="p-3 font-medium">Paid Total</td>
                        <td className="p-3 text-right font-bold text-green-700">
                          {formatCurrency(paidAmount + paidAmount * 0.18)}
                        </td>
                        <td></td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td colSpan={4} className="p-3 font-medium">Pending Total</td>
                        <td className="p-3 text-right font-bold text-orange-700">
                          {formatCurrency(pendingAmount + pendingAmount * 0.18)}
                        </td>
                        <td></td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td colSpan={4} className="p-3 font-semibold">Project Total</td>
                        <td className="p-3 text-right font-bold">
                          {formatCurrency(mockProject.totalValue + mockProject.totalValue * 0.18)}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            {/* Overall Rating Summary */}
            <Card>
              <CardContent className="py-6">
                <h3 className="font-semibold mb-4">Overall Project Rating</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <StarRating
                      rating={
                        completedMilestones.filter((m) => m.review).length > 0
                          ? completedMilestones
                              .filter((m) => m.review)
                              .reduce((sum, m) => sum + (m.review?.overallRating || 0), 0) /
                            completedMilestones.filter((m) => m.review).length
                          : 0
                      }
                      readonly
                      size="lg"
                    />
                    <span className="text-2xl font-bold">
                      {completedMilestones.filter((m) => m.review).length > 0
                        ? (
                            completedMilestones
                              .filter((m) => m.review)
                              .reduce((sum, m) => sum + (m.review?.overallRating || 0), 0) /
                            completedMilestones.filter((m) => m.review).length
                          ).toFixed(1)
                        : "0.0"}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Based on {completedMilestones.filter((m) => m.review).length} milestone reviews
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Review History */}
            <div className="space-y-3">
              <h3 className="font-semibold">Review History</h3>
              {completedMilestones
                .filter((m) => m.review)
                .map((milestone) => (
                  <Card key={milestone.id}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">
                            M{milestone.number}: {milestone.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRating
                              rating={milestone.review!.overallRating}
                              readonly
                              size="sm"
                            />
                            <span className="font-medium">
                              {milestone.review!.overallRating.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            &quot;{milestone.review!.description}&quot;
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit Review
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {milestone.review!.reviewDate}
                      </p>
                    </CardContent>
                  </Card>
                ))}

              {/* Pending Reviews */}
              {completedMilestones.filter((m) => !m.review).length > 0 && (
                <>
                  <h3 className="font-semibold mt-6">Pending Reviews</h3>
                  {completedMilestones
                    .filter((m) => !m.review)
                    .map((milestone) => (
                      <Card key={milestone.id}>
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                M{milestone.number}: {milestone.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Completed {milestone.actualEnd}
                              </p>
                            </div>
                            <Button size="sm" onClick={() => handleWriteReview(milestone)}>
                              <Star className="size-4 mr-1" />
                              Write Review
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </>
              )}
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">My Tickets</h3>
              <Button onClick={() => setShowTicketModal(true)}>
                <Ticket className="size-4 mr-2" />
                Raise Ticket
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">All: {mockTickets.length}</Badge>
              <Badge variant="outline" className="bg-yellow-50">
                Open: {mockTickets.filter((t) => t.status === "open").length}
              </Badge>
              <Badge variant="outline" className="bg-orange-50">
                In Progress: {mockTickets.filter((t) => t.status === "in_progress").length}
              </Badge>
              <Badge variant="outline" className="bg-green-50">
                Resolved: {mockTickets.filter((t) => t.status === "resolved").length}
              </Badge>
            </div>

            <div className="space-y-3">
              {mockTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{ticket.id}</span>
                          <Badge className={getTicketStatusColor(ticket.status)}>
                            {ticket.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground flex-wrap">
                          <span>{getTicketTypeLabel(ticket.type)}</span>
                          {ticket.relatedMilestone && (
                            <>
                              <span>|</span>
                              <span>{ticket.relatedMilestone}</span>
                            </>
                          )}
                          <span>|</span>
                          <span className="capitalize">{ticket.priority}</span>
                        </div>
                        <p className="font-medium mt-2">{ticket.subject}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Raised: {ticket.createdAt}
                          {ticket.resolution && ` | ${ticket.resolution}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {ticket.status !== "resolved" && ticket.status !== "closed" && (
                          <Button variant="outline" size="sm">
                            Add Comment
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Change Requests Tab */}
          <TabsContent value="changes" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Change Requests</h3>
              <Button onClick={() => setShowChangeRequestModal(true)}>
                <PenSquare className="size-4 mr-2" />
                Request Change
              </Button>
            </div>

            <div className="space-y-3">
              {mockChangeRequests.map((cr) => (
                <Card key={cr.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{cr.id}</span>
                          <Badge className="bg-orange-100 text-orange-700">CHANGE REQUEST</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span className="capitalize">{cr.type.replace("_", " ")}</span>
                          <span>|</span>
                          <span>{cr.relatedMilestone}</span>
                        </div>
                        <p className="font-medium mt-2">{cr.requestedChange}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Raised: {cr.createdAt} | Status: {cr.status.replace("_", " ")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {cr.status === "submitted" && (
                          <Button variant="outline" size="sm">
                            Cancel Request
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <WriteReviewModal
          milestone={reviewMilestone}
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
        />

        <PaymentModal
          selectedMilestones={selectedMilestones}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          paymentType={paymentType}
        />

        <RaiseTicketModal
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
        />

        <ChangeRequestModal
          isOpen={showChangeRequestModal}
          onClose={() => setShowChangeRequestModal(false)}
        />
      </div>
    </DashboardLayout>
  )
}
