import { mockLevelProgress, mockStreakDetails } from '../data/mockData'
import type { LevelProgress, ProgressionSnapshot, StreakDetail } from '../domain'

export interface ProgressionService {
  getProgression(): Promise<ProgressionSnapshot>
  getStreakSummary(): Promise<StreakDetail[]>
  getLevelProgress(): Promise<LevelProgress>
}

// Adapter boundary for Developer 3's future authoritative progression contract.
export const progressionService: ProgressionService = {
  async getProgression() { return Promise.resolve({ streaks: mockStreakDetails, level: mockLevelProgress }) },
  async getStreakSummary() { return Promise.resolve(mockStreakDetails) },
  async getLevelProgress() { return Promise.resolve(mockLevelProgress) },
}
