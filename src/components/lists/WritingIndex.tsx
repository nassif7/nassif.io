'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import type { Post } from '@/data/types'
import { formatMonth, pad } from '@/data/format'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Chips } from './Chips'
import { useUrlFilter } from './useUrlFilter'
import styles from './list.module.css'

export function WritingIndex({
  posts,
  chips,
  initialTopic,
}: {
  posts: Post[]
  chips: { value: string; count: number }[]
  initialTopic: string | null
}) {
  const [topic, setTopic] = useUrlFilter('topic', chips.some(c => c.value === initialTopic) ? initialTopic : null)
  const [selSlug, setSel] = useState(posts[0]?.slug)

  const visible = posts.filter(p => !topic || p.topic === topic)
  const sel = visible.find(p => p.slug === selSlug) ?? visible[0]
  const selIndex = sel ? posts.indexOf(sel) : 0

  return (
    <div className={styles.sheet} data-sheet>
      <Header current="/writing" />

      <div className={styles.title}>
        <h1 className={styles.h1}><b>Writing</b><span>notes</span></h1>
        <span className={clsx(styles.count, 'k')}><b>{pad(visible.length)}</b> / {pad(posts.length)} shown</span>
      </div>

      <Chips label="Topic" chips={chips} total={posts.length} active={topic} onChange={setTopic} />

      <div className={styles.list} tabIndex={0} aria-label="Essay list" style={{ '--c3': '110px', '--c4': '70px' } as React.CSSProperties}>
        <div className={clsx(styles.thead, 'k')}>
          <span>No.</span><span>Title</span><span>Topic</span><span>Date</span><span />
        </div>
        {visible.map(p => (
          <Link
            key={p.slug}
            href={`/writing/${p.slug}`}
            className={clsx(styles.row, sel?.slug === p.slug && styles.sel)}
            onMouseEnter={() => setSel(p.slug)}
            onFocus={() => setSel(p.slug)}
          >
            <span className={clsx(styles.n, 'k')}>{pad(posts.indexOf(p) + 1)}</span>
            <div>
              <h2>{p.title}</h2>
              <p>{p.dek}</p>
            </div>
            <span className={clsx(styles.ty, 'k')}>{p.topic}</span>
            <span className={clsx(styles.yr, 'k')}>{formatMonth(p.date)}</span>
            <span className={clsx(styles.go, 'k')}>↗</span>
          </Link>
        ))}
        {!visible.length && <p className={clsx(styles.empty, 'k')}>No essays on this topic.</p>}
      </div>

      {sel && (
        <aside className={styles.pv} aria-live="polite">
          <div className={clsx(styles.f, styles.text)}>
            <div className={styles.pBody}>
              <span className={clsx(styles.fig, 'k')}>Essay {pad(selIndex + 1)} · {sel.topic}</span>
              <h2 className={styles.pt}>{sel.title}</h2>
              <p className={styles.dk}>{sel.dek}</p>
              {sel.opening && <p className={styles.open}>{sel.opening}</p>}
            </div>
            <div className={clsx(styles.rd, 'k')}>
              <span>{formatMonth(sel.date)}</span>
              <Link href={`/writing/${sel.slug}`}>Read essay <span className={styles.arrow}>↗</span></Link>
            </div>
          </div>
        </aside>
      )}

      <Footer />
    </div>
  )
}
