<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';




const network = ref('1');
const dataType = ref('');
const planId = ref('1');
const phone = ref('');
const reference = ref('');

const handleSubmit = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_API_URL_LIVE_SNAPPY}/v1/topup/data`,
      {
        network: network.value,
        dataType: dataType.value,
        planId: planId.value,
        phone: phone.value,
        reference: reference.value,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY_SNAPPY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('POST request successful:', response.data);
    network.value = '1';
    dataType.value = '';
    planId.value = '1';
    phone.value = '';
    reference.value = '';
  } catch (error: any) {
    console.error('Error making POST request:', error.message);
  }
};
</script>


<template>
  <div class="service-card">
    <h2>Buy Data</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="network" type="text" placeholder="Network ID" required />
      <input v-model="dataType" type="text" placeholder="Data Type" required />
      <input v-model="planId" type="text" placeholder="Plan ID" required />
      <input v-model="phone" type="text" placeholder="Phone Number" required />
      <input v-model="reference" type="text" placeholder="Reference" required />
      <button type="submit">Buy Data</button>
    </form>
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

.service-card h2 {
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
</style>
