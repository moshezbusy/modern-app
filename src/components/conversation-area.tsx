"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Send,
  MessageSquare,
  Mail,
  MessageCircle,
  UserCircle,
} from "lucide-react"
import { CustomerDetailsSidebar } from "@/components/customer-details-sidebar"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: string
}

interface ConversationAreaProps {
  conversationId: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hi, I need help with my order",
    sender: "user",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    content: "Hello! I'd be happy to help you with your order. Could you please provide your order number?",
    sender: "agent",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    content: "Yes, it's #ORD-12345",
    sender: "user",
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    content: "Thank you. I can see your order here. What specific help do you need?",
    sender: "agent",
    timestamp: "10:33 AM",
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

export default function ConversationArea({ conversationId }: ConversationAreaProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false)

  // This would come from your data store
  const conversation = {
    id: conversationId,
    name: "John Doe",
    email: "john@example.com",
    status: "active" as const,
    channel: "web",
    customer: {
      name: "John Doe",
      email: "john.doe@acme.com",
      phone: "+1 (555) 123-4567",
      status: "online" as const,
      initials: "JD",
      company: "Acme Corporation",
      position: "Product Manager",
      location: "San Francisco, CA",
      timezone: "PST",
      lastContact: "2024-02-15",
      customerSince: "2023-05-01",
      totalOrders: 15,
      lifetimeValue: "$2,450",
      preferredLanguage: "English",
      tags: ["VIP", "Enterprise", "Product Beta"],
      recentOrders: [
        { id: "ORD-12345", date: "2024-02-10", amount: "$350" },
        { id: "ORD-12344", date: "2024-01-25", amount: "$180" },
      ],
      assignedTeam: "Enterprise Support",
      priority: "high",
      subscriptionPlan: "Enterprise",
      nextFollowUp: "2024-02-20",
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Here you would implement the actual message sending logic
    setNewMessage("")
  }

  return (
    <div className="flex h-full">
      {/* Main Chat Area */}
      <div className={cn(
        "flex h-full flex-col transition-[width] duration-300 ease-in-out",
        isDetailsSidebarOpen ? "w-[calc(100%-320px)]" : "w-full"
      )}>
        {/* Conversation Header */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`/avatars/${conversation.id}.png`} />
              <AvatarFallback>{conversation.customer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-semibold">{conversation.customer.name}</h2>
                <Badge variant="outline" className="flex items-center space-x-1">
                  {getChannelIcon(conversation.channel)}
                  <span className="capitalize">{conversation.channel}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{conversation.customer.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button
              variant={isDetailsSidebarOpen ? "secondary" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsDetailsSidebarOpen(!isDetailsSidebarOpen)}
            >
              <UserCircle className="h-4 w-4" />
              {isDetailsSidebarOpen ? "Hide Details" : "Show Details"}
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[70%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="mt-1 text-xs opacity-70">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center space-x-2"
          >
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Customer Details Sidebar */}
      <div className={cn(
        "h-full w-[320px] border-l bg-background relative",
        isDetailsSidebarOpen ? "block" : "hidden"
      )}>
        <CustomerDetailsSidebar
          isOpen={isDetailsSidebarOpen}
          onClose={() => setIsDetailsSidebarOpen(false)}
          customer={conversation.customer}
        />
      </div>
    </div>
  )
} 