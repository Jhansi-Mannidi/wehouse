"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle2,
  User,
  Calendar,
  ImageIcon,
  Send,
  Paperclip,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// Mock tickets data
const ticketsData = [
  {
    id: "TKT-00045",
    projectId: "WH-HYD-2024-001",
    customer: "Rajesh Kumar",
    type: "quality_issue",
    typeLabel: "Quality Issue",
    milestone: "M11 - Internal Plastering",
    subject: "Uneven plastering in bedroom wall",
    description: "The plastering on the east wall of the master bedroom seems uneven. There are visible bumps and the surface is not smooth enough for painting.",
    priority: "high",
    status: "open",
    raisedDate: "2024-01-28",
    daysOpen: 2,
    attachments: ["IMG_001.jpg", "IMG_002.jpg"],
    conversation: [
      {
        id: 1,
        sender: "customer",
        name: "Rajesh Kumar",
        message: "The plastering on the east wall of the master bedroom seems uneven. There are visible bumps and the surface is not smooth enough for painting.",
        timestamp: "2024-01-28 10:30 AM",
        attachments: ["IMG_001.jpg", "IMG_002.jpg"],
      },
    ],
  },
  {
    id: "TKT-00044",
    projectId: "WH-HYD-2024-002",
    customer: "Priya Sharma",
    type: "work_delay",
    typeLabel: "Work Delay",
    milestone: "M15 - Flooring",
    subject: "Flooring work not started as promised",
    description: "The flooring work was supposed to start 3 days ago but hasn't begun yet. Need an update on when it will start.",
    priority: "medium",
    status: "in_progress",
    raisedDate: "2024-01-25",
    daysOpen: 5,
    attachments: [],
    conversation: [
      {
        id: 1,
        sender: "customer",
        name: "Priya Sharma",
        message: "The flooring work was supposed to start 3 days ago but hasn't begun yet. Need an update on when it will start.",
        timestamp: "2024-01-25 02:15 PM",
        attachments: [],
      },
      {
        id: 2,
        sender: "engineer",
        name: "Ravi Kumar",
        message: "Apologies for the delay. The tiles were delayed in transit. They have arrived now and work will begin tomorrow morning.",
        timestamp: "2024-01-26 09:45 AM",
        attachments: [],
      },
      {
        id: 3,
        sender: "customer",
        name: "Priya Sharma",
        message: "Okay, please keep me updated on the progress.",
        timestamp: "2024-01-26 10:30 AM",
        attachments: [],
      },
    ],
  },
  {
    id: "TKT-00043",
    projectId: "WH-HYD-2024-002",
    customer: "Priya Sharma",
    type: "material_concern",
    typeLabel: "Material Concern",
    milestone: "M14 - Electrical",
    subject: "Different wire brand used than discussed",
    description: "I noticed the wiring brand used is different from what was discussed. Can you confirm if this is the same quality?",
    priority: "medium",
    status: "resolved",
    raisedDate: "2024-01-20",
    resolvedDate: "2024-01-22",
    daysOpen: 0,
    attachments: ["wire_photo.jpg"],
    resolution: "Clarified that the brand used is equivalent in quality and meets ISI standards. Customer satisfied with explanation.",
    conversation: [
      {
        id: 1,
        sender: "customer",
        name: "Priya Sharma",
        message: "I noticed the wiring brand used is different from what was discussed. Can you confirm if this is the same quality?",
        timestamp: "2024-01-20 11:00 AM",
        attachments: ["wire_photo.jpg"],
      },
      {
        id: 2,
        sender: "engineer",
        name: "Ravi Kumar",
        message: "Good observation! The brand Finolex was out of stock, so we used Havells which is actually a premium brand with the same ISI certification. Both are FR (Fire Retardant) rated. I can share the specification sheet if you'd like.",
        timestamp: "2024-01-21 10:15 AM",
        attachments: [],
      },
      {
        id: 3,
        sender: "customer",
        name: "Priya Sharma",
        message: "Thank you for the clarification. Havells is indeed a good brand. I'm satisfied.",
        timestamp: "2024-01-22 09:00 AM",
        attachments: [],
      },
    ],
  },
]

const typeFilters = [
  { label: "All Types", value: "all" },
  { label: "Quality Issue", value: "quality_issue" },
  { label: "Work Delay", value: "work_delay" },
  { label: "Material Concern", value: "material_concern" },
  { label: "Safety Issue", value: "safety_issue" },
  { label: "Other", value: "other" },
]

const statusFilters = [
  { label: "All Status", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Resolved", value: "resolved" },
]

// Ticket Card Component
function TicketCard({
  ticket,
  onViewDetails,
  onRespond,
}: {
  ticket: (typeof ticketsData)[0]
  onViewDetails: (ticket: (typeof ticketsData)[0]) => void
  onRespond: (ticket: (typeof ticketsData)[0]) => void
}) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return { color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" }
      case "medium":
        return { color: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" }
      case "low":
        return { color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" }
      default:
        return { color: "bg-gray-100 text-gray-700", dot: "bg-gray-500" }
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "open":
        return { label: "OPEN", color: "bg-red-100 text-red-700 border-red-200" }
      case "in_progress":
        return { label: "IN PROGRESS", color: "bg-yellow-100 text-yellow-700 border-yellow-200" }
      case "resolved":
        return { label: "RESOLVED", color: "bg-green-100 text-green-700 border-green-200" }
      default:
        return { label: status.toUpperCase(), color: "bg-gray-100 text-gray-700" }
    }
  }

  const priorityConfig = getPriorityConfig(ticket.priority)
  const statusConfig = getStatusConfig(ticket.status)

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow border-l-4",
      ticket.priority === "high" && "border-l-red-500",
      ticket.priority === "medium" && "border-l-yellow-500",
      ticket.priority === "low" && "border-l-green-500"
    )}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-xs font-semibold", statusConfig.color)}>
              {statusConfig.label}
            </Badge>
            <Badge variant="outline" className={cn("text-xs", priorityConfig.color)}>
              {ticket.priority.toUpperCase()}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">{ticket.id}</span>
        </div>

        {/* Project & Customer Info */}
        <div className="text-xs text-muted-foreground mb-2">
          <span>Project: {ticket.projectId}</span>
          <span className="mx-2">|</span>
          <span className="flex-inline items-center gap-1">
            <User className="inline size-3" /> {ticket.customer}
          </span>
        </div>
        <div className="text-xs text-muted-foreground mb-3">
          <span>Type: {ticket.typeLabel}</span>
          <span className="mx-2">|</span>
          <span>Milestone: {ticket.milestone}</span>
        </div>

        {/* Subject */}
        <p className="font-medium text-sm mb-2">{ticket.subject}</p>

        {/* Status Info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Calendar className="size-3" />
          <span>Raised: {new Date(ticket.raisedDate).toLocaleDateString()}</span>
          {ticket.status !== "resolved" && (
            <>
              <span className="mx-1">|</span>
              <span className={cn(ticket.daysOpen > 2 && "text-red-600 font-medium")}>
                {ticket.daysOpen} days ago
              </span>
              {ticket.status === "open" && (
                <>
                  <span className="mx-1">|</span>
                  <span className="text-orange-600">Awaiting your response</span>
                </>
              )}
            </>
          )}
          {ticket.status === "in_progress" && ticket.conversation.length > 1 && (
            <>
              <span className="mx-1">|</span>
              <span className="text-green-600">Last response: You</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent" onClick={() => onViewDetails(ticket)}>
            View Details
          </Button>
          {ticket.status === "open" && (
            <Button variant="default" size="sm" className="h-8 text-xs" onClick={() => onRespond(ticket)}>
              Respond
            </Button>
          )}
          {ticket.status === "in_progress" && (
            <Button variant="outline" size="sm" className="h-8 text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100" onClick={() => onRespond(ticket)}>
              Mark Resolved
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Ticket Detail Sheet
function TicketDetailSheet({
  ticket,
  open,
  onOpenChange,
}: {
  ticket: (typeof ticketsData)[0] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!ticket) return null

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "open":
        return { label: "OPEN", color: "bg-red-100 text-red-700" }
      case "in_progress":
        return { label: "IN PROGRESS", color: "bg-yellow-100 text-yellow-700" }
      case "resolved":
        return { label: "RESOLVED", color: "bg-green-100 text-green-700" }
      default:
        return { label: status.toUpperCase(), color: "bg-gray-100 text-gray-700" }
    }
  }

  const statusConfig = getStatusConfig(ticket.status)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span>{ticket.id}</span>
            <Badge className={cn("text-xs", statusConfig.color)}>{statusConfig.label}</Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Ticket Info */}
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Project:</span> {ticket.projectId}</p>
            <p><span className="text-muted-foreground">Customer:</span> {ticket.customer}</p>
            <p><span className="text-muted-foreground">Type:</span> {ticket.typeLabel}</p>
            <p><span className="text-muted-foreground">Milestone:</span> {ticket.milestone}</p>
            <p><span className="text-muted-foreground">Priority:</span> <Badge variant="outline" className="text-xs ml-1">{ticket.priority.toUpperCase()}</Badge></p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Subject</h4>
            <p className="text-sm">{ticket.subject}</p>
          </div>

          {/* Conversation */}
          <div>
            <h4 className="font-semibold mb-3">Conversation</h4>
            <div className="space-y-4">
              {ticket.conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "p-3 rounded-lg",
                    msg.sender === "customer" ? "bg-muted/50" : "bg-primary/5 ml-4"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "size-6 rounded-full flex items-center justify-center text-xs font-semibold text-white",
                      msg.sender === "customer" ? "bg-blue-500" : "bg-green-500"
                    )}>
                      {msg.name.charAt(0)}
                    </div>
                    <span className="font-medium text-sm">{msg.name}</span>
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      {msg.attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                          <ImageIcon className="size-3" />
                          {att}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resolution */}
          {ticket.status === "resolved" && ticket.resolution && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                <CheckCircle2 className="size-4" />
                Resolution
              </h4>
              <p className="text-sm text-green-800">{ticket.resolution}</p>
              <p className="text-xs text-green-600 mt-2">Resolved on {ticket.resolvedDate}</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Respond Dialog
function RespondDialog({
  ticket,
  open,
  onOpenChange,
}: {
  ticket: (typeof ticketsData)[0] | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [response, setResponse] = React.useState("")
  const [action, setAction] = React.useState("in_progress")
  const [resolution, setResolution] = React.useState("")

  if (!ticket) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Respond to Ticket</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Ticket Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-1">
            <p className="font-semibold">{ticket.id}</p>
            <p className="text-sm text-muted-foreground">
              Project: {ticket.projectId} | Customer: {ticket.customer}
            </p>
            <p className="text-sm text-muted-foreground">
              Type: {ticket.typeLabel} | Milestone: {ticket.milestone}
            </p>
            <p className="text-sm font-medium mt-2">{ticket.subject}</p>
          </div>

          {/* Recent Message */}
          {ticket.conversation.length > 0 && (
            <div>
              <Label className="text-sm font-semibold">Latest Message</Label>
              <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  {ticket.conversation[ticket.conversation.length - 1].name} - {ticket.conversation[ticket.conversation.length - 1].timestamp}
                </p>
                <p className="text-sm">{ticket.conversation[ticket.conversation.length - 1].message}</p>
              </div>
            </div>
          )}

          {/* Response */}
          <div>
            <Label htmlFor="response" className="text-sm font-semibold">Your Response</Label>
            <Textarea
              id="response"
              placeholder="Type your response to the customer..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
          </div>

          {/* Attachments */}
          <div>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Paperclip className="size-4 mr-2" />
              Attach Photos/Documents
            </Button>
          </div>

          {/* Action */}
          <div>
            <Label className="text-sm font-semibold">Action After Response</Label>
            <RadioGroup value={action} onValueChange={setAction} className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="open" id="open" />
                <Label htmlFor="open" className="text-sm font-normal cursor-pointer">Keep Open (awaiting further info)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in_progress" id="in_progress" />
                <Label htmlFor="in_progress" className="text-sm font-normal cursor-pointer">Mark as In Progress (working on it)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="resolved" id="resolved" />
                <Label htmlFor="resolved" className="text-sm font-normal cursor-pointer">Mark as Resolved (issue fixed)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Resolution Notes */}
          {action === "resolved" && (
            <div>
              <Label htmlFor="resolution" className="text-sm font-semibold">Resolution Notes</Label>
              <Textarea
                id="resolution"
                placeholder="Describe how the issue was resolved..."
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" className="bg-transparent" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button disabled={!response.trim()}>
              <Send className="size-4 mr-2" />
              Send Response
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selectedTicket, setSelectedTicket] = React.useState<(typeof ticketsData)[0] | null>(null)
  const [detailSheetOpen, setDetailSheetOpen] = React.useState(false)
  const [respondDialogOpen, setRespondDialogOpen] = React.useState(false)

  // Filter tickets
  const filteredTickets = ticketsData.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || ticket.type === typeFilter
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Stats
  const stats = {
    all: ticketsData.length,
    open: ticketsData.filter((t) => t.status === "open").length,
    inProgress: ticketsData.filter((t) => t.status === "in_progress").length,
    resolved: ticketsData.filter((t) => t.status === "resolved").length,
  }

  const handleViewDetails = (ticket: (typeof ticketsData)[0]) => {
    setSelectedTicket(ticket)
    setDetailSheetOpen(true)
  }

  const handleRespond = (ticket: (typeof ticketsData)[0]) => {
    setSelectedTicket(ticket)
    setRespondDialogOpen(true)
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
            <h1 className="text-2xl font-bold">Customer Tickets</h1>
            <p className="text-muted-foreground text-sm">Respond to and manage customer tickets</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                {typeFilters.find((f) => f.value === typeFilter)?.label}
                <ChevronDown className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {typeFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setTypeFilter(filter.value)}
                  className={cn(typeFilter === filter.value && "bg-accent")}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
            variant={statusFilter === "open" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("open")}
            className={cn(statusFilter !== "open" && "bg-transparent")}
          >
            Open: {stats.open}
          </Button>
          <Button
            variant={statusFilter === "in_progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("in_progress")}
            className={cn(statusFilter !== "in_progress" && "bg-transparent")}
          >
            In Progress: {stats.inProgress}
          </Button>
          <Button
            variant={statusFilter === "resolved" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("resolved")}
            className={cn(statusFilter !== "resolved" && "bg-transparent")}
          >
            Resolved: {stats.resolved}
          </Button>
        </div>

        {/* Tickets List */}
        {filteredTickets.length > 0 ? (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onViewDetails={handleViewDetails}
                onRespond={handleRespond}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="size-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No tickets found</p>
              <p className="text-sm text-muted-foreground/70">Try adjusting your filters</p>
            </CardContent>
          </Card>
        )}

        {/* Ticket Detail Sheet */}
        <TicketDetailSheet
          ticket={selectedTicket}
          open={detailSheetOpen}
          onOpenChange={setDetailSheetOpen}
        />

        {/* Respond Dialog */}
        <RespondDialog
          ticket={selectedTicket}
          open={respondDialogOpen}
          onOpenChange={setRespondDialogOpen}
        />
      </div>
    </DashboardLayout>
  )
}
