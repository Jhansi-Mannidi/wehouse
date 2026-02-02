// Milestone Status Types
export type MilestoneStatus = 
  | "locked"           // Payment pending
  | "unlocked"         // Payment received, ready to start
  | "in_progress"      // Work ongoing
  | "completed"        // Work done, awaiting review
  | "reviewed"         // Work done and customer reviewed

export type PaymentStatus = "pending" | "paid" | "overdue"

export type ReviewStatus = "pending" | "submitted"

// Step within a milestone
export interface MilestoneStep {
  id: string
  name: string
  description?: string
  duration: string
  progress: number
  status: "locked" | "pending" | "in_progress" | "completed"
}

// Customer Review
export interface MilestoneReview {
  id: string
  overallRating: number  // 1-5
  aspectRatings?: {
    workQuality: number
    timeliness: number
    cleanliness: number
    communication: number
    materialQuality: number
  }
  description: string
  photos?: string[]
  reviewerName: string
  reviewDate: string
}

// Payment Information
export interface MilestonePayment {
  amount: number
  gst: number
  total: number
  paidDate?: string
  status: PaymentStatus
}

// Complete Milestone Interface
export interface Milestone {
  id: string
  number: number
  name: string
  description: string
  phase: string
  plannedStart: string
  plannedEnd: string
  actualStart?: string
  actualEnd?: string
  status: MilestoneStatus
  progress: number
  duration: string
  steps: MilestoneStep[]
  payment: MilestonePayment
  review?: MilestoneReview
  workersRequired?: string
  materials?: {
    name: string
    quantity: string
    estimatedCost: string
  }[]
}

// Project with milestones
export interface Project {
  id: string
  customerName: string
  projectType: string
  location: string
  area: string
  totalValue: number
  paidAmount: number
  pendingAmount: number
  completedMilestones: number
  totalMilestones: number
  progress: number
  status: "on_track" | "at_risk" | "delayed"
  milestones: Milestone[]
}

// Ticket Types
export type TicketType = 
  | "quality_issue"
  | "work_delay"
  | "payment_query"
  | "material_concern"
  | "safety_issue"
  | "communication_problem"
  | "general_question"
  | "other"

export type TicketPriority = "low" | "medium" | "high" | "urgent"

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed"

export interface Ticket {
  id: string
  type: TicketType
  priority: TicketPriority
  status: TicketStatus
  subject: string
  description: string
  relatedMilestone?: string
  photos?: string[]
  createdAt: string
  updatedAt: string
  resolution?: string
}

// Change Request Types
export type ChangeRequestType = 
  | "material_change"
  | "design_change"
  | "scope_addition"
  | "scope_reduction"
  | "timeline_change"

export type ChangeRequestStatus = 
  | "submitted"
  | "under_review"
  | "estimate_pending"
  | "approved"
  | "rejected"
  | "implemented"

export interface ChangeRequest {
  id: string
  type: ChangeRequestType
  status: ChangeRequestStatus
  relatedMilestone: string
  currentSpec: string
  requestedChange: string
  reason: string
  estimatedCostImpact?: string
  estimatedTimeImpact?: string
  createdAt: string
  updatedAt: string
}

// Mock Data - 24 Construction Milestones
export const mockMilestones: Milestone[] = [
  // Phase 1: Foundation (M1-M3)
  {
    id: "m1",
    number: 1,
    name: "Site Preparation",
    description: "Site clearing, leveling, boundary marking, and layout",
    phase: "Foundation",
    plannedStart: "Nov 1, 2025",
    plannedEnd: "Nov 5, 2025",
    actualStart: "Nov 1, 2025",
    actualEnd: "Nov 5, 2025",
    status: "reviewed",
    progress: 100,
    duration: "5 days",
    steps: [
      { id: "s1-1", name: "Site Clearing", duration: "1 day", progress: 100, status: "completed" },
      { id: "s1-2", name: "Leveling", duration: "2 days", progress: 100, status: "completed" },
      { id: "s1-3", name: "Boundary Marking", duration: "1 day", progress: 100, status: "completed" },
      { id: "s1-4", name: "Layout", duration: "1 day", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 150000,
      gst: 27000,
      total: 177000,
      paidDate: "Nov 1, 2025",
      status: "paid",
    },
    review: {
      id: "r1",
      overallRating: 5,
      aspectRatings: {
        workQuality: 5,
        timeliness: 5,
        cleanliness: 5,
        communication: 5,
        materialQuality: 5,
      },
      description: "Excellent work! Site was cleared quickly and boundary marking was precise. The team was professional and completed ahead of schedule.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Nov 6, 2025",
    },
  },
  {
    id: "m2",
    number: 2,
    name: "PCC & Foundation",
    description: "Plain cement concrete and foundation layout work",
    phase: "Foundation",
    plannedStart: "Nov 6, 2025",
    plannedEnd: "Nov 15, 2025",
    actualStart: "Nov 6, 2025",
    actualEnd: "Nov 16, 2025",
    status: "reviewed",
    progress: 100,
    duration: "10 days",
    steps: [
      { id: "s2-1", name: "PCC Bed Preparation", duration: "2 days", progress: 100, status: "completed" },
      { id: "s2-2", name: "PCC Laying", duration: "2 days", progress: 100, status: "completed" },
      { id: "s2-3", name: "Foundation Excavation", duration: "3 days", progress: 100, status: "completed" },
      { id: "s2-4", name: "Foundation Reinforcement", duration: "2 days", progress: 100, status: "completed" },
      { id: "s2-5", name: "Foundation Casting", duration: "1 day", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 350000,
      gst: 63000,
      total: 413000,
      paidDate: "Nov 5, 2025",
      status: "paid",
    },
    review: {
      id: "r2",
      overallRating: 4,
      aspectRatings: {
        workQuality: 5,
        timeliness: 3,
        cleanliness: 4,
        communication: 4,
        materialQuality: 5,
      },
      description: "Good foundation work. Minor delay in completion due to rain but quality is excellent.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Nov 16, 2025",
    },
  },
  {
    id: "m3",
    number: 3,
    name: "Plinth Beam",
    description: "Reinforcement and beam casting for plinth level",
    phase: "Foundation",
    plannedStart: "Nov 16, 2025",
    plannedEnd: "Nov 22, 2025",
    actualStart: "Nov 17, 2025",
    actualEnd: "Nov 23, 2025",
    status: "reviewed",
    progress: 100,
    duration: "7 days",
    steps: [
      { id: "s3-1", name: "Beam Formwork", duration: "2 days", progress: 100, status: "completed" },
      { id: "s3-2", name: "Reinforcement Binding", duration: "2 days", progress: 100, status: "completed" },
      { id: "s3-3", name: "Concrete Casting", duration: "1 day", progress: 100, status: "completed" },
      { id: "s3-4", name: "Curing", duration: "2 days", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 280000,
      gst: 50400,
      total: 330400,
      paidDate: "Nov 16, 2025",
      status: "paid",
    },
    review: {
      id: "r3",
      overallRating: 5,
      aspectRatings: {
        workQuality: 5,
        timeliness: 5,
        cleanliness: 5,
        communication: 5,
        materialQuality: 5,
      },
      description: "Excellent plinth beam work. Team maintained high quality standards.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Nov 24, 2025",
    },
  },
  // Phase 2: Structure (M4-M11)
  {
    id: "m4",
    number: 4,
    name: "Ground Floor Columns",
    description: "Column reinforcement and casting for ground floor",
    phase: "Structure",
    plannedStart: "Nov 23, 2025",
    plannedEnd: "Nov 30, 2025",
    actualStart: "Nov 24, 2025",
    actualEnd: "Dec 1, 2025",
    status: "reviewed",
    progress: 100,
    duration: "8 days",
    steps: [
      { id: "s4-1", name: "Column Layout", duration: "1 day", progress: 100, status: "completed" },
      { id: "s4-2", name: "Reinforcement Binding", duration: "3 days", progress: 100, status: "completed" },
      { id: "s4-3", name: "Formwork Installation", duration: "2 days", progress: 100, status: "completed" },
      { id: "s4-4", name: "Concrete Casting", duration: "1 day", progress: 100, status: "completed" },
      { id: "s4-5", name: "Curing", duration: "1 day", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 320000,
      gst: 57600,
      total: 377600,
      paidDate: "Nov 23, 2025",
      status: "paid",
    },
    review: {
      id: "r4",
      overallRating: 4,
      description: "Good column work with proper alignment.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Dec 2, 2025",
    },
  },
  {
    id: "m5",
    number: 5,
    name: "Ground Floor Slab",
    description: "Slab formwork, reinforcement and casting",
    phase: "Structure",
    plannedStart: "Dec 1, 2025",
    plannedEnd: "Dec 10, 2025",
    actualStart: "Dec 2, 2025",
    actualEnd: "Dec 11, 2025",
    status: "reviewed",
    progress: 100,
    duration: "10 days",
    steps: [
      { id: "s5-1", name: "Scaffolding & Formwork", duration: "3 days", progress: 100, status: "completed" },
      { id: "s5-2", name: "Slab Reinforcement", duration: "3 days", progress: 100, status: "completed" },
      { id: "s5-3", name: "Electrical Conduits", duration: "1 day", progress: 100, status: "completed" },
      { id: "s5-4", name: "Concrete Casting", duration: "1 day", progress: 100, status: "completed" },
      { id: "s5-5", name: "Curing", duration: "2 days", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 450000,
      gst: 81000,
      total: 531000,
      paidDate: "Dec 1, 2025",
      status: "paid",
    },
    review: {
      id: "r5",
      overallRating: 5,
      description: "Excellent slab work. Proper level maintained throughout.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Dec 12, 2025",
    },
  },
  {
    id: "m6",
    number: 6,
    name: "First Floor Columns",
    description: "Column reinforcement and casting for first floor",
    phase: "Structure",
    plannedStart: "Dec 11, 2025",
    plannedEnd: "Dec 18, 2025",
    actualStart: "Dec 12, 2025",
    actualEnd: "Dec 19, 2025",
    status: "reviewed",
    progress: 100,
    duration: "8 days",
    steps: [
      { id: "s6-1", name: "Column Layout", duration: "1 day", progress: 100, status: "completed" },
      { id: "s6-2", name: "Reinforcement Binding", duration: "3 days", progress: 100, status: "completed" },
      { id: "s6-3", name: "Formwork Installation", duration: "2 days", progress: 100, status: "completed" },
      { id: "s6-4", name: "Concrete Casting", duration: "1 day", progress: 100, status: "completed" },
      { id: "s6-5", name: "Curing", duration: "1 day", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 300000,
      gst: 54000,
      total: 354000,
      paidDate: "Dec 11, 2025",
      status: "paid",
    },
    review: {
      id: "r6",
      overallRating: 4,
      description: "Good work on first floor columns.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Dec 20, 2025",
    },
  },
  {
    id: "m7",
    number: 7,
    name: "First Floor Slab",
    description: "Slab formwork, reinforcement and casting",
    phase: "Structure",
    plannedStart: "Dec 19, 2025",
    plannedEnd: "Dec 28, 2025",
    actualStart: "Dec 20, 2025",
    actualEnd: "Dec 29, 2025",
    status: "reviewed",
    progress: 100,
    duration: "10 days",
    steps: [
      { id: "s7-1", name: "Scaffolding & Formwork", duration: "3 days", progress: 100, status: "completed" },
      { id: "s7-2", name: "Slab Reinforcement", duration: "3 days", progress: 100, status: "completed" },
      { id: "s7-3", name: "Electrical Conduits", duration: "1 day", progress: 100, status: "completed" },
      { id: "s7-4", name: "Concrete Casting", duration: "1 day", progress: 100, status: "completed" },
      { id: "s7-5", name: "Curing", duration: "2 days", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 420000,
      gst: 75600,
      total: 495600,
      paidDate: "Dec 19, 2025",
      status: "paid",
    },
    review: {
      id: "r7",
      overallRating: 5,
      description: "Excellent quality slab with proper finish.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Dec 30, 2025",
    },
  },
  {
    id: "m8",
    number: 8,
    name: "Second Floor Columns",
    description: "Column reinforcement and casting for second floor",
    phase: "Structure",
    plannedStart: "Dec 29, 2025",
    plannedEnd: "Jan 5, 2026",
    actualStart: "Dec 30, 2025",
    actualEnd: "Jan 6, 2026",
    status: "reviewed",
    progress: 100,
    duration: "8 days",
    steps: [
      { id: "s8-1", name: "Column Layout", duration: "1 day", progress: 100, status: "completed" },
      { id: "s8-2", name: "Reinforcement Binding", duration: "3 days", progress: 100, status: "completed" },
      { id: "s8-3", name: "Formwork Installation", duration: "2 days", progress: 100, status: "completed" },
      { id: "s8-4", name: "Concrete Casting", duration: "1 day", progress: 100, status: "completed" },
      { id: "s8-5", name: "Curing", duration: "1 day", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 280000,
      gst: 50400,
      total: 330400,
      paidDate: "Dec 29, 2025",
      status: "paid",
    },
    review: {
      id: "r8",
      overallRating: 5,
      description: "Great work on second floor columns.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Jan 7, 2026",
    },
  },
  {
    id: "m9",
    number: 9,
    name: "Second Floor Slab",
    description: "Slab formwork, reinforcement and casting",
    phase: "Structure",
    plannedStart: "Jan 6, 2026",
    plannedEnd: "Jan 15, 2026",
    actualStart: "Jan 7, 2026",
    actualEnd: "Jan 16, 2026",
    status: "reviewed",
    progress: 100,
    duration: "10 days",
    steps: [
      { id: "s9-1", name: "Scaffolding & Formwork", duration: "3 days", progress: 100, status: "completed" },
      { id: "s9-2", name: "Slab Reinforcement", duration: "3 days", progress: 100, status: "completed" },
      { id: "s9-3", name: "Electrical Conduits", duration: "1 day", progress: 100, status: "completed" },
      { id: "s9-4", name: "Concrete Casting", duration: "1 day", progress: 100, status: "completed" },
      { id: "s9-5", name: "Curing", duration: "2 days", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 400000,
      gst: 72000,
      total: 472000,
      paidDate: "Jan 6, 2026",
      status: "paid",
    },
    review: {
      id: "r9",
      overallRating: 5,
      description: "Perfect execution of second floor slab.",
      reviewerName: "Rajesh Kumar",
      reviewDate: "Jan 17, 2026",
    },
  },
  {
    id: "m10",
    number: 10,
    name: "Brickwork",
    description: "External and internal wall brickwork",
    phase: "Structure",
    plannedStart: "Jan 5, 2026",
    plannedEnd: "Jan 15, 2026",
    actualStart: "Jan 5, 2026",
    actualEnd: "Jan 14, 2026",
    status: "completed",
    progress: 100,
    duration: "10 days",
    steps: [
      { id: "s10-1", name: "External Walls - Ground Floor", duration: "2 days", progress: 100, status: "completed" },
      { id: "s10-2", name: "External Walls - First Floor", duration: "2 days", progress: 100, status: "completed" },
      { id: "s10-3", name: "External Walls - Second Floor", duration: "2 days", progress: 100, status: "completed" },
      { id: "s10-4", name: "Internal Walls - Ground Floor", duration: "1.5 days", progress: 100, status: "completed" },
      { id: "s10-5", name: "Internal Walls - First Floor", duration: "1.5 days", progress: 100, status: "completed" },
      { id: "s10-6", name: "Internal Walls - Second Floor", duration: "1 day", progress: 100, status: "completed" },
    ],
    payment: {
      amount: 550000,
      gst: 99000,
      total: 649000,
      paidDate: "Jan 5, 2026",
      status: "paid",
    },
    // No review yet - awaiting customer review
  },
  // Phase 3: Finishing (M11-M24)
  {
    id: "m11",
    number: 11,
    name: "Internal Plastering",
    description: "Internal wall and ceiling plastering for all floors",
    phase: "Finishing",
    plannedStart: "Jan 15, 2026",
    plannedEnd: "Jan 30, 2026",
    actualStart: "Jan 15, 2026",
    status: "in_progress",
    progress: 65,
    duration: "15 days",
    steps: [
      { id: "s11-1", name: "Living Room Plastering", duration: "2 days", progress: 100, status: "completed" },
      { id: "s11-2", name: "Bedroom 1 Plastering", duration: "2 days", progress: 100, status: "completed" },
      { id: "s11-3", name: "Bedroom 2 Plastering", duration: "2 days", progress: 70, status: "in_progress" },
      { id: "s11-4", name: "Bedroom 3 Plastering", duration: "2 days", progress: 0, status: "pending" },
      { id: "s11-5", name: "Kitchen Plastering", duration: "2 days", progress: 0, status: "pending" },
      { id: "s11-6", name: "Bathroom Plastering (3)", duration: "3 days", progress: 0, status: "pending" },
    ],
    payment: {
      amount: 420000,
      gst: 75600,
      total: 495600,
      paidDate: "Jan 10, 2026",
      status: "paid",
    },
    workersRequired: "8 plasterers, 4 helpers",
  },
  {
    id: "m12",
    number: 12,
    name: "External Plastering",
    description: "External wall plastering and finish coat",
    phase: "Finishing",
    plannedStart: "Feb 1, 2026",
    plannedEnd: "Feb 12, 2026",
    status: "unlocked",
    progress: 0,
    duration: "12 days",
    steps: [
      { id: "s12-1", name: "Scaffolding Setup", duration: "2 days", progress: 0, status: "pending" },
      { id: "s12-2", name: "Surface Preparation", duration: "2 days", progress: 0, status: "pending" },
      { id: "s12-3", name: "Base Coat Application", duration: "3 days", progress: 0, status: "pending" },
      { id: "s12-4", name: "Finish Coat Application", duration: "3 days", progress: 0, status: "pending" },
      { id: "s12-5", name: "Curing", duration: "2 days", progress: 0, status: "pending" },
    ],
    payment: {
      amount: 380000,
      gst: 68400,
      total: 448400,
      paidDate: "Jan 20, 2026",
      status: "paid",
    },
    workersRequired: "6 plasterers, 4 helpers",
  },
  {
    id: "m13",
    number: 13,
    name: "Electrical First Fix",
    description: "Conduit installation, wiring, switch boxes, DB box, earthing",
    phase: "Finishing",
    plannedStart: "Feb 10, 2026",
    plannedEnd: "Feb 20, 2026",
    status: "locked",
    progress: 0,
    duration: "10 days",
    steps: [
      { id: "s13-1", name: "Conduit Layout Planning", description: "Mark conduit routes on walls and ceiling", duration: "1 day", progress: 0, status: "locked" },
      { id: "s13-2", name: "Conduit Installation", description: "Cut channels in walls for concealed wiring", duration: "3 days", progress: 0, status: "locked" },
      { id: "s13-3", name: "Switch Board Box Fixing", description: "Install modular switch boxes", duration: "2 days", progress: 0, status: "locked" },
      { id: "s13-4", name: "Wire Pulling", description: "Pull electrical wires through conduits", duration: "2 days", progress: 0, status: "locked" },
      { id: "s13-5", name: "DB Box Installation", description: "Install main distribution box with MCBs", duration: "1 day", progress: 0, status: "locked" },
      { id: "s13-6", name: "Earthing Work", description: "Dig earthing pit and install electrode", duration: "1 day", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 350000,
      gst: 63000,
      total: 413000,
      status: "pending",
    },
    workersRequired: "4 electricians, 2 helpers",
    materials: [
      { name: "PVC Conduit (25mm)", quantity: "200 meters", estimatedCost: "12,000" },
      { name: "Electrical Wire (4mm)", quantity: "500 meters", estimatedCost: "35,000" },
      { name: "Switch Boxes", quantity: "45 nos", estimatedCost: "9,000" },
      { name: "Junction Boxes", quantity: "20 nos", estimatedCost: "4,000" },
      { name: "DB Box (12 way)", quantity: "1 no", estimatedCost: "3,500" },
    ],
  },
  {
    id: "m14",
    number: 14,
    name: "Plumbing First Fix",
    description: "Water supply lines, drainage, fitting points",
    phase: "Finishing",
    plannedStart: "Feb 18, 2026",
    plannedEnd: "Feb 26, 2026",
    status: "locked",
    progress: 0,
    duration: "8 days",
    steps: [
      { id: "s14-1", name: "Water Line Planning", duration: "1 day", progress: 0, status: "locked" },
      { id: "s14-2", name: "CPVC Pipe Installation", duration: "2 days", progress: 0, status: "locked" },
      { id: "s14-3", name: "Drainage Pipe Installation", duration: "2 days", progress: 0, status: "locked" },
      { id: "s14-4", name: "Fitting Point Marking", duration: "1 day", progress: 0, status: "locked" },
      { id: "s14-5", name: "Pressure Testing", duration: "1 day", progress: 0, status: "locked" },
      { id: "s14-6", name: "Documentation", duration: "1 day", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 280000,
      gst: 50400,
      total: 330400,
      status: "pending",
    },
    workersRequired: "3 plumbers, 2 helpers",
  },
  {
    id: "m15",
    number: 15,
    name: "Flooring - Tiles",
    description: "Floor tiles, wall tiles, grouting for all areas",
    phase: "Finishing",
    plannedStart: "Feb 27, 2026",
    plannedEnd: "Mar 10, 2026",
    status: "locked",
    progress: 0,
    duration: "12 days",
    steps: [
      { id: "s15-1", name: "Floor Leveling", duration: "2 days", progress: 0, status: "locked" },
      { id: "s15-2", name: "Living & Dining Tiles", duration: "2 days", progress: 0, status: "locked" },
      { id: "s15-3", name: "Bedroom Tiles", duration: "3 days", progress: 0, status: "locked" },
      { id: "s15-4", name: "Kitchen Tiles", duration: "2 days", progress: 0, status: "locked" },
      { id: "s15-5", name: "Bathroom Tiles", duration: "2 days", progress: 0, status: "locked" },
      { id: "s15-6", name: "Grouting & Finishing", duration: "1 day", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 520000,
      gst: 93600,
      total: 613600,
      status: "pending",
    },
    workersRequired: "6 tile workers, 2 helpers",
  },
  {
    id: "m16",
    number: 16,
    name: "Electrical Second Fix",
    description: "Switches, sockets, fan installation, DB wiring",
    phase: "Finishing",
    plannedStart: "Mar 11, 2026",
    plannedEnd: "Mar 18, 2026",
    status: "locked",
    progress: 0,
    duration: "8 days",
    steps: [
      { id: "s16-1", name: "Switch & Socket Installation", duration: "3 days", progress: 0, status: "locked" },
      { id: "s16-2", name: "Fan Hook & Wiring", duration: "2 days", progress: 0, status: "locked" },
      { id: "s16-3", name: "DB Wiring & Connection", duration: "2 days", progress: 0, status: "locked" },
      { id: "s16-4", name: "Testing & Certification", duration: "1 day", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 250000,
      gst: 45000,
      total: 295000,
      status: "pending",
    },
  },
  {
    id: "m17",
    number: 17,
    name: "Plumbing Second Fix",
    description: "Sanitary fittings, taps, faucets installation",
    phase: "Finishing",
    plannedStart: "Mar 19, 2026",
    plannedEnd: "Mar 25, 2026",
    status: "locked",
    progress: 0,
    duration: "7 days",
    steps: [
      { id: "s17-1", name: "WC Installation", duration: "2 days", progress: 0, status: "locked" },
      { id: "s17-2", name: "Wash Basin Installation", duration: "1 day", progress: 0, status: "locked" },
      { id: "s17-3", name: "Kitchen Sink Installation", duration: "1 day", progress: 0, status: "locked" },
      { id: "s17-4", name: "Tap & Faucet Fitting", duration: "2 days", progress: 0, status: "locked" },
      { id: "s17-5", name: "Final Testing", duration: "1 day", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 180000,
      gst: 32400,
      total: 212400,
      status: "pending",
    },
  },
  {
    id: "m18",
    number: 18,
    name: "Painting - Interior",
    description: "Putty, primer, and paint for all interior walls",
    phase: "Finishing",
    plannedStart: "Mar 26, 2026",
    plannedEnd: "Apr 5, 2026",
    status: "locked",
    progress: 0,
    duration: "10 days",
    steps: [
      { id: "s18-1", name: "Wall Preparation", duration: "2 days", progress: 0, status: "locked" },
      { id: "s18-2", name: "Putty Application", duration: "2 days", progress: 0, status: "locked" },
      { id: "s18-3", name: "Primer Coat", duration: "2 days", progress: 0, status: "locked" },
      { id: "s18-4", name: "First Paint Coat", duration: "2 days", progress: 0, status: "locked" },
      { id: "s18-5", name: "Final Paint Coat", duration: "2 days", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 360000,
      gst: 64800,
      total: 424800,
      status: "pending",
    },
  },
  {
    id: "m19",
    number: 19,
    name: "Painting - Exterior",
    description: "Weather coat and texture paint for exterior walls",
    phase: "Finishing",
    plannedStart: "Apr 6, 2026",
    plannedEnd: "Apr 13, 2026",
    status: "locked",
    progress: 0,
    duration: "8 days",
    steps: [
      { id: "s19-1", name: "Surface Cleaning", duration: "1 day", progress: 0, status: "locked" },
      { id: "s19-2", name: "Crack Filling", duration: "1 day", progress: 0, status: "locked" },
      { id: "s19-3", name: "Primer Application", duration: "2 days", progress: 0, status: "locked" },
      { id: "s19-4", name: "Weather Coat", duration: "2 days", progress: 0, status: "locked" },
      { id: "s19-5", name: "Final Coat", duration: "2 days", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 240000,
      gst: 43200,
      total: 283200,
      status: "pending",
    },
  },
  {
    id: "m20",
    number: 20,
    name: "Doors & Windows",
    description: "Main door, internal doors, windows, grills installation",
    phase: "Finishing",
    plannedStart: "Apr 14, 2026",
    plannedEnd: "Apr 24, 2026",
    status: "locked",
    progress: 0,
    duration: "10 days",
    steps: [
      { id: "s20-1", name: "Frame Installation", duration: "2 days", progress: 0, status: "locked" },
      { id: "s20-2", name: "Main Door Fixing", duration: "1 day", progress: 0, status: "locked" },
      { id: "s20-3", name: "Internal Doors Fixing", duration: "3 days", progress: 0, status: "locked" },
      { id: "s20-4", name: "Window Installation", duration: "2 days", progress: 0, status: "locked" },
      { id: "s20-5", name: "Grill & Safety Work", duration: "2 days", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 650000,
      gst: 117000,
      total: 767000,
      status: "pending",
    },
  },
  {
    id: "m21",
    number: 21,
    name: "Kitchen & Bathroom Fittings",
    description: "Modular kitchen, bathroom accessories, mirrors",
    phase: "Finishing",
    plannedStart: "Apr 25, 2026",
    plannedEnd: "May 5, 2026",
    status: "locked",
    progress: 0,
    duration: "10 days",
    steps: [
      { id: "s21-1", name: "Kitchen Cabinet Installation", duration: "3 days", progress: 0, status: "locked" },
      { id: "s21-2", name: "Countertop Fixing", duration: "2 days", progress: 0, status: "locked" },
      { id: "s21-3", name: "Bathroom Accessories", duration: "2 days", progress: 0, status: "locked" },
      { id: "s21-4", name: "Mirror Installation", duration: "1 day", progress: 0, status: "locked" },
      { id: "s21-5", name: "Hardware & Finishing", duration: "2 days", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 480000,
      gst: 86400,
      total: 566400,
      status: "pending",
    },
  },
  {
    id: "m22",
    number: 22,
    name: "Final Electrical & Plumbing",
    description: "Light fixtures, geysers, final connections",
    phase: "Finishing",
    plannedStart: "May 6, 2026",
    plannedEnd: "May 12, 2026",
    status: "locked",
    progress: 0,
    duration: "7 days",
    steps: [
      { id: "s22-1", name: "Light Fixture Installation", duration: "2 days", progress: 0, status: "locked" },
      { id: "s22-2", name: "Fan Installation", duration: "1 day", progress: 0, status: "locked" },
      { id: "s22-3", name: "Geyser Installation", duration: "1 day", progress: 0, status: "locked" },
      { id: "s22-4", name: "Final Testing", duration: "2 days", progress: 0, status: "locked" },
      { id: "s22-5", name: "Certification", duration: "1 day", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 220000,
      gst: 39600,
      total: 259600,
      status: "pending",
    },
  },
  {
    id: "m23",
    number: 23,
    name: "Cleaning & Touch-ups",
    description: "Deep cleaning, paint touch-ups, final polish",
    phase: "Finishing",
    plannedStart: "May 13, 2026",
    plannedEnd: "May 18, 2026",
    status: "locked",
    progress: 0,
    duration: "5 days",
    steps: [
      { id: "s23-1", name: "Construction Debris Removal", duration: "1 day", progress: 0, status: "locked" },
      { id: "s23-2", name: "Deep Cleaning", duration: "2 days", progress: 0, status: "locked" },
      { id: "s23-3", name: "Paint Touch-ups", duration: "1 day", progress: 0, status: "locked" },
      { id: "s23-4", name: "Final Polish & Inspection", duration: "1 day", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 120000,
      gst: 21600,
      total: 141600,
      status: "pending",
    },
  },
  {
    id: "m24",
    number: 24,
    name: "Final Inspection & Handover",
    description: "Quality check, documentation, key handover",
    phase: "Handover",
    plannedStart: "May 19, 2026",
    plannedEnd: "May 22, 2026",
    status: "locked",
    progress: 0,
    duration: "4 days",
    steps: [
      { id: "s24-1", name: "Structural Inspection", duration: "1 day", progress: 0, status: "locked" },
      { id: "s24-2", name: "MEP Inspection", duration: "1 day", progress: 0, status: "locked" },
      { id: "s24-3", name: "Documentation Handover", duration: "1 day", progress: 0, status: "locked" },
      { id: "s24-4", name: "Key Handover Ceremony", duration: "1 day", progress: 0, status: "locked" },
    ],
    payment: {
      amount: 150000,
      gst: 27000,
      total: 177000,
      status: "pending",
    },
  },
]

// Mock Project Data
export const mockProject: Project = {
  id: "WH-P-HYD-2026-001",
  customerName: "Rajesh Kumar",
  projectType: "G+2 Residential",
  location: "Kondapur, Hyderabad",
  area: "2,800 sq.ft",
  totalValue: 8200000,
  paidAmount: 4100000,
  pendingAmount: 4100000,
  completedMilestones: 10,
  totalMilestones: 24,
  progress: 50,
  status: "on_track",
  milestones: mockMilestones,
}

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: "TKT-00045",
    type: "quality_issue",
    priority: "high",
    status: "open",
    subject: "Uneven plastering in Bedroom 2",
    description: "I noticed the plastering in bedroom 2 is uneven near the window area. The surface is wavy and not smooth like other rooms. Please check and rectify this issue.",
    relatedMilestone: "M11: Internal Plastering",
    createdAt: "Jan 25, 2026",
    updatedAt: "Jan 25, 2026",
  },
  {
    id: "TKT-00038",
    type: "general_question",
    priority: "medium",
    status: "resolved",
    subject: "Additional window request",
    description: "Can we add an additional window in the master bedroom?",
    relatedMilestone: "M10: Brickwork",
    createdAt: "Jan 15, 2026",
    updatedAt: "Jan 18, 2026",
    resolution: "Window added at no extra cost",
  },
  {
    id: "TKT-00032",
    type: "work_delay",
    priority: "medium",
    status: "resolved",
    subject: "Delay in material delivery",
    description: "Tiles delivery was delayed by 3 days.",
    relatedMilestone: "M15: Flooring",
    createdAt: "Jan 10, 2026",
    updatedAt: "Jan 14, 2026",
    resolution: "Material delivered and schedule adjusted",
  },
]

// Mock Change Requests
export const mockChangeRequests: ChangeRequest[] = [
  {
    id: "CR-00012",
    type: "material_change",
    status: "estimate_pending",
    relatedMilestone: "M15: Flooring - Tiles",
    currentSpec: "Vitrified tiles 2x2 ft, Kajaria brand, Rs. 65/sq ft",
    requestedChange: "I want to upgrade to Italian marble flooring in the living room and master bedroom instead of vitrified tiles.",
    reason: "Want premium look for main areas",
    createdAt: "Jan 24, 2026",
    updatedAt: "Jan 25, 2026",
  },
]

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyShort(amount: number): string {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`
  }
  if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} L`
  }
  return formatCurrency(amount)
}

export function getMilestoneStatusColor(status: MilestoneStatus): string {
  switch (status) {
    case "reviewed":
    case "completed":
      return "bg-green-100 text-green-700 border-green-200"
    case "in_progress":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "unlocked":
      return "bg-orange-100 text-orange-700 border-orange-200"
    case "locked":
      return "bg-gray-100 text-gray-500 border-gray-200"
    default:
      return "bg-gray-100 text-gray-500 border-gray-200"
  }
}

export function getMilestoneStatusLabel(status: MilestoneStatus): string {
  switch (status) {
    case "reviewed":
      return "Completed"
    case "completed":
      return "Completed"
    case "in_progress":
      return "In Progress"
    case "unlocked":
      return "Unlocked"
    case "locked":
      return "Locked"
    default:
      return status
  }
}

export function getTicketStatusColor(status: TicketStatus): string {
  switch (status) {
    case "open":
      return "bg-yellow-100 text-yellow-700"
    case "in_progress":
      return "bg-orange-100 text-orange-700"
    case "resolved":
      return "bg-green-100 text-green-700"
    case "closed":
      return "bg-gray-100 text-gray-500"
    default:
      return "bg-gray-100 text-gray-500"
  }
}

export function getTicketTypeLabel(type: TicketType): string {
  switch (type) {
    case "quality_issue":
      return "Quality Issue"
    case "work_delay":
      return "Work Delay"
    case "payment_query":
      return "Payment Query"
    case "material_concern":
      return "Material Concern"
    case "safety_issue":
      return "Safety Issue"
    case "communication_problem":
      return "Communication Problem"
    case "general_question":
      return "General Question"
    case "other":
      return "Other"
    default:
      return type
  }
}
