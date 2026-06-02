export const dynamic = 'force-dynamic'

import { getAllProjects } from '@/lib/projects'
import { GetInTouch } from '@/components/sections/GetInTouch'
import { PageHeader } from '@/components/layout/PageHeader'
import { ListItem } from '@/components/list/ListItem'
import styles from './projects.module.css'

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: activeCategory } = await searchParams
  const projects = await getAllProjects()

  const allCategories = [...new Set(projects.flatMap(p => p.categories ?? []))].sort()

  const visible = projects.filter(p => !p.brainstorm)
  const filtered = activeCategory
    ? visible.filter(p => p.categories?.includes(activeCategory))
    : visible

  return (
    <>
    <main className={styles.page}>
      <PageHeader title="Work." sub="Selected projects — shipped, in progress, and still forming." />

      {allCategories.length > 0 && (
        <div className={styles.filters}>
          <a href="/projects" className={`${styles.filter} ${!activeCategory ? styles.filterActive : ''}`}>All</a>
          {allCategories.map(cat => (
            <a
              key={cat}
              href={`/projects?category=${encodeURIComponent(cat)}`}
              className={`${styles.filter} ${activeCategory === cat ? styles.filterActive : ''}`}
            >
              {cat}
            </a>
          ))}
        </div>
      )}

      <div className={styles.list}>
        {filtered.map((p, i) => (
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
    </main>
    <GetInTouch />
    </>
  )
}
