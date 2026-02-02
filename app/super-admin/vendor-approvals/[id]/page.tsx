"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  FileText,
  CreditCard,
  Calendar,
  Shield,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  TrendingUp,
  Banknote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { calculateRiskLevel, generateVendorCode, SUPER_ADMIN_REJECTION_REASONS } from "@/lib/vendor-types"

// Sample vendor data for detail view
const sampleVendorDetail = {
  id: "VND-HYD-2026-0001",
  
  // Company Info
  companyInfo: {
    name: "ABC Steel Suppliers Pvt Ltd",
    legalName: "ABC Steel Suppliers Private Limited",
    type: "Private Limited",
    gstin: "36AABCA1234A1Z5",
    pan: "AABCA1234A",
    incorporationDate: "2018-03-15",
    registeredAddress: {
      line1: "Plot No. 45, Industrial Area",
      line2: "Jeedimetla",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500055",
    },
  },
  
  // Contact Info
  contactInfo: {
    primaryContact: {
      name: "Rajesh Kumar",
      designation: "Managing Director",
      phone: "+91 98765 43210",
      email: "rajesh@abcsteel.com",
    },
  },
  
  // Categories
  categories: ["Iron / Steel", "Aggregates"],
  
  // Bank Details
  bankDetails: {
    accountName: "ABC Steel Suppliers Pvt Ltd",
    accountNumber: "1234567890123456",
    bankName: "HDFC Bank",
    branchName: "Begumpet Branch",
    ifscCode: "HDFC0001234",
    accountType: "Current",
  },
  
  // Classification
  classification: {
    vendorType: "Fixed" as const,
    creditLimit: 500000,
    paymentTerms: "30 Days",
  },
  
  // City Info
  cityName: "Hyderabad",
  cityCode: "HYD",
  
  // Executive Summary
  executiveSummary: {
    qaScore: 4.2,
    riskLevel: "Low" as const,
    daysInProcess: 5,
  },
  
  // Review Chain
  reviewChain: {
    cityAdmin: {
      reviewerName: "Priya Sharma",
      reviewDate: "2026-01-27",
      decision: "forwarded" as const,
      remarks: "Complete documentation verified. Vendor has good market reputation in steel supply. Recommending for QA review.",
    },
    qa: {
      reviewerName: "Suresh Reddy",
      reviewDate: "2026-01-28",
      decision: "approved" as const,
      scores: {
        legitimacy: 4.5,
        business: 4.0,
        compliance: 4.2,
        quality: 4.1,
      },
      recommendations: [
        "Strong financial standing with 6+ years in operation",
        "BIS certified products with proper documentation",
        "Good storage infrastructure preventing rust",
        "Recommend as preferred supplier for steel requirements",
      ],
    },
    cityAdminPostQA: {
      reviewerName: "Priya Sharma",
      reviewDate: "2026-01-29",
      decision: "forwarded_to_super_admin" as const,
      remarks: "QA evaluation positive. Vendor classified as Fixed type with 30-day payment terms. Forwarding for final approval.",
    },
  },
  
  // Workflow Timeline
  workflowHistory: [
    {
      id: "1",
      status: "submitted",
      action: "Application Submitted",
      performedBy: "Vendor",
      performedByRole: "Vendor",
      timestamp: "2026-01-26T10:30:00Z",
    },
    {
      id: "2",
      status: "city_review",
      action: "Assigned to City Admin",
      performedBy: "System",
      performedByRole: "System",
      timestamp: "2026-01-26T10:31:00Z",
    },
    {
      id: "3",
      status: "qa_review",
      action: "Forwarded to QA",
      performedBy: "Priya Sharma",
      performedByRole: "City Admin",
      remarks: "Complete documentation verified. Vendor has good market reputation.",
      timestamp: "2026-01-27T14:20:00Z",
    },
    {
      id: "4",
      status: "qa_approved",
      action: "QA Approved",
      performedBy: "Suresh Reddy",
      performedByRole: "QA Officer",
      remarks: "All quality criteria met. Score: 4.2/5",
      timestamp: "2026-01-28T16:45:00Z",
    },
    {
      id: "5",
      status: "city_post_qa_review",
      action: "Post-QA Review",
      performedBy: "Priya Sharma",
      performedByRole: "City Admin",
      timestamp: "2026-01-29T09:15:00Z",
    },
    {
      id: "6",
      status: "pending_super_admin",
      action: "Forwarded to Super Admin",
      performedBy: "Priya Sharma",
      performedByRole: "City Admin",
      remarks: "QA evaluation positive. Recommending for final approval.",
      timestamp: "2026-01-29T11:30:00Z",
    },
  ],
}

export default function SuperAdminVendorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vendorId = params.id as string
  
  const [activeTab, setActiveTab] = React.useState("summary")
  const [showApproveDialog, setShowApproveDialog] = React.useState(false)
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [approvalRemarks, setApprovalRemarks] = React.useState("")
  const [rejectionReasons, setRejectionReasons] = React.useState<string[]>([])
  const [rejectionRemarks, setRejectionRemarks] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [expandedSections, setExpandedSections] = React.useState({
    cityAdmin: true,
    qa: true,
    cityAdminPostQA: true,
  })

  const vendor = sampleVendorDetail
  const riskLevel = calculateRiskLevel(vendor.executiveSummary.qaScore)

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Handle approval
  const handleApprove = async () => {
    if (approvalRemarks.length < 20) {
      toast.error("Please provide remarks (minimum 20 characters)")
      return
    }
    
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const vendorCode = generateVendorCode(
      vendor.cityCode,
      vendor.classification.vendorType,
      1 // Would be dynamic from backend
    )
    
    toast.success(`Vendor approved! Code: ${vendorCode}`)
    setShowApproveDialog(false)
    setIsProcessing(false)
    router.push("/super-admin/vendor-approvals")
  }

  // Handle rejection
  const handleReject = async () => {
    if (rejectionReasons.length === 0) {
      toast.error("Please select at least one rejection reason")
      return
    }
    if (rejectionRemarks.length < 20) {
      toast.error("Please provide detailed remarks (minimum 20 characters)")
      return
    }
    
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast.success("Vendor application rejected")
    setShowRejectDialog(false)
    setIsProcessing(false)
    router.push("/super-admin/vendor-approvals")
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get risk badge
  const getRiskBadge = () => {
    const config = {
      Low: { bg: "bg-emerald-500/10 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30" },
      Medium: { bg: "bg-yellow-500/10 dark:bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-400", border: "border-yellow-500/30" },
      High: { bg: "bg-red-500/10 dark:bg-red-500/20", text: "text-red-600 dark:text-red-400", border: "border-red-500/30" },
    }
    return (
      <Badge variant="outline" className={cn("text-sm border", config[riskLevel].bg, config[riskLevel].text, config[riskLevel].border)}>
        {riskLevel} Risk
      </Badge>
    )
  }

  // Score bar component
  const ScoreBar = ({ label, score }: { label: string; score: number }) => {
    const percentage = (score / 5) * 100
    const color = score >= 4 ? "bg-emerald-500" : score >= 3 ? "bg-yellow-500" : "bg-red-500"
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-foreground">{score}/5</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4 bg-transparent hover:bg-muted"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Approvals
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{vendor.companyInfo.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{vendorId}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="bg-transparent border-red-500/50 text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
                onClick={() => setShowRejectDialog(true)}
              >
                <X className="size-4 mr-2" />
                Reject
              </Button>
              <Button onClick={() => setShowApproveDialog(true)}>
                <Check className="size-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        </div>

        {/* Executive Summary Card */}
        <Card className="mb-6 bg-card border-border overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Executive Summary</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* QA Score */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="size-6 text-yellow-500 fill-yellow-500" />
                  <span className="text-3xl font-bold text-foreground">{vendor.executiveSummary.qaScore}</span>
                  <span className="text-lg text-muted-foreground">/5</span>
                </div>
                <p className="text-sm text-muted-foreground">QA Score</p>
              </div>
              
              {/* Risk Level */}
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  {getRiskBadge()}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Risk Level</p>
              </div>
              
              {/* Credit Limit */}
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(vendor.classification.creditLimit)}</p>
                <p className="text-sm text-muted-foreground">Credit Limit</p>
              </div>
              
              {/* Days in Process */}
              <div className="text-center">
                <p className={cn(
                  "text-2xl font-bold",
                  vendor.executiveSummary.daysInProcess > 7 ? "text-red-500" : "text-foreground"
                )}>
                  {vendor.executiveSummary.daysInProcess} days
                </p>
                <p className="text-sm text-muted-foreground">In Process</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-border/50">
              <Badge variant="outline" className="border-border bg-background/50">
                <MapPin className="size-3 mr-1" />
                {vendor.cityName}
              </Badge>
              <Badge
                variant="secondary"
                className={cn(
                  vendor.classification.vendorType === "Fixed"
                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                    : "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                )}
              >
                {vendor.classification.vendorType}
              </Badge>
              <Badge variant="secondary" className="bg-muted">
                <Banknote className="size-3 mr-1" />
                {vendor.classification.paymentTerms}
              </Badge>
              {vendor.categories.map((cat) => (
                <Badge key={cat} variant="secondary" className="bg-muted">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 mb-4">
            <TabsTrigger value="summary" className="data-[state=active]:bg-background">
              Summary
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-background">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="company" className="data-[state=active]:bg-background">
              Company
            </TabsTrigger>
            <TabsTrigger value="journey" className="data-[state=active]:bg-background">
              Journey
            </TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="mt-0 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* QA Scores Breakdown */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Shield className="size-4" />
                    QA Evaluation Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScoreBar label="Company Legitimacy" score={vendor.reviewChain.qa.scores.legitimacy} />
                  <ScoreBar label="Business Standards" score={vendor.reviewChain.qa.scores.business} />
                  <ScoreBar label="Compliance" score={vendor.reviewChain.qa.scores.compliance} />
                  <ScoreBar label="Quality Standards" score={vendor.reviewChain.qa.scores.quality} />
                  
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">Overall Score</span>
                      <div className="flex items-center gap-1">
                        <Star className="size-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xl font-bold text-foreground">{vendor.executiveSummary.qaScore}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* QA Recommendations */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="size-4" />
                    QA Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {vendor.reviewChain.qa.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <Building2 className="size-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">Company Type</p>
                  <p className="font-medium text-foreground">{vendor.companyInfo.type}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <Calendar className="size-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">Incorporated</p>
                  <p className="font-medium text-foreground">{formatDate(vendor.companyInfo.incorporationDate)}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <FileText className="size-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">GSTIN</p>
                  <p className="font-medium text-foreground text-xs">{vendor.companyInfo.gstin}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <CreditCard className="size-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">Bank</p>
                  <p className="font-medium text-foreground">{vendor.bankDetails.bankName}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-0 space-y-4">
            {/* City Admin Initial Review */}
            <Card className="bg-card border-border">
              <button
                onClick={() => toggleSection("cityAdmin")}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <User className="size-4 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">City Admin - Initial Review</p>
                    <p className="text-xs text-muted-foreground">
                      {vendor.reviewChain.cityAdmin.reviewerName} | {formatDate(vendor.reviewChain.cityAdmin.reviewDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                    Forwarded to QA
                  </Badge>
                  {expandedSections.cityAdmin ? (
                    <ChevronUp className="size-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              {expandedSections.cityAdmin && (
                <CardContent className="border-t border-border pt-4">
                  <p className="text-sm text-foreground">{vendor.reviewChain.cityAdmin.remarks}</p>
                </CardContent>
              )}
            </Card>

            {/* QA Review */}
            <Card className="bg-card border-border">
              <button
                onClick={() => toggleSection("qa")}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-emerald-500/10">
                    <Shield className="size-4 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">QA Evaluation</p>
                    <p className="text-xs text-muted-foreground">
                      {vendor.reviewChain.qa.reviewerName} | {formatDate(vendor.reviewChain.qa.reviewDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                    <Star className="size-3 mr-1 fill-current" />
                    {vendor.executiveSummary.qaScore}/5
                  </Badge>
                  {expandedSections.qa ? (
                    <ChevronUp className="size-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              {expandedSections.qa && (
                <CardContent className="border-t border-border pt-4 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{vendor.reviewChain.qa.scores.legitimacy}</p>
                      <p className="text-xs text-muted-foreground">Legitimacy</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{vendor.reviewChain.qa.scores.business}</p>
                      <p className="text-xs text-muted-foreground">Business</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{vendor.reviewChain.qa.scores.compliance}</p>
                      <p className="text-xs text-muted-foreground">Compliance</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{vendor.reviewChain.qa.scores.quality}</p>
                      <p className="text-xs text-muted-foreground">Quality</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Recommendations</p>
                    <ul className="space-y-2">
                      {vendor.reviewChain.qa.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* City Admin Post-QA Review */}
            <Card className="bg-card border-border">
              <button
                onClick={() => toggleSection("cityAdminPostQA")}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <User className="size-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">City Admin - Post QA Review</p>
                    <p className="text-xs text-muted-foreground">
                      {vendor.reviewChain.cityAdminPostQA.reviewerName} | {formatDate(vendor.reviewChain.cityAdminPostQA.reviewDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary border-primary/30">
                    Forwarded to Super Admin
                  </Badge>
                  {expandedSections.cityAdminPostQA ? (
                    <ChevronUp className="size-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              {expandedSections.cityAdminPostQA && (
                <CardContent className="border-t border-border pt-4">
                  <p className="text-sm text-foreground">{vendor.reviewChain.cityAdminPostQA.remarks}</p>
                </CardContent>
              )}
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="mt-0 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Company Information */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="size-4" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Legal Name</p>
                    <p className="text-sm font-medium text-foreground">{vendor.companyInfo.legalName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Company Type</p>
                    <p className="text-sm font-medium text-foreground">{vendor.companyInfo.type}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">GSTIN</p>
                      <p className="text-sm font-mono text-foreground">{vendor.companyInfo.gstin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">PAN</p>
                      <p className="text-sm font-mono text-foreground">{vendor.companyInfo.pan}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Incorporated</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(vendor.companyInfo.incorporationDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Registered Address</p>
                    <p className="text-sm text-foreground">
                      {vendor.companyInfo.registeredAddress.line1}, {vendor.companyInfo.registeredAddress.line2}<br />
                      {vendor.companyInfo.registeredAddress.city}, {vendor.companyInfo.registeredAddress.state} - {vendor.companyInfo.registeredAddress.pincode}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <User className="size-4" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Primary Contact</p>
                    <p className="text-sm font-medium text-foreground">{vendor.contactInfo.primaryContact.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor.contactInfo.primaryContact.designation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-muted-foreground" />
                    <p className="text-sm text-foreground">{vendor.contactInfo.primaryContact.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-muted-foreground" />
                    <p className="text-sm text-foreground">{vendor.contactInfo.primaryContact.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Details */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CreditCard className="size-4" />
                    Bank Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Account Name</p>
                    <p className="text-sm font-medium text-foreground">{vendor.bankDetails.accountName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Account Number</p>
                      <p className="text-sm font-mono text-foreground">
                        ****{vendor.bankDetails.accountNumber.slice(-4)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Account Type</p>
                      <p className="text-sm font-medium text-foreground">{vendor.bankDetails.accountType}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Bank</p>
                      <p className="text-sm font-medium text-foreground">{vendor.bankDetails.bankName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">IFSC</p>
                      <p className="text-sm font-mono text-foreground">{vendor.bankDetails.ifscCode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Classification */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <FileText className="size-4" />
                    Vendor Classification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Vendor Type</p>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "mt-1",
                        vendor.classification.vendorType === "Fixed"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      {vendor.classification.vendorType}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Credit Limit</p>
                    <p className="text-lg font-bold text-foreground">{formatCurrency(vendor.classification.creditLimit)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Payment Terms</p>
                    <p className="text-sm font-medium text-foreground">{vendor.classification.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Categories</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vendor.categories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Journey Tab */}
          <TabsContent value="journey" className="mt-0">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Application Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {vendor.workflowHistory.map((event, index) => {
                    const isLast = index === vendor.workflowHistory.length - 1
                    const isApproved = event.status.includes("approved")
                    const isRejected = event.status.includes("rejected")
                    const isPending = event.status.includes("pending")
                    
                    return (
                      <div key={event.id} className="flex gap-4 pb-6 relative">
                        {/* Timeline line */}
                        {!isLast && (
                          <div className="absolute left-[15px] top-8 w-0.5 h-[calc(100%-32px)] bg-border" />
                        )}
                        
                        {/* Icon */}
                        <div className={cn(
                          "size-8 rounded-full flex items-center justify-center shrink-0 z-10",
                          isApproved ? "bg-emerald-500/10 text-emerald-500" :
                          isRejected ? "bg-red-500/10 text-red-500" :
                          isPending ? "bg-yellow-500/10 text-yellow-500" :
                          "bg-blue-500/10 text-blue-500"
                        )}>
                          {isApproved ? (
                            <CheckCircle2 className="size-4" />
                          ) : isRejected ? (
                            <XCircle className="size-4" />
                          ) : isPending ? (
                            <Clock className="size-4" />
                          ) : (
                            <Check className="size-4" />
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-foreground">{event.action}</p>
                            <p className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTimestamp(event.timestamp)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            by {event.performedBy}
                            {event.performedByRole !== "Vendor" && event.performedByRole !== "System" && (
                              <span className="text-xs"> ({event.performedByRole})</span>
                            )}
                          </p>
                          {event.remarks && (
                            <p className="text-sm text-foreground mt-2 p-2 bg-muted/30 rounded">
                              {event.remarks}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  
                  {/* Pending Final Approval */}
                  <div className="flex gap-4">
                    <div className="size-8 rounded-full flex items-center justify-center shrink-0 z-10 bg-primary/10 text-primary border-2 border-dashed border-primary">
                      <Clock className="size-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Final Approval</p>
                      <p className="text-sm text-muted-foreground">Awaiting your decision</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Mobile Fixed Actions */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3">
          <Button
            variant="outline"
            className="flex-1 bg-transparent border-red-500/50 text-red-600 hover:bg-red-500/10"
            onClick={() => setShowRejectDialog(true)}
          >
            <X className="size-4 mr-2" />
            Reject
          </Button>
          <Button className="flex-1" onClick={() => setShowApproveDialog(true)}>
            <Check className="size-4 mr-2" />
            Approve
          </Button>
        </div>
        
        {/* Mobile spacer */}
        <div className="h-20 md:hidden" />
      </div>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Approve Vendor</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You are about to approve {vendor.companyInfo.name} as an onboarded vendor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Summary */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Vendor Type</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    vendor.classification.vendorType === "Fixed"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                  )}
                >
                  {vendor.classification.vendorType}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Credit Limit</span>
                <span className="font-medium text-foreground">{formatCurrency(vendor.classification.creditLimit)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment Terms</span>
                <span className="font-medium text-foreground">{vendor.classification.paymentTerms}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Vendor Code</span>
                <span className="font-mono text-sm text-foreground">
                  {generateVendorCode(vendor.cityCode, vendor.classification.vendorType, 1)}
                </span>
              </div>
            </div>
            
            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor="approvalRemarks" className="text-foreground">
                Approval Remarks <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="approvalRemarks"
                placeholder="Enter approval remarks (minimum 20 characters)..."
                value={approvalRemarks}
                onChange={(e) => setApprovalRemarks(e.target.value)}
                className="bg-background border-border min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                {approvalRemarks.length}/20 characters minimum
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApproveDialog(false)}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isProcessing || approvalRemarks.length < 20}
            >
              {isProcessing ? "Processing..." : "Approve Vendor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Reject Vendor Application</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Please select the reasons for rejection and provide detailed remarks.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Rejection Reasons */}
            <div className="space-y-2">
              <Label className="text-foreground">
                Rejection Reasons <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {SUPER_ADMIN_REJECTION_REASONS.map((reason) => (
                  <div key={reason.code} className="flex items-center gap-2">
                    <Checkbox
                      id={reason.code}
                      checked={rejectionReasons.includes(reason.code)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setRejectionReasons((prev) => [...prev, reason.code])
                        } else {
                          setRejectionReasons((prev) => prev.filter((r) => r !== reason.code))
                        }
                      }}
                    />
                    <Label htmlFor={reason.code} className="text-sm cursor-pointer text-foreground">
                      {reason.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Detailed Remarks */}
            <div className="space-y-2">
              <Label htmlFor="rejectionRemarks" className="text-foreground">
                Detailed Remarks <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="rejectionRemarks"
                placeholder="Provide detailed explanation for rejection (minimum 20 characters)..."
                value={rejectionRemarks}
                onChange={(e) => setRejectionRemarks(e.target.value)}
                className="bg-background border-border min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                {rejectionRemarks.length}/20 characters minimum
              </p>
            </div>
            
            {/* Warning */}
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="size-4 text-red-600 dark:text-red-400 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  Rejection is final. The vendor will be notified via email and SMS.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isProcessing || rejectionReasons.length === 0 || rejectionRemarks.length < 20}
            >
              {isProcessing ? "Processing..." : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
