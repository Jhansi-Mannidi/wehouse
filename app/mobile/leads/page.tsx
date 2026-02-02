"use client"

import * as React from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Phone, 
  MessageCircle, 
  ChevronRight,
  Flame,
  ChevronDown,
  X
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Mock leads data
const leadsData = [
  {
    id: "L001",
    name: "Rajesh Kumar",
    initials: "RK",
    status: "contacted",
    budget: "80L",
    area: "Kondapur",
    source: "Facebook",
    sourceShort: "FB",
    daysAgo: "2 days",
    phone: "9876543210",
    score: 72,
  },
  {
    id: "L002",
    name: "Sunitha Reddy",
    initials: "SR",
    status: "new",
    budget: "45L",
    area: "Madhapur",
    source: "Website",
    sourceShort: "Web",
    daysAgo: "5 days",
    phone: "9876543211",
    score: 58,
  },
  {
    id: "L003",
    name: "Venkat Rao",
    initials: "VR",
    status: "qualified",
    budget: "1.2Cr",
    area: "Jubilee Hills",
    source: "Referral",
    sourceShort: "Ref",
    daysAgo: "3 days",
    phone: "9876543212",
    score: 81,
  },
  {
    id: "L004",
    name: "Anil Kumar",
    initials: "AK",
    status: "site_visit",
    budget: "65L",
    area: "Banjara Hills",
    source: "Facebook",
    sourceShort: "FB",
    daysAgo: "1 week",
    phone: "9876543213",
    score: 76,
  },
  {
    id: "L005",
    name: "Meena Sharma",
    initials: "MS",
    status: "negotiation",
    budget: "50L",
    area: "Gachibowli",
    source: "Google",
    sourceShort: "Goo",
    daysAgo: "4 days",
    phone: "9876543214",
    score: 45,
  },
  {
    id: "L006",
    name: "Ravi Teja",
    initials: "RT",
    status: "contacted",
    budget: "30L",
    area: "Kukatpally",
    source: "Walk-in",
    sourceShort: "Wal",
    daysAgo: "6 days",
    phone: "9876543215",
    score: 32,
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "bg-emerald-100 text-emerald-700" },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  qualified: { label: "Qualified", color: "bg-blue-100 text-blue-700" },
  site_visit: { label: "Site Visit", color: "bg-purple-100 text-purple-700" },
  negotiation: { label: "Negotiation", color: "bg-orange-100 text-orange-700" },
}

export default function MobileLeadsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("recent")
  const [swipedLeadId, setSwipedLeadId] = React.useState<string | null>(null)

  const filteredLeads = leadsData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.area.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score
    return 0 // Default: recent
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/mobile">
              <Button variant="ghost" size="icon" className="size-9">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <h1 className="font-semibold text-lg">My Leads</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-9">
              <Search className="size-5" />
            </Button>
            <Button size="icon" className="size-9 rounded-full">
              <Plus className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="p-4 space-y-3 border-b border-border bg-muted/30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 bg-background"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 size-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 flex-1 bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="site_visit">Site Visit</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-9 flex-1 bg-background">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="score">Lead Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Leads List */}
      <div className="flex-1 p-4 space-y-3">
        {sortedLeads.map((lead) => (
          <Card 
            key={lead.id} 
            className="p-3 shadow-sm overflow-hidden"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="size-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {lead.initials}
                </span>
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm text-foreground truncate">{lead.name}</p>
                  {lead.score >= 70 && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-600 text-[10px] px-1.5">
                      <Flame className="size-3 mr-0.5" />
                      {lead.score}
                    </Badge>
                  )}
                </div>
                <Badge 
                  variant="secondary" 
                  className={cn("text-[10px] mb-1.5", statusConfig[lead.status].color)}
                >
                  {statusConfig[lead.status].label}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  ₹{lead.budget} · {lead.area}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {lead.sourceShort} · {lead.daysAgo} ago
                </p>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="size-10 rounded-full bg-primary/10 text-primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`tel:+91${lead.phone}`)
                    }}
                  >
                    <Phone className="size-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="size-10 rounded-full bg-green-100 text-green-600"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`https://wa.me/91${lead.phone}`)
                    }}
                  >
                    <MessageCircle className="size-4" />
                  </Button>
                </div>
                <Link href={`/mobile/leads/${lead.id}`}>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 text-xs text-muted-foreground"
                  >
                    View
                    <ChevronRight className="size-3 ml-0.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}

        {sortedLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No leads found</p>
          </div>
        )}
      </div>
    </div>
  )
}
