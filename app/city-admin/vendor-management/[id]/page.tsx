"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  User,
  CreditCard,
  Package,
  History,
  Send,
  Ban,
  Loader2,
  ExternalLink,
} from "lucide-react"
import {
  type VendorApplication,
  type VendorApplicationStatus,
  type WorkflowEvent,
  SUPPLY_CATEGORIES,
  STATUS_CONFIG,
  CITY_REJECTION_REASONS,
  PAYMENT_TERMS,
} from "@/lib/vendor-types"

// Sample application data (in real app, fetch by ID)
const sampleApplication: VendorApplication = {
  id: "1",
  applicationNumber: "VND-HYD-2026-0023",
  companyInfo: {
    name: "ABC Steel Suppliers",
    legalName: "ABC Steel Suppliers Pvt Ltd",
    type: "Private Limited",
    gstin: "36AABCU9603R1ZM",
    pan: "AABCU9603R",
    incorporationDate: "2015-06-15",
    registeredAddress: {
      line1: "Plot No. 45, Industrial Area",
      line2: "Phase 2, Jeedimetla",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500055",
      landmark: "Near IDPL Colony",
    },
    operationalAddress: {
      line1: "Warehouse No. 12",
      line2: "Steel Market, Musheerabad",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500020",
    },
  },
  contactInfo: {
    primaryContact: {
      name: "Rajesh Kumar",
      designation: "Managing Director",
      phone: "9876543210",
      email: "rajesh@abcsteel.com",
      whatsapp: "9876543210",
    },
    alternateContact: {
      name: "Sunil Mehta",
      phone: "9876543211",
      email: "sunil@abcsteel.com",
    },
  },
  supplyCategories: [
    { id: "steel", name: "Iron / Steel", code: "STL", selectedSubcategories: ["TMT Bars", "Structural Steel", "Binding Wire"] },
    { id: "cement", name: "Cement", code: "CEM", selectedSubcategories: ["OPC", "PPC"] },
  ],
  bankDetails: {
    accountName: "ABC Steel Suppliers Pvt Ltd",
    accountNumber: "1234567890123456",
    bankName: "HDFC Bank",
    branchName: "Begumpet Branch",
    ifscCode: "HDFC0001234",
    accountType: "Current",
  },
  documents: {
    gstCertificate: { id: "1", name: "GST_Certificate.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20T10:00:00Z", size: 256000 },
    panCard: { id: "2", name: "PAN_Card.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20T10:05:00Z", size: 128000 },
    incorporationCertificate: { id: "3", name: "Incorporation_Certificate.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20T10:10:00Z", size: 512000 },
    bankStatement: { id: "4", name: "Bank_Statement_Dec2025.pdf", url: "#", type: "pdf", uploadedAt: "2026-01-20T10:15:00Z", size: 384000 },
  },
  cityId: "hyd",
  cityName: "Hyderabad",
  status: "city_review",
  workflowHistory: [
    { 
      id: "1", 
      status: "draft", 
      action: "Application Created", 
      performedBy: "Vendor", 
      performedByRole: "Vendor", 
      timestamp: "2026-01-27T09:00:00Z" 
    },
    { 
      id: "2", 
      status: "submitted", 
      action: "Application Submitted", 
      performedBy: "Vendor", 
      performedByRole: "Vendor", 
      timestamp: "2026-01-28T10:30:00Z" 
    },
    { 
      id: "3", 
      status: "city_review", 
      action: "Assigned to City Admin", 
      performedBy: "System", 
      performedByRole: "System", 
      timestamp: "2026-01-28T10:31:00Z" 
    },
  ],
  createdAt: "2026-01-27T09:00:00Z",
  updatedAt: "2026-01-28T10:31:00Z",
  submittedAt: "2026-01-28T10:30:00Z",
}

// Sample QA approved application
const qaApprovedApplication: VendorApplication = {
  ...sampleApplication,
  id: "2",
  applicationNumber: "VND-HYD-2026-0022",
  companyInfo: {
    ...sampleApplication.companyInfo,
    name: "Sri Lakshmi Electricals",
    legalName: "Sri Lakshmi Electricals",
    type: "Proprietorship",
  },
  status: "qa_approved",
  workflowHistory: [
    ...sampleApplication.workflowHistory,
    { 
      id: "4", 
      status: "qa_review", 
      action: "Forwarded to QA", 
      performedBy: "Amit Singh", 
      performedByRole: "City Admin", 
      remarks: "Documents complete, forwarding for quality assessment",
      timestamp: "2026-01-26T11:00:00Z" 
    },
    { 
      id: "5", 
      status: "qa_approved", 
      action: "QA Approved", 
      performedBy: "Priya Sharma", 
      performedByRole: "QA Team", 
      remarks: "All quality parameters met. Product samples verified.",
      timestamp: "2026-01-27T16:00:00Z" 
    },
  ],
}

// Sample QA rejected application
const qaRejectedApplication: VendorApplication = {
  ...sampleApplication,
  id: "3",
  applicationNumber: "VND-HYD-2026-0021",
  companyInfo: {
    ...sampleApplication.companyInfo,
    name: "Narmada Cement Traders",
    legalName: "Narmada Cement Traders LLP",
    type: "LLP",
  },
  status: "qa_rejected",
  workflowHistory: [
    ...sampleApplication.workflowHistory,
    { 
      id: "4", 
      status: "qa_review", 
      action: "Forwarded to QA", 
      performedBy: "Amit Singh", 
      performedByRole: "City Admin", 
      timestamp: "2026-01-23T10:00:00Z" 
    },
    { 
      id: "5", 
      status: "qa_rejected", 
      action: "QA Rejected", 
      performedBy: "Priya Sharma", 
      performedByRole: "QA Team", 
      remarks: "GST certificate is expired. Product quality certification missing.",
      timestamp: "2026-01-24T15:00:00Z" 
    },
  ],
}

// Helper functions
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getStatusIcon(status: VendorApplicationStatus) {
  switch (status) {
    case "submitted":
    case "city_review":
    case "qa_review":
    case "city_post_qa_review":
    case "pending_super_admin":
      return <Clock className="size-4" />
    case "qa_approved":
    case "super_admin_approved":
    case "onboarded":
      return <CheckCircle2 className="size-4" />
    case "city_rejected":
    case "qa_rejected":
    case "super_admin_rejected":
      return <XCircle className="size-4" />
    default:
      return <AlertCircle className="size-4" />
  }
}

function getStatusBadge(status: VendorApplicationStatus) {
  const config = STATUS_CONFIG[status]
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-xs font-medium border",
        config.bgClass,
        config.textClass,
        config.borderClass
      )}
    >
      {config.label}
    </Badge>
  )
}

function getReviewType(status: VendorApplicationStatus): 'initial' | 'post_qa' | 'none' {
  if (status === 'city_review' || status === 'submitted') return 'initial'
  if (status === 'qa_approved' || status === 'qa_rejected') return 'post_qa'
  return 'none'
}

export default function VendorApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const applicationId = params.id as string

  // In real app, fetch by ID - for demo, show different states based on ID
  const [application, setApplication] = React.useState<VendorApplication>(() => {
    if (applicationId === "2") return qaApprovedApplication
    if (applicationId === "3") return qaRejectedApplication
    return sampleApplication
  })

  const reviewType = getReviewType(application.status)

  // Review checklist state
  const [checklist, setChecklist] = React.useState({
    companyInfoComplete: false,
    documentsComplete: false,
    categoryRelevant: false,
    bankDetailsVerified: false,
  })

  // Classification state
  const [classification, setClassification] = React.useState({
    vendorType: "" as "" | "Fixed" | "Temporary",
    creditLimit: "",
    paymentTerms: "" as "" | "7 Days" | "15 Days" | "30 Days" | "45 Days",
  })

  // Post-QA review state
  const [postQAReview, setPostQAReview] = React.useState({
    qaDecisionAcknowledged: false,
    finalRecommendation: "" as "" | "approve" | "reject",
    recommendationNotes: "",
  })

  // Modal states
  const [showRejectModal, setShowRejectModal] = React.useState(false)
  const [showForwardQAModal, setShowForwardQAModal] = React.useState(false)
  const [showForwardSuperAdminModal, setShowForwardSuperAdminModal] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Rejection form state
  const [rejectionReason, setRejectionReason] = React.useState("")
  const [rejectionNotes, setRejectionNotes] = React.useState("")

  // Forward notes
  const [forwardNotes, setForwardNotes] = React.useState("")

  const isChecklistComplete = Object.values(checklist).every(Boolean)
  const isClassificationComplete = classification.vendorType !== "" && classification.paymentTerms !== ""

  // Handlers
  const handleReject = async () => {
    if (!rejectionReason) {
      toast({ title: "Error", description: "Please select a rejection reason", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newEvent: WorkflowEvent = {
      id: String(application.workflowHistory.length + 1),
      status: "city_rejected",
      action: "Application Rejected by City Admin",
      performedBy: "Amit Singh",
      performedByRole: "City Admin",
      remarks: `Reason: ${CITY_REJECTION_REASONS.find(r => r.code === rejectionReason)?.label}${rejectionNotes ? `. Notes: ${rejectionNotes}` : ""}`,
      timestamp: new Date().toISOString(),
    }

    setApplication(prev => ({
      ...prev,
      status: "city_rejected",
      workflowHistory: [...prev.workflowHistory, newEvent],
    }))

    setIsSubmitting(false)
    setShowRejectModal(false)
    toast({ title: "Application Rejected", description: "The vendor has been notified." })
  }

  const handleForwardToQA = async () => {
    if (!isChecklistComplete) {
      toast({ title: "Error", description: "Please complete the review checklist", variant: "destructive" })
      return
    }
    if (!isClassificationComplete) {
      toast({ title: "Error", description: "Please complete vendor classification", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newEvent: WorkflowEvent = {
      id: String(application.workflowHistory.length + 1),
      status: "qa_review",
      action: "Forwarded to QA Team",
      performedBy: "Amit Singh",
      performedByRole: "City Admin",
      remarks: forwardNotes || `Vendor Type: ${classification.vendorType}, Payment Terms: ${classification.paymentTerms}`,
      timestamp: new Date().toISOString(),
    }

    setApplication(prev => ({
      ...prev,
      status: "qa_review",
      classification: {
        vendorType: classification.vendorType as "Fixed" | "Temporary",
        creditLimit: classification.creditLimit ? Number(classification.creditLimit) : undefined,
        paymentTerms: classification.paymentTerms as string,
      },
      workflowHistory: [...prev.workflowHistory, newEvent],
    }))

    setIsSubmitting(false)
    setShowForwardQAModal(false)
    toast({ title: "Forwarded to QA", description: "Application has been sent to QA team for review." })
  }

  const handleForwardToSuperAdmin = async () => {
    if (!postQAReview.qaDecisionAcknowledged) {
      toast({ title: "Error", description: "Please acknowledge the QA decision", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newEvent: WorkflowEvent = {
      id: String(application.workflowHistory.length + 1),
      status: "pending_super_admin",
      action: "Forwarded to Super Admin",
      performedBy: "Amit Singh",
      performedByRole: "City Admin",
      remarks: postQAReview.recommendationNotes || "Recommended for approval",
      timestamp: new Date().toISOString(),
    }

    setApplication(prev => ({
      ...prev,
      status: "pending_super_admin",
      workflowHistory: [...prev.workflowHistory, newEvent],
    }))

    setIsSubmitting(false)
    setShowForwardSuperAdminModal(false)
    toast({ title: "Forwarded to Super Admin", description: "Application has been sent for final approval." })
  }

  const handleFinalizeRejection = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newEvent: WorkflowEvent = {
      id: String(application.workflowHistory.length + 1),
      status: "city_rejected",
      action: "Rejection Finalized by City Admin",
      performedBy: "Amit Singh",
      performedByRole: "City Admin",
      remarks: "QA rejection finalized. Vendor notified.",
      timestamp: new Date().toISOString(),
    }

    setApplication(prev => ({
      ...prev,
      status: "city_rejected",
      workflowHistory: [...prev.workflowHistory, newEvent],
    }))

    setIsSubmitting(false)
    toast({ title: "Rejection Finalized", description: "The vendor has been notified of the rejection." })
  }

  return (
    <DashboardLayout userRole="city_admin">
      <div className="flex flex-col gap-6 p-4 md:p-6 pb-24 md:pb-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="w-fit bg-transparent"
          >
            <ArrowLeft className="size-4 mr-1.5" />
            Back to Applications
          </Button>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="size-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{application.companyInfo.name}</h1>
                <p className="text-sm text-muted-foreground font-mono">{application.applicationNumber}</p>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(application.status)}
                  {reviewType === 'initial' && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 text-xs">
                      Initial Review Required
                    </Badge>
                  )}
                  {reviewType === 'post_qa' && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 text-xs">
                      Post-QA Review Required
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {reviewType !== 'none' && (
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                  onClick={() => setShowRejectModal(true)}
                >
                  <Ban className="size-4 mr-1.5" />
                  Reject
                </Button>
                {reviewType === 'initial' && (
                  <Button 
                    size="sm"
                    onClick={() => setShowForwardQAModal(true)}
                    disabled={!isChecklistComplete || !isClassificationComplete}
                  >
                    <Send className="size-4 mr-1.5" />
                    Forward to QA
                  </Button>
                )}
                {reviewType === 'post_qa' && application.status === 'qa_approved' && (
                  <Button 
                    size="sm"
                    onClick={() => setShowForwardSuperAdminModal(true)}
                    disabled={!postQAReview.qaDecisionAcknowledged}
                  >
                    <Send className="size-4 mr-1.5" />
                    Forward to Super Admin
                  </Button>
                )}
                {reviewType === 'post_qa' && application.status === 'qa_rejected' && (
                  <Button 
                    size="sm"
                    variant="destructive"
                    onClick={handleFinalizeRejection}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="size-4 mr-1.5 animate-spin" /> : <XCircle className="size-4 mr-1.5" />}
                    Finalize Rejection
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Application Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Tabs defaultValue="company" className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="bank">Bank</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Company Info Tab */}
              <TabsContent value="company" className="mt-4 space-y-4">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Legal Name</Label>
                        <p className="text-sm font-medium text-foreground">{application.companyInfo.legalName}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Company Type</Label>
                        <p className="text-sm font-medium text-foreground">{application.companyInfo.type}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">GSTIN</Label>
                        <p className="text-sm font-medium font-mono text-foreground">{application.companyInfo.gstin}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">PAN</Label>
                        <p className="text-sm font-medium font-mono text-foreground">{application.companyInfo.pan}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Incorporation Date</Label>
                        <p className="text-sm font-medium text-foreground">{formatDate(application.companyInfo.incorporationDate)}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="size-3" />
                        Registered Address
                      </Label>
                      <p className="text-sm text-foreground">
                        {application.companyInfo.registeredAddress.line1}
                        {application.companyInfo.registeredAddress.line2 && <><br />{application.companyInfo.registeredAddress.line2}</>}
                        <br />
                        {application.companyInfo.registeredAddress.city}, {application.companyInfo.registeredAddress.state} - {application.companyInfo.registeredAddress.pincode}
                        {application.companyInfo.registeredAddress.landmark && <><br />Landmark: {application.companyInfo.registeredAddress.landmark}</>}
                      </p>
                    </div>

                    {application.companyInfo.operationalAddress && (
                      <div>
                        <Label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <MapPin className="size-3" />
                          Operational Address
                        </Label>
                        <p className="text-sm text-foreground">
                          {application.companyInfo.operationalAddress.line1}
                          {application.companyInfo.operationalAddress.line2 && <><br />{application.companyInfo.operationalAddress.line2}</>}
                          <br />
                          {application.companyInfo.operationalAddress.city}, {application.companyInfo.operationalAddress.state} - {application.companyInfo.operationalAddress.pincode}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/30 dark:bg-muted/10">
                      <p className="text-xs text-muted-foreground mb-1">Primary Contact</p>
                      <p className="font-medium text-foreground">{application.contactInfo.primaryContact.name}</p>
                      <p className="text-sm text-muted-foreground">{application.contactInfo.primaryContact.designation}</p>
                      <div className="flex flex-wrap gap-4 mt-3">
                        <a href={`tel:${application.contactInfo.primaryContact.phone}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                          <Phone className="size-3.5" />
                          {application.contactInfo.primaryContact.phone}
                        </a>
                        <a href={`mailto:${application.contactInfo.primaryContact.email}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                          <Mail className="size-3.5" />
                          {application.contactInfo.primaryContact.email}
                        </a>
                      </div>
                    </div>

                    {application.contactInfo.alternateContact && (
                      <div className="p-4 rounded-lg bg-muted/30 dark:bg-muted/10">
                        <p className="text-xs text-muted-foreground mb-1">Alternate Contact</p>
                        <p className="font-medium text-foreground">{application.contactInfo.alternateContact.name}</p>
                        <div className="flex flex-wrap gap-4 mt-3">
                          <a href={`tel:${application.contactInfo.alternateContact.phone}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                            <Phone className="size-3.5" />
                            {application.contactInfo.alternateContact.phone}
                          </a>
                          <a href={`mailto:${application.contactInfo.alternateContact.email}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                            <Mail className="size-3.5" />
                            {application.contactInfo.alternateContact.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Supply Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {application.supplyCategories.map(cat => (
                        <div key={cat.id} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="font-medium text-sm text-foreground">{cat.name}</p>
                          {cat.selectedSubcategories && cat.selectedSubcategories.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {cat.selectedSubcategories.map(sub => (
                                <Badge key={sub} variant="secondary" className="text-xs">{sub}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-4">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Uploaded Documents</CardTitle>
                    <CardDescription>Review all submitted documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(application.documents).map(([key, doc]) => {
                        if (!doc) return null
                        const docLabel = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())
                        return (
                          <div 
                            key={key} 
                            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                          >
                            <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                              <FileText className="size-5 text-red-600 dark:text-red-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{docLabel}</p>
                              <p className="text-xs text-muted-foreground">
                                {Array.isArray(doc) ? `${doc.length} files` : formatFileSize(doc.size)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="size-8 bg-transparent">
                                <Eye className="size-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="size-8 bg-transparent">
                                <Download className="size-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bank Details Tab */}
              <TabsContent value="bank" className="mt-4">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="size-5" />
                      Bank Account Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Account Name</Label>
                        <p className="text-sm font-medium text-foreground">{application.bankDetails.accountName}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Account Number</Label>
                        <p className="text-sm font-medium font-mono text-foreground">{application.bankDetails.accountNumber}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Bank Name</Label>
                        <p className="text-sm font-medium text-foreground">{application.bankDetails.bankName}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Branch</Label>
                        <p className="text-sm font-medium text-foreground">{application.bankDetails.branchName}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">IFSC Code</Label>
                        <p className="text-sm font-medium font-mono text-foreground">{application.bankDetails.ifscCode}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Account Type</Label>
                        <p className="text-sm font-medium text-foreground">{application.bankDetails.accountType}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="mt-4">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <History className="size-5" />
                      Workflow History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                      
                      <div className="space-y-6">
                        {[...application.workflowHistory].reverse().map((event, index) => (
                          <div key={event.id} className="relative flex gap-4 pl-10">
                            {/* Timeline dot */}
                            <div className={cn(
                              "absolute left-2 size-5 rounded-full border-2 border-background flex items-center justify-center",
                              index === 0 ? "bg-primary" : "bg-muted"
                            )}>
                              <div className={cn(
                                "size-2 rounded-full",
                                index === 0 ? "bg-primary-foreground" : "bg-muted-foreground"
                              )} />
                            </div>
                            
                            <div className="flex-1 pb-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                                <p className="font-medium text-sm text-foreground">{event.action}</p>
                                <p className="text-xs text-muted-foreground">{formatDateTime(event.timestamp)}</p>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                By {event.performedBy} ({event.performedByRole})
                              </p>
                              {event.remarks && (
                                <p className="text-sm text-foreground mt-2 p-2 bg-muted/30 dark:bg-muted/10 rounded-md">
                                  {event.remarks}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Review Panel */}
          <div className="space-y-6">
            {/* Initial Review - Checklist & Classification */}
            {reviewType === 'initial' && (
              <>
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Review Checklist</CardTitle>
                    <CardDescription>Verify all requirements before forwarding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="companyInfo" 
                          checked={checklist.companyInfoComplete}
                          onCheckedChange={(c) => setChecklist(prev => ({ ...prev, companyInfoComplete: c === true }))}
                        />
                        <div className="grid gap-1">
                          <Label htmlFor="companyInfo" className="text-sm font-medium cursor-pointer">Company Information Complete</Label>
                          <p className="text-xs text-muted-foreground">All company details and addresses verified</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="documents" 
                          checked={checklist.documentsComplete}
                          onCheckedChange={(c) => setChecklist(prev => ({ ...prev, documentsComplete: c === true }))}
                        />
                        <div className="grid gap-1">
                          <Label htmlFor="documents" className="text-sm font-medium cursor-pointer">Documents Complete</Label>
                          <p className="text-xs text-muted-foreground">All required documents uploaded and valid</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="category" 
                          checked={checklist.categoryRelevant}
                          onCheckedChange={(c) => setChecklist(prev => ({ ...prev, categoryRelevant: c === true }))}
                        />
                        <div className="grid gap-1">
                          <Label htmlFor="category" className="text-sm font-medium cursor-pointer">Category Relevant</Label>
                          <p className="text-xs text-muted-foreground">Supply categories needed in this city</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="bank" 
                          checked={checklist.bankDetailsVerified}
                          onCheckedChange={(c) => setChecklist(prev => ({ ...prev, bankDetailsVerified: c === true }))}
                        />
                        <div className="grid gap-1">
                          <Label htmlFor="bank" className="text-sm font-medium cursor-pointer">Bank Details Verified</Label>
                          <p className="text-xs text-muted-foreground">Bank account information confirmed</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "size-5 rounded-full flex items-center justify-center",
                          isChecklistComplete ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"
                        )}>
                          {isChecklistComplete ? (
                            <CheckCircle2 className="size-3 text-green-600 dark:text-green-400" />
                          ) : (
                            <AlertCircle className="size-3 text-amber-600 dark:text-amber-400" />
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Object.values(checklist).filter(Boolean).length}/4 items verified
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Vendor Classification</CardTitle>
                    <CardDescription>Set vendor type and payment terms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Vendor Type *</Label>
                      <RadioGroup 
                        value={classification.vendorType} 
                        onValueChange={(v) => setClassification(prev => ({ ...prev, vendorType: v as "Fixed" | "Temporary" }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Fixed" id="fixed" />
                          <Label htmlFor="fixed" className="cursor-pointer">Fixed Vendor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Temporary" id="temporary" />
                          <Label htmlFor="temporary" className="cursor-pointer">Temporary Vendor</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Credit Limit (Optional)</Label>
                      <Input 
                        type="number"
                        placeholder="Enter amount in INR"
                        value={classification.creditLimit}
                        onChange={(e) => setClassification(prev => ({ ...prev, creditLimit: e.target.value }))}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Payment Terms *</Label>
                      <Select 
                        value={classification.paymentTerms} 
                        onValueChange={(v) => setClassification(prev => ({ ...prev, paymentTerms: v as typeof classification.paymentTerms }))}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          {PAYMENT_TERMS.map(term => (
                            <SelectItem key={term.value} value={term.value}>{term.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Post-QA Review Panel */}
            {reviewType === 'post_qa' && (
              <Card className={cn(
                "bg-card border-2",
                application.status === 'qa_approved' ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"
              )}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {application.status === 'qa_approved' ? (
                      <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="size-5 text-red-600 dark:text-red-400" />
                    )}
                    QA Decision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={cn(
                    "p-4 rounded-lg",
                    application.status === 'qa_approved' 
                      ? "bg-green-50 dark:bg-green-900/20" 
                      : "bg-red-50 dark:bg-red-900/20"
                  )}>
                    <p className={cn(
                      "font-medium",
                      application.status === 'qa_approved' 
                        ? "text-green-700 dark:text-green-400" 
                        : "text-red-700 dark:text-red-400"
                    )}>
                      {application.status === 'qa_approved' ? 'Application Approved by QA' : 'Application Rejected by QA'}
                    </p>
                    {application.workflowHistory.find(e => e.status === application.status)?.remarks && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {application.workflowHistory.find(e => e.status === application.status)?.remarks}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox 
                      id="ackQA" 
                      checked={postQAReview.qaDecisionAcknowledged}
                      onCheckedChange={(c) => setPostQAReview(prev => ({ ...prev, qaDecisionAcknowledged: c === true }))}
                    />
                    <div className="grid gap-1">
                      <Label htmlFor="ackQA" className="text-sm font-medium cursor-pointer">
                        I have reviewed the QA decision
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {application.status === 'qa_approved' 
                          ? 'Acknowledge before forwarding to Super Admin'
                          : 'Acknowledge before finalizing rejection'}
                      </p>
                    </div>
                  </div>

                  {application.status === 'qa_approved' && postQAReview.qaDecisionAcknowledged && (
                    <div className="space-y-2 pt-2">
                      <Label className="text-sm">Recommendation Notes (Optional)</Label>
                      <Textarea 
                        placeholder="Add any notes for the Super Admin..."
                        value={postQAReview.recommendationNotes}
                        onChange={(e) => setPostQAReview(prev => ({ ...prev, recommendationNotes: e.target.value }))}
                        rows={3}
                        className="bg-background"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Classification Display (if already set) */}
            {application.classification && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">Vendor Classification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Vendor Type</span>
                    <Badge variant="secondary">{application.classification.vendorType}</Badge>
                  </div>
                  {application.classification.creditLimit && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Credit Limit</span>
                      <span className="text-sm font-medium">₹{application.classification.creditLimit.toLocaleString()}</span>
                    </div>
                  )}
                  {application.classification.paymentTerms && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payment Terms</span>
                      <span className="text-sm font-medium">{application.classification.paymentTerms}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Select a reason for rejecting this vendor application. The vendor will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rejection Reason *</Label>
              <Select value={rejectionReason} onValueChange={setRejectionReason}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {CITY_REJECTION_REASONS.map(reason => (
                    <SelectItem key={reason.code} value={reason.code}>{reason.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Additional Notes {rejectionReason === 'OTHER' && '*'}</Label>
              <Textarea 
                placeholder="Provide additional details..."
                value={rejectionNotes}
                onChange={(e) => setRejectionNotes(e.target.value)}
                rows={3}
                className="bg-background"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectModal(false)} className="bg-transparent">Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={isSubmitting || !rejectionReason || (rejectionReason === 'OTHER' && !rejectionNotes)}
            >
              {isSubmitting ? <Loader2 className="size-4 mr-1.5 animate-spin" /> : <XCircle className="size-4 mr-1.5" />}
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Forward to QA Modal */}
      <Dialog open={showForwardQAModal} onOpenChange={setShowForwardQAModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Forward to QA Team</DialogTitle>
            <DialogDescription>
              The application will be sent to the QA team for quality assessment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm font-medium mb-2">Classification Summary</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vendor Type:</span>
                  <span>{classification.vendorType || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Terms:</span>
                  <span>{classification.paymentTerms || '-'}</span>
                </div>
                {classification.creditLimit && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Limit:</span>
                    <span>₹{Number(classification.creditLimit).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes for QA Team (Optional)</Label>
              <Textarea 
                placeholder="Add any notes for the QA team..."
                value={forwardNotes}
                onChange={(e) => setForwardNotes(e.target.value)}
                rows={3}
                className="bg-background"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForwardQAModal(false)} className="bg-transparent">Cancel</Button>
            <Button onClick={handleForwardToQA} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="size-4 mr-1.5 animate-spin" /> : <Send className="size-4 mr-1.5" />}
              Forward to QA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Forward to Super Admin Modal */}
      <Dialog open={showForwardSuperAdminModal} onOpenChange={setShowForwardSuperAdminModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Forward to Super Admin</DialogTitle>
            <DialogDescription>
              The application will be sent for final approval by the Super Admin.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
                <p className="text-sm font-medium text-green-700 dark:text-green-400">QA Approved</p>
              </div>
              <p className="text-xs text-muted-foreground">
                This application has been approved by the QA team and is ready for final approval.
              </p>
            </div>
            {postQAReview.recommendationNotes && (
              <div className="space-y-2">
                <Label className="text-sm">Your Notes</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                  {postQAReview.recommendationNotes}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForwardSuperAdminModal(false)} className="bg-transparent">Cancel</Button>
            <Button onClick={handleForwardToSuperAdmin} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="size-4 mr-1.5 animate-spin" /> : <Send className="size-4 mr-1.5" />}
              Forward to Super Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
