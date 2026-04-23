import { Hero } from '@/components/hero/Hero'
import { Projects } from '@/components/sections/Projects'
import { Writing } from '@/components/sections/Writing'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Writing />
      <Footer />
    </main>
  )
}
