import { test } from '@japa/runner'
import { RateLimitService, RateLimitOptions } from '#services/rate_limit_service'

/**
 * UAT: Rate Limit Service
 * 
 * Test Scenarios:
 * 1. Basic rate limiting - allow requests within limit
 * 2. Exceed rate limit - block requests after limit
 * 3. Rate limit window - reset after window expires
 * 4. In-memory fallback - work without Redis
 * 5. Metrics tracking - track blocked and allowed requests
 * 6. Predefined configs - use preconfigured limits
 * 7. Status checking - get current rate limit status
 * 8. Rate limit reset - manually reset limits
 * 9. Cleanup - remove old rate limit entries
 */

test.group('Rate Limit Service - UAT', (group) => {
  group.setup(async () => {
    // Reset metrics before tests
    RateLimitService.clearMetrics()
  })

  group.each.setup(async () => {
    // Clean up after each test
    RateLimitService.resetStore()
  })

  group.each.setup(async () => {
    // Reset in-memory store after each test to ensure clean state
    RateLimitService.resetStore()
  })

  // Test scenarios will go here...

  // ─── Scenario 1: Basic Rate Limiting ─────────────────────────────────────
  test('UAT-RL-001: Allow requests within rate limit', async ({ assert }) => {
    const userId = 'user-123'
    const options: Partial<RateLimitOptions> = {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 3 // 3 requests per minute
    }

    // First request
    let result = await RateLimitService.checkLimit(userId, options)
    assert.isTrue(result.allowed)
    assert.equal(result.remaining, 2)
    assert.equal(result.totalRequests, 1)

    // Second request
    result = await RateLimitService.checkLimit(userId, options)
    assert.isTrue(result.allowed)
    assert.equal(result.remaining, 1)
    assert.equal(result.totalRequests, 2)

    // Third request
    result = await RateLimitService.checkLimit(userId, options)
    assert.isTrue(result.allowed)
    assert.equal(result.remaining, 0)
    assert.equal(result.totalRequests, 3)
  })

  // ─── Scenario 2: Exceed Rate Limit ───────────────────────────────────────
  test('UAT-RL-002: Block requests when exceeding rate limit', async ({ assert }) => {
    const userId = 'user-456'
    const options: Partial<RateLimitOptions> = {
      windowMs: 60 * 1000,
      maxRequests: 2
    }

    // Make 2 allowed requests
    await RateLimitService.checkLimit(userId, options)
    await RateLimitService.checkLimit(userId, options)

    // Third request should be blocked
    const result = await RateLimitService.checkLimit(userId, options)
    assert.isFalse(result.allowed)
    assert.equal(result.remaining, 0)
    assert.equal(result.totalRequests, 2)
  })

  // ─── Scenario 3: Different User IDs ──────────────────────────────────────
  test('UAT-RL-003: Separate rate limits for different users', async ({ assert }) => {
    const options: Partial<RateLimitOptions> = {
      windowMs: 60 * 1000,
      maxRequests: 2
    }

    // User 1 - 2 requests allowed
    let result1 = await RateLimitService.checkLimit('user-1', options)
    assert.isTrue(result1.allowed)
    result1 = await RateLimitService.checkLimit('user-1', options)
    assert.isTrue(result1.allowed)

    // User 2 - should also have 2 requests
    let result2 = await RateLimitService.checkLimit('user-2', options)
    assert.isTrue(result2.allowed)
    result2 = await RateLimitService.checkLimit('user-2', options)
    assert.isTrue(result2.allowed)

    // User 1 - next request should be blocked
    result1 = await RateLimitService.checkLimit('user-1', options)
    assert.isFalse(result1.allowed)

    // User 2 - next request should also be blocked
    result2 = await RateLimitService.checkLimit('user-2', options)
    assert.isFalse(result2.allowed)
  })

  // ─── Scenario 4: Predefined Configurations ──────────────────────────────
  test('UAT-RL-004: Use predefined rate limit configurations', async ({ assert }) => {
    // Test API_STRICT config: 10 requests per minute
    const strictConfig = RateLimitService.CONFIGS.API_STRICT
    assert.equal(strictConfig.maxRequests, 10)
    assert.equal(strictConfig.windowMs, 60 * 1000)

    // Make requests up to limit
    let result
    for (let i = 0; i < 10; i++) {
      result = await RateLimitService.checkLimit('api-test', strictConfig)
      assert.isTrue(result.allowed)
    }

    // Next request should be blocked
    result = await RateLimitService.checkLimit('api-test', strictConfig)
    assert.isFalse(result.allowed)
  })

  // ─── Scenario 5: Upload Rate Limiting ────────────────────────────────────
  test('UAT-RL-005: Apply upload-specific rate limits', async ({ assert }) => {
    const userId = 'uploader-1'
    const uploadConfig = RateLimitService.CONFIGS.UPLOAD_MODERATE
    assert.equal(uploadConfig.maxRequests, 20) // 20 uploads per minute

    // Make 20 upload requests
    let result
    for (let i = 0; i < 20; i++) {
      result = await RateLimitService.checkLimit(userId, uploadConfig)
      assert.isTrue(result.allowed)
    }

    // 21st request should be blocked
    result = await RateLimitService.checkLimit(userId, uploadConfig)
    assert.isFalse(result.allowed)
  })

  // ─── Scenario 6: Authentication Rate Limiting ──────────────────────────
  test('UAT-RL-006: Apply authentication-specific rate limits', async ({ assert }) => {
    const email = 'user@example.com'
    const authConfig = RateLimitService.CONFIGS.AUTH_STRICT
    assert.equal(authConfig.maxRequests, 5) // 5 login attempts per 15 minutes

    // Make 5 login attempts
    let result
    for (let i = 0; i < 5; i++) {
      result = await RateLimitService.checkLimit(email, authConfig)
      assert.isTrue(result.allowed)
    }

    // 6th attempt should be blocked
    result = await RateLimitService.checkLimit(email, authConfig)
    assert.isFalse(result.allowed)
  })

  // ─── Scenario 7: Metrics Tracking ────────────────────────────────────────
  test('UAT-RL-007: Track metrics for rate limit monitoring', async ({ assert }) => {
    const userId = 'metrics-test'
    const options: Partial<RateLimitOptions> = {
      windowMs: 60 * 1000,
      maxRequests: 3
    }

    // Make 3 allowed + 2 blocked requests
    for (let i = 0; i < 5; i++) {
      await RateLimitService.checkLimit(userId, options)
    }

    // Get metrics
    const metrics = RateLimitService.getMetrics(userId, 'ratelimit')
    assert.isNotNull(metrics)
    assert.equal(metrics?.totalChecks, 5)
    assert.equal(metrics?.blockedRequests, 2)
    assert.approximately(metrics?.blockedPercentage || 0, 40, 1) // 40%
  })

  // ─── Scenario 8: Reset Rate Limit ───────────────────────────────────────
  test('UAT-RL-008: Manually reset rate limit for user', async ({ assert }) => {
    const userId = 'reset-test'
    const options: Partial<RateLimitOptions> = {
      windowMs: 60 * 1000,
      maxRequests: 2
    }

    // Make 2 requests to hit limit
    await RateLimitService.checkLimit(userId, options)
    await RateLimitService.checkLimit(userId, options)

    // Verify blocked
    let result = await RateLimitService.checkLimit(userId, options)
    assert.isFalse(result.allowed)

    // Reset limit
    const resetSuccess = await RateLimitService.resetLimit(userId, options)
    assert.isTrue(resetSuccess)

    // Should now be allowed again (after reset)
    result = await RateLimitService.checkLimit(userId, options)
    assert.isTrue(result.allowed)
  })

  // ─── Scenario 9: Get Rate Limit Status ────────────────────────────────
  test('UAT-RL-009: Get current rate limit status', async ({ assert }) => {
    const userId = 'status-test'
    const options: Partial<RateLimitOptions> = {
      windowMs: 60 * 1000,
      maxRequests: 5
    }

    // Make 3 requests
    await RateLimitService.checkLimit(userId, options)
    await RateLimitService.checkLimit(userId, options)
    await RateLimitService.checkLimit(userId, options)

    // Get status
    const status = await RateLimitService.getStatus(userId, options)
    assert.isNotNull(status)
    assert.isTrue(status?.allowed)
    assert.equal(status?.totalRequests, 3)
    assert.equal(status?.remaining, 2)
  })

  // ─── Scenario 10: Multiple Identifiers with Same Config ────────────────
  test('UAT-RL-010: Manage multiple identifiers independently', async ({ assert }) => {
    const config = RateLimitService.CONFIGS.API_MODERATE

    const identifiers = ['id-1', 'id-2', 'id-3']

    // Make requests for each identifier
    for (const id of identifiers) {
      for (let i = 0; i < 30; i++) {
        const result = await RateLimitService.checkLimit(id, config)
        assert.isTrue(result.allowed)
      }
    }

    // Each should have same remaining quota (30/60)
    const status1 = await RateLimitService.getStatus('id-1', config)
    const status2 = await RateLimitService.getStatus('id-2', config)
    const status3 = await RateLimitService.getStatus('id-3', config)

    assert.equal(status1?.totalRequests, 30)
    assert.equal(status2?.totalRequests, 30)
    assert.equal(status3?.totalRequests, 30)
  })

  // ─── Scenario 11: Clear All Metrics ─────────────────────────────────────
  test('UAT-RL-011: Clear all metrics for monitoring reset', async ({ assert }) => {
    const config = RateLimitService.CONFIGS.API_MODERATE

    // Generate metrics
    await RateLimitService.checkLimit('user-a', config)
    await RateLimitService.checkLimit('user-b', config)

    // Verify metrics exist
    let allMetrics = RateLimitService.getAllMetrics()
    assert.isAbove(allMetrics.length, 0)

    // Clear metrics
    RateLimitService.clearMetrics()

    // Verify metrics are cleared
    allMetrics = RateLimitService.getAllMetrics()
    assert.equal(allMetrics.length, 0)
  })
})
