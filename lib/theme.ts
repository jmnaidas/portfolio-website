export type Theme = 'dark' | 'light';
export const themeStorageKey = 'portfolio-theme';
// Runs before body paint; storage may be unavailable in private contexts.
export const themeBootstrap = `(()=>{let t;try{t=localStorage.getItem('${themeStorageKey}')}catch{}document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`;
