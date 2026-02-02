// Procurement Module Data Types

// Material Category
export interface MaterialCategory {
  id: string
  code: string // 'ELEC', 'IRON', 'STEEL', 'TILES', etc.
  name: string
  description: string
  icon: string
  parentCategoryId?: string
  isActive: boolean
  sortOrder: number
  vendorCount: number
  newVendors?: number
  createdAt: string
  updatedAt: string
}

// Vendor Category Mapping
export interface VendorCategoryMapping {
  id: string
  vendorId: string
  categoryId: string
  isPrimary: boolean
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED'
  certifications: string[]
  createdAt: string
  updatedAt: string
}

// Vendor for Procurement (Extended view for Procurement Manager)
export interface ProcurementVendor {
  id: string
  vendorCode: string
  companyName: string
  isVerified: boolean
  rating: number
  location: string
  branch: string
  projectsCompleted: number
  onTimeDeliveryRate: number
  qualityScore: number
  certifications: string[]
  primaryContact: {
    name: string
    phone: string
    email: string
  }
  categories: string[]
  creditLimit: number
  paymentTerms: string
}

// Location and Branch
export interface Location {
  id: string
  name: string
  code: string
}

export interface Branch {
  id: string
  name: string
  locationId: string
}

// Scope of Work
export interface ScopeOfWork {
  id: string
  scopeNumber: string // Auto: SOW-HYD-2026-0001
  
  // Project Reference
  projectId: string
  projectName: string
  projectCode: string
  siteAddress: string
  cityId: string
  
  // Category
  categoryId: string
  categoryName: string
  
  // Requirements
  title: string
  description: string
  materials: ScopeMaterial[]
  qualityStandards: QualityStandard[]
  deliveryRequirements: DeliveryRequirement
  
  // Bidding Configuration
  bidStartDate: string
  bidEndDate: string
  maxVendors?: number
  
  // Selected Vendors
  invitedVendors: string[]
  
  // Status
  status: ScopeStatus
  
  // Bid Statistics
  totalBids?: number
  
  // Tracking
  createdBy: string
  createdAt: string
  updatedAt: string
  sentAt?: string
  closedAt?: string
  closedReason?: string
}

export type ScopeStatus = 
  | 'DRAFT'
  | 'SENT'
  | 'BIDDING_ACTIVE'
  | 'BIDDING_CLOSED'
  | 'EVALUATION'
  | 'ASSIGNED'
  | 'CANCELLED'

export interface ScopeMaterial {
  id: string
  materialId: string
  materialName: string
  materialCode: string
  specification: string
  quantity: number
  unit: string
  brandPreference?: string[]
  remarks?: string
}

export interface QualityStandard {
  id: string
  standardCode: string
  description: string
  isMandatory: boolean
}

export interface DeliveryRequirement {
  deliveryStartDate: string
  deliveryEndDate: string
  deliverySchedule: 'ONE_TIME' | 'SCHEDULED' | 'AS_NEEDED'
  scheduleDetails?: string
  deliveryLocation: string
  unloadingRequired: boolean
  storageAvailable: boolean
  accessRestrictions?: string
}

// Bid Invitation
export interface BidInvitation {
  id: string
  scopeId: string
  vendorId: string
  vendorName: string
  vendorCode: string
  status: InvitationStatus
  sentAt: string
  viewedAt?: string
  respondedAt?: string
  notificationsSent: NotificationLog[]
}

export type InvitationStatus = 
  | 'SENT'
  | 'VIEWED'
  | 'BID_SUBMITTED'
  | 'DECLINED'
  | 'EXPIRED'

export interface NotificationLog {
  type: 'PUSH' | 'EMAIL' | 'WHATSAPP'
  sentAt: string
  status: 'SENT' | 'DELIVERED' | 'FAILED'
}

// Vendor Bid
export interface VendorBid {
  id: string
  bidNumber: string // Auto: BID-HYD-2026-0001
  scopeId: string
  scopeNumber: string
  scopeTitle: string
  vendorId: string
  vendorName: string
  vendorCode: string
  vendorRating: number
  
  // Category
  categoryId: string
  categoryName: string
  
  // Pricing
  lineItems: BidLineItem[]
  totalAmount: number
  taxAmount: number
  grandTotal: number
  
  // Fulfillment
  availableQuantity: number
  deliveryCommitment: string
  deliveryStartDate: string
  deliveryEndDate: string
  deliveryDays: number
  
  // Quality
  certifications: BidCertification[]
  qualityNotes?: string
  
  // Terms
  paymentTerms: string
  validityDays: number
  additionalTerms?: string
  
  // Attachments
  attachments: BidAttachment[]
  
  // Status
  status: BidStatus
  submittedAt: string
  
  // Evaluation
  evaluation?: BidEvaluation
}

export type BidStatus = 
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'SELECTED'
  | 'REJECTED'

export interface BidLineItem {
  id: string
  scopeMaterialId: string
  materialName: string
  quotedQuantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  brandOffered: string
  specification: string
  remarks?: string
}

export interface BidCertification {
  id: string
  name: string
  certificateNumber: string
  issuedBy: string
  validUntil: string
  documentUrl?: string
}

export interface BidAttachment {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
}

export interface BidEvaluation {
  priceScore: number
  qualityScore: number
  deliveryScore: number
  overallScore: number
  ranking: number
  notes?: string
  evaluatedBy: string
  evaluatedAt: string
  recommendation: 'RECOMMENDED' | 'ACCEPTABLE' | 'NOT_RECOMMENDED'
  badges: BidBadge[]
}

export interface BidBadge {
  type: 'BEST_PRICE' | 'HIGH_QUALITY' | 'FAST_DELIVERY'
  label: string
}

// Vendor Assignment
export interface VendorAssignment {
  id: string
  assignmentNumber: string // Auto: ASN-HYD-2026-0001
  
  // References
  scopeId: string
  scopeNumber: string
  scopeTitle: string
  bidId: string
  bidNumber: string
  vendorId: string
  vendorName: string
  vendorCode: string
  vendorRating: number
  vendorPhone: string
  projectId: string
  projectName: string
  projectCode: string
  projectManagerId: string
  projectManagerName: string
  categoryId: string
  categoryName: string
  
  // Assignment Details
  assignedMaterials: AssignedMaterial[]
  agreedAmount: number
  taxAmount: number
  totalAmount: number
  paymentTerms: string
  deliverySchedule: string
  deliveryStartDate: string
  deliveryEndDate: string
  
  // Status
  status: AssignmentStatus
  
  // Tracking
  assignedBy: string
  assignedAt: string
  acceptedAt?: string
  completedAt?: string
}

export type AssignmentStatus = 
  | 'PENDING'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'CANCELLED'

export interface AssignedMaterial {
  materialName: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  brand: string
}

// Ranking Weights
export const RANKING_WEIGHTS = {
  price: 0.40,
  quality: 0.35,
  delivery: 0.25,
}

// Calculate bid score
export function calculateBidScore(bid: VendorBid, allBids: VendorBid[]): number {
  // Price Score (0-100): Lower is better
  const lowestPrice = Math.min(...allBids.map(b => b.grandTotal))
  const priceScore = (lowestPrice / bid.grandTotal) * 100
  
  // Quality Score (0-100): Based on certifications & vendor rating
  const certScore = Math.min(bid.certifications.length * 20, 60)
  const vendorRating = bid.vendorRating || 4
  const qualityScore = certScore + (vendorRating / 5) * 40
  
  // Delivery Score (0-100): Faster is better
  const fastestDelivery = Math.min(...allBids.map(b => b.deliveryDays))
  const deliveryScore = bid.deliveryDays > 0 ? (fastestDelivery / bid.deliveryDays) * 100 : 50
  
  return (priceScore * RANKING_WEIGHTS.price) + 
         (qualityScore * RANKING_WEIGHTS.quality) + 
         (deliveryScore * RANKING_WEIGHTS.delivery)
}

// Get bid badges
export function getBidBadges(bid: VendorBid, allBids: VendorBid[]): BidBadge[] {
  const badges: BidBadge[] = []
  
  const lowestPrice = Math.min(...allBids.map(b => b.grandTotal))
  if (bid.grandTotal === lowestPrice) {
    badges.push({ type: 'BEST_PRICE', label: 'Best Price' })
  }
  
  const highestQuality = Math.max(...allBids.map(b => b.evaluation?.qualityScore || 0))
  if (bid.evaluation?.qualityScore === highestQuality && highestQuality > 0) {
    badges.push({ type: 'HIGH_QUALITY', label: 'High Quality' })
  }
  
  const fastestDelivery = Math.min(...allBids.map(b => b.deliveryDays))
  if (bid.deliveryDays === fastestDelivery) {
    badges.push({ type: 'FAST_DELIVERY', label: 'Fast Delivery' })
  }
  
  return badges
}

// Status colors
export const SCOPE_STATUS_COLORS: Record<ScopeStatus, { bg: string; text: string; border: string }> = {
  DRAFT: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-muted' },
  SENT: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300' },
  BIDDING_ACTIVE: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300' },
  BIDDING_CLOSED: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-300' },
  EVALUATION: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-300' },
  ASSIGNED: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300' },
  CANCELLED: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-500', border: 'border-gray-300' },
}

export const BID_STATUS_COLORS: Record<BidStatus, { bg: string; text: string; border: string }> = {
  SUBMITTED: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300' },
  UNDER_REVIEW: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300' },
  SHORTLISTED: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-300' },
  SELECTED: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300' },
  REJECTED: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-300' },
}

// Sample Material Categories
export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  { id: 'cat_elec', code: 'ELEC', name: 'Electrical Materials', description: 'Wires, switches, panels', icon: 'Zap', isActive: true, sortOrder: 1, vendorCount: 24, newVendors: 3, createdAt: '', updatedAt: '' },
  { id: 'cat_iron', code: 'IRON', name: 'Iron / Steel', description: 'TMT bars, binding wire', icon: 'Hammer', isActive: true, sortOrder: 2, vendorCount: 32, newVendors: 5, createdAt: '', updatedAt: '' },
  { id: 'cat_tiles', code: 'TILES', name: 'Tiles & Flooring', description: 'Floor tiles, wall tiles', icon: 'Grid3X3', isActive: true, sortOrder: 3, vendorCount: 18, createdAt: '', updatedAt: '' },
  { id: 'cat_cement', code: 'CEMENT', name: 'Cement', description: 'OPC, PPC, white cement', icon: 'Package', isActive: true, sortOrder: 4, vendorCount: 15, createdAt: '', updatedAt: '' },
  { id: 'cat_sand', code: 'SAND', name: 'Sand & Aggregates', description: 'River sand, M-sand, gravel', icon: 'Mountain', isActive: true, sortOrder: 5, vendorCount: 28, createdAt: '', updatedAt: '' },
  { id: 'cat_plumb', code: 'PLUMB', name: 'Plumbing Materials', description: 'Pipes, fittings, sanitaryware', icon: 'Droplet', isActive: true, sortOrder: 6, vendorCount: 21, createdAt: '', updatedAt: '' },
  { id: 'cat_paints', code: 'PAINTS', name: 'Paints & Finishes', description: 'Interior, exterior, primers', icon: 'Paintbrush', isActive: true, sortOrder: 7, vendorCount: 16, newVendors: 2, createdAt: '', updatedAt: '' },
  { id: 'cat_wood', code: 'WOOD', name: 'Wood & Plywood', description: 'Plywood, laminates, veneers', icon: 'TreePine', isActive: true, sortOrder: 8, vendorCount: 12, createdAt: '', updatedAt: '' },
  { id: 'cat_hardware', code: 'HARDWARE', name: 'Hardware & Fixtures', description: 'Locks, handles, hinges', icon: 'Wrench', isActive: true, sortOrder: 9, vendorCount: 19, createdAt: '', updatedAt: '' },
  { id: 'cat_glass', code: 'GLASS', name: 'Glass & Glazing', description: 'Windows, mirrors, glass panels', icon: 'Square', isActive: true, sortOrder: 10, vendorCount: 9, createdAt: '', updatedAt: '' },
  { id: 'cat_brick', code: 'BRICK', name: 'Bricks & Blocks', description: 'Red bricks, AAC blocks', icon: 'Box', isActive: true, sortOrder: 11, vendorCount: 14, createdAt: '', updatedAt: '' },
  { id: 'cat_rmc', code: 'RMC', name: 'Ready Mix Concrete', description: 'RMC of various grades', icon: 'Truck', isActive: true, sortOrder: 12, vendorCount: 8, createdAt: '', updatedAt: '' },
]

// Sample Projects for dropdown
export const SAMPLE_PROJECTS = [
  { id: 'prj_001', code: 'PRJ-HYD-2026-0089', name: 'Gachibowli Villa Project', address: 'Plot 42, Gachibowli, Hyderabad', cityId: 'hyd' },
  { id: 'prj_002', code: 'PRJ-HYD-2026-0092', name: 'Jubilee Hills Apartments', address: 'Road No. 36, Jubilee Hills, Hyderabad', cityId: 'hyd' },
  { id: 'prj_003', code: 'PRJ-BLR-2026-0045', name: 'Whitefield Commercial Complex', address: 'ITPL Road, Whitefield, Bangalore', cityId: 'blr' },
  { id: 'prj_004', code: 'PRJ-CHN-2026-0021', name: 'OMR Residential Tower', address: 'Sholinganallur, Chennai', cityId: 'chn' },
]

// Sample Quality Standards
export const QUALITY_STANDARDS: Record<string, QualityStandard[]> = {
  IRON: [
    { id: 'qs_1', standardCode: 'IS 1786', description: 'TMT bars shall conform to IS 1786', isMandatory: true },
    { id: 'qs_2', standardCode: 'BIS', description: 'BIS certification required', isMandatory: true },
    { id: 'qs_3', standardCode: 'MTC', description: 'Mill Test Certificate for each batch', isMandatory: true },
  ],
  CEMENT: [
    { id: 'qs_4', standardCode: 'IS 269', description: 'OPC shall conform to IS 269', isMandatory: true },
    { id: 'qs_5', standardCode: 'IS 1489', description: 'PPC shall conform to IS 1489', isMandatory: true },
    { id: 'qs_6', standardCode: 'BIS', description: 'BIS certification required', isMandatory: true },
  ],
  ELEC: [
    { id: 'qs_7', standardCode: 'ISI', description: 'All products must have ISI mark', isMandatory: true },
    { id: 'qs_8', standardCode: 'IS 694', description: 'Wires shall conform to IS 694', isMandatory: true },
  ],
  TILES: [
    { id: 'qs_9', standardCode: 'IS 15622', description: 'Ceramic tiles shall conform to IS 15622', isMandatory: true },
    { id: 'qs_10', standardCode: 'Grade A', description: 'Only Grade A tiles accepted', isMandatory: true },
  ],
}

// Sample Locations
export const LOCATIONS: Location[] = [
  { id: 'loc_hyd', name: 'Hyderabad', code: 'HYD' },
  { id: 'loc_blr', name: 'Bangalore', code: 'BLR' },
  { id: 'loc_chn', name: 'Chennai', code: 'CHN' },
  { id: 'loc_mum', name: 'Mumbai', code: 'MUM' },
  { id: 'loc_pun', name: 'Pune', code: 'PUN' },
]

// Sample Branches
export const BRANCHES: Branch[] = [
  { id: 'br_1', name: 'Main Branch', locationId: 'loc_hyd' },
  { id: 'br_2', name: 'Gachibowli', locationId: 'loc_hyd' },
  { id: 'br_3', name: 'Madhapur', locationId: 'loc_hyd' },
  { id: 'br_4', name: 'Whitefield', locationId: 'loc_blr' },
  { id: 'br_5', name: 'Electronic City', locationId: 'loc_blr' },
  { id: 'br_6', name: 'OMR', locationId: 'loc_chn' },
  { id: 'br_7', name: 'Andheri', locationId: 'loc_mum' },
]

// Units for materials
export const MATERIAL_UNITS = [
  'KG', 'MT', 'Nos', 'Bags', 'Sqft', 'Sqm', 'Rft', 'Ltr', 'Cubic Meter', 'Set'
]

// Payment Terms options
export const PAYMENT_TERMS_OPTIONS = [
  '100% Advance',
  '50% Advance, 50% on Delivery',
  '30 Days Credit',
  '45 Days Credit',
  '60 Days Credit',
  'Against Delivery',
]

// =====================
// MATERIALS CATALOG
// =====================

export interface CatalogCategory {
  id: string
  name: string
  icon: string
  color: string
  description: string
  subCategories: SubCategory[]
  materialCount: number
}

export interface SubCategory {
  id: string
  name: string
  materialCount: number
}

export interface CatalogMaterial {
  id: string
  code: string
  name: string
  categoryId: string
  subCategoryId?: string
  description: string
  specifications: MaterialSpecification[]
  brands: MaterialBrand[]
  defaultUnit: string
  hsnCode: string
  gstRate: number
  images: string[]
  tags: string[]
  isActive: boolean
  avgPrice: number
  priceRange: { min: number; max: number }
  totalConsumed: number
  avgMonthlyUsage: number
}

export interface MaterialSpecification {
  name: string
  value: string
}

export interface MaterialBrand {
  id: string
  name: string
  logo?: string
  grade: string
  pricePerUnit: number
  unit: string
  moq: number
  leadTime: number
  qualityRating: number
  isPreferred: boolean
  lastUpdated: string
}

export interface PriceHistoryPoint {
  date: string
  price: number
  brand?: string
}

// Mock Categories for Materials Catalog
export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'Zap',
    color: '#F59E0B',
    description: 'Wires, switches, panels, and electrical fittings',
    materialCount: 156,
    subCategories: [
      { id: 'wires', name: 'Wires & Cables', materialCount: 42 },
      { id: 'switches', name: 'Switches & Sockets', materialCount: 38 },
      { id: 'panels', name: 'Panels & MCBs', materialCount: 28 },
      { id: 'conduits', name: 'Conduits & Pipes', materialCount: 24 },
      { id: 'lighting', name: 'Lighting', materialCount: 24 },
    ],
  },
  {
    id: 'steel',
    name: 'Steel & Iron',
    icon: 'Layers',
    color: '#6366F1',
    description: 'TMT bars, MS angles, channels, and structural steel',
    materialCount: 89,
    subCategories: [
      { id: 'tmt', name: 'TMT Bars', materialCount: 24 },
      { id: 'angles', name: 'MS Angles', materialCount: 18 },
      { id: 'channels', name: 'Channels', materialCount: 15 },
      { id: 'pipes', name: 'GI Pipes', materialCount: 20 },
      { id: 'binding', name: 'Binding Wire', materialCount: 12 },
    ],
  },
  {
    id: 'cement',
    name: 'Cement',
    icon: 'Package',
    color: '#64748B',
    description: 'OPC, PPC, and specialty cement products',
    materialCount: 45,
    subCategories: [
      { id: 'opc', name: 'OPC Cement', materialCount: 15 },
      { id: 'ppc', name: 'PPC Cement', materialCount: 12 },
      { id: 'specialty', name: 'Specialty Cement', materialCount: 8 },
      { id: 'readymix', name: 'Ready Mix', materialCount: 10 },
    ],
  },
  {
    id: 'tiles',
    name: 'Tiles & Flooring',
    icon: 'Grid3X3',
    color: '#10B981',
    description: 'Ceramic, vitrified, and natural stone tiles',
    materialCount: 234,
    subCategories: [
      { id: 'ceramic', name: 'Ceramic Tiles', materialCount: 68 },
      { id: 'vitrified', name: 'Vitrified Tiles', materialCount: 72 },
      { id: 'marble', name: 'Marble', materialCount: 42 },
      { id: 'granite', name: 'Granite', materialCount: 52 },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'Droplets',
    color: '#3B82F6',
    description: 'Pipes, fittings, fixtures, and sanitary ware',
    materialCount: 178,
    subCategories: [
      { id: 'cpvc', name: 'CPVC Pipes', materialCount: 35 },
      { id: 'upvc', name: 'uPVC Pipes', materialCount: 32 },
      { id: 'fittings', name: 'Pipe Fittings', materialCount: 48 },
      { id: 'sanitary', name: 'Sanitary Ware', materialCount: 38 },
      { id: 'taps', name: 'Taps & Fixtures', materialCount: 25 },
    ],
  },
  {
    id: 'sand',
    name: 'Sand & Aggregates',
    icon: 'Mountain',
    color: '#D97706',
    description: 'River sand, M-sand, and construction aggregates',
    materialCount: 32,
    subCategories: [
      { id: 'msand', name: 'M-Sand', materialCount: 8 },
      { id: 'river', name: 'River Sand', materialCount: 6 },
      { id: 'coarse', name: 'Coarse Aggregate', materialCount: 10 },
      { id: 'fine', name: 'Fine Aggregate', materialCount: 8 },
    ],
  },
  {
    id: 'paint',
    name: 'Paints & Finishes',
    icon: 'Paintbrush',
    color: '#EC4899',
    description: 'Interior, exterior paints and wood finishes',
    materialCount: 145,
    subCategories: [
      { id: 'interior', name: 'Interior Paints', materialCount: 45 },
      { id: 'exterior', name: 'Exterior Paints', materialCount: 38 },
      { id: 'primers', name: 'Primers', materialCount: 22 },
      { id: 'wood', name: 'Wood Finishes', materialCount: 25 },
      { id: 'specialty', name: 'Specialty Coatings', materialCount: 15 },
    ],
  },
  {
    id: 'wood',
    name: 'Wood & Plywood',
    icon: 'TreePine',
    color: '#92400E',
    description: 'Plywood, block boards, and timber products',
    materialCount: 67,
    subCategories: [
      { id: 'plywood', name: 'Plywood', materialCount: 24 },
      { id: 'blockboard', name: 'Block Board', materialCount: 12 },
      { id: 'mdf', name: 'MDF', materialCount: 15 },
      { id: 'timber', name: 'Timber', materialCount: 16 },
    ],
  },
  {
    id: 'hardware',
    name: 'Hardware & Fixtures',
    icon: 'Wrench',
    color: '#7C3AED',
    description: 'Door hardware, locks, hinges, and fixtures',
    materialCount: 198,
    subCategories: [
      { id: 'locks', name: 'Locks', materialCount: 42 },
      { id: 'hinges', name: 'Hinges', materialCount: 35 },
      { id: 'handles', name: 'Door Handles', materialCount: 48 },
      { id: 'closers', name: 'Door Closers', materialCount: 28 },
      { id: 'misc', name: 'Miscellaneous', materialCount: 45 },
    ],
  },
  {
    id: 'bricks',
    name: 'Bricks & Blocks',
    icon: 'LayoutGrid',
    color: '#DC2626',
    description: 'Clay bricks, AAC blocks, and concrete blocks',
    materialCount: 28,
    subCategories: [
      { id: 'clay', name: 'Clay Bricks', materialCount: 8 },
      { id: 'aac', name: 'AAC Blocks', materialCount: 10 },
      { id: 'concrete', name: 'Concrete Blocks', materialCount: 10 },
    ],
  },
]

// Mock Materials Data
export const CATALOG_MATERIALS: CatalogMaterial[] = [
  {
    id: 'MAT-STL-001',
    code: 'TMT-FE500D',
    name: 'TMT Steel Bars - Fe 500D',
    categoryId: 'steel',
    subCategoryId: 'tmt',
    description: 'High strength thermo-mechanically treated steel bars for RCC construction. Earthquake resistant with superior ductility.',
    specifications: [
      { name: 'Grade', value: 'Fe 500D' },
      { name: 'Diameter Options', value: '8mm, 10mm, 12mm, 16mm, 20mm, 25mm' },
      { name: 'Standard Length', value: '12 meters' },
      { name: 'Yield Strength', value: '500 N/mm2' },
      { name: 'Elongation', value: '>=16%' },
    ],
    brands: [
      { id: 'BRD-001', name: 'TATA TISCON', grade: 'Fe 500D', pricePerUnit: 68, unit: 'kg', moq: 1000, leadTime: 3, qualityRating: 4.8, isPreferred: true, lastUpdated: '2026-01-15' },
      { id: 'BRD-002', name: 'JSW NeoSteel', grade: 'Fe 500D', pricePerUnit: 65, unit: 'kg', moq: 500, leadTime: 2, qualityRating: 4.5, isPreferred: true, lastUpdated: '2026-01-18' },
      { id: 'BRD-003', name: 'SAIL TMT', grade: 'Fe 500D', pricePerUnit: 63, unit: 'kg', moq: 1000, leadTime: 4, qualityRating: 4.2, isPreferred: false, lastUpdated: '2026-01-10' },
      { id: 'BRD-004', name: 'Vizag Steel', grade: 'Fe 500D', pricePerUnit: 62, unit: 'kg', moq: 500, leadTime: 3, qualityRating: 4.0, isPreferred: false, lastUpdated: '2026-01-12' },
    ],
    defaultUnit: 'kg',
    hsnCode: '7214',
    gstRate: 18,
    images: [],
    tags: ['TMT', 'Steel', 'Fe 500D', 'Earthquake Resistant'],
    isActive: true,
    avgPrice: 64.5,
    priceRange: { min: 62, max: 68 },
    totalConsumed: 45000,
    avgMonthlyUsage: 7500,
  },
  {
    id: 'MAT-CEM-001',
    code: 'OPC-53',
    name: 'OPC 53 Grade Cement',
    categoryId: 'cement',
    subCategoryId: 'opc',
    description: 'Ordinary Portland Cement 53 Grade for high strength concrete',
    specifications: [
      { name: 'Grade', value: '53' },
      { name: 'Type', value: 'OPC' },
      { name: 'Bag Weight', value: '50 kg' },
      { name: 'Setting Time', value: '30-600 min' },
    ],
    brands: [
      { id: 'BRD-007', name: 'UltraTech', grade: '53', pricePerUnit: 380, unit: 'Bag', moq: 100, leadTime: 1, qualityRating: 4.7, isPreferred: true, lastUpdated: '2026-01-20' },
      { id: 'BRD-008', name: 'ACC', grade: '53', pricePerUnit: 375, unit: 'Bag', moq: 100, leadTime: 1, qualityRating: 4.6, isPreferred: true, lastUpdated: '2026-01-19' },
      { id: 'BRD-009', name: 'Ambuja', grade: '53', pricePerUnit: 370, unit: 'Bag', moq: 100, leadTime: 2, qualityRating: 4.5, isPreferred: false, lastUpdated: '2026-01-18' },
    ],
    defaultUnit: 'Bag',
    hsnCode: '2523',
    gstRate: 28,
    images: [],
    tags: ['Cement', 'OPC', '53 Grade'],
    isActive: true,
    avgPrice: 375,
    priceRange: { min: 370, max: 380 },
    totalConsumed: 8500,
    avgMonthlyUsage: 1400,
  },
  {
    id: 'MAT-ELE-001',
    code: 'WIRE-FR-1.5',
    name: 'FR PVC Insulated Wire 1.5 sq mm',
    categoryId: 'electrical',
    subCategoryId: 'wires',
    description: 'Flame retardant PVC insulated copper conductor wire',
    specifications: [
      { name: 'Size', value: '1.5 sq mm' },
      { name: 'Conductor', value: 'Electrolytic Grade Copper' },
      { name: 'Insulation', value: 'FR PVC' },
      { name: 'Voltage Rating', value: '1100V' },
    ],
    brands: [
      { id: 'BRD-010', name: 'Havells', grade: 'FR', pricePerUnit: 28, unit: 'meter', moq: 100, leadTime: 2, qualityRating: 4.8, isPreferred: true, lastUpdated: '2026-01-17' },
      { id: 'BRD-011', name: 'Polycab', grade: 'FR', pricePerUnit: 26, unit: 'meter', moq: 100, leadTime: 2, qualityRating: 4.6, isPreferred: true, lastUpdated: '2026-01-15' },
      { id: 'BRD-012', name: 'Finolex', grade: 'FR', pricePerUnit: 25, unit: 'meter', moq: 100, leadTime: 3, qualityRating: 4.4, isPreferred: false, lastUpdated: '2026-01-14' },
    ],
    defaultUnit: 'meter',
    hsnCode: '8544',
    gstRate: 18,
    images: [],
    tags: ['Wire', 'Electrical', 'FR', 'Copper'],
    isActive: true,
    avgPrice: 26.3,
    priceRange: { min: 25, max: 28 },
    totalConsumed: 25000,
    avgMonthlyUsage: 4200,
  },
  {
    id: 'MAT-PLM-001',
    code: 'CPVC-1INCH',
    name: 'CPVC Pipe 1 inch',
    categoryId: 'plumbing',
    subCategoryId: 'cpvc',
    description: 'Chlorinated PVC pipe for hot and cold water supply',
    specifications: [
      { name: 'Size', value: '1 inch (25mm)' },
      { name: 'Length', value: '3 meters' },
      { name: 'Pressure Rating', value: 'SDR 11' },
      { name: 'Temperature', value: 'Up to 93C' },
    ],
    brands: [
      { id: 'BRD-013', name: 'Ashirvad', grade: 'SDR 11', pricePerUnit: 185, unit: 'pipe', moq: 50, leadTime: 2, qualityRating: 4.6, isPreferred: true, lastUpdated: '2026-01-16' },
      { id: 'BRD-014', name: 'Supreme', grade: 'SDR 11', pricePerUnit: 180, unit: 'pipe', moq: 50, leadTime: 2, qualityRating: 4.5, isPreferred: true, lastUpdated: '2026-01-18' },
      { id: 'BRD-015', name: 'Prince', grade: 'SDR 11', pricePerUnit: 175, unit: 'pipe', moq: 50, leadTime: 3, qualityRating: 4.2, isPreferred: false, lastUpdated: '2026-01-12' },
    ],
    defaultUnit: 'pipe',
    hsnCode: '3917',
    gstRate: 18,
    images: [],
    tags: ['CPVC', 'Pipe', 'Plumbing', 'Hot Water'],
    isActive: true,
    avgPrice: 180,
    priceRange: { min: 175, max: 185 },
    totalConsumed: 3200,
    avgMonthlyUsage: 530,
  },
  {
    id: 'MAT-TIL-001',
    code: 'VIT-600X600',
    name: 'Vitrified Floor Tiles 600x600mm',
    categoryId: 'tiles',
    subCategoryId: 'vitrified',
    description: 'Premium double charge vitrified tiles with high gloss finish',
    specifications: [
      { name: 'Size', value: '600mm x 600mm' },
      { name: 'Thickness', value: '9mm' },
      { name: 'Water Absorption', value: '<0.5%' },
      { name: 'Breaking Strength', value: '>2000N' },
    ],
    brands: [
      { id: 'BRD-016', name: 'Kajaria', grade: 'Premium', pricePerUnit: 85, unit: 'sqft', moq: 200, leadTime: 5, qualityRating: 4.7, isPreferred: true, lastUpdated: '2026-01-14' },
      { id: 'BRD-017', name: 'Somany', grade: 'Premium', pricePerUnit: 78, unit: 'sqft', moq: 200, leadTime: 5, qualityRating: 4.5, isPreferred: true, lastUpdated: '2026-01-12' },
      { id: 'BRD-018', name: 'Johnson', grade: 'Premium', pricePerUnit: 75, unit: 'sqft', moq: 200, leadTime: 7, qualityRating: 4.3, isPreferred: false, lastUpdated: '2026-01-10' },
    ],
    defaultUnit: 'sqft',
    hsnCode: '6907',
    gstRate: 18,
    images: [],
    tags: ['Tiles', 'Vitrified', 'Flooring', '600x600'],
    isActive: true,
    avgPrice: 79.3,
    priceRange: { min: 75, max: 85 },
    totalConsumed: 18500,
    avgMonthlyUsage: 3100,
  },
  {
    id: 'MAT-PNT-001',
    code: 'INT-EMULSION',
    name: 'Interior Emulsion Paint',
    categoryId: 'paint',
    subCategoryId: 'interior',
    description: 'Premium interior emulsion paint with excellent coverage',
    specifications: [
      { name: 'Type', value: 'Acrylic Emulsion' },
      { name: 'Finish', value: 'Matt/Silk' },
      { name: 'Coverage', value: '120-140 sqft/ltr' },
      { name: 'VOC', value: 'Low VOC' },
    ],
    brands: [
      { id: 'BRD-019', name: 'Asian Paints Royale', grade: 'Premium', pricePerUnit: 450, unit: 'ltr', moq: 20, leadTime: 2, qualityRating: 4.8, isPreferred: true, lastUpdated: '2026-01-19' },
      { id: 'BRD-020', name: 'Berger Silk', grade: 'Premium', pricePerUnit: 420, unit: 'ltr', moq: 20, leadTime: 2, qualityRating: 4.6, isPreferred: true, lastUpdated: '2026-01-17' },
      { id: 'BRD-021', name: 'Nerolac Excel', grade: 'Premium', pricePerUnit: 400, unit: 'ltr', moq: 20, leadTime: 3, qualityRating: 4.4, isPreferred: false, lastUpdated: '2026-01-15' },
    ],
    defaultUnit: 'ltr',
    hsnCode: '3209',
    gstRate: 18,
    images: [],
    tags: ['Paint', 'Interior', 'Emulsion', 'Wall Paint'],
    isActive: true,
    avgPrice: 423,
    priceRange: { min: 400, max: 450 },
    totalConsumed: 1200,
    avgMonthlyUsage: 200,
  },
]

// Price History Mock Data
export const PRICE_HISTORY: Record<string, PriceHistoryPoint[]> = {
  'MAT-STL-001': [
    { date: '2025-08-01', price: 58 },
    { date: '2025-09-01', price: 60 },
    { date: '2025-10-01', price: 62 },
    { date: '2025-11-01', price: 61 },
    { date: '2025-12-01', price: 63 },
    { date: '2026-01-01', price: 64.5 },
  ],
  'MAT-CEM-001': [
    { date: '2025-08-01', price: 350 },
    { date: '2025-09-01', price: 355 },
    { date: '2025-10-01', price: 360 },
    { date: '2025-11-01', price: 365 },
    { date: '2025-12-01', price: 370 },
    { date: '2026-01-01', price: 375 },
  ],
}
