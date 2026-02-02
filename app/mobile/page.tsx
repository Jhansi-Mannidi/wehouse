"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Bell, 
  ChevronRight, 
  Flame, 
  Phone, 
  MessageCircle, 
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Calendar
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock data
const stats = [
  { label: "My Leads", value: 47, icon: null, color: "bg-primary/10 text-primary" },
  { label: "Hot Leads", value: 8, icon: Flame, color: "bg-orange-100 text-orange-600" },
  { label: "Today's Tasks", value: 5, icon: AlertTriangle, color: "bg-yellow-100 text-yellow-600" },
  { label: "Site Visits", value: 2, icon: MapPin, color: "bg-green-100 text-green-600" },
]

const todaysTasks = [
  {
    id: "T001",
    title: "Schedule site visit",
    leadName: "Rajesh K.",
    priority: "high",
    time: "Overdue",
    leadId: "L001",
  },
  {
    id: "T002",
    title: "Follow-up call",
    leadName: "Sunitha R.",
    priority: "medium",
    time: "3:00 PM",
    leadId: "L002",
  },
  {
    id: "T003",
    title: "Send quotation",
    leadName: "Venkat M.",
    priority: "low",
    time: "5:00 PM",
    leadId: "L003",
  },
]

const hotLeads = [
  {
    id: "L003",
    name: "Venkat Rao",
    score: 81,
    budget: "1.2Cr",
    area: "Jubilee Hills",
    phone: "9876543212",
  },
  {
    id: "L004",
    name: "Anil Kumar",
    score: 76,
    budget: "65L",
    area: "Banjara Hills",
    phone: "9876543213",
  },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function MobileHomePage() {
  const [refreshing, setRefreshing] = React.useState(false)
  const userName = "Rahul"

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/images/wehouse-logo-icon.png" 
              alt="Wehouse" 
              className="h-3 w-auto logo-shadow-fade"
            />
            <span className="font-semibold text-lg text-foreground">Wehouse</span>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 size-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-sm text-muted-foreground">{formatDate()}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <Card 
              key={stat.label}
              className={cn("p-4 border-0 shadow-sm", stat.color.split(" ")[0])}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
                {stat.icon && <stat.icon className={cn("size-6", stat.color.split(" ")[1])} />}
              </div>
            </Card>
          ))}
        </div>

        {/* Today's Priorities */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              Today's Priorities
            </h2>
            <Link 
              href="/mobile/tasks" 
              className="text-sm text-primary font-medium flex items-center"
            >
              View All
              <ChevronRight className="size-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <Card key={task.id} className="p-3 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "size-2 rounded-full mt-2 flex-shrink-0",
                    task.priority === "high" ? "bg-red-500" :
                    task.priority === "medium" ? "bg-yellow-500" :
                    "bg-green-500"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{task.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {task.leadName} · {task.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="size-9 rounded-full bg-primary/10 text-primary"
                    >
                      <Phone className="size-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="size-9 rounded-full bg-green-100 text-green-600"
                    >
                      <CheckCircle2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Hot Leads */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Flame className="size-4 text-orange-500" />
              Hot Leads
            </h2>
            <Link 
              href="/mobile/leads?filter=hot" 
              className="text-sm text-primary font-medium flex items-center"
            >
              View All
              <ChevronRight className="size-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {hotLeads.map((lead) => (
              <Card key={lead.id} className="p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground truncate">{lead.name}</p>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-600 text-[10px]">
                        <Flame className="size-3 mr-0.5" />
                        {lead.score}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ₹{lead.budget} · {lead.area}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="size-10 rounded-full bg-primary/10 text-primary"
                      onClick={() => window.open(`tel:+91${lead.phone}`)}
                    >
                      <Phone className="size-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="size-10 rounded-full bg-green-100 text-green-600"
                      onClick={() => window.open(`https://wa.me/91${lead.phone}`)}
                    >
                      <MessageCircle className="size-4" />
                    </Button>
                    <Link href={`/mobile/leads/${lead.id}`}>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="size-10 rounded-full"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
