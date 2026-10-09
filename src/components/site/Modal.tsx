'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import styles from './modal.module.css'

type ModalApi = {
  close: () => void
  /** swap the content in place: fades the current content out, arms the loader, replaces the URL */
  navigate: (href: string) => void
  /** called by ReadyGate once fonts + cover are ready */
  setReady: (ready: boolean) => void
}

const ModalContext = createContext<ModalApi | null>(null)

/** null when rendered as a standalone page */
export const useModal = () => useContext(ModalContext)

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea'
const EASE = 'cubic-bezier(.2,.8,.2,1)'
const LOADER_DELAY = 180
const READY_CAP = 800

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Full-screen modal shell. Route modals mount it from an intercepting-route layout, so it stays mounted
 * while the item inside changes (the wipe plays once per open, never on prev/next).
 * Pass `onClose` for a modal that is not a route (e.g. Contact): it is called after the fade-out.
 */
export function ModalShell({ label, noun, onClose, children }: { label: string; noun: string; onClose?: () => void; children: React.ReactNode }) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const root = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const anim = useRef<Animation | null>(null)
  const closing = useRef(false)

  const [ready, setReady] = useState(false)
  const [loader, setLoader] = useState(false)
  const [dots, setDots] = useState(0)
  const [backdropOn, setBackdropOn] = useState(true)

  /* ---------- open: wipe up (first open only; this component stays mounted across items) ---------- */
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = prefersReduced()
    anim.current?.cancel()
    if (reduced) {
      el.style.opacity = '0'
      el.style.transform = 'none'
      anim.current = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out', fill: 'forwards' })
    } else {
      anim.current = el.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: 460, easing: EASE, fill: 'forwards' })
    }
    const a = anim.current
    a.finished
      .then(() => {
        el.style.transform = 'none'
        el.style.opacity = '1'
        a.cancel()
      })
      .catch(() => {})
    return () => a.cancel()
  }, [])

  useEffect(() => {
    const el = backdrop.current
    if (!el) return
    if (prefersReduced()) return setBackdropOn(false)
    const a = el.animate([{ opacity: 0 }, { opacity: 1, offset: 0.4 }, { opacity: 0 }], { duration: 520, easing: 'ease-in-out', fill: 'forwards' })
    a.finished.then(() => setBackdropOn(false)).catch(() => {})
    return () => a.cancel()
  }, [])

  /* ---------- close: fade + 10px, then let the route go ---------- */
  const close = useCallback(() => {
    const el = root.current
    if (!el || closing.current) return
    closing.current = true
    el.style.pointerEvents = 'none'
    anim.current?.cancel()
    const reduced = prefersReduced()
    const a = el.animate(
      reduced ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(10px)' }],
      { duration: reduced ? 120 : 200, easing: 'ease-in', fill: 'forwards' },
    )
    anim.current = a
    a.finished.then(() => (onClose ? onClose() : router.back())).catch(() => { closing.current = false })
  }, [router, onClose])

  /* ---------- swap in place (prev/next, more essays) ---------- */
  const navigate = useCallback(
    (href: string) => {
      setReady(false)
      startTransition(() => router.replace(href, { scroll: false }))
    },
    [router],
  )

  /* ---------- loader: only if loading outlasts 180ms ---------- */
  useEffect(() => {
    if (ready) {
      setLoader(false)
      return
    }
    const t = setTimeout(() => setLoader(true), LOADER_DELAY)
    return () => clearTimeout(t)
  }, [ready])

  useEffect(() => {
    if (!loader) return
    setDots(0)
    const id = setInterval(() => setDots(d => (d + 1) % 4), 280)
    return () => clearInterval(id)
  }, [loader])

  /* ---------- focus, scroll lock, Esc, focus trap ---------- */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    document.documentElement.setAttribute('data-modal-open', '')
    closeBtn.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !root.current) return
      const items = [...root.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(el => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.removeAttribute('data-modal-open')
      opener?.focus?.()
    }
  }, [close])

  const api: ModalApi = { close, navigate, setReady }

  return (
    <ModalContext.Provider value={api}>
      {backdropOn && <div ref={backdrop} className={styles.backdrop} aria-hidden="true" />}
      <div ref={root} className={styles.mo} role="dialog" aria-modal="true" aria-label={label}>
        <div className={clsx(styles.bar, 'k')}>
          <span className={styles.lb}><b>{label}</b></span>
          <button ref={closeBtn} type="button" data-cursor="Close" className={styles.x} onClick={close} aria-label="Close">
            Close <i>Esc</i> ×
          </button>
          <span className={clsx(styles.progress, loader && styles.on)} aria-hidden="true"><i data-allow-motion /></span>
        </div>
        <div className={styles.body}>
          <div className={clsx(styles.status, loader && styles.on, 'k')} role="status" aria-live="polite" aria-hidden={!loader}>
            Loading <b>{noun}</b><span className={styles.dots}>{'.'.repeat(dots)}</span>
          </div>
          <div className={styles.stage} data-ready={ready}>{children}</div>
        </div>
      </div>
    </ModalContext.Provider>
  )
}

const cap = (p: Promise<unknown>) => Promise.race([p.catch(() => {}), new Promise(r => setTimeout(r, READY_CAP))])

/**
 * Wraps the rendered detail. Mounting means the data has resolved; it then waits for fonts and the
 * cover image (each capped at 800ms) before telling the shell the content may fade in.
 */
export function ReadyGate({ children }: { children: React.ReactNode }) {
  const modal = useModal()
  const ref = useRef<HTMLDivElement>(null)
  const setReady = modal?.setReady

  useEffect(() => {
    if (!setReady) return
    let alive = true
    ;(async () => {
      await cap(document.fonts?.ready ?? Promise.resolve())
      const img = ref.current?.querySelector<HTMLImageElement>('img[data-cover]')
      if (img) await cap(img.decode())
      if (alive) setReady(true)
    })()
    return () => {
      alive = false
    }
  }, [setReady])

  return <div ref={ref} style={{ display: 'contents' }}>{children}</div>
}
