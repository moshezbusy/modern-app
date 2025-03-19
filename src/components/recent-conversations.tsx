"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

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
      return <MessageSquare className="h-4 w-4" />
    case "email":
      return <Mail className="h-4 w-4" />
    case "messenger":
      return <MessageSquare className="h-4 w-4" />
    case "phone":
      return <Phone className="h-4 w-4" />
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

export function RecentConversations() {
  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center space-x-4 rounded-lg border p-4"
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
  )
} 