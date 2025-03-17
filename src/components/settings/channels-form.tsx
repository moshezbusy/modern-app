'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/icons'

interface ChannelButtonProps {
  name: string
  icon: keyof typeof Icons
  connected?: boolean
  onClick: () => void
}

function ChannelButton({ name, icon, connected, onClick }: ChannelButtonProps) {
  const Icon = Icons[icon]
  return (
    <Card className="p-4">
      <Button
        variant={connected ? "secondary" : "outline"}
        className="w-full h-24 flex flex-col items-center justify-center gap-2"
        onClick={onClick}
      >
        <Icon className="h-8 w-8" />
        <span>{name}</span>
        <span className="text-xs text-muted-foreground">
          {connected ? "Connected" : "Connect"}
        </span>
      </Button>
    </Card>
  )
}

export function ChannelsForm() {
  const handleConnect = (channel: string) => {
    // TODO: Implement channel connection logic
    console.log(`Connecting to ${channel}...`)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChannelButton
          name="WhatsApp"
          icon="message"
          onClick={() => handleConnect('whatsapp')}
        />
        <ChannelButton
          name="Messenger"
          icon="mail"
          onClick={() => handleConnect('messenger')}
        />
        <ChannelButton
          name="SMS"
          icon="message"
          onClick={() => handleConnect('sms')}
        />
        <ChannelButton
          name="Telegram"
          icon="message"
          onClick={() => handleConnect('telegram')}
        />
        <ChannelButton
          name="Slack"
          icon="message"
          onClick={() => handleConnect('slack')}
        />
        <ChannelButton
          name="Discord"
          icon="message"
          onClick={() => handleConnect('discord')}
        />
      </div>
    </div>
  )
} 