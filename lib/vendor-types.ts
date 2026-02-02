// Vendor Application Data Types

export interface Address {
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  landmark?: string
}

export interface Document {
  id: string
  name: string
  url: string
  type: string
  uploadedAt: string
  size: number
}

export interface VendorApplication {
  id: string
  applicationNumber: string // Auto-generated: VND-HYD-2026-0001
  
  // Company Information
  companyInfo: {
    name: string
    legalName: string
    type: 'Proprietorship' | 'Partnership' | 'LLP' | 'Private Limited' | 'Public Limited'
    gstin: string
    pan: string
    incorporationDate: string
    registeredAddress: Address
    operationalAddress?: Address
  }
  
  // Contact Information
  contactInfo: {
    primaryContact: {
      name: string
      designation: string
      phone: string
      email: string
      whatsapp?: string
    }
    alternateContact?: {
      name: string
      phone: string
      email: string
    }
  }
  
  // Supply Categories (Multi-select)
  supplyCategories: SupplyCategory[]
  
  // Bank Details
  bankDetails: {
    accountName: string
    accountNumber: string
    bankName: string
    branchName: string
    ifscCode: string
    accountType: 'Current' | 'Savings'
  }
  
  // Documents
  documents: {
    gstCertificate?: Document
    panCard?: Document
    incorporationCertificate?: Document
    bankStatement?: Document
    qualityCertifications?: Document[]
    productCatalog?: Document
    referenceLetter?: Document[]
  }
  
  // Vendor Classification (Set by City Admin)
  classification?: {
    vendorType: 'Fixed' | 'Temporary'
    creditLimit?: number
    paymentTerms?: string
  }
  
  // City Assignment
  cityId: string
  cityName: string
  
  // Workflow Status
  status: VendorApplicationStatus
  
  // Workflow History
  workflowHistory: WorkflowEvent[]
  
  // Timestamps
  createdAt: string
  updatedAt: string
  submittedAt?: string
}

export type VendorApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'city_review'
  | 'city_rejected'
  | 'qa_review'
  | 'qa_approved'
  | 'qa_rejected'
  | 'city_post_qa_review'
  | 'pending_super_admin'
  | 'super_admin_approved'
  | 'super_admin_rejected'
  | 'onboarded'

export interface WorkflowEvent {
  id: string
  status: VendorApplicationStatus
  action: string
  performedBy: string
  performedByRole: string
  remarks?: string
  timestamp: string
}

export interface SupplyCategory {
  id: string
  name: string
  code: string
  subcategories?: string[]
  selectedSubcategories?: string[]
}

// Predefined Supply Categories
export const SUPPLY_CATEGORIES: SupplyCategory[] = [
  { id: 'cement', name: 'Cement', code: 'CEM', subcategories: ['OPC', 'PPC', 'PSC'] },
  { id: 'sand', name: 'Sand', code: 'SND', subcategories: ['River Sand', 'M-Sand', 'P-Sand'] },
  { id: 'steel', name: 'Iron / Steel', code: 'STL', subcategories: ['TMT Bars', 'Structural Steel', 'Binding Wire'] },
  { id: 'electrical', name: 'Electrical Materials', code: 'ELE', subcategories: ['Wires', 'Switches', 'MCB/DB', 'Lighting'] },
  { id: 'plumbing', name: 'Plumbing Materials', code: 'PLM', subcategories: ['Pipes', 'Fittings', 'Sanitary', 'Water Tanks'] },
  { id: 'tiles', name: 'Tiles & Flooring', code: 'TIL', subcategories: ['Floor Tiles', 'Wall Tiles', 'Granite', 'Marble'] },
  { id: 'hardware', name: 'Hardware & Fixtures', code: 'HRD', subcategories: ['Door Hardware', 'Window Hardware', 'Bathroom Fixtures'] },
  { id: 'paints', name: 'Paints & Finishes', code: 'PNT', subcategories: ['Interior Paints', 'Exterior Paints', 'Primers'] },
  { id: 'wood', name: 'Wood & Plywood', code: 'WOD', subcategories: ['Plywood', 'Block Board', 'Doors', 'Frames'] },
  { id: 'aggregates', name: 'Aggregates', code: 'AGG', subcategories: ['Coarse Aggregate', 'Fine Aggregate', 'Ready Mix'] },
  { id: 'other', name: 'Other Construction Materials', code: 'OTH' }
]

export const COMPANY_TYPES = [
  { value: 'Proprietorship', label: 'Proprietorship' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'LLP', label: 'Limited Liability Partnership (LLP)' },
  { value: 'Private Limited', label: 'Private Limited Company' },
  { value: 'Public Limited', label: 'Public Limited Company' },
]

export const INDIAN_STATES = [
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CT', label: 'Chhattisgarh' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TG', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UK', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' },
  { value: 'DL', label: 'Delhi' },
]

export const STATUS_CONFIG: Record<VendorApplicationStatus, { label: string; color: string; bgClass: string; textClass: string; borderClass: string }> = {
  draft: { 
    label: 'Draft', 
    color: '#6B7280',
    bgClass: 'bg-[var(--status-draft-bg)]',
    textClass: 'text-[var(--status-draft-text)]',
    borderClass: 'border-[var(--status-draft-border)]'
  },
  submitted: { 
    label: 'Submitted', 
    color: '#1D4ED8',
    bgClass: 'bg-[var(--status-submitted-bg)]',
    textClass: 'text-[var(--status-submitted-text)]',
    borderClass: 'border-[var(--status-submitted-border)]'
  },
  city_review: { 
    label: 'City Admin Review', 
    color: '#D97706',
    bgClass: 'bg-[var(--status-under-review-bg)]',
    textClass: 'text-[var(--status-under-review-text)]',
    borderClass: 'border-[var(--status-under-review-border)]'
  },
  city_rejected: { 
    label: 'Rejected by City Admin', 
    color: '#DC2626',
    bgClass: 'bg-[var(--status-rejected-bg)]',
    textClass: 'text-[var(--status-rejected-text)]',
    borderClass: 'border-[var(--status-rejected-border)]'
  },
  qa_review: { 
    label: 'QA Review', 
    color: '#D97706',
    bgClass: 'bg-[var(--status-under-review-bg)]',
    textClass: 'text-[var(--status-under-review-text)]',
    borderClass: 'border-[var(--status-under-review-border)]'
  },
  qa_approved: { 
    label: 'QA Approved', 
    color: '#059669',
    bgClass: 'bg-[var(--status-qa-approved-bg)]',
    textClass: 'text-[var(--status-qa-approved-text)]',
    borderClass: 'border-[var(--status-qa-approved-border)]'
  },
  qa_rejected: { 
    label: 'QA Rejected', 
    color: '#DC2626',
    bgClass: 'bg-[var(--status-qa-rejected-bg)]',
    textClass: 'text-[var(--status-qa-rejected-text)]',
    borderClass: 'border-[var(--status-qa-rejected-border)]'
  },
  city_post_qa_review: { 
    label: 'Post-QA City Review', 
    color: '#D97706',
    bgClass: 'bg-[var(--status-under-review-bg)]',
    textClass: 'text-[var(--status-under-review-text)]',
    borderClass: 'border-[var(--status-under-review-border)]'
  },
  pending_super_admin: { 
    label: 'Pending Super Admin', 
    color: '#D97706',
    bgClass: 'bg-[var(--status-under-review-bg)]',
    textClass: 'text-[var(--status-under-review-text)]',
    borderClass: 'border-[var(--status-under-review-border)]'
  },
  super_admin_approved: { 
    label: 'Approved', 
    color: '#059669',
    bgClass: 'bg-[var(--status-approved-bg)]',
    textClass: 'text-[var(--status-approved-text)]',
    borderClass: 'border-[var(--status-approved-border)]'
  },
  super_admin_rejected: { 
    label: 'Rejected', 
    color: '#DC2626',
    bgClass: 'bg-[var(--status-rejected-bg)]',
    textClass: 'text-[var(--status-rejected-text)]',
    borderClass: 'border-[var(--status-rejected-border)]'
  },
  onboarded: { 
    label: 'Onboarded', 
    color: '#F5A623',
    bgClass: 'bg-[var(--status-onboarded-bg)]',
    textClass: 'text-[var(--status-onboarded-text)]',
    borderClass: 'border-[var(--status-onboarded-border)]'
  },
}

// City Admin Review Types
export interface CityAdminReview {
  applicationId: string
  reviewType: 'initial' | 'post_qa'
  
  initialReview?: {
    completenessCheck: {
      companyInfoComplete: boolean
      documentsComplete: boolean
      categoryRelevant: boolean
      bankDetailsVerified: boolean
    }
    notes: string
  }
  
  classification: {
    vendorType: 'Fixed' | 'Temporary'
    creditLimit?: number
    paymentTerms?: '7 Days' | '15 Days' | '30 Days' | '45 Days'
  }
  
  postQAReview?: {
    qaDecisionAcknowledged: boolean
    finalRecommendation: 'approve' | 'reject'
    recommendationNotes: string
  }
  
  decision: 'pending' | 'rejected' | 'forwarded_to_qa' | 'forwarded_to_super_admin'
}

export const CITY_REJECTION_REASONS = [
  { code: 'INCOMPLETE_DOCS', label: 'Incomplete documentation' },
  { code: 'INVALID_GSTIN', label: 'Invalid or mismatched GSTIN' },
  { code: 'CATEGORY_NOT_NEEDED', label: 'Category not required in this city' },
  { code: 'DUPLICATE_VENDOR', label: 'Vendor already registered' },
  { code: 'BLACKLISTED', label: 'Vendor or promoter blacklisted' },
  { code: 'OTHER', label: 'Other reason (specify)' }
]

export const PAYMENT_TERMS = [
  { value: '7 Days', label: '7 Days' },
  { value: '15 Days', label: '15 Days' },
  { value: '30 Days', label: '30 Days' },
  { value: '45 Days', label: '45 Days' },
]

// QA Evaluation Types
export interface CertificationCheck {
  id: string
  name: string
  required: boolean
  verified: boolean
  documentId?: string
  notes?: string
}

export interface CategoryQualityAssessment {
  categoryId: string
  categoryName: string
  criteria: QualityCriteriaCheck[]
  score: number
  notes: string
}

export interface QualityCriteriaCheck {
  id: string
  name: string
  description: string
  required: boolean
  verified: boolean
  notes?: string
}

export interface QAEvaluation {
  id: string
  applicationId: string
  
  companyLegitimacy: {
    gstinVerified: boolean
    panVerified: boolean
    companyAgeAdequate: boolean
    noLegalIssues: boolean
    legitimacyScore: number // 1-5
    legitimacyNotes: string
  }
  
  businessStandards: {
    operationalCapacity: 'Low' | 'Medium' | 'High'
    infrastructureAdequate: boolean
    financialStability: 'Weak' | 'Moderate' | 'Strong'
    businessScore: number // 1-5
    businessNotes: string
  }
  
  compliance: {
    gstCompliant: boolean
    requiredCertifications: CertificationCheck[]
    complianceScore: number // 1-5
    complianceNotes: string
  }
  
  qualityStandards: {
    categoryAssessments: CategoryQualityAssessment[]
    overallQualityScore: number // 1-5
    qualityNotes: string
  }
  
  overallAssessment: {
    totalScore: number
    recommendation: 'approve' | 'reject'
    strengths: string[]
    weaknesses: string[]
    risks: string[]
    finalRemarks: string
  }
  
  decision?: 'approved' | 'rejected'
  rejectionReasons?: QARejectionReason[]
  evaluatedBy?: string
  evaluatedAt?: string
}

export interface QARejectionReason {
  code: string
  label: string
  details?: string
}

export const QA_REJECTION_REASONS = [
  { code: 'LOW_LEGITIMACY', label: 'Company legitimacy concerns' },
  { code: 'POOR_INFRASTRUCTURE', label: 'Inadequate operational infrastructure' },
  { code: 'FINANCIAL_INSTABILITY', label: 'Financial stability concerns' },
  { code: 'COMPLIANCE_ISSUES', label: 'Compliance/certification issues' },
  { code: 'QUALITY_BELOW_STANDARD', label: 'Quality standards not met' },
  { code: 'DOCUMENTATION_ISSUES', label: 'Documentation verification failed' },
  { code: 'CAPACITY_MISMATCH', label: 'Capacity does not match requirements' },
  { code: 'OTHER', label: 'Other reason (specify)' },
]

// Category-specific Quality Criteria
export const QUALITY_CRITERIA: Record<string, QualityCriteriaCheck[]> = {
  cement: [
    { id: 'cem_grade', name: 'Cement Grade', description: 'OPC 43/53 or PPC as per IS standards', required: true, verified: false },
    { id: 'cem_bis', name: 'BIS Certification', description: 'Valid BIS certification', required: true, verified: false },
    { id: 'cem_testing', name: 'Testing Reports', description: 'Recent quality testing reports', required: true, verified: false },
    { id: 'cem_storage', name: 'Storage Facility', description: 'Proper moisture-free storage', required: false, verified: false },
  ],
  steel: [
    { id: 'stl_grade', name: 'Steel Grade', description: 'Fe 415/500/550 as per IS 1786', required: true, verified: false },
    { id: 'stl_bis', name: 'BIS Certification', description: 'Valid BIS certification for TMT', required: true, verified: false },
    { id: 'stl_mtc', name: 'Mill Test Certificate', description: 'MTC for each batch', required: true, verified: false },
    { id: 'stl_storage', name: 'Storage Facility', description: 'Covered storage to prevent rusting', required: false, verified: false },
  ],
  electrical: [
    { id: 'ele_isi', name: 'ISI Marking', description: 'All products with valid ISI mark', required: true, verified: false },
    { id: 'ele_brand', name: 'Brand Authorization', description: 'Authorized dealer certification', required: true, verified: false },
    { id: 'ele_warranty', name: 'Warranty Support', description: 'Warranty and after-sales support', required: false, verified: false },
  ],
  plumbing: [
    { id: 'plm_isi', name: 'ISI Certification', description: 'ISI marked pipes and fittings', required: true, verified: false },
    { id: 'plm_brand', name: 'Brand Authorization', description: 'Authorized dealer for major brands', required: true, verified: false },
    { id: 'plm_pressure', name: 'Pressure Rating', description: 'Appropriate pressure ratings', required: true, verified: false },
  ],
  tiles: [
    { id: 'til_grade', name: 'Tile Grade', description: 'Grade A tiles with consistent quality', required: true, verified: false },
    { id: 'til_brand', name: 'Brand Authorization', description: 'Authorized dealer certification', required: true, verified: false },
    { id: 'til_samples', name: 'Sample Availability', description: 'Sample tiles for inspection', required: false, verified: false },
  ],
  sand: [
    { id: 'snd_grade', name: 'Sand Grade', description: 'As per IS 383 specifications', required: true, verified: false },
    { id: 'snd_sieve', name: 'Sieve Analysis', description: 'Proper gradation reports', required: true, verified: false },
    { id: 'snd_source', name: 'Source Verification', description: 'Legal source documentation', required: true, verified: false },
  ],
  aggregates: [
    { id: 'agg_grade', name: 'Aggregate Grade', description: 'As per IS 383 specifications', required: true, verified: false },
    { id: 'agg_testing', name: 'Testing Reports', description: 'Crushing and impact value tests', required: true, verified: false },
    { id: 'agg_source', name: 'Source Verification', description: 'Legal quarry documentation', required: true, verified: false },
  ],
  paints: [
    { id: 'pnt_brand', name: 'Brand Authorization', description: 'Authorized dealer for major brands', required: true, verified: false },
    { id: 'pnt_storage', name: 'Storage Conditions', description: 'Climate-controlled storage', required: false, verified: false },
    { id: 'pnt_shelf', name: 'Shelf Life Management', description: 'FIFO inventory management', required: false, verified: false },
  ],
  wood: [
    { id: 'wod_grade', name: 'Wood Grade', description: 'BWR/BWP grade plywood', required: true, verified: false },
    { id: 'wod_isi', name: 'ISI Certification', description: 'ISI marked products', required: true, verified: false },
    { id: 'wod_termite', name: 'Termite Treatment', description: 'Termite-resistant treatment', required: false, verified: false },
  ],
  hardware: [
    { id: 'hrd_brand', name: 'Brand Quality', description: 'Reputed brand products', required: true, verified: false },
    { id: 'hrd_warranty', name: 'Warranty', description: 'Manufacturer warranty', required: false, verified: false },
    { id: 'hrd_finish', name: 'Finish Quality', description: 'Consistent finish quality', required: false, verified: false },
  ],
  other: [
    { id: 'oth_quality', name: 'Quality Standards', description: 'Meets general quality standards', required: true, verified: false },
    { id: 'oth_docs', name: 'Documentation', description: 'Proper product documentation', required: true, verified: false },
  ],
}

// Create empty QA evaluation
export const createEmptyQAEvaluation = (applicationId: string): QAEvaluation => ({
  id: `QA-${Date.now()}`,
  applicationId,
  companyLegitimacy: {
    gstinVerified: false,
    panVerified: false,
    companyAgeAdequate: false,
    noLegalIssues: false,
    legitimacyScore: 0,
    legitimacyNotes: '',
  },
  businessStandards: {
    operationalCapacity: 'Medium',
    infrastructureAdequate: false,
    financialStability: 'Moderate',
    businessScore: 0,
    businessNotes: '',
  },
  compliance: {
    gstCompliant: false,
    requiredCertifications: [],
    complianceScore: 0,
    complianceNotes: '',
  },
  qualityStandards: {
    categoryAssessments: [],
    overallQualityScore: 0,
    qualityNotes: '',
  },
  overallAssessment: {
    totalScore: 0,
    recommendation: 'reject',
    strengths: [],
    weaknesses: [],
    risks: [],
    finalRemarks: '',
  },
})

// Super Admin Approval Types
export interface SuperAdminApproval {
  applicationId: string
  
  executiveSummary: {
    vendorName: string
    vendorType: 'Fixed' | 'Temporary'
    categories: string[]
    cityName: string
    qaScore: number
    riskLevel: 'Low' | 'Medium' | 'High'
    daysInProcess: number
    creditLimit: number
    paymentTerms: string
  }
  
  reviewChain: {
    cityAdmin: {
      reviewerName: string
      reviewDate: string
      decision: 'forwarded'
      remarks: string
    }
    qa: {
      reviewerName: string
      reviewDate: string
      decision: 'approved'
      scores: {
        legitimacy: number
        business: number
        compliance: number
        quality: number
      }
      recommendations: string[]
    }
    cityAdminPostQA: {
      reviewerName: string
      reviewDate: string
      decision: 'forwarded_to_super_admin'
      remarks: string
    }
  }
  
  finalDecision?: {
    decision: 'approved' | 'rejected'
    remarks: string
    vendorCode?: string // Generated on approval
    approvedBy: string
    approvedAt: string
  }
}

export interface OnboardedVendor {
  id: string
  vendorCode: string // VND-HYD-FIX-001 or VND-HYD-TMP-001
  companyName: string
  vendorType: 'Fixed' | 'Temporary'
  categories: string[]
  cityName: string
  creditLimit: number
  status: 'Active' | 'Suspended' | 'Inactive'
  onboardedAt: string
}

export const SUPER_ADMIN_REJECTION_REASONS = [
  { code: 'RISK_TOO_HIGH', label: 'Overall risk assessment too high' },
  { code: 'STRATEGIC_FIT', label: 'Does not fit strategic requirements' },
  { code: 'CAPACITY_CONCERN', label: 'Capacity concerns for volume' },
  { code: 'FINANCIAL_CONCERN', label: 'Financial stability concerns' },
  { code: 'MARKET_SATURATION', label: 'Category already saturated in region' },
  { code: 'COMPLIANCE_GAP', label: 'Critical compliance gaps identified' },
  { code: 'OTHER', label: 'Other reason (specify)' },
]

// Workflow State Machine
export const WORKFLOW_TRANSITIONS: Record<VendorApplicationStatus, VendorApplicationStatus[]> = {
  draft: ['submitted'],
  submitted: ['city_review'],
  city_review: ['city_rejected', 'qa_review'],
  city_rejected: [],
  qa_review: ['qa_approved', 'qa_rejected'],
  qa_approved: ['city_post_qa_review'],
  qa_rejected: ['city_post_qa_review'],
  city_post_qa_review: ['city_rejected', 'pending_super_admin'],
  pending_super_admin: ['super_admin_approved', 'super_admin_rejected'],
  super_admin_approved: ['onboarded'],
  super_admin_rejected: [],
  onboarded: [],
}

// Generate Vendor Code
export const generateVendorCode = (cityCode: string, vendorType: 'Fixed' | 'Temporary', serial: number): string => {
  const typeCode = vendorType === 'Fixed' ? 'FIX' : 'TMP'
  return `VND-${cityCode}-${typeCode}-${serial.toString().padStart(3, '0')}`
}

// Calculate Risk Level based on QA Score
export const calculateRiskLevel = (qaScore: number): 'Low' | 'Medium' | 'High' => {
  if (qaScore >= 4.0) return 'Low'
  if (qaScore >= 3.0) return 'Medium'
  return 'High'
}

// Default empty application for new vendors
export const createEmptyApplication = (cityId: string, cityName: string): Partial<VendorApplication> => ({
  companyInfo: {
    name: '',
    legalName: '',
    type: 'Proprietorship',
    gstin: '',
    pan: '',
    incorporationDate: '',
    registeredAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
    },
  },
  contactInfo: {
    primaryContact: {
      name: '',
      designation: '',
      phone: '',
      email: '',
      whatsapp: '',
    },
  },
  supplyCategories: [],
  bankDetails: {
    accountName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    accountType: 'Current',
  },
  documents: {},
  cityId,
  cityName,
  status: 'draft',
  workflowHistory: [],
})
