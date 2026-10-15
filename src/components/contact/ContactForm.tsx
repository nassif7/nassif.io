'use client'

import { useRef, useState } from 'react'
import clsx from 'clsx'
import posthog from 'posthog-js'
import styles from './contact.module.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [serverError, setServerError] = useState('')
  const [sentTo, setSentTo] = useState('')
  const openedAt = useRef(Date.now())

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const from = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()

    const next: Errors = {}
    if (!name) next.name = 'Please add your name'
    if (!EMAIL.test(from)) next.email = 'Please add a valid email'
    if (message.length < 10) next.message = 'A few more words, please'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = (['name', 'email', 'message'] as const).find(k => next[k])
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    // honeypot or inhumanly fast submit: pretend success so bots learn nothing
    if (form.get('website') || Date.now() - openedAt.current < 1500) {
      setSentTo(from)
      setStatus('sent')
      return
    }
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (!accessKey) {
      setServerError('The contact form is not set up yet')
      setStatus('error')
      return
    }

    setStatus('sending')
    setServerError('')
    try {
      // plain form post, like Web3Forms' own example (no cross-site preflight request)
      const payload = new FormData()
      payload.append('access_key', accessKey)
      payload.append('subject', `New message from ${name}`)
      payload.append('from_name', 'nassif.pro')
      payload.append('name', name)
      payload.append('email', from)
      payload.append('message', message)
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || body.success === false) throw new Error(body.message || 'Something went wrong')
      posthog.capture('contact_sent')
      setSentTo(from)
      setStatus('sent')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.done} role="status">
        <h2>Message sent.</h2>
        <p>Thank you. I’ll reply to {sentTo}, usually within a couple of days.</p>
        <button type="button" className="k" onClick={() => setStatus('idle')}>Send another →</button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="cf-name" className="k">Name <span>*</span></label>
        <input id="cf-name" name="name" autoComplete="name" maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
        {errors.name && <span id="cf-name-err" className={clsx(styles.err, 'k')}>{errors.name}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="cf-email" className="k">Email <span>*</span></label>
        <input id="cf-email" name="email" type="email" autoComplete="email" maxLength={200} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
        {errors.email && <span id="cf-email-err" className={clsx(styles.err, 'k')}>{errors.email}</span>}
      </div>
      <div className={styles.field}>
        <label htmlFor="cf-message" className="k">Message <span>*</span></label>
        <textarea id="cf-message" name="message" maxLength={5000} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
        {errors.message && <span id="cf-message-err" className={clsx(styles.err, 'k')}>{errors.message}</span>}
      </div>
      {/* honeypot: real visitors never see or fill this */}
      <div className={styles.trap} aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className={styles.row}>
        <button type="submit" className={styles.send} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span>
        </button>
        <span className={clsx(styles.hint, 'k')}>
          {status === 'error' ? (
            <span className={styles.err} role="alert">{serverError}. Or email <a className={styles.mailto} href={`mailto:${email}`}>{email}</a></span>
          ) : (
            <>Or write to <a className={styles.mailto} href={`mailto:${email}`}>{email}</a></>
          )}
        </span>
      </div>
    </form>
  )
}
