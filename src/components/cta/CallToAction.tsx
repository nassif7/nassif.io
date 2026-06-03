'use client'

import posthog from 'posthog-js'
import styles from './CallToAction.module.css'

interface CallToActionProps {
  label: string
  heading: string
  href: string
  buttonText: string
}

export function CallToAction({ label, heading, href, buttonText }: CallToActionProps) {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <span className={styles.label}>// {label}</span>
        <div className={styles.row}>
          <p className={styles.heading}>{heading}</p>
          <a
            href={href}
            className={styles.btn}
            onClick={() => posthog.capture('cta_clicked', { label, heading, href })}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  )
}
