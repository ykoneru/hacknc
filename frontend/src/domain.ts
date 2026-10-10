export type QuestPeriod = 'daily' | 'weekly' | 'monthly'
export type QuestRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary'

export type Quest = {
  id: string
  title: string
  description: string
  period: QuestPeriod
  category: string
  rarity: QuestRarity
  xp: number
  deadline: string
  completed: boolean
  accent: string
}

export type UserProfile = {
  name: string
  handle: string
  level: number
  xp: number
  nextLevelXp: number
  avatar: string
}

export type StreakSummary = {
  daily: number
  weekly: number
  monthly: number
}
