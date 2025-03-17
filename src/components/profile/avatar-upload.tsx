import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface AvatarUploadProps {
  currentImage?: string | null
  onImageChange: (url: string) => void
}

export function AvatarUpload({ currentImage, onImageChange }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Create form data
      const formData = new FormData()
      formData.append('file', file)

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      onImageChange(data.url)
      toast.success('Avatar updated successfully')
    } catch (error) {
      toast.error('Failed to upload avatar')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-full">
        {currentImage ? (
          <Image
            src={currentImage}
            alt="Profile"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-2xl">👤</span>
          </div>
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="avatar-upload"
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('avatar-upload')?.click()}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Change avatar'}
        </Button>
      </div>
    </div>
  )
} 