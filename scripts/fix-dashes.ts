// Replaces em dashes in site copy (not in the essays). Exact old → new for single fields.
//   NODE_ENV=development node -r ./scripts/_patch-next-env.cjs --import tsx scripts/fix-dashes.ts
import { readFileSync } from 'fs'
import { getPayload } from 'payload'
try {
  for (const line of readFileSync('.env.local', 'utf-8').split('\n')) {
    const eq = line.indexOf('=')
    if (eq > 0 && !line.startsWith('#')) { const k = line.slice(0, eq).trim(); if (!process.env[k]) process.env[k] = line.slice(eq + 1).trim().replace(/^"|"$/g, '') }
  }
} catch {}

const soft = (s: string) => s.replace(/ — /g, ', ')
async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  const bySlug = async (collection: 'projects', slug: string) => (await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0] as any

  // projects
  const discrep = await bySlug('projects', 'discrep')
  await payload.update({ collection: 'projects', id: discrep.id, data: {
    summary: 'A framework for closing the gap between stated values and actual behaviour, showing the pattern, not prescribing the fix.',
    lede: 'A framework and tool for closing the gap between stated values and actual behaviour, by showing the pattern rather than prescribing the fix.',
  } })
  const marineria = await bySlug('projects', 'marineria')
  await payload.update({ collection: 'projects', id: marineria.id, data: {
    summary: 'Recruitment app for three audiences on one codebase, and it tells candidates why they don’t qualify.',
    sections: marineria.sections.map((s: any) => s.figure?.caption ? { ...s, figure: { ...s.figure, caption: s.figure.caption.replace(/^Fig\. \d+ — /, '') } } : s),
  } })
  const bm = await bySlug('projects', 'bookmarquee')
  const fixNode = (n: any): any => (n && typeof n === 'object' ? (Array.isArray(n) ? n.map(fixNode) : Object.fromEntries(Object.entries(n).map(([k, v]) => [k, k === 'text' && typeof v === 'string' ? soft(v) : fixNode(v)]))) : n)
  await payload.update({ collection: 'projects', id: bm.id, data: { body: fixNode(bm.body) } })

  // timeline
  const tl = await payload.find({ collection: 'timeline', limit: 100, depth: 0 })
  for (const e of tl.docs as any[]) {
    const data: any = {}
    if (e.summary?.includes('—')) data.summary = soft(e.summary)
    if (e.cvWhen?.includes('—')) data.cvWhen = e.cvWhen.replace(/ — /g, ' to ')
    if (Object.keys(data).length) await payload.update({ collection: 'timeline', id: e.id, data })
  }

  // profile + site
  const prof: any = await payload.findGlobal({ slug: 'profile', depth: 0 })
  await payload.updateGlobal({ slug: 'profile', data: {
    headline: { ...prof.headline, line3: 'whole thing, ' },
    intro: 'Nassif Nassif, Berlin. Eight years between design and engineering, from the first sketch to the store listing.',
    aboutLede: { ...prof.aboutLede, main: 'I build products end to end: the flow, the interface, the data, the release. ' },
    aboutBody: prof.aboutBody.map((b: any) => ({ ...b, text: soft(b.text) })),
  } })
  await payload.updateGlobal({ slug: 'site', data: {
    seoTitle: 'Nassif Nassif | Product Engineer, Berlin',
    description: 'Product engineer in Berlin. Eight years between design and engineering, from the first sketch to the store listing.',
  } })
  console.log('done')
}
main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
