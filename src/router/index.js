import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('./../views/Admin.vue')
  },
  {
    path: '/admin_main',
    name: 'admin_main',
    component: () => import('./../views/AdminMain.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
