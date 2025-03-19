'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ChannelType = 'WHATSAPP' | 'MESSENGER' | 'SMS' | 'WEBCHAT' | 'EMAIL'

interface Activity {
  id: string
  type: 'message' | 'status' | 'notification'
  channel: ChannelType
  content: string
  timestamp: string
  contact: {
    name: string
    image?: string
  }
}

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // TODO: Fetch real activities from API
    setActivities([
      {
        id: '1',
        type: 'message',
        channel: 'WHATSAPP',
        content: 'New message from John Doe',
        timestamp: '2 minutes ago',
        contact: {
          name: 'John Doe',
          image: 'https://github.com/shadcn.png',
        },
      },
      {
        id: '2',
        type: 'status',
        channel: 'MESSENGER',
        content: 'Campaign "Spring Sale" completed',
        timestamp: '1 hour ago',
        contact: {
          name: 'System',
        },
      },
      {
        id: '3',
        type: 'notification',
        channel: 'SMS',
        content: 'Bulk message delivery completed',
        timestamp: '2 hours ago',
        contact: {
          name: 'System',
        },
      },
    ])
  }, [])

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.contact.image} alt={activity.contact.name} />
                <AvatarFallback>
                  {activity.contact.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.content}</p>
                <p className="text-sm text-muted-foreground">
                  via {activity.channel} • {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 