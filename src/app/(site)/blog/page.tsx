export const dynamic = 'force-dynamic'

import { getAllPosts, getAllCollections } from '@/lib/posts'
import { PageHeader } from '@/components/layout/PageHeader'
import { ListItem } from '@/components/list/ListItem'
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
      <PageHeader title="Writing" sub="Thoughts on politics, philosophy, tech, and whatever else." />

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
          <ListItem
            key={post.slug}
            type="post"
            href={`/blog/${post.slug}`}
            num={i + 1}
            title={post.title}
            excerpt={post.excerpt}
            tags={post.tags?.join(' · ') ?? ''}
            date={new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          />
        ))}
      </div>
    </main>
  )
}
