"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Package,
  Truck,
  Award,
  FileText,
  DollarSign,
  Calendar,
  Upload,
  AlertTriangle,
  Check,
  Info,
  Building2,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { toast } from "sonner"
import { PAYMENT_TERMS_OPTIONS, type ScopeMaterial } from "@/lib/procurement-types"

// Sample scope data
const sampleScope = {
  id: 'sow_1',
  scopeNumber: 'SOW-HYD-2026-0015',
  title: 'Steel Supply for Foundation Work',
  projectName: 'Gachibowli Villa Project',
  projectCode: 'PRJ-HYD-2026-0089',
  siteAddress: 'Plot 42, Gachibowli, Hyderabad',
  categoryName: 'Iron / Steel',
  description: 'TMT steel bars and binding wire for foundation construction. Required: Fe 500D grade TMT bars conforming to IS 1786.',
  materials: [
    { id: 'm1', materialName: 'TMT Steel Bars', specification: 'Fe 500D Grade', quantity: 5000, unit: 'KG', brandPreference: ['TATA', 'JSW', 'SAIL'] },
    { id: 'm2', materialName: 'Binding Wire', specification: '18 Gauge', quantity: 200, unit: 'KG' },
  ],
  qualityStandards: [
    { code: 'IS 1786', description: 'TMT bars shall conform to IS 1786', isMandatory: true },
    { code: 'BIS', description: 'BIS certification required', isMandatory: true },
    { code: 'MTC', description: 'Mill Test Certificate for each batch', isMandatory: true },
  ],
  deliveryRequirements: {
    startDate: '2026-01-28',
    endDate: '2026-02-12',
    schedule: 'Scheduled - Weekly deliveries',
    location: 'Plot 42, Gachibowli, Hyderabad',
    unloadingRequired: true,
    storageAvailable: true,
  },
  bidEndDate: '2026-01-25',
  daysLeft: 5,
}

interface LineItemQuote {
  materialId: string
  materialName: string
  requestedQty: number
  quotedQty: number
  unit: string
  unitPrice: number
  totalPrice: number
  brand: string
  specification: string
  remarks: string
}

interface CertificationEntry {
  id: string
  name: string
  certificateNumber: string
  issuedBy: string
  validUntil: string
  file?: File
}

export default function BidSubmissionPage() {
  const params = useParams()
  const router = useRouter()
  const scopeId = params.scopeId as string
  
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  // Line item quotes
  const [lineItems, setLineItems] = React.useState<LineItemQuote[]>(() =>
    sampleScope.materials.map(m => ({
      materialId: m.id,
      materialName: m.materialName,
      requestedQty: m.quantity,
      quotedQty: m.quantity,
      unit: m.unit,
      unitPrice: 0,
      totalPrice: 0,
      brand: '',
      specification: m.specification,
      remarks: '',
    }))
  )
  
  // Delivery commitment
  const [delivery, setDelivery] = React.useState({
    startDate: sampleScope.deliveryRequirements.startDate,
    endDate: sampleScope.deliveryRequirements.endDate,
    notes: '',
  })
  
  // Certifications
  const [certifications, setCertifications] = React.useState<CertificationEntry[]>([
    { id: 'cert_1', name: 'BIS Certification', certificateNumber: '', issuedBy: '', validUntil: '' },
    { id: 'cert_2', name: 'ISO 9001:2015', certificateNumber: '', issuedBy: '', validUntil: '' },
  ])
  
  // Terms
  const [terms, setTerms] = React.useState({
    paymentTerms: '',
    validityDays: 30,
    additionalTerms: '',
  })
  
  const updateLineItem = (id: string, updates: Partial<LineItemQuote>) => {
    setLineItems(prev => prev.map(item => {
      if (item.materialId === id) {
        const updated = { ...item, ...updates }
        updated.totalPrice = updated.quotedQty * updated.unitPrice
        return updated
      }
      return item
    }))
  }
  
  const addCertification = () => {
    setCertifications(prev => [...prev, {
      id: `cert_${Date.now()}`,
      name: '',
      certificateNumber: '',
      issuedBy: '',
      validUntil: '',
    }])
  }
  
  const updateCertification = (id: string, updates: Partial<CertificationEntry>) => {
    setCertifications(prev => prev.map(cert =>
      cert.id === id ? { ...cert, ...updates } : cert
    ))
  }
  
  const removeCertification = (id: string) => {
    if (certifications.length > 1) {
      setCertifications(prev => prev.filter(cert => cert.id !== id))
    }
  }
  
  // Calculate totals
  const totalAmount = lineItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const taxAmount = totalAmount * 0.18 // 18% GST
  const grandTotal = totalAmount + taxAmount
  
  // Validation
  const isFormValid = () => {
    const hasValidPricing = lineItems.every(item => item.unitPrice > 0 && item.brand)
    const hasValidDelivery = delivery.startDate && delivery.endDate
    const hasPaymentTerms = !!terms.paymentTerms
    return hasValidPricing && hasValidDelivery && hasPaymentTerms
  }
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Bid submitted successfully!')
    router.push('/vendor/invitations')
  }
  
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 max-w-4xl mx-auto pb-24">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-2 bg-transparent hover:bg-muted"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Invitations
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground">{sampleScope.scopeNumber}</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 text-xs">
                  {sampleScope.daysLeft} days left
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{sampleScope.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{sampleScope.projectName}</p>
            </div>
          </div>
        </div>
        
        {/* Warning Banner */}
        <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                You can only submit once
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Review all details carefully before submitting. Bids cannot be edited after submission.
              </p>
            </div>
          </div>
        </Card>
        
        {/* Scope Summary */}
        <Card className="p-4 bg-muted/50">
          <Accordion type="single" collapsible defaultValue="scope">
            <AccordionItem value="scope" className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Info className="size-4" />
                  <span className="font-semibold">Scope Requirements</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Building2 className="size-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Project</p>
                      <p className="font-medium text-foreground">{sampleScope.projectName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="size-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Delivery Location</p>
                      <p className="font-medium text-foreground">{sampleScope.deliveryRequirements.location}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Required Quality Standards:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleScope.qualityStandards.map((qs, idx) => (
                      <Badge key={idx} variant="secondary">{qs.code}</Badge>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-foreground">{sampleScope.description}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
        
        {/* Section 1: Pricing */}
        <Card className="p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="size-5" />
            Pricing
          </h2>
          
          <div className="space-y-4">
            {lineItems.map((item, index) => (
              <div key={item.materialId} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground">{item.materialName}</h3>
                    <p className="text-xs text-muted-foreground">{item.specification}</p>
                  </div>
                  <Badge variant="outline">Required: {item.requestedQty} {item.unit}</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs">Quoted Quantity *</Label>
                    <Input
                      type="number"
                      value={item.quotedQty || ''}
                      onChange={(e) => updateLineItem(item.materialId, { quotedQty: Number(e.target.value) })}
                      className="mt-1 bg-background"
                      max={item.requestedQty}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Unit Price (Rs) *</Label>
                    <Input
                      type="number"
                      value={item.unitPrice || ''}
                      onChange={(e) => updateLineItem(item.materialId, { unitPrice: Number(e.target.value) })}
                      placeholder="0.00"
                      className="mt-1 bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Brand Offered *</Label>
                    <Input
                      value={item.brand}
                      onChange={(e) => updateLineItem(item.materialId, { brand: e.target.value })}
                      placeholder="e.g., TATA Tiscon"
                      className="mt-1 bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Line Total</Label>
                    <div className="mt-1 h-9 px-3 py-2 bg-muted rounded-md text-sm font-medium text-foreground">
                      Rs {item.totalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Total Summary */}
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">Rs {totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-medium text-foreground">Rs {taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Grand Total</span>
                <span className="text-primary">Rs {grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Section 2: Delivery Commitment */}
        <Card className="p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Truck className="size-5" />
            Delivery Commitment
          </h2>
          
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Required:</strong> {sampleScope.deliveryRequirements.startDate} to {sampleScope.deliveryRequirements.endDate}
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">
                {sampleScope.deliveryRequirements.schedule}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Your Delivery Start Date *</Label>
                <Input
                  type="date"
                  value={delivery.startDate}
                  onChange={(e) => setDelivery(prev => ({ ...prev, startDate: e.target.value }))}
                  className="mt-1 bg-background"
                />
              </div>
              <div>
                <Label>Your Delivery End Date *</Label>
                <Input
                  type="date"
                  value={delivery.endDate}
                  onChange={(e) => setDelivery(prev => ({ ...prev, endDate: e.target.value }))}
                  className="mt-1 bg-background"
                />
              </div>
            </div>
            
            <div>
              <Label>Delivery Notes</Label>
              <Textarea
                value={delivery.notes}
                onChange={(e) => setDelivery(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any special delivery arrangements, partial deliveries, etc..."
                className="mt-1 bg-background"
              />
            </div>
          </div>
        </Card>
        
        {/* Section 3: Certifications */}
        <Card className="p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="size-5" />
            Certifications
          </h2>
          
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div key={cert.id} className="p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Certification Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                      placeholder="e.g., BIS Certification"
                      className="mt-1 bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Certificate Number</Label>
                    <Input
                      value={cert.certificateNumber}
                      onChange={(e) => updateCertification(cert.id, { certificateNumber: e.target.value })}
                      placeholder="e.g., BIS-2024-1234"
                      className="mt-1 bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Issued By</Label>
                    <Input
                      value={cert.issuedBy}
                      onChange={(e) => updateCertification(cert.id, { issuedBy: e.target.value })}
                      placeholder="e.g., Bureau of Indian Standards"
                      className="mt-1 bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Valid Until</Label>
                    <Input
                      type="date"
                      value={cert.validUntil}
                      onChange={(e) => updateCertification(cert.id, { validUntil: e.target.value })}
                      className="mt-1 bg-background"
                    />
                  </div>
                </div>
                {certifications.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(cert.id)}
                    className="mt-2 text-destructive bg-transparent hover:bg-destructive/10"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            
            <Button variant="outline" onClick={addCertification} className="w-full bg-transparent">
              + Add Another Certification
            </Button>
          </div>
        </Card>
        
        {/* Section 4: Terms */}
        <Card className="p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="size-5" />
            Payment Terms & Validity
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Payment Terms *</Label>
                <Select value={terms.paymentTerms} onValueChange={(v) => setTerms(prev => ({ ...prev, paymentTerms: v }))}>
                  <SelectTrigger className="mt-1 bg-background">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_TERMS_OPTIONS.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Quote Validity (Days)</Label>
                <Input
                  type="number"
                  value={terms.validityDays}
                  onChange={(e) => setTerms(prev => ({ ...prev, validityDays: Number(e.target.value) }))}
                  className="mt-1 bg-background"
                />
              </div>
            </div>
            
            <div>
              <Label>Additional Terms & Conditions</Label>
              <Textarea
                value={terms.additionalTerms}
                onChange={(e) => setTerms(prev => ({ ...prev, additionalTerms: e.target.value }))}
                placeholder="Any additional terms, conditions, or notes..."
                className="mt-1 bg-background"
              />
            </div>
          </div>
        </Card>
        
        {/* Submit Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 md:left-[var(--sidebar-width,280px)] bg-card border-t border-border p-4 z-40">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="text-sm">
              <p className="text-muted-foreground">Total Bid Amount</p>
              <p className="text-xl font-bold text-foreground">Rs {grandTotal.toLocaleString('en-IN')}</p>
            </div>
            <Button
              size="lg"
              onClick={() => setShowConfirmDialog(true)}
              disabled={!isFormValid()}
            >
              Submit Bid
            </Button>
          </div>
        </div>
        
        {/* Confirm Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Your Bid?</DialogTitle>
              <DialogDescription>
                You are about to submit your bid for {sampleScope.title}.
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 py-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-bold text-foreground">Rs {grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-foreground">{delivery.startDate} to {delivery.endDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Terms</span>
                <span className="text-foreground">{terms.paymentTerms}</span>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                disabled={isSubmitting}
                className="bg-transparent"
              >
                Review Again
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
