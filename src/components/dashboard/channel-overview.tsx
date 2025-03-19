'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type ChannelType = 'WHATSAPP' | 'MESSENGER' | 'SMS' | 'WEBCHAT' | 'EMAIL'

interface Channel {
  id: string
  type: ChannelType
  name: string
  enabled: boolean
  status: 'online' | 'offline' | 'error'
}

interface ChannelOverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChannelOverview({ className, ...props }: ChannelOverviewProps) {
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    // TODO: Fetch real channels from API
    setChannels([
      {
        id: '1',
        type: 'WHATSAPP',
        name: 'WhatsApp Business',
        enabled: true,
        status: 'online'
      },
      {
        id: '2',
        type: 'MESSENGER',
        name: 'Facebook Messenger',
        enabled: true,
        status: 'online'
      },
      {
        id: '3',
        type: 'SMS',
        name: 'Twilio SMS',
        enabled: true,
        status: 'online'
      },
      {
        id: '4',
        type: 'EMAIL',
        name: 'Email Gateway',
        enabled: true,
        status: 'online'
      }
    ])
  }, [])

  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Channels</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Channel
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {channel.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {channel.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    channel.status === 'online'
                      ? 'default'
                      : channel.status === 'error'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {channel.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 