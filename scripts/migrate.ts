import { readFileSync } from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  try {
    const env = readFileSync('.env.local', 'utf-8')
    for (const line of env.split('\n')) {
      const eq = line.indexOf('=')
      if (eq > 0 && !line.startsWith('#')) {
        const key = line.slice(0, eq).trim()
        const val = line.slice(eq + 1).trim()
        if (!process.env[key]) process.env[key] = val
      }
    }
  } catch {}

  const payload = await getPayload({ config })
  await payload.db.migrate()
  console.log('Migrations complete.')
  process.exit(0)
}

main().catch(err => { console.error(err); process.exit(1) })
