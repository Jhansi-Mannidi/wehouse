"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import {
  Bell,
  Clock,
  FileText,
  Calendar,
  Package,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type InvitationStatus } from "@/lib/procurement-types"

// Sample invitations for vendor
const sampleInvitations = [
  {
    id: 'inv_1',
    scopeId: 'sow_1',
    scopeNumber: 'SOW-HYD-2026-0015',
    title: 'Steel Supply for Foundation Work',
    projectName: 'Gachibowli Villa Project',
    projectCode: 'PRJ-HYD-2026-0089',
    categoryName: 'Iron / Steel',
    quantity: '5000 KG',
    bidEndDate: '2026-01-25',
    daysLeft: 5,
    status: 'SENT' as InvitationStatus,
    sentAt: '2026-01-15',
    isNew: true,
  },
  {
    id: 'inv_2',
    scopeId: 'sow_2',
    scopeNumber: 'SOW-HYD-2026-0018',
    title: 'Steel Reinforcement for Columns',
    projectName: 'Jubilee Hills Apartments',
    projectCode: 'PRJ-HYD-2026-0092',
    categoryName: 'Iron / Steel',
    quantity: '3500 KG',
    bidEndDate: '2026-01-28',
    daysLeft: 8,
    status: 'VIEWED' as InvitationStatus,
    sentAt: '2026-01-16',
    viewedAt: '2026-01-17',
    isNew: false,
  },
  {
    id: 'inv_3',
    scopeId: 'sow_3',
    scopeNumber: 'SOW-HYD-2026-0012',
    title: 'TMT Bars for Beam Construction',
    projectName: 'Madhapur Commercial Complex',
    projectCode: 'PRJ-HYD-2026-0085',
    categoryName: 'Iron / Steel',
    quantity: '8000 KG',
    bidEndDate: '2026-01-20',
    status: 'BID_SUBMITTED' as InvitationStatus,
    sentAt: '2026-01-10',
    respondedAt: '2026-01-15',
    isNew: false,
    bidId: 'bid_x1',
  },
  {
    id: 'inv_4',
    scopeId: 'sow_4',
    scopeNumber: 'SOW-HYD-2026-0010',
    title: 'Steel for Basement Slab',
    projectName: 'Hitech City Office Tower',
    projectCode: 'PRJ-HYD-2026-0078',
    categoryName: 'Iron / Steel',
    quantity: '12000 KG',
    bidEndDate: '2026-01-12',
    status: 'EXPIRED' as InvitationStatus,
    sentAt: '2026-01-02',
    isNew: false,
  },
  {
    id: 'inv_5',
    scopeId: 'sow_5',
    scopeNumber: 'SOW-BLR-2026-0005',
    title: 'Steel Supply for Whitefield Project',
    projectName: 'Whitefield Villas',
    projectCode: 'PRJ-BLR-2026-0045',
    categoryName: 'Iron / Steel',
    quantity: '6500 KG',
    bidEndDate: '2026-01-08',
    status: 'DECLINED' as InvitationStatus,
    sentAt: '2025-12-28',
    respondedAt: '2025-12-30',
    isNew: false,
  },
]

function getStatusBadge(status: InvitationStatus, isNew: boolean) {
  if (isNew) {
    return <Badge className="bg-red-50 text-red-700 border-0">New</Badge>
  }
  
  switch (status) {
    case 'SENT':
    case 'VIEWED':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300">Pending</Badge>
    case 'BID_SUBMITTED':
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300">Submitted</Badge>
    case 'DECLINED':
      return <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400">Declined</Badge>
    case 'EXPIRED':
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300">Expired</Badge>
    default:
      return null
  }
}

interface InvitationCardProps {
  invitation: typeof sampleInvitations[0]
  onClick: () => void
}

function InvitationCard({ invitation, onClick }: InvitationCardProps) {
  const isActionable = ['SENT', 'VIEWED'].includes(invitation.status)
  
  return (
    <Card 
      className={`p-4 transition-all ${isActionable ? 'cursor-pointer hover:border-primary/50' : ''} ${invitation.isNew ? 'border-l-4 border-l-red-500' : ''} bg-card`}
      onClick={isActionable ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {getStatusBadge(invitation.status, invitation.isNew)}
            <span className="text-xs font-mono text-muted-foreground">{invitation.scopeNumber}</span>
          </div>
          <h3 className="font-semibold text-foreground">{invitation.title}</h3>
        </div>
        {isActionable && invitation.daysLeft !== undefined && (
          <div className="text-right">
            <p className={`text-sm font-semibold ${invitation.daysLeft <= 3 ? 'text-red-600' : 'text-foreground'}`}>
              {invitation.daysLeft} days left
            </p>
            <p className="text-xs text-muted-foreground">Deadline: {invitation.bidEndDate}</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" />
          {invitation.projectName}
        </span>
        <Badge variant="outline" className="text-xs">{invitation.categoryName}</Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Package className="size-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{invitation.quantity}</span>
        </div>
        
        {isActionable ? (
          <Button size="sm">
            View & Bid
            <ArrowRight className="size-4 ml-2" />
          </Button>
        ) : invitation.status === 'BID_SUBMITTED' ? (
          <Button variant="outline" size="sm" className="bg-transparent">
            <CheckCircle2 className="size-4 mr-2 text-emerald-600" />
            View Bid
          </Button>
        ) : null}
      </div>
    </Card>
  )
}

export default function VendorInvitationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("new")
  
  const newInvitations = sampleInvitations.filter(inv => 
    ['SENT', 'VIEWED'].includes(inv.status)
  )
  const submittedInvitations = sampleInvitations.filter(inv => 
    inv.status === 'BID_SUBMITTED'
  )
  const closedInvitations = sampleInvitations.filter(inv => 
    ['EXPIRED', 'DECLINED'].includes(inv.status)
  )
  
  const stats = {
    new: newInvitations.filter(inv => inv.isNew).length,
    pending: newInvitations.length,
    submitted: submittedInvitations.length,
  }
  
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bid Invitations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and respond to procurement requests
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <Bell className="size-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.new}</p>
                <p className="text-xs text-muted-foreground">New Invitations</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Clock className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending Response</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.submitted}</p>
                <p className="text-xs text-muted-foreground">Bids Submitted</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="new">
              New & Pending
              {stats.new > 0 && (
                <Badge className="ml-2 bg-red-50 text-red-700 border-0">{stats.new}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="submitted">Submitted ({stats.submitted})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({closedInvitations.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-3 mt-4">
            {newInvitations.length > 0 ? (
              newInvitations.map(inv => (
                <InvitationCard
                  key={inv.id}
                  invitation={inv}
                  onClick={() => router.push(`/vendor/invitations/${inv.scopeId}/bid`)}
                />
              ))
            ) : (
              <Card className="p-12 text-center bg-card">
                <Bell className="size-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No pending invitations</p>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="submitted" className="space-y-3 mt-4">
            {submittedInvitations.length > 0 ? (
              submittedInvitations.map(inv => (
                <InvitationCard
                  key={inv.id}
                  invitation={inv}
                  onClick={() => router.push(`/vendor/bids/${inv.bidId}`)}
                />
              ))
            ) : (
              <Card className="p-12 text-center bg-card">
                <FileText className="size-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No submitted bids</p>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="closed" className="space-y-3 mt-4">
            {closedInvitations.length > 0 ? (
              closedInvitations.map(inv => (
                <InvitationCard
                  key={inv.id}
                  invitation={inv}
                  onClick={() => {}}
                />
              ))
            ) : (
              <Card className="p-12 text-center bg-card">
                <XCircle className="size-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No closed invitations</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
