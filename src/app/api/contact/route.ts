import { NextResponse } from 'next/server'
import { getPostHogClient } from '@/lib/posthog-server'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Light in-memory throttle: 3 messages per 10 minutes per IP (per server instance).
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 3
}

export async function POST(req: Request) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // honeypot or inhumanly fast submit: pretend success so bots learn nothing
  if (body.website || (typeof body.elapsed === 'number' && body.elapsed < 1500)) {
    return NextResponse.json({ ok: true })
  }

  const name = String(body.name ?? '').trim().slice(0, 120)
  const email = String(body.email ?? '').trim().slice(0, 200)
  const message = String(body.message ?? '').trim().slice(0, 5000)
  if (!name || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json({ error: 'Please fill in every field' }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (limited(ip)) return NextResponse.json({ error: 'Too many messages, try again later' }, { status: 429 })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.error('Contact form: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL not configured. Message from', email)
    return NextResponse.json({ error: 'The contact form is not set up yet' }, { status: 503 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `nassif.pro <${from}>`,
      to: [to],
      reply_to: `${name} <${email}>`,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  })
  if (!res.ok) {
    console.error('Contact form: Resend error', res.status, await res.text().catch(() => ''))
    return NextResponse.json({ error: 'Could not send the message' }, { status: 502 })
  }

  const posthog = getPostHogClient()
  posthog.capture({ distinctId: 'anonymous', event: 'contact_received' })
  await posthog.shutdown()

  return NextResponse.json({ ok: true })
}
