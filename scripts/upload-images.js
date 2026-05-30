// Uploads project images from public/ to Sanity and patches the project documents
// Run: node scripts/upload-images.js

const fs = require('fs')
const path = require('path')
const { createClient } = require('@sanity/client')

// Load .env.local manually (no dotenv dependency needed)
const envPath = path.join(__dirname, '../.env.local')
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '')
})

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

// Maps document ID → ordered list of public paths from the markdown
const projects = {
  'project-bookmarquee': [
    'bookmarquee/bookmarquee01.avif',
    'bookmarquee/bookmarquee02.avif',
    'bookmarquee/bookmarquee03.avif',
    'bookmarquee/bookmarquee04.avif',
    'bookmarquee/bookmarquee05.avif',
    'bookmarquee/bookmarquee06.avif',
    'bookmarquee/bookmarquee07.avif',
    'bookmarquee/bookmarquee08.avif',
    'bookmarquee/bookmarquee09.avif',
  ],
  'project-marineria': [
    'marineria/marineria1.avif',
    'marineria/marineria2.avif',
    'marineria/marineria3.avif',
    'marineria/marineria4.avif',
    'marineria/marineria5.avif',
    'marineria/marineria6.avif',
    'marineria/marineria7.avif',
    'marineria/marineria8.avif',
  ],
  'project-moviemiento': [
    'moviemiento/moviemiento3.avif',
    'moviemiento/moviemiento4.avif',
    'moviemiento/moviemiento5.avif',
    'moviemiento/moviemiento6.avif',
  ],
  'project-one-more': [
    'one-more/one-more1.avif',
    'one-more/one-more2.avif',
    'one-more/one-more3.avif',
    'one-more/one-more4.avif',
    'one-more/one-more5.avif',
    'one-more/one-more6.avif',
  ],
}

const PUBLIC_DIR = path.join(__dirname, '../public/projects')

async function run() {
  for (const [docId, imagePaths] of Object.entries(projects)) {
    console.log(`\nUploading images for ${docId}...`)
    const imageAssets = []

    for (const imgPath of imagePaths) {
      const fullPath = path.join(PUBLIC_DIR, imgPath)
      const filename = path.basename(imgPath)
      console.log(`  ↑ ${filename}`)

      const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
        filename,
        contentType: 'image/avif',
      })

      imageAssets.push({
        _type: 'image',
        _key: asset._id.replace(/[^a-z0-9]/gi, '').slice(0, 12),
        asset: { _type: 'reference', _ref: asset._id },
      })
    }

    await client.patch(docId).set({ images: imageAssets }).commit()
    console.log(`  ✓ Patched ${docId} with ${imageAssets.length} images`)
  }

  console.log('\nDone! All images uploaded and linked.')
}

run().catch(err => {
  if (err.statusCode === 403) {
    console.error('\n✗ Permission denied — your token needs Editor (write) access.')
    console.error('  Go to sanity.io/manage → nassif.pro → API → Tokens → create an Editor token')
    console.error('  Then update SANITY_API_READ_TOKEN in .env.local with the new token.')
  } else {
    console.error('\n✗ Error:', err.message)
  }
  process.exit(1)
})
