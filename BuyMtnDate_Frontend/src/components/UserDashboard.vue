<script setup lang="ts">
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Import other service components
import DataService from './DataService.vue';
import AirtimeService from './AirtimeService.vue';
import ElectricityService from './ElectricityService.vue';
import CableService from './CableService.vue';

// Define handleLogout method
const handleLogout = () => {
  console.log('Logging out...');
};

// Define user icon
const userIcon = faUser;

// No need to export defineComponent when using <script setup>
// export default defineComponent({
//   name: 'UserDashboard',
//   components: {
//     DataService,
//     AirtimeService,
//     ElectricityService,
//     CableService
//   },
// });

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
      <AirtimeService />
      <ElectricityService />
      <CableService />
    </div>
  </div>
</template>


<style scoped>
.dashboard {
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
</style>