import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Send } from 'lucide-react'
import type { QuestPeriod, QuestRarity } from '../domain'
import type { SubmissionResult, Visibility } from '../socialTypes'
import { questService } from '../services/questService'
import { competitionService } from '../services/competitionService'
import { submissionService } from '../services/submissionService'
import { PhotoPicker } from '../components/submissions/PhotoPicker'
import { VisibilitySelector } from '../components/submissions/VisibilitySelector'
import { SubmissionSuccess } from '../components/submissions/SubmissionSuccess'
import { RarityPill } from '../components/social/RarityPill'
import { ErrorState, LoadingState } from '../components/social/StatusMessage'

type SubmitTarget = { id: string; title: string; description: string; prompt?: string; rarity: QuestRarity; period: QuestPeriod | 'race'; xp: number; deadline: string; raceId?: string }

const CAPTION_LIMIT = 280

export function SubmitQuest() {
  const { questId = '' } = useParams()
  const [params] = useSearchParams()
  const raceId = params.get('race') ?? undefined
  const [target, setTarget] = useState<SubmitTarget | null | 'missing'>(null)

  useEffect(() => {
    let active = true
    const load = async (): Promise<SubmitTarget | 'missing'> => {
      if (raceId) {
        const race = await competitionService.getCurrentRace()
        if (race.id !== raceId || race.quest.id !== questId) return 'missing'
        return { ...race.quest, prompt: race.quest.photoPrompt, period: 'race', xp: 50, deadline: new Date(race.endsAt).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' }), raceId: race.id }
      }
      const quest = (await questService.getAvailableQuests()).find(q => q.id === questId)
      return quest ? { ...quest } : 'missing'
    }
    load().then(t => { if (active) setTarget(t) }).catch(() => { if (active) setTarget('missing') })
    return () => { active = false }
  }, [questId, raceId])

  return <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 md:px-12 md:py-10">
    <Link to={raceId ? '/compete' : '/'} className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-[#777b72] hover:text-[#20231f]"><ArrowLeft size={16} />Back</Link>
    {target === null ? <LoadingState label="Loading quest…" />
      : target === 'missing' ? <ErrorState message="We couldn't find that quest. It may have expired." />
      : <SubmitForm target={target} />}
  </div>
}

function SubmitForm({ target }: { target: SubmitTarget }) {
  const [photo, setPhoto] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const [visibility, setVisibility] = useState<Visibility>('community')
  const [mapVisible, setMapVisible] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const inFlight = useRef(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!photo || inFlight.current) return
    inFlight.current = true
    setError(null)
    setProgress(0)
    try {
      const res = await submissionService.submit(
        { questId: target.id, raceId: target.raceId, photo, caption, visibility, mapVisible: visibility === 'community' && mapVisible },
        { title: target.title, rarity: target.rarity, period: target.period, xp: target.xp },
        setProgress,
      )
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Check your connection and try again.')
      setProgress(null)
    } finally {
      inFlight.current = false
    }
  }

  if (result) return <SubmissionSuccess result={result} questTitle={target.title} />

  const uploading = progress !== null
  return <form onSubmit={submit} className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
    <div>
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/75 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">{target.period === 'race' ? 'Weekly race' : `${target.period} quest`}</span>
          <RarityPill rarity={target.rarity} />
        </div>
        <h1 className="display mb-2 text-4xl sm:text-5xl">{target.title}</h1>
        <p className="leading-6 text-black/65">{target.description}</p>
        {target.prompt && <p className="mt-2 text-sm font-semibold text-[#5d6158]">📸 {target.prompt}</p>}
        <p className="mt-3 text-xs font-bold text-[#8d9187]">{target.xp} XP · {target.deadline}</p>
      </div>
      <PhotoPicker photo={photo} onChange={setPhoto} disabled={uploading} />
    </div>

    <div className="space-y-6">
      <label className="block">
        <span className="mb-2 flex justify-between text-sm font-extrabold">Caption <span className="font-semibold text-[#8d9187]">optional</span></span>
        <textarea value={caption} onChange={e => setCaption(e.target.value.slice(0, CAPTION_LIMIT))} disabled={uploading} rows={3} placeholder="What happened? What surprised you?" className="w-full resize-none rounded-2xl border border-black/10 bg-white p-4 text-sm outline-none transition focus:border-[#20231f]" />
        <span className="mt-1 block text-right text-xs text-[#8d9187]">{caption.length}/{CAPTION_LIMIT}</span>
      </label>

      <VisibilitySelector visibility={visibility} mapVisible={mapVisible} onVisibility={setVisibility} onMapVisible={setMapVisible} disabled={uploading} />

      {error && <p role="alert" className="rounded-2xl bg-[#fff0ec] p-4 text-sm font-semibold text-[#8a3a28]">{error}</p>}

      <div>
        <button type="submit" disabled={!photo || uploading} className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#20231f] py-4 font-bold text-white transition disabled:cursor-not-allowed disabled:bg-[#b3b6ad]">
          {uploading && <span className="absolute inset-y-0 left-0 bg-[#ffdb65]/30 transition-[width]" style={{ width: `${progress}%` }} />}
          <span className="relative flex items-center gap-2">{uploading ? <><Loader2 size={18} className="animate-spin" />Uploading… {progress}%</> : <><Send size={18} />Complete quest</>}</span>
        </button>
        {!photo && <p className="mt-2 text-center text-xs text-[#8d9187]">Add a photo to complete this quest.</p>}
      </div>
    </div>
  </form>
}
