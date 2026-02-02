"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  Shield,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  UserPlus,
  Download,
  Upload,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Types
interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  role: string
  roleId: string
  city: string
  cityId: string
  status: "active" | "inactive" | "pending"
  createdAt: string
  lastLogin?: string
}

// Sample data
const sampleUsers: User[] = [
  {
    id: "USR-001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@wehouse.in",
    phone: "+91 98765 43210",
    role: "Super Admin",
    roleId: "ROLE-001",
    city: "All Cities",
    cityId: "ALL",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2026-01-31",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya.sharma@wehouse.in",
    phone: "+91 87654 32109",
    role: "City Admin",
    roleId: "ROLE-002",
    city: "Hyderabad",
    cityId: "HYD",
    status: "active",
    createdAt: "2024-03-20",
    lastLogin: "2026-01-30",
  },
  {
    id: "USR-003",
    name: "Vikram Singh",
    email: "vikram.singh@wehouse.in",
    phone: "+91 76543 21098",
    role: "Project Manager",
    roleId: "ROLE-003",
    city: "Hyderabad",
    cityId: "HYD",
    status: "active",
    createdAt: "2024-05-10",
    lastLogin: "2026-01-29",
  },
  {
    id: "USR-004",
    name: "Anitha Reddy",
    email: "anitha.reddy@wehouse.in",
    phone: "+91 65432 10987",
    role: "Sales Executive",
    roleId: "ROLE-004",
    city: "Bangalore",
    cityId: "BLR",
    status: "active",
    createdAt: "2024-06-15",
    lastLogin: "2026-01-28",
  },
  {
    id: "USR-005",
    name: "Suresh Menon",
    email: "suresh.menon@wehouse.in",
    phone: "+91 54321 09876",
    role: "Procurement Manager",
    roleId: "ROLE-005",
    city: "Chennai",
    cityId: "CHN",
    status: "inactive",
    createdAt: "2024-07-22",
    lastLogin: "2026-01-15",
  },
  {
    id: "USR-006",
    name: "Deepika Nair",
    email: "deepika.nair@wehouse.in",
    phone: "+91 43210 98765",
    role: "Finance Manager",
    roleId: "ROLE-006",
    city: "Mumbai",
    cityId: "MUM",
    status: "pending",
    createdAt: "2026-01-25",
  },
  {
    id: "USR-007",
    name: "Karthik Rao",
    email: "karthik.rao@wehouse.in",
    phone: "+91 32109 87654",
    role: "Site Engineer",
    roleId: "ROLE-007",
    city: "Hyderabad",
    cityId: "HYD",
    status: "active",
    createdAt: "2024-08-30",
    lastLogin: "2026-01-31",
  },
  {
    id: "USR-008",
    name: "Meena Iyer",
    email: "meena.iyer@wehouse.in",
    phone: "+91 21098 76543",
    role: "Quality Assurance Officer",
    roleId: "ROLE-008",
    city: "Pune",
    cityId: "PUN",
    status: "active",
    createdAt: "2024-09-12",
    lastLogin: "2026-01-27",
  },
]

const availableRoles = [
  { id: "ROLE-001", name: "Super Admin" },
  { id: "ROLE-002", name: "City Admin" },
  { id: "ROLE-003", name: "Project Manager" },
  { id: "ROLE-004", name: "Sales Executive" },
  { id: "ROLE-005", name: "Procurement Manager" },
  { id: "ROLE-006", name: "Finance Manager" },
  { id: "ROLE-007", name: "Site Engineer" },
  { id: "ROLE-008", name: "Quality Assurance Officer" },
  { id: "ROLE-009", name: "Sales Coordinator" },
  { id: "ROLE-010", name: "Vendor" },
]

const availableCities = [
  { id: "ALL", name: "All Cities" },
  { id: "HYD", name: "Hyderabad" },
  { id: "BLR", name: "Bangalore" },
  { id: "CHN", name: "Chennai" },
  { id: "MUM", name: "Mumbai" },
  { id: "PUN", name: "Pune" },
]

export default function UsersSettingsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [users, setUsers] = React.useState<User[]>(sampleUsers)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState("all")
  const [cityFilter, setCityFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    roleId: "",
    cityId: "",
    password: "",
    sendInvite: true,
  })

  // Filter users
  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)

      const matchesRole = roleFilter === "all" || user.roleId === roleFilter
      const matchesCity = cityFilter === "all" || user.cityId === cityFilter
      const matchesStatus = statusFilter === "all" || user.status === statusFilter

      return matchesSearch && matchesRole && matchesCity && matchesStatus
    })
  }, [users, searchQuery, roleFilter, cityFilter, statusFilter])

  // Stats
  const stats = React.useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    pending: users.filter((u) => u.status === "pending").length,
  }), [users])

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      roleId: "",
      cityId: "",
      password: "",
      sendInvite: true,
    })
    setShowPassword(false)
  }

  const handleCreateUser = () => {
    if (!formData.name || !formData.email || !formData.roleId || !formData.cityId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newUser: User = {
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: availableRoles.find((r) => r.id === formData.roleId)?.name || "",
      roleId: formData.roleId,
      city: availableCities.find((c) => c.id === formData.cityId)?.name || "",
      cityId: formData.cityId,
      status: formData.sendInvite ? "pending" : "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, newUser])
    setIsCreateModalOpen(false)
    resetForm()

    toast({
      title: "User Created",
      description: formData.sendInvite
        ? `Invitation sent to ${formData.email}`
        : `${formData.name} has been added successfully`,
    })
  }

  const handleEditUser = () => {
    if (!selectedUser) return

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: availableRoles.find((r) => r.id === formData.roleId)?.name || user.role,
            roleId: formData.roleId || user.roleId,
            city: availableCities.find((c) => c.id === formData.cityId)?.name || user.city,
            cityId: formData.cityId || user.cityId,
          }
        : user
    )

    setUsers(updatedUsers)
    setIsEditModalOpen(false)
    setSelectedUser(null)
    resetForm()

    toast({
      title: "User Updated",
      description: "User details have been updated successfully",
    })
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return

    setUsers(users.filter((u) => u.id !== selectedUser.id))
    setIsDeleteModalOpen(false)
    setSelectedUser(null)

    toast({
      title: "User Deleted",
      description: "User has been removed from the system",
    })
  }

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active"
    setUsers(users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)))

    toast({
      title: `User ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `${user.name} has been ${newStatus === "active" ? "activated" : "deactivated"}`,
    })
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      roleId: user.roleId,
      cityId: user.cityId,
      password: "",
      sendInvite: false,
    })
    setIsEditModalOpen(true)
  }

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
            <CheckCircle2 className="size-3 mr-1" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-0">
            <XCircle className="size-3 mr-1" />
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">
            <RefreshCw className="size-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create, manage and assign roles to users across your organization
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="size-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Upload className="size-4 mr-2" />
              Import
            </Button>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <UserPlus className="size-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
                </div>
                <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Shield className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.active}</p>
                </div>
                <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/30 dark:to-gray-800/20 border-gray-200/50 dark:border-gray-700/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.inactive}</p>
                </div>
                <div className="size-10 rounded-full bg-gray-500/10 flex items-center justify-center">
                  <XCircle className="size-5 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200/50 dark:border-amber-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</p>
                </div>
                <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <RefreshCw className="size-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {availableRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {availableCities.filter((c) => c.id !== "ALL").map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Users ({filteredUsers.length})</CardTitle>
              {selectedUsers.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedUsers.length} selected
                  </span>
                  <Button variant="outline" size="sm" className="bg-transparent text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="size-4 mr-1" />
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsers(filteredUsers.map((u) => u.id))
                          } else {
                            setSelectedUsers([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="group">
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers([...selectedUsers, user.id])
                            } else {
                              setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Mail className="size-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          <Shield className="size-3 mr-1" />
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="size-3 text-muted-foreground" />
                          {user.city}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="size-3" />
                          {user.lastLogin || "Never"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditModal(user)}>
                              <Edit className="size-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(user)}>
                              {user.status === "active" ? (
                                <>
                                  <XCircle className="size-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="size-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsDeleteModalOpen(true)
                              }}
                            >
                              <Trash2 className="size-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center">
                <Shield className="size-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">No users found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <UserPlus className="size-4 mr-2" />
                  Add First User
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit User Modal */}
        <Dialog open={isCreateModalOpen || isEditModalOpen} onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false)
            setIsEditModalOpen(false)
            setSelectedUser(null)
            resetForm()
          }
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditModalOpen ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {isEditModalOpen
                  ? "Update the user details below"
                  : "Fill in the details to create a new user account"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role *</Label>
                  <Select value={formData.roleId} onValueChange={(v) => setFormData({ ...formData, roleId: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Select value={formData.cityId} onValueChange={(v) => setFormData({ ...formData, cityId: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {!isEditModalOpen && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={formData.sendInvite ? "Auto-generated" : "Enter password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={formData.sendInvite}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-7 bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
                    <div className="space-y-0.5">
                      <Label htmlFor="send-invite">Send Email Invitation</Label>
                      <p className="text-xs text-muted-foreground">
                        User will receive an email to set their password
                      </p>
                    </div>
                    <Switch
                      id="send-invite"
                      checked={formData.sendInvite}
                      onCheckedChange={(checked) => setFormData({ ...formData, sendInvite: checked })}
                    />
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedUser(null)
                  resetForm()
                }}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={isEditModalOpen ? handleEditUser : handleCreateUser}>
                {isEditModalOpen ? "Save Changes" : formData.sendInvite ? "Send Invite" : "Create User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser}>
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
