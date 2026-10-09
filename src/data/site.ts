export type NavItem = { label: string; href: string; action?: 'contact' }

export const site = {
  title: 'Nassif Nassif',
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Writing', href: '/writing' },
    { label: 'About', href: '/about' },
    // opens the contact modal; there is no /contact page
    { label: 'Contact', href: '#contact', action: 'contact' },
  ] as NavItem[],
  footerQuote: 'Built with love, shipped with hope 🙂',
}
