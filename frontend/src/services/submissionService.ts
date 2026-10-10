import { mockStreaks, mockProfile } from '../data/mockData'
import { currentRace, ME_ID, playerById, posts } from '../data/socialMock'
import type { QuestPeriod, QuestRarity } from '../domain'
import type { SubmissionDraft, SubmissionResult } from '../socialTypes'
import { recordMockRaceEntry } from './competitionService'

export const MAX_PHOTO_BYTES = 5 * 1024 * 1024
export const ACCEPTED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function validatePhoto(file: File): string | null {
  if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) return 'Please choose a JPEG, PNG, or WebP photo.'
  if (file.size > MAX_PHOTO_BYTES) return `That photo is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is 5 MB.`
  return null
}

type QuestMeta = { title: string; rarity: QuestRarity; period: QuestPeriod | 'race'; xp: number }

// Adapter boundary for Developer 4's POST /api/submissions.
// The real endpoint stores the photo, finalizes the completion with Developer 3's
// progression service, and returns one confirmed result. Never assume success before it resolves.
export const submissionService = {
  submit(draft: SubmissionDraft, quest: QuestMeta, onProgress: (percent: number) => void): Promise<SubmissionResult> {
    const error = validatePhoto(draft.photo)
    if (error) return Promise.reject(new Error(error))

    return new Promise(resolve => {
      let percent = 0
      const timer = setInterval(() => {
        percent = Math.min(100, percent + 8 + Math.random() * 14)
        onProgress(Math.round(percent))
        if (percent < 100) return
        clearInterval(timer)

        const id = `submission-${Date.now()}`
        const isRace = draft.raceId === currentRace.id
        const author = playerById(ME_ID)
        posts.unshift({
          id, author: { id: author.id, name: author.name, avatar: author.avatar, city: author.city, state: author.state, country: author.country },
          questId: draft.questId, questTitle: quest.title, rarity: quest.rarity, period: quest.period,
          imageUrl: URL.createObjectURL(draft.photo), caption: draft.caption.trim() || undefined,
          completedAt: new Date().toISOString(), cheerCount: 0, cheeredByMe: false,
          visibility: draft.visibility, mapVisible: draft.visibility === 'community' && draft.mapVisible,
        })

        const period = quest.period === 'race' ? null : quest.period
        resolve({
          submission_id: id,
          status: 'completed',
          progression: period ? { period, streak: mockStreaks[period] + 1, xp_awarded: quest.xp, new_level: mockProfile.level } : null,
          reward: period ? { chest_id: `chest-${Date.now()}`, rarity: quest.rarity } : null,
          race: isRace ? { completion_rank: recordMockRaceEntry() } : null,
        })
      }, 140)
    })
  },
}
