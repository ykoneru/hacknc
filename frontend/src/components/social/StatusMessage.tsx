import { AlertCircle, Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return <div className="flex items-center justify-center gap-2 py-16 text-sm font-semibold text-[#8d9187]"><Loader2 size={18} className="animate-spin" />{label}</div>
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return <div className="flex flex-col items-center gap-3 rounded-3xl bg-[#fff0ec] px-6 py-10 text-center"><AlertCircle className="text-[#c4472d]" /><p className="text-sm font-semibold text-[#8a3a28]">{message}</p>{onRetry && <button onClick={onRetry} className="rounded-full bg-[#20231f] px-4 py-2 text-xs font-bold text-white">Try again</button>}</div>
}

export function EmptyState({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return <div className="flex flex-col items-center rounded-3xl bg-white/70 px-6 py-12 text-center"><div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#ffdb65]">{icon}</div><p className="display mb-1 text-2xl">{title}</p><div className="max-w-xs text-sm text-[#777b72]">{children}</div></div>
}
