/**
 * Vitest Setup Configuration
 * 
 * This file contains global test setup and configuration
 * for all Vitest unit and integration tests
 */

import { vi } from 'vitest'

/**
 * Vue Test Utils Configuration
 */
const mockConfig: any = {
  global: { mocks: {}, stubs: {} }
}

mockConfig.global.mocks = {
  $route: {
    params: {},
    query: {},
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  },
}

/**
 * Global Test Stubs
 * 
 * Stub common Vue components and plugins
 */
mockConfig.global.stubs = {
  transition: false,
  'transition-group': false,
}

/**
 * Global Test Configuration
 */

// Mock window.matchMedia
Object.defineProperty(global, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock as any

/**
 * Test Utilities
 */

/**
 * Create mock auth state
 */
export const createMockAuthState = (role = 'participant') => ({
  token: 'mock-token-123',
  user: {
    user_id: 'user-123',
    email: 'test@example.com',
    fullName: 'Test User',
    role,
    createdAt: new Date().toISOString(),
  },
  isAuthenticated: true,
  expiresAt: new Date(Date.now() + 86400000),
})

/**
 * Create mock user
 */
export const createMockUser = (role = 'participant') => ({
  user_id: 'user-123',
  email: 'test@example.com',
  fullName: 'Test User',
  role,
  createdAt: new Date().toISOString(),
})

/**
 * Create mock API response
 */
export const createMockResponse = (data: any, status = 200) => ({
  status,
  data,
  headers: {
    'content-type': 'application/json',
  },
})

/**
 * Create mock error response
 */
export const createMockErrorResponse = (error: string, status = 400) => ({
  status,
  error,
  message: error,
})
