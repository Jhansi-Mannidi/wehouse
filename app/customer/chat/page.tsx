"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Send, Paperclip, Camera, Check, CheckCheck, Sparkles, Bot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAI } from "@/lib/ai-context"

interface Message {
  id: string
  text: string
  sender: "customer" | "team"
  senderName?: string
  timestamp: string
  date?: string
  status?: "sent" | "delivered" | "read"
}

const initialMessages: Message[] = [
  {
    id: "m1",
    text: "Hi team, I saw the photos from today. Looking great! 👍",
    sender: "customer",
    timestamp: "10:00 AM",
    date: "Jan 26",
    status: "read",
  },
  {
    id: "m2",
    text: "Thank you Rajesh sir! The plastering is progressing well. We should complete the bedrooms by end of this week.",
    sender: "team",
    senderName: "Rahul",
    timestamp: "10:30 AM",
  },
  {
    id: "m3",
    text: "When will the electrical work start?",
    sender: "customer",
    timestamp: "11:00 AM",
    status: "read",
  },
  {
    id: "m4",
    text: "Electrical first fix starts Feb 10th as per schedule. Our electrician Suresh will be handling your project. He has 15+ years experience. 👍",
    sender: "team",
    senderName: "Rahul",
    timestamp: "11:15 AM",
  },
  {
    id: "m5",
    text: "Can you share the electrical layout plan?",
    sender: "customer",
    timestamp: "11:30 AM",
    status: "read",
  },
  {
    id: "m6",
    text: "Sure sir, I'll share the approved electrical layout by evening today. You can also find it in the Documents section of your app.",
    sender: "team",
    senderName: "Priya",
    timestamp: "11:45 AM",
  },
]

// AI quick questions for construction
const aiQuickQuestions = [
  "What's my project completion timeline?",
  "When is the next milestone due?",
  "What's the current project status?",
  "Are there any pending payments?",
  "What work is scheduled this week?",
]

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const { aiEnabled } = useAI()
  const [showAIPanel, setShowAIPanel] = React.useState(false)
  const [aiThinking, setAiThinking] = React.useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `m${Date.now()}`,
      text: newMessage,
      sender: "customer",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      status: "sent",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate team response
    setTimeout(() => {
      const response: Message = {
        id: `m${Date.now() + 1}`,
        text: "Thanks for your message! Our team will get back to you shortly.",
        sender: "team",
        senderName: "Support",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const handleAIQuestion = (question: string) => {
    // First, add the user's question to the chat
    const userQuestion: Message = {
      id: `m${Date.now()}`,
      text: question,
      sender: "customer",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      status: "read",
    }
    setMessages((prev) => [...prev, userQuestion])
    setAiThinking(true)
    
    // Simulate AI thinking and response
    setTimeout(() => {
      // Generate AI response based on question
      let aiResponse = ""
      if (question.includes("timeline") || question.includes("completion")) {
        aiResponse = "Based on current progress, your project is on track for completion by March 25, 2026. The plastering work is 60% complete and electrical work begins Feb 10th."
      } else if (question.includes("milestone")) {
        aiResponse = "Your next milestone is 'Internal Plastering Completion' due on Feb 5, 2026. Current progress: 60% complete. The team is working on bedrooms this week."
      } else if (question.includes("status")) {
        aiResponse = "Your project WH-P-001 is currently in the 'Plastering' stage at 60% completion. All work is progressing as per schedule with no delays reported."
      } else if (question.includes("payment")) {
        aiResponse = "You have one upcoming payment of Rs. 6,30,000 due on Jan 28, 2026 for the 'Plastering Completion' milestone. You can pay via UPI, Net Banking, or NEFT."
      } else if (question.includes("week") || question.includes("scheduled")) {
        aiResponse = "This week's schedule: Mon-Wed: Bedroom plastering, Thu-Fri: Kitchen plastering, Sat: Quality inspection. Site engineer Rahul will be present daily from 9 AM-5 PM."
      } else {
        aiResponse = "I can help you with project updates, timelines, payments, and scheduling. Please ask me about any of these topics!"
      }

      const response: Message = {
        id: `m${Date.now() + 1}`,
        text: aiResponse,
        sender: "team",
        senderName: "Wehouse AI",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      }
      setMessages((prev) => [...prev, response])
      setAiThinking(false)
      setShowAIPanel(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b flex-shrink-0">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link href="/customer">
            <Button variant="ghost" size="icon" className="bg-transparent">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-base">Chat with Wehouse</h1>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Team Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-background/50">
        {/* Date Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-[10px] bg-muted/80">
            Jan 26, 2026
          </Badge>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "customer" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm",
                message.sender === "customer"
                  ? "bg-[hsl(var(--hover-bg))] text-foreground rounded-br-md"
                  : "bg-card border rounded-bl-md"
              )}
            >
              {message.sender === "team" && message.senderName && (
                <p className="text-xs font-medium text-primary mb-1">
                  {message.senderName}
                </p>
              )}
              <p className={cn(
                "text-sm leading-relaxed",
                message.sender === "customer" ? "text-primary-foreground" : "text-foreground"
              )}>
                {message.text}
              </p>
              <div className={cn(
                "flex items-center justify-end gap-1 mt-1",
                message.sender === "customer" ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                <span className="text-[10px]">{message.timestamp}</span>
                {message.sender === "customer" && message.status && (
                  message.status === "read" ? (
                    <CheckCheck className="size-3 text-blue-400" />
                  ) : message.status === "delivered" ? (
                    <CheckCheck className="size-3" />
                  ) : (
                    <Check className="size-3" />
                  )
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Quick Questions Panel */}
      {aiEnabled && showAIPanel && (
        <div className="flex-shrink-0 border-t bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-orange-950/30 dark:to-amber-950/30 p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-[#f6a404]">
                <Bot className="size-3.5 text-white" />
              </div>
              <span className="text-sm font-medium">Ask Wehouse AI</span>
              <Badge variant="secondary" className="bg-[#f6a404]/10 text-[#f6a404] border-[#f6a404]/20 text-[10px]">
                Instant Answers
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 bg-transparent"
              onClick={() => setShowAIPanel(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiQuickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-auto py-1.5 px-3 text-xs bg-background/80 hover:bg-[#f6a404]/10 hover:border-[#f6a404]/30"
                onClick={() => handleAIQuestion(question)}
                disabled={aiThinking}
              >
                {question}
              </Button>
            ))}
          </div>
          {aiThinking && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <div className="flex gap-1">
                <span className="size-2 rounded-full bg-[#f6a404] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="size-2 rounded-full bg-[#f6a404] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="size-2 rounded-full bg-[#f6a404] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span>AI is thinking...</span>
            </div>
          )}
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 border-t bg-background p-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="bg-transparent flex-shrink-0">
            <Paperclip className="size-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-transparent flex-shrink-0">
            <Camera className="size-5 text-muted-foreground" />
          </Button>
          {aiEnabled && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "flex-shrink-0 transition-colors",
                showAIPanel ? "bg-[#f6a404]/10 text-[#f6a404]" : "bg-transparent"
              )}
              onClick={() => setShowAIPanel(!showAIPanel)}
            >
              <Sparkles className="size-5" />
            </Button>
          )}
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={aiEnabled ? "Type a message or ask AI..." : "Type a message..."}
            className="flex-1 bg-muted border-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button
            size="icon"
            className="flex-shrink-0 rounded-full"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
