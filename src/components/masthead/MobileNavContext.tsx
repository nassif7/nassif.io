'use client'

import { createContext, useContext, useState, useEffect, useRef } from 'react'

export type MobileNavItem = { num: string; label: string; href: string }

const MobileNavContext = createContext<{
  items: MobileNavItem[] | null
  setItems: (items: MobileNavItem[] | null) => void
} | null>(null)

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MobileNavItem[] | null>(null)
  return (
    <MobileNavContext.Provider value={{ items, setItems }}>
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
  const itemsRef = useRef(items)
  itemsRef.current = items

  useEffect(() => {
    if (!ctx) return
    ctx.setItems(itemsRef.current)
    return () => ctx.setItems(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx])
}
