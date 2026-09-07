export const dynamic = 'force-dynamic'

import Link from 'next/link'
import clsx from 'clsx'
import { getAllProjects } from '@/lib/projects'
import { getSettings } from '@/lib/settings'
import { DarkCta } from '@/components/cta/DarkCta'
import { FilterTabs } from '@/components/ui/FilterTabs'
import styles from './projects.module.css'

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: activeCategory } = await searchParams
  const [projects, settings] = await Promise.all([getAllProjects(), getSettings()])

  const allCategories = [...new Set(projects.flatMap(p => p.categories ?? []))].sort()
  const visible = projects.filter(p => !p.brainstorm)
  const filtered = activeCategory
    ? visible.filter(p => p.categories?.includes(activeCategory))
    : visible

  return (
    <main>
      <div className={clsx('wrap', styles.hd)}>
        <Link href="/" className={styles.back}>← nassif.pro</Link>
        <h1 className="display">Work.</h1>
        <p className="lead">Selected projects — shipped, in progress, and still forming.</p>
      </div>

      {allCategories.length > 0 && (
        <div className="wrap">
          <FilterTabs
            allHref="/projects"
            allActive={!activeCategory}
            items={allCategories.map(cat => ({
              label: cat,
              href: `/projects?category=${encodeURIComponent(cat)}`,
              active: activeCategory === cat,
            }))}
          />
        </div>
      )}

      <div className={clsx('wrap', styles.tableWrap)}>
        <div className="idx-scroll">
          <table className="idx">
            <thead>
              <tr>
                <th className="ix-y">Year</th>
                <th>Project</th>
                <th className="idx-hide">Type</th>
                <th className="idx-hide">Stack</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.slug}>
                  <td className={clsx('ix-y', /^\d+$/.test(p.year) && 'tnum')}>{p.year || '—'}</td>
                  <td>
                    <Link href={`/projects/${p.slug}`}>
                      <div className="ix-n">{p.name}</div>
                      <div className="ix-d">{p.desc}</div>
                    </Link>
                  </td>
                  <td className="idx-hide"><span className="ix-t">{p.type}</span></td>
                  <td className="idx-hide ix-s">{p.stack.join(' · ') || '—'}</td>
                  <td>
                    {p.status ? (
                      <span className={clsx('pill', p.statusVariant !== 'default' && p.statusVariant)}>{p.status}</span>
                    ) : p.wip ? (
                      <span className="pill wip">In progress</span>
                    ) : '—'}
                  </td>
                  <td><span className="ix-arrow">↗</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DarkCta
        eyebrow="Get in touch"
        heading="You have an idea. Let's build it."
        lead="Available for contract and full-time work from Q4 2026 — Berlin, or remote across European hours."
        email={settings.email}
      />
    </main>
  )
}
