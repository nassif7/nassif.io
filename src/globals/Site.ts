import type { GlobalConfig } from 'payload'
import { revalidateContent } from '@/lib/content/revalidate'

export const Site: GlobalConfig = {
  slug: 'site',
  admin: { group: 'Site' },
  hooks: { afterChange: [revalidateContent] },
  fields: [
    { name: 'title', type: 'text', required: true, defaultValue: 'Nassif Nassif' },
    { name: 'seoTitle', type: 'text', admin: { description: 'Browser tab title' } },
    { name: 'description', type: 'textarea', admin: { description: 'SEO meta description' } },
    { name: 'footerQuote', type: 'text', required: true, defaultValue: 'Built with love, shipped with hope 🙂' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
  ],
}
