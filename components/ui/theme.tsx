'use client';
import { useSyncExternalStore } from 'react';
import { themeStorageKey, type Theme } from '@/lib/theme';
let transientTheme: Theme | null = null;
function storedTheme(): Theme | null {
  try { const value = localStorage.getItem(themeStorageKey); return value === 'light' || value === 'dark' ? value : transientTheme; } catch { return transientTheme; }
}
function subscribe(notify: () => void) {
  const media = matchMedia('(prefers-color-scheme: dark)');
  const sync = () => { document.documentElement.dataset.theme = storedTheme() ?? (media.matches ? 'dark' : 'light'); };
  const storage = (event: StorageEvent) => { if (event.key === themeStorageKey || event.key === null) { transientTheme = null; sync(); } };
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  media.addEventListener('change', sync); window.addEventListener('storage', storage);
  return () => { observer.disconnect(); media.removeEventListener('change', sync); window.removeEventListener('storage', storage); };
}
export function useTheme() {
  return useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark', () => null);
}
export function ThemeToggle() {
  const theme = useTheme();
  return <button className="theme-toggle" type="button" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} onClick={() => {
    const next: Theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    transientTheme = next;
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(themeStorageKey, next); } catch { /* Keep the in-memory preference when storage is unavailable. */ }
  }}><svg className="sun-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg><svg className="moon-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M20.5 14a8.5 8.5 0 0 1-10.5-10.5A8.5 8.5 0 1 0 20.5 14Z" /></svg></button>;
}
