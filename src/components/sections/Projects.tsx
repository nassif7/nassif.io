import { getAllProjects } from '@/lib/projects'
import { ListItem } from '@/components/list/ListItem'
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
          <ListItem
            key={p.slug}
            type="project"
            href={`/projects/${p.slug}`}
            num={i + 1}
            title={p.name}
            excerpt={p.desc}
            category={p.type}
            stack={p.stack.join(' · ')}
            wip={p.wip}
          />
        ))}
      </div>
    </section>
  )
}
