import request from '@/utils/request'


export function getWebUserList(params) {
  return request({
    url: '/adminUser/findList',
    params:params,
    method:'GET'
  })
}

export function disableUser(data) {
  return request({
    url: '/api/v1/webUser/disable',
    data:data
  })
}

export function enableUser(data) {
  return request({
    url: '/adminUser/isEnableRole',
    data:data
  })
}

export function deleteUser(data) {
  return request({
    url: '/adminUser/deleteUser',
    data:data
  })
}

export function getRoleList(params) {
  return request({
    url: '/adminRole/findList',
    params:params,
    method:'GET'
  })
}

export function getAllRole(data) {
  return request({
    url: '/adminRole/getAllRoles',
    data:data
  })
}

export function getMenuList(data) {
  return request({
    url: '/adminMenu/findList',
    data:data
  })
}

export function getRoleDetail(data) {
  return request({
    url: '/adminRole/findDetail',
    data:data
  })
}

export function saveRole(data) {
  return request({
    url: '/adminRole/saveRole',
    data:data
  })
}

export function deleteRole(data) {
  return request({
    url: '/adminRole/deleteRole',
    data:data
  })
}

export function getWebUserDetail(data) {
  return request({
    url: '/adminUser/findDetail',
    data:data
  })
}

export function saveWebUser(data) {
  return request({
    url: '/adminUser/saveUser',
    data:data
  })
}

export function savePassword(data) {
  return request({
    url: '/adminUser/savePassword',
    data:data
  })
}

export function generatePassword(data) {
  return request({
    url: '/adminUser/generatePassword',
    data:data
  })
}

export function login(data) {
  return request({
    url: '/login',
    data:data
  })
}



