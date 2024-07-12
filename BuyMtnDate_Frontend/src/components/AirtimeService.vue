<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';



export interface AirtimeTransaction {
  id: string;
  details: string;
}

const network = ref('');
const amount = ref(0);
const mobileNumber = ref('');
const airtimeType = ref('VTU');
const airtimeTransactions = ref<AirtimeTransaction[]>([]);


const fetchTransactions = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_AIRTIME_API + '/transactions', {
      headers: {
        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    airtimeTransactions.value = response.data;
  } catch (error) {
    console.error('Failed to fetch airtime transactions:', error);
  }
};

// Function to buy airtime
const buyAirtime = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_AIRTIME_API,
      {
        network: network.value,
        amount: amount.value,
        mobile_number: mobileNumber.value,
        Ported_number: true,
        airtime_type: airtimeType.value,
      },
      {
        headers: {
          Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Airtime purchase successful:', response.data);
    await fetchTransactions();
  } catch (error) {
    console.error('Failed to buy airtime:', error);
  }
};

// Fetch transactions on component mount
onMounted(fetchTransactions);
</script>

<template>
  <div class="service-card">
    <h2>Buy Airtime</h2>
    <form @submit.prevent="buyAirtime">
      <input v-model="network" type="text" placeholder="Network ID" required />
      <input v-model="amount" type="number" placeholder="Amount" required />
      <input v-model="mobileNumber" type="text" placeholder="Mobile Number" required />
      <select v-model="airtimeType" required>
        <option value="VTU">VTU</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">Buy Airtime</button>
    </form>
    <h3>Airtime Transactions</h3>
    <ul>
      <li v-for="transaction in airtimeTransactions" :key="transaction.id">
        {{ transaction.details }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.service-card {
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  text-align: left;
}

.service-card h2, .service-card h3 {
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.service-card form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.service-card input, .service-card select {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
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
