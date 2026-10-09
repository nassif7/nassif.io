import type { GlobalConfig } from 'payload'
import { revalidateContent } from '@/lib/content/revalidate'

export const Profile: GlobalConfig = {
  slug: 'profile',
  admin: { group: 'Site' },
  hooks: { afterChange: [revalidateContent] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, admin: { description: 'e.g. "Product engineer"' } },
    { name: 'city', type: 'text', required: true },
    { name: 'timezone', type: 'text', required: true, defaultValue: 'Europe/Berlin' },
    { name: 'coords', type: 'text', admin: { description: 'e.g. "52.52° N · 13.40° E"' } },
    { name: 'since', type: 'number', admin: { description: 'e.g. 2016' } },
    {
      name: 'headline',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text', required: true, admin: { description: 'Heavy, e.g. "Product"' } },
        { name: 'line2', type: 'text', required: true, admin: { description: 'Thin, e.g. "engineer,"' } },
        { name: 'line3', type: 'text', required: true, admin: { description: 'e.g. "whole thing — "' } },
        { name: 'line3Muted', type: 'text', required: true, admin: { description: 'Greyed tail, e.g. "not a layer of it."' } },
      ],
    },
    { name: 'intro', type: 'textarea', required: true, admin: { description: 'Home one-liner' } },
    {
      name: 'aboutLede',
      type: 'group',
      fields: [
        { name: 'main', type: 'text', required: true },
        { name: 'muted', type: 'text', admin: { description: 'Greyed tail' } },
      ],
    },
    { name: 'aboutBody', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true, admin: { description: 'Paragraph. <strong> allowed' } }] },
    {
      name: 'languages',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'level', type: 'text', required: true },
      ],
    },
    { name: 'engagement', type: 'text', admin: { description: 'e.g. "Contract · Full-time"' } },
    {
      name: 'availability',
      type: 'group',
      fields: [
        { name: 'open', type: 'checkbox', defaultValue: true },
        { name: 'label', type: 'text', admin: { description: 'e.g. "Available Q4 2026"' } },
      ],
    },
    { name: 'email', type: 'email', required: true },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'cvPdf', type: 'text', defaultValue: '/nassif-nassif-cv.pdf', admin: { description: 'Path or URL of the CV PDF' } },
  ],
}
