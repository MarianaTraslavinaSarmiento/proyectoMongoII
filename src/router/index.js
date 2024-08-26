import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieInfo from '../views/MovieInfo.vue'
import Rooms from '../views/Rooms.vue'
import OrderSummary from '../views/OrderSummary.vue'
import SplashScreen from '../views/SplashScreen.vue'
import Login from '../views/Login.vue'
import CreateAccount from '@/views/createAccount.vue'
import Cookies from 'js-cookie'
import axios from 'axios'
import Ticket from '@/views/Ticket.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
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
      path: '/register',
      name: 'register',
      component: CreateAccount
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/home'
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Ticket
    }

    
  ]
})

router.beforeEach(async (to, from, next) => {
  const publicRoutes = ['/splash', '/login', '/register'];
  const token = Cookies.get('access_token');


  if (publicRoutes.includes(to.path)) {
    next();
  } else {
    if (!token) {
      next('/splash');
    } else {
      try {
        const response = await axios.post('http://localhost:5001/usuarios/token', {}, {withCredentials: true});
        
        if (response.data.valid == true) {
          next();
        } else {
          next('/splash');
        }
      } catch (error) {
        next('/splash');
      }
    }
  }
});

export default router