import { FRIEND_IDS, ME_ID, posts } from '../data/socialMock'
import type { FeedFilter, FeedPost } from '../socialTypes'
import { delay } from './mockLatency'

// Adapter boundary for Developer 4's GET /api/feed and /api/posts/:id/cheer.
// Visibility is enforced server-side in the real API; the mock mirrors those rules.
export const feedService = {
  async getFeed(filter: FeedFilter): Promise<FeedPost[]> {
    const visible = posts.filter(p => {
      if (p.visibility === 'private') return false
      if (filter === 'friends') return FRIEND_IDS.has(p.author.id) || p.author.id === ME_ID
      return p.visibility === 'community'
    })
    const sorted = [...visible].sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    return delay(sorted.map(p => ({ ...p })))
  },

  async setCheer(postId: string, cheered: boolean): Promise<{ cheerCount: number; cheeredByMe: boolean }> {
    const target = posts.find(p => p.id === postId)
    if (!target) throw new Error('Post not found')
    if (target.cheeredByMe !== cheered) {
      target.cheeredByMe = cheered
      target.cheerCount += cheered ? 1 : -1
    }
    return delay({ cheerCount: target.cheerCount, cheeredByMe: target.cheeredByMe }, 150)
  },
}
