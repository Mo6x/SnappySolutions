import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationForm from '@/Auths/RegistrationForm.vue'
import UserDashboard from '@/components/UserDashboard.vue'
import AdminDashboard from '@/components/AdminDashboard.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registration',
      name: 'registrationForm',
      component:  RegistrationForm
    },
    {
      path: '/userDashboard',
      name: 'userDashboard ',
      component:  UserDashboard 
    },
    {
      path: '/adminDashboard',
      name: 'adminDashboard',
      component: AdminDashboard 
    },
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
