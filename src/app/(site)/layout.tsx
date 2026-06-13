import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PostHogProvider } from '@/components/analytics/PostHogProvider'
import { TopBar } from '@/components/topbar/TopBar'
import { Masthead } from '@/components/masthead/Masthead'
import { Footer } from '@/components/sections/Footer'
import styles from './site.module.css'

export const metadata: Metadata = {
  title: 'Nassif Nassif — Frontend Engineer',
  description: 'Frontend engineer based in Berlin. I build interfaces that feel good to use.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          <div className={styles.wrapper}>
            <TopBar />
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
