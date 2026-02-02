"use client"

import type { ProjectCategory, Location } from "@/components/shell/header-filters"

// Sales dashboard metrics interface
export interface SalesMetrics {
  stats: {
    totalLeads: { value: number; change: string; changeType: "positive" | "negative" | "neutral" }
    pendingTasks: { value: number; dueToday: number }
    activeProjects: { value: number; change: string; changeType: "positive" | "negative" | "neutral" }
    reportsGenerated: { value: number; change: string; changeType: "positive" | "negative" | "neutral" }
  }
  performance: {
    callsMade: { value: number; trend: "up" | "down" }
    siteVisits: { value: number; trend: "up" | "down" }
    quotesSent: { value: number; trend: "up" | "down" }
    dealsClosed: { value: number; trend: "up" | "down" }
    targetAchievement: number
  }
  tasks: Array<{
    id: string
    title: string
    description: string
    time: string
    priority: "high" | "medium" | "low"
    icon: "phone" | "calendar" | "clock" | "file"
  }>
  recentActivity: Array<{
    id: string
    user: string
    action: string
    target: string
    location: string
    time: string
    color: "orange" | "blue" | "green" | "purple"
  }>
  funnel: {
    stages: Array<{ name: string; count: number; percentage: number }>
    conversionRate: string
  }
}

// Location-wise base sales metrics
const locationSalesMetrics: Record<string, SalesMetrics> = {
  all: {
    stats: {
      totalLeads: { value: 355, change: "+43 this week", changeType: "positive" },
      pendingTasks: { value: 89, dueToday: 12 },
      activeProjects: { value: 42, change: "+5 this month", changeType: "positive" },
      reportsGenerated: { value: 156, change: "+23 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 127, trend: "up" },
      siteVisits: { value: 34, trend: "up" },
      quotesSent: { value: 18, trend: "down" },
      dealsClosed: { value: 8, trend: "up" },
      targetAchievement: 78,
    },
    tasks: [
      { id: "1", title: "Follow up with Priya Patel", description: "Interested in 3BHK Villa - Whitefield", time: "10:00 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Villa #234", description: "With Amit Kumar & family", time: "2:00 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Ramesh Gupta", description: "4BHK Villa - Electronic City", time: "4:00 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Review contract documents", description: "For Sunita Reddy - HSR Layout", time: "5:30 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Amit Singh", action: "closed a deal", target: "Villa #456", location: "Electronic City", time: "2 min ago", color: "orange" },
      { id: "2", user: "Priya Sharma", action: "added a new lead", target: "Rahul Mehta", location: "Whitefield", time: "15 min ago", color: "blue" },
      { id: "3", user: "Vikram Patel", action: "scheduled site visit", target: "Villa #789", location: "Koramangala", time: "32 min ago", color: "green" },
      { id: "4", user: "Neha Gupta", action: "sent quote to", target: "Arun Kumar", location: "Indiranagar", time: "1 hr ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 156, percentage: 100 },
        { name: "Contacted", count: 124, percentage: 79 },
        { name: "Qualified", count: 89, percentage: 57 },
        { name: "Site Visit", count: 45, percentage: 29 },
        { name: "Negotiation", count: 23, percentage: 15 },
        { name: "Won", count: 12, percentage: 8 },
      ],
      conversionRate: "7.7%",
    },
  },
  mumbai: {
    stats: {
      totalLeads: { value: 89, change: "+12 this week", changeType: "positive" },
      pendingTasks: { value: 24, dueToday: 4 },
      activeProjects: { value: 12, change: "+2 this month", changeType: "positive" },
      reportsGenerated: { value: 42, change: "+8 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 38, trend: "up" },
      siteVisits: { value: 9, trend: "up" },
      quotesSent: { value: 5, trend: "up" },
      dealsClosed: { value: 2, trend: "up" },
      targetAchievement: 72,
    },
    tasks: [
      { id: "1", title: "Follow up with Rajesh Mehta", description: "Interested in 4BHK Penthouse - Bandra", time: "10:30 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Tower A Unit 12", description: "With Sharma family", time: "2:30 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Pooja Desai", description: "3BHK Apartment - Worli", time: "4:30 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Document verification", description: "For Anand Patil - Powai", time: "5:00 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Rahul Joshi", action: "closed a deal", target: "Unit #1204", location: "Bandra West", time: "5 min ago", color: "orange" },
      { id: "2", user: "Meera Shah", action: "added a new lead", target: "Vijay Malhotra", location: "Juhu", time: "20 min ago", color: "blue" },
      { id: "3", user: "Amit Patel", action: "scheduled site visit", target: "Penthouse B", location: "Worli", time: "45 min ago", color: "green" },
      { id: "4", user: "Sneha Kapoor", action: "sent quote to", target: "Ravi Agarwal", location: "Andheri", time: "1.5 hrs ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 42, percentage: 100 },
        { name: "Contacted", count: 34, percentage: 81 },
        { name: "Qualified", count: 24, percentage: 57 },
        { name: "Site Visit", count: 12, percentage: 29 },
        { name: "Negotiation", count: 6, percentage: 14 },
        { name: "Won", count: 3, percentage: 7 },
      ],
      conversionRate: "7.1%",
    },
  },
  delhi: {
    stats: {
      totalLeads: { value: 72, change: "+8 this week", changeType: "positive" },
      pendingTasks: { value: 18, dueToday: 3 },
      activeProjects: { value: 9, change: "+1 this month", changeType: "positive" },
      reportsGenerated: { value: 34, change: "+5 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 28, trend: "up" },
      siteVisits: { value: 7, trend: "down" },
      quotesSent: { value: 4, trend: "up" },
      dealsClosed: { value: 1, trend: "down" },
      targetAchievement: 65,
    },
    tasks: [
      { id: "1", title: "Follow up with Arun Sharma", description: "Interested in Farmhouse - Chattarpur", time: "11:00 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Plot 45", description: "With Gupta family", time: "3:00 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Neha Verma", description: "4BHK Villa - Vasant Kunj", time: "4:00 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Agreement review", description: "For Rajiv Singh - GK2", time: "6:00 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Vikram Chadha", action: "closed a deal", target: "Villa #78", location: "Vasant Vihar", time: "10 min ago", color: "orange" },
      { id: "2", user: "Priya Malhotra", action: "added a new lead", target: "Suresh Kumar", location: "Dwarka", time: "25 min ago", color: "blue" },
      { id: "3", user: "Rohit Khanna", action: "scheduled site visit", target: "Plot 89", location: "Chattarpur", time: "50 min ago", color: "green" },
      { id: "4", user: "Anita Bhatia", action: "sent quote to", target: "Mohan Lal", location: "Noida", time: "2 hrs ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 32, percentage: 100 },
        { name: "Contacted", count: 26, percentage: 81 },
        { name: "Qualified", count: 18, percentage: 56 },
        { name: "Site Visit", count: 9, percentage: 28 },
        { name: "Negotiation", count: 4, percentage: 13 },
        { name: "Won", count: 2, percentage: 6 },
      ],
      conversionRate: "6.3%",
    },
  },
  bengaluru: {
    stats: {
      totalLeads: { value: 98, change: "+15 this week", changeType: "positive" },
      pendingTasks: { value: 26, dueToday: 5 },
      activeProjects: { value: 14, change: "+3 this month", changeType: "positive" },
      reportsGenerated: { value: 48, change: "+9 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 42, trend: "up" },
      siteVisits: { value: 12, trend: "up" },
      quotesSent: { value: 7, trend: "up" },
      dealsClosed: { value: 3, trend: "up" },
      targetAchievement: 85,
    },
    tasks: [
      { id: "1", title: "Follow up with Priya Patel", description: "Interested in 3BHK Villa - Whitefield", time: "10:00 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Villa #234", description: "With Amit Kumar & family", time: "2:00 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Ramesh Gupta", description: "4BHK Villa - Electronic City", time: "4:00 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Review contract documents", description: "For Sunita Reddy - HSR Layout", time: "5:30 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Amit Singh", action: "closed a deal", target: "Villa #456", location: "Electronic City", time: "2 min ago", color: "orange" },
      { id: "2", user: "Priya Sharma", action: "added a new lead", target: "Rahul Mehta", location: "Whitefield", time: "15 min ago", color: "blue" },
      { id: "3", user: "Vikram Patel", action: "scheduled site visit", target: "Villa #789", location: "Koramangala", time: "32 min ago", color: "green" },
      { id: "4", user: "Neha Gupta", action: "sent quote to", target: "Arun Kumar", location: "Indiranagar", time: "1 hr ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 48, percentage: 100 },
        { name: "Contacted", count: 39, percentage: 81 },
        { name: "Qualified", count: 28, percentage: 58 },
        { name: "Site Visit", count: 15, percentage: 31 },
        { name: "Negotiation", count: 8, percentage: 17 },
        { name: "Won", count: 4, percentage: 8 },
      ],
      conversionRate: "8.3%",
    },
  },
  chennai: {
    stats: {
      totalLeads: { value: 52, change: "+6 this week", changeType: "positive" },
      pendingTasks: { value: 14, dueToday: 2 },
      activeProjects: { value: 7, change: "+1 this month", changeType: "positive" },
      reportsGenerated: { value: 26, change: "+4 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 22, trend: "up" },
      siteVisits: { value: 5, trend: "up" },
      quotesSent: { value: 3, trend: "down" },
      dealsClosed: { value: 1, trend: "up" },
      targetAchievement: 68,
    },
    tasks: [
      { id: "1", title: "Follow up with Venkat Raman", description: "Interested in 3BHK - OMR", time: "10:30 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Villa #112", description: "With Lakshmi family", time: "2:30 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Karthik S", description: "Duplex - ECR", time: "4:30 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Document handover", description: "For Suresh M - Adyar", time: "5:00 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Ravi Kumar", action: "closed a deal", target: "Unit #304", location: "Anna Nagar", time: "8 min ago", color: "orange" },
      { id: "2", user: "Lakshmi P", action: "added a new lead", target: "Ganesh R", location: "Velachery", time: "22 min ago", color: "blue" },
      { id: "3", user: "Murali S", action: "scheduled site visit", target: "Villa #223", location: "Sholinganallur", time: "48 min ago", color: "green" },
      { id: "4", user: "Priya V", action: "sent quote to", target: "Arun M", location: "Tambaram", time: "1.5 hrs ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 24, percentage: 100 },
        { name: "Contacted", count: 19, percentage: 79 },
        { name: "Qualified", count: 13, percentage: 54 },
        { name: "Site Visit", count: 7, percentage: 29 },
        { name: "Negotiation", count: 3, percentage: 13 },
        { name: "Won", count: 2, percentage: 8 },
      ],
      conversionRate: "8.3%",
    },
  },
  hyderabad: {
    stats: {
      totalLeads: { value: 78, change: "+11 this week", changeType: "positive" },
      pendingTasks: { value: 21, dueToday: 4 },
      activeProjects: { value: 11, change: "+2 this month", changeType: "positive" },
      reportsGenerated: { value: 38, change: "+7 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 35, trend: "up" },
      siteVisits: { value: 9, trend: "up" },
      quotesSent: { value: 5, trend: "up" },
      dealsClosed: { value: 2, trend: "up" },
      targetAchievement: 82,
    },
    tasks: [
      { id: "1", title: "Follow up with Ravi Reddy", description: "Interested in 4BHK - Jubilee Hills", time: "10:00 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Villa #567", description: "With Prasad family", time: "2:00 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Srinivas K", description: "3BHK Villa - Gachibowli", time: "4:00 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Registration documents", description: "For Anuradha P - Banjara Hills", time: "5:30 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Venkat Rao", action: "closed a deal", target: "Villa #890", location: "Kondapur", time: "3 min ago", color: "orange" },
      { id: "2", user: "Swathi K", action: "added a new lead", target: "Mahesh R", location: "Madhapur", time: "18 min ago", color: "blue" },
      { id: "3", user: "Kiran P", action: "scheduled site visit", target: "Unit #445", location: "Hitech City", time: "40 min ago", color: "green" },
      { id: "4", user: "Divya S", action: "sent quote to", target: "Raju K", location: "Kukatpally", time: "1.2 hrs ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 38, percentage: 100 },
        { name: "Contacted", count: 31, percentage: 82 },
        { name: "Qualified", count: 22, percentage: 58 },
        { name: "Site Visit", count: 12, percentage: 32 },
        { name: "Negotiation", count: 6, percentage: 16 },
        { name: "Won", count: 3, percentage: 8 },
      ],
      conversionRate: "7.9%",
    },
  },
  kolkata: {
    stats: {
      totalLeads: { value: 42, change: "+4 this week", changeType: "positive" },
      pendingTasks: { value: 11, dueToday: 2 },
      activeProjects: { value: 5, change: "+0 this month", changeType: "neutral" },
      reportsGenerated: { value: 18, change: "+2 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 18, trend: "down" },
      siteVisits: { value: 4, trend: "down" },
      quotesSent: { value: 2, trend: "down" },
      dealsClosed: { value: 1, trend: "up" },
      targetAchievement: 58,
    },
    tasks: [
      { id: "1", title: "Follow up with Arnab Das", description: "Interested in 3BHK - Salt Lake", time: "11:00 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Flat #78", description: "With Banerjee family", time: "3:00 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Suman Ghosh", description: "4BHK - New Town", time: "4:30 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Paper work completion", description: "For Dipak Sen - Ballygunge", time: "5:00 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Sourav Mitra", action: "closed a deal", target: "Flat #234", location: "Park Street", time: "12 min ago", color: "orange" },
      { id: "2", user: "Moumita Roy", action: "added a new lead", target: "Amit Bose", location: "Rajarhat", time: "28 min ago", color: "blue" },
      { id: "3", user: "Partha Das", action: "scheduled site visit", target: "Unit #112", location: "EM Bypass", time: "55 min ago", color: "green" },
      { id: "4", user: "Ananya Sen", action: "sent quote to", target: "Ratan Dutta", location: "Howrah", time: "2 hrs ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 18, percentage: 100 },
        { name: "Contacted", count: 14, percentage: 78 },
        { name: "Qualified", count: 9, percentage: 50 },
        { name: "Site Visit", count: 5, percentage: 28 },
        { name: "Negotiation", count: 2, percentage: 11 },
        { name: "Won", count: 1, percentage: 6 },
      ],
      conversionRate: "5.6%",
    },
  },
  pune: {
    stats: {
      totalLeads: { value: 65, change: "+9 this week", changeType: "positive" },
      pendingTasks: { value: 17, dueToday: 3 },
      activeProjects: { value: 9, change: "+1 this month", changeType: "positive" },
      reportsGenerated: { value: 32, change: "+5 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 29, trend: "up" },
      siteVisits: { value: 7, trend: "up" },
      quotesSent: { value: 4, trend: "up" },
      dealsClosed: { value: 2, trend: "up" },
      targetAchievement: 75,
    },
    tasks: [
      { id: "1", title: "Follow up with Ajay Kulkarni", description: "Interested in Row House - Baner", time: "10:30 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Villa #334", description: "With Joshi family", time: "2:30 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Neha Patil", description: "3BHK - Hinjewadi", time: "4:00 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Loan documentation", description: "For Sanjay Deshmukh - Kothrud", time: "5:30 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Rahul Deshpande", action: "closed a deal", target: "Villa #567", location: "Wakad", time: "6 min ago", color: "orange" },
      { id: "2", user: "Pooja Bhosale", action: "added a new lead", target: "Vivek Inamdar", location: "Aundh", time: "24 min ago", color: "blue" },
      { id: "3", user: "Sachin Jadhav", action: "scheduled site visit", target: "Unit #89", location: "Kalyani Nagar", time: "52 min ago", color: "green" },
      { id: "4", user: "Smita Kulkarni", action: "sent quote to", target: "Prakash Jain", location: "Viman Nagar", time: "1.5 hrs ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 32, percentage: 100 },
        { name: "Contacted", count: 26, percentage: 81 },
        { name: "Qualified", count: 18, percentage: 56 },
        { name: "Site Visit", count: 10, percentage: 31 },
        { name: "Negotiation", count: 5, percentage: 16 },
        { name: "Won", count: 2, percentage: 6 },
      ],
      conversionRate: "6.3%",
    },
  },
  vijayawada: {
    stats: {
      totalLeads: { value: 28, change: "+3 this week", changeType: "positive" },
      pendingTasks: { value: 8, dueToday: 1 },
      activeProjects: { value: 4, change: "+1 this month", changeType: "positive" },
      reportsGenerated: { value: 12, change: "+2 this week", changeType: "positive" },
    },
    performance: {
      callsMade: { value: 12, trend: "up" },
      siteVisits: { value: 3, trend: "up" },
      quotesSent: { value: 2, trend: "up" },
      dealsClosed: { value: 1, trend: "up" },
      targetAchievement: 70,
    },
    tasks: [
      { id: "1", title: "Follow up with Srinivas Rao", description: "Interested in 3BHK - Kanuru", time: "10:30 AM", priority: "high", icon: "phone" },
      { id: "2", title: "Site Visit - Villa #45", description: "With Prasad family", time: "3:00 PM", priority: "high", icon: "calendar" },
      { id: "3", title: "Send Quote to Lakshmi K", description: "Duplex - Gannavaram", time: "4:30 PM", priority: "medium", icon: "clock" },
      { id: "4", title: "Registration support", description: "For Ramesh N - Benz Circle", time: "5:00 PM", priority: "low", icon: "file" },
    ],
    recentActivity: [
      { id: "1", user: "Venkat Rao", action: "closed a deal", target: "Villa #23", location: "Poranki", time: "15 min ago", color: "orange" },
      { id: "2", user: "Padma L", action: "added a new lead", target: "Suresh B", location: "Tadepalli", time: "35 min ago", color: "blue" },
      { id: "3", user: "Krishna M", action: "scheduled site visit", target: "Plot #67", location: "Mangalagiri", time: "1 hr ago", color: "green" },
      { id: "4", user: "Anusha R", action: "sent quote to", target: "Ravi K", location: "Guntur", time: "2.5 hrs ago", color: "purple" },
    ],
    funnel: {
      stages: [
        { name: "New", count: 12, percentage: 100 },
        { name: "Contacted", count: 10, percentage: 83 },
        { name: "Qualified", count: 7, percentage: 58 },
        { name: "Site Visit", count: 4, percentage: 33 },
        { name: "Negotiation", count: 2, percentage: 17 },
        { name: "Won", count: 1, percentage: 8 },
      ],
      conversionRate: "8.3%",
    },
  },
}

// Category multipliers for adjusting sales metrics
const categoryMultipliers: Record<string, { leads: number; tasks: number; projects: number; performance: number }> = {
  all: { leads: 1, tasks: 1, projects: 1, performance: 1 },
  building: { leads: 0.48, tasks: 0.45, projects: 0.50, performance: 1.05 },
  transportation: { leads: 0.12, tasks: 0.14, projects: 0.15, performance: 0.85 },
  civil: { leads: 0.10, tasks: 0.12, projects: 0.10, performance: 0.80 },
  industrial: { leads: 0.08, tasks: 0.08, projects: 0.08, performance: 0.95 },
  water: { leads: 0.06, tasks: 0.06, projects: 0.05, performance: 0.90 },
  energy: { leads: 0.05, tasks: 0.05, projects: 0.04, performance: 0.75 },
  urban: { leads: 0.07, tasks: 0.06, projects: 0.06, performance: 0.88 },
  specialized: { leads: 0.03, tasks: 0.03, projects: 0.02, performance: 1.10 },
  social: { leads: 0.05, tasks: 0.05, projects: 0.04, performance: 0.92 },
  renovation: { leads: 0.04, tasks: 0.04, projects: 0.03, performance: 1.15 },
}

// Function to get filtered sales metrics
export function getFilteredSalesMetrics(category: ProjectCategory, location: Location): SalesMetrics | null {
  const baseMetrics = locationSalesMetrics[location] || locationSalesMetrics.all
  const multiplier = categoryMultipliers[category] || categoryMultipliers.all

  // Calculate adjusted values
  const totalLeads = Math.round(baseMetrics.stats.totalLeads.value * multiplier.leads)
  const pendingTasks = Math.round(baseMetrics.stats.pendingTasks.value * multiplier.tasks)
  const activeProjects = Math.round(baseMetrics.stats.activeProjects.value * multiplier.projects)
  const reportsGenerated = Math.round(baseMetrics.stats.reportsGenerated.value * multiplier.projects)

  // Check for empty state
  if (totalLeads < 3 && category !== "all" && location !== "all") {
    return null
  }

  // Adjust performance metrics
  const performanceMultiplier = multiplier.performance
  const callsMade = Math.round(baseMetrics.performance.callsMade.value * multiplier.leads)
  const siteVisits = Math.round(baseMetrics.performance.siteVisits.value * multiplier.leads)
  const quotesSent = Math.round(baseMetrics.performance.quotesSent.value * multiplier.leads)
  const dealsClosed = Math.max(1, Math.round(baseMetrics.performance.dealsClosed.value * multiplier.projects))
  const targetAchievement = Math.min(100, Math.round(baseMetrics.performance.targetAchievement * performanceMultiplier))

  // Adjust funnel stages
  const funnelStages = baseMetrics.funnel.stages.map((stage, index) => ({
    name: stage.name,
    count: Math.max(1, Math.round(stage.count * multiplier.leads)),
    percentage: stage.percentage,
  }))

  // Filter tasks based on category (keep first 2-4 based on multiplier)
  const taskCount = Math.max(2, Math.round(4 * multiplier.tasks))
  const tasks = baseMetrics.tasks.slice(0, taskCount)

  // Filter activity based on multiplier
  const activityCount = Math.max(2, Math.round(4 * multiplier.leads))
  const recentActivity = baseMetrics.recentActivity.slice(0, activityCount)

  // Calculate change strings
  const leadsChange = Math.round(parseFloat(baseMetrics.stats.totalLeads.change.match(/\d+/)?.[0] || "0") * multiplier.leads)
  const projectsChange = Math.round(parseFloat(baseMetrics.stats.activeProjects.change.match(/\d+/)?.[0] || "0") * multiplier.projects)
  const reportsChange = Math.round(parseFloat(baseMetrics.stats.reportsGenerated.change.match(/\d+/)?.[0] || "0") * multiplier.projects)

  return {
    stats: {
      totalLeads: {
        value: totalLeads,
        change: `+${leadsChange} this week`,
        changeType: leadsChange > 0 ? "positive" : "neutral",
      },
      pendingTasks: {
        value: pendingTasks,
        dueToday: Math.max(1, Math.round(baseMetrics.stats.pendingTasks.dueToday * multiplier.tasks)),
      },
      activeProjects: {
        value: activeProjects,
        change: `+${projectsChange} this month`,
        changeType: projectsChange > 0 ? "positive" : "neutral",
      },
      reportsGenerated: {
        value: reportsGenerated,
        change: `+${reportsChange} this week`,
        changeType: reportsChange > 0 ? "positive" : "neutral",
      },
    },
    performance: {
      callsMade: { value: callsMade, trend: baseMetrics.performance.callsMade.trend },
      siteVisits: { value: siteVisits, trend: baseMetrics.performance.siteVisits.trend },
      quotesSent: { value: quotesSent, trend: baseMetrics.performance.quotesSent.trend },
      dealsClosed: { value: dealsClosed, trend: baseMetrics.performance.dealsClosed.trend },
      targetAchievement,
    },
    tasks,
    recentActivity,
    funnel: {
      stages: funnelStages,
      conversionRate: baseMetrics.funnel.conversionRate,
    },
  }
}
