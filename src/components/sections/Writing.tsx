import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/posts'
import { getHomepage } from '@/lib/homepage'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'

export async function Writing() {
  const [allPosts, homepage] = await Promise.all([getFeaturedPosts(), getHomepage()])
  const posts = allPosts.slice(0, 5)

  return (
    <section id="writing" className={shared.band} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader
          num="06"
          eyebrow="Writing"
          title={homepage.writingSectionTitle}
          lead={homepage.writingSectionLead}
          meta="See all posts →"
          metaHref="/blog"
        />
        <div className="idx-scroll">
          <table className="idx">
            <thead>
              <tr>
                <th className="ix-y">Date</th>
                <th>Title</th>
                <th className="idx-hide">Topic</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.slug}>
                  <td className="ix-y">
                    {new Date(post.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <Link href={`/blog/${post.slug}`}>
                      <div className="ix-n">{post.title}</div>
                      <div className="ix-d">{post.excerpt}</div>
                    </Link>
                  </td>
                  <td className="idx-hide"><span className="ix-t">{post.tags?.[0] ?? ''}</span></td>
                  <td><span className="ix-arrow">↗</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
