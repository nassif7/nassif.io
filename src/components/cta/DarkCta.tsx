import styles from './DarkCta.module.css'

interface DarkCtaProps {
  num?: string
  eyebrow: string
  heading: string
  lead: string
  email: string
  writeLabel?: string
  mailtoSubject?: string
}

export function DarkCta({ num, eyebrow, heading, lead, email, writeLabel = 'Write me', mailtoSubject }: DarkCtaProps) {
  const mailtoHref = mailtoSubject
    ? `mailto:${email}?subject=${encodeURIComponent(mailtoSubject)}`
    : `mailto:${email}`

  return (
    <section className={`dark ${styles.band}`}>
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.l}>
          <div className="eyebrow">{num && <span className="n">{num}</span>}{eyebrow}</div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className="lead">{lead}</p>
        </div>
        <div className={styles.r}>
          <a href={mailtoHref} className="btn btn-inv">{writeLabel} <span>→</span></a>
          <a href="/nassif-nassif-cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-inv">Download CV <span>↓</span></a>
        </div>
      </div>
    </section>
  )
}
