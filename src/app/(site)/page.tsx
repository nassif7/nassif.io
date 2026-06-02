export const dynamic = 'force-dynamic'

import { Hero } from '@/components/hero/Hero'
import { GetInTouch } from '@/components/sections/GetInTouch'
import { Projects } from '@/components/sections/Projects'
import { Writing } from '@/components/sections/Writing'

export default function Home() {
  return (
    <main>
      <Hero />
      <GetInTouch />
      <Projects />
      <Writing />
    </main>
  )
}
