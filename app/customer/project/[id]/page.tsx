"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Home,
  Calendar,
  IndianRupee,
  MessageCircle,
  ArrowRight,
  Video,
  ChevronRight,
  Play,
} from "lucide-react"
import Link from "next/link"

// Mock site update data
const siteUpdates = [
  { id: 1, date: "Jan 25", type: "video", thumbnail: "/images/construction/living-room-plastering.jpg", description: "Plastering work in progress" },
  { id: 2, date: "Jan 23", type: "video", thumbnail: "/images/construction/kitchen-walls.jpg", description: "Kitchen wall completion" },
  { id: 3, date: "Jan 22", type: "video", thumbnail: "/images/construction/bedroom-plastering.jpg", description: "Bedroom plastering" },
]

export default function CustomerDashboard() {
  const currentTime = new Date().getHours()
  const greeting = currentTime < 12 ? "Good morning" : currentTime < 17 ? "Good afternoon" : "Good evening"
  
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-6 lg:px-6 lg:py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{greeting}, Rajesh!</h1>
            <p className="text-muted-foreground">Here's your home construction update</p>
          </div>

          {/* Project Progress Card */}
          <Card className="bg-gradient-to-r from-[#f6a404] to-[#f5b942] border-0 text-white shadow-xl overflow-hidden">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white/80">Your Home is</p>
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">65% Complete!</h2>
                </div>
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Home className="size-7 text-white" />
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-6 mb-6">
                <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-white rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/70 mb-0.5">Current</p>
                  <p className="font-semibold text-lg">Plastering</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-white/70 mb-0.5">Expected</p>
                  <p className="font-semibold text-lg">Mar 30, 2026</p>
                </div>
              </div>

              {/* View Details Button */}
              <Button 
                asChild
                className="mt-6 bg-white hover:bg-white/90 text-[#f6a404] font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Link href="/customer/progress">
                  View Progress
                  <ChevronRight className="size-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Latest from Site */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Latest from Site</h2>
              <Button variant="ghost" size="sm" className="text-[#f6a404] hover:text-[#e09503] hover:bg-[#f6a404]/10 gap-1 h-8 px-2 font-medium" asChild>
                <Link href="/customer/photos">
                  View All
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              {siteUpdates.map((item) => (
                <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all border hover:border-[#f6a404]/30">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.description}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 250px"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-10 lg:size-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="size-4 lg:size-5 text-[#f6a404] ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2 py-1 rounded text-[11px] font-medium shadow-sm">
                      {item.date}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Payment & Milestone Row */}
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
            {/* Payment Summary */}
            <Card className="shadow-sm border">
              <CardContent className="p-5 lg:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#f6a404]/10">
                    <IndianRupee className="size-5 text-[#f6a404]" />
                  </div>
                  <h3 className="text-base font-semibold">Payment Summary</h3>
                </div>
                
                <div className="space-y-0">
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-sm text-muted-foreground">Paid</span>
                    <span className="text-lg font-bold text-emerald-600">₹18L</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="text-lg font-bold text-[#f6a404]">₹12L</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">Total Contract</span>
                    <span className="text-xl font-bold text-foreground">₹82L</span>
                  </div>
                </div>

                <Button className="w-full mt-5 h-11 bg-[#f6a404] hover:bg-[#e09503] text-white font-semibold shadow-sm">
                  Pay Now
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Next Milestone */}
            <Card className="shadow-sm border bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
              <CardContent className="p-5 lg:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500 shadow-sm">
                      <Calendar className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider font-bold">Next Milestone</p>
                      <h3 className="font-bold text-lg mt-0.5">M13: External Plaster</h3>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-0 font-semibold text-xs px-2.5 py-0.5">
                    On Track
                  </Badge>
                </div>
                
                <div className="flex-1 flex items-end">
                  <div className="w-full pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Starts</span>
                      <span className="font-semibold">Feb 6, 2026</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/customer/camera">
              <Card className="hover:shadow-lg transition-all cursor-pointer group border hover:border-blue-200 dark:hover:border-blue-800 h-full">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="flex size-14 lg:size-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30 group-hover:scale-105 transition-transform">
                      <Video className="size-7 lg:size-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-base lg:text-lg">Live Camera</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/customer/chat">
              <Card className="hover:shadow-lg transition-all cursor-pointer group border hover:border-emerald-200 dark:hover:border-emerald-800 h-full">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="flex size-14 lg:size-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 group-hover:scale-105 transition-transform">
                      <MessageCircle className="size-7 lg:size-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-base lg:text-lg">Chat with Team</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
