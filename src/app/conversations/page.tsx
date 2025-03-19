"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Keyboard, Command, MessageSquare } from "lucide-react"
import { ConversationList } from "@/components/conversation-list"
import { EmptyState } from "@/components/empty-state"
import ConversationArea from "@/components/conversation-area"

export default function ConversationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const hasConversations = true // This would come from your data source

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 pb-4">
      {/* Left side - Conversation List */}
      <div className="w-[400px] flex-shrink-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Conversations</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Command className="h-4 w-4" />
                </Button>
              </div>

              {/* Filters */}
              <div className="flex space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Status" />
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
                    <SelectValue placeholder="Channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="assigned" className="flex-1">
                    Assigned
                  </TabsTrigger>
                  <TabsTrigger value="unassigned" className="flex-1">
                    Unassigned
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Conversation List */}
              {hasConversations ? (
                <ConversationList
                  onConversationSelect={setActiveConversationId}
                  activeConversationId={activeConversationId}
                />
              ) : (
                <EmptyState
                  icon={<Keyboard className="h-12 w-12" />}
                  title="No conversations"
                  description="You don't have any conversations yet."
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Conversation Area */}
      <div className="flex-1">
        <Card className="h-full">
          {activeConversationId ? (
            <ConversationArea conversationId={activeConversationId} />
          ) : (
            <EmptyState
              icon={<MessageSquare className="h-12 w-12" />}
              title="No conversation selected"
              description="Select a conversation from the list to view it here."
            />
          )}
        </Card>
      </div>
    </div>
  )
} 