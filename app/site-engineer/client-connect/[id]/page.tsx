"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Search,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  ImageIcon,
  Mic,
  User,
  Folder,
  BarChart3,
  TicketIcon,
  Star,
  BellOff,
  Download,
  Trash2,
  Archive,
  AlertCircle,
  CheckCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react"
import { mockConversations, quickReplies, type Message, type Conversation } from "@/lib/chat-data"

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const conversationId = params.id as string
  
  const [message, setMessage] = React.useState("")
  const [showProjectInfo, setShowProjectInfo] = React.useState(true)
  const [messages, setMessages] = React.useState<Message[]>([])
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Find conversation
  const conversation = mockConversations.find((c) => c.id === conversationId)

  // Initialize messages from conversation
  React.useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages)
    }
  }, [conversation])

  React.useEffect(() => {
    // Scroll to bottom on mount and when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!conversation) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <AlertCircle className="size-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Conversation not found</h2>
          <Button asChild>
            <Link href="/site-engineer/client-connect">Back to conversations</Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    
    // Create new message
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderType: "engineer",
      content: message.trim(),
      timestamp: new Date().toISOString(),
      type: "text",
      status: "sent",
    }
    
    // Add message to conversation
    setMessages((prev) => [...prev, newMessage])
    setMessage("")
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      )
    }, 500)
    
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      )
    }, 1500)
  }

  const handleQuickReply = (template: string) => {
    setMessage(template)
    // Auto-focus the textarea after setting the message
    setTimeout(() => {
      document.querySelector("textarea")?.focus()
    }, 0)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="border-b bg-background">
          <div className="flex items-center gap-4 px-6 py-4">
            <Button variant="ghost" size="icon" className="bg-transparent" onClick={() => router.back()}>
              <ArrowLeft className="size-5" />
            </Button>

            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {conversation.customerInitials}
                  </AvatarFallback>
                </Avatar>
                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-background" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-foreground truncate">{conversation.customerName}</h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{conversation.projectType}</span>
                  <span>•</span>
                  <span>{conversation.projectId}</span>
                  <span>•</span>
                  {conversation.isOnline ? (
                    <span className="text-green-600 font-medium">Online</span>
                  ) : (
                    <span>Last seen: 2h ago</span>
                  )}
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="bg-transparent">
                <Search className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-transparent">
                <Phone className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-transparent">
                <Video className="size-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="bg-transparent">
                    <MoreVertical className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="size-4 mr-2" />
                    View Customer Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/projects/${conversation.projectId}`}>
                      <Folder className="size-4 mr-2" />
                      View Project Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BarChart3 className="size-4 mr-2" />
                    View Milestones
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TicketIcon className="size-4 mr-2" />
                    View/Create Ticket
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Star className="size-4 mr-2" />
                    {conversation.isStarred ? "Unstar" : "Star"} Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BellOff className="size-4 mr-2" />
                    {conversation.isMuted ? "Unmute" : "Mute"} Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="size-4 mr-2" />
                    Export Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2 className="size-4 mr-2" />
                    Clear Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="size-4 mr-2" />
                    Archive Conversation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <AlertCircle className="size-4 mr-2" />
                    Block & Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Project Quick Info Bar */}
          {showProjectInfo && (
            <div className="px-6 pb-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Quick Info</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 bg-transparent"
                    onClick={() => setShowProjectInfo(false)}
                  >
                    <ChevronUp className="size-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Current Milestone</p>
                    <p className="text-sm font-medium">{conversation.currentMilestone}</p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                      <Link href={`/projects/${conversation.projectId}/milestones`}>
                        <Eye className="size-3 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-sm font-medium">{conversation.projectProgress}%</p>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${conversation.projectProgress}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Open Tickets</p>
                    <p className="text-sm font-medium">{conversation.openTickets}</p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                      <Link href="/site-engineer/tickets">
                        <Eye className="size-3 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                    <p className="text-sm font-medium">⭐ {conversation.avgRating}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Collapsed State */}
          {!showProjectInfo && (
            <div className="px-6 pb-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between bg-transparent text-muted-foreground hover:text-foreground"
                onClick={() => setShowProjectInfo(true)}
              >
                <span className="text-xs">
                  Quick Info: {conversation.currentMilestone} ({conversation.projectProgress}%) | {conversation.openTickets} Tickets | ⭐ {conversation.avgRating}
                </span>
                <ChevronDown className="size-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Date Separator */}
          <div className="flex items-center justify-center">
            <div className="px-3 py-1 bg-muted rounded-full">
              <span className="text-xs text-muted-foreground">January 28, 2026</span>
            </div>
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} conversation={conversation} />
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="border-t px-6 py-3 bg-muted/30">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Quick Replies:</span>
            {quickReplies.map((reply) => (
              <Button
                key={reply.id}
                variant="outline"
                size="sm"
                className="flex-shrink-0 h-8 text-xs bg-background"
                onClick={() => handleQuickReply(reply.template)}
              >
                <span className="mr-1">{reply.icon}</span>
                {reply.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t p-4 bg-background">
          <div className="flex items-end gap-3">
            {/* Media Buttons */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-9 bg-transparent">
                <ImageIcon className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="size-9 bg-transparent">
                <Paperclip className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="size-9 bg-transparent">
                <Mic className="size-5" />
              </Button>
            </div>

            {/* Text Input */}
            <div className="flex-1">
              <Textarea
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="min-h-[44px] max-h-[120px] resize-none"
                rows={1}
              />
            </div>

            {/* Send Button */}
            <Button
              size="icon"
              className="size-11 flex-shrink-0"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// Message Bubble Component
function MessageBubble({ message, conversation }: { message: Message; conversation: Conversation }) {
  const isEngineer = message.senderType === "engineer"

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  }

  const renderMessageStatus = () => {
    if (message.status === "sent") return <Check className="size-3" />
    if (message.status === "delivered") return <CheckCheck className="size-3" />
    if (message.status === "read") return <CheckCheck className="size-3 text-blue-500" />
    return null
  }

  return (
    <div className={cn("flex items-end gap-2", isEngineer && "justify-end")}>
      {/* Avatar for customer messages */}
      {!isEngineer && (
        <Avatar className="size-8">
          <AvatarFallback className="bg-muted text-xs">
            {conversation.customerInitials}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message Content */}
      <div className={cn("flex flex-col", isEngineer && "items-end")}>
        {message.type === "text" && (
          <div
            className={cn(
              "px-4 py-2 rounded-2xl max-w-md",
              isEngineer
                ? "bg-[hsl(var(--hover-bg))] text-foreground rounded-br-md"
                : "bg-muted text-foreground rounded-bl-md"
            )}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        )}

        {message.type === "image" && (
          <div
            className={cn(
              "rounded-2xl overflow-hidden border max-w-md",
              isEngineer ? "rounded-br-md" : "rounded-bl-md"
            )}
          >
            <ImageIcon src={message.mediaUrl || "/placeholder.svg"} alt="Shared image" className="w-full h-auto max-h-96 object-cover" />
            {message.content && (
              <div className={cn(
                "px-4 py-2",
                isEngineer ? "bg-[hsl(var(--hover-bg))] text-foreground" : "bg-muted text-foreground"
              )}>
                <p className="text-sm">{message.content}</p>
              </div>
            )}
          </div>
        )}

        {message.type === "document" && (
          <div
            className={cn(
              "px-4 py-3 rounded-2xl max-w-md border",
              isEngineer
                ? "bg-[hsl(var(--hover-bg))] text-foreground rounded-br-md"
                : "bg-muted text-foreground rounded-bl-md"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded bg-background/20 flex items-center justify-center">
                <Paperclip className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{message.fileName}</p>
                <p className="text-xs opacity-80">{message.mediaSize ? `${(message.mediaSize / 1024 / 1024).toFixed(1)} MB` : "Document"}</p>
              </div>
              <Button variant="ghost" size="icon" className="size-8 bg-transparent">
                <Download className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Timestamp and Status */}
        <div className={cn(
          "flex items-center gap-1 mt-1 px-2",
          isEngineer && "flex-row-reverse"
        )}>
          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
          {isEngineer && <div className="text-muted-foreground">{renderMessageStatus()}</div>}
        </div>
      </div>
    </div>
  )
}
