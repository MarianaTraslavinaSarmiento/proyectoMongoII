import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieInfo from '../views/MovieInfo.vue'
import Rooms from '../views/Rooms.vue'
import OrderSummary from '../views/OrderSummary.vue'
import SplashScreen from '../views/SplashScreen.vue'
import Login from '../views/Login.vue'

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
      path: '/movie/:id/rooms',
      name: 'rooms',
      component: Rooms
    },
    {
      path: '/buyticket',
      name: 'buy_ticket',
      component: OrderSummary
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/splash',
      name: 'splash',
      component: SplashScreen
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/splash'
    }
    
  ]
})

export default router