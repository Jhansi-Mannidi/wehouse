"use client"

import { Button } from "@/components/ui/button"
import { Plus, Download, Trash2, ChevronRight, Loader2 } from "lucide-react"

export function ButtonShowcase() {
  return (
    <div className="space-y-8">
      {/* Button Variants */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Variants</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Sizes</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Buttons with Icons */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">With Icons</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
          <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Button States */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">States</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
        </div>
      </div>

      {/* Accent Button (Custom) */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Accent Buttons (Custom)</h4>
        <div className="flex flex-wrap items-center gap-4">
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Accent Button
          </button>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-success px-4 py-2 text-sm font-medium text-success-foreground transition-colors hover:bg-success/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Success
          </button>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-warning px-4 py-2 text-sm font-medium text-warning-foreground transition-colors hover:bg-warning/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Warning
          </button>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-info px-4 py-2 text-sm font-medium text-info-foreground transition-colors hover:bg-info/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Info
          </button>
        </div>
      </div>
    </div>
  )
}
