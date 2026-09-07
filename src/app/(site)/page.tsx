export const dynamic = 'force-dynamic'

import { Hero } from '@/components/hero/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { WorkIndex } from '@/components/sections/WorkIndex'
import { TrackRecord } from '@/components/sections/TrackRecord'
import { Writing } from '@/components/sections/Writing'
import { DarkCta } from '@/components/cta/DarkCta'
import { getHomepage } from '@/lib/homepage'
import { getSettings } from '@/lib/settings'

export default async function Home() {
  const [homepage, settings] = await Promise.all([getHomepage(), getSettings()])

  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <WorkIndex />
      <TrackRecord />
      <Writing />
      <DarkCta
        num="07"
        eyebrow={homepage.ctaEyebrow}
        heading={homepage.ctaHeading}
        lead={homepage.ctaLead}
        email={settings.email}
      />
    </main>
  )
}
