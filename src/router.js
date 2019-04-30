import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/goods-list',
    component: () => import(/* webpackChunkName: "admin" */ './pages/Admin.vue'),
    meta: '管理系统',
    children: [{
      path: 'goods-list',
      component: () => import(/* webpackChunkName: "goodslist" */ './pages/GoodsList.vue'),
      meta: '商品管理'
    },
    {
      path: 'category-list',
      component: () => import(/* webpackChunkName: "catelist" */ './pages/CateList.vue'),
      meta: '栏目管理'
    },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './pages/Login.vue'),
    meta: '登录'
  }
  ]
})
