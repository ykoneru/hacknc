import { describe, expect, it } from 'vitest'
import { mockCompletionResult, mockLevelProgress, mockStreakDetails } from '../data/mockData'
import { CompletionFeedback } from './CompletionFeedback'
import { streakStatusLabel } from './StreakCards'

describe('progression presentation', () => {
  it('presents independent daily, weekly, and monthly streak statuses', () => {
    expect(mockStreakDetails.map(streak => streak.period)).toEqual(['daily', 'weekly', 'monthly'])
    expect(mockStreakDetails.map(streakStatusLabel)).toEqual(['Completed', 'At risk', 'In progress'])
    expect(mockStreakDetails[0].current).toBe(4)
  })

  it('supports zero-day streaks without inventing progress', () => {
    const zero = { ...mockStreakDetails[1], current: 0, completedCurrentPeriod: false, status: 'active' as const }
    expect(zero.current).toBe(0); expect(streakStatusLabel(zero)).toBe('In progress')
  })

  it('uses supplied level data for XP progress', () => {
    expect(mockLevelProgress.totalXp).toBe(1240); expect(mockLevelProgress.xpIntoLevel).toBe(240); expect(mockLevelProgress.xpToNextLevel).toBe(360); expect(mockLevelProgress.progressPercent).toBe(40)
  })

  it('supports completion feedback with a level-up and chest result', () => {
    expect(CompletionFeedback).toBeTypeOf('function'); expect(mockCompletionResult.leveledUp).toBe(true); expect(mockCompletionResult.mysteryChestUnlocked).toBe(true); expect(mockCompletionResult.updatedStreak).toBe(5)
  })

  it('keeps missing progression data safe for loading UI', () => {
    expect(mockLevelProgress.nextMilestone).toBeTruthy(); expect(() => CompletionFeedback({ result: mockCompletionResult })).not.toThrow()
  })
})
