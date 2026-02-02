"use client"

export function ColorPalette() {
  return (
    <div className="space-y-8">
      {/* Primary Colors */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-foreground">Primary Colors</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ColorSwatch
            name="Primary"
            description="Deep Navy"
            className="bg-primary"
            textClassName="text-primary-foreground"
          />
          <ColorSwatch
            name="Accent"
            description="Coral Orange"
            className="bg-accent"
            textClassName="text-accent-foreground"
          />
          <ColorSwatch
            name="Secondary"
            description="Soft Gray"
            className="bg-secondary"
            textClassName="text-secondary-foreground"
          />
          <ColorSwatch
            name="Muted"
            description="Light Gray"
            className="bg-muted"
            textClassName="text-muted-foreground"
          />
        </div>
      </div>

      {/* Status Colors */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-foreground">Status Colors</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ColorSwatch
            name="Success"
            description="Approved, Complete"
            className="bg-success"
            textClassName="text-success-foreground"
          />
          <ColorSwatch
            name="Warning"
            description="Pending, In Review"
            className="bg-warning"
            textClassName="text-warning-foreground"
          />
          <ColorSwatch
            name="Destructive"
            description="Error, Rejected"
            className="bg-destructive"
            textClassName="text-destructive-foreground"
          />
          <ColorSwatch
            name="Info"
            description="Information"
            className="bg-info"
            textClassName="text-info-foreground"
          />
        </div>
      </div>

      {/* Chart Colors */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-foreground">Chart Colors</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <ColorSwatch
            name="Chart 1"
            description="Teal"
            className="bg-chart-1"
            textClassName="text-white"
          />
          <ColorSwatch
            name="Chart 2"
            description="Blue"
            className="bg-chart-2"
            textClassName="text-white"
          />
          <ColorSwatch
            name="Chart 3"
            description="Magenta"
            className="bg-chart-3"
            textClassName="text-white"
          />
          <ColorSwatch
            name="Chart 4"
            description="Orange"
            className="bg-chart-4"
            textClassName="text-white"
          />
          <ColorSwatch
            name="Chart 5"
            description="Amber"
            className="bg-chart-5"
            textClassName="text-white"
          />
        </div>
      </div>

      {/* Sidebar Colors */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-foreground">Sidebar Theme</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ColorSwatch
            name="Sidebar BG"
            description="Dark Navy"
            className="bg-sidebar"
            textClassName="text-sidebar-foreground"
          />
          <ColorSwatch
            name="Sidebar Primary"
            description="Coral Accent"
            className="bg-sidebar-primary"
            textClassName="text-sidebar-primary-foreground"
          />
          <ColorSwatch
            name="Sidebar Accent"
            description="Hover State"
            className="bg-sidebar-accent"
            textClassName="text-sidebar-accent-foreground"
          />
          <ColorSwatch
            name="Sidebar Border"
            description="Dividers"
            className="bg-sidebar-border"
            textClassName="text-sidebar-foreground"
          />
        </div>
      </div>

      {/* Neutral Colors */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-foreground">Neutrals</h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ColorSwatch
            name="Background"
            description="Page Background"
            className="bg-background border border-border"
            textClassName="text-foreground"
          />
          <ColorSwatch
            name="Card"
            description="Card Background"
            className="bg-card border border-border"
            textClassName="text-card-foreground"
          />
          <ColorSwatch
            name="Border"
            description="Dividers"
            className="bg-border"
            textClassName="text-foreground"
          />
          <ColorSwatch
            name="Input"
            description="Form Fields"
            className="bg-input border border-border"
            textClassName="text-foreground"
          />
        </div>
      </div>
    </div>
  )
}

function ColorSwatch({
  name,
  description,
  className,
  textClassName,
}: {
  name: string
  description: string
  className: string
  textClassName: string
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className={`h-20 ${className}`} />
      <div className="bg-card p-3">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
