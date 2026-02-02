"use client"

import * as React from "react"
import { type UserRole } from "@/lib/navigation"

interface RoleContextType {
  selectedRole: UserRole
  setSelectedRole: (role: UserRole) => void
}

const RoleContext = React.createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [selectedRole, setSelectedRole] = React.useState<UserRole>("super_admin")
  const [isInitialized, setIsInitialized] = React.useState(false)

  // Load role from localStorage on mount (client-side only)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedRole = localStorage.getItem("wehouse_selected_role") as UserRole | null
        if (savedRole) {
          setSelectedRole(savedRole)
        }
      } catch (error) {
        console.error("Error loading role from localStorage:", error)
      }
      setIsInitialized(true)
    }
  }, [])

  // Save role to localStorage when it changes (client-side only)
  React.useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      try {
        localStorage.setItem("wehouse_selected_role", selectedRole)
      } catch (error) {
        console.error("Error saving role to localStorage:", error)
      }
    }
  }, [selectedRole, isInitialized])

  return (
    <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = React.useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
