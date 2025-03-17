'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    href: string
    title: string
    icon: keyof typeof Icons
  }[]
}

function SideNav({ className, items, ...props }: SideNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
      {items.map((item) => {
        const Icon = Icons[item.icon]
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

const sidebarNavItems: {
  href: string
  title: string
  icon: keyof typeof Icons
}[] = [
  {
    title: 'Conversations',
    href: '/app',
    icon: 'message',
  },
  {
    title: 'Contacts',
    href: '/app/contacts',
    icon: 'users',
  },
  {
    title: 'Settings',
    href: '/app/settings',
    icon: 'settings',
  },
  {
    title: 'Notifications',
    href: '/app/notifications',
    icon: 'bell',
  },
  {
    title: 'Profile',
    href: '/app/profile',
    icon: 'user',
  },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* First section: Left sidebar */}
      <aside className="hidden w-[200px] flex-col border-r px-4 py-6 sm:flex">
        <SideNav items={sidebarNavItems} />
      </aside>

      {/* Second section: Conversation list */}
      <div className="w-[300px] border-r">
        <div className="p-4 border-b">
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start">
              <Icons.inbox className="mr-2 h-4 w-4" />
              All Conversations
            </Button>
            <Button variant="ghost" className="justify-start">
              <Icons.users className="mr-2 h-4 w-4" />
              Teams
            </Button>
            <Button variant="ghost" className="justify-start">
              <Icons.mail className="mr-2 h-4 w-4" />
              Inboxes
            </Button>
          </nav>
        </div>
        <div className="overflow-auto">{/* Conversation list will go here */}</div>
      </div>

      {/* Third and Fourth sections: Chat tabs and window */}
      <div className="flex-1">
        <div className="h-full flex flex-col">
          {/* Chat tabs */}
          <div className="border-b">
            <nav className="flex px-4 py-2">
              <Button variant="ghost" className="mr-2">
                Chat 1
              </Button>
              <Button variant="ghost" className="mr-2">
                Chat 2
              </Button>
            </nav>
          </div>

          {/* Chat window */}
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 