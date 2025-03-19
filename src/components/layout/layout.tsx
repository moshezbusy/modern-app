"use client"

import { Session } from "next-auth"
import { Navbar } from "@/components/layout/navbar"
import { Toaster } from "sonner"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main className="container py-6">{children}</main>
      <Toaster />
    </div>
  )
} 