import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { channels } = body

    // Update user's channel preferences in the database
    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        channelPreferences: channels,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating channel settings:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 