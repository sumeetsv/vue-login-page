<template>
  <div class="login-container">
    <!-- Full-page spinner -->
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-spinner fa-spin spinner"></i>
    </div>

    <!-- Login form -->
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <TextBox
        id="username"
        label="Username"
        v-model="username"
        placeholder="Enter your username"
        :error="errors.username"
      />
      <TextBox
        id="password"
        label="Password"
        type="password"
        v-model="password"
        placeholder="Enter your password"
        :error="errors.password"
      />
      <button :disabled="isLoading" type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  import TextBox from "@/components/TextBox.vue"; // Import the TextBox component

  const router = useRouter() // Access the router

  // Reactive variables
  const authStore = useAuthStore()
  const username = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const errors = reactive({
    username: '',
    password: ''
  })

  // Form validation
  const validateForm = () => {
    let isValid = true

    // Reset errors
    errors.username = ''
    errors.password = ''

    if (!username.value) {
      errors.username = 'Username is required'
      isValid = false
    }

    if (!password.value) {
      errors.password = 'Password is required'
      isValid = false
    }

    return isValid
  }

  // Form submission
  const handleSubmit = async () => {
    if (!validateForm()) return

    isLoading.value = true // Start loading spinner
    try {
      // Simulate an API call
      const success = await authStore.login({
        email: username.value,
        password: password.value
      })
      if (success) {
        // alert("Login successful!");
        router.push({ name: 'home' })
      } else {
        alert('Authentication failed!')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Something went wrong.')
    } finally {
      isLoading.value = false // Stop loading spinner
    }
  }
</script>

<style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    position: relative; /* Required for overlay positioning */
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }

  span {
    color: red;
    font-size: 0.875rem;
  }

  /* Full-page spinner overlay */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .spinner {
    font-size: 3rem;
    color: #007bff;
  }
</style>
