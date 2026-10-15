export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Archivo, DM_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PostHogProvider } from '@/components/analytics/PostHogProvider'
import { LabelCursor } from '@/components/cursor/LabelCursor'
import { getProfile, getSite } from '@/data'
import { ContactProvider } from '@/components/contact/ContactProvider'
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

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  return {
    metadataBase: new URL('https://nassif.pro'),
    title: { default: site.seoTitle ?? site.title, template: `%s | ${site.title}` },
    description: site.description,
    openGraph: site.ogImage ? { images: [site.ogImage] } : undefined,
  }
}

export default async function SiteLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const profile = await getProfile()
  const contact = {
    email: profile.email,
    city: profile.city,
    engagement: profile.engagement,
    availability: profile.availability,
    socials: profile.socials,
  }

  return (
    <html lang="en" className={`${archivo.variable} ${dmMono.variable}`}>
      <body>
        <PostHogProvider>
          <PathTracker />
          <ContactProvider info={contact}>
            {children}
            {modal}
          </ContactProvider>
          <LabelCursor />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
