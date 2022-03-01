import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// TODO: 使用者角色驗證
// TODO: token有效性驗證

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser

  if (currentUser && currentUser.role !== 'admin') {
    next({ name: 'admin-sign-in' })
    return
  }
  next()
}

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role === 'admin') {
    next({ name: 'user-sign-in' })
    return
  }
  next()
}

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
    component: () => import('../views/UserSignIn.vue')
  },
  // 使用者註冊頁
  {
    path: '/signup',
    name: 'user-sign-up',
    component: () => import('../views/UserSignUp.vue')
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
    component: () => import('./../views/AdminTweets.vue'),
    beforeEnter: authorizeIsAdmin
  },
  // 後台使用者頁
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('./../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  // 使用者設定頁
  {
    path: '/setting',
    name: 'user-setting',
    component: () => import('@/views/UserSetting'),
    beforeEnter: authorizeIsUser
  },
  // 首頁
  {
    path: '/home',
    name: 'homepage',
    component: () => import('@/views/HomePage'),
    beforeEnter: authorizeIsUser
  },
  // 推文回覆顯示頁
  {
    path: '/tweet/:id',
    name: 'tweet',
    component: () => import('@/views/TweetAndReply'),
    beforeEnter: authorizeIsUser
  },
  // 跟隨者分頁
  {
    path: '/user/:id/followers',
    name: 'followers',
    component: () => import('@/views/Follower'),
    beforeEnter: authorizeIsUser
  },
  // 正在跟隨者分頁
  {
    path: '/user/:id/followings',
    name: 'followings',
    component: () => import('@/views/Following'),
    beforeEnter: authorizeIsUser
  },
  // 使用者系列
  {
    path: '/user/:id',
    name: 'user-main',
    component: () => import('@/views/UserProfile'),
    beforeEnter: authorizeIsUser,
    redirect: to => {
      return { name: 'user-tweets', params: { id: to.params.id } }
    },
    children: [
      // 推文分頁
      {
        path: 'tweets',
        name: 'user-tweets',
        component: () => import('@/components/TweetTab')
      },
      // 推文與回覆分頁
      {
        path: 'replies',
        name: 'user-replies',
        component: () => import('@/components/ReplyTab')
      },
      // 喜歡的內容
      {
        path: 'likes',
        name: 'user-likes',
        component: () => import('@/components/LikeTab')
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

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  let role = store.state.currentUser.role

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    ({ isAuthenticated, role } = await store.dispatch('fetchCurrentUser'))
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['user-sign-up', 'user-sign-in', 'admin-sign-in']
  const adminPages = ['admin-tweets', 'admin-users']

  // 如果 token 無效則轉址到對應登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    if (adminPages.includes(to.name)) {
      // 目標是後台，跳轉到後台登入頁
      next({ name: 'admin-sign-in' })
      return
    }

    // 目標是其他，跳轉到前台登入頁
    next({ name: 'user-sign-in' })
    return
  }

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    if (to.name === 'admin-sign-in' && role === 'admin') {
      next({ name: 'admin-tweets' })
      return
    }

    if (to.name === 'user-sign-in' && role !== 'admin') {
      next({ name: 'homepage' })
      return
    }
  }

  next()
})

export default router
