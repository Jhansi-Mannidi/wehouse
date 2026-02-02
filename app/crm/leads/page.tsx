"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Phone,
  MessageCircle,
  Pencil,
  MoreVertical,
  Plus,
  Upload,
  Download,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  MapPin,
  Calendar,
  Users as UsersIcon,
  IndianRupee,
  Megaphone,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAI } from "@/lib/ai-context"
import { LeadAIInsights } from "@/components/ai/ai-insights-card"
import { Sparkles, Target, XCircle, FileUp, Check, AlertCircle, Loader2, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

// Lead status configuration
const leadStatuses = [
  { value: "new", label: "New", color: "bg-emerald-50", textColor: "text-emerald-700", dotColor: "bg-emerald-500", count: 23 },
  { value: "contacted", label: "Contacted", color: "bg-yellow-50", textColor: "text-yellow-700", dotColor: "bg-yellow-500", count: 45 },
  { value: "qualified", label: "Qualified", color: "bg-blue-50", textColor: "text-blue-700", dotColor: "bg-blue-500", count: 18 },
  { value: "site_visit_scheduled", label: "Site Visit Scheduled", color: "bg-purple-50", textColor: "text-purple-700", dotColor: "bg-purple-500", count: 8 },
  { value: "site_visit_done", label: "Site Visit Done", color: "bg-indigo-50", textColor: "text-indigo-700", dotColor: "bg-indigo-500", count: 12 },
  { value: "negotiation", label: "Negotiation", color: "bg-orange-50", textColor: "text-orange-700", dotColor: "bg-orange-500", count: 5 },
  { value: "won", label: "Won", color: "bg-green-50", textColor: "text-green-700", dotColor: "bg-green-600", count: 89 },
  { value: "lost", label: "Lost", color: "bg-red-50", textColor: "text-red-700", dotColor: "bg-red-500", count: 34 },
]

const cities = [
  { value: "hyderabad", label: "Hyderabad" },
  { value: "bangalore", label: "Bangalore" },
]

const sources = [
  { value: "facebook", label: "Facebook", percentage: 40 },
  { value: "google", label: "Google Ads", percentage: 25 },
  { value: "website", label: "Website", percentage: 15 },
  { value: "walkin", label: "Walk-in", percentage: 10 },
  { value: "referral", label: "Referral", percentage: 10 },
]

const teamMembers = [
  { value: "me", label: "Me" },
  { value: "rahul", label: "Rahul" },
  { value: "sneha", label: "Sneha" },
  { value: "amit", label: "Amit" },
  { value: "priya", label: "Priya" },
]

const dateRanges = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_30_days", label: "Last 30 days" },
  { value: "this_month", label: "This month" },
  { value: "last_month", label: "Last month" },
  { value: "custom", label: "Custom range" },
]

// Mock leads data with AI-generated win probability
const mockLeads = [
  {
    id: "WH-HYD-2026-00234",
    name: "Rajesh Kumar",
    phone: "9876543210",
    city: "Hyderabad",
    area: "Kondapur",
    source: "facebook",
    status: "contacted",
    assignedTo: "rahul",
    lastActivity: "Called 2h ago",
    createdAt: "Jan 25",
    budget: 5500000,
    winProbability: 65,
  },
  {
    id: "WH-HYD-2026-00235",
    name: "Sunitha Reddy",
    phone: "8765432109",
    city: "Hyderabad",
    area: "Gachibowli",
    source: "google",
    status: "new",
    assignedTo: null,
    lastActivity: null,
    createdAt: "Jan 25",
    budget: 7500000,
    winProbability: 45,
  },
  {
    id: "WH-HYD-2026-00236",
    name: "Venkat Rao",
    phone: "9988776655",
    city: "Hyderabad",
    area: "Madhapur",
    source: "website",
    status: "qualified",
    assignedTo: "sneha",
    lastActivity: "Email sent 1d ago",
    createdAt: "Jan 24",
    budget: 4500000,
    winProbability: 72,
  },
  {
    id: "WH-BLR-2026-00123",
    name: "Priya Sharma",
    phone: "9123456789",
    city: "Bangalore",
    area: "Whitefield",
    source: "referral",
    status: "site_visit_scheduled",
    assignedTo: "amit",
    lastActivity: "Visit on Jan 28",
    createdAt: "Jan 23",
    budget: 8500000,
    winProbability: 85,
  },
  {
    id: "WH-HYD-2026-00237",
    name: "Mohammed Ali",
    phone: "9876123450",
    city: "Hyderabad",
    area: "Hitech City",
    source: "facebook",
    status: "negotiation",
    assignedTo: "rahul",
    lastActivity: "Quote sent 3h ago",
    createdAt: "Jan 22",
    budget: 6500000,
    winProbability: 78,
  },
  {
    id: "WH-HYD-2026-00238",
    name: "Lakshmi Devi",
    phone: "8899776655",
    city: "Hyderabad",
    area: "Kukatpally",
    source: "walkin",
    status: "site_visit_done",
    assignedTo: "priya",
    lastActivity: "Follow up pending",
    createdAt: "Jan 21",
    budget: 3500000,
    winProbability: 58,
  },
  {
    id: "WH-BLR-2026-00124",
    name: "Arun Kumar",
    phone: "9876509876",
    city: "Bangalore",
    area: "Electronic City",
    source: "google",
    status: "won",
    assignedTo: "sneha",
    lastActivity: "Contract signed",
    createdAt: "Jan 20",
    budget: 9500000,
    winProbability: 100,
  },
  {
    id: "WH-HYD-2026-00240",
    name: "Chitra Singh",
    phone: "9876654321",
    city: "Hyderabad",
    area: "Nallagandla",
    source: "referral",
    status: "won",
    assignedTo: "sneha",
    lastActivity: "Payment received",
    createdAt: "Jan 18",
    budget: 8200000,
    winProbability: 100,
  },
  {
    id: "WH-BLR-2026-00125",
    name: "Akshara Desai",
    phone: "9988113344",
    city: "Bangalore",
    area: "Indiranagar",
    source: "website",
    status: "qualified",
    assignedTo: "amit",
    lastActivity: "Site visit done",
    createdAt: "Jan 17",
    budget: 5800000,
    winProbability: 68,
  },
  {
    id: "WH-HYD-2026-00241",
    name: "Nikith Reddy",
    phone: "9765123456",
    city: "Hyderabad",
    area: "Sainikpuri",
    source: "facebook",
    status: "new",
    assignedTo: null,
    lastActivity: null,
    createdAt: "Jan 16",
    budget: 6000000,
    winProbability: 40,
  },
  {
    id: "WH-HYD-2026-00242",
    name: "Divya Nair",
    phone: "9654321098",
    city: "Hyderabad",
    area: "Financial District",
    source: "google",
    status: "site_visit_scheduled",
    assignedTo: "priya",
    lastActivity: "Visit scheduled for Feb 2",
    createdAt: "Jan 15",
    budget: 11000000,
    winProbability: 75,
  },
  {
    id: "WH-HYD-2026-00243",
    name: "Harish Kumar",
    phone: "8765234901",
    city: "Hyderabad",
    area: "JNTU",
    source: "walkin",
    status: "contacted",
    assignedTo: "rahul",
    lastActivity: "WhatsApp message sent",
    createdAt: "Jan 14",
    budget: 4000000,
    winProbability: 52,
  },
  {
    id: "WH-BLR-2026-00126",
    name: "Sanjana Gupta",
    phone: "9876543098",
    city: "Bangalore",
    area: "Marathahalli",
    source: "facebook",
    status: "negotiation",
    assignedTo: "sneha",
    lastActivity: "Negotiating price",
    createdAt: "Jan 13",
    budget: 7200000,
    winProbability: 82,
  },
  {
    id: "WH-HYD-2026-00244",
    name: "Prasad Rao",
    phone: "9123987654",
    city: "Hyderabad",
    area: "Tolichowki",
    source: "referral",
    status: "qualified",
    assignedTo: "amit",
    lastActivity: "Document review done",
    createdAt: "Jan 12",
    budget: 5500000,
    winProbability: 71,
  },
  {
    id: "WH-HYD-2026-00245",
    name: "Neha Sharma",
    phone: "8987654321",
    city: "Hyderabad",
    area: "Uppal",
    source: "google",
    status: "lost",
    assignedTo: "priya",
    lastActivity: "Budget exceeded",
    createdAt: "Jan 11",
    budget: 15000000,
    winProbability: 0,
  },
  {
    id: "WH-HYD-2026-00246",
    name: "Vishal Patel",
    phone: "9876509999",
    city: "Hyderabad",
    area: "Begumpet",
    source: "website",
    status: "new",
    assignedTo: null,
    lastActivity: null,
    createdAt: "Jan 10",
    budget: 6500000,
    winProbability: 38,
  },
  {
    id: "WH-BLR-2026-00127",
    name: "Anjali Iyer",
    phone: "9876123789",
    city: "Bangalore",
    area: "JP Nagar",
    source: "facebook",
    status: "site_visit_done",
    assignedTo: "rahul",
    lastActivity: "Waiting for decision",
    createdAt: "Jan 09",
    budget: 8800000,
    winProbability: 88,
  },
  {
    id: "WH-HYD-2026-00247",
    name: "Rohan Verma",
    phone: "9543210876",
    city: "Hyderabad",
    area: "Tarnaka",
    source: "referral",
    status: "contacted",
    assignedTo: "sneha",
    lastActivity: "Call scheduled",
    createdAt: "Jan 08",
    budget: 4800000,
    winProbability: 55,
  },
  {
    id: "WH-HYD-2026-00248",
    name: "Kavya Singh",
    phone: "9876543210",
    city: "Hyderabad",
    area: "Kachiguda",
    source: "google",
    status: "qualified",
    assignedTo: "amit",
    lastActivity: "Quote sent",
    createdAt: "Jan 07",
    budget: 7800000,
    winProbability: 79,
  },
]

function getStatusBadge(status: string) {
  const statusConfig = leadStatuses.find((s) => s.value === status)
  if (!statusConfig) return null

  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-medium border-0",
        statusConfig.color,
        statusConfig.textColor
      )}
    >
      {statusConfig.label}
    </Badge>
  )
}

function getSourceLabel(source: string) {
  const sourceConfig = sources.find((s) => s.value === source)
  return sourceConfig?.label || source
}

function getAssignedName(assignedTo: string | null) {
  if (!assignedTo) return "Unassigned"
  const member = teamMembers.find((m) => m.value === assignedTo)
  return member?.label || assignedTo
}

function formatBudget(budget: number) {
  if (budget >= 10000000) {
    return `${(budget / 10000000).toFixed(1)}Cr`
  }
  return `${(budget / 100000).toFixed(0)}L`
}

function formatPhone(phone: string) {
  return `${phone.slice(0, 5)}...`
}

// Filter Sidebar Component
function FilterSidebar({
  filters,
  setFilters,
  totalLeads,
  filteredCount,
}: {
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
  totalLeads: number
  filteredCount: number
}) {
  const handleStatusToggle = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }))
  }

  const handleCityToggle = (city: string) => {
    setFilters((prev) => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter((c) => c !== city)
        : [...prev.cities, city],
    }))
  }

  const handleSourceToggle = (source: string) => {
    setFilters((prev) => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source],
    }))
  }

  const handleAssignedToggle = (assignedTo: string) => {
    setFilters((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(assignedTo)
        ? prev.assignedTo.filter((a) => a !== assignedTo)
        : [...prev.assignedTo, assignedTo],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      search: "",
      statuses: [],
      cities: [],
      sources: [],
      assignedTo: [],
      dateRange: "last_30_days",
      budgetMin: 30,
      budgetMax: 100,
    })
  }

  return (
    <div className="flex flex-col gap-6 p-4 bg-card">
      {/* Search */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
          <Search className="size-3.5" />
          Search
        </Label>
        <Input
          placeholder="Search leads..."
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          className="h-9 bg-background"
        />
      </div>

      <Separator />

      {/* Status Filter */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-3">
          <Filter className="size-3.5" />
          Status
        </Label>
        <div className="space-y-2">
          {leadStatuses.map((status) => (
            <div key={status.value} className="flex items-center gap-2">
              <Checkbox
                id={`status-${status.value}`}
                checked={filters.statuses.includes(status.value)}
                onCheckedChange={() => handleStatusToggle(status.value)}
              />
              <label
                htmlFor={`status-${status.value}`}
                className="flex-1 text-sm cursor-pointer flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", status.dotColor)} />
                  {status.label}
                </span>
                <span className="text-xs text-muted-foreground">({status.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* City Filter */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-3">
          <MapPin className="size-3.5" />
          City
        </Label>
        <div className="space-y-2">
          {cities.map((city) => (
            <div key={city.value} className="flex items-center gap-2">
              <Checkbox
                id={`city-${city.value}`}
                checked={filters.cities.includes(city.value)}
                onCheckedChange={() => handleCityToggle(city.value)}
              />
              <label
                htmlFor={`city-${city.value}`}
                className="text-sm cursor-pointer"
              >
                {city.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Source Filter */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-3">
          <Megaphone className="size-3.5" />
          Source
        </Label>
        <div className="space-y-2">
          {sources.map((source) => (
            <div key={source.value} className="flex items-center gap-2">
              <Checkbox
                id={`source-${source.value}`}
                checked={filters.sources.includes(source.value)}
                onCheckedChange={() => handleSourceToggle(source.value)}
              />
              <label
                htmlFor={`source-${source.value}`}
                className="flex-1 text-sm cursor-pointer flex items-center justify-between"
              >
                {source.label}
                <span className="text-xs text-muted-foreground">({source.percentage}%)</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Assigned To Filter */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-3">
          <UsersIcon className="size-3.5" />
          Assigned To
        </Label>
        <div className="space-y-2">
          {teamMembers.map((member) => (
            <div key={member.value} className="flex items-center gap-2">
              <Checkbox
                id={`assigned-${member.value}`}
                checked={filters.assignedTo.includes(member.value)}
                onCheckedChange={() => handleAssignedToggle(member.value)}
              />
              <label
                htmlFor={`assigned-${member.value}`}
                className="text-sm cursor-pointer"
              >
                {member.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Date Range */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
          <Calendar className="size-3.5" />
          Date Range
        </Label>
        <Select
          value={filters.dateRange}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Budget Range */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-3">
          <IndianRupee className="size-3.5" />
          Budget Range
        </Label>
        <div className="flex items-center gap-2 mb-3">
          <Input
            type="text"
            value={`₹${filters.budgetMin}L`}
            readOnly
            className="h-8 text-center text-xs bg-background"
          />
          <span className="text-muted-foreground text-sm">to</span>
          <Input
            type="text"
            value={`₹${filters.budgetMax === 100 ? "1Cr" : `${filters.budgetMax}L`}`}
            readOnly
            className="h-8 text-center text-xs bg-background"
          />
        </div>
        <Slider
          value={[filters.budgetMin, filters.budgetMax]}
          min={10}
          max={100}
          step={5}
          onValueChange={([min, max]) =>
            setFilters((prev) => ({ ...prev, budgetMin: min, budgetMax: max }))
          }
          className="w-full"
        />
      </div>

      <Separator />

      {/* Filter Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent hover:bg-muted" onClick={clearAllFilters}>
          Clear All
        </Button>
        <Button size="sm" className="flex-1 bg-[hsl(var(--hover-bg))] text-foreground hover:bg-[hsl(var(--hover-bg))]/80">
          Apply Filters
        </Button>
      </div>

      {/* Result Count */}
      <p className="text-xs text-center text-muted-foreground">
        Showing {filteredCount} of {totalLeads} leads
      </p>
    </div>
  )
}

interface FilterState {
  search: string
  statuses: string[]
  cities: string[]
  sources: string[]
  assignedTo: string[]
  dateRange: string
  budgetMin: number
  budgetMax: number
}

type SortField = "id" | "name" | "city" | "source" | "status" | "assignedTo" | "createdAt"
type SortDirection = "asc" | "desc"

export default function LeadsListPage() {
  const [selectedLeads, setSelectedLeads] = React.useState<string[]>([])
  const router = useRouter()
  const { toast } = useToast()
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    statuses: [],
    cities: [],
    sources: [],
    assignedTo: [],
    dateRange: "last_30_days",
    budgetMin: 30,
    budgetMax: 100,
  })
  const [sortField, setSortField] = React.useState<SortField>("createdAt")
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(25)
  const [sidebarOpen, setSidebarOpen] = React.useState(false) // Default to hidden
  const { aiEnabled } = useAI()
  
  // Add Lead Dialog state
  const [addLeadOpen, setAddLeadOpen] = React.useState(false)
  const [newLead, setNewLead] = React.useState({
    name: "",
    phone: "",
    email: "",
    city: "hyderabad",
    area: "",
    source: "facebook",
    budget: "",
    notes: "",
    assignedTo: "",
  })
  
  // Import/Export state
  const [isImporting, setIsImporting] = React.useState(false)
  const [isExporting, setIsExporting] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  
  // Leads data with state for updates
  const [leads, setLeads] = React.useState(mockLeads)
  
  // Win probability badge color helper
  const getWinProbabilityColor = (probability: number) => {
    if (probability >= 75) return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
    if (probability >= 50) return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
    if (probability >= 25) return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
    return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
  }

  // Handle Import
  const handleImport = () => {
    fileInputRef.current?.click()
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsImporting(true)
      // Simulate file upload
      setTimeout(() => {
        setIsImporting(false)
        toast({
          title: "Import Successful",
          description: `${file.name} has been imported. 15 new leads added.`,
        })
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 2000)
    }
  }
  
  // Handle Export
  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      // Create a CSV content
      const csvContent = [
        ["Lead ID", "Name", "Phone", "City", "Area", "Source", "Status", "Assigned To", "Budget", "Created"],
        ...filteredLeads.map(lead => [
          lead.id,
          lead.name,
          lead.phone,
          lead.city,
          lead.area,
          getSourceLabel(lead.source),
          lead.status,
          getAssignedName(lead.assignedTo),
          formatBudget(lead.budget),
          lead.createdAt
        ])
      ].map(row => row.join(",")).join("\n")
      
      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      setIsExporting(false)
      toast({
        title: "Export Complete",
        description: `${filteredLeads.length} leads exported to CSV file.`,
      })
    }, 1500)
  }
  
  // Handle Add Lead
  const handleAddLead = () => {
    if (!newLead.name || !newLead.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least name and phone number.",
        variant: "destructive",
      })
      return
    }
    
    const newLeadData = {
      id: `WH-HYD-2026-${String(leads.length + 250).padStart(5, "0")}`,
      name: newLead.name,
      phone: newLead.phone,
      city: newLead.city === "hyderabad" ? "Hyderabad" : "Bangalore",
      area: newLead.area || "Not specified",
      source: newLead.source,
      status: "new" as const,
      assignedTo: newLead.assignedTo || null,
      lastActivity: null,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      budget: newLead.budget ? Number.parseInt(newLead.budget) * 100000 : 5000000,
      winProbability: 45,
    }
    
    setLeads(prev => [newLeadData, ...prev])
    setAddLeadOpen(false)
    setNewLead({
      name: "",
      phone: "",
      email: "",
      city: "hyderabad",
      area: "",
      source: "facebook",
      budget: "",
      notes: "",
      assignedTo: "",
    })
    
    toast({
      title: "Lead Added",
      description: `${newLead.name} has been added successfully.`,
    })
  }
  
  // Handle Mark as Lost
  const handleMarkAsLost = (leadId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: "lost" as const, winProbability: 0, lastActivity: "Marked as lost" } : lead
    ))
    toast({
      title: "Lead Updated",
      description: "Lead has been marked as lost.",
    })
  }

  // Filter and sort leads
  const filteredLeads = React.useMemo(() => {
    let result = [...leads]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.id.toLowerCase().includes(searchLower) ||
          lead.phone.includes(filters.search)
      )
    }

    // Apply status filter - if no status selected, show all
    if (filters.statuses.length > 0) {
      result = result.filter((lead) => filters.statuses.includes(lead.status))
    }

    // Apply city filter - if no city selected, show all
    if (filters.cities.length > 0) {
      result = result.filter((lead) =>
        filters.cities.includes(lead.city.toLowerCase())
      )
    }

    // Apply source filter - if no source selected, show all
    if (filters.sources.length > 0) {
      result = result.filter((lead) => filters.sources.includes(lead.source))
    }

    // Apply assigned to filter - if no assignment selected, show all
    if (filters.assignedTo.length > 0) {
      result = result.filter((lead) => {
        if (filters.assignedTo.includes("me")) {
          return lead.assignedTo === "rahul" || filters.assignedTo.includes(lead.assignedTo || "")
        }
        return filters.assignedTo.includes(lead.assignedTo || "")
      })
    }

    // Apply budget filter
    const budgetMin = filters.budgetMin * 100000 // Convert to actual rupees
    const budgetMax = filters.budgetMax === 100 ? Number.MAX_VALUE : filters.budgetMax * 100000
    result = result.filter((lead) => 
      lead.budget >= budgetMin && lead.budget <= budgetMax
    )

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "city":
          comparison = a.city.localeCompare(b.city)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        default:
          comparison = a.id.localeCompare(b.id)
      }
      return sortDirection === "asc" ? comparison : -comparison
    })

    return result
  }, [filters, sortField, sortDirection])

  const totalPages = Math.ceil(filteredLeads.length / perPage)
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  const handleSelectAll = () => {
    if (selectedLeads.length === paginatedLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(paginatedLeads.map((lead) => lead.id))
    }
  }

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    )
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="size-3.5 text-muted-foreground" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="size-3.5 text-primary" />
    ) : (
      <ArrowDown className="size-3.5 text-primary" />
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        {/* Top Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Leads</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track your sales leads
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Hidden file input for import */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls"
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={handleImport} disabled={isImporting}>
              {isImporting ? (
                <Loader2 className="size-4 mr-1.5 animate-spin" />
              ) : (
                <Upload className="size-4 mr-1.5" />
              )}
              {isImporting ? "Importing..." : "Import"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <Loader2 className="size-4 mr-1.5 animate-spin" />
              ) : (
                <Download className="size-4 mr-1.5" />
              )}
              {isExporting ? "Exporting..." : "Export"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/crm/pipeline")}>
              <BarChart3 className="size-4 mr-1.5" />
              Pipeline View
            </Button>
            <Button size="sm" onClick={() => setAddLeadOpen(true)}>
              <Plus className="size-4 mr-1.5" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* AI Insights - Only shown when AI is enabled */}
        {aiEnabled && (
          <LeadAIInsights />
        )}

        {/* Bulk Actions Bar */}
        {selectedLeads.length > 0 && (
          <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10">
            <CardContent className="py-3 px-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">
                  {selectedLeads.length} selected
                </span>
                <Separator orientation="vertical" className="h-5" />
                <Select onValueChange={(value) => {
                  setLeads(prev => prev.map(lead => 
                    selectedLeads.includes(lead.id) ? { ...lead, assignedTo: value } : lead
                  ))
                  toast({
                    title: "Leads Assigned",
                    description: `${selectedLeads.length} leads assigned to ${teamMembers.find(m => m.value === value)?.label}`,
                  })
                  setSelectedLeads([])
                }}>
                  <SelectTrigger className="h-8 w-[140px]">
                    <SelectValue placeholder="Assign To" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.filter(m => m.value !== "me").map((member) => (
                      <SelectItem key={member.value} value={member.value}>
                        {member.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => {
                  setLeads(prev => prev.map(lead => 
                    selectedLeads.includes(lead.id) ? { 
                      ...lead, 
                      status: value as typeof lead.status, 
                      winProbability: value === "lost" ? 0 : value === "won" ? 100 : lead.winProbability,
                      lastActivity: `Status changed to ${leadStatuses.find(s => s.value === value)?.label}`
                    } : lead
                  ))
                  toast({
                    title: "Status Updated",
                    description: `${selectedLeads.length} leads updated to ${leadStatuses.find(s => s.value === value)?.label}`,
                  })
                  setSelectedLeads([])
                }}>
                  <SelectTrigger className="h-8 w-[160px]">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {leadStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <span className="flex items-center gap-2">
                          <span className={cn("size-2 rounded-full", status.dotColor)} />
                          {status.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="size-3.5 mr-1.5" />
                  Export
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLeads([])}
                >
                  <X className="size-3.5 mr-1" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content with Sidebar */}
        <div className="flex gap-4">
          {/* Filter Sidebar - Desktop */}
          <div
            className={cn(
              "hidden lg:block w-72 shrink-0 transition-all duration-300",
              !sidebarOpen && "w-0 overflow-hidden"
            )}
          >
            <Card className="sticky top-4 bg-card">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-medium text-sm text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 bg-transparent hover:bg-muted"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <div className="overflow-y-auto max-h-[calc(100vh-140px)]">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  totalLeads={leads.length}
                  filteredCount={filteredLeads.length}
                />
              </div>
            </Card>
          </div>
          {/* Table Section */}
          <div className="flex-1 min-w-0">
            <Card>
              {/* Table Toolbar */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  {/* Desktop Filters Toggle Button */}
                  <Button
                    variant={sidebarOpen ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="hidden lg:flex"
                  >
                    <SlidersHorizontal className="size-4 mr-1.5" />
                    Filters
                    {(filters.statuses.length > 0 || filters.cities.length > 0 || filters.sources.length > 0) && (
                      <Badge variant="secondary" className="ml-1.5 size-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                        {filters.statuses.length + filters.cities.length + filters.sources.length}
                      </Badge>
                    )}
                  </Button>
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                        <SlidersHorizontal className="size-4 mr-1.5" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 p-0">
                      <SheetHeader className="p-4 border-b">
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
                        <FilterSidebar
                          filters={filters}
                          setFilters={setFilters}
                          totalLeads={leads.length}
                          filteredCount={filteredLeads.length}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Quick search..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, search: e.target.value }))
                      }
                      className="h-9 pl-9"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {filteredLeads.length} leads
                  </span>
                </div>
              </div>

              {/* Table */}
              {filteredLeads.length > 0 ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 dark:bg-muted/50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={
                              paginatedLeads.length > 0 &&
                              selectedLeads.length === paginatedLeads.length
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>
                          <button
                            className="flex items-center gap-1 hover:text-foreground"
                            onClick={() => handleSort("id")}
                          >
                            Lead ID {getSortIcon("id")}
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            className="flex items-center gap-1 hover:text-foreground"
                            onClick={() => handleSort("name")}
                          >
                            Name {getSortIcon("name")}
                          </button>
                        </TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>
                          <button
                            className="flex items-center gap-1 hover:text-foreground"
                            onClick={() => handleSort("city")}
                          >
                            City/Area {getSortIcon("city")}
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            className="flex items-center gap-1 hover:text-foreground"
                            onClick={() => handleSort("source")}
                          >
                            Source {getSortIcon("source")}
                          </button>
                        </TableHead>
                        <TableHead>
                          <button
                            className="flex items-center gap-1 hover:text-foreground"
                            onClick={() => handleSort("status")}
                          >
                            Status {getSortIcon("status")}
                          </button>
                        </TableHead>
                        <TableHead>Assigned</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead>
                          <button
                            className="flex items-center gap-1 hover:text-foreground"
                            onClick={() => handleSort("createdAt")}
                          >
                            Created {getSortIcon("createdAt")}
                          </button>
                        </TableHead>
                        {aiEnabled && (
                          <TableHead>
                            <div className="flex items-center gap-1">
                              <Target className="size-3.5 text-[#f6a404]" />
                              <span>Win %</span>
                              <Sparkles className="size-3 text-[#f6a404]" />
                            </div>
                          </TableHead>
                        )}
                        <TableHead className="w-12">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLeads.map((lead) => (
                        <TableRow
                          key={lead.id}
                          data-state={selectedLeads.includes(lead.id) ? "selected" : undefined}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedLeads.includes(lead.id)}
                              onCheckedChange={() => handleSelectLead(lead.id)}
                            />
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {lead.id}
                          </TableCell>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>
                            <button className="flex items-center gap-1 text-primary hover:underline">
                              <Phone className="size-3.5" />
                              {formatPhone(lead.phone)}
                            </button>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {lead.city}
                              <span className="text-muted-foreground">/{lead.area}</span>
                            </div>
                          </TableCell>
<TableCell>
                          <Badge variant="outline" className="text-xs border-border dark:border-border/50">
                            {getSourceLabel(lead.source)}
                          </Badge>
                        </TableCell>
                          <TableCell>{getStatusBadge(lead.status)}</TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "text-sm",
                                !lead.assignedTo && "text-orange-600 dark:text-orange-400 font-medium"
                              )}
                            >
                              {getAssignedName(lead.assignedTo)}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {lead.lastActivity || "-"}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {lead.createdAt}
                          </TableCell>
                          {aiEnabled && (
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "text-xs font-semibold border",
                                  getWinProbabilityColor(lead.winProbability)
                                )}
                              >
                                {lead.winProbability}%
                              </Badge>
                            </TableCell>
                          )}
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="size-7 bg-transparent hover:bg-primary/10"
                                onClick={() => window.open(`tel:${lead.phone}`)}
                              >
                                <Phone className="size-3.5" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="size-7 bg-transparent hover:bg-green-500/10"
                                onClick={() => window.open(`https://wa.me/91${lead.phone}`)}
                              >
                                <MessageCircle className="size-3.5" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="size-7 bg-transparent">
                                    <MoreVertical className="size-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                  <DropdownMenuItem onClick={() => {
                                    toast({
                                      title: "Edit Lead",
                                      description: `Opening edit form for ${lead.name}`,
                                    })
                                  }}>
                                    <Pencil className="size-3.5 mr-2" />
                                    Edit Lead
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                    onClick={() => handleMarkAsLost(lead.id)}
                                    disabled={lead.status === "lost"}
                                  >
                                    <XCircle className="size-3.5 mr-2" />
                                    Mark as Lost
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Show</span>
                      <Select
                        value={perPage.toString()}
                        onValueChange={(v) => {
                          setPerPage(Number(v))
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger className="h-8 w-[70px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-muted-foreground">per page</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 bg-transparent"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page: number
                        if (totalPages <= 5) {
                          page = i + 1
                        } else if (currentPage <= 3) {
                          page = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i
                        } else {
                          page = currentPage - 2 + i
                        }
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            className="size-8"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        )
                      })}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <span className="px-1 text-muted-foreground">...</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-8 bg-transparent"
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 bg-transparent"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="size-16 rounded-full bg-muted dark:bg-muted/50 flex items-center justify-center mb-4">
                    <Search className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No leads found</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                    No leads match your current filters. Try adjusting your search criteria or clear filters to see all leads.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        search: "",
                        statuses: [],
                        cities: [],
                        sources: [],
                        assignedTo: [],
                        dateRange: "last_30_days",
                        budgetMin: 30,
                        budgetMax: 100,
                      })
                    }
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      
      {/* Add Lead Dialog */}
      <Dialog open={addLeadOpen} onOpenChange={setAddLeadOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Enter the lead details below. Required fields are marked with *.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newLead.name}
                  onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  placeholder="10 digit number"
                  value={newLead.phone}
                  onChange={(e) => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={newLead.email}
                onChange={(e) => setNewLead(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select 
                  value={newLead.city} 
                  onValueChange={(value) => setNewLead(prev => ({ ...prev, city: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  placeholder="Locality/Area"
                  value={newLead.area}
                  onChange={(e) => setNewLead(prev => ({ ...prev, area: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Lead Source</Label>
                <Select 
                  value={newLead.source} 
                  onValueChange={(value) => setNewLead(prev => ({ ...prev, source: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map(source => (
                      <SelectItem key={source.value} value={source.value}>{source.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (in Lakhs)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="e.g., 50"
                  value={newLead.budget}
                  onChange={(e) => setNewLead(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Select 
                value={newLead.assignedTo} 
                onValueChange={(value) => setNewLead(prev => ({ ...prev, assignedTo: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.filter(m => m.value !== "me").map(member => (
                    <SelectItem key={member.value} value={member.value}>{member.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about the lead..."
                value={newLead.notes}
                onChange={(e) => setNewLead(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddLeadOpen(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleAddLead} className="bg-[hsl(var(--hover-bg))] text-foreground hover:bg-[hsl(var(--hover-bg))]/80">
              <Plus className="size-4 mr-1.5" />
              Add Lead
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
