import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const React = require('react');
function load(file, imports = {}, environment = {}) {
  const exports = {};
  runInNewContext(ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, { exports, require: name => imports[name] ?? require(name), ...environment });
  return exports;
}
const data = load('../data/projects.ts');
function harness(modal = true, slug = 'kitchain') {
  let cursor = 0;
  const slots = [];
  const calls = [];
  const history = { length: 0 };
  let path = `/projects/${slug}`;
  const preview = () => null;
  const { ProjectModal } = load('../components/projects/project-modal.tsx', {
    react: { ...React,
      useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], value => { slots[i] = typeof value === 'function' ? value(slots[i]) : value; }]; },
      useRef(initial) { const i = cursor++; if (!(i in slots)) slots[i] = { current: initial }; return slots[i]; },
      useEffect() {},
    },
    'next/navigation': { usePathname: () => path, useRouter: () => ({ back: () => calls.push('back'), replace: url => calls.push(url) }) },
    '@/data/projects': data, '@/lib/project-dialog': {}, './live-preview': { LivePreview: preview },
  }, { window: { history }, document: { getElementById: () => ({ focus: () => calls.push('focus') }) }, requestAnimationFrame: fn => fn() });
  const render = () => { cursor = 0; return ProjectModal({ project: data.getProject(slug), modal, children: 'Details' }); };
  const nodes = tree => !tree || typeof tree !== 'object' ? [] : [tree, ...React.Children.toArray(tree.props?.children).flatMap(nodes)];
  return { render, calls, history, setPath: value => { path = value; }, preview,
    find: (tree, predicate) => nodes(tree).find(predicate) };
}
test('launch is opt-in; return removes preview and restores launcher focus; maximize toggles', () => {
  const h = harness(); let tree = h.render();
  assert.equal(h.find(tree, n => n.type === h.preview), undefined);
  tree.props.value(); tree = h.render();
  let preview = h.find(tree, n => n.type === h.preview);
  assert.equal(preview.props.expanded, false);
  preview.props.onExpand(); tree = h.render(); preview = h.find(tree, n => n.type === h.preview);
  assert.equal(preview.props.expanded, true);
  preview.props.onReturn(); tree = h.render();
  assert.equal(h.find(tree, n => n.type === h.preview), undefined);
  assert.ok(h.calls.includes('focus'));
});
test('Escape and Close navigate back; iframe history cannot strand explicit close', () => {
  const h = harness(); const tree = h.render();
  let cancelled = false;
  h.find(tree, n => n.type === 'dialog').props.onCancel({ preventDefault: () => { cancelled = true; } });
  assert.equal(cancelled, true); assert.deepEqual(h.calls, ['back']);
  tree.props.value();
  h.find(tree, n => n.type === 'button').props.onClick();
  assert.equal(h.calls.at(-1), '/#independent');
});
test('leaving a project URL removes a preview even when a parallel slot retains its tree', () => {
  const h = harness(); h.render().props.value();
  assert.ok(h.find(h.render(), n => n.type === h.preview));
  h.setPath('/');
  assert.equal(h.find(h.render(), n => n.type === h.preview), undefined);
});
test('standalone preview closes locally and blocked/local projects cannot launch', () => {
  const h = harness(false); let tree = h.render(); tree.props.value(); tree = h.render();
  h.find(tree, n => n.type === 'button').props.onClick();
  assert.equal(h.find(h.render(), n => n.type === h.preview), undefined);
  assert.ok(!h.calls.includes('back'));
  for (const slug of ['elio', 'avenor']) {
    const blocked = harness(true, slug); const tree = blocked.render(); tree.props.value();
    assert.equal(blocked.find(blocked.render(), n => n.type === blocked.preview), undefined);
  }
});
