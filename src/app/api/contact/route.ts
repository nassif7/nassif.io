import { NextResponse } from 'next/server'
import { getPostHogClient } from '@/lib/posthog-server'

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // TODO: replace with real email sending (e.g. Resend, Nodemailer, SendGrid)
  // For now just log and return success
  console.log('Contact form submission:', { name, email, message })

  const posthog = getPostHogClient()
  posthog.capture({
    distinctId: 'anonymous',
    event: 'contact_received',
  })
  await posthog.shutdown()

  return NextResponse.json({ ok: true })
}
