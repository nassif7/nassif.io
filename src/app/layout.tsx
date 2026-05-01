import type { Metadata } from 'next'
import '@/styles/globals.css'
import { TopBar } from '@/components/topbar/TopBar'
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Nassif Nassif — Frontend Engineer',
  description: 'Frontend engineer based in Berlin. I build interfaces that feel good to use.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
