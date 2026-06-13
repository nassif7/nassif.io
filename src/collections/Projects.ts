import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'hidden', 'featured', 'wip', 'updatedAt'],
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
      admin: { description: 'Project images' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'url',
          type: 'text',
          admin: { description: 'Legacy URL (Sanity CDN). Leave blank if using upload above.' },
        },
      ],
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
    { name: 'hidden', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description: 'Image shown in the home grid.',
      },
    },
    {
      name: 'featuredOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Grid slot (1–5)',
      },
    },
    { name: 'wip', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'brainstorm', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'body', type: 'richText' },
  ],
}
