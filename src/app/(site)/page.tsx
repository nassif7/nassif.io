export const dynamic = 'force-dynamic'

import { Hero } from '@/components/hero/Hero'
import { GetInTouch } from '@/components/sections/GetInTouch'
import { Projects } from '@/components/sections/Projects'
import { Writing } from '@/components/sections/Writing'
import styles from './home.module.css'

export default function Home() {
  return (
    <main>
      <Hero />
      <GetInTouch className={styles.cta} />
      <Projects />
      <Writing />
    </main>
  )
}
