import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return new NextResponse('No file provided', { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return new NextResponse('Invalid file type', { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new NextResponse('File too large', { status: 400 })
    }

    // TODO: Implement actual file upload to storage service (e.g., AWS S3, Cloudinary)
    // For now, we'll just return a mock URL
    const mockUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`

    // Update user's image in database
    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        image: mockUrl,
      },
    })

    return NextResponse.json({ url: user.image })
  } catch (error) {
    console.error('[UPLOAD]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 