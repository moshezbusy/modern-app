"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FilterItem {
  id: string
  label: string
  count: number
}

const inboxFilters: FilterItem[] = [
  { id: "assigned", label: "Assigned to me", count: 3 },
  { id: "participating", label: "Participating", count: 0 },
  { id: "open", label: "Open", count: 12 },
  { id: "unassigned", label: "Unassigned", count: 5 },
  { id: "forwarded", label: "Forwarded", count: 2 },
  { id: "archive", label: "Archive", count: 156 },
  { id: "sent", label: "Sent", count: 48 },
]

const channelFilters: FilterItem[] = [
  { id: "all", label: "All", count: 88 },
  { id: "web", label: "Web", count: 45 },
  { id: "whatsapp", label: "WhatsApp", count: 23 },
  { id: "email", label: "Email", count: 12 },
  { id: "messenger", label: "Messenger", count: 8 },
]

export default function FiltersPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInboxFilter, setSelectedInboxFilter] = useState<string | null>(null)
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<string>("all")

  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="border-0 bg-accent pl-8 text-foreground placeholder:text-muted-foreground"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters Content */}
      <div className="mt-6 flex-1 space-y-6 overflow-y-auto">
        {/* Inbox Filters */}
        <div className="space-y-1">
          <h3 className="mb-2 flex items-center justify-between px-2 text-sm font-semibold text-foreground">
            <span>Inbox Filters</span>
            <span className="text-xs text-muted-foreground">−</span>
          </h3>
          {inboxFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedInboxFilter(filter.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                selectedInboxFilter === filter.id && "bg-accent text-foreground"
              )}
            >
              <span>{filter.label}</span>
              <span className="text-xs text-muted-foreground">{filter.count}</span>
            </button>
          ))}
        </div>

        {/* Channel Filters */}
        <div className="space-y-1">
          <h3 className="mb-2 flex items-center justify-between px-2 text-sm font-semibold text-foreground">
            <span>Channel Filters</span>
            <span className="text-xs text-muted-foreground">−</span>
          </h3>
          {channelFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedChannelFilter(filter.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                selectedChannelFilter === filter.id && "bg-accent text-foreground"
              )}
            >
              <span>{filter.label}</span>
              <span className="text-xs text-muted-foreground">{filter.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 