'use client';
import dynamic from 'next/dynamic';
import { useTheme } from '@/components/ui/theme';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
const Architecture = dynamic(() => import('./architecture'), { ssr: false, loading: () => <Fallback /> });
function Fallback() { return <div className="sculpture-fallback">{[0, 1, 2, 3, 4].map(i => <div key={i} style={{ top: `${20 + i * 12}%` }} />)}</div>; }
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Fallback /> : this.props.children; }
}
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [available, setAvailable] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const check = () => { if (!media.matches) { setAvailable(false); return; } try { const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl2'); setAvailable(media.matches && !!gl); gl?.getExtension('WEBGL_lose_context')?.loseContext(); } catch { setAvailable(false); } };
    const visibility = () => setVisible(!document.hidden);
    check(); media.addEventListener('change', check); document.addEventListener('visibilitychange', visibility);
    return () => { media.removeEventListener('change', check); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return <div ref={ref} className="hero-visual" role="img" aria-label="An architectural sculpture of five connected software layers"><div className="visual-index">FIG. 01 <span>CONNECTED BY DESIGN</span></div><div className="scene">{available && reduced === false ? <SceneBoundary><Architecture theme={theme ?? 'dark'} active={inView && visible} onFailure={() => setAvailable(false)} /></SceneBoundary> : <Fallback />}</div><div className="visual-caption"><span className="tiny-cross">+</span> STRUCTURE. CONNECTION. CLARITY.<span>01—05</span></div></div>;
}
