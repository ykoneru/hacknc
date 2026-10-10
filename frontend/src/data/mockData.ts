import type { Quest, StreakSummary, UserProfile } from '../domain'

export const mockProfile: UserProfile = {
  name: 'Maya', handle: '@mayamakes', level: 7, xp: 1240, nextLevelXp: 1600, avatar: 'M',
}

export const mockStreaks: StreakSummary = { daily: 4, weekly: 3, monthly: 2 }

export const mockQuests: Quest[] = [
  { id: 'daily-hidden-beauty', title: 'Hidden Beauty', description: 'Find a tiny detail in your everyday surroundings that most people miss.', period: 'daily', category: 'Explore', rarity: 'Common', xp: 25, deadline: 'Ends today', completed: false, accent: 'sunrise' },
  { id: 'daily-three-color', title: 'Three-Color Hunt', description: 'Capture three colors that tell the story of your day.', period: 'daily', category: 'Creative', rarity: 'Common', xp: 25, deadline: 'Ends today', completed: false, accent: 'peach' },
  { id: 'daily-tiny-creation', title: 'Tiny Creation', description: 'Make something small, strange, and entirely your own.', period: 'daily', category: 'Creative', rarity: 'Rare', xp: 40, deadline: 'Ends today', completed: false, accent: 'lavender' },
  { id: 'weekly-movie-poster', title: 'Movie Poster Challenge', description: 'Recreate a recognizable movie poster with whatever you have around.', period: 'weekly', category: 'Creative', rarity: 'Rare', xp: 100, deadline: '5 days left', completed: false, accent: 'mint' },
  { id: 'weekly-skill-swap', title: 'Skill Swap', description: 'Learn one unexpected trick from a friend, then teach one back.', period: 'weekly', category: 'Social', rarity: 'Rare', xp: 100, deadline: '5 days left', completed: false, accent: 'blue' },
  { id: 'weekly-mystery-route', title: 'Mystery Route', description: 'Take a safe, unfamiliar route and notice three things along the way.', period: 'weekly', category: 'Adventure', rarity: 'Epic', xp: 150, deadline: '5 days left', completed: false, accent: 'lime' },
  { id: 'monthly-movie-scene', title: 'Real-Life Movie Scene', description: 'Turn an ordinary moment into a scene worth remembering.', period: 'monthly', category: 'Adventure', rarity: 'Epic', xp: 300, deadline: '18 days left', completed: false, accent: 'coral' },
  { id: 'monthly-theme-night', title: 'Build a Mini Tradition', description: 'Start a tiny tradition that future-you will want to repeat.', period: 'monthly', category: 'Community', rarity: 'Epic', xp: 300, deadline: '18 days left', completed: false, accent: 'gold' },
  { id: 'monthly-open-mic', title: 'Open-Mic Moment', description: 'Share a creative spark with a room, a friend, or just yourself.', period: 'monthly', category: 'Brave', rarity: 'Legendary', xp: 450, deadline: '18 days left', completed: false, accent: 'violet' },
]
