export const dynamic = 'force-dynamic'

import { getAllProjects } from '@/lib/projects'
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
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>← nassif.pro</a>
        <h1 className={styles.title}>Work.</h1>
        <p className={styles.sub}>Selected projects — shipped, in progress, and still forming.</p>
      </header>

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
          <a
            key={p.slug}
            href={`/projects/${p.slug}`}
            className={styles.row}
          >
            <span className={styles.num}>0{i + 1}</span>
            <div className={styles.rowMain}>
              <span className={styles.rowTitle}>{p.name}</span>
              <span className={styles.excerpt}>{p.desc}</span>
              <div className={styles.rowMeta}>
                <span className={styles.tag}>{p.type}</span>
                {p.stack.length > 0 && (
                  <span className={styles.date}>{p.stack.join(' · ')}</span>
                )}
              </div>
            </div>
            <span className={styles.arrow}>↗</span>
          </a>
        ))}
      </div>
    </main>
  )
}
