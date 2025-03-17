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
    const { name, bio } = body

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name,
        bio,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('[PROFILE_UPDATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 