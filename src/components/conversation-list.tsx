"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Mail, MessageCircle, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ConversationListProps {
  onConversationSelect: (id: string) => void
  activeConversationId: string | null
}

const conversations = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    lastMessage: "Hey, I need help with my order",
    time: "2m ago",
    channel: "web",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    lastMessage: "When will my package arrive?",
    time: "5m ago",
    channel: "whatsapp",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    lastMessage: "Thanks for your help!",
    time: "1h ago",
    channel: "email",
    status: "resolved",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    lastMessage: "I have a question about billing",
    time: "2h ago",
    channel: "messenger",
    status: "pending",
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom@example.com",
    lastMessage: "Can you check my account status?",
    time: "3h ago",
    channel: "web",
    status: "active",
  },
]

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "web":
      return <MessageSquare className="h-4 w-4" />
    case "whatsapp":
      return <MessageCircle className="h-4 w-4" />
    case "email":
      return <Mail className="h-4 w-4" />
    case "messenger":
      return <MessageCircle className="h-4 w-4" />
    default:
      return <MessageSquare className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500"
    case "pending":
      return "bg-yellow-500"
    case "resolved":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

export function ConversationList({ onConversationSelect, activeConversationId }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || conversation.status === statusFilter
    const matchesChannel = channelFilter === "all" || conversation.channel === channelFilter

    return matchesSearch && matchesStatus && matchesChannel
  })

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-4 p-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="All Channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="messenger">Messenger</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "flex cursor-pointer items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent",
                activeConversationId === conversation.id && "bg-accent"
              )}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <Avatar>
                <AvatarImage src={`/avatars/${conversation.id}.png`} />
                <AvatarFallback>
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {conversation.name}
                  </p>
                  <Badge
                    variant="secondary"
                    className={cn(getStatusColor(conversation.status))}
                  >
                    {conversation.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {conversation.lastMessage}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {getChannelIcon(conversation.channel)}
                  <span>{conversation.channel}</span>
                  <span>•</span>
                  <span>{conversation.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 