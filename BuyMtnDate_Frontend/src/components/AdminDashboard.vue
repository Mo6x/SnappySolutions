<script setup lang="ts">
import UserList from './UserList.vue'
</script>



<template>
   <div class="container">
     <div class="dashboard-card">
       <h2>Admin Dashboard</h2>
       <UserList />
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
 </style>
 