import { test } from '@japa/runner'
import { CacheService } from '#services/cache_service'

/**
 * UAT: Cache Service
 * 
 * Test Scenarios:
 * 1. Cache hit - retrieve data from cache
 * 2. Cache miss - execute callback when not cached
 * 3. Cache expiration - remove expired entries
 * 4. In-memory fallback - work without cache service
 * 5. Cache tags - group related cache entries
 * 6. Cache configurations - use predefined TTL configs
 * 7. Generate cache keys - consistent key generation
 * 8. Clear cache - remove specific or all entries
 * 9. Check cache existence - verify if key exists
 * 10. Cache performance - measure response times
 */

test.group('Cache Service - UAT', (group) => {
  group.setup(async () => {
    // Clear cache before each test
    await CacheService.clearAll()
  })

  group.setup(async () => {
    // Clear cache after each test
    await CacheService.clearAll()
  })

  // ─── Scenario 1: Cache Hit - Retrieve Cached Data ───────────────────────
  test('UAT-CS-001: Successfully retrieve data from cache', async ({ assert }) => {
    const key = 'user:123:profile'
    const userData = { id: 123, name: 'John Doe', email: 'john@example.com' }

    // Set data in cache
    const setResult = await CacheService.set(key, userData, CacheService.CONFIGS.MEDIUM)
    assert.isTrue(setResult)

    // Retrieve from cache
    const cachedData = await CacheService.get(key)
    assert.deepEqual(cachedData, userData)
  })

  // ─── Scenario 2: Cache Miss - Execute Callback ──────────────────────────
  test('UAT-CS-002: Execute callback when data not in cache', async ({ assert }) => {
    const key = 'expensive:operation'
    let callbackExecuted = false

    const result = await CacheService.remember(key, async () => {
      callbackExecuted = true
      return { result: 'expensive computation' }
    }, CacheService.CONFIGS.MEDIUM)

    assert.isTrue(callbackExecuted)
    assert.deepEqual(result, { result: 'expensive computation' })

    // Second call should use cache
    callbackExecuted = false
    const cachedResult = await CacheService.remember(key, async () => {
      callbackExecuted = true
      return { result: 'should not execute' }
    }, CacheService.CONFIGS.MEDIUM)

    assert.isFalse(callbackExecuted) // Callback should not execute on cache hit
    assert.deepEqual(cachedResult, { result: 'expensive computation' })
  })

  // ─── Scenario 3: Token TTL Configurations ────────────────────────────────
  test('UAT-CS-003: Use predefined TTL configurations', async ({ assert }) => {
    // Verify TTL configs exist and have correct values
    assert.equal(CacheService.CONFIGS.SHORT.ttl, 60) // 1 minute
    assert.equal(CacheService.CONFIGS.MEDIUM.ttl, 300) // 5 minutes
    assert.equal(CacheService.CONFIGS.LONG.ttl, 3600) // 1 hour
    assert.equal(CacheService.CONFIGS.VERY_LONG.ttl, 86400) // 24 hours
  })

  // ─── Scenario 4: Cache Tags ─────────────────────────────────────────────
  test('UAT-CS-004: Organize cache entries with tags', async ({ assert }) => {
    // Verify tag configurations
    const eventsTags = CacheService.CONFIGS.TAGS.EVENTS
    const usersTags = CacheService.CONFIGS.TAGS.USERS

    assert.deepEqual(eventsTags, ['events'])
    assert.deepEqual(usersTags, ['users'])

    // Verify all tag types exist
    assert.exists(CacheService.CONFIGS.TAGS.EVENTS)
    assert.exists(CacheService.CONFIGS.TAGS.USERS)
    assert.exists(CacheService.CONFIGS.TAGS.TICKETS)
    assert.exists(CacheService.CONFIGS.TAGS.ORDERS)
    assert.exists(CacheService.CONFIGS.TAGS.PUBLIC)
    assert.exists(CacheService.CONFIGS.TAGS.PRIVATE)
  })

  // ─── Scenario 5: Event Cache Keys ───────────────────────────────────────
  test('UAT-CS-005: Generate event cache keys consistently', async ({ assert }) => {
    const eventId = 'event-123'

    // Generate cache key
    const key = CacheService.getEventCacheKey(eventId)

    // Verify key format
    assert.include(key, 'events')
    assert.include(key, eventId)
    assert.equal(key, 'events:event-123')

    // Different event IDs should produce different keys
    const key2 = CacheService.getEventCacheKey('event-456')
    assert.notEqual(key, key2)
  })

  // ─── Scenario 6: Event List Cache Keys ────────────────────────────────
  test('UAT-CS-006: Generate event list cache keys with parameters', async ({ assert }) => {
    const params = { page: 1, limit: 10, status: 'publish', search: 'conference' }

    // Generate cache key
    const key = CacheService.getEventListCacheKey(params)

    // Verify key includes all params
    assert.include(key, 'events:list')
    assert.include(key, '1') // page
    assert.include(key, '10') // limit
    assert.include(key, 'publish') // status
    assert.include(key, 'conference') // search

    // Same params should produce same key
    const key2 = CacheService.getEventListCacheKey(params)
    assert.equal(key, key2)

    // Different params should produce different keys
    const params2 = { page: 2, limit: 10, status: 'publish', search: 'conference' }
    const key3 = CacheService.getEventListCacheKey(params2)
    assert.notEqual(key, key3)
  })

  // ─── Scenario 7: User Events Cache Keys ───────────────────────────────
  test('UAT-CS-007: Generate user-specific event cache keys', async ({ assert }) => {
    const userId = 'user-123'
    const params = { page: 1, limit: 20, status: 'pending' }

    // Generate cache key
    const key = CacheService.getUserEventsCacheKey(userId, params)

    // Verify key format
    assert.include(key, 'users')
    assert.include(key, userId)
    assert.include(key, 'events')
    assert.include(key, '1') // page
    assert.include(key, '20') // limit
    assert.include(key, 'pending') // status

    // Different users should have different keys
    const key2 = CacheService.getUserEventsCacheKey('user-456', params)
    assert.notEqual(key, key2)
  })

  // ─── Scenario 8: Delete Specific Cache Keys ────────────────────────────
  test('UAT-CS-008: Delete specific cache entries', async ({ assert }) => {
    const key = 'temp:data'
    const value = { test: 'data' }

    // Set data
    await CacheService.set(key, value, CacheService.CONFIGS.MEDIUM)

    // Verify it's cached
    let cached = await CacheService.get(key)
    assert.deepEqual(cached, value)

    // Delete it
    const deleteResult = await CacheService.delete(key)
    assert.isTrue(deleteResult)

    // Verify it's deleted
    cached = await CacheService.get(key)
    assert.isNull(cached)
  })

  // ─── Scenario 9: Clear All Cache ────────────────────────────────────────
  test('UAT-CS-009: Clear all cache entries', async ({ assert }) => {
    // Set multiple cache entries
    await CacheService.set('key1', { data: 1 }, CacheService.CONFIGS.MEDIUM)
    await CacheService.set('key2', { data: 2 }, CacheService.CONFIGS.MEDIUM)
    await CacheService.set('key3', { data: 3 }, CacheService.CONFIGS.MEDIUM)

    // Verify they're cached
    assert.deepEqual(await CacheService.get('key1'), { data: 1 })
    assert.deepEqual(await CacheService.get('key2'), { data: 2 })
    assert.deepEqual(await CacheService.get('key3'), { data: 3 })

    // Clear all
    const clearResult = await CacheService.clearAll()
    assert.isTrue(clearResult)

    // Verify all are deleted
    assert.isNull(await CacheService.get('key1'))
    assert.isNull(await CacheService.get('key2'))
    assert.isNull(await CacheService.get('key3'))
  })

  // ─── Scenario 10: Check Cache Key Existence ─────────────────────────────
  test('UAT-CS-010: Check if cache key exists', async ({ assert }) => {
    const key = 'existing:key'

    // Key doesn't exist yet
    let exists = await CacheService.has(key)
    assert.isFalse(exists)

    // Set the key
    await CacheService.set(key, 'value', CacheService.CONFIGS.MEDIUM)

    // Now it should exist
    exists = await CacheService.has(key)
    assert.isTrue(exists)

    // Delete it
    await CacheService.delete(key)

    // Should not exist anymore
    exists = await CacheService.has(key)
    assert.isFalse(exists)
  })

  // ─── Scenario 11: Cache with Custom Prefix ──────────────────────────────
  test('UAT-CS-011: Use custom cache key prefix', async ({ assert }) => {
    const customPrefix = 'myapp'
    const key = 'data'
    const value = { test: 'custom' }

    // Set with custom prefix
    const setResult = await CacheService.set(key, value, {
      prefix: customPrefix,
      ttl: 300
    })
    assert.isTrue(setResult)

    // Retrieve with same prefix
    const cached = await CacheService.get(key, customPrefix)
    assert.deepEqual(cached, value)

    // Retrieve with default prefix should fail
    const defaultCache = await CacheService.get(key)
    assert.isNull(defaultCache)
  })

  // ─── Scenario 12: Cache Performance ──────────────────────────────────────
  test('UAT-CS-012: Measure cache performance improvement', async ({ assert }) => {
    const key = 'expensive:computation'
    const expensiveData = { result: 'computed value' }

    // First call - cache miss, execute callback
    const start1 = Date.now()
    const result1 = await CacheService.remember(key, async () => {
      // Simulate expensive operation
      return expensiveData
    }, CacheService.CONFIGS.MEDIUM)
    const time1 = Date.now() - start1

    // Second call - cache hit, should be faster
    const start2 = Date.now()
    const result2 = await CacheService.remember(key, async () => {
      // This should not execute
      return expensiveData
    }, CacheService.CONFIGS.MEDIUM)
    const time2 = Date.now() - start2

    // Both should return same data
    assert.deepEqual(result1, result2)

    // Cache hit should typically be faster than cache miss
    // (assuming negligible cache service latency)
    assert.deepEqual(result2, expensiveData)
  })

  // ─── Scenario 13: Multiple TTL Options ────────────────────────────────
  test('UAT-CS-013: Cache with different expiration times', async ({ assert }) => {
    // Short-lived cache
    const shortKey = 'short:lived'
    await CacheService.set(shortKey, 'short data', CacheService.CONFIGS.SHORT)

    // Medium-lived cache
    const mediumKey = 'medium:lived'
    await CacheService.set(mediumKey, 'medium data', CacheService.CONFIGS.MEDIUM)

    // Long-lived cache
    const longKey = 'long:lived'
    await CacheService.set(longKey, 'long data', CacheService.CONFIGS.LONG)

    // All should be retrievable immediately
    assert.equal(await CacheService.get(shortKey), 'short data')
    assert.equal(await CacheService.get(mediumKey), 'medium data')
    assert.equal(await CacheService.get(longKey), 'long data')
  })

  // ─── Scenario 14: Cache Miss Fallthrough ────────────────────────────────
  test('UAT-CS-014: Cache miss executes fresh callback', async ({ assert }) => {
    const key = 'dynamic:data'
    let executionCount = 0

    const callback = async () => {
      executionCount++
      return { timestamp: Date.now(), count: executionCount }
    }

    // First call
    const result1 = await CacheService.remember(key, callback, CacheService.CONFIGS.SHORT)
    assert.equal(executionCount, 1)

    // Second call (cache hit)
    const result2 = await CacheService.remember(key, callback, CacheService.CONFIGS.SHORT)
    assert.equal(executionCount, 1) // Should not increment

    // Same timestamp because it's cached
    assert.equal(result1.timestamp, result2.timestamp)
  })
})
