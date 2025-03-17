import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const {
      emailNotifications,
      marketingEmails,
      securityAlerts,
      twoFactorEnabled,
      language,
      timezone,
    } = body

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        emailNotifications,
        marketingEmails,
        securityAlerts,
        twoFactorEnabled,
        language,
        timezone,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('[SETTINGS_UPDATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 