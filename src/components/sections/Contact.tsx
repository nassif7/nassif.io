'use client'

import { useState } from 'react'
import shared from './section.module.css'
import styles from './Contact.module.css'

const LINKS = [
  { name: 'Email',    handle: 'n_nassif@icloud.com', href: 'mailto:n_nassif@icloud.com' },
  { name: 'GitHub',   handle: '@nassif',              href: 'https://github.com/nassif' },
  { name: 'LinkedIn', handle: 'Nassif Nassif',        href: 'https://linkedin.com/in/nassif' },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.left}>
        <div className={shared.sectionHeader}>
          <span className={shared.label}>Contact</span>
        </div>
        <h2 className={shared.heading}>Let&apos;s make<br />something.</h2>
        <p className={styles.sub}>Open for collaborations, contracts, and good conversations.</p>
        <div className={styles.links}>
          {LINKS.map(l => (
            <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
              <span className={styles.linkName}>{l.name}</span>
              <span className={styles.linkHandle}>{l.handle}</span>
              <span className={styles.linkArrow}>↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={shared.sectionHeader}>
          <span className={shared.label}>Or just write</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required placeholder="What's on your mind..." rows={4} className={styles.textarea} />
          </div>
          <button type="submit" className={styles.btn} disabled={status === 'sending' || status === 'sent'}>
            {status === 'idle'    && 'Send it →'}
            {status === 'sending' && 'Sending…'}
            {status === 'sent'    && '✓ Sent!'}
            {status === 'error'   && 'Try again'}
          </button>
        </form>
      </div>
    </section>
  )
}
