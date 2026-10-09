'use client'

import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './modal.module.css'

const ModalContext = createContext<{ close: () => void } | null>(null)

/** null when rendered as a standalone page */
export const useModal = () => useContext(ModalContext)

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea'

export function Modal({ label, children }: { label: string; children: React.ReactNode }) {
  const router = useRouter()
  const root = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => router.back(), [router])

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

  return (
    <ModalContext.Provider value={{ close }}>
      <div ref={root} className={styles.mo} role="dialog" aria-modal="true" aria-label={label}>
        <div className={`${styles.bar} k`}>
          <span className={styles.lb}><b>{label}</b></span>
          <button ref={closeBtn} type="button" data-cursor="Close" className={styles.x} onClick={close} aria-label="Close">
            Close <i>Esc</i> ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </ModalContext.Provider>
  )
}
