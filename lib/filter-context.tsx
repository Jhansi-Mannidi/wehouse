"use client"

import * as React from "react"
import type { ProjectCategory, Location, Branch } from "@/components/shell/header-filters"

interface FilterContextValue {
  category: ProjectCategory
  location: Location
  branch: Branch
  setCategory: (category: ProjectCategory) => void
  setLocation: (location: Location) => void
  setBranch: (branch: Branch) => void
}

const FilterContext = React.createContext<FilterContextValue | undefined>(undefined)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = React.useState<ProjectCategory>("all")
  const [location, setLocation] = React.useState<Location>("all")
  const [branch, setBranch] = React.useState<Branch>("all")

  // Reset branch when location changes to "all"
  React.useEffect(() => {
    if (location === "all") {
      setBranch("all")
    }
  }, [location])

  const value = React.useMemo(
    () => ({
      category,
      location,
      branch,
      setCategory,
      setLocation,
      setBranch,
    }),
    [category, location, branch]
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const context = React.useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
