export type MessageStatus = "sent" | "delivered" | "read"
export type MessageType = "text" | "image" | "document" | "voice" | "location" | "system"

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderType: "customer" | "engineer"
  content: string
  type: MessageType
  status: MessageStatus
  timestamp: string
  mediaUrl?: string
  mediaType?: string
  mediaSize?: number
  fileName?: string
  location?: {
    lat: number
    lng: number
    address: string
  }
  voiceDuration?: number
}

export interface Conversation {
  id: string
  customerId: string
  customerName: string
  customerInitials: string
  projectId: string
  projectType: string
  projectStatus: string
  location: string
  lastMessage: string
  lastMessageType: MessageType
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  isStarred: boolean
  isArchived: boolean
  isMuted: boolean
  currentMilestone: string
  projectProgress: number
  openTickets: number
  avgRating: number
  messages: Message[]
}

export interface QuickReply {
  id: string
  icon: string
  text: string
  template: string
}

// Mock Quick Replies
export const quickReplies: QuickReply[] = [
  { id: "1", icon: "👍", text: "Noted", template: "Noted. I'll take care of it." },
  { id: "2", icon: "🔄", text: "Will update", template: "I'll update you shortly." },
  { id: "3", icon: "📸", text: "Sending photos", template: "Sending you photos now." },
  { id: "4", icon: "⏰", text: "On it", template: "Working on it. Will be done soon." },
  { id: "5", icon: "✅", text: "Completed", template: "This has been completed." },
  { id: "6", icon: "🔍", text: "Checking", template: "Let me check and get back to you." },
]

// Mock Conversations Data
export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    customerId: "cust-001",
    customerName: "Rajesh Kumar",
    customerInitials: "RK",
    projectId: "WH-HYD-2024-001",
    projectType: "3BHK Villa",
    projectStatus: "Active Project",
    location: "Whitefield",
    lastMessage: "Please check the plastering in bedroom 2...",
    lastMessageType: "text",
    lastMessageTime: "2026-01-28T11:45:00",
    unreadCount: 2,
    isOnline: true,
    isStarred: false,
    isArchived: false,
    isMuted: false,
    currentMilestone: "M11 - Internal Plastering",
    projectProgress: 65,
    openTickets: 1,
    avgRating: 4.5,
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-1",
        senderId: "cust-001",
        senderType: "customer",
        content: "Good morning! How is the plastering work progressing?",
        type: "text",
        status: "read",
        timestamp: "2026-01-28T09:30:00",
      },
      {
        id: "msg-2",
        conversationId: "conv-1",
        senderId: "eng-001",
        senderType: "engineer",
        content: "Good morning sir! The plastering is going well. We've completed the living room and bedroom 1. Currently working on bedroom 2. Should be done by tomorrow.",
        type: "text",
        status: "read",
        timestamp: "2026-01-28T09:35:00",
      },
      {
        id: "msg-3",
        conversationId: "conv-1",
        senderId: "eng-001",
        senderType: "engineer",
        content: "Here's the completed work in bedroom 1.",
        type: "image",
        status: "read",
        timestamp: "2026-01-28T09:36:00",
        mediaUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        mediaType: "image/jpeg",
      },
      {
        id: "msg-4",
        conversationId: "conv-1",
        senderId: "cust-001",
        senderType: "customer",
        content: "That looks great! 👍\n\nPlease check the plastering in bedroom 2 near the window. I noticed it was uneven during my last visit.",
        type: "text",
        status: "delivered",
        timestamp: "2026-01-28T11:45:00",
      },
    ],
  },
  {
    id: "conv-2",
    customerId: "cust-002",
    customerName: "Priya Sharma",
    customerInitials: "PS",
    projectId: "WH-HYD-2024-002",
    projectType: "4BHK Villa",
    projectStatus: "Active Project",
    location: "Electronic City",
    lastMessage: "Thank you for the update. Looks good!",
    lastMessageType: "text",
    lastMessageTime: "2026-01-28T10:30:00",
    unreadCount: 0,
    isOnline: false,
    isStarred: false,
    isArchived: false,
    isMuted: false,
    currentMilestone: "M15 - Flooring",
    projectProgress: 62,
    openTickets: 2,
    avgRating: 4.2,
    messages: [
      {
        id: "msg-5",
        conversationId: "conv-2",
        senderId: "eng-001",
        senderType: "engineer",
        content: "Good morning! We've completed the tiling in the master bedroom. The grouting work will be done today.",
        type: "text",
        status: "read",
        timestamp: "2026-01-28T09:00:00",
      },
      {
        id: "msg-6",
        conversationId: "conv-2",
        senderId: "eng-001",
        senderType: "engineer",
        content: "Progress update on flooring work",
        type: "image",
        status: "read",
        timestamp: "2026-01-28T09:15:00",
        mediaUrl: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop",
        mediaType: "image/jpeg",
      },
      {
        id: "msg-7",
        conversationId: "conv-2",
        senderId: "cust-002",
        senderType: "customer",
        content: "Thank you for the update. Looks good!",
        type: "text",
        status: "read",
        timestamp: "2026-01-28T10:30:00",
      },
    ],
  },
  {
    id: "conv-3",
    customerId: "cust-003",
    customerName: "Venkat Menon",
    customerInitials: "VM",
    projectId: "WH-HYD-2024-003",
    projectType: "2BHK Apartment",
    projectStatus: "Active Project",
    location: "HSR Layout",
    lastMessage: "When will the electrical work start?",
    lastMessageType: "text",
    lastMessageTime: "2026-01-27T16:20:00",
    unreadCount: 1,
    isOnline: false,
    isStarred: true,
    isArchived: false,
    isMuted: false,
    currentMilestone: "M7 - Roof Slab",
    projectProgress: 28,
    openTickets: 16,
    avgRating: 4.8,
    messages: [
      {
        id: "msg-8",
        conversationId: "conv-3",
        senderId: "cust-003",
        senderType: "customer",
        content: "Good afternoon. How is the roof work going?",
        type: "text",
        status: "read",
        timestamp: "2026-01-27T14:00:00",
      },
      {
        id: "msg-9",
        conversationId: "conv-3",
        senderId: "eng-001",
        senderType: "engineer",
        content: "Hello sir! The roof slab work is progressing well. We've completed 80% of the concrete work. Weather is good, so we should finish today.",
        type: "text",
        status: "read",
        timestamp: "2026-01-27T14:30:00",
      },
      {
        id: "msg-10",
        conversationId: "conv-3",
        senderId: "cust-003",
        senderType: "customer",
        content: "When will the electrical work start?",
        type: "text",
        status: "delivered",
        timestamp: "2026-01-27T16:20:00",
      },
    ],
  },
  {
    id: "conv-4",
    customerId: "cust-004",
    customerName: "Amit Patel",
    customerInitials: "AP",
    projectId: "WH-HYD-2025-042",
    projectType: "G+1 Residential",
    projectStatus: "Near Completion",
    location: "Gachibowli",
    lastMessage: "When can we schedule the final inspection?",
    lastMessageType: "text",
    lastMessageTime: "2026-01-25T15:00:00",
    unreadCount: 0,
    isOnline: false,
    isStarred: false,
    isArchived: false,
    isMuted: false,
    currentMilestone: "M23 - Final Touches",
    projectProgress: 95,
    openTickets: 0,
    avgRating: 4.9,
    messages: [
      {
        id: "msg-11",
        conversationId: "conv-4",
        senderId: "eng-001",
        senderType: "engineer",
        content: "Good afternoon! We've completed all the painting work and final fixtures. The project is ready for inspection.",
        type: "text",
        status: "read",
        timestamp: "2026-01-25T10:00:00",
      },
      {
        id: "msg-12",
        conversationId: "conv-4",
        senderId: "cust-004",
        senderType: "customer",
        content: "That's great news! When can we schedule the final inspection?",
        type: "text",
        status: "read",
        timestamp: "2026-01-25T15:00:00",
      },
    ],
  },
  {
    id: "conv-5",
    customerId: "cust-005",
    customerName: "Sneha Reddy",
    customerInitials: "SR",
    projectId: "WH-HYD-2026-008",
    projectType: "Villa",
    projectStatus: "Active Project",
    location: "Jubilee Hills",
    lastMessage: "Sent a photo",
    lastMessageType: "image",
    lastMessageTime: "2026-01-27T12:00:00",
    unreadCount: 0,
    isOnline: true,
    isStarred: true,
    isArchived: false,
    isMuted: false,
    currentMilestone: "M14 - Windows & Doors",
    projectProgress: 58,
    openTickets: 3,
    avgRating: 4.3,
    messages: [
      {
        id: "msg-13",
        conversationId: "conv-5",
        senderId: "cust-005",
        senderType: "customer",
        content: "Can you share photos of the window installation?",
        type: "text",
        status: "read",
        timestamp: "2026-01-27T10:00:00",
      },
      {
        id: "msg-14",
        conversationId: "conv-5",
        senderId: "eng-001",
        senderType: "engineer",
        content: "Window installation progress",
        type: "image",
        status: "read",
        timestamp: "2026-01-27T12:00:00",
        mediaUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop",
        mediaType: "image/jpeg",
      },
    ],
  },
]
