"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Share2,
  Calculator,
  Home,
  Layers,
  PlusCircle,
  IndianRupee,
  FileCheck,
  ChevronRight,
  Info,
  Star,
  Car,
  Droplets,
  Building2,
  Palette,
  Fence,
  DoorOpen,
  Sun,
  CloudRain,
  Sparkles,
  AlertCircle,
  MessageCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"

// Types
interface QuoteData {
  // Step 1: Project Details
  customerName: string
  customerPhone: string
  customerEmail: string
  projectType: string
  floors: string
  builtUpArea: number
  plotArea: number
  location: string
  city: string
  
  // Step 2: Specifications
  constructionPackage: "bronze" | "silver" | "gold"
  structureType: "rcc" | "load_bearing"
  elevationStyle: string
  parkingType: "covered" | "open" | "none"
  parkingArea: number
  waterTankType: "overhead" | "underground" | "both"
  waterTankCapacity: number
  
  // Step 3: Add-ons
  addOns: {
    compoundWall: { enabled: boolean; length: number }
    gate: { enabled: boolean; type: string }
    sump: { enabled: boolean; capacity: number }
    solarPanels: { enabled: boolean; capacity: number }
    rainwaterHarvesting: { enabled: boolean }
    interiorDesign: { enabled: boolean; package: string }
  }
  
  // Step 4: Pricing
  discount: number
  discountType: "percentage" | "amount"
  specialTerms: string
  paymentTerms: string
  validity: number
}

const steps = [
  { id: 1, name: "Project Details", icon: Home },
  { id: 2, name: "Specifications", icon: Layers },
  { id: 3, name: "Add-ons", icon: PlusCircle },
  { id: 4, name: "Pricing", icon: IndianRupee },
  { id: 5, name: "Review", icon: FileCheck },
]

const packages = [
  {
    id: "bronze",
    name: "Bronze",
    subtitle: "Standard Quality",
    description: "Basic fittings, standard materials",
    pricePerSqFt: 1850,
    features: ["Standard cement & steel", "Basic electrical fittings", "Ceramic tiles", "Standard paint"],
  },
  {
    id: "silver",
    name: "Silver",
    subtitle: "Premium Quality",
    description: "Branded fittings, quality materials",
    pricePerSqFt: 2100,
    popular: true,
    features: ["Branded cement & steel", "Modular electrical", "Vitrified tiles", "Premium paint"],
  },
  {
    id: "gold",
    name: "Gold",
    subtitle: "Luxury Quality",
    description: "Premium brands, superior finish",
    pricePerSqFt: 2450,
    features: ["Premium brands", "Smart electrical", "Italian marble", "Texture paint"],
  },
]

const elevationStyles = [
  { id: "modern", name: "Modern Contemporary" },
  { id: "traditional", name: "Traditional Indian" },
  { id: "minimalist", name: "Minimalist" },
  { id: "colonial", name: "Colonial" },
  { id: "mediterranean", name: "Mediterranean" },
]

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`
  }
  return `₹${amount.toLocaleString("en-IN")}`
}

export default function QuoteBuilderPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [showEMICalculator, setShowEMICalculator] = React.useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = React.useState(false)
  
  const [quoteData, setQuoteData] = React.useState<QuoteData>({
    customerName: "Rajesh Kumar",
    customerPhone: "9876543210",
    customerEmail: "rajesh@email.com",
    projectType: "G+2",
    floors: "3",
    builtUpArea: 3200,
    plotArea: 1600,
    location: "Kondapur",
    city: "Hyderabad",
    constructionPackage: "silver",
    structureType: "rcc",
    elevationStyle: "modern",
    parkingType: "covered",
    parkingArea: 200,
    waterTankType: "overhead",
    waterTankCapacity: 5000,
    addOns: {
      compoundWall: { enabled: false, length: 100 },
      gate: { enabled: false, type: "standard" },
      sump: { enabled: true, capacity: 10000 },
      solarPanels: { enabled: false, capacity: 5 },
      rainwaterHarvesting: { enabled: false },
      interiorDesign: { enabled: false, package: "basic" },
    },
    discount: 0,
    discountType: "percentage",
    specialTerms: "",
    paymentTerms: "standard",
    validity: 30,
  })

  // Calculate quote
  const calculateQuote = () => {
    const pkg = packages.find(p => p.id === quoteData.constructionPackage)
    const basePrice = quoteData.builtUpArea * (pkg?.pricePerSqFt || 0)
    
    let parkingCost = 0
    if (quoteData.parkingType === "covered") {
      parkingCost = quoteData.parkingArea * 900
    } else if (quoteData.parkingType === "open") {
      parkingCost = quoteData.parkingArea * 450
    }
    
    let waterTankCost = 0
    if (quoteData.waterTankType === "overhead") {
      waterTankCost = quoteData.waterTankCapacity <= 5000 ? 45000 : 65000
    } else if (quoteData.waterTankType === "underground") {
      waterTankCost = quoteData.waterTankCapacity <= 5000 ? 55000 : 85000
    } else {
      waterTankCost = 120000
    }
    
    let addOnsCost = 0
    if (quoteData.addOns.compoundWall.enabled) {
      addOnsCost += quoteData.addOns.compoundWall.length * 650
    }
    if (quoteData.addOns.gate.enabled) {
      addOnsCost += quoteData.addOns.gate.type === "premium" ? 75000 : 45000
    }
    if (quoteData.addOns.sump.enabled) {
      addOnsCost += quoteData.addOns.sump.capacity <= 5000 ? 55000 : 85000
    }
    if (quoteData.addOns.solarPanels.enabled) {
      addOnsCost += quoteData.addOns.solarPanels.capacity * 70000
    }
    if (quoteData.addOns.rainwaterHarvesting.enabled) {
      addOnsCost += 35000
    }
    if (quoteData.addOns.interiorDesign.enabled) {
      const interiorRates: Record<string, number> = { basic: 350, premium: 550, luxury: 850 }
      addOnsCost += quoteData.builtUpArea * (interiorRates[quoteData.addOns.interiorDesign.package] || 350)
    }
    
    const subtotal = basePrice + parkingCost + waterTankCost + addOnsCost
    
    let discountAmount = 0
    if (quoteData.discountType === "percentage") {
      discountAmount = (subtotal * quoteData.discount) / 100
    } else {
      discountAmount = quoteData.discount
    }
    
    const afterDiscount = subtotal - discountAmount
    const gst = afterDiscount * 0.18
    const total = afterDiscount + gst
    const emi = Math.round(total / 120) // 10 year EMI approximation
    
    return {
      basePrice,
      parkingCost,
      waterTankCost,
      addOnsCost,
      subtotal,
      discountAmount,
      afterDiscount,
      gst,
      total,
      emi,
      packageName: pkg?.name || "",
      pricePerSqFt: pkg?.pricePerSqFt || 0,
    }
  }

  const quote = calculateQuote()
  const quoteId = "WH-Q-HYD-2026-00456"

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (quoteData.discount > 5) {
      setShowApprovalDialog(true)
    } else {
      router.push("/sales/quotes")
    }
  }

  const updateQuoteData = (updates: Partial<QuoteData>) => {
    setQuoteData(prev => ({ ...prev, ...updates }))
  }

  const updateAddOn = (
    addon: keyof QuoteData["addOns"],
    updates: Partial<QuoteData["addOns"][typeof addon]>
  ) => {
    setQuoteData(prev => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [addon]: { ...prev.addOns[addon], ...updates },
      },
    }))
  }

  return (
    <DashboardLayout showFilters={false}>
      <div className="space-y-6 -m-6">
        {/* Custom Header with Step Progress */}
        <div className="sticky top-16 z-30 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/sales/quotes">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Create Quote</h1>
              <p className="text-sm text-muted-foreground">{quoteId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              Save Draft
            </Button>
          </div>
        </div>
        
        {/* Step Progress */}
        <div className="border-t bg-muted/30 px-6 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    currentStep === step.id
                        ? "bg-[hsl(var(--hover-bg))] text-foreground"
                      : currentStep > step.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex size-6 items-center justify-center rounded-full text-xs",
                    currentStep === step.id
                      ? "bg-primary-foreground/20"
                      : currentStep > step.id
                      ? "bg-primary/20"
                      : "bg-muted"
                  )}>
                    {currentStep > step.id ? (
                      <Check className="size-3.5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="hidden sm:inline">{step.name}</span>
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="size-4 text-muted-foreground hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Panel - Configuration */}
          <div className="flex-1 lg:pr-[420px]">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Customer Info Bar */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Customer:</span>{" "}
                    <span className="font-medium">{quoteData.customerName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Project:</span>{" "}
                    <span className="font-medium">{quoteData.projectType} Residential, {quoteData.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Built-up Area:</span>{" "}
                    <span className="font-medium">{quoteData.builtUpArea.toLocaleString()} sq ft</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="size-5 text-primary" />
                    Project Details
                  </CardTitle>
                  <CardDescription>
                    Enter the customer and project information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        value={quoteData.customerName}
                        onChange={(e) => updateQuoteData({ customerName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerPhone">Phone Number</Label>
                      <Input
                        id="customerPhone"
                        value={quoteData.customerPhone}
                        onChange={(e) => updateQuoteData({ customerPhone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="customerEmail">Email</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={quoteData.customerEmail}
                        onChange={(e) => updateQuoteData({ customerEmail: e.target.value })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select
                        value={quoteData.projectType}
                        onValueChange={(v) => updateQuoteData({ projectType: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="G">Ground Floor Only</SelectItem>
                          <SelectItem value="G+1">G+1 (2 Floors)</SelectItem>
                          <SelectItem value="G+2">G+2 (3 Floors)</SelectItem>
                          <SelectItem value="G+3">G+3 (4 Floors)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="builtUpArea">Built-up Area (sq ft)</Label>
                      <Input
                        id="builtUpArea"
                        type="number"
                        value={quoteData.builtUpArea}
                        onChange={(e) => updateQuoteData({ builtUpArea: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plotArea">Plot Area (sq ft)</Label>
                      <Input
                        id="plotArea"
                        type="number"
                        value={quoteData.plotArea}
                        onChange={(e) => updateQuoteData({ plotArea: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={quoteData.location}
                        onChange={(e) => updateQuoteData({ location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select
                        value={quoteData.city}
                        onValueChange={(v) => updateQuoteData({ city: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="Bangalore">Bangalore</SelectItem>
                          <SelectItem value="Chennai">Chennai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Specifications */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Construction Package */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="size-5 text-primary" />
                      Construction Package
                    </CardTitle>
                    <CardDescription>
                      Select the quality tier for your construction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={quoteData.constructionPackage}
                      onValueChange={(v) => updateQuoteData({ constructionPackage: v as "bronze" | "silver" | "gold" })}
                      className="space-y-3"
                    >
                      {packages.map((pkg) => (
                        <label
                          key={pkg.id}
                          className={cn(
                            "relative flex cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-primary/50",
                            quoteData.constructionPackage === pkg.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          )}
                        >
                          <RadioGroupItem value={pkg.id} className="sr-only" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">{pkg.name}</span>
                              <span className="text-sm text-muted-foreground">- {pkg.subtitle}</span>
                              {pkg.popular && (
                                <Badge className="bg-primary/10 text-primary border-0 text-xs">
                                  <Star className="size-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {pkg.features.map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs font-normal">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">₹{pkg.pricePerSqFt.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">per sq ft</p>
                          </div>
                          {quoteData.constructionPackage === pkg.id && (
                            <div className="absolute top-3 right-3">
                              <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                                <Check className="size-4 text-primary-foreground" />
                              </div>
                            </div>
                          )}
                        </label>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Structure & Style */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="size-5 text-primary" />
                      Structure & Style
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Building2 className="size-4" />
                        Structure Type
                      </Label>
                      <RadioGroup
                        value={quoteData.structureType}
                        onValueChange={(v) => updateQuoteData({ structureType: v as "rcc" | "load_bearing" })}
                        className="flex gap-4"
                      >
                        <label className={cn(
                          "flex-1 cursor-pointer rounded-lg border-2 p-4 text-center transition-all",
                          quoteData.structureType === "rcc" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}>
                          <RadioGroupItem value="rcc" className="sr-only" />
                          <p className="font-medium">RCC Frame</p>
                          <p className="text-xs text-muted-foreground">Recommended for G+1 and above</p>
                        </label>
                        <label className={cn(
                          "flex-1 cursor-pointer rounded-lg border-2 p-4 text-center transition-all",
                          quoteData.structureType === "load_bearing" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}>
                          <RadioGroupItem value="load_bearing" className="sr-only" />
                          <p className="font-medium">Load Bearing</p>
                          <p className="text-xs text-muted-foreground">Suitable for ground floor</p>
                        </label>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Palette className="size-4" />
                        Elevation Style
                      </Label>
                      <div className="flex gap-3">
                        <Select
                          value={quoteData.elevationStyle}
                          onValueChange={(v) => updateQuoteData({ elevationStyle: v })}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {elevationStyles.map((style) => (
                              <SelectItem key={style.id} value={style.id}>
                                {style.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="outline" className="bg-transparent">
                          View Examples
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Parking & Water Tank */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="size-5 text-primary" />
                      Parking & Utilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Parking Type</Label>
                      <RadioGroup
                        value={quoteData.parkingType}
                        onValueChange={(v) => updateQuoteData({ parkingType: v as "covered" | "open" | "none" })}
                        className="flex gap-4"
                      >
                        {[
                          { value: "covered", label: "Covered", price: "₹900/sq ft" },
                          { value: "open", label: "Open", price: "₹450/sq ft" },
                          { value: "none", label: "None", price: "₹0" },
                        ].map((option) => (
                          <label key={option.value} className={cn(
                            "flex-1 cursor-pointer rounded-lg border-2 p-3 text-center transition-all",
                            quoteData.parkingType === option.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          )}>
                            <RadioGroupItem value={option.value} className="sr-only" />
                            <p className="font-medium">{option.label}</p>
                            <p className="text-xs text-muted-foreground">{option.price}</p>
                          </label>
                        ))}
                      </RadioGroup>
                      {quoteData.parkingType !== "none" && (
                        <div className="flex items-center gap-3 mt-3">
                          <Label htmlFor="parkingArea" className="whitespace-nowrap">Area:</Label>
                          <Input
                            id="parkingArea"
                            type="number"
                            value={quoteData.parkingArea}
                            onChange={(e) => updateQuoteData({ parkingArea: Number(e.target.value) })}
                            className="w-32"
                          />
                          <span className="text-sm text-muted-foreground">sq ft</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Droplets className="size-4" />
                        Water Tank
                      </Label>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Select
                          value={quoteData.waterTankType}
                          onValueChange={(v) => updateQuoteData({ waterTankType: v as "overhead" | "underground" | "both" })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="overhead">Overhead Tank</SelectItem>
                            <SelectItem value="underground">Underground Tank</SelectItem>
                            <SelectItem value="both">Both (OH + UG)</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={String(quoteData.waterTankCapacity)}
                          onValueChange={(v) => updateQuoteData({ waterTankCapacity: Number(v) })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3000">3,000 Litres</SelectItem>
                            <SelectItem value="5000">5,000 Litres</SelectItem>
                            <SelectItem value="7500">7,500 Litres</SelectItem>
                            <SelectItem value="10000">10,000 Litres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Add-ons */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="size-5 text-primary" />
                    Available Add-ons
                  </CardTitle>
                  <CardDescription>
                    Select additional features for the project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Compound Wall */}
                  <div className={cn(
                    "flex items-start gap-4 rounded-xl border-2 p-4 transition-all",
                    quoteData.addOns.compoundWall.enabled ? "border-primary bg-primary/5" : "border-border"
                  )}>
                    <Checkbox
                      checked={quoteData.addOns.compoundWall.enabled}
                      onCheckedChange={(checked) => updateAddOn("compoundWall", { enabled: !!checked })}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Fence className="size-4 text-muted-foreground" />
                        <span className="font-medium">Compound Wall</span>
                        <span className="text-sm text-muted-foreground">₹650/rft</span>
                      </div>
                      {quoteData.addOns.compoundWall.enabled && (
                        <div className="flex items-center gap-3 mt-3">
                          <Label className="text-sm">Length:</Label>
                          <Input
                            type="number"
                            value={quoteData.addOns.compoundWall.length}
                            onChange={(e) => updateAddOn("compoundWall", { length: Number(e.target.value) })}
                            className="w-24 h-8"
                          />
                          <span className="text-sm text-muted-foreground">rft</span>
                          <span className="text-sm font-medium ml-auto">
                            = {formatCurrency(quoteData.addOns.compoundWall.length * 650)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gate */}
                  <div className={cn(
                    "flex items-start gap-4 rounded-xl border-2 p-4 transition-all",
                    quoteData.addOns.gate.enabled ? "border-primary bg-primary/5" : "border-border"
                  )}>
                    <Checkbox
                      checked={quoteData.addOns.gate.enabled}
                      onCheckedChange={(checked) => updateAddOn("gate", { enabled: !!checked })}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <DoorOpen className="size-4 text-muted-foreground" />
                        <span className="font-medium">Main Gate (MS)</span>
                      </div>
                      {quoteData.addOns.gate.enabled && (
                        <div className="flex items-center gap-3 mt-3">
                          <Select
                            value={quoteData.addOns.gate.type}
                            onValueChange={(v) => updateAddOn("gate", { type: v })}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm font-medium ml-auto">
                            = {formatCurrency(quoteData.addOns.gate.type === "premium" ? 75000 : 45000)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sump */}
                  <div className={cn(
                    "flex items-start gap-4 rounded-xl border-2 p-4 transition-all",
                    quoteData.addOns.sump.enabled ? "border-primary bg-primary/5" : "border-border"
                  )}>
                    <Checkbox
                      checked={quoteData.addOns.sump.enabled}
                      onCheckedChange={(checked) => updateAddOn("sump", { enabled: !!checked })}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Droplets className="size-4 text-muted-foreground" />
                        <span className="font-medium">Sump (Underground Tank)</span>
                      </div>
                      {quoteData.addOns.sump.enabled && (
                        <div className="flex items-center gap-3 mt-3">
                          <Select
                            value={String(quoteData.addOns.sump.capacity)}
                            onValueChange={(v) => updateAddOn("sump", { capacity: Number(v) })}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5000">5,000 L</SelectItem>
                              <SelectItem value="10000">10,000 L</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm font-medium ml-auto">
                            = {formatCurrency(quoteData.addOns.sump.capacity <= 5000 ? 55000 : 85000)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Solar Panels */}
                  <div className={cn(
                    "flex items-start gap-4 rounded-xl border-2 p-4 transition-all",
                    quoteData.addOns.solarPanels.enabled ? "border-primary bg-primary/5" : "border-border"
                  )}>
                    <Checkbox
                      checked={quoteData.addOns.solarPanels.enabled}
                      onCheckedChange={(checked) => updateAddOn("solarPanels", { enabled: !!checked })}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sun className="size-4 text-muted-foreground" />
                        <span className="font-medium">Solar Panels</span>
                        <span className="text-sm text-muted-foreground">₹70,000/KW</span>
                      </div>
                      {quoteData.addOns.solarPanels.enabled && (
                        <div className="flex items-center gap-3 mt-3">
                          <Select
                            value={String(quoteData.addOns.solarPanels.capacity)}
                            onValueChange={(v) => updateAddOn("solarPanels", { capacity: Number(v) })}
                          >
                            <SelectTrigger className="w-24 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 KW</SelectItem>
                              <SelectItem value="5">5 KW</SelectItem>
                              <SelectItem value="7">7 KW</SelectItem>
                              <SelectItem value="10">10 KW</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm font-medium ml-auto">
                            = {formatCurrency(quoteData.addOns.solarPanels.capacity * 70000)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rainwater Harvesting */}
                  <div className={cn(
                    "flex items-start gap-4 rounded-xl border-2 p-4 transition-all",
                    quoteData.addOns.rainwaterHarvesting.enabled ? "border-primary bg-primary/5" : "border-border"
                  )}>
                    <Checkbox
                      checked={quoteData.addOns.rainwaterHarvesting.enabled}
                      onCheckedChange={(checked) => updateAddOn("rainwaterHarvesting", { enabled: !!checked })}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CloudRain className="size-4 text-muted-foreground" />
                          <span className="font-medium">Rainwater Harvesting</span>
                        </div>
                        <span className="text-sm font-medium">₹35,000</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Standard installation with recharge pit</p>
                    </div>
                  </div>

                  {/* Interior Design */}
                  <div className={cn(
                    "flex items-start gap-4 rounded-xl border-2 p-4 transition-all",
                    quoteData.addOns.interiorDesign.enabled ? "border-primary bg-primary/5" : "border-border"
                  )}>
                    <Checkbox
                      checked={quoteData.addOns.interiorDesign.enabled}
                      onCheckedChange={(checked) => updateAddOn("interiorDesign", { enabled: !!checked })}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="size-4 text-muted-foreground" />
                        <span className="font-medium">Interior Design Package</span>
                      </div>
                      {quoteData.addOns.interiorDesign.enabled && (
                        <div className="flex items-center gap-3 mt-3">
                          <Select
                            value={quoteData.addOns.interiorDesign.package}
                            onValueChange={(v) => updateAddOn("interiorDesign", { package: v })}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic - ₹350/sqft</SelectItem>
                              <SelectItem value="premium">Premium - ₹550/sqft</SelectItem>
                              <SelectItem value="luxury">Luxury - ₹850/sqft</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="link" size="sm" className="text-primary">
                            View Options
                          </Button>
                          <span className="text-sm font-medium ml-auto">
                            = {formatCurrency(
                              quoteData.builtUpArea * 
                              ({ basic: 350, premium: 550, luxury: 850 }[quoteData.addOns.interiorDesign.package] || 350)
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Pricing */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="size-5 text-primary" />
                      Pricing & Discount
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Discount</Label>
                      <div className="flex gap-3">
                        <Select
                          value={quoteData.discountType}
                          onValueChange={(v) => updateQuoteData({ discountType: v as "percentage" | "amount" })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage</SelectItem>
                            <SelectItem value="amount">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={quoteData.discount}
                          onChange={(e) => updateQuoteData({ discount: Number(e.target.value) })}
                          className="w-32"
                        />
                        <span className="self-center text-muted-foreground">
                          {quoteData.discountType === "percentage" ? "%" : "₹"}
                        </span>
                      </div>
                      {quoteData.discount > 5 && quoteData.discountType === "percentage" && (
                        <div className="flex items-center gap-2 text-amber-600 text-sm">
                          <AlertCircle className="size-4" />
                          Discounts above 5% require Sales Manager approval
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label>Payment Terms</Label>
                      <Select
                        value={quoteData.paymentTerms}
                        onValueChange={(v) => updateQuoteData({ paymentTerms: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (10-40-40-10)</SelectItem>
                          <SelectItem value="milestone">Milestone Based</SelectItem>
                          <SelectItem value="custom">Custom Terms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Quote Validity</Label>
                      <Select
                        value={String(quoteData.validity)}
                        onValueChange={(v) => updateQuoteData({ validity: Number(v) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 Days</SelectItem>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="45">45 Days</SelectItem>
                          <SelectItem value="60">60 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Special Terms & Conditions</Label>
                      <Textarea
                        placeholder="Enter any special terms or notes..."
                        value={quoteData.specialTerms}
                        onChange={(e) => updateQuoteData({ specialTerms: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="size-5 text-primary" />
                      Review Quote
                    </CardTitle>
                    <CardDescription>
                      Please review all details before generating the quote
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Customer Details */}
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-3">Customer Details</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name</span>
                          <span>{quoteData.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone</span>
                          <span>{quoteData.customerPhone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email</span>
                          <span>{quoteData.customerEmail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-3">Project Details</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Project Type</span>
                          <span>{quoteData.projectType} Residential</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location</span>
                          <span>{quoteData.location}, {quoteData.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Built-up Area</span>
                          <span>{quoteData.builtUpArea.toLocaleString()} sq ft</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Package</span>
                          <span className="font-medium">{quote.packageName} (₹{quote.pricePerSqFt}/sqft)</span>
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium mb-3">Specifications</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Structure Type</span>
                          <span>{quoteData.structureType === "rcc" ? "RCC Frame" : "Load Bearing"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Elevation Style</span>
                          <span>{elevationStyles.find(s => s.id === quoteData.elevationStyle)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Parking</span>
                          <span>{quoteData.parkingType !== "none" ? `${quoteData.parkingType} (${quoteData.parkingArea} sqft)` : "None"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Water Tank</span>
                          <span>{quoteData.waterTankType} ({quoteData.waterTankCapacity}L)</span>
                        </div>
                      </div>
                    </div>

                    {/* Selected Add-ons */}
                    {Object.entries(quoteData.addOns).some(([, v]) => v.enabled) && (
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium mb-3">Selected Add-ons</h4>
                        <div className="space-y-2 text-sm">
                          {quoteData.addOns.compoundWall.enabled && (
                            <div className="flex justify-between">
                              <span>Compound Wall ({quoteData.addOns.compoundWall.length} rft)</span>
                              <span>{formatCurrency(quoteData.addOns.compoundWall.length * 650)}</span>
                            </div>
                          )}
                          {quoteData.addOns.gate.enabled && (
                            <div className="flex justify-between">
                              <span>Gate ({quoteData.addOns.gate.type})</span>
                              <span>{formatCurrency(quoteData.addOns.gate.type === "premium" ? 75000 : 45000)}</span>
                            </div>
                          )}
                          {quoteData.addOns.sump.enabled && (
                            <div className="flex justify-between">
                              <span>Sump ({quoteData.addOns.sump.capacity}L)</span>
                              <span>{formatCurrency(quoteData.addOns.sump.capacity <= 5000 ? 55000 : 85000)}</span>
                            </div>
                          )}
                          {quoteData.addOns.solarPanels.enabled && (
                            <div className="flex justify-between">
                              <span>Solar Panels ({quoteData.addOns.solarPanels.capacity} KW)</span>
                              <span>{formatCurrency(quoteData.addOns.solarPanels.capacity * 70000)}</span>
                            </div>
                          )}
                          {quoteData.addOns.rainwaterHarvesting.enabled && (
                            <div className="flex justify-between">
                              <span>Rainwater Harvesting</span>
                              <span>₹35,000</span>
                            </div>
                          )}
                          {quoteData.addOns.interiorDesign.enabled && (
                            <div className="flex justify-between">
                              <span>Interior Design ({quoteData.addOns.interiorDesign.package})</span>
                              <span>{formatCurrency(
                                quoteData.builtUpArea * 
                                ({ basic: 350, premium: 550, luxury: 850 }[quoteData.addOns.interiorDesign.package] || 350)
                              )}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="bg-transparent"
              >
                <ArrowLeft className="size-4 mr-2" />
                Back
              </Button>
              {currentStep < 5 ? (
                <Button onClick={handleNext}>
                  Next: {steps[currentStep]?.name}
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <FileCheck className="size-4 mr-2" />
                  Generate Quote
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview (Fixed) */}
        <div className="hidden lg:block fixed right-0 top-[9.5rem] bottom-0 w-[400px] border-l bg-muted/30 overflow-y-auto">
          <div className="p-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Quote Preview</CardTitle>
                  <Badge variant="outline">{quoteId}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="font-medium">{quoteData.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {quoteData.projectType}, {quoteData.builtUpArea.toLocaleString()} sq ft, {quoteData.location}
                  </p>
                </div>

                <Separator />

                {/* Line Items */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">Base Construction</p>
                      <p className="text-xs text-muted-foreground">
                        {quoteData.builtUpArea.toLocaleString()} sq ft × ₹{quote.pricePerSqFt.toLocaleString()}
                      </p>
                    </div>
                    <span className="font-medium">{formatCurrency(quote.basePrice)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">Structure ({quoteData.structureType === "rcc" ? "RCC Frame" : "Load Bearing"})</p>
                    </div>
                    <span className="text-muted-foreground">Included</span>
                  </div>

                  {quoteData.parkingType !== "none" && (
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">Parking ({quoteData.parkingType})</p>
                        <p className="text-xs text-muted-foreground">{quoteData.parkingArea} sq ft</p>
                      </div>
                      <span className="font-medium">{formatCurrency(quote.parkingCost)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">Water Tank ({quoteData.waterTankCapacity}L {quoteData.waterTankType})</p>
                    </div>
                    <span className="font-medium">{formatCurrency(quote.waterTankCost)}</span>
                  </div>

                  {quote.addOnsCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">Add-ons</p>
                        <p className="text-xs text-muted-foreground">
                          {Object.entries(quoteData.addOns).filter(([, v]) => v.enabled).length} items
                        </p>
                      </div>
                      <span className="font-medium">{formatCurrency(quote.addOnsCost)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(quote.subtotal)}</span>
                  </div>
                  
                  {quote.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({quoteData.discountType === "percentage" ? `${quoteData.discount}%` : "Fixed"})</span>
                      <span>-{formatCurrency(quote.discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>{formatCurrency(quote.gst)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Estimate</span>
                    <span className="text-primary">{formatCurrency(quote.total)}</span>
                  </div>
                </div>

                {/* EMI */}
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">EMI Options from</p>
                      <p className="text-lg font-bold text-primary">₹{quote.emi.toLocaleString()}/month</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEMICalculator(true)}
                      className="bg-transparent"
                    >
                      <Calculator className="size-4 mr-1" />
                      Calculate
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Download className="size-4 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent text-green-600 border-green-200 hover:bg-green-50">
                    <MessageCircle className="size-4 mr-1" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Approval Notice */}
            {quoteData.discount > 5 && quoteData.discountType === "percentage" && (
              <Card className="mt-4 border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">Approval Required</p>
                      <p className="text-sm text-amber-700">
                        Discount of {quoteData.discount}% exceeds the 5% threshold. This quote will require Sales Manager approval.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* EMI Calculator Dialog */}
      <Dialog open={showEMICalculator} onOpenChange={setShowEMICalculator}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>EMI Calculator</DialogTitle>
            <DialogDescription>
              Calculate monthly EMI for the quote amount
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Loan Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(quote.total)}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Interest Rate (%)</Label>
                <Input type="number" defaultValue={9.5} />
              </div>
              <div className="space-y-2">
                <Label>Tenure (Years)</Label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="7">7 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 text-center">
              <p className="text-sm text-muted-foreground">Estimated EMI</p>
              <p className="text-3xl font-bold text-primary">₹{quote.emi.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">per month for 10 years</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEMICalculator(false)} className="bg-transparent">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Approval</DialogTitle>
            <DialogDescription>
              This quote requires Sales Manager approval due to the discount amount.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="size-5 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800">Discount exceeds limit</p>
                  <p className="text-sm text-amber-700">
                    Requested discount: {quoteData.discount}% (Limit: 5%)
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason for discount</Label>
              <Textarea placeholder="Explain why this discount is needed..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Select Approver</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m1">Suresh Reddy (Sales Manager)</SelectItem>
                  <SelectItem value="m2">Anita Sharma (Regional Head)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={() => router.push("/sales/quotes")}>
              Submit for Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </DashboardLayout>
  )
}
