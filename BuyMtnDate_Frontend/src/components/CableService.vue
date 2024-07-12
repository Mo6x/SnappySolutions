<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

export interface CableTransaction {
  id: string;
  details: string;
}

const cablename = ref('');
const cableplan = ref('');
const smartCardNumber = ref('');
const cableTransactions = ref<CableTransaction[]>([]);

const fetchTransactions = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_CABLE_SUBSCRIPTION_API + 'transactions', {
      headers: {
        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    cableTransactions.value = response.data;
  } catch (error) {
    console.error('Failed to fetch cable transactions:', error);
  }
};

const buyCableSubscription = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_CABLE_SUBSCRIPTION_API,
      {
        cablename: cablename.value,
        cableplan: cableplan.value,
        smart_card_number: smartCardNumber.value,
      },
      {
        headers: {
          Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Cable subscription purchase successful:', response.data);
    await fetchTransactions();
  } catch (error) {
    console.error('Failed to buy cable subscription:', error);
  }
};

onMounted(fetchTransactions);
</script>

<template>
  <div class="service-card">
    <h2>Buy Cable Subscription</h2>
    <form @submit.prevent="buyCableSubscription">
      <input v-model="cablename" type="text" placeholder="Cable Name" required />
      <input v-model="cableplan" type="text" placeholder="Cable Plan" required />
      <input v-model="smartCardNumber" type="text" placeholder="Smart Card Number" required />
      <button type="submit">Buy Subscription</button>
    </form>
    <h3>Cable Subscription Transactions</h3>
    <ul>
      <li v-for="transaction in cableTransactions" :key="transaction.id">
        {{ transaction.details }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.service-card {
  width: 100%;
  max-width: 300px;
  margin: 10px;
  text-align: center;
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
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
  background-color: #f1f1f1;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
}
</style>
