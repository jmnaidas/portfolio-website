import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function load(file, environment = {}, imports = {}) {
  const exports = {};
  const compiled = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  runInNewContext(compiled, { exports, require: name => imports[name] ?? require(name), ...environment });
  return exports;
}
const theme = load('../lib/theme.ts');
function environment(systemDark, saved, blocked = false) {
  const listeners = new Map();
  const storage = new Map(saved === undefined ? [] : [[theme.themeStorageKey, saved]]);
  const media = { matches: systemDark, addEventListener: (name, fn) => listeners.set('media:' + name, fn), removeEventListener: name => listeners.delete('media:' + name) };
  const context = {
    document: { documentElement: { dataset: {} } },
    localStorage: { getItem: key => { if (blocked) throw Error('Blocked storage'); return storage.get(key) ?? null; }, setItem: (key, value) => { if (blocked) throw Error('Blocked storage'); storage.set(key, value); } },
    matchMedia: () => media,
    window: { addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) },
    MutationObserver: class { observe() {} disconnect() {} },
  };
  runInNewContext(theme.themeBootstrap, context);
  return { context, media, listeners, storage };
}
for (const dark of [true, false]) {
  test(`pre-paint bootstrap follows ${dark ? 'dark' : 'light'} OS preference`, () => {
    assert.equal(environment(dark).context.document.documentElement.dataset.theme, dark ? 'dark' : 'light');
  });
  test(`saved choice overrides ${dark ? 'dark' : 'light'} OS preference`, () => {
    const preference = dark ? 'light' : 'dark';
    assert.equal(environment(dark, preference).context.document.documentElement.dataset.theme, preference);
  });
}
test('invalid or inaccessible storage safely falls back to the OS preference', () => {
  assert.equal(environment(false, 'invalid').context.document.documentElement.dataset.theme, 'light');
  assert.equal(environment(true, undefined, true).context.document.documentElement.dataset.theme, 'dark');
});
test('live OS changes follow system until a manual choice; storage changes sync and listeners clean up', () => {
  const env = environment(true);
  let unsubscribe;
  const component = load('../components/ui/theme.tsx', env.context, {
    '@/lib/theme': theme,
    react: { useSyncExternalStore: (subscribe, snapshot) => { unsubscribe ??= subscribe(() => {}); return snapshot(); } },
  });
  component.useTheme();
  env.media.matches = false;
  env.listeners.get('media:change')();
  assert.equal(component.useTheme(), 'light');
  component.ThemeToggle().props.onClick();
  assert.equal(component.useTheme(), 'dark');
  assert.equal(env.storage.get(theme.themeStorageKey), 'dark');
  env.listeners.get('media:change')();
  assert.equal(component.useTheme(), 'dark');
  env.storage.set(theme.themeStorageKey, 'light');
  env.listeners.get('storage')({ key: theme.themeStorageKey });
  assert.equal(component.useTheme(), 'light');
  env.storage.delete(theme.themeStorageKey);
  env.media.matches = true;
  env.listeners.get('storage')({ key: theme.themeStorageKey });
  assert.equal(component.useTheme(), 'dark');
  unsubscribe();
  assert.equal(env.listeners.size, 0);
});

test('manual theme remains usable when persistence is blocked', () => {
  const env = environment(true, undefined, true);
  let cleanup;
  const component = load('../components/ui/theme.tsx', env.context, {
    '@/lib/theme': theme,
    react: { useSyncExternalStore: (subscribe, snapshot) => { cleanup ??= subscribe(() => {}); return snapshot(); } },
  });
  component.ThemeToggle().props.onClick();
  assert.equal(component.useTheme(), 'light');
  env.listeners.get('media:change')();
  assert.equal(component.useTheme(), 'light');
  cleanup();
});

test('reduced-motion and unavailable WebGL render the static sculpture; full motion permits the scene', () => {
  for (const [reduced, available, expected] of [[true, true, 'Fallback'], [false, false, 'Fallback'], [false, true, 'SceneBoundary']]) {
    let stateCall = 0;
    const component = load('../components/three/hero-visual.tsx', {}, {
      'next/dynamic': () => function ArchitectureMock() {},
      '@/components/ui/theme': { useTheme: () => 'light' },
      'motion/react': { useInView: () => true, useReducedMotion: () => reduced },
      react: { ...require('react'), useRef: () => ({ current: null }), useEffect: () => {}, useState: () => [stateCall++ === 0 ? available : true, () => {}] },
    });
    const scene = component.HeroVisual().props.children.find(child => child.props.className === 'scene');
    assert.equal(scene.props.children.type.name, expected);
  }
});

test('reduced-motion suppresses reveal movement and accordion transition duration', () => {
  const motion = { motion: { div: 'div', span: 'span' }, useReducedMotion: () => true };
  const reveal = load('../components/ui/reveal.tsx', {}, { 'motion/react': motion });
  assert.equal(Object.keys(reveal.Reveal({ children: 'Content' }).props.whileInView).length, 0);
  const accordion = load('../components/ui/contributions.tsx', {}, { 'motion/react': motion, react: { useState: () => [true, () => {}] } });
  const panel = accordion.Contributions({ slug: 'test', title: 'Test', items: [] }).props.children[1];
  assert.equal(panel.props.transition.duration, 0);
  assert.equal(panel.props['aria-hidden'], false);
});
