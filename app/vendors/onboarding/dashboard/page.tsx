"use client"

import * as React from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  type VendorApplication,
  type VendorApplicationStatus,
  STATUS_CONFIG,
} from "@/lib/vendor-types"
import {
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Plus,
  Eye,
  Edit,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Package,
} from "lucide-react"

// Mock data for demonstration
const mockApplications: Partial<VendorApplication>[] = [
  {
    id: "1",
    applicationNumber: "VND-HYD-2026-0001",
    companyInfo: {
      name: "Sri Lakshmi Cement Traders",
      legalName: "Sri Lakshmi Cement Traders Pvt Ltd",
      type: "Private Limited",
      gstin: "36AABCS1234F1ZN",
      pan: "AABCS1234F",
      incorporationDate: "2020-01-15",
      registeredAddress: {
        line1: "Plot 42, IDA Nacharam",
        city: "Hyderabad",
        state: "TG",
        pincode: "500076",
      },
    },
    contactInfo: {
      primaryContact: {
        name: "Ramesh Kumar",
        designation: "Director",
        phone: "9876543210",
        email: "ramesh@slct.com",
      },
    },
    supplyCategories: [
      { id: "cement", name: "Cement", code: "CEM", selectedSubcategories: ["OPC", "PPC"] },
      { id: "sand", name: "Sand", code: "SND", selectedSubcategories: ["M-Sand"] },
    ],
    cityId: "hyderabad",
    cityName: "Hyderabad",
    status: "qa_review",
    createdAt: "2026-01-15T10:30:00Z",
    updatedAt: "2026-01-20T14:45:00Z",
    submittedAt: "2026-01-16T09:00:00Z",
    workflowHistory: [
      {
        id: "1",
        status: "draft",
        action: "Application created",
        performedBy: "Ramesh Kumar",
        performedByRole: "Vendor",
        timestamp: "2026-01-15T10:30:00Z",
      },
      {
        id: "2",
        status: "submitted",
        action: "Application submitted",
        performedBy: "Ramesh Kumar",
        performedByRole: "Vendor",
        timestamp: "2026-01-16T09:00:00Z",
      },
      {
        id: "3",
        status: "city_review",
        action: "Under City Admin review",
        performedBy: "System",
        performedByRole: "System",
        timestamp: "2026-01-16T09:00:00Z",
      },
      {
        id: "4",
        status: "qa_review",
        action: "Forwarded to QA Team",
        performedBy: "Priya Sharma",
        performedByRole: "City Admin",
        remarks: "Documents verified, forwarding for QA review",
        timestamp: "2026-01-18T11:30:00Z",
      },
    ],
  },
  {
    id: "2",
    applicationNumber: "VND-HYD-2026-0002",
    companyInfo: {
      name: "Shree Ganesh Electricals",
      legalName: "Shree Ganesh Electricals",
      type: "Proprietorship",
      gstin: "36AABCG5678H1ZP",
      pan: "AABCG5678H",
      incorporationDate: "2018-06-10",
      registeredAddress: {
        line1: "Shop 15, Electrical Market",
        city: "Hyderabad",
        state: "TG",
        pincode: "500003",
      },
    },
    contactInfo: {
      primaryContact: {
        name: "Ganesh Rao",
        designation: "Proprietor",
        phone: "9988776655",
        email: "ganesh@sge.com",
      },
    },
    supplyCategories: [
      { id: "electrical", name: "Electrical Materials", code: "ELE", selectedSubcategories: ["Wires", "Switches", "Lighting"] },
    ],
    cityId: "hyderabad",
    cityName: "Hyderabad",
    status: "super_admin_approved",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-01-25T16:00:00Z",
    submittedAt: "2026-01-11T10:00:00Z",
    workflowHistory: [
      {
        id: "1",
        status: "draft",
        action: "Application created",
        performedBy: "Ganesh Rao",
        performedByRole: "Vendor",
        timestamp: "2026-01-10T08:00:00Z",
      },
      {
        id: "2",
        status: "submitted",
        action: "Application submitted",
        performedBy: "Ganesh Rao",
        performedByRole: "Vendor",
        timestamp: "2026-01-11T10:00:00Z",
      },
      {
        id: "3",
        status: "super_admin_approved",
        action: "Application approved",
        performedBy: "Admin",
        performedByRole: "Super Admin",
        remarks: "Approved for onboarding",
        timestamp: "2026-01-25T16:00:00Z",
      },
    ],
  },
]

export default function VendorDashboardPage() {
  const [applications] = React.useState(mockApplications)
  const [isMounted, setIsMounted] = React.useState(false)
  
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <DashboardLayout>
      <div className={`p-4 md:p-6 space-y-6 ${isMounted ? 'dashboard-fade-in' : ''}`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vendor Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track your vendor applications and onboarding status
            </p>
          </div>
          <Button asChild>
            <Link href="/vendors/onboarding">
              <Plus className="size-4 mr-1.5" />
              New Application
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className={`grid gap-4 md:grid-cols-4 ${isMounted ? 'dashboard-slide-up dashboard-stagger-1' : ''}`}>
          <StatsCard
            title="Total Applications"
            value={applications.length}
            icon={FileText}
            color="bg-blue-500"
          />
          <StatsCard
            title="Under Review"
            value={applications.filter((a) => 
              ["city_review", "qa_review", "pending_super_admin"].includes(a.status || "")
            ).length}
            icon={Clock}
            color="bg-amber-500"
          />
          <StatsCard
            title="Approved"
            value={applications.filter((a) => 
              a.status === "super_admin_approved" || a.status === "onboarded"
            ).length}
            icon={CheckCircle2}
            color="bg-green-500"
          />
          <StatsCard
            title="Rejected"
            value={applications.filter((a) => 
              ["city_rejected", "qa_rejected", "super_admin_rejected"].includes(a.status || "")
            ).length}
            icon={XCircle}
            color="bg-red-500"
          />
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Applications</h2>
          
          {applications.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="py-12 text-center">
                <div className="size-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                  <Building2 className="size-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start your vendor registration by creating a new application
                </p>
                <Button asChild>
                  <Link href="/vendors/onboarding">
                    <Plus className="size-4 mr-1.5" />
                    Create Application
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {applications.map((app) => (
                <ApplicationCard key={app.id} application={app} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

// Stats Card Component
function StatsCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string
  value: number
  icon: React.ElementType
  color: string
}) {
  return (
    <Card className="bg-card">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={cn("size-12 rounded-lg flex items-center justify-center", color)}>
            <Icon className="size-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Application Card Component
function ApplicationCard({ application }: { application: Partial<VendorApplication> }) {
  const [expanded, setExpanded] = React.useState(false)
  const statusConfig = STATUS_CONFIG[application.status as VendorApplicationStatus]

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card className="bg-card overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{application.companyInfo?.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <span className="font-mono text-xs">{application.applicationNumber}</span>
                <span className="text-muted-foreground">|</span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {application.cityName}
                </span>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              className={cn(
                "border",
                statusConfig.bgClass,
                statusConfig.textClass,
                statusConfig.borderClass
              )}
            >
              {statusConfig.label}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="bg-transparent"
              onClick={() => setExpanded(!expanded)}
            >
              <ChevronRight className={cn(
                "size-4 transition-transform",
                expanded && "rotate-90"
              )} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="size-3.5" />
            <span>Submitted: {formatDate(application.submittedAt)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Package className="size-3.5" />
            <span>{application.supplyCategories?.length || 0} Categories</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <RefreshCw className="size-3.5" />
            <span>Updated: {formatDate(application.updatedAt)}</span>
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t space-y-4">
            {/* Contact Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-2">Primary Contact</h4>
                <div className="space-y-1.5 text-sm">
                  <p>{application.contactInfo?.primaryContact?.name}</p>
                  <p className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="size-3.5" />
                    {application.contactInfo?.primaryContact?.phone}
                  </p>
                  <p className="flex items-center gap-1.5 text-muted-foreground">
                    <Mail className="size-3.5" />
                    {application.contactInfo?.primaryContact?.email}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Supply Categories</h4>
                <div className="flex flex-wrap gap-1.5">
                  {application.supplyCategories?.map((cat) => (
                    <Badge key={cat.id} variant="secondary">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div>
              <h4 className="text-sm font-medium mb-3">Application Timeline</h4>
              <ApplicationTimeline history={application.workflowHistory || []} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Eye className="size-4 mr-1.5" />
                View Details
              </Button>
              {application.status === "draft" && (
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Edit className="size-4 mr-1.5" />
                  Continue Editing
                </Button>
              )}
              {(application.status === "city_rejected" || application.status === "qa_rejected") && (
                <Button size="sm">
                  <RefreshCw className="size-4 mr-1.5" />
                  Resubmit
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Timeline Component
function ApplicationTimeline({ history }: { history: VendorApplication["workflowHistory"] }) {
  const getStatusIcon = (status: VendorApplicationStatus) => {
    switch (status) {
      case "draft":
        return FileText
      case "submitted":
        return CheckCircle2
      case "city_review":
      case "qa_review":
      case "pending_super_admin":
        return Clock
      case "city_rejected":
      case "qa_rejected":
      case "super_admin_rejected":
        return XCircle
      case "qa_approved":
      case "super_admin_approved":
      case "onboarded":
        return CheckCircle2
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status: VendorApplicationStatus) => {
    const config = STATUS_CONFIG[status]
    return config?.color || "#6B7280"
  }

  return (
    <div className="relative space-y-0">
      {history.map((event, index) => {
        const Icon = getStatusIcon(event.status)
        const color = getStatusColor(event.status)
        const isLast = index === history.length - 1

        return (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div 
                className="size-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon className="size-4" style={{ color }} />
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 bg-border my-1" />
              )}
            </div>
            <div className={cn("pb-4", isLast && "pb-0")}>
              <p className="font-medium text-sm">{event.action}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {event.performedBy} ({event.performedByRole})
              </p>
              {event.remarks && (
                <p className="text-sm text-muted-foreground mt-1 italic">
                  "{event.remarks}"
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(event.timestamp).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
