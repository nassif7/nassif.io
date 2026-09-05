import styles from './section.module.css'

interface SectionHeaderProps {
  num: string
  eyebrow: string
  title: string
  lead?: string
  meta?: string
  metaHref?: string
}

export function SectionHeader({ num, eyebrow, title, lead, meta, metaHref }: SectionHeaderProps) {
  return (
    <div className={styles.sechead}>
      <div className={styles.l}>
        <div className="eyebrow"><span className="n">{num}</span>{eyebrow}</div>
      </div>
      <div className={styles.r}>
        <h2 className="sec">{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {meta && (
        <div className={styles.x}>
          {metaHref ? <a href={metaHref} className="meta">{meta}</a> : <span className="meta">{meta}</span>}
        </div>
      )}
    </div>
  )
}
