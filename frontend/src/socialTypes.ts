// Types for Developer 2's social, submission, and competition features.
// Response shapes mirror the draft contracts in the build plan; finalize with Developer 4.
import type { QuestPeriod, QuestRarity } from './domain'

export type Visibility = 'private' | 'friends' | 'community'

export type PlayerSummary = {
  id: string
  name: string
  avatar: string
  city: string
  state: string
  country: string
}

export type FeedPost = {
  id: string
  author: PlayerSummary
  questId: string
  questTitle: string
  rarity: QuestRarity
  period: QuestPeriod | 'race'
  imageUrl: string
  caption?: string
  completedAt: string
  cheerCount: number
  cheeredByMe: boolean
  visibility: Visibility
  mapVisible: boolean
}

export type FeedFilter = 'community' | 'friends'

export type SubmissionDraft = {
  questId: string
  raceId?: string
  photo: File
  caption: string
  visibility: Visibility
  mapVisible: boolean
}

export type SubmissionResult = {
  submission_id: string
  status: 'completed'
  progression: { period: QuestPeriod; streak: number; xp_awarded: number; new_level: number } | null
  reward: { chest_id: string; rarity: QuestRarity } | null
  race: { completion_rank: number } | null
}

export type RaceQuest = {
  id: string
  title: string
  description: string
  photoPrompt: string
  rarity: QuestRarity
}

export type WeeklyRace = {
  id: string
  quest: RaceQuest
  startsAt: string
  endsAt: string
  status: 'upcoming' | 'open' | 'closed'
  finisherCount: number
  myEntry: { completionRank: number; completedAt: string } | null
}

export type LeaderboardScope = 'city' | 'state' | 'country' | 'global'
export type LeaderboardType = 'race' | 'season_xp' | 'daily_streak' | 'weekly_streak' | 'monthly_streak'

export type LeaderboardEntry = {
  rank: number
  player: PlayerSummary
  value: number
  label: string
  isMe: boolean
}

export type Leaderboard = {
  scope: LeaderboardScope
  type: LeaderboardType
  regionLabel: string
  finalized: boolean
  entries: LeaderboardEntry[]
  me: LeaderboardEntry | null
}

export type MapPostPreview = {
  id: string
  questTitle: string
  rarity: QuestRarity
  imageUrl: string
  authorName: string
  completedAt: string
}

// One marker per coarse region (city), never per person.
export type MapMarker = {
  id: string
  lat: number
  lng: number
  regionLabel: string
  posts: MapPostPreview[]
}
