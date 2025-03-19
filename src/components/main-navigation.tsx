"use client"

import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Users,
  Bot,
  Megaphone,
  BarChart,
  Settings,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Chatbots", href: "/chatbots", icon: Bot },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Reports", href: "/reports", icon: BarChart },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function MainNavigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Logo */}
      <div className="flex h-14 items-center justify-center border-b border-white/10">
        <MessageSquare className="h-6 w-6 text-white" />
      </div>

      {/* Navigation Items */}
      <div className="flex flex-1 flex-col justify-between p-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
                title={item.name}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          )}
          title="Profile"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </>
  )
} 