"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  {
    id: "progress",
    label: "Progress",
    href: "/customer/progress",
    icon: BarChart3,
  },
  {
    id: "billing",
    label: "Billing",
    href: "/customer/payments",
    icon: CreditCard,
  },
  {
    id: "documents",
    label: "Documents",
    href: "/customer/documents",
    icon: FileText,
  },
]

export function ProjectTabs() {
  const pathname = usePathname()

  // If we're on the customer home page or chat, don't show tabs
  if (pathname === "/customer" || pathname === "/customer/chat") {
    return null
  }

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 z-20">
      <div className="px-4 lg:px-6">
        <nav className="flex gap-1" aria-label="Project navigation">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href)
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 -mb-px transition-all duration-200",
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <tab.icon className={cn(
                  "size-4 transition-colors",
                  isActive ? "text-primary" : ""
                )} />
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
