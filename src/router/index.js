import Vue from 'vue'
import VueRouter from 'vue-router'
import BlankPage from '@/views/BlankPage'

// TODO: 使用者角色驗證
// TODO: token有效性驗證

Vue.use(VueRouter)

const routes = [
  // 根路徑
  {
    path: '/',
    name: 'root',
    redirect: { name: 'user-sign-in' }
  },
  // 使用者登入頁
  {
    path: '/signin',
    name: 'user-sign-in',
    component: BlankPage
  },
  // 使用者註冊頁
  {
    path: '/signup',
    name: 'user-sign-up',
    component: BlankPage
  },
  // 管理員登入頁
  {
    path: '/admin',
    name: 'admin-sign-in',
    component: () => import('./../views/Admin.vue')
  },
  // 後台推文頁
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: BlankPage
  },
  // 後台使用者頁
  {
    path: '/admin/users',
    name: 'admin-users',
    component: BlankPage
  },
  // 使用者設定頁
  {
    path: '/setting',
    name: 'user-setting',
    component: BlankPage
  },
  // 首頁
  {
    path: '/home',
    name: 'homepage',
    component: BlankPage
  },
  // 推文回覆顯示頁
  {
    path: '/tweet/:id',
    name: 'tweet',
    component: BlankPage
  },
  // 使用者系列
  {
    path: '/user/:id',
    component: BlankPage,
    children: [
      // 跟隨者分頁
      {
        path: 'followers',
        name: 'followers',
        component: BlankPage
      },
      // 正在跟隨者分頁
      {
        path: 'followings',
        name: 'followings',
        component: BlankPage
      },
      // 推文分頁
      {
        path: 'tweets',
        name: 'user-tweets',
        component: BlankPage
      },
      // 推文與回覆分頁
      {
        path: 'replies',
        name: 'user-replies',
        component: BlankPage
      },
      // 喜歡的內容
      {
        path: 'likes',
        name: 'user-likes',
        component: BlankPage
      }
    ]
  },
  // 未定義路由，導回至使用者登入頁
  {
    path: '*',
    redirect: { name: 'user-sign-in' }
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router
