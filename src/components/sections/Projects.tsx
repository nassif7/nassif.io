import { getAllProjects } from '@/lib/projects'
import shared from './section.module.css'
import styles from './Writing.module.css'

export async function Projects() {
  const projects = await getAllProjects()

  return (
    <section id="work" className={shared.section}>
      <div className={shared.sectionHeader}>
        <span className={shared.label}>Selected work</span>
        <a href="/projects" className={shared.seeAll}>All projects →</a>
      </div>

      <h2 className={shared.heading}>Things I've shipped.</h2>
      <p className={shared.intro}>Side projects and work in progress. Small but deliberate.</p>

      <div className={styles.list}>
        {projects.filter(p => !p.brainstorm).map((p, i) => (
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
              <div className={styles.rowMeta}>
                <span className={styles.tag}>{p.type}</span>
                {p.stack.length > 0 && (
                  <span className={styles.date}>{p.stack.join(' · ')}</span>
                )}
              </div>
            </div>
            <span className={styles.arrow}>{p.wip ? '…' : '↗'}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
