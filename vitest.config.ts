import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Test environment
    environment: 'jsdom',
    
    // Global test setup
    globals: true,
    
    // Test file patterns
    include: ['tests/**/*.spec.ts'],
    exclude: ['node_modules', 'dist'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '**/*.spec.ts',
        '**/types/**',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },
    
    // Test timeout
    testTimeout: 10000,
    
    // Hook timeout
    hookTimeout: 10000,
    
    // Reporters
    reporters: ['verbose'],
    
    // Silent output
    silent: false,
    
    // Continue on error
    bail: 0,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './inertia'),
      '~': path.resolve(__dirname, './'),
    },
  },
})
