import type { LeaderboardEntry } from '../../socialTypes'
import { Avatar } from '../social/Avatar'

const VISIBLE_ROWS = 10

// Ranks 4–10, plus the current user's row pinned underneath if they're further down.
export function LeaderboardList({ entries, me }: { entries: LeaderboardEntry[]; me: LeaderboardEntry | null }) {
  const rest = entries.slice(3, VISIBLE_ROWS)
  const showMeSeparately = me && me.rank > VISIBLE_ROWS

  return <div className="overflow-hidden rounded-3xl bg-white/80 shadow-sm">
    {rest.map(e => <Row key={e.player.id} entry={e} />)}
    {showMeSeparately && <>
      <div className="py-1 text-center text-xs font-bold tracking-[.3em] text-[#b3b6ad]">···</div>
      <Row entry={me} />
    </>}
  </div>
}

function Row({ entry: e }: { entry: LeaderboardEntry }) {
  return <div className={`flex items-center gap-3 border-b border-black/5 px-4 py-3 last:border-b-0 ${e.isMe ? 'bg-[#fff4cf]' : ''}`}>
    <span className="w-7 text-center text-sm font-black tabular-nums text-[#8d9187]">{e.rank}</span>
    <Avatar id={e.player.id} letter={e.player.avatar} size="sm" />
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-extrabold">{e.isMe ? 'You' : e.player.name}</p>
      <p className="truncate text-xs text-[#8d9187]">{e.player.city}, {e.player.state}</p>
    </div>
    <span className="text-sm font-bold tabular-nums">{e.label}</span>
  </div>
}
