import { describe, expect, it } from 'vitest'
import { collectionsService } from './collectionsService'
describe('collections presentation', () => { it('exposes progress and locked/unlocked state from supplied fixtures', async () => { const collections = await collectionsService.getCollections(); expect(collections).toHaveLength(5); expect(collections.find(collection => collection.id === 'social-butterfly')?.unlocked).toBe(true); expect(collections.find(collection => collection.id === 'creative-explorer')?.progress).toBe(2) }) })
