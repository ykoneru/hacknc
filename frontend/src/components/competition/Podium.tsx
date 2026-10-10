import { Crown } from 'lucide-react'
import type { LeaderboardEntry } from '../../socialTypes'
import { Avatar } from '../social/Avatar'

const place = {
  1: { height: 'h-28', color: 'bg-[#ffdb65]', order: 'order-2' },
  2: { height: 'h-20', color: 'bg-[#e4e2da]', order: 'order-1' },
  3: { height: 'h-14', color: 'bg-[#ffc8a3]', order: 'order-3' },
} as const

export function Podium({ entries }: { entries: LeaderboardEntry[] }) {
  const top = entries.slice(0, 3)
  return <div className="grid grid-cols-3 items-end gap-3 pt-6">
    {top.map(e => {
      const p = place[e.rank as 1 | 2 | 3]
      return <div key={e.player.id} className={`flex flex-col items-center ${p.order}`}>
        {e.rank === 1 && <Crown size={22} className="mb-1 text-[#d9a400]" />}
        <div className={e.isMe ? 'rounded-full ring-4 ring-[#20231f]' : ''}><Avatar id={e.player.id} letter={e.player.avatar} size="lg" /></div>
        <p className="mt-2 max-w-full truncate text-sm font-extrabold">{e.isMe ? 'You' : e.player.name}</p>
        <p className="mb-2 text-xs font-semibold text-[#8d9187]">{e.label}</p>
        <div className={`grid w-full place-items-center rounded-t-2xl ${p.height} ${p.color}`}><span className="display text-3xl">{e.rank}</span></div>
      </div>
    })}
  </div>
}
