import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {path: '/login',component: () => import('@/views/login/LoginUser'),hidden: true,},
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: { title: '首页', icon: 'iconfont icon-fenlei', noCache: true }
    }]
  },
  { path: '/404', redirect: '/',  hidden: true }


  // {
  //   path: '/productType',
  //   component: Layout,
  //   redirect: '/productType/productTypeList',
  //   children: [{
  //     path: 'productTypeList',
  //     name: 'ProductType',
  //     component: () => import('@/views/productType/ProductTypeList'),
  //     meta: { title: '产品类别列表', icon: 'productType' },
  //   }]
  // },
  // {
  //   path: '/pinProduct',
  //   component: Layout,
  //   redirect: '/pinProduct/pinProductList',
  //   children: [{
  //     path: 'pinProductList',
  //     name: 'PinProduct',
  //     component: () => import('@/views/pinProduct/PinProductList'),
  //     meta: { title: '拼多多产品', icon: 'pinProduct' }
  //   }]
  // },
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  {
    path: '/webUser',
    component: Layout,
    redirect: '/webUser/webUserList',
    name:'webUser',
    children: [{
      path: 'webUserList',
      name: 'webUserList',
      component: () => import('@/views/webUser/WebUserList'),
      meta: { title: '用户列表', icon: 'webUser' }
    },{
      hidden:true,
      path:'webUserDetail',
      name:'webUserDetail',
      component: () => import('@/views/webUser/WebUserDetail'),
      meta: { title: '用户详情', icon: 'webUserDetail' },
    }]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/roleList',
    name:'role',
    children: [{
      path: 'roleList',
      name: 'roleList',
      component: () => import('@/views/role/RoleList'),
      meta: { title: '角色列表', icon: 'role'},
    },{
      hidden: true,
      path: 'roleDetail',
      name: 'roleDetail',
      component: () => import('@/views/role/RoleDetail'),
      meta: { title: '角色详情', icon: 'roleDetail' },
    }]
  },
]
