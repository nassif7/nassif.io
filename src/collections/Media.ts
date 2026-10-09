import type { CollectionConfig } from 'payload'
import path from 'path'
import { revalidateContent } from '@/lib/content/revalidate'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: { afterChange: [revalidateContent], afterDelete: [revalidateContent] },
  upload: {
    staticDir: process.env.VERCEL
      ? '/tmp/payload-media'
      : path.resolve(dirname, '../../public/media'),
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
    resizeOptions: {
      width: 2400,
      withoutEnlargement: true,
    },
  },
  fields: [
    { name: 'alt', type: 'text' },
  ],
}
