<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DataService from './DataService.vue';



const handleLogout = () => {
  console.log('Logging out...');
};

const userIcon = faUser;


const networkProviders = ref<Array<{ network: string; networkId: number }>>([]);
const products = ref<Array<{ network: string; networkId: number; name: string }>>([]);
const selectedTab = ref<number>(1);


const fetchNetworkProviders = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_API_URL_LIVE_SNAPPY}/v1/topup/load/networks`,
      { networks: 'all' },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY_SNAPPY}`,
        },
      }
    );
    if (response.data.status) {
      networkProviders.value = response.data.data.product;
    }
  } catch (error) {
    console.error('Error fetching network providers:', error);
  }
};


const fetchData = async (networkId: number) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_API_URL_LIVE_SNAPPY}/v1/topup/load/data-types`,
      { network: `${networkId}` },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY_SNAPPY}`,
        },
      }
    );    
    if (response.data.status) {
      products.value = response.data.data.product;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};


onMounted(() => {
  fetchNetworkProviders();
  fetchData(selectedTab.value);
});


const handleTabClick = (networkId: number) => {
  selectedTab.value = networkId;
  fetchData(networkId);
};
</script>

<template>
  <div class="dashboard">
    <div class="header">
      <h1>User Dashboard</h1>
      <div class="user-profile">
        <font-awesome-icon :icon="userIcon" class="profile-icon" />
        <span class="username">John Doe</span>
      </div>
      <button @click="handleLogout">Logout</button>
    </div>
    <div class="services">
      <DataService />
     
    </div>
    <div class="tabs">
      <button v-for="provider in networkProviders" :key="provider.networkId" 
              :class="{ active: selectedTab === provider.networkId }" 
              @click="handleTabClick(provider.networkId)">
        {{ provider.network }}
      </button>
    </div>
    <div v-if="products.length > 0" class="products-table">
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Network</th>
            <th>Network ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.name">
            <td>{{ product.network }}</td>
            <td>{{ product.networkId }}</td>
            <td>{{ product.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  width: 550px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
}

.header h1 {
  font-size: 24px;
  color: #333;
}

.user-profile {
  display: flex;
  align-items: center;
}

.profile-icon {
  font-size: 24px;
  color: #555;
  margin-right: 10px;
}

.username {
  font-size: 16px;
  color: #555;
}

.dashboard button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard button:hover {
  background-color: #0056b3;
}

.services {
  display: flex;
  flex-direction: row; 
  gap: 20px; 
}

.tabs {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tabs button.active {
  background-color: #007bff;
  color: white;
}

.tabs button:hover:not(.active) {
  background-color: #e0e0e0;
}

.products-table {
  margin-top: 20px;
}

.products-table table {
  width: 100%;
  border-collapse: collapse;
}

.products-table th, .products-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.products-table th {
  background-color: #f5f5f5;
}

.products-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
