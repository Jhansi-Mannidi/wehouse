"use client"

import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

// Sample data for line chart
const trendData = [
  { month: "Jan 15", turnkey: 180, skilled: 250, architects: 50, interior: 90 },
  { month: "Jan 17", turnkey: 220, skilled: 310, architects: 58, interior: 105 },
  { month: "Jan 19", turnkey: 260, skilled: 360, architects: 65, interior: 120 },
  { month: "Jan 21", turnkey: 300, skilled: 420, architects: 78, interior: 140 },
  { month: "Jan 23", turnkey: 355, skilled: 499, architects: 93, interior: 161 },
]

// Sample data for bar chart
const monthlyData = [
  { month: "Jan", pending: 45, approved: 120, rejected: 25 },
  { month: "Feb", pending: 38, approved: 145, rejected: 18 },
  { month: "Mar", pending: 52, approved: 168, rejected: 22 },
  { month: "Apr", pending: 41, approved: 190, rejected: 15 },
  { month: "May", pending: 35, approved: 210, rejected: 12 },
]

// Sample data for pie chart
const distributionData = [
  { name: "Turnkey Partners", value: 355 },
  { name: "Skilled Workers", value: 499 },
  { name: "Architects", value: 93 },
  { name: "Interior Partners", value: 161 },
]

// Funnel data
const funnelData = [
  { stage: "New Leads", value: 1200, fill: "#3b82f6" },
  { stage: "Contacted", value: 850, fill: "#14b8a6" },
  { stage: "Qualified", value: 520, fill: "#f59e0b" },
  { stage: "Proposal", value: 280, fill: "#ec4899" },
  { stage: "Negotiation", value: 150, fill: "#8b5cf6" },
  { stage: "Won", value: 85, fill: "#22c55e" },
]

// Computed chart colors (not CSS variables for Recharts compatibility)
const chartColors = {
  teal: "#14b8a6",
  blue: "#3b82f6",
  pink: "#ec4899",
  orange: "#f59e0b",
  amber: "#eab308",
  green: "#22c55e",
  red: "#ef4444",
  purple: "#8b5cf6",
}

export function ChartShowcase() {
  return (
    <div className="space-y-8">
      {/* Line Chart - Trend */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Partner Growth Trend</CardTitle>
            <CardDescription>Timeline showing partner acquisition over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                turnkey: { label: "Turnkey Partners", color: chartColors.teal },
                skilled: { label: "Skilled Workers", color: chartColors.blue },
                architects: { label: "Architects", color: chartColors.pink },
                interior: { label: "Interior Partners", color: chartColors.orange },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="turnkey"
                    stroke={chartColors.teal}
                    strokeWidth={2}
                    dot={{ fill: chartColors.teal, strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="skilled"
                    stroke={chartColors.blue}
                    strokeWidth={2}
                    dot={{ fill: chartColors.blue, strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="architects"
                    stroke={chartColors.pink}
                    strokeWidth={2}
                    dot={{ fill: chartColors.pink, strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="interior"
                    stroke={chartColors.orange}
                    strokeWidth={2}
                    dot={{ fill: chartColors.orange, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Monthly Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Overview</CardTitle>
            <CardDescription>Partner applications by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                pending: { label: "Pending", color: chartColors.orange },
                approved: { label: "Approved", color: chartColors.teal },
                rejected: { label: "Rejected", color: chartColors.red },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="pending" fill={chartColors.orange} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="approved" fill={chartColors.teal} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rejected" fill={chartColors.red} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart & Gauge */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart - Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Partner Distribution</CardTitle>
            <CardDescription>Breakdown by partner type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                "Turnkey Partners": { label: "Turnkey Partners", color: chartColors.teal },
                "Skilled Workers": { label: "Skilled Workers", color: chartColors.blue },
                Architects: { label: "Architects", color: chartColors.pink },
                "Interior Partners": { label: "Interior Partners", color: chartColors.orange },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    <Cell fill={chartColors.teal} />
                    <Cell fill={chartColors.blue} />
                    <Cell fill={chartColors.pink} />
                    <Cell fill={chartColors.orange} />
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gauge / Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Actual vs Target</CardTitle>
            <CardDescription>Updated: Yesterday 6:05 PM</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                {/* Progress circle - 78% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={chartColors.blue}
                  strokeWidth="10"
                  strokeDasharray={`${78 * 2.51} ${100 * 2.51}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">78%</span>
                <span className="text-sm text-muted-foreground">Target</span>
              </div>
            </div>
            <div className="mt-6 flex w-full justify-between text-center">
              <div>
                <p className="text-2xl font-semibold text-foreground">800</p>
                <p className="text-xs text-muted-foreground">Actual</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">1200</p>
                <p className="text-xs text-muted-foreground">Target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sales Pipeline Funnel</CardTitle>
          <CardDescription>Lead conversion through sales stages</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: { label: "Leads", color: chartColors.blue },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                  width={75}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
