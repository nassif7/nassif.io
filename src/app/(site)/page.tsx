export const dynamic = 'force-dynamic'

import { Hero } from '@/components/hero/Hero'
import { CallToAction } from '@/components/cta/CallToAction'
import { Projects } from '@/components/sections/Projects'
import { Writing } from '@/components/sections/Writing'
import styles from './home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <CallToAction
        label="you have an idea"
        heading="Let's get in touch."
        href="mailto:n_nassif@icloud.com"
        buttonText="Write me →"
      />
      <Projects />
      <Writing />
    </main>
  )
}
