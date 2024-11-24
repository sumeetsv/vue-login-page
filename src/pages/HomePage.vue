<template>
  <div class="home-container">
    <div v-if="isLoading" class="spinner-container">
      <font-awesome-icon icon="spinner" spin size="3x" />
    </div>
    <div v-else>
      <h1>Welcome, {{ username }}!</h1>
      <p>Here’s the list of names:</p>
      <ul v-if="!error">
        <li v-for="(name, index) in names" :key="index">{{ name }}</li>
      </ul>
      <p v-else class="error">{{ error }}</p>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'

  const authStore = useAuthStore()
  const router = useRouter()
  const username = authStore.user?.name || 'Guest User'
  const names = ref([])
  const isLoading = ref(true)
  const error = ref('')

  // Simulated API call
  const fetchNames = async () => {
    isLoading.value = true
    error.value = ''
    try {
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Simulate response
      const response = ['Alice', 'Bob', 'Charlie', 'Diana']
      names.value = response
    } catch (err) {
      error.value = 'Failed to load names. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  const handleLogout = () => {
    authStore.logout()
    router.push({ name: 'login' })
  }

  // Fetch names on component mount
  onMounted(fetchNames)
</script>

<style scoped>
  .home-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }

  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 5px 0;
  }

  .error {
    color: red;
    font-size: 1.2rem;
    margin-top: 10px;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
