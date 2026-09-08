import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'year', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'e.g. "Software Developer UI/UX"' } },
    {
      name: 'tag',
      type: 'text',
      admin: { description: 'Employer, or a project list for milestone entries, e.g. "Marineria.it · oneMore · BookMarquee"' },
    },
    { name: 'year', type: 'text', required: true, admin: { description: 'Track record year, e.g. "2022–25" or "Ongoing"' } },
    { name: 'cvWhen', type: 'text', admin: { description: 'CV date range, e.g. "Dec 2022 — Sep 2025". Falls back to Year.' } },
    { name: 'description', type: 'textarea', admin: { description: 'Track record prose (homepage)' } },
    {
      name: 'bullets',
      type: 'array',
      admin: { description: 'CV detail bullets' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'showInTrackRecord',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'current',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Filled timeline node — ongoing/current entry' },
    },
    {
      name: 'showInCV',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
