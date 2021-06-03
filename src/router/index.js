import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Order from '../views/Order.vue'
import Confirm from '../views/Confirm.vue'
import Summary from '../views/Summary.vue'
import OrdersSummary from '../views/OrdersSummary.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirm
  },
  {
    path: '/summary',
    name: 'Summary',
    component: Summary
  },
  {
    path: '/orders-summary',
    name: 'OrdersSummary',
    component: OrdersSummary
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
