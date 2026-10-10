import { Check, Flame, ShieldAlert, Sparkles } from 'lucide-react'
import type { StreakDetail } from '../domain'

const labels = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' }

export function streakStatusLabel(streak: StreakDetail): string { return streak.completedCurrentPeriod ? 'Completed' : streak.status === 'at-risk' ? 'At risk' : 'In progress' }

export function StreakCards({ streaks, loading = false }: { streaks: StreakDetail[]; loading?: boolean }) {
  if (loading) return <section className="mb-12 grid grid-cols-3 gap-3" aria-label="Loading streaks">{[1, 2, 3].map(item => <div key={item} className="h-36 animate-pulse rounded-3xl bg-white/60" />)}</section>
  if (!streaks.length) return <section className="mb-12 rounded-3xl bg-white/60 p-5 text-sm text-[#777b72]" aria-label="Streaks unavailable">Streak details are unavailable right now.</section>
  return <section className="mb-12 grid grid-cols-3 gap-3" aria-label="Quest streaks">{streaks.map(streak => <StreakCard key={streak.period} streak={streak} />)}</section>
}

function StreakCard({ streak }: { streak: StreakDetail }) {
  const color = streak.period === 'daily' ? 'bg-[#ffdb65]' : streak.period === 'weekly' ? 'bg-[#bfe7c8]' : 'bg-[#d8ccff]'
  const status = streakStatusLabel(streak)
  const Icon = streak.completedCurrentPeriod ? Check : streak.status === 'at-risk' ? ShieldAlert : Flame
  return <article className="rounded-3xl bg-white/75 p-4 shadow-sm sm:p-5"><div className={`mb-4 grid h-8 w-8 place-items-center rounded-xl ${color}`}><Icon size={16} /></div><div className="flex items-end justify-between gap-1"><div><p className="text-xs font-bold uppercase tracking-wider text-[#8d9187]">{labels[streak.period]}</p><p className="display mt-1 text-3xl">{streak.current}<span className="ml-1 font-sans text-sm font-bold text-[#8d9187]">days</span></p></div><span className="pb-1 text-[10px] font-black uppercase tracking-wider text-[#777b72]">{status}</span></div><p className="mt-3 text-xs leading-4 text-[#777b72]">{streak.message}</p></article>
}
