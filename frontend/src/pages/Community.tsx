import { lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Map as MapIcon, Newspaper, Users } from 'lucide-react'
import { ME_ID } from '../data/socialMock'
import { feedService } from '../services/feedService'
import { mapService } from '../services/mapService'
import { usePolling } from '../hooks/usePolling'
import { FeedPost } from '../components/social/FeedPost'
import { EmptyState, ErrorState, LoadingState } from '../components/social/StatusMessage'
import type { FeedFilter } from '../socialTypes'

// Leaflet is heavy; only load it when someone opens the map.
const LiveMap = lazy(() => import('../components/map/LiveMap').then(m => ({ default: m.LiveMap })))

export function Community() {
  const [params, setParams] = useSearchParams()
  const view = params.get('view') === 'map' ? 'map' : 'feed'
  const filter: FeedFilter = params.get('filter') === 'friends' ? 'friends' : 'community'
  const update = (key: string, value: string) => setParams(prev => { const next = new URLSearchParams(prev); next.set(key, value); return next }, { replace: true })

  return <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 md:px-12 md:py-10">
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[.18em] text-[#8d9187]">Community</p>
        <h1 className="display text-4xl sm:text-5xl">What people are out doing</h1>
      </div>
      <Segmented value={view} onChange={v => update('view', v)} options={[{ value: 'feed', label: 'Feed', Icon: Newspaper }, { value: 'map', label: 'Map', Icon: MapIcon }]} />
    </header>
    {view === 'feed' ? <Feed filter={filter} onFilter={f => update('filter', f)} /> : <MapView />}
  </div>
}

function Feed({ filter, onFilter }: { filter: FeedFilter; onFilter: (f: FeedFilter) => void }) {
  const { data, error, loading, refresh } = usePolling(() => feedService.getFeed(filter), 8000, [filter])

  return <div className="mx-auto max-w-xl">
    <div className="mb-6 flex gap-2">
      {(['community', 'friends'] as const).map(f => <button key={f} onClick={() => onFilter(f)} className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${filter === f ? 'bg-[#20231f] text-white' : 'bg-white/75 text-[#777b72] hover:text-[#20231f]'}`}>{f}</button>)}
    </div>
    {loading && !data ? <LoadingState label="Loading the feed…" />
      : error && !data ? <ErrorState message="Couldn't load the feed." onRetry={refresh} />
      : data && data.length === 0 ? <EmptyState icon={<Users size={24} />} title="Nothing here yet">{filter === 'friends' ? 'When your friends complete quests, they will show up here.' : 'Be the first to share a completed quest.'}</EmptyState>
      : <div className="space-y-6">{data?.map(p => <FeedPost key={p.id} post={p} isMine={p.author.id === ME_ID} />)}</div>}
  </div>
}

function MapView() {
  const { data, error, loading, refresh } = usePolling(() => mapService.getMarkers(), 10000, [])
  const fallback = <div className="grid h-[62vh] min-h-[420px] place-items-center rounded-[2rem] bg-white/70"><LoadingState label="Loading the map…" /></div>

  if (loading && !data) return fallback
  if (error && !data) return <ErrorState message="Couldn't load map pins." onRetry={refresh} />
  return <div>
    <p className="mb-4 text-sm text-[#777b72]">Opt-in quest completions, grouped by city. Tap a pin to see what happened there.</p>
    <Suspense fallback={fallback}><LiveMap markers={data ?? []} /></Suspense>
  </div>
}

function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; Icon: typeof Users }[] }) {
  return <div className="flex rounded-full bg-white/75 p-1 shadow-sm">
    {options.map(({ value: v, label, Icon }) => <button key={v} onClick={() => onChange(v)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${value === v ? 'bg-[#20231f] text-white' : 'text-[#777b72] hover:text-[#20231f]'}`}><Icon size={16} />{label}</button>)}
  </div>
}
