'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function ProjectModal({ children, returnFocusId }: { children: React.ReactNode; returnFocusId: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const initialReturnFocusId = useRef(returnFocusId);
  const router = useRouter();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const trigger = document.getElementById(initialReturnFocusId.current);
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      requestAnimationFrame(() => {
        if (trigger?.isConnected && !document.querySelector('dialog[open]')) trigger.focus({ preventScroll: true });
      });
    };
  }, []);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title"
    onCancel={event => { event.preventDefault(); router.back(); }}>
    <div className="project-dialog-toolbar"><span>INDEPENDENT WORK</span>
      <button type="button" onClick={() => router.back()} aria-label="Close project details">Close <span aria-hidden="true">×</span></button>
    </div>{children}
  </dialog>;
}
