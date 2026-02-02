"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  CATALOG_CATEGORIES,
  MATERIAL_UNITS,
  type CatalogCategory,
} from "@/lib/procurement-types"

interface MaterialBrand {
  id: string
  name: string
  grade: string
  pricePerUnit: number
  unit: string
  moq: number
  leadTime: number
  qualityRating: number
  isPreferred: boolean
}

interface MaterialSpecification {
  name: string
  value: string
}

export default function AddMaterialPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [formData, setFormData] = React.useState({
    name: "",
    code: "",
    categoryId: "",
    subCategoryId: "",
    description: "",
    defaultUnit: "",
    hsnCode: "",
    gstRate: 18,
    tags: [] as string[],
  })
  
  const [brands, setBrands] = React.useState<MaterialBrand[]>([])
  const [specifications, setSpecifications] = React.useState<MaterialSpecification[]>([])
  const [tagInput, setTagInput] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  const selectedCategory = CATALOG_CATEGORIES.find(cat => cat.id === formData.categoryId)
  const availableSubCategories = selectedCategory?.subCategories || []
  
  // Generate material code based on category and name
  React.useEffect(() => {
    if (formData.name && formData.categoryId && !formData.code) {
      const category = CATALOG_CATEGORIES.find(c => c.id === formData.categoryId)
      const categoryCode = category?.name.substring(0, 3).toUpperCase() || "MAT"
      const nameCode = formData.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 4)
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
      setFormData(prev => ({ ...prev, code: `${categoryCode}-${nameCode}-${randomNum}` }))
    }
  }, [formData.name, formData.categoryId, formData.code])
  
  const handleAddBrand = () => {
    setBrands([
      ...brands,
      {
        id: `brand-${Date.now()}`,
        name: "",
        grade: "",
        pricePerUnit: 0,
        unit: formData.defaultUnit || "",
        moq: 0,
        leadTime: 0,
        qualityRating: 4.0,
        isPreferred: false,
      },
    ])
  }
  
  const handleUpdateBrand = (id: string, field: keyof MaterialBrand, value: any) => {
    setBrands(brands.map(brand => 
      brand.id === id ? { ...brand, [field]: value } : brand
    ))
  }
  
  const handleRemoveBrand = (id: string) => {
    setBrands(brands.filter(brand => brand.id !== id))
  }
  
  const handleAddSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }])
  }
  
  const handleUpdateSpecification = (index: number, field: keyof MaterialSpecification, value: string) => {
    const updated = [...specifications]
    updated[index] = { ...updated[index], [field]: value }
    setSpecifications(updated)
  }
  
  const handleRemoveSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
  }
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validation
    if (!formData.name || !formData.categoryId || !formData.defaultUnit) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Category, Unit).",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }
    
    if (brands.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one brand for this material.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }
    
    // Validate brands
    const invalidBrands = brands.filter(b => !b.name || b.pricePerUnit <= 0)
    if (invalidBrands.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please ensure all brands have a name and valid price.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Material Added Successfully",
        description: `${formData.name} has been added to the catalog.`,
      })
      
      // Navigate back to materials page
      router.push("/procurement/materials")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add material. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Material</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new material to the catalog with brand-wise pricing
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="size-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Enter the basic details of the material
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Material Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., TMT Steel Bars - Fe 500D"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="code">Material Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                    placeholder="Auto-generated"
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, categoryId: value, subCategoryId: "" }))
                    }}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATALOG_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subCategory">Sub-Category</Label>
                  <Select
                    value={formData.subCategoryId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subCategoryId: value }))}
                    disabled={!formData.categoryId || availableSubCategories.length === 0}
                  >
                    <SelectTrigger id="subCategory">
                      <SelectValue placeholder={availableSubCategories.length === 0 ? "No sub-categories" : "Select sub-category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubCategories.map((subCat) => (
                        <SelectItem key={subCat.id} value={subCat.id}>
                          {subCat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter a detailed description of the material..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unit">
                    Default Unit <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.defaultUnit}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, defaultUnit: value }))}
                    required
                  >
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {MATERIAL_UNITS.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hsnCode">HSN Code</Label>
                  <Input
                    id="hsnCode"
                    value={formData.hsnCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, hsnCode: e.target.value }))}
                    placeholder="e.g., 7214"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gstRate">GST Rate (%)</Label>
                  <Input
                    id="gstRate"
                    type="number"
                    min="0"
                    max="28"
                    value={formData.gstRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, gstRate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                    placeholder="Add a tag and press Enter"
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    <Plus className="size-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Specifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Specifications</CardTitle>
                  <CardDescription>
                    Add technical specifications for this material
                  </CardDescription>
                </div>
                <Button type="button" onClick={handleAddSpecification} variant="outline" size="sm">
                  <Plus className="size-4 mr-2" />
                  Add Specification
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {specifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No specifications added. Click "Add Specification" to add one.
                </p>
              ) : (
                specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Specification name"
                      value={spec.name}
                      onChange={(e) => handleUpdateSpecification(index, "name", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value"
                      value={spec.value}
                      onChange={(e) => handleUpdateSpecification(index, "value", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSpecification(index)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          
          {/* Brands */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Brands <span className="text-destructive">*</span>
                  </CardTitle>
                  <CardDescription>
                    Add brand-wise pricing and details. At least one brand is required.
                  </CardDescription>
                </div>
                <Button type="button" onClick={handleAddBrand} variant="outline" size="sm">
                  <Plus className="size-4 mr-2" />
                  Add Brand
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {brands.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No brands added. Click "Add Brand" to add one.
                </p>
              ) : (
                brands.map((brand) => (
                  <Card key={brand.id} className="border-border/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Brand Details</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveBrand(brand.id)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Brand Name <span className="text-destructive">*</span></Label>
                          <Input
                            value={brand.name}
                            onChange={(e) => handleUpdateBrand(brand.id, "name", e.target.value)}
                            placeholder="e.g., TATA TISCON"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Grade</Label>
                          <Input
                            value={brand.grade}
                            onChange={(e) => handleUpdateBrand(brand.id, "grade", e.target.value)}
                            placeholder="e.g., Fe 500D"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Price per Unit <span className="text-destructive">*</span></Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={brand.pricePerUnit || ""}
                            onChange={(e) => handleUpdateBrand(brand.id, "pricePerUnit", parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Unit</Label>
                          <Input
                            value={brand.unit}
                            onChange={(e) => handleUpdateBrand(brand.id, "unit", e.target.value)}
                            placeholder={formData.defaultUnit || "Unit"}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>MOQ (Minimum Order Quantity)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={brand.moq || ""}
                            onChange={(e) => handleUpdateBrand(brand.id, "moq", parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Lead Time (Days)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={brand.leadTime || ""}
                            onChange={(e) => handleUpdateBrand(brand.id, "leadTime", parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Quality Rating (1-5)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            value={brand.qualityRating || ""}
                            onChange={(e) => handleUpdateBrand(brand.id, "qualityRating", parseFloat(e.target.value) || 4.0)}
                            placeholder="4.0"
                          />
                        </div>
                        
                        <div className="space-y-2 flex items-end">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`preferred-${brand.id}`}
                              checked={brand.isPreferred}
                              onChange={(e) => handleUpdateBrand(brand.id, "isPreferred", e.target.checked)}
                              className="size-4 rounded border-border"
                            />
                            <Label htmlFor={`preferred-${brand.id}`} className="cursor-pointer">
                              Preferred Brand
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4 mr-2" />
                  Save Material
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
