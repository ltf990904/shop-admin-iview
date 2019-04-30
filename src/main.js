import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8899'
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(iView)

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  if (!sessionStorage.getItem('userInfo')) {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
