"use client"

import * as React from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Users,
  Check,
  X,
  Copy,
  Eye,
  Lock,
  Unlock,
  ChevronDown,
  ChevronRight,
  Settings,
  FileText,
  BarChart3,
  DollarSign,
  ShoppingCart,
  Building2,
  UserCheck,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Types
interface Permission {
  id: string
  name: string
  description: string
}

interface PermissionGroup {
  id: string
  name: string
  icon: React.ElementType
  permissions: Permission[]
}

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: string[]
  isSystem: boolean
  createdAt: string
  color: string
}

// Permission groups
const permissionGroups: PermissionGroup[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: BarChart3,
    permissions: [
      { id: "dashboard.view", name: "View Dashboard", description: "Access to main dashboard" },
      { id: "dashboard.analytics", name: "View Analytics", description: "Access to analytics and reports" },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    icon: Building2,
    permissions: [
      { id: "projects.view", name: "View Projects", description: "View all projects" },
      { id: "projects.create", name: "Create Projects", description: "Create new projects" },
      { id: "projects.edit", name: "Edit Projects", description: "Modify project details" },
      { id: "projects.delete", name: "Delete Projects", description: "Remove projects from system" },
      { id: "projects.assign", name: "Assign Team", description: "Assign team members to projects" },
    ],
  },
  {
    id: "users",
    name: "User Management",
    icon: Users,
    permissions: [
      { id: "users.view", name: "View Users", description: "View user list and details" },
      { id: "users.create", name: "Create Users", description: "Add new users to system" },
      { id: "users.edit", name: "Edit Users", description: "Modify user information" },
      { id: "users.delete", name: "Delete Users", description: "Remove users from system" },
      { id: "users.roles", name: "Manage Roles", description: "Assign roles to users" },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    icon: DollarSign,
    permissions: [
      { id: "finance.view", name: "View Financial Data", description: "Access financial reports" },
      { id: "finance.invoices", name: "Manage Invoices", description: "Create and manage invoices" },
      { id: "finance.payments", name: "Process Payments", description: "Handle payment transactions" },
      { id: "finance.approve", name: "Approve Expenses", description: "Approve expense requests" },
    ],
  },
  {
    id: "procurement",
    name: "Procurement",
    icon: ShoppingCart,
    permissions: [
      { id: "procurement.view", name: "View Orders", description: "View purchase orders" },
      { id: "procurement.create", name: "Create Orders", description: "Create purchase orders" },
      { id: "procurement.approve", name: "Approve Orders", description: "Approve purchase requests" },
      { id: "procurement.vendors", name: "Manage Vendors", description: "Add and edit vendors" },
    ],
  },
  {
    id: "reports",
    name: "Reports",
    icon: FileText,
    permissions: [
      { id: "reports.view", name: "View Reports", description: "Access system reports" },
      { id: "reports.create", name: "Generate Reports", description: "Create custom reports" },
      { id: "reports.export", name: "Export Reports", description: "Export reports to files" },
    ],
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    permissions: [
      { id: "settings.view", name: "View Settings", description: "Access system settings" },
      { id: "settings.edit", name: "Edit Settings", description: "Modify system configuration" },
      { id: "settings.cities", name: "Manage Cities", description: "Add and manage city branches" },
    ],
  },
]

// Sample roles
const sampleRoles: Role[] = [
  {
    id: "ROLE-001",
    name: "Super Admin",
    description: "Full system access with all permissions",
    userCount: 2,
    permissions: permissionGroups.flatMap((g) => g.permissions.map((p) => p.id)),
    isSystem: true,
    createdAt: "2024-01-01",
    color: "bg-purple-500",
  },
  {
    id: "ROLE-002",
    name: "City Admin",
    description: "Administrative access for a specific city branch",
    userCount: 5,
    permissions: [
      "dashboard.view",
      "dashboard.analytics",
      "projects.view",
      "projects.create",
      "projects.edit",
      "projects.assign",
      "users.view",
      "users.create",
      "users.edit",
      "finance.view",
      "procurement.view",
      "procurement.create",
      "reports.view",
      "reports.create",
      "settings.view",
    ],
    isSystem: true,
    createdAt: "2024-01-01",
    color: "bg-blue-500",
  },
  {
    id: "ROLE-003",
    name: "Project Manager",
    description: "Manage and oversee construction projects",
    userCount: 12,
    permissions: [
      "dashboard.view",
      "projects.view",
      "projects.edit",
      "projects.assign",
      "procurement.view",
      "procurement.create",
      "reports.view",
    ],
    isSystem: true,
    createdAt: "2024-01-01",
    color: "bg-emerald-500",
  },
  {
    id: "ROLE-004",
    name: "Sales Executive",
    description: "Handle sales and customer relations",
    userCount: 18,
    permissions: [
      "dashboard.view",
      "projects.view",
      "reports.view",
    ],
    isSystem: true,
    createdAt: "2024-01-01",
    color: "bg-amber-500",
  },
  {
    id: "ROLE-005",
    name: "Procurement Manager",
    description: "Manage procurement and vendor relationships",
    userCount: 4,
    permissions: [
      "dashboard.view",
      "projects.view",
      "procurement.view",
      "procurement.create",
      "procurement.approve",
      "procurement.vendors",
      "reports.view",
      "reports.create",
    ],
    isSystem: true,
    createdAt: "2024-01-01",
    color: "bg-orange-500",
  },
  {
    id: "ROLE-006",
    name: "Finance Manager",
    description: "Handle financial operations and reporting",
    userCount: 3,
    permissions: [
      "dashboard.view",
      "dashboard.analytics",
      "finance.view",
      "finance.invoices",
      "finance.payments",
      "finance.approve",
      "reports.view",
      "reports.create",
      "reports.export",
    ],
    isSystem: true,
    createdAt: "2024-01-01",
    color: "bg-teal-500",
  },
  {
    id: "ROLE-007",
    name: "Site Engineer",
    description: "On-site project supervision and quality control",
    userCount: 25,
    permissions: [
      "dashboard.view",
      "projects.view",
      "reports.view",
    ],
    isSystem: true,
    createdAt: "2024-01-01",
    color: "bg-cyan-500",
  },
  {
    id: "ROLE-008",
    name: "Quality Assurance Officer",
    description: "Ensure quality standards are met",
    userCount: 6,
    permissions: [
      "dashboard.view",
      "projects.view",
      "reports.view",
      "reports.create",
    ],
    isSystem: false,
    createdAt: "2024-06-15",
    color: "bg-indigo-500",
  },
]

export default function RolesSettingsPage() {
  const { toast } = useToast()
  const [roles, setRoles] = React.useState<Role[]>(sampleRoles)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false)
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null)
  const [expandedGroups, setExpandedGroups] = React.useState<string[]>(["dashboard", "projects"])

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    permissions: [] as string[],
    color: "bg-blue-500",
  })

  const colorOptions = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-red-500",
  ]

  // Filter roles
  const filteredRoles = React.useMemo(() => {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [roles, searchQuery])

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      permissions: [],
      color: "bg-blue-500",
    })
    setExpandedGroups(["dashboard", "projects"])
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }

  const togglePermission = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const toggleGroupPermissions = (group: PermissionGroup) => {
    const groupPermissionIds = group.permissions.map((p) => p.id)
    const allSelected = groupPermissionIds.every((id) => formData.permissions.includes(id))

    setFormData((prev) => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter((id) => !groupPermissionIds.includes(id))
        : [...new Set([...prev.permissions, ...groupPermissionIds])],
    }))
  }

  const handleCreateRole = () => {
    if (!formData.name) {
      toast({
        title: "Validation Error",
        description: "Please enter a role name",
        variant: "destructive",
      })
      return
    }

    const newRole: Role = {
      id: `ROLE-${String(roles.length + 1).padStart(3, "0")}`,
      name: formData.name,
      description: formData.description,
      userCount: 0,
      permissions: formData.permissions,
      isSystem: false,
      createdAt: new Date().toISOString().split("T")[0],
      color: formData.color,
    }

    setRoles([...roles, newRole])
    setIsCreateModalOpen(false)
    resetForm()

    toast({
      title: "Role Created",
      description: `${formData.name} role has been created successfully`,
    })
  }

  const handleEditRole = () => {
    if (!selectedRole || !formData.name) return

    const updatedRoles = roles.map((role) =>
      role.id === selectedRole.id
        ? {
            ...role,
            name: formData.name,
            description: formData.description,
            permissions: formData.permissions,
            color: formData.color,
          }
        : role
    )

    setRoles(updatedRoles)
    setIsEditModalOpen(false)
    setSelectedRole(null)
    resetForm()

    toast({
      title: "Role Updated",
      description: "Role permissions have been updated successfully",
    })
  }

  const handleDeleteRole = () => {
    if (!selectedRole) return

    if (selectedRole.isSystem) {
      toast({
        title: "Cannot Delete",
        description: "System roles cannot be deleted",
        variant: "destructive",
      })
      return
    }

    if (selectedRole.userCount > 0) {
      toast({
        title: "Cannot Delete",
        description: "Please reassign users before deleting this role",
        variant: "destructive",
      })
      return
    }

    setRoles(roles.filter((r) => r.id !== selectedRole.id))
    setIsDeleteModalOpen(false)
    setSelectedRole(null)

    toast({
      title: "Role Deleted",
      description: "The role has been removed from the system",
    })
  }

  const openEditModal = (role: Role) => {
    setSelectedRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
      color: role.color,
    })
    setExpandedGroups(permissionGroups.map((g) => g.id))
    setIsEditModalOpen(true)
  }

  const duplicateRole = (role: Role) => {
    const newRole: Role = {
      ...role,
      id: `ROLE-${String(roles.length + 1).padStart(3, "0")}`,
      name: `${role.name} (Copy)`,
      userCount: 0,
      isSystem: false,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setRoles([...roles, newRole])

    toast({
      title: "Role Duplicated",
      description: `${newRole.name} has been created`,
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Role Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Define roles and permissions for your organization
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="size-4 mr-2" />
            Create Role
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRoles.map((role) => (
            <Card
              key={role.id}
              className="group relative overflow-hidden hover:shadow-md transition-all"
            >
              <div className={cn("absolute top-0 left-0 right-0 h-1", role.color)} />
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("size-10 rounded-lg flex items-center justify-center text-white", role.color)}>
                      <Shield className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">{role.name}</CardTitle>
                      {role.isSystem && (
                        <Badge variant="secondary" className="text-[10px] mt-1">
                          <Lock className="size-2.5 mr-1" />
                          System
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setSelectedRole(role)
                        setIsViewModalOpen(true)
                      }}>
                        <Eye className="size-4 mr-2" />
                        View Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditModal(role)}>
                        <Edit className="size-4 mr-2" />
                        Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => duplicateRole(role)}>
                        <Copy className="size-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      {!role.isSystem && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedRole(role)
                              setIsDeleteModalOpen(true)
                            }}
                          >
                            <Trash2 className="size-4 mr-2" />
                            Delete Role
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {role.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="size-4" />
                    <span>{role.userCount} users</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {role.permissions.length} permissions
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <Card className="p-12 text-center">
            <Shield className="size-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No roles found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Create your first custom role"}
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="size-4 mr-2" />
              Create Role
            </Button>
          </Card>
        )}

        {/* Create/Edit Role Modal */}
        <Dialog
          open={isCreateModalOpen || isEditModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsCreateModalOpen(false)
              setIsEditModalOpen(false)
              setSelectedRole(null)
              resetForm()
            }
          }}
        >
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{isEditModalOpen ? "Edit Role" : "Create New Role"}</DialogTitle>
              <DialogDescription>
                {isEditModalOpen
                  ? "Update role details and permissions"
                  : "Define a new role with specific permissions"}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-6 py-4 pr-2">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role Name *</Label>
                  <Input
                    id="role-name"
                    placeholder="Enter role name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role-desc">Description</Label>
                  <Textarea
                    id="role-desc"
                    placeholder="Describe this role's purpose"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={cn(
                          "size-8 rounded-lg transition-all",
                          color,
                          formData.color === color
                            ? "ring-2 ring-offset-2 ring-primary"
                            : "hover:scale-110"
                        )}
                        onClick={() => setFormData({ ...formData, color })}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Permissions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Permissions</Label>
                  <span className="text-xs text-muted-foreground">
                    {formData.permissions.length} selected
                  </span>
                </div>

                <div className="space-y-2">
                  {permissionGroups.map((group) => {
                    const GroupIcon = group.icon
                    const groupPermissionIds = group.permissions.map((p) => p.id)
                    const selectedCount = groupPermissionIds.filter((id) =>
                      formData.permissions.includes(id)
                    ).length
                    const allSelected = selectedCount === group.permissions.length
                    const someSelected = selectedCount > 0 && !allSelected

                    return (
                      <Collapsible
                        key={group.id}
                        open={expandedGroups.includes(group.id)}
                        onOpenChange={() => toggleGroup(group.id)}
                      >
                        <div className="rounded-lg border bg-card">
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={allSelected}
                                  // @ts-ignore
                                  indeterminate={someSelected}
                                  onCheckedChange={() => toggleGroupPermissions(group)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <GroupIcon className="size-4 text-muted-foreground" />
                                <span className="font-medium text-sm">{group.name}</span>
                                <Badge variant="secondary" className="text-[10px]">
                                  {selectedCount}/{group.permissions.length}
                                </Badge>
                              </div>
                              {expandedGroups.includes(group.id) ? (
                                <ChevronDown className="size-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="size-4 text-muted-foreground" />
                              )}
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="px-3 pb-3 space-y-2 border-t pt-2 bg-muted/30">
                              {group.permissions.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="flex items-start gap-3 py-1.5"
                                >
                                  <Checkbox
                                    id={permission.id}
                                    checked={formData.permissions.includes(permission.id)}
                                    onCheckedChange={() => togglePermission(permission.id)}
                                    className="mt-0.5"
                                  />
                                  <div className="flex-1">
                                    <label
                                      htmlFor={permission.id}
                                      className="text-sm font-medium cursor-pointer"
                                    >
                                      {permission.name}
                                    </label>
                                    <p className="text-xs text-muted-foreground">
                                      {permission.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    )
                  })}
                </div>
              </div>
            </div>

            <DialogFooter className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedRole(null)
                  resetForm()
                }}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={isEditModalOpen ? handleEditRole : handleCreateRole}>
                {isEditModalOpen ? "Save Changes" : "Create Role"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Permissions Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={cn("size-10 rounded-lg flex items-center justify-center text-white", selectedRole?.color)}>
                  <Shield className="size-5" />
                </div>
                <div>
                  <DialogTitle>{selectedRole?.name}</DialogTitle>
                  <DialogDescription>{selectedRole?.description}</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-2">
              {permissionGroups.map((group) => {
                const GroupIcon = group.icon
                const groupPermissions = group.permissions.filter((p) =>
                  selectedRole?.permissions.includes(p.id)
                )

                if (groupPermissions.length === 0) return null

                return (
                  <div key={group.id} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <GroupIcon className="size-4" />
                      {group.name}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {groupPermissions.map((permission) => (
                        <Badge key={permission.id} variant="secondary" className="text-xs">
                          <Check className="size-3 mr-1" />
                          {permission.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <DialogFooter className="border-t pt-4">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)} className="bg-transparent">
                Close
              </Button>
              <Button onClick={() => {
                setIsViewModalOpen(false)
                if (selectedRole) openEditModal(selectedRole)
              }}>
                <Edit className="size-4 mr-2" />
                Edit Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Delete Role</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the "{selectedRole?.name}" role? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteRole}>
                Delete Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
