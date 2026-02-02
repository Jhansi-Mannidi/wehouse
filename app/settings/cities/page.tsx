"use client"

import * as React from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  MapPin,
  Building2,
  Users,
  FolderKanban,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  IndianRupee,
  Calendar,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Types
interface City {
  id: string
  name: string
  code: string
  state: string
  country: string
  address: string
  phone: string
  email: string
  status: "active" | "inactive" | "upcoming"
  adminName: string
  adminId: string
  projectCount: number
  userCount: number
  revenue: number
  createdAt: string
  launchDate?: string
}

// Sample data
const sampleCities: City[] = [
  {
    id: "CITY-001",
    name: "Hyderabad",
    code: "HYD",
    state: "Telangana",
    country: "India",
    address: "Plot 42, Hitec City, Madhapur, Hyderabad - 500081",
    phone: "+91 40 2355 1234",
    email: "hyderabad@wehouse.in",
    status: "active",
    adminName: "Priya Sharma",
    adminId: "USR-002",
    projectCount: 28,
    userCount: 45,
    revenue: 42500000,
    createdAt: "2024-01-15",
  },
  {
    id: "CITY-002",
    name: "Bangalore",
    code: "BLR",
    state: "Karnataka",
    country: "India",
    address: "Tower 3, Prestige Tech Park, Whitefield, Bangalore - 560066",
    phone: "+91 80 4123 5678",
    email: "bangalore@wehouse.in",
    status: "active",
    adminName: "Vikram Reddy",
    adminId: "USR-009",
    projectCount: 35,
    userCount: 52,
    revenue: 58200000,
    createdAt: "2024-02-20",
  },
  {
    id: "CITY-003",
    name: "Chennai",
    code: "CHN",
    state: "Tamil Nadu",
    country: "India",
    address: "Unit 5, RMZ Millenia, Phase 2, Perungudi, Chennai - 600096",
    phone: "+91 44 2876 4321",
    email: "chennai@wehouse.in",
    status: "active",
    adminName: "Anitha Krishnan",
    adminId: "USR-010",
    projectCount: 22,
    userCount: 38,
    revenue: 35800000,
    createdAt: "2024-03-10",
  },
  {
    id: "CITY-004",
    name: "Mumbai",
    code: "MUM",
    state: "Maharashtra",
    country: "India",
    address: "Floor 12, One BKC, Bandra Kurla Complex, Mumbai - 400051",
    phone: "+91 22 6789 1234",
    email: "mumbai@wehouse.in",
    status: "active",
    adminName: "Rajesh Mehta",
    adminId: "USR-011",
    projectCount: 18,
    userCount: 32,
    revenue: 48500000,
    createdAt: "2024-04-15",
  },
  {
    id: "CITY-005",
    name: "Pune",
    code: "PUN",
    state: "Maharashtra",
    country: "India",
    address: "Block C, EON IT Park, Kharadi, Pune - 411014",
    phone: "+91 20 3456 7890",
    email: "pune@wehouse.in",
    status: "active",
    adminName: "Sneha Patil",
    adminId: "USR-012",
    projectCount: 15,
    userCount: 28,
    revenue: 28900000,
    createdAt: "2024-05-22",
  },
  {
    id: "CITY-006",
    name: "Delhi NCR",
    code: "DEL",
    state: "Delhi",
    country: "India",
    address: "DLF Cyber City, Sector 24, Gurugram - 122002",
    phone: "+91 124 456 7890",
    email: "delhi@wehouse.in",
    status: "upcoming",
    adminName: "Pending Assignment",
    adminId: "",
    projectCount: 0,
    userCount: 5,
    revenue: 0,
    createdAt: "2026-01-10",
    launchDate: "2026-03-01",
  },
  {
    id: "CITY-007",
    name: "Kolkata",
    code: "KOL",
    state: "West Bengal",
    country: "India",
    address: "Salt Lake Sector V, Kolkata - 700091",
    phone: "+91 33 2567 8901",
    email: "kolkata@wehouse.in",
    status: "inactive",
    adminName: "Amit Das",
    adminId: "USR-013",
    projectCount: 8,
    userCount: 12,
    revenue: 12500000,
    createdAt: "2024-08-15",
  },
]

const states = [
  "Telangana",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
  "Delhi",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Kerala",
  "Uttar Pradesh",
]

export default function CitiesSettingsPage() {
  const { toast } = useToast()
  const [cities, setCities] = React.useState<City[]>(sampleCities)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null)
  const [viewMode, setViewMode] = React.useState<"cards" | "table">("cards")

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    code: "",
    state: "",
    address: "",
    phone: "",
    email: "",
    status: "upcoming" as City["status"],
    launchDate: "",
  })

  // Filter cities
  const filteredCities = React.useMemo(() => {
    return cities.filter((city) => {
      const matchesSearch =
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || city.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [cities, searchQuery, statusFilter])

  // Stats
  const stats = React.useMemo(() => ({
    total: cities.length,
    active: cities.filter((c) => c.status === "active").length,
    upcoming: cities.filter((c) => c.status === "upcoming").length,
    totalRevenue: cities.reduce((sum, c) => sum + c.revenue, 0),
    totalProjects: cities.reduce((sum, c) => sum + c.projectCount, 0),
    totalUsers: cities.reduce((sum, c) => sum + c.userCount, 0),
  }), [cities])

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      state: "",
      address: "",
      phone: "",
      email: "",
      status: "upcoming",
      launchDate: "",
    })
  }

  const handleCreateCity = () => {
    if (!formData.name || !formData.code || !formData.state) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newCity: City = {
      id: `CITY-${String(cities.length + 1).padStart(3, "0")}`,
      name: formData.name,
      code: formData.code.toUpperCase(),
      state: formData.state,
      country: "India",
      address: formData.address,
      phone: formData.phone,
      email: formData.email || `${formData.code.toLowerCase()}@wehouse.in`,
      status: formData.status,
      adminName: "Pending Assignment",
      adminId: "",
      projectCount: 0,
      userCount: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split("T")[0],
      launchDate: formData.launchDate || undefined,
    }

    setCities([...cities, newCity])
    setIsCreateModalOpen(false)
    resetForm()

    toast({
      title: "City Created",
      description: `${formData.name} branch has been added successfully`,
    })
  }

  const handleEditCity = () => {
    if (!selectedCity) return

    const updatedCities = cities.map((city) =>
      city.id === selectedCity.id
        ? {
            ...city,
            name: formData.name,
            code: formData.code.toUpperCase(),
            state: formData.state,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            status: formData.status,
            launchDate: formData.launchDate || undefined,
          }
        : city
    )

    setCities(updatedCities)
    setIsEditModalOpen(false)
    setSelectedCity(null)
    resetForm()

    toast({
      title: "City Updated",
      description: "Branch details have been updated successfully",
    })
  }

  const handleDeleteCity = () => {
    if (!selectedCity) return

    if (selectedCity.projectCount > 0) {
      toast({
        title: "Cannot Delete",
        description: "Please transfer or close all projects before deleting this branch",
        variant: "destructive",
      })
      return
    }

    setCities(cities.filter((c) => c.id !== selectedCity.id))
    setIsDeleteModalOpen(false)
    setSelectedCity(null)

    toast({
      title: "City Deleted",
      description: "The branch has been removed from the system",
    })
  }

  const openEditModal = (city: City) => {
    setSelectedCity(city)
    setFormData({
      name: city.name,
      code: city.code,
      state: city.state,
      address: city.address,
      phone: city.phone,
      email: city.email,
      status: city.status,
      launchDate: city.launchDate || "",
    })
    setIsEditModalOpen(true)
  }

  const toggleCityStatus = (city: City) => {
    const newStatus = city.status === "active" ? "inactive" : "active"
    setCities(cities.map((c) => (c.id === city.id ? { ...c, status: newStatus } : c)))

    toast({
      title: `Branch ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `${city.name} branch has been ${newStatus === "active" ? "activated" : "deactivated"}`,
    })
  }

  const getStatusBadge = (status: City["status"]) => {
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
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">
            <Clock className="size-3 mr-1" />
            Upcoming
          </Badge>
        )
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(2)} Cr`
    }
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(2)} L`
    }
    return amount.toLocaleString("en-IN")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">City Branches</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your organization's city branches and locations
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="size-4 mr-2" />
            Add City
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Globe className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Cities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.active}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200/50 dark:border-amber-800/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Clock className="size-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.upcoming}</p>
                  <p className="text-xs text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200/50 dark:border-purple-800/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <FolderKanban className="size-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalProjects}</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20 border-cyan-200/50 dark:border-cyan-800/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Users className="size-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stats.totalUsers}</p>
                  <p className="text-xs text-muted-foreground">Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/30 dark:to-teal-900/20 border-teal-200/50 dark:border-teal-800/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <IndianRupee className="size-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "cards" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className={viewMode !== "cards" ? "bg-transparent" : ""}
                >
                  <Building2 className="size-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={viewMode !== "table" ? "bg-transparent" : ""}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="15" x2="21" y2="15" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cities List - Cards View */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCities.map((city) => (
              <Card key={city.id} className="group relative overflow-hidden hover:shadow-lg transition-all">
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-1",
                  city.status === "active" ? "bg-emerald-500" : city.status === "upcoming" ? "bg-blue-500" : "bg-gray-400"
                )} />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-12 rounded-xl flex items-center justify-center font-bold text-white",
                        city.status === "active" ? "bg-gradient-to-br from-emerald-500 to-emerald-600" :
                        city.status === "upcoming" ? "bg-gradient-to-br from-blue-500 to-blue-600" :
                        "bg-gradient-to-br from-gray-400 to-gray-500"
                      )}>
                        {city.code}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{city.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{city.state}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditModal(city)}>
                          <Edit className="size-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleCityStatus(city)}>
                          {city.status === "active" ? (
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
                            setSelectedCity(city)
                            setIsDeleteModalOpen(true)
                          }}
                        >
                          <Trash2 className="size-4 mr-2" />
                          Delete Branch
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(city.status)}
                    {city.launchDate && city.status === "upcoming" && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-3" />
                        Launch: {new Date(city.launchDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 border-t">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{city.projectCount}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Projects</p>
                    </div>
                    <div className="text-center border-x">
                      <p className="text-lg font-bold text-foreground">{city.userCount}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{formatCurrency(city.revenue)}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Revenue</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="size-3.5" />
                      <span className="truncate">{city.adminName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="truncate">{city.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Cities List - Table View */}
        {viewMode === "table" && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>City</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCities.map((city) => (
                      <TableRow key={city.id} className="group">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "size-10 rounded-lg flex items-center justify-center font-bold text-white text-sm",
                              city.status === "active" ? "bg-emerald-500" :
                              city.status === "upcoming" ? "bg-blue-500" :
                              "bg-gray-400"
                            )}>
                              {city.code}
                            </div>
                            <div>
                              <p className="font-medium">{city.name}</p>
                              <p className="text-xs text-muted-foreground">{city.state}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{city.adminName}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{city.projectCount}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{city.userCount}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{formatCurrency(city.revenue)}</p>
                        </TableCell>
                        <TableCell>{getStatusBadge(city.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8 bg-transparent">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditModal(city)}>
                                <Edit className="size-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleCityStatus(city)}>
                                {city.status === "active" ? (
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
                                  setSelectedCity(city)
                                  setIsDeleteModalOpen(true)
                                }}
                              >
                                <Trash2 className="size-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredCities.length === 0 && (
          <Card className="p-12 text-center">
            <Globe className="size-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No cities found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Add your first city branch"}
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="size-4 mr-2" />
              Add City
            </Button>
          </Card>
        )}

        {/* Create/Edit City Modal */}
        <Dialog
          open={isCreateModalOpen || isEditModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsCreateModalOpen(false)
              setIsEditModalOpen(false)
              setSelectedCity(null)
              resetForm()
            }
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditModalOpen ? "Edit City Branch" : "Add New City Branch"}</DialogTitle>
              <DialogDescription>
                {isEditModalOpen
                  ? "Update the city branch details"
                  : "Enter the details for the new city branch location"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city-name">City Name *</Label>
                  <Input
                    id="city-name"
                    placeholder="e.g., Hyderabad"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city-code">City Code *</Label>
                  <Input
                    id="city-code"
                    placeholder="e.g., HYD"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status *</Label>
                  <Select value={formData.status} onValueChange={(v: City["status"]) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.status === "upcoming" && (
                <div className="space-y-2">
                  <Label htmlFor="launch-date">Expected Launch Date</Label>
                  <Input
                    id="launch-date"
                    type="date"
                    value={formData.launchDate}
                    onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="address">Office Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter full office address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+91 XX XXXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="city@wehouse.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedCity(null)
                  resetForm()
                }}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={isEditModalOpen ? handleEditCity : handleCreateCity}>
                {isEditModalOpen ? "Save Changes" : "Add City"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Delete City Branch</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the {selectedCity?.name} branch? This action cannot be undone.
                {selectedCity && selectedCity.projectCount > 0 && (
                  <span className="block mt-2 text-destructive">
                    Warning: This branch has {selectedCity.projectCount} active projects.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteCity}>
                Delete Branch
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
