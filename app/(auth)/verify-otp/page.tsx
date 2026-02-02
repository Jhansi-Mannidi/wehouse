"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/lib/auth-context";

function OTPVerificationContent() {
  const router = useRouter(); // Declare the router variable here
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  // Auto-submit when OTP is complete
  const handleOTPComplete = useCallback(async (value: string) => {
    if (value.length === 6) {
      setIsLoading(true);
      setError("");
      
      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // For demo, accept "123456" as valid OTP
      if (value === "123456") {
        setIsVerified(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Log in with demo user
        login({
          id: "user_demo_001",
          name: "Rajesh Sharma",
          email: "rajesh@wehouse.in",
          phone: phone,
          role: "super_admin",
          city: "bangalore",
        });
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp("");
      }
      
      setIsLoading(false);
    }
  }, [login, phone]);

  const handleResendOTP = async () => {
    setCanResend(false);
    setCountdown(30);
    setError("");
    setOtp("");
    
    // Simulate resend API call
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const maskedPhone = phone 
    ? `+91 ${phone.slice(0, 2)}****${phone.slice(-2)}`
    : "+91 ********";

  if (isVerified) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-success/10 p-4">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Verified!</h2>
          <p className="mt-2 text-muted-foreground">
            Redirecting you to dashboard...
          </p>
        </div>
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link 
        href="/login"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </Link>

      {/* Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold text-foreground">Verify your phone</h2>
        <p className="mt-2 text-muted-foreground">
          {"We've sent a 6-digit code to "}
          <span className="font-medium text-foreground">{maskedPhone}</span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setError("");
              setOtp(value);
              handleOTPComplete(value);
            }}
            disabled={isLoading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Verifying...</span>
          </div>
        )}
      </div>

      {/* Resend OTP */}
      <div className="text-center">
        {canResend ? (
          <Button
            variant="ghost"
            onClick={handleResendOTP}
            className="text-accent hover:text-accent/90"
          >
            Resend OTP
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Resend code in{" "}
            <span className="font-medium text-foreground">{countdown}s</span>
          </p>
        )}
      </div>

      {/* Change Number */}
      <div className="text-center">
        <Link 
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Change phone number
        </Link>
      </div>

      {/* Demo Hint */}
      <div className="rounded-lg bg-muted p-4 text-center">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Demo:</span> Enter{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 font-mono">123456</code>{" "}
          to verify
        </p>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    }>
      <OTPVerificationContent />
    </Suspense>
  );
}
