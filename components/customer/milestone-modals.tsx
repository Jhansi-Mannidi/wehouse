"use client"

import * as React from "react"
import { Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface RaiseTicketModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subtaskName: string
  onSubmitSuccess?: () => void
}

export function RaiseTicketModal({
  open,
  onOpenChange,
  subtaskName,
  onSubmitSuccess,
}: RaiseTicketModalProps) {
  const [issueType, setIssueType] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      // Show success toast
      toast({
        title: "Ticket Raised Successfully",
        description: `Your ticket for "${subtaskName}" has been submitted. Our team will review it shortly.`,
        variant: "success" as const,
      })

      // Call success callback
      onSubmitSuccess?.()

      // Reset form and close
      setIssueType("")
      setTitle("")
      setDescription("")
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">Raise a Ticket</DialogTitle>
          <DialogDescription className="text-base">
            Report an issue or concern for <span className="font-semibold text-foreground">{subtaskName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Issue Type */}
          <div className="space-y-2">
            <Label htmlFor="issue-type" className="text-sm font-semibold">
              Issue Type <span className="text-red-500">*</span>
            </Label>
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger id="issue-type" className="h-11">
                <SelectValue placeholder="Select the type of issue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quality">Quality Issue</SelectItem>
                <SelectItem value="delay">Delay in Work</SelectItem>
                <SelectItem value="material">Material Problem</SelectItem>
                <SelectItem value="safety">Safety Concern</SelectItem>
                <SelectItem value="damage">Damage/Defect</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">
              Issue Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g., Cracks found in plastering"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">
              Detailed Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail. Include location, severity, and any other relevant information..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">
              Providing clear details helps our team resolve issues faster
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!issueType || !title || !description || isSubmitting}
              className="flex-1 h-11 bg-[#f6a404] hover:bg-[#e09503] text-white font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface ReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subtaskName: string
  onSubmitSuccess?: () => void
}

export function ReviewModal({
  open,
  onOpenChange,
  subtaskName,
  onSubmitSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = React.useState(0)
  const [hoverRating, setHoverRating] = React.useState(0)
  const [review, setReview] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      // Show success toast
      toast({
        title: "Review Submitted Successfully",
        description: `Thank you for your feedback on "${subtaskName}". Your review helps us improve!`,
        variant: "success" as const,
      })

      // Call success callback
      onSubmitSuccess?.()

      // Reset form and close
      setRating(0)
      setHoverRating(0)
      setReview("")
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">Submit Review</DialogTitle>
          <DialogDescription className="text-base">
            Share your experience and feedback for <span className="font-semibold text-foreground">{subtaskName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Your Rating <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg border">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-125 focus:outline-none focus:scale-125"
                >
                  <Star
                    className={cn(
                      "size-9 transition-all",
                      star <= (hoverRating || rating)
                        ? "fill-[#f6a404] text-[#f6a404] drop-shadow-sm"
                        : "text-slate-300 dark:text-slate-600"
                    )}
                  />
                </button>
              ))}
            </div>
            {(hoverRating || rating) > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#f6a404] transition-all duration-300"
                    style={{ width: `${((hoverRating || rating) / 5) * 100}%` }}
                  />
                </div>
                <p className="text-sm font-semibold text-[#f6a404] min-w-fit">
                  {["Poor", "Fair", "Good", "Very Good", "Excellent"][(hoverRating || rating) - 1]}
                </p>
              </div>
            )}
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review" className="text-sm font-semibold">
              Your Feedback <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="review"
              placeholder="Tell us about your experience with this task. What went well? What could be improved?"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-32 resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">
              Your feedback helps us improve our service quality
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!rating || !review || isSubmitting}
              className="flex-1 h-11 bg-[#f6a404] hover:bg-[#e09503] text-white font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
