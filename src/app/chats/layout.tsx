"use client"

import { ConversationsList } from "@/components/chat/conversations-list"

interface ChatsLayoutProps {
  children: React.ReactNode
}

export default function ChatsLayout({ children }: ChatsLayoutProps) {
  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-[80px_350px_1fr]">
      <aside className="border-r">
        {/* Left navigation sidebar is rendered in the root layout */}
      </aside>
      <aside className="border-r">
        <ConversationsList />
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
} 