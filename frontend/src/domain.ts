export type QuestPeriod = 'daily' | 'weekly' | 'monthly'
export type QuestRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary'
export type QuestStatus = 'available' | 'active' | 'completed' | 'expired'

export type Quest = {
  id: string
  title: string
  description: string
  period: QuestPeriod
  category: string
  rarity: QuestRarity
  xp: number
  deadline: string
  status: QuestStatus
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

export type StreakPeriodStatus = 'active' | 'completed' | 'at-risk'

export type StreakDetail = {
  period: QuestPeriod
  current: number
  completedCurrentPeriod: boolean
  status: StreakPeriodStatus
  message: string
}

export type LevelProgress = {
  level: number
  totalXp: number
  levelStartXp: number
  nextLevelXp: number
  xpIntoLevel: number
  xpToNextLevel: number
  progressPercent: number
  nextMilestone?: string
}

export type ProgressionSnapshot = {
  streaks: StreakDetail[]
  level: LevelProgress
}

export type CompletionResult = {
  questTitle: string
  xpEarned: number
  updatedStreak: number
  level: LevelProgress
  leveledUp: boolean
  mysteryChestUnlocked: boolean
}

export type RewardRarity = QuestRarity
export type RewardType = 'profile-frame' | 'badge' | 'title' | 'reroll-token' | 'special-quest'
export type CosmeticSlot = 'frame' | 'badge' | 'title'
export type ChestStatus = 'unopened' | 'opening' | 'opened'

export type Reward = {
  id: string
  name: string
  rarity: RewardRarity
  type: RewardType
  description: string
  cosmeticSlot?: CosmeticSlot
  quantity?: number
}

export type MysteryChest = {
  id: string
  name: string
  rarity: RewardRarity
  description: string
  status: ChestStatus
  rewardId: string
}

export type RewardInventory = {
  rewards: Reward[]
  equipped: Partial<Record<CosmeticSlot, string>>
}

export type PrivacyPreferences = { profileVisibility: 'private' | 'friends' | 'public'; publicActivity: boolean }
export type ProfilePreferences = { interests: string[]; timezone: string; city?: string; state?: string; country?: string; university?: string; privacy: PrivacyPreferences }
export type MockUserProfile = UserProfile & ProfilePreferences & { onboardingComplete: boolean; totalQuestsCompleted: number }
export type PassportEntry = { id: string; questTitle: string; completedAt: string; period: QuestPeriod; category: string; rarity: QuestRarity; xpEarned: number; photoUrl?: string; caption?: string; locationLabel?: string; isPrivate: boolean }
export type QuestCollection = { id: string; name: string; description: string; icon: string; progress: number; required: number; unlocked: boolean; rewardPreview: string }
