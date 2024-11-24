import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes/router.js' // Import the router

const pinia = createPinia() // Initialize Pinia

// Create Vue app and use both Pinia and Router
const app = createApp(App)
app.use(pinia) // Add Pinia to the app
app.use(router) // Add Router to the app

// Mount the app
app.mount('#app')
