import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/channels - List all channels
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const channels = await prisma.channel.findMany({
      include: {
        _count: {
          select: {
            messages: true
          }
        }
      }
    })

    return NextResponse.json(channels)
  } catch (error) {
    console.error("[CHANNELS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// POST /api/channels - Create a new channel
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const { type, name, config } = json

    if (!type || !name) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const channel = await prisma.channel.create({
      data: {
        type,
        name,
        config: config || {},
        enabled: true,
        organization: {
          connect: {
            id: "default-org" // You'll need to replace this with the actual organization ID
          }
        }
      }
    })

    return NextResponse.json(channel)
  } catch (error) {
    console.error("[CHANNELS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// PATCH /api/channels - Update a channel
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const { id, name, config, enabled } = json

    if (!id) {
      return new NextResponse("Missing channel ID", { status: 400 })
    }

    const channel = await prisma.channel.update({
      where: { id },
      data: {
        name: name,
        config: config,
        enabled: enabled
      }
    })

    return NextResponse.json(channel)
  } catch (error) {
    console.error("[CHANNELS_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// DELETE /api/channels - Delete a channel
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const channelId = searchParams.get("id")

    if (!channelId) {
      return new NextResponse("Missing channel ID", { status: 400 })
    }

    await prisma.channel.delete({
      where: { id: channelId }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[CHANNELS_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 