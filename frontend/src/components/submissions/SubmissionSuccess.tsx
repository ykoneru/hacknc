import { Link } from 'react-router-dom'
import { Flame, Gift, PartyPopper, Trophy } from 'lucide-react'
import type { SubmissionResult } from '../../socialTypes'

// Shown only after the backend confirms the submission.
// TODO: hand `result.progression` and `result.reward` to Developer 1's streak + chest animations.
export function SubmissionSuccess({ result, questTitle }: { result: SubmissionResult; questTitle: string }) {
  const { progression, reward, race } = result
  const unit = progression && { daily: 'day', weekly: 'week', monthly: 'month' }[progression.period]

  return <div className="mx-auto max-w-md text-center">
    <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-[2rem] bg-[#ffdb65]"><PartyPopper size={36} /></div>
    <p className="mb-1 text-xs font-bold uppercase tracking-[.18em] text-[#8d9187]">Quest complete</p>
    <h1 className="display mb-8 text-4xl">{questTitle}</h1>
    <div className="mb-8 space-y-3 text-left">
      {race && <Row Icon={Trophy} color="bg-[#ffdb65]" title={`You're finisher #${race.completion_rank}`} detail="Final race points are awarded when the race closes." />}
      {progression && <Row Icon={Flame} color="bg-[#ffc8a3]" title={`${progression.streak}-${unit} ${progression.period} streak`} detail={`+${progression.xp_awarded} XP · Level ${progression.new_level}`} />}
      {reward && <Row Icon={Gift} color="bg-[#d8ccff]" title={`${reward.rarity} chest earned`} detail="Open it from the Rewards tab." />}
    </div>
    <div className="flex flex-col gap-2 sm:flex-row">
      <Link to={race ? '/compete' : '/community'} className="flex-1 rounded-2xl bg-[#20231f] py-4 font-bold text-white">{race ? 'See the leaderboard' : 'See it in the feed'}</Link>
      <Link to="/" className="flex-1 rounded-2xl border border-black/10 bg-white py-4 font-bold">Back to quests</Link>
    </div>
  </div>
}

function Row({ Icon, color, title, detail }: { Icon: typeof Flame; color: string; title: string; detail: string }) {
  return <div className="flex items-center gap-4 rounded-3xl bg-white/80 p-4 shadow-sm">
    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${color}`}><Icon size={22} /></div>
    <div><p className="font-extrabold">{title}</p><p className="text-sm text-[#8d9187]">{detail}</p></div>
  </div>
}
