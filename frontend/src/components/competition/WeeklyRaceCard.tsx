import { Link } from 'react-router-dom'
import { Camera, Flag, Timer, Users } from 'lucide-react'
import type { WeeklyRace } from '../../socialTypes'
import { useNow } from '../../hooks/usePolling'
import { formatCountdown } from '../social/format'
import { RarityPill } from '../social/RarityPill'

const short = (iso: string) => new Date(iso).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' })
const fmt = (iso: string) => new Date(iso).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

export function WeeklyRaceCard({ race }: { race: WeeklyRace }) {
  const now = useNow()
  const target = race.status === 'upcoming' ? race.startsAt : race.endsAt
  const countdown = formatCountdown(Date.parse(target) - now)

  return <section className="relative overflow-hidden rounded-[2rem] bg-[#20231f] p-6 text-white shadow-xl shadow-black/10 sm:p-8">
    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#ffdb65]/10" />
    <div className="relative">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-[#ffdb65] px-3 py-1 text-[11px] font-black uppercase tracking-[.16em] text-[#20231f]"><Flag size={12} />Weekly community race</span>
        <RarityPill rarity={race.quest.rarity} />
      </div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-white/50">Same quest for everyone · one shared clock</p>
      <h2 className="display mb-3 text-4xl sm:text-5xl">{race.quest.title}</h2>
      <p className="mb-2 max-w-xl leading-6 text-white/75">{race.quest.description}</p>
      <p className="mb-7 max-w-xl text-sm text-white/50">Proof: {race.quest.photoPrompt}</p>

      <div className="mb-7 grid grid-cols-3 gap-3">
        <Stat Icon={Timer} label={race.status === 'upcoming' ? 'Opens in' : 'Closes in'} value={countdown} />
        <Stat Icon={Users} label="Finishers" value={String(race.finisherCount)} />
        <Stat Icon={Flag} label="Deadline" value={short(race.endsAt)} small />
      </div>

      {race.myEntry
        ? <div className="rounded-2xl bg-white/10 p-4"><p className="font-extrabold text-[#ffdb65]">You finished #{race.myEntry.completionRank}</p><p className="mt-1 text-sm text-white/60">That's your live completion rank. Final race points are calculated when the race closes.</p></div>
        : race.status === 'open'
          ? <Link to={`/submit/${race.quest.id}?race=${race.id}`} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ffdb65] py-4 font-black text-[#20231f] transition hover:brightness-95 sm:w-auto sm:px-8"><Camera size={18} />Submit your entry</Link>
          : <p className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-white/70">{race.status === 'upcoming' ? `Opens ${fmt(race.startsAt)}` : 'This race has closed. Final points are in.'}</p>}
    </div>
  </section>
}

function Stat({ Icon, label, value, small = false }: { Icon: typeof Timer; label: string; value: string; small?: boolean }) {
  return <div className="rounded-2xl bg-white/[.07] p-3 sm:p-4">
    <p className="mb-1 flex items-center gap-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-white/45"><Icon size={12} />{label}</p>
    <p className={`font-black leading-tight tabular-nums ${small ? 'text-xs sm:text-sm' : 'text-sm sm:text-lg'}`}>{value}</p>
  </div>
}
