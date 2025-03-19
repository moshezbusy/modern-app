"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Toaster } from "@/components/ui/sonner"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative flex min-h-screen">
          {/* Sidebar for desktop */}
          <aside className="fixed hidden h-screen w-64 border-r bg-background md:flex md:flex-col">
            <MainNav />
          </aside>

          {/* Main content area */}
          <div className="flex w-full flex-1 flex-col md:pl-64">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center px-4">
                <MobileNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <div className="w-full flex-1 md:w-auto md:flex-none">
                    {/* Search component will go here */}
                  </div>
                  <UserNav />
                </div>
              </div>
            </header>
            <main className="flex-1 p-4">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
} 