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
    {
      path: 'goods-edit/:id',
      component: () => import(/* webpackChunkName: "goodsedit" */ './pages/GoodsEdit.vue'),
      meta: '编辑商品'
    },
    {
      path: 'category-add',
      component: () => import(/* webpackChunkName: "categoryadd" */ './pages/CategoryAdd.vue'),
      meta: '新增栏目'
    },
    ]
  },
  {
    path: '/account',
    name: 'account',
    redirect: '/account/account-list',
    component: () => import(/* webpackChunkName: "account" */ './pages/Admin.vue'),
    meta: '会员管理',
    children: [{
      path: 'account-list',
      component: () => import(/* webpackChunkName: "accountlist" */ './pages/AccountList.vue'),
      meta: '会员列表'
    }]
  },
  {
    path: '/order',
    name: 'order',
    redirect: '/order/order-list',
    component: () => import(/* webpackChunkName: "order" */ './pages/Admin.vue'),
    meta: '商城订单',
    children: [{
      path: 'order-list',
      component: () => import(/* webpackChunkName: "orderlist" */ './pages/OrderList.vue'),
      meta: '订单管理'
    },
    {
      path: 'order-edit/:id',
      component: () => import(/* webpackChunkName: "orderedit" */ './pages/OrderEdit.vue'),
      meta: '编辑订单'
    },
    {
      path: 'order-detail/:id',
      component: () => import(/* webpackChunkName: "orderdetail" */ './pages/OrderDetail.vue'),
      meta: '订单详情'
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
