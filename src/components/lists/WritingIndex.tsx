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
import styles from './writing.module.css'

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
  return (
    <div className={styles.canvas}>
      <div className={styles.sheet}>
        <Header current="/writing" large />

        <main className={styles.main}>
          <div className={styles.title}>
            <h1>Writing</h1>
            <span className={clsx(styles.count, 'k')}><b>{pad(visible.length)}</b> / {pad(posts.length)} shown</span>
          </div>

          <Chips label="Topic" chips={chips} total={posts.length} active={topic} onChange={setTopic} />

          <div className={styles.content}>
            <div className={styles.list} tabIndex={0} aria-label="Essay list">
              <div className={clsx(styles.thead, 'k')}>
                <span>Date</span><span>Essay</span><span>Topic</span>
              </div>
              {visible.map(p => (
                <Link
                  key={p.slug}
                  href={`/writing/${p.slug}`}
                  className={clsx(styles.row, sel?.slug === p.slug && styles.selected)}
                  onMouseEnter={() => setSel(p.slug)}
                  onFocus={() => setSel(p.slug)}
                >
                  <span className={clsx(styles.date, 'k')}>{formatMonth(p.date)}</span>
                  <div className={styles.rowCopy}>
                    <h2>{p.title}</h2>
                    <p>{p.dek}</p>
                  </div>
                  <span className={clsx(styles.topic, 'k')}>{p.topic}</span>
                </Link>
              ))}
              {!visible.length && <p className={clsx(styles.empty, 'k')}>No essays on this topic.</p>}
            </div>

            {sel && (
              <aside className={styles.preview} aria-label="Selected essay" aria-live="polite">
                <div className={styles.previewBody}>
                  <span className={clsx(styles.eyebrow, 'k')}>{sel.topic} · {formatMonth(sel.date)}</span>
                  <h2>{sel.title}</h2>
                  <p className={styles.dek}>{sel.dek}</p>
                  {sel.opening && <p className={styles.opening}>{sel.opening}</p>}
                </div>
                <div className={clsx(styles.previewFoot, 'k')}>
                  <span>{formatMonth(sel.date)}</span>
                  <Link href={`/writing/${sel.slug}`}>Read essay</Link>
                </div>
              </aside>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
