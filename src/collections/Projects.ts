import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'wip', 'brainstorm', 'updatedAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'type', type: 'text' },
    { name: 'desc', type: 'textarea' },
    {
      name: 'categories',
      type: 'array',
      fields: [{ name: 'category', type: 'text', required: true }],
    },
    {
      name: 'stack',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'images',
      type: 'array',
      admin: { description: 'Image URLs' },
      fields: [{ name: 'url', type: 'text', required: true }],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Website', value: 'Website' },
            { label: 'App Store', value: 'App Store' },
            { label: 'Google Play', value: 'Google Play' },
            { label: 'Chrome Web Store', value: 'Chrome Web Store' },
            { label: 'VS Code Marketplace', value: 'VS Code Marketplace' },
            { label: 'GitHub', value: 'GitHub' },
            { label: 'npm', value: 'npm' },
          ],
        },
        { name: 'url', type: 'text' },
        { name: 'comingSoon', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'privacyPolicy',
      type: 'text',
      admin: { description: 'Full public URL, e.g. https://nassif.io/projects/one-more/privacy' },
    },
    { name: 'wip', type: 'checkbox', defaultValue: false },
    { name: 'brainstorm', type: 'checkbox', defaultValue: false },
    { name: 'body', type: 'richText' },
  ],
}
