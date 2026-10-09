// Read-only: dumps current Payload content to JSON (safety copy before the redesign schema).
//   NODE_ENV=production node -r ./scripts/_patch-next-env.cjs --import tsx scripts/export-content.ts <outDir>
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
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

const out = process.argv[2]
if (!out) throw new Error('usage: export-content.ts <outDir>')
mkdirSync(out, { recursive: true })

async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  for (const collection of ['projects', 'posts', 'post-collections', 'experience', 'media'] as const) {
    const { docs } = await payload.find({ collection, limit: 1000, depth: 0, pagination: false })
    writeFileSync(`${out}/${collection}.json`, JSON.stringify(docs, null, 2))
    console.log(collection, docs.length)
  }
  for (const slug of ['settings', 'homepage'] as const) {
    writeFileSync(`${out}/${slug}.json`, JSON.stringify(await payload.findGlobal({ slug, depth: 0 }), null, 2))
    console.log(slug, 'ok')
  }
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
