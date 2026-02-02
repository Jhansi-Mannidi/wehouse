"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Sun,
  Cloud,
  CloudRain,
  Plus,
  Camera,
  X,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Save,
  Eye,
  Send,
  ImageIcon,
  Trash2,
} from "lucide-react"

import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Mock project data
const projectData = {
  id: "WH-P-HYD-2026-001",
  customerName: "Rajesh Kumar",
  currentMilestone: "M12: Internal Plastering",
  milestones: [
    "M10: Roof Casting",
    "M11: Brick Work",
    "M12: Internal Plastering",
    "M13: External Plastering",
    "M14: Electrical First Fix",
  ],
}

// Weather options
const weatherOptions = [
  { value: "clear", label: "Clear", icon: Sun, temp: "28°C" },
  { value: "cloudy", label: "Cloudy", icon: Cloud, temp: "26°C" },
  { value: "rainy", label: "Rainy", icon: CloudRain, temp: "24°C" },
]

// Issue types
const issueTypes = [
  "Material Shortage",
  "Labor Unavailability",
  "Weather Delay",
  "Design Change",
  "Quality Issue",
  "Equipment Failure",
  "Client Request",
  "Other",
]

// Worker types
const workerTypes = ["Mason", "Helper", "Carpenter", "Electrician", "Plumber", "Supervisor", "Painter"]

// Material items
const materialItems = ["Cement", "Sand", "Steel", "Bricks", "Water", "Aggregate", "Paint", "PVC Pipes", "Electrical Wire"]

interface WorkerEntry {
  id: string
  type: string
  count: number
  hours: number
}

interface MaterialEntry {
  id: string
  item: string
  quantity: string
  unit: string
}

interface PhotoEntry {
  id: string
  url: string
  caption: string
  category: string
}

interface IssueEntry {
  id: string
  type: string
  description: string
  impact: string
  actionTaken: string
  photo?: string
}

export default function DailyReportPage() {
  const params = useParams()
  const today = new Date()
  
  // Form state
  const [weather, setWeather] = React.useState("clear")
  const [selectedMilestone, setSelectedMilestone] = React.useState(projectData.currentMilestone)
  const [workCompleted, setWorkCompleted] = React.useState(
    "• Completed plastering in Bedroom 2 (north & east walls)\n• Started preparation for Bedroom 3\n• Curing ongoing in Bedroom 1"
  )
  const [progressPercent, setProgressPercent] = React.useState(70)
  const [progressToday, setProgressToday] = React.useState(20)
  const [workPlanned, setWorkPlanned] = React.useState(
    "• Complete Bedroom 2 plastering\n• Begin Bedroom 3 plastering"
  )
  
  // Workforce
  const [workers, setWorkers] = React.useState<WorkerEntry[]>([
    { id: "1", type: "Mason", count: 3, hours: 8 },
    { id: "2", type: "Helper", count: 2, hours: 8 },
    { id: "3", type: "Supervisor", count: 1, hours: 8 },
  ])
  
  // Materials
  const [materials, setMaterials] = React.useState<MaterialEntry[]>([
    { id: "1", item: "Cement", quantity: "15", unit: "bags" },
    { id: "2", item: "Sand", quantity: "2", unit: "cu.m" },
    { id: "3", item: "Water", quantity: "500", unit: "L" },
  ])
  
  // Photos
  const [photos, setPhotos] = React.useState<PhotoEntry[]>([
    { id: "1", url: "/placeholder.svg", caption: "Bedroom 2 North Wall", category: "progress" },
    { id: "2", url: "/placeholder.svg", caption: "Bedroom 2 East Wall", category: "progress" },
  ])
  const [photoCategory, setPhotoCategory] = React.useState("progress")
  
  // Issues
  const [hasIssues, setHasIssues] = React.useState(true)
  const [issues, setIssues] = React.useState<IssueEntry[]>([
    {
      id: "1",
      type: "Material Shortage",
      description: "Sand delivery delayed by 1 day",
      impact: "May affect tomorrow's work",
      actionTaken: "Contacted supplier, confirmed for AM",
    },
  ])
  
  // Quality
  const [qualityMeetsStandards, setQualityMeetsStandards] = React.useState(true)
  const [safetyFollowed, setSafetyFollowed] = React.useState(true)
  const [qualityIssueObserved, setQualityIssueObserved] = React.useState(false)
  const [qualityNotes, setQualityNotes] = React.useState("Plaster thickness uniform, surface finish good")
  
  // Preview dialog
  const [showPreview, setShowPreview] = React.useState(false)
  
  // Calculate totals
  const totalWorkers = workers.reduce((sum, w) => sum + w.count, 0)
  const totalHours = workers.reduce((sum, w) => sum + w.count * w.hours, 0)
  
  // Add worker
  const addWorker = () => {
    setWorkers([...workers, { id: Date.now().toString(), type: "Helper", count: 1, hours: 8 }])
  }
  
  // Remove worker
  const removeWorker = (id: string) => {
    setWorkers(workers.filter(w => w.id !== id))
  }
  
  // Add material
  const addMaterial = () => {
    setMaterials([...materials, { id: Date.now().toString(), item: "Cement", quantity: "", unit: "bags" }])
  }
  
  // Remove material
  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id))
  }
  
  // Add issue
  const addIssue = () => {
    setIssues([...issues, { id: Date.now().toString(), type: "", description: "", impact: "", actionTaken: "" }])
  }
  
  // Remove issue
  const removeIssue = (id: string) => {
    setIssues(issues.filter(i => i.id !== id))
  }
  
  // Remove photo
  const removePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id))
  }
  
  // Get weather icon
  const WeatherIcon = weatherOptions.find(w => w.value === weather)?.icon || Sun
  const weatherInfo = weatherOptions.find(w => w.value === weather)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/projects/${params.id}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="size-4" />
              Back to Project
            </Link>
            <h1 className="text-2xl font-semibold text-foreground">Daily Progress Report</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <p className="text-sm text-muted-foreground">
                Project: <span className="font-medium text-foreground">{projectData.customerName}</span> ({projectData.id})
              </p>
              <span className="text-muted-foreground">|</span>
              <p className="text-sm text-muted-foreground">
                Date: <span className="font-medium text-foreground">
                  {today.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </p>
            </div>
          </div>
          
          {/* Weather Selector */}
          <div className="flex items-center gap-3 p-3 rounded-xl border bg-card">
            <Select value={weather} onValueChange={setWeather}>
              <SelectTrigger className="w-[140px] border-0 bg-transparent p-0 h-auto focus:ring-0">
                <div className="flex items-center gap-2">
                  <WeatherIcon className="size-5 text-primary" />
                  <span className="font-medium">{weatherInfo?.label}, {weatherInfo?.temp}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {weatherOptions.map((w) => (
                  <SelectItem key={w.value} value={w.value}>
                    <div className="flex items-center gap-2">
                      <w.icon className="size-4" />
                      <span>{w.label}, {w.temp}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Section 1: Work Summary */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="size-4 text-primary" />
              </div>
              Today's Work Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Milestone */}
            <div className="space-y-2">
              <Label>Current Milestone</Label>
              <Select value={selectedMilestone} onValueChange={setSelectedMilestone}>
                <SelectTrigger className="w-full md:w-[400px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projectData.milestones.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Work Completed */}
            <div className="space-y-2">
              <Label>Work Completed Today</Label>
              <Textarea
                value={workCompleted}
                onChange={(e) => setWorkCompleted(e.target.value)}
                placeholder="List the work completed today (use bullet points)..."
                className="min-h-[120px] resize-none"
              />
            </div>
            
            {/* Progress Update */}
            <div className="space-y-3">
              <Label>Progress Update</Label>
              <div className="p-4 rounded-xl border bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Bedroom 2 Plastering</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{progressPercent}%</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      +{progressToday}% today
                    </Badge>
                  </div>
                </div>
                <Progress value={progressPercent} className="h-3" />
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">Total:</Label>
                    <Input
                      type="number"
                      value={progressPercent}
                      onChange={(e) => setProgressPercent(Number(e.target.value))}
                      className="w-20 h-8 text-sm"
                      min={0}
                      max={100}
                    />
                    <span className="text-xs text-muted-foreground">%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">Today:</Label>
                    <Input
                      type="number"
                      value={progressToday}
                      onChange={(e) => setProgressToday(Number(e.target.value))}
                      className="w-20 h-8 text-sm"
                      min={0}
                      max={100}
                    />
                    <span className="text-xs text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Work Planned */}
            <div className="space-y-2">
              <Label>Work Planned for Tomorrow</Label>
              <Textarea
                value={workPlanned}
                onChange={(e) => setWorkPlanned(e.target.value)}
                placeholder="List the work planned for tomorrow..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Workforce & Materials */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Workforce */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="size-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-sm">👷</span>
                </div>
                Workforce
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-2">
                  <div className="col-span-5">Type</div>
                  <div className="col-span-3">Count</div>
                  <div className="col-span-3">Hours</div>
                  <div className="col-span-1"></div>
                </div>
                
                {/* Worker rows */}
                {workers.map((worker) => (
                  <div key={worker.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <Select
                        value={worker.type}
                        onValueChange={(v) => setWorkers(workers.map(w => w.id === worker.id ? { ...w, type: v } : w))}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {workerTypes.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={worker.count}
                        onChange={(e) => setWorkers(workers.map(w => w.id === worker.id ? { ...w, count: Number(e.target.value) } : w))}
                        className="h-9"
                        min={1}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={worker.hours}
                        onChange={(e) => setWorkers(workers.map(w => w.id === worker.id ? { ...w, hours: Number(e.target.value) } : w))}
                        className="h-9"
                        min={1}
                        max={24}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeWorker(worker.id)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Totals */}
                <div className="grid grid-cols-12 gap-2 items-center pt-3 border-t">
                  <div className="col-span-5 text-sm font-medium">Total</div>
                  <div className="col-span-3 text-sm font-semibold">{totalWorkers}</div>
                  <div className="col-span-3 text-sm font-semibold">{totalHours} hrs</div>
                  <div className="col-span-1"></div>
                </div>
                
                {/* Add button */}
                <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" onClick={addWorker}>
                  <Plus className="size-4 mr-2" />
                  Add Worker
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Materials */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="size-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <span className="text-sm">📦</span>
                </div>
                Materials Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-2">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-3">Quantity</div>
                  <div className="col-span-3">Unit</div>
                  <div className="col-span-1"></div>
                </div>
                
                {/* Material rows */}
                {materials.map((material) => (
                  <div key={material.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <Select
                        value={material.item}
                        onValueChange={(v) => setMaterials(materials.map(m => m.id === material.id ? { ...m, item: v } : m))}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {materialItems.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={material.quantity}
                        onChange={(e) => setMaterials(materials.map(m => m.id === material.id ? { ...m, quantity: e.target.value } : m))}
                        className="h-9"
                        placeholder="0"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={material.unit}
                        onChange={(e) => setMaterials(materials.map(m => m.id === material.id ? { ...m, unit: e.target.value } : m))}
                        className="h-9"
                        placeholder="bags"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeMaterial(material.id)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Add button */}
                <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" onClick={addMaterial}>
                  <Plus className="size-4 mr-2" />
                  Add Material
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Photo Evidence */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="size-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Camera className="size-4 text-purple-600" />
                </div>
                Site Photos
                <Badge variant="secondary" className="ml-2">Required: Minimum 3</Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                {photos.length >= 3 ? (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle2 className="size-3 mr-1" />
                    {photos.length} photos added
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="bg-red-100 text-red-700">
                    <AlertTriangle className="size-3 mr-1" />
                    {3 - photos.length} more required
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Capture button */}
              <button
                className="aspect-square rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="size-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Capture</span>
              </button>
              
              {/* Existing photos */}
              {photos.map((photo) => (
                <div key={photo.id} className="relative group aspect-square rounded-xl border bg-muted overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="size-8 text-muted-foreground/50" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-xs text-white truncate">{photo.caption}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePhoto(photo.id)}
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              ))}
              
              {/* Add photo button */}
              <button
                className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <Upload className="size-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add Photo</span>
              </button>
            </div>
            
            {/* Photo Categories */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
              <span className="text-sm font-medium text-muted-foreground">Photo Categories:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "progress", label: "Progress" },
                  { value: "quality", label: "Quality Issue" },
                  { value: "material", label: "Material" },
                  { value: "safety", label: "Safety" },
                ].map((cat) => (
                  <label
                    key={cat.value}
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors",
                      photoCategory === cat.value
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <Checkbox
                      checked={photoCategory === cat.value}
                      onCheckedChange={() => setPhotoCategory(cat.value)}
                      className="size-4"
                    />
                    <span className="text-sm">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Add caption to each photo for clarity</p>
          </CardContent>
        </Card>

        {/* Section 4: Issues & Delays */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="size-8 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="size-4 text-red-600" />
              </div>
              Issues / Delays / Blockers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Any issues today?</span>
              <RadioGroup
                value={hasIssues ? "yes" : "no"}
                onValueChange={(v) => setHasIssues(v === "yes")}
                className="flex items-center gap-4"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="no" />
                  <span className="text-sm">No Issues</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="yes" />
                  <span className="text-sm">Yes</span>
                </label>
              </RadioGroup>
            </div>
            
            {/* Issues list */}
            {hasIssues && (
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <div key={issue.id} className="p-4 rounded-xl border bg-muted/30 space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium">Issue {index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeIssue(issue.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs">Issue Type</Label>
                        <Select
                          value={issue.type}
                          onValueChange={(v) => setIssues(issues.map(i => i.id === issue.id ? { ...i, type: v } : i))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                          <SelectContent>
                            {issueTypes.map((t) => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Impact</Label>
                        <Input
                          value={issue.impact}
                          onChange={(e) => setIssues(issues.map(i => i.id === issue.id ? { ...i, impact: e.target.value } : i))}
                          placeholder="Impact on project..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={issue.description}
                        onChange={(e) => setIssues(issues.map(i => i.id === issue.id ? { ...i, description: e.target.value } : i))}
                        placeholder="Describe the issue..."
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Action Taken</Label>
                      <Textarea
                        value={issue.actionTaken}
                        onChange={(e) => setIssues(issues.map(i => i.id === issue.id ? { ...i, actionTaken: e.target.value } : i))}
                        placeholder="What action was taken..."
                        className="min-h-[60px] resize-none"
                      />
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Camera className="size-4 mr-2" />
                      Add Photo Evidence
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" onClick={addIssue}>
                  <Plus className="size-4 mr-2" />
                  Add Another Issue
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 5: Quality Observations */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="size-8 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="size-4 text-green-600" />
              </div>
              Quality Observations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={qualityMeetsStandards}
                  onCheckedChange={(v) => setQualityMeetsStandards(v === true)}
                />
                <span className="text-sm">Work meets quality standards</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={safetyFollowed}
                  onCheckedChange={(v) => setSafetyFollowed(v === true)}
                />
                <span className="text-sm">Safety protocols followed</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={qualityIssueObserved}
                  onCheckedChange={(v) => setQualityIssueObserved(v === true)}
                />
                <span className="text-sm text-red-600">Quality issue observed (requires NCR)</span>
              </label>
            </div>
            
            {/* Quality notes */}
            <div className="space-y-2">
              <Label>Quality Notes</Label>
              <Textarea
                value={qualityNotes}
                onChange={(e) => setQualityNotes(e.target.value)}
                placeholder="Add quality observations..."
                className="min-h-[80px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="sticky bottom-0 -mx-6 -mb-6 p-4 bg-background border-t">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>Report due by 7:00 PM today</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="lg">
                <Save className="size-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="lg" onClick={() => setShowPreview(true)}>
                <Eye className="size-4 mr-2" />
                Preview
              </Button>
              <Button size="lg" className="px-6">
                <Send className="size-4 mr-2" />
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Preview</DialogTitle>
            <DialogDescription>
              Review your daily progress report before submitting
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Preview content */}
            <div className="p-4 rounded-xl border bg-muted/30">
              <h3 className="font-semibold text-lg">{projectData.customerName}</h3>
              <p className="text-sm text-muted-foreground">{projectData.id}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {today.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Work Completed</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{workCompleted}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Progress</h4>
              <Progress value={progressPercent} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">{progressPercent}% (+{progressToday}% today)</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Workforce</h4>
              <p className="text-sm text-muted-foreground">{totalWorkers} workers, {totalHours} total hours</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Photos</h4>
              <p className="text-sm text-muted-foreground">{photos.length} photos attached</p>
            </div>
            
            {hasIssues && issues.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Issues Reported</h4>
                <p className="text-sm text-muted-foreground">{issues.length} issue(s) reported</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Edit Report
            </Button>
            <Button>
              <Send className="size-4 mr-2" />
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
