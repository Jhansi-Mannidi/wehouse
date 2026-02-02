"use client"

import type { ProjectCategory, Location, Branch } from "@/components/shell/header-filters"

// Dashboard metrics interface
export interface DashboardMetrics {
  title: string
  subtitle: string
  primary: {
    totalProjects: number
    activeProjects: number
    onTrack: { count: number; percentage: number }
    atRisk: { count: number; percentage: number }
    delayed: { count: number; percentage: number }
  }
  secondary: {
    totalRevenue: string
    thisMonth: string
    monthChange: string
    pendingPayment: string
    pendingProjects: number
    teamMembers: number
  }
  pipeline: {
    value: string
    conversionRate: string
    stages: { name: string; count: number }[]
  }
  revenueChart: {
    values: number[]
    totalFY: string
    avgMonthly: string
    growth: string
  }
  teamPerformance: {
    topPerformers: { name: string; deals: number; rank: number }[]
    responseTimes: { city: string; time: string; status: "good" | "warning" | "critical" }[]
  }
  cityPerformance: { city: string; code: string; projects: number; revenue: string; convRate: string }[]
  leadSources: {
    total: number
    sources: { name: string; percentage: number; color: string }[]
    bestROI: { source: string; cost: string }
  }
  alerts: {
    paymentsOverdue: { count: number; amount: string }
    uncontactedLeads: number
  }
}

// Location-wise base metrics
const locationMetrics: Record<string, Omit<DashboardMetrics, "title" | "subtitle">> = {
  all: {
    primary: {
      totalProjects: 245,
      activeProjects: 187,
      onTrack: { count: 142, percentage: 76 },
      atRisk: { count: 32, percentage: 17 },
      delayed: { count: 13, percentage: 7 },
    },
    secondary: {
      totalRevenue: "₹847 Cr",
      thisMonth: "₹42.5 Cr",
      monthChange: "↑ 12%",
      pendingPayment: "₹18.2 Cr",
      pendingProjects: 45,
      teamMembers: 892,
    },
    pipeline: {
      value: "₹18.5 Cr",
      conversionRate: "7.7%",
      stages: [
        { name: "New", count: 156 },
        { name: "Contacted", count: 124 },
        { name: "Qualified", count: 78 },
        { name: "Site Visit", count: 45 },
        { name: "Negotiation", count: 23 },
        { name: "Won", count: 12 },
      ],
    },
    revenueChart: {
      values: [1.2, 1.5, 1.8, 2.1, 2.4, 2.0, 2.3, 2.8, 3.2, 3.5, 3.8, 4.2],
      totalFY: "₹32.4 Cr",
      avgMonthly: "₹2.7 Cr",
      growth: "+24%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Rahul S.", deals: 8, rank: 1 },
        { name: "Priya M.", deals: 6, rank: 2 },
        { name: "Arun K.", deals: 5, rank: 3 },
      ],
      responseTimes: [
        { city: "Hyderabad", time: "12 min", status: "good" },
        { city: "Bangalore", time: "18 min", status: "warning" },
      ],
    },
    cityPerformance: [
      { city: "Hyderabad", code: "Hy", projects: 28, revenue: "₹2.8Cr", convRate: "8.2%" },
      { city: "Bangalore", code: "Ba", projects: 17, revenue: "₹1.4Cr", convRate: "6.9%" },
      { city: "Mumbai", code: "Mu", projects: 62, revenue: "₹12.8Cr", convRate: "7.2%" },
      { city: "Delhi", code: "De", projects: 45, revenue: "₹9.4Cr", convRate: "6.8%" },
      { city: "Chennai", code: "Ch", projects: 32, revenue: "₹5.8Cr", convRate: "7.4%" },
      { city: "Kolkata", code: "Ko", projects: 28, revenue: "₹4.5Cr", convRate: "6.5%" },
    ],
    leadSources: {
      total: 438,
      sources: [
        { name: "Facebook", percentage: 42, color: "#3b82f6" },
        { name: "Google", percentage: 28, color: "#ef4444" },
        { name: "Website", percentage: 15, color: "#a855f7" },
        { name: "Referral", percentage: 10, color: "#22c55e" },
        { name: "Walk-in", percentage: 5, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹2,100/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 1, amount: "₹37 L" },
      uncontactedLeads: 12,
    },
  },
  mumbai: {
    primary: {
      totalProjects: 62,
      activeProjects: 48,
      onTrack: { count: 35, percentage: 73 },
      atRisk: { count: 9, percentage: 19 },
      delayed: { count: 4, percentage: 8 },
    },
    secondary: {
      totalRevenue: "₹245 Cr",
      thisMonth: "₹12.8 Cr",
      monthChange: "↑ 8%",
      pendingPayment: "₹5.2 Cr",
      pendingProjects: 18,
      teamMembers: 186,
    },
    pipeline: {
      value: "₹5.2 Cr",
      conversionRate: "7.2%",
      stages: [
        { name: "New", count: 42 },
        { name: "Contacted", count: 34 },
        { name: "Qualified", count: 21 },
        { name: "Site Visit", count: 12 },
        { name: "Negotiation", count: 6 },
        { name: "Won", count: 3 },
      ],
    },
    revenueChart: {
      values: [0.8, 0.9, 1.1, 1.2, 1.4, 1.2, 1.3, 1.5, 1.7, 1.9, 2.0, 2.2],
      totalFY: "₹16.2 Cr",
      avgMonthly: "₹1.35 Cr",
      growth: "+18%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Vikram P.", deals: 5, rank: 1 },
        { name: "Neha S.", deals: 4, rank: 2 },
        { name: "Amit R.", deals: 3, rank: 3 },
      ],
      responseTimes: [
        { city: "Mumbai", time: "15 min", status: "good" },
      ],
    },
    cityPerformance: [
      { city: "Mumbai", code: "Mu", projects: 62, revenue: "₹12.8Cr", convRate: "7.2%" },
    ],
    leadSources: {
      total: 156,
      sources: [
        { name: "Facebook", percentage: 38, color: "#3b82f6" },
        { name: "Google", percentage: 32, color: "#ef4444" },
        { name: "Website", percentage: 18, color: "#a855f7" },
        { name: "Referral", percentage: 8, color: "#22c55e" },
        { name: "Walk-in", percentage: 4, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹2,400/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 2, amount: "₹52 L" },
      uncontactedLeads: 8,
    },
  },
  delhi: {
    primary: {
      totalProjects: 45,
      activeProjects: 34,
      onTrack: { count: 24, percentage: 71 },
      atRisk: { count: 7, percentage: 20 },
      delayed: { count: 3, percentage: 9 },
    },
    secondary: {
      totalRevenue: "₹178 Cr",
      thisMonth: "₹9.4 Cr",
      monthChange: "↑ 6%",
      pendingPayment: "₹3.8 Cr",
      pendingProjects: 14,
      teamMembers: 142,
    },
    pipeline: {
      value: "₹4.1 Cr",
      conversionRate: "6.8%",
      stages: [
        { name: "New", count: 32 },
        { name: "Contacted", count: 26 },
        { name: "Qualified", count: 16 },
        { name: "Site Visit", count: 9 },
        { name: "Negotiation", count: 5 },
        { name: "Won", count: 2 },
      ],
    },
    revenueChart: {
      values: [0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5],
      totalFY: "₹12.4 Cr",
      avgMonthly: "₹1.03 Cr",
      growth: "+14%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Sanjay G.", deals: 4, rank: 1 },
        { name: "Meera D.", deals: 3, rank: 2 },
        { name: "Ravi P.", deals: 3, rank: 3 },
      ],
      responseTimes: [
        { city: "Delhi", time: "16 min", status: "warning" },
      ],
    },
    cityPerformance: [
      { city: "Delhi", code: "De", projects: 45, revenue: "₹9.4Cr", convRate: "6.8%" },
    ],
    leadSources: {
      total: 118,
      sources: [
        { name: "Facebook", percentage: 40, color: "#3b82f6" },
        { name: "Google", percentage: 30, color: "#ef4444" },
        { name: "Website", percentage: 16, color: "#a855f7" },
        { name: "Referral", percentage: 9, color: "#22c55e" },
        { name: "Walk-in", percentage: 5, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹2,300/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 2, amount: "₹45 L" },
      uncontactedLeads: 10,
    },
  },
  bengaluru: {
    primary: {
      totalProjects: 54,
      activeProjects: 42,
      onTrack: { count: 34, percentage: 81 },
      atRisk: { count: 6, percentage: 14 },
      delayed: { count: 2, percentage: 5 },
    },
    secondary: {
      totalRevenue: "₹198 Cr",
      thisMonth: "₹10.5 Cr",
      monthChange: "↑ 14%",
      pendingPayment: "₹4.1 Cr",
      pendingProjects: 14,
      teamMembers: 156,
    },
    pipeline: {
      value: "₹4.8 Cr",
      conversionRate: "8.1%",
      stages: [
        { name: "New", count: 38 },
        { name: "Contacted", count: 30 },
        { name: "Qualified", count: 19 },
        { name: "Site Visit", count: 11 },
        { name: "Negotiation", count: 6 },
        { name: "Won", count: 3 },
      ],
    },
    revenueChart: {
      values: [0.7, 0.8, 0.9, 1.0, 1.2, 1.0, 1.1, 1.3, 1.5, 1.6, 1.8, 1.9],
      totalFY: "₹14.8 Cr",
      avgMonthly: "₹1.23 Cr",
      growth: "+22%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Kiran T.", deals: 6, rank: 1 },
        { name: "Sneha B.", deals: 5, rank: 2 },
        { name: "Rajesh K.", deals: 4, rank: 3 },
      ],
      responseTimes: [
        { city: "Bangalore", time: "14 min", status: "good" },
      ],
    },
    cityPerformance: [
      { city: "Bangalore", code: "Ba", projects: 54, revenue: "₹10.5Cr", convRate: "8.1%" },
    ],
    leadSources: {
      total: 142,
      sources: [
        { name: "Facebook", percentage: 35, color: "#3b82f6" },
        { name: "Google", percentage: 30, color: "#ef4444" },
        { name: "Website", percentage: 20, color: "#a855f7" },
        { name: "Referral", percentage: 12, color: "#22c55e" },
        { name: "Walk-in", percentage: 3, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹1,800/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 1, amount: "₹28 L" },
      uncontactedLeads: 6,
    },
  },
  chennai: {
    primary: {
      totalProjects: 32,
      activeProjects: 25,
      onTrack: { count: 19, percentage: 76 },
      atRisk: { count: 4, percentage: 16 },
      delayed: { count: 2, percentage: 8 },
    },
    secondary: {
      totalRevenue: "₹112 Cr",
      thisMonth: "₹5.8 Cr",
      monthChange: "↑ 10%",
      pendingPayment: "₹2.4 Cr",
      pendingProjects: 8,
      teamMembers: 98,
    },
    pipeline: {
      value: "₹2.8 Cr",
      conversionRate: "7.4%",
      stages: [
        { name: "New", count: 22 },
        { name: "Contacted", count: 18 },
        { name: "Qualified", count: 11 },
        { name: "Site Visit", count: 6 },
        { name: "Negotiation", count: 3 },
        { name: "Won", count: 2 },
      ],
    },
    revenueChart: {
      values: [0.4, 0.4, 0.5, 0.5, 0.6, 0.5, 0.6, 0.7, 0.8, 0.8, 0.9, 1.0],
      totalFY: "₹7.7 Cr",
      avgMonthly: "₹0.64 Cr",
      growth: "+16%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Lakshmi R.", deals: 4, rank: 1 },
        { name: "Kumar S.", deals: 3, rank: 2 },
        { name: "Anitha P.", deals: 2, rank: 3 },
      ],
      responseTimes: [
        { city: "Chennai", time: "13 min", status: "good" },
      ],
    },
    cityPerformance: [
      { city: "Chennai", code: "Ch", projects: 32, revenue: "₹5.8Cr", convRate: "7.4%" },
    ],
    leadSources: {
      total: 92,
      sources: [
        { name: "Facebook", percentage: 44, color: "#3b82f6" },
        { name: "Google", percentage: 26, color: "#ef4444" },
        { name: "Website", percentage: 14, color: "#a855f7" },
        { name: "Referral", percentage: 11, color: "#22c55e" },
        { name: "Walk-in", percentage: 5, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹1,950/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 1, amount: "₹24 L" },
      uncontactedLeads: 7,
    },
  },
  hyderabad: {
    primary: {
      totalProjects: 48,
      activeProjects: 36,
      onTrack: { count: 28, percentage: 78 },
      atRisk: { count: 6, percentage: 17 },
      delayed: { count: 2, percentage: 5 },
    },
    secondary: {
      totalRevenue: "₹156 Cr",
      thisMonth: "₹8.2 Cr",
      monthChange: "↑ 18%",
      pendingPayment: "₹3.4 Cr",
      pendingProjects: 12,
      teamMembers: 124,
    },
    pipeline: {
      value: "₹3.9 Cr",
      conversionRate: "8.2%",
      stages: [
        { name: "New", count: 34 },
        { name: "Contacted", count: 27 },
        { name: "Qualified", count: 17 },
        { name: "Site Visit", count: 10 },
        { name: "Negotiation", count: 5 },
        { name: "Won", count: 3 },
      ],
    },
    revenueChart: {
      values: [0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.9, 1.0, 1.2, 1.3, 1.4, 1.5],
      totalFY: "₹11.6 Cr",
      avgMonthly: "₹0.97 Cr",
      growth: "+26%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Rahul S.", deals: 8, rank: 1 },
        { name: "Priya M.", deals: 6, rank: 2 },
        { name: "Arun K.", deals: 5, rank: 3 },
      ],
      responseTimes: [
        { city: "Hyderabad", time: "12 min", status: "good" },
      ],
    },
    cityPerformance: [
      { city: "Hyderabad", code: "Hy", projects: 48, revenue: "₹8.2Cr", convRate: "8.2%" },
    ],
    leadSources: {
      total: 128,
      sources: [
        { name: "Facebook", percentage: 45, color: "#3b82f6" },
        { name: "Google", percentage: 25, color: "#ef4444" },
        { name: "Website", percentage: 15, color: "#a855f7" },
        { name: "Referral", percentage: 10, color: "#22c55e" },
        { name: "Walk-in", percentage: 5, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹2,100/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 1, amount: "₹37 L" },
      uncontactedLeads: 12,
    },
  },
  kolkata: {
    primary: {
      totalProjects: 28,
      activeProjects: 21,
      onTrack: { count: 15, percentage: 71 },
      atRisk: { count: 4, percentage: 19 },
      delayed: { count: 2, percentage: 10 },
    },
    secondary: {
      totalRevenue: "₹86 Cr",
      thisMonth: "₹4.5 Cr",
      monthChange: "↑ 5%",
      pendingPayment: "₹1.9 Cr",
      pendingProjects: 7,
      teamMembers: 72,
    },
    pipeline: {
      value: "₹2.1 Cr",
      conversionRate: "6.5%",
      stages: [
        { name: "New", count: 18 },
        { name: "Contacted", count: 14 },
        { name: "Qualified", count: 9 },
        { name: "Site Visit", count: 5 },
        { name: "Negotiation", count: 2 },
        { name: "Won", count: 1 },
      ],
    },
    revenueChart: {
      values: [0.3, 0.3, 0.4, 0.4, 0.5, 0.4, 0.4, 0.5, 0.5, 0.6, 0.6, 0.7],
      totalFY: "₹5.6 Cr",
      avgMonthly: "₹0.47 Cr",
      growth: "+12%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Sourav B.", deals: 3, rank: 1 },
        { name: "Dipika G.", deals: 2, rank: 2 },
        { name: "Arnab S.", deals: 2, rank: 3 },
      ],
      responseTimes: [
        { city: "Kolkata", time: "19 min", status: "warning" },
      ],
    },
    cityPerformance: [
      { city: "Kolkata", code: "Ko", projects: 28, revenue: "₹4.5Cr", convRate: "6.5%" },
    ],
    leadSources: {
      total: 68,
      sources: [
        { name: "Facebook", percentage: 48, color: "#3b82f6" },
        { name: "Google", percentage: 22, color: "#ef4444" },
        { name: "Website", percentage: 12, color: "#a855f7" },
        { name: "Referral", percentage: 12, color: "#22c55e" },
        { name: "Walk-in", percentage: 6, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹1,800/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 1, amount: "₹19 L" },
      uncontactedLeads: 5,
    },
  },
  pune: {
    primary: {
      totalProjects: 38,
      activeProjects: 29,
      onTrack: { count: 23, percentage: 79 },
      atRisk: { count: 4, percentage: 14 },
      delayed: { count: 2, percentage: 7 },
    },
    secondary: {
      totalRevenue: "₹128 Cr",
      thisMonth: "₹6.8 Cr",
      monthChange: "↑ 12%",
      pendingPayment: "₹2.8 Cr",
      pendingProjects: 10,
      teamMembers: 86,
    },
    pipeline: {
      value: "₹3.2 Cr",
      conversionRate: "7.8%",
      stages: [
        { name: "New", count: 26 },
        { name: "Contacted", count: 21 },
        { name: "Qualified", count: 13 },
        { name: "Site Visit", count: 7 },
        { name: "Negotiation", count: 4 },
        { name: "Won", count: 2 },
      ],
    },
    revenueChart: {
      values: [0.4, 0.5, 0.5, 0.6, 0.7, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.1],
      totalFY: "₹8.8 Cr",
      avgMonthly: "₹0.73 Cr",
      growth: "+20%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Vishal K.", deals: 4, rank: 1 },
        { name: "Pooja M.", deals: 3, rank: 2 },
        { name: "Nikhil S.", deals: 3, rank: 3 },
      ],
      responseTimes: [
        { city: "Pune", time: "14 min", status: "good" },
      ],
    },
    cityPerformance: [
      { city: "Pune", code: "Pu", projects: 38, revenue: "₹6.8Cr", convRate: "7.8%" },
    ],
    leadSources: {
      total: 98,
      sources: [
        { name: "Facebook", percentage: 36, color: "#3b82f6" },
        { name: "Google", percentage: 32, color: "#ef4444" },
        { name: "Website", percentage: 18, color: "#a855f7" },
        { name: "Referral", percentage: 10, color: "#22c55e" },
        { name: "Walk-in", percentage: 4, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹2,000/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 1, amount: "₹28 L" },
      uncontactedLeads: 6,
    },
  },
  vijayawada: {
    primary: {
      totalProjects: 18,
      activeProjects: 14,
      onTrack: { count: 11, percentage: 79 },
      atRisk: { count: 2, percentage: 14 },
      delayed: { count: 1, percentage: 7 },
    },
    secondary: {
      totalRevenue: "₹44 Cr",
      thisMonth: "₹2.3 Cr",
      monthChange: "↑ 15%",
      pendingPayment: "₹0.9 Cr",
      pendingProjects: 4,
      teamMembers: 48,
    },
    pipeline: {
      value: "₹1.1 Cr",
      conversionRate: "7.5%",
      stages: [
        { name: "New", count: 12 },
        { name: "Contacted", count: 10 },
        { name: "Qualified", count: 6 },
        { name: "Site Visit", count: 3 },
        { name: "Negotiation", count: 2 },
        { name: "Won", count: 1 },
      ],
    },
    revenueChart: {
      values: [0.1, 0.2, 0.2, 0.2, 0.3, 0.2, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5],
      totalFY: "₹3.5 Cr",
      avgMonthly: "₹0.29 Cr",
      growth: "+28%",
    },
    teamPerformance: {
      topPerformers: [
        { name: "Venkat R.", deals: 3, rank: 1 },
        { name: "Swathi K.", deals: 2, rank: 2 },
        { name: "Prasad M.", deals: 2, rank: 3 },
      ],
      responseTimes: [
        { city: "Vijayawada", time: "11 min", status: "good" },
      ],
    },
    cityPerformance: [
      { city: "Vijayawada", code: "Vi", projects: 18, revenue: "₹2.3Cr", convRate: "7.5%" },
    ],
    leadSources: {
      total: 52,
      sources: [
        { name: "Facebook", percentage: 50, color: "#3b82f6" },
        { name: "Google", percentage: 20, color: "#ef4444" },
        { name: "Website", percentage: 10, color: "#a855f7" },
        { name: "Referral", percentage: 15, color: "#22c55e" },
        { name: "Walk-in", percentage: 5, color: "#f97316" },
      ],
      bestROI: { source: "Referral", cost: "₹1,500/lead" },
    },
    alerts: {
      paymentsOverdue: { count: 0, amount: "₹0" },
      uncontactedLeads: 3,
    },
  },
}

// Branch multipliers for adjusting location metrics
const branchMultipliers: Record<string, { projects: number; revenue: number; team: number; onTrackBoost: number }> = {
  all: { projects: 1, revenue: 1, team: 1, onTrackBoost: 0 },
  // Branch multipliers vary between 15-35% of city total
  default_large: { projects: 0.32, revenue: 0.34, team: 0.30, onTrackBoost: 2 },
  default_medium: { projects: 0.25, revenue: 0.26, team: 0.24, onTrackBoost: 1 },
  default_small: { projects: 0.18, revenue: 0.19, team: 0.17, onTrackBoost: -1 },
}

// Category multipliers for adjusting metrics
const categoryMultipliers: Record<string, { projects: number; revenue: number; team: number; onTrackBoost: number }> = {
  all: { projects: 1, revenue: 1, team: 1, onTrackBoost: 0 },
  building: { projects: 0.46, revenue: 0.49, team: 0.40, onTrackBoost: 4 },
  transportation: { projects: 0.16, revenue: 0.22, team: 0.16, onTrackBoost: -7 },
  civil: { projects: 0.11, revenue: 0.11, team: 0.11, onTrackBoost: -8 },
  industrial: { projects: 0.10, revenue: 0.10, team: 0.09, onTrackBoost: 2 },
  water: { projects: 0.07, revenue: 0.06, team: 0.06, onTrackBoost: 3 },
  energy: { projects: 0.05, revenue: 0.08, team: 0.05, onTrackBoost: -9 },
  urban: { projects: 0.07, revenue: 0.09, team: 0.07, onTrackBoost: -1 },
  specialized: { projects: 0.03, revenue: 0.03, team: 0.04, onTrackBoost: 7 },
  social: { projects: 0.06, revenue: 0.04, team: 0.05, onTrackBoost: 6 },
  renovation: { projects: 0.04, revenue: 0.03, team: 0.04, onTrackBoost: 12 },
}

// Category labels for titles
export const categoryLabels: Record<string, string> = {
  all: "All Projects",
  building: "Building Construction",
  transportation: "Transportation Infrastructure",
  civil: "Heavy Civil / Infrastructure",
  industrial: "Industrial Construction",
  water: "Water & Wastewater Projects",
  energy: "Oil, Gas & Energy Projects",
  urban: "Urban Development & Smart City",
  specialized: "Specialized Construction Projects",
  social: "Social Infrastructure Projects",
  renovation: "Renovation & Rehabilitation Projects",
}

// Location labels for titles
export const locationLabels: Record<string, string> = {
  all: "All India",
  mumbai: "Mumbai",
  delhi: "Delhi",
  bengaluru: "Bengaluru",
  chennai: "Chennai",
  hyderabad: "Hyderabad",
  kolkata: "Kolkata",
  pune: "Pune",
  vijayawada: "Vijayawada",
}

// Function to get metrics based on filters
export function getFilteredMetrics(category: ProjectCategory, location: Location, branch: Branch = "all"): DashboardMetrics | null {
  const baseMetrics = locationMetrics[location] || locationMetrics.all
  const categoryMultiplier = categoryMultipliers[category] || categoryMultipliers.all
  
  // Determine branch multiplier - use hash of branch name to get consistent but varied multipliers
  let branchMultiplier = branchMultipliers.all
  if (branch !== "all" && location !== "all") {
    // Simple hash to determine branch size category
    const branchHash = branch.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const branchType = branchHash % 3
    if (branchType === 0) branchMultiplier = branchMultipliers.default_large
    else if (branchType === 1) branchMultiplier = branchMultipliers.default_medium
    else branchMultiplier = branchMultipliers.default_small
  }
  
  // Combine category and branch multipliers
  const multiplier = {
    projects: categoryMultiplier.projects * branchMultiplier.projects,
    revenue: categoryMultiplier.revenue * branchMultiplier.revenue,
    team: categoryMultiplier.team * branchMultiplier.team,
    onTrackBoost: categoryMultiplier.onTrackBoost + branchMultiplier.onTrackBoost,
  }
  
  // Build title
  let title = "Dashboard Overview"
  let subtitle = ""
  
  if (category === "all" && location === "all") {
    subtitle = "All Projects"
  } else if (category === "all") {
    subtitle = locationLabels[location]
  } else if (location === "all") {
    subtitle = categoryLabels[category]
  } else {
    subtitle = `${categoryLabels[category]} in ${locationLabels[location]}`
  }
  
  // Apply category multiplier to base location metrics
  const totalProjects = Math.round(baseMetrics.primary.totalProjects * multiplier.projects)
  const activeProjects = Math.round(baseMetrics.primary.activeProjects * multiplier.projects)
  
  // Check for empty state (very low project count)
  if (totalProjects < 2 && category !== "all" && location !== "all") {
    return null // Signal empty state
  }
  
  // Calculate health metrics
  const baseOnTrack = baseMetrics.primary.onTrack.percentage + multiplier.onTrackBoost
  const onTrackPct = Math.min(95, Math.max(50, baseOnTrack))
  const onTrackCount = Math.round(activeProjects * onTrackPct / 100)
  const remaining = activeProjects - onTrackCount
  const atRiskCount = Math.round(remaining * 0.7)
  const delayedCount = remaining - atRiskCount
  
  const atRiskPct = activeProjects > 0 ? Math.round((atRiskCount / activeProjects) * 100) : 0
  const delayedPct = activeProjects > 0 ? Math.round((delayedCount / activeProjects) * 100) : 0
  
  // Parse and adjust revenue
  const revenueMatch = baseMetrics.secondary.totalRevenue.match(/₹([\d.]+)\s*(Cr|L)?/)
  const baseRevenue = revenueMatch ? parseFloat(revenueMatch[1]) : 0
  const adjustedRevenue = baseRevenue * multiplier.revenue
  const totalRevenue = adjustedRevenue >= 1 ? `₹${adjustedRevenue.toFixed(0)} Cr` : `₹${(adjustedRevenue * 100).toFixed(0)} L`
  
  const monthMatch = baseMetrics.secondary.thisMonth.match(/₹([\d.]+)\s*(Cr|L)?/)
  const baseMonth = monthMatch ? parseFloat(monthMatch[1]) : 0
  const adjustedMonth = baseMonth * multiplier.revenue
  const thisMonth = adjustedMonth >= 1 ? `₹${adjustedMonth.toFixed(1)} Cr` : `₹${(adjustedMonth * 100).toFixed(0)} L`
  
  const pendingMatch = baseMetrics.secondary.pendingPayment.match(/₹([\d.]+)\s*(Cr|L)?/)
  const basePending = pendingMatch ? parseFloat(pendingMatch[1]) : 0
  const adjustedPending = basePending * multiplier.revenue
  const pendingPayment = adjustedPending >= 1 ? `₹${adjustedPending.toFixed(1)} Cr` : `₹${(adjustedPending * 100).toFixed(0)} L`
  
  // Adjust pipeline
  const pipelineStages = baseMetrics.pipeline.stages.map(stage => ({
    name: stage.name,
    count: Math.max(1, Math.round(stage.count * multiplier.projects)),
  }))
  
  const pipelineMatch = baseMetrics.pipeline.value.match(/₹([\d.]+)\s*(Cr|L)?/)
  const basePipelineValue = pipelineMatch ? parseFloat(pipelineMatch[1]) : 0
  const adjustedPipelineValue = basePipelineValue * multiplier.revenue
  const pipelineValue = adjustedPipelineValue >= 1 ? `₹${adjustedPipelineValue.toFixed(1)} Cr` : `₹${(adjustedPipelineValue * 100).toFixed(0)} L`
  
  // Adjust revenue chart values
  const chartValues = baseMetrics.revenueChart.values.map(v => v * multiplier.revenue)
  const totalFYMatch = baseMetrics.revenueChart.totalFY.match(/₹([\d.]+)\s*(Cr|L)?/)
  const baseFY = totalFYMatch ? parseFloat(totalFYMatch[1]) : 0
  const adjustedFY = baseFY * multiplier.revenue
  const totalFY = adjustedFY >= 1 ? `₹${adjustedFY.toFixed(1)} Cr` : `₹${(adjustedFY * 100).toFixed(0)} L`
  
  const avgMatch = baseMetrics.revenueChart.avgMonthly.match(/₹([\d.]+)\s*(Cr|L)?/)
  const baseAvg = avgMatch ? parseFloat(avgMatch[1]) : 0
  const adjustedAvg = baseAvg * multiplier.revenue
  const avgMonthly = adjustedAvg >= 1 ? `₹${adjustedAvg.toFixed(2)} Cr` : `₹${(adjustedAvg * 100).toFixed(0)} L`
  
  return {
    title,
    subtitle,
    primary: {
      totalProjects,
      activeProjects,
      onTrack: { count: onTrackCount, percentage: onTrackPct },
      atRisk: { count: atRiskCount, percentage: atRiskPct },
      delayed: { count: delayedCount, percentage: delayedPct },
    },
    secondary: {
      totalRevenue,
      thisMonth,
      monthChange: baseMetrics.secondary.monthChange,
      pendingPayment,
      pendingProjects: Math.max(1, Math.round(baseMetrics.secondary.pendingProjects * multiplier.projects)),
      teamMembers: Math.max(1, Math.round(baseMetrics.secondary.teamMembers * multiplier.team)),
    },
    pipeline: {
      value: pipelineValue,
      conversionRate: baseMetrics.pipeline.conversionRate,
      stages: pipelineStages,
    },
    revenueChart: {
      values: chartValues,
      totalFY,
      avgMonthly,
      growth: baseMetrics.revenueChart.growth,
    },
    teamPerformance: {
      topPerformers: baseMetrics.teamPerformance.topPerformers.map(p => ({
        ...p,
        deals: Math.max(1, Math.round(p.deals * multiplier.projects)),
      })),
      responseTimes: baseMetrics.teamPerformance.responseTimes,
    },
    cityPerformance: baseMetrics.cityPerformance.map(c => ({
      ...c,
      projects: Math.max(1, Math.round(c.projects * multiplier.projects)),
    })),
    leadSources: {
      total: Math.round(baseMetrics.leadSources.total * multiplier.projects),
      sources: baseMetrics.leadSources.sources,
      bestROI: baseMetrics.leadSources.bestROI,
    },
    alerts: {
      paymentsOverdue: {
        count: Math.round(baseMetrics.alerts.paymentsOverdue.count * multiplier.projects),
        amount: baseMetrics.alerts.paymentsOverdue.amount,
      },
      uncontactedLeads: Math.max(0, Math.round(baseMetrics.alerts.uncontactedLeads * multiplier.projects)),
    },
  }
}
