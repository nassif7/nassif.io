import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'featured', 'hidden', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'date', type: 'date', required: true },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'collections',
      type: 'relationship',
      relationTo: 'post-collections',
      hasMany: true,
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'hidden', type: 'checkbox', defaultValue: false },
    { name: 'body', type: 'richText' },
  ],
}
