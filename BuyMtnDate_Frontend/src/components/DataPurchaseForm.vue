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
 
 <script>
 export default {
   data() {
     return {
       dataAmount: 1
     };
   },
   methods: {
     purchaseData() {
       console.log('Data purchased:', this.dataAmount, 'GB');
     }
   }
 };
 </script>
 
 <style scoped>
 @import '../styles.css';
 </style>
 