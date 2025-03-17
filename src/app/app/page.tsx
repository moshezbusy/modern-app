'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'

export default function AppPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {/* Example messages */}
          <div className="flex items-start space-x-2">
            <div className="rounded-lg bg-secondary p-3">
              <p className="text-sm">Hello! How can I help you today?</p>
            </div>
          </div>
          <div className="flex items-start justify-end space-x-2">
            <div className="rounded-lg bg-primary p-3 text-primary-foreground">
              <p className="text-sm">Hi! I have a question about the app.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className="border-t p-4">
        <form className="flex space-x-2">
          <Input
            className="flex-1"
            placeholder="Type your message..."
            type="text"
          />
          <Button type="submit">
            <Icons.message className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
} 