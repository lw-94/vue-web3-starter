import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../layout/OLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: Layout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(`@/views/dashboard/DashboardView.vue`)
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: 'dashboard'
    }
  ]
})

export default router
