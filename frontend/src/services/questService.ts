import { mockQuests } from '../data/mockData'
import type { Quest, QuestPeriod } from '../domain'

export const MOCK_TIME_ZONE = 'America/New_York'
export const MOCK_USER_ID = 'mock-user-maya'
export const MOCK_REROLLS_PER_PERIOD = 1
const STORAGE_KEY = 'flarup:mock-quest-state:v1'

type StoredPeriod = { periodKey: string; offerIds: string[]; remainingRerolls: number; activeQuestId?: string; completedQuestIds?: string[] }
type StoredState = { userId: string; periods: Partial<Record<QuestPeriod, StoredPeriod>> }
type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export interface QuestService {
  getQuestOffers(period: QuestPeriod): Promise<Quest[]>
  getRemainingRerolls(period: QuestPeriod): Promise<number>
  selectQuest(period: QuestPeriod, questId: string): Promise<Quest[]>
  abandonQuest(period: QuestPeriod, questId: string): Promise<Quest[]>
  rerollQuestOffers(period: QuestPeriod): Promise<Quest[]>
}

export function getPeriodKey(period: QuestPeriod, now = new Date(), timeZone = MOCK_TIME_ZONE): string {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  const values = Object.fromEntries(parts.filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)])) as { year: number; month: number; day: number }
  if (period === 'daily') return `${values.year}-${String(values.month).padStart(2, '0')}-${String(values.day).padStart(2, '0')}`
  if (period === 'monthly') return `${values.year}-${String(values.month).padStart(2, '0')}`
  const date = new Date(Date.UTC(values.year, values.month - 1, values.day))
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7))
  return `${date.getUTCFullYear()}-W${String(Math.floor((date.getTime() - Date.UTC(date.getUTCFullYear(), 0, 1)) / 86400000 / 7) + 1).padStart(2, '0')}`
}

function getPeriodEnd(period: QuestPeriod, now: Date, timeZone: string): Date {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  const values = Object.fromEntries(parts.filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)])) as { year: number; month: number; day: number }
  if (period === 'daily') return zonedMidnight(values.year, values.month, values.day + 1, timeZone)
  if (period === 'monthly') return zonedMidnight(values.year, values.month + 1, 1, timeZone)
  const date = new Date(Date.UTC(values.year, values.month - 1, values.day))
  date.setUTCDate(date.getUTCDate() + (7 - date.getUTCDay()))
  return zonedMidnight(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), timeZone)
}

function zonedMidnight(year: number, month: number, day: number, timeZone: string): Date {
  const guess = Date.UTC(year, month - 1, day)
  const actual = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(guess))
  const parts = Object.fromEntries(actual.filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)])) as { year: number; month: number; day: number; hour: number }
  return new Date(guess + (Date.UTC(year, month - 1, day) - Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour)))
}

export function isPeriodExpired(period: QuestPeriod, now = new Date(), timeZone = MOCK_TIME_ZONE): boolean { return now.getTime() >= getPeriodEnd(period, now, timeZone).getTime() }

export function formatDeadline(period: QuestPeriod, now = new Date(), timeZone = MOCK_TIME_ZONE): string {
  if (isPeriodExpired(period, now, timeZone)) return 'Period expired'
  if (period === 'daily') return 'Ends today'
  const days = Math.max(1, Math.ceil((getPeriodEnd(period, now, timeZone).getTime() - now.getTime()) / 86400000))
  return `${days} ${days === 1 ? 'day' : 'days'} left`
}

function emptyState(): StoredState { return { userId: MOCK_USER_ID, periods: {} } }
function getStorage(storage?: StorageLike): StorageLike | undefined { return storage ?? (typeof localStorage === 'undefined' ? undefined : localStorage) }

export class MockQuestService implements QuestService {
  private readonly storage?: StorageLike
  private readonly now: () => Date
  private readonly timeZone: string

  constructor(options: { storage?: StorageLike; now?: () => Date; timeZone?: string } = {}) { this.storage = getStorage(options.storage); this.now = options.now ?? (() => new Date()); this.timeZone = options.timeZone ?? MOCK_TIME_ZONE }

  async getQuestOffers(period: QuestPeriod): Promise<Quest[]> {
    const state = this.readState(); const periodKey = getPeriodKey(period, this.now(), this.timeZone); let stored = state.periods[period]
    if (!stored || stored.periodKey !== periodKey) { stored = this.createPeriod(period, periodKey); state.periods[period] = stored; this.writeState(state) }
    return this.materialize(period, stored)
  }

  async getRemainingRerolls(period: QuestPeriod): Promise<number> { await this.getQuestOffers(period); return this.readState().periods[period]?.remainingRerolls ?? 0 }

  async selectQuest(period: QuestPeriod, questId: string): Promise<Quest[]> {
    const offers = await this.getQuestOffers(period); const state = this.readState(); const stored = state.periods[period]
    if (!stored || !offers.some(quest => quest.id === questId)) throw new Error('That quest is not available in the current offers.')
    if (stored.activeQuestId) throw new Error('You already have an active quest for this period.')
    if (isPeriodExpired(period, this.now(), this.timeZone)) throw new Error('This quest period has expired.')
    stored.activeQuestId = questId; this.writeState(state); return this.materialize(period, stored)
  }

  async abandonQuest(period: QuestPeriod, questId: string): Promise<Quest[]> {
    const offers = await this.getQuestOffers(period); const state = this.readState(); const stored = state.periods[period]
    if (!stored || !offers.some(quest => quest.id === questId)) throw new Error('That quest is not available in the current offers.')
    if (stored.completedQuestIds?.includes(questId)) throw new Error('Completed quests cannot be abandoned.')
    if (stored.activeQuestId !== questId) throw new Error('Only the active quest can be abandoned.')
    if (isPeriodExpired(period, this.now(), this.timeZone)) throw new Error('This quest period has expired.')
    stored.activeQuestId = undefined; this.writeState(state); return this.materialize(period, stored)
  }

  async rerollQuestOffers(period: QuestPeriod): Promise<Quest[]> {
    const offers = await this.getQuestOffers(period); const state = this.readState(); const stored = state.periods[period]
    if (!stored) throw new Error('Quest offers are not ready.')
    if (stored.activeQuestId) throw new Error('Rerolls are unavailable after selecting an active quest.')
    if (!stored.remainingRerolls) throw new Error('No rerolls remain for this period.')
    if (isPeriodExpired(period, this.now(), this.timeZone)) throw new Error('This quest period has expired.')
    const previousIds = new Set(offers.map(quest => quest.id)); const pool = mockQuests.filter(quest => quest.period === period && !previousIds.has(quest.id))
    if (pool.length < 3) throw new Error('There are not enough alternate quests for this reroll.')
    stored.offerIds = pool.slice(0, 3).map(quest => quest.id); stored.remainingRerolls -= 1; this.writeState(state); return this.materialize(period, stored)
  }

  private createPeriod(period: QuestPeriod, periodKey: string): StoredPeriod { return { periodKey, offerIds: mockQuests.filter(quest => quest.period === period).slice(0, 3).map(quest => quest.id), remainingRerolls: MOCK_REROLLS_PER_PERIOD } }
  private materialize(period: QuestPeriod, stored: StoredPeriod): Quest[] {
    const expired = isPeriodExpired(period, this.now(), this.timeZone)
    return stored.offerIds.map(id => mockQuests.find(quest => quest.id === id)).filter((quest): quest is Quest => Boolean(quest)).map(quest => ({ ...quest, status: expired ? 'expired' : stored.completedQuestIds?.includes(quest.id) ? 'completed' : stored.activeQuestId === quest.id ? 'active' : 'available', deadline: formatDeadline(period, this.now(), this.timeZone) }))
  }
  private readState(): StoredState { if (!this.storage) return emptyState(); const raw = this.storage.getItem(STORAGE_KEY); if (!raw) return emptyState(); try { const parsed = JSON.parse(raw) as StoredState; return parsed.userId === MOCK_USER_ID ? parsed : emptyState() } catch { return emptyState() } }
  private writeState(state: StoredState) { this.storage?.setItem(STORAGE_KEY, JSON.stringify(state)) }
}

export const questService = new MockQuestService()
