import { useEffect, useId, useRef, type ReactNode } from 'react'

type DialogProps = { open: boolean; title: string; children: ReactNode; onClose?: () => void; dismissible?: boolean; labelledBy?: string; className?: string }

const focusable = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Dialog({ open, title, children, onClose, dismissible = true, labelledBy, className = '' }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null); const restoreRef = useRef<HTMLElement | null>(null); const fallbackTitleId = useId(); const titleId = labelledBy ?? fallbackTitleId
  useEffect(() => { if (!open) return; restoreRef.current = document.activeElement as HTMLElement; const frame = window.requestAnimationFrame(() => { const first = dialogRef.current?.querySelector<HTMLElement>(focusable); first?.focus() }); function handleKey(event: KeyboardEvent) { if (event.key === 'Escape' && dismissible) { event.preventDefault(); onClose?.(); return } if (event.key !== 'Tab' || !dialogRef.current) return; const items = [...dialogRef.current.querySelectorAll<HTMLElement>(focusable)]; if (!items.length) return; const first = items[0]; const last = items[items.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() } } document.addEventListener('keydown', handleKey); return () => { window.cancelAnimationFrame(frame); document.removeEventListener('keydown', handleKey); if (restoreRef.current?.isConnected) restoreRef.current.focus() } }, [open, dismissible, onClose])
  if (!open) return null
  return <div className="fixed inset-0 z-40 grid place-items-end bg-black/40 p-4 sm:place-items-center" aria-hidden={false}><div ref={dialogRef} className={`relative w-full max-w-lg ${className}`} role="dialog" aria-modal="true" aria-labelledby={titleId}>{title && <h2 id={titleId} className="sr-only">{title}</h2>}{children}</div></div>
}
