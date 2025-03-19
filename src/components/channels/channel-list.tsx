"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Edit2, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditChannelDialog } from "./edit-channel-dialog"
import { Skeleton } from "@/components/ui/skeleton"

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

interface ChannelListProps {
  channels: Channel[]
  isLoading: boolean
  onUpdateChannel: (channel: Partial<Channel>) => void
  onDeleteChannel: (channelId: string) => void
}

export function ChannelList({
  channels,
  isLoading,
  onUpdateChannel,
  onDeleteChannel,
}: ChannelListProps) {
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null)
  const [deletingChannelId, setDeletingChannelId] = useState<string | null>(null)

  const handleToggleEnabled = (channel: Channel) => {
    onUpdateChannel({
      id: channel.id,
      enabled: !channel.enabled,
    })
  }

  const handleConfirmDelete = () => {
    if (deletingChannelId) {
      onDeleteChannel(deletingChannelId)
      setDeletingChannelId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contacts</TableHead>
            <TableHead>Messages</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channels.map((channel) => (
            <TableRow key={channel.id}>
              <TableCell className="font-medium">{channel.name}</TableCell>
              <TableCell className="capitalize">{channel.type}</TableCell>
              <TableCell>
                <Switch
                  checked={channel.enabled}
                  onCheckedChange={() => handleToggleEnabled(channel)}
                />
              </TableCell>
              <TableCell>{channel._count.contacts}</TableCell>
              <TableCell>{channel._count.messages}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingChannel(channel)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeletingChannelId(channel.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditChannelDialog
        channel={editingChannel}
        open={!!editingChannel}
        onOpenChange={(open) => !open && setEditingChannel(null)}
        onSubmit={(data) => {
          onUpdateChannel({ id: editingChannel?.id, ...data })
          setEditingChannel(null)
        }}
      />

      <AlertDialog
        open={!!deletingChannelId}
        onOpenChange={(open) => !open && setDeletingChannelId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              channel and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 