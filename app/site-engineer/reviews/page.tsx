'use client';

"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  ChevronDown,
  Star,
  User,
  Calendar,
  Clock,
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ImageIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock reviews data
const reviewsData = {
  summary: {
    averageRating: 4.5,
    totalReviews: 18,
    aspectAverages: {
      workQuality: 4.6,
      timeliness: 4.2,
      cleanliness: 4.5,
      communication: 4.7,
      materialQuality: 4.4,
      professionalism: 4.6,
    },
  },
  projects: [
    {
      id: "WH-HYD-2024-001",
      customer: "Rajesh Kumar",
      averageRating: 4.5,
      reviewCount: 8,
      reviews: [
        {
          id: "REV-001",
          milestoneNumber: 10,
          milestoneName: "External Plastering",
          overallRating: 5,
          description: "Excellent plastering work. The finish is very smooth and the team was very professional. They completed on time as promised.",
          reviewDate: "2024-01-20",
          aspects: {
            workQuality: 5,
            timeliness: 5,
            cleanliness: 5,
            communication: 4,
          },
          photos: ["review_photo1.jpg", "review_photo2.jpg"],
        },
        {
          id: "REV-002",
          milestoneNumber: 9,
          milestoneName: "Brickwork",
          overallRating: 4,
          description: "Good brickwork overall. Minor delays due to material shortage but the team communicated well about it.",
          reviewDate: "2024-01-10",
          aspects: {
            workQuality: 4,
            timeliness: 3,
            cleanliness: 4,
            communication: 5,
          },
          photos: [],
        },
        {
          id: "REV-003",
          milestoneNumber: 8,
          milestoneName: "Lintel & Slab",
          overallRating: 5,
          description: "Perfect execution of the lintel and slab work. Very impressed with the quality.",
          reviewDate: "2024-01-02",
          aspects: {
            workQuality: 5,
            timeliness: 5,
            cleanliness: 4,
            communication: 5,
          },
          photos: ["lintel_review.jpg"],
        },
      ],
      pendingReviews: [
        { milestoneNumber: 11, milestoneName: "Internal Plastering", completedDate: "2024-01-28" },
      ],
    },
    {
      id: "WH-HYD-2024-002",
      customer: "Priya Sharma",
      averageRating: 4.2,
      reviewCount: 6,
      reviews: [
        {
          id: "REV-004",
          milestoneNumber: 14,
          milestoneName: "Electrical",
          overallRating: 4,
          description: "Good electrical work. Had to request one additional outlet later which was accommodated.",
          reviewDate: "2024-01-22",
          aspects: {
            workQuality: 4,
            timeliness: 4,
            cleanliness: 4,
            communication: 4,
          },
          photos: [],
        },
        {
          id: "REV-005",
          milestoneNumber: 13,
          milestoneName: "Doors & Windows",
          overallRating: 3,
          description: "The door frames are good but there was a delay of 2 days. Could have been communicated earlier.",
          reviewDate: "2024-01-15",
          aspects: {
            workQuality: 4,
            timeliness: 2,
            cleanliness: 3,
            communication: 3,
          },
          improvementAreas: ["Timeliness", "Communication"],
          photos: [],
        },
      ],
      pendingReviews: [],
    },
    {
      id: "WH-HYD-2024-003",
      customer: "Venkat Menon",
      averageRating: 4.8,
      reviewCount: 4,
      reviews: [
        {
          id: "REV-006",
          milestoneNumber: 6,
          milestoneName: "RCC Columns",
          overallRating: 5,
          description: "Excellent RCC work. Very sturdy columns and the team maintained the site very clean throughout.",
          reviewDate: "2024-01-18",
          aspects: {
            workQuality: 5,
            timeliness: 5,
            cleanliness: 5,
            communication: 5,
          },
          photos: ["columns_review1.jpg", "columns_review2.jpg", "columns_review3.jpg"],
        },
      ],
      pendingReviews: [
        { milestoneNumber: 7, milestoneName: "Roof Slab", completedDate: "2024-01-29" },
      ],
    },
  ],
}

// Star Rating Component
function StarRating({ rating, size = "default" }: { rating: number; size?: "small" | "default" | "large" }) {
  const sizeClass = size === "small" ? "size-3" : size === "large" ? "size-5" : "size-4"
  
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          )}
        />
      ))}
    </div>
  )
}

// Aspect Rating Bar Component
function AspectRatingBar({ label, rating, max = 5 }: { label: string; rating: number; max?: number }) {
  const percentage = (rating / max) * 100
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            rating >= 4.5 ? "bg-green-500" : rating >= 3.5 ? "bg-yellow-500" : "bg-red-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Review Card Component
function ReviewCard({ review }: { review: (typeof reviewsData.projects)[0]["reviews"][0] }) {
  return (
    <Card>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-medium text-sm">M{review.milestoneNumber}: {review.milestoneName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Calendar className="size-3" />
              {new Date(review.reviewDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <StarRating rating={review.overallRating} />
            <span className="text-sm font-bold ml-1">{review.overallRating.toFixed(1)}</span>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-sm text-muted-foreground italic mb-3">"{review.description}"</p>

        {/* Aspect Ratings */}
        <div className="flex flex-wrap gap-3 text-xs mb-3">
          {Object.entries(review.aspects).map(([key, value]) => (
            <span key={key} className="flex items-center gap-1">
              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <Star className="size-3 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{value}</span>
            </span>
          ))}
        </div>

        {/* Improvement Areas */}
        {review.improvementAreas && review.improvementAreas.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded mb-3">
            <AlertTriangle className="size-3.5" />
            <span>Areas for Improvement: {review.improvementAreas.join(", ")}</span>
          </div>
        )}

        {/* Photos */}
        {review.photos && review.photos.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ImageIcon className="size-3.5" />
            <span>Customer Photos: {review.photos.length}</span>
            <div className="flex gap-1">
              {review.photos.map((photo, i) => (
                <div key={i} className="size-6 bg-muted rounded flex items-center justify-center text-[8px]">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Pending Review Card
function PendingReviewCard({ milestone }: { milestone: { milestoneNumber: number; milestoneName: string; completedDate: string } }) {
  return (
    <Card className="border-dashed">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">M{milestone.milestoneNumber}: {milestone.milestoneName}</p>
            <p className="text-xs text-muted-foreground mt-1">Completed: {new Date(milestone.completedDate).toLocaleDateString()}</p>
          </div>
          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="size-3 mr-1" />
            Pending
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CustomerReviewsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedProject, setSelectedProject] = React.useState<string>("all")

  // Get selected project data
  const currentProjectData = selectedProject === "all" 
    ? null 
    : reviewsData.projects.find(p => p.id === selectedProject)

  // Get all reviews for display
  const allReviews = selectedProject === "all"
    ? reviewsData.projects.flatMap(p => p.reviews.map(r => ({ ...r, projectId: p.id, customer: p.customer })))
    : currentProjectData?.reviews.map(r => ({ ...r, projectId: currentProjectData.id, customer: currentProjectData.customer })) || []

  const filteredReviews = allReviews.filter(r => 
    r.milestoneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/site-engineer/dashboard">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Customer Reviews</h1>
            <p className="text-muted-foreground text-sm">View customer feedback and ratings for your milestones</p>
          </div>
        </div>

        {/* Overall Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="size-5 text-yellow-500 fill-yellow-500" />
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Rating Summary */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold">{reviewsData.summary.averageRating.toFixed(1)}</p>
                  <StarRating rating={reviewsData.summary.averageRating} size="large" />
                  <p className="text-sm text-muted-foreground mt-1">Based on {reviewsData.summary.totalReviews} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  <AspectRatingBar label="Work Quality" rating={reviewsData.summary.aspectAverages.workQuality} />
                  <AspectRatingBar label="Timeliness" rating={reviewsData.summary.aspectAverages.timeliness} />
                  <AspectRatingBar label="Cleanliness" rating={reviewsData.summary.aspectAverages.cleanliness} />
                </div>
              </div>
              <div className="space-y-2">
                <AspectRatingBar label="Communication" rating={reviewsData.summary.aspectAverages.communication} />
                <AspectRatingBar label="Material Quality" rating={reviewsData.summary.aspectAverages.materialQuality} />
                <AspectRatingBar label="Professionalism" rating={reviewsData.summary.aspectAverages.professionalism} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Selector & Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {reviewsData.projects.map(project => (
                <SelectItem key={project.id} value={project.id}>
                  {project.id} - {project.customer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Project Summary (if specific project selected) */}
        {currentProjectData && (
          <Card className="bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{currentProjectData.id}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <User className="size-3" />
                    {currentProjectData.customer}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <StarRating rating={currentProjectData.averageRating} />
                    <span className="font-bold">{currentProjectData.averageRating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{currentProjectData.reviewCount} reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Reviews */}
        {(selectedProject === "all" ? reviewsData.projects.some(p => p.pendingReviews.length > 0) : currentProjectData?.pendingReviews.length) && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="size-4 text-yellow-600" />
              Awaiting Customer Review
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(selectedProject === "all" 
                ? reviewsData.projects.flatMap(p => p.pendingReviews)
                : currentProjectData?.pendingReviews || []
              ).map((milestone, i) => (
                <PendingReviewCard key={i} milestone={milestone} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div>
          <h3 className="font-semibold mb-3">Milestone Reviews</h3>
          {filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id}>
                  {selectedProject === "all" && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {review.projectId} - {review.customer}
                    </p>
                  )}
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Star className="size-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No reviews found</p>
                <p className="text-sm text-muted-foreground/70">Try adjusting your search</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
