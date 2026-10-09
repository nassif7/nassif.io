// Turns each post's topic (old select value) into a Topics option and links the post. Safe to re-run.
//   NODE_ENV=development node -r ./scripts/_patch-next-env.cjs --import tsx scripts/migrate-topics.ts <backupDir>
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
if (!dir) throw new Error('usage: migrate-topics.ts <backupDir>')
const old: any[] = JSON.parse(readFileSync(`${dir}/posts.json`, 'utf-8'))

async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  for (const p of old) {
    const name = String(p.topic ?? '').trim()
    if (!name) { console.log('no topic', p.slug); continue }
    let topic = (await payload.find({ collection: 'topics', where: { name: { equals: name } }, limit: 1, depth: 0 })).docs[0]
    if (!topic) { topic = await payload.create({ collection: 'topics', data: { name } }); console.log('created topic', name) }
    const post = (await payload.find({ collection: 'posts', where: { slug: { equals: p.slug } }, limit: 1, depth: 0 })).docs[0]
    if (!post) { console.log('MISSING post', p.slug); continue }
    await payload.update({ collection: 'posts', id: post.id, data: { topic: topic.id } })
    console.log('linked', p.slug, '→', name)
  }
}
main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1) })
