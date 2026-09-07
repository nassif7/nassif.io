'use client'

import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react'

export type MobileNavItem = { num: string; label: string; href: string }

const MobileNavContext = createContext<{
  items: MobileNavItem[] | null
  setItems: (items: MobileNavItem[] | null) => void
} | null>(null)

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MobileNavItem[] | null>(null)
  const value = useMemo(() => ({ items, setItems }), [items])
  return (
    <MobileNavContext.Provider value={value}>
      {children}
    </MobileNavContext.Provider>
  )
}

export function useMobileNavItems() {
  const ctx = useContext(MobileNavContext)
  return ctx?.items ?? null
}

/** Lets a page (e.g. a case study) override the mobile nav panel's section list while mounted. */
export function useSetMobileNav(items: MobileNavItem[]) {
  const ctx = useContext(MobileNavContext)
  const setCtxItems = ctx?.setItems
  const itemsRef = useRef(items)
  itemsRef.current = items

  useEffect(() => {
    if (!setCtxItems) return
    setCtxItems(itemsRef.current)
    return () => setCtxItems(null)
    // Depends only on the stable setter, not the whole context value (which
    // changes identity every time `items` updates) — otherwise this effect
    // re-fires on its own update, calling setItems again, forever.
  }, [setCtxItems])
}
