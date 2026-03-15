import { test } from '@japa/runner'
import { execSync, spawnSync } from 'child_process'

test.group('Commands event', () => {
  test('event command simulation prints event API steps', async ({ assert }) => {
    const output = execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })

    assert.include(output, 'Running event command test flow...')
    assert.include(output, 'Simulating: GET /api/v1/events -> 200')
    assert.include(output, 'Simulating: POST /api/v1/events -> 200')
    assert.include(output, 'Simulating: GET /api/v1/events/:id -> 200')
    assert.include(output, 'Simulating: DELETE /api/v1/events/:id -> 200')
  })

  test('event command should exit successfully', async ({ assert }) => {
    const result = spawnSync('node', ['ace', 'event'], {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    assert.equal(result.status, 0)
    assert.isTrue(result.stdout.includes('Running event command test flow...'))
  })

  test('event command should not print error text', async ({ assert }) => {
    const output = execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    assert.notInclude(output, 'Error')
    assert.notInclude(output, 'Exception')
  })

  test('event command false-positive negative scenario: no invalid route', async ({ assert }) => {
    const output = execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    assert.notInclude(output, 'GET /api/v1/invalid')
  })

  test('event command should include simulation metrics for all four steps', async ({ assert }) => {
    const output = execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    assert.include(output, 'Simulating: GET /api/v1/events -> 200')
    assert.include(output, 'Simulating: POST /api/v1/events -> 200')
    assert.include(output, 'Simulating: GET /api/v1/events/:id -> 200')
    assert.include(output, 'Simulating: DELETE /api/v1/events/:id -> 200')
  })

  test('event command should return help text on --help', async ({ assert }) => {
    const output = execSync('node ace event --help', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    assert.include(output, 'event command test flow')
  })

  test('event command should not include backend API scanning in output', async ({ assert }) => {
    const output = execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    assert.notInclude(output, 'vite:dep-scan')
  })

  test('event command should run quickly under 15 seconds', async ({ assert }) => {
    const start = Date.now()
    execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    const elapsed = Date.now() - start
    assert.isBelow(elapsed, 15000)
  })

  test('event command multiple runs produce consistent output', async ({ assert }) => {
    const output1 = execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    const output2 = execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    assert.include(output1, 'Running event command test flow...')
    assert.include(output2, 'Running event command test flow...')
    assert.equal(output1.includes('Simulating: GET /api/v1/events -> 200'), true)
    assert.equal(output2.includes('Simulating: GET /api/v1/events -> 200'), true)
  })

  test('event command false-positive: must not include unrelated API', async ({ assert }) => {
    const output = execSync('node ace event', {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'test' },
      encoding: 'utf8',
      timeout: 120000,
    })
    assert.notInclude(output, 'Simulating: DELETE /api/v1/users')
  })
})
