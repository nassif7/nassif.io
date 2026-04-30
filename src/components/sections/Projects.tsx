import { getAllProjects } from '@/lib/projects'
import shared from './section.module.css'
import styles from './Writing.module.css'
import projectStyles from './Projects.module.css'

export function Projects() {
  const projects = getAllProjects()

  return (
    <section id="work" className={shared.section}>
      <div className={shared.sectionHeader}>
        <span className={shared.label}>Selected work</span>
        <a href="/projects" className={shared.seeAll}>All projects →</a>
      </div>

      <h2 className={shared.heading}>Things I've shipped.</h2>
      <p className={shared.intro}>Side projects and work in progress. Small but deliberate.</p>

      <div className={styles.list}>
        {projects.map((p, i) => (
          <a
            key={p.slug}
            href={`/projects/${p.slug}`}
            className={styles.row}
            style={{ opacity: p.brainstorm ? 0.5 : 1 }}
          >
            <span className={styles.num}>0{i + 1}</span>
            <div className={styles.rowMain}>
              <span className={styles.title}>{p.name}</span>
              <span className={styles.excerpt}>{p.desc}</span>
            </div>
            <div className={styles.rowMeta}>
              <span className={styles.tag}>{p.type}</span>
              {p.stack.length > 0 && (
                <span className={styles.date}>{p.stack.join(' · ')}</span>
              )}
            </div>
            <span className={styles.arrow}>{p.wip ? '…' : '↗'}</span>
          </a>
        ))}
        <a
          href="mailto:hallo@nassif.pro"
          className={`${styles.row} ${projectStyles.cta}`}
        >
          <span className={styles.num}>0{projects.length + 1}</span>
          <div className={styles.rowMain}>
            <span className={styles.title}>Your next project</span>
            <span className={styles.excerpt}>Got something in mind? Let's build it together.</span>
          </div>
          <div className={styles.rowMeta}>
            <span className={styles.tag}>Let's talk</span>
          </div>
          <span className={styles.arrow}>↗</span>
        </a>
      </div>
    </section>
  )
}
