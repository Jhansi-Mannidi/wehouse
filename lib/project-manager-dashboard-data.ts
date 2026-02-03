/**
 * Project Manager Dashboard data — Hyderabad location only
 */

export type ProjectStage =
  | "planning"
  | "design"
  | "foundation"
  | "structure"
  | "mep"
  | "finishing"
  | "handover"

export interface ProjectItem {
  id: string
  name: string
  stage: ProjectStage
  budgetCr: number
  spentCr: number
  siteEngineerIds: string[]
  openTickets: number
  progress: number
  startDate: string
  expectedEndDate: string
}

export interface SiteEngineerItem {
  id: string
  name: string
  projectIds: string[]
  activeTickets: number
  projectsCount: number
}

export interface TicketItem {
  id: string
  title: string
  projectId: string
  projectName: string
  siteEngineerId: string
  status: "open" | "in_progress" | "resolved"
  priority: "low" | "medium" | "high"
  raisedAt: string
}

export interface ProjectManagerAnalytics {
  projectsByStage: { stage: string; label: string; count: number; color: string }[]
  budgetSummary: { totalBudget: string; totalSpent: string; utilizedPercent: number; variance: string }
  ticketSummary: { open: number; inProgress: number; resolved: number }
  budgetByProject: { name: string; budget: number; spent: number; percent: number }[]
}

const STAGE_LABELS: Record<ProjectStage, string> = {
  planning: "Planning",
  design: "Design",
  foundation: "Foundation",
  structure: "Structure",
  mep: "MEP",
  finishing: "Finishing",
  handover: "Handover",
}

const STAGE_COLORS: Record<ProjectStage, string> = {
  planning: "hsl(var(--chart-1))",
  design: "hsl(var(--chart-2))",
  foundation: "hsl(var(--chart-3))",
  structure: "hsl(var(--primary))",
  mep: "hsl(var(--chart-4))",
  finishing: "hsl(var(--chart-5))",
  handover: "hsl(var(--success))",
}

// Hyderabad projects (fixed data)
export const HYDERABAD_PROJECTS: ProjectItem[] = [
  { id: "P-HYD-001", name: "Skyline Residency", stage: "structure", budgetCr: 4.2, spentCr: 1.8, siteEngineerIds: ["SE-1", "SE-2"], openTickets: 3, progress: 42, startDate: "2025-01-15", expectedEndDate: "2026-06-30" },
  { id: "P-HYD-002", name: "Green Valley Villas", stage: "finishing", budgetCr: 3.8, spentCr: 3.2, siteEngineerIds: ["SE-1", "SE-3"], openTickets: 2, progress: 84, startDate: "2024-08-01", expectedEndDate: "2025-12-31" },
  { id: "P-HYD-003", name: "Marina Heights", stage: "mep", budgetCr: 5.1, spentCr: 2.9, siteEngineerIds: ["SE-2", "SE-4"], openTickets: 5, progress: 57, startDate: "2025-03-01", expectedEndDate: "2026-09-30" },
  { id: "P-HYD-004", name: "Jubilee Park Apartments", stage: "foundation", budgetCr: 2.9, spentCr: 0.6, siteEngineerIds: ["SE-3"], openTickets: 1, progress: 21, startDate: "2025-06-01", expectedEndDate: "2026-12-31" },
  { id: "P-HYD-005", name: "Hitech City Commercial", stage: "design", budgetCr: 6.0, spentCr: 0.4, siteEngineerIds: ["SE-4"], openTickets: 0, progress: 7, startDate: "2025-05-01", expectedEndDate: "2027-03-31" },
  { id: "P-HYD-006", name: "Banjara Hills Villa", stage: "handover", budgetCr: 1.8, spentCr: 1.75, siteEngineerIds: ["SE-1"], openTickets: 1, progress: 97, startDate: "2024-02-01", expectedEndDate: "2025-10-31" },
  { id: "P-HYD-007", name: "Gachibowli Towers", stage: "planning", budgetCr: 8.5, spentCr: 0, siteEngineerIds: [], openTickets: 0, progress: 0, startDate: "2025-09-01", expectedEndDate: "2028-06-30" },
]

// Hyderabad site engineers
export const HYDERABAD_SITE_ENGINEERS: SiteEngineerItem[] = [
  { id: "SE-1", name: "Rahul Sharma", projectIds: ["P-HYD-001", "P-HYD-002", "P-HYD-006"], activeTickets: 4, projectsCount: 3 },
  { id: "SE-2", name: "Priya Menon", projectIds: ["P-HYD-001", "P-HYD-003"], activeTickets: 5, projectsCount: 2 },
  { id: "SE-3", name: "Arun Kumar", projectIds: ["P-HYD-002", "P-HYD-004"], activeTickets: 2, projectsCount: 2 },
  { id: "SE-4", name: "Swathi Reddy", projectIds: ["P-HYD-003", "P-HYD-005"], activeTickets: 5, projectsCount: 2 },
]

// Sample tickets (Hyderabad)
export const HYDERABAD_TICKETS: TicketItem[] = [
  { id: "T-001", title: "Foundation crack inspection", projectId: "P-HYD-001", projectName: "Skyline Residency", siteEngineerId: "SE-1", status: "in_progress", priority: "high", raisedAt: "2025-01-28" },
  { id: "T-002", title: "Material delay - Steel", projectId: "P-HYD-001", projectName: "Skyline Residency", siteEngineerId: "SE-2", status: "open", priority: "high", raisedAt: "2025-01-29" },
  { id: "T-003", title: "Client change request - bathroom tiles", projectId: "P-HYD-002", projectName: "Green Valley Villas", siteEngineerId: "SE-1", status: "open", priority: "medium", raisedAt: "2025-01-27" },
  { id: "T-004", title: "MEP drawing revision", projectId: "P-HYD-003", projectName: "Marina Heights", siteEngineerId: "SE-2", status: "in_progress", priority: "medium", raisedAt: "2025-01-26" },
  { id: "T-005", title: "Safety audit follow-up", projectId: "P-HYD-003", projectName: "Marina Heights", siteEngineerId: "SE-4", status: "resolved", priority: "high", raisedAt: "2025-01-25" },
]

export function getProjectManagerAnalytics(): ProjectManagerAnalytics {
  const projects = HYDERABAD_PROJECTS
  const stageCounts = projects.reduce((acc, p) => {
    acc[p.stage] = (acc[p.stage] || 0) + 1
    return acc
  }, {} as Record<ProjectStage, number>)

  const projectsByStage = (Object.keys(STAGE_LABELS) as ProjectStage[]).map((stage) => ({
    stage,
    label: STAGE_LABELS[stage],
    count: stageCounts[stage] || 0,
    color: STAGE_COLORS[stage],
  })).filter((s) => s.count > 0)

  const totalBudget = projects.reduce((s, p) => s + p.budgetCr, 0)
  const totalSpent = projects.reduce((s, p) => s + p.spentCr, 0)
  const utilizedPercent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0
  const variance = totalBudget - totalSpent

  const budgetByProject = projects.map((p) => ({
    name: p.name,
    budget: p.budgetCr,
    spent: p.spentCr,
    percent: p.budgetCr > 0 ? Math.round((p.spentCr / p.budgetCr) * 100) : 0,
  }))

  const tickets = HYDERABAD_TICKETS
  const ticketSummary = {
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  }

  return {
    projectsByStage,
    budgetSummary: {
      totalBudget: `₹${totalBudget.toFixed(1)} Cr`,
      totalSpent: `₹${totalSpent.toFixed(1)} Cr`,
      utilizedPercent,
      variance: `₹${variance.toFixed(1)} Cr`,
    },
    ticketSummary,
    budgetByProject,
  }
}

export { STAGE_LABELS, STAGE_COLORS }
