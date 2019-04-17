import request from '@/utils/request'

export function findAllList() {
  return request({
    url: '/adminRole/all/availableList',
    method: 'get'
  })
}
export function findList(params) {
  return request({
    url: '/adminRole',
    method: 'get',
    params:params
  })
}
export function findDetail(id) {
  return request({
    url: '/adminRole/'+id,
    method: 'get'
  })
}
export function save(data) {
  let id = data.id || null;
  if(id == null) {
    return request({
      url: '/adminRole',
      method: 'post',
      data: {entity:data},
    })
  }
  return request({
    url: '/adminRole',
    method: 'put',
    data: {entity:data},
  })

}
export function updateStatus(id,status) {
  return request({
    url: '/adminRole/status',
    method: 'put',
    data:{id:id,status:status}
  })

}
export function deleted(id) {
  return request({
    url: '/adminRole/'+id,
    method: 'delete'
  })

}