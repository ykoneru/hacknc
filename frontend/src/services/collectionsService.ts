import { mockCollections } from '../data/mockData'
import type { QuestCollection } from '../domain'
export interface CollectionsService { getCollections(): Promise<QuestCollection[]> }
export const collectionsService: CollectionsService = { async getCollections() { return Promise.resolve(mockCollections.map(collection => ({ ...collection }))) } }
