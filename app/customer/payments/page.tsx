"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle2, Clock, AlertCircle, ChevronRight, CreditCard, Building2, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Payment {
  id: string
  milestone: string
  amount: number
  dueDate: string
  status: "paid" | "due" | "upcoming"
  paidDate?: string
  receiptUrl?: string
}

const payments: Payment[] = [
  { id: "p1", milestone: "M1-M4: Foundation", amount: 1200000, dueDate: "Nov 22, 2025", status: "paid", paidDate: "Nov 20, 2025" },
  { id: "p2", milestone: "M5-M8: Ground Floor", amount: 1000000, dueDate: "Dec 15, 2025", status: "paid", paidDate: "Dec 14, 2025" },
  { id: "p3", milestone: "M9-M11: First Floor & Roof", amount: 1200000, dueDate: "Jan 10, 2026", status: "paid", paidDate: "Jan 9, 2026" },
  { id: "p4", milestone: "M12-M15: Plastering & MEP", amount: 400000, dueDate: "Jan 25, 2026", status: "paid", paidDate: "Jan 24, 2026" },
  { id: "p5", milestone: "M16-M18: Flooring & Painting", amount: 800000, dueDate: "Feb 15, 2026", status: "due" },
  { id: "p6", milestone: "M19-M20: Electrical & Plumbing", amount: 600000, dueDate: "Mar 1, 2026", status: "upcoming" },
  { id: "p7", milestone: "M21-M24: Interior & Handover", amount: 1000000, dueDate: "Mar 25, 2026", status: "upcoming" },
]

function formatCurrency(amount: number) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  return `₹${amount.toLocaleString("en-IN")}`
}

export default function PaymentsPage() {
  const [paymentList, setPaymentList] = React.useState<Payment[]>(payments)
  const [showPayModal, setShowPayModal] = React.useState(false)
  const [selectedPayment, setSelectedPayment] = React.useState<Payment | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null)

  const totalPaid = paymentList.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
  const totalDue = paymentList.filter(p => p.status === "due").reduce((sum, p) => sum + p.amount, 0)
  const totalContract = paymentList.reduce((sum, p) => sum + p.amount, 0)
  const progressPercent = Math.round((totalPaid / totalContract) * 100)

  const handlePay = (payment: Payment) => {
    setSelectedPayment(payment)
    setSelectedMethod(null)
    setShowPayModal(true)
  }

  const handlePaymentMethodSelect = async (method: string) => {
    setSelectedMethod(method)
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (selectedPayment) {
      const paidDate = new Date().toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short", 
        day: "numeric" 
      })

      // Update payment status to paid
      setPaymentList(prev => {
        const updated = prev.map(p => {
          if (p.id === selectedPayment.id) {
            return { ...p, status: "paid", paidDate }
          }
          return p
        })

        // Find the first upcoming milestone and change it to due
        let foundUpcoming = false
        const finalUpdated = updated.map(p => {
          if (!foundUpcoming && p.status === "upcoming") {
            foundUpcoming = true
            return { ...p, status: "due" }
          }
          return p
        })

        return finalUpdated
      })

      setIsProcessing(false)
      setShowPayModal(false)
      setSelectedPayment(null)
      setSelectedMethod(null)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link href="/customer">
            <Button variant="ghost" size="icon" className="bg-transparent">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="font-semibold text-lg">Payments</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Summary Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardContent className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{formatCurrency(totalPaid)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Due Now</p>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{formatCurrency(totalDue)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(totalContract)}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Payment Progress</span>
                <span className="text-xs font-medium text-foreground">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Due Payment Alert */}
        {totalDue > 0 && (
          <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="size-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-orange-800 dark:text-orange-200">Payment Due</p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {formatCurrency(totalDue)} due by {paymentList.find(p => p.status === "due")?.dueDate}
                </p>
              </div>
              <Button 
                size="sm" 
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => handlePay(paymentList.find(p => p.status === "due")!)}
              >
                Pay Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Payment Schedule */}
        <div>
          <h2 className="font-semibold text-foreground mb-4">Payment Schedule</h2>
          <div className="space-y-3">
            {paymentList.map((payment, index) => (
              <Card key={payment.id} className={cn(
                "border shadow-sm",
                payment.status === "due" && "border-orange-200 dark:border-orange-800"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "size-10 rounded-full flex items-center justify-center flex-shrink-0",
                      payment.status === "paid" ? "bg-green-100 dark:bg-green-900/50" :
                      payment.status === "due" ? "bg-orange-100 dark:bg-orange-900/50" :
                      "bg-muted"
                    )}>
                      {payment.status === "paid" ? (
                        <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                      ) : payment.status === "due" ? (
                        <AlertCircle className="size-5 text-orange-600 dark:text-orange-400" />
                      ) : (
                        <Clock className="size-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm text-foreground">{payment.milestone}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {payment.status === "paid" ? `Paid: ${payment.paidDate}` : `Due: ${payment.dueDate}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{formatCurrency(payment.amount)}</p>
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "mt-1 text-[10px]",
                              payment.status === "paid" ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" :
                              payment.status === "due" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400" :
                              "bg-muted text-muted-foreground"
                            )}
                          >
                            {payment.status === "paid" ? "Paid" : payment.status === "due" ? "Due" : "Upcoming"}
                          </Badge>
                        </div>
                      </div>
                      {payment.status === "paid" && (
                        <Button variant="ghost" size="sm" className="bg-transparent mt-2 h-7 text-xs text-primary p-0">
                          <Download className="size-3 mr-1" />
                          Download Receipt
                        </Button>
                      )}
                      {payment.status === "due" && (
                        <Button size="sm" className="mt-2 h-8" onClick={() => handlePay(payment)}>
                          Pay Now
                          <ChevronRight className="size-4 ml-1" />
                        </Button>
                      )}
                      {payment.status === "upcoming" && (
                        <Button size="sm" variant="outline" className="mt-2 h-8 bg-transparent" onClick={() => handlePay(payment)}>
                          Pay Now
                          <ChevronRight className="size-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPayModal} onOpenChange={setShowPayModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pay {selectedPayment && formatCurrency(selectedPayment.amount)}</DialogTitle>
            <DialogDescription>
              {selectedPayment?.milestone}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <p className="text-sm text-muted-foreground mb-4">Choose payment method</p>

            <button
              onClick={() => handlePaymentMethodSelect("upi")}
              disabled={isProcessing}
              className={cn(
                "w-full h-14 rounded-lg border-2 flex items-center gap-3 px-4 transition-all text-left",
                selectedMethod === "upi" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
              )}
            >
              <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <Smartphone className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">UPI Payment</p>
                <p className="text-xs text-muted-foreground">Google Pay, PhonePe, Paytm</p>
              </div>
              {selectedMethod === "upi" && isProcessing && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
              )}
            </button>

            <button
              onClick={() => handlePaymentMethodSelect("card")}
              disabled={isProcessing}
              className={cn(
                "w-full h-14 rounded-lg border-2 flex items-center gap-3 px-4 transition-all text-left",
                selectedMethod === "card" ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30" : "border-slate-200 dark:border-slate-700 hover:border-purple-300"
              )}
            >
              <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                <CreditCard className="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Card Payment</p>
                <p className="text-xs text-muted-foreground">Credit or Debit Card</p>
              </div>
              {selectedMethod === "card" && isProcessing && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent" />
              )}
            </button>

            <button
              onClick={() => handlePaymentMethodSelect("bank")}
              disabled={isProcessing}
              className={cn(
                "w-full h-14 rounded-lg border-2 flex items-center gap-3 px-4 transition-all text-left",
                selectedMethod === "bank" ? "border-green-500 bg-green-50 dark:bg-green-950/30" : "border-slate-200 dark:border-slate-700 hover:border-green-300"
              )}
            >
              <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                <Building2 className="size-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Bank Transfer</p>
                <p className="text-xs text-muted-foreground">NEFT / RTGS / IMPS</p>
              </div>
              {selectedMethod === "bank" && isProcessing && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent" />
              )}
            </button>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground text-center">
              Secure payment powered by Razorpay
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
