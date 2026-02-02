"use client"

import React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Building2,
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  FolderKanban,
  DollarSign,
  UserCog,
  BarChart3,
  Home,
  Hammer,
} from "lucide-react"

export function SidebarPreview() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex gap-8 overflow-x-auto">
        {/* Collapsed Sidebar */}
        <div className="flex flex-col">
          <h4 className="mb-4 text-sm font-medium text-muted-foreground">Collapsed</h4>
          <div className="flex w-16 flex-col items-center gap-2 rounded-lg bg-sidebar py-4">
            {/* Logo */}
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            
            {/* Nav Items */}
            <NavIconItem icon={<LayoutDashboard className="h-5 w-5" />} active />
            <NavIconItem icon={<Users className="h-5 w-5" />} />
            <NavIconItem icon={<FolderKanban className="h-5 w-5" />} />
            <NavIconItem icon={<Briefcase className="h-5 w-5" />} />
            <NavIconItem icon={<DollarSign className="h-5 w-5" />} />
            <NavIconItem icon={<BarChart3 className="h-5 w-5" />} />
            
            <div className="my-2 h-px w-8 bg-sidebar-border" />
            
            <NavIconItem icon={<Settings className="h-5 w-5" />} />
            <NavIconItem icon={<HelpCircle className="h-5 w-5" />} />
            
            {/* User Avatar */}
            <div className="mt-auto pt-4">
              <Avatar className="h-8 w-8 border-2 border-sidebar-primary">
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                  RS
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Expanded Sidebar */}
        <div className="flex flex-col">
          <h4 className="mb-4 text-sm font-medium text-muted-foreground">Expanded</h4>
          <div className="flex w-64 flex-col rounded-lg bg-sidebar py-4">
            {/* Logo */}
            <div className="mb-6 flex items-center gap-3 px-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
                <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-sidebar-foreground">Wehouse</h2>
                <p className="text-xs text-sidebar-muted">Construction Platform</p>
              </div>
            </div>
            
            {/* Role Selector */}
            <div className="mb-4 px-3">
              <button className="flex w-full items-center justify-between rounded-md bg-sidebar-accent px-3 py-2 text-sm text-sidebar-accent-foreground transition-colors hover:bg-sidebar-accent/80">
                <div className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  <span>Partner Executive</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3">
              <NavItem icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" active />
              
              <NavGroup 
                icon={<Users className="h-4 w-4" />} 
                label="CRM"
                items={["Leads", "Pipeline", "Communications"]}
              />
              
              <NavGroup 
                icon={<FolderKanban className="h-4 w-4" />} 
                label="Projects"
                items={["Active Projects", "Milestones", "Daily Reports"]}
                expanded
              />
              
              <NavGroup 
                icon={<Briefcase className="h-4 w-4" />} 
                label="Partners"
                items={["Turnkey", "Skilled Workers", "Architects", "Interior"]}
              />
              
              <NavItem icon={<DollarSign className="h-4 w-4" />} label="Finance" />
              <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Reports" />
            </nav>
            
            <div className="my-2 mx-3 h-px bg-sidebar-border" />
            
            {/* Settings */}
            <div className="space-y-1 px-3">
              <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
              <NavItem icon={<HelpCircle className="h-4 w-4" />} label="Help & Support" />
            </div>
            
            {/* User */}
            <div className="mt-4 border-t border-sidebar-border px-3 pt-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-sidebar-primary">
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm">
                    RS
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">Rajesh Sharma</p>
                  <p className="text-xs text-sidebar-muted truncate">Partner Executive</p>
                </div>
                <ChevronRight className="h-4 w-4 text-sidebar-muted" />
              </div>
            </div>
          </div>
        </div>

        {/* Role-based Menus */}
        <div className="flex flex-col">
          <h4 className="mb-4 text-sm font-medium text-muted-foreground">Role-based Navigation</h4>
          <div className="space-y-4">
            <RoleMenu 
              role="Sales Executive" 
              icon={<Users className="h-4 w-4" />}
              items={["Dashboard", "Leads", "Pipeline", "Quotes", "Site Visits"]}
            />
            <RoleMenu 
              role="Project Manager" 
              icon={<Hammer className="h-4 w-4" />}
              items={["Dashboard", "Projects", "Milestones", "Daily Reports", "Quality"]}
            />
            <RoleMenu 
              role="Finance Team" 
              icon={<DollarSign className="h-4 w-4" />}
              items={["Dashboard", "Invoices", "Payments", "Collections", "Reports"]}
            />
            <RoleMenu 
              role="Customer Portal" 
              icon={<Home className="h-4 w-4" />}
              items={["My Project", "Progress", "Payments", "Documents", "Support"]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function NavIconItem({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      }`}
    >
      {icon}
    </button>
  )
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function NavGroup({
  icon,
  label,
  items,
  expanded = false,
}: {
  icon: React.ReactNode
  label: string
  items: string[]
  expanded?: boolean
}) {
  return (
    <div>
      <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "" : "-rotate-90"}`} />
      </button>
      {expanded && (
        <div className="ml-7 mt-1 space-y-1 border-l border-sidebar-border pl-3">
          {items.map((item) => (
            <button
              key={item}
              className="flex w-full items-center rounded-md px-3 py-1.5 text-sm text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function RoleMenu({
  role,
  icon,
  items,
}: {
  role: string
  icon: React.ReactNode
  items: string[]
}) {
  return (
    <div className="rounded-lg border border-sidebar-border bg-sidebar p-3">
      <div className="mb-2 flex items-center gap-2 text-sidebar-foreground">
        {icon}
        <span className="text-sm font-medium">{role}</span>
      </div>
      <div className="space-y-0.5">
        {items.map((item, index) => (
          <div
            key={item}
            className={`rounded px-2 py-1 text-xs ${
              index === 0
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-muted"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
