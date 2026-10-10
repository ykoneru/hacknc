import { Globe2, Lock, MapPin, Users } from 'lucide-react'
import type { Visibility } from '../../socialTypes'

const options: { value: Visibility; label: string; hint: string; Icon: typeof Lock }[] = [
  { value: 'private', label: 'Private', hint: 'Only in your Passport', Icon: Lock },
  { value: 'friends', label: 'Friends', hint: 'Your friends feed', Icon: Users },
  { value: 'community', label: 'Community', hint: 'Anyone on FlarUp', Icon: Globe2 },
]

type Props = { visibility: Visibility; mapVisible: boolean; onVisibility: (v: Visibility) => void; onMapVisible: (v: boolean) => void; disabled?: boolean }

export function VisibilitySelector({ visibility, mapVisible, onVisibility, onMapVisible, disabled }: Props) {
  const mapAllowed = visibility === 'community'
  return <fieldset disabled={disabled} className="space-y-3">
    <legend className="mb-2 text-sm font-extrabold">Who can see this?</legend>
    <div className="grid grid-cols-3 gap-2">
      {options.map(({ value, label, hint, Icon }) => <label key={value} className={`cursor-pointer rounded-2xl border p-3 transition ${visibility === value ? 'border-[#20231f] bg-[#20231f] text-white' : 'border-black/10 bg-white hover:border-black/25'}`}>
        <input type="radio" name="visibility" value={value} checked={visibility === value} onChange={() => onVisibility(value)} className="sr-only" />
        <Icon size={18} className="mb-2" />
        <p className="text-sm font-bold">{label}</p>
        <p className={`text-[11px] leading-4 ${visibility === value ? 'text-white/60' : 'text-[#8d9187]'}`}>{hint}</p>
      </label>)}
    </div>
    <label className={`flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 ${mapAllowed ? 'cursor-pointer' : 'opacity-50'}`}>
      <MapPin size={18} className="shrink-0 text-[#8d9187]" />
      <span className="flex-1">
        <span className="block text-sm font-bold">Show on the live map</span>
        <span className="block text-xs text-[#8d9187]">{mapAllowed ? 'Appears as a city-level pin. Never your exact location.' : 'Only community posts can appear on the map.'}</span>
      </span>
      <input type="checkbox" role="switch" aria-label="Show on the live map" checked={mapAllowed && mapVisible} disabled={!mapAllowed} onChange={e => onMapVisible(e.target.checked)} className="peer sr-only" />
      <span aria-hidden className="relative h-6 w-11 shrink-0 rounded-full bg-[#dcdbd3] transition peer-checked:bg-[#20231f] peer-focus-visible:ring-2 peer-focus-visible:ring-[#ffdb65] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
    </label>
  </fieldset>
}
