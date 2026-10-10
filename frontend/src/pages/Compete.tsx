import { useState } from 'react'
import { Info, Trophy } from 'lucide-react'
import { competitionService } from '../services/competitionService'
import { usePolling } from '../hooks/usePolling'
import { WeeklyRaceCard } from '../components/competition/WeeklyRaceCard'
import { LeaderboardFilters, toLeaderboardType, type BoardView, type StreakPeriod } from '../components/competition/LeaderboardFilters'
import { Podium } from '../components/competition/Podium'
import { LeaderboardList } from '../components/competition/LeaderboardList'
import { EmptyState, ErrorState, LoadingState } from '../components/social/StatusMessage'
import type { LeaderboardScope } from '../socialTypes'

const boardTitle = { race: 'Race standings', season_xp: 'Season adventure XP', streak: 'Streak legends' }

export function Compete() {
  const [view, setView] = useState<BoardView>('race')
  const [scope, setScope] = useState<LeaderboardScope>('city')
  const [streak, setStreak] = useState<StreakPeriod>('daily')
  const type = toLeaderboardType(view, streak)

  const race = usePolling(() => competitionService.getCurrentRace(), 5000, [])
  const board = usePolling(() => competitionService.getLeaderboard(scope, type), 5000, [scope, type])

  return <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 md:px-12 md:py-10">
    <header className="mb-8">
      <p className="mb-1 text-xs font-bold uppercase tracking-[.18em] text-[#8d9187]">Compete</p>
      <h1 className="display text-4xl sm:text-5xl">This week's race</h1>
    </header>

    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        {race.loading && !race.data ? <LoadingState label="Loading this week's race…" />
          : race.error && !race.data ? <ErrorState message="Couldn't load the weekly race." onRetry={race.refresh} />
          : race.data && <WeeklyRaceCard race={race.data} />}
        <p className="mt-4 flex gap-2 text-xs leading-5 text-[#8d9187]"><Info size={14} className="mt-0.5 shrink-0" />The weekly race is separate from your personal weekly quest and streak. Everyone who finishes earns a participation reward; earlier finishers earn more race points.</p>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-extrabold">{boardTitle[view]}</h2>
            <p className="text-sm text-[#8d9187]">{board.data?.regionLabel ?? '…'}{view === 'race' && board.data && !board.data.finalized ? ' · live completion order' : ''}</p>
          </div>
          {board.data?.me && <span className="rounded-full bg-[#20231f] px-3 py-1.5 text-xs font-bold text-white">You're #{board.data.me.rank}</span>}
        </div>
        <LeaderboardFilters view={view} scope={scope} streak={streak} onView={setView} onScope={setScope} onStreak={setStreak} />
        <div className="mt-2">
          {board.loading && !board.data ? <LoadingState />
            : board.error && !board.data ? <ErrorState message="Couldn't load the leaderboard." onRetry={board.refresh} />
            : board.data && board.data.entries.length === 0 ? <div className="mt-6"><EmptyState icon={<Trophy size={24} />} title="No finishers yet">Nobody in {board.data.regionLabel} has finished. Be the first.</EmptyState></div>
            : board.data && <div className={board.loading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
              <Podium entries={board.data.entries} />
              <LeaderboardList entries={board.data.entries} me={board.data.me} />
            </div>}
        </div>
      </section>
    </div>
  </div>
}
