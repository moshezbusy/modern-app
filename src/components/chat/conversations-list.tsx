'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'

type Conversation = {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: boolean
  channel: 'email' | 'whatsapp' | 'messenger' | 'sms'
  status: 'active' | 'resolved' | 'pending'
  assigned?: string
  labels?: string[]
}

export function ConversationsList() {
  const router = useRouter()
  const [filter, setFilter] = useState<'mine' | 'unassigned' | 'all'>('all')
  const [search, setSearch] = useState('')

  // Mock data - replace with real data from your API
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Thanks for your help!',
      timestamp: '5m ago',
      unread: true,
      channel: 'whatsapp',
      status: 'active',
      assigned: 'current-user',
      labels: ['support', 'priority']
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'When will my order arrive?',
      timestamp: '1h ago',
      unread: false,
      channel: 'email',
      status: 'pending',
      labels: ['sales']
    },
    {
      id: '3',
      name: 'Mike Johnson',
      lastMessage: 'I need help with my account',
      timestamp: '2h ago',
      unread: true,
      channel: 'messenger',
      status: 'active',
      labels: ['support']
    }
  ]

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(search.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(search.toLowerCase())
    
    if (!matchesSearch) return false

    switch (filter) {
      case 'mine':
        return conv.assigned === 'current-user'
      case 'unassigned':
        return !conv.assigned
      default:
        return true
    }
  })

  const getChannelIcon = (channel: Conversation['channel']) => {
    switch (channel) {
      case 'whatsapp':
        return <Icons.message className="h-4 w-4 text-green-500" />
      case 'email':
        return <Icons.mail className="h-4 w-4 text-blue-500" />
      case 'messenger':
        return <Icons.message className="h-4 w-4 text-blue-600" />
      case 'sms':
        return <Icons.message className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <Input
          type="search"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <Tabs defaultValue="all" className="flex-1">
        <div className="px-4 py-2 border-b">
          <TabsList className="w-full">
            <TabsTrigger value="all" onClick={() => setFilter('all')} className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="mine" onClick={() => setFilter('mine')} className="flex-1">
              Mine
            </TabsTrigger>
            <TabsTrigger value="unassigned" onClick={() => setFilter('unassigned')} className="flex-1">
              Unassigned
            </TabsTrigger>
          </TabsList>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => router.push(`/chats/${conv.id}`)}
                className={cn(
                  'w-full text-left p-3 rounded-lg hover:bg-muted transition-colors',
                  conv.unread && 'bg-muted'
                )}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex-shrink-0">
                    {getChannelIcon(conv.channel)}
                  </div>
                  <span className="font-medium flex-grow">{conv.name}</span>
                  <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 ml-7">
                  {conv.lastMessage}
                </p>
                {(conv.labels?.length ?? 0) > 0 && (
                  <div className="flex gap-1 mt-2 ml-7">
                    {conv.labels?.map((label) => (
                      <Badge
                        key={label}
                        variant={label === 'priority' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
} 