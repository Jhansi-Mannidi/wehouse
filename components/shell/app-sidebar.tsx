"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronRight, X } from "lucide-react"

import {
  type NavElement,
  type UserRole,
  getNavigationForRole,
  isNavGroup,
  roleLabels,
  roleDashboards,
} from "@/lib/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const roles: UserRole[] = [
  "sales_executive",
  "sales_coordinator",
  "project_manager",
  "site_engineer",
  "quality_assurance_officer",
  "quality_control_officer",
  "safety_management_officer",
  "finance_manager",
  "procurement_manager",
  "city_admin",
  "super_admin",
  "customer",
  "vendor",
]

interface AppSidebarProps {
  userRole?: UserRole
  onRoleChange?: (role: UserRole) => void
}

export function AppSidebar({
  userRole = "super_admin",
  onRoleChange,
}: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { state, toggleSidebar } = useSidebar()
  const navigation = getNavigationForRole(userRole)
  const isCollapsed = state === "collapsed"

  // Handle role change with navigation
  const handleRoleChange = (newRole: UserRole) => {
    onRoleChange?.(newRole)
    const dashboardUrl = roleDashboards[newRole]
    router.push(dashboardUrl)
  }

  // Get dashboard URL for current role
  const dashboardUrl = roleDashboards[userRole]

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      // Check if current path matches the role-specific dashboard
      return pathname === "/" || pathname === "/dashboard" || pathname === dashboardUrl || pathname.startsWith("/dashboard/")
    }
    return pathname.startsWith(url)
  }

  const isGroupActive = (item: NavElement) => {
    if (isNavGroup(item)) {
      return item.items.some((subItem) => pathname.startsWith(subItem.url))
    }
    return isActive(item.url)
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-sidebar-border p-4 bg-sidebar flex flex-row items-center justify-between">
        {isCollapsed ? (
          // When collapsed, show sidebar icon instead of logo
          <button
            onClick={toggleSidebar}
            className="flex-1 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
            title="Expand sidebar"
          >
            <div className="relative w-5 h-5 border border-foreground/60 rounded-sm flex items-center justify-start overflow-hidden bg-transparent">
              <div className="w-[33%] h-full bg-foreground/70 rounded-sm"></div>
            </div>
          </button>
        ) : (
          // When expanded, logo links to dashboard
          <Link href={dashboardUrl} className="flex-1 flex items-center justify-center">
            <img 
              src="/images/wehouse-logo-full.png" 
              alt="Wehouse" 
              className="h-8 w-auto"
            />
          </Link>
        )}
        {/* Collapse Button */}
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center shrink-0"
            title="Collapse sidebar"
          >
            <div className="relative w-4 h-4 border border-foreground/60 rounded-sm flex items-center justify-start overflow-hidden bg-transparent">
              <div className="w-[33%] h-full bg-foreground/70 rounded-sm"></div>
            </div>
          </button>
        )}
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="bg-sidebar">
        {/* Role Selector - placed in content when not collapsed */}
        {!isCollapsed && (
          <SidebarGroup className="pb-2">
            <p className="text-[10px] font-medium uppercase tracking-wider text-sidebar-muted mb-2 px-2">
              Current Role
            </p>
            <div className="px-2">
            <Select value={userRole} onValueChange={(v) => handleRoleChange(v as UserRole)}>
                <SelectTrigger className="h-8 w-full bg-primary/10 border-primary/30 text-primary font-medium text-xs hover:bg-[hsl(var(--hover-bg))] focus-visible:ring-primary/50">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {roles.map((role) => (
                    <SelectItem key={role} value={role} className="text-popover-foreground hover:bg-[hsl(var(--hover-bg))] hover:text-foreground focus:bg-[hsl(var(--hover-bg))] focus:text-foreground">
                    {roleLabels[role]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          </SidebarGroup>
        )}
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) =>
                isNavGroup(item) ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isGroupActive(item)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={isGroupActive(item)}
                        >
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.url)}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                  {subItem.badge && (
                                    <Badge
                                      variant="secondary"
                                      className="ml-auto h-5 min-w-5 justify-center rounded-full bg-sidebar-primary/10 px-1.5 text-xs text-sidebar-primary"
                                    >
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive(item.url)}
                      asChild
                    >
                      <Link href={item.title === "Dashboard" ? dashboardUrl : item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  )
}
