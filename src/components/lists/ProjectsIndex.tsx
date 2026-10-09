'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import type { Project } from '@/data/types'
import { pad } from '@/data/format'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Chips } from './Chips'
import { useUrlFilter } from './useUrlFilter'
import styles from './list.module.css'

export function ProjectsIndex({
  projects,
  chips,
  initialType,
}: {
  projects: Project[]
  chips: { value: string; count: number }[]
  initialType: string | null
}) {
  const [type, setType] = useUrlFilter('type', chips.some(c => c.value === initialType) ? initialType : null)
  const [selSlug, setSel] = useState(projects[0]?.slug)

  const visible = projects.filter(p => !type || p.type === type)
  const sel = visible.find(p => p.slug === selSlug) ?? visible[0]
  const selIndex = sel ? projects.indexOf(sel) : 0

  return (
    <div className={styles.sheet} data-sheet>
      <Header current="/projects" />

      <div className={styles.title}>
        <h1 className={styles.h1}><b>Projects</b><span>index</span></h1>
        <span className={clsx(styles.count, 'k')}><b>{pad(visible.length)}</b> / {pad(projects.length)} shown</span>
      </div>

      <Chips label="Type" chips={chips} total={projects.length} active={type} onChange={setType} />

      <div className={styles.list} tabIndex={0} aria-label="Project list">
        <div className={clsx(styles.thead, 'k')}>
          <span>No.</span><span>Project</span><span>Type</span><span>Year</span><span />
        </div>
        {visible.map(p => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className={clsx(styles.row, sel?.slug === p.slug && styles.sel)}
            onMouseEnter={() => setSel(p.slug)}
            onFocus={() => setSel(p.slug)}
          >
            <span className={clsx(styles.n, 'k')}>{pad(projects.indexOf(p) + 1)}</span>
            <div>
              <h2>{p.name}</h2>
              <p>{p.summary}</p>
              <div className={clsx(styles.st, 'k')}>{p.stack.map(s => <span key={s}>{s}</span>)}</div>
            </div>
            <span className={clsx(styles.ty, 'k')}>{p.type}</span>
            <span className={clsx(styles.yr, 'k')}>{p.year}</span>
            <span className={clsx(styles.go, 'k')}>↗</span>
          </Link>
        ))}
        {!visible.length && <p className={clsx(styles.empty, 'k')}>No projects of this type.</p>}
      </div>

      {sel && (
        <aside className={styles.pv} aria-live="polite">
          <div className={styles.f}>
            {sel.cover ? (
              <Image key={sel.cover.src} src={sel.cover.src} alt={sel.cover.alt} fill sizes="40vw" />
            ) : (
              <div className={styles.ph}>
                <b>{sel.name}</b>
                <span className="k">No imagery yet</span>
              </div>
            )}
          </div>
          <div className={clsx(styles.cap, 'k')}>
            <span>Fig. {pad(selIndex + 1)}</span>
            <span>{sel.type} · {sel.year}</span>
          </div>
          <dl className="k">
            <dt>Role</dt><dd>{sel.role}</dd>
            <dt>Stack</dt><dd>{sel.stack.join(' · ')}</dd>
            <dt>Status</dt><dd>{sel.status.live ? <span className={styles.live}>{sel.status.label}</span> : sel.status.label}</dd>
          </dl>
        </aside>
      )}

      <Footer />
    </div>
  )
}
