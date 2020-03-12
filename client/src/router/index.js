import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Room from '../views/Room.vue'
import User from '../views/User.vue'
import CreateRoom from '../views/CreateRoom'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/room/:room_id',
    name: 'Room',
    component: Room
  },
  {
    path: '/user/:user_id',
    name: 'User',
    component: User
  },
  {
    path: '/create-room',
    name: 'CreateRoom',
    component: CreateRoom
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
