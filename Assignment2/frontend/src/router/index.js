import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Homepage' },
    component: () => import(/* webpackChunkName: "home" */ '@/views/Homepage.vue')
  },
  {
    path: '/init',
    name: 'init',
    meta: { title: 'Init' },
    component: () => import(/* webpackChunkName: "init" */ '@/views/Init.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: { title: 'test' },
    component: () => import(/* webpackChunkName: "test" */ '@/views/RealTest.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
