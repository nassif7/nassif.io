// Migrates the pre-redesign Payload content (backup JSON from export-content.ts)
// into the redesign schema. Dry-run by default.
//   NODE_ENV=production node -r ./scripts/_patch-next-env.cjs --import tsx scripts/migrate-redesign.ts <backupDir>           (dry run)
//   NODE_ENV=development node -r ./scripts/_patch-next-env.cjs --import tsx scripts/migrate-redesign.ts <backupDir> --apply
// --apply creates whatever is missing (by slug / title), so it is safe to re-run. It never deletes.
// Add --truncate to also clear projects/posts first (only needed while they still hold old-shape rows).
import { readFileSync } from 'fs'
import { getPayload } from 'payload'
import { projects as specProjects } from '../src/data/seed/projects'
import { timeline as specTimeline } from '../src/data/seed/timeline'
import { profile as specProfile, site as specSite } from '../src/data/seed/profile'

try {
  for (const line of readFileSync('.env.local', 'utf-8').split('\n')) {
    const eq = line.indexOf('=')
    if (eq > 0 && !line.startsWith('#')) {
      const key = line.slice(0, eq).trim()
      if (!process.env[key]) process.env[key] = line.slice(eq + 1).trim().replace(/^"|"$/g, '')
    }
  }
} catch {}

const dir = process.argv[2]
const apply = process.argv.includes('--apply')
if (!dir) throw new Error('usage: migrate-redesign.ts <backupDir> [--apply]')
const load = (n: string) => JSON.parse(readFileSync(`${dir}/${n}.json`, 'utf-8'))

const cut = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…')

// ---- decisions (agreed with Nassif) ----
const PROJECT_MAP: Record<string, { type: string; year: number; status: { label: string; live: boolean }; spec?: string; name?: string; coverUrl?: string; draft?: boolean }> = {
  'keen-studio': { type: 'Dev tool', year: 2026, status: { label: 'In progress', live: false }, spec: 'keen-studio' },
  discrep: { type: 'Concept', year: 2026, status: { label: 'Position paper', live: false }, spec: 'discrep' },
  bookmarquee: { type: 'Browser extension', year: 2025, status: { label: 'Live · Chrome Web Store', live: true }, spec: 'bookmarquee' },
  'one-more': { type: 'Mobile app', year: 2025, status: { label: 'Live · App Store', live: true }, spec: 'one-more', coverUrl: '/projects/one-more/one-more1.avif' },
  marineria: { type: 'Mobile app', year: 2024, status: { label: 'Live · iOS & Android', live: true }, spec: 'marineria' },
  'vs-code-themes': { type: 'Editor theme', year: 2024, status: { label: 'Published · VS Code', live: true }, spec: 'themes', name: 'Bone Page & Kohle und Meer' },
  moviemiento: { type: 'Website', year: 2017, status: { label: 'Live', live: true }, spec: 'moviemiento', coverUrl: '/projects/moviemiento/moviemiento3.avif' },
  'wahl-o-mat': { type: 'Concept', year: 2019, status: { label: 'Delivered', live: false }, draft: true },
}
const TOPIC: Record<string, string> = {
  'croissant-as-a-statement': 'Philosophy',
  'notion-project-manager': 'Tech',
  'on-the-politics-of-interface-design': 'Politics',
  'what-it-means-to-finish-something': 'Philosophy',
  'the-frontend-is-never-just-frontend': 'Tech',
  'a-human-life-is-a-story-of-resistance': 'Philosophy',
}

function buildProjects() {
  return load('projects').map((d: any) => {
    const m = PROJECT_MAP[d.slug]
    if (!m) throw new Error(`no mapping for project ${d.slug}`)
    const spec = specProjects.find(p => p.slug === m.spec)
    const coverId = (typeof d.featuredImage === 'number' ? d.featuredImage : null) ?? d.images?.find((i: any) => i.image)?.image ?? null
    const links = (d.links ?? [])
      .filter((l: any) => l.url)
      .map((l: any) => ({ label: l.platform, href: String(l.url).replace(/\s.*$/, '') }))
    if (d.privacyPolicy) links.push({ label: 'Privacy policy', href: String(d.privacyPolicy).replace(/^https?:\/\/[^/]+/, '') })
    const cs = d.caseStudy ? d.caseStudyContent : null
    return {
      name: m.name ?? d.name,
      slug: d.slug,
      kind: d.caseStudy ? 'case-study' : 'entry',
      type: m.type,
      year: m.year,
      role: d.role || spec?.role || 'Design & engineering',
      client: d.client || undefined,
      platform: d.platforms || undefined,
      stack: (d.stack ?? []).map((s: any) => ({ item: s.item })),
      status: m.status,
      summary: cut(spec?.summary ?? d.desc ?? d.name, 160),
      lede: (cs?.lead || spec?.lede || d.desc || d.name) as string,
      cover: coverId ?? undefined,
      coverUrl: coverId ? undefined : m.coverUrl,
      links,
      body: d.body ?? undefined,
      sections: cs
        ? cs.sections.map((s: any) => ({
            sectionId: s.sectionId,
            label: s.eyebrow,
            heading: s.heading,
            body: s.body,
            pull: s.pullQuote || undefined,
            figure: s.figureImages?.[0]?.image ? { image: s.figureImages[0].image, caption: s.figureCaption || undefined } : undefined,
            outcomes: (s.outcomes ?? []).map((o: any) => ({ value: o.value, label: o.label })),
          }))
        : undefined,
      featured: d.slug === 'marineria',
      draft: m.draft ?? false,
    }
  })
}

function buildPosts() {
  return load('posts').map((d: any) => ({
    title: d.title,
    slug: d.slug,
    date: d.date,
    topic: TOPIC[d.slug] ?? 'Tech',
    dek: cut((d.excerpt || '').trim() || d.title, 200),
    body: d.body ?? undefined,
    featured: d.slug === 'croissant-as-a-statement',
    draft: d.slug === 'a-human-life-is-a-story-of-resistance',
  }))
}

function buildTimeline() {
  const live: any[] = load('experience')
  return specTimeline.map(e => {
    const match = live.find(x => x.tag && x.tag === e.org)
    const cvKind = e.kind === 'work' || e.kind === 'volunteer'
    return {
      title: e.title,
      org: e.org,
      start: e.start,
      end: e.end ?? undefined,
      label: e.label,
      kind: e.kind,
      summary: e.summary,
      bullets: (match?.bullets ?? []).map((b: any) => ({ text: b.text })),
      cvWhen: match?.cvWhen || undefined,
      current: !!e.current,
      showOnCV: cvKind && (match ? match.showInCV !== false : true),
    }
  })
}

function buildProfile() {
  const p = specProfile
  return {
    name: p.name, role: p.role, city: p.city, timezone: p.timezone, coords: p.coords, since: p.since,
    headline: { line1: p.headline[0], line2: p.headline[1], line3: p.headline[2], line3Muted: p.headline[3] },
    intro: p.intro,
    aboutLede: { main: p.aboutLede[0], muted: p.aboutLede[1] },
    aboutBody: p.aboutBody.map(text => ({ text })),
    languages: p.languages, engagement: p.engagement, availability: p.availability, email: p.email,
    socials: p.socials, cvPdf: p.cv.pdf,
  }
}

const buildSite = () => ({
  title: specSite.title,
  seoTitle: 'Nassif Nassif — Product Engineer, Berlin',
  description: 'Product engineer in Berlin. Eight years between design and engineering — from the first sketch to the store listing.',
  footerQuote: specSite.footerQuote,
})

async function main() {
  const projects = buildProjects(), posts = buildPosts(), timeline = buildTimeline()
  console.log('\nPROJECTS'); console.table(projects.map((p: any) => ({ slug: p.slug, kind: p.kind, type: p.type, year: p.year, cover: p.cover ?? p.coverUrl ?? '—', links: p.links.length, sections: p.sections?.length ?? 0, featured: p.featured, draft: p.draft })))
  console.log('POSTS'); console.table(posts.map((p: any) => ({ slug: p.slug, date: String(p.date).slice(0, 10), topic: p.topic, dekLen: p.dek.length, featured: p.featured, draft: p.draft })))
  console.log('TIMELINE'); console.table(timeline.map((t: any) => ({ years: `${t.start}–${t.end ?? 'now'}`, title: t.title, kind: t.kind, bullets: t.bullets.length, cv: t.showOnCV })))
  if (!apply) return console.log('\nDry run. Nothing written. Re-run with --apply.')

  const { default: config } = await import('../payload.config')
  // 1. old-shape rows can't be pushed into the new schema: clear them (backup JSON is the source)
  if (process.argv.includes('--truncate')) {
    const { Pool } = await import('pg')
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    await pool.query('TRUNCATE TABLE projects, posts CASCADE')
    await pool.end()
    console.log('truncated projects, posts')
  }
  // 2. init Payload (NODE_ENV=development → pushes the new schema)
  const payload = await getPayload({ config })
  const has = async (collection: 'projects' | 'posts' | 'timeline', field: string, value: string) =>
    (await payload.find({ collection, where: { [field]: { equals: value } }, limit: 1, depth: 0 })).totalDocs > 0
  for (const data of projects) {
    if (await has('projects', 'slug', data.slug)) console.log('skip project', data.slug)
    else { await payload.create({ collection: 'projects', data, overrideAccess: true }); console.log('created project', data.slug) }
  }
  for (const data of posts) {
    if (await has('posts', 'slug', data.slug)) console.log('skip post', data.slug)
    else { await payload.create({ collection: 'posts', data, overrideAccess: true }); console.log('created post', data.slug) }
  }
  for (const data of timeline) {
    if (await has('timeline', 'title', data.title)) console.log('skip timeline', data.title)
    else { await payload.create({ collection: 'timeline', data: data as any }); console.log('created timeline', data.title) }
  }
  await payload.updateGlobal({ slug: 'profile', data: buildProfile() as any })
  await payload.updateGlobal({ slug: 'site', data: buildSite() as any })
  console.log('done')
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
