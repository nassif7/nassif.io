import { getAllPosts } from '@/lib/posts'
import { ListItem } from '@/components/list/ListItem'
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
    </section>
  )
}
