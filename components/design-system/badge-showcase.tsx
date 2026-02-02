"use client"

import { Badge } from "@/components/ui/badge"

export function BadgeShowcase() {
  return (
    <div className="space-y-8">
      {/* Lead Status */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Lead Status</h4>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-info text-info-foreground">New</Badge>
          <Badge className="bg-chart-2 text-white">Contacted</Badge>
          <Badge className="bg-success text-success-foreground">Qualified</Badge>
          <Badge className="bg-warning text-warning-foreground">Proposal Sent</Badge>
          <Badge className="bg-chart-4 text-white">Negotiation</Badge>
          <Badge className="bg-chart-1 text-white">Won</Badge>
          <Badge className="bg-destructive text-destructive-foreground">Lost</Badge>
        </div>
      </div>

      {/* Project Status */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Project Status</h4>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-muted text-muted-foreground">Draft</Badge>
          <Badge className="bg-info text-info-foreground">Planning</Badge>
          <Badge className="bg-success text-success-foreground">In Progress</Badge>
          <Badge className="bg-warning text-warning-foreground">On Hold</Badge>
          <Badge className="bg-chart-1 text-white">Completed</Badge>
          <Badge className="bg-destructive text-destructive-foreground">Cancelled</Badge>
        </div>
      </div>

      {/* Payment Status */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Payment Status</h4>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-muted text-muted-foreground">Pending</Badge>
          <Badge className="bg-warning text-warning-foreground">Due</Badge>
          <Badge className="bg-info text-info-foreground">Processing</Badge>
          <Badge className="bg-success text-success-foreground">Paid</Badge>
          <Badge className="bg-destructive text-destructive-foreground">Failed</Badge>
          <Badge className="bg-chart-4 text-white">Partial</Badge>
        </div>
      </div>

      {/* Partner/Vendor Status */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Partner Status</h4>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-warning text-warning-foreground">Pending Review</Badge>
          <Badge className="bg-info text-info-foreground">Under Verification</Badge>
          <Badge className="bg-success text-success-foreground">Approved</Badge>
          <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>
          <Badge className="bg-muted text-muted-foreground">Inactive</Badge>
          <Badge className="bg-chart-1 text-white">Premium</Badge>
        </div>
      </div>

      {/* Task Priority */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Task Priority</h4>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-destructive text-destructive-foreground">Urgent</Badge>
          <Badge className="bg-chart-4 text-white">High</Badge>
          <Badge className="bg-warning text-warning-foreground">Medium</Badge>
          <Badge className="bg-muted text-muted-foreground">Low</Badge>
        </div>
      </div>

      {/* Default Badge Variants */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Default Variants</h4>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      {/* Badges with Dots */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Badges with Indicators</h4>
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success" />
            Online
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <span className="h-2 w-2 rounded-full bg-warning" />
            Away
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" />
            Offline
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            Busy
          </Badge>
        </div>
      </div>
    </div>
  )
}
