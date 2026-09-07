'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
export type Contribution = { title: string; detail: string };
export function Contributions({ slug, title, items }: { slug: string; title: string; items: Contribution[] }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const id = `${slug}-contributions`;
  return <div className="contributions"><button type="button" className="contributions-toggle" id={`${id}-toggle`} aria-expanded={open} aria-controls={id} aria-label={`${open ? 'Hide' : 'Explore'} contributions: ${title}`} onClick={() => setOpen(!open)}><span>{open ? 'Hide contributions' : 'Explore contributions'}</span><motion.span aria-hidden="true" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: reduced ? 0 : 0.2 }}>+</motion.span></button><motion.div id={id} role="region" aria-labelledby={`${id}-toggle`} aria-hidden={!open} inert={!open} initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }} className="contributions-panel"><dl>{items.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.detail}</dd></div>)}</dl></motion.div></div>;
}
