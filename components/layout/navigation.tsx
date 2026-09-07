'use client';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme';
const links = ['Work', 'Experience', 'About', 'Contact'];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = links.findLast(link => (document.getElementById(link.toLowerCase())?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * 0.35);
      setActive(current ?? '');
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && menu.current?.getAttribute('aria-expanded') === 'true') { setOpen(false); menu.current.focus(); } };
    const desktop = matchMedia('(min-width: 768px)');
    const close = () => { if (desktop.matches) setOpen(false); };
    update(); window.addEventListener('scroll', scroll, { passive: true }); window.addEventListener('resize', scroll); window.addEventListener('keydown', escape); desktop.addEventListener('change', close);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); window.removeEventListener('keydown', escape); desktop.removeEventListener('change', close); };
  }, []);
  const navLinks = () => links.map(link => <a key={link} href={`#${link.toLowerCase()}`} aria-current={active === link ? 'location' : undefined} onClick={() => setOpen(false)}>{link}</a>);
  return <header className="site-header"><nav className="container navigation" aria-label="Main navigation"><a href="#" className="brand" onClick={() => setOpen(false)}>John Marie Naidas<span className="brand-dot" /></a><div className="desktop-nav">{navLinks()}</div><div className="nav-actions"><a className="nav-cta" href="#contact">Let’s Talk <span aria-hidden="true">↗</span></a><ThemeToggle /><button ref={menu} className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button></div><div id="mobile-nav" className="mobile-nav" hidden={!open}>{navLinks()}</div></nav></header>;
}
