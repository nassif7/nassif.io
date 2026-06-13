import { getFeaturedPosts } from '@/lib/posts'
import { ListItem } from '@/components/list/ListItem'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'
import styles from './Writing.module.css'

export async function Writing() {
  const posts = await getFeaturedPosts()

  return (
    <section id="writing" className={shared.section}>
      <SectionHeader
        label="Writing"
        linkHref="/blog"
        linkText="All posts →"
        title="Things I think about."
        intro="Politics, philosophy, tech, and the occasional rant. Honest opinions, written slowly."
      />

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
