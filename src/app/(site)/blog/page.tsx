export const dynamic = 'force-dynamic'

import Link from 'next/link'
import clsx from 'clsx'
import { getAllPosts, getAllCollections } from '@/lib/posts'
import { getSettings } from '@/lib/settings'
import { DarkCta } from '@/components/cta/DarkCta'
import { FilterTabs } from '@/components/ui/FilterTabs'
import styles from './blog.module.css'

export const metadata = { title: 'Writing — Nassif Nassif' }

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const { collection: activeSlug } = await searchParams
  const [posts, collections, settings] = await Promise.all([getAllPosts(), getAllCollections(), getSettings()])

  const filtered = activeSlug
    ? posts.filter(p => p.collections?.some(c => c.slug === activeSlug))
    : posts

  return (
    <main>
      <div className={clsx('wrap', styles.hd)}>
        <Link href="/" className={styles.back}>← nassif.pro</Link>
        <h1 className="display">Writing.</h1>
        <p className="lead">Thoughts on politics, philosophy, tech, and whatever else.</p>
      </div>

      {collections.length > 0 && (
        <div className="wrap">
          <FilterTabs
            allHref="/blog"
            allActive={!activeSlug}
            items={collections.map(c => ({
              label: c.title,
              href: `/blog?collection=${c.slug}`,
              active: activeSlug === c.slug,
            }))}
          />
        </div>
      )}

      <div className={clsx('wrap', styles.tableWrap)}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className="meta-k">Nothing here</span>
            <p className="lead">No posts in this collection yet.</p>
          </div>
        ) : (
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
                {filtered.map(post => (
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
        )}
      </div>

      <DarkCta
        eyebrow="Get in touch"
        heading="Have something to say?"
        lead="Available for contract and full-time work from Q4 2026 — Berlin, or remote across European hours."
        email={settings.email}
      />
    </main>
  )
}
