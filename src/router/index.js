import '../assets/scss/styles.scss'
import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/HomeLayout.vue'),
      children:[
        {
          path: '/',
          name: 'homepage',
          component: () => import('../pages/HomePage.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../pages/LoginPage.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../pages/RegisterPage.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../pages/UserDataPage.vue'),
        },
        {
          path: '/date',
          name: 'date',
          component: () => import('../pages/DatesDataPage.vue'),
        },
      ]
    },
  ],
})

export default router
