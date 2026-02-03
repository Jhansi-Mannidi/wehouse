export default function ProjectManagerDashboardLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  )
}
