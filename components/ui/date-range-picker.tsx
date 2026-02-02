"use client"

import * as React from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type DateRangePreset = 
  | "today" 
  | "yesterday" 
  | "last_7_days" 
  | "last_30_days" 
  | "this_month" 
  | "last_month" 
  | "this_quarter" 
  | "this_year" 
  | "all_time" 
  | "custom"

export interface DateRange {
  from: Date
  to: Date
}

interface DateRangePickerProps {
  value?: DateRangePreset
  onChange?: (preset: DateRangePreset, range: DateRange) => void
  className?: string
}

const presetLabels: Record<DateRangePreset, string> = {
  today: "Today",
  yesterday: "Yesterday",
  last_7_days: "Last 7 Days",
  last_30_days: "Last 30 Days",
  this_month: "This Month",
  last_month: "Last Month",
  this_quarter: "This Quarter",
  this_year: "This Year",
  all_time: "All Time",
  custom: "Custom Range",
}

function getDateRangeFromPreset(preset: DateRangePreset): DateRange {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  switch (preset) {
    case "today":
      return { from: today, to: today }
    
    case "yesterday": {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return { from: yesterday, to: yesterday }
    }
    
    case "last_7_days": {
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      return { from: weekAgo, to: today }
    }
    
    case "last_30_days": {
      const monthAgo = new Date(today)
      monthAgo.setDate(monthAgo.getDate() - 30)
      return { from: monthAgo, to: today }
    }
    
    case "this_month":
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1),
        to: today
      }
    
    case "last_month": {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
      return { from: lastMonth, to: lastMonthEnd }
    }
    
    case "this_quarter": {
      const quarter = Math.floor(now.getMonth() / 3)
      const quarterStart = new Date(now.getFullYear(), quarter * 3, 1)
      return { from: quarterStart, to: today }
    }
    
    case "this_year":
      return {
        from: new Date(now.getFullYear(), 0, 1),
        to: today
      }
    
    case "all_time":
      return {
        from: new Date(2020, 0, 1), // Arbitrary start date
        to: today
      }
    
    case "custom":
    default:
      return { from: today, to: today }
  }
}

export function DateRangePicker({
  value = "this_month",
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<DateRangePreset>(value)
  const [customFrom, setCustomFrom] = React.useState<string>("")
  const [customTo, setCustomTo] = React.useState<string>("")

  // Sync selectedPreset with value prop
  React.useEffect(() => {
    setSelectedPreset(value)
  }, [value])

  const handleApply = () => {
    let range: DateRange
    
    if (selectedPreset === "custom") {
      if (customFrom && customTo) {
        range = {
          from: new Date(customFrom),
          to: new Date(customTo),
        }
      } else {
        return // Don't apply if custom dates are not set
      }
    } else {
      range = getDateRangeFromPreset(selectedPreset)
    }
    
    onChange?.(selectedPreset, range)
    setOpen(false)
  }

  const handleCancel = () => {
    // Reset to original value when canceling
    setSelectedPreset(value)
    setCustomFrom("")
    setCustomTo("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        // Reset when popover closes without applying
        setSelectedPreset(value)
        setCustomFrom("")
        setCustomTo("")
      }
    }}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn("gap-1.5 bg-transparent", className)}
        >
          <Calendar className="size-4" />
          {presetLabels[value]}
          <ChevronDown className="size-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-3">Select Date Range</h4>
            <RadioGroup value={selectedPreset} onValueChange={(val) => setSelectedPreset(val as DateRangePreset)}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="today" id="today" />
                  <Label htmlFor="today" className="font-normal cursor-pointer">Today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yesterday" id="yesterday" />
                  <Label htmlFor="yesterday" className="font-normal cursor-pointer">Yesterday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="last_7_days" id="last_7_days" />
                  <Label htmlFor="last_7_days" className="font-normal cursor-pointer">Last 7 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="last_30_days" id="last_30_days" />
                  <Label htmlFor="last_30_days" className="font-normal cursor-pointer">Last 30 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="this_month" id="this_month" />
                  <Label htmlFor="this_month" className="font-normal cursor-pointer">This Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="last_month" id="last_month" />
                  <Label htmlFor="last_month" className="font-normal cursor-pointer">Last Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="this_quarter" id="this_quarter" />
                  <Label htmlFor="this_quarter" className="font-normal cursor-pointer">This Quarter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="this_year" id="this_year" />
                  <Label htmlFor="this_year" className="font-normal cursor-pointer">This Year</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all_time" id="all_time" />
                  <Label htmlFor="all_time" className="font-normal cursor-pointer">All Time</Label>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="font-normal cursor-pointer">Custom Range</Label>
                  </div>
                  {selectedPreset === "custom" && (
                    <div className="pl-6 space-y-2">
                      <div>
                        <Label htmlFor="custom-from" className="text-xs text-muted-foreground">From</Label>
                        <Input
                          id="custom-from"
                          type="date"
                          value={customFrom}
                          onChange={(e) => setCustomFrom(e.target.value)}
                          className="mt-1 h-8"
                        />
                      </div>
                      <div>
                        <Label htmlFor="custom-to" className="text-xs text-muted-foreground">To</Label>
                        <Input
                          id="custom-to"
                          type="date"
                          value={customTo}
                          onChange={(e) => setCustomTo(e.target.value)}
                          className="mt-1 h-8"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-end gap-2 pt-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              size="sm"
              onClick={handleApply}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
