"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shell/app-sidebar"
import { MainHeader } from "@/components/shell/main-header"
import { useRole } from "@/lib/role-context"
import { useFilters } from "@/lib/filter-context"
import { useAI } from "@/lib/ai-context"

interface DashboardLayoutProps {
  children: React.ReactNode
  userEmail?: string
  userAvatar?: string
  onAddClick?: () => void
  showFilters?: boolean
}

export function DashboardLayout({
  children,
  userEmail = "rajesh@wehouse.in",
  userAvatar,
  onAddClick,
  showFilters = true,
}: DashboardLayoutProps) {
  const { selectedRole, setSelectedRole } = useRole()
  const { category, location, branch, setCategory, setLocation, setBranch } = useFilters()
  const { aiEnabled, setAiEnabled } = useAI()
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        <AppSidebar userRole={selectedRole} onRoleChange={setSelectedRole} />
        
        {/* Main Content */}
        <SidebarInset className="flex flex-col flex-1">
          {/* Header */}
          <MainHeader
            userEmail={userEmail}
            userRole={selectedRole}
            userAvatar={userAvatar}
            onAddClick={onAddClick}
            showFilters={showFilters}
            selectedCategory={category}
            selectedLocation={location}
            selectedBranch={branch}
            onCategoryChange={setCategory}
            onLocationChange={setLocation}
            onBranchChange={setBranch}
            aiEnabled={aiEnabled}
            onAIToggle={setAiEnabled}
          />
          
          {/* Page Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
