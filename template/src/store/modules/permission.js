import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param authRouters
 * @param route
 */
function hasPermission(authRouters, route) {
  if (route.name) {
    return authRouters.some(auth => route.name === auth)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes, authRouters) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(authRouters, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, authRouters)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 *将后台的路由表进行格式化
 * @param {*} asyncRoutes
 */
function convertRouter(asyncRoutes) {
  const accessedRouters = []
  if (asyncRoutes) {
    asyncRoutes.forEach(item => {
      var parent = generateRouter(item)
      var children = []
      if (item.children) {
        item.children.forEach(child => {
          children.push(generateRouter(child))
        })
      }
      parent.children = children
      accessedRouters.push(parent)
    })
  }
  accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
  return accessedRouters
}

function generateRouter(item) {
  // item.component = componentsMap[item.component]
  return item
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { serverRouterMap } = data
        let accessedRouters = []
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRoutes
        // } else {
        if(serverRouterMap)
          accessedRouters = filterAsyncRoutes(asyncRoutes,serverRouterMap)
        // console.log('[999]',accessedRouters)
        // }
        accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
