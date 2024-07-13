<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAxios } from "../hooks/useAxios"



interface Transactions {
  createdAt: string;
  network: string;
  phone: string;
  planId: string;
  reference: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
}

const router = useRouter();

const transactions = ref<Transactions[]>([]);
const loading = ref(true);
const selectedTransaction = ref<Transactions | null>(null);


const getToken = (): string => {
  const token = localStorage.getItem('authToken');
  return token ? token : '';
};


const fetchTransactions = async () => {
  try {
   
    const response = await useAxios.get("/data");

    transactions.value = response.data.transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
  } finally {
    loading.value = false;
  }
};

const viewTransaction = (transaction: Transactions) => {
  selectedTransaction.value = transaction;
};

const deleteTransaction = async (transactionId: string) => {
  try {
    await axios.delete(`http://localhost:8000/api/data/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    fetchTransactions();
  } catch (error) {
    console.error('Error deleting transaction:', error);
  }
};

const handleClose = () => {
  router.push('/userDashboard');
};

onMounted(fetchTransactions);
</script>

<template>
  <div class="container">
    <div class="dashboard-card">
      <div class="header">
        <h2>Admin Dashboard - Transactions</h2>
        <button @click="handleClose" class="close-button">Close</button>
      </div>
      <div v-if="loading" class="loading-spinner"></div>
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
                <button @click="viewTransaction(transaction)" class="view-button">View</button>
                <button @click="deleteTransaction(transaction._id)" class="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>No transactions found.</div>
      </div>
    </div>

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
        <button @click="deleteTransaction(selectedTransaction._id)" class="delete-button">Delete Transaction</button>
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
  padding: 20px;
}

.dashboard-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  font-size: 26px;
  color: #333;
  font-weight: bold;
}

.close-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: left;
}

table th {
  background-color: #007bff;
  color: white;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table tr:hover {
  background-color: #f1f1f1;
}

.view-button {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.view-button:hover {
  background-color: #218838;
}

.delete-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}

.delete-button:hover {
  background-color: #c82333;
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
  padding: 30px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
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

.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
