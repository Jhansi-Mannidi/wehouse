"use client"

import * as React from "react"
import { format, addDays, isSameDay, isToday, isBefore, startOfToday, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import {
  Calendar as CalendarIcon,
  List,
  Plus,
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Phone,
  MapPin,
  FileText,
  MessageSquare,
  MoreHorizontal,
  X,
  Repeat,
  Bell,
  ChevronLeft,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// Types
interface Task {
  id: string
  title: string
  description?: string
  type: "follow_up_call" | "site_visit" | "send_quote" | "send_document" | "meeting" | "other"
  leadId: string
  leadName: string
  leadCode: string
  dueDate: string
  dueTime: string
  priority: "high" | "medium" | "low"
  assignedTo: string
  status: "pending" | "completed" | "cancelled"
  reminder?: boolean
  recurring?: boolean
  createdAt: string
}

interface Lead {
  id: string
  name: string
  code: string
  phone: string
}

// Task type config
const taskTypes = [
  { value: "follow_up_call", label: "Follow-up Call", icon: Phone },
  { value: "site_visit", label: "Site Visit", icon: MapPin },
  { value: "send_quote", label: "Send Quote", icon: FileText },
  { value: "send_document", label: "Send Document", icon: FileText },
  { value: "meeting", label: "Meeting", icon: MessageSquare },
  { value: "other", label: "Other", icon: CheckCircle2 },
]

// Priority config
const priorityConfig = {
  high: { label: "High", color: "bg-red-500", textColor: "text-red-600", badgeClass: "bg-red-100 text-red-700 border-red-200", borderColor: "border-l-red-500" },
  medium: { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-600", badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-200", borderColor: "border-l-yellow-500" },
  low: { label: "Low", color: "bg-green-500", textColor: "text-green-600", badgeClass: "bg-green-100 text-green-700 border-green-200", borderColor: "border-l-green-500" },
}

// Sample leads for search
const sampleLeads: Lead[] = [
  { id: "L001", name: "Rajesh Kumar", code: "WH-HYD-2026-00234", phone: "+91 98765 43210" },
  { id: "L002", name: "Sunitha Reddy", code: "WH-HYD-2026-00235", phone: "+91 98765 43211" },
  { id: "L003", name: "Anil Sharma", code: "WH-BLR-2026-00189", phone: "+91 98765 43212" },
  { id: "L004", name: "Meena Kumari", code: "WH-HYD-2026-00236", phone: "+91 98765 43213" },
  { id: "L005", name: "Venkat Rao", code: "WH-HYD-2026-00237", phone: "+91 98765 43214" },
  { id: "L006", name: "Ravi Teja", code: "WH-BLR-2026-00190", phone: "+91 98765 43215" },
  { id: "L007", name: "Priya Nair", code: "WH-HYD-2026-00238", phone: "+91 98765 43216" },
]

// Sample tasks
const sampleTasks: Task[] = [
  {
    id: "T001",
    title: "Schedule site visit",
    description: "Client wants to see the plot in Kondapur",
    type: "site_visit",
    leadId: "L001",
    leadName: "Rajesh Kumar",
    leadCode: "WH-HYD-2026-00234",
    dueDate: format(addDays(new Date(), -1), "yyyy-MM-dd"),
    dueTime: "17:00",
    priority: "high",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-25",
  },
  {
    id: "T002",
    title: "Follow-up call - no answer",
    description: "Client didn't answer previous calls, try again",
    type: "follow_up_call",
    leadId: "L002",
    leadName: "Sunitha Reddy",
    leadCode: "WH-HYD-2026-00235",
    dueDate: "2026-01-24",
    dueTime: "14:00",
    priority: "high",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-23",
  },
  {
    id: "T003",
    title: "Send revised quote",
    description: "Client requested changes to the quote",
    type: "follow_up_call",
    leadId: "L001",
    leadName: "Rajesh Kumar",
    leadCode: "WH-HYD-2026-00234",
    dueDate: format(addDays(new Date(), -2), "yyyy-MM-dd"),
    dueTime: "11:00",
    priority: "high",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-22",
  },
  {
    id: "T004",
    title: "Send quote document",
    description: "Prepare and send detailed quote for 3BHK villa",
    type: "send_quote",
    leadId: "L003",
    leadName: "Anil Sharma",
    leadCode: "WH-BLR-2026-00189",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    dueTime: "15:00",
    priority: "medium",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
  {
    id: "T005",
    title: "Send project portfolio",
    description: "Share completed projects portfolio",
    type: "send_document",
    leadId: "L004",
    leadName: "Meena Kumari",
    leadCode: "WH-HYD-2026-00236",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    dueTime: "17:00",
    priority: "low",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
  {
    id: "T006",
    title: "Initial consultation call",
    description: "Discuss requirements and budget",
    type: "follow_up_call",
    leadId: "L005",
    leadName: "Venkat Rao",
    leadCode: "WH-HYD-2026-00237",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    dueTime: "11:00",
    priority: "medium",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
  {
    id: "T007",
    title: "Budget discussion meeting",
    description: "Finalize budget and payment terms",
    type: "meeting",
    leadId: "L003",
    leadName: "Anil Sharma",
    leadCode: "WH-BLR-2026-00189",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    dueTime: "14:00",
    priority: "high",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
  {
    id: "T008",
    title: "Share floor plans",
    description: "Email floor plan options",
    type: "send_document",
    leadId: "L002",
    leadName: "Sunitha Reddy",
    leadCode: "WH-HYD-2026-00235",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    dueTime: "16:00",
    priority: "low",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
  {
    id: "T009",
    title: "Follow-up call",
    description: "Check if client reviewed the quote",
    type: "follow_up_call",
    leadId: "L005",
    leadName: "Venkat Rao",
    leadCode: "WH-HYD-2026-00237",
    dueDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    dueTime: "10:00",
    priority: "medium",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
  {
    id: "T010",
    title: "Site visit prep",
    description: "Prepare documents for site visit",
    type: "site_visit",
    leadId: "L006",
    leadName: "Ravi Teja",
    leadCode: "WH-BLR-2026-00190",
    dueDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    dueTime: "14:00",
    priority: "medium",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
  {
    id: "T011",
    title: "Quote follow-up",
    description: "Follow up on sent quote",
    type: "follow_up_call",
    leadId: "L007",
    leadName: "Priya Nair",
    leadCode: "WH-HYD-2026-00238",
    dueDate: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    dueTime: "11:00",
    priority: "low",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
  {
    id: "T012",
    title: "Contract discussion",
    description: "Discuss contract terms",
    type: "meeting",
    leadId: "L004",
    leadName: "Meena Kumari",
    leadCode: "WH-HYD-2026-00236",
    dueDate: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    dueTime: "15:00",
    priority: "high",
    assignedTo: "Me",
    status: "pending",
    createdAt: "2026-01-26",
  },
]

// Completed tasks for today
const completedToday = 8

// Team members for assignment
const teamMembers = [
  { value: "me", label: "Me (Rahul Sharma)" },
  { value: "priya", label: "Priya Menon" },
  { value: "amit", label: "Amit Patel" },
  { value: "neha", label: "Neha Singh" },
]

// Task Card Component
function TaskCard({
  task,
  onComplete,
  onReschedule,
  onViewLead,
}: {
  task: Task
  onComplete: (id: string) => void
  onReschedule: (id: string) => void
  onViewLead: (leadId: string) => void
}) {
  const priorityInfo = priorityConfig[task.priority]
  const taskType = taskTypes.find(t => t.value === task.type)
  const TaskIcon = taskType?.icon || CheckCircle2

  const isOverdue = isBefore(new Date(`${task.dueDate}T${task.dueTime}`), new Date()) && task.status === "pending"
  const isDueToday = isToday(new Date(task.dueDate))

  const formatDueDate = () => {
    const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`)
    if (isOverdue) {
      const daysDiff = Math.floor((new Date().getTime() - dueDateTime.getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff === 0) return `Today, ${format(dueDateTime, "h:mm a")}`
      if (daysDiff === 1) return `Yesterday, ${format(dueDateTime, "h:mm a")}`
      return `${format(dueDateTime, "MMM d")}, ${format(dueDateTime, "h:mm a")}`
    }
    if (isDueToday) return `Today, ${format(dueDateTime, "h:mm a")}`
    return `${format(dueDateTime, "MMM d")}, ${format(dueDateTime, "h:mm a")}`
  }

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      "bg-card border-border border-l-4",
      isOverdue ? priorityConfig.high.borderColor : priorityInfo.borderColor
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <Checkbox
            className="mt-1 size-5"
            onCheckedChange={() => onComplete(task.id)}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={cn(
                  "text-xs font-bold px-2.5 py-0.5 border-0 shadow-sm",
                  priorityInfo.badgeClass
                )}>
                  {priorityInfo.label.toUpperCase()}
                </Badge>
                <h4 className="font-semibold text-sm text-foreground">{task.title}</h4>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8 hover:bg-muted">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onComplete(task.id)}>
                    <CheckCircle2 className="size-4 mr-2" />
                    Mark Complete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onReschedule(task.id)}>
                    <CalendarIcon className="size-4 mr-2" />
                    Reschedule
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onViewLead(task.leadId)}>
                    <ChevronRight className="size-4 mr-2" />
                    View Lead
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-muted-foreground mb-2.5 font-medium">
              Lead: <span className="text-foreground">{task.leadName}</span> <span className="text-muted-foreground/70">({task.leadCode})</span>
            </p>

            <div className="flex items-center gap-4 text-xs">
              <span className={cn(
                "flex items-center gap-1.5 font-medium",
                isOverdue ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
              )}>
                <Clock className="size-3.5" />
                Due: {formatDueDate()}
              </span>
              <span className="text-muted-foreground">Assigned: <span className="font-medium text-foreground">{task.assignedTo}</span></span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Compact Task Item for Upcoming Section
function UpcomingTaskItem({
  task,
  onClick,
}: {
  task: Task
  onClick: () => void
}) {
  const taskType = taskTypes.find(t => t.value === task.type)
  const TaskIcon = taskType?.icon || CheckCircle2
  const priorityInfo = priorityConfig[task.priority]

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
    >
      <div className={cn("size-2 rounded-full flex-shrink-0", priorityInfo.color)} />
      <TaskIcon className="size-4 text-muted-foreground flex-shrink-0" />
      <span className="flex-1 text-sm truncate">{task.title} - {task.leadName}</span>
      <span className="text-xs text-muted-foreground flex-shrink-0">
        {format(new Date(`${task.dueDate}T${task.dueTime}`), "h:mm a")}
      </span>
    </button>
  )
}

// Calendar Day Cell
function CalendarDayCell({
  date,
  tasks,
  isSelected,
  onClick,
}: {
  date: Date
  tasks: Task[]
  isSelected: boolean
  onClick: () => void
}) {
  const dayTasks = tasks.filter(t => isSameDay(new Date(t.dueDate), date))
  const today = isToday(date)

  return (
    <button
      onClick={onClick}
      className={cn(
        "h-24 p-1 border-r border-b text-left transition-colors hover:bg-muted/50",
        isSelected && "bg-primary/5 ring-2 ring-primary ring-inset",
        today && "bg-primary/10"
      )}
    >
      <div className={cn(
        "text-sm font-medium mb-1 px-1",
        today && "text-primary"
      )}>
        {format(date, "d")}
      </div>
      <div className="space-y-0.5 overflow-hidden">
        {dayTasks.slice(0, 3).map(task => {
          const priorityInfo = priorityConfig[task.priority]
          return (
            <div
              key={task.id}
              className={cn(
                "text-[10px] px-1 py-0.5 rounded truncate",
                priorityInfo.badgeClass
              )}
            >
              {format(new Date(`${task.dueDate}T${task.dueTime}`), "h:mm")} {task.title}
            </div>
          )
        })}
        {dayTasks.length > 3 && (
          <div className="text-[10px] text-muted-foreground px-1">
            +{dayTasks.length - 3} more
          </div>
        )}
      </div>
    </button>
  )
}

export default function TasksPage() {
  const [viewMode, setViewMode] = React.useState<"list" | "calendar">("list")
  const [tasks, setTasks] = React.useState<Task[]>(sampleTasks)
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [filterPeriod, setFilterPeriod] = React.useState("this_week")
  const [filterPriority, setFilterPriority] = React.useState("all")
  const [showCreateModal, setShowCreateModal] = React.useState(false)
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null)
  const [calendarDate, setCalendarDate] = React.useState(new Date())

  // Create task form state
  const [newTask, setNewTask] = React.useState({
    type: "follow_up_call",
    leadId: "",
    title: "",
    description: "",
    dueDate: new Date(),
    dueTime: "10:00",
    priority: "medium" as "high" | "medium" | "low",
    assignedTo: "me",
    reminder: false,
    recurring: false,
  })
  const [leadSearchOpen, setLeadSearchOpen] = React.useState(false)
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)

  // Filter tasks
  const today = startOfToday()
  const pendingTasks = tasks.filter(t => t.status === "pending")

  const overdueTasks = pendingTasks.filter(t =>
    isBefore(new Date(`${t.dueDate}T${t.dueTime}`), today)
  )

  const dueTodayTasks = pendingTasks.filter(t =>
    isToday(new Date(t.dueDate)) && !isBefore(new Date(`${t.dueDate}T${t.dueTime}`), today)
  )

  const upcomingTasks = pendingTasks.filter(t =>
    !isBefore(new Date(t.dueDate), today) && !isToday(new Date(t.dueDate))
  ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  // Group upcoming tasks by date
  const groupedUpcoming = upcomingTasks.reduce((acc, task) => {
    const dateKey = task.dueDate
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  // Calendar week
  const weekStart = startOfWeek(calendarDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(calendarDate, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Handlers
  const handleComplete = (taskId: string) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, status: "completed" as const } : t
    ))
  }

  const handleReschedule = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      setSelectedTask(task)
    }
  }

  const handleViewLead = (leadId: string) => {
    // Navigate to lead detail
    window.location.href = `/crm/leads/${leadId}`
  }

  const handleCreateTask = () => {
    if (!selectedLead || !newTask.title) return

    const task: Task = {
      id: `T${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      type: newTask.type as Task["type"],
      leadId: selectedLead.id,
      leadName: selectedLead.name,
      leadCode: selectedLead.code,
      dueDate: format(newTask.dueDate, "yyyy-MM-dd"),
      dueTime: newTask.dueTime,
      priority: newTask.priority,
      assignedTo: teamMembers.find(m => m.value === newTask.assignedTo)?.label || "Me",
      status: "pending",
      reminder: newTask.reminder,
      recurring: newTask.recurring,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    }

    setTasks(prev => [...prev, task])
    setShowCreateModal(false)
    resetForm()
  }

  const resetForm = () => {
    setNewTask({
      type: "follow_up_call",
      leadId: "",
      title: "",
      description: "",
      dueDate: new Date(),
      dueTime: "10:00",
      priority: "medium",
      assignedTo: "me",
      reminder: false,
      recurring: false,
    })
    setSelectedLead(null)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">My Tasks</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your daily tasks and follow-ups
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center border border-border/50 rounded-lg p-1 bg-muted/30">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-8 text-xs",
                  viewMode === "list" ? "bg-[hsl(var(--hover-bg))] text-foreground hover:bg-[hsl(var(--hover-bg))]/80" : "bg-transparent"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="size-4 mr-1.5" />
                List View
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-8 text-xs",
                  viewMode === "calendar" ? "bg-[hsl(var(--hover-bg))] text-foreground hover:bg-[hsl(var(--hover-bg))]/80" : "bg-transparent"
                )}
                onClick={() => setViewMode("calendar")}
              >
                <CalendarIcon className="size-4 mr-1.5" />
                Calendar View
              </Button>
            </div>

            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-[hsl(var(--hover-bg))] text-foreground hover:bg-[hsl(var(--hover-bg))]/80 shadow-sm"
            >
              <Plus className="size-4 mr-1.5" />
              Create Task
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Bar - Clean Cards with Soft Badge Colors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overdue Card */}
          <Card className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shadow-sm">
                <AlertCircle className="size-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{overdueTasks.length}</p>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">Overdue</p>
              </div>
            </CardContent>
          </Card>

          {/* Due Today Card */}
          <Card className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="size-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shadow-sm">
                <Clock className="size-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{dueTodayTasks.length}</p>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">Due Today</p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Card */}
          <Card className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-sm">
                <CalendarIcon className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{upcomingTasks.length}</p>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">Upcoming</p>
              </div>
            </CardContent>
          </Card>

          {/* Completed Today Card */}
          <Card className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{completedToday}</p>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">Completed Today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content based on view mode */}
        {viewMode === "list" ? (
          <div className="space-y-8">
            {/* Overdue Section */}
            {overdueTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30">
                    <AlertCircle className="size-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">
                    Overdue ({overdueTasks.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {overdueTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TaskCard
                        task={task}
                        onComplete={handleComplete}
                        onReschedule={handleReschedule}
                        onViewLead={handleViewLead}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Due Today Section */}
            {dueTodayTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <Clock className="size-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">
                    Due Today ({dueTodayTasks.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {dueTodayTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TaskCard
                        task={task}
                        onComplete={handleComplete}
                        onReschedule={handleReschedule}
                        onViewLead={handleViewLead}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Section */}
            {Object.keys(groupedUpcoming).length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="size-5 text-green-500" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Upcoming (This Week)
                  </h2>
                </div>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {Object.entries(groupedUpcoming).slice(0, 5).map(([date, dateTasks]) => {
                      const dateObj = new Date(date)
                      const isNextDay = isSameDay(dateObj, addDays(new Date(), 1))
                      const dateLabel = isNextDay
                        ? "Tomorrow"
                        : format(dateObj, "MMM d (EEEE)")

                      return (
                        <div key={date}>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">
                            {dateLabel}
                          </h3>
                          <div className="space-y-1 pl-2 border-l-2 border-muted">
                            {dateTasks.map(task => (
                              <UpcomingTaskItem
                                key={task.id}
                                task={task}
                                onClick={() => setSelectedTask(task)}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ) : (
          /* Calendar View */
          <Card>
            <CardContent className="p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {format(calendarDate, "MMMM yyyy")}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 bg-transparent"
                    onClick={() => setCalendarDate(addDays(calendarDate, -7))}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCalendarDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 bg-transparent"
                    onClick={() => setCalendarDate(addDays(calendarDate, 7))}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Week Header */}
              <div className="grid grid-cols-7 border-l border-t">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-r border-b bg-muted/30">
                    {day}
                  </div>
                ))}
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 border-l">
                {weekDays.map(date => (
                  <CalendarDayCell
                    key={date.toISOString()}
                    date={date}
                    tasks={tasks}
                    isSelected={isSameDay(date, calendarDate)}
                    onClick={() => setCalendarDate(date)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Task Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Task Type */}
              <div className="space-y-2">
                <Label>Task Type</Label>
                <Select value={newTask.type} onValueChange={v => setNewTask(prev => ({ ...prev, type: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {taskTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="size-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Lead Search */}
              <div className="space-y-2">
                <Label>Lead</Label>
                <Popover open={leadSearchOpen} onOpenChange={setLeadSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent"
                    >
                      <Search className="size-4 mr-2 text-muted-foreground" />
                      {selectedLead ? (
                        <span>{selectedLead.name} ({selectedLead.code})</span>
                      ) : (
                        <span className="text-muted-foreground">Search lead...</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[350px]" align="start">
                    <Command>
                      <CommandInput placeholder="Search by name or code..." />
                      <CommandList>
                        <CommandEmpty>No leads found.</CommandEmpty>
                        <CommandGroup>
                          {sampleLeads.map(lead => (
                            <CommandItem
                              key={lead.id}
                              value={`${lead.name} ${lead.code}`}
                              onSelect={() => {
                                setSelectedLead(lead)
                                setLeadSearchOpen(false)
                              }}
                            >
                              <div>
                                <p className="font-medium">{lead.name}</p>
                                <p className="text-xs text-muted-foreground">{lead.code}</p>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Add details..."
                  value={newTask.description}
                  onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Due Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="size-4 mr-2" />
                        {format(newTask.dueDate, "MMM d, yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newTask.dueDate}
                        onSelect={date => date && setNewTask(prev => ({ ...prev, dueDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Due Time</Label>
                  <Select value={newTask.dueTime} onValueChange={v => setNewTask(prev => ({ ...prev, dueTime: v }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0")
                        return (
                          <React.Fragment key={hour}>
                            <SelectItem value={`${hour}:00`}>{format(new Date(`2026-01-01T${hour}:00`), "h:mm a")}</SelectItem>
                            <SelectItem value={`${hour}:30`}>{format(new Date(`2026-01-01T${hour}:30`), "h:mm a")}</SelectItem>
                          </React.Fragment>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="flex items-center gap-4">
                  {(["high", "medium", "low"] as const).map(priority => {
                    const config = priorityConfig[priority]
                    return (
                      <label key={priority} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={newTask.priority === priority}
                          onChange={() => setNewTask(prev => ({ ...prev, priority }))}
                          className="sr-only"
                        />
                        <div className={cn(
                          "size-4 rounded-full border-2 flex items-center justify-center",
                          newTask.priority === priority ? "border-primary" : "border-muted"
                        )}>
                          {newTask.priority === priority && (
                            <div className={cn("size-2 rounded-full", config.color)} />
                          )}
                        </div>
                        <span className={cn(
                          "text-sm",
                          newTask.priority === priority ? "font-medium" : "text-muted-foreground"
                        )}>
                          {config.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Assign To */}
              <div className="space-y-2">
                <Label>Assign To</Label>
                <Select value={newTask.assignedTo} onValueChange={v => setNewTask(prev => ({ ...prev, assignedTo: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map(member => (
                      <SelectItem key={member.value} value={member.value}>
                        {member.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={newTask.reminder}
                    onCheckedChange={checked => setNewTask(prev => ({ ...prev, reminder: !!checked }))}
                  />
                  <Bell className="size-4 text-muted-foreground" />
                  <span className="text-sm">Set reminder 30 min before</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={newTask.recurring}
                    onCheckedChange={checked => setNewTask(prev => ({ ...prev, recurring: !!checked }))}
                  />
                  <Repeat className="size-4 text-muted-foreground" />
                  <span className="text-sm">Recurring task</span>
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask} disabled={!selectedLead || !newTask.title}>
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
