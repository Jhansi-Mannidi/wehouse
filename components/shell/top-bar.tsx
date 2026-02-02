"use client"

import * as React from "react"
import Link from "next/link"
import {
  Bell,
  Search,
  MapPin,
  ChevronDown,
  Check,
  LogOut,
  Settings,
  User,
  HelpCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { cities, type UserRole, roleLabels } from "@/lib/navigation"
import { useAuth } from "@/lib/auth-context"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "lead" | "project" | "payment" | "system"
}

interface TopBarProps {
  breadcrumbs?: { label: string; href?: string }[]
  userName?: string
  userEmail?: string
  userRole?: UserRole
  userAvatar?: string
  selectedCity?: string
  onCityChange?: (city: string) => void
  notifications?: Notification[]
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
  {
    id: "4",
    title: "Site Visit Scheduled",
    message: "Site visit with Ramesh Gupta tomorrow at 10 AM",
    time: "5 hours ago",
    read: true,
    type: "lead",
  },
]

export function TopBar({
  breadcrumbs = [{ label: "Dashboard" }],
  userName = "Rajesh Sharma",
  userEmail = "rajesh@wehouse.in",
  userRole = "super_admin",
  userAvatar,
  selectedCity = "bangalore",
  onCityChange,
  notifications = defaultNotifications,
}: TopBarProps) {
  const [cityOpen, setCityOpen] = React.useState(false)
  const [currentCity, setCurrentCity] = React.useState(selectedCity)
  const [searchQuery, setSearchQuery] = React.useState("")
  const { logout } = useAuth()

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleCitySelect = (city: string) => {
    setCurrentCity(city)
    onCityChange?.(city)
    setCityOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    const colors = {
      lead: "bg-chart-1",
      project: "bg-chart-2",
      payment: "bg-chart-4",
      system: "bg-chart-3",
    }
    return colors[type]
  }

  const selectedCityLabel =
    cities.find((c) => c.value === currentCity)?.label || "Select City"

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
      {/* Left: Sidebar Trigger + Breadcrumbs */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        {/* Breadcrumbs */}
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.label}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Center: Search */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads, projects, vendors..."
            className="h-9 w-full pl-9 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right: City, Notifications, User */}
      <div className="flex items-center gap-2">
        {/* City Selector */}
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cityOpen}
              className="h-9 w-[140px] justify-between bg-transparent"
            >
              <MapPin className="mr-2 size-4 text-muted-foreground" />
              <span className="truncate">{selectedCityLabel}</span>
              <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search city..." />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.value}
                      value={city.value}
                      onSelect={() => handleCitySelect(city.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          currentCity === city.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {city.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent p-0 text-[10px] text-accent-foreground">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3"
                >
                  <div className="flex w-full items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 size-2 rounded-full",
                        getNotificationIcon(notification.type),
                        notification.read && "opacity-50"
                      )}
                    />
                    <div className="flex-1 space-y-1">
                      <p
                        className={cn(
                          "text-sm leading-none",
                          !notification.read && "font-medium"
                        )}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-2 h-6" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 gap-2 px-2"
            >
              <Avatar className="size-7">
                {userAvatar && <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />}
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left lg:flex">
                <span className="text-sm font-medium leading-none">
                  {userName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {roleLabels[userRole]}
                </span>
              </div>
              <ChevronDown className="hidden size-4 opacity-50 lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 size-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={logout}>
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
