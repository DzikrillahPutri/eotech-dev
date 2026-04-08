import cache from '@adonisjs/cache/services/main'
import { DateTime } from 'luxon'

export interface CacheOptions {
  ttl?: number // Time to live in seconds
  tags?: string[] // Cache tags for group invalidation
  prefix?: string // Key prefix
}

export interface CacheStats {
  hits: number
  misses: number
  hitRate: number
  totalRequests: number
}

interface CacheEntry {
  value: any
  expiresAt: number
  tags: string[]
}

export class CacheService {
  private static readonly DEFAULT_TTL = 300 // 5 minutes
  private static readonly CACHE_PREFIX = 'eotech'

  // In-memory fallback storage when Redis/cache service is not available
  private static inMemoryStore: Map<string, CacheEntry> = new Map()

  /**
   * Get cached data or set it if not exists
   */
  static async remember<T>(
    key: string,
    callback: () => Promise<T> | T,
    options: CacheOptions = {}
  ): Promise<T> {
    const { ttl = this.DEFAULT_TTL, tags = [], prefix = this.CACHE_PREFIX } = options
    const cacheKey: string = `${prefix}:${key}`

    try {
      // Try to get from cache first
      const cached = await cache.get({ key: cacheKey })
      if (cached !== null && cached !== undefined) {
        return cached as T
      }

      // Execute callback and cache result
      const result = await callback()
      await cache.set({ key: cacheKey, value: result, ttl, tags })

      return result ?? null as T
    } catch (error: any) {
      // If caching fails, use in-memory fallback
      console.warn('Cache service not available, using in-memory cache:', error.message)
      return this.rememberInMemory(key, callback, options)
    }
  }

  /**
   * In-memory cache fallback
   */
  private static async rememberInMemory<T>(
    key: string,
    callback: () => Promise<T> | T,
    options: CacheOptions = {}
  ): Promise<T> {
    const { ttl = this.DEFAULT_TTL, prefix = this.CACHE_PREFIX } = options
    const cacheKey = `${prefix}:${key}`
    const now = Date.now()
    const expiresAt = now + (ttl * 1000)

    // Check if we have a valid cached entry
    const entry = this.inMemoryStore.get(cacheKey)
    if (entry && entry.expiresAt > now) {
      return entry.value as T
    }

    // Execute callback and cache result
    const result = await callback()
    this.inMemoryStore.set(cacheKey, {
      value: result,
      expiresAt,
      tags: options.tags || []
    })

    return result ?? null as T
  }

  /**
   * Get data from cache
   */
  static async get<T>(key: string, prefix: string = this.CACHE_PREFIX): Promise<T | null> {
    try {
      const cacheKey = `${prefix}:${key}`
      const result = await cache.get({ key: cacheKey })
      return result ?? null 
    } catch (error: any) {
      console.warn('Cache service not available for get, using in-memory:', error.message)
      return this.getInMemory(key, prefix)
    }
  }

  /**
   * In-memory get fallback
   */
  private static getInMemory<T>(key: string, prefix: string = this.CACHE_PREFIX): T | null {
    const cacheKey = `${prefix}:${key}`
    const entry = this.inMemoryStore.get(cacheKey)

    if (entry && entry.expiresAt > Date.now()) {
      return entry.value as T
    }

    // Remove expired entry
    if (entry) {
      this.inMemoryStore.delete(cacheKey)
    }

    return null as T
  }

  /**
   * Set data in cache
   */
  static async set(
    key: string,
    value: any,
    options: CacheOptions = {}
  ): Promise<boolean> {
    try {
      const { ttl = this.DEFAULT_TTL, tags = [], prefix = this.CACHE_PREFIX } = options
      const cacheKey = `${prefix}:${key}`
      await cache.set({ key: cacheKey, value: value, ttl: ttl, tags: tags })
      return true
    } catch (error: any) {
      console.warn('Cache service not available for set, using in-memory:', error.message)
      return this.setInMemory(key, value, options)
    }
  }

  /**
   * In-memory set fallback
   */
  private static setInMemory(
    key: string,
    value: any,
    options: CacheOptions = {}
  ): boolean {
    const { ttl = this.DEFAULT_TTL, tags = [], prefix = this.CACHE_PREFIX } = options
    const cacheKey = `${prefix}:${key}`
    const expiresAt = Date.now() + (ttl * 1000)

    this.inMemoryStore.set(cacheKey, {
      value,
      expiresAt,
      tags
    })

    return true
  }

  /**
   * Delete data from cache
   */
  static async delete(key: string, prefix: string = this.CACHE_PREFIX): Promise<boolean> {
    try {
      const cacheKey = `${prefix}:${key}`
      await cache.delete({ key: cacheKey })
      return true
    } catch (error: any) {
      console.warn('Cache service not available for delete, using in-memory:', error.message)
      return this.deleteInMemory(key, prefix)
    }
  }

  /**
   * In-memory delete fallback
   */
  private static deleteInMemory(key: string, prefix: string = this.CACHE_PREFIX): boolean {
    const cacheKey = `${prefix}:${key}`
    return this.inMemoryStore.delete(cacheKey)
  }

  /**
   * Delete multiple keys by pattern
   */
  static async deleteByPattern(pattern: string, prefix: string = this.CACHE_PREFIX): Promise<number> {
    try {
      // This is a simplified implementation
      // In a real-world scenario, you might need to use Redis SCAN or similar
      const keysToDelete = await this.getKeysByPattern(`${prefix}:${pattern}`)
      let deletedCount = 0

      for (const key of keysToDelete) {
        if (await this.delete(key, '')) { // Empty prefix since key already includes it
          deletedCount++
        }
      }

      return deletedCount
    } catch (error) {
      console.error(`Cache delete by pattern failed for ${pattern}:`, error)
      return 0
    }
  }

  /**
   * Clear cache by tags
   */
  static async clearByTags(tags: string[]): Promise<boolean> {
    try {
      await cache.deleteByTag({ tags })
      return true
    } catch (error: any) {
      console.error(`Cache clear by tags failed for ${tags.join(', ')}:`, error)
      return false
    }
  }

  /**
   * Check if key exists in cache
   */
  static async has(key: string, prefix: string = this.CACHE_PREFIX): Promise<boolean> {
    try {
      const cacheKey = `${prefix}:${key}`
      return await cache.has({ key: cacheKey })
    } catch (error: any) {
      return false
    }
  }

  /**
   * Get cache statistics
   */
  static async getStats(): Promise<CacheStats | null> {
    try {
      // This would require extending the cache service to track stats
      // For now, return basic info
      return {
        hits: 0,
        misses: 0,
        hitRate: 0,
        totalRequests: 0
      }
    } catch (error) {
      console.error('Failed to get cache stats:', error)
      return null
    }
  }

  /**
   * Clear all cache
   */
static async clearAll(): Promise<boolean> {
  try {
    await cache.clear()
    this.inMemoryStore.clear()  // ✅ clear keduanya
    return true
  } catch (error: any) {
    console.warn('Cache service not available for clearAll, using in-memory:', error.message)
    return this.clearAllInMemory()
  }
}

  /**
   * In-memory clear all fallback
   */
  private static clearAllInMemory(): boolean {
    this.inMemoryStore.clear()
    return true
  }

  /**
   * Get keys by pattern (simplified implementation)
   */
  private static async getKeysByPattern(pattern: string): Promise<string[]> {
    // This is a placeholder - in a real implementation,
    // you'd need to use Redis SCAN or similar to get keys by pattern
    // For now, return empty array
    return []
  }

  /**
   * Predefined cache configurations
   */
  static readonly CONFIGS = {
    // Short-lived caches
    SHORT: { ttl: 60 }, // 1 minute
    MEDIUM: { ttl: 300 }, // 5 minutes
    LONG: { ttl: 3600 }, // 1 hour
    VERY_LONG: { ttl: 86400 }, // 24 hours

    // Cache tags for different data types
    TAGS: {
      EVENTS: ['events'],
      USERS: ['users'],
      TICKETS: ['tickets'],
      ORDERS: ['orders'],
      PUBLIC: ['public'],
      PRIVATE: ['private']
    }
  }

  /**
   * Generate cache key for events
   */
  static getEventCacheKey(eventId: string): string {
    return `events:${eventId}`
  }

  /**
   * Generate cache key for event lists
   */
  static getEventListCacheKey(params: { page: number; limit: number; status: string; search?: string }): string {
    const { page, limit, status, search } = params
    return `events:list:${page}:${limit}:${status}:${search || 'all'}`
  }

  /**
   * Generate cache key for user events
   */
  static getUserEventsCacheKey(user_id: string, params: { page: number; limit: number; status: string }): string {
    const { page, limit, status } = params
    return `users:${user_id}:events:${page}:${limit}:${status}`
  }
}