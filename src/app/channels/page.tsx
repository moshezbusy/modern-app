"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ChannelList } from "@/components/channels/channel-list"
import { AddChannelDialog } from "@/components/channels/add-channel-dialog"
import { toast } from "sonner"

interface Channel {
  id: string
  type: string
  name: string
  config: any
  enabled: boolean
  _count: {
    contacts: number
    messages: number
  }
}

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    fetchChannels()
  }, [])

  const fetchChannels = async () => {
    try {
      const response = await fetch("/api/channels")
      if (!response.ok) throw new Error("Failed to fetch channels")
      const data = await response.json()
      setChannels(data)
    } catch (error) {
      toast.error("Failed to load channels")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddChannel = async (channelData: Partial<Channel>) => {
    try {
      const response = await fetch("/api/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(channelData)
      })

      if (!response.ok) throw new Error("Failed to add channel")
      
      toast.success("Channel added successfully")
      fetchChannels()
      setIsAddDialogOpen(false)
    } catch (error) {
      toast.error("Failed to add channel")
      console.error(error)
    }
  }

  const handleUpdateChannel = async (channelData: Partial<Channel>) => {
    try {
      const response = await fetch("/api/channels", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(channelData)
      })

      if (!response.ok) throw new Error("Failed to update channel")
      
      toast.success("Channel updated successfully")
      fetchChannels()
    } catch (error) {
      toast.error("Failed to update channel")
      console.error(error)
    }
  }

  const handleDeleteChannel = async (channelId: string) => {
    try {
      const response = await fetch(`/api/channels?id=${channelId}`, {
        method: "DELETE"
      })

      if (!response.ok) throw new Error("Failed to delete channel")
      
      toast.success("Channel deleted successfully")
      fetchChannels()
    } catch (error) {
      toast.error("Failed to delete channel")
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Channels</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Channel
        </Button>
      </div>

      <ChannelList
        channels={channels}
        isLoading={isLoading}
        onUpdateChannel={handleUpdateChannel}
        onDeleteChannel={handleDeleteChannel}
      />

      <AddChannelDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddChannel}
      />
    </div>
  )
} 