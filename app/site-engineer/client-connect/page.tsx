"use client"

import * as React from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  Search,
  Plus,
  Star,
  MessageCircle,
  Clock,
  MapPin,
  CheckCheck,
  Check,
  Archive,
  Bell,
  BellOff,
} from "lucide-react"
import { mockConversations, type Conversation } from "@/lib/chat-data"

export default function ClientConnectPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterType, setFilterType] = React.useState<"all" | "unread" | "starred" | "archived">("all")

  // Calculate total unread
  const totalUnread = mockConversations.filter(c => !c.isArchived).reduce((sum, c) => sum + c.unreadCount, 0)

  // Filter conversations
  const filteredConversations = mockConversations.filter((conv) => {
    const matchesSearch =
      searchQuery === "" ||
      conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterType === "all" ? !conv.isArchived :
      filterType === "unread" ? conv.unreadCount > 0 && !conv.isArchived :
      filterType === "starred" ? conv.isStarred && !conv.isArchived :
      filterType === "archived" ? conv.isArchived : true

    return matchesSearch && matchesFilter
  })

  const activeConversations = filteredConversations.filter(c => !c.isArchived)
  const archivedConversations = filteredConversations.filter(c => c.isArchived)

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="size-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Client Connect</h1>
                <p className="text-sm text-muted-foreground">Chat with your assigned customers</p>
              </div>
            </div>
            <Button size="sm">
              <Plus className="size-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="px-6 pb-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
                className={cn(filterType !== "all" && "bg-transparent")}
              >
                All
                {totalUnread > 0 && filterType === "all" && (
                  <Badge variant="destructive" className="ml-2">
                    {totalUnread}
                  </Badge>
                )}
              </Button>
              <Button
                variant={filterType === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("unread")}
                className={cn(filterType !== "unread" && "bg-transparent")}
              >
                Unread
                {totalUnread > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {totalUnread}
                  </Badge>
                )}
              </Button>
              <Button
                variant={filterType === "starred" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("starred")}
                className={cn(filterType !== "starred" && "bg-transparent")}
              >
                <Star className="size-4 mr-1" />
                Starred
              </Button>
              <Button
                variant={filterType === "archived" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("archived")}
                className={cn(filterType !== "archived" && "bg-transparent")}
              >
                <Archive className="size-4 mr-1" />
                Archived
              </Button>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {/* Active Conversations */}
          {filterType !== "archived" && activeConversations.length > 0 && (
            <div className="p-6">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Active Conversations
              </h2>
              <div className="space-y-3">
                {activeConversations.map((conversation) => (
                  <ConversationCard key={conversation.id} conversation={conversation} />
                ))}
              </div>
            </div>
          )}

          {/* Archived Section */}
          {filterType === "archived" && archivedConversations.length > 0 && (
            <div className="p-6">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Archived
              </h2>
              <div className="space-y-3">
                {archivedConversations.map((conversation) => (
                  <ConversationCard key={conversation.id} conversation={conversation} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredConversations.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <MessageCircle className="size-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No conversations found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : filterType === "unread"
                  ? "You're all caught up! No unread messages."
                  : filterType === "starred"
                  ? "Star important conversations to find them quickly here."
                  : "Start a conversation with your customers."}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

// Conversation Card Component
function ConversationCard({ conversation }: { conversation: Conversation }) {
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getLastMessagePreview = () => {
    if (conversation.lastMessageType === "image") return "📷 Sent a photo"
    if (conversation.lastMessageType === "document") return "📄 Sent a document"
    if (conversation.lastMessageType === "voice") return "🎤 Sent a voice note"
    if (conversation.lastMessageType === "location") return "📍 Sent a location"
    return conversation.lastMessage
  }

  return (
    <Link href={`/site-engineer/client-connect/${conversation.id}`}>
      <div
        className={cn(
          "group relative flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all cursor-pointer",
          conversation.unreadCount > 0 && "border-primary/30 bg-primary/5"
        )}
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar className="size-12">
            <AvatarFallback className={cn(
              "text-sm font-semibold",
              conversation.unreadCount > 0 ? "bg-primary/20 text-primary" : "bg-muted"
            )}>
              {conversation.customerInitials}
            </AvatarFallback>
          </Avatar>
          {conversation.isOnline && (
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-background" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={cn(
                  "font-semibold text-sm truncate",
                  conversation.unreadCount > 0 ? "text-foreground" : "text-foreground/90"
                )}>
                  {conversation.customerName}
                </h3>
                {conversation.isStarred && <Star className="size-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />}
                {conversation.isMuted && <BellOff className="size-3.5 text-muted-foreground flex-shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {conversation.projectType} | {conversation.projectId}
              </p>
            </div>

            {/* Time and Unread Badge */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className={cn(
                "text-xs whitespace-nowrap",
                conversation.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground"
              )}>
                {getRelativeTime(conversation.lastMessageTime)}
              </span>
              {conversation.unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 min-w-[20px] px-1.5 text-xs">
                  {conversation.unreadCount}
                </Badge>
              )}
            </div>
          </div>

          {/* Last Message */}
          <p className={cn(
            "text-sm truncate mb-2",
            conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
          )}>
            {getLastMessagePreview()}
          </p>

          {/* Project Info Tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="inline-block size-2 bg-muted-foreground/30 rounded-full" />
              <span>{conversation.projectStatus}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="size-3" />
              <span>{conversation.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
