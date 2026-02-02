"use client"

import * as React from "react"
import {
  X,
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Camera,
  Send,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  FileText,
  Smile,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

// Message type
interface Message {
  id: string
  type: "sent" | "received"
  content: string
  timestamp: Date
  status?: "sending" | "sent" | "delivered" | "read" | "failed"
  attachment?: {
    type: "document" | "image" | "video"
    name: string
    size: string
  }
}

// Template type
interface Template {
  id: string
  name: string
  icon: string
  category: string
  content: string
  variables: string[]
}

// Mock data
const mockMessages: Message[] = [
  {
    id: "1",
    type: "sent",
    content: "Good morning Rajesh! 👋\nThis is Rahul from Wehouse. Following up on your home construction inquiry.",
    timestamp: new Date("2026-01-29T10:30:00"),
    status: "read",
  },
  {
    id: "2",
    type: "received",
    content: "Hi Rahul, yes I'm interested. When can we discuss?",
    timestamp: new Date("2026-01-29T10:45:00"),
  },
  {
    id: "3",
    type: "sent",
    content: "Great! I can call you now or we can schedule a time. What works?",
    timestamp: new Date("2026-01-29T10:48:00"),
    status: "read",
  },
  {
    id: "4",
    type: "received",
    content: "Please call at 3 PM",
    timestamp: new Date("2026-01-29T10:52:00"),
  },
  {
    id: "5",
    type: "sent",
    content: "Here's our portfolio",
    timestamp: new Date("2026-01-29T11:00:00"),
    status: "read",
    attachment: {
      type: "document",
      name: "Wehouse Brochure.pdf",
      size: "2.3 MB",
    },
  },
]

const mockTemplates: Template[] = [
  {
    id: "welcome",
    name: "Welcome Message",
    icon: "👋",
    category: "Greeting",
    content: "Hi {{customer_name}}! Thank you for your interest in Wehouse. I'm {{executive_name}} and I'll be assisting you with your home construction project. How can I help you today?",
    variables: ["customer_name", "executive_name"],
  },
  {
    id: "site-visit-confirm",
    name: "Site Visit Confirmation",
    icon: "📅",
    category: "Appointment",
    content: "Dear {{customer_name}},\n\nYour site visit is confirmed for:\n📅 Date: {{visit_date}}\n🕐 Time: {{visit_time}}\n📍 Location: {{site_address}}\n\nOur team member {{executive_name}} will meet you at the site.",
    variables: ["customer_name", "visit_date", "visit_time", "site_address", "executive_name"],
  },
  {
    id: "site-visit-reminder",
    name: "Site Visit Reminder",
    icon: "⏰",
    category: "Appointment",
    content: "Hi {{customer_name}}, this is a reminder about your site visit scheduled for tomorrow at {{visit_time}}. Looking forward to meeting you!",
    variables: ["customer_name", "visit_time"],
  },
  {
    id: "missed-call",
    name: "Missed Call Follow-up",
    icon: "📞",
    category: "Follow-up",
    content: "Hi {{customer_name}}, I noticed I missed your call. I'm available now. Please feel free to call back or let me know a good time to reach you.",
    variables: ["customer_name"],
  },
  {
    id: "quote-sent",
    name: "Quote Sent",
    icon: "📄",
    category: "Sales",
    content: "Dear {{customer_name}},\n\nI've shared a detailed quote for your project via email. Please review and let me know if you have any questions.\n\nEstimated Budget: ₹{{budget}}\nTimeline: {{timeline}}\n\nLooking forward to working with you!",
    variables: ["customer_name", "budget", "timeline"],
  },
  {
    id: "thank-you",
    name: "Thank You",
    icon: "🙏",
    category: "Greeting",
    content: "Thank you {{customer_name}} for choosing Wehouse! We're excited to help you build your dream home. We'll be in touch soon with next steps.",
    variables: ["customer_name"],
  },
]

interface WhatsAppPanelProps {
  open: boolean
  onClose: () => void
  contactName?: string
  contactPhone?: string
  leadId?: string
}

export function WhatsAppPanel({
  open,
  onClose,
  contactName = "Rajesh Kumar",
  contactPhone = "+91 98765 43210",
  leadId,
}: WhatsAppPanelProps) {
  const [messages, setMessages] = React.useState<Message[]>(mockMessages)
  const [messageInput, setMessageInput] = React.useState("")
  const [isOnline] = React.useState(true)
  const [lastSeen] = React.useState("5 min ago")
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null)
  const [templateVariables, setTemplateVariables] = React.useState<Record<string, string>>({})
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getStatusIcon = (status?: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="size-3 text-muted-foreground" />
      case "sent":
        return <Check className="size-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="size-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="size-3 text-info" />
      case "failed":
        return <AlertCircle className="size-3 text-destructive" />
      default:
        return null
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "sent",
      content: messageInput,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages([...messages, newMessage])
    setMessageInput("")
  }

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    // Pre-fill some variables
    setTemplateVariables({
      customer_name: contactName.split(" ")[0],
      executive_name: "Rahul",
    })
  }

  const handleSendTemplate = () => {
    if (!selectedTemplate) return

    let content = selectedTemplate.content
    Object.entries(templateVariables).forEach(([key, value]) => {
      content = content.replace(`{{${key}}}`, value)
    })

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "sent",
      content,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages([...messages, newMessage])
    setSelectedTemplate(null)
    setTemplateVariables({})
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full p-0 sm:max-w-2xl">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-[#075E54] p-4 text-white">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-white hover:bg-white/20"
                    onClick={onClose}
                  >
                    <ArrowLeft className="size-5" />
                  </Button>
                  <div>
                    <SheetTitle className="text-base font-semibold text-white">
                      {contactName}
                    </SheetTitle>
                    <p className="text-sm text-white/80">{contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-white hover:bg-white/20"
                  >
                    <Phone className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-white hover:bg-white/20"
                  >
                    <Video className="size-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-white hover:bg-white/20"
                      >
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Contact Info</DropdownMenuItem>
                      <DropdownMenuItem>View Lead Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Export Chat</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Clear Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {isOnline ? (
                  <>
                    <div className="size-2 rounded-full bg-success" />
                    <span>Online</span>
                  </>
                ) : (
                  <span>Last seen: {lastSeen}</span>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea
              ref={scrollRef}
              className="flex-1 bg-[#E5DDD5] p-4"
              style={{
                backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QyZDJkMiIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNMCAwTDEwMCAxMDBNMTAwIDBMMCAxMDAiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=)",
              }}
            >
              <div className="space-y-3">
                {/* Date Divider */}
                <div className="flex items-center justify-center">
                  <Badge variant="secondary" className="bg-white/90 text-xs shadow-sm">
                    Today
                  </Badge>
                </div>

                {/* Messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.type === "sent" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-lg p-2 shadow-sm",
                        message.type === "sent"
                          ? "bg-[#DCF8C6]"
                          : "bg-white"
                      )}
                    >
                      {message.attachment && (
                        <div className="mb-2 flex items-center gap-2 rounded-md border border-border bg-muted/50 p-2">
                          <FileText className="size-8 text-primary" />
                          <div className="flex-1 text-sm">
                            <p className="font-medium">{message.attachment.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {message.attachment.size}
                            </p>
                          </div>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      <div className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        <span>{formatTime(message.timestamp)}</span>
                        {message.type === "sent" && getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t bg-background p-3">
              {/* Template Selector */}
              <div className="mb-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-2 bg-transparent">
                      <FileText className="size-3.5" />
                      <span className="text-xs">Templates</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64">
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      Quick Templates
                    </div>
                    {mockTemplates.map((template) => (
                      <DropdownMenuItem
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <span className="mr-2">{template.icon}</span>
                        <span className="flex-1">{template.name}</span>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <span className="text-primary">+ Create Template</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Message Input */}
              <div className="flex items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 shrink-0 text-muted-foreground"
                >
                  <Smile className="size-5" />
                </Button>
                <div className="flex-1 rounded-lg border bg-background">
                  <Textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Type a message..."
                    className="min-h-[40px] resize-none border-0 bg-transparent p-2 text-sm focus-visible:ring-0"
                    rows={1}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 shrink-0 text-muted-foreground"
                >
                  <Paperclip className="size-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 shrink-0 text-muted-foreground"
                >
                  <Camera className="size-5" />
                </Button>
                <Button
                  size="icon"
                  className="size-9 shrink-0 bg-[#25D366] hover:bg-[#20BA5A]"
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Template Preview Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-xl">{selectedTemplate?.icon}</span>
              {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription>
              Fill in the variables below to customize the message
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedTemplate?.variables.map((variable) => (
              <div key={variable} className="space-y-2">
                <Label htmlFor={variable} className="text-sm capitalize">
                  {variable.replace(/_/g, " ")}
                </Label>
                <Input
                  id={variable}
                  value={templateVariables[variable] || ""}
                  onChange={(e) =>
                    setTemplateVariables({
                      ...templateVariables,
                      [variable]: e.target.value,
                    })
                  }
                  placeholder={`Enter ${variable.replace(/_/g, " ")}`}
                />
              </div>
            ))}

            {/* Preview */}
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="mb-1 text-xs font-semibold text-muted-foreground">
                Preview:
              </p>
              <p className="whitespace-pre-wrap text-sm">
                {selectedTemplate &&
                  Object.entries(templateVariables).reduce(
                    (content, [key, value]) =>
                      content.replace(`{{${key}}}`, value || `{{${key}}}`),
                    selectedTemplate.content
                  )}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
              Cancel
            </Button>
            <Button onClick={handleSendTemplate} className="bg-[#25D366] hover:bg-[#20BA5A]">
              Preview & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
