import request from '@/utils/http'
// 登录
export function login(data:any) {
  return request.request({
    url: '/login',
    method: "POST",
    headers:{
      // 'Content-type':'application/json;'
    },
    data
  })
}
// 获取用户信息
export function getInfo(token:any) {
  return request.request({
    url: '/userInfo',
    method: 'get',
    data: { token }
  })
}
// 退出登录
export function logout() {
  return request.request({
    url: '/logout',
    method: 'post',
    headers:{
      'Content-type':'application/x-www-form-urlencoded'
    },
  })
}
// 美女图片
export function getImages (data:any) {
  return request.request({
    url: '/dream/category',
    method: "GET",
    headers: {
      // 'Content-type':'application/json;'
    },
    data
  })
}
