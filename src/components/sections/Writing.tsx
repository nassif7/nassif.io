import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/posts'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'

export async function Writing() {
  const posts = await getFeaturedPosts()

  return (
    <section id="writing" className={shared.band} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader
          num="06"
          eyebrow="Writing"
          title="Notes on the work."
          lead="Interface ethics, engineering culture, and the occasional detour. Written slowly."
          meta={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
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
