// Reads content/posts/*.md and content/projects/*.md and outputs migration.ndjson
// Run: node scripts/migrate.js
// Then: npx sanity dataset import migration.ndjson production --replace

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const crypto = require('crypto')

function key() {
  return crypto.randomBytes(6).toString('hex')
}

function parseInline(text) {
  const spans = []
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      spans.push({ _type: 'span', _key: key(), text: text.slice(lastIndex, match.index), marks: [] })
    }
    if (match[2]) spans.push({ _type: 'span', _key: key(), text: match[2], marks: ['strong'] })
    else if (match[3]) spans.push({ _type: 'span', _key: key(), text: match[3], marks: ['em'] })
    else if (match[4]) spans.push({ _type: 'span', _key: key(), text: match[4], marks: ['code'] })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    spans.push({ _type: 'span', _key: key(), text: text.slice(lastIndex), marks: [] })
  }

  return spans.length ? spans : [{ _type: 'span', _key: key(), text, marks: [] }]
}

function toBlocks(text) {
  if (!text || !text.trim()) return []
  return text.split('\n\n').filter(Boolean).map(para => {
    const t = para.trim()
    const h2 = t.match(/^## (.+)$/)
    const h3 = t.match(/^### (.+)$/)
    const h1 = t.match(/^# (.+)$/)
    const style = h1 ? 'h1' : h2 ? 'h2' : h3 ? 'h3' : 'normal'
    const content = h1 ? h1[1] : h2 ? h2[1] : h3 ? h3[1] : t
    return {
      _type: 'block',
      _key: key(),
      style,
      markDefs: [],
      children: style === 'normal' ? parseInline(content) : [{ _type: 'span', _key: key(), text: content, marks: [] }],
    }
  })
}

const POSTS_DIR = path.join(__dirname, '../content/posts')
const PROJECTS_DIR = path.join(__dirname, '../content/projects')
const docs = []

// Posts
for (const file of fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'))
  docs.push({
    _id: `drafts.post-${slug}`,
    _type: 'post',
    title: data.title,
    slug: { _type: 'slug', current: slug },
    date: data.date,
    tag: data.tag || '',
    excerpt: data.excerpt || '',
    hidden: !!data.hidden,
    body: toBlocks(content),
  })
}

// Projects
for (const file of fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = matter(fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8'))
  docs.push({
    _id: `drafts.project-${slug}`,
    _type: 'project',
    name: data.name,
    slug: { _type: 'slug', current: slug },
    type: data.type || '',
    num: data.num || '',
    desc: data.desc || '',
    stack: data.stack || [],
    images: [],
    link: data.link || null,
    linkLabel: data.linkLabel || null,
    appStoreLink: data.appStoreLink || null,
    androidComingSoon: !!data.androidComingSoon,
    privacyPolicy: data.privacyPolicy || null,
    wip: !!data.wip,
    brainstorm: !!data.brainstorm,
    body: toBlocks(content),
  })
}

fs.writeFileSync(path.join(__dirname, '../migration.ndjson'), docs.map(d => JSON.stringify(d)).join('\n'))
console.log(`✓ Exported ${docs.length} documents (${docs.filter(d => d._type === 'post').length} posts, ${docs.filter(d => d._type === 'project').length} projects)`)
console.log('\nNext step:')
console.log('  npx sanity dataset import migration.ndjson production --replace')
console.log('\nNote: images are not migrated — upload them manually in the studio.')
