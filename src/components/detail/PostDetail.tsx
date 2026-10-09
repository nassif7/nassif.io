import clsx from 'clsx'
import { formatDate, getPostNeighbours, pad, readingTime } from '@/data'
import type { Post } from '@/data'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { DetailLink } from '@/components/site/DetailLink'
import { CONTENT_ID } from './ProjectToc'
import { ReadingProgress } from './ReadingProgress'
import styles from './detail.module.css'

export async function PostDetail({ post, embedded = false }: { post: Post; embedded?: boolean }) {
  const { index, list } = await getPostNeighbours(post.slug)
  const { words, minutes } = readingTime(post)
  const date = formatDate(post.date)

  return (
    <div className={clsx(styles.sheet, styles.article, embedded && styles.embed)} data-sheet={embedded ? undefined : ''}>
      {!embedded && <Header current="/writing" />}

      <div className={styles.title}>
        <div>
          <DetailLink href="/writing" mode="closes" className={clsx(styles.back, 'k')} data-reveal="" style={{ '--rd': '60ms' } as React.CSSProperties}>← Writing</DetailLink>
          <h1 className={styles.h1Article} data-reveal="" style={{ '--rd': '120ms' } as React.CSSProperties}>{post.title}</h1>
        </div>
        <div className={clsx(styles.tmeta, 'k')} data-reveal="" style={{ '--rd': '180ms' } as React.CSSProperties}>
          <span><b>{post.topic}</b></span>
          <span>Essay {pad(index + 1)} · {minutes} min</span>
        </div>
        <ReadingProgress />
      </div>

      <aside className={styles.sideArticle} data-reveal="body">
        <p className={styles.dek}>{post.dek}</p>
        <dl className={clsx(styles.facts, 'k')}>
          <dt>Published</dt><dd>{date}</dd>
          <dt>Topic</dt><dd>{post.topic}</dd>
          <dt>Length</dt><dd>{words} words</dd>
        </dl>
        <div className={clsx(styles.more, 'k')}>
          <div className={styles.moreHd}>
            <span>More writing</span>
            <DetailLink href="/writing" mode="closes">All →</DetailLink>
          </div>
          {list.map((o, j) =>
            o.slug === post.slug ? null : (
              <DetailLink key={o.slug} href={`/writing/${o.slug}`} mode="swap" className={styles.moreItem}>
                <span className={styles.n}>{pad(j + 1)}</span><b>{o.title}</b>
              </DetailLink>
            ),
          )}
        </div>
      </aside>

      <main data-reveal="body" id={CONTENT_ID} className={clsx(styles.content, styles.contentArticle)} tabIndex={0} aria-label={post.title}>
        <article className={styles.essay}>
          {post.body.map((html, i) => (
            <p key={i} className={i === post.body.length - 1 ? styles.lastP : undefined} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </article>
        <div className={clsx(styles.end, 'k')}><span>End</span><span>Nassif Nassif · {date}</span></div>
      </main>

      {!embedded && <Footer />}
    </div>
  )
}
