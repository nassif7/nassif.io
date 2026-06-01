import { getAllPosts } from '@/lib/posts'
import shared from './section.module.css'
import styles from './Writing.module.css'

export async function Writing() {
  const posts = await getAllPosts()

  return (
    <section id="writing" className={shared.section}>
      <div className={shared.sectionHeader}>
        <span className={shared.label}>Writing</span>
        <a href="/blog" className={shared.seeAll}>All posts →</a>
      </div>
      <h2 className={shared.heading}>Things I think about.</h2>
      <p className={shared.intro}>Politics, philosophy, tech, and the occasional rant. Honest opinions, written slowly.</p>

      <div className={styles.list}>
        {posts.map((post, i) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className={styles.row}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <div className={styles.rowMain}>
              <span className={styles.title}>{post.title}</span>
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
    </section>
  )
}
