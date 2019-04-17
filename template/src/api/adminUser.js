import request from '@/utils/request'

export function findAllList() {
    return request({
        url: '/adminUser/findAllList',
        method: 'get'
    })
}
export function findList(params) {
    return request({
        url: '/adminUser/findList',
        method: 'get',
        params: params,
    })
}

export function isEnableOne(param) {
    console.log('isEnableOne-data:', param);
    return request({
        url: '/adminUser/isEnable',
        method: 'put',
        data: param
    })
}

export function findDetail(id) {
    return request({
        url: '/adminUser/findDetail/' + id,
        method: 'get'
    })
}

export function checkUserName(param) {
    return request({
        url: '/adminUser/checkUserName',
        method: 'get',
        params: param
    })
}

export function save(data) {
    // console.log('save-data:', data);
    return request({
        url: '/adminUser/saveUser',
        method: 'post',
        data: data,
    })


}

export function deleted(id) {
    return request({
        url: '/adminUser/delete/' + id,
        method: 'delete'
    })

}
export function generatePassword(data) {
    return request({
        url: '/adminUser/generatePassword',
        data:data
    })
}