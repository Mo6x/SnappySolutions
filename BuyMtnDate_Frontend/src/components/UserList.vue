<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
// import { getToken } from "../hooks/getToken";


export interface User {
  id: string;
  username: string;
  email: string;
  dataPurchased: string;
}

const users = ref<User[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);


const fetchUsers = async () => {
  try {
    const response = await axios.get('https://our_site_name.com/api/user/', {
      headers: {
        Authorization: 'Token 66f2e5c39ac8640f13cd888f161385b12f7e5e92',
        'Content-Type': 'application/json',
      },
    });
    users.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch users';
  } finally {
    loading.value = false;
  }
};


onMounted(fetchUsers);
</script>

<template>
  <div class="user-list">
    <h3>Registered Users</h3>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <table v-if="!loading && !error">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Data Purchased</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dataPurchased }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.user-list {
  margin: 20px auto;
  padding: 20px;
  max-width: 800px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h3 {
  margin-bottom: 20px;
  color: #333;
}

.loading,
.error {
  margin-top: 20px;
  color: red;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  text-align: left;
}

td {
  background-color: #fff;
}

tr:nth-child(even) td {
  background-color: #f9f9f9;
}
</style>
