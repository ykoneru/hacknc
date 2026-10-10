import 'leaflet/dist/leaflet.css'
import { useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { ShieldCheck } from 'lucide-react'
import type { MapMarker } from '../../socialTypes'
import { RarityPill } from '../social/RarityPill'
import { timeAgo } from '../social/format'

// Marker HTML is a raw string, so percent-encode characters that could break out of the CSS url() or the attribute.
const escapeAttr = (value: string) => value.replace(/["'()\\<>]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`).replace(/&/g, '&amp;')

// Region marker: photo of the newest post plus a count. Never a person's precise location.
function markerIcon(marker: MapMarker) {
  const latest = marker.posts[0]
  const count = marker.posts.length
  return L.divIcon({
    className: '',
    iconSize: [52, 52],
    iconAnchor: [26, 26],
    popupAnchor: [0, -26],
    html: `<div style="position:relative;width:52px;height:52px;border-radius:9999px;border:3px solid #fffdf8;box-shadow:0 6px 16px rgba(32,35,31,.25);background:#ffdb65 url(&quot;${escapeAttr(latest.imageUrl)}&quot;) center/cover">${count > 1 ? `<span style="position:absolute;right:-6px;top:-6px;min-width:22px;height:22px;padding:0 6px;border-radius:9999px;background:#20231f;color:#ffdb65;font:800 11px/22px Inter,system-ui,sans-serif;text-align:center">${count}</span>` : ''}</div>`,
  })
}

export function LiveMap({ markers }: { markers: MapMarker[] }) {
  return <div className="relative isolate overflow-hidden rounded-[2rem] shadow-[0_5px_15px_rgba(42,47,39,.08)]">
    <MapContainer center={[40, -55]} zoom={3} minZoom={2} maxZoom={9} scrollWheelZoom className="h-[62vh] min-h-[420px] w-full bg-[#eef0ea]">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(m => <RegionMarker key={m.id} marker={m} />)}
    </MapContainer>
    <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] flex items-center gap-2 rounded-full bg-[#fffdf8]/95 px-3 py-2 text-xs font-semibold text-[#5d6158] shadow-sm backdrop-blur">
      <ShieldCheck size={14} className="text-[#3a8a4f]" />City-level pins · opt-in only
    </div>
  </div>
}

function RegionMarker({ marker: m }: { marker: MapMarker }) {
  // Rebuild the icon only when the pin's content changes, so polling doesn't close an open popup.
  const iconKey = `${m.posts[0]?.id}-${m.posts.length}`
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const icon = useMemo(() => markerIcon(m), [iconKey])
  return <Marker position={[m.lat, m.lng]} icon={icon}>
    <Popup maxWidth={260} minWidth={240}>
      <p style={{ margin: 0 }} className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#8d9187]">{m.regionLabel} · {m.posts.length} {m.posts.length === 1 ? 'quest' : 'quests'}</p>
      <div className="max-h-64 space-y-3 overflow-y-auto">
        {m.posts.map(p => <div key={p.id} className="flex gap-3">
          <img src={p.imageUrl} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0">
            <p style={{ margin: 0 }} className="display text-lg leading-tight text-[#20231f]">{p.questTitle}</p>
            <p style={{ margin: '2px 0 6px' }} className="text-xs text-[#8d9187]">{p.authorName} · {timeAgo(p.completedAt)}</p>
            <RarityPill rarity={p.rarity} />
          </div>
        </div>)}
      </div>
    </Popup>
  </Marker>
}
