import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/Detail/detail.vue')

  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/List/list.vue')
  },
  {
    path: '/bank',
    name: 'Bank',
    component: () => import(/* webpackChunkName: "about" */ '../views/Bank.vue')

  },
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "about" */ '../views/New/new.vue')

  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import(/* webpackChunkName: "about" */ '../views/Manage/manage.vue')

  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
