import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Users,
  Target,
  CheckSquare,
  Calendar,
  FileText,
  ScrollText,
  UserCheck,
  FolderKanban,
  Milestone,
  ClipboardList,
  Hammer,
  Truck,
  PenTool,
  Package,
  ShoppingCart,
  Warehouse,
  DollarSign,
  Receipt,
  BarChart3,
  Settings,
  UserCog,
  Cog,
  MessageCircle,
  Home,
  CreditCard,
  UserPlus,
  Building2,
  ClipboardCheck,
  MapPin,
  ShieldCheck,
  Stamp,
  Globe,
  Search,
  FileStack,
  Gavel,
  Send,
} from "lucide-react"

export type UserRole =
  | "sales_executive"
  | "sales_coordinator"
  | "project_manager"
  | "site_engineer"
  | "quality_assurance_officer"
  | "quality_control_officer"
  | "safety_management_officer"
  | "finance_manager"
  | "procurement_manager"
  | "city_admin"
  | "super_admin"
  | "customer"
  | "vendor"

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  badge?: number
  isActive?: boolean
}

export interface NavGroup {
  title: string
  url: string
  icon: LucideIcon
  items: NavItem[]
  isActive?: boolean
}

export type NavElement = NavItem | NavGroup

export function isNavGroup(item: NavElement): item is NavGroup {
  return "items" in item
}

// Full navigation structure
export const fullNavigation: NavElement[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "CRM",
    url: "/crm",
    icon: Users,
    items: [
      { title: "Leads", url: "/crm/leads", icon: Users, badge: 24 },
      { title: "Pipeline", url: "/crm/pipeline", icon: Target },
      { title: "Tasks", url: "/crm/tasks", icon: CheckSquare, badge: 8 },
      { title: "Appointments", url: "/crm/appointments", icon: Calendar },
    ],
  },
  {
    title: "Sales",
    url: "/sales",
    icon: FileText,
    items: [
      { title: "Quotes", url: "/sales/quotes", icon: FileText },
     
    ],
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Hammer,
    items: [
      { title: "Onboarding", url: "/vendors/onboarding", icon: UserPlus },
      { title: "Vendor List", url: "/vendors/onboarding/dashboard", icon: Building2 },
  
    ],
  },
  {
    title: "Procurement",
    url: "/procurement",
    icon: Package,
    items: [
      { title: "Vendor Discovery", url: "/procurement/vendor-discovery", icon: Search },
      { title: "Scopes of Work", url: "/procurement/scopes", icon: FileStack },
      { title: "Materials", url: "/procurement/materials", icon: Package },
      { title: "Purchase Orders", url: "/procurement/orders", icon: ShoppingCart },
    ],
  },
  {
    title: "Finance",
    url: "/finance",
    icon: DollarSign,
    items: [
      { title: "Payments", url: "/finance/payments", icon: DollarSign },
      { title: "Invoices", url: "/finance/invoices", icon: Receipt },
      { title: "Reports", url: "/finance/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "Users", url: "/settings/users", icon: UserCog },
      { title: "Roles", url: "/settings/roles", icon: Users },
    ],
  },
]

// Site Engineer specific navigation
export const siteEngineerNavigation: NavElement[] = [
  {
    title: "Dashboard",
    url: "/site-engineer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Projects",
    url: "/site-engineer/my-projects",
    icon: FolderKanban,
  },
  {
    title: "Client Connect",
    url: "/site-engineer/client-connect",
    icon: MessageCircle,
    badge: 3, // This will be dynamic based on unread messages
  },
  {
    title: "Tickets",
    url: "/site-engineer/tickets",
    icon: CheckSquare,
  },
  {
    title: "Change Requests",
    url: "/site-engineer/change-requests",
    icon: FileText,
  },
  {
    title: "Reviews",
    url: "/site-engineer/reviews",
    icon: BarChart3,
  },
]

// Customer Portal specific navigation (simplified - Progress/Billing/Documents in sub-header)
export const customerNavigation: NavElement[] = [
  {
    title: "Home",
    url: "/customer",
    icon: Home,
  },
  {
    title: "Connect",
    url: "/customer/chat",
    icon: MessageCircle,
    badge: 2,
  },
]

// QA Officer specific navigation
export const qaOfficerNavigation: NavElement[] = [
  {
    title: "Dashboard",
    url: "/qa/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vendor Review",
    url: "/qa/vendor-review",
    icon: ShieldCheck,
    badge: 3,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Quality Reports",
    url: "/qa/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "Quality Criteria", url: "/qa/settings/criteria", icon: CheckSquare },
      { title: "Profile", url: "/settings/profile", icon: UserCog },
    ],
  },
]

// Super Admin specific navigation
export const superAdminNavigation: NavElement[] = [
  {
    title: "Dashboard",
    url: "/dashboard/management",
    icon: LayoutDashboard,
  },
  {
    title: "Vendor Approvals",
    url: "/super-admin/vendor-approvals",
    icon: Stamp,
    badge: 8,
  },
  {
    title: "CRM",
    url: "/crm",
    icon: Users,
    items: [
      { title: "Leads", url: "/crm/leads", icon: Users, badge: 24 },
      { title: "Pipeline", url: "/crm/pipeline", icon: Target },
      { title: "Tasks", url: "/crm/tasks", icon: CheckSquare, badge: 8 },
      { title: "Appointments", url: "/crm/appointments", icon: Calendar },
    ],
  },
  {
    title: "Sales",
    url: "/sales",
    icon: FileText,
    items: [
      { title: "Quotes", url: "/sales/quotes", icon: FileText },
     
    
    ],
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Hammer,
    items: [
      { title: "Onboarding", url: "/vendors/onboarding", icon: UserPlus },
      { title: "Vendor List", url: "/vendors/onboarding/dashboard", icon: Building2 },
     
    ],
  },
  {
    title: "Procurement",
    url: "/procurement",
    icon: Package,
    items: [
      { title: "Vendor Discovery", url: "/procurement/vendor-discovery", icon: Search },
      { title: "Scopes of Work", url: "/procurement/scopes", icon: FileStack },
      { title: "Materials", url: "/procurement/materials", icon: Package },
      { title: "Purchase Orders", url: "/procurement/orders", icon: ShoppingCart },
    ],
  },
  {
    title: "Finance",
    url: "/finance",
    icon: DollarSign,
    items: [
      { title: "Payments", url: "/finance/payments", icon: DollarSign },
      { title: "Invoices", url: "/finance/invoices", icon: Receipt },
      { title: "Reports", url: "/finance/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "Users", url: "/settings/users", icon: UserCog },
      { title: "Roles", url: "/settings/roles", icon: Users },
      { title: "Cities", url: "/settings/cities", icon: Globe },
    ],
  },
]

// City Admin specific navigation
export const cityAdminNavigation: NavElement[] = [
  {
    title: "Dashboard",
    url: "/city-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vendor Management",
    url: "/city-admin/vendor-management",
    icon: ClipboardCheck,
    badge: 5,
  },
  {
    title: "CRM",
    url: "/crm",
    icon: Users,
    items: [
      { title: "Leads", url: "/crm/leads", icon: Users, badge: 24 },
      { title: "Pipeline", url: "/crm/pipeline", icon: Target },
      { title: "Tasks", url: "/crm/tasks", icon: CheckSquare, badge: 8 },
      { title: "Appointments", url: "/crm/appointments", icon: Calendar },
    ],
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Hammer,
    items: [
      { title: "Onboarding", url: "/vendors/onboarding", icon: UserPlus },
      { title: "Vendor List", url: "/vendors/onboarding/dashboard", icon: Building2 },
      
    ],
  },
  {
    title: "Reports",
    url: "/city-admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "City Settings", url: "/city-admin/settings", icon: MapPin },
      { title: "Users", url: "/settings/users", icon: UserCog },
    ],
  },
]

// Vendor Portal navigation
export const vendorPortalNavigation: NavElement[] = [
  {
    title: "Dashboard",
    url: "/vendor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Invitations",
    url: "/vendor/invitations",
    icon: Send,
    badge: 3,
  },
  {
    title: "My Bids",
    url: "/vendor/bids",
    icon: Gavel,
  },
  {
    title: "Orders",
    url: "/vendor/orders",
    icon: ShoppingCart,
  },
  {
    title: "Profile",
    url: "/vendor/profile",
    icon: Building2,
  },
]

// Project Manager navigation (Hyderabad dashboard)
export const projectManagerNavigation: NavElement[] = [
  {
    title: "Dashboard",
    url: "/dashboard/project-manager",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Hammer,
    items: [
      { title: "Onboarding", url: "/vendors/onboarding", icon: UserPlus },
      { title: "Vendor List", url: "/vendors/onboarding/dashboard", icon: Building2 },
    ],
  },
  {
    title: "Procurement",
    url: "/procurement",
    icon: Package,
    items: [
      { title: "Vendor Discovery", url: "/procurement/vendor-discovery", icon: Search },
      { title: "Scopes of Work", url: "/procurement/scopes", icon: FileStack },
      { title: "Materials", url: "/procurement/materials", icon: Package },
      { title: "Purchase Orders", url: "/procurement/orders", icon: ShoppingCart },
    ],
  },
]

// Procurement Manager navigation
export const procurementManagerNavigation: NavElement[] = [
  {
    title: "Dashboard",
    url: "/procurement",
    icon: LayoutDashboard,
  },
  {
    title: "Procurement",
    url: "/procurement",
    icon: Package,
    items: [
      { title: "Projects", url: "/procurement/projects", icon: FolderKanban },
      { title: "Vendor Discovery", url: "/procurement/vendor-discovery", icon: Search },
      { title: "Scopes of Work", url: "/procurement/scopes", icon: FileStack },
      { title: "Materials", url: "/procurement/materials", icon: Package },
      { title: "Purchase Orders", url: "/procurement/orders", icon: ShoppingCart },
    ],
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Hammer,
    items: [
      { title: "Vendor List", url: "/vendors/onboarding/dashboard", icon: Building2 },
      { title: "Performance", url: "/vendors/performance", icon: BarChart3 },
    ],
  },
 
]

// Role-based navigation access
export const roleNavigation: Record<UserRole, string[]> = {
  sales_executive: ["Dashboard", "CRM", "Sales"],
  sales_coordinator: ["Dashboard", "CRM"],
  project_manager: ["Dashboard", "Projects", "Vendors", "Procurement"],
  site_engineer: ["Dashboard", "Projects"],
  quality_assurance_officer: ["Dashboard", "Projects"],
  quality_control_officer: ["Dashboard", "Projects"],
  safety_management_officer: ["Dashboard", "Projects"],
  finance_manager: ["Dashboard", "Finance"],
  procurement_manager: ["Dashboard", "Procurement", "Vendors", "Projects", "Analytics"],
  city_admin: ["Dashboard", "CRM", "Sales", "Projects", "Vendors", "Procurement", "Finance"],
  super_admin: ["Dashboard", "CRM", "Sales", "Projects", "Vendors", "Procurement", "Finance", "Settings"],
  customer: ["Home", "Connect"],
  vendor: ["Dashboard", "Invitations", "My Bids", "Orders", "Profile"],
}

export function getNavigationForRole(role: UserRole): NavElement[] {
  // Customer gets custom navigation
  if (role === "customer") {
    return customerNavigation
  }
  
  // Site Engineer gets custom navigation
  if (role === "site_engineer") {
    return siteEngineerNavigation
  }
  
  // City Admin gets custom navigation with vendor management
  if (role === "city_admin") {
    return cityAdminNavigation
  }
  
  // QA Officer gets custom navigation with vendor review
  if (role === "quality_assurance_officer") {
    return qaOfficerNavigation
  }
  
  // Super Admin gets full navigation with vendor approvals
  if (role === "super_admin") {
    return superAdminNavigation
  }
  
  // Vendor gets vendor portal navigation
  if (role === "vendor") {
    return vendorPortalNavigation
  }
  
  // Project Manager gets dedicated dashboard (Hyderabad)
  if (role === "project_manager") {
    return projectManagerNavigation
  }

  // Procurement Manager gets dedicated procurement navigation
  if (role === "procurement_manager") {
    return procurementManagerNavigation
  }
  
  const allowedSections = roleNavigation[role]
  if (!allowedSections) {
    return fullNavigation
  }
  return fullNavigation.filter((item) => allowedSections.includes(item.title))
}

export const roleLabels: Record<UserRole, string> = {
  sales_executive: "Sales Executive",
  sales_coordinator: "Sales Coordinator",
  project_manager: "Project Manager",
  site_engineer: "Site Engineer",
  quality_assurance_officer: "Quality Assurance Officer",
  quality_control_officer: "Quality Control Officer",
  safety_management_officer: "Safety Management Officer",
  finance_manager: "Finance Manager",
  procurement_manager: "Procurement Manager",
  city_admin: "City Admin",
  super_admin: "Super Admins",
  customer: "Customer",
  vendor: "Vendor",
}

// Role-specific dashboard URLs
export const roleDashboards: Record<UserRole, string> = {
  sales_executive: "/dashboard/sales",
  sales_coordinator: "/dashboard/coordinator",
  project_manager: "/dashboard/project-manager",
  site_engineer: "/site-engineer/dashboard",
  quality_assurance_officer: "/qa/vendor-review",
  quality_control_officer: "/projects",
  safety_management_officer: "/projects",
  finance_manager: "/dashboard/finance",
  procurement_manager: "/procurement",
  city_admin: "/city-admin/dashboard",
  super_admin: "/dashboard/management",
  customer: "/customer",
  vendor: "/vendor/invitations",
}

export const cities = [
  { value: "bangalore", label: "Bangalore" },
  { value: "chennai", label: "Chennai" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi NCR" },
  { value: "pune", label: "Pune" },
]
