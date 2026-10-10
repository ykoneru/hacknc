import type { Quest } from '../domain'
import { mockQuests } from '../data/mockData'

// Adapter boundary for Developer 3's future quest-assignment contract.
export const questService = {
  async getAvailableQuests(): Promise<Quest[]> { return Promise.resolve(mockQuests) },
}
