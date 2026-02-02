"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  ChevronDown,
  GitPullRequest,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  IndianRupee,
  Send,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

// Mock change requests data
const changeRequestsData = [
  {
    id: "CR-00012",
    projectId: "WH-HYD-2024-002",
    customer: "Priya Sharma",
    type: "material_change",
    typeLabel: "Material Change",
    milestone: "M15 - Flooring",
    subject: "Upgrade to Italian marble flooring",
    currentSpec: "Indian granite flooring (₹150/sq.ft)",
    requestedSpec: "Italian Carrara marble flooring (₹450/sq.ft)",
    reason: "Would like to upgrade to premium Italian marble for the living room area for better aesthetics and durability.",
    status: "pending_review",
    raisedDate: "2024-01-29",
    area: "Living Room",
    estimatedArea: "450 sq.ft",
  },
  {
    id: "CR-00011",
    projectId: "WH-HYD-2024-001",
    customer: "Rajesh Kumar",
    type: "design_change",
    typeLabel: "Design Change",
    milestone: "M18 - Electrical Fittings",
    subject: "Add extra power outlets in kitchen",
    currentSpec: "4 power outlets as per plan",
    requestedSpec: "8 power outlets with 2 dedicated 15A points",
    reason: "Planning to add more kitchen appliances, need additional power points near the counter area.",
    status: "estimate_provided",
    raisedDate: "2024-01-26",
    estimate: {
      feasible: "yes",
      costImpact: 8500,
      timelineImpact: 1,
      technicalNotes: "Additional wiring and outlets can be added. Will require minor adjustments to the existing electrical layout.",
      summary: "4 additional outlets and 2 dedicated 15A points can be installed. Requires 1 extra day of work.",
    },
  },
  {
    id: "CR-00010",
    projectId: "WH-HYD-2024-003",
    customer: "Venkat Menon",
    type: "scope_addition",
    typeLabel: "Scope Addition",
    milestone: "M7 - Roof Slab",
    subject: "Add provision for rooftop garden",
    currentSpec: "Standard waterproofing",
    requestedSpec: "Enhanced waterproofing with drainage system for rooftop garden",
    reason: "Would like to set up a small rooftop garden in the future, need proper waterproofing and drainage provisions now.",
    status: "approved",
    raisedDate: "2024-01-22",
    approvedDate: "2024-01-25",
    estimate: {
      feasible: "yes",
      costImpact: 35000,
      timelineImpact: 3,
      technicalNotes: "Can add multi-layer waterproofing with drainage provisions during the current phase.",
      summary: "Enhanced waterproofing and drainage can be added during roofing phase. Customer approved.",
    },
  },
  {
    id: "CR-00009",
    projectId: "WH-HYD-2024-001",
    customer: "Rajesh Kumar",
    type: "material_change",
    typeLabel: "Material Change",
    milestone: "M12 - Plumbing",
    subject: "Downgrade bathroom fixtures",
    currentSpec: "Kohler premium fixtures",
    requestedSpec: "Jaquar mid-range fixtures",
    reason: "Would like to reduce budget by using Jaquar fixtures instead of Kohler.",
    status: "rejected",
    raisedDate: "2024-01-18",
    rejectedDate: "2024-01-19",
    rejectionReason: "Plumbing rough-in has already been done for Kohler fixtures. Changing now would require re-work and delay. Not recommended.",
  },
]

const statusFilters = [
  { label: "All Status", value: "all" },
  { label: "Pending Review", value: "pending_review" },
  { label: "Estimate Provided", value: "estimate_provided" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
]

// Change Request Card Component
function ChangeRequestCard({
  cr,
  onViewDetails,
  onProvideEstimate,
}: {
  cr: (typeof changeRequestsData)[0]
  onViewDetails: (cr: (typeof changeRequestsData)[0]) => void
  onProvideEstimate: (cr: (typeof changeRequestsData)[0]) => void
}) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending_review":
        return { label: "PENDING REVIEW", color: "bg-orange-100 text-orange-700 border-orange-200", dot: "bg-orange-500" }
      case "estimate_provided":
        return { label: "ESTIMATE PROVIDED", color: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" }
      case "approved":
        return { label: "APPROVED", color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" }
      case "rejected":
        return { label: "REJECTED", color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" }
      default:
        return { label: status.toUpperCase(), color: "bg-gray-100 text-gray-700", dot: "bg-gray-500" }
    }
  }

  const statusConfig = getStatusConfig(cr.status)

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow border-l-4",
      cr.status === "pending_review" && "border-l-orange-500",
      cr.status === "estimate_provided" && "border-l-blue-500",
      cr.status === "approved" && "border-l-green-500",
      cr.status === "rejected" && "border-l-red-500"
    )}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-xs font-semibold", statusConfig.color)}>
              <span className={cn("size-1.5 rounded-full mr-1.5", statusConfig.dot)} />
              {statusConfig.label}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">{cr.id}</span>
        </div>

        {/* Project & Customer Info */}
        <div className="text-xs text-muted-foreground mb-2">
          <span>Project: {cr.projectId}</span>
          <span className="mx-2">|</span>
          <span className="flex-inline items-center gap-1">
            <User className="inline size-3" /> {cr.customer}
          </span>
        </div>
        <div className="text-xs text-muted-foreground mb-3">
          <span>Type: {cr.typeLabel}</span>
          <span className="mx-2">|</span>
          <span>Milestone: {cr.milestone}</span>
        </div>

        {/* Subject */}
        <p className="font-medium text-sm mb-3">{cr.subject}</p>

        {/* Change Details */}
        <div className="text-xs space-y-1 mb-3 p-2 bg-muted/50 rounded">
          <p><span className="text-muted-foreground">Current:</span> {cr.currentSpec}</p>
          <p><span className="text-muted-foreground">Requested:</span> {cr.requestedSpec}</p>
        </div>

        {/* Estimate Info (if provided) */}
        {cr.estimate && (
          <div className="text-xs space-y-1 mb-3 p-2 bg-blue-50 rounded border border-blue-200">
            <p className="font-medium text-blue-700">Estimate Provided:</p>
            <div className="flex items-center gap-3 text-blue-600">
              <span className="flex items-center gap-1">
                <IndianRupee className="size-3" />
                +Rs. {cr.estimate.costImpact.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                +{cr.estimate.timelineImpact} days
              </span>
            </div>
          </div>
        )}

        {/* Status Info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Calendar className="size-3" />
          <span>Raised: {new Date(cr.raisedDate).toLocaleDateString()}</span>
          {cr.status === "pending_review" && (
            <>
              <span className="mx-1">|</span>
              <span className="text-orange-600 font-medium">Awaiting your input</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent" onClick={() => onViewDetails(cr)}>
            View Full Request
          </Button>
          {cr.status === "pending_review" && (
            <>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent" onClick={() => onViewDetails(cr)}>
                Add Technical Input
              </Button>
              <Button variant="default" size="sm" className="h-8 text-xs" onClick={() => onProvideEstimate(cr)}>
                Provide Estimate
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Provide Estimate Dialog
function ProvideEstimateDialog({
  cr,
  open,
  onOpenChange,
}: {
  cr: (typeof changeRequestsData)[0] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [feasibility, setFeasibility] = React.useState("yes")
  const [technicalNotes, setTechnicalNotes] = React.useState("")
  const [costImpact, setCostImpact] = React.useState<"none" | "additional" | "reduction">("additional")
  const [costAmount, setCostAmount] = React.useState("")
  const [timelineImpact, setTimelineImpact] = React.useState<"none" | "additional" | "reduction">("none")
  const [timelineDays, setTimelineDays] = React.useState("")
  const [summary, setSummary] = React.useState("")

  if (!cr) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Provide Estimate for Change Request</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* CR Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="font-semibold">{cr.id}: {cr.subject}</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium">Current:</span> {cr.currentSpec}</p>
              <p><span className="font-medium">Requested:</span> {cr.requestedSpec}</p>
            </div>
          </div>

          {/* Feasibility */}
          <div>
            <Label className="text-sm font-semibold">Is this change feasible? *</Label>
            <RadioGroup value={feasibility} onValueChange={setFeasibility} className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="text-sm font-normal cursor-pointer">Yes, feasible</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes_modified" id="yes_modified" />
                <Label htmlFor="yes_modified" className="text-sm font-normal cursor-pointer">Yes, with modifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="text-sm font-normal cursor-pointer">No, not feasible (provide reason)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Technical Notes */}
          <div>
            <Label htmlFor="technicalNotes" className="text-sm font-semibold">Technical Notes</Label>
            <Textarea
              id="technicalNotes"
              placeholder="Your technical assessment and notes..."
              value={technicalNotes}
              onChange={(e) => setTechnicalNotes(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Cost Impact */}
          <div>
            <Label className="text-sm font-semibold">Cost Impact</Label>
            <RadioGroup value={costImpact} onValueChange={(v) => setCostImpact(v as typeof costImpact)} className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="cost_none" />
                <Label htmlFor="cost_none" className="text-sm font-normal cursor-pointer">No additional cost</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="additional" id="cost_additional" />
                <Label htmlFor="cost_additional" className="text-sm font-normal cursor-pointer">Additional cost</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reduction" id="cost_reduction" />
                <Label htmlFor="cost_reduction" className="text-sm font-normal cursor-pointer">Cost reduction</Label>
              </div>
            </RadioGroup>
            {costImpact !== "none" && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rs.</span>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={costAmount}
                  onChange={(e) => setCostAmount(e.target.value)}
                  className="w-40"
                />
              </div>
            )}
          </div>

          {/* Timeline Impact */}
          <div>
            <Label className="text-sm font-semibold">Timeline Impact</Label>
            <RadioGroup value={timelineImpact} onValueChange={(v) => setTimelineImpact(v as typeof timelineImpact)} className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="time_none" />
                <Label htmlFor="time_none" className="text-sm font-normal cursor-pointer">No timeline change</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="additional" id="time_additional" />
                <Label htmlFor="time_additional" className="text-sm font-normal cursor-pointer">Additional days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reduction" id="time_reduction" />
                <Label htmlFor="time_reduction" className="text-sm font-normal cursor-pointer">Timeline reduction</Label>
              </div>
            </RadioGroup>
            {timelineImpact !== "none" && (
              <div className="mt-3 flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Days"
                  value={timelineDays}
                  onChange={(e) => setTimelineDays(e.target.value)}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">days</span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <Label htmlFor="summary" className="text-sm font-semibold">Summary for Customer</Label>
            <Textarea
              id="summary"
              placeholder="Summary that will be shown to the customer..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" className="bg-transparent" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button>
              <Send className="size-4 mr-2" />
              Submit Estimate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Detail Sheet
function ChangeRequestDetailSheet({
  cr,
  open,
  onOpenChange,
}: {
  cr: (typeof changeRequestsData)[0] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!cr) return null

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending_review":
        return { label: "PENDING REVIEW", color: "bg-orange-100 text-orange-700" }
      case "estimate_provided":
        return { label: "ESTIMATE PROVIDED", color: "bg-blue-100 text-blue-700" }
      case "approved":
        return { label: "APPROVED", color: "bg-green-100 text-green-700" }
      case "rejected":
        return { label: "REJECTED", color: "bg-red-100 text-red-700" }
      default:
        return { label: status.toUpperCase(), color: "bg-gray-100 text-gray-700" }
    }
  }

  const statusConfig = getStatusConfig(cr.status)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span>{cr.id}</span>
            <Badge className={cn("text-xs", statusConfig.color)}>{statusConfig.label}</Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Request Info */}
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Project:</span> {cr.projectId}</p>
            <p><span className="text-muted-foreground">Customer:</span> {cr.customer}</p>
            <p><span className="text-muted-foreground">Type:</span> {cr.typeLabel}</p>
            <p><span className="text-muted-foreground">Milestone:</span> {cr.milestone}</p>
            <p><span className="text-muted-foreground">Raised:</span> {new Date(cr.raisedDate).toLocaleDateString()}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Subject</h4>
            <p className="text-sm">{cr.subject}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Change Details</h4>
            <div className="space-y-2 text-sm p-3 bg-muted/50 rounded-lg">
              <p><span className="text-muted-foreground">Current Specification:</span><br />{cr.currentSpec}</p>
              <p><span className="text-muted-foreground">Requested Change:</span><br />{cr.requestedSpec}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Customer's Reason</h4>
            <p className="text-sm">{cr.reason}</p>
          </div>

          {/* Estimate (if provided) */}
          {cr.estimate && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-700 mb-3">Your Estimate</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-blue-600">Feasibility:</span> {cr.estimate.feasible === "yes" ? "Yes, feasible" : "With modifications"}</p>
                <p><span className="text-blue-600">Cost Impact:</span> +Rs. {cr.estimate.costImpact.toLocaleString()}</p>
                <p><span className="text-blue-600">Timeline Impact:</span> +{cr.estimate.timelineImpact} days</p>
                <p><span className="text-blue-600">Technical Notes:</span><br />{cr.estimate.technicalNotes}</p>
                <p><span className="text-blue-600">Summary:</span><br />{cr.estimate.summary}</p>
              </div>
            </div>
          )}

          {/* Rejection (if rejected) */}
          {cr.status === "rejected" && cr.rejectionReason && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                <XCircle className="size-4" />
                Rejection Reason
              </h4>
              <p className="text-sm text-red-800">{cr.rejectionReason}</p>
            </div>
          )}

          {/* Approval (if approved) */}
          {cr.status === "approved" && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                <CheckCircle2 className="size-4" />
                Approved
              </h4>
              <p className="text-sm text-green-800">Customer approved the change on {cr.approvedDate}</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function ChangeRequestsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selectedCR, setSelectedCR] = React.useState<(typeof changeRequestsData)[0] | null>(null)
  const [detailSheetOpen, setDetailSheetOpen] = React.useState(false)
  const [estimateDialogOpen, setEstimateDialogOpen] = React.useState(false)

  // Filter change requests
  const filteredCRs = changeRequestsData.filter((cr) => {
    const matchesSearch =
      cr.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cr.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cr.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || cr.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Stats
  const stats = {
    all: changeRequestsData.length,
    pendingReview: changeRequestsData.filter((c) => c.status === "pending_review").length,
    estimateProvided: changeRequestsData.filter((c) => c.status === "estimate_provided").length,
    approved: changeRequestsData.filter((c) => c.status === "approved").length,
    rejected: changeRequestsData.filter((c) => c.status === "rejected").length,
  }

  const handleViewDetails = (cr: (typeof changeRequestsData)[0]) => {
    setSelectedCR(cr)
    setDetailSheetOpen(true)
  }

  const handleProvideEstimate = (cr: (typeof changeRequestsData)[0]) => {
    setSelectedCR(cr)
    setEstimateDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/site-engineer/dashboard">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Change Requests</h1>
            <p className="text-muted-foreground text-sm">Review and provide estimates for customer change requests</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search change requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                {statusFilters.find((f) => f.value === statusFilter)?.label}
                <ChevronDown className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={cn(statusFilter === filter.value && "bg-accent")}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className={cn(statusFilter !== "all" && "bg-transparent")}
          >
            All: {stats.all}
          </Button>
          <Button
            variant={statusFilter === "pending_review" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("pending_review")}
            className={cn(statusFilter !== "pending_review" && "bg-transparent")}
          >
            Pending: {stats.pendingReview}
          </Button>
          <Button
            variant={statusFilter === "estimate_provided" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("estimate_provided")}
            className={cn(statusFilter !== "estimate_provided" && "bg-transparent")}
          >
            Estimate Sent: {stats.estimateProvided}
          </Button>
          <Button
            variant={statusFilter === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("approved")}
            className={cn(statusFilter !== "approved" && "bg-transparent")}
          >
            Approved: {stats.approved}
          </Button>
        </div>

        {/* Change Requests List */}
        {filteredCRs.length > 0 ? (
          <div className="space-y-4">
            {filteredCRs.map((cr) => (
              <ChangeRequestCard
                key={cr.id}
                cr={cr}
                onViewDetails={handleViewDetails}
                onProvideEstimate={handleProvideEstimate}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <GitPullRequest className="size-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No change requests found</p>
              <p className="text-sm text-muted-foreground/70">Try adjusting your filters</p>
            </CardContent>
          </Card>
        )}

        {/* Detail Sheet */}
        <ChangeRequestDetailSheet
          cr={selectedCR}
          open={detailSheetOpen}
          onOpenChange={setDetailSheetOpen}
        />

        {/* Provide Estimate Dialog */}
        <ProvideEstimateDialog
          cr={selectedCR}
          open={estimateDialogOpen}
          onOpenChange={setEstimateDialogOpen}
        />
      </div>
    </DashboardLayout>
  )
}
