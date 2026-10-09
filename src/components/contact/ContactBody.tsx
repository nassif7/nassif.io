import clsx from 'clsx'
import detail from '@/components/detail/detail.module.css'
import { ContactForm } from './ContactForm'
import styles from './contact.module.css'

export type ContactInfo = {
  email: string
  city: string
  engagement: string
  availability: { open: boolean; label: string }
  socials: { label: string; href: string }[]
}

const rd = (ms: number) => ({ '--rd': `${ms}ms` }) as React.CSSProperties

/** Contact modal content (same sheet as the project detail, embedded). */
export function ContactBody({ info }: { info: ContactInfo }) {
  return (
    <div className={clsx(detail.sheet, detail.project, detail.embed)}>
      <div className={detail.title}>
        <h1 className={detail.h1Project} data-reveal="" style={rd(120)}>Contact<span>Say hello</span></h1>
        <div className={clsx(detail.tmeta, 'k')} data-reveal="" style={rd(180)}>
          <span><b>{info.availability.open ? info.availability.label : 'Not taking new work'}</b></span>
          <span>Replies within a few days</span>
        </div>
      </div>

      <aside className={detail.side} data-reveal="body">
        <dl className={clsx(detail.facts, 'k')}>
          <dt>Email</dt><dd><a href={`mailto:${info.email}`}>{info.email}</a></dd>
          <dt>Based in</dt><dd>{info.city}, Germany</dd>
          <dt>Engagement</dt><dd>{info.engagement}</dd>
          <dt>Status</dt><dd><span className={info.availability.open ? detail.live : undefined}>{info.availability.label}</span></dd>
        </dl>
        <div className={clsx(detail.ext, 'k')}>
          {info.socials.map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} <span className={detail.go}>↗</span></a>
          ))}
        </div>
      </aside>

      <main className={detail.content} data-reveal="body" aria-label="Contact form">
        <p className={styles.lede}>Have a product to build, or a question? Tell me a little about it.</p>
        <ContactForm email={info.email} />
      </main>
    </div>
  )
}
