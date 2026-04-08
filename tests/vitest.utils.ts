/**
 * Vitest Test Utilities
 * 
 * Reusable helpers and utilities for all tests
 */

import { vi } from 'vitest'

/**
 * Authentication Test Helpers
 */

export const authTestHelpers = {
  /**
   * Create valid credentials object
   */
  validCredentials: () => ({
    email: 'test@example.com',
    password: 'Password123!',
  }),

  /**
   * Create invalid credentials
   */
  invalidCredentials: () => ({
    email: 'invalid-email',
    password: 'short',
  }),

  /**
   * Create JWT token
   */
  createJWT: (payload: any) => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64')
    const body = Buffer.from(JSON.stringify(payload)).toString('base64')
    const signature = Buffer.from('test-signature').toString('base64')
    return `${header}.${body}.${signature}`
  },

  /**
   * Create JWT with expiry
   */
  createJWTWithExpiry: (expiresIn = 3600) => {
    const now = Math.floor(Date.now() / 1000)
    return authTestHelpers.createJWT({
      user_id: 'user-123',
      email: 'test@example.com',
      role: 'participant',
      iat: now,
      exp: now + expiresIn,
    })
  },

  /**
   * Create expired JWT
   */
  createExpiredJWT: () => {
    const now = Math.floor(Date.now() / 1000)
    return authTestHelpers.createJWT({
      user_id: 'user-123',
      role: 'participant',
      iat: now - 7200,
      exp: now - 3600, // Expired 1 hour ago
    })
  },
}

/**
 * Mock HTTP Response Helpers
 */

export const mockResponseHelpers = {
  /**
   * Create successful response
   */
  success: (data: any, status = 200) => ({
    status,
    data,
    success: true,
  }),

  /**
   * Create error response
   */
  error: (message: string, status = 400) => ({
    status,
    error: message,
    success: false,
  }),

  /**
   * Create unauthorized response
   */
  unauthorized: () => mockResponseHelpers.error('Unauthorized', 401),

  /**
   * Create forbidden response
   */
  forbidden: () => mockResponseHelpers.error('Forbidden', 403),

  /**
   * Create not found response
   */
  notFound: () => mockResponseHelpers.error('Not found', 404),

  /**
   * Create rate limit response
   */
  rateLimit: () => ({
    status: 429,
    error: 'Too many requests',
    retryAfter: 60,
  }),
}

/**
 * Mock User Helpers
 */

export const mockUserHelpers = {
  /**
   * Create mock user by role
   */
  byRole: (role: string) => ({
    user_id: 'user-123',
    email: `${role}@example.com`,
    fullName: `${role} User`,
    role,
    createdAt: new Date().toISOString(),
  }),

  /**
   * Super admin user
   */
  superAdmin: () => mockUserHelpers.byRole('super_admin'),

  /**
   * Event organizer user
   */
  eventOrganizer: () => mockUserHelpers.byRole('event_organizer_admin'),

  /**
   * Volunteer user
   */
  volunteer: () => mockUserHelpers.byRole('volunteer_organizer'),

  /**
   * Participant user
   */
  participant: () => mockUserHelpers.byRole('participant'),
}

/**
 * Mock Request/Response Helpers
 */

export const mockRequestHelpers = {
  /**
   * Create mock request with auth header
   */
  withAuth: (token: string) => ({
    headers: {
      authorization: `Bearer ${token}`,
    },
  }),

  /**
   * Create mock request without auth
   */
  withoutAuth: () => ({
    headers: {
      authorization: '',
    },
  }),

  /**
   * Create mock request with invalid auth
   */
  withInvalidAuth: () => ({
    headers: {
      authorization: 'Invalid Token',
    },
  }),
}

/**
 * Test Data Helpers
 */

export const testDataHelpers = {
  /**
   * Valid email addresses
   */
  validEmails: [
    'test@example.com',
    'user.name@example.co.uk',
    'first+last@example.org',
  ],

  /**
   * Invalid email addresses
   */
  invalidEmails: [
    'invalid-email',
    'test@',
    '@example.com',
    'test @example.com',
    '',
  ],

  /**
   * Valid passwords
   */
  validPasswords: [
    'Password123!',
    'Secure@Pass2024',
    'MyP@ssw0rd',
  ],

  /**
   * Invalid passwords
   */
  invalidPasswords: [
    'short',
    '12345678',
    'nouppercase123',
    'NOLOWERCASE123',
    'NoNumbers!',
    '',
  ],
}

/**
 * Assertion Helpers
 */

export const assertionHelpers = {
  /**
   * Assert valid JWT structure
   */
  isValidJWT: (token: string): boolean => {
    const parts = token.split('.')
    return parts.length === 3 && parts.every(part => part.length > 0)
  },

  /**
   * Assert has required fields
   */
  hasFields: (obj: any, fields: string[]): boolean => {
    return fields.every(field => field in obj && obj[field] !== undefined)
  },

  /**
   * Assert user object structure
   */
  isValidUser: (user: any): boolean => {
    return assertionHelpers.hasFields(user, ['user_id', 'email', 'role'])
  },

  /**
   * Assert valid auth state
   */
  isValidAuthState: (state: any): boolean => {
    return assertionHelpers.hasFields(state, ['token', 'user', 'isAuthenticated'])
  },
}

/**
 * Mock Service Helpers
 */

export const mockServiceHelpers = {
  /**
   * Create mock auth service
   */
  createAuthService: () => ({
    login: vi.fn(),
    logout: vi.fn(),
    refresh: vi.fn(),
    validate: vi.fn(),
    getUser: vi.fn(),
  }),

  /**
   * Create mock API client
   */
  createApiClient: () => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  }),

  /**
   * Create mock store
   */
  createStore: () => ({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    dispatch: vi.fn(),
    commit: vi.fn(),
  }),
}

/**
 * Test Scenario Helpers
 */

export const testScenarioHelpers = {
  /**
   * Login flow scenario
   */
  loginFlow: {
    validCredentials: authTestHelpers.validCredentials(),
    invalidCredentials: authTestHelpers.invalidCredentials(),
    expectedToken: authTestHelpers.createJWTWithExpiry(),
  },

  /**
   * Authorization flow scenario
   */
  authorizationFlow: {
    roles: ['super_admin', 'event_organizer_admin', 'volunteer_organizer', 'participant'],
    permissions: {
      super_admin: ['manage_all_users', 'manage_events', 'manage_system_settings'],
      event_organizer_admin: ['manage_events', 'view_event_summary'],
      volunteer_organizer: ['checkin_tickets', 'view_event_summary'],
      participant: ['purchase_tickets', 'view_own_orders'],
    },
  },

  /**
   * Session flow scenario
   */
  sessionFlow: {
    sessionTimeout: 86400000, // 24 hours
    refreshThreshold: 600000, // 10 minutes
    maxRetries: 3,
  },
}
