import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Single_Accomodation/:id',
      name: 'SingleAccomodation',
      component: () => import('../views/SingleAccomodation.vue')
    },

  ]
})

export default router
