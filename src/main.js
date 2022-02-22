import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from '@/components/SvgIcon'

// portal-vue資訊：https://github.com/LinusBorg/portal-vue
// 打算用在呼叫發推、回覆、編輯使用者Profile這類跳出對話框上
import PortalVue from 'portal-vue'
Vue.use(PortalVue)

// svg-sprite-loader works with Vue: https://ithelp.ithome.com.tw/articles/10230334
// 在Vue中使用SVG
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('@/assets/icons', true, /\.svg$/)
requireAll(req)

Vue.component('icon', SvgIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
