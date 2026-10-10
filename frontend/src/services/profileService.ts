import { mockProfile } from '../data/mockData'
import type { MockUserProfile, ProfilePreferences, PrivacyPreferences } from '../domain'

export const PROFILE_STORAGE_KEY = 'flarup:mock-profile:v1'
const MOCK_USER_ID = 'mock-user-maya'
type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export const defaultPreferences: ProfilePreferences = { interests: ['Creative', 'Adventure'], timezone: 'America/New_York', city: 'Chapel Hill', state: 'NC', country: 'United States', university: 'UNC Chapel Hill', privacy: { profileVisibility: 'friends', publicActivity: false } }
export const defaultMockProfile: MockUserProfile = { ...mockProfile, ...defaultPreferences, onboardingComplete: false, totalQuestsCompleted: 3 }

function storageOrDefault(storage?: StorageLike): StorageLike | undefined { return storage ?? (typeof localStorage === 'undefined' ? undefined : localStorage) }
export class MockProfileService {
  private readonly storage?: StorageLike
  constructor(storage?: StorageLike) { this.storage = storageOrDefault(storage) }
  async getProfile(): Promise<MockUserProfile> { return this.read() }
  async saveOnboarding(profile: Pick<MockUserProfile, 'name' | 'interests' | 'timezone' | 'city' | 'state' | 'country' | 'university' | 'privacy'>): Promise<MockUserProfile> { const next = { ...this.read(), ...profile, handle: `@${profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}`, onboardingComplete: true }; this.write(next); return next }
  async updatePreferences(preferences: Partial<ProfilePreferences>): Promise<MockUserProfile> { const current = this.read(); const next: MockUserProfile = { ...current, ...preferences, privacy: { ...current.privacy, ...preferences.privacy } }; this.write(next); return next }
  async updatePrivacy(privacy: Partial<PrivacyPreferences>): Promise<MockUserProfile> { const current = this.read(); const next: MockUserProfile = { ...current, privacy: { ...current.privacy, ...privacy } }; this.write(next); return next }
  private read(): MockUserProfile { if (!this.storage) return { ...defaultMockProfile }; const raw = this.storage.getItem(PROFILE_STORAGE_KEY); if (!raw) return { ...defaultMockProfile }; try { const parsed = JSON.parse(raw) as MockUserProfile & { userId?: string }; return parsed.userId === MOCK_USER_ID ? parsed : { ...defaultMockProfile } } catch { return { ...defaultMockProfile } } }
  private write(profile: MockUserProfile) { this.storage?.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ ...profile, userId: MOCK_USER_ID })) }
}
export const profileService = new MockProfileService()
