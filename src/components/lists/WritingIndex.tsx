'use client'

import clsx from 'clsx'
import type { Post } from '@/data/types'
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
  const visible = posts.filter(p => !topic || p.topic === topic)

  return (
    <div className={styles.canvas}>
      <div className={styles.sheet}>
        <Header current="/writing" large />

        <main className={styles.main}>
          <div className={styles.title}>
            <h1>Writing</h1>
          </div>

          <Chips className={styles.filters} label="Topic" showLabel={false} chips={chips} total={posts.length} active={topic} onChange={setTopic} />

          <div className={styles.content}>
            <div className={styles.list} tabIndex={0} aria-label="Essay list">
              {visible.map(p => (
                <a
                  key={p.slug}
                  href={`/writing/${p.slug}`}
                  className={styles.row}
                >
                  <div className={styles.rowCopy}>
                    <h2>{p.title}</h2>
                    <p>{p.dek}</p>
                  </div>
                  <span className={clsx(styles.topic, 'k')}>{p.topic}</span>
                </a>
              ))}
              {!visible.length && <p className={clsx(styles.empty, 'k')}>No essays on this topic.</p>}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
