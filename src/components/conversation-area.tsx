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
} from "lucide-react"

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

  // This would come from your data store
  const conversation = {
    id: conversationId,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    channel: "web",
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Here you would implement the actual message sending logic
    setNewMessage("")
  }

  return (
    <div className="flex h-full flex-col">
      {/* Conversation Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={`/avatars/${conversation.id}.png`} />
            <AvatarFallback>
              {conversation.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{conversation.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {getChannelIcon(conversation.channel)}
              <span>{conversation.email}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
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
                message.sender === "agent" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === "agent"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 