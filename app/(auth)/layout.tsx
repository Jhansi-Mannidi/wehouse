"use client";

import React from "react"

import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary">
        {/* Background Image */}
        <Image
          src="/images/auth-bg.jpg"
          alt="Construction site"
          fill
          className="object-cover opacity-30"
          priority
        />
        
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/20 backdrop-blur-sm shadow-sm">
              <Building2 className="h-3.5 w-3.5 text-accent-foreground/60 logo-shadow-fade" />
            </div>
            <span className="text-xl font-bold">Wehouse</span>
          </Link>
          
          {/* Tagline */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight mb-4 text-balance">
              Build Homes, Build Dreams
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              AI-powered construction management platform trusted by thousands 
              of homeowners and partners across India.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold">2,500+</div>
              <div className="text-sm text-primary-foreground/70">Homes Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-primary-foreground/70">Partner Network</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-primary-foreground/70">Cities</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/20 backdrop-blur-sm shadow-sm">
                <Building2 className="h-3.5 w-3.5 text-accent-foreground/60 logo-shadow-fade" />
              </div>
              <span className="text-xl font-bold text-foreground">Wehouse</span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
