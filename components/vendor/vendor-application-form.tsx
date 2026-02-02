"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import {
  Building2,
  User,
  Package,
  Landmark,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  Upload,
  X,
  AlertCircle,
  Check,
  Loader2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import {
  type VendorApplication,
  type SupplyCategory,
  SUPPLY_CATEGORIES,
  COMPANY_TYPES,
  INDIAN_STATES,
  createEmptyApplication,
} from "@/lib/vendor-types"

interface VendorApplicationFormProps {
  initialData?: Partial<VendorApplication>
  onSave?: (data: Partial<VendorApplication>) => void
  onSubmit?: (data: Partial<VendorApplication>) => void
}

const STEPS = [
  { id: 1, title: "Company Info", icon: Building2, description: "Business details" },
  { id: 2, title: "Contact", icon: User, description: "Contact information" },
  { id: 3, title: "Categories", icon: Package, description: "Supply categories" },
  { id: 4, title: "Bank Details", icon: Landmark, description: "Payment info" },
  { id: 5, title: "Documents", icon: FileText, description: "Upload documents" },
  { id: 6, title: "Review", icon: CheckCircle2, description: "Review & submit" },
]

export function VendorApplicationForm({ initialData, onSave, onSubmit }: VendorApplicationFormProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [sameAsRegistered, setSameAsRegistered] = React.useState(true)
  
  const [formData, setFormData] = React.useState<Partial<VendorApplication>>(
    initialData || createEmptyApplication("hyderabad", "Hyderabad")
  )

  // Auto-save draft every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (formData.status === "draft") {
        handleSaveDraft(true)
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [formData])

  const updateFormData = (path: string, value: unknown) => {
    setFormData((prev) => {
      const keys = path.split(".")
      const newData = { ...prev }
      let current: Record<string, unknown> = newData as Record<string, unknown>
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) }
        current = current[keys[i]] as Record<string, unknown>
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const handleSaveDraft = async (silent = false) => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    
    if (!silent) {
      toast({
        title: "Draft Saved",
        description: "Your application has been saved as draft.",
      })
    }
    
    onSave?.(formData)
  }

  const handleSubmit = async () => {
    // Validate all steps
    const errors = validateAllSteps()
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors[0],
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    
    toast({
      title: "Application Submitted",
      description: "Your vendor application has been submitted for review.",
    })
    
    onSubmit?.({ ...formData, status: "submitted" })
  }

  const validateAllSteps = (): string[] => {
    const errors: string[] = []
    
    // Step 1: Company Info
    if (!formData.companyInfo?.name) errors.push("Company name is required")
    if (!formData.companyInfo?.gstin) errors.push("GSTIN is required")
    if (!formData.companyInfo?.pan) errors.push("PAN is required")
    
    // Step 2: Contact Info
    if (!formData.contactInfo?.primaryContact?.name) errors.push("Primary contact name is required")
    if (!formData.contactInfo?.primaryContact?.phone) errors.push("Primary contact phone is required")
    if (!formData.contactInfo?.primaryContact?.email) errors.push("Primary contact email is required")
    
    // Step 3: Categories
    if (!formData.supplyCategories || formData.supplyCategories.length === 0) {
      errors.push("At least one supply category is required")
    }
    
    // Step 4: Bank Details
    if (!formData.bankDetails?.accountNumber) errors.push("Bank account number is required")
    if (!formData.bankDetails?.ifscCode) errors.push("IFSC code is required")
    
    // Step 5: Documents
    if (!formData.documents?.gstCertificate) errors.push("GST Certificate is required")
    if (!formData.documents?.panCard) errors.push("PAN Card is required")
    
    return errors
  }

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.companyInfo?.name && formData.companyInfo?.gstin && formData.companyInfo?.pan)
      case 2:
        return !!(formData.contactInfo?.primaryContact?.name && formData.contactInfo?.primaryContact?.phone && formData.contactInfo?.primaryContact?.email)
      case 3:
        return (formData.supplyCategories?.length || 0) > 0
      case 4:
        return !!(formData.bankDetails?.accountNumber && formData.bankDetails?.ifscCode)
      case 5:
        return !!(formData.documents?.gstCertificate && formData.documents?.panCard)
      default:
        return true
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <FormProgress steps={STEPS} currentStep={currentStep} />
      
      {/* Step Content */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            {React.createElement(STEPS[currentStep - 1].icon, { className: "size-6 text-primary" })}
            <div>
              <CardTitle className="text-lg">{STEPS[currentStep - 1].title}</CardTitle>
              <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <CompanyInfoStep 
              data={formData.companyInfo} 
              onChange={(data) => updateFormData("companyInfo", data)}
              sameAsRegistered={sameAsRegistered}
              setSameAsRegistered={setSameAsRegistered}
            />
          )}
          {currentStep === 2 && (
            <ContactInfoStep 
              data={formData.contactInfo} 
              onChange={(data) => updateFormData("contactInfo", data)} 
            />
          )}
          {currentStep === 3 && (
            <CategorySelectionStep 
              selectedCategories={formData.supplyCategories || []} 
              onChange={(categories) => updateFormData("supplyCategories", categories)} 
            />
          )}
          {currentStep === 4 && (
            <BankDetailsStep 
              data={formData.bankDetails} 
              onChange={(data) => updateFormData("bankDetails", data)} 
            />
          )}
          {currentStep === 5 && (
            <DocumentUploadStep 
              documents={formData.documents || {}} 
              onChange={(docs) => updateFormData("documents", docs)} 
            />
          )}
          {currentStep === 6 && (
            <ReviewStep data={formData} onEdit={setCurrentStep} />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="bg-transparent"
          >
            <ChevronLeft className="size-4 mr-1" />
            Previous
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSaveDraft(false)}
            disabled={isSaving}
            className="bg-transparent"
          >
            {isSaving ? (
              <Loader2 className="size-4 mr-1.5 animate-spin" />
            ) : (
              <Save className="size-4 mr-1.5" />
            )}
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          
          {currentStep < 6 ? (
            <Button
              onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="size-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="size-4 mr-1.5 animate-spin" />
              ) : (
                <Send className="size-4 mr-1.5" />
              )}
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Progress Indicator Component
function FormProgress({ steps, currentStep }: { steps: typeof STEPS; currentStep: number }) {
  return (
    <div className="relative">
      {/* Desktop Progress */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  currentStep > step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "border-primary text-primary bg-primary/10"
                    : "border-muted-foreground/30 text-muted-foreground bg-muted"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="size-5" />
                ) : (
                  <step.icon className="size-5" />
                )}
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-sm font-medium",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mx-2",
                currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
          <span className="text-sm text-muted-foreground">{steps[currentStep - 1].title}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Step 1: Company Info
function CompanyInfoStep({ 
  data, 
  onChange,
  sameAsRegistered,
  setSameAsRegistered,
}: { 
  data?: VendorApplication["companyInfo"]
  onChange: (data: VendorApplication["companyInfo"]) => void
  sameAsRegistered: boolean
  setSameAsRegistered: (value: boolean) => void
}) {
  const updateField = (field: string, value: unknown) => {
    onChange({ ...data, [field]: value } as VendorApplication["companyInfo"])
  }

  const updateAddress = (type: "registeredAddress" | "operationalAddress", field: string, value: string) => {
    const addressKey = type
    const currentAddress = data?.[addressKey] || { line1: "", city: "", state: "", pincode: "" }
    onChange({ 
      ...data, 
      [addressKey]: { ...currentAddress, [field]: value } 
    } as VendorApplication["companyInfo"])
  }

  return (
    <div className="space-y-6">
      {/* Company Details */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            placeholder="Enter company name"
            value={data?.name || ""}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="legalName">Legal Name</Label>
          <Input
            id="legalName"
            placeholder="As per registration"
            value={data?.legalName || ""}
            onChange={(e) => updateField("legalName", e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="companyType">Company Type *</Label>
          <Select value={data?.type || ""} onValueChange={(value) => updateField("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gstin">GSTIN *</Label>
          <Input
            id="gstin"
            placeholder="15-character GSTIN"
            value={data?.gstin || ""}
            onChange={(e) => updateField("gstin", e.target.value.toUpperCase())}
            maxLength={15}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pan">PAN *</Label>
          <Input
            id="pan"
            placeholder="10-character PAN"
            value={data?.pan || ""}
            onChange={(e) => updateField("pan", e.target.value.toUpperCase())}
            maxLength={10}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="incorporationDate">Incorporation Date</Label>
        <Input
          id="incorporationDate"
          type="date"
          value={data?.incorporationDate || ""}
          onChange={(e) => updateField("incorporationDate", e.target.value)}
          className="w-full md:w-48"
        />
      </div>

      <Separator />

      {/* Registered Address */}
      <div>
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <MapPin className="size-4" />
          Registered Address
        </h4>
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Address Line 1 *</Label>
              <Input
                placeholder="Building, Street"
                value={data?.registeredAddress?.line1 || ""}
                onChange={(e) => updateAddress("registeredAddress", "line1", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Address Line 2</Label>
              <Input
                placeholder="Area, Landmark"
                value={data?.registeredAddress?.line2 || ""}
                onChange={(e) => updateAddress("registeredAddress", "line2", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>City *</Label>
              <Input
                placeholder="City"
                value={data?.registeredAddress?.city || ""}
                onChange={(e) => updateAddress("registeredAddress", "city", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>State *</Label>
              <Select 
                value={data?.registeredAddress?.state || ""} 
                onValueChange={(value) => updateAddress("registeredAddress", "state", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pincode *</Label>
              <Input
                placeholder="6-digit pincode"
                value={data?.registeredAddress?.pincode || ""}
                onChange={(e) => updateAddress("registeredAddress", "pincode", e.target.value)}
                maxLength={6}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Operational Address */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium flex items-center gap-2">
            <MapPin className="size-4" />
            Operational Address
          </h4>
          <div className="flex items-center gap-2">
            <Checkbox
              id="sameAddress"
              checked={sameAsRegistered}
              onCheckedChange={(checked) => setSameAsRegistered(checked === true)}
            />
            <Label htmlFor="sameAddress" className="text-sm cursor-pointer">
              Same as registered address
            </Label>
          </div>
        </div>
        
        {!sameAsRegistered && (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Address Line 1</Label>
                <Input
                  placeholder="Building, Street"
                  value={data?.operationalAddress?.line1 || ""}
                  onChange={(e) => updateAddress("operationalAddress", "line1", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Address Line 2</Label>
                <Input
                  placeholder="Area, Landmark"
                  value={data?.operationalAddress?.line2 || ""}
                  onChange={(e) => updateAddress("operationalAddress", "line2", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  placeholder="City"
                  value={data?.operationalAddress?.city || ""}
                  onChange={(e) => updateAddress("operationalAddress", "city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Select 
                  value={data?.operationalAddress?.state || ""} 
                  onValueChange={(value) => updateAddress("operationalAddress", "state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pincode</Label>
                <Input
                  placeholder="6-digit pincode"
                  value={data?.operationalAddress?.pincode || ""}
                  onChange={(e) => updateAddress("operationalAddress", "pincode", e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Step 2: Contact Info
function ContactInfoStep({ 
  data, 
  onChange 
}: { 
  data?: VendorApplication["contactInfo"]
  onChange: (data: VendorApplication["contactInfo"]) => void 
}) {
  const updatePrimaryContact = (field: string, value: string) => {
    onChange({
      ...data,
      primaryContact: { ...data?.primaryContact, [field]: value } as VendorApplication["contactInfo"]["primaryContact"],
    })
  }

  const updateAlternateContact = (field: string, value: string) => {
    onChange({
      ...data,
      alternateContact: { ...data?.alternateContact, [field]: value } as VendorApplication["contactInfo"]["alternateContact"],
    })
  }

  return (
    <div className="space-y-6">
      {/* Primary Contact */}
      <div>
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <User className="size-4" />
          Primary Contact *
        </h4>
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                placeholder="Contact person name"
                value={data?.primaryContact?.name || ""}
                onChange={(e) => updatePrimaryContact("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Designation *</Label>
              <Input
                placeholder="e.g., Director, Manager"
                value={data?.primaryContact?.designation || ""}
                onChange={(e) => updatePrimaryContact("designation", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Phone className="size-3.5" />
                Phone *
              </Label>
              <Input
                placeholder="10-digit mobile"
                value={data?.primaryContact?.phone || ""}
                onChange={(e) => updatePrimaryContact("phone", e.target.value)}
                maxLength={10}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Mail className="size-3.5" />
                Email *
              </Label>
              <Input
                type="email"
                placeholder="email@company.com"
                value={data?.primaryContact?.email || ""}
                onChange={(e) => updatePrimaryContact("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp (if different)</Label>
              <Input
                placeholder="10-digit mobile"
                value={data?.primaryContact?.whatsapp || ""}
                onChange={(e) => updatePrimaryContact("whatsapp", e.target.value)}
                maxLength={10}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Alternate Contact */}
      <div>
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <User className="size-4" />
          Alternate Contact (Optional)
        </h4>
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Contact person name"
                value={data?.alternateContact?.name || ""}
                onChange={(e) => updateAlternateContact("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Phone className="size-3.5" />
                Phone
              </Label>
              <Input
                placeholder="10-digit mobile"
                value={data?.alternateContact?.phone || ""}
                onChange={(e) => updateAlternateContact("phone", e.target.value)}
                maxLength={10}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Mail className="size-3.5" />
                Email
              </Label>
              <Input
                type="email"
                placeholder="email@company.com"
                value={data?.alternateContact?.email || ""}
                onChange={(e) => updateAlternateContact("email", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 3: Category Selection
function CategorySelectionStep({ 
  selectedCategories, 
  onChange 
}: { 
  selectedCategories: SupplyCategory[]
  onChange: (categories: SupplyCategory[]) => void 
}) {
  const toggleCategory = (category: SupplyCategory) => {
    const exists = selectedCategories.find((c) => c.id === category.id)
    if (exists) {
      onChange(selectedCategories.filter((c) => c.id !== category.id))
    } else {
      if (selectedCategories.length >= 5) {
        return // Max 5 categories
      }
      onChange([...selectedCategories, { ...category, selectedSubcategories: [] }])
    }
  }

  const toggleSubcategory = (categoryId: string, subcategory: string) => {
    onChange(
      selectedCategories.map((cat) => {
        if (cat.id === categoryId) {
          const selected = cat.selectedSubcategories || []
          const newSelected = selected.includes(subcategory)
            ? selected.filter((s) => s !== subcategory)
            : [...selected, subcategory]
          return { ...cat, selectedSubcategories: newSelected }
        }
        return cat
      })
    )
  }

  const isSelected = (categoryId: string) => selectedCategories.some((c) => c.id === categoryId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Select the categories of materials you supply. Minimum 1, maximum 5.
          </p>
        </div>
        <Badge variant="secondary">
          {selectedCategories.length} / 5 selected
        </Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {SUPPLY_CATEGORIES.map((category) => (
          <Card
            key={category.id}
            className={cn(
              "cursor-pointer transition-all hover:border-primary/50",
              isSelected(category.id) && "border-primary bg-primary/5"
            )}
            onClick={() => toggleCategory(category)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isSelected(category.id)}
                  className="mt-0.5"
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.code}
                    </Badge>
                  </div>
                  {category.subcategories && isSelected(category.id) && (
                    <div className="mt-3 flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {category.subcategories.map((sub) => {
                        const selectedCat = selectedCategories.find((c) => c.id === category.id)
                        const isSubSelected = selectedCat?.selectedSubcategories?.includes(sub)
                        return (
                          <Badge
                            key={sub}
                            variant={isSubSelected ? "default" : "outline"}
                            className={cn(
                              "cursor-pointer text-xs",
                              isSubSelected && "bg-primary text-primary-foreground"
                            )}
                            onClick={() => toggleSubcategory(category.id, sub)}
                          >
                            {sub}
                          </Badge>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Selected Categories</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="gap-1.5">
                {cat.name}
                {cat.selectedSubcategories && cat.selectedSubcategories.length > 0 && (
                  <span className="text-muted-foreground">
                    ({cat.selectedSubcategories.length})
                  </span>
                )}
                <X
                  className="size-3 cursor-pointer hover:text-destructive"
                  onClick={() => toggleCategory(cat)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Step 4: Bank Details
function BankDetailsStep({ 
  data, 
  onChange 
}: { 
  data?: VendorApplication["bankDetails"]
  onChange: (data: VendorApplication["bankDetails"]) => void 
}) {
  const updateField = (field: string, value: string) => {
    onChange({ ...data, [field]: value } as VendorApplication["bankDetails"])
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex gap-3">
          <AlertCircle className="size-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-medium mb-1">Important</p>
            <p>Bank account must be in the name of the company or proprietor. Payments will only be made to this account.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Account Holder Name *</Label>
          <Input
            placeholder="As per bank records"
            value={data?.accountName || ""}
            onChange={(e) => updateField("accountName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Account Type *</Label>
          <Select 
            value={data?.accountType || ""} 
            onValueChange={(value) => updateField("accountType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Current">Current Account</SelectItem>
              <SelectItem value="Savings">Savings Account</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Account Number *</Label>
          <Input
            placeholder="Enter account number"
            value={data?.accountNumber || ""}
            onChange={(e) => updateField("accountNumber", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Confirm Account Number *</Label>
          <Input
            placeholder="Re-enter account number"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Bank Name *</Label>
          <Input
            placeholder="e.g., HDFC Bank"
            value={data?.bankName || ""}
            onChange={(e) => updateField("bankName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Branch Name *</Label>
          <Input
            placeholder="Branch name"
            value={data?.branchName || ""}
            onChange={(e) => updateField("branchName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>IFSC Code *</Label>
          <Input
            placeholder="11-character IFSC"
            value={data?.ifscCode || ""}
            onChange={(e) => updateField("ifscCode", e.target.value.toUpperCase())}
            maxLength={11}
          />
        </div>
      </div>
    </div>
  )
}

// Step 5: Document Upload
function DocumentUploadStep({ 
  documents, 
  onChange 
}: { 
  documents: VendorApplication["documents"]
  onChange: (docs: VendorApplication["documents"]) => void 
}) {
  const [uploading, setUploading] = React.useState<string | null>(null)

  const handleUpload = async (type: string, file: File) => {
    setUploading(type)
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const doc = {
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      uploadedAt: new Date().toISOString(),
      size: file.size,
    }
    
    onChange({ ...documents, [type]: doc })
    setUploading(null)
  }

  const removeDocument = (type: string) => {
    const newDocs = { ...documents }
    delete newDocs[type as keyof typeof newDocs]
    onChange(newDocs)
  }

  const documentTypes = [
    { key: "gstCertificate", label: "GST Certificate", required: true },
    { key: "panCard", label: "PAN Card", required: true },
    { key: "incorporationCertificate", label: "Incorporation Certificate", required: false },
    { key: "bankStatement", label: "Cancelled Cheque / Bank Statement", required: false },
    { key: "productCatalog", label: "Product Catalog", required: false },
  ]

  return (
    <div className="space-y-6">
      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="flex gap-3">
          <AlertCircle className="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 dark:text-amber-300">
            <p className="font-medium mb-1">Document Requirements</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Files must be in PDF, JPG, or PNG format</li>
              <li>Maximum file size: 5MB per document</li>
              <li>Documents marked with * are mandatory</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {documentTypes.map((docType) => {
          const doc = documents?.[docType.key as keyof typeof documents] as typeof documents.gstCertificate | undefined
          const isUploading = uploading === docType.key

          return (
            <Card key={docType.key} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "size-10 rounded-lg flex items-center justify-center",
                      doc ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
                    )}>
                      {doc ? (
                        <Check className="size-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <FileText className="size-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {docType.label}
                        {docType.required && <span className="text-destructive ml-1">*</span>}
                      </p>
                      {doc ? (
                        <p className="text-sm text-muted-foreground">{doc.name}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">No file uploaded</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {doc && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 bg-transparent hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeDocument(docType.key)}
                      >
                        <X className="size-4" />
                      </Button>
                    )}
                    <Label
                      htmlFor={docType.key}
                      className={cn(
                        "cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        doc 
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      {isUploading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                      {isUploading ? "Uploading..." : doc ? "Replace" : "Upload"}
                    </Label>
                    <input
                      id={docType.key}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleUpload(docType.key, file)
                        e.target.value = ""
                      }}
                      disabled={isUploading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// Step 6: Review & Submit
function ReviewStep({ 
  data, 
  onEdit 
}: { 
  data: Partial<VendorApplication>
  onEdit: (step: number) => void 
}) {
  const sections = [
    {
      title: "Company Information",
      step: 1,
      items: [
        { label: "Company Name", value: data.companyInfo?.name },
        { label: "Legal Name", value: data.companyInfo?.legalName },
        { label: "Company Type", value: data.companyInfo?.type },
        { label: "GSTIN", value: data.companyInfo?.gstin },
        { label: "PAN", value: data.companyInfo?.pan },
        { 
          label: "Registered Address", 
          value: data.companyInfo?.registeredAddress 
            ? `${data.companyInfo.registeredAddress.line1}, ${data.companyInfo.registeredAddress.city}, ${data.companyInfo.registeredAddress.state} - ${data.companyInfo.registeredAddress.pincode}`
            : undefined
        },
      ],
    },
    {
      title: "Contact Information",
      step: 2,
      items: [
        { label: "Primary Contact", value: data.contactInfo?.primaryContact?.name },
        { label: "Designation", value: data.contactInfo?.primaryContact?.designation },
        { label: "Phone", value: data.contactInfo?.primaryContact?.phone },
        { label: "Email", value: data.contactInfo?.primaryContact?.email },
      ],
    },
    {
      title: "Supply Categories",
      step: 3,
      items: [
        { 
          label: "Selected Categories", 
          value: data.supplyCategories?.map((c) => c.name).join(", ") || "None selected"
        },
      ],
    },
    {
      title: "Bank Details",
      step: 4,
      items: [
        { label: "Account Name", value: data.bankDetails?.accountName },
        { label: "Account Number", value: data.bankDetails?.accountNumber ? `****${data.bankDetails.accountNumber.slice(-4)}` : undefined },
        { label: "Bank Name", value: data.bankDetails?.bankName },
        { label: "IFSC Code", value: data.bankDetails?.ifscCode },
      ],
    },
    {
      title: "Documents",
      step: 5,
      items: [
        { label: "GST Certificate", value: data.documents?.gstCertificate ? "Uploaded" : "Not uploaded" },
        { label: "PAN Card", value: data.documents?.panCard ? "Uploaded" : "Not uploaded" },
        { label: "Incorporation Certificate", value: data.documents?.incorporationCertificate ? "Uploaded" : "Not uploaded" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex gap-3">
          <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
          <div className="text-sm text-green-800 dark:text-green-300">
            <p className="font-medium mb-1">Almost Done!</p>
            <p>Please review your application details before submitting. You can edit any section by clicking the Edit button.</p>
          </div>
        </div>
      </div>

      {sections.map((section) => (
        <Card key={section.title} className="bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{section.title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary bg-transparent hover:bg-primary/10"
                onClick={() => onEdit(section.step)}
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-3 md:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.label}>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className={cn(
                    "font-medium",
                    !item.value && "text-muted-foreground italic"
                  )}>
                    {item.value || "Not provided"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
            I hereby declare that the information provided above is true and correct to the best of my knowledge. 
            I understand that any false information may result in rejection of my application or termination of partnership.
          </Label>
        </div>
      </div>
    </div>
  )
}
