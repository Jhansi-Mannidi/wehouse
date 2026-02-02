"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  label: string
  value: string | number
  subtext?: string
  subtextColor?: string
}

function StatCard({
  icon: Icon,
  iconColor,
  iconBgColor,
  label,
  value,
  subtext,
  subtextColor = "text-muted-foreground",
}: StatCardProps) {
  return (
    <Card className="flex items-center gap-4 p-4 shadow-sm">
      <div className={cn("flex size-12 items-center justify-center rounded-lg", iconBgColor)}>
        <Icon className={cn("size-6", iconColor)} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {subtext && (
          <span className={cn("text-xs", subtextColor)}>{subtext}</span>
        )}
      </div>
    </Card>
  )
}

interface DashboardHeaderProps {
  stats?: StatCardProps[]
  children?: React.ReactNode
}

export function DashboardHeader({
  stats = [],
  children,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* Additional Content */}
      {children}
    </div>
  )
}

export { StatCard }
export type { StatCardProps }
