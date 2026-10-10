import type { LeaderboardScope, LeaderboardType } from '../../socialTypes'

export type BoardView = 'race' | 'season_xp' | 'streak'
export type StreakPeriod = 'daily' | 'weekly' | 'monthly'

export const toLeaderboardType = (view: BoardView, streak: StreakPeriod): LeaderboardType =>
  view === 'streak' ? `${streak}_streak` : view

const views: { value: BoardView; label: string }[] = [{ value: 'race', label: 'Weekly Race' }, { value: 'season_xp', label: 'Season XP' }, { value: 'streak', label: 'Streak Legends' }]
const scopes: { value: LeaderboardScope; label: string }[] = [{ value: 'city', label: 'City' }, { value: 'state', label: 'State' }, { value: 'country', label: 'Country' }, { value: 'global', label: 'Global' }]
const streaks: StreakPeriod[] = ['daily', 'weekly', 'monthly']

type Props = { view: BoardView; scope: LeaderboardScope; streak: StreakPeriod; onView: (v: BoardView) => void; onScope: (s: LeaderboardScope) => void; onStreak: (s: StreakPeriod) => void }

export function LeaderboardFilters({ view, scope, streak, onView, onScope, onStreak }: Props) {
  return <div className="space-y-3">
    <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
      {views.map(v => <button key={v.value} onClick={() => onView(v.value)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${view === v.value ? 'bg-[#20231f] text-white' : 'bg-white/75 text-[#777b72] hover:text-[#20231f]'}`}>{v.label}</button>)}
    </div>
    {view === 'streak' && <div className="flex gap-1">
      {streaks.map(s => <button key={s} onClick={() => onStreak(s)} className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition ${streak === s ? 'bg-[#ffdb65] text-[#20231f]' : 'text-[#8d9187] hover:text-[#20231f]'}`}>{s}</button>)}
    </div>}
    <div className="grid grid-cols-4 rounded-2xl bg-white/75 p-1 shadow-sm">
      {scopes.map(s => <button key={s.value} onClick={() => onScope(s.value)} className={`rounded-xl py-2 text-sm font-bold transition ${scope === s.value ? 'bg-[#ffdb65] text-[#20231f]' : 'text-[#777b72] hover:text-[#20231f]'}`}>{s.label}</button>)}
    </div>
  </div>
}
