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
      name: 'year',
      type: 'text',
      admin: { description: 'Work-index year column, e.g. "2026" or "Ongoing"' },
    },
    { name: 'client', type: 'text', admin: { description: 'Case study only, e.g. "Marineria.it"' } },
    { name: 'role', type: 'text', admin: { description: 'e.g. "Lead frontend"' } },
    { name: 'platforms', type: 'text', admin: { description: 'e.g. "iOS · Android"' } },
    { name: 'status', type: 'text', admin: { description: 'e.g. "Shipped", "In progress"' } },
    {
      name: 'statusVariant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Live', value: 'live' },
        { label: 'In progress', value: 'wip' },
      ],
    },
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
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Work index display order' },
    },
    {
      name: 'caseStudy',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Render the full case-study template' },
    },
    {
      name: 'caseStudyContent',
      type: 'group',
      admin: {
        description: 'Case study page content',
        condition: (data) => Boolean(data?.caseStudy),
      },
      fields: [
        { name: 'eyebrow', type: 'text', admin: { description: 'e.g. "Case 01"' } },
        { name: 'category', type: 'text', admin: { description: 'e.g. "Client work · Mobile"' } },
        { name: 'lead', type: 'textarea' },
        {
          name: 'heroImages',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'url',
              type: 'text',
              admin: { description: 'Legacy URL. Leave blank if using upload above.' },
            },
            { name: 'alt', type: 'text' },
          ],
        },
        {
          name: 'sections',
          type: 'array',
          fields: [
            { name: 'sectionId', type: 'text', required: true, admin: { description: 'Anchor id, e.g. "brief"' } },
            { name: 'num', type: 'text', required: true, admin: { description: 'e.g. "01"' } },
            { name: 'eyebrow', type: 'text', required: true, admin: { description: 'e.g. "The brief"' } },
            { name: 'heading', type: 'text', required: true },
            { name: 'body', type: 'richText' },
            { name: 'pullQuote', type: 'textarea' },
            {
              name: 'spec',
              type: 'array',
              fields: [
                { name: 'k', type: 'text', required: true },
                { name: 'v', type: 'text', required: true },
              ],
            },
            { name: 'figureCaption', type: 'text' },
            {
              name: 'figureImages',
              type: 'array',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media' },
                {
                  name: 'url',
                  type: 'text',
                  admin: { description: 'Legacy URL. Leave blank if using upload above.' },
                },
                { name: 'alt', type: 'text' },
              ],
            },
            {
              name: 'outcomes',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    { name: 'body', type: 'richText' },
  ],
}
