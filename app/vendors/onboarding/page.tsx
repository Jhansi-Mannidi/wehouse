"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/shell/dashboard-layout"
import { VendorApplicationForm } from "@/components/vendor/vendor-application-form"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function VendorOnboardingPage() {
  const { toast } = useToast()
  const router = useRouter()

  const handleSave = (data: unknown) => {
    console.log("Application saved:", data)
  }

  const handleSubmit = (data: unknown) => {
    console.log("Application submitted:", data)
    toast({
      title: "Application Submitted",
      description: "Your vendor application has been submitted successfully. You will be redirected to the dashboard.",
    })
    
    setTimeout(() => {
      router.push("/vendors/onboarding/dashboard")
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Vendor Application</h1>
          <p className="text-muted-foreground mt-1">
            Complete the form below to register as a Wehouse vendor partner
          </p>
        </div>

        {/* Application Form */}
        <VendorApplicationForm 
          onSave={handleSave}
          onSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  )
}
