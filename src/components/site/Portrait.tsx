'use client'

import { useEffect, useRef } from 'react'

/** Engraved-line portrait: 1px vertical bars in the accent colour, height = darkness. */
export function Portrait({ width = 360, label = 'Portrait of Nassif Nassif' }: { width?: number; label?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const W = width
    const H = Math.round((width * 5) / 4)
    const spacing = 6
    const img = new Image()
    img.src = '/avatar.png'
    img.onload = () => {
      const src = document.createElement('canvas')
      src.width = W
      src.height = H
      const sx = src.getContext('2d')!
      sx.fillStyle = '#fff'
      sx.fillRect(0, 0, W, H)
      sx.drawImage(img, 50, 0, 400, 500, 0, 0, W, H)
      const d = sx.getImageData(0, 0, W, H).data

      cv.width = W
      cv.height = H
      const ctx = cv.getContext('2d')!
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--acc').trim() || '#2F6664'
      for (let y = spacing / 2; y < H; y += spacing) {
        const row = Math.floor(y)
        for (let x = 0; x < W; x++) {
          const i = (row * W + x) * 4
          let v = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255
          v = Math.min(1, Math.max(0, (v - 0.5) * 1.35 + 0.56))
          const t = (1 - v) * spacing * 0.92
          if (t > 0.25) ctx.fillRect(x, y - t / 2, 1, t)
        }
      }
    }
  }, [width])

  return <canvas ref={ref} role="img" aria-label={label} style={{ width: '100%', height: '100%', display: 'block' }} />
}
