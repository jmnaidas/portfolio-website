export type Project = {
  slug: string; title: string; category: string; tagline: string; description: string;
  overview: string; problem: string; status: string; statusDetail: string; liveUrl?: string;
  features?: string[]; technologies?: string[]; architecture?: string[];
};

export const projects: readonly Project[] = [
  {
    slug: 'kitchain', title: 'Kitchain', category: 'Hobby Project / Sports Technology',
    tagline: 'Your pickleball companion.',
    description: 'A pickleball companion platform, starting with court discovery.',
    overview: 'Kitchain brings court discovery into a focused experience for pickleball players. Related player tools remain part of its evolving product direction.',
    problem: 'Finding a place to play should be a simpler part of getting on court.',
    status: 'Deployed · evolving',
    statusDetail: 'A deployed application under active development. Court discovery is the current focus; broader player tools are still evolving.',
    liveUrl: 'https://kitchain-prod.vercel.app/courts',
  },
  {
    slug: 'elio', title: 'Elio', category: 'Business SaaS / Invoicing',
    tagline: 'Know what’s due. Know what’s next.',
    description: 'An invoicing and billing workspace for freelancers and businesses.',
    overview: 'Elio brings invoicing and receivables into one workspace for small service businesses, helping keep billing work organized.',
    problem: 'Keeping track of invoices and outstanding payments can become a workflow of its own.',
    status: 'Deployed · evolving',
    statusDetail: 'A deployed application receiving ongoing upgrades. Available workflows continue to evolve.',
    liveUrl: 'https://elio-app-pi.vercel.app/login',
  },
  {
    slug: 'avenor', title: 'Avenor', category: 'AI / Executive Automation',
    tagline: 'Executive workflows. Human oversight.',
    description: 'AI-assisted executive workflows with email intelligence and human approval controls.',
    overview: 'Avenor explores assisted executive workflows through a local pilot, with email intelligence and human review at its center.',
    problem: 'Email demands attention; useful automation needs clear boundaries and human approval.',
    status: 'Local development',
    statusDetail: 'An active local pilot with no public deployment. Email sending is simulated; it does not send real replies.',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}
