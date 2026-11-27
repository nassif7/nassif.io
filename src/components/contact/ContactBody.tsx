import clsx from 'clsx'
import { ContactForm } from './ContactForm'
import styles from './contact.module.css'

export type ContactInfo = {
  email: string
  city: string
  engagement: string
  availability: { open: boolean; label: string }
  socials: { label: string; href: string }[]
}

/** Contact modal content in the site's editorial layout. */
export function ContactBody({ info }: { info: ContactInfo }) {
  return (
    <main className={styles.page} aria-label="Contact">
      <header className={styles.title}>
        <h1 className={styles.h1}>Contact</h1>
      </header>

      <div className={styles.links}>
        <a href={`mailto:${info.email}`}>{info.email}</a>
        {info.socials.map(s => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
        ))}
      </div>

      <dl className={clsx(styles.facts, 'k')}>
        <div>
          <dt>Based in</dt>
          <dd>{info.city}, Germany</dd>
        </div>
        <div>
          <dt>Engagement</dt>
          <dd>{info.engagement}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd><span className={info.availability.open ? styles.live : undefined}>{info.availability.open ? 'Available' : 'Not taking new work'}</span></dd>
        </div>
      </dl>

      <section className={styles.layout} aria-label="Send a message">
        <div className={styles.intro}>
          <p className={styles.lede}>Have a product to build, or a question? Tell me a little about it.</p>
          <div className={styles.copy}>
            <p>Replies within a few days.</p>
            <p>Or write directly to <a href={`mailto:${info.email}`}>{info.email}</a>.</p>
          </div>
        </div>
        <div className={styles.formPanel}>
          <ContactForm email={info.email} />
        </div>
      </section>
    </main>
  )
}
