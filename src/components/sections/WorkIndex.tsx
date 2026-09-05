import Link from 'next/link'
import clsx from 'clsx'
import { getAllProjects } from '@/lib/projects'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'

export async function WorkIndex() {
  // Only projects curated for the redesign (year set) appear in the index —
  // e.g. "Bone Page & Kohle und Meer" predates it and isn't included yet.
  const projects = (await getAllProjects()).filter(p => p.year)

  return (
    <section id="index" className={shared.band} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader
          num="04"
          eyebrow="Work index"
          title="Everything, on one page."
          meta={`${projects.length} entries`}
        />
        <table className="idx">
          <thead>
            <tr>
              <th className="ix-y">Year</th>
              <th>Project</th>
              <th className="idx-hide">Type</th>
              <th className="idx-hide">Stack</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.slug}>
                <td className={clsx('ix-y', /^\d+$/.test(p.year) && 'tnum')}>{p.year}</td>
                <td>
                  <Link href={`/projects/${p.slug}`}>
                    <div className="ix-n">{p.name}</div>
                    <div className="ix-d">{p.desc}</div>
                  </Link>
                </td>
                <td className="idx-hide"><span className="ix-t">{p.type}</span></td>
                <td className="idx-hide ix-s">{p.stack.join(' · ') || '—'}</td>
                <td><span className={clsx('pill', p.statusVariant !== 'default' && p.statusVariant)}>{p.status}</span></td>
                <td><span className="ix-arrow">↗</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
