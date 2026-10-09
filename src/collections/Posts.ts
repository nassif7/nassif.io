import type { CollectionConfig } from 'payload'
import { revalidateContent } from '@/lib/content/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'topic', 'featured', 'draft', 'updatedAt'],
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
    beforeValidate: [
      async ({ data, req, originalDoc }) => {
        if (data?.featured) {
          const others = await req.payload.find({
            collection: 'posts',
            where: { and: [{ featured: { equals: true } }, { id: { not_equals: originalDoc?.id ?? 0 } }] },
            limit: 1,
            depth: 0,
            req,
          })
          if (others.totalDocs > 0) {
            throw new Error(`"${others.docs[0].title}" is already featured. Un-feature it first.`)
          }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'updated', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
    {
      name: 'topic',
      type: 'relationship',
      relationTo: 'topics',
      validate: (v: unknown) => (v ? true : 'Pick a topic (add new ones under Writing options → Topics)'),
      admin: { description: 'Pick one. Edit the options under Writing options → Topics. These are the filter chips on /writing' },
    },
    { name: 'dek', type: 'textarea', required: true, maxLength: 200, admin: { description: 'Subtitle. Used in the list and on Home' } },
    { name: 'body', type: 'richText' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Exactly one: shown on Home' } },
    { name: 'draft', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Hidden on the site' } },
  ],
}
