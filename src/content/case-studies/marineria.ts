export interface CaseStudySection {
  id: string
  num: string
  eyebrow: string
  heading: string
  paragraphs: string[]
  pullQuote?: string
  spec?: { k: string; v: string }[]
  figure?: { images: { src: string; alt: string }[]; caption: string }
  outcomes?: { value: string; label: string }[]
}

export const marineriaCaseStudy = {
  eyebrow: 'Case 01',
  category: 'Client work · Mobile',
  title: 'Marineria.it',
  lead: 'A recruitment app for the Italian maritime industry, serving three different audiences from a single codebase — and telling candidates the truth when they don’t qualify.',
  heroImages: [
    { src: '/projects/marineria/marineria1.avif', alt: 'Marineria.it app — login and job listing screens' },
    { src: '/projects/marineria/marineria3.avif', alt: 'Marineria.it app — crew profile and application screens' },
  ],
  next: {
    eyebrow: 'Case 02 · Side project',
    title: 'BookMarquee — a knowledge base with no backend',
    href: '/projects/bookmarquee',
  },
  sections: [
    {
      id: 'brief',
      num: '01',
      eyebrow: 'The brief',
      heading: 'A web recruitment platform needed to become a mobile product.',
      paragraphs: [
        'Marineria.it is an established Italian maritime recruitment platform. Ship operators post positions; crew members — deckhands, engineers, officers — apply for them. The business worked on the web, but the people using it don’t sit at desks. They’re on vessels, in ports, between contracts, on phones.',
        'The brief was a native-feeling app for iOS and Android covering the full platform: browsing, applying, profile management, and the recruiter-side tooling. **One codebase, two stores, two languages.**',
      ],
      spec: [
        { k: 'Audiences', v: 'Guests, crew members, recruiters' },
        { k: 'Languages', v: 'Italian and English, in-app toggle' },
        { k: 'Auth', v: 'OTP or password, registration inline' },
        { k: 'Stack', v: 'TypeScript, React Native, Expo' },
      ],
    },
    {
      id: 'problem',
      num: '02',
      eyebrow: 'The problem',
      heading: 'Three audiences, opposite needs, one app.',
      paragraphs: [
        'Most recruitment apps solve for one side of the market and treat the other as an admin panel. Here both sides were first-class, plus a third group that mattered commercially: people who wanted to look before committing to anything.',
        'Guests needed to browse and filter the entire job board without an account — the platform’s supply of candidates depends on it. Crew needed to build a profile once and apply repeatedly with it. Recruiters needed the inverse: search across candidates by skill and location, then make contact directly.',
      ],
      pullQuote: 'The hard part wasn’t the feature list. It was making three products feel like one, without a mode switch the user has to reason about.',
    },
    {
      id: 'approach',
      num: '03',
      eyebrow: 'Approach',
      heading: 'Let the account type shape the app, not a menu.',
      paragraphs: [
        'Rather than a role picker at launch, the app resolves capability from the session and lets each surface adapt. A guest sees the board and a prompt where an action would be. A crew member sees the same board with apply enabled. A recruiter sees the board plus the candidate search it mirrors.',
        'Registration lives inside the login screen instead of behind a separate flow — the moment someone needs an account is the moment they’re trying to do something, so the account creation happens there rather than as a detour.',
      ],
      figure: {
        images: [
          { src: '/projects/marineria/marineria3.avif', alt: 'Job listing and filtering screen' },
          { src: '/projects/marineria/marineria1.avif', alt: 'Login screen with OTP and guest browsing' },
        ],
        caption: 'Fig. 01 — The board is the shared surface across all three audiences; capability changes, layout doesn’t.',
      },
    },
    {
      id: 'build',
      num: '04',
      eyebrow: 'What I built',
      heading: 'The parts that decide whether an app gets used twice.',
      paragraphs: [
        '**Real-time listings with filters** that hold their state across navigation, because a candidate scanning a board and opening a role expects to come back to the same list.',
        '**Honest qualification feedback.** When a crew member doesn’t meet a position’s requirements, the app says which requirement and why — instead of accepting the application into silence. This was the decision I pushed hardest for, and the one most likely to be cut by default.',
        '**Role-targeted push notifications:** crew are notified when a matching position is posted, recruiters when someone applies. Two audiences, two triggers, one notification layer.',
        '**Bilingual throughout,** with the toggle in settings rather than a launch-time choice — maritime crews are multinational and language preference isn’t a property of the device.',
      ],
    },
    {
      id: 'outcome',
      num: '05',
      eyebrow: 'Outcome',
      heading: 'Shipped to both stores, in both languages.',
      paragraphs: [
        'The app went live on iOS and Android with the full platform available on mobile, including guest browsing that requires no account at all. The single-codebase decision held: feature work ships to both platforms at once, and the recruiter tooling did not need a separate product.',
      ],
      outcomes: [
        { value: '2', label: 'Platforms, one codebase' },
        { value: '3', label: 'Audiences, no mode switch' },
        { value: '2', label: 'Languages, toggleable' },
      ],
    },
  ] satisfies CaseStudySection[],
}
