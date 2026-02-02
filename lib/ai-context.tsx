"use client"

import * as React from "react"

interface AIContextType {
  aiEnabled: boolean
  setAiEnabled: (enabled: boolean) => void
}

const AIContext = React.createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [aiEnabled, setAiEnabled] = React.useState(false)

  return (
    <AIContext.Provider value={{ aiEnabled, setAiEnabled }}>
      {children}
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = React.useContext(AIContext)
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider")
  }
  return context
}
