<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const { email, password } = this;
      try {
        const response = await axios.post('/api/auth/login', { email, password });
        this.$store.dispatch('login', { user: response.data.user, token: response.data.token });
        this.$router.push('/user-dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
  },
});
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}

.login button {
  width: 100%;
  padding: 10px;
}
</style>
