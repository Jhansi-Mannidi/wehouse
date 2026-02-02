"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Mail, Phone, Calendar, MapPin, IndianRupee } from "lucide-react"

export function InputShowcase() {
  return (
    <div className="space-y-8">
      {/* Text Inputs */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Text Inputs</h4>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter customer name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" placeholder="customer@example.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <div className="flex h-10 w-16 items-center justify-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">
                +91
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="phone" type="tel" placeholder="98765 43210" className="pl-10" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="search" placeholder="Search leads, projects..." className="pl-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Selects */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Select Inputs</h4>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Lead Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Lead</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal Sent</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Project Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="renovation">Renovation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi NCR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Assigned To</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales1">Rajesh Kumar</SelectItem>
                <SelectItem value="sales2">Priya Sharma</SelectItem>
                <SelectItem value="sales3">Amit Patel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Special Inputs */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Special Inputs</h4>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Site Visit Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="date" type="date" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (INR)</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="budget" type="number" placeholder="50,00,000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="location">Plot Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea 
                id="location" 
                placeholder="Enter complete plot address with survey number..."
                className="min-h-20 pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Input States */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Input States</h4>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="default">Default</Label>
            <Input id="default" placeholder="Default input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="filled">Filled</Label>
            <Input id="filled" defaultValue="Filled input value" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled</Label>
            <Input id="disabled" placeholder="Disabled input" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="error" className="text-destructive">Error State</Label>
            <Input 
              id="error" 
              placeholder="Invalid input" 
              className="border-destructive focus-visible:ring-destructive"
            />
            <p className="text-xs text-destructive">This field is required</p>
          </div>
        </div>
      </div>
    </div>
  )
}
