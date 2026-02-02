"use client";

import { useRouter } from "next/navigation"

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

export default function EmailLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // For demo, accept any valid-looking email with password "password123"
    if (password === "password123") {
      // Log in with demo user
      login({
        id: "user_demo_001",
        name: "Rajesh Sharma",
        email: email,
        phone: "9876543210",
        role: "super_admin",
        city: "bangalore",
      });
    } else {
      setError("Invalid email or password. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link 
        href="/login"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to phone login
      </Link>

      {/* Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-bold text-foreground">Login with Email</h2>
        <p className="mt-2 text-muted-foreground">
          Enter your email and password to continue
        </p>
      </div>

      {/* Email Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              className="pl-10"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              href="/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </Link>
          </div>
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
              autoComplete="current-password"
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
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button 
          type="submit" 
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Links */}
      <p className="text-center text-sm text-muted-foreground">
        {"Don't have an account? "}
        <Link href="/register" className="text-accent hover:underline font-medium">
          Contact Sales
        </Link>
      </p>

      {/* Demo Hint */}
      <div className="rounded-lg bg-muted p-4 text-center">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Demo:</span> Use any email with password{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 font-mono">password123</code>
        </p>
      </div>
    </div>
  );
}
