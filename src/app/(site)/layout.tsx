import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PostHogProvider } from '@/components/analytics/PostHogProvider'
import { UtilityBar } from '@/components/utilitybar/UtilityBar'
import { Masthead } from '@/components/masthead/Masthead'
import { Footer } from '@/components/sections/Footer'
import styles from './site.module.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nassif Nassif — Software Engineer, Berlin',
  description: 'Software engineer based in Berlin. Eight years building software across corporate platforms, startups, and independent projects.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <PostHogProvider>
          <div className={styles.wrapper}>
            <UtilityBar />
            <Masthead />
            {children}
            <Footer />
          </div>
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
