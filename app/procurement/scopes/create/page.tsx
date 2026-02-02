"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Package,
  Award,
  Truck,
  Send,
  Check,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  Save,
  Grid3X3,
  Users,
  Clock,
  FileText,
  Info,
  MapPin,
  IndianRupee,
  CheckCircle2,
  ChevronRight,
  Zap,
  Layers,
  Droplets,
  Paintbrush,
  Wrench,
  TreePine,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { 
  MATERIAL_CATEGORIES,
  SAMPLE_PROJECTS,
  QUALITY_STANDARDS,
  MATERIAL_UNITS,
} from "@/lib/procurement-types"

const steps = [
  { id: 1, name: 'Project', shortName: 'Project', icon: Building2, description: 'Select project' },
  { id: 2, name: 'Category', shortName: 'Category', icon: Grid3X3, description: 'Choose material category' },
  { id: 3, name: 'Specifications', shortName: 'Specs', icon: Package, description: 'Define requirements' },
  { id: 4, name: 'Delivery', shortName: 'Delivery', icon: Truck, description: 'Set delivery details' },
  { id: 5, name: 'Bidding', shortName: 'Bidding', icon: Clock, description: 'Configure bidding' },
  { id: 6, name: 'Review', shortName: 'Review', icon: FileText, description: 'Review & submit' },
]

// Material categories with icons and colors
const categories = [
  { id: 'cat_iron', name: 'Steel & Iron', icon: Layers, color: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-100 dark:bg-slate-800' },
  { id: 'cat_cement', name: 'Cement', icon: Package, color: 'text-stone-600 dark:text-stone-400', bgColor: 'bg-stone-100 dark:bg-stone-800' },
  { id: 'cat_elec', name: 'Electrical', icon: Zap, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
  { id: 'cat_plumb', name: 'Plumbing', icon: Droplets, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: 'cat_tiles', name: 'Tiles & Flooring', icon: Grid3X3, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { id: 'cat_paints', name: 'Paints & Finishes', icon: Paintbrush, color: 'text-pink-600 dark:text-pink-400', bgColor: 'bg-pink-100 dark:bg-pink-900/30' },
  { id: 'cat_hardware', name: 'Hardware', icon: Wrench, color: 'text-violet-600 dark:text-violet-400', bgColor: 'bg-violet-100 dark:bg-violet-900/30' },
  { id: 'cat_wood', name: 'Wood & Plywood', icon: TreePine, color: 'text-orange-700 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
]

// Sample vendors for selection
const sampleVendors = [
  { id: 'v1', name: 'Steel Traders Pvt Ltd', rating: 4.8, category: 'cat_iron', verified: true },
  { id: 'v2', name: 'JSW Authorized Dealer', rating: 4.6, category: 'cat_iron', verified: true },
  { id: 'v3', name: 'Metro Iron & Steel', rating: 4.2, category: 'cat_iron', verified: false },
  { id: 'v4', name: 'UltraTech Cement Agency', rating: 4.7, category: 'cat_cement', verified: true },
  { id: 'v5', name: 'ACC Cement Distributors', rating: 4.5, category: 'cat_cement', verified: true },
  { id: 'v6', name: 'Havells Authorized Partner', rating: 4.9, category: 'cat_elec', verified: true },
  { id: 'v7', name: 'Ashirvad Pipes Dealer', rating: 4.4, category: 'cat_plumb', verified: true },
  { id: 'v8', name: 'Kajaria Tiles Showroom', rating: 4.6, category: 'cat_tiles', verified: true },
]

interface FormData {
  projectIds: string[]
  categoryId: string
  title: string
  description: string
  quantity: number
  unit: string
  qualityGrade: string
  brandPreference: string[]
  brandRestriction: 'preferred_only' | 'any' | 'no_preference'
  technicalSpecs: string
  deliveryLocation: string
  deliveryStartDate: string
  deliveryEndDate: string
  deliveryInstructions: string
  requireUnloading: boolean
  bidStartDate: string
  bidEndDate: string
  requireCertifications: boolean
  requireDeliveryPlan: boolean
  allowPartialBids: boolean
  estimatedBudget: number
  invitedVendors: string[]
}

export default function CreateScopePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  // Get pre-selected values from session storage
  const [preSelectedCategory, setPreSelectedCategory] = React.useState<string>('')
  const [preSelectedVendors, setPreSelectedVendors] = React.useState<string[]>([])
  
  React.useEffect(() => {
    const savedCategory = sessionStorage.getItem('selectedCategory')
    const savedVendors = sessionStorage.getItem('selectedVendors')
    if (savedCategory) setPreSelectedCategory(savedCategory)
    if (savedVendors) setPreSelectedVendors(JSON.parse(savedVendors))
  }, [])
  
  const [formData, setFormData] = React.useState<FormData>({
    projectIds: [],
    categoryId: preSelectedCategory,
    title: '',
    description: '',
    quantity: 0,
    unit: 'MT',
    qualityGrade: '',
    brandPreference: [],
    brandRestriction: 'any',
    technicalSpecs: '',
    deliveryLocation: '',
    deliveryStartDate: '',
    deliveryEndDate: '',
    deliveryInstructions: '',
    requireUnloading: false,
    bidStartDate: new Date().toISOString().split('T')[0],
    bidEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    requireCertifications: true,
    requireDeliveryPlan: false,
    allowPartialBids: false,
    estimatedBudget: 0,
    invitedVendors: preSelectedVendors,
  })
  
  // Update form when preselected values load
  React.useEffect(() => {
    if (preSelectedCategory || preSelectedVendors.length > 0) {
      setFormData(prev => ({
        ...prev,
        categoryId: preSelectedCategory || prev.categoryId,
        invitedVendors: preSelectedVendors.length > 0 ? preSelectedVendors : prev.invitedVendors,
      }))
    }
  }, [preSelectedCategory, preSelectedVendors])
  
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }
  
  const selectedProjects = SAMPLE_PROJECTS.filter(p => formData.projectIds.includes(p.id))
  const selectedProject = selectedProjects[0] // First selected project for display
  const selectedCategory = categories.find(c => c.id === formData.categoryId)
  const categoryVendors = sampleVendors.filter(v => v.category === formData.categoryId)
  
  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)} Cr`
    if (amount >= 100000) return `${(amount / 100000).toFixed(1)} L`
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)} K`
    return amount.toLocaleString('en-IN')
  }
  
  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.projectIds.length > 0
      case 2: return formData.categoryId !== ''
      case 3: return formData.quantity > 0 && formData.unit !== '' && formData.title !== ''
      case 4: return formData.deliveryLocation !== '' && formData.deliveryStartDate !== '' && formData.deliveryEndDate !== ''
      case 5: return formData.bidEndDate !== '' && formData.invitedVendors.length > 0
      case 6: return true
      default: return false
    }
  }
  
  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1)
    } else {
      setShowConfirmDialog(true)
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }
  
  const handleSaveDraft = async () => {
    toast.success('Scope saved as draft')
    router.push('/procurement/scopes')
  }
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Scope created and sent to vendors!')
    sessionStorage.removeItem('selectedVendors')
    sessionStorage.removeItem('selectedCategory')
    router.push('/procurement/scopes')
  }
  
  const toggleVendor = (vendorId: string) => {
    setFormData(prev => ({
      ...prev,
      invitedVendors: prev.invitedVendors.includes(vendorId)
        ? prev.invitedVendors.filter(id => id !== vendorId)
        : [...prev.invitedVendors, vendorId]
    }))
  }
  
  const progress = (currentStep / steps.length) * 100
  
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header with Progress */}
        <div className="border-b border-border bg-card px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="size-8 bg-transparent hover:bg-muted"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Create Material Scope</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Step {currentStep} of {steps.length}: {steps[currentStep - 1].description}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              className="bg-transparent hidden sm:flex"
            >
              <Save className="size-4 mr-2" />
              Save Draft
            </Button>
          </div>
          
          {/* Progress Bar */}
          <Progress value={progress} className="h-1.5" />
          
          {/* Step Indicators - Desktop */}
          <div className="hidden md:flex items-center justify-between mt-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => isCompleted && setCurrentStep(step.id)}
                    disabled={!isCompleted}
                    className={`flex items-center gap-2 transition-colors ${
                      isCompleted ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className={`
                      flex items-center justify-center size-8 rounded-full border-2 transition-colors
                      ${isActive ? 'bg-[hsl(var(--hover-bg))] border-[hsl(var(--hover-bg))] text-foreground' : 
                        isCompleted ? 'bg-primary/10 border-primary text-primary' : 
                        'bg-muted border-border text-muted-foreground'}
                    `}>
                      {isCompleted ? (
                        <Check className="size-4" />
                      ) : (
                        <StepIcon className="size-4" />
                      )}
                    </div>
                    <span className={`text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {step.name}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${step.id < currentStep ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
          
          {/* Step Indicators - Mobile */}
          <div className="flex md:hidden items-center justify-between mt-3 overflow-x-auto gap-1">
            {steps.map((step) => {
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              
              return (
                <div
                  key={step.id}
                  className={`
                    flex items-center justify-center size-8 rounded-full shrink-0
                    ${isActive ? 'bg-[hsl(var(--hover-bg))] text-foreground' : 
                      isCompleted ? 'bg-primary/20 text-primary' : 
                      'bg-muted text-muted-foreground'}
                  `}
                >
                  {isCompleted ? <Check className="size-4" /> : step.id}
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Context Bar */}
        {(selectedProjects.length > 0 || selectedCategory) && (
          <div className="bg-muted/50 border-b border-border px-4 py-2 sm:px-6">
            <div className="flex items-center gap-4 text-sm flex-wrap">
              {selectedProjects.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {selectedProjects.length === 1 
                      ? selectedProjects[0].name 
                      : `${selectedProjects.length} projects selected`}
                  </span>
                </div>
              )}
              {selectedCategory && (
                <div className="flex items-center gap-1.5">
                  <selectedCategory.icon className={`size-4 ${selectedCategory.color}`} />
                  <span className="text-foreground">{selectedCategory.name}</span>
                </div>
              )}
              {formData.invitedVendors.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Users className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{formData.invitedVendors.length} vendors</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="max-w-3xl mx-auto">
            
            {/* Step 1: Project Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Select Projects</h2>
                  <p className="text-sm text-muted-foreground">Choose one or more projects for this material scope</p>
                  {formData.projectIds.length > 0 && (
                    <p className="text-sm text-primary font-medium mt-1">
                      {formData.projectIds.length} project{formData.projectIds.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>
                
                <div className="space-y-3">
                  {SAMPLE_PROJECTS.map(project => {
                    const isSelected = formData.projectIds.includes(project.id)
                    return (
                      <Card
                        key={project.id}
                        className={`p-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'bg-card hover:border-primary/50'
                        }`}
                        onClick={() => {
                          const newProjectIds = isSelected
                            ? formData.projectIds.filter(id => id !== project.id)
                            : [...formData.projectIds, project.id]
                          updateFormData({ 
                            projectIds: newProjectIds,
                            deliveryLocation: newProjectIds.length === 1 
                              ? SAMPLE_PROJECTS.find(p => p.id === newProjectIds[0])?.address || ''
                              : formData.deliveryLocation,
                          })
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <Checkbox 
                              checked={isSelected} 
                              className="mt-1"
                              onCheckedChange={() => {
                                const newProjectIds = isSelected
                                  ? formData.projectIds.filter(id => id !== project.id)
                                  : [...formData.projectIds, project.id]
                                updateFormData({ 
                                  projectIds: newProjectIds,
                                  deliveryLocation: newProjectIds.length === 1 
                                    ? SAMPLE_PROJECTS.find(p => p.id === newProjectIds[0])?.address || ''
                                    : formData.deliveryLocation,
                                })
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-muted-foreground">{project.code}</span>
                                <Badge variant="outline" className="text-xs">{project.city}</Badge>
                              </div>
                              <h3 className="font-semibold text-foreground">{project.name}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="size-3" />
                                {project.address}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="size-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* Step 2: Category Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Material Category</h2>
                  <p className="text-sm text-muted-foreground">Select the type of materials needed</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.map(category => {
                    const CategoryIcon = category.icon
                    const isSelected = formData.categoryId === category.id
                    
                    return (
                      <Card
                        key={category.id}
                        className={`p-4 cursor-pointer transition-all text-center ${
                          isSelected
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'bg-card hover:border-primary/50'
                        }`}
                        onClick={() => updateFormData({ categoryId: category.id })}
                      >
                        <div className={`size-12 mx-auto rounded-lg ${category.bgColor} flex items-center justify-center mb-3`}>
                          <CategoryIcon className={`size-6 ${category.color}`} />
                        </div>
                        <p className="font-medium text-foreground text-sm">{category.name}</p>
                        {isSelected && (
                          <Badge className="mt-2 text-xs">Selected</Badge>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* Step 3: Specifications */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Material Specifications</h2>
                  <p className="text-sm text-muted-foreground">Define the quantity and specifications</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Scope Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateFormData({ title: e.target.value })}
                      placeholder="e.g., TMT Steel for Foundation Work"
                      className="mt-1.5 bg-background"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Estimated Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity || ''}
                        onChange={(e) => updateFormData({ quantity: Number(e.target.value) })}
                        placeholder="0"
                        className="mt-1.5 bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="unit">Unit *</Label>
                      <Select value={formData.unit} onValueChange={(v) => updateFormData({ unit: v })}>
                        <SelectTrigger className="mt-1.5 bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MATERIAL_UNITS.map(unit => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="grade">Quality Grade / Specification</Label>
                    <Input
                      id="grade"
                      value={formData.qualityGrade}
                      onChange={(e) => updateFormData({ qualityGrade: e.target.value })}
                      placeholder="e.g., Fe 500D Grade, IS:1786"
                      className="mt-1.5 bg-background"
                    />
                  </div>
                  
                  <div>
                    <Label>Brand Preference</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['TATA', 'JSW', 'SAIL', 'Vizag Steel', 'Jindal'].map(brand => (
                        <Badge
                          key={brand}
                          variant={formData.brandPreference.includes(brand) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => {
                            const newBrands = formData.brandPreference.includes(brand)
                              ? formData.brandPreference.filter(b => b !== brand)
                              : [...formData.brandPreference, brand]
                            updateFormData({ brandPreference: newBrands })
                          }}
                        >
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Additional Requirements</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateFormData({ description: e.target.value })}
                      placeholder="Any specific requirements, certifications needed, etc."
                      className="mt-1.5 bg-background min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="budget">Estimated Budget (Optional)</Label>
                    <div className="relative mt-1.5">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="budget"
                        type="number"
                        value={formData.estimatedBudget || ''}
                        onChange={(e) => updateFormData({ estimatedBudget: Number(e.target.value) })}
                        placeholder="0"
                        className="pl-10 bg-background"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Delivery Requirements */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Delivery Requirements</h2>
                  <p className="text-sm text-muted-foreground">Specify delivery location and schedule</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Delivery Location *</Label>
                    <Textarea
                      id="location"
                      value={formData.deliveryLocation}
                      onChange={(e) => updateFormData({ deliveryLocation: e.target.value })}
                      placeholder="Full delivery address with landmarks"
                      className="mt-1.5 bg-background min-h-[80px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Delivery Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.deliveryStartDate}
                        onChange={(e) => updateFormData({ deliveryStartDate: e.target.value })}
                        className="mt-1.5 bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Delivery End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.deliveryEndDate}
                        onChange={(e) => updateFormData({ deliveryEndDate: e.target.value })}
                        className="mt-1.5 bg-background"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="instructions">Delivery Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={formData.deliveryInstructions}
                      onChange={(e) => updateFormData({ deliveryInstructions: e.target.value })}
                      placeholder="Site access timings, contact person, special instructions..."
                      className="mt-1.5 bg-background min-h-[80px]"
                    />
                  </div>
                  
                  <Card className="p-4 bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Unloading Required</p>
                        <p className="text-sm text-muted-foreground">Vendor should provide unloading at site</p>
                      </div>
                      <Switch
                        checked={formData.requireUnloading}
                        onCheckedChange={(checked) => updateFormData({ requireUnloading: checked })}
                      />
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Step 5: Bidding Configuration */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Bidding Configuration</h2>
                  <p className="text-sm text-muted-foreground">Set bid timeline and invite vendors</p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bidStart">Bid Open Date</Label>
                      <Input
                        id="bidStart"
                        type="date"
                        value={formData.bidStartDate}
                        onChange={(e) => updateFormData({ bidStartDate: e.target.value })}
                        className="mt-1.5 bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bidEnd">Bid Close Date *</Label>
                      <Input
                        id="bidEnd"
                        type="date"
                        value={formData.bidEndDate}
                        onChange={(e) => updateFormData({ bidEndDate: e.target.value })}
                        className="mt-1.5 bg-background"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Card className="p-4 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Require Test Certificates</p>
                          <p className="text-sm text-muted-foreground">Vendors must upload quality certificates</p>
                        </div>
                        <Switch
                          checked={formData.requireCertifications}
                          onCheckedChange={(checked) => updateFormData({ requireCertifications: checked })}
                        />
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Require Delivery Plan</p>
                          <p className="text-sm text-muted-foreground">Vendors must submit delivery schedule</p>
                        </div>
                        <Switch
                          checked={formData.requireDeliveryPlan}
                          onCheckedChange={(checked) => updateFormData({ requireDeliveryPlan: checked })}
                        />
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Allow Partial Bids</p>
                          <p className="text-sm text-muted-foreground">Vendors can bid for partial quantity</p>
                        </div>
                        <Switch
                          checked={formData.allowPartialBids}
                          onCheckedChange={(checked) => updateFormData({ allowPartialBids: checked })}
                        />
                      </div>
                    </Card>
                  </div>
                  
                  {/* Vendor Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Invite Vendors *</Label>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-primary"
                        onClick={() => router.push('/procurement/vendor-discovery')}
                      >
                        Discover More Vendors
                        <ChevronRight className="size-4 ml-1" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {categoryVendors.map(vendor => (
                        <Card
                          key={vendor.id}
                          className={`p-3 cursor-pointer transition-all ${
                            formData.invitedVendors.includes(vendor.id)
                              ? 'border-primary bg-primary/5'
                              : 'bg-card hover:border-primary/50'
                          }`}
                          onClick={() => toggleVendor(vendor.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={formData.invitedVendors.includes(vendor.id)}
                                className="pointer-events-none"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-foreground">{vendor.name}</span>
                                  {vendor.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      <CheckCircle2 className="size-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">Rating: {vendor.rating}/5</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                    
                    {formData.invitedVendors.length === 0 && (
                      <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                        <AlertCircle className="size-4" />
                        Select at least one vendor to proceed
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Review & Submit</h2>
                  <p className="text-sm text-muted-foreground">Verify all details before sending to vendors</p>
                </div>
                
                <div className="space-y-4">
                  {/* Project Info */}
                  <Card className="p-4 bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Building2 className="size-4" />
                        Projects ({selectedProjects.length})
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="bg-transparent text-primary h-auto p-0">
                        Edit
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {selectedProjects.map((project) => (
                        <div key={project.id} className="flex items-start gap-2">
                          <div className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <div>
                            <p className="text-foreground font-medium">{project.name}</p>
                            <p className="text-xs text-muted-foreground">{project.address}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {/* Material Details */}
                  <Card className="p-4 bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Package className="size-4" />
                        Material Details
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)} className="bg-transparent text-primary h-auto p-0">
                        Edit
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{selectedCategory?.name}</Badge>
                      </div>
                      <p className="font-medium text-foreground">{formData.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Estimated Quantity: {formData.quantity} {formData.unit}
                        {formData.qualityGrade && ` | Grade: ${formData.qualityGrade}`}
                      </p>
                      {formData.brandPreference.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          Preferred Brands: {formData.brandPreference.join(', ')}
                        </p>
                      )}
                      {formData.estimatedBudget > 0 && (
                        <p className="text-sm font-medium text-primary">
                          Budget: Rs {formatCurrency(formData.estimatedBudget)}
                        </p>
                      )}
                    </div>
                  </Card>
                  
                  {/* Delivery */}
                  <Card className="p-4 bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Truck className="size-4" />
                        Delivery
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(4)} className="bg-transparent text-primary h-auto p-0">
                        Edit
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{formData.deliveryLocation}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.deliveryStartDate} to {formData.deliveryEndDate}
                    </p>
                    {formData.requireUnloading && (
                      <Badge variant="secondary" className="mt-2">Unloading Required</Badge>
                    )}
                  </Card>
                  
                  {/* Bidding */}
                  <Card className="p-4 bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Clock className="size-4" />
                        Bidding
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(5)} className="bg-transparent text-primary h-auto p-0">
                        Edit
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bid Period: {formData.bidStartDate} to {formData.bidEndDate}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.requireCertifications && <Badge variant="outline">Certificates Required</Badge>}
                      {formData.requireDeliveryPlan && <Badge variant="outline">Delivery Plan Required</Badge>}
                      {formData.allowPartialBids && <Badge variant="outline">Partial Bids Allowed</Badge>}
                    </div>
                  </Card>
                  
                  {/* Vendors */}
                  <Card className="p-4 bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Users className="size-4" />
                        Invited Vendors ({formData.invitedVendors.length})
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(5)} className="bg-transparent text-primary h-auto p-0">
                        Edit
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.invitedVendors.map(vendorId => {
                        const vendor = sampleVendors.find(v => v.id === vendorId)
                        return vendor ? (
                          <Badge key={vendorId} variant="secondary">{vendor.name}</Badge>
                        ) : null
                      })}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sticky Footer */}
        <div className="border-t border-border bg-card px-4 py-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="bg-transparent"
            >
              <ArrowLeft className="size-4 mr-2" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Back</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                className="bg-transparent sm:hidden"
              >
                <Save className="size-4" />
              </Button>
              
              <Button onClick={handleNext} disabled={!canProceed()}>
                {currentStep === 6 ? (
                  <>
                    <Send className="size-4 mr-2" />
                    Send to Vendors
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Continue</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="size-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Scope to Vendors?</DialogTitle>
            <DialogDescription>
              This will send bid invitations to {formData.invitedVendors.length} vendor(s). 
              They will be able to submit their quotes until {formData.bidEndDate}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Confirm & Send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
