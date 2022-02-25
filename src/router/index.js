import Vue from 'vue'
import VueRouter from 'vue-router'
import BlankPage from '@/views/BlankPage'
import store from '@/store'

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
    component: () => import('@/views/UserSetting')
  },
  // 首頁
  {
    path: '/home',
    name: 'homepage',
    component: () => import('@/views/Homepage')
  },
  // 推文回覆顯示頁
  {
    path: '/tweet/:id',
    name: 'tweet',
    component: () => import('@/views/Tweet')
  },
  // 跟隨者分頁
  {
    path: '/user/:id/followers',
    name: 'followers',
    component: () => import('@/views/Follower')
  },
  // 正在跟隨者分頁
  {
    path: '/user/:id/followings',
    name: 'followings',
    component: () => import('@/views/Following')
  },
  // 使用者系列
  {
    path: '/user/:id',
    component: () => import('@/views/UserProfile'),
    children: [
      // 推文分頁
      {
        path: 'tweets',
        name: 'user-tweets',
        component: () => import('@/components/TweetContent')
      },
      // 推文與回覆分頁
      {
        path: 'replies',
        name: 'user-replies',
        component: () => import('@/components/ReplyContent')
      },
      // 喜歡的內容
      {
        path: 'likes',
        name: 'user-likes',
        component: () => import('@/components/LikeContent')
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

router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser')
  next()
})

export default router
