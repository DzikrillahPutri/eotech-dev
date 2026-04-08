import { HttpContext } from '@adonisjs/core/http'
import { RateLimitService, RateLimitResult } from '#services/rate_limit_service'

export default class RateLimitMiddleware {
  async handle({ request, response }: HttpContext, next: () => Promise<void>, config: any = {}) {
    const clientIp = request.ip()
    const userAgent = request.header('User-Agent') || 'unknown'
    const method = request.method()
    const url = request.url()

    // Create identifier combining IP and endpoint
    const identifier = `${clientIp}:${method}:${url}`

    // Get rate limit config based on endpoint
    const rateLimitConfig = this.getRateLimitConfig(url, method)

    // Check rate limit
    const result: RateLimitResult = await RateLimitService.checkLimit(identifier, rateLimitConfig)

    // Set rate limit headers
    response.header('X-RateLimit-Limit', rateLimitConfig.maxRequests.toString())
    response.header('X-RateLimit-Remaining', result.remaining.toString())
    response.header('X-RateLimit-Reset', new Date(result.resetTime).toISOString())

    if (!result.allowed) {
      response.header('Retry-After', Math.ceil((result.resetTime - Date.now()) / 1000).toString())

      return response.tooManyRequests({
        message: 'Too many requests',
        retry_after: Math.ceil((result.resetTime - Date.now()) / 1000),
        limit: rateLimitConfig.maxRequests,
        remaining: 0,
        reset_time: new Date(result.resetTime).toISOString()
      })
    }

    await next()
  }

  /**
   * Get rate limit configuration based on endpoint
   */
  private getRateLimitConfig(url: string, method: string) {
    // Authentication endpoints - strict limits
    if (url.includes('/login') || url.includes('/register') || url.includes('/auth')) {
      return RateLimitService.CONFIGS.AUTH_STRICT
    }

    // File upload endpoints - moderate limits
    if (url.includes('/upload') || method === 'POST' && url.includes('/events') && url.includes('banner')) {
      return RateLimitService.CONFIGS.UPLOAD_MODERATE
    }

    // API endpoints - moderate limits
    if (url.startsWith('/api/')) {
      // Strict limits for write operations
      if (['POST', 'PUT', 'DELETE'].includes(method)) {
        return RateLimitService.CONFIGS.API_MODERATE
      }
      // Relaxed limits for read operations
      return RateLimitService.CONFIGS.API_RELAXED
    }

    // Default limits for other endpoints
    return RateLimitService.CONFIGS.GENERAL
  }
}