import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Writing } from '@/components/sections/Writing'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Writing />
      <Footer />
    </main>
  )
}
