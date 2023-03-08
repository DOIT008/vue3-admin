import request from '@/utils/http'
// 登录
export function login(data:any) {
  return request({
    url: '/login',
    method: 'post',
    headers:{
      // 'Content-type':'application/json;'
    },
    data
  })
}
// 获取用户信息
export function getInfo(token:any) {
  return request({
    url: '/userInfo',
    method: 'get',
    data: { token }
  })
}
// 退出登录
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
    headers:{
      'Content-type':'application/x-www-form-urlencoded'
    },
  })
}
