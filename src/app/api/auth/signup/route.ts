import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/email'
import crypto from 'crypto'

const signUpSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(request: Request) {
  try {
    console.log('Received signup request')
    const json = await request.json()
    console.log('Request body:', { ...json, password: '[REDACTED]' })
    
    const body = signUpSchema.parse(json)

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      console.log('User already exists:', body.email)
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(body.password, 10)
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    console.log('Creating user with data:', {
      name: body.name,
      email: body.email,
      verificationToken,
      verificationTokenExpiry: tokenExpiry,
    })

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword,
        verificationToken,
        verificationTokenExpiry: tokenExpiry,
        emailVerified: null,
        emailNotifications: true,
        marketingEmails: false,
        securityAlerts: true,
        twoFactorEnabled: false,
        language: 'en',
        timezone: 'UTC',
      } as any, // Temporary type assertion to fix build
    })
    console.log('User created:', { id: user.id, email: user.email })

    // Send verification email
    console.log('Attempting to send verification email...')
    try {
      console.log('Email service configuration:', {
        apiKeyPresent: !!process.env.RESEND_API_KEY,
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
      })
      
      await sendVerificationEmail(body.email, verificationToken)
      console.log('Verification email sent successfully')
    } catch (error) {
      console.error('Failed to send verification email:', error)
      // Delete the user if email sending fails
      console.log('Deleting user due to email failure...')
      await prisma.user.delete({
        where: { id: user.id },
      })
      console.log('User deleted')
      throw new Error('Failed to send verification email: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }

    return NextResponse.json(
      {
        message: 'User created successfully. Please check your email for verification.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in signup route:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input: ' + error.errors.map(e => e.message).join(', ') },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 