import { currentRace, ME_ID, players, type MockPlayer } from '../data/socialMock'
import type { Leaderboard, LeaderboardEntry, LeaderboardScope, LeaderboardType, WeeklyRace } from '../socialTypes'
import { delay } from './mockLatency'

// Adapter boundary for Developer 4's GET /api/races/current and GET /api/leaderboards.
// All ranking happens on the server in production; the mock simulates that here.

const me = () => players.find(p => p.id === ME_ID)!

const raceFinishers = () =>
  players.filter(p => p.raceFinishedAt).sort((a, b) => a.raceFinishedAt!.localeCompare(b.raceFinishedAt!) || a.id.localeCompare(b.id))

const raceStatus = (): WeeklyRace['status'] => {
  const now = Date.now()
  if (now < Date.parse(currentRace.startsAt)) return 'upcoming'
  return now > Date.parse(currentRace.endsAt) ? 'closed' : 'open'
}

const inScope = (p: MockPlayer, scope: LeaderboardScope) => {
  const mine = me()
  if (scope === 'city') return p.city === mine.city
  if (scope === 'state') return p.state === mine.state && p.country === mine.country
  if (scope === 'country') return p.country === mine.country
  return true
}

const regionLabel = (scope: LeaderboardScope) => {
  const mine = me()
  return { city: mine.city, state: mine.state, country: mine.country, global: 'Worldwide' }[scope]
}

const formatFinish = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' })

export const competitionService = {
  async getCurrentRace(): Promise<WeeklyRace> {
    const finishers = raceFinishers()
    const myIndex = finishers.findIndex(p => p.id === ME_ID)
    return delay({
      ...currentRace,
      status: raceStatus(),
      finisherCount: finishers.length,
      myEntry: myIndex >= 0 ? { completionRank: myIndex + 1, completedAt: finishers[myIndex].raceFinishedAt! } : null,
    })
  },

  async getLeaderboard(scope: LeaderboardScope, type: LeaderboardType): Promise<Leaderboard> {
    const finalized = type === 'race' && raceStatus() === 'closed'
    let ranked: { player: MockPlayer; value: number; label: string }[]

    if (type === 'race') {
      // Speed points = 1 + valid finishers who completed later (computed globally, then filtered by region).
      const finishers = raceFinishers()
      ranked = finishers.map((p, i) => ({
        player: p,
        value: finishers.length - i,
        label: finalized ? `${finishers.length - i} pts` : formatFinish(p.raceFinishedAt!),
      }))
    } else if (type === 'season_xp') {
      ranked = [...players].sort((a, b) => b.seasonXp - a.seasonXp).map(p => ({ player: p, value: p.seasonXp, label: `${p.seasonXp.toLocaleString()} XP` }))
    } else {
      const period = type.replace('_streak', '') as keyof MockPlayer['streaks']
      const unit = { daily: 'days', weekly: 'weeks', monthly: 'months' }[period]
      ranked = [...players].sort((a, b) => b.streaks[period] - a.streaks[period]).map(p => ({ player: p, value: p.streaks[period], label: `${p.streaks[period]} ${unit}` }))
    }

    const entries: LeaderboardEntry[] = ranked
      .filter(r => inScope(r.player, scope))
      .map((r, i) => ({
        rank: i + 1,
        player: { id: r.player.id, name: r.player.name, avatar: r.player.avatar, city: r.player.city, state: r.player.state, country: r.player.country },
        value: r.value,
        label: r.label,
        isMe: r.player.id === ME_ID,
      }))

    return delay({ scope, type, regionLabel: regionLabel(scope), finalized, entries, me: entries.find(e => e.isMe) ?? null })
  },
}

// Used by the mock submission service to record a race entry with a "server" timestamp.
export function recordMockRaceEntry(): number {
  const mine = me()
  if (!mine.raceFinishedAt) mine.raceFinishedAt = new Date().toISOString()
  return raceFinishers().findIndex(p => p.id === ME_ID) + 1
}
