'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from './LabelCursor.module.css'

const TARGETS = 'a[href], button, [role=button], [data-cursor], summary, label[for]'
const EDITABLE = 'input, textarea, [contenteditable]'

function labelFor(el: Element): string {
  const custom = el.closest('[data-cursor]')?.getAttribute('data-cursor')
  if (custom) return custom

  const pressed = el.closest('button[aria-pressed]')
  if (pressed) return pressed.getAttribute('aria-pressed') === 'true' ? 'Active' : 'Filter'

  const link = el.matches('a[href]') ? el : el.querySelector('a[href]')
  const href = link?.getAttribute('href')
  if (href) {
    if (href.startsWith('#')) return 'Jump'
    if (href.startsWith('mailto:')) return 'Write'
    if (/^\/projects\/[^/]+\/?$/.test(href)) return 'Open'
    if (/^\/writing\/[^/]+\/?$/.test(href)) return 'Read'
    if (href === '/cv' || /\.pdf($|\?)/i.test(href)) return 'CV ↓'
    try {
      if (new URL(href, location.href).origin !== location.origin) return 'Visit ↗'
    } catch {}
    return 'Go'
  }
  return 'Click'
}

export function LabelCursor() {
  const [enabled, setEnabled] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover:hover) and (pointer:fine)')
    setEnabled(mq.matches)
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = root.current
    const text = label.current
    if (!el || !text) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduced ? 1 : 0.35
    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let started = false
    let current: Element | null = null
    let raf = 0

    document.documentElement.classList.add('cursor-on')

    const show = () => el.classList.add(styles.visible)
    const hide = () => el.classList.remove(styles.visible)

    const tick = () => {
      pos.x += (target.x - pos.x) * ease
      pos.y += (target.y - pos.y) * ease
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!started) {
        pos.x = target.x
        pos.y = target.y
        started = true
      }
      show()

      const t = e.target as Element | null
      if (t?.closest?.('iframe')) return hide()
      const hit = t?.closest?.(TARGETS) ?? null
      if (hit === current) return
      current = hit
      if (hit && !hit.matches(EDITABLE)) {
        text.textContent = labelFor(hit)
        el.classList.add(styles.active)
      } else {
        el.classList.remove(styles.active)
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', hide)
    window.addEventListener('blur', hide)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', hide)
      window.removeEventListener('blur', hide)
      document.documentElement.classList.remove('cursor-on')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={root} className={styles.cursor} aria-hidden="true">
      <span className={styles.dot} />
      <span ref={label} className={clsx(styles.label, 'k')} />
    </div>
  )
}
