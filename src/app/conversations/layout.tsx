"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import FiltersPanel from "@/components/filters-panel"
import MainNavigation from "@/components/main-navigation"
import { ConversationList } from "@/components/conversation-list"
import ConversationArea from "@/components/conversation-area"

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(true)
  const [isConversationListOpen, setIsConversationListOpen] = useState(true)
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Main Navigation */}
      <nav className="flex w-16 flex-col bg-[#0F1420]">
        <MainNavigation />
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Filters Panel */}
        <div
          className={cn(
            "flex flex-col border-r bg-[#0F1420] transition-all duration-300",
            isFiltersPanelOpen ? "w-[240px]" : "w-0"
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
            <h2 className="font-semibold text-white">Filters</h2>
            <button
              onClick={() => setIsFiltersPanelOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <FiltersPanel />
          </div>
        </div>

        {/* Conversations List */}
        <div
          className={cn(
            "flex flex-col border-r bg-background transition-all duration-300",
            isConversationListOpen ? "w-[400px]" : "w-0"
          )}
        >
          <div className="flex h-14 items-center justify-between border-b px-4">
            <h2 className="font-semibold">Conversations</h2>
            <button
              onClick={() => setIsConversationListOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              onConversationSelect={(id: string) => setActiveConversationId(id)}
              activeConversationId={activeConversationId}
            />
          </div>
        </div>

        {/* Chat Area */}
        <div className="relative flex flex-1 flex-col bg-background">
          {/* Panel Toggle Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-2">
            {!isFiltersPanelOpen && (
              <button
                onClick={() => setIsFiltersPanelOpen(true)}
                className="rounded-r-lg border border-l-0 bg-background p-1.5 text-muted-foreground hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
            {!isConversationListOpen && (
              <button
                onClick={() => setIsConversationListOpen(true)}
                className="rounded-r-lg border border-l-0 bg-background p-1.5 text-muted-foreground hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Conversation Area Content */}
          {activeConversationId ? (
            <ConversationArea conversationId={activeConversationId} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Conversation Selected</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select a conversation from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 