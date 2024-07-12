<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';


export interface ElectricityTransaction {
  id: string;
  details: string;
}


const disco = ref('');
const amount = ref(0);
const meterNumber = ref('');
const meterType = ref(1);
const electricityTransactions = ref<ElectricityTransaction[]>([]);

const fetchTransactions = async () => {
  try {
    const response = await axios.get('https://our_site_name.com/api/billpayment/id', {
      headers: {
        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    electricityTransactions.value = response.data;
  } catch (error) {
    console.error('Failed to fetch electricity transactions:', error);
  }
};


const buyElectricity = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_ELECTRICITY_API,
      {
        disco_name: disco.value,
        amount: amount.value,
        meter_number: meterNumber.value,
        MeterType: meterType.value,
      },
      {
        headers: {
          Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Electricity purchase successful:', response.data);
    await fetchTransactions();
  } catch (error) {
    console.error('Failed to buy electricity:', error);
  }
};

// Fetch transactions on component mount
onMounted(fetchTransactions);
</script>

<template>
  <div class="service-card">
    <h2>Buy Electricity</h2>
    <form @submit.prevent="buyElectricity">
      <input v-model="disco" type="text" placeholder="Disco Name" required />
      <input v-model="amount" type="number" placeholder="Amount" required />
      <input v-model="meterNumber" type="text" placeholder="Meter Number" required />
      <select v-model="meterType" required>
        <option value="1">Prepaid</option>
        <option value="2">Postpaid</option>
      </select>
      <button type="submit">Buy Electricity</button>
    </form>
    <h3>Electricity Transactions</h3>
    <ul>
      <li v-for="transaction in electricityTransactions" :key="transaction.id">
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

.service-card input, .service-card select {
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
