<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';



export interface DataTransaction {
  id: string;
  details: string;
}


const network = ref('');
const mobileNumber = ref('');
const plan = ref('');
const dataTransactions = ref<DataTransaction[]>([]);

const fetchTransactions = async () => {
  try {
    const response = await axios.get('https://our_site_name.com/api/data/id', {
      headers: {
        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    dataTransactions.value = response.data;
  } catch (error) {
    console.log('Failed to fetch data transactions:', error);
  }
};


const buyData = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_DATA_API,
      {
        network: network.value,
        mobile_number: mobileNumber.value,
        plan: plan.value,
        Ported_number: true,
      },
      {
        headers: {
          Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Data purchase successful:', response.data);
    await fetchTransactions();
  } catch (error) {
    console.log('Failed to buy data:', error.message);
  }
};

onMounted(fetchTransactions);
</script>

<template>
  <div class="service-card">
    <h2>Buy Data</h2>
    <form @submit.prevent="buyData">
      <input v-model="network" type="text" placeholder="Network ID" required />
      <input v-model="mobileNumber" type="text" placeholder="Mobile Number" required />
      <input v-model="plan" type="text" placeholder="Plan ID" required />
      <button type="submit">Buy Data</button>
    </form>
    <h3>Data Transactions</h3>
    <ul>
      <li v-for="transaction in dataTransactions" :key="transaction.id">
        <div class="transaction-id">{{ transaction.id }}</div>
        <div class="transaction-details">{{ transaction.details }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.service-card {
  width: 100%;
  padding: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.service-card h2, .service-card h3 {
  color: #333;
  margin-bottom: 10px;
}

.service-card input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.service-card button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.service-card button:hover {
  background-color: #218838;
}

.service-card ul {
  list-style-type: none;
  padding: 0;
}

.service-card li {
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  background-color: #f1f1f1;
}
</style>
