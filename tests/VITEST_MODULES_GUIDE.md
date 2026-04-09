# Vitest Modules - Quick Reference

## 📦 Created Vitest Modules

### 1. `vitest.config.ts` - Configuration
Complete Vitest configuration with:
- jsdom environment for Vue components
- Path aliases (@, ~)
- Coverage settings (90%+ target)
- Test timeouts and reporters

### 2. `vitest.setup.ts` - Global Setup
Global test initialization with:
- Vue Test Utils configuration
- Mock implementations (localStorage, matchMedia)
- Helper functions for mock data

### 3. `vitest.utils.ts` - Test Utilities
Reusable test helpers and utilities

---

## 🚀 Usage Examples

### Using Authentication Helpers

```typescript
import { authTestHelpers } from '@/vitest.utils.ts'

it('should login with valid credentials', () => {
  const credentials = authTestHelpers.validCredentials()
  // { email: 'test@example.com', password: 'Password123!' }
  
  const token = authTestHelpers.createJWTWithExpiry()
  // Valid JWT token with expiry
})
```

### Using Mock Response Helpers

```typescript
import { mockResponseHelpers } from '@/vitest.utils.ts'

it('should handle success response', () => {
  const response = mockResponseHelpers.success({ user: {...} })
  // { status: 200, data: {...}, success: true }
})

it('should handle error response', () => {
  const error = mockResponseHelpers.unauthorized()
  // { status: 401, error: 'Unauthorized', success: false }
})
```

### Using Mock User Helpers

```typescript
import { mockUserHelpers } from '@/vitest.utils.ts'

it('should test super admin', () => {
  const admin = mockUserHelpers.superAdmin()
  // User object with super_admin role
})

it('should test participant', () => {
  const user = mockUserHelpers.participant()
  // User object with participant role
})
```

### Using Request Helpers

```typescript
import { mockRequestHelpers } from '@/vitest.utils.ts'

it('should authenticate request', () => {
  const request = mockRequestHelpers.withAuth('token-123')
  // { headers: { authorization: 'Bearer token-123' } }
})
```

### Using Test Data Helpers

```typescript
import { testDataHelpers } from '@/vitest.utils.ts'

it('should validate emails', () => {
  testDataHelpers.validEmails.forEach(email => {
    // Test with valid emails
  })
  
  testDataHelpers.invalidEmails.forEach(email => {
    // Test with invalid emails
  })
})
```

### Using Assertion Helpers

```typescript
import { assertionHelpers } from '@/vitest.utils.ts'

it('should validate JWT', () => {
  const token = 'eyJ...xyz'
  
  if (assertionHelpers.isValidJWT(token)) {
    // Token has valid structure
  }
})

it('should validate user object', () => {
  const user = { user_id: '123', email: 'test@example.com', role: 'participant' }
  
  if (assertionHelpers.isValidUser(user)) {
    // User has required fields
  }
})
```

### Using Mock Service Helpers

```typescript
import { mockServiceHelpers } from '@/vitest.utils.ts'

it('should mock auth service', () => {
  const authService = mockServiceHelpers.createAuthService()
  
  authService.login.mockResolvedValue({ token: 'xyz' })
  authService.logout.mockResolvedValue({ success: true })
})

it('should mock API client', () => {
  const api = mockServiceHelpers.createApiClient()
  
  api.get.mockResolvedValue({ data: {...} })
  api.post.mockResolvedValue({ data: {...} })
})
```

### Using Test Scenario Helpers

```typescript
import { testScenarioHelpers } from '@/vitest.utils.ts'

it('should test login flow', () => {
  const { validCredentials, expectedToken } = testScenarioHelpers.loginFlow
  // validCredentials: { email, password }
  // expectedToken: JWT string
})

it('should test authorization', () => {
  const { roles, permissions } = testScenarioHelpers.authorizationFlow
  // roles: ['super_admin', 'event_organizer_admin', ...]
  // permissions: { role: [permission] }
})
```

---

## 📝 Updated Test Example

Here's how to use these modules in your auth.spec.ts:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockUserHelpers, mockResponseHelpers } from '@/tests/vitest.utils'
import ButtonLogin from '@/components/ButtonLogin.vue'

describe('ButtonLogin Component', () => {
  it('should render button element', () => {
    const wrapper = mount(ButtonLogin)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should handle login with valid user', () => {
    const user = mockUserHelpers.participant()
    const response = mockResponseHelpers.success({ user })
    
    expect(response.status).toBe(200)
    expect(response.data.user.role).toBe('participant')
  })
})
```

---

## ✅ Running Tests with Vitest

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Specific file
npm run test tests/components/auth.spec.ts

# Watch specific tests
npm run test:watch -- --grep "ButtonLogin"
```

---

## 🎯 Module Organization

| Module | Purpose | Key Functions |
|--------|---------|---------------|
| vitest.config.ts | Configuration | Setup, paths, coverage |
| vitest.setup.ts | Global setup | Mocks, global config |
| vitest.utils.ts | Test helpers | Auth, users, responses, assertions |

---

## 📚 Helper Categories

### 1. Authentication Helpers (`authTestHelpers`)
- validCredentials()
- invalidCredentials()
- createJWT()
- createJWTWithExpiry()
- createExpiredJWT()

### 2. Response Helpers (`mockResponseHelpers`)
- success()
- error()
- unauthorized()
- forbidden()
- notFound()
- rateLimit()

### 3. User Helpers (`mockUserHelpers`)
- byRole()
- superAdmin()
- eventOrganizer()
- volunteer()
- participant()

### 4. Request Helpers (`mockRequestHelpers`)
- withAuth()
- withoutAuth()
- withInvalidAuth()

### 5. Test Data (`testDataHelpers`)
- validEmails
- invalidEmails
- validPasswords
- invalidPasswords

### 6. Assertions (`assertionHelpers`)
- isValidJWT()
- hasFields()
- isValidUser()
- isValidAuthState()

### 7. Mock Services (`mockServiceHelpers`)
- createAuthService()
- createApiClient()
- createStore()

### 8. Test Scenarios (`testScenarioHelpers`)
- loginFlow
- authorizationFlow
- sessionFlow

---

## 🔧 Next Steps

1. **Install dependencies** (if not already done):
   ```bash
   npm install -D vitest @testing-library/vue @vue/test-utils jsdom
   ```

2. **Run tests**:
   ```bash
   npm run test
   ```

3. **Use helpers in your tests**:
   ```typescript
   import { mockUserHelpers, authTestHelpers } from '@/tests/vitest.utils'
   ```

4. **Check coverage**:
   ```bash
   npm run test:coverage
   ```

---

## ✨ Benefits

✅ Reusable test utilities  
✅ Consistent mock data  
✅ Faster test development  
✅ Better test organization  
✅ Reduced code duplication  
✅ Centralized configuration  

All ready to use! 🚀
