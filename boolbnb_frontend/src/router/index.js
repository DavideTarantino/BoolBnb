import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeLanding from '../views/HomeLanding.vue'
import Messages from '../views/Messages.vue'
import { useApiStore } from '../stores/apiStore.js'

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
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (from.name !== 'home' && from.name !== 'SingleAccomodation') {
          next({ name: 'home' });
        } else {
          next();
        }
      },
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages,
      beforeEnter: (to, from, next) => {
        if (!useApiStore().user) {
          next({ name: 'home' });
        } else {
          next();
        }
      },
    },
    {
      path: '/Single_Accomodation/:id/:slug',
      name: 'SingleAccomodation',
      component: () => import('../views/SingleAccomodation.vue')
    },

  ]
})

export default router

