import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRouterMap = [
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
  //   path: '/webUser',
  //   component: Layout,
  //   redirect: '/webUser/webUserList',
  //   children: [{
  //     path: 'webUserList',
  //     name: 'WebUser',
  //     component: () => import('@/views/webUser/WebUserList'),
  //     meta: { title: '用户列表', icon: 'webUser' }
  //   },{
  //     hidden:true,
  //     path:'webUserDetail',
  //     name:'WebUserDetail',
  //     component: () => import('@/views/webUser/WebUserDetail'),
  //     meta: { title: '用户详情', icon: 'webUserDetail' },
  //   }]
  // },
  // {
  //   path: '/role',
  //   component: Layout,
  //   redirect: '/role/roleList',
  //   children: [{
  //     path: 'roleList',
  //     name: 'Role',
  //     component: () => import('@/views/role/RoleList'),
  //     meta: { title: '角色列表', icon: 'role'},
  //   },{
  //     hidden: true,
  //     path: 'roleDetail',
  //     name: 'RoleDetail',
  //     component: () => import('@/views/role/RoleDetail'),
  //     meta: { title: '角色详情', icon: 'roleDetail' },
  //   }]
  // },

]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

]

export const componentsMap = {
  "Layout":Layout,
  "RoleList":() => import('@/views/role/RoleList'),
  "RoleDetail":() => import('@/views/role/RoleDetail'),
  "WebUserList":() => import('@/views/webUser/WebUserList'),
  "WebUserDetail":() => import('@/views/webUser/WebUserDetail'),
}
