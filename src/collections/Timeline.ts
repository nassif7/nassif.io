import type { CollectionConfig } from 'payload'
import { revalidateContent } from '@/lib/content/revalidate'

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'org', 'start', 'end', 'kind', 'current'],
  },
  hooks: { afterChange: [revalidateContent], afterDelete: [revalidateContent] },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'e.g. "Software Developer UI/UX"' } },
    { name: 'org', type: 'text', required: true, admin: { description: 'Employer, school or project list' } },
    { name: 'start', type: 'number', required: true },
    { name: 'end', type: 'number', admin: { description: 'Leave empty if ongoing (shows "Now")' } },
    { name: 'label', type: 'text', admin: { description: 'Display override for the year column, e.g. "Now"' } },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'work',
      options: ['work', 'project', 'education', 'volunteer', 'research'].map(k => ({ label: k, value: k })),
    },
    { name: 'summary', type: 'textarea', admin: { description: 'One line. Education usually has none' } },
    {
      name: 'bullets',
      type: 'array',
      admin: { description: 'CV detail bullets (CV only)' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'cvWhen', type: 'text', admin: { description: 'CV date range, e.g. "Dec 2022 — Sep 2025". Falls back to the year column' } },
    { name: 'current', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Filled accent dot' } },
    { name: 'showOnCV', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
