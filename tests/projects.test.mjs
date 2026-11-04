import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function load(file, imports = {}) {
  const exports = {};
  const compiled = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  runInNewContext(compiled, { exports, require: name => imports[name] ?? require(name) });
  return exports;
}
const data = load('../data/projects.ts');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const actions = load('../components/projects/project-modal.tsx', {
  '@/data/projects': data,
  '@/lib/project-dialog': {},
  './live-preview': {},
});
const { ProjectDetail } = load('../components/projects/project-detail.tsx', {
  '@/data/projects': data,
  './project-modal': actions,
  'next/link': { __esModule: true, default: ({ children, href }) => require('react').createElement('a', { href }, children) },
});
test('project lookup rejects unknown slugs and URLs stay unique', () => {
  assert.equal(data.getProject('unknown'), undefined);
  assert.equal(new Set(data.projects.map(p => p.slug)).size, 3);
});
test('public detail views keep deployment and repository boundaries', () => {
  for (const project of data.projects) {
    const html = renderToStaticMarkup(ProjectDetail({ project }));
    assert.ok(html.includes(project.title));
    assert.ok(!html.includes('github.com'));
    assert.ok(!html.includes('<img'));
    assert.equal(html.includes('Open externally'), project.slug !== 'avenor');
    if (project.liveUrl) assert.ok(html.includes(project.liveUrl));
    else assert.ok(html.includes('Local development'));
    assert.ok(html.includes('Implemented features'));
    assert.ok(html.includes('Technology stack'));
    assert.ok(html.includes('Roadmap'));
    assert.ok(!html.includes('<iframe'));
  }
});
test('case study model has verified groups, bounded features, statuses and milestones', () => {
  assert.deepEqual(Array.from(data.projects, p => p.slug), ['kitchain', 'elio', 'avenor']);
  for (const p of data.projects) {
    assert.ok(p.features.length >= 4 && p.features.length <= 6);
    for (const f of p.features) assert.ok(['Publicly accessible', 'Implemented locally', 'In development'].includes(f.state));
    for (const group of p.technologyGroups) assert.ok(group.label && group.items.length > 0);
    for (const item of [p.milestone, ...p.roadmap]) assert.ok(['Completed', 'In progress', 'Planned', 'Deferred'].includes(item.state));
    assert.ok(p.milestone.limitation && p.ownership && p.architecture.length);
    assert.notEqual(p.repository.visibility, 'public');
  }
  assert.equal(data.getProject('avenor').liveUrl, undefined);
});

test('iframe allowlist rejects changed URLs, local apps and blocked embedding', () => {
  const kitchain = data.getProject('kitchain');
  assert.equal(data.getPreviewUrl(kitchain), kitchain.liveUrl);
  assert.equal(data.getPreviewUrl(data.getProject('elio')), undefined);
  assert.equal(data.getPreviewUrl(data.getProject('avenor')), undefined);
  for (const liveUrl of ['javascript:alert(1)', 'https://kitchain-prod.vercel.app.evil.test/courts', kitchain.liveUrl + '?next=https://evil.test', '/projects/kitchain']) {
    assert.equal(data.getPreviewUrl({ ...kitchain, liveUrl }), undefined);
  }
  assert.equal(data.getPreviewUrl({ ...kitchain, deployment: 'local' }), undefined);
  assert.equal(data.getPreviewUrl({ ...kitchain, embedding: { state: 'blocked' } }), undefined);
});

test('preview uses restricted iframe policy and preserves external and return controls', () => {
  const { LivePreview } = load('../components/projects/live-preview.tsx', { '@/data/projects': data });
  const html = renderToStaticMarkup(React.createElement(LivePreview, { project: data.projects[0], onReturn() {}, expanded: false, onExpand() {} }));
  assert.ok(html.includes('sandbox="allow-scripts allow-same-origin allow-forms"'));
  assert.ok(!html.includes('allow-top-navigation'));
  assert.ok(!html.includes('allow-popups'));
  assert.ok(html.includes('referrerPolicy="no-referrer"'));
  assert.ok(html.includes('Kitchain interactive application'));
  for (const label of ['Project details', 'Maximize', 'Open externally', 'Loading application']) assert.ok(html.includes(label));
  const expanded = renderToStaticMarkup(React.createElement(LivePreview, { project: data.projects[0], expanded: true }));
  assert.ok(expanded.includes('Restore size'));
  assert.equal(renderToStaticMarkup(React.createElement(LivePreview, { project: data.projects[1] })), '');
});

test('standalone details do not mount an iframe before a visitor launches it', () => {
  const { ProjectModal } = actions;
  // Router is only used by event handlers; supply a read-only server-render stub.
  const mocked = load('../components/projects/project-modal.tsx', {
    '@/data/projects': data, '@/lib/project-dialog': {}, './live-preview': {},
    'next/navigation': { useRouter: () => ({}), usePathname: () => '/projects/kitchain' },
  });
  assert.equal(typeof ProjectModal, 'function');
  const html = renderToStaticMarkup(React.createElement(mocked.ProjectModal, { project: data.projects[0], modal: false }, 'Details'));
  assert.ok(html.includes('Details'));
  assert.ok(!html.includes('<iframe'));
});
test('project pages provide distinct canonical metadata and reject unknown slugs', async () => {
  const page = load('../app/projects/[slug]/page.tsx', {
    '@/data/projects': data, '@/components/projects/project-detail': { ProjectDetail },
    '@/components/layout/navigation': { Navigation: () => null },
    'next/navigation': { notFound: () => { throw Error('not found'); } },
  });
  for (const project of data.projects) {
    const metadata = await page.generateMetadata({ params: Promise.resolve({ slug: project.slug }) });
    assert.equal(metadata.alternates.canonical, '/projects/' + project.slug);
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
    assert.equal(metadata.description, project.description);
  }
  await assert.rejects(page.generateMetadata({ params: Promise.resolve({ slug: 'unknown' }) }), /not found/);
});

