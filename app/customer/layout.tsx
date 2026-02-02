"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { ProjectTabs } from "@/components/customer/project-tabs"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout showFilters={false} userEmail="rajesh@wehouse.in">
      <div className="flex flex-col -mx-6 -mt-6">
        <ProjectTabs />
        <div className="p-6">
          {children}
        </div>
      </div>
    </DashboardLayout>
  )
}
