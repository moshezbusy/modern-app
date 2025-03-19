"use client"

import { EditChannelDialog } from "./edit-channel-dialog"

interface AddChannelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function AddChannelDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddChannelDialogProps) {
  return (
    <EditChannelDialog
      channel={null}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
    />
  )
} 