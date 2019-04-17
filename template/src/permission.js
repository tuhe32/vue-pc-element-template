import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        try {
          const userInfoResp = await store.dispatch('GetUserInfo');
          const serverRouterMap = userInfoResp.data.serverRouterMap;
          await store.dispatch('GenerateRoutes', { serverRouterMap });
          router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
          // hack方法 确保addRoutes已完成 ,
          // set the replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
        }catch(err) {
          await store.dispatch('FedLogOut')
          Message.error(err || '验证失败，请重新登录')
          next({ path: '/login' })
          NProgress.done()
        }
      } else {
          next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
