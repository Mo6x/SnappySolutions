// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')



// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
// import store from './store';
// import './styles/main.css';

// const app = createApp(App);

// app.use(router);
// app.use(store);
// app.mount('#app');
