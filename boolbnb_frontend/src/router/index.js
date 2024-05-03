import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeLanding from '../views/HomeLanding.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLanding
    },
    {
      path: '/search',
      name: 'search',
      component: HomeView
    },
    {
      path: '/Single_Accomodation/:id/:slug',
      name: 'SingleAccomodation',
      component: () => import('../views/SingleAccomodation.vue')
    },

  ]
})

export default router
