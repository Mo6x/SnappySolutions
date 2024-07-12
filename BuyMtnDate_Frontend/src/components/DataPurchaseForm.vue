<template>
  <div class="dashboard-card">
    <h2>Purchase Data</h2>
    <form @submit.prevent="purchaseData">
      <div class="form-group">
        <label for="data-amount">Data Amount (GB)</label>
        <input type="number" id="data-amount" v-model="dataAmount" required />
      </div>
      <button class="button">Purchase</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Data amount state
const dataAmount = ref(1);

// Purchase data method
const purchaseData = () => {
  console.log('Data purchased:', dataAmount.value, 'GB');
};
</script>

<style scoped>
@import '../styles.css';

.dashboard-card {
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  text-align: left;
}

.dashboard-card h2 {
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
</style>
