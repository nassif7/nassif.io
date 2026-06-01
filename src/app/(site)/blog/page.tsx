export const dynamic = 'force-dynamic'

import { getAllPosts, getAllCollections } from '@/lib/posts'
import styles from './blog.module.css'

export const metadata = { title: 'Writing — Nassif Nassif' }

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const { collection: activeSlug } = await searchParams
  const [posts, collections] = await Promise.all([getAllPosts(), getAllCollections()])

  const filtered = activeSlug
    ? posts.filter(p => p.collections?.some(c => c.slug === activeSlug))
    : posts

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>← nassif.pro</a>
        <h1 className={styles.title}>Writing</h1>
        <p className={styles.sub}>Thoughts on politics, philosophy, tech, and whatever else.</p>
      </header>

      {collections.length > 0 && (
        <div className={styles.filters}>
          <a href="/blog" className={`${styles.filter} ${!activeSlug ? styles.filterActive : ''}`}>All</a>
          {collections.map(c => (
            <a
              key={c.slug}
              href={`/blog?collection=${c.slug}`}
              className={`${styles.filter} ${activeSlug === c.slug ? styles.filterActive : ''}`}
            >
              {c.title}
            </a>
          ))}
        </div>
      )}

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyLabel}>Nothing here</span>
            <p>No posts in this collection yet.</p>
          </div>
        ) : filtered.map((post, i) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className={styles.row}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <div className={styles.rowMain}>
              <span className={styles.postTitle}>{post.title}</span>
              <span className={styles.excerpt}>{post.excerpt}</span>
              <div className={styles.rowMeta}>
                <span className={styles.tag}>{post.tags?.join(' · ')}</span>
                <span className={styles.date}>
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
            <span className={styles.arrow}>↗</span>
          </a>
        ))}
      </div>
    </main>
  )
}
