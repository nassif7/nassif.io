'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { ModalShell, ReadyGate } from '@/components/site/Modal'
import { ContactBody, type ContactInfo } from './ContactBody'

const ContactContext = createContext<{ open: () => void } | null>(null)

/** Holds the open/closed state of the contact modal. It is not a route: no URL, no page. */
export function ContactProvider({ info, children }: { info: ContactInfo; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const show = useCallback(() => setOpen(true), [])

  return (
    <ContactContext.Provider value={{ open: show }}>
      {children}
      {open && (
        <ModalShell label="Contact" noun="form" onClose={close}>
          <ReadyGate>
            <ContactBody info={info} />
          </ReadyGate>
        </ModalShell>
      )}
    </ContactContext.Provider>
  )
}

/** The "Contact" item in the nav. */
export function ContactTrigger({ children }: { children: React.ReactNode }) {
  const ctx = useContext(ContactContext)
  return (
    <button type="button" aria-haspopup="dialog" data-cursor="Write" onClick={() => ctx?.open()}>
      {children}
    </button>
  )
}
