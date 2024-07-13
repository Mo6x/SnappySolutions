<script setup lang="ts">
import { ref } from 'vue';
import { useAxios } from '../hooks/useAxios';




const phone = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');
const mobileNumber = ref('');

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  isSuccess.value = false;

  try {
    const response = await useAxios.post(
      '/data',
      {
        phone: phone.value
      },
    );

    console.log('POST request successful:', response.data);

    mobileNumber.value = phone.value;
    phone.value = '';

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
  phone.value = '';
};
</script>


<template>
  <div class="service-card">
    <h2>Buy Data</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input v-model="phone" type="text" id="phone" required />
      </div>
      <button type="submit" class="button" :disabled="isLoading">Buy Data</button>
    </form>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Processing your purchase...</p>
    </div>

    <div v-if="isSuccess" class="modal">
      <div class="modal-content">
        <h3>Successfully purchased data!</h3>
        <p>Mobile Number: {{ mobileNumber }}</p>
        <button @click="handleBackToDashboard" class="button">Close</button>
      </div>
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
  text-align: left;
}

.service-card label {
  display: block;
  margin-bottom: 5px;
  color: #666;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.success-message h3 {
  color: #28a745;
}

.error-message p {
  color: #dc3545;
}
</style>

