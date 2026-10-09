import type { Metadata } from 'next'
import { Archivo, DM_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PostHogProvider } from '@/components/analytics/PostHogProvider'
import { LabelCursor } from '@/components/cursor/LabelCursor'
import { PathTracker } from '@/components/site/PathTracker'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nassif.pro'),
  title: { default: 'Nassif Nassif — Product Engineer, Berlin', template: '%s — Nassif Nassif' },
  description: 'Product engineer in Berlin. Eight years between design and engineering — from the first sketch to the store listing.',
}

export default function SiteLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmMono.variable}`}>
      <body>
        <PostHogProvider>
          <PathTracker />
          {children}
          {modal}
          <LabelCursor />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
