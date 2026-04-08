<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

/**
 * Enhanced Login Component
 * Features:
 * - Email/password validation
 * - Error handling with detailed messages
 * - Loading state management
 * - Auto-focus on error fields
 * - Session persistence
 */

const router = useRouter()
const { login, isAuthenticated } = useAuth()

// Form state
const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const state = reactive({
  isLoading: false,
  error: '',
  fieldErrors: {} as Record<string, string>,
  showPassword: false,
})

/**
 * Validate form inputs
 */
const validateForm = (): boolean => {
  state.fieldErrors = {}

  // Email validation
  if (!form.email.trim()) {
    state.fieldErrors.email = 'Email harus diisi'
  } else if (!isValidEmail(form.email)) {
    state.fieldErrors.email = 'Email tidak valid'
  }

  // Password validation
  if (!form.password) {
    state.fieldErrors.password = 'Kata sandi harus diisi'
  } else if (form.password.length < 6) {
    state.fieldErrors.password = 'Kata sandi minimal 6 karakter'
  }

  return Object.keys(state.fieldErrors).length === 0
}

/**
 * Email validation regex
 */
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Handle login form submission
 */
const handleLogin = async () => {
  state.error = ''

  if (!validateForm()) {
    return
  }

  state.isLoading = true

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        email: form.email.toLowerCase().trim(),
        password: form.password,
        rememberMe: form.rememberMe,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      state.error = data.message || 'Login gagal. Silakan coba lagi.'
      return
    }

    // Call auth login to update local state
    await login(form.email, form.password)

    // Redirect based on role
    const user = JSON.parse(localStorage.getItem('auth_user') || '{}')
    const dashboardRoute = getDashboardRouteByRole(user.role)
    
    await router.push(dashboardRoute)
  } catch (error: any) {
    state.error = 'Terjadi kesalahan. Silakan coba lagi.'
    console.error('Login error:', error)
  } finally {
    state.isLoading = false
  }
}

/**
 * Get dashboard route based on user role
 */
const getDashboardRouteByRole = (role: string): string => {
  switch (role) {
    case 'super_admin':
      return '/admin/dashboard'
    case 'event_organizer_admin':
      return '/admin/events'
    case 'volunteer_organizer':
      return '/admin/checkin'
    case 'participant':
      return '/participant/dashboard'
    default:
      return '/'
  }
}

/**
 * Toggle password visibility
 */
const togglePasswordVisibility = () => {
  state.showPassword = !state.showPassword
}

/**
 * Handle Enter key for form submission
 */
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Eotech Tiket</h1>
        <p class="text-gray-600">Event Management Platform</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="state.error"
        class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
      >
        <svg
          class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-sm text-red-700">{{ state.error }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            :class="[
              'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition',
              state.fieldErrors.email
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-indigo-500',
            ]"
            placeholder="name@example.com"
            @keydown="handleKeydown"
            :disabled="state.isLoading"
          />
          <p v-if="state.fieldErrors.email" class="mt-1 text-sm text-red-600">
            {{ state.fieldErrors.email }}
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Kata Sandi
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="state.showPassword ? 'text' : 'password'"
              :class="[
                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition',
                state.fieldErrors.password
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-indigo-500',
              ]"
              placeholder="••••••"
              @keydown="handleKeydown"
              :disabled="state.isLoading"
            />
            <button
              type="button"
              class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              @click="togglePasswordVisibility"
            >
              <svg
                v-if="!state.showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
          <p v-if="state.fieldErrors.password" class="mt-1 text-sm text-red-600">
            {{ state.fieldErrors.password }}
          </p>
        </div>

        <!-- Remember Me -->
        <div class="flex items-center">
          <input
            id="rememberMe"
            v-model="form.rememberMe"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            :disabled="state.isLoading"
          />
          <label for="rememberMe" class="ml-2 block text-sm text-gray-600">
            Ingat saya
          </label>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          :disabled="state.isLoading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition"
        >
          <span v-if="!state.isLoading">Masuk</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>Demo credentials available upon request</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:disabled,
button:disabled {
  opacity: 0.6;
}
</style>
