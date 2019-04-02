import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

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
      name: 'dashboard',
      meta: { title: '首页', icon: 'iconfont icon-index-copy', noCache: true }
    }]
  },
  { path: '/404', redirect: '/',  hidden: true },
  {
    path: '/labels',
    component: Layout,
    redirect: '/labels/labelsList',
    children: [{
      path: 'labelsList',
      name: 'LabelsList',
      component: () => import('@/views/labels/LabelsList'),
      meta: { title: '标签列表', icon: 'iconfont icon-chanpin'}
    }]
  },
  {
    path: '/signUp',
    component: Layout,
    redirect: '/signUp/signUpList',
    children: [{
      path: 'signUpList',
      name: 'SignUpList',
      component: () => import('@/views/signUp/SignUpList'),
      meta: { title: '报名列表', icon: 'iconfont icon-promotion' }
    }]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/student/studentList',
    children: [{
      path: 'studentList',
      name: 'StudentList',
      component: () => import('@/views/signUp/StudentList'),
      meta: { title: '学生列表', icon: 'iconfont icon-xuesheng' }
    }]
  },
  {
    path: '/school',
    component: Layout,
    redirect: '/school/schoolList',
    children: [{
      path: 'schoolList',
      name: 'SchoolList',
      component: () => import('@/views/signUp/SchoolList'),
      meta: { title: '学校列表', icon: 'iconfont icon-leibie' }
    }]
  },
  {
    path: '/major',
    component: Layout,
    redirect: '/major/majorList',
    children: [{
      path: 'majorList',
      name: 'MajorList',
      component: () => import('@/views/signUp/MajorList'),
      meta: { title: '专业列表', icon: 'iconfont icon-zhuanye' }
    }]
  },
  {
    path: '/teammate',
    component: Layout,
    redirect: '/teammate/teammateList',
    children: [{
      path: 'teammateList',
      name: 'TeammateList',
      component: () => import('@/views/signUp/TeammateList'),
      meta: { title: '队友召唤', icon: 'iconfont el-icon-error' }
    }]
  },
  {
    path: '/channel',
    component: Layout,
    redirect: '/channel/channelProviderList',
    children: [{
      path: 'channelProviderList',
      name: 'ChannelProvider',
      component: () => import('@/views/channel/ChannelProviderList'),
      meta: { title: '渠道商列表', icon: 'iconfont icon-fenxiao', noCache: true}
    }]
  },
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
  // {
  //   path: '/product',
  //   component: Layout,
  //   redirect: '/product/productList',
  //   children: [{
  //     path: 'productList',
  //     name: 'Product',
  //     component: () => import('@/views/product/ProductList'),
  //     meta: { title: '产品列表', icon: 'product', noCache: true}
  //   },{
  //     hidden: true,
  //     path: 'productDetail',
  //     name: 'ProductDetail',
  //     component: () => import('@/views/product/ProductDetail'),
  //     meta: { title: '产品详情', icon: 'productDetail' },
  //   }]
  // },
  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: '/order/orderList',
  //   children: [{
  //     path: 'orderList',
  //     name: 'Order',
  //     component: () => import('@/views/order/OrderList'),
  //     meta: { title: '订单列表', icon: 'order', noCache: true}
  //   }]
  // },
  // {
  //   path: '/promote',
  //   component: Layout,
  //   redirect: '/promote/PromoteList',
  //   children: [{
  //     path: 'promoteList',
  //     name: 'Promote',
  //     component: () => import('@/views/promote/PromoteList'),
  //     meta: { title: '推广位列表', icon: 'promote', noCache: true}
  //   }]
  // },
  // {
  //   path: '/distributionSetting',
  //   component: Layout,
  //   meta: { title: '分销管理'},
  //   redirect: '/distributionSetting/distributionSettingDetail',
  //   children: [{
  //     path: 'distributionSettingDetail',
  //     name: 'DistributionSettingDetail',
  //     component: () => import('@/views/distribution/DistributionSettingDetail'),
  //     meta: { title: '分销设置', icon: 'distributionSetting', noCache: true}
  //   },{
  //     path: 'agencyManagement',
  //     name: 'AgencyManagement',
  //     component: () => import('@/views/agency/AgencyManagement'),
  //     meta: { title: '代理管理', icon: 'agencyManagement', noCache: true}
  //   },{
  //     hidden: true,
  //     path: 'subordinateList',
  //     name: 'SubordinateList',
  //     component: () => import('@/views/agency/SubordinateList'),
  //     meta: { title: '下级详情', icon: 'subordinateList', noCache: true}
  //   },{
  //     hidden: true,
  //     path: 'distributionBillList',
  //     name: 'DistributionBillList',
  //     component: () => import('@/views/distribution/DistributionBillList'),
  //     meta: { title: '账单列表', icon: 'distributionBillList', noCache: true}
  //   }]
  // },
  // {
  //   path: '/withdrawCash',
  //   component: Layout,
  //   redirect: '/withdrawCash/withdrawCashAuditList',
  //   children: [{
  //     path: 'withdrawCashAuditList',
  //     name: 'WithdrawCash',
  //     component: () => import('@/views/withdrawCash/WithdrawCashAuditList'),
  //     meta: { title: '提现审核管理', icon: 'withdrawCash', noCache: true}
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
  // "ProductType":() => import('@/views/productType/ProductTypeList'),
  // "PinProduct":() => import('@/views/pinProduct/PinProductList'),
  // "Product":() => import('@/views/product/ProductList'),
  // "Order":() => import('@/views/order/OrderList'),
  // "Promote":() => import('@/views/promote/PromoteList'),
  // "DistributionSettingDetail":() => import('@/views/distribution/DistributionSettingDetail'),
  // "AgencyManagement":() => import('@/views/agency/AgencyManagement'),
  // "SubordinateList":() => import('@/views/agency/SubordinateList'),
  // "DistributionBillList":() => import('@/views/distribution/DistributionBillList'),
  // "WithdrawCash":() => import('@/views/withdrawCash/WithdrawCashAuditList'),
}
