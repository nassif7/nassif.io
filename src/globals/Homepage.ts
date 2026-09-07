import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: 'Site' },
  fields: [
    {
      name: 'heroEyebrow',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Nassif Nassif — Software Engineer"' },
    },
    { name: 'heroHeading', type: 'text', required: true },
    { name: 'heroLead', type: 'textarea', required: true },
    { name: 'heroPrimaryButton', type: 'text', admin: { description: 'Links to #work' } },
    { name: 'heroSecondaryButton', type: 'text', admin: { description: 'Links to /cv' } },
    {
      name: 'facts',
      type: 'array',
      admin: { description: 'Hero right column definition list' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      admin: { description: 'Hero stat strip' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    { name: 'servicesSectionTitle', type: 'text', admin: { description: '"02" section heading' } },
    { name: 'servicesSectionLead', type: 'textarea' },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'index', type: 'text', required: true, admin: { description: 'e.g. "01 / Web"' } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
    { name: 'workSectionTitle', type: 'text', admin: { description: '"03 / Selected work" heading' } },
    { name: 'workSectionLead', type: 'textarea' },
    { name: 'indexSectionTitle', type: 'text', admin: { description: '"04 / Work index" heading' } },
    { name: 'trackSectionTitle', type: 'text', admin: { description: '"05 / Track record" heading' } },
    { name: 'writingSectionTitle', type: 'text', admin: { description: '"06 / Writing" heading' } },
    { name: 'writingSectionLead', type: 'textarea' },
    { name: 'ctaEyebrow', type: 'text' },
    { name: 'ctaHeading', type: 'text', required: true },
    { name: 'ctaLead', type: 'textarea', required: true },
  ],
}
