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
const { renderToStaticMarkup } = require('react-dom/server');
const { ProjectDetail } = load('../components/projects/project-detail.tsx', {
  '@/data/projects': data,
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
    assert.equal(html.includes('Visit application'), project.slug !== 'avenor');
    if (project.liveUrl) assert.ok(html.includes(project.liveUrl));
    else assert.ok(html.includes('Local development'));
    assert.ok(!html.includes('Implemented features'));
  }
});
test('optional verified content renders when supplied', () => {
  const html = renderToStaticMarkup(ProjectDetail({ project: { ...data.projects[0], features: ['Verified feature'], technologies: ['Verified stack'], architecture: ['Verified architecture'] } }));
  for (const text of ['Verified feature', 'Verified stack', 'Verified architecture']) assert.ok(html.includes(text));
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

