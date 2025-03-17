"use client"

import React from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Toaster } from 'sonner'
import { useSession } from 'next-auth/react'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { data: session } = useSession()

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar session={session} />
      <main className="container py-6">{children}</main>
      <Toaster />
    </div>
  )
} 