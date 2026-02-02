"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Clock,
  Trophy,
  DollarSign,
  Award,
  Zap,
  Package,
  Truck,
  Shield,
  Calendar,
  Phone,
  Building2,
  Download,
  FileText,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  AlertCircle,
  Timer,
  TrendingDown,
  TrendingUp,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  type VendorBid,
  type ScopeOfWork,
  BID_STATUS_COLORS,
} from "@/lib/procurement-types"

// Sample scope data
const sampleScope: ScopeOfWork = {
  id: 'sow_1',
  scopeNumber: 'SCP-HYD-STL-2026-0015',
  projectId: 'prj_001',
  projectName: 'Gachibowli Villa Project',
  projectCode: 'PRJ-HYD-2026-0089',
  siteAddress: 'Plot 42, Gachibowli, Hyderabad',
  cityId: 'hyd',
  categoryId: 'cat_iron',
  categoryName: 'Steel',
  title: 'Steel Supply for Foundation Work',
  description: 'TMT steel bars and binding wire for foundation construction.',
  materials: [
    { id: 'm1', materialId: 'mat_1', materialName: 'TMT Steel Bars', materialCode: 'TMT-500D', specification: 'Fe 500D Grade', quantity: 50, unit: 'MT', brandPreference: ['TATA', 'JSW', 'SAIL'] },
  ],
  qualityStandards: [],
  deliveryRequirements: {
    deliveryStartDate: '2026-01-28',
    deliveryEndDate: '2026-02-12',
    deliverySchedule: 'SCHEDULED',
    deliveryLocation: 'Plot 42, Gachibowli, Hyderabad',
    unloadingRequired: true,
    storageAvailable: true,
  },
  bidStartDate: '2026-01-15',
  bidEndDate: '2026-01-25',
  invitedVendors: ['v1', 'v2', 'v3', 'v4', 'v5'],
  status: 'BIDDING_ACTIVE',
  totalBids: 4,
  createdBy: 'user_1',
  createdAt: '2026-01-10',
  updatedAt: '2026-01-25',
  sentAt: '2026-01-15',
}

// Extended bid data for comparison
interface ExtendedBid extends VendorBid {
  pricePerUnit: number
  budgetVariance: number
  onTimeRate: number
  pastOrders: number
  canFulfillComplete: boolean
}

const estimatedBudget = 3250000 // 32.5 Lakhs

const sampleBids: ExtendedBid[] = [
  {
    id: 'bid_1',
    bidNumber: 'BID-HYD-2026-0001',
    scopeId: 'sow_1',
    scopeNumber: 'SCP-HYD-STL-2026-0015',
    scopeTitle: 'Steel Supply for Foundation Work',
    vendorId: 'v1',
    vendorName: 'ABC Steel Suppliers Pvt Ltd',
    vendorCode: 'VND-HYD-STL-001',
    vendorRating: 4.8,
    categoryId: 'cat_iron',
    categoryName: 'Steel',
    lineItems: [
      { id: 'li_1', scopeMaterialId: 'm1', materialName: 'TMT Steel Bars', quotedQuantity: 50, unit: 'MT', unitPrice: 62000, totalPrice: 3100000, brandOffered: 'TATA Tiscon', specification: 'Fe 500D Grade' },
    ],
    totalAmount: 3100000,
    taxAmount: 558000,
    grandTotal: 3658000,
    pricePerUnit: 62000,
    budgetVariance: -4.6,
    availableQuantity: 55,
    canFulfillComplete: true,
    deliveryCommitment: 'Can deliver within 12 days',
    deliveryStartDate: '2026-01-28',
    deliveryEndDate: '2026-02-09',
    deliveryDays: 12,
    certifications: [
      { id: 'c1', name: 'BIS Certification', certificateNumber: 'BIS-2024-1234', issuedBy: 'Bureau of Indian Standards', validUntil: '2027-12-31' },
      { id: 'c2', name: 'ISO 9001:2015', certificateNumber: 'ISO-9001-5678', issuedBy: 'TUV', validUntil: '2027-06-30' },
      { id: 'c3', name: 'Mill Test Certificate', certificateNumber: 'MTC-2026-001', issuedBy: 'TATA Steel', validUntil: '2026-12-31' },
    ],
    qualityNotes: 'Direct from TATA Steel authorized stockist.',
    paymentTerms: '30 Days Credit',
    validityDays: 30,
    attachments: [],
    status: 'SHORTLISTED',
    submittedAt: '2026-01-20',
    onTimeRate: 98,
    pastOrders: 24,
    evaluation: {
      priceScore: 95,
      qualityScore: 95,
      deliveryScore: 100,
      overallScore: 96.5,
      ranking: 1,
      evaluatedBy: 'System',
      evaluatedAt: '2026-01-25',
      recommendation: 'RECOMMENDED',
      badges: [{ type: 'BEST_PRICE', label: 'Best Price' }, { type: 'HIGH_QUALITY', label: 'Best Quality' }, { type: 'FAST_DELIVERY', label: 'Fastest Delivery' }],
    },
  },
  {
    id: 'bid_2',
    bidNumber: 'BID-HYD-2026-0002',
    scopeId: 'sow_1',
    scopeNumber: 'SCP-HYD-STL-2026-0015',
    scopeTitle: 'Steel Supply for Foundation Work',
    vendorId: 'v2',
    vendorName: 'XYZ Iron & Steel Works',
    vendorCode: 'VND-HYD-STL-002',
    vendorRating: 4.5,
    categoryId: 'cat_iron',
    categoryName: 'Steel',
    lineItems: [
      { id: 'li_2', scopeMaterialId: 'm1', materialName: 'TMT Steel Bars', quotedQuantity: 50, unit: 'MT', unitPrice: 64500, totalPrice: 3225000, brandOffered: 'JSW Neosteel', specification: 'Fe 500D Grade' },
    ],
    totalAmount: 3225000,
    taxAmount: 580500,
    grandTotal: 3805500,
    pricePerUnit: 64500,
    budgetVariance: -0.8,
    availableQuantity: 50,
    canFulfillComplete: true,
    deliveryCommitment: 'Delivery in 15 days',
    deliveryStartDate: '2026-01-30',
    deliveryEndDate: '2026-02-14',
    deliveryDays: 15,
    certifications: [
      { id: 'c4', name: 'BIS Certification', certificateNumber: 'BIS-2024-5678', issuedBy: 'Bureau of Indian Standards', validUntil: '2027-08-31' },
      { id: 'c5', name: 'ISO 9001:2015', certificateNumber: 'ISO-9001-9012', issuedBy: 'SGS', validUntil: '2027-03-30' },
    ],
    qualityNotes: 'JSW authorized dealer.',
    paymentTerms: '30 Days Credit',
    validityDays: 30,
    attachments: [],
    status: 'UNDER_REVIEW',
    submittedAt: '2026-01-21',
    onTimeRate: 92,
    pastOrders: 18,
    evaluation: {
      priceScore: 88,
      qualityScore: 88,
      deliveryScore: 85,
      overallScore: 87.4,
      ranking: 2,
      evaluatedBy: 'System',
      evaluatedAt: '2026-01-25',
      recommendation: 'ACCEPTABLE',
      badges: [],
    },
  },
  {
    id: 'bid_3',
    bidNumber: 'BID-HYD-2026-0003',
    scopeId: 'sow_1',
    scopeNumber: 'SCP-HYD-STL-2026-0015',
    scopeTitle: 'Steel Supply for Foundation Work',
    vendorId: 'v3',
    vendorName: 'Steel Masters India',
    vendorCode: 'VND-HYD-STL-003',
    vendorRating: 4.2,
    categoryId: 'cat_iron',
    categoryName: 'Steel',
    lineItems: [
      { id: 'li_3', scopeMaterialId: 'm1', materialName: 'TMT Steel Bars', quotedQuantity: 50, unit: 'MT', unitPrice: 66000, totalPrice: 3300000, brandOffered: 'SAIL', specification: 'Fe 500D Grade' },
    ],
    totalAmount: 3300000,
    taxAmount: 594000,
    grandTotal: 3894000,
    pricePerUnit: 66000,
    budgetVariance: 1.5,
    availableQuantity: 50,
    canFulfillComplete: true,
    deliveryCommitment: 'Delivery in 18 days',
    deliveryStartDate: '2026-02-01',
    deliveryEndDate: '2026-02-19',
    deliveryDays: 18,
    certifications: [
      { id: 'c6', name: 'BIS Certification', certificateNumber: 'BIS-2023-9012', issuedBy: 'Bureau of Indian Standards', validUntil: '2026-12-31' },
    ],
    qualityNotes: 'SAIL authorized stockist.',
    paymentTerms: '45 Days Credit',
    validityDays: 30,
    attachments: [],
    status: 'UNDER_REVIEW',
    submittedAt: '2026-01-22',
    onTimeRate: 88,
    pastOrders: 12,
    evaluation: {
      priceScore: 82,
      qualityScore: 80,
      deliveryScore: 75,
      overallScore: 79.3,
      ranking: 3,
      evaluatedBy: 'System',
      evaluatedAt: '2026-01-25',
      recommendation: 'ACCEPTABLE',
      badges: [],
    },
  },
  {
    id: 'bid_4',
    bidNumber: 'BID-HYD-2026-0004',
    scopeId: 'sow_1',
    scopeNumber: 'SCP-HYD-STL-2026-0015',
    scopeTitle: 'Steel Supply for Foundation Work',
    vendorId: 'v4',
    vendorName: 'Prime Steel Distributors',
    vendorCode: 'VND-HYD-STL-004',
    vendorRating: 3.9,
    categoryId: 'cat_iron',
    categoryName: 'Steel',
    lineItems: [
      { id: 'li_4', scopeMaterialId: 'm1', materialName: 'TMT Steel Bars', quotedQuantity: 40, unit: 'MT', unitPrice: 63500, totalPrice: 2540000, brandOffered: 'Vizag Steel', specification: 'Fe 500D Grade' },
    ],
    totalAmount: 2540000,
    taxAmount: 457200,
    grandTotal: 2997200,
    pricePerUnit: 63500,
    budgetVariance: -21.8,
    availableQuantity: 40,
    canFulfillComplete: false,
    deliveryCommitment: 'Can deliver 40 MT in 20 days',
    deliveryStartDate: '2026-02-05',
    deliveryEndDate: '2026-02-25',
    deliveryDays: 20,
    certifications: [
      { id: 'c7', name: 'BIS Certification', certificateNumber: 'BIS-2023-3456', issuedBy: 'Bureau of Indian Standards', validUntil: '2026-06-30' },
    ],
    qualityNotes: 'Partial quantity available.',
    paymentTerms: '15 Days Credit',
    validityDays: 15,
    attachments: [],
    status: 'UNDER_REVIEW',
    submittedAt: '2026-01-23',
    onTimeRate: 82,
    pastOrders: 6,
    evaluation: {
      priceScore: 90,
      qualityScore: 72,
      deliveryScore: 65,
      overallScore: 76.1,
      ranking: 4,
      evaluatedBy: 'System',
      evaluatedAt: '2026-01-25',
      recommendation: 'NOT_RECOMMENDED',
      badges: [],
    },
  },
]

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`
  return amount.toLocaleString('en-IN')
}

function formatCurrencyShort(amount: number): string {
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)}Cr`
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`
  return amount.toLocaleString('en-IN')
}

// Mobile Bid Card Component
interface MobileBidCardProps {
  bid: ExtendedBid
  isRecommended: boolean
  onSelect: () => void
  onViewDetails: () => void
}

function MobileBidCard({ bid, isRecommended, onSelect, onViewDetails }: MobileBidCardProps) {
  const [expanded, setExpanded] = React.useState(false)
  
  return (
    <Card className={`p-4 ${isRecommended ? 'border-primary ring-2 ring-primary/20' : 'bg-card'}`}>
      {isRecommended && (
        <Badge className="bg-primary text-primary-foreground mb-3">
          <Trophy className="size-3 mr-1" />
          Recommended
        </Badge>
      )}
      
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-lg text-foreground">#{bid.evaluation?.ranking}</span>
            <h3 className="font-semibold text-foreground truncate">{bid.vendorName}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="size-4 fill-current" />
              <span className="font-medium">{bid.vendorRating}</span>
            </div>
            <span className="text-muted-foreground/50">|</span>
            <span>{bid.vendorCode}</span>
          </div>
        </div>
      </div>
      
      {/* Badges */}
      {bid.evaluation?.badges && bid.evaluation.badges.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-3">
          {bid.evaluation.badges.map((badge, idx) => (
            <Badge key={idx} variant="outline" className={`text-xs ${
              badge.type === 'BEST_PRICE' ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700' :
              badge.type === 'HIGH_QUALITY' ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' :
              'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700'
            }`}>
              {badge.type === 'BEST_PRICE' && <DollarSign className="size-3 mr-1" />}
              {badge.type === 'HIGH_QUALITY' && <Award className="size-3 mr-1" />}
              {badge.type === 'FAST_DELIVERY' && <Zap className="size-3 mr-1" />}
              {badge.label}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Price/Unit</p>
          <p className="font-semibold text-foreground">Rs {bid.pricePerUnit.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Total</p>
          <p className="font-semibold text-foreground">Rs {formatCurrencyShort(bid.grandTotal)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <span className={`${bid.budgetVariance <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
            {bid.budgetVariance <= 0 ? <TrendingDown className="size-4" /> : <TrendingUp className="size-4" />}
          </span>
          <span className={`font-medium ${bid.budgetVariance <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
            {bid.budgetVariance > 0 ? '+' : ''}{bid.budgetVariance}% vs budget
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {bid.canFulfillComplete ? (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <Check className="size-4" />
              Full supply
            </span>
          ) : (
            <span className="flex items-center gap-1 text-destructive">
              <AlertCircle className="size-4" />
              Partial
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm mb-3">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="size-4" />
          <span>{bid.deliveryDays} days delivery</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Shield className="size-4" />
          <span>{bid.certifications.length} certs</span>
        </div>
      </div>
      
      {/* Score Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-muted-foreground">Overall Score</span>
          <span className="font-bold text-foreground">{bid.evaluation?.overallScore.toFixed(1)}/100</span>
        </div>
        <Progress value={bid.evaluation?.overallScore || 0} className="h-2" />
      </div>
      
      {/* Expandable Details */}
      <button 
        className="w-full flex items-center justify-center gap-1 text-sm text-muted-foreground py-2 hover:text-foreground transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Less details' : 'More details'}
        {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>
      
      {expanded && (
        <div className="pt-3 border-t border-border space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">On-time Rate</p>
              <p className="font-medium text-foreground">{bid.onTimeRate}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Past Orders</p>
              <p className="font-medium text-foreground">{bid.pastOrders}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Payment Terms</p>
              <p className="font-medium text-foreground">{bid.paymentTerms}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Quote Validity</p>
              <p className="font-medium text-foreground">{bid.validityDays} Days</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Brand Offered</p>
            <p className="text-sm font-medium text-foreground">{bid.lineItems[0]?.brandOffered}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Certifications</p>
            <div className="flex flex-wrap gap-1">
              {bid.certifications.map((cert, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {cert.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex gap-2 mt-4">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={onViewDetails}>
          <Eye className="size-4 mr-2" />
          Details
        </Button>
        <Button className="flex-1" onClick={onSelect}>
          <Check className="size-4 mr-2" />
          Select
        </Button>
      </div>
    </Card>
  )
}

export default function BidComparisonPage() {
  const params = useParams()
  const router = useRouter()
  const scopeId = params.id as string
  
  const [sortBy, setSortBy] = React.useState<'score' | 'price' | 'delivery'>('score')
  const [showSelectDialog, setShowSelectDialog] = React.useState(false)
  const [selectedBidId, setSelectedBidId] = React.useState<string | null>(null)
  const [selectionNotes, setSelectionNotes] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showBidDetailDialog, setShowBidDetailDialog] = React.useState(false)
  const [detailBidId, setDetailBidId] = React.useState<string | null>(null)
  
  const scope = sampleScope
  const bids = React.useMemo(() => {
    const sorted = [...sampleBids]
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => a.grandTotal - b.grandTotal)
      case 'delivery':
        return sorted.sort((a, b) => a.deliveryDays - b.deliveryDays)
      default:
        return sorted.sort((a, b) => (b.evaluation?.overallScore || 0) - (a.evaluation?.overallScore || 0))
    }
  }, [sortBy])
  
  const recommendedBid = bids.find(b => b.evaluation?.recommendation === 'RECOMMENDED')
  const lowestPriceBid = [...bids].sort((a, b) => a.pricePerUnit - b.pricePerUnit)[0]
  const fastestBid = [...bids].sort((a, b) => a.deliveryDays - b.deliveryDays)[0]
  
  const priceRange = {
    min: Math.min(...bids.map(b => b.grandTotal)),
    max: Math.max(...bids.map(b => b.grandTotal)),
    avg: bids.reduce((sum, b) => sum + b.grandTotal, 0) / bids.length,
  }
  
  const handleSelectVendor = (bidId: string) => {
    setSelectedBidId(bidId)
    setShowSelectDialog(true)
  }
  
  const handleConfirmSelection = async () => {
    if (!selectedBidId) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const selectedBid = bids.find(b => b.id === selectedBidId)
    toast.success(`${selectedBid?.vendorName} selected successfully!`)
    setShowSelectDialog(false)
    router.push(`/procurement/scopes/${scopeId}`)
  }
  
  const handleViewDetails = (bidId: string) => {
    setDetailBidId(bidId)
    setShowBidDetailDialog(true)
  }
  
  const detailBid = detailBidId ? bids.find(b => b.id === detailBidId) : null
  
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-2 bg-transparent hover:bg-muted"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Scope
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bid Comparison</h1>
              <p className="text-sm text-muted-foreground mt-1">{scope.scopeNumber}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="bg-transparent">
                <Download className="size-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Clock className="size-4 mr-2" />
                Close Bidding
              </Button>
            </div>
          </div>
        </div>
        
        {/* Context Bar */}
        <Card className="p-4 bg-muted/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="font-medium text-foreground">{scope.categoryName}</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">50 MT</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Budget: Rs {formatCurrency(estimatedBudget)}</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Deadline: Jan 25, 2026</span>
            </div>
            <Badge variant="secondary">
              {bids.length} Bids Received
            </Badge>
          </div>
        </Card>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-1">Bid Count</p>
            <p className="text-2xl font-bold text-foreground">{bids.length}</p>
          </Card>
          <Card className="p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-1">Price Range</p>
            <p className="text-lg font-semibold text-foreground">
              Rs {formatCurrencyShort(priceRange.min)} - {formatCurrencyShort(priceRange.max)}
            </p>
          </Card>
          <Card className="p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-1">Average</p>
            <p className="text-lg font-semibold text-foreground">Rs {formatCurrencyShort(priceRange.avg)}</p>
          </Card>
          <Card className="p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-1">Best Vendor</p>
            <p className="text-lg font-semibold text-primary truncate">{recommendedBid?.vendorName.split(' ')[0]}</p>
          </Card>
        </div>
        
        {/* Sort Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'score' | 'price' | 'delivery')}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Best Overall</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
                <SelectItem value="delivery">Fastest Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Desktop Comparison Table */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-[200px]">Criteria</th>
                  {bids.map(bid => (
                    <th key={bid.id} className={`text-center py-3 px-4 min-w-[180px] ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold text-foreground">{bid.vendorName}</span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="size-3 fill-current" />
                          <span className="text-xs">{bid.vendorRating}</span>
                        </div>
                        {bid.evaluation?.recommendation === 'RECOMMENDED' && (
                          <Badge className="bg-primary text-primary-foreground text-xs mt-1">
                            <Trophy className="size-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Pricing Section */}
                <tr className="bg-muted/30">
                  <td colSpan={bids.length + 1} className="py-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Pricing
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Price/Unit</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <span className={`font-medium ${bid.id === lowestPriceBid.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
                        Rs {bid.pricePerUnit.toLocaleString('en-IN')}
                      </span>
                      {bid.id === lowestPriceBid.id && (
                        <Badge className="ml-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">Best</Badge>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Total</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 font-semibold text-foreground ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      Rs {formatCurrencyShort(bid.grandTotal)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">vs Budget</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <span className={`flex items-center justify-center gap-1 ${bid.budgetVariance <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                        {bid.budgetVariance <= 0 ? <Check className="size-4" /> : <AlertCircle className="size-4" />}
                        {bid.budgetVariance > 0 ? '+' : ''}{bid.budgetVariance}%
                      </span>
                    </td>
                  ))}
                </tr>
                
                {/* Quantity Section */}
                <tr className="bg-muted/30">
                  <td colSpan={bids.length + 1} className="py-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Quantity
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Available</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <span className={bid.availableQuantity >= 50 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                        {bid.availableQuantity} MT
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Full Supply</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      {bid.canFulfillComplete ? (
                        <span className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Check className="size-4" /> Yes
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1 text-destructive">
                          <X className="size-4" /> Partial
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                
                {/* Delivery Section */}
                <tr className="bg-muted/30">
                  <td colSpan={bids.length + 1} className="py-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Delivery
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Start Date</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 text-foreground ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      {new Date(bid.deliveryStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">End Date</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <span className={bid.id === fastestBid.id ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-foreground'}>
                        {new Date(bid.deliveryEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                      {bid.id === fastestBid.id && (
                        <Badge className="ml-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs">Best</Badge>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Meets Deadline</td>
                  {bids.map(bid => {
                    const meetsDeadline = new Date(bid.deliveryEndDate) <= new Date(scope.deliveryRequirements.deliveryEndDate)
                    return (
                      <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                        {meetsDeadline ? (
                          <span className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <Check className="size-4" /> Yes
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1 text-destructive">
                            <X className="size-4" /> No
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
                
                {/* Quality Section */}
                <tr className="bg-muted/30">
                  <td colSpan={bids.length + 1} className="py-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Quality
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Brand</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 font-medium text-foreground ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      {bid.lineItems[0]?.brandOffered}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Certifications</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <div className="flex flex-wrap justify-center gap-1">
                        {bid.certifications.slice(0, 2).map((cert, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {cert.name.replace(' Certification', '')}
                          </Badge>
                        ))}
                        {bid.certifications.length > 2 && (
                          <Badge variant="secondary" className="text-xs">+{bid.certifications.length - 2}</Badge>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Quality Score</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <span className="font-medium text-foreground">{bid.evaluation?.qualityScore}/100</span>
                    </td>
                  ))}
                </tr>
                
                {/* Vendor Performance */}
                <tr className="bg-muted/30">
                  <td colSpan={bids.length + 1} className="py-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Vendor Performance
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">On-time Rate</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 font-medium ${bid.onTimeRate >= 95 ? 'text-emerald-600 dark:text-emerald-400' : bid.onTimeRate >= 85 ? 'text-foreground' : 'text-amber-600 dark:text-amber-400'} ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      {bid.onTimeRate}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Past Orders</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 text-foreground ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      {bid.pastOrders}
                    </td>
                  ))}
                </tr>
                
                {/* Terms */}
                <tr className="bg-muted/30">
                  <td colSpan={bids.length + 1} className="py-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Terms
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Payment</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 text-foreground ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      {bid.paymentTerms}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Validity</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 text-foreground ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      {bid.validityDays} Days
                    </td>
                  ))}
                </tr>
                
                {/* Overall Score */}
                <tr className="bg-muted/30">
                  <td colSpan={bids.length + 1} className="py-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Overall
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm font-medium text-foreground">Score</td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-3 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <div className="flex items-center justify-center gap-2">
                        <Progress value={bid.evaluation?.overallScore || 0} className="w-16 h-2" />
                        <span className="font-bold text-foreground">{bid.evaluation?.overallScore.toFixed(0)}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                
                {/* Actions */}
                <tr>
                  <td className="py-4 px-4"></td>
                  {bids.map(bid => (
                    <td key={bid.id} className={`text-center py-4 px-4 ${bid.evaluation?.recommendation === 'RECOMMENDED' ? 'bg-primary/5' : ''}`}>
                      <div className="flex flex-col gap-2">
                        <Button 
                          className="w-full"
                          onClick={() => handleSelectVendor(bid.id)}
                        >
                          Select
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full bg-transparent"
                          onClick={() => handleViewDetails(bid.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {bids.map(bid => (
            <MobileBidCard
              key={bid.id}
              bid={bid}
              isRecommended={bid.evaluation?.recommendation === 'RECOMMENDED'}
              onSelect={() => handleSelectVendor(bid.id)}
              onViewDetails={() => handleViewDetails(bid.id)}
            />
          ))}
        </div>
        
        {/* Footer Actions */}
        <Card className="p-4 bg-card sticky bottom-0 border-t shadow-lg">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Select a vendor to proceed with the purchase order
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                <Clock className="size-4 mr-2" />
                Close Bidding
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                <Download className="size-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Select Vendor Dialog */}
      <Dialog open={showSelectDialog} onOpenChange={setShowSelectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Vendor Selection</DialogTitle>
            <DialogDescription>
              You are about to select this vendor for the scope. This action will notify the vendor and close bidding.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBidId && (() => {
            const selectedBid = bids.find(b => b.id === selectedBidId)
            return selectedBid ? (
              <div className="space-y-4">
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{selectedBid.vendorName}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="size-4 fill-current" />
                      <span>{selectedBid.vendorRating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Amount</p>
                      <p className="font-medium text-foreground">Rs {formatCurrency(selectedBid.grandTotal)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Delivery</p>
                      <p className="font-medium text-foreground">{selectedBid.deliveryDays} days</p>
                    </div>
                  </div>
                </Card>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Selection Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this selection..."
                    value={selectionNotes}
                    onChange={(e) => setSelectionNotes(e.target.value)}
                  />
                </div>
              </div>
            ) : null
          })()}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSelectDialog(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleConfirmSelection} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Confirm Selection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Bid Detail Dialog */}
      <Dialog open={showBidDetailDialog} onOpenChange={setShowBidDetailDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bid Details</DialogTitle>
            <DialogDescription>
              {detailBid?.vendorName} - {detailBid?.bidNumber}
            </DialogDescription>
          </DialogHeader>
          
          {detailBid && (
            <div className="space-y-6">
              {/* Vendor Info */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Vendor Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Company</p>
                    <p className="font-medium text-foreground">{detailBid.vendorName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Code</p>
                    <p className="font-medium text-foreground">{detailBid.vendorCode}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="size-4 fill-current" />
                      <span className="font-medium">{detailBid.vendorRating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">On-time Delivery</p>
                    <p className="font-medium text-foreground">{detailBid.onTimeRate}%</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Pricing */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Pricing</h4>
                <div className="space-y-2">
                  {detailBid.lineItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-foreground">{item.materialName}</p>
                        <p className="text-muted-foreground">{item.brandOffered} | {item.quotedQuantity} {item.unit}</p>
                      </div>
                      <p className="font-medium text-foreground">Rs {item.totalPrice.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">Rs {detailBid.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="text-foreground">Rs {detailBid.taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Grand Total</span>
                    <span className="text-foreground">Rs {detailBid.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Delivery */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Delivery</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{new Date(detailBid.deliveryStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-medium text-foreground">{new Date(detailBid.deliveryEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Commitment</p>
                    <p className="font-medium text-foreground">{detailBid.deliveryCommitment}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Certifications */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Certifications</h4>
                <div className="space-y-2">
                  {detailBid.certifications.map(cert => (
                    <div key={cert.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{cert.name}</p>
                        <p className="text-muted-foreground">{cert.issuedBy}</p>
                      </div>
                      <Badge variant="outline">Valid until {cert.validUntil}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Terms */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Terms</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Payment Terms</p>
                    <p className="font-medium text-foreground">{detailBid.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quote Validity</p>
                    <p className="font-medium text-foreground">{detailBid.validityDays} Days</p>
                  </div>
                </div>
                {detailBid.qualityNotes && (
                  <div className="mt-3">
                    <p className="text-muted-foreground text-sm">Notes</p>
                    <p className="text-sm text-foreground mt-1">{detailBid.qualityNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBidDetailDialog(false)} className="bg-transparent">
              Close
            </Button>
            <Button onClick={() => {
              setShowBidDetailDialog(false)
              if (detailBidId) handleSelectVendor(detailBidId)
            }}>
              Select This Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
