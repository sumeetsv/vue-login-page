import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import { useAuthStore } from '../stores/auth' // Assuming you have an auth store

// Define routes
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        next({ name: 'login' }) // Redirect to the login page if not logged in
      } else {
        next() // Allow access to the home page if logged in
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]

// Create and export the router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
