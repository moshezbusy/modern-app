'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { SettingsForm } from '@/components/settings-form'
import { ChannelsForm } from '@/components/settings/channels-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  const { data: session } = useSession()
  
  if (!session?.user) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="mx-auto max-w-2xl px-8">
          <h1 className="text-3xl font-bold">Please sign in to access settings</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and set channel preferences.</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <SettingsForm 
            name={session.user.name || ''} 
            email={session.user.email || ''} 
            image={session.user.image || ''} 
          />
        </TabsContent>
        <TabsContent value="channels">
          <ChannelsForm />
        </TabsContent>
      </Tabs>
    </div>
  )
} 