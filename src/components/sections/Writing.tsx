import shared from './section.module.css'
import styles from './Writing.module.css'

export function Writing() {
  return (
    <section id="writing" className={shared.section}>
      <div className={shared.sectionHeader}>
        <span className={shared.label}>Writing</span>
        <a href="/blog" className={shared.seeAll}>All posts →</a>
      </div>
      <h2 className={shared.heading}>Things I think about.</h2>
      <p className={shared.intro}>Politics, philosophy, tech, and the occasional rant. Honest opinions, written slowly.</p>

      <div className={styles.empty}>
        <span className={styles.emptyLabel}>// nothing published yet</span>
        <p>Working on it. Writing takes longer than shipping.</p>
      </div>
    </section>
  )
}
