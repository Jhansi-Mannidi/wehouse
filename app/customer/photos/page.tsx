"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter, X, ChevronDown, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Photo {
  id: string
  date: string
  category: string
  description: string
  thumbnail: string
}

const photosByDate: Record<string, Photo[]> = {
  "January 26, 2026": [
    { id: "p1", date: "Jan 26", category: "Bedroom", description: "Bedroom Plastering - North Wall", thumbnail: "/images/construction/bedroom-plastering.jpg" },
    { id: "p2", date: "Jan 26", category: "Bedroom", description: "Bedroom Plastering - South Wall", thumbnail: "/images/construction/bedroom-plastering.jpg" },
    { id: "p3", date: "Jan 26", category: "Overview", description: "Site Overview Morning", thumbnail: "/images/construction/site-overview.jpg" },
    { id: "p4", date: "Jan 26", category: "Workers", description: "Team at Work", thumbnail: "/images/construction/workers-team.jpg" },
  ],
  "January 25, 2026": [
    { id: "p5", date: "Jan 25", category: "Living Room", description: "Living Room Plastering", thumbnail: "/images/construction/living-room-plastering.jpg" },
    { id: "p6", date: "Jan 25", category: "Living Room", description: "Living Room Corner", thumbnail: "/images/construction/living-room-plastering.jpg" },
  ],
  "January 24, 2026": [
    { id: "p7", date: "Jan 24", category: "Kitchen", description: "Kitchen Wall Preparation", thumbnail: "/images/construction/kitchen-walls.jpg" },
    { id: "p8", date: "Jan 24", category: "Kitchen", description: "Kitchen Plumbing Points", thumbnail: "/images/construction/plumbing-work.jpg" },
    { id: "p9", date: "Jan 24", category: "Overview", description: "Full Site View", thumbnail: "/images/construction/site-overview.jpg" },
  ],
  "January 23, 2026": [
    { id: "p10", date: "Jan 23", category: "Bathroom", description: "Bathroom Waterproofing", thumbnail: "/images/construction/bathroom-waterproofing.jpg" },
    { id: "p11", date: "Jan 23", category: "Bathroom", description: "Bathroom Walls", thumbnail: "/images/construction/bathroom-waterproofing.jpg" },
  ],
}

const categories = ["All", "Bedroom", "Living Room", "Kitchen", "Bathroom", "Overview", "Workers"]
const months = ["All Time", "January 2026", "December 2025", "November 2025"]

export default function PhotosPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [selectedMonth, setSelectedMonth] = React.useState("All Time")
  const [selectedPhoto, setSelectedPhoto] = React.useState<Photo | null>(null)

  const filteredPhotos = React.useMemo(() => {
    const result: Record<string, Photo[]> = {}
    for (const [date, photos] of Object.entries(photosByDate)) {
      const filtered = photos.filter(
        (photo) => selectedCategory === "All" || photo.category === selectedCategory
      )
      if (filtered.length > 0) {
        result[date] = filtered
      }
    }
    return result
  }, [selectedCategory])

  const totalPhotos = Object.values(filteredPhotos).flat().length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link href="/customer">
            <Button variant="ghost" size="icon" className="bg-transparent">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="font-semibold text-lg flex-1">Site Photos</h1>
          <Badge variant="secondary">{totalPhotos} photos</Badge>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 px-4 py-2 border-t bg-muted/30">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-transparent h-8 text-xs">
                <Filter className="size-3 mr-1" />
                {selectedCategory}
                <ChevronDown className="size-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {categories.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(selectedCategory === cat && "bg-primary/10 text-primary")}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-transparent h-8 text-xs">
                {selectedMonth}
                <ChevronDown className="size-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {months.map((month) => (
                <DropdownMenuItem
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={cn(selectedMonth === month && "bg-primary/10 text-primary")}
                >
                  {month}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(selectedCategory !== "All" || selectedMonth !== "All Time") && (
            <Button
              variant="ghost"
              size="sm"
              className="bg-transparent h-8 text-xs text-muted-foreground"
              onClick={() => {
                setSelectedCategory("All")
                setSelectedMonth("All Time")
              }}
            >
              Clear
              <X className="size-3 ml-1" />
            </Button>
          )}
        </div>
      </header>

      <div className="px-4 py-4 space-y-6">
        {Object.entries(filteredPhotos).map(([date, photos]) => (
          <section key={date}>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <span className="text-base">📅</span>
              {date}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative aspect-square rounded-xl overflow-hidden bg-muted group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {/* Real construction image */}
                  <Image
                    src={photo.thumbnail || "/placeholder.svg"}
                    alt={photo.description}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Category Badge */}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 left-2 text-[10px] bg-black/50 text-white border-0 backdrop-blur-sm"
                  >
                    {photo.category}
                  </Badge>
                  {/* Description */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-xs text-white font-medium line-clamp-2 drop-shadow-sm">
                      {photo.description}
                    </p>
                  </div>
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </section>
        ))}

        {/* Load More */}
        <Button variant="outline" className="w-full bg-transparent" size="lg">
          Load More Photos
        </Button>
      </div>

      {/* Photo Viewer Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          {selectedPhoto && (
            <div>
              {/* Photo */}
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={selectedPhoto.thumbnail || "/placeholder.svg"}
                  alt={selectedPhoto.description}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
              {/* Info */}
              <div className="p-4">
                <Badge variant="secondary" className="mb-2">{selectedPhoto.category}</Badge>
                <h3 className="font-semibold text-foreground">{selectedPhoto.description}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedPhoto.date}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
