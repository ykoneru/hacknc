import { CompletionFeedback } from '../components/CompletionFeedback'
import { mockCompletionResult } from '../data/mockData'

export function CompletionPreview() {
  return <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8"><p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#8d9187]">Development preview</p><h1 className="display mb-3 text-4xl">Completion celebration</h1><p className="mb-8 max-w-lg text-sm leading-6 text-[#777b72]">This isolated preview uses a typed sample result. It does not alter quest selection, XP, streaks, or localStorage.</p><CompletionFeedback result={mockCompletionResult} /></div>
}
