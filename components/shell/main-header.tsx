"use client"

import * as React from "react"
import Link from "next/link"
import {
  Bell,
  Sparkles,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Users,
  Search,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { type UserRole } from "@/lib/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { HeaderFilters, type ProjectCategory, type Location, type Branch } from "@/components/shell/header-filters"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "lead" | "project" | "payment" | "system"
}

interface MainHeaderProps {
  userName?: string
  userEmail?: string
  userRole?: UserRole
  userAvatar?: string
  notificationCount?: number
  notifications?: Notification[]
  onAddClick?: () => void
  onAIToggle?: (enabled: boolean) => void
  aiEnabled?: boolean
  showFilters?: boolean
  selectedCategory?: ProjectCategory
  selectedLocation?: Location
  selectedBranch?: Branch
  selectedRoleFilter?: string
  onRoleFilterChange?: (role: string) => void
  onCategoryChange?: (category: ProjectCategory) => void
  onLocationChange?: (location: Location) => void
  onBranchChange?: (branch: Branch) => void
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    title: "New Lead Assigned",
    message: "Priya Patel from Bangalore has been assigned to you",
    time: "2 min ago",
    read: false,
    type: "lead",
  },
  {
    id: "2",
    title: "Project Milestone Completed",
    message: "Foundation work completed for Villa #234",
    time: "1 hour ago",
    read: false,
    type: "project",
  },
  {
    id: "3",
    title: "Payment Received",
    message: "Rs. 5,00,000 received from Amit Kumar",
    time: "3 hours ago",
    read: true,
    type: "payment",
  },
]

export function MainHeader({
  userName = "Rajesh Sharma",
  userEmail = "rajesh@wehouse.in",
  userRole = "super_admin",
  userAvatar,
  notifications = defaultNotifications,
  onAddClick,
  onAIToggle,
  aiEnabled = false,
  showFilters = true,
  selectedCategory = "all",
  selectedLocation = "all",
  selectedBranch = "all",
  selectedRoleFilter = "all",
  onRoleFilterChange,
  onCategoryChange,
  onLocationChange,
  onBranchChange,
}: MainHeaderProps) {
  const { logout } = useAuth()
  const [aiMode, setAiMode] = React.useState(aiEnabled)
  const [isDark, setIsDark] = React.useState(false)
  
  const unreadCount = notifications.filter((n) => !n.read).length

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleAIToggle = (enabled: boolean) => {
    setAiMode(enabled)
    onAIToggle?.(enabled)
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const getNotificationColor = (type: Notification["type"]) => {
    const colors = {
      lead: "bg-info",
      project: "bg-success",
      payment: "bg-primary",
      system: "bg-chart-5",
    }
    return colors[type]
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 w-full items-center justify-between border-b border-header-border bg-header px-3 sm:px-6">
      {/* Left Section - Sidebar Toggle for Mobile */}
      <div className="flex items-center gap-2 sm:gap-4">
        <SidebarTrigger className="md:hidden" />
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
        {/* Filters - Role based visibility */}
        {(userRole === "super_admin" || userRole === "city_admin") && (
          <div className="hidden sm:block">
            <HeaderFilters
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              selectedBranch={selectedBranch}
              onCategoryChange={onCategoryChange}
              onLocationChange={onLocationChange}
              onBranchChange={onBranchChange}
              showCategoryFilter={true}
              showLocationFilter={userRole === "super_admin"}
            />
          </div>
        )}

        {/* AI Toggle - Premium Gold accent */}
        <div className={cn(
          "flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-xl px-2 sm:px-4 transition-all duration-200",
          aiMode 
            ? "bg-primary/10 border border-primary/30" 
            : "bg-muted/50 border border-transparent"
        )}>
          <Sparkles className={cn(
            "size-3.5 sm:size-4 transition-colors",
            aiMode ? "text-primary" : "text-muted-foreground"
          )} />
          <span className={cn(
            "text-xs sm:text-sm font-medium transition-colors hidden md:inline",
            aiMode ? "text-primary" : "text-muted-foreground"
          )}>
            AI
          </span>
          <Switch 
            checked={aiMode}
            onCheckedChange={handleAIToggle}
            className="data-[state=checked]:bg-primary scale-90 sm:scale-100"
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="size-9 sm:size-10 rounded-xl hover:bg-[hsl(var(--hover-bg))]"
          onClick={toggleTheme}
        >
          {isDark ? (
            <Sun className="size-4 sm:size-5 text-muted-foreground" />
          ) : (
            <Moon className="size-4 sm:size-5 text-muted-foreground" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative size-9 sm:size-10 rounded-xl hover:bg-[hsl(var(--hover-bg))]"
            >
              <Bell className="size-4 sm:size-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 sm:size-5 items-center justify-center rounded-full bg-destructive text-[9px] sm:text-[10px] font-semibold text-destructive-foreground">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl">
            <DropdownMenuLabel className="flex items-center justify-between py-3">
              <span className="text-base font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <Badge className="bg-primary/10 text-primary text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-4 cursor-pointer focus:bg-muted"
                >
                  <div className="flex w-full items-start gap-3">
                    <div
                      className={cn(
                        "mt-1 size-2.5 shrink-0 rounded-full",
                        getNotificationColor(notification.type),
                        notification.read && "opacity-40"
                      )}
                    />
                    <div className="flex-1 space-y-1">
                      <p
                        className={cn(
                          "text-sm leading-tight",
                          !notification.read && "font-semibold"
                        )}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center py-3 text-sm font-semibold text-primary hover:text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="size-9 sm:size-10 rounded-full p-0 ring-2 ring-transparent hover:ring-primary/20 transition-all"
            >
              <Avatar className="size-9 sm:size-10">
                {userAvatar && <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />}
                <AvatarFallback className="bg-[hsl(var(--hover-bg))] text-foreground text-xs sm:text-sm font-semibold">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <DropdownMenuLabel className="font-normal py-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2.5 cursor-pointer">
              <User className="mr-3 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2.5 cursor-pointer">
              <Settings className="mr-3 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2.5 cursor-pointer">
              <Users className="mr-3 size-4" />
              Team Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2.5 text-destructive cursor-pointer" onClick={logout}>
              <LogOut className="mr-3 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
