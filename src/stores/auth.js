import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref(null)

  const login = async (credentials) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (
      credentials.email === 'user@example.com' &&
      credentials.password === 'password'
    ) {
      isLoggedIn.value = true
      user.value = { name: 'John Doe' }
      return true
    }
    return false
  }

  const logout = () => {
    isLoggedIn.value = false
    user.value = null
  }

  // Using computed to create a getter for isAuthenticated
  const isAuthenticated = computed(() => isLoggedIn.value)

  return {
    isLoggedIn,
    user,
    login,
    logout,
    isAuthenticated
  }
})
