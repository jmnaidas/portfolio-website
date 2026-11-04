// Native showModal supplies keyboard containment and background inertness.
// Keep restoration separate so it is exercised without a browser dependency.
export function openProjectDialog(element: HTMLDialogElement, trigger: HTMLElement | null) {
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
}
