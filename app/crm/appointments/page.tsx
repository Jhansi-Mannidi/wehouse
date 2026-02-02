"use client"

import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Phone,
  User,
  Users,
  Calendar,
  Home,
  Repeat,
  Ruler,
  MessageCircle,
  Bell,
  CheckSquare,
  X,
  Search,
  FileText,
  Target,
  TrendingUp,
  Building2,
  Video,
} from "lucide-react"

import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/role-context"

// Types
interface TimeSlot {
  time: string
  label: string
  available: boolean
  conflict?: string
}

interface Visit {
  id: string
  leadName: string
  leadPhone: string
  plotLocation: string
  type: "initial" | "followup" | "measurement" | "review" | "strategy" | "progress"
  date: string
  startTime: string
  endTime: string
  duration: number
  attendees: string[]
  meetingPoint: "plot" | "office" | "virtual"
  instructions: string
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  // For Super Admin meetings
  meetingWith?: "city_admin" | "project_manager" | "client"
  role?: string
  city?: string
}

interface Lead {
  id: string
  name: string
  phone: string
  plotLocation: string
  area: string
}

// Sample leads
const leads: Lead[] = [
  { id: "L001", name: "Rajesh Kumar", phone: "9876543210", plotLocation: "Survey 123, Kondapur", area: "Kondapur" },
  { id: "L002", name: "Sunitha Reddy", phone: "8765432109", plotLocation: "Plot 45, Madhapur", area: "Madhapur" },
  { id: "L003", name: "Venkat Rao", phone: "7654321098", plotLocation: "Survey 78, Jubilee Hills", area: "Jubilee Hills" },
  { id: "L004", name: "Anil Kumar", phone: "6543210987", plotLocation: "Plot 12, Banjara Hills", area: "Banjara Hills" },
  { id: "L005", name: "Meena Sharma", phone: "5432109876", plotLocation: "Survey 56, Gachibowli", area: "Gachibowli" },
]

// Sample team members
const teamMembers = [
  { id: "T001", name: "Rahul Sharma", role: "Sales Executive" },
  { id: "T002", name: "Priya Menon", role: "Sales Coordinator" },
  { id: "T003", name: "Architect Consultant", role: "External" },
]

// Sample visits
const sampleVisits: Visit[] = [
  {
    id: "V001",
    leadName: "Rajesh Kumar",
    leadPhone: "9876543210",
    plotLocation: "Survey 123, Kondapur",
    type: "initial",
    date: "2026-01-28",
    startTime: "09:00",
    endTime: "10:00",
    duration: 60,
    attendees: ["Rahul Sharma"],
    meetingPoint: "plot",
    instructions: "Customer will come with father. Bring portfolio.",
    status: "scheduled",
  },
  {
    id: "V002",
    leadName: "Sunitha Reddy",
    leadPhone: "8765432109",
    plotLocation: "Plot 45, Madhapur",
    type: "followup",
    date: "2026-01-28",
    startTime: "11:00",
    endTime: "12:00",
    duration: 60,
    attendees: ["Rahul Sharma", "Priya Menon"],
    meetingPoint: "office",
    instructions: "Discuss design changes",
    status: "scheduled",
  },
  {
    id: "V003",
    leadName: "Venkat Rao",
    leadPhone: "7654321098",
    plotLocation: "Survey 78, Jubilee Hills",
    type: "measurement",
    date: "2026-01-29",
    startTime: "10:00",
    endTime: "11:00",
    duration: 60,
    attendees: ["Rahul Sharma", "Architect Consultant"],
    meetingPoint: "plot",
    instructions: "Take detailed measurements for villa",
    status: "scheduled",
  },
  {
    id: "V004",
    leadName: "Anil Kumar",
    leadPhone: "6543210987",
    plotLocation: "Plot 12, Banjara Hills",
    type: "initial",
    date: "2026-01-30",
    startTime: "14:00",
    endTime: "15:00",
    duration: 60,
    attendees: ["Rahul Sharma"],
    meetingPoint: "plot",
    instructions: "",
    status: "scheduled",
  },
  {
    id: "V005",
    leadName: "Meena Sharma",
    leadPhone: "5432109876",
    plotLocation: "Survey 56, Gachibowli",
    type: "initial",
    date: "2026-02-01",
    startTime: "10:00",
    endTime: "11:00",
    duration: 60,
    attendees: ["Priya Menon"],
    meetingPoint: "plot",
    instructions: "",
    status: "scheduled",
  },
]

// Super Admin specific meetings with City Admins and Project Managers
const superAdminMeetings: Visit[] = [
  {
    id: "SA-V001",
    leadName: "Vikram Singh",
    leadPhone: "9876543210",
    plotLocation: "Head Office, Conference Room A",
    type: "review",
    date: "2026-01-28",
    startTime: "09:00",
    endTime: "10:00",
    duration: 60,
    attendees: ["Admin Team"],
    meetingPoint: "office",
    instructions: "Monthly review of Hyderabad operations",
    status: "scheduled",
    meetingWith: "city_admin",
    role: "City Admin - Hyderabad",
    city: "Hyderabad",
  },
  {
    id: "SA-V002",
    leadName: "Priya Menon",
    leadPhone: "8765432109",
    plotLocation: "Virtual - Zoom Meeting",
    type: "progress",
    date: "2026-01-28",
    startTime: "11:00",
    endTime: "12:00",
    duration: 60,
    attendees: ["Finance Team"],
    meetingPoint: "virtual",
    instructions: "Project budget review for Q1",
    status: "scheduled",
    meetingWith: "project_manager",
    role: "Project Manager - Green Valley Villas",
    city: "Hyderabad",
  },
  {
    id: "SA-V003",
    leadName: "Rajesh Kumar",
    leadPhone: "7654321098",
    plotLocation: "Regional Office, Bangalore",
    type: "strategy",
    date: "2026-01-29",
    startTime: "10:00",
    endTime: "12:00",
    duration: 120,
    attendees: ["Strategy Team"],
    meetingPoint: "office",
    instructions: "Q2 expansion planning discussion",
    status: "scheduled",
    meetingWith: "city_admin",
    role: "City Admin - Bangalore",
    city: "Bangalore",
  },
  {
    id: "SA-V004",
    leadName: "Sunita Reddy",
    leadPhone: "6543210987",
    plotLocation: "Head Office, Board Room",
    type: "review",
    date: "2026-01-30",
    startTime: "14:00",
    endTime: "15:00",
    duration: 60,
    attendees: ["Operations Team"],
    meetingPoint: "office",
    instructions: "Marina Heights project status update",
    status: "scheduled",
    meetingWith: "project_manager",
    role: "Project Manager - Marina Heights",
    city: "Chennai",
  },
  {
    id: "SA-V005",
    leadName: "Anand Mehta",
    leadPhone: "5432109876",
    plotLocation: "Virtual - Teams Meeting",
    type: "progress",
    date: "2026-02-01",
    startTime: "10:00",
    endTime: "11:00",
    duration: 60,
    attendees: ["Admin Team"],
    meetingPoint: "virtual",
    instructions: "Mumbai operations kickoff",
    status: "scheduled",
    meetingWith: "city_admin",
    role: "City Admin - Mumbai",
    city: "Mumbai",
  },
  {
    id: "SA-V006",
    leadName: "Karthik Rao",
    leadPhone: "4321098765",
    plotLocation: "Head Office, Conference Room B",
    type: "strategy",
    date: "2026-02-03",
    startTime: "15:00",
    endTime: "16:00",
    duration: 60,
    attendees: ["HR Team"],
    meetingPoint: "office",
    instructions: "Vendor management strategy",
    status: "scheduled",
    meetingWith: "project_manager",
    role: "Project Manager - Skyline Plaza",
    city: "Hyderabad",
  },
]

// Time slots
const timeSlots: TimeSlot[] = [
  { time: "09:00", label: "9-10 AM", available: true },
  { time: "10:00", label: "10-11 AM", available: true, conflict: "Rahul has another visit" },
  { time: "11:00", label: "11-12 PM", available: true },
  { time: "14:00", label: "2-3 PM", available: true },
  { time: "15:00", label: "3-4 PM", available: true },
  { time: "16:00", label: "4-5 PM", available: true },
]

// Visit type configuration
const visitTypeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  initial: { label: "Initial Site Visit", icon: Home, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  followup: { label: "Follow-up Visit", icon: Repeat, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  measurement: { label: "Measurement Visit", icon: Ruler, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  // Super Admin meeting types
  review: { label: "Review Meeting", icon: FileText, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  strategy: { label: "Strategy Meeting", icon: Target, color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
  progress: { label: "Progress Meeting", icon: TrendingUp, color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
}

// Generate calendar days
function generateWeekDays(startDate: Date): Date[] {
  const days: Date[] = []
  const start = new Date(startDate)
  start.setDate(start.getDate() - start.getDay() + 1) // Start from Monday
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(start)
    day.setDate(start.getDate() + i)
    days.push(day)
  }
  return days
}

// Generate time rows for calendar
const calendarHours = [9, 10, 11, 12, 14, 15, 16, 17]

// Generate month days for calendar
function generateMonthDays(date: Date): Date[] {
  const days: Date[] = []
  const year = date.getFullYear()
  const month = date.getMonth()
  
  // Get first day of month and find the Monday of that week
  const firstDay = new Date(year, month, 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)) // Start from Monday
  
  // Generate 42 days (6 weeks) to cover full month view
  for (let i = 0; i < 42; i++) {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + i)
    days.push(day)
  }
  return days
}

export default function AppointmentsPage() {
  const { selectedRole } = useRole()
  const isSuperAdmin = selectedRole === "super_admin"
  
  const [currentWeek, setCurrentWeek] = React.useState(new Date("2026-01-26"))
  const [currentMonth, setCurrentMonth] = React.useState(new Date("2026-01-01"))
  // Use different visits data based on role
  const [visits, setVisits] = React.useState<Visit[]>(isSuperAdmin ? superAdminMeetings : sampleVisits)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false)
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [leadSearchOpen, setLeadSearchOpen] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"week" | "month">("week")
  
  // Update visits when role changes
  React.useEffect(() => {
    setVisits(isSuperAdmin ? superAdminMeetings : sampleVisits)
  }, [isSuperAdmin])
  
  // Form state
  const [visitType, setVisitType] = React.useState<"initial" | "followup" | "measurement">("initial")
  const [selectedDate, setSelectedDate] = React.useState("")
  const [selectedTime, setSelectedTime] = React.useState("")
  const [duration, setDuration] = React.useState("60")
  const [selectedAttendees, setSelectedAttendees] = React.useState<string[]>(["Rahul Sharma"])
  const [meetingPoint, setMeetingPoint] = React.useState<"plot" | "office">("plot")
  const [instructions, setInstructions] = React.useState("")
  const [sendWhatsApp, setSendWhatsApp] = React.useState(true)
  const [sendSMS, setSendSMS] = React.useState(true)
  const [addToCalendar, setAddToCalendar] = React.useState(true)

  const weekDays = generateWeekDays(currentWeek)
  const monthDays = generateMonthDays(currentMonth)

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newDate)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(currentMonth.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentMonth(newDate)
  }

  const navigate = (direction: "prev" | "next") => {
    if (viewMode === "week") {
      navigateWeek(direction)
    } else {
      navigateMonth(direction)
    }
  }

  const getVisitsForDate = (date: Date): Visit[] => {
    const dateKey = formatDateKey(date)
    return visits.filter(v => v.date === dateKey)
  }

  const formatDateKey = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const getVisitsForSlot = (date: Date, hour: number): Visit[] => {
    const dateKey = formatDateKey(date)
    return visits.filter((v) => {
      const visitHour = parseInt(v.startTime.split(":")[0])
      return v.date === dateKey && visitHour === hour
    })
  }

  const handleScheduleVisit = () => {
    if (!selectedLead || !selectedDate || !selectedTime) return
    
    const newVisit: Visit = {
      id: `V${String(visits.length + 1).padStart(3, "0")}`,
      leadName: selectedLead.name,
      leadPhone: selectedLead.phone,
      plotLocation: selectedLead.plotLocation,
      type: visitType,
      date: selectedDate,
      startTime: selectedTime,
      endTime: `${parseInt(selectedTime.split(":")[0]) + parseInt(duration) / 60}:00`,
      duration: parseInt(duration),
      attendees: selectedAttendees,
      meetingPoint,
      instructions,
      status: "scheduled",
    }
    
    setVisits([...visits, newVisit])
    setIsScheduleModalOpen(false)
    setIsConfirmationOpen(true)
    
    // Reset form
    setSelectedLead(null)
    setVisitType("initial")
    setSelectedDate("")
    setSelectedTime("")
    setDuration("60")
    setSelectedAttendees(["Rahul Sharma"])
    setMeetingPoint("plot")
    setInstructions("")
  }

  const toggleAttendee = (name: string) => {
    if (selectedAttendees.includes(name)) {
      setSelectedAttendees(selectedAttendees.filter((a) => a !== name))
    } else {
      setSelectedAttendees([...selectedAttendees, name])
    }
  }

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-120px)] gap-6">
        {/* Left Panel - Calendar View */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">
                {isSuperAdmin ? "Team Meetings" : "Site Visits"}
              </h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {visits.filter((v) => v.status === "scheduled").length} Scheduled
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                  className={viewMode === "week" ? "bg-[hsl(var(--hover-bg))] text-foreground" : "bg-transparent"}
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("month")}
                  className={viewMode === "month" ? "bg-[hsl(var(--hover-bg))] text-foreground" : "bg-transparent"}
                >
                  Month
                </Button>
              </div>
              <Button onClick={() => setIsScheduleModalOpen(true)}>
                <Plus className="size-4 mr-2" />
                {isSuperAdmin ? "Schedule Meeting" : "Schedule Visit"}
              </Button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={() => navigate("prev")} className="bg-transparent">
              <ChevronLeft className="size-4" />
            </Button>
            <h2 className="text-lg font-medium">
              {viewMode === "week" 
                ? weekDays[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })
                : currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })
              }
            </h2>
            <Button variant="outline" size="icon" onClick={() => navigate("next")} className="bg-transparent">
              <ChevronRight className="size-4" />
            </Button>
          </div>

          {/* Week View Calendar Grid */}
          {viewMode === "week" && (
          <Card className="flex-1 overflow-hidden">
            <CardContent className="p-0 h-full overflow-auto">
              <div className="min-w-[800px]">
                {/* Day Headers */}
                <div className="grid grid-cols-8 border-b sticky top-0 bg-card z-10">
                  <div className="p-3 text-center text-sm font-medium text-muted-foreground border-r">
                    Time
                  </div>
                  {weekDays.map((day, i) => {
                    const isToday = formatDateKey(day) === formatDateKey(new Date())
                    return (
                      <div
                        key={i}
                        className={cn(
                          "p-3 text-center border-r last:border-r-0",
                          isToday && "bg-primary/5"
                        )}
                      >
                        <p className="text-xs text-muted-foreground">
                          {day.toLocaleDateString("en-US", { weekday: "short" })}
                        </p>
                        <p className={cn(
                          "text-lg font-semibold",
                          isToday && "text-primary"
                        )}>
                          {day.getDate()}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Time Slots */}
                {calendarHours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
                    <div className="p-2 text-center text-sm text-muted-foreground border-r bg-muted/30">
                      {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
                    </div>
                    {weekDays.map((day, dayIndex) => {
                      const dayVisits = getVisitsForSlot(day, hour)
                      return (
                        <div
                          key={dayIndex}
                          className={cn(
                            "p-1 min-h-[80px] border-r last:border-r-0 hover:bg-muted/30 transition-colors cursor-pointer",
                            formatDateKey(day) === formatDateKey(new Date()) && "bg-primary/5"
                          )}
                          onClick={() => {
                            setSelectedDate(formatDateKey(day))
                            setSelectedTime(`${String(hour).padStart(2, "0")}:00`)
                            setIsScheduleModalOpen(true)
                          }}
                        >
                          {dayVisits.map((visit) => {
                            const config = visitTypeConfig[visit.type]
                            return (
                              <div
                                key={visit.id}
                                className={cn(
                                  "p-2 rounded-lg text-xs mb-1 cursor-pointer hover:opacity-80",
                                  config.color
                                )}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex items-center gap-1 mb-1">
                                  <Home className="size-3" />
                                  <span className="font-medium truncate">{visit.leadName}</span>
                                </div>
                                <p className="text-[10px] opacity-80 truncate">
                                  {visit.startTime} - {visit.attendees[0]}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          )}

          {/* Month View Calendar Grid */}
          {viewMode === "month" && (
          <Card className="flex-1 overflow-hidden">
            <CardContent className="p-4">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Month Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day, i) => {
                  const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
                  const isToday = formatDateKey(day) === formatDateKey(new Date())
                  const dayVisits = getVisitsForDate(day)
                  
                  return (
                    <div
                      key={i}
                      className={cn(
                        "min-h-[100px] p-2 rounded-lg border transition-colors cursor-pointer",
                        isCurrentMonth 
                          ? "bg-card hover:bg-muted/50" 
                          : "bg-muted/20 text-muted-foreground",
                        isToday && "ring-2 ring-primary bg-primary/5"
                      )}
                      onClick={() => {
                        setSelectedDate(formatDateKey(day))
                        setSelectedTime("09:00")
                        setIsScheduleModalOpen(true)
                      }}
                    >
                      <p className={cn(
                        "text-sm font-medium mb-1",
                        isToday && "text-primary"
                      )}>
                        {day.getDate()}
                      </p>
                      
                      {/* Show visits for this day */}
                      <div className="space-y-1">
                        {dayVisits.slice(0, 3).map((visit) => {
                          const config = visitTypeConfig[visit.type]
                          return (
                            <div
                              key={visit.id}
                              className={cn(
                                "px-1.5 py-0.5 rounded text-[10px] truncate",
                                config.color
                              )}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {visit.startTime} - {isSuperAdmin ? visit.role?.split(" - ")[0] : visit.leadName}
                            </div>
                          )
                        })}
                        {dayVisits.length > 3 && (
                          <p className="text-[10px] text-muted-foreground pl-1">
                            +{dayVisits.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            {Object.entries(visitTypeConfig)
              .filter(([key]) => isSuperAdmin ? ["review", "strategy", "progress"].includes(key) : ["initial", "followup", "measurement"].includes(key))
              .map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={cn("size-3 rounded", config.color.split(" ")[0])} />
                <span className="text-sm text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Upcoming Visits/Meetings */}
        <div className="w-[350px] flex-shrink-0">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {isSuperAdmin ? "Upcoming Meetings" : "Upcoming Visits"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-3">
              {visits
                .filter((v) => v.status === "scheduled")
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((visit) => {
                  const config = visitTypeConfig[visit.type]
                  const VisitIcon = config.icon
                  return (
                    <div
                      key={visit.id}
                      className="p-3 rounded-xl border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1.5 rounded-lg", config.color)}>
                            <VisitIcon className="size-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{visit.leadName}</p>
                            <p className="text-xs text-muted-foreground">
                              {isSuperAdmin && visit.role ? visit.role : config.label}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="size-3.5" />
                          <span>
                            {new Date(visit.date).toLocaleDateString("en-IN", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <Clock className="size-3.5" />
                          <span>{visit.startTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="size-3.5" />
                          <span className="truncate">{visit.plotLocation}</span>
                        </div>
                        {isSuperAdmin && visit.city && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="size-3.5" />
                            <span>{visit.city}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="size-3.5" />
                          <span>{visit.attendees.join(", ")}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-transparent">
                          <Phone className="size-3 mr-1" />
                          Call
                        </Button>
                        {isSuperAdmin ? (
                          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-transparent border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950">
                            <Video className="size-3 mr-1" />
                            Join Meeting
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs bg-transparent border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950">
                            <MessageCircle className="size-3 mr-1" />
                            WhatsApp
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Visit Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Site Visit</DialogTitle>
            <DialogDescription>
              Book a site visit with the customer
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Lead Selection */}
            <div className="space-y-2">
              <Label>Select Lead</Label>
              <Popover open={leadSearchOpen} onOpenChange={setLeadSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-start bg-transparent"
                  >
                    {selectedLead ? (
                      <div className="flex items-center gap-2">
                        <User className="size-4" />
                        <span>{selectedLead.name}</span>
                        <span className="text-muted-foreground">- {selectedLead.area}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Search className="size-4" />
                        <span>Search leads...</span>
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search by name or phone..." />
                    <CommandList>
                      <CommandEmpty>No leads found.</CommandEmpty>
                      <CommandGroup>
                        {leads.map((lead) => (
                          <CommandItem
                            key={lead.id}
                            onSelect={() => {
                              setSelectedLead(lead)
                              setLeadSearchOpen(false)
                            }}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{lead.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {lead.phone} • {lead.area}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedLead && (
                <Card className="mt-2">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-4 text-muted-foreground" />
                      <span>{selectedLead.plotLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="size-4 text-muted-foreground" />
                      <span>+91 {selectedLead.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Visit Type */}
            <div className="space-y-2">
              <Label>Visit Type</Label>
              <RadioGroup value={visitType} onValueChange={(v) => setVisitType(v as typeof visitType)}>
                {Object.entries(visitTypeConfig).map(([key, config]) => {
                  const Icon = config.icon
                  return (
                    <div key={key} className="flex items-center space-x-3">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="flex items-center gap-2 cursor-pointer">
                        <Icon className="size-4" />
                        {config.label}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <Label>Time Slot</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className={cn(
                      "relative",
                      selectedTime !== slot.time && "bg-transparent",
                      slot.conflict && "border-yellow-500"
                    )}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.label}
                    {slot.conflict && (
                      <span className="absolute -top-1 -right-1 size-4 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] text-white">
                        !
                      </span>
                    )}
                  </Button>
                ))}
              </div>
              {selectedTime && timeSlots.find((s) => s.time === selectedTime)?.conflict && (
                <p className="text-xs text-yellow-600 flex items-center gap-1">
                  <Bell className="size-3" />
                  {timeSlots.find((s) => s.time === selectedTime)?.conflict}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Attendees */}
            <div className="space-y-2">
              <Label>Attendees</Label>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={member.id}
                      checked={selectedAttendees.includes(member.name)}
                      onCheckedChange={() => toggleAttendee(member.name)}
                    />
                    <Label htmlFor={member.id} className="cursor-pointer">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-muted-foreground text-sm ml-2">({member.role})</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting Point */}
            <div className="space-y-2">
              <Label>Meeting Point</Label>
              <RadioGroup value={meetingPoint} onValueChange={(v) => setMeetingPoint(v as typeof meetingPoint)}>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="plot" id="plot" />
                  <Label htmlFor="plot" className="cursor-pointer">At Plot Location</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="office" id="office" />
                  <Label htmlFor="office" className="cursor-pointer">Office First, Then Plot</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <Label>Special Instructions</Label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Customer will come with father. Bring portfolio and cost sheet."
                rows={3}
              />
            </div>

            {/* Notifications */}
            <div className="space-y-3">
              <Label>Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="whatsapp"
                    checked={sendWhatsApp}
                    onCheckedChange={(checked) => setSendWhatsApp(checked as boolean)}
                  />
                  <Label htmlFor="whatsapp" className="cursor-pointer">
                    Send WhatsApp confirmation
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="sms"
                    checked={sendSMS}
                    onCheckedChange={(checked) => setSendSMS(checked as boolean)}
                  />
                  <Label htmlFor="sms" className="cursor-pointer">
                    Send SMS reminder (1 day before)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="calendar"
                    checked={addToCalendar}
                    onCheckedChange={(checked) => setAddToCalendar(checked as boolean)}
                  />
                  <Label htmlFor="calendar" className="cursor-pointer">
                    Add to Google Calendar
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleScheduleVisit} disabled={!selectedLead || !selectedDate || !selectedTime}>
              Schedule Visit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Confirmation Preview */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="size-5 text-green-600" />
              WhatsApp Confirmation Preview
            </DialogTitle>
          </DialogHeader>

          <Card className="bg-[#DCF8C6] border-green-200">
            <CardContent className="p-4 text-sm space-y-3">
              <p>Dear {selectedLead?.name || "Customer"},</p>
              <p>Your site visit is confirmed! ✓</p>
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  Date: {selectedDate ? new Date(selectedDate).toLocaleDateString("en-IN", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  }) : ""}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="size-4" />
                  Time: {selectedTime} - {parseInt(selectedTime?.split(":")[0] || "0") + 1}:00
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  Location: {selectedLead?.plotLocation}
                </p>
              </div>
              <p>
                Our representative {selectedAttendees[0] || "will"} will meet you at the site.
              </p>
              <p>
                Please reply YES to confirm or call us to reschedule.
              </p>
              <p className="text-muted-foreground">- Team Wehouse</p>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmationOpen(false)} className="bg-transparent">
              Edit
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setIsConfirmationOpen(false)}
            >
              <MessageCircle className="size-4 mr-2" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
