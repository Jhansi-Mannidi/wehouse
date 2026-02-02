"use client"

import * as React from "react"
import { Upload, X, ImageIcon, CheckCircle2, AlertTriangle } from "lucide-react"
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
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

// Upload Images Modal
interface UploadImagesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subtaskName: string
  subtaskId?: string
  onSubmitSuccess?: (subtaskId: string) => void
}

export function UploadImagesModal({
  open,
  onOpenChange,
  subtaskName,
  subtaskId,
  onSubmitSuccess,
}: UploadImagesModalProps) {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
  const [description, setDescription] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...newFiles].slice(0, 10))
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Images Uploaded Successfully",
        description: `${selectedFiles.length} image(s) uploaded for "${subtaskName}".`,
        variant: "success" as const,
      })

      if (onSubmitSuccess && subtaskId) {
        onSubmitSuccess(subtaskId)
      }

      setSelectedFiles([])
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
          <DialogTitle className="text-2xl font-bold">Upload Images</DialogTitle>
          <DialogDescription className="text-base">
            Upload progress photos for <span className="font-semibold text-foreground">{subtaskName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Select Images <span className="text-red-500">*</span>
            </Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-[#f6a404] hover:bg-orange-50/50 dark:hover:bg-orange-950/10 transition-colors"
            >
              <Upload className="size-10 mx-auto text-slate-400 mb-3" />
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each (max 10 files)</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Selected Files ({selectedFiles.length})</Label>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <ImageIcon className="size-4 text-slate-500" />
                    <span className="text-sm flex-1 truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)}KB</span>
                    <button type="button" onClick={() => removeFile(index)} className="text-slate-400 hover:text-red-500">
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add notes about these images..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={selectedFiles.length === 0 || isSubmitting}
              className="flex-1 h-11 bg-[#f6a404] hover:bg-[#e09503] text-white font-semibold"
            >
              {isSubmitting ? "Uploading..." : `Upload ${selectedFiles.length} Image${selectedFiles.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Create Ticket Modal (for site engineer)
interface CreateTicketModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subtaskName: string
  subtaskId?: string
  onSubmitSuccess?: (subtaskId: string) => void
}

export function CreateTicketModal({
  open,
  onOpenChange,
  subtaskName,
  subtaskId,
  onSubmitSuccess,
}: CreateTicketModalProps) {
  const [issueType, setIssueType] = React.useState("")
  const [priority, setPriority] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      toast({
        title: "Ticket Created Successfully",
        description: `Ticket for "${subtaskName}" has been created and assigned.`,
        variant: "success" as const,
      })

      if (onSubmitSuccess && subtaskId) {
        onSubmitSuccess(subtaskId)
      }

      setIssueType("")
      setPriority("")
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
          <DialogTitle className="text-2xl font-bold">Create Ticket</DialogTitle>
          <DialogDescription className="text-base">
            Report an issue for <span className="font-semibold text-foreground">{subtaskName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            {/* Issue Type */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Issue Type <span className="text-red-500">*</span>
              </Label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="material">Material Issue</SelectItem>
                  <SelectItem value="labor">Labor Issue</SelectItem>
                  <SelectItem value="quality">Quality Defect</SelectItem>
                  <SelectItem value="safety">Safety Concern</SelectItem>
                  <SelectItem value="delay">Schedule Delay</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Priority <span className="text-red-500">*</span>
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Brief description of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Details <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Provide detailed information about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!issueType || !priority || !title || !description || isSubmitting}
              className="flex-1 h-11 bg-[#f6a404] hover:bg-[#e09503] text-white font-semibold"
            >
              {isSubmitting ? "Creating..." : "Create Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Update Progress Modal
interface UpdateProgressModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subtaskName: string
  subtaskId?: string
  currentProgress?: number
  onSubmitSuccess?: (subtaskId: string, newStatus: "completed" | "in-progress" | "pending") => void
}

export function UpdateProgressModal({
  open,
  onOpenChange,
  subtaskName,
  subtaskId,
  currentProgress = 0,
  onSubmitSuccess,
}: UpdateProgressModalProps) {
  const [progress, setProgress] = React.useState([currentProgress])
  const [status, setStatus] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    setProgress([currentProgress])
  }, [currentProgress, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      const newStatus = progress[0] === 100 ? "completed" : progress[0] > 0 ? "in-progress" : "pending"

      toast({
        title: "Progress Updated",
        description: `"${subtaskName}" progress updated to ${progress[0]}%.`,
        variant: "success" as const,
      })

      if (onSubmitSuccess && subtaskId) {
        onSubmitSuccess(subtaskId, newStatus as "completed" | "in-progress" | "pending")
      }

      setNotes("")
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">Update Progress</DialogTitle>
          <DialogDescription className="text-base">
            Update completion status for <span className="font-semibold text-foreground">{subtaskName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Progress Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Progress</Label>
              <span className={cn(
                "text-lg font-bold",
                progress[0] === 100 ? "text-emerald-600" : progress[0] >= 50 ? "text-[#f6a404]" : "text-slate-600"
              )}>
                {progress[0]}%
              </span>
            </div>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={5}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Not Started</span>
              <span>In Progress</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Status Preview */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
            <div className={cn(
              "size-8 rounded-full flex items-center justify-center",
              progress[0] === 100 ? "bg-emerald-500" : progress[0] > 0 ? "bg-[#f6a404]" : "bg-slate-300"
            )}>
              {progress[0] === 100 ? (
                <CheckCircle2 className="size-4 text-white" />
              ) : (
                <span className="text-white text-xs font-bold">{progress[0]}%</span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {progress[0] === 100 ? "Completed" : progress[0] > 0 ? "In Progress" : "Not Started"}
              </p>
              <p className="text-xs text-muted-foreground">
                {progress[0] === 100 ? "This subtask will be marked as done" : "Update the slider to change progress"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Notes (Optional)</Label>
            <Textarea
              placeholder="Add any notes about the progress..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-20 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 bg-[#f6a404] hover:bg-[#e09503] text-white font-semibold"
            >
              {isSubmitting ? "Updating..." : "Update Progress"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Quality Check Modal
interface QualityCheckModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subtaskName: string
  subtaskId?: string
  onSubmitSuccess?: (subtaskId: string) => void
}

export function QualityCheckModal({
  open,
  onOpenChange,
  subtaskName,
  subtaskId,
  onSubmitSuccess,
}: QualityCheckModalProps) {
  const [checklistItems, setChecklistItems] = React.useState([
    { id: "materials", label: "Materials quality verified", checked: false },
    { id: "workmanship", label: "Workmanship meets standards", checked: false },
    { id: "dimensions", label: "Dimensions are accurate", checked: false },
    { id: "safety", label: "Safety requirements met", checked: false },
    { id: "cleanliness", label: "Work area is clean", checked: false },
  ])
  const [overallRating, setOverallRating] = React.useState("")
  const [remarks, setRemarks] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  const toggleItem = (id: string) => {
    setChecklistItems(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    )
  }

  const checkedCount = checklistItems.filter(i => i.checked).length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      toast({
        title: "Quality Check Completed",
        description: `Quality check for "${subtaskName}" has been recorded.`,
        variant: "success" as const,
      })

      if (onSubmitSuccess && subtaskId) {
        onSubmitSuccess(subtaskId)
      }

      setChecklistItems(prev => prev.map(item => ({ ...item, checked: false })))
      setOverallRating("")
      setRemarks("")
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">Quality Check</DialogTitle>
          <DialogDescription className="text-base">
            Perform quality inspection for <span className="font-semibold text-foreground">{subtaskName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Quality Checklist</Label>
              <span className="text-xs text-muted-foreground">{checkedCount}/{checklistItems.length} checked</span>
            </div>
            <div className="space-y-2">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                    item.checked 
                      ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800/30" 
                      : "bg-white hover:bg-slate-50 dark:bg-slate-800/50 dark:hover:bg-slate-800"
                  )}
                >
                  <Checkbox checked={item.checked} className="pointer-events-none" />
                  <span className={cn("text-sm flex-1", item.checked && "text-emerald-700 dark:text-emerald-400")}>
                    {item.label}
                  </span>
                  {item.checked && <CheckCircle2 className="size-4 text-emerald-500" />}
                </div>
              ))}
            </div>
          </div>

          {/* Overall Rating */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Overall Rating <span className="text-red-500">*</span>
            </Label>
            <Select value={overallRating} onValueChange={setOverallRating}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent - Exceeds Standards</SelectItem>
                <SelectItem value="good">Good - Meets Standards</SelectItem>
                <SelectItem value="acceptable">Acceptable - Minor Issues</SelectItem>
                <SelectItem value="needs_work">Needs Work - Requires Rework</SelectItem>
                <SelectItem value="rejected">Rejected - Does Not Meet Standards</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Warning for rejected/needs work */}
          {(overallRating === "rejected" || overallRating === "needs_work") && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
              <AlertTriangle className="size-4 text-amber-600 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-400">
                A ticket will be automatically created for rework when you submit this quality check.
              </p>
            </div>
          )}

          {/* Remarks */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Remarks</Label>
            <Textarea
              placeholder="Add inspection notes or observations..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="min-h-20 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!overallRating || isSubmitting}
              className="flex-1 h-11 bg-[#f6a404] hover:bg-[#e09503] text-white font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Submit Quality Check"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
