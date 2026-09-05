export const dynamic = 'force-dynamic'

import { Hero } from '@/components/hero/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { WorkIndex } from '@/components/sections/WorkIndex'
import { TrackRecord } from '@/components/sections/TrackRecord'
import { Writing } from '@/components/sections/Writing'
import { DarkCta } from '@/components/cta/DarkCta'

export default function Home() {
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
        eyebrow="Next step"
        heading="You have an idea. I've shipped eight years of them."
        lead="Available for contract and full-time work from Q4 2026 — Berlin, or remote across European hours."
      />
    </main>
  )
}
