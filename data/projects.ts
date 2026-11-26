export type ProgressState = 'Completed' | 'In progress' | 'Planned' | 'Deferred';
export type FeatureState = 'Publicly accessible' | 'Implemented locally' | 'In development';
export type Project = {
  slug: string; title: string; category: string; tagline: string; description: string;
  overview: string; problem: string; status: string; statusDetail: string; liveUrl?: string;
  deployment: 'deployed' | 'local';
  embedding: { state: 'verified' | 'blocked' | 'unavailable'; note: string };
  technologyGroups: { label: string; items: string[] }[];
  architecture: { title: string; detail: string }[];
  features: { title: string; detail: string; state: FeatureState }[];
  milestone: { name: string; state: ProgressState; detail: string; limitation: string };
  roadmap: { title: string; state: ProgressState; detail: string }[];
  ownership: string;
  repository: { visibility: 'private' | 'hidden' | 'public'; url?: string };
  media?: { src: string; alt: string }[];
};

export const projects: readonly Project[] = [
  {
    slug: 'kitchain', title: 'Kitchain', category: 'Hobby Project / Sports Technology',
    tagline: 'Your pickleball companion.',
    description: 'Court discovery, play coordination, and evidence-based paddle exploration.',
    overview: 'Kitchain connects court discovery, play coordination, and Gear tools for pickleball players. PaddleMatch explains physical-specification matches while preserving gaps and conflicts in the evidence.',
    problem: 'Finding a place to play should be a simpler part of getting on court.',
    status: 'Deployed · evolving',
    statusDetail: 'A deployed application under active development. Courts, Play, and Gear evolve incrementally; catalog coverage and broader player tools remain ongoing work.',
    liveUrl: 'https://kitchain-prod.vercel.app/courts',
    deployment: 'deployed',
    embedding: { state: 'verified', note: 'Explore the public application. Availability and data depend on the application service. Use Open externally for unrestricted browsing.' },
    technologyGroups: [
      { label: 'Frontend', items: ['Angular 22', 'TypeScript', 'SCSS', 'RxJS'] },
      { label: 'API & data', items: ['ASP.NET Core 8', 'EF Core', 'PostgreSQL', 'SignalR'] },
      { label: 'Delivery & quality', items: ['Vercel', 'Render', 'Docker', 'Vitest', 'xUnit'] },
    ],
    architecture: [
      { title: 'A modular monolith', detail: 'An Angular client calls a layered ASP.NET Core API. Application services depend on domain contracts; EF Core implements persistence through Infrastructure.' },
      { title: 'Shareable discovery', detail: 'Filters and pagination live in the route. Published-data queries, explicit DTOs, validation, and cancellation keep discovery predictable.' },
      { title: 'Evidence before recommendations', detail: 'Gear separates paddle models, variants, and source-attributed observations. Comparison preserves missing and conflicting data instead of inventing a winner.' },
    ],
    features: [
      { title: 'Court discovery', detail: 'A public Courts interface with venue browsing and discovery controls.', state: 'Publicly accessible' },
      { title: 'Venue detail and submissions', detail: 'Court detail routes and submission/review flows are present in the local frontend and API.', state: 'Implemented locally' },
      { title: 'Play session coordination', detail: 'Session codes, guests, queue/game operations, scoring endpoints, and SignalR change notifications.', state: 'Implemented locally' },
      { title: 'Paddle catalog and details', detail: 'Published catalog queries, variant specifications, filtering, and attributed evidence.', state: 'Implemented locally' },
      { title: 'Two- or three-paddle comparison', detail: 'Shareable variant selection, differences filtering, and explicit unavailable-data states.', state: 'Implemented locally' },
      { title: 'Explainable PaddleMatch', detail: 'Physical preferences, deterministic matching, and separate match, mismatch, unknown, and evidence-coverage explanations. Answers stay in browser memory.', state: 'Implemented locally' },
    ],
    milestone: { name: 'Gear G5C · PaddleMatch data retrieval', state: 'Completed', detail: 'PaddleMatch uses a bounded, cursor-paginated public projection instead of fetching every paddle detail. Ranking and source-attributed explanations are preserved.', limitation: 'Real catalog preparation remains incomplete pending source clearance. Matching reflects available physical specifications, not validated performance or suitability guarantees. Booking integrations and broader authorization remain unfinished.' },
    roadmap: [
      { title: 'Court discovery foundation', state: 'Completed', detail: 'API-backed exploration, filtering, and venue details in the local implementation.' },
      { title: 'Gear catalog → comparison', state: 'Completed', detail: 'Source-attributed catalog, detail, and G4 comparison workflows.' },
      { title: 'G5A–G5C · Explainable PaddleMatch', state: 'Completed', detail: 'Questionnaire, evidence-aware ranking, comparison integration, and bounded recommendation-data retrieval.' },
      { title: 'G5D · Real catalog preparation', state: 'In progress', detail: 'Source clearance and catalog validation remain outstanding. Research candidates are not published product evidence.' },
      { title: 'Connected player journey', state: 'Planned', detail: 'Provider availability, booking integrations, accounts, and broader player tools remain product direction.' },
    ],
    ownership: 'My work spans the Angular experience, .NET application services, data modeling, and incremental product delivery. Repository history records this work without asserting exclusive authorship.',
    repository: { visibility: 'hidden' },
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
    deployment: 'deployed',
    embedding: { state: 'blocked', note: 'Elio protects its sign-in experience from embedding. Open the application in a separate tab to explore it securely.' },
    technologyGroups: [
      { label: 'Frontend', items: ['Angular 22', 'TypeScript', 'Signals', 'SCSS'] },
      { label: 'API & data', items: ['ASP.NET Core 10', 'EF Core', 'PostgreSQL', 'ASP.NET Identity'] },
      { label: 'Integrations & quality', items: ['PDFsharp / MigraDoc', 'Resend adapter', 'Vercel', 'Render', 'Vitest', 'xUnit'] },
    ],
    architecture: [
      { title: 'Tenant-aware boundaries', detail: 'A same-origin API gateway connects Angular to layered .NET services. Cookie sessions, CSRF checks, and live organization membership protect business operations.' },
      { title: 'Stable financial records', detail: 'Server-authoritative decimal totals, transactional invoice numbering, and frozen issued snapshots separate drafts from finalized documents.' },
      { title: 'Explicit delivery and payment history', detail: 'Durable delivery attempts surround external email calls. Immutable manual payment records and database locking protect receivable balances; Elio does not process charges.' },
    ],
    features: [
      { title: 'Clients and reusable services', detail: 'Organization-scoped contacts and service libraries, with separate PHP and USD amounts.', state: 'Implemented locally' },
      { title: 'Draft → issued invoice', detail: 'Editable line items, server totals, immutable finalization, and downloadable PDFs.', state: 'Implemented locally' },
      { title: 'Receivables and payments', detail: 'Manual external-payment records, partial balances, due dates, and aging.', state: 'Implemented locally' },
      { title: 'Delivery and reminders', detail: 'Audited delivery and manual reminders through a provider boundary; provider acceptance is not proof of inbox delivery.', state: 'Implemented locally' },
      { title: 'Dashboard and read-only demo', detail: 'A publicly accessible synthetic workspace with currency-specific metrics. Mutation guards and expiring sessions are verified in the local implementation.', state: 'Publicly accessible' },
    ],
    milestone: { name: 'Phase 9C · Secure portfolio demo', state: 'Completed', detail: 'The latest local commit implements a read-only demo with tenant isolation, a dedicated Demo role, and layered mutation protection.', limitation: 'Public demo entry and its synthetic dashboard have been verified. Full production security acceptance and real-account workflows remain separate validation work.' },
    roadmap: [
      { title: 'Core billing workflows', state: 'Completed', detail: 'Clients, services, invoice issuance, manual payments, and dashboard projections.' },
      { title: 'Secure demo implementation', state: 'Completed', detail: 'Synthetic workspace and read-only session controls are implemented locally.' },
      { title: 'Production demo acceptance', state: 'In progress', detail: 'Public entry and the synthetic dashboard work; broader configuration and workflow acceptance remain separate checks.' },
      { title: 'Beyond V1', state: 'Deferred', detail: 'Recurring billing, automated reminders, and customer portals remain outside the documented V1 scope.' },
    ],
    ownership: 'My contributions cover the billing domain, tenant-aware APIs, Angular workflows, PDF/email integration, and deployment hardening. This describes repository-backed work, not exclusive authorship.',
    repository: { visibility: 'hidden' },
  },
  {
    slug: 'avenor', title: 'Avenor', category: 'AI / Executive Automation',
    tagline: 'Executive workflows. Human oversight.',
    description: 'A local executive workspace for email, read-only Calendar, and scheduled briefings.',
    overview: 'Avenor combines human-reviewed email workflows, read-only Calendar, and deterministic executive briefings in a local assisted pilot.',
    problem: 'Email demands attention; useful automation needs clear boundaries and human approval.',
    status: 'Local development',
    statusDetail: 'An active local pilot with no public deployment. M3 Calendar and M4 Briefings are accepted locally. Reply sending remains simulated; live briefing email delivery is unverified.',
    deployment: 'local',
    embedding: { state: 'unavailable', note: 'A live preview will be available only after a public deployment is authorized.' },
    technologyGroups: [
      { label: 'Frontend', items: ['Angular 22', 'TypeScript', 'SCSS'] },
      { label: 'Backend & identity', items: ['ASP.NET Core 10', 'EF Core', 'PostgreSQL', 'ASP.NET Identity', '.NET Worker'] },
      { label: 'Integrations & quality', items: ['Ollama', 'Gmail / Calendar read-only OAuth', 'SMTP adapter (unverified live)', 'Docker', 'xUnit', 'Vitest', 'Playwright'] },
    ],
    architecture: [
      { title: 'Approval is the authority', detail: 'Versioned human decisions and durable job intent commit together. Organization scoping and CSRF protection apply independently of AI output.' },
      { title: 'Recover without duplicate dispatch', detail: 'A PostgreSQL-backed worker uses row locking, leases, and fencing tokens. Ambiguous post-dispatch recovery becomes Uncertain instead of silently retrying.' },
      { title: 'Bounded AI assistance', detail: 'A provider boundary separates local Ollama from deterministic demo responses. Read-only Gmail imports require consent; suggestions need human review. Gemini is not a live integration.' },
      { title: 'Deterministic briefings', detail: 'Typed snapshots combine authorized source records and human-confirmed information. Durable schedules and revision history support morning/evening briefings without depending on generated AI narratives.' },
    ],
    features: [
      { title: 'Approval Center and simulated dispatch', detail: 'Versioned human decisions, durable jobs, bounded retries, and uncertain-outcome handling. Real replies are not sent.', state: 'Implemented locally' },
      { title: 'Read-only Gmail and AI review', detail: 'Opt-in imports, retention controls, local inference, and unconfirmed suggestions requiring human review. AI is disabled by default.', state: 'Implemented locally' },
      { title: 'Read-only Google Calendar', detail: 'Accepted M3 integration supplies calendar context without creating or changing events.', state: 'Implemented locally' },
      { title: 'Executive briefing snapshots', detail: 'Deterministic morning/evening views, saved history, and new revisions over authorized source information.', state: 'Implemented locally' },
      { title: 'Scheduled briefings and Preview delivery', detail: 'M4 scheduling and recipient-confirmed local Preview email delivery are accepted. The disabled-by-default SMTP adapter has not been verified live.', state: 'Implemented locally' },
      { title: 'Quality evaluation workflow', detail: 'Synthetic cases, regression evidence, and proposed semantic scoring with independent-review gates.', state: 'In development' },
    ],
    milestone: { name: 'M4 · Executive Briefings', state: 'Completed', detail: 'M4A–M4D are closed and accepted for local development: deterministic snapshots, history, scheduling, and implementation plus local Preview delivery verification.', limitation: 'This is local acceptance, not production readiness. Live SMTP/provider delivery and inbox receipt remain unverified; M2 AI quality remains FAIL. Real reply sending and Telegram remain outstanding.' },
    roadmap: [
      { title: 'M1 · Secure pilot foundation', state: 'Completed', detail: 'Approval workflow, organization boundaries, and durable simulated jobs.' },
      { title: 'M2 · Email intelligence quality', state: 'In progress', detail: 'Local AI and Gmail integration exist; reliable extraction and independent evaluation remain gates.' },
      { title: 'M3 · Read-only Calendar', state: 'Completed', detail: 'Calendar integration accepted for the local pilot.' },
      { title: 'M4 · Executive Briefings', state: 'Completed', detail: 'In-app snapshots, scheduling, and local Preview delivery; live SMTP acceptance is deferred.' },
      { title: 'M5/M6 · Actions and Telegram', state: 'Planned', detail: 'Consolidated follow-ups, Telegram, real reply workflows, and production hardening remain future work.' },
    ],
    ownership: 'My work includes the local application foundation, approval/job architecture, AI provider integration, and evaluation preparation. Independent acceptance and production authorization remain separate responsibilities.',
    repository: { visibility: 'hidden' },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

// Exact allowlist: never accept iframe URLs from query strings or user input.
const previewUrls: Readonly<Record<string, string>> = {
  kitchain: 'https://kitchain-prod.vercel.app/courts',
};
export function getPreviewUrl(project: Project): string | undefined {
  const approved = previewUrls[project.slug];
  return project.deployment === 'deployed' && project.embedding.state === 'verified' && approved === project.liveUrl ? approved : undefined;
}
