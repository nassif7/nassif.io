import { CallToAction } from '@/components/cta/CallToAction'
import styles from './GetInTouch.module.css'

export function GetInTouch({ className }: { className?: string }) {
  return (
    <section className={`${styles.section}${className ? ` ${className}` : ''}`}>
      <CallToAction
        label="you have an idea"
        heading="Let's get in touch."
        href="mailto:n_nassif@icloud.com"
        buttonText="Write me →"
      />
    </section>
  )
}
