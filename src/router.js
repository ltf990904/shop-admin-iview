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
    meta: '商城管理',
    children: [{
      path: 'goods-list',
      component: () => import(/* webpackChunkName: "goodslist" */ './pages/GoodsList.vue'),
      meta: '商品管理'
    },
    {
      path: 'category-list',
      component: () => import(/* webpackChunkName: "catelist" */ './pages/CategoryList.vue'),
      meta: '栏目管理'
    },
    {
      path: 'goods-add',
      component: () => import(/* webpackChunkName: "goodsadd" */ './pages/GoodsAdd.vue'),
      meta: '新增商品'
    },
    ]
  },
  {
    path: '/account',
    name: 'account',
    redirect: '/account/account-list',
    component: () => import(/* webpackChunkName: "admin" */ './pages/Admin.vue'),
    meta: '会员管理',
    children: [{
      path: 'account-list',
      component: () => import(/* webpackChunkName: "goodslist" */ './pages/AccountList.vue'),
      meta: '会员列表'
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './pages/Login.vue'),
    meta: '登录'
  }
  ]
})
