import { describe, expect, it } from 'vitest'
import { mockPassportEntries } from '../data/mockData'
import { filterPassportEntries, sortPassportEntries } from './passportService'
describe('passport presentation helpers', () => { it('filters by quest period', () => { expect(filterPassportEntries(mockPassportEntries, 'weekly')).toHaveLength(1); expect(filterPassportEntries(mockPassportEntries, 'all')).toHaveLength(3) }); it('sorts newest and oldest without mutating input', () => { expect(sortPassportEntries(mockPassportEntries, 'newest')[0].completedAt).toBe('2026-10-08'); expect(sortPassportEntries(mockPassportEntries, 'oldest')[0].completedAt).toBe('2026-09-28') }) })
