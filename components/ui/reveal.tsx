'use client';
import { motion, useReducedMotion } from 'motion/react';
export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 1, y: 0 }} whileInView={reduced !== false ? {} : { y: [18, 0], opacity: [0.65, 1] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
