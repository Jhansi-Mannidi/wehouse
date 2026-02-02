"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  MessageCircle, 
  Mail, 
  FileText,
  Copy,
  Flame,
  Thermometer,
  Snowflake,
  Play,
  Check,
  CheckCheck,
  ChevronDown
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

// Mock lead data
const leadData = {
  id: "L001",
  name: "Rajesh Kumar",
  initials: "RK",
  score: 72,
  status: "contacted",
  phone: "9876543210",
  email: "rajesh@email.com",
  projectType: "G+2 Residential",
  area: "3200 sq ft",
  budgetMin: 8000000,
  budgetMax: 10000000,
  timeline: "1-3 months",
  location: "Kondapur, Hyderabad",
  source: "Facebook",
  assignedTo: "Rahul Kumar",
  createdAt: "2026-01-20",
  notes: "Interested in premium villa with modern amenities",
}

const activityTimeline = [
  {
    id: 1,
    type: "call",
    title: "Called - Discussed requirements",
    time: "Today, 2:30 PM",
    duration: "4:32",
    hasRecording: true,
  },
  {
    id: 2,
    type: "whatsapp",
    title: "WhatsApp - Following up",
    time: "Today, 11:00 AM",
    status: "read",
  },
  {
    id: 3,
    type: "call",
    title: "Called - No answer",
    time: "Yesterday, 4:00 PM",
    duration: "0:12",
    hasRecording: false,
  },
  {
    id: 4,
    type: "note",
    title: "Added note about budget preferences",
    time: "Jan 25, 2026",
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "bg-emerald-100 text-emerald-700" },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  qualified: { label: "Qualified", color: "bg-blue-100 text-blue-700" },
  site_visit: { label: "Site Visit", color: "bg-purple-100 text-purple-700" },
  negotiation: { label: "Negotiation", color: "bg-orange-100 text-orange-700" },
  won: { label: "Won", color: "bg-green-100 text-green-700" },
  lost: { label: "Lost", color: "bg-red-100 text-red-700" },
}

function formatCurrency(amount: number) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`
  return `₹${amount.toLocaleString('en-IN')}`
}

function getScoreIcon(score: number) {
  if (score >= 70) return <Flame className="size-5 text-orange-500" />
  if (score >= 40) return <Thermometer className="size-5 text-yellow-500" />
  return <Snowflake className="size-5 text-blue-500" />
}

export default function MobileLeadDetailPage() {
  const params = useParams()
  const [status, setStatus] = React.useState(leadData.status)
  const [showCallModal, setShowCallModal] = React.useState(false)
  const [callOutcome, setCallOutcome] = React.useState("connected")
  const [callNotes, setCallNotes] = React.useState("")
  const [nextAction, setNextAction] = React.useState("follow_up")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col min-h-screen pb-4">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/mobile/leads">
              <Button variant="ghost" size="icon" className="size-9">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <h1 className="font-semibold text-lg">Lead Detail</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9">
                <MoreVertical className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Lead</DropdownMenuItem>
              <DropdownMenuItem>Add Task</DropdownMenuItem>
              <DropdownMenuItem>Schedule Visit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete Lead</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Lead Header Card */}
      <div className="p-4 bg-muted/30 border-b">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">
              {leadData.initials}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">{leadData.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              {getScoreIcon(leadData.score)}
              <span className="font-semibold text-foreground">{leadData.score}</span>
            </div>
            <Badge 
              variant="secondary" 
              className={cn("mt-1.5", statusConfig[status].color)}
            >
              {statusConfig[status].label}
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-col h-auto py-3 bg-primary/5 border-primary/20"
            onClick={() => {
              window.open(`tel:+91${leadData.phone}`)
              // Show call outcome modal after a delay
              setTimeout(() => setShowCallModal(true), 1000)
            }}
          >
            <Phone className="size-5 text-primary mb-1" />
            <span className="text-xs">Call</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-auto py-3 bg-green-50 border-green-200"
            onClick={() => window.open(`https://wa.me/91${leadData.phone}`)}
          >
            <MessageCircle className="size-5 text-green-600 mb-1" />
            <span className="text-xs">WhatsApp</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-auto py-3 bg-transparent"
            onClick={() => window.open(`mailto:${leadData.email}`)}
          >
            <Mail className="size-5 text-muted-foreground mb-1" />
            <span className="text-xs">Email</span>
          </Button>
          <Button variant="outline" className="flex-col h-auto py-3 bg-transparent">
            <FileText className="size-5 text-muted-foreground mb-1" />
            <span className="text-xs">Note</span>
          </Button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Phone className="size-4 text-primary" />
          Contact
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">+91 {leadData.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8"
                onClick={() => copyToClipboard(leadData.phone)}
              >
                <Copy className="size-4 text-muted-foreground" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8"
                onClick={() => window.open(`tel:+91${leadData.phone}`)}
              >
                <Phone className="size-4 text-primary" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">{leadData.email}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-8"
              onClick={() => copyToClipboard(leadData.email)}
            >
              <Copy className="size-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <div className="size-4 rounded bg-green-500" />
          Requirements
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Type</p>
            <p className="font-medium">{leadData.projectType}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Area</p>
            <p className="font-medium">{leadData.area}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Budget</p>
            <p className="font-medium">{formatCurrency(leadData.budgetMin)} - {formatCurrency(leadData.budgetMax)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Timeline</p>
            <p className="font-medium">{leadData.timeline}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground text-xs">Location</p>
            <p className="font-medium">{leadData.location}</p>
          </div>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="flex-1 p-4">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline" className="space-y-3">
            {activityTimeline.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className={cn(
                  "size-8 rounded-full flex items-center justify-center flex-shrink-0",
                  activity.type === "call" ? "bg-primary/10" :
                  activity.type === "whatsapp" ? "bg-green-100" :
                  "bg-muted"
                )}>
                  {activity.type === "call" && <Phone className="size-4 text-primary" />}
                  {activity.type === "whatsapp" && <MessageCircle className="size-4 text-green-600" />}
                  {activity.type === "note" && <FileText className="size-4 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  {activity.type === "call" && activity.hasRecording && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs mt-1 text-primary">
                      <Play className="size-3 mr-1" />
                      Play Recording
                    </Button>
                  )}
                  {activity.type === "whatsapp" && activity.status === "read" && (
                    <div className="flex items-center gap-1 text-xs text-blue-500 mt-0.5">
                      <CheckCheck className="size-3" />
                      Read
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="tasks">
            <p className="text-sm text-muted-foreground text-center py-8">
              No pending tasks
            </p>
          </TabsContent>
          
          <TabsContent value="notes">
            <Card className="p-3">
              <p className="text-sm text-foreground">{leadData.notes}</p>
              <p className="text-xs text-muted-foreground mt-2">Added on Jan 20, 2026</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Status Change */}
      <div className="p-4 border-t bg-background sticky bottom-16">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full h-12">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Change Status:</span>
              <Badge variant="secondary" className={statusConfig[status].color}>
                {statusConfig[status].label}
              </Badge>
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(statusConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                <Badge variant="secondary" className={config.color}>
                  {config.label}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Call Outcome Modal */}
      <Dialog open={showCallModal} onOpenChange={setShowCallModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Completed</DialogTitle>
            <DialogDescription>
              {leadData.name} · Duration: 4:32
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Outcome</Label>
              <RadioGroup value={callOutcome} onValueChange={setCallOutcome}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="connected" id="connected" />
                  <Label htmlFor="connected" className="font-normal">Connected</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no_answer" id="no_answer" />
                  <Label htmlFor="no_answer" className="font-normal">No Answer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="busy" id="busy" />
                  <Label htmlFor="busy" className="font-normal">Busy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wrong_number" id="wrong_number" />
                  <Label htmlFor="wrong_number" className="font-normal">Wrong Number</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea 
                placeholder="Add notes about the call..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Next Action</Label>
              <RadioGroup value={nextAction} onValueChange={setNextAction}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="schedule_visit" id="schedule_visit" />
                  <Label htmlFor="schedule_visit" className="font-normal">Schedule Visit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="follow_up" id="follow_up" />
                  <Label htmlFor="follow_up" className="font-normal">Follow-up Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="send_quote" id="send_quote" />
                  <Label htmlFor="send_quote" className="font-normal">Send Quote</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>When</Label>
              <Select defaultValue="tomorrow_10am">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomorrow_10am">Tomorrow 10 AM</SelectItem>
                  <SelectItem value="tomorrow_2pm">Tomorrow 2 PM</SelectItem>
                  <SelectItem value="in_2_days">In 2 days</SelectItem>
                  <SelectItem value="next_week">Next Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowCallModal(false)} className="w-full">
              Save & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
