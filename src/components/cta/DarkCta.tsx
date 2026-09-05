import styles from './DarkCta.module.css'

interface DarkCtaProps {
  num?: string
  eyebrow: string
  heading: string
  lead: string
}

export function DarkCta({ num, eyebrow, heading, lead }: DarkCtaProps) {
  return (
    <section className={`dark ${styles.band}`}>
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.l}>
          <div className="eyebrow">{num && <span className="n">{num}</span>}{eyebrow}</div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className="lead">{lead}</p>
        </div>
        <div className={styles.r}>
          <a href="mailto:hello@nassif.pro" className="btn btn-inv">Write me <span>→</span></a>
          <a href="/cv" className="btn btn-inv">Download CV <span>↓</span></a>
        </div>
      </div>
    </section>
  )
}
