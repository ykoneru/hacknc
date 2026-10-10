import { mockPassportEntries } from '../data/mockData'
import type { PassportEntry, QuestPeriod } from '../domain'

export interface PassportService { getEntries(): Promise<PassportEntry[]> }
export const passportService: PassportService = { async getEntries() { return Promise.resolve(mockPassportEntries.map(entry => ({ ...entry }))) } }
export function filterPassportEntries(entries: PassportEntry[], period: QuestPeriod | 'all'): PassportEntry[] { return period === 'all' ? entries : entries.filter(entry => entry.period === period) }
export function sortPassportEntries(entries: PassportEntry[], order: 'newest' | 'oldest'): PassportEntry[] { return [...entries].sort((a, b) => order === 'newest' ? b.completedAt.localeCompare(a.completedAt) : a.completedAt.localeCompare(b.completedAt)) }
