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
      {/* Left Side - Dream Home Banner Image & Branding (70%) */}
      <div className="hidden lg:flex lg:w-[70%] lg:shrink-0 relative bg-primary overflow-hidden">
        {/* Promotional banner: dream home / keys / construction */}
        <Image
          src="/images/dream-home-banner.png"
          alt="We build your dream home - India's No.1 tech powered construction company"
          fill
          className="object-cover object-center"
          priority
          sizes="70vw"
        />
        {/* Gradient overlay for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"
          aria-hidden
        />
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-white hover:text-white/90">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm shadow-sm">
              <Building2 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xl font-bold">Wehouse</span>
          </Link>

          {/* Banner copy */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight mb-4 text-balance drop-shadow-sm">
              WE BUILD YOUR{" "}
              <span className="text-amber-400">DREAM HOME</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed mb-6 drop-shadow-sm">
              India&apos;s <span className="font-semibold text-amber-400">NO.1 TECH</span> Powered
              Construction Company
            </p>
            <div className="inline-block rounded-md bg-amber-400 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-md">
              STARTS FROM RS. 1599/- SFT
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold text-white drop-shadow-sm">2,500+</div>
              <div className="text-sm text-white/80">Homes Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white drop-shadow-sm">500+</div>
              <div className="text-sm text-white/80">Partner Network</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white drop-shadow-sm">15+</div>
              <div className="text-sm text-white/80">Cities</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Form (30%) */}
      <div className="flex-1 lg:w-[30%] lg:shrink-0 flex items-center justify-center p-6 sm:p-12 bg-background">
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
