import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

function fixture({ anotherDialog = false, connected = true } = {}) {
  const events = [];
  const style = { overflow: 'auto', paddingRight: '3px' };
  const exports = {};
  const callbacks = [];
  runInNewContext(ts.transpileModule(readFileSync(new URL('../lib/project-dialog.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    exports,
    document: { body: { style }, documentElement: { clientWidth: 1425 }, querySelector: () => anotherDialog },
    window: { innerWidth: 1440 }, requestAnimationFrame: callback => callbacks.push(callback),
  });
  const cleanup = exports.openProjectDialog({ showModal: () => events.push('open'), close: () => events.push('close') }, { isConnected: connected, focus: () => events.push('focus') });
  return { style, events, cleanup, flush: () => callbacks.forEach(fn => fn()) };
}
test('native modal locks scrolling, compensates scrollbar, restores styles and focus on close', () => {
  const f = fixture();
  assert.equal(f.style.overflow, 'hidden'); assert.equal(f.style.paddingRight, '15px');
  assert.deepEqual(f.events, ['open']);
  f.cleanup(); f.flush();
  assert.equal(f.style.overflow, 'auto'); assert.equal(f.style.paddingRight, '3px');
  assert.deepEqual(f.events, ['open', 'close', 'focus']);
});
test('switching projects never steals focus from a new dialog or a detached card', () => {
  for (const options of [{ anotherDialog: true }, { connected: false }]) {
    const f = fixture(options); f.cleanup(); f.flush(); assert.deepEqual(f.events, ['open', 'close']);
  }
});
