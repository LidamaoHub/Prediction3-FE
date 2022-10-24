import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail/detail.vue')

  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/bank',
    name: 'Bank',
    component: () => import('../views/Bank.vue')

  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/New/new.vue')

  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('../views/Manage/manage.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites/favorites.vue')
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
