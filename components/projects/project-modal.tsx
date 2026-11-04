'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getPreviewUrl, type Project } from '@/data/projects';
import { openProjectDialog } from '@/lib/project-dialog';
import { LivePreview } from './live-preview';

const PreviewContext = createContext<(() => void) | null>(null);

export function ProjectActions({ project }: { project: Project }) {
  const launch = useContext(PreviewContext);
  const url = getPreviewUrl(project);
  return <div className="project-actions">
    <div>{url && launch && <button id={`preview-launch-${project.slug}`} className="button primary" type="button" onClick={launch}>Launch live preview <span aria-hidden="true">↗</span></button>}
      {project.liveUrl && <a className="button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open externally <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
    </div><p className="project-note">{project.embedding.note}</p>
  </div>;
}

export function ProjectModal({ children, project, modal = true }: { children: React.ReactNode; project: Project; modal?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const hasPreviewed = useRef(false);
  const detailScroll = useRef(0);
  const [preview, setPreview] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // Parallel slots can retain their previous tree during history restoration.
  // Never leave a native dialog open after its project URL has been left.
  const active = modal ? pathname === `/projects/${project.slug}` : preview;
  useEffect(() => {
    if (!active || !dialog.current) return;
    const trigger = document.getElementById(modal ? `project-${project.slug}` : `preview-launch-${project.slug}`);
    const cleanup = openProjectDialog(dialog.current, trigger);
    if (!preview) closeButton.current?.focus();
    return cleanup;
    // Preview mode changes within the same native dialog; do not reopen it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, modal, project.slug]);
  const returnToDetails = () => {
    setPreview(false); setExpanded(false);
    requestAnimationFrame(() => {
      if (dialog.current) dialog.current.scrollTop = detailScroll.current;
      document.getElementById(`preview-launch-${project.slug}`)?.focus({ preventScroll: true });
    });
  };
  const close = () => {
    if (!modal) { returnToDetails(); return; }
    // Cross-origin apps may add their own joint history entries. An explicit
    // close must leave the overlay even after navigation inside the iframe.
    if (hasPreviewed.current) router.replace('/#independent', { scroll: false });
    else router.back();
  };
  const launch = () => {
    if (!getPreviewUrl(project)) return;
    hasPreviewed.current = true;
    detailScroll.current = dialog.current?.scrollTop ?? 0;
    setPreview(true);
    requestAnimationFrame(() => { if (dialog.current) dialog.current.scrollTop = 0; });
  };
  return <PreviewContext.Provider value={launch}>
    {!modal && children}
    <dialog ref={dialog} className={`project-dialog${preview ? ' project-dialog-preview' : ''}${expanded ? ' project-dialog-expanded' : ''}`}
      aria-labelledby={preview ? 'preview-title' : 'project-title'} onCancel={event => { event.preventDefault(); close(); }}>
      <div className="project-dialog-toolbar"><span>{preview ? 'INTERACTIVE PREVIEW' : 'INDEPENDENT WORK'}</span>
        <button ref={closeButton} type="button" onClick={close} aria-label={preview ? 'Close live preview' : 'Close project details'}>Close <span aria-hidden="true">×</span></button>
      </div>
      {modal && <div hidden={preview}>{children}</div>}
      {active && preview && <LivePreview project={project} onReturn={returnToDetails} expanded={expanded} onExpand={() => setExpanded(value => !value)} />}
    </dialog>
  </PreviewContext.Provider>;
}
