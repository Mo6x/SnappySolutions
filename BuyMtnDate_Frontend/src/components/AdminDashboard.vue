<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';



const transactions = ref([] as any[]);
const loading = ref(true);
const selectedTransaction = ref(null as any);

const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });
    transactions.value = response.data.transactions;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    loading.value = false;
  }
};

const viewTransaction = (transaction: any) => {
  selectedTransaction.value = transaction;
};

const deleteTransaction = async (transactionId: string) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });
    fetchTransactions();
    selectedTransaction.value = null;
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
};

onMounted(fetchTransactions);
</script>



<template>
  <div class="container">
    <div class="dashboard-card">
      <h2>Admin Dashboard - Transactions</h2>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <table v-if="transactions.length > 0">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User ID</th>
              <th>Phone</th>
              <th>Network</th>
              <th>Plan ID</th>
              <th>Reference</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction._id">
              <td>{{ transaction._id }}</td>
              <td>{{ transaction.userId }}</td>
              <td>{{ transaction.phone }}</td>
              <td>{{ transaction.network }}</td>
              <td>{{ transaction.planId }}</td>
              <td>{{ transaction.reference }}</td>
              <td>
                <button @click="viewTransaction(transaction)">View</button>
                <button @click="deleteTransaction(transaction._id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No transactions found.</div>
      </div>
    </div>

    <!-- Transaction Details Modal -->
    <div class="modal" v-if="selectedTransaction">
      <div class="modal-content">
        <span class="close" @click="selectedTransaction = null">&times;</span>
        <h3>Transaction Details</h3>
        <p><strong>Transaction ID:</strong> {{ selectedTransaction._id }}</p>
        <p><strong>User ID:</strong> {{ selectedTransaction.userId }}</p>
        <p><strong>Phone:</strong> {{ selectedTransaction.phone }}</p>
        <p><strong>Network:</strong> {{ selectedTransaction.network }}</p>
        <p><strong>Plan ID:</strong> {{ selectedTransaction.planId }}</p>
        <p><strong>Reference:</strong> {{ selectedTransaction.reference }}</p>
        <button @click="deleteTransaction(selectedTransaction._id)">Delete Transaction</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.dashboard-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.dashboard-card h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th, table td {
  border: 1px solid #ccc;
  padding: 10px;
}

table th {
  background-color: #f5f5f5;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

 