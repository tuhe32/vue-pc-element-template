import { asyncRouterMap, constantRouterMap,componentsMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 *将后台的路由表进行格式化
 * @param {*} asyncRouterMap
 */
function convertRouter(asyncRouterMap) {
  const accessedRouters = []
  if (asyncRouterMap) {
    asyncRouterMap.forEach(item => {
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
  item.component = componentsMap[item.component]
  // var router = {
  //   path: item.path,
  //   name: item.name,
  //   meta: item.meta,
  //   // component: isParent ? Layout : () => import(item.component)
  //   component: componentsMap[item.name]
  // }
  return item
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
        console.log('[constantRouterMap]',constantRouterMap)
        state.addRoutes = routes
        state.routes = constantRouterMap.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { serverRouterMap } = data
        let accessedRouters = []
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        if(serverRouterMap) 
          accessedRouters = convertRouter(serverRouterMap)
        console.log('[999]',accessedRouters)
        // }
        commit('SET_ROUTES', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
