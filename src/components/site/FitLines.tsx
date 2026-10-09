'use client'

import { useLayoutEffect, useRef } from 'react'

/**
 * Container for a card's summary + hover layer. Clamps the summary ([data-fit="a"]) to the number of
 * lines that still leave room for the hover layer ([data-fit="b"]), so the hover facts are always visible
 * and nothing ever changes the card's height.
 */
export function FitLines({ className, max = 4, reserveLines, children }: { className?: string; max?: number; reserveLines?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const box = ref.current
    if (!box) return
    const a = box.querySelector<HTMLElement>('[data-fit="a"]')
    const b = box.querySelector<HTMLElement>('[data-fit="b"]')
    if (!a) return

    // the page scrolls on tablets/phones, so there is no fixed card height to fit into
    const free = window.matchMedia('(max-width: 860px), (max-height: 480px)')
    const fit = () => {
      if (free.matches) {
        a.style.removeProperty('-webkit-line-clamp')
        return
      }
      const gap = parseFloat(getComputedStyle(box).rowGap) || 0
      const lh = parseFloat(getComputedStyle(a).lineHeight) || parseFloat(getComputedStyle(a).fontSize) * 1.3
      let reserve = 0
      if (b && getComputedStyle(b).display !== 'none') {
        let natural = b.scrollHeight
        if (reserveLines && b.firstElementChild) {
          // text-like hover layer: reserve only a few lines of it, the rest is clipped
          const cs = getComputedStyle(b.firstElementChild)
          const blh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.3
          natural = Math.min(natural, reserveLines * blh + parseFloat(getComputedStyle(b).paddingTop))
        }
        reserve = natural + gap
      }
      const lines = Math.max(1, Math.min(max, Math.floor((box.clientHeight - reserve) / lh)))
      a.style.setProperty('-webkit-line-clamp', String(lines))
      // text-like hover layer: show only as many whole lines as the leftover height allows
      const text = reserveLines && b ? (b.firstElementChild as HTMLElement | null) : null
      if (b && text) {
        const cs = getComputedStyle(text)
        const blh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.3
        const left = box.clientHeight - a.offsetHeight - gap - parseFloat(getComputedStyle(b).paddingTop)
        text.style.setProperty('-webkit-line-clamp', String(Math.max(1, Math.min(10, Math.floor(left / blh)))))
      }
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    free.addEventListener('change', fit)
    return () => {
      ro.disconnect()
      free.removeEventListener('change', fit)
    }
  }, [max, reserveLines])

  return <div ref={ref} className={className}>{children}</div>
}
