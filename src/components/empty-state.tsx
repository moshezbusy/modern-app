"use client"

import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface ShortcutProps {
  label: string
  keys: string[]
  icon: LucideIcon
}

interface EmptyStateProps {
  title: string
  description: string
  shortcuts?: ShortcutProps[]
  icon?: ReactNode
}

export function EmptyState({ title, description, shortcuts, icon }: EmptyStateProps) {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center space-y-4">
      <div className="h-32 w-32 flex items-center justify-center">
        {icon || (
          <div className="h-full w-full rounded-full bg-accent opacity-20" />
        )}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {shortcuts && (
        <div className="mt-6 flex flex-col items-center space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <shortcut.icon className="h-4 w-4" />
              <span>{shortcut.label}</span>
              <div className="flex items-center space-x-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="rounded border bg-muted px-2 py-0.5 text-xs"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 