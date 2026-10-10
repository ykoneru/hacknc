import { cityCoords, posts } from '../data/socialMock'
import type { MapMarker } from '../socialTypes'
import { delay } from './mockLatency'

// Adapter boundary for Developer 4's GET /api/map/submissions.
// Only community posts whose authors opted into the map, grouped to city level.
export const mapService = {
  async getMarkers(): Promise<MapMarker[]> {
    const byCity = new Map<string, MapMarker>()
    for (const p of posts) {
      if (!p.mapVisible || p.visibility !== 'community') continue
      const coords = cityCoords[p.author.city]
      if (!coords) continue
      const key = `${p.author.city}-${p.author.country}`
      const marker = byCity.get(key) ?? { id: key, lat: coords[0], lng: coords[1], regionLabel: `${p.author.city}, ${p.author.state}`, posts: [] }
      marker.posts.push({ id: p.id, questTitle: p.questTitle, rarity: p.rarity, imageUrl: p.imageUrl, authorName: p.author.name, completedAt: p.completedAt })
      byCity.set(key, marker)
    }
    const markers = [...byCity.values()]
    markers.forEach(m => m.posts.sort((a, b) => b.completedAt.localeCompare(a.completedAt)))
    return delay(markers)
  },
}
