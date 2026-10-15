// Read-only: lists every field in the CMS that contains an em dash.
import { readFileSync } from 'fs'
import { getPayload } from 'payload'
try {
  for (const line of readFileSync('.env.local', 'utf-8').split('\n')) {
    const eq = line.indexOf('=')
    if (eq > 0 && !line.startsWith('#')) { const k = line.slice(0, eq).trim(); if (!process.env[k]) process.env[k] = line.slice(eq + 1).trim().replace(/^"|"$/g, '') }
  }
} catch {}
const walk = (v: any, path: string, hit: (p: string, s: string) => void) => {
  if (typeof v === 'string') { if (v.includes('—')) hit(path, v) }
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`, hit))
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!['createdAt', 'updatedAt'].includes(k)) walk(x, `${path}.${k}`, hit)
}
async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  const out = (p: string, s: string) => console.log(p, '→', JSON.stringify(s.length > 200 ? s.slice(0, 200) + '…' : s))
  for (const c of ['projects', 'posts', 'timeline', 'roles', 'technologies', 'statuses', 'topics'] as const) {
    const { docs } = await payload.find({ collection: c, limit: 500, depth: 0, pagination: false })
    for (const d of docs as any[]) walk(d, `${c}/${d.slug ?? d.name ?? d.label ?? d.title}`, out)
  }
  for (const g of ['profile', 'site'] as const) walk(await payload.findGlobal({ slug: g, depth: 0 }), g, out)
}
main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
