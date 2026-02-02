"use client"

import * as React from "react"
import Image from "next/image"
import { CheckCircle2, ChevronRight, AlertCircle, MessageSquare, Search, ImageIcon, Sparkles, TrendingUp, AlertTriangle, Clock } from "lucide-react"
import { useAI } from "@/lib/ai-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { RaiseTicketModal, ReviewModal } from "@/components/customer/milestone-modals"

interface Subtask {
  id: string
  name: string
  status: "completed" | "in-progress" | "pending"
  images?: string[]
}

interface AIInsight {
  predictedCompletion: string
  daysVariance: number
  trend: "ahead" | "on-track" | "delayed"
  reason: string
  confidence: number
}

interface Milestone {
  id: string
  number: number
  name: string
  status: "completed" | "in-progress" | "pending"
  etc: string
  subtasks: Subtask[]
  aiInsight?: AIInsight
}

// Flat list of all milestones - matching site engineer data
const milestones: Milestone[] = [
  { 
    id: "m1", number: 1, name: "Survey", status: "completed", etc: "Apr 4, 2025",
    subtasks: [
      { id: "m1-1", name: "Site visit", status: "completed", images: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"
      ]},
      { id: "m1-2", name: "Site cleaning", status: "completed", images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=300&fit=crop"
      ]},
      { id: "m1-3", name: "Total station survey", status: "completed", images: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
      ]},
      { id: "m1-4", name: "Survey report", status: "completed", images: [
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"
      ]},
    ]
  },
  { 
    id: "m2", number: 2, name: "Preliminary Work", status: "completed", etc: "Apr 11, 2025",
    subtasks: [
      { id: "m2-1", name: "Pooja pit", status: "completed", images: [
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop"
      ]},
      { id: "m2-2", name: "Soil test", status: "completed", images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
      ]},
      { id: "m2-3", name: "Electrical meter", status: "completed", images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
      ]},
      { id: "m2-4", name: "Bore", status: "completed", images: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
      ]},
      { id: "m2-5", name: "Bore Motor", status: "completed", images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
      ]},
    ]
  },
  { 
    id: "m3", number: 3, name: "Excavation", status: "completed", etc: "Apr 14, 2025",
    subtasks: [
      { id: "m3-1", name: "Site cleaning", status: "completed", images: [
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=300&fit=crop"
      ]},
      { id: "m3-2", name: "Survey for footing marking", status: "completed", images: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"
      ]},
      { id: "m3-3", name: "Excavation", status: "completed", images: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"
      ]},
      { id: "m3-4", name: "Dressing", status: "completed", images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
      ]},
      { id: "m3-5", name: "Drawings", status: "completed", images: [
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"
      ]},
    ]
  },
  { 
    id: "m4", number: 4, name: "Sub-Structure", status: "completed", etc: "May 19, 2025",
    subtasks: [
      { id: "m4-1", name: "PCC", status: "completed", images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"]},
      { id: "m4-2", name: "Marking", status: "completed", images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"]},
      { id: "m4-3", name: "Footing", status: "completed", images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"]},
      { id: "m4-4", name: "Column", status: "completed", images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"]},
      { id: "m4-5", name: "Plinth Beam", status: "completed", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"]},
      { id: "m4-6", name: "Backfilling", status: "completed", images: ["https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=300&fit=crop"]},
      { id: "m4-7", name: "Curing", status: "completed", images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"]},
      { id: "m4-8", name: "Sump Works", status: "completed", images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop"]},
    ]
  },
  { 
    id: "m5", number: 5, name: "Super-Structure", status: "completed", etc: "Jun 13, 2025",
    subtasks: [
      { id: "m5-1", name: "Column", status: "completed", images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"]},
      { id: "m5-2", name: "Beam & Slab", status: "completed", images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"]},
      { id: "m5-3", name: "Staircase", status: "completed", images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"]},
      { id: "m5-4", name: "Staircase works", status: "completed", images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"]},
      { id: "m5-5", name: "Curing", status: "completed", images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"]},
      { id: "m5-6", name: "Drawings", status: "completed", images: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"]},
    ]
  },
  { 
    id: "m6", number: 6, name: "Bricks Work", status: "completed", etc: "Jun 23, 2025",
    subtasks: [
      { id: "m6-1", name: "BW Marking", status: "completed", images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"]},
      { id: "m6-2", name: "Window Position & Sizes", status: "completed", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"]},
      { id: "m6-3", name: "Door Frame Fixing", status: "completed", images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"]},
      { id: "m6-4", name: "Curing", status: "completed", images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"]},
      { id: "m6-5", name: "Wall Electrical Conduiting", status: "completed", images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop"]},
      { id: "m6-6", name: "Drawings", status: "completed", images: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"]},
    ]
  },
  { 
    id: "m7", number: 7, name: "Plaster", status: "completed", etc: "Aug 2, 2025",
    subtasks: [
      { id: "m7-1", name: "1st Coat Plastering", status: "completed", images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"]},
      { id: "m7-2", name: "2nd Coat Plastering", status: "completed", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"]},
      { id: "m7-3", name: "Scaffolding", status: "completed", images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"]},
      { id: "m7-4", name: "External Plastering works", status: "completed", images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"]},
      { id: "m7-5", name: "Curing", status: "completed", images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"]},
    ]
  },
  { 
    id: "m8", number: 8, name: "Elevation", status: "completed", etc: "Aug 7, 2025",
    subtasks: [
      { id: "m8-1", name: "Plan", status: "completed", images: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"]},
      { id: "m8-2", name: "Marking", status: "completed", images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"]},
      { id: "m8-3", name: "Elevation Plastering", status: "completed", images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"]},
      { id: "m8-4", name: "Elevation elements provision", status: "completed", images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"]},
      { id: "m8-5", name: "Drawings", status: "completed", images: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"]},
    ]
  },
  { 
    id: "m9", number: 9, name: "Plumbing", status: "in-progress", etc: "Aug 12, 2025",
    aiInsight: { predictedCompletion: "Aug 10, 2025", daysVariance: -2, trend: "ahead", reason: "Good progress on pipe fittings. Expected to complete 2 days early.", confidence: 88 },
    subtasks: [
      { id: "m9-1", name: "UVC, CPVC Pipe Fittings", status: "completed", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"]},
      { id: "m9-2", name: "Drainage line", status: "completed", images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"]},
      { id: "m9-3", name: "Mainline connection", status: "in-progress" },
      { id: "m9-4", name: "Drawings", status: "pending" },
    ]
  },
  { 
    id: "m10", number: 10, name: "Internal Painting", status: "in-progress", etc: "Aug 17, 2025",
    aiInsight: { predictedCompletion: "Aug 22, 2025", daysVariance: 5, trend: "delayed", reason: "Painting work delayed due to humidity. 5 extra days needed for proper drying.", confidence: 82 },
    subtasks: [
      { id: "m10-1", name: "Putty", status: "completed", images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"]},
      { id: "m10-2", name: "Painting", status: "in-progress" },
      { id: "m10-3", name: "1st Coat Putty", status: "pending" },
      { id: "m10-4", name: "2nd Coat Putty", status: "pending" },
      { id: "m10-5", name: "Sanding/ Paper coat", status: "pending" },
    ]
  },
  { 
    id: "m11", number: 11, name: "Electrical Wiring", status: "completed", etc: "Aug 22, 2025",
    subtasks: [
      { id: "m11-1", name: "Purchase", status: "completed", images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop"]},
      { id: "m11-2", name: "Wiring works", status: "completed", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"]},
    ]
  },
  { 
    id: "m12", number: 12, name: "Flooring", status: "completed", etc: "Aug 30, 2025",
    subtasks: [
      { id: "m12-1", name: "Electrical line", status: "completed", images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"]},
      { id: "m12-2", name: "Plumbing line", status: "completed", images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"]},
      { id: "m12-3", name: "Level", status: "completed", images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"]},
      { id: "m12-4", name: "Laying", status: "completed", images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"]},
    ]
  },
  { 
    id: "m13", number: 13, name: "Windows", status: "completed", etc: "Sep 3, 2025",
    subtasks: [
      { id: "m13-1", name: "Measurement", status: "completed", images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"]},
      { id: "m13-2", name: "Procurement", status: "completed", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"]},
      { id: "m13-3", name: "Install", status: "completed", images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"]},
      { id: "m13-4", name: "Glass", status: "completed", images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop"]},
      { id: "m13-5", name: "Mosquito mesh", status: "completed", images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"]},
    ]
  },
  { id: "m14", number: 14, name: "Doors", status: "pending", etc: "Sep 7, 2025", 
    aiInsight: { predictedCompletion: "Sep 7, 2025", daysVariance: 0, trend: "on-track", reason: "Door materials already ordered. On schedule for timely completion.", confidence: 90 },
    subtasks: [
    { id: "m14-1", name: "Measurement", status: "pending" },
    { id: "m14-2", name: "Door Fixing", status: "pending" },
    { id: "m14-3", name: "Door Install", status: "pending" },
    { id: "m14-4", name: "Hardware", status: "pending" },
  ]},
  { id: "m15", number: 15, name: "Sanitary Fixtures", status: "pending", etc: "Sep 15, 2025", 
    aiInsight: { predictedCompletion: "Sep 18, 2025", daysVariance: 3, trend: "delayed", reason: "Sanitary material delivery delayed by vendor. Minor 3-day impact expected.", confidence: 85 },
    subtasks: [
    { id: "m15-1", name: "Sanitary Purchase", status: "pending" },
    { id: "m15-2", name: "Sanitary Install", status: "pending" },
    { id: "m15-3", name: "Overhead Tank works", status: "pending" },
  ]},
  { id: "m16", number: 16, name: "Painting", status: "pending", etc: "Sep 25, 2025", 
    aiInsight: { predictedCompletion: "Sep 23, 2025", daysVariance: -2, trend: "ahead", reason: "Painting crew available. Can start early once internal painting completes.", confidence: 78 },
    subtasks: [
    { id: "m16-1", name: "Primer & texture", status: "pending" },
    { id: "m16-2", name: "Primary coat", status: "pending" },
    { id: "m16-3", name: "Secondary", status: "pending" },
    { id: "m16-4", name: "Door Frame and Gola paints", status: "pending" },
  ]},
  { id: "m17", number: 17, name: "Switch Gears", status: "pending", etc: "Sep 29, 2025", subtasks: [
    { id: "m17-1", name: "Switch", status: "pending" },
    { id: "m17-2", name: "Socket", status: "pending" },
    { id: "m17-3", name: "Wiring", status: "pending" },
    { id: "m17-4", name: "DB connection", status: "pending" },
    { id: "m17-5", name: "Main line connection", status: "pending" },
    { id: "m17-6", name: "Plate fixing", status: "pending" },
  ]},
  { id: "m18", number: 18, name: "External Flooring", status: "pending", etc: "Oct 4, 2025", subtasks: [
    { id: "m18-1", name: "Floor Levelling", status: "pending" },
    { id: "m18-2", name: "Set Back PCC", status: "pending" },
    { id: "m18-3", name: "Parking flooring", status: "pending" },
    { id: "m18-4", name: "Terrace waterproofing", status: "pending" },
  ]},
  { id: "m19", number: 19, name: "Compound Wall", status: "pending", etc: "Oct 22, 2025", subtasks: [
    { id: "m19-1", name: "Excavation", status: "pending" },
    { id: "m19-2", name: "CR Test", status: "pending" },
    { id: "m19-3", name: "Backfill", status: "pending" },
    { id: "m19-4", name: "Plaster", status: "pending" },
    { id: "m19-5", name: "Selta columns", status: "pending" },
    { id: "m19-6", name: "Ramp Works", status: "pending" },
  ]},
  { id: "m20", number: 20, name: "Fabrication", status: "pending", etc: "Oct 27, 2025", subtasks: [
    { id: "m20-1", name: "MS works", status: "pending" },
    { id: "m20-2", name: "SS railing works", status: "pending" },
  ]},
  { id: "m21", number: 21, name: "Rain Water Harvesting", status: "pending", etc: "Oct 29, 2025", subtasks: [
    { id: "m21-1", name: "Pit provision", status: "pending" },
  ]},
  { id: "m22", number: 22, name: "Inspection", status: "pending", etc: "Oct 30, 2025", subtasks: [
    { id: "m22-1", name: "Deep Cleaning", status: "pending" },
    { id: "m22-2", name: "Plumbing Leakage Checks", status: "pending" },
    { id: "m22-3", name: "Electrical Checks", status: "pending" },
    { id: "m22-4", name: "Doors and Windows Check", status: "pending" },
    { id: "m22-5", name: "Painting Touch-ups", status: "pending" },
  ]},
  { id: "m23", number: 23, name: "Hardware Material", status: "pending", etc: "Oct 31, 2025", subtasks: [
    { id: "m23-1", name: "Hinges", status: "pending" },
    { id: "m23-2", name: "Lock", status: "pending" },
    { id: "m23-3", name: "Kit drop", status: "pending" },
    { id: "m23-4", name: "Tower bolt", status: "pending" },
    { id: "m23-5", name: "Door stopper", status: "pending" },
    { id: "m23-6", name: "Screws", status: "pending" },
    { id: "m23-7", name: "Door handle", status: "pending" },
  ]},
  { id: "m24", number: 24, name: "Handover", status: "pending", etc: "Oct 31, 2025", subtasks: [
    { id: "m24-1", name: "Handover", status: "pending" },
  ]},
]

export default function CustomerProgressPage() {
  const { aiEnabled } = useAI()
  const [selectedMilestone, setSelectedMilestone] = React.useState<Milestone>(milestones[0])
  const [expandedSubtask, setExpandedSubtask] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  
  // Modal states
  const [ticketModalOpen, setTicketModalOpen] = React.useState(false)
  const [reviewModalOpen, setReviewModalOpen] = React.useState(false)
  const [selectedSubtask, setSelectedSubtask] = React.useState<string>("")
  const [selectedSubtaskId, setSelectedSubtaskId] = React.useState<string>("")
  
  // Track actions
  const [raisedTickets, setRaisedTickets] = React.useState<Set<string>>(new Set())
  const [submittedReviews, setSubmittedReviews] = React.useState<Set<string>>(new Set())

  // Filter milestones based on search
  const filteredMilestones = React.useMemo(() => {
    if (!searchQuery.trim()) return milestones
    return milestones.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Calculate overall progress
  const totalMilestones = milestones.length
  const completedMilestones = milestones.filter(m => m.status === "completed").length
  const inProgressMilestones = milestones.filter(m => m.status === "in-progress").length
  const pendingMilestones = milestones.filter(m => m.status === "pending").length
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100)

  // Action handlers
  const handleRaiseTicket = (subtaskId: string, subtaskName: string) => {
    setSelectedSubtaskId(subtaskId)
    setSelectedSubtask(subtaskName)
    setTicketModalOpen(true)
  }

  const handleReview = (subtaskId: string, subtaskName: string) => {
    setSelectedSubtaskId(subtaskId)
    setSelectedSubtask(subtaskName)
    setReviewModalOpen(true)
  }

  const handleTicketSuccess = () => {
    setRaisedTickets(prev => new Set(prev).add(selectedSubtaskId))
  }

  const handleReviewSuccess = () => {
    setSubmittedReviews(prev => new Set(prev).add(selectedSubtaskId))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with overall progress */}
      <div className="bg-card border-b px-4 py-4">
        <h1 className="text-xl font-bold mb-1">Milestones</h1>
        <p className="text-sm text-muted-foreground mb-4">Track your home construction progress</p>
        
        {/* Overall Progress Card */}
        <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">Overall Progress</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">{overallProgress}% Complete</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full bg-emerald-500" />
                  <span className="text-foreground">Completed: {completedMilestones}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full bg-amber-500" />
                  <span className="text-foreground">In Progress: {inProgressMilestones}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="text-foreground">Pending: {pendingMilestones}</span>
                </div>
              </div>
            </div>
            <Progress value={overallProgress} className="h-2 mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Side by Side Layout (40% / 60%) on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-220px)]">
        {/* Left Panel - Milestones List (40% on desktop, full on mobile) */}
        <div className="w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r bg-card flex flex-col max-h-[40vh] lg:max-h-full">
          <div className="p-3 border-b">
            <h2 className="text-sm font-bold mb-2">Milestones</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search for Milestone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3">
            {/* Milestones with connecting line */}
            <div className="relative">
              {filteredMilestones.map((milestone, index) => {
                const isSelected = selectedMilestone.id === milestone.id
                const completedSubtasks = milestone.subtasks.filter(s => s.status === "completed").length
                const totalSubtasks = milestone.subtasks.length
                const progressPercent = Math.round((completedSubtasks / totalSubtasks) * 100)
                const isLast = index === filteredMilestones.length - 1
                
                return (
                  <div key={milestone.id} className="relative flex gap-3 pb-3">
                    {/* Timeline - Dot and Connecting Line */}
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "size-3.5 rounded-full shrink-0 z-10 ring-2 ring-background",
                        milestone.status === "completed" 
                          ? "bg-emerald-500" 
                          : milestone.status === "in-progress"
                            ? "bg-[#f6a404]"
                            : "bg-slate-300 dark:bg-slate-600"
                      )} />
                      {!isLast && (
                        <div className={cn(
                          "w-0.5 flex-1 min-h-[100px]",
                          milestone.status === "completed" 
                            ? "bg-emerald-400" 
                            : "bg-slate-200 dark:bg-slate-700"
                        )} />
                      )}
                    </div>
                    
                    {/* Milestone Card */}
                    <Card 
                      className={cn(
                        "flex-1 cursor-pointer transition-all hover:shadow-md",
                        isSelected 
                          ? "ring-2 ring-[#f6a404] border-[#f6a404]" 
                          : "border-border"
                      )}
                      onClick={() => setSelectedMilestone(milestone)}
                    >
                      <CardContent className="p-3">
                        {/* Milestone Name + Status at Top */}
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-bold">{milestone.name}</p>
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "text-[10px] shrink-0",
                              milestone.status === "completed" 
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                                : milestone.status === "in-progress"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                                  : "bg-muted text-muted-foreground"
                            )}
                          >
                            {milestone.status === "completed" ? "Completed" : milestone.status === "in-progress" ? "In Progress" : "Pending"}
                          </Badge>
                        </div>
                        
                        {/* Progress Bar */}
                        <Progress value={progressPercent} className="h-1.5 mb-3" />
                        
                        {/* Milestone Number and ETC */}
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[10px] text-muted-foreground">Milestone</p>
                            <p className="text-xl font-bold">{milestone.number}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-muted-foreground">ETC</p>
                            <p className="text-sm font-medium">{milestone.etc.replace(", 2025", "")} <span className="text-muted-foreground">2025</span></p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Tasks (60% on desktop, full on mobile) */}
        <div className="w-full lg:w-3/5 bg-card flex flex-col flex-1">
          <div className="p-3 border-b">
            <h2 className="text-sm font-bold">{selectedMilestone.name} - Tasks</h2>
            
            {/* AI Prediction Card - Only visible when AI is enabled */}
            {aiEnabled && selectedMilestone.aiInsight && (
              <div className={cn(
                "mt-3 p-3 rounded-lg border",
                selectedMilestone.aiInsight.trend === "ahead" 
                  ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800"
                  : selectedMilestone.aiInsight.trend === "delayed"
                    ? "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
                    : "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className={cn(
                    "size-4",
                    selectedMilestone.aiInsight.trend === "ahead" 
                      ? "text-emerald-600 dark:text-emerald-400"
                      : selectedMilestone.aiInsight.trend === "delayed"
                        ? "text-red-600 dark:text-red-400"
                        : "text-blue-600 dark:text-blue-400"
                  )} />
                  <Badge variant="outline" className="ml-auto text-[9px] h-5">
                    {selectedMilestone.aiInsight.confidence}% confidence
                  </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    {selectedMilestone.aiInsight.trend === "ahead" ? (
                      <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
                    ) : selectedMilestone.aiInsight.trend === "delayed" ? (
                      <AlertTriangle className="size-4 text-red-600 dark:text-red-400" />
                    ) : (
                      <Clock className="size-4 text-blue-600 dark:text-blue-400" />
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Predicted Completion</p>
                      <p className="text-sm font-bold">{selectedMilestone.aiInsight.predictedCompletion}</p>
                    </div>
                  </div>
                  
                  {selectedMilestone.aiInsight.daysVariance !== 0 && (
                    <Badge className={cn(
                      "text-[10px] h-5",
                      selectedMilestone.aiInsight.trend === "ahead" 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
                    )}>
                      {selectedMilestone.aiInsight.daysVariance < 0 
                        ? `${Math.abs(selectedMilestone.aiInsight.daysVariance)} days ahead`
                        : `${selectedMilestone.aiInsight.daysVariance} days delayed`}
                    </Badge>
                  )}
                  
                  {selectedMilestone.aiInsight.daysVariance === 0 && (
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 text-[10px] h-5">
                      On schedule
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">{selectedMilestone.aiInsight.reason}</p>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {selectedMilestone.subtasks.map((subtask, index) => {
              const isExpanded = expandedSubtask === subtask.id
              
              return (
                <div 
                  key={subtask.id} 
                  className={cn(
                    "rounded-lg border transition-all",
                    subtask.status === "completed"
                      ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800/30"
                      : subtask.status === "in-progress"
                        ? "bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30"
                        : "bg-card border-border"
                  )}
                >
                  {/* Subtask Header */}
                  <div 
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => setExpandedSubtask(isExpanded ? null : subtask.id)}
                  >
                    <div className="flex items-center gap-3">
                      {subtask.status === "completed" && (
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                      )}
                      <span className="text-sm font-medium">{index + 1}. {subtask.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Action buttons inline on desktop for completed tasks */}
                      {subtask.status === "completed" && (
                        <div className="hidden sm:flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className={cn(
                              "h-6 text-[10px] px-2 transition-colors bg-transparent",
                              raisedTickets.has(subtask.id)
                                ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                                : "border-border hover:bg-muted hover:text-foreground"
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRaiseTicket(subtask.id, subtask.name)
                            }}
                            disabled={raisedTickets.has(subtask.id)}
                          >
                            <AlertCircle className="size-3 mr-1" />
                            {raisedTickets.has(subtask.id) ? "Ticket Raised" : "Raise Ticket"}
                          </Button>
                          <Button
                            size="sm"
                            className={cn(
                              "h-6 text-[10px] px-2 transition-colors",
                              submittedReviews.has(subtask.id)
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : "bg-[#f6a404] hover:bg-[#e09503] text-white"
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleReview(subtask.id, subtask.name)
                            }}
                          >
                            <MessageSquare className="size-3 mr-1" />
                            {submittedReviews.has(subtask.id) ? "Edit Review" : "Review"}
                          </Button>
                        </div>
                      )}
                      <Badge 
                        className={cn(
                          "text-[10px] px-2.5 py-0.5",
                          subtask.status === "completed"
                            ? "bg-lime-400 hover:bg-lime-400 text-lime-900 dark:bg-lime-500 dark:text-lime-950 border-0"
                            : subtask.status === "in-progress"
                              ? "bg-amber-400 hover:bg-amber-400 text-amber-900 dark:bg-amber-500 dark:text-amber-950 border-0"
                              : "bg-muted hover:bg-muted text-muted-foreground border-0"
                        )}
                      >
                        {subtask.status === "completed" ? "Done" : subtask.status === "in-progress" ? "In Progress" : "Pending"}
                      </Badge>
                      <ChevronRight className={cn(
                        "size-4 text-muted-foreground transition-transform shrink-0",
                        isExpanded && "rotate-90"
                      )} />
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-3 pb-3 space-y-3 border-t">
                      {/* Mobile Action Buttons for completed tasks */}
                      {subtask.status === "completed" && (
                        <div className="flex sm:hidden gap-2 pt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className={cn(
                              "flex-1 h-8 text-xs transition-colors bg-transparent",
                              raisedTickets.has(subtask.id)
                                ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                                : "border-border hover:bg-muted hover:text-foreground"
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRaiseTicket(subtask.id, subtask.name)
                            }}
                            disabled={raisedTickets.has(subtask.id)}
                          >
                            <AlertCircle className="size-3.5 mr-1.5" />
                            {raisedTickets.has(subtask.id) ? "Ticket Raised" : "Raise Ticket"}
                          </Button>
                          <Button
                            size="sm"
                            className={cn(
                              "flex-1 h-8 text-xs transition-colors",
                              submittedReviews.has(subtask.id)
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : "bg-[#f6a404] hover:bg-[#e09503] text-white"
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleReview(subtask.id, subtask.name)
                            }}
                          >
                            <MessageSquare className="size-3.5 mr-1.5" />
                            {submittedReviews.has(subtask.id) ? "Edit Review" : "Review"}
                          </Button>
                        </div>
                      )}

                      {/* Site Photos Gallery */}
                      {subtask.status === "completed" && subtask.images && subtask.images.length > 0 && (
                        <div className="pt-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <ImageIcon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                              Site Photos ({subtask.images.length})
                            </span>
                          </div>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {subtask.images.map((img, idx) => (
                              <div 
                                key={idx} 
                                className="relative shrink-0 w-20 h-16 rounded-md overflow-hidden border border-emerald-200 dark:border-emerald-800 shadow-sm group cursor-pointer"
                              >
                                <Image
                                  src={img || "/placeholder.svg"}
                                  alt={`${subtask.name} - Photo ${idx + 1}`}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-110"
                                  unoptimized
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Empty state for non-completed tasks */}
                      {subtask.status !== "completed" && (
                        <div className="pt-3 text-center text-xs text-muted-foreground">
                          {subtask.status === "in-progress" 
                            ? "This task is currently in progress. Photos will be available once completed."
                            : "This task has not started yet."}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <RaiseTicketModal
        open={ticketModalOpen}
        onOpenChange={setTicketModalOpen}
        subtaskName={selectedSubtask}
        onSubmitSuccess={handleTicketSuccess}
      />
      <ReviewModal
        open={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        subtaskName={selectedSubtask}
        onSubmitSuccess={handleReviewSuccess}
      />
    </div>
  )
}
