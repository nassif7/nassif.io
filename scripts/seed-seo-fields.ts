// One-off: backfills only the two new Settings fields (seoTitle/seoDescription)
// added after the initial content migration. Deliberately narrow — does NOT
// touch any other field, so it's safe to run even if content has since been
// edited in /admin.
//   node -r ./scripts/_patch-next-env.cjs --import tsx scripts/seed-seo-fields.ts
import { readFileSync } from 'fs'
import { getPayload } from 'payload'

try {
  const env = readFileSync('.env.local', 'utf-8')
  for (const line of env.split('\n')) {
    const eq = line.indexOf('=')
    if (eq > 0 && !line.startsWith('#')) {
      const key = line.slice(0, eq).trim()
      const val = line.slice(eq + 1).trim().replace(/^"|"$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  }
} catch {}

async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      seoTitle: 'Nassif Nassif — Software Engineer, Berlin',
      seoDescription: 'Software engineer based in Berlin. Eight years building software across corporate platforms, startups, and independent projects.',
    },
  })
  console.log('✔ settings.seoTitle / seoDescription set')
  process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
