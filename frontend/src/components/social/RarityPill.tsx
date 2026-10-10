import { Sparkles } from 'lucide-react'
import type { QuestRarity } from '../../domain'

// TODO: swap for Developer 1's QuestRarityBadge once it exists so rarity styling stays consistent.
const styles: Record<QuestRarity, string> = {
  Common: 'bg-[#ecebe4] text-[#5d6158]',
  Rare: 'bg-[#d6e9fb] text-[#1f5d92]',
  Epic: 'bg-[#e6dcff] text-[#5a3fb0]',
  Legendary: 'bg-[#ffe9a8] text-[#8a5a00]',
}

export function RarityPill({ rarity }: { rarity: QuestRarity }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${styles[rarity]}`}><Sparkles size={11} />{rarity}</span>
}
