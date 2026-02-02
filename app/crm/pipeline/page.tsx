"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Phone,
  MessageCircle,
  Edit3,
  MoreHorizontal,
  Plus,
  Filter,
  List,
  Flame,
  Thermometer,
  Snowflake,
  Check,
  MapPin,
  Eye,
  EyeOff,
  GripVertical,
  X,
  Calendar,
  ArrowUpDown,
} from "lucide-react"

import { useAuth } from "@/lib/auth-context"
import { useFilters } from "@/lib/filter-context"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { projectCategories, locations } from "@/components/shell/header-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Types
interface Lead {
  id: string
  name: string
  phone: string
  email: string
  score: number
  budgetMin: number
  budgetMax: number
  projectType: string
  area: string
  city: string
  source: string
  status: string
  assignedTo: string
  createdAt: string
  lastActivity: string
  lastActivityType: string
  notes: string
  lostReason?: string
}

type PipelineStatus = "new" | "contacted" | "qualified" | "site_visit" | "negotiation" | "won" | "lost" | "junk"

// Status configuration with enhanced gradients
const statusConfig: Record<PipelineStatus, { label: string; color: string; bgColor: string; gradient: string }> = {
  new: { 
    label: "New", 
    color: "text-blue-700 dark:text-blue-300", 
    bgColor: "bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/50 dark:from-blue-950/30 dark:via-blue-900/20 dark:to-blue-950/40 border-blue-200/60 dark:border-blue-800/40",
    gradient: "from-blue-500 to-blue-600"
  },
  contacted: { 
    label: "Contacted", 
    color: "text-cyan-700 dark:text-cyan-300", 
    bgColor: "bg-gradient-to-br from-cyan-50 via-cyan-50/80 to-cyan-100/50 dark:from-cyan-950/30 dark:via-cyan-900/20 dark:to-cyan-950/40 border-cyan-200/60 dark:border-cyan-800/40",
    gradient: "from-cyan-500 to-cyan-600"
  },
  qualified: { 
    label: "Qualified", 
    color: "text-purple-700 dark:text-purple-300", 
    bgColor: "bg-gradient-to-br from-purple-50 via-purple-50/80 to-purple-100/50 dark:from-purple-950/30 dark:via-purple-900/20 dark:to-purple-950/40 border-purple-200/60 dark:border-purple-800/40",
    gradient: "from-purple-500 to-purple-600"
  },
  site_visit: { 
    label: "Site Visit", 
    color: "text-amber-700 dark:text-amber-300", 
    bgColor: "bg-gradient-to-br from-amber-50 via-amber-50/80 to-amber-100/50 dark:from-amber-950/30 dark:via-amber-900/20 dark:to-amber-950/40 border-amber-200/60 dark:border-amber-800/40",
    gradient: "from-amber-500 to-amber-600"
  },
  negotiation: { 
    label: "Negotiation", 
    color: "text-orange-700 dark:text-orange-300", 
    bgColor: "bg-gradient-to-br from-orange-50 via-orange-50/80 to-orange-100/50 dark:from-orange-950/30 dark:via-orange-900/20 dark:to-orange-950/40 border-orange-200/60 dark:border-orange-800/40",
    gradient: "from-orange-500 to-orange-600"
  },
  won: { 
    label: "Won", 
    color: "text-green-700 dark:text-green-300", 
    bgColor: "bg-gradient-to-br from-green-50 via-green-50/80 to-green-100/50 dark:from-green-950/30 dark:via-green-900/20 dark:to-green-950/40 border-green-200/60 dark:border-green-800/40",
    gradient: "from-green-500 to-green-600"
  },
  lost: { 
    label: "Lost", 
    color: "text-red-700 dark:text-red-300", 
    bgColor: "bg-gradient-to-br from-red-50 via-red-50/80 to-red-100/50 dark:from-red-950/30 dark:via-red-900/20 dark:to-red-950/40 border-red-200/60 dark:border-red-800/40",
    gradient: "from-red-500 to-red-600"
  },
  junk: { 
    label: "Junk", 
    color: "text-gray-700 dark:text-gray-300", 
    bgColor: "bg-gradient-to-br from-gray-50 via-gray-50/80 to-gray-100/50 dark:from-gray-950/30 dark:via-gray-900/20 dark:to-gray-950/40 border-gray-200/60 dark:border-gray-800/40",
    gradient: "from-gray-500 to-gray-600"
  },
}

// Sample leads data
const sampleLeads: Lead[] = [
  {
    id: "L001",
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh@email.com",
    score: 72,
    budgetMin: 8000000,
    budgetMax: 10000000,
    projectType: "G+2",
    area: "Kondapur",
    city: "Hyderabad",
    source: "Facebook",
    status: "new",
    assignedTo: "Rahul",
    createdAt: "2026-01-27",
    lastActivity: "2026-01-29 14:30",
    lastActivityType: "Called",
    notes: "Interested in premium villa",
  },
  {
    id: "L002",
    name: "Meena Sharma",
    phone: "9876543211",
    email: "meena@email.com",
    score: 45,
    budgetMin: 5000000,
    budgetMax: 7000000,
    projectType: "G+1",
    area: "Gachibowli",
    city: "Hyderabad",
    source: "Google Ads",
    status: "new",
    assignedTo: "Priya",
    createdAt: "2026-01-26",
    lastActivity: "2026-01-28 10:00",
    lastActivityType: "WhatsApp",
    notes: "Budget conscious",
  },
  {
    id: "L003",
    name: "Sunitha Reddy",
    phone: "9876543212",
    email: "sunitha@email.com",
    score: 58,
    budgetMin: 4500000,
    budgetMax: 5500000,
    projectType: "Apartment",
    area: "Madhapur",
    city: "Hyderabad",
    source: "Website",
    status: "contacted",
    assignedTo: "Rahul",
    createdAt: "2026-01-24",
    lastActivity: "2026-01-29 11:00",
    lastActivityType: "Called",
    notes: "Wants east facing",
  },
  {
    id: "L004",
    name: "Ravi Teja",
    phone: "9876543213",
    email: "ravi@email.com",
    score: 32,
    budgetMin: 3000000,
    budgetMax: 4000000,
    projectType: "G+1",
    area: "Kukatpally",
    city: "Hyderabad",
    source: "Walk-in",
    status: "contacted",
    assignedTo: "Priya",
    createdAt: "2026-01-20",
    lastActivity: "2026-01-27 16:00",
    lastActivityType: "Site Visit",
    notes: "Looking for ready plots",
  },
  {
    id: "L005",
    name: "Venkat Rao",
    phone: "9876543214",
    email: "venkat@email.com",
    score: 81,
    budgetMin: 12000000,
    budgetMax: 15000000,
    projectType: "Villa",
    area: "Jubilee Hills",
    city: "Hyderabad",
    source: "Referral",
    status: "qualified",
    assignedTo: "Rahul",
    createdAt: "2026-01-22",
    lastActivity: "2026-01-29 09:00",
    lastActivityType: "Meeting",
    notes: "High budget, premium location",
  },
  {
    id: "L006",
    name: "Anil Kumar",
    phone: "9876543215",
    email: "anil@email.com",
    score: 75,
    budgetMin: 6500000,
    budgetMax: 8000000,
    projectType: "G+2",
    area: "Banjara Hills",
    city: "Hyderabad",
    source: "Facebook",
    status: "site_visit",
    assignedTo: "Priya",
    createdAt: "2026-01-18",
    lastActivity: "2026-01-28 15:00",
    lastActivityType: "Site Visit",
    notes: "Loved the model house",
  },
  {
    id: "L007",
    name: "Priya Menon",
    phone: "9876543216",
    email: "priyam@email.com",
    score: 88,
    budgetMin: 9000000,
    budgetMax: 11000000,
    projectType: "Villa",
    area: "Hitech City",
    city: "Hyderabad",
    source: "Google Ads",
    status: "negotiation",
    assignedTo: "Rahul",
    createdAt: "2026-01-10",
    lastActivity: "2026-01-29 12:00",
    lastActivityType: "Negotiation",
    notes: "Asking for discount",
  },
  {
    id: "L008",
    name: "Kumar Swamy",
    phone: "9876543217",
    email: "kumar@email.com",
    score: 95,
    budgetMin: 8500000,
    budgetMax: 9500000,
    projectType: "G+2",
    area: "Gachibowli",
    city: "Hyderabad",
    source: "Referral",
    status: "won",
    assignedTo: "Priya",
    createdAt: "2026-01-05",
    lastActivity: "2026-01-20 10:00",
    lastActivityType: "Contract Signed",
    notes: "Deal closed!",
  },
  {
    id: "L009",
    name: "Sridevi Nair",
    phone: "9876543218",
    email: "sridevi@email.com",
    score: 65,
    budgetMin: 5000000,
    budgetMax: 6000000,
    projectType: "Apartment",
    area: "Whitefield",
    city: "Bangalore",
    source: "Website",
    status: "qualified",
    assignedTo: "Rahul",
    createdAt: "2026-01-23",
    lastActivity: "2026-01-28 14:00",
    lastActivityType: "Called",
    notes: "Comparing with competitors",
  },
  {
    id: "L010",
    name: "Ramesh Babu",
    phone: "9876543219",
    email: "ramesh@email.com",
    score: 20,
    budgetMin: 2000000,
    budgetMax: 3000000,
    projectType: "Plot",
    area: "Electronic City",
    city: "Bangalore",
    source: "Facebook",
    status: "lost",
    assignedTo: "Priya",
    createdAt: "2026-01-15",
    lastActivity: "2026-01-25 11:00",
    lastActivityType: "Lost",
    notes: "Chose competitor",
    lostReason: "Competitor pricing",
  },
  {
    id: "L011",
    name: "Invalid Lead",
    phone: "0000000000",
    email: "invalid@email.com",
    score: 0,
    budgetMin: 0,
    budgetMax: 0,
    projectType: "Unknown",
    area: "Unknown",
    city: "Hyderabad",
    source: "Website",
    status: "junk",
    assignedTo: "System",
    createdAt: "2026-01-28",
    lastActivity: "2026-01-28 09:00",
    lastActivityType: "Marked Junk",
    notes: "Invalid phone number",
    lostReason: "Invalid contact",
  },
  {
    id: "L012",
    name: "Lakshmi Devi",
    phone: "9876543220",
    email: "lakshmi@email.com",
    score: 68,
    budgetMin: 7000000,
    budgetMax: 9000000,
    projectType: "G+2",
    area: "Miyapur",
    city: "Hyderabad",
    source: "Referral",
    status: "new",
    assignedTo: "Rahul",
    createdAt: "2026-01-29",
    lastActivity: "2026-01-29 10:00",
    lastActivityType: "New Lead",
    notes: "Referred by Kumar Swamy",
  },
  {
    id: "L013",
    name: "Suresh Goud",
    phone: "9876543221",
    email: "suresh@email.com",
    score: 55,
    budgetMin: 4000000,
    budgetMax: 5000000,
    projectType: "G+1",
    area: "Manikonda",
    city: "Hyderabad",
    source: "Google Ads",
    status: "contacted",
    assignedTo: "Priya",
    createdAt: "2026-01-25",
    lastActivity: "2026-01-29 08:00",
    lastActivityType: "WhatsApp",
    notes: "Requested brochure",
  },
  {
    id: "L014",
    name: "Padma Rani",
    phone: "9876543222",
    email: "padma@email.com",
    score: 78,
    budgetMin: 10000000,
    budgetMax: 12000000,
    projectType: "Villa",
    area: "Film Nagar",
    city: "Hyderabad",
    source: "Walk-in",
    status: "site_visit",
    assignedTo: "Rahul",
    createdAt: "2026-01-19",
    lastActivity: "2026-01-29 11:30",
    lastActivityType: "Site Visit Scheduled",
    notes: "VIP client, handle carefully",
  },
  {
    id: "L015",
    name: "Mohan Das",
    phone: "9876543223",
    email: "mohan@email.com",
    score: 82,
    budgetMin: 6000000,
    budgetMax: 7500000,
    projectType: "G+2",
    area: "Nallagandla",
    city: "Hyderabad",
    source: "Website",
    status: "negotiation",
    assignedTo: "Priya",
    createdAt: "2026-01-12",
    lastActivity: "2026-01-29 13:00",
    lastActivityType: "Quote Sent",
    notes: "Finalizing payment terms",
  },
]

// Helper functions
const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(0)}L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

const getScoreIcon = (score: number) => {
  if (score >= 70) return <Flame className="size-3.5 text-red-500" />
  if (score >= 40) return <Thermometer className="size-3.5 text-amber-500" />
  return <Snowflake className="size-3.5 text-blue-400" />
}

const getScoreColor = (score: number) => {
  if (score >= 70) return "text-red-600 bg-red-50"
  if (score >= 40) return "text-amber-600 bg-amber-50"
  return "text-blue-600 bg-blue-50"
}

const getSourceBadge = (source: string) => {
  const colors: Record<string, string> = {
    Facebook: "bg-blue-100 text-blue-700",
    "Google Ads": "bg-green-100 text-green-700",
    Website: "bg-purple-100 text-purple-700",
    "Walk-in": "bg-amber-100 text-amber-700",
    Referral: "bg-pink-100 text-pink-700",
  }
  return colors[source] || "bg-gray-100 text-gray-700"
}

const getDaysAgo = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "1d"
  return `${diffDays}d`
}

// Lead Card Component
function LeadCard({ 
  lead, 
  onDragStart,
  onClick,
  isLostOrJunk = false,
}: { 
  lead: Lead
  onDragStart: (e: React.DragEvent, lead: Lead) => void
  onClick: () => void
  isLostOrJunk?: boolean
}) {
  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(`tel:+91${lead.phone}`)
  }

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(`https://wa.me/91${lead.phone}`)
  }

  return (
    <Card
      draggable={!isLostOrJunk}
      onDragStart={(e) => onDragStart(e, lead)}
      onClick={onClick}
      className={cn(
        "cursor-pointer p-3 transition-all duration-300 group relative overflow-hidden",
        "bg-gradient-to-br from-card via-card to-card/95",
        "border-border/60 hover:border-primary/40",
        "shadow-sm hover:shadow-lg hover:shadow-primary/5",
        "hover:-translate-y-0.5",
        isLostOrJunk && "opacity-60 grayscale",
        !isLostOrJunk && "hover:ring-1 hover:ring-primary/20"
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/2 group-hover:via-primary/1 group-hover:to-primary/2 transition-all duration-300 pointer-events-none" />
      {/* Header: Name + Score */}
      <div className="flex items-start justify-between gap-1.5 mb-2 relative z-10">
        <h4 className="font-semibold text-sm text-foreground truncate flex-1 leading-tight group-hover:text-primary transition-colors">
          {lead.name}
        </h4>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold shadow-sm",
          "border border-current/20",
          getScoreColor(lead.score)
        )}>
          {lead.status === "won" ? (
            <Check className="size-3" />
          ) : (
            getScoreIcon(lead.score)
          )}
          {lead.status === "won" ? "Won" : lead.score}
        </div>
      </div>

      {/* Budget & Type */}
      <div className="relative z-10 mb-2">
        <p className="text-xs font-semibold text-foreground/90 mb-1">
          {formatCurrency(lead.budgetMin)} - {formatCurrency(lead.budgetMax)}
        </p>
        <p className="text-[11px] font-medium text-muted-foreground">
          {lead.projectType}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 relative z-10">
        <div className="p-0.5 rounded bg-muted/50">
          <MapPin className="size-3 flex-shrink-0 text-primary" />
        </div>
        <span className="truncate font-medium">{lead.area}, {lead.city}</span>
      </div>

      {/* Source & Time */}
      <div className="flex items-center gap-2 text-xs mb-2 relative z-10">
        <Badge variant="secondary" className={cn("text-[10px] px-2 py-0.5 font-semibold shadow-sm border-0", getSourceBadge(lead.source))}>
          {lead.source.substring(0, 3)}
        </Badge>
        <span className="text-muted-foreground/60">·</span>
        <span className="text-muted-foreground font-medium">{getDaysAgo(lead.createdAt)} ago</span>
      </div>

      {/* Last Activity */}
      <div className="relative z-10 mb-2">
        <p className="text-[11px] text-muted-foreground truncate">
          <span className="font-medium">Last:</span> {lead.lastActivityType} {getDaysAgo(lead.lastActivity.split(" ")[0])}
        </p>
      </div>

      {/* Lost Reason */}
      {isLostOrJunk && lead.lostReason && (
        <p className="text-[10px] text-destructive mb-1 truncate">
          Reason: {lead.lostReason}
        </p>
      )}

      {/* Quick Actions */}
      <div className="flex items-center gap-1 pt-2.5 border-t border-border/50 relative z-10">
        {!isLostOrJunk ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950/30 dark:hover:text-green-400 transition-all"
              onClick={handleCall}
            >
              <Phone className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 transition-all"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit3 className="size-3.5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="size-8 ml-auto hover:bg-muted transition-all">
                  <MoreHorizontal className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
                <DropdownMenuItem>Add Note</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Mark as Lost</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs ml-auto hover:bg-muted"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="size-3 mr-1" />
            View
          </Button>
        )}
      </div>
    </Card>
  )
}

// Pipeline Column Component
function PipelineColumn({
  status,
  leads,
  totalValue,
  onDragOver,
  onDrop,
  onLeadClick,
  onAddLead,
  isLostOrJunk = false,
}: {
  status: PipelineStatus
  leads: Lead[]
  totalValue: number
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, status: PipelineStatus) => void
  onLeadClick: (lead: Lead) => void
  onAddLead?: () => void
  isLostOrJunk?: boolean
}) {
  const config = statusConfig[status]
  const [isDragOver, setIsDragOver] = React.useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
    onDragOver(e)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false)
    onDrop(e, status)
  }

  return (
    <div
      className={cn(
        "flex flex-col min-w-[320px] max-w-[320px] rounded-xl border bg-gradient-to-b from-card via-card to-card/95",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "border-border/60",
        isDragOver && !isLostOrJunk && "ring-2 ring-primary ring-offset-2 scale-[1.02]"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className={cn(
        "p-4 border-b rounded-t-xl relative overflow-hidden",
        config.bgColor
      )}>
        {/* Decorative gradient overlay */}
        <div className={cn(
          "absolute inset-0 opacity-10",
          `bg-gradient-to-br ${config.gradient}`
        )} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className={cn("font-bold text-base tracking-tight", config.color)}>
              {config.label}
            </h3>
            <Badge 
              variant="secondary" 
              className="text-xs font-bold px-2.5 py-1 bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm"
            >
              {leads.length}
            </Badge>
          </div>
          <p className="text-sm font-bold text-foreground/80">
            {formatCurrency(totalValue)}
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-300px)] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {leads.map((lead, index) => (
          <div
            key={lead.id}
            className="animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <LeadCard
              lead={lead}
              onDragStart={(e, l) => {
                e.dataTransfer.setData("leadId", l.id)
                e.dataTransfer.setData("fromStatus", l.status)
              }}
              onClick={() => onLeadClick(lead)}
              isLostOrJunk={isLostOrJunk}
            />
          </div>
        ))}

        {/* Add Lead Button */}
        {onAddLead && !isLostOrJunk && (
          <Button
            variant="ghost"
            className="w-full h-11 border-2 border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 font-medium"
            onClick={onAddLead}
          >
            <Plus className="size-4 mr-2" />
            Add Lead
          </Button>
        )}
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { category, location, setCategory, setLocation } = useFilters()

  // State
  const [leads, setLeads] = React.useState<Lead[]>(sampleLeads)
  const [sourceFilter, setSourceFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("this_month")
  const [showLostJunk, setShowLostJunk] = React.useState(false)
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [isMoveModalOpen, setIsMoveModalOpen] = React.useState(false)
  const [moveTarget, setMoveTarget] = React.useState<{ lead: Lead; toStatus: PipelineStatus } | null>(null)
  const [moveNotes, setMoveNotes] = React.useState("")
  const [myLeadsOnly, setMyLeadsOnly] = React.useState(false)

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    if (sourceFilter !== "all" && lead.source !== sourceFilter) return false
    return true
  })

  // Group leads by status
  const mainStatuses: PipelineStatus[] = ["new", "contacted", "qualified", "site_visit", "negotiation", "won"]
  const lostJunkStatuses: PipelineStatus[] = ["lost", "junk"]
  
  const getLeadsByStatus = (status: PipelineStatus) => 
    filteredLeads.filter((l) => l.status === status)
  
  const getTotalValue = (status: PipelineStatus) =>
    getLeadsByStatus(status).reduce((sum, l) => sum + l.budgetMax, 0)

  // Calculate totals
  const totalPotentialValue = mainStatuses.reduce((sum, s) => sum + getTotalValue(s), 0)
  const totalLeadsInPipeline = mainStatuses.reduce((sum, s) => sum + getLeadsByStatus(s).length, 0)

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, toStatus: PipelineStatus) => {
    e.preventDefault()
    const leadId = e.dataTransfer.getData("leadId")
    const fromStatus = e.dataTransfer.getData("fromStatus")

    if (fromStatus === toStatus) return

    const lead = leads.find((l) => l.id === leadId)
    if (!lead) return

    // If moving to lost/junk or from important stage, show confirmation
    if (toStatus === "lost" || toStatus === "junk" || fromStatus === "negotiation" || toStatus === "won") {
      setMoveTarget({ lead, toStatus })
      setIsMoveModalOpen(true)
    } else {
      // Direct move for other statuses
      updateLeadStatus(leadId, toStatus)
    }
  }

  const updateLeadStatus = (leadId: string, newStatus: PipelineStatus, notes?: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: newStatus,
              lastActivity: new Date().toISOString(),
              lastActivityType: `Moved to ${statusConfig[newStatus].label}`,
              notes: notes ? `${l.notes}\n${notes}` : l.notes,
              lostReason: newStatus === "lost" || newStatus === "junk" ? notes : undefined,
            }
          : l
      )
    )
  }

  const confirmMove = () => {
    if (moveTarget) {
      updateLeadStatus(moveTarget.lead.id, moveTarget.toStatus, moveNotes)
      setMoveTarget(null)
      setMoveNotes("")
      setIsMoveModalOpen(false)
    }
  }

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full -m-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 p-4 border-b bg-gradient-to-r from-card via-card to-card/95 shadow-sm flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-foreground tracking-tight">Pipeline View</h1>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-border/50 hover:bg-[hsl(var(--hover-bg))] hover:border-primary/30 transition-all"
                onClick={() => router.push("/crm/leads")}
              >
                <List className="size-4 mr-1.5" />
                List View
              </Button>
            </div>
          </div>

          {/* Filters - All visible without scrolling */}
          <div className="flex items-center gap-2 flex-nowrap">
            {/* Category Filter */}
            <Select value={category} onValueChange={(v) => setCategory(v as any)}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {projectCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={location} onValueChange={(v) => setLocation(v as any)}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Source Filter */}
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <Filter className="size-3 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="All Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Source</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Google Ads">Google Ads</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Walk-in">Walk-in</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <Calendar className="size-3 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="all_time">All Time</SelectItem>
              </SelectContent>
            </Select>

            {/* Lost/Junk Toggle */}
            <Button
              variant={showLostJunk ? "secondary" : "outline"}
              size="sm"
              className="h-8 text-xs px-3"
              onClick={() => setShowLostJunk(!showLostJunk)}
            >
              {showLostJunk ? <EyeOff className="size-3.5 mr-1.5" /> : <Eye className="size-3.5 mr-1.5" />}
              Lost/Junk
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 px-4 py-3.5 border-b bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Total:</span>
            <span className="text-lg font-bold text-foreground">{formatCurrency(totalPotentialValue)}</span>
            <span className="text-sm text-muted-foreground">potential</span>
          </div>
          <div className="h-5 w-px bg-border/60" />
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">{totalLeadsInPipeline}</span>
            <span className="text-sm text-muted-foreground">leads in pipeline</span>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto p-4 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="flex gap-5 min-w-max">
            {/* Main Status Columns */}
            {mainStatuses.map((status) => (
              <PipelineColumn
                key={status}
                status={status}
                leads={getLeadsByStatus(status)}
                totalValue={getTotalValue(status)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onLeadClick={handleLeadClick}
                onAddLead={status === "new" ? () => router.push("/crm/leads/new") : undefined}
              />
            ))}

            {/* Lost/Junk Columns */}
            {showLostJunk && (
              <>
                <div className="w-px bg-border my-2" />
                {lostJunkStatuses.map((status) => (
                  <PipelineColumn
                    key={status}
                    status={status}
                    leads={getLeadsByStatus(status)}
                    totalValue={getTotalValue(status)}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onLeadClick={handleLeadClick}
                    isLostOrJunk
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Move Confirmation Modal */}
      <Dialog open={isMoveModalOpen} onOpenChange={setIsMoveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Move to {moveTarget && statusConfig[moveTarget.toStatus].label}
            </DialogTitle>
            <DialogDescription>
              {moveTarget && (
                <>
                  Moving <strong>{moveTarget.lead.name}</strong> to{" "}
                  <strong>{statusConfig[moveTarget.toStatus].label}</strong>.
                  {(moveTarget.toStatus === "lost" || moveTarget.toStatus === "junk") && (
                    <span className="block mt-2 text-destructive">
                      This will remove the lead from the active pipeline.
                    </span>
                  )}
                  {moveTarget.toStatus === "won" && (
                    <span className="block mt-2 text-green-600">
                      Congratulations! This lead will be marked as converted.
                    </span>
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="moveNotes">
                {moveTarget?.toStatus === "lost" || moveTarget?.toStatus === "junk"
                  ? "Reason (required)"
                  : "Notes (optional)"}
              </Label>
              <Textarea
                id="moveNotes"
                placeholder={
                  moveTarget?.toStatus === "lost"
                    ? "Why was this lead lost?"
                    : moveTarget?.toStatus === "junk"
                    ? "Why is this lead marked as junk?"
                    : "Add any notes about this status change..."
                }
                value={moveNotes}
                onChange={(e) => setMoveNotes(e.target.value)}
              />
            </div>

            {moveTarget?.toStatus === "won" && (
              <div className="space-y-2">
                <Label>Deal Value</Label>
                <Input
                  type="text"
                  placeholder="e.g., 85,00,000"
                  defaultValue={moveTarget.lead.budgetMax.toLocaleString("en-IN")}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMoveModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmMove}
              disabled={
                (moveTarget?.toStatus === "lost" || moveTarget?.toStatus === "junk") &&
                !moveNotes.trim()
              }
              variant={
                moveTarget?.toStatus === "lost" || moveTarget?.toStatus === "junk"
                  ? "destructive"
                  : "default"
              }
            >
              Confirm Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lead Detail Drawer */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedLead && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="pb-6 border-b">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {selectedLead.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Lead ID: {selectedLead.id}
                    </p>
                  </div>
                  <Badge 
                    className={cn(
                      "text-xs px-2.5 py-1",
                      statusConfig[selectedLead.status as PipelineStatus].bgColor, 
                      statusConfig[selectedLead.status as PipelineStatus].color
                    )}
                  >
                    {statusConfig[selectedLead.status as PipelineStatus].label}
                  </Badge>
                </div>
                
                {/* Score Card */}
                <div className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border",
                  selectedLead.score >= 70 ? "bg-orange-50 border-orange-200" :
                  selectedLead.score >= 40 ? "bg-yellow-50 border-yellow-200" :
                  "bg-blue-50 border-blue-200"
                )}>
                  <div className={cn(
                    "flex items-center justify-center size-12 rounded-full",
                    selectedLead.score >= 70 ? "bg-orange-100" :
                    selectedLead.score >= 40 ? "bg-yellow-100" :
                    "bg-blue-100"
                  )}>
                    {getScoreIcon(selectedLead.score)}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{selectedLead.score}</p>
                    <p className="text-sm text-muted-foreground">Lead Score</p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="flex-1 py-6 space-y-6 overflow-y-auto">
                {/* Contact Information */}
                <div className="rounded-xl border bg-card p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-dashed last:border-0">
                      <span className="text-sm text-muted-foreground">Phone</span>
                      <a 
                        href={`tel:+91${selectedLead.phone}`} 
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        +91 {selectedLead.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-dashed last:border-0">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <a 
                        href={`mailto:${selectedLead.email}`} 
                        className="text-sm font-medium text-primary hover:underline truncate max-w-[200px]"
                      >
                        {selectedLead.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="text-sm font-medium text-foreground text-right">
                        {selectedLead.area}, {selectedLead.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Requirements */}
                <div className="rounded-xl border bg-card p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500" />
                    Project Requirements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-dashed">
                      <span className="text-sm text-muted-foreground">Budget</span>
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(selectedLead.budgetMin)} - {formatCurrency(selectedLead.budgetMax)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-dashed">
                      <span className="text-sm text-muted-foreground">Project Type</span>
                      <span className="text-sm font-medium text-foreground">{selectedLead.projectType}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Source</span>
                      <Badge variant="secondary" className={cn("text-xs", getSourceBadge(selectedLead.source))}>
                        {selectedLead.source}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Activity */}
                <div className="rounded-xl border bg-card p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-dashed">
                      <span className="text-sm text-muted-foreground">Created</span>
                      <span className="text-sm font-medium text-foreground">
                        {new Date(selectedLead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-dashed">
                      <span className="text-sm text-muted-foreground">Last Activity</span>
                      <span className="text-sm font-medium text-foreground">{selectedLead.lastActivityType}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Assigned To</span>
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {selectedLead.assignedTo.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{selectedLead.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="rounded-xl border bg-card p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-purple-500" />
                    Notes
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedLead.notes || "No notes added yet."}
                  </p>
                </div>
              </div>

              {/* Action Buttons - Fixed at bottom */}
              <div className="pt-4 border-t bg-background sticky bottom-0">
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 h-11" 
                    onClick={() => window.open(`tel:+91${selectedLead.phone}`)}
                  >
                    <Phone className="size-4 mr-2" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-11 bg-transparent border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700" 
                    onClick={() => window.open(`https://wa.me/91${selectedLead.phone}`)}
                  >
                    <MessageCircle className="size-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  )
}
