import { describe, expect, it } from 'vitest'
import { PROFILE_STORAGE_KEY, MockProfileService } from './profileService'

function storage() { const values = new Map<string, string>(); return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value), removeItem: (key: string) => values.delete(key) } }
describe('MockProfileService', () => {
  it('persists onboarding preferences and completion, including country', async () => { const store = storage(); const service = new MockProfileService(store); const profile = await service.saveOnboarding({ name: 'Ada', interests: ['Creative'], timezone: 'UTC', city: 'Durham', state: 'NC', country: 'Canada', university: 'Duke', privacy: { profileVisibility: 'private', publicActivity: false } }); expect(profile.onboardingComplete).toBe(true); expect(profile.handle).toBe('@ada'); expect(profile.interests).toEqual(['Creative']); expect(profile.country).toBe('Canada'); expect((await new MockProfileService(store).getProfile()).country).toBe('Canada') })
  it('persists privacy updates across service reloads', async () => { const store = storage(); const service = new MockProfileService(store); await service.updatePrivacy({ publicActivity: true, profileVisibility: 'public' }); expect((await new MockProfileService(store).getProfile()).privacy).toEqual({ publicActivity: true, profileVisibility: 'public' }); expect(store.getItem(PROFILE_STORAGE_KEY)).toBeTruthy() })
})
