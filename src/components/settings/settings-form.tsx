import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User } from 'next-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

const settingsSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  securityAlerts: z.boolean(),
  twoFactorEnabled: z.boolean(),
  language: z.string(),
  timezone: z.string(),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

interface SettingsFormProps {
  user: User
}

export function SettingsForm({ user }: SettingsFormProps) {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false,
      securityAlerts: true,
      twoFactorEnabled: false,
      language: 'en',
      timezone: 'UTC',
    },
  })

  async function onSubmit(data: SettingsFormValues) {
    try {
      const response = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update settings')
      }

      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about your account activity.
              </p>
            </div>
            <Switch
              checked={form.watch('emailNotifications')}
              onCheckedChange={(checked) =>
                form.setValue('emailNotifications', checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features and updates.
              </p>
            </div>
            <Switch
              checked={form.watch('marketingEmails')}
              onCheckedChange={(checked) =>
                form.setValue('marketingEmails', checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about suspicious activity.
              </p>
            </div>
            <Switch
              checked={form.watch('securityAlerts')}
              onCheckedChange={(checked) =>
                form.setValue('securityAlerts', checked)
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account.
              </p>
            </div>
            <Switch
              checked={form.watch('twoFactorEnabled')}
              onCheckedChange={(checked) =>
                form.setValue('twoFactorEnabled', checked)
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Preferences</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              {...form.register('language')}
              placeholder="Select your language"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              {...form.register('timezone')}
              placeholder="Select your timezone"
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  )
} 