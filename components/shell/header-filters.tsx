"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Project Categories
export const projectCategories = [
  { value: "all", label: "All Categories" },
  { value: "building", label: "Building Construction" },
  { value: "transportation", label: "Transportation Infrastructure" },
  { value: "civil", label: "Heavy Civil / Infrastructure" },
  { value: "industrial", label: "Industrial Construction" },
  { value: "water", label: "Water & Wastewater Projects" },
  { value: "energy", label: "Oil, Gas & Energy Projects" },
  { value: "urban", label: "Urban Development & Smart City" },
  { value: "specialized", label: "Specialized Construction Projects" },
  { value: "social", label: "Social Infrastructure Projects" },
  { value: "renovation", label: "Renovation & Rehabilitation Projects" },
] as const

// Locations
export const locations = [
  { value: "all", label: "All Locations" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bengaluru", label: "Bengaluru" },
  { value: "chennai", label: "Chennai" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "kolkata", label: "Kolkata" },
  { value: "pune", label: "Pune" },
  { value: "vijayawada", label: "Vijayawada" },
] as const

// Location-specific branches
export const locationBranches: Record<string, Array<{ value: string; label: string }>> = {
  mumbai: [
    { value: "all", label: "All Branches" },
    { value: "andheri", label: "Andheri" },
    { value: "bandra", label: "Bandra" },
    { value: "powai", label: "Powai" },
    { value: "borivali", label: "Borivali" },
    { value: "thane", label: "Thane" },
  ],
  delhi: [
    { value: "all", label: "All Branches" },
    { value: "connaught_place", label: "Connaught Place" },
    { value: "south_ex", label: "South Extension" },
    { value: "dwarka", label: "Dwarka" },
    { value: "rohini", label: "Rohini" },
    { value: "noida", label: "Noida" },
  ],
  bengaluru: [
    { value: "all", label: "All Branches" },
    { value: "koramangala", label: "Koramangala" },
    { value: "whitefield", label: "Whitefield" },
    { value: "indiranagar", label: "Indiranagar" },
    { value: "jayanagar", label: "Jayanagar" },
    { value: "hsr_layout", label: "HSR Layout" },
  ],
  chennai: [
    { value: "all", label: "All Branches" },
    { value: "t_nagar", label: "T. Nagar" },
    { value: "adyar", label: "Adyar" },
    { value: "velachery", label: "Velachery" },
    { value: "omr", label: "OMR" },
    { value: "anna_nagar", label: "Anna Nagar" },
  ],
  hyderabad: [
    { value: "all", label: "All Branches" },
    { value: "banjara_hills", label: "Banjara Hills" },
    { value: "jubilee_hills", label: "Jubilee Hills" },
    { value: "hitech_city", label: "Hitech City" },
    { value: "gachibowli", label: "Gachibowli" },
    { value: "madhapur", label: "Madhapur" },
  ],
  kolkata: [
    { value: "all", label: "All Branches" },
    { value: "park_street", label: "Park Street" },
    { value: "salt_lake", label: "Salt Lake" },
    { value: "ballygunge", label: "Ballygunge" },
    { value: "new_town", label: "New Town" },
  ],
  pune: [
    { value: "all", label: "All Branches" },
    { value: "koregaon_park", label: "Koregaon Park" },
    { value: "hinjewadi", label: "Hinjewadi" },
    { value: "viman_nagar", label: "Viman Nagar" },
    { value: "kothrud", label: "Kothrud" },
  ],
  vijayawada: [
    { value: "all", label: "All Branches" },
    { value: "governorpet", label: "Governorpet" },
    { value: "benz_circle", label: "Benz Circle" },
    { value: "mg_road", label: "MG Road" },
  ],
}

export type ProjectCategory = typeof projectCategories[number]["value"]
export type Location = typeof locations[number]["value"]
export type Branch = string

interface HeaderFiltersProps {
  selectedCategory?: ProjectCategory
  selectedLocation?: Location
  selectedBranch?: Branch
  onCategoryChange?: (category: ProjectCategory) => void
  onLocationChange?: (location: Location) => void
  onBranchChange?: (branch: Branch) => void
  showCategoryFilter?: boolean
  showLocationFilter?: boolean
}

export function HeaderFilters({
  selectedCategory = "all",
  selectedLocation = "all",
  selectedBranch = "all",
  onCategoryChange,
  onLocationChange,
  onBranchChange,
  showCategoryFilter = true,
  showLocationFilter = true,
}: HeaderFiltersProps) {
  const categoryLabel =
    projectCategories.find((c) => c.value === selectedCategory)?.label || "All Categories"
  const locationLabel = locations.find((l) => l.value === selectedLocation)?.label || "All Locations"
  
  // Get branches for selected location
  const availableBranches = selectedLocation !== "all" && locationBranches[selectedLocation] 
    ? locationBranches[selectedLocation] 
    : []
  const showBranchFilter = selectedLocation !== "all" && availableBranches.length > 0
  const branchLabel = availableBranches.find((b) => b.value === selectedBranch)?.label || "All Branches"

  // Don't render anything if neither filter is visible
  if (!showCategoryFilter && !showLocationFilter) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {/* Category Dropdown */}
      {showCategoryFilter && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 gap-1.5 border-border bg-transparent text-sm font-medium",
                selectedCategory !== "all" && "border-primary/50 text-primary"
              )}
            >
              <span className="truncate max-w-[120px]">{categoryLabel}</span>
              <ChevronDown className="size-3.5 flex-shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {projectCategories.map((category) => (
              <DropdownMenuItem
                key={category.value}
                onClick={() => onCategoryChange?.(category.value)}
                className={cn(
                  "cursor-pointer text-sm",
                  selectedCategory === category.value && "bg-[hsl(var(--hover-bg))] text-foreground"
                )}
              >
                <span className="flex-1">{category.label}</span>
                {selectedCategory === category.value && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Location Dropdown */}
      {showLocationFilter && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 gap-1.5 border-border bg-transparent text-sm font-medium",
                selectedLocation !== "all" && "border-primary/50 text-primary"
              )}
            >
              <span className="truncate max-w-[120px]">{locationLabel}</span>
              <ChevronDown className="size-3.5 flex-shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {locations.map((location) => (
              <DropdownMenuItem
                key={location.value}
                onClick={() => {
                  onLocationChange?.(location.value)
                  // Reset branch when location changes
                  if (location.value === "all") {
                    onBranchChange?.("all")
                  }
                }}
                className={cn(
                  "cursor-pointer text-sm",
                  selectedLocation === location.value && "bg-[hsl(var(--hover-bg))] text-foreground"
                )}
              >
                <span className="flex-1">{location.label}</span>
                {selectedLocation === location.value && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Branch Dropdown - Only visible when a specific location is selected */}
      {showBranchFilter && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 gap-1.5 border-border bg-transparent text-sm font-medium",
                selectedBranch !== "all" && "border-primary/50 text-primary"
              )}
            >
              <span className="truncate max-w-[120px]">{branchLabel}</span>
              <ChevronDown className="size-3.5 flex-shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {availableBranches.map((branch) => (
              <DropdownMenuItem
                key={branch.value}
                onClick={() => onBranchChange?.(branch.value)}
                className={cn(
                  "cursor-pointer text-sm",
                  selectedBranch === branch.value && "bg-[hsl(var(--hover-bg))] text-foreground"
                )}
              >
                <span className="flex-1">{branch.label}</span>
                {selectedBranch === branch.value && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
