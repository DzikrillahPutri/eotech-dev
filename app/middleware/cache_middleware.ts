import { HttpContext } from '@adonisjs/core/http'
import { CacheService } from '#services/cache_service'

export default class CacheMiddleware {
  async handle({ request, response }: HttpContext, next: () => Promise<void>, config: any = {}) {
    const method = request.method()
    const url = request.url()
    const isGetRequest = method === 'GET'

    // Only cache GET requests
    if (!isGetRequest) {
      await next()
      return
    }

    // Skip caching for certain endpoints
    if (this.shouldSkipCache(url)) {
      await next()
      return
    }

    // Generate cache key from request
    const cacheKey = this.generateCacheKey(request)

    // Try to get cached response
    const cachedResponse = await CacheService.get<any>(cacheKey, 'api_response')
    if (cachedResponse) {
      // Return cached response
      response.header('X-Cache-Status', 'HIT')
      response.header('X-Cache-Time', new Date().toISOString())

      // Set response data
      response.status(cachedResponse.status || 200)
      if (cachedResponse.headers) {
        Object.entries(cachedResponse.headers).forEach(([key, value]) => {
          if (key !== 'set-cookie' && key !== 'x-cache-status' && key !== 'x-cache-time') {
            response.header(key, value as string)
          }
        })
      }

      return response.json(cachedResponse.data)
    }

    // Store original response methods
    const originalJson = response.json.bind(response)
    const originalStatus = response.status.bind(response)
    let responseData: any = null
    let responseStatus: number = 200
    let responseHeaders: Record<string, string> = {}

    // Override response methods to capture data
    response.json = (data: any) => {
      responseData = data
      return originalJson(data)
    }

    response.status = (code: number) => {
      responseStatus = code
      return originalStatus(code)
    }

    // Capture response headers
    const originalHeader = response.header.bind(response)
    response.header = (key: string, value: string | string[]) => {
      if (typeof value === 'string') {
        responseHeaders[key.toLowerCase()] = value
      }
      return originalHeader(key, value)
    }

    await next()

    // Cache successful responses only
    if (responseStatus >= 200 && responseStatus < 300 && responseData) {
      const cacheData = {
        data: responseData,
        status: responseStatus,
        headers: responseHeaders,
        cachedAt: new Date().toISOString()
      }

      // Cache with appropriate TTL based on endpoint
      const ttl = this.getCacheTtl(url)
      await CacheService.set(cacheKey, cacheData, {
        ttl,
        tags: this.getCacheTags(url),
        prefix: 'api_response'
      })

      // Add cache headers to response
      response.header('X-Cache-Status', 'MISS')
      response.header('X-Cache-Time', new Date().toISOString())
    }
  }

  /**
   * Check if endpoint should skip caching
   */
  private shouldSkipCache(url: string): boolean {
    const skipPatterns = [
      '/api/auth',
      '/api/user',
      '/admin',
      '/login',
      '/register',
      '/logout'
    ]

    return skipPatterns.some(pattern => url.includes(pattern))
  }

  /**
   * Generate cache key from request
   */
  private generateCacheKey(request: any): string {
    const url = request.url()
    const queryParams = request.qs()
    const sortedParams = Object.keys(queryParams)
      .sort()
      .map(key => `${key}=${queryParams[key]}`)
      .join('&')

    return `${url}${sortedParams ? `?${sortedParams}` : ''}`
  }

  /**
   * Get cache TTL based on endpoint
   */
  private getCacheTtl(url: string): number {
    // Static content - long cache
    if (url.includes('/events') && url.includes('/public')) {
      return CacheService.CONFIGS.LONG.ttl
    }

    // Dynamic content - medium cache
    if (url.includes('/events')) {
      return CacheService.CONFIGS.MEDIUM.ttl
    }

    // Default - short cache
    return CacheService.CONFIGS.SHORT.ttl
  }

  /**
   * Get cache tags for invalidation
   */
  private getCacheTags(url: string): string[] {
    const tags:string[] = []

    if (url.includes('/events')) {
      tags.push(...CacheService.CONFIGS.TAGS.EVENTS)
    }

    if (url.includes('/public') || !url.includes('/admin')) {
      tags.push(...CacheService.CONFIGS.TAGS.PUBLIC)
    } else {
      tags.push(...CacheService.CONFIGS.TAGS.PRIVATE)
    }

    return tags
  }
}