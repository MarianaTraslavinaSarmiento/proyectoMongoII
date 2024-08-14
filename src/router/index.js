import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieInfo from '../views/MovieInfo.vue'
import Rooms from '../views/Rooms.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movie/:id',
      name: 'movie_info',
      component: MovieInfo
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms
    }
    
  ]
})

export default router