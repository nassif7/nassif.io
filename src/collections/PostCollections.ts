import type { CollectionConfig } from 'payload'

export const PostCollections: CollectionConfig = {
  slug: 'post-collections',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
  ],
}
