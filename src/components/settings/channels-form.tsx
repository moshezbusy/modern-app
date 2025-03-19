"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Channel {
  id: string
  name: string
  description: string
  enabled: boolean
}

const defaultChannels: Channel[] = [
  {
    id: "email",
    name: "Email Notifications",
    description: "Receive email notifications for important updates",
    enabled: true,
  },
  {
    id: "push",
    name: "Push Notifications",
    description: "Get push notifications on your device",
    enabled: false,
  },
  {
    id: "sms",
    name: "SMS Notifications",
    description: "Receive SMS notifications for critical alerts",
    enabled: false,
  },
]

export function ChannelsForm() {
  const [channels, setChannels] = useState<Channel[]>(defaultChannels)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit() {
    setIsLoading(true)

    try {
      const response = await fetch("/api/user/settings/channels", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channels }),
      })

      if (!response.ok) {
        throw new Error("Failed to update channel settings")
      }

      toast.success("Channel settings updated!")
    } catch (error) {
      toast.error("Something went wrong")
      console.error("Error updating channel settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-8">
      <div className="space-y-4">
        {channels.map((channel) => (
          <div key={channel.id} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor={channel.id}>{channel.name}</Label>
              <p className="text-sm text-muted-foreground">
                {channel.description}
              </p>
            </div>
            <Switch
              id={channel.id}
              checked={channel.enabled}
              onCheckedChange={(checked) => {
                setChannels(channels.map((c) =>
                  c.id === channel.id ? { ...c, enabled: checked } : c
                ))
              }}
            />
          </div>
        ))}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
} 