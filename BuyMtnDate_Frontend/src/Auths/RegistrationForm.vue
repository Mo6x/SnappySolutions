<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="register-title">Register</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" type="text" placeholder="Enter your username" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input v-model="email" id="email" type="email" placeholder="Enter your email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="password" id="password" type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleRegister() {
      const { username, email, password } = this;
      try {
        const response = await axios.post('/api/auth/register', { username, email, password });
        this.$store.dispatch('login', { user: response.data.user, token: response.data.token });
        this.$router.push('/user-dashboard');
      } catch (error) {
        console.error('Error registering:', error);
      }
    },
  },
});
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.register-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #007bff;
  outline: none;
}

.register-button {
  padding: 12px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #0056b3;
}
</style>
