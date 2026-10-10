import { mockChests, mockRewardInventory, mockRewards } from '../data/mockData'
import type { CosmeticSlot, MysteryChest, Reward, RewardInventory } from '../domain'

export const REWARDS_STORAGE_KEY = 'flarup:mock-rewards:v1'
export const MOCK_REWARDS_USER_ID = 'mock-user-maya'
type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
type StoredRewards = { userId: string; chests: MysteryChest[]; inventory: RewardInventory }

export interface RewardsService {
  getRewardInventory(): Promise<RewardInventory>
  getUnopenedChests(): Promise<MysteryChest[]>
  openChest(chestId: string): Promise<{ chest: MysteryChest; reward: Reward; inventory: RewardInventory }>
  equipCosmetic(rewardId: string): Promise<RewardInventory>
}

function storageOrDefault(storage?: StorageLike): StorageLike | undefined { return storage ?? (typeof localStorage === 'undefined' ? undefined : localStorage) }
function freshState(): StoredRewards { return { userId: MOCK_REWARDS_USER_ID, chests: mockChests.map(chest => ({ ...chest })), inventory: { rewards: mockRewardInventory.rewards.map(reward => ({ ...reward })), equipped: { ...mockRewardInventory.equipped } } } }

export class MockRewardsService implements RewardsService {
  private readonly storage?: StorageLike
  constructor(storage?: StorageLike) { this.storage = storageOrDefault(storage) }
  async getRewardInventory(): Promise<RewardInventory> { return Promise.resolve(this.readState().inventory) }
  async getUnopenedChests(): Promise<MysteryChest[]> { return Promise.resolve(this.readState().chests.filter(chest => chest.status !== 'opened')) }
  async openChest(chestId: string) {
    const state = this.readState(); const chest = state.chests.find(item => item.id === chestId)
    if (!chest) throw new Error('That chest is not available.')
    if (chest.status === 'opened') throw new Error('This chest has already been opened.')
    const reward = mockRewards.find(item => item.id === chest.rewardId)
    if (!reward) throw new Error('This chest reward is unavailable.')
    const existing = state.inventory.rewards.find(item => item.id === reward.id)
    const updatedReward = existing ? { ...existing, quantity: (existing.quantity ?? 1) + (reward.quantity ?? 1) } : { ...reward }
    state.inventory.rewards = existing ? state.inventory.rewards.map(item => item.id === reward.id ? updatedReward : item) : [...state.inventory.rewards, updatedReward]
    chest.status = 'opened'; this.writeState(state)
    return { chest: { ...chest }, reward: updatedReward, inventory: state.inventory }
  }
  async equipCosmetic(rewardId: string): Promise<RewardInventory> {
    const state = this.readState(); const reward = state.inventory.rewards.find(item => item.id === rewardId)
    if (!reward?.cosmeticSlot) throw new Error('That reward cannot be equipped.')
    state.inventory.equipped[reward.cosmeticSlot] = reward.id; this.writeState(state); return state.inventory
  }
  private readState(): StoredRewards { if (!this.storage) return freshState(); const raw = this.storage.getItem(REWARDS_STORAGE_KEY); if (!raw) { const state = freshState(); this.writeState(state); return state } try { const state = JSON.parse(raw) as StoredRewards; return state.userId === MOCK_REWARDS_USER_ID ? state : freshState() } catch { return freshState() } }
  private writeState(state: StoredRewards) { this.storage?.setItem(REWARDS_STORAGE_KEY, JSON.stringify(state)) }
}

export const rewardsService = new MockRewardsService()
