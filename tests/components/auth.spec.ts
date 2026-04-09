import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonLogin from '@/components/ButtonLogin.vue'
import ButtonRegister from '@/components/ButtonRegister.vue'

/**
 * Unit Tests for Authentication Components
 * 
 * Test Coverage:
 * - Button rendering and styling
 * - Click event handling
 * - Navigation and routing
 * - Accessibility attributes
 */

describe('ButtonLogin Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Test 1: Component should render correctly
  it('should render button element', () => {
    const wrapper = mount(ButtonLogin)
    
    expect(wrapper.find('button').exists()).toBe(true)
  })

  // Test 2: Component should have correct text
  it('should display login text', () => {
    const wrapper = mount(ButtonLogin)
    
    const text = wrapper.text()
    expect(text.toLowerCase()).toContain('login')
  })

  // Test 3: Button should be clickable
  it('should emit click event', async () => {
    const wrapper = mount(ButtonLogin)
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  // Test 4: Button should have proper styling classes
  it('should have proper button styling classes', () => {
    const wrapper = mount(ButtonLogin)
    
    const button = wrapper.find('button')
    const className = button.attributes('class')
    
    expect(className).toBeTruthy()
  })

  // Test 5: Button should be accessible
  it('should have accessible attributes', () => {
    const wrapper = mount(ButtonLogin)
    const button = wrapper.find('button')
    
    expect(button.attributes('type')).toBe('button')
  })

  // Test 6: Button should navigate on click if using router-link
  it('should handle navigation when clicked', async () => {
    const wrapper = mount(ButtonLogin, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})

describe('ButtonRegister Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Test 7: Component should render correctly
  it('should render button element', () => {
    const wrapper = mount(ButtonRegister)
    
    expect(wrapper.find('button').exists()).toBe(true)
  })

  // Test 8: Component should have correct text
  it('should display register text', () => {
    const wrapper = mount(ButtonRegister)
    
    const text = wrapper.text()
    expect(text.toLowerCase()).toContain('register')
  })

  // Test 9: Button should be clickable
  it('should emit click event', async () => {
    const wrapper = mount(ButtonRegister)
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  // Test 10: Button should have proper styling classes
  it('should have proper button styling classes', () => {
    const wrapper = mount(ButtonRegister)
    
    const button = wrapper.find('button')
    const className = button.attributes('class')
    
    expect(className).toBeTruthy()
  })

  // Test 11: Button should be accessible
  it('should have accessible attributes', () => {
    const wrapper = mount(ButtonRegister)
    const button = wrapper.find('button')
    
    expect(button.attributes('type')).toBe('button')
  })

  // Test 12: Register button styling should differ from login
  it('should have distinct styling from login button', () => {
    const loginWrapper = mount(ButtonLogin)
    const registerWrapper = mount(ButtonRegister)
    
    const loginClass = loginWrapper.find('button').attributes('class')
    const registerClass = registerWrapper.find('button').attributes('class')
    
    // They should have different classes or styling
    expect(loginClass).not.toBe(registerClass)
  })
})
