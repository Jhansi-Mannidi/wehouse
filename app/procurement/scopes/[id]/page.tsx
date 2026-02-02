"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  Package,
  Truck,
  Award,
  DollarSign,
  Calendar,
  Building2,
  Phone,
  ChevronDown,
  ChevronUp,
  Check,
  Trophy,
  Zap,
  Timer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
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
  SCOPE_STATUS_COLORS,
  calculateBidScore,
  getBidBadges,
} from "@/lib/procurement-types"

// Sample scope data
const sampleScope: ScopeOfWork = {
  id: 'sow_1',
  scopeNumber: 'SOW-HYD-2026-0015',
  projectId: 'prj_001',
  projectName: 'Gachibowli Villa Project',
  projectCode: 'PRJ-HYD-2026-0089',
  siteAddress: 'Plot 42, Gachibowli, Hyderabad',
  cityId: 'hyd',
  categoryId: 'cat_iron',
  categoryName: 'Iron / Steel',
  title: 'Steel Supply for Foundation Work',
  description: 'TMT steel bars and binding wire for foundation construction. Required: Fe 500D grade TMT bars conforming to IS 1786.',
  materials: [
    { id: 'm1', materialId: 'mat_1', materialName: 'TMT Steel Bars', materialCode: 'TMT-500D', specification: 'Fe 500D Grade', quantity: 5000, unit: 'KG', brandPreference: ['TATA', 'JSW', 'SAIL'] },
    { id: 'm2', materialId: 'mat_2', materialName: 'Binding Wire', materialCode: 'BW-18G', specification: '18 Gauge', quantity: 200, unit: 'KG' },
  ],
  qualityStandards: [
    { id: 'qs_1', standardCode: 'IS 1786', description: 'TMT bars shall conform to IS 1786', isMandatory: true },
    { id: 'qs_2', standardCode: 'BIS', description: 'BIS certification required', isMandatory: true },
  ],
  deliveryRequirements: {
    deliveryStartDate: '2026-01-28',
    deliveryEndDate: '2026-02-12',
    deliverySchedule: 'SCHEDULED',
    scheduleDetails: 'Weekly deliveries over 2 weeks',
    deliveryLocation: 'Plot 42, Gachibowli, Hyderabad',
    unloadingRequired: true,
    storageAvailable: true,
  },
  bidStartDate: '2026-01-15',
  bidEndDate: '2026-01-25',
  invitedVendors: ['v1', 'v2', 'v3', 'v4', 'v5'],
  status: 'EVALUATION',
  totalBids: 5,
  createdBy: 'user_1',
  createdAt: '2026-01-10',
  updatedAt: '2026-01-25',
  sentAt: '2026-01-15',
  closedAt: '2026-01-25',
}

// Sample bids data
const sampleBids: VendorBid[] = [
  {
    id: 'bid_1',
    bidNumber: 'BID-HYD-2026-0001',
    scopeId: 'sow_1',
    scopeNumber: 'SOW-HYD-2026-0015',
    scopeTitle: 'Steel Supply for Foundation Work',
    vendorId: 'v1',
    vendorName: 'ABC Steel Suppliers Pvt Ltd',
    vendorCode: 'VND-HYD-FIX-001',
    vendorRating: 4.8,
    categoryId: 'cat_iron',
    categoryName: 'Iron / Steel',
    lineItems: [
      { id: 'li_1', scopeMaterialId: 'm1', materialName: 'TMT Steel Bars', quotedQuantity: 5000, unit: 'KG', unitPrice: 65, totalPrice: 325000, brandOffered: 'TATA Tiscon', specification: 'Fe 500D Grade' },
      { id: 'li_2', scopeMaterialId: 'm2', materialName: 'Binding Wire', quotedQuantity: 200, unit: 'KG', unitPrice: 85, totalPrice: 17000, brandOffered: 'TATA', specification: '18 Gauge' },
    ],
    totalAmount: 342000,
    taxAmount: 61560,
    grandTotal: 403560,
    availableQuantity: 5200,
    deliveryCommitment: 'Can deliver within 15 days with weekly batches',
    deliveryStartDate: '2026-01-28',
    deliveryEndDate: '2026-02-12',
    deliveryDays: 15,
    certifications: [
      { id: 'c1', name: 'BIS Certification', certificateNumber: 'BIS-2024-1234', issuedBy: 'Bureau of Indian Standards', validUntil: '2027-12-31' },
      { id: 'c2', name: 'ISO 9001:2015', certificateNumber: 'ISO-9001-5678', issuedBy: 'TUV', validUntil: '2027-06-30' },
      { id: 'c3', name: 'Mill Test Certificate', certificateNumber: 'MTC-2026-001', issuedBy: 'TATA Steel', validUntil: '2026-12-31' },
    ],
    qualityNotes: 'All materials sourced directly from TATA Steel authorized stockist. MTC provided for each batch.',
    paymentTerms: '30 Days Credit',
    validityDays: 30,
    additionalTerms: 'Free delivery within city limits. Unloading charges included.',
    attachments: [],
    status: 'SHORTLISTED',
    submittedAt: '2026-01-20',
    evaluation: {
      priceScore: 95,
      qualityScore: 92,
      deliveryScore: 100,
      overallScore: 95.2,
      ranking: 1,
      evaluatedBy: 'Rajesh Kumar',
      evaluatedAt: '2026-01-26',
      recommendation: 'RECOMMENDED',
      badges: [{ type: 'BEST_PRICE', label: 'Best Price' }, { type: 'HIGH_QUALITY', label: 'High Quality' }, { type: 'FAST_DELIVERY', label: 'Fast Delivery' }],
    },
  },
  {
    id: 'bid_2',
    bidNumber: 'BID-HYD-2026-0002',
    scopeId: 'sow_1',
    scopeNumber: 'SOW-HYD-2026-0015',
    scopeTitle: 'Steel Supply for Foundation Work',
    vendorId: 'v2',
    vendorName: 'XYZ Iron & Steel Works',
    vendorCode: 'VND-HYD-FIX-002',
    vendorRating: 4.5,
    categoryId: 'cat_iron',
    categoryName: 'Iron / Steel',
    lineItems: [
      { id: 'li_3', scopeMaterialId: 'm1', materialName: 'TMT Steel Bars', quotedQuantity: 5000, unit: 'KG', unitPrice: 68, totalPrice: 340000, brandOffered: 'JSW Neosteel', specification: 'Fe 500D Grade' },
      { id: 'li_4', scopeMaterialId: 'm2', materialName: 'Binding Wire', quotedQuantity: 200, unit: 'KG', unitPrice: 82, totalPrice: 16400, brandOffered: 'JSW', specification: '18 Gauge' },
    ],
    totalAmount: 356400,
    taxAmount: 64152,
    grandTotal: 420552,
    availableQuantity: 5000,
    deliveryCommitment: 'Delivery in 18 days',
    deliveryStartDate: '2026-01-30',
    deliveryEndDate: '2026-02-17',
    deliveryDays: 18,
    certifications: [
      { id: 'c4', name: 'BIS Certification', certificateNumber: 'BIS-2024-5678', issuedBy: 'Bureau of Indian Standards', validUntil: '2027-08-31' },
      { id: 'c5', name: 'ISO 9001:2015', certificateNumber: 'ISO-9001-9012', issuedBy: 'SGS', validUntil: '2027-03-30' },
    ],
    qualityNotes: 'JSW authorized dealer. Quality guaranteed.',
    paymentTerms: '30 Days Credit',
    validityDays: 30,
    attachments: [],
    status: 'UNDER_REVIEW',
    submittedAt: '2026-01-21',
    evaluation: {
      priceScore: 88,
      qualityScore: 88,
      deliveryScore: 83,
      overallScore: 86.8,
      ranking: 2,
      evaluatedBy: 'Rajesh Kumar',
      evaluatedAt: '2026-01-26',
      recommendation: 'ACCEPTABLE',
      badges: [],
    },
  },
  {
    id: 'bid_3',
    bidNumber: 'BID-HYD-2026-0003',
    scopeId: 'sow_1',
    scopeNumber: 'SOW-HYD-2026-0015',
    scopeTitle: 'Steel Supply for Foundation Work',
    vendorId: 'v3',
    vendorName: 'Steel Masters India',
    vendorCode: 'VND-HYD-FIX-003',
    vendorRating: 4.2,
    categoryId: 'cat_iron',
    categoryName: 'Iron / Steel',
    lineItems: [
      { id: 'li_5', scopeMaterialId: 'm1', materialName: 'TMT Steel Bars', quotedQuantity: 5000, unit: 'KG', unitPrice: 70, totalPrice: 350000, brandOffered: 'SAIL', specification: 'Fe 500D Grade' },
      { id: 'li_6', scopeMaterialId: 'm2', materialName: 'Binding Wire', quotedQuantity: 200, unit: 'KG', unitPrice: 88, totalPrice: 17600, brandOffered: 'Local', specification: '18 Gauge' },
    ],
    totalAmount: 367600,
    taxAmount: 66168,
    grandTotal: 433768,
    availableQuantity: 5000,
    deliveryCommitment: 'Delivery in 20 days',
    deliveryStartDate: '2026-02-01',
    deliveryEndDate: '2026-02-21',
    deliveryDays: 20,
    certifications: [
      { id: 'c6', name: 'BIS Certification', certificateNumber: 'BIS-2023-9012', issuedBy: 'Bureau of Indian Standards', validUntil: '2026-12-31' },
    ],
    qualityNotes: 'SAIL authorized stockist.',
    paymentTerms: '45 Days Credit',
    validityDays: 30,
    attachments: [],
    status: 'UNDER_REVIEW',
    submittedAt: '2026-01-22',
    evaluation: {
      priceScore: 82,
      qualityScore: 85,
      deliveryScore: 75,
      overallScore: 81.3,
      ranking: 3,
      evaluatedBy: 'Rajesh Kumar',
      evaluatedAt: '2026-01-26',
      recommendation: 'ACCEPTABLE',
      badges: [],
    },
  },
]

// Sample Project Managers
const projectManagers = [
  { id: 'pm_1', name: 'Arun Sharma', email: 'arun.sharma@wehouse.in' },
  { id: 'pm_2', name: 'Priya Reddy', email: 'priya.reddy@wehouse.in' },
  { id: 'pm_3', name: 'Vikram Singh', email: 'vikram.singh@wehouse.in' },
]

interface BidCardProps {
  bid: VendorBid
  isSelected: boolean
  onSelect: () => void
  onViewDetails: () => void
  isRecommended: boolean
}

function BidCard({ bid, isSelected, onSelect, onViewDetails, isRecommended }: BidCardProps) {
  const statusColors = BID_STATUS_COLORS[bid.status]
  
  return (
    <Card className={`p-4 transition-all ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'bg-card'} ${isRecommended ? 'border-emerald-300 dark:border-emerald-700' : ''}`}>
      {isRecommended && (
        <div className="flex items-center gap-2 mb-3 -mt-1">
          <Badge className="bg-emerald-50 text-emerald-700 border-0">
            <Trophy className="size-3 mr-1" />
            Recommended
          </Badge>
        </div>
      )}
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className="mt-1"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-semibold text-foreground">#{bid.evaluation?.ranking}</span>
              <h3 className="font-semibold text-foreground">{bid.vendorName}</h3>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="size-4 fill-current" />
                <span className="text-sm font-medium text-foreground">{bid.vendorRating}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{bid.vendorCode}</p>
            
            {/* Badges */}
            {bid.evaluation?.badges && bid.evaluation.badges.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {bid.evaluation.badges.map((badge, idx) => (
                  <Badge key={idx} variant="outline" className={`text-xs ${
                    badge.type === 'BEST_PRICE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300' :
                    badge.type === 'HIGH_QUALITY' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300' :
                    'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300'
                  }`}>
                    {badge.type === 'BEST_PRICE' && <DollarSign className="size-3 mr-1" />}
                    {badge.type === 'HIGH_QUALITY' && <Award className="size-3 mr-1" />}
                    {badge.type === 'FAST_DELIVERY' && <Zap className="size-3 mr-1" />}
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">Rs {bid.grandTotal.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground">incl. GST</p>
        </div>
      </div>
      
      <Separator className="my-3" />
      
      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
        <div>
          <p className="text-xs text-muted-foreground">Quality Score</p>
          <div className="flex items-center gap-2">
            <Progress value={bid.evaluation?.qualityScore || 0} className="h-2 flex-1" />
            <span className="font-medium text-foreground">{bid.evaluation?.qualityScore}/100</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Delivery</p>
          <p className="font-medium text-foreground flex items-center gap-1">
            <Timer className="size-3" />
            {bid.deliveryDays} days
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Overall Score</p>
          <p className="font-bold text-primary">{bid.evaluation?.overallScore.toFixed(1)}/100</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {bid.certifications.slice(0, 3).map((cert, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {cert.name}
            </Badge>
          ))}
          {bid.certifications.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{bid.certifications.length - 3} more
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={onViewDetails} className="bg-transparent">
          View Details
        </Button>
      </div>
    </Card>
  )
}

export default function ScopeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const scopeId = params.id as string
  
  const [selectedBids, setSelectedBids] = React.useState<string[]>([])
  const [showAssignDialog, setShowAssignDialog] = React.useState(false)
  const [selectedPM, setSelectedPM] = React.useState("")
  const [assignmentNotes, setAssignmentNotes] = React.useState("")
  const [isAssigning, setIsAssigning] = React.useState(false)
  const [expandedBid, setExpandedBid] = React.useState<string | null>(null)
  
  const scope = sampleScope
  const bids = sampleBids.sort((a, b) => (a.evaluation?.ranking || 99) - (b.evaluation?.ranking || 99))
  const recommendedBid = bids[0]
  
  const statusColors = SCOPE_STATUS_COLORS[scope.status]
  
  const handleSelectBid = (bidId: string) => {
    setSelectedBids(prev => 
      prev.includes(bidId) ? prev.filter(id => id !== bidId) : [...prev, bidId]
    )
  }
  
  const handleAssign = async () => {
    if (!selectedPM || selectedBids.length === 0) return
    
    setIsAssigning(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success(`${selectedBids.length} vendor(s) assigned to Project Manager!`)
    setShowAssignDialog(false)
    router.push('/procurement/scopes')
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
            className="mb-2 bg-transparent hover:bg-muted"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Scopes
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-mono text-muted-foreground">{scope.scopeNumber}</span>
                <Badge className={`${statusColors.bg} ${statusColors.text}`}>
                  {scope.status.replace('_', ' ')}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{scope.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{scope.projectName}</p>
            </div>
            
            {selectedBids.length > 0 && (
              <Button onClick={() => setShowAssignDialog(true)}>
                <Users className="size-4 mr-2" />
                Assign to PM ({selectedBids.length})
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="bids" className="w-full">
          <TabsList>
            <TabsTrigger value="bids">Bids ({bids.length})</TabsTrigger>
            <TabsTrigger value="details">Scope Details</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          
          {/* Bids Tab */}
          <TabsContent value="bids" className="space-y-4 mt-4">
            {/* Recommended Section */}
            {recommendedBid && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Trophy className="size-5 text-emerald-500" />
                  Recommended Vendor
                </h2>
                <BidCard
                  bid={recommendedBid}
                  isSelected={selectedBids.includes(recommendedBid.id)}
                  onSelect={() => handleSelectBid(recommendedBid.id)}
                  onViewDetails={() => setExpandedBid(expandedBid === recommendedBid.id ? null : recommendedBid.id)}
                  isRecommended={true}
                />
              </div>
            )}
            
            {/* All Bids */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">All Bids (Ranked)</h2>
              <div className="space-y-3">
                {bids.slice(1).map(bid => (
                  <BidCard
                    key={bid.id}
                    bid={bid}
                    isSelected={selectedBids.includes(bid.id)}
                    onSelect={() => handleSelectBid(bid.id)}
                    onViewDetails={() => setExpandedBid(expandedBid === bid.id ? null : bid.id)}
                    isRecommended={false}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4 mt-4">
            <Card className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Building2 className="size-4" />
                Project Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Project:</span>
                  <p className="font-medium text-foreground">{scope.projectName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Code:</span>
                  <p className="font-medium text-foreground">{scope.projectCode}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Site Address:</span>
                  <p className="font-medium text-foreground">{scope.siteAddress}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Package className="size-4" />
                Materials Required
              </h3>
              <div className="space-y-2">
                {scope.materials.map((m, i) => (
                  <div key={m.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{m.materialName}</p>
                      <p className="text-xs text-muted-foreground">{m.specification}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{m.quantity} {m.unit}</p>
                      {m.brandPreference && m.brandPreference.length > 0 && (
                        <p className="text-xs text-muted-foreground">Brands: {m.brandPreference.join(', ')}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Truck className="size-4" />
                Delivery Requirements
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Delivery Period:</span>
                  <p className="font-medium text-foreground">
                    {scope.deliveryRequirements.deliveryStartDate} to {scope.deliveryRequirements.deliveryEndDate}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Schedule:</span>
                  <p className="font-medium text-foreground capitalize">
                    {scope.deliveryRequirements.deliverySchedule.replace('_', ' ').toLowerCase()}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Location:</span>
                  <p className="font-medium text-foreground">{scope.deliveryRequirements.deliveryLocation}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Comparison Tab */}
          <TabsContent value="comparison" className="mt-4">
            <Card className="overflow-x-auto bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">Vendor</th>
                    <th className="text-right p-3 font-semibold text-foreground">Total Amount</th>
                    <th className="text-right p-3 font-semibold text-foreground">Quality Score</th>
                    <th className="text-right p-3 font-semibold text-foreground">Delivery</th>
                    <th className="text-right p-3 font-semibold text-foreground">Overall</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map((bid, idx) => (
                    <tr key={bid.id} className={`border-b border-border last:border-0 ${idx === 0 ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-muted-foreground">#{bid.evaluation?.ranking}</span>
                          <div>
                            <p className="font-medium text-foreground">{bid.vendorName}</p>
                            <p className="text-xs text-muted-foreground">{bid.vendorCode}</p>
                          </div>
                          {idx === 0 && (
                            <Badge className="bg-emerald-50 text-emerald-700 border-0 text-xs ml-2">Best</Badge>
                          )}
                        </div>
                      </td>
                      <td className="text-right p-3">
                        <p className="font-semibold text-foreground">Rs {bid.grandTotal.toLocaleString('en-IN')}</p>
                        {idx === 0 && <span className="text-xs text-emerald-600">Lowest</span>}
                      </td>
                      <td className="text-right p-3">
                        <p className="font-medium text-foreground">{bid.evaluation?.qualityScore}/100</p>
                        {bid.evaluation?.qualityScore === Math.max(...bids.map(b => b.evaluation?.qualityScore || 0)) && (
                          <span className="text-xs text-blue-600">Best</span>
                        )}
                      </td>
                      <td className="text-right p-3">
                        <p className="font-medium text-foreground">{bid.deliveryDays} days</p>
                        {bid.deliveryDays === Math.min(...bids.map(b => b.deliveryDays)) && (
                          <span className="text-xs text-amber-600">Fastest</span>
                        )}
                      </td>
                      <td className="text-right p-3">
                        <p className="font-bold text-primary">{bid.evaluation?.overallScore.toFixed(1)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Assignment Dialog */}
        <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Vendor(s) to Project Manager</DialogTitle>
              <DialogDescription>
                {selectedBids.length} vendor(s) will be assigned to the selected Project Manager
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <Label>Project Manager *</Label>
                <Select value={selectedPM} onValueChange={setSelectedPM}>
                  <SelectTrigger className="mt-1 bg-background">
                    <SelectValue placeholder="Select Project Manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectManagers.map(pm => (
                      <SelectItem key={pm.id} value={pm.id}>
                        {pm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Selected Vendors</Label>
                <div className="mt-2 space-y-2">
                  {selectedBids.map(bidId => {
                    const bid = bids.find(b => b.id === bidId)
                    return bid ? (
                      <div key={bidId} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                        <span className="font-medium text-foreground">{bid.vendorName}</span>
                        <span className="text-muted-foreground">Rs {bid.grandTotal.toLocaleString('en-IN')}</span>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
              
              <div>
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                  placeholder="Any special instructions..."
                  className="mt-1 bg-background"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAssignDialog(false)}
                disabled={isAssigning}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={handleAssign} disabled={!selectedPM || isAssigning}>
                {isAssigning ? 'Assigning...' : 'Confirm Assignment'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
