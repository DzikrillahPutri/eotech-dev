import { strict as assert } from 'assert'
import { test } from '@japa/runner'
import supertest from 'supertest'
import app from '@adonisjs/core/services/app'
import Event from '#models/event'

// Helper to create event data
const eventPayload = () => ({
  title: 'Test Event',
  description: 'Event description',
  location: 'Test Location',
  registration_start_at: new Date().toISOString(),
  registration_end_at: new Date(Date.now() + 86400000).toISOString(),
  organizer_contact: '08123456789',
})

test.group('Event API', (group) => {
  let client: any

  group.setup(async () => {
    const server = app.container.make('Adonis/Core/Server') as any
    client = supertest(server.instance)
  })

  test('GET /api/events returns paginated list', async () => {
    const response = await client.get('/api/events')
    assert.equal(response.status, 200)
    assert.equal(response.body.message, 'succes')
  })

  test('GET /api/events returns empty if no events', async () => {
    const response = await client.get('/api/events')
    assert.equal(response.status, 200)
  })

  test('POST /api/events creates new event', async () => {
    const response = await client.post('/api/events').send(eventPayload())
    assert.equal(response.status, 200)
    assert.ok(response.body.id)
  })

  test('POST /api/events fails if title and description missing', async () => {
    const response = await client.post('/api/events').send({})
    assert.equal(response.status, 200)
    assert.equal(response.body.message, 'Title and Description empty, please fill mandatory field')
  })

  test('GET /api/events/:id returns event detail', async () => {
    const event = await Event.create(eventPayload())
    const response = await client.get(`/api/events/${event.event_id}`)
    assert.equal(response.status, 200)
    assert.equal(response.body.message, 'success')
  })

  test('GET /api/events/:id returns error if not found', async () => {
    const response = await client.get('/api/events/nonexistent-id')
    assert.equal(response.status, 200)
    assert.equal(response.body.message, 'id not found, please check again')
  })

  test('DELETE /api/events/:id deletes event', async () => {
    const event = await Event.create(eventPayload())
    const response = await client.delete(`/api/events/${event.event_id}`)
    assert.equal(response.status, 200)
    assert.equal(response.body.message, 'Event Success deleted')
  })

  test('DELETE /api/events/:id returns error if not found', async () => {
    const response = await client.delete('/api/events/nonexistent-id')
    assert.equal(response.status, 200)
    assert.equal(response.body.message, 'Id not found!!')
  })

  test('POST /api/events ignores extra fields', async () => {
    const payload = { ...eventPayload(), extra: 'should be ignored' }
    const response = await client.post('/api/events').send(payload)
    assert.equal(response.status, 200)
    assert.ok(response.body.id)
  })

  test('GET /api/events supports pagination', async () => {
    const response = await client.get('/api/events?page=2')
    assert.equal(response.status, 200)
    assert.equal(response.body.message, 'succes')
  })
})
