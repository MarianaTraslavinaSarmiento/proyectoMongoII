import { createRouter, createWebHistory } from 'vue-router'
import Example from '../views/Example.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Example
    },
  ]
})

export default router