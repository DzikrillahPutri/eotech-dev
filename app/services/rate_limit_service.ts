import redis from '@adonisjs/redis/services/main'

export interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  keyPrefix?: string // Prefix for Redis keys
  skipSuccessfulRequests?: boolean // Skip rate limiting for successful requests
  skipFailedRequests?: boolean // Skip rate limiting for failed requests
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  totalRequests: number
}

export interface RateLimitMetrics {
  identifier: string
  keyPrefix: string
  totalChecks: number
  blockedRequests: number
  blockedPercentage: number
  lastChecked: number
}

export class RateLimitService {
  private static readonly DEFAULT_OPTIONS: RateLimitOptions = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    keyPrefix: 'ratelimit',
    skipSuccessfulRequests: false,
    skipFailedRequests: false
  }

  // In-memory fallback storage when Redis is not available
  private static inMemoryStore: Map<string, number[]> = new Map()

  // Metrics tracking
  private static metricsStore: Map<string, RateLimitMetrics> = new Map()

  /**
   * Check if request is within rate limit
   */
  static async checkLimit(
    identifier: string,
    options: Partial<RateLimitOptions> = {}
  ): Promise<RateLimitResult> {
    const config = { ...this.DEFAULT_OPTIONS, ...options }
    const keyPrefix = config.keyPrefix || 'ratelimit'
    const key = `${keyPrefix}:${identifier}`
    const now = Date.now()
    const windowStart = now - config.windowMs

    try {
      // Try Redis first
      await redis.zremrangebyscore(key, 0, windowStart)
      const currentRequests = await redis.zcard(key)

      if (currentRequests >= config.maxRequests) {
        const oldestRequest = await redis.zrange(key, 0, 0, 'WITHSCORES')
        const resetTime = oldestRequest.length > 0 ? parseInt(oldestRequest[1]) + config.windowMs : now + config.windowMs

        this.trackMetric(identifier, keyPrefix, false)

        return {
          allowed: false,
          remaining: 0,
          resetTime,
          totalRequests: currentRequests
        }
      }

      // Add current request timestamp
      await redis.zadd(key, now, now.toString())
      await redis.expire(key, Math.ceil(config.windowMs / 1000))

      const newCount = currentRequests + 1

      this.trackMetric(identifier, keyPrefix, true)

      return {
        allowed: true,
        remaining: Math.max(0, config.maxRequests - newCount),
        resetTime: now + config.windowMs,
        totalRequests: newCount
      }

    } catch (redisError: any) {
      // Fallback to in-memory storage if Redis fails
      console.warn('Redis not available, using in-memory rate limiting:', redisError.message)

      return this.checkLimitInMemory(identifier, config, now, windowStart)
    }
  }

  /**
   * In-memory rate limiting fallback
   */
  private static checkLimitInMemory(
    identifier: string,
    config: RateLimitOptions,
    now: number,
    windowStart: number
  ): RateLimitResult {
    const keyPrefix = config.keyPrefix || 'ratelimit'
    const key = `${keyPrefix}:${identifier}`

    // Get existing timestamps for this identifier
    let timestamps = this.inMemoryStore.get(key) || []

    // Remove old timestamps outside the window
    timestamps = timestamps.filter(ts => ts > windowStart)

    const currentRequests = timestamps.length

    if (currentRequests >= config.maxRequests) {
      const resetTime = timestamps.length > 0 ? Math.min(...timestamps) + config.windowMs : now + config.windowMs

      this.trackMetric(identifier, keyPrefix, false)

      return {
        allowed: false,
        remaining: 0,
        resetTime,
        totalRequests: currentRequests
      }
    }

    // Add current request timestamp
    timestamps.push(now)
    this.inMemoryStore.set(key, timestamps)

    const newCount = currentRequests + 1

    this.trackMetric(identifier, keyPrefix, true)

    return {
      allowed: true,
      remaining: Math.max(0, config.maxRequests - newCount),
      resetTime: now + config.windowMs,
      totalRequests: newCount
    }
  }

  /**
   * Get rate limit status for an identifier
   */
  static async getStatus(
    identifier: string,
    options: Partial<RateLimitOptions> = {}
  ): Promise<RateLimitResult | null> {
    const config = { ...this.DEFAULT_OPTIONS, ...options }
    const key = `${config.keyPrefix}:${identifier}`
    const now = Date.now()
    const windowStart = now - config.windowMs

    try {
      // Clean old entries
      await redis.zremrangebyscore(key, 0, windowStart)

      // Get current count
      const currentRequests = await redis.zcard(key)

      if (currentRequests === 0) {
        return null // No requests in current window
      }

      const oldestRequest = await redis.zrange(key, 0, 0, 'WITHSCORES')
      const resetTime = oldestRequest.length > 0 ? parseInt(oldestRequest[1]) + config.windowMs : now + config.windowMs

      return {
        allowed: currentRequests < config.maxRequests,
        remaining: Math.max(0, config.maxRequests - currentRequests),
        resetTime,
        totalRequests: currentRequests
      }
    } catch (error) {
      console.error('Failed to get rate limit status:', error)
      return null
    }
  }

  /**
   * Reset rate limit for an identifier
   */
  static async resetLimit(
    identifier: string,
    options: Partial<RateLimitOptions> = {}
  ): Promise<boolean> {
    const config = { ...this.DEFAULT_OPTIONS, ...options }
    const key = `${config.keyPrefix}:${identifier}`

    try {
      await redis.del(key)
      return true
    } catch (error) {
      console.error('Failed to reset rate limit:', error)
      return false
    }
  }

  /**
   * Clean up old rate limit keys (maintenance)
   */
  static async cleanup(pattern: string = 'ratelimit:*'): Promise<number> {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(keys)
      }
      return keys.length
    } catch (error) {
      console.error('Failed to cleanup rate limit keys:', error)
      return 0
    }
  }

  /**
   * Predefined rate limit configurations
   */
  static readonly CONFIGS = {
    // API endpoints
    API_STRICT: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 requests per minute
    API_MODERATE: { windowMs: 60 * 1000, maxRequests: 60 }, // 60 requests per minute
    API_RELAXED: { windowMs: 60 * 1000, maxRequests: 120 }, // 120 requests per minute

    // File uploads
    UPLOAD_STRICT: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 uploads per minute
    UPLOAD_MODERATE: { windowMs: 60 * 1000, maxRequests: 20 }, // 20 uploads per minute

    // Authentication
    AUTH_STRICT: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 login attempts per 15 minutes
    AUTH_MODERATE: { windowMs: 15 * 60 * 1000, maxRequests: 10 }, // 10 login attempts per 15 minutes

    // General endpoints
    GENERAL: { windowMs: 60 * 1000, maxRequests: 100 } // 100 requests per minute
  }

  /**
   * Track metrics for rate limit monitoring
   */
  private static trackMetric(identifier: string, keyPrefix: string, allowed: boolean): void {
    const metricKey = `${keyPrefix}:${identifier}`
    const current = this.metricsStore.get(metricKey) || {
      identifier,
      keyPrefix,
      totalChecks: 0,
      blockedRequests: 0,
      blockedPercentage: 0,
      lastChecked: Date.now()
    }

    current.totalChecks++
    if (!allowed) {
      current.blockedRequests++
    }
    current.blockedPercentage = (current.blockedRequests / current.totalChecks) * 100
    current.lastChecked = Date.now()

    this.metricsStore.set(metricKey, current)
  }

  /**
   * Get metrics for an identifier
   */
  static getMetrics(identifier: string, keyPrefix: string = 'ratelimit'): RateLimitMetrics | null {
    const metricKey = `${keyPrefix}:${identifier}`
    return this.metricsStore.get(metricKey) || null
  }

  /**
   * Get all metrics
   */
  static getAllMetrics(): RateLimitMetrics[] {
    return Array.from(this.metricsStore.values())
  }

  /**
   * Clear metrics
   */
  static clearMetrics(identifier?: string, keyPrefix: string = 'ratelimit'): void {
    if (identifier) {
      this.metricsStore.delete(`${keyPrefix}:${identifier}`)
    } else {
      this.metricsStore.clear()
    }
  }

  // ✅ Tambahkan di RateLimitService
    static resetStore(): void {
        this.inMemoryStore.clear()
        this.metricsStore.clear()
    }
}