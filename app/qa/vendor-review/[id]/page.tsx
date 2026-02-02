"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { 
  ArrowLeft, 
  Building2, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Star,
  ChevronDown,
  ChevronRight,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileCheck,
  Shield,
  Target,
  TrendingUp,
  Save,
  Send,
  Plus,
  Minus,
  ExternalLink,
  Info,
  CheckCheck,
} from "lucide-react"
import { 
  SUPPLY_CATEGORIES, 
  STATUS_CONFIG, 
  QUALITY_CRITERIA,
  QA_REJECTION_REASONS,
  createEmptyQAEvaluation,
} from "@/lib/vendor-types"
import type { 
  VendorApplication, 
  QAEvaluation, 
  QualityCriteriaCheck,
  CategoryQualityAssessment,
} from "@/lib/vendor-types"

// Sample vendor data (same as before)
const sampleVendor: VendorApplication = {
  id: "VND-HYD-2026-0023",
  applicationNumber: "VND-HYD-2026-0023",
  companyInfo: {
    name: "ABC Steel Suppliers",
    legalName: "ABC Steel Suppliers Pvt Ltd",
    type: "Private Limited",
    gstin: "36AABCU9603R1ZM",
    pan: "AABCU9603R",
    incorporationDate: "2018-05-15",
    registeredAddress: { 
      line1: "Plot 45, Industrial Area", 
      line2: "Phase 2", 
      city: "Hyderabad", 
      state: "TG", 
      pincode: "500032",
      landmark: "Near Steel Market"
    },
    operationalAddress: {
      line1: "Warehouse 12, Steel Hub",
      city: "Hyderabad",
      state: "TG",
      pincode: "500033",
    },
  },
  contactInfo: {
    primaryContact: { 
      name: "Rajesh Kumar", 
      designation: "Director", 
      phone: "9876543210", 
      email: "rajesh@abcsteel.com",
      whatsapp: "9876543210",
    },
    alternateContact: {
      name: "Suresh Kumar",
      phone: "9876543211",
      email: "suresh@abcsteel.com",
    },
  },
  supplyCategories: [
    { 
      id: "steel", 
      name: "Iron / Steel", 
      code: "STL", 
      subcategories: ["TMT Bars", "Structural Steel", "Binding Wire"],
      selectedSubcategories: ["TMT Bars", "Structural Steel"],
    },
  ],
  bankDetails: { 
    accountName: "ABC Steel Suppliers Pvt Ltd", 
    accountNumber: "1234567890123456", 
    bankName: "HDFC Bank", 
    branchName: "Secunderabad Main Branch", 
    ifscCode: "HDFC0001234", 
    accountType: "Current" 
  },
  documents: {
    gstCertificate: { id: "doc1", name: "GST Certificate.pdf", url: "/docs/gst.pdf", type: "pdf", uploadedAt: "2026-01-15", size: 245000 },
    panCard: { id: "doc2", name: "Company PAN.pdf", url: "/docs/pan.pdf", type: "pdf", uploadedAt: "2026-01-15", size: 180000 },
    incorporationCertificate: { id: "doc3", name: "Incorporation Certificate.pdf", url: "/docs/inc.pdf", type: "pdf", uploadedAt: "2026-01-15", size: 320000 },
    bankStatement: { id: "doc4", name: "Bank Statement - Dec 2025.pdf", url: "/docs/bank.pdf", type: "pdf", uploadedAt: "2026-01-15", size: 450000 },
    qualityCertifications: [
      { id: "doc5", name: "BIS Certificate.pdf", url: "/docs/bis.pdf", type: "pdf", uploadedAt: "2026-01-15", size: 280000 },
      { id: "doc6", name: "ISO 9001 Certificate.pdf", url: "/docs/iso.pdf", type: "pdf", uploadedAt: "2026-01-15", size: 310000 },
    ],
  },
  classification: { 
    vendorType: "Fixed", 
    creditLimit: 500000, 
    paymentTerms: "30 Days" 
  },
  cityId: "hyderabad",
  cityName: "Hyderabad",
  status: "qa_review",
  workflowHistory: [
    { id: "wf1", status: "submitted", action: "Application submitted", performedBy: "Rajesh Kumar", performedByRole: "Vendor", timestamp: "2026-01-15T10:00:00Z" },
    { id: "wf2", status: "city_review", action: "Assigned for City Admin review", performedBy: "System", performedByRole: "System", timestamp: "2026-01-15T10:05:00Z" },
    { id: "wf3", status: "qa_review", action: "Forwarded to QA for evaluation", performedBy: "Priya Mehta", performedByRole: "City Admin", remarks: "Documents verified. Please evaluate quality standards.", timestamp: "2026-01-18T14:30:00Z" },
  ],
  createdAt: "2026-01-15T10:00:00Z",
  updatedAt: "2026-01-20T14:30:00Z",
  submittedAt: "2026-01-15T10:00:00Z",
}

// Star Rating Component
function StarRating({ 
  value, 
  onChange, 
  max = 5,
  size = "default",
  disabled = false,
}: { 
  value: number
  onChange: (value: number) => void
  max?: number
  size?: "sm" | "default" | "lg"
  disabled?: boolean
}) {
  const [hoverValue, setHoverValue] = React.useState(0)
  
  const sizeClasses = {
    sm: "size-4",
    default: "size-5",
    lg: "size-6",
  }
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1
        const isFilled = starValue <= (hoverValue || value)
        
        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            className={cn(
              "transition-colors",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-110"
            )}
            onClick={() => !disabled && onChange(starValue)}
            onMouseEnter={() => !disabled && setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
          >
            <Star 
              className={cn(
                sizeClasses[size],
                isFilled 
                  ? "fill-amber-400 text-amber-400" 
                  : "fill-transparent text-muted-foreground/40"
              )} 
            />
          </button>
        )
      })}
      <span className="ml-2 text-sm font-medium">
        {value > 0 ? `${value}/${max}` : "Not rated"}
      </span>
    </div>
  )
}

// Checklist Item Component
function ChecklistItem({
  id,
  label,
  description,
  required,
  checked,
  onCheckedChange,
  notes,
  onNotesChange,
  showNotes = false,
}: {
  id: string
  label: string
  description?: string
  required?: boolean
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  notes?: string
  onNotesChange?: (notes: string) => void
  showNotes?: boolean
}) {
  const [isNotesOpen, setIsNotesOpen] = React.useState(!!notes)
  
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <Label htmlFor={id} className="text-sm font-medium cursor-pointer flex items-center gap-2">
            {label}
            {required && <Badge variant="outline" className="text-[10px] px-1 py-0">Required</Badge>}
          </Label>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        {showNotes && (
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 h-7 text-xs bg-transparent"
            onClick={() => setIsNotesOpen(!isNotesOpen)}
          >
            {isNotesOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
            Notes
          </Button>
        )}
      </div>
      {showNotes && isNotesOpen && onNotesChange && (
        <Textarea
          placeholder="Add notes..."
          value={notes || ""}
          onChange={(e) => onNotesChange(e.target.value)}
          className="ml-8 text-sm"
          rows={2}
        />
      )}
    </div>
  )
}

// Section Progress Indicator
function SectionProgress({ 
  sections 
}: { 
  sections: { name: string; completed: boolean; score?: number }[] 
}) {
  const completedCount = sections.filter(s => s.completed).length
  const progress = (completedCount / sections.length) * 100
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Evaluation Progress</span>
        <span className="font-medium">{completedCount}/{sections.length} sections</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex flex-wrap gap-2">
        {sections.map((section, i) => (
          <Badge 
            key={i}
            variant={section.completed ? "default" : "outline"}
            className={cn(
              "text-xs",
              section.completed && "bg-emerald-500 hover:bg-emerald-500"
            )}
          >
            {section.completed && <CheckCircle2 className="size-3 mr-1" />}
            {section.name}
            {section.score !== undefined && ` (${section.score}/5)`}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default function QAVendorEvaluationPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const vendorId = params.id as string
  
  // In a real app, fetch vendor data based on vendorId
  const vendor = sampleVendor
  
  // Evaluation state
  const [evaluation, setEvaluation] = React.useState<QAEvaluation>(() => 
    createEmptyQAEvaluation(vendorId)
  )
  const [activeSection, setActiveSection] = React.useState("legitimacy")
  const [showApproveDialog, setShowApproveDialog] = React.useState(false)
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [selectedRejectionReasons, setSelectedRejectionReasons] = React.useState<string[]>([])
  const [rejectionDetails, setRejectionDetails] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)
  
  // Initialize category assessments based on vendor's supply categories
  React.useEffect(() => {
    if (vendor.supplyCategories.length > 0 && evaluation.qualityStandards.categoryAssessments.length === 0) {
      const assessments: CategoryQualityAssessment[] = vendor.supplyCategories.map(cat => ({
        categoryId: cat.id,
        categoryName: cat.name,
        criteria: QUALITY_CRITERIA[cat.id] || QUALITY_CRITERIA.other,
        score: 0,
        notes: "",
      }))
      
      setEvaluation(prev => ({
        ...prev,
        qualityStandards: {
          ...prev.qualityStandards,
          categoryAssessments: assessments,
        },
      }))
    }
  }, [vendor.supplyCategories, evaluation.qualityStandards.categoryAssessments.length])
  
  // Calculate overall score
  const overallScore = React.useMemo(() => {
    const scores = [
      evaluation.companyLegitimacy.legitimacyScore,
      evaluation.businessStandards.businessScore,
      evaluation.compliance.complianceScore,
      evaluation.qualityStandards.overallQualityScore,
    ].filter(s => s > 0)
    
    if (scores.length === 0) return 0
    return Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1))
  }, [evaluation])
  
  // Check section completion
  const sectionStatus = React.useMemo(() => {
    return {
      legitimacy: evaluation.companyLegitimacy.legitimacyScore > 0,
      business: evaluation.businessStandards.businessScore > 0,
      compliance: evaluation.compliance.complianceScore > 0,
      quality: evaluation.qualityStandards.overallQualityScore > 0,
      assessment: evaluation.overallAssessment.finalRemarks.length >= 50,
    }
  }, [evaluation])
  
  const allSectionsComplete = Object.values(sectionStatus).every(Boolean)
  
  // Get recommendation based on score
  const getRecommendation = () => {
    if (overallScore >= 3.0) return "approve"
    return "reject"
  }
  
  // Check for automatic rejection (any section < 2.0)
  const hasAutoReject = React.useMemo(() => {
    const scores = [
      evaluation.companyLegitimacy.legitimacyScore,
      evaluation.businessStandards.businessScore,
      evaluation.compliance.complianceScore,
      evaluation.qualityStandards.overallQualityScore,
    ]
    return scores.some(s => s > 0 && s < 2)
  }, [evaluation])
  
  // Handle save progress
  const handleSaveProgress = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast({
      title: "Progress Saved",
      description: "Your evaluation progress has been saved.",
    })
  }
  
  // Handle approval
  const handleApprove = async () => {
    if (!allSectionsComplete) {
      toast({
        title: "Incomplete Evaluation",
        description: "Please complete all sections before approving.",
        variant: "destructive",
      })
      return
    }
    
    setEvaluation(prev => ({
      ...prev,
      decision: "approved",
      evaluatedBy: "Priya Sharma",
      evaluatedAt: new Date().toISOString(),
      overallAssessment: {
        ...prev.overallAssessment,
        totalScore: overallScore,
        recommendation: "approve",
      },
    }))
    
    setShowApproveDialog(false)
    toast({
      title: "Application Approved",
      description: "The vendor application has been approved and sent back to City Admin.",
    })
    
    setTimeout(() => router.push("/qa/vendor-review"), 1500)
  }
  
  // Handle rejection
  const handleReject = async () => {
    if (selectedRejectionReasons.length === 0) {
      toast({
        title: "Select Rejection Reasons",
        description: "Please select at least one rejection reason.",
        variant: "destructive",
      })
      return
    }
    
    if (rejectionDetails.length < 50) {
      toast({
        title: "Add More Details",
        description: "Please provide at least 50 characters of rejection details.",
        variant: "destructive",
      })
      return
    }
    
    setEvaluation(prev => ({
      ...prev,
      decision: "rejected",
      evaluatedBy: "Priya Sharma",
      evaluatedAt: new Date().toISOString(),
      rejectionReasons: selectedRejectionReasons.map(code => {
        const reason = QA_REJECTION_REASONS.find(r => r.code === code)
        return { code, label: reason?.label || code, details: rejectionDetails }
      }),
      overallAssessment: {
        ...prev.overallAssessment,
        totalScore: overallScore,
        recommendation: "reject",
      },
    }))
    
    setShowRejectDialog(false)
    toast({
      title: "Application Rejected",
      description: "The vendor application has been rejected and sent back to City Admin.",
    })
    
    setTimeout(() => router.push("/qa/vendor-review"), 1500)
  }
  
  // Update quality criteria check
  const updateCriteria = (categoryId: string, criteriaId: string, verified: boolean) => {
    setEvaluation(prev => ({
      ...prev,
      qualityStandards: {
        ...prev.qualityStandards,
        categoryAssessments: prev.qualityStandards.categoryAssessments.map(cat =>
          cat.categoryId === categoryId
            ? {
                ...cat,
                criteria: cat.criteria.map(c =>
                  c.id === criteriaId ? { ...c, verified } : c
                ),
              }
            : cat
        ),
      },
    }))
  }
  
  return (
    <DashboardLayout userRole="quality_assurance_officer">
      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="shrink-0 bg-transparent"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  {vendor.companyInfo.name}
                </h1>
                <Badge 
                  variant="outline" 
                  className={cn(
                    STATUS_CONFIG[vendor.status].bgClass,
                    STATUS_CONFIG[vendor.status].textClass,
                    STATUS_CONFIG[vendor.status].borderClass
                  )}
                >
                  {STATUS_CONFIG[vendor.status].label}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                {vendor.applicationNumber} | {vendor.cityName}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleSaveProgress}
              disabled={isSaving}
            >
              <Save className="size-4 mr-1.5" />
              {isSaving ? "Saving..." : "Save Progress"}
            </Button>
          </div>
        </div>
        
        {/* Progress Card */}
        <Card>
          <CardContent className="p-4">
            <SectionProgress
              sections={[
                { name: "Legitimacy", completed: sectionStatus.legitimacy, score: evaluation.companyLegitimacy.legitimacyScore || undefined },
                { name: "Business", completed: sectionStatus.business, score: evaluation.businessStandards.businessScore || undefined },
                { name: "Compliance", completed: sectionStatus.compliance, score: evaluation.compliance.complianceScore || undefined },
                { name: "Quality", completed: sectionStatus.quality, score: evaluation.qualityStandards.overallQualityScore || undefined },
                { name: "Assessment", completed: sectionStatus.assessment },
              ]}
            />
            
            {/* Overall Score */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "size-12 rounded-full flex items-center justify-center text-lg font-bold",
                  overallScore >= 3 
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : overallScore >= 2
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : overallScore > 0
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-muted text-muted-foreground"
                )}>
                  {overallScore > 0 ? overallScore : "—"}
                </div>
                <div>
                  <p className="font-medium">Overall Score</p>
                  <p className="text-xs text-muted-foreground">
                    {overallScore >= 3 ? "Meets approval threshold (≥3.0)" : overallScore > 0 ? "Below threshold (<3.0)" : "Complete all sections"}
                  </p>
                </div>
              </div>
              
              {hasAutoReject && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="size-3.5" />
                  Auto-reject: Section below 2.0
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Evaluation Form */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="legitimacy" className="text-xs md:text-sm">
                  <Shield className="size-4 md:mr-1.5" />
                  <span className="hidden md:inline">Legitimacy</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="text-xs md:text-sm">
                  <TrendingUp className="size-4 md:mr-1.5" />
                  <span className="hidden md:inline">Business</span>
                </TabsTrigger>
                <TabsTrigger value="compliance" className="text-xs md:text-sm">
                  <FileCheck className="size-4 md:mr-1.5" />
                  <span className="hidden md:inline">Compliance</span>
                </TabsTrigger>
                <TabsTrigger value="quality" className="text-xs md:text-sm">
                  <Target className="size-4 md:mr-1.5" />
                  <span className="hidden md:inline">Quality</span>
                </TabsTrigger>
                <TabsTrigger value="assessment" className="text-xs md:text-sm">
                  <CheckCheck className="size-4 md:mr-1.5" />
                  <span className="hidden md:inline">Final</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Section 1: Company Legitimacy */}
              <TabsContent value="legitimacy" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="size-5 text-primary" />
                      Company Legitimacy Check
                    </CardTitle>
                    <CardDescription>
                      Verify the company's legal status and documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <ChecklistItem
                        id="gstin-verified"
                        label="GSTIN Verified"
                        description={`GSTIN: ${vendor.companyInfo.gstin}`}
                        required
                        checked={evaluation.companyLegitimacy.gstinVerified}
                        onCheckedChange={(checked) => setEvaluation(prev => ({
                          ...prev,
                          companyLegitimacy: { ...prev.companyLegitimacy, gstinVerified: checked }
                        }))}
                      />
                      <ChecklistItem
                        id="pan-verified"
                        label="PAN Verified"
                        description={`PAN: ${vendor.companyInfo.pan}`}
                        required
                        checked={evaluation.companyLegitimacy.panVerified}
                        onCheckedChange={(checked) => setEvaluation(prev => ({
                          ...prev,
                          companyLegitimacy: { ...prev.companyLegitimacy, panVerified: checked }
                        }))}
                      />
                      <ChecklistItem
                        id="company-age"
                        label="Company Age Adequate"
                        description={`Incorporated: ${new Date(vendor.companyInfo.incorporationDate).toLocaleDateString()}`}
                        checked={evaluation.companyLegitimacy.companyAgeAdequate}
                        onCheckedChange={(checked) => setEvaluation(prev => ({
                          ...prev,
                          companyLegitimacy: { ...prev.companyLegitimacy, companyAgeAdequate: checked }
                        }))}
                      />
                      <ChecklistItem
                        id="no-legal-issues"
                        label="No Legal Issues"
                        description="No pending litigation or blacklisting"
                        required
                        checked={evaluation.companyLegitimacy.noLegalIssues}
                        onCheckedChange={(checked) => setEvaluation(prev => ({
                          ...prev,
                          companyLegitimacy: { ...prev.companyLegitimacy, noLegalIssues: checked }
                        }))}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label>Legitimacy Score</Label>
                      <StarRating
                        value={evaluation.companyLegitimacy.legitimacyScore}
                        onChange={(value) => setEvaluation(prev => ({
                          ...prev,
                          companyLegitimacy: { ...prev.companyLegitimacy, legitimacyScore: value }
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="legitimacy-notes">Notes</Label>
                      <Textarea
                        id="legitimacy-notes"
                        placeholder="Add notes about legitimacy verification..."
                        value={evaluation.companyLegitimacy.legitimacyNotes}
                        onChange={(e) => setEvaluation(prev => ({
                          ...prev,
                          companyLegitimacy: { ...prev.companyLegitimacy, legitimacyNotes: e.target.value }
                        }))}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={() => setActiveSection("business")}>
                        Next: Business Standards
                        <ChevronRight className="size-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Section 2: Business Standards */}
              <TabsContent value="business" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="size-5 text-primary" />
                      Business Standards Check
                    </CardTitle>
                    <CardDescription>
                      Evaluate operational capacity and financial stability
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Operational Capacity</Label>
                        <Select
                          value={evaluation.businessStandards.operationalCapacity}
                          onValueChange={(value: 'Low' | 'Medium' | 'High') => setEvaluation(prev => ({
                            ...prev,
                            businessStandards: { ...prev.businessStandards, operationalCapacity: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Financial Stability</Label>
                        <Select
                          value={evaluation.businessStandards.financialStability}
                          onValueChange={(value: 'Weak' | 'Moderate' | 'Strong') => setEvaluation(prev => ({
                            ...prev,
                            businessStandards: { ...prev.businessStandards, financialStability: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Weak">Weak</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Strong">Strong</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <ChecklistItem
                      id="infrastructure"
                      label="Infrastructure Adequate"
                      description="Has proper storage, transportation, and handling facilities"
                      checked={evaluation.businessStandards.infrastructureAdequate}
                      onCheckedChange={(checked) => setEvaluation(prev => ({
                        ...prev,
                        businessStandards: { ...prev.businessStandards, infrastructureAdequate: checked }
                      }))}
                    />
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label>Business Standards Score</Label>
                      <StarRating
                        value={evaluation.businessStandards.businessScore}
                        onChange={(value) => setEvaluation(prev => ({
                          ...prev,
                          businessStandards: { ...prev.businessStandards, businessScore: value }
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="business-notes">Notes</Label>
                      <Textarea
                        id="business-notes"
                        placeholder="Add notes about business standards..."
                        value={evaluation.businessStandards.businessNotes}
                        onChange={(e) => setEvaluation(prev => ({
                          ...prev,
                          businessStandards: { ...prev.businessStandards, businessNotes: e.target.value }
                        }))}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveSection("legitimacy")}>
                        <ArrowLeft className="size-4 mr-1" />
                        Previous
                      </Button>
                      <Button onClick={() => setActiveSection("compliance")}>
                        Next: Compliance
                        <ChevronRight className="size-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Section 3: Compliance */}
              <TabsContent value="compliance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="size-5 text-primary" />
                      Compliance & Documents Check
                    </CardTitle>
                    <CardDescription>
                      Verify certifications and compliance status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ChecklistItem
                      id="gst-compliant"
                      label="GST Compliant"
                      description="Regular GST filing and no outstanding dues"
                      required
                      checked={evaluation.compliance.gstCompliant}
                      onCheckedChange={(checked) => setEvaluation(prev => ({
                        ...prev,
                        compliance: { ...prev.compliance, gstCompliant: checked }
                      }))}
                    />
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Uploaded Documents</Label>
                      <div className="grid gap-2">
                        {vendor.documents.gstCertificate && (
                          <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center gap-3">
                              <FileText className="size-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">GST Certificate</p>
                                <p className="text-xs text-muted-foreground">
                                  {(vendor.documents.gstCertificate.size / 1024).toFixed(0)} KB
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="bg-transparent">
                              <ExternalLink className="size-4" />
                            </Button>
                          </div>
                        )}
                        {vendor.documents.panCard && (
                          <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center gap-3">
                              <FileText className="size-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">PAN Card</p>
                                <p className="text-xs text-muted-foreground">
                                  {(vendor.documents.panCard.size / 1024).toFixed(0)} KB
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="bg-transparent">
                              <ExternalLink className="size-4" />
                            </Button>
                          </div>
                        )}
                        {vendor.documents.qualityCertifications?.map((cert, i) => (
                          <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center gap-3">
                              <FileText className="size-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{cert.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(cert.size / 1024).toFixed(0)} KB
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="bg-transparent">
                              <ExternalLink className="size-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label>Compliance Score</Label>
                      <StarRating
                        value={evaluation.compliance.complianceScore}
                        onChange={(value) => setEvaluation(prev => ({
                          ...prev,
                          compliance: { ...prev.compliance, complianceScore: value }
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="compliance-notes">Notes</Label>
                      <Textarea
                        id="compliance-notes"
                        placeholder="Add notes about compliance..."
                        value={evaluation.compliance.complianceNotes}
                        onChange={(e) => setEvaluation(prev => ({
                          ...prev,
                          compliance: { ...prev.compliance, complianceNotes: e.target.value }
                        }))}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveSection("business")}>
                        <ArrowLeft className="size-4 mr-1" />
                        Previous
                      </Button>
                      <Button onClick={() => setActiveSection("quality")}>
                        Next: Quality Standards
                        <ChevronRight className="size-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Section 4: Quality Standards */}
              <TabsContent value="quality" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="size-5 text-primary" />
                      Quality Standards Check
                    </CardTitle>
                    <CardDescription>
                      Evaluate category-specific quality criteria
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {evaluation.qualityStandards.categoryAssessments.map((category) => (
                      <Collapsible key={category.categoryId} defaultOpen>
                        <Card className="border">
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{category.categoryName}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {category.criteria.filter(c => c.verified).length}/{category.criteria.length} verified
                              </span>
                            </div>
                            <ChevronDown className="size-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-4 pt-0 space-y-3">
                              {category.criteria.map((criterion) => (
                                <ChecklistItem
                                  key={criterion.id}
                                  id={criterion.id}
                                  label={criterion.name}
                                  description={criterion.description}
                                  required={criterion.required}
                                  checked={criterion.verified}
                                  onCheckedChange={(checked) => updateCriteria(category.categoryId, criterion.id, checked)}
                                />
                              ))}
                              
                              <div className="pt-3 space-y-2">
                                <Label>Category Score</Label>
                                <StarRating
                                  value={category.score}
                                  onChange={(value) => setEvaluation(prev => ({
                                    ...prev,
                                    qualityStandards: {
                                      ...prev.qualityStandards,
                                      categoryAssessments: prev.qualityStandards.categoryAssessments.map(cat =>
                                        cat.categoryId === category.categoryId
                                          ? { ...cat, score: value }
                                          : cat
                                      ),
                                    },
                                  }))}
                                />
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    ))}
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label>Overall Quality Score</Label>
                      <StarRating
                        value={evaluation.qualityStandards.overallQualityScore}
                        onChange={(value) => setEvaluation(prev => ({
                          ...prev,
                          qualityStandards: { ...prev.qualityStandards, overallQualityScore: value }
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quality-notes">Notes</Label>
                      <Textarea
                        id="quality-notes"
                        placeholder="Add notes about quality standards..."
                        value={evaluation.qualityStandards.qualityNotes}
                        onChange={(e) => setEvaluation(prev => ({
                          ...prev,
                          qualityStandards: { ...prev.qualityStandards, qualityNotes: e.target.value }
                        }))}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveSection("compliance")}>
                        <ArrowLeft className="size-4 mr-1" />
                        Previous
                      </Button>
                      <Button onClick={() => setActiveSection("assessment")}>
                        Next: Final Assessment
                        <ChevronRight className="size-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Section 5: Overall Assessment */}
              <TabsContent value="assessment" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCheck className="size-5 text-primary" />
                      Overall Assessment
                    </CardTitle>
                    <CardDescription>
                      Summarize findings and make a recommendation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Score Summary */}
                    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                      {[
                        { label: "Legitimacy", score: evaluation.companyLegitimacy.legitimacyScore },
                        { label: "Business", score: evaluation.businessStandards.businessScore },
                        { label: "Compliance", score: evaluation.compliance.complianceScore },
                        { label: "Quality", score: evaluation.qualityStandards.overallQualityScore },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded-lg border bg-muted/30 text-center">
                          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                          <div className="flex items-center justify-center gap-1">
                            <Star className={cn(
                              "size-4",
                              item.score > 0 ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                            )} />
                            <span className="font-bold">{item.score || "—"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Strengths */}
                    <div className="space-y-2">
                      <Label>Strengths</Label>
                      <Textarea
                        placeholder="List key strengths (one per line)..."
                        value={evaluation.overallAssessment.strengths.join("\n")}
                        onChange={(e) => setEvaluation(prev => ({
                          ...prev,
                          overallAssessment: {
                            ...prev.overallAssessment,
                            strengths: e.target.value.split("\n").filter(Boolean),
                          },
                        }))}
                        rows={3}
                      />
                    </div>
                    
                    {/* Weaknesses */}
                    <div className="space-y-2">
                      <Label>Weaknesses</Label>
                      <Textarea
                        placeholder="List key weaknesses (one per line)..."
                        value={evaluation.overallAssessment.weaknesses.join("\n")}
                        onChange={(e) => setEvaluation(prev => ({
                          ...prev,
                          overallAssessment: {
                            ...prev.overallAssessment,
                            weaknesses: e.target.value.split("\n").filter(Boolean),
                          },
                        }))}
                        rows={3}
                      />
                    </div>
                    
                    {/* Risks */}
                    <div className="space-y-2">
                      <Label>Risks</Label>
                      <Textarea
                        placeholder="List potential risks (one per line)..."
                        value={evaluation.overallAssessment.risks.join("\n")}
                        onChange={(e) => setEvaluation(prev => ({
                          ...prev,
                          overallAssessment: {
                            ...prev.overallAssessment,
                            risks: e.target.value.split("\n").filter(Boolean),
                          },
                        }))}
                        rows={3}
                      />
                    </div>
                    
                    {/* Final Remarks */}
                    <div className="space-y-2">
                      <Label htmlFor="final-remarks">
                        Final Remarks <span className="text-muted-foreground text-xs">(min 50 characters)</span>
                      </Label>
                      <Textarea
                        id="final-remarks"
                        placeholder="Provide detailed final remarks and recommendation..."
                        value={evaluation.overallAssessment.finalRemarks}
                        onChange={(e) => setEvaluation(prev => ({
                          ...prev,
                          overallAssessment: {
                            ...prev.overallAssessment,
                            finalRemarks: e.target.value,
                          },
                        }))}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        {evaluation.overallAssessment.finalRemarks.length}/50 characters
                      </p>
                    </div>
                    
                    <Separator />
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <Button variant="outline" onClick={() => setActiveSection("quality")}>
                        <ArrowLeft className="size-4 mr-1" />
                        Previous
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          onClick={() => setShowRejectDialog(true)}
                          disabled={!allSectionsComplete}
                        >
                          <XCircle className="size-4 mr-1.5" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => setShowApproveDialog(true)}
                          disabled={!allSectionsComplete || overallScore < 3 || hasAutoReject}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <CheckCircle2 className="size-4 mr-1.5" />
                          Approve
                        </Button>
                      </div>
                    </div>
                    
                    {!allSectionsComplete && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm">
                        <Info className="size-4 shrink-0" />
                        <p>Complete all evaluation sections before making a decision.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - Vendor Info */}
          <div className="space-y-4">
            {/* Company Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="size-4" />
                  Company Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Legal Name</p>
                  <p className="font-medium">{vendor.companyInfo.legalName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Type</p>
                  <p className="font-medium">{vendor.companyInfo.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">GSTIN</p>
                  <p className="font-mono text-xs">{vendor.companyInfo.gstin}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">PAN</p>
                  <p className="font-mono text-xs">{vendor.companyInfo.pan}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Incorporated</p>
                  <p className="font-medium">{new Date(vendor.companyInfo.incorporationDate).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="size-4" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">{vendor.contactInfo.primaryContact.name}</p>
                  <p className="text-muted-foreground text-xs">{vendor.contactInfo.primaryContact.designation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-muted-foreground" />
                  <span>{vendor.contactInfo.primaryContact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-muted-foreground" />
                  <span className="truncate">{vendor.contactInfo.primaryContact.email}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Classification */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="size-4" />
                  Classification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vendor Type</span>
                  <Badge variant="outline">{vendor.classification?.vendorType || "N/A"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Credit Limit</span>
                  <span className="font-medium">
                    {vendor.classification?.creditLimit 
                      ? `Rs. ${(vendor.classification.creditLimit / 100000).toFixed(1)}L`
                      : "N/A"
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Terms</span>
                  <span className="font-medium">{vendor.classification?.paymentTerms || "N/A"}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Categories */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Supply Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {vendor.supplyCategories.map(cat => (
                    <Badge key={cat.id} variant="secondary" className="text-xs">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-emerald-600" />
              Approve Application
            </DialogTitle>
            <DialogDescription>
              Confirm approval of this vendor application. This will send the application back to City Admin for final processing.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{vendor.companyInfo.name}</span>
                <Badge className="bg-emerald-50 text-emerald-700 border-0">Score: {overallScore}/5</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {vendor.applicationNumber}
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>By approving, you confirm that:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>All verification checks have been completed</li>
                <li>The vendor meets quality standards</li>
                <li>Documentation is in order</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle2 className="size-4 mr-1.5" />
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="size-5 text-destructive" />
              Reject Application
            </DialogTitle>
            <DialogDescription>
              Select rejection reasons and provide details. This will send the application back to City Admin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Rejection Reasons</Label>
              <div className="mt-2 space-y-2">
                {QA_REJECTION_REASONS.map((reason) => (
                  <div key={reason.code} className="flex items-center gap-2">
                    <Checkbox
                      id={reason.code}
                      checked={selectedRejectionReasons.includes(reason.code)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRejectionReasons(prev => [...prev, reason.code])
                        } else {
                          setSelectedRejectionReasons(prev => prev.filter(c => c !== reason.code))
                        }
                      }}
                    />
                    <Label htmlFor={reason.code} className="text-sm cursor-pointer">
                      {reason.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rejection-details">
                Detailed Remarks <span className="text-muted-foreground text-xs">(min 50 characters)</span>
              </Label>
              <Textarea
                id="rejection-details"
                placeholder="Provide detailed reasons for rejection..."
                value={rejectionDetails}
                onChange={(e) => setRejectionDetails(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                {rejectionDetails.length}/50 characters
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={selectedRejectionReasons.length === 0 || rejectionDetails.length < 50}
            >
              <XCircle className="size-4 mr-1.5" />
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
