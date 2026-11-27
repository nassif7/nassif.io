import clsx from 'clsx'
import { formatDate } from '@/data'
import type { Post } from '@/data'
import { Header } from '@/components/site/Header'
import styles from './detail.module.css'

export function PostDetail({ post }: { post: Post }) {
  const date = formatDate(post.date)

  return (
    <div className={styles.articleCanvas}>
      <div className={clsx(styles.sheet, styles.article)}>
        <Header current="/writing" large />

        <main className={styles.articleMain}>
          <a href="/writing" className={styles.articleBack} aria-label="Back to all writing">All writing</a>
          <header className={styles.articleHeader}>
            <h1 className={styles.h1Article}>{post.title}</h1>
            <div className={clsx(styles.articleMeta, 'k')}>
              <time dateTime={post.date}>{date}</time>
              <span>{post.topic}</span>
            </div>
          </header>

          <p className={styles.articleDek}>{post.dek}</p>

          <article className={styles.essay} aria-label={post.title}>
            {post.body.map((html, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </article>
        </main>
      </div>
    </div>
  )
}
