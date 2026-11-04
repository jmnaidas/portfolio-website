'use client';
import { useEffect, useRef, useState } from 'react';
import { getPreviewUrl, type Project } from '@/data/projects';

export function LivePreview({ project, onReturn, expanded, onExpand }: {
  project: Project; onReturn: () => void; expanded: boolean; onExpand: () => void;
}) {
  const url = getPreviewUrl(project);
  const [loaded, setLoaded] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const back = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    back.current?.focus();
    const timer = setTimeout(() => setDelayed(true), 15000);
    return () => clearTimeout(timer);
  }, [attempt]);
  if (!url) return null;
  return <section className="live-preview" aria-label={`${project.title} live preview`}>
    <div className="preview-controls">
      <button ref={back} type="button" onClick={onReturn}>← Project details</button>
      <div><h2 id="preview-title">{project.title}</h2><span className="project-state">Live application</span></div>
      <button type="button" aria-pressed={expanded} onClick={onExpand}>{expanded ? 'Restore size' : 'Maximize'}</button>
      <a href={url} target="_blank" rel="noopener noreferrer">Open externally ↗<span className="sr-only"> (opens in a new tab)</span></a>
    </div>
    <div className="preview-notice" role="status">
      {!loaded && !delayed ? 'Loading application… ' : null}
      {delayed ? 'Not displaying correctly? The application may be unavailable or blocked by your browser. ' : 'You are browsing the live application. '}
      <span>Use Open externally if needed. To leave the application with the keyboard, Tab to the preview controls.</span>
      {delayed && <button type="button" onClick={() => { setLoaded(false); setDelayed(false); setAttempt(value => value + 1); }}>Reload preview</button>}
    </div>
    <iframe key={attempt} src={url} title={`${project.title} interactive application`}
      sandbox="allow-scripts allow-same-origin allow-forms" referrerPolicy="no-referrer"
      allow="camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'; clipboard-read 'none'; clipboard-write 'none'"
      onLoad={() => setLoaded(true)} onError={() => setDelayed(true)} />
  </section>;
}
