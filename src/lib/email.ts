import { Resend } from 'resend'

export async function sendVerificationEmail(email: string, token: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL

  if (!RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable")
    return { success: false, error: "Missing RESEND_API_KEY" }
  }

  if (!APP_URL) {
    console.error("Missing NEXT_PUBLIC_APP_URL environment variable")
    return { success: false, error: "Missing NEXT_PUBLIC_APP_URL" }
  }

  console.log('Sending verification email to:', email)
  console.log('Using API key:', RESEND_API_KEY.slice(0, 8) + '...')
  
  const confirmLink = `${APP_URL}/auth/verify?token=${token}`
  console.log('Verification link:', confirmLink)

  try {
    const resend = new Resend(RESEND_API_KEY)
    const data = await resend.emails.send({
      from: 'Modern App <onboarding@resend.dev>',
      to: email,
      subject: 'Verify your email',
      html: `
        <h1>Welcome to Modern App!</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${confirmLink}">${confirmLink}</a>
      `,
    })
    
    if (!data) {
      throw new Error('No response from Resend API')
    }
    
    console.log('Email sent successfully:', data)
    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
} 