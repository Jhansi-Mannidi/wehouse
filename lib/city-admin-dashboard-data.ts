import { locations, locationBranches } from "@/components/shell/header-filters"

export type BranchStatus = "on_track" | "at_risk" | "delayed"

export interface BranchRow {
  id: string
  city: string
  cityValue: string
  cityCode: string
  branchName: string
  branchValue: string
  projectManager: string
  projectsCount: number
  activeProjects: number
  revenue: string
  revenueMTD: string
  pendingPayment: string
  startDate: string
  endDate: string
  status: BranchStatus
  delayDays?: number
}

export interface CityOption {
  value: string
  label: string
}

export interface BranchOption {
  value: string
  label: string
}

export interface CityAdminAnalytics {
  revenueByMonth: { month: string; revenue: number; target?: number }[]
  statusDistribution: { name: string; value: number; color: string }[]
  projectsTrend: { month: string; projects: number }[]
  branchPerformance: { branchName: string; revenue: number; projects: number }[]
  pipelineByMonth: { month: string; pipeline: number; won: number }[]
  leadsByMonth: { month: string; leads: number; converted: number }[]
  cityHighlights: { title: string; value: string; trend: "up" | "down" | "neutral"; description: string }[]
}

export interface CityAdminFinancialSummary {
  totalRevenue: string
  revenueMTD: string
  pendingPayments: string
  totalBranches: number
  activeProjects: number
  monthChange: string
}

export interface ProjectManagerSummary {
  name: string
  branchId: string
  city: string
  branchName: string
  projectsCount: number
  onTrack: number
  atRisk: number
  delayed: number
}

const cityLabels: Record<string, string> = {
  mumbai: "Mumbai",
  delhi: "Delhi",
  bengaluru: "Bengaluru",
  chennai: "Chennai",
  hyderabad: "Hyderabad",
  kolkata: "Kolkata",
  pune: "Pune",
  vijayawada: "Vijayawada",
}

const cityCodes: Record<string, string> = {
  mumbai: "Mu",
  delhi: "De",
  bengaluru: "Ba",
  chennai: "Ch",
  hyderabad: "Hy",
  kolkata: "Ko",
  pune: "Pu",
  vijayawada: "Vi",
}

// Sample PM names per city for variety
const pmNamesByCity: Record<string, string[]> = {
  mumbai: ["Vikram P.", "Neha S.", "Amit R.", "Priya K.", "Raj M.", "Sneha D."],
  delhi: ["Sanjay G.", "Meera D.", "Ravi P.", "Anil S.", "Kavita R.", "Vijay K."],
  bengaluru: ["Kiran T.", "Sneha B.", "Rajesh K.", "Arun M.", "Divya S.", "Nikhil P."],
  chennai: ["Lakshmi R.", "Kumar S.", "Anitha P.", "Suresh V.", "Deepa M.", "Manoj K."],
  hyderabad: ["Rahul S.", "Priya M.", "Arun K.", "Swathi N.", "Venkat R.", "Pooja G."],
  kolkata: ["Sourav B.", "Dipika G.", "Arnab S.", "Rina M.", "Biswajit P.", "Mou D."],
  pune: ["Vishal K.", "Pooja M.", "Nikhil S.", "Rohit D.", "Kavya R.", "Aditya M."],
  vijayawada: ["Venkat R.", "Swathi K.", "Prasad M.", "Lakshmi P.", "Ramesh S.", "Anjali V."],
}

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

function seedFromId(id: string): number {
  return id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

// Hyderabad-specific analytics data (realistic city-level data)
const HYDERABAD_ANALYTICS = {
  revenueByMonth: [
    { month: "Jan", revenue: 1.2, target: 1.1 },
    { month: "Feb", revenue: 1.4, target: 1.2 },
    { month: "Mar", revenue: 1.5, target: 1.35 },
    { month: "Apr", revenue: 1.6, target: 1.4 },
    { month: "May", revenue: 1.7, target: 1.5 },
    { month: "Jun", revenue: 1.65, target: 1.55 },
    { month: "Jul", revenue: 1.8, target: 1.6 },
    { month: "Aug", revenue: 1.9, target: 1.7 },
    { month: "Sep", revenue: 2.0, target: 1.8 },
    { month: "Oct", revenue: 2.1, target: 1.9 },
    { month: "Nov", revenue: 2.2, target: 2.0 },
    { month: "Dec", revenue: 2.3, target: 2.1 },
  ],
  branchPerformance: [
    { branchName: "Banjara Hills", revenue: 0.52, projects: 8 },
    { branchName: "Jubilee Hills", revenue: 0.48, projects: 7 },
    { branchName: "Hitech City", revenue: 0.61, projects: 9 },
    { branchName: "Gachibowli", revenue: 0.44, projects: 6 },
    { branchName: "Madhapur", revenue: 0.55, projects: 8 },
  ],
  pipelineByMonth: [
    { month: "Jan", pipeline: 2.8, won: 0.4 },
    { month: "Feb", pipeline: 3.0, won: 0.5 },
    { month: "Mar", pipeline: 3.2, won: 0.5 },
    { month: "Apr", pipeline: 3.4, won: 0.6 },
    { month: "May", pipeline: 3.6, won: 0.6 },
    { month: "Jun", pipeline: 3.5, won: 0.5 },
    { month: "Jul", pipeline: 3.8, won: 0.7 },
    { month: "Aug", pipeline: 4.0, won: 0.7 },
    { month: "Sep", pipeline: 4.2, won: 0.8 },
    { month: "Oct", pipeline: 4.3, won: 0.8 },
    { month: "Nov", pipeline: 4.5, won: 0.9 },
    { month: "Dec", pipeline: 4.6, won: 0.9 },
  ],
  leadsByMonth: [
    { month: "Jan", leads: 42, converted: 8 },
    { month: "Feb", leads: 48, converted: 10 },
    { month: "Mar", leads: 52, converted: 11 },
    { month: "Apr", leads: 55, converted: 12 },
    { month: "May", leads: 58, converted: 12 },
    { month: "Jun", leads: 54, converted: 11 },
    { month: "Jul", leads: 62, converted: 14 },
    { month: "Aug", leads: 65, converted: 14 },
    { month: "Sep", leads: 70, converted: 15 },
    { month: "Oct", leads: 72, converted: 16 },
    { month: "Nov", leads: 78, converted: 17 },
    { month: "Dec", leads: 82, converted: 18 },
  ],
  cityHighlights: [
    { title: "YoY Revenue growth", value: "+18%", trend: "up" as const, description: "vs last year" },
    { title: "Pipeline value", value: "₹4.6 Cr", trend: "up" as const, description: "current month" },
    { title: "Lead conversion", value: "22%", trend: "up" as const, description: "avg last 6 months" },
    { title: "Projects on track", value: "78%", trend: "up" as const, description: "Hyderabad branches" },
    { title: "Pending collections", value: "₹3.4 Cr", trend: "neutral" as const, description: "across branches" },
  ],
}

export function getCityAdminBranchData(): BranchRow[] {
  const rows: BranchRow[] = []
  const locs = locations.filter((l) => l.value !== "all") as { value: string; label: string }[]

  locs.forEach((loc) => {
    const branches = locationBranches[loc.value]
    if (!branches) return
    const cityLabel = cityLabels[loc.value] || loc.label
    const cityCode = cityCodes[loc.value] || loc.value.slice(0, 2).toUpperCase()
    const pms = pmNamesByCity[loc.value] || ["PM"]

    branches.forEach((b, idx) => {
      if (b.value === "all") return
      const id = `${loc.value}-${b.value}`
      const seed = seedFromId(id)
      const projectsCount = 3 + (seed % 12)
      const activeProjects = Math.max(1, Math.floor(projectsCount * (0.6 + (seed % 30) / 100)))
      const statusRoll = seed % 10
      const status: BranchStatus =
        statusRoll >= 7 ? "delayed" : statusRoll >= 4 ? "at_risk" : "on_track"
      const delayDays = status === "delayed" ? 1 + (seed % 14) : undefined
      const revenueCr = (seed % 50) / 10 + 0.5
      const revenue = revenueCr >= 1 ? `₹${revenueCr.toFixed(1)} Cr` : `₹${(revenueCr * 100).toFixed(0)} L`
      const revenueMTD = `₹${((seed % 30) / 10).toFixed(1)} Cr`
      const pendingCr = (seed % 20) / 20
      const pendingPayment = pendingCr >= 0.5 ? `₹${(pendingCr * 10).toFixed(1)} L` : `₹${(pendingCr * 100).toFixed(0)} L`
      const start = new Date(2024, 0, 1)
      const end = new Date(2025, 11, 31)
      const startDate = randomDate(start, end)
      const endDate = randomDate(new Date(2025, 0, 1), new Date(2026, 5, 30))
      const pmIndex = seed % pms.length
      const projectManager = pms[pmIndex]

      rows.push({
        id,
        city: cityLabel,
        cityValue: loc.value,
        cityCode,
        branchName: b.label,
        branchValue: b.value,
        projectManager,
        projectsCount,
        activeProjects,
        revenue,
        revenueMTD,
        pendingPayment,
        startDate,
        endDate,
        status,
        delayDays,
      })
    })
  })

  return rows
}

export function getCityAdminFinancialSummary(branches: BranchRow[]): CityAdminFinancialSummary {
  let totalCr = 0
  let mtdCr = 0
  let pendingCr = 0
  branches.forEach((b) => {
    const r = parseFloat(b.revenue.replace(/[₹CrL\s]/g, "")) || 0
    const isCr = b.revenue.includes("Cr")
    totalCr += isCr ? r : r / 100
    const m = parseFloat(b.revenueMTD.replace(/[₹CrL\s]/g, "")) || 0
    mtdCr += b.revenueMTD.includes("Cr") ? m : m / 100
    const p = parseFloat(b.pendingPayment.replace(/[₹CrL\s]/g, "")) || 0
    pendingCr += b.pendingPayment.includes("L") ? p / 100 : p
  })
  const totalRevenue = totalCr >= 1 ? `₹${totalCr.toFixed(1)} Cr` : `₹${(totalCr * 100).toFixed(0)} L`
  const revenueMTD = mtdCr >= 1 ? `₹${mtdCr.toFixed(1)} Cr` : `₹${(mtdCr * 100).toFixed(0)} L`
  const pendingPayments = pendingCr >= 1 ? `₹${pendingCr.toFixed(1)} Cr` : `₹${(pendingCr * 100).toFixed(0)} L`
  const activeProjects = branches.reduce((acc, b) => acc + b.activeProjects, 0)

  return {
    totalRevenue,
    revenueMTD,
    pendingPayments,
    totalBranches: branches.length,
    activeProjects,
    monthChange: "+12%",
  }
}

export const cityOptions: CityOption[] = (locations.filter((l) => l.value !== "all") as { value: string; label: string }[]).map(
  (l) => ({ value: l.value, label: cityLabels[l.value] || l.label })
)

export function getBranchOptionsForCity(cityValue: string): BranchOption[] {
  const list = locationBranches[cityValue]
  if (!list) return [{ value: "all", label: "All Branches" }]
  return [{ value: "all", label: "All Branches" }, ...list.filter((b) => b.value !== "all")]
}

export function getCityAdminAnalytics(branches: BranchRow[], cityValue?: string): CityAdminAnalytics {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const isHyderabad = cityValue === "hyderabad" || (branches.length > 0 && branches[0].cityValue === "hyderabad")

  if (isHyderabad && branches.some((b) => b.cityValue === "hyderabad")) {
    const h = HYDERABAD_ANALYTICS
    const onTrack = branches.filter((b) => b.status === "on_track").length
    const atRisk = branches.filter((b) => b.status === "at_risk").length
    const delayed = branches.filter((b) => b.status === "delayed").length
    const statusDistribution = [
      { name: "On track", value: onTrack, color: "hsl(var(--success))" },
      { name: "At risk", value: atRisk, color: "hsl(var(--warning))" },
      { name: "Delayed", value: delayed, color: "hsl(var(--destructive))" },
    ].filter((d) => d.value > 0)
    const totalProjects = branches.reduce((a, b) => a + b.activeProjects, 0)
    const projectsTrend = months.map((month, i) => ({
      month,
      projects: Math.max(1, Math.round((totalProjects / 12) * (0.85 + i * 0.012))),
    }))
    const branchPerformance =
      branches.length > 0
        ? branches.map((b) => {
            const r = parseFloat(b.revenue.replace(/[₹CrL\s]/g, "")) || 0
            const cr = b.revenue.includes("Cr") ? r : r / 100
            return { branchName: b.branchName, revenue: Math.round(cr * 10) / 10, projects: b.activeProjects }
          }).sort((a, b) => b.revenue - a.revenue)
        : h.branchPerformance
    return {
      revenueByMonth: h.revenueByMonth,
      statusDistribution,
      projectsTrend,
      branchPerformance,
      pipelineByMonth: h.pipelineByMonth,
      leadsByMonth: h.leadsByMonth,
      cityHighlights: h.cityHighlights,
    }
  }

  const seed = branches.reduce((acc, b) => acc + seedFromId(b.id), 0)
  const baseRevenue = branches.reduce((sum, b) => {
    const r = parseFloat(b.revenue.replace(/[₹CrL\s]/g, "")) || 0
    return sum + (b.revenue.includes("Cr") ? r : r / 100)
  }, 0)
  const revenueByMonth = months.map((month, i) => ({
    month,
    revenue: Math.round((baseRevenue / 12) * (0.7 + (seed % 30) / 100 + i * 0.02) * 10) / 10,
    target: Math.round((baseRevenue / 12) * 0.95 * 10) / 10,
  }))
  const onTrack = branches.filter((b) => b.status === "on_track").length
  const atRisk = branches.filter((b) => b.status === "at_risk").length
  const delayed = branches.filter((b) => b.status === "delayed").length
  const statusDistribution = [
    { name: "On track", value: onTrack, color: "hsl(var(--success))" },
    { name: "At risk", value: atRisk, color: "hsl(var(--warning))" },
    { name: "Delayed", value: delayed, color: "hsl(var(--destructive))" },
  ].filter((d) => d.value > 0)
  const totalProjects = branches.reduce((a, b) => a + b.activeProjects, 0)
  const projectsTrend = months.map((month, i) => ({
    month,
    projects: Math.max(1, Math.round((totalProjects / 12) * (0.8 + (seed % 20) / 100 + i * 0.015))),
  }))
  const branchPerformance = branches.map((b) => {
    const r = parseFloat(b.revenue.replace(/[₹CrL\s]/g, "")) || 0
    const cr = b.revenue.includes("Cr") ? r : r / 100
    return { branchName: b.branchName, revenue: Math.round(cr * 10) / 10, projects: b.activeProjects }
  }).sort((a, b) => b.revenue - a.revenue)
  const pipelineByMonth = months.map((month, i) => ({
    month,
    pipeline: Math.round((baseRevenue * 1.2 * (0.9 + i * 0.01)) * 10) / 10,
    won: Math.round((baseRevenue * 0.15 * (0.8 + i * 0.02)) * 10) / 10,
  }))
  const baseLeads = Math.max(20, totalProjects * 4)
  const leadsByMonth = months.map((month, i) => ({
    month,
    leads: Math.round(baseLeads * (0.7 + (seed % 20) / 100 + i * 0.02)),
    converted: Math.round(baseLeads * 0.2 * (0.75 + i * 0.015)),
  }))
  const cityHighlights = [
    { title: "YoY Revenue growth", value: `+${10 + (seed % 10)}%`, trend: "up" as const, description: "vs last year" },
    { title: "Pipeline value", value: `₹${(baseRevenue * 0.4).toFixed(1)} Cr`, trend: "neutral" as const, description: "current" },
    { title: "Lead conversion", value: `${18 + (seed % 6)}%`, trend: "up" as const, description: "avg" },
    { title: "Projects on track", value: `${Math.min(85, 60 + onTrack * 3)}%`, trend: onTrack > atRisk ? "up" : "neutral", description: "branches" },
    { title: "Pending collections", value: `₹${(baseRevenue * 0.35).toFixed(1)} Cr`, trend: "neutral" as const, description: "outstanding" },
  ]
  return {
    revenueByMonth,
    statusDistribution,
    projectsTrend,
    branchPerformance,
    pipelineByMonth,
    leadsByMonth,
    cityHighlights,
  }
}

export function getProjectManagerSummaries(branches: BranchRow[]): ProjectManagerSummary[] {
  const byPm = new Map<string, { row: BranchRow; rows: BranchRow[] }>()
  branches.forEach((row) => {
    const key = `${row.city}-${row.projectManager}`
    if (!byPm.has(key)) {
      byPm.set(key, { row, rows: [] })
    }
    byPm.get(key)!.rows.push(row)
  })

  return Array.from(byPm.values()).map(({ row, rows }) => {
    const total = rows.reduce((a, r) => a + r.projectsCount, 0)
    const onTrack = rows.filter((r) => r.status === "on_track").length
    const atRisk = rows.filter((r) => r.status === "at_risk").length
    const delayed = rows.filter((r) => r.status === "delayed").length
    return {
      name: row.projectManager,
      branchId: row.id,
      city: row.city,
      branchName: row.branchName,
      projectsCount: total,
      onTrack,
      atRisk,
      delayed,
    }
  })
}
