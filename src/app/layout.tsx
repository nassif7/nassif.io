import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PostHogProvider } from '@/components/analytics/PostHogProvider'

export const metadata: Metadata = {
  title: 'Nassif Nassif — Frontend Engineer',
  description: 'Frontend engineer based in Berlin. I build interfaces that feel good to use.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
