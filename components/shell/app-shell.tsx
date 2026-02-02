"use client"

import * as React from "react"

import type { UserRole } from "@/lib/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shell/app-sidebar"
import { TopBar } from "@/components/shell/top-bar"

interface AppShellProps {
  children: React.ReactNode
  userRole?: UserRole
  userName?: string
  userEmail?: string
  userAvatar?: string
  selectedCity?: string
  breadcrumbs?: { label: string; href?: string }[]
  defaultSidebarOpen?: boolean
}

export function AppShell({
  children,
  userRole = "super_admin",
  userName = "Rajesh Sharma",
  userEmail = "rajesh@wehouse.in",
  userAvatar,
  selectedCity = "bangalore",
  breadcrumbs = [{ label: "Dashboard" }],
  defaultSidebarOpen = true,
}: AppShellProps) {
  const [currentCity, setCurrentCity] = React.useState(selectedCity)

  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <AppSidebar
        userRole={userRole}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
      />
      <SidebarInset>
        <TopBar
          breadcrumbs={breadcrumbs}
          userName={userName}
          userEmail={userEmail}
          userRole={userRole}
          userAvatar={userAvatar}
          selectedCity={currentCity}
          onCityChange={setCurrentCity}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
