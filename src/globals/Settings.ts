import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: { group: 'Site' },
  fields: [
    { name: 'email', type: 'text', required: true },
    { name: 'location', type: 'text', required: true, admin: { description: 'e.g. "Berlin"' } },
    { name: 'timezone', type: 'text', required: true, admin: { description: 'e.g. "CET"' } },
    { name: 'availability', type: 'text', required: true, admin: { description: 'e.g. "Available for Q4 2026"' } },
    { name: 'role', type: 'text', required: true, admin: { description: 'Masthead tagline, e.g. "Software Engineer"' } },
    {
      name: 'seoTitle',
      type: 'text',
      admin: { description: 'Browser tab title, e.g. "Nassif Nassif — Software Engineer, Berlin"' },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      admin: { description: 'SEO meta description' },
    },
    { name: 'github', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'footerTagline', type: 'textarea' },
    { name: 'footerJoke', type: 'text', admin: { description: 'The one sanctioned joke. Keep it in the footer.' } },
    {
      name: 'caseStudyCtaEyebrow',
      type: 'text',
      admin: { description: 'Shared closing CTA band on every case study' },
    },
    { name: 'caseStudyCtaHeading', type: 'text' },
    { name: 'caseStudyCtaLead', type: 'textarea' },
  ],
}
