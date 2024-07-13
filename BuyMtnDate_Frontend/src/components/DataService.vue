<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';



const network = ref('1');
const dataType = ref('');
const planId = ref('1');
const phone = ref('');
const reference = ref('');

const isLoading = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');
const purchaseDetails = ref({
  accountNumber: '',
  dataAmount: '',
});

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  isSuccess.value = false;

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

    purchaseDetails.value.accountNumber = phone.value;
    purchaseDetails.value.dataAmount = dataType.value;

    network.value = '1';
    dataType.value = '';
    planId.value = '1';
    phone.value = '';
    reference.value = '';
    
    isSuccess.value = true;
  } catch (error: any) {
    console.error('Error making POST request:', error.message);
    errorMessage.value = 'An error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const handleBackToDashboard = () => {
  isSuccess.value = false;
  network.value = '1';
  dataType.value = '';
  planId.value = '1';
  phone.value = '';
  reference.value = '';
};
</script>

<template>
  <div class="service-card">
    <h2>Buy Data</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input v-model="network" type="text" placeholder="Network ID" required />
      </div>
      <div class="form-group">
        <input v-model="dataType" type="text" placeholder="Data Type" required />
      </div>
      <div class="form-group">
        <input v-model="planId" type="text" placeholder="Plan ID" required />
      </div>
      <div class="form-group">
        <input v-model="phone" type="text" placeholder="Phone Number" required />
      </div>
      <div class="form-group">
        <input v-model="reference" type="text" placeholder="Reference" required />
      </div>
      <button type="submit" class="button" :disabled="isLoading">Buy Data</button>
    </form>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Processing your purchase...</p>
    </div>

    <div v-if="isSuccess" class="success-message">
      <h3>Successfully purchased {{ purchaseDetails.dataAmount }} of data!</h3>
      <p>Account Number: {{ purchaseDetails.accountNumber }}</p>
      <button @click="handleBackToDashboard" class="button">Back to Dashboard</button>
    </div>

    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
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

.service-card .form-group {
  margin-bottom: 15px;
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

.loading {
  margin-top: 20px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #28a745;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.success-message, .error-message {
  margin-top: 20px;
}

.success-message h3, .error-message p {
  color: #28a745;
}

.error-message p {
  color: #dc3545;
}
</style>

