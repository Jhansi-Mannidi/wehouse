"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, FileText, Download, Eye, FolderOpen, Search, Calendar, User, CheckCircle2, Clock, Building2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Document {
  id: string
  name: string
  type: "pdf" | "dwg" | "xlsx" | "jpg"
  size: string
  date: string
  category: string
  description: string
  relatedMilestones: string[]
  uploadedBy: string
  status: "approved" | "pending" | "revision"
  version: string
  previewImage?: string
}

const documents: Document[] = [
  { 
    id: "d1", 
    name: "Construction Agreement", 
    type: "pdf", 
    size: "2.4 MB", 
    date: "Oct 15, 2025", 
    category: "Contracts",
    description: "Main construction agreement between client and Wehouse covering scope of work, timelines, and payment terms for the 3BHK Villa project.",
    relatedMilestones: ["M1: Foundation", "M2: Plinth Beam", "All Milestones"],
    uploadedBy: "Wehouse Legal Team",
    status: "approved",
    version: "v1.2",
    previewImage: "/images/construction/site-overview.jpg"
  },
  { 
    id: "d2", 
    name: "Architectural Floor Plan", 
    type: "pdf", 
    size: "5.1 MB", 
    date: "Oct 20, 2025", 
    category: "Drawings",
    description: "Detailed floor plan showing room layouts, dimensions, door/window placements for all floors of the villa.",
    relatedMilestones: ["M1: Foundation", "M3: Columns & Beams", "M6: Brickwork"],
    uploadedBy: "Ar. Priya Sharma",
    status: "approved",
    version: "v2.1",
    previewImage: "/images/construction/living-room-plastering.jpg"
  },
  { 
    id: "d3", 
    name: "Electrical Layout", 
    type: "pdf", 
    size: "3.2 MB", 
    date: "Oct 22, 2025", 
    category: "Drawings",
    description: "Complete electrical wiring layout including switch points, socket locations, DB placement, and load calculations.",
    relatedMilestones: ["M14: Electrical First Fix", "M19: Electrical Final"],
    uploadedBy: "Suresh Electricals",
    status: "approved",
    version: "v1.0",
    previewImage: "/images/construction/electrical-work.jpg"
  },
  { 
    id: "d4", 
    name: "Plumbing Layout", 
    type: "pdf", 
    size: "2.8 MB", 
    date: "Oct 22, 2025", 
    category: "Drawings",
    description: "Water supply and drainage pipe layout for all bathrooms, kitchen, and external connections.",
    relatedMilestones: ["M15: Plumbing First Fix", "M20: Plumbing Final"],
    uploadedBy: "Kumar Plumbing Works",
    status: "approved",
    version: "v1.1",
    previewImage: "/images/construction/plumbing-work.jpg"
  },
  { 
    id: "d5", 
    name: "Structural Drawing", 
    type: "dwg", 
    size: "8.5 MB", 
    date: "Oct 25, 2025", 
    category: "Drawings",
    description: "AutoCAD structural drawings showing reinforcement details, beam sections, and column schedules.",
    relatedMilestones: ["M1: Foundation", "M2: Plinth Beam", "M3: Columns & Beams", "M4: Roof Slab"],
    uploadedBy: "Structural Consultants",
    status: "approved",
    version: "v1.3",
    previewImage: "/images/construction/foundation-work.jpg"
  },
  { 
    id: "d6", 
    name: "3D Elevation Renders", 
    type: "jpg", 
    size: "12.3 MB", 
    date: "Oct 28, 2025", 
    category: "Drawings",
    description: "Photorealistic 3D renders showing front, side, and rear elevations of the completed villa.",
    relatedMilestones: ["M18: Painting", "M17: Doors & Windows"],
    uploadedBy: "Ar. Priya Sharma",
    status: "approved",
    version: "v1.0",
    previewImage: "/images/construction/external-plaster.jpg"
  },
  { 
    id: "d7", 
    name: "Payment Schedule", 
    type: "xlsx", 
    size: "156 KB", 
    date: "Oct 15, 2025", 
    category: "Finance",
    description: "Milestone-wise payment breakdown showing amounts due at each construction stage completion.",
    relatedMilestones: ["All Milestones"],
    uploadedBy: "Wehouse Finance",
    status: "approved",
    version: "v1.0"
  },
  { 
    id: "d8", 
    name: "BOQ - Bill of Quantities", 
    type: "xlsx", 
    size: "890 KB", 
    date: "Oct 18, 2025", 
    category: "Finance",
    description: "Detailed quantity takeoff with material specifications, rates, and total cost estimates.",
    relatedMilestones: ["All Milestones"],
    uploadedBy: "Wehouse Estimation",
    status: "approved",
    version: "v2.0"
  },
  { 
    id: "d9", 
    name: "M1-M4 Completion Certificate", 
    type: "pdf", 
    size: "1.2 MB", 
    date: "Nov 22, 2025", 
    category: "Certificates",
    description: "Official completion certificate for Foundation, Plinth Beam, Columns & Beams, and Roof Slab stages.",
    relatedMilestones: ["M1: Foundation", "M2: Plinth Beam", "M3: Columns & Beams", "M4: Roof Slab"],
    uploadedBy: "Site Engineer - Rahul",
    status: "approved",
    version: "v1.0",
    previewImage: "/images/construction/foundation-work.jpg"
  },
  { 
    id: "d10", 
    name: "M5-M8 Completion Certificate", 
    type: "pdf", 
    size: "1.3 MB", 
    date: "Dec 15, 2025", 
    category: "Certificates",
    description: "Official completion certificate for Parapet & Chajja, Brickwork, Lintel, and Waterproofing stages.",
    relatedMilestones: ["M5: Parapet & Chajja", "M6: Brickwork", "M7: Lintel", "M8: Waterproofing"],
    uploadedBy: "Site Engineer - Rahul",
    status: "approved",
    version: "v1.0",
    previewImage: "/images/construction/roof-slab.jpg"
  },
  { 
    id: "d11", 
    name: "M9-M11 Completion Certificate", 
    type: "pdf", 
    size: "1.4 MB", 
    date: "Jan 10, 2026", 
    category: "Certificates",
    description: "Official completion certificate for Bathroom Tile, Headroom Plastering, and Staircase stages.",
    relatedMilestones: ["M9: Bathroom Tile", "M10: Headroom Plastering", "M11: Staircase"],
    uploadedBy: "Site Engineer - Rahul",
    status: "approved",
    version: "v1.0",
    previewImage: "/images/construction/bathroom-waterproofing.jpg"
  },
]

const categories = ["All", "Contracts", "Drawings", "Finance", "Certificates"]

const typeColors: Record<string, string> = {
  pdf: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  dwg: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  xlsx: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  jpg: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
}

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [previewDoc, setPreviewDoc] = React.useState<Document | null>(null)

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = []
    acc[doc.category].push(doc)
    return acc
  }, {} as Record<string, Document[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage your project documents</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="pl-9"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex-shrink-0",
                selectedCategory === cat ? "bg-[hsl(var(--hover-bg))] text-foreground" : "bg-transparent"
              )}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-6">
        {selectedCategory === "All" ? (
          // Grouped View
          Object.entries(groupedDocuments).map(([category, docs]) => (
            <section key={category}>
              <div className="flex items-center gap-2 mb-3">
                <FolderOpen className="size-4 text-primary" />
                <h2 className="font-semibold text-foreground">{category}</h2>
                <Badge variant="secondary" className="text-[10px]">{docs.length}</Badge>
              </div>
              <div className="space-y-2">
                {docs.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} onPreview={() => setPreviewDoc(doc)} />
                ))}
              </div>
            </section>
          ))
        ) : (
          // Flat List
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} onPreview={() => setPreviewDoc(doc)} />
            ))}
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="size-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No documents found</p>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
          {previewDoc && (
            <>
              {/* Preview Image or Placeholder */}
              {previewDoc.previewImage ? (
                <div className="relative h-48 bg-muted">
                  <Image
                    src={previewDoc.previewImage || "/placeholder.svg"}
                    alt={previewDoc.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <Badge className={cn(
                      "mb-2",
                      previewDoc.status === "approved" && "bg-emerald-500 text-white border-0",
                      previewDoc.status === "pending" && "bg-amber-500 text-white border-0",
                      previewDoc.status === "revision" && "bg-red-500 text-white border-0"
                    )}>
                      {previewDoc.status === "approved" ? "Approved" : previewDoc.status === "pending" ? "Pending Review" : "Needs Revision"}
                    </Badge>
                    <h3 className="text-white font-semibold text-lg">{previewDoc.name}</h3>
                  </div>
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                  <div className={cn(
                    "size-16 rounded-xl flex items-center justify-center text-lg font-bold uppercase",
                    typeColors[previewDoc.type]
                  )}>
                    {previewDoc.type}
                  </div>
                </div>
              )}

              {/* Document Info */}
              <div className="p-5 space-y-4">
                {!previewDoc.previewImage && (
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{previewDoc.name}</h3>
                      <Badge className={cn(
                        "mt-1",
                        previewDoc.status === "approved" && "bg-emerald-100 text-emerald-700 border-emerald-200",
                        previewDoc.status === "pending" && "bg-amber-100 text-amber-700 border-amber-200",
                        previewDoc.status === "revision" && "bg-red-100 text-red-700 border-red-200"
                      )}>
                        {previewDoc.status === "approved" ? "Approved" : previewDoc.status === "pending" ? "Pending Review" : "Needs Revision"}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {previewDoc.description}
                </p>

                {/* Meta Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Uploaded:</span>
                    <span className="font-medium">{previewDoc.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{previewDoc.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">By:</span>
                    <span className="font-medium truncate">{previewDoc.uploadedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Version:</span>
                    <span className="font-medium">{previewDoc.version}</span>
                  </div>
                </div>

                {/* Related Milestones */}
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="size-4 text-[#f6a404]" />
                    <span className="text-sm font-medium">Related Milestones</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {previewDoc.relatedMilestones.map((milestone) => (
                      <Badge 
                        key={milestone} 
                        variant="secondary" 
                        className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="size-3 mr-1 text-emerald-500" />
                        {milestone}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <Button className="w-full bg-[#f6a404] hover:bg-[#e09503] text-white mt-2">
                  <Download className="size-4 mr-2" />
                  Download Document
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DocumentCard({ document: doc, onPreview }: { document: Document; onPreview: () => void }) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-3 flex items-center gap-3">
        <div className={cn(
          "size-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold uppercase",
          typeColors[doc.type]
        )}>
          {doc.type}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate">{doc.name}</p>
          <p className="text-xs text-muted-foreground">{doc.size} · {doc.date}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-transparent size-8 hover:bg-[#f6a404]/10 hover:text-[#f6a404]"
            onClick={onPreview}
          >
            <Eye className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-transparent size-8 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30">
            <Download className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
