import type { CompletionResult, LevelProgress, MysteryChest, PassportEntry, Quest, QuestCollection, Reward, RewardInventory, StreakDetail, StreakSummary, UserProfile } from '../domain'

export const mockProfile: UserProfile = {
  name: 'Maya', handle: '@mayamakes', level: 7, xp: 1240, nextLevelXp: 1600, avatar: 'M',
}

export const mockStreaks: StreakSummary = { daily: 4, weekly: 3, monthly: 2 }

export const mockStreakDetails: StreakDetail[] = [
  { period: 'daily', current: 4, completedCurrentPeriod: true, status: 'completed', message: 'You showed up today. Nice work.' },
  { period: 'weekly', current: 3, completedCurrentPeriod: false, status: 'at-risk', message: 'One adventure keeps this streak alive.' },
  { period: 'monthly', current: 2, completedCurrentPeriod: false, status: 'active', message: 'Your next big memory is waiting.' },
]

export const mockLevelProgress: LevelProgress = { level: 7, totalXp: 1240, levelStartXp: 1000, nextLevelXp: 1600, xpIntoLevel: 240, xpToNextLevel: 360, progressPercent: 40, nextMilestone: 'Unlocks collaborative storytelling' }

export const mockCompletionResult: CompletionResult = { questTitle: 'Hidden Beauty', xpEarned: 25, updatedStreak: 5, level: { level: 8, totalXp: 1600, levelStartXp: 1600, nextLevelXp: 2200, xpIntoLevel: 0, xpToNextLevel: 600, progressPercent: 0, nextMilestone: 'Unlocks a new quest style' }, leveledUp: true, mysteryChestUnlocked: true }

export const mockRewards: Reward[] = [
  { id: 'reward-trailblazer-badge', name: 'Trailblazer Badge', rarity: 'Common', type: 'badge', cosmeticSlot: 'badge', description: 'A small mark for choosing the path less ordinary.' },
  { id: 'reward-golden-explorer-frame', name: 'Golden Explorer Frame', rarity: 'Rare', type: 'profile-frame', cosmeticSlot: 'frame', description: 'A warm glow for a profile that keeps moving.' },
  { id: 'reward-midnight-title', name: 'Midnight Adventurer', rarity: 'Epic', type: 'title', cosmeticSlot: 'title', description: 'For the people who find stories after sunset.' },
  { id: 'reward-extra-reroll', name: 'Extra Quest Reroll', rarity: 'Rare', type: 'reroll-token', description: 'A utility token reserved for a future quest assignment.' , quantity: 1 },
  { id: 'reward-hidden-adventure', name: 'Hidden Adventure Unlock', rarity: 'Legendary', type: 'special-quest', description: 'A special quest pack waiting for a future adventure.' },
]

export const mockChests: MysteryChest[] = [
  { id: 'chest-common-welcome', name: 'Trail Starter Chest', rarity: 'Common', description: 'A little something for beginning your real-world adventure.', status: 'unopened', rewardId: 'reward-trailblazer-badge' },
  { id: 'chest-rare-weekend', name: 'Weekend Wanderer Chest', rarity: 'Rare', description: 'A brighter reward for breaking the routine.', status: 'unopened', rewardId: 'reward-golden-explorer-frame' },
  { id: 'chest-epic-mystery', name: 'Mystery Horizon Chest', rarity: 'Epic', description: 'Something memorable is waiting inside.', status: 'unopened', rewardId: 'reward-midnight-title' },
]

export const mockRewardInventory: RewardInventory = { rewards: [{ ...mockRewards[0], quantity: 1 }], equipped: { badge: 'reward-trailblazer-badge' } }

export const mockPassportEntries: PassportEntry[] = [
  { id: 'passport-hidden-beauty', questTitle: 'Hidden Beauty', completedAt: '2026-10-08', period: 'daily', category: 'Explore', rarity: 'Common', xpEarned: 25, caption: 'A tiny golden corner of an ordinary walk.', locationLabel: 'Chapel Hill, NC', isPrivate: false },
  { id: 'passport-skill-swap', questTitle: 'Skill Swap', completedAt: '2026-10-04', period: 'weekly', category: 'Social', rarity: 'Rare', xpEarned: 100, caption: 'Learned a paper-folding trick I will definitely use again.', locationLabel: 'Private entry', isPrivate: true },
  { id: 'passport-mini-tradition', questTitle: 'Build a Mini Tradition', completedAt: '2026-09-28', period: 'monthly', category: 'Community', rarity: 'Epic', xpEarned: 300, caption: 'Sunday breakfast, now officially a tradition.', locationLabel: 'Chapel Hill, NC', isPrivate: false },
]

export const mockCollections: QuestCollection[] = [
  { id: 'creative-explorer', name: 'Creative Explorer', description: 'Make, notice, and share something with a fresh point of view.', icon: 'palette', progress: 2, required: 4, unlocked: false, rewardPreview: 'Explorer Chest' },
  { id: 'social-butterfly', name: 'Social Butterfly', description: 'Turn a small moment into a memory with someone else.', icon: 'users', progress: 3, required: 3, unlocked: true, rewardPreview: 'Golden Social Badge' },
  { id: 'neighborhood-adventurer', name: 'Neighborhood Adventurer', description: 'Find stories and surprises close to home.', icon: 'compass', progress: 1, required: 4, unlocked: false, rewardPreview: 'Map Pin Cosmetic' },
  { id: 'memory-maker', name: 'Memory Maker', description: 'Collect moments worth keeping long after the streak ends.', icon: 'camera', progress: 2, required: 5, unlocked: false, rewardPreview: 'Memory Title' },
  { id: 'community-champion', name: 'Community Champion', description: 'Show up for the places and people around you.', icon: 'heart', progress: 0, required: 3, unlocked: false, rewardPreview: 'Community Chest' },
]

export const mockQuests: Quest[] = [
  { id: 'daily-hidden-beauty', title: 'Hidden Beauty', description: 'Find a tiny detail in your everyday surroundings that most people miss.', period: 'daily', category: 'Explore', rarity: 'Common', xp: 25, deadline: '', status: 'available', accent: 'sunrise' },
  { id: 'daily-three-color', title: 'Three-Color Hunt', description: 'Capture three colors that tell the story of your day.', period: 'daily', category: 'Creative', rarity: 'Common', xp: 25, deadline: '', status: 'available', accent: 'peach' },
  { id: 'daily-tiny-creation', title: 'Tiny Creation', description: 'Make something small, strange, and entirely your own.', period: 'daily', category: 'Creative', rarity: 'Rare', xp: 40, deadline: '', status: 'available', accent: 'lavender' },
  { id: 'daily-soundtrack', title: 'Soundtrack of Today', description: 'Find a song that matches this exact moment and share why.', period: 'daily', category: 'Creative', rarity: 'Common', xp: 25, deadline: '', status: 'available', accent: 'blue' },
  { id: 'daily-photo-time-machine', title: 'Photo Time Machine', description: 'Recreate a small memory using what is around you today.', period: 'daily', category: 'Memory', rarity: 'Rare', xp: 40, deadline: '', status: 'available', accent: 'peach' },
  { id: 'daily-color-story', title: 'Color Story', description: 'Build a tiny visual story from five things in one color.', period: 'daily', category: 'Creative', rarity: 'Common', xp: 25, deadline: '', status: 'available', accent: 'lime' },
  { id: 'weekly-movie-poster', title: 'Movie Poster Challenge', description: 'Recreate a recognizable movie poster with whatever you have around.', period: 'weekly', category: 'Creative', rarity: 'Rare', xp: 100, deadline: '', status: 'available', accent: 'mint' },
  { id: 'weekly-skill-swap', title: 'Skill Swap', description: 'Learn one unexpected trick from a friend, then teach one back.', period: 'weekly', category: 'Social', rarity: 'Rare', xp: 100, deadline: '', status: 'available', accent: 'blue' },
  { id: 'weekly-mystery-route', title: 'Mystery Route', description: 'Take a safe, unfamiliar route and notice three things along the way.', period: 'weekly', category: 'Adventure', rarity: 'Epic', xp: 150, deadline: '', status: 'available', accent: 'lime' },
  { id: 'weekly-one-hour-artist', title: 'One-Hour Artist', description: 'Spend one focused hour making something with no goal beyond curiosity.', period: 'weekly', category: 'Creative', rarity: 'Rare', xp: 100, deadline: '', status: 'available', accent: 'lavender' },
  { id: 'weekly-friend-adventure', title: 'Friend-Designed Adventure', description: 'Let a friend choose a safe, surprising mini-adventure for you.', period: 'weekly', category: 'Social', rarity: 'Epic', xp: 150, deadline: '', status: 'available', accent: 'coral' },
  { id: 'weekly-new-local-spot', title: 'New Local Spot', description: 'Spend a little time somewhere nearby you have never explored.', period: 'weekly', category: 'Explore', rarity: 'Rare', xp: 100, deadline: '', status: 'available', accent: 'sunrise' },
  { id: 'monthly-movie-scene', title: 'Real-Life Movie Scene', description: 'Turn an ordinary moment into a scene worth remembering.', period: 'monthly', category: 'Adventure', rarity: 'Epic', xp: 300, deadline: '', status: 'available', accent: 'coral' },
  { id: 'monthly-theme-night', title: 'Build a Mini Tradition', description: 'Start a tiny tradition that future-you will want to repeat.', period: 'monthly', category: 'Community', rarity: 'Epic', xp: 300, deadline: '', status: 'available', accent: 'gold' },
  { id: 'monthly-open-mic', title: 'Open-Mic Moment', description: 'Share a creative spark with a room, a friend, or just yourself.', period: 'monthly', category: 'Brave', rarity: 'Legendary', xp: 450, deadline: '', status: 'available', accent: 'violet' },
  { id: 'monthly-unknown-destination', title: 'The Unknown Destination', description: 'Plan a safe, low-cost outing to somewhere new within reach.', period: 'monthly', category: 'Explore', rarity: 'Epic', xp: 300, deadline: '', status: 'available', accent: 'blue' },
  { id: 'monthly-mini-documentary', title: 'Mini Documentary', description: 'Tell the story of a person, place, or tradition with care and consent.', period: 'monthly', category: 'Community', rarity: 'Legendary', xp: 450, deadline: '', status: 'available', accent: 'mint' },
  { id: 'monthly-build-a-tradition', title: 'Host a Theme Night', description: 'Gather a few people or enjoy a solo version of a themed evening.', period: 'monthly', category: 'Social', rarity: 'Epic', xp: 300, deadline: '', status: 'available', accent: 'peach' },
]
