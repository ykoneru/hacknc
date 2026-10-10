import { Check, Clock3, Sparkles } from 'lucide-react'
import type { Quest } from '../domain'

export function canOpenQuestDetails(status: Quest['status']): boolean {
  return status === 'available' || status === 'active'
}

export function QuestCard({ quest, onSelect }: { quest: Quest; onSelect: (quest: Quest) => void }) {
  const interactive = canOpenQuestDetails(quest.status)
  return <button disabled={!interactive} onClick={() => onSelect(quest)} aria-label={`${quest.title}, ${quest.status}`} className={`quest-card ${quest.accent} block w-full rounded-3xl p-5 text-left shadow-[0_5px_15px_rgba(42,47,39,.06)] disabled:cursor-default ${quest.status === 'active' ? 'ring-4 ring-[#20231f]/20' : ''} ${quest.status === 'expired' ? 'opacity-60' : ''}`}><div className="mb-8 flex items-start justify-between"><span className="rounded-full bg-white/65 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">{quest.category}</span><span className="flex items-center gap-1 text-xs font-bold">{quest.status === 'active' ? <><Check size={13} />Active</> : <><Sparkles size={13} />{quest.rarity}</>}</span></div><h3 className="display mb-2 text-2xl leading-none">{quest.title}</h3><p className="mb-5 min-h-10 text-sm leading-5 text-black/65">{quest.description}</p><div className="flex items-center justify-between border-t border-black/10 pt-4 text-xs font-bold"><span className="flex items-center gap-1"><Clock3 size={14} />{quest.deadline}</span><span>{quest.xp} XP</span></div></button>
}
