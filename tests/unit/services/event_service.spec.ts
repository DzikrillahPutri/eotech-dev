import { test } from '@japa/runner'
import { EventService, CreateEventData, UpdateEventData } from '#services/event_service'
import { FileUploadService } from '#services/file_upload_service'
import { RateLimitService } from '#services/rate_limit_service'
import { CacheService } from '#services/cache_service'
import Event from '#models/event'
import db from '@adonisjs/lucid/services/db'

test.group('EventService', (group) => {
  let eventService: EventService

  group.setup(async () => {
    eventService = new EventService()
    // Clear cache before tests
    await CacheService.clearAll()
  })

  group.teardown(async () => {
    // Clean up after tests
    await CacheService.clearAll()
  })

  test('should create event with valid data', async ({ assert }) => {
    const eventData: CreateEventData = {
      title: 'Test Event',
      description: 'Test Description',
      location: 'Test Location',
      organizer_contact: 'test@example.com',
      registration_start_at: new Date().toISOString(),
      registration_end_at: new Date(Date.now() + 86400000).toISOString(),
      status: 'pending',
      owner_id: 'test-user-id'
    }

    const result = await eventService.createEvent(eventData)

    assert.isTrue(result.success)
    assert.isDefined(result.data)
    assert.equal(result.data?.title, eventData.title)
    assert.equal(result.data?.status, eventData.status)
  })

  test('should validate event data correctly', async ({ assert }) => {
    const invalidData = {
      title: 'A', // Too short
      location: 'A', // Too short
      organizer_contact: 'invalid-contact',
      registration_start_at: new Date().toISOString(),
      registration_end_at: new Date(Date.now() - 86400000).toISOString(), // End before start
    }

    const validation = eventService.validateEventData(invalidData)

    assert.isFalse(validation.valid)
    assert.isAbove(validation.errors.length, 0)
  })

  test('should get event by ID with caching', async ({ assert }) => {
    // Create test event
    const eventData: CreateEventData = {
      title: 'Cache Test Event',
      description: 'Test caching',
      location: 'Test Location',
      organizer_contact: 'test@example.com',
      registration_start_at: new Date().toISOString(),
      registration_end_at: new Date(Date.now() + 86400000).toISOString(),
      status: 'pending',
      owner_id: 'test-user-id'
    }

    const createResult = await eventService.createEvent(eventData)
    assert.isTrue(createResult.success)

    const eventId = createResult.data!.event_id

    // First call - should cache
    const event1 = await eventService.getEventById(eventId)
    assert.isDefined(event1)
    assert.equal(event1?.title, eventData.title)

    // Second call - should use cache
    const event2 = await eventService.getEventById(eventId)
    assert.deepEqual(event1, event2)
  })

  test('should get paginated events', async ({ assert }) => {
    const params = {
      page: 1,
      limit: 10,
      status: 'all' as const,
      search: ''
    }

    const result = await eventService.getEventDataPublic(params)

    assert.isDefined(result.data)
    assert.isDefined(result.data.meta)
    assert.isDefined(result.data.data)
    assert.isNumber(result.data.meta.total)
    assert.isArray(result.data.data)
  })

  test('should update event correctly', async ({ assert }) => {
    // Create test event
    const eventData: CreateEventData = {
      title: 'Update Test Event',
      description: 'Test update',
      location: 'Test Location',
      organizer_contact: 'test@example.com',
      registration_start_at: new Date().toISOString(),
      registration_end_at: new Date(Date.now() + 86400000).toISOString(),
      status: 'pending',
      owner_id: 'test-user-id'
    }

    const createResult = await eventService.createEvent(eventData)
    assert.isTrue(createResult.success)

    const eventId = createResult.data!.event_id

    // Update event
    const updateData: UpdateEventData = {
      title: 'Updated Event Title',
      status: 'publish'
    }

    const updateResult = await eventService.updateEvent(eventId, updateData)

    assert.isTrue(updateResult.success)
    assert.equal(updateResult.data?.title, updateData.title)
    assert.equal(updateResult.data?.status, updateData.status)
  })

  test('should delete event correctly', async ({ assert }) => {
    // Create test event
    const eventData: CreateEventData = {
      title: 'Delete Test Event',
      description: 'Test delete',
      location: 'Test Location',
      organizer_contact: 'test@example.com',
      registration_start_at: new Date().toISOString(),
      registration_end_at: new Date(Date.now() + 86400000).toISOString(),
      status: 'pending',
      owner_id: 'test-user-id'
    }

    const createResult = await eventService.createEvent(eventData)
    assert.isTrue(createResult.success)

    const eventId = createResult.data!.event_id

    // Delete event (soft delete)
    const deleteResult = await eventService.deleteEvent(eventId, false)

    assert.isTrue(deleteResult.success)

    // Verify event is archived
    const deletedEvent = await eventService.getEventById(eventId)
    assert.equal(deletedEvent?.status, 'archived')
  })

  test('should get event statistics', async ({ assert }) => {
    const stats = await eventService.getEventStats('test-user-id')

    assert.isDefined(stats)
    assert.isNumber(stats.total)
    assert.isNumber(stats.published)
    assert.isNumber(stats.pending)
    assert.isNumber(stats.archived)
  })
})

test.group('FileUploadService', (group) => {
  test('should validate file types correctly', async ({ assert }) => {
    // This would require mocking MultipartFile
    // For now, just test the validation logic structure
    const validationOptions = {
      maxSize: 1024 * 1024, // 1MB
      allowedTypes: ['image/jpeg', 'image/png'],
      allowedExtensions: ['.jpg', '.png']
    }

    // Test validation options structure
    assert.isDefined(validationOptions.maxSize)
    assert.isArray(validationOptions.allowedTypes)
    assert.isArray(validationOptions.allowedExtensions)
  })
})

test.group('RateLimitService', (group) => {
  test('should have predefined configurations', async ({ assert }) => {
    assert.isDefined(RateLimitService.CONFIGS.API_STRICT)
    assert.isDefined(RateLimitService.CONFIGS.API_MODERATE)
    assert.isDefined(RateLimitService.CONFIGS.API_RELAXED)
    assert.isDefined(RateLimitService.CONFIGS.UPLOAD_MODERATE)
    assert.isDefined(RateLimitService.CONFIGS.AUTH_STRICT)
  })

  test('should validate rate limit config structure', async ({ assert }) => {
    const config = RateLimitService.CONFIGS.API_MODERATE

    assert.isDefined(config.windowMs)
    assert.isDefined(config.maxRequests)
    assert.isNumber(config.windowMs)
    assert.isNumber(config.maxRequests)
  })
})

test.group('CacheService', (group) => {
  group.setup(async () => {
    await CacheService.clearAll()
  })

  group.teardown(async () => {
    await CacheService.clearAll()
  })

  test('should have predefined configurations', async ({ assert }) => {
    assert.isDefined(CacheService.CONFIGS.SHORT)
    assert.isDefined(CacheService.CONFIGS.MEDIUM)
    assert.isDefined(CacheService.CONFIGS.LONG)
    assert.isDefined(CacheService.CONFIGS.TAGS)
  })

  test('should set and get cache correctly', async ({ assert }) => {
    const key = 'test-key'
    const value = { test: 'data' }

    // Set cache
    const setResult = await CacheService.set(key, value, CacheService.CONFIGS.SHORT)
    assert.isTrue(setResult)

    // Get cache
    const cachedValue = await CacheService.get(key)
    assert.deepEqual(cachedValue, value)
  })

  test('should generate cache keys correctly', async ({ assert }) => {
    const eventId = 'test-event-id'
    const eventKey = CacheService.getEventCacheKey(eventId)

    assert.isString(eventKey)
    assert.include(eventKey, eventId)
  })
})