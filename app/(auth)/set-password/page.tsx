"use client";

import React from "react"

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2, CheckCircle2, XCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /\d/.test(p) },
  { label: "One special character (!@#$%^&*)", test: (p) => /[!@#$%^&*]/.test(p) },
];

function SetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstTime = searchParams.get("first") === "true";
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    const metRequirements = passwordRequirements.filter((req) => req.test(password)).length;
    const percentage = (metRequirements / passwordRequirements.length) * 100;
    
    if (percentage === 0) return { level: "none", label: "", color: "bg-muted" };
    if (percentage < 40) return { level: "weak", label: "Weak", color: "bg-destructive" };
    if (percentage < 80) return { level: "medium", label: "Medium", color: "bg-warning" };
    return { level: "strong", label: "Strong", color: "bg-success" };
  }, [password]);

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const allRequirementsMet = passwordRequirements.every((req) => req.test(password));
  const canSubmit = allRequirementsMet && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      setError("Please meet all password requirements");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    
    // Redirect after success
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/login");
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-success/10 p-4">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Password Set Successfully!</h2>
          <p className="mt-2 text-muted-foreground">
            Redirecting you to login...
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
        <h2 className="text-2xl font-bold text-foreground">
          {isFirstTime ? "Create your password" : "Reset your password"}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {isFirstTime 
            ? "Set up a secure password for your account"
            : "Enter a new password for your account"
          }
        </p>
      </div>

      {/* Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="password">
            {isFirstTime ? "Create Password" : "New Password"}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
              className="pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-300",
                      passwordStrength.color
                    )}
                    style={{ 
                      width: passwordStrength.level === "none" ? "0%" :
                             passwordStrength.level === "weak" ? "33%" :
                             passwordStrength.level === "medium" ? "66%" : "100%"
                    }}
                  />
                </div>
                <span className={cn(
                  "text-xs font-medium",
                  passwordStrength.level === "weak" && "text-destructive",
                  passwordStrength.level === "medium" && "text-warning-foreground",
                  passwordStrength.level === "strong" && "text-success"
                )}>
                  {passwordStrength.label}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setError("");
                setConfirmPassword(e.target.value);
              }}
              className="pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {/* Password Match Indicator */}
          {confirmPassword.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              {passwordsMatch ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-success">Passwords match</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="text-destructive">Passwords do not match</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Password Requirements Checklist */}
        <div className="rounded-lg border border-border p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">Password must have:</p>
          <ul className="space-y-1">
            {passwordRequirements.map((req, index) => {
              const isMet = req.test(password);
              return (
                <li 
                  key={index}
                  className={cn(
                    "flex items-center gap-2 text-sm transition-colors",
                    isMet ? "text-success" : "text-muted-foreground"
                  )}
                >
                  {isMet ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-current" />
                  )}
                  {req.label}
                </li>
              );
            })}
          </ul>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button 
          type="submit" 
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          disabled={isLoading || !canSubmit}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting password...
            </>
          ) : (
            isFirstTime ? "Create Password" : "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    }>
      <SetPasswordContent />
    </Suspense>
  );
}
