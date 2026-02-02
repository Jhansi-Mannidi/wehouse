"use client"

import { ColorPalette } from "./color-palette"
import { TypographyShowcase } from "./typography-showcase"
import { ButtonShowcase } from "./button-showcase"
import { InputShowcase } from "./input-showcase"
import { CardShowcase } from "./card-showcase"
import { BadgeShowcase } from "./badge-showcase"
import { ChartShowcase } from "./chart-showcase"
import { SidebarPreview } from "./sidebar-preview"
import { Building2, Palette } from "lucide-react"

export function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Building2 className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Wehouse 2.0</h1>
              <p className="text-xs text-muted-foreground">Design System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Foundation</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            Design System Foundation
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">
            A comprehensive design system for Wehouse, an AI-native construction management 
            platform serving sales teams, project managers, finance teams, customers, and 
            vendors across India.
          </p>
        </section>

        {/* Grid Layout for Sections */}
        <div className="space-y-16">
          {/* Color Palette */}
          <section id="colors">
            <SectionHeader 
              title="Color Palette" 
              description="Professional blues for trust, warm coral accents for construction warmth, and semantic colors for status."
            />
            <ColorPalette />
          </section>

          {/* Typography */}
          <section id="typography">
            <SectionHeader 
              title="Typography" 
              description="Inter for clean, readable headings and body text. Optimized for data-heavy interfaces."
            />
            <TypographyShowcase />
          </section>

          {/* Buttons */}
          <section id="buttons">
            <SectionHeader 
              title="Buttons" 
              description="Primary, secondary, ghost, and destructive variants with consistent sizing."
            />
            <ButtonShowcase />
          </section>

          {/* Inputs */}
          <section id="inputs">
            <SectionHeader 
              title="Form Inputs" 
              description="Text fields, selects, date pickers, and phone inputs with +91 support."
            />
            <InputShowcase />
          </section>

          {/* Cards */}
          <section id="cards">
            <SectionHeader 
              title="Cards" 
              description="Lead cards, project cards, and task cards for data organization."
            />
            <CardShowcase />
          </section>

          {/* Badges */}
          <section id="badges">
            <SectionHeader 
              title="Status Badges" 
              description="Lead status, project status, and payment status indicators."
            />
            <BadgeShowcase />
          </section>

          {/* Charts */}
          <section id="charts">
            <SectionHeader 
              title="Data Visualization" 
              description="Funnels, line charts, bar charts, and gauges for KPIs and analytics."
            />
            <ChartShowcase />
          </section>

          {/* Sidebar Preview */}
          <section id="sidebar">
            <SectionHeader 
              title="Navigation Sidebar" 
              description="Dark themed sidebar with role-based navigation items."
            />
            <SidebarPreview />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Wehouse 2.0 Design System - AI-Native Construction Management Platform
          </p>
        </div>
      </footer>
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground text-pretty">{description}</p>
    </div>
  )
}
