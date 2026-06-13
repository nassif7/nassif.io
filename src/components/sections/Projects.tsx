import { getFeaturedProjects } from '@/lib/projects'
import { ListItem } from '@/components/list/ListItem'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'
import styles from './Writing.module.css'

export async function Projects() {
  const projects = await getFeaturedProjects()

  return (
    <section id="work" className={shared.section}>
      <SectionHeader
        label="Featured work"
        linkHref="/projects"
        linkText="All projects →"
        title="Things I've shipped."
        intro="Side projects and work in progress. Small but deliberate."
      />

      <div className={styles.list}>
        {projects.map((p, i) => (
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
