import styles from './ProjectHeader.module.css'

interface ProjectHeaderProps {
  backHref: string
  backLabel: string
  eyebrowLabel: string
  title: string
  lead?: string | null
  client?: string | null
  year?: string | null
  role?: string | null
  platforms?: string | null
  status?: string | null
}

export function ProjectHeader({
  backHref, backLabel, eyebrowLabel, title, lead,
  client, year, role, platforms, status,
}: ProjectHeaderProps) {
  return (
    <section className={styles.hd}>
      <div className="wrap">
        <a href={backHref} className={styles.back}>← {backLabel}</a>
        <div className={styles.top}>
          <div className={styles.t}>
            <div className="eyebrow">{eyebrowLabel}</div>
            <h1 className={`display ${styles.title}`}>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
          </div>
          <dl className={styles.x}>
            {client && <div><dt className="meta-k">Client</dt><dd>{client}</dd></div>}
            {year && <div><dt className="meta-k">Year</dt><dd className="tnum">{year}</dd></div>}
            {role && <div><dt className="meta-k">Role</dt><dd>{role}</dd></div>}
            {platforms && <div><dt className="meta-k">Platforms</dt><dd>{platforms}</dd></div>}
            {status && <div><dt className="meta-k">Status</dt><dd>{status}</dd></div>}
          </dl>
        </div>
      </div>
    </section>
  )
}
