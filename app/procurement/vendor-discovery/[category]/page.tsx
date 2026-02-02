"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Building2,
  Clock,
  Award,
  TrendingUp,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { 
  MATERIAL_CATEGORIES,
  LOCATIONS,
  BRANCHES,
  type ProcurementVendor,
} from "@/lib/procurement-types"

// Sample vendors data
const sampleVendors: ProcurementVendor[] = [
  {
    id: 'v1',
    vendorCode: 'VND-HYD-FIX-001',
    companyName: 'ABC Steel Suppliers Pvt Ltd',
    isVerified: true,
    rating: 4.8,
    location: 'Hyderabad',
    branch: 'Gachibowli',
    projectsCompleted: 45,
    onTimeDeliveryRate: 96,
    qualityScore: 92,
    certifications: ['BIS Certified', 'ISO 9001', 'TMT Specialist'],
    primaryContact: { name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@abcsteel.com' },
    categories: ['IRON', 'STEEL'],
    creditLimit: 500000,
    paymentTerms: '30 Days',
  },
  {
    id: 'v2',
    vendorCode: 'VND-HYD-FIX-002',
    companyName: 'XYZ Iron & Steel Works',
    isVerified: true,
    rating: 4.5,
    location: 'Hyderabad',
    branch: 'Madhapur',
    projectsCompleted: 32,
    onTimeDeliveryRate: 88,
    qualityScore: 88,
    certifications: ['BIS Certified', 'ISO 9001'],
    primaryContact: { name: 'Suresh Reddy', phone: '+91 98765 43211', email: 'suresh@xyziron.com' },
    categories: ['IRON', 'STEEL'],
    creditLimit: 350000,
    paymentTerms: '30 Days',
  },
  {
    id: 'v3',
    vendorCode: 'VND-HYD-FIX-003',
    companyName: 'Steel Masters India',
    isVerified: true,
    rating: 4.2,
    location: 'Hyderabad',
    branch: 'Main Branch',
    projectsCompleted: 28,
    onTimeDeliveryRate: 85,
    qualityScore: 85,
    certifications: ['BIS Certified'],
    primaryContact: { name: 'Anil Sharma', phone: '+91 98765 43212', email: 'anil@steelmasters.com' },
    categories: ['IRON', 'STEEL'],
    creditLimit: 250000,
    paymentTerms: '45 Days',
  },
  {
    id: 'v4',
    vendorCode: 'VND-BLR-FIX-001',
    companyName: 'Metro Steel Corporation',
    isVerified: true,
    rating: 4.6,
    location: 'Bangalore',
    branch: 'Whitefield',
    projectsCompleted: 52,
    onTimeDeliveryRate: 94,
    qualityScore: 90,
    certifications: ['BIS Certified', 'ISO 9001', 'Green Certified'],
    primaryContact: { name: 'Venkat Rao', phone: '+91 98765 43213', email: 'venkat@metrosteel.com' },
    categories: ['IRON', 'STEEL'],
    creditLimit: 600000,
    paymentTerms: '30 Days',
  },
  {
    id: 'v5',
    vendorCode: 'VND-CHN-FIX-001',
    companyName: 'City Iron Works',
    isVerified: false,
    rating: 3.9,
    location: 'Chennai',
    branch: 'OMR',
    projectsCompleted: 18,
    onTimeDeliveryRate: 78,
    qualityScore: 78,
    certifications: ['BIS Certified'],
    primaryContact: { name: 'Kumar S', phone: '+91 98765 43214', email: 'kumar@cityiron.com' },
    categories: ['IRON'],
    creditLimit: 150000,
    paymentTerms: '45 Days',
  },
]

interface VendorCardProps {
  vendor: ProcurementVendor
  isSelected: boolean
  onSelect: (id: string) => void
}

function VendorCard({ vendor, isSelected, onSelect }: VendorCardProps) {
  return (
    <Card className={`p-4 transition-all ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'bg-card'}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(vendor.id)}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground">{vendor.companyName}</h3>
                {vendor.isVerified && (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
                    <CheckCircle2 className="size-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="size-3" />
                {vendor.branch}, {vendor.location}
              </p>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="size-4 fill-current" />
              <span className="font-semibold text-foreground">{vendor.rating}</span>
            </div>
          </div>
          
          <Separator className="my-3" />
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-sm mb-3">
            <div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Building2 className="size-3" />
                <span className="text-xs">Projects</span>
              </div>
              <p className="font-semibold text-foreground">{vendor.projectsCompleted}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-3" />
                <span className="text-xs">On-time</span>
              </div>
              <p className="font-semibold text-foreground">{vendor.onTimeDeliveryRate}%</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Award className="size-3" />
                <span className="text-xs">Quality</span>
              </div>
              <p className="font-semibold text-foreground">{vendor.qualityScore}/100</p>
            </div>
          </div>
          
          {/* Certifications */}
          <div className="flex flex-wrap gap-1 mb-3">
            {vendor.certifications.map((cert, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
          
          {/* Contact */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Phone className="size-3" />
              {vendor.primaryContact.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="size-3" />
              {vendor.primaryContact.email}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function VendorListPage() {
  const params = useParams()
  const router = useRouter()
  const categoryCode = (params.category as string)?.toUpperCase()
  
  const category = MATERIAL_CATEGORIES.find(c => c.code === categoryCode)
  
  const [searchQuery, setSearchQuery] = React.useState("")
  const [locationFilter, setLocationFilter] = React.useState("all")
  const [branchFilter, setBranchFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("rating")
  const [selectedVendors, setSelectedVendors] = React.useState<string[]>([])
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false)
  
  // Filter vendors
  const filteredVendors = sampleVendors.filter(vendor => {
    if (!vendor.categories.includes(categoryCode)) return false
    if (searchQuery && !vendor.companyName.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (locationFilter !== "all" && vendor.location !== LOCATIONS.find(l => l.id === locationFilter)?.name) return false
    return true
  })
  
  // Sort vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating
      case 'projects': return b.projectsCompleted - a.projectsCompleted
      case 'quality': return b.qualityScore - a.qualityScore
      case 'delivery': return b.onTimeDeliveryRate - a.onTimeDeliveryRate
      default: return 0
    }
  })
  
  const handleSelectVendor = (id: string) => {
    setSelectedVendors(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    )
  }
  
  const handleCreateScope = () => {
    // Store selected vendors in sessionStorage or state management
    sessionStorage.setItem('selectedVendors', JSON.stringify(selectedVendors))
    sessionStorage.setItem('selectedCategory', categoryCode)
    router.push('/procurement/scopes/create')
  }
  
  const filteredBranches = BRANCHES.filter(b => 
    locationFilter === "all" || b.locationId === locationFilter
  )
  
  const FilterContent = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {LOCATIONS.map(loc => (
              <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Branch</label>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {filteredBranches.map(br => (
              <SelectItem key={br.id} value={br.id}>{br.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
  
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-2 bg-transparent hover:bg-muted"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Categories
          </Button>
          <h1 className="text-2xl font-bold text-foreground">{category?.name || 'Vendors'}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Select vendors to create a Scope of Work
          </p>
        </div>
        
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            {/* Desktop Filters */}
            <div className="hidden md:flex gap-2">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[150px] bg-background">
                  <MapPin className="size-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {LOCATIONS.map(loc => (
                    <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-[150px] bg-background">
                  <Building2 className="size-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {filteredBranches.map(br => (
                    <SelectItem key={br.id} value={br.id}>{br.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden bg-transparent">
                  <Filter className="size-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Filter Vendors</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <FilterContent />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </SheetContent>
            </Sheet>
            
            {/* Search */}
            <div className="relative flex-1 md:flex-none md:w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>
          
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:inline">{sortedVendors.length} vendors</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="projects">Projects</SelectItem>
                <SelectItem value="quality">Quality Score</SelectItem>
                <SelectItem value="delivery">Delivery Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Vendor List */}
        <div className="space-y-3 pb-24 md:pb-0">
          {sortedVendors.map(vendor => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSelected={selectedVendors.includes(vendor.id)}
              onSelect={handleSelectVendor}
            />
          ))}
          
          {sortedVendors.length === 0 && (
            <Card className="p-12 text-center bg-card">
              <Building2 className="size-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No vendors found matching your criteria</p>
            </Card>
          )}
        </div>
        
        {/* Bottom Action Bar */}
        {selectedVendors.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 md:left-[var(--sidebar-width,280px)] bg-card border-t border-border p-4 z-40">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {selectedVendors.length} vendor(s) selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVendors([])}
                  className="text-muted-foreground bg-transparent hover:bg-muted"
                >
                  <X className="size-4 mr-1" />
                  Clear
                </Button>
              </div>
              <Button onClick={handleCreateScope}>
                Create Scope of Work
                <ChevronDown className="size-4 ml-2 rotate-[-90deg]" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
