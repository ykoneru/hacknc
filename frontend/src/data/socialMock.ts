// In-memory stand-in for Developer 4's backend. Clearly fictional demo players.
// Services mutate this store so a mock submission shows up in the feed, map, and race.
import type { QuestRarity } from '../domain'
import type { FeedPost, PlayerSummary, RaceQuest } from '../socialTypes'

export type MockPlayer = PlayerSummary & {
  seasonXp: number
  streaks: { daily: number; weekly: number; monthly: number }
  raceFinishedAt: string | null
}

// City-level coordinates only. Markers represent a region, never a person.
export const cityCoords: Record<string, [number, number]> = {
  Raleigh: [35.78, -78.64], Durham: [35.99, -78.9], 'Chapel Hill': [35.91, -79.06], Charlotte: [35.23, -80.84],
  Austin: [30.27, -97.74], Seattle: [47.61, -122.33], 'New York': [40.71, -74.0], Toronto: [43.65, -79.38], London: [51.51, -0.13],
}

const region = {
  raleigh: { city: 'Raleigh', state: 'NC', country: 'USA' }, durham: { city: 'Durham', state: 'NC', country: 'USA' },
  chapelHill: { city: 'Chapel Hill', state: 'NC', country: 'USA' }, charlotte: { city: 'Charlotte', state: 'NC', country: 'USA' },
  austin: { city: 'Austin', state: 'TX', country: 'USA' }, seattle: { city: 'Seattle', state: 'WA', country: 'USA' },
  newYork: { city: 'New York', state: 'NY', country: 'USA' }, toronto: { city: 'Toronto', state: 'ON', country: 'Canada' },
  london: { city: 'London', state: 'England', country: 'UK' },
}

// Race window: Monday 9:00 AM through Sunday 11:59 PM of the current week (one shared clock for everyone).
const now = new Date()
const raceStart = new Date(now)
raceStart.setDate(now.getDate() - ((now.getDay() + 6) % 7))
raceStart.setHours(9, 0, 0, 0)
const raceEnd = new Date(raceStart)
raceEnd.setDate(raceStart.getDate() + 6)
raceEnd.setHours(23, 59, 0, 0)
const elapsed = Math.max(now.getTime() - raceStart.getTime(), 60 * 60 * 1000)
const finishedAt = (fraction: number) => new Date(raceStart.getTime() + elapsed * fraction).toISOString()
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60 * 1000).toISOString()

export const ME_ID = 'me'
export const FRIEND_IDS = new Set(['p1', 'p2', 'p3', 'p9'])

export const players: MockPlayer[] = [
  { id: ME_ID, name: 'Maya', avatar: 'M', ...region.raleigh, seasonXp: 640, streaks: { daily: 4, weekly: 3, monthly: 2 }, raceFinishedAt: null },
  { id: 'p1', name: 'Alex', avatar: 'A', ...region.raleigh, seasonXp: 980, streaks: { daily: 21, weekly: 6, monthly: 3 }, raceFinishedAt: finishedAt(0.04) },
  { id: 'p2', name: 'Jordan', avatar: 'J', ...region.durham, seasonXp: 1120, streaks: { daily: 9, weekly: 8, monthly: 4 }, raceFinishedAt: finishedAt(0.07) },
  { id: 'p3', name: 'Priya', avatar: 'P', ...region.raleigh, seasonXp: 860, streaks: { daily: 14, weekly: 4, monthly: 2 }, raceFinishedAt: finishedAt(0.12) },
  { id: 'p4', name: 'Sam', avatar: 'S', ...region.charlotte, seasonXp: 720, streaks: { daily: 3, weekly: 2, monthly: 1 }, raceFinishedAt: finishedAt(0.16) },
  { id: 'p5', name: 'Diego', avatar: 'D', ...region.austin, seasonXp: 1340, streaks: { daily: 30, weekly: 10, monthly: 5 }, raceFinishedAt: finishedAt(0.02) },
  { id: 'p6', name: 'Lena', avatar: 'L', ...region.seattle, seasonXp: 910, streaks: { daily: 7, weekly: 5, monthly: 2 }, raceFinishedAt: finishedAt(0.22) },
  { id: 'p7', name: 'Kai', avatar: 'K', ...region.toronto, seasonXp: 1050, streaks: { daily: 12, weekly: 7, monthly: 3 }, raceFinishedAt: finishedAt(0.29) },
  { id: 'p8', name: 'Noor', avatar: 'N', ...region.london, seasonXp: 1210, streaks: { daily: 18, weekly: 9, monthly: 6 }, raceFinishedAt: finishedAt(0.05) },
  { id: 'p9', name: 'Theo', avatar: 'T', ...region.chapelHill, seasonXp: 590, streaks: { daily: 2, weekly: 2, monthly: 1 }, raceFinishedAt: finishedAt(0.34) },
  { id: 'p10', name: 'Rosa', avatar: 'R', ...region.newYork, seasonXp: 1060, streaks: { daily: 11, weekly: 3, monthly: 2 }, raceFinishedAt: finishedAt(0.41) },
  { id: 'p11', name: 'Ben', avatar: 'B', ...region.raleigh, seasonXp: 430, streaks: { daily: 1, weekly: 1, monthly: 1 }, raceFinishedAt: finishedAt(0.48) },
  { id: 'p12', name: 'Ivy', avatar: 'I', ...region.durham, seasonXp: 770, streaks: { daily: 6, weekly: 4, monthly: 2 }, raceFinishedAt: finishedAt(0.55) },
  { id: 'p13', name: 'Omar', avatar: 'O', ...region.austin, seasonXp: 880, streaks: { daily: 8, weekly: 3, monthly: 1 }, raceFinishedAt: finishedAt(0.63) },
  { id: 'p14', name: 'June', avatar: 'J', ...region.charlotte, seasonXp: 510, streaks: { daily: 5, weekly: 2, monthly: 1 }, raceFinishedAt: null },
  { id: 'p15', name: 'Mateo', avatar: 'M', ...region.raleigh, seasonXp: 690, streaks: { daily: 4, weekly: 2, monthly: 2 }, raceFinishedAt: null },
]

export const playerById = (id: string) => players.find(p => p.id === id)!
const summary = ({ id, name, avatar, city, state, country }: MockPlayer): PlayerSummary => ({ id, name, avatar, city, state, country })

export const currentRace = {
  id: 'race-2026-w41',
  quest: {
    id: 'race-pocket-museum', title: 'Pocket Museum', rarity: 'Rare' as QuestRarity,
    description: 'Arrange five everyday objects into a tiny museum exhibit and give it a title card.',
    photoPrompt: 'Capture your whole exhibit with its title card visible.',
  } satisfies RaceQuest,
  startsAt: raceStart.toISOString(),
  endsAt: raceEnd.toISOString(),
}

const photo = (seed: string) => `https://picsum.photos/seed/flarup-${seed}/800/800`
const post = (id: string, authorId: string, questId: string, questTitle: string, rarity: QuestRarity, period: FeedPost['period'], minutes: number, cheers: number, caption: string, mapVisible: boolean, visibility: FeedPost['visibility'] = 'community'): FeedPost => ({
  id, author: summary(playerById(authorId)), questId, questTitle, rarity, period, imageUrl: photo(id), caption,
  completedAt: minutesAgo(minutes), cheerCount: cheers, cheeredByMe: false, visibility, mapVisible,
})

export const posts: FeedPost[] = [
  post('post-1', 'p1', 'daily-hidden-beauty', 'Hidden Beauty', 'Common', 'daily', 12, 8, 'Walked past this mural every day for two years and never looked up.', true),
  post('post-2', 'p8', 'race-pocket-museum', 'Pocket Museum', 'Rare', 'race', 38, 21, '"Things I Found in My Coat" — admission free.', true),
  post('post-3', 'p3', 'daily-three-color', 'Three-Color Hunt', 'Common', 'daily', 55, 5, 'Yellow, teal, and way too much orange.', false, 'friends'),
  post('post-4', 'p5', 'weekly-skill-swap', 'Skill Swap', 'Rare', 'weekly', 90, 14, 'Traded a guitar chord for a sourdough lesson. Bread won.', true),
  post('post-5', 'p2', 'monthly-movie-scene', 'Real-Life Movie Scene', 'Epic', 'monthly', 140, 33, 'Our best attempt at the diner scene. The waiter played along.', true),
  post('post-6', 'p7', 'daily-tiny-creation', 'Tiny Creation', 'Rare', 'daily', 210, 9, 'A paperclip dragon guarding my desk.', true),
  post('post-7', 'p9', 'weekly-mystery-route', 'Mystery Route', 'Epic', 'weekly', 300, 11, 'Took the long way home and found a free little library.', true, 'friends'),
  post('post-8', 'p6', 'race-pocket-museum', 'Pocket Museum', 'Rare', 'race', 420, 17, 'The Museum of Lost Lids.', true),
  post('post-9', 'p10', 'monthly-open-mic', 'Open-Mic Moment', 'Legendary', 'monthly', 600, 41, 'Three minutes, one shaky poem, zero regrets.', true),
]
