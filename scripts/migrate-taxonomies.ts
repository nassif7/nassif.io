// Turns the free-text role / stack / status on projects into the editable option lists
// (roles, technologies, statuses) and links each project to them. Safe to re-run.
//   NODE_ENV=development node -r ./scripts/_patch-next-env.cjs --import tsx scripts/migrate-taxonomies.ts <backupDir>
import { readFileSync } from 'fs'
import { getPayload } from 'payload'

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
if (!dir) throw new Error('usage: migrate-taxonomies.ts <backupDir>')
const old: any[] = JSON.parse(readFileSync(`${dir}/projects.json`, 'utf-8'))

async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  const ensure = async (collection: 'roles' | 'technologies' | 'statuses', field: 'name' | 'label', value: string, extra: object = {}) => {
    const hit = await payload.find({ collection, where: { [field]: { equals: value } }, limit: 1, depth: 0 })
    if (hit.docs[0]) return hit.docs[0].id
    const doc = await payload.create({ collection, data: { [field]: value, ...extra } as any })
    console.log('created', collection, value)
    return doc.id
  }

  for (const p of old) {
    const role = p.role?.trim()
    const stack = [...new Set<string>((p.stack ?? []).map((s: any) => String(s.item).trim()).filter(Boolean))]
    const status = p.status?.label?.trim()
    const data: any = {}
    if (role) data.role = await ensure('roles', 'name', role)
    if (status) data.status = await ensure('statuses', 'label', status, { live: !!p.status.live })
    data.stack = []
    for (const t of stack) data.stack.push(await ensure('technologies', 'name', t))
    const found = await payload.find({ collection: 'projects', where: { slug: { equals: p.slug } }, limit: 1, depth: 0 })
    if (!found.docs[0]) { console.log('MISSING project', p.slug); continue }
    await payload.update({ collection: 'projects', id: found.docs[0].id, data })
    console.log('linked', p.slug, '→', role, '|', status, '|', stack.length, 'technologies')
  }
}
main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
