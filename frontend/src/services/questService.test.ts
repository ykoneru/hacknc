import { describe, expect, it } from 'vitest'
import { MockQuestService, getPeriodKey } from './questService'
import { canOpenQuestDetails } from '../components/QuestCard'
import type { QuestPeriod } from '../domain'

function memoryStorage() {
  const values = new Map<string, string>()
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value), removeItem: (key: string) => values.delete(key) }
}

const date = new Date('2026-10-10T16:00:00.000Z')
const serviceFor = (storage = memoryStorage(), now = date) => new MockQuestService({ storage, now: () => now })

describe('MockQuestService', () => {
  it('keeps active quest cards interactive while restricting completed and expired cards', () => {
    expect(canOpenQuestDetails('active')).toBe(true)
    expect(canOpenQuestDetails('available')).toBe(true)
    expect(canOpenQuestDetails('completed')).toBe(false)
    expect(canOpenQuestDetails('expired')).toBe(false)
  })

  it('selects one quest and prevents a second selection in the same period', async () => {
    const service = serviceFor(); const offers = await service.getQuestOffers('daily'); await service.selectQuest('daily', offers[0].id)
    await expect(service.selectQuest('daily', offers[1].id)).rejects.toThrow('already have an active quest')
  })

  it('abandons an active quest and returns the same offers to available state', async () => {
    const storage = memoryStorage(); const service = serviceFor(storage); const offers = await service.getQuestOffers('daily'); await service.selectQuest('daily', offers[0].id)
    const abandoned = await service.abandonQuest('daily', offers[0].id)
    expect(abandoned.map(quest => quest.id)).toEqual(offers.map(quest => quest.id)); expect(abandoned.every(quest => quest.status === 'available')).toBe(true)
  })

  it('allows the remaining reroll after abandonment without refunding or changing offers during abandonment', async () => {
    const storage = memoryStorage(); const service = serviceFor(storage); const offers = await service.getQuestOffers('weekly'); await service.selectQuest('weekly', offers[0].id); const abandoned = await service.abandonQuest('weekly', offers[0].id)
    expect(await service.getRemainingRerolls('weekly')).toBe(1); const rerolled = await service.rerollQuestOffers('weekly'); expect(rerolled.map(quest => quest.id)).not.toEqual(abandoned.map(quest => quest.id)); expect(await service.getRemainingRerolls('weekly')).toBe(0)
  })

  it('persists abandonment and keeps other periods independent', async () => {
    const storage = memoryStorage(); const service = serviceFor(storage); const daily = await service.getQuestOffers('daily'); const monthly = await service.getQuestOffers('monthly'); await service.selectQuest('daily', daily[0].id); await service.selectQuest('monthly', monthly[0].id); await service.abandonQuest('daily', daily[0].id)
    const restored = serviceFor(storage); expect((await restored.getQuestOffers('daily'))[0].status).toBe('available'); expect((await restored.getQuestOffers('monthly'))[0].status).toBe('active')
  })

  it('does not allow a completed quest to be abandoned', async () => {
    const storage = memoryStorage(); const offers = await serviceFor(storage).getQuestOffers('daily'); storage.setItem('flarup:mock-quest-state:v1', JSON.stringify({ userId: 'mock-user-maya', periods: { daily: { periodKey: getPeriodKey('daily', date), offerIds: offers.map(quest => quest.id), remainingRerolls: 1, activeQuestId: offers[0].id, completedQuestIds: [offers[0].id] } } }))
    await expect(serviceFor(storage).abandonQuest('daily', offers[0].id)).rejects.toThrow('Completed quests cannot be abandoned')
  })

  it('keeps daily, weekly, and monthly selections independent', async () => {
    const service = serviceFor(); const daily = await service.getQuestOffers('daily'); const weekly = await service.getQuestOffers('weekly')
    await service.selectQuest('daily', daily[0].id); await expect(service.selectQuest('weekly', weekly[0].id)).resolves.toHaveLength(3)
  })

  it('persists selected quests and offers after a new service is created', async () => {
    const storage = memoryStorage(); const first = serviceFor(storage); const offers = await first.getQuestOffers('monthly'); await first.selectQuest('monthly', offers[1].id)
    const restored = await serviceFor(storage).getQuestOffers('monthly'); expect(restored.find(quest => quest.id === offers[1].id)?.status).toBe('active')
  })

  it('rerolls to a different, unique set and decrements allowance', async () => {
    const service = serviceFor(); const before = await service.getQuestOffers('daily'); const after = await service.rerollQuestOffers('daily')
    expect(new Set(after.map(quest => quest.id)).size).toBe(3); expect(after.some(quest => before.some(previous => previous.id === quest.id))).toBe(false); expect(await service.getRemainingRerolls('daily')).toBe(0)
  })

  it('blocks rerolls after selection and when allowance is zero', async () => {
    const service = serviceFor(); const offers = await service.getQuestOffers('weekly'); await service.selectQuest('weekly', offers[0].id); await expect(service.rerollQuestOffers('weekly')).rejects.toThrow('unavailable')
    const other = serviceFor(); await other.getQuestOffers('monthly'); await other.rerollQuestOffers('monthly'); await expect(other.rerollQuestOffers('monthly')).rejects.toThrow('No rerolls remain')
  })

  it('refreshes expired offers before they can be selected', async () => {
    const storage = memoryStorage(); const before = serviceFor(storage, new Date('2026-10-10T16:00:00.000Z')); await before.getQuestOffers('daily'); const after = serviceFor(storage, new Date('2026-10-11T16:00:00.000Z')); const refreshed = await after.getQuestOffers('daily'); expect(refreshed.every(quest => quest.status !== 'expired')).toBe(true); expect(await after.getRemainingRerolls('daily')).toBe(1)
  })

  it('refreshes only the period whose period key changed', async () => {
    const storage = memoryStorage(); const before = serviceFor(storage, new Date('2026-10-10T16:00:00.000Z')); const daily = await before.getQuestOffers('daily'); await before.selectQuest('daily', daily[0].id); await before.getQuestOffers('weekly')
    const nextDay = serviceFor(storage, new Date('2026-10-11T16:00:00.000Z')); const refreshedDaily = await nextDay.getQuestOffers('daily'); const weekly = await nextDay.getQuestOffers('weekly')
    expect(refreshedDaily.every(quest => quest.status === 'available')).toBe(true); expect(weekly).toHaveLength(3)
  })

  it('uses stable local period keys and does not award progress on selection', async () => {
    const service = serviceFor(); const offers = await service.getQuestOffers('daily'); const selected = await service.selectQuest('daily', offers[0].id)
    expect(getPeriodKey('daily', date)).toBe('2026-10-10'); expect(selected[0].status).toBe('active'); expect(selected[0].xp).toBe(25)
  })

  it.each<QuestPeriod>(['daily', 'weekly', 'monthly'])('keeps %s offers duplicate-free', async period => {
    const offers = await serviceFor().getQuestOffers(period); expect(new Set(offers.map(quest => quest.id)).size).toBe(offers.length)
  })
})
