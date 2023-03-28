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
type requestType = {
  data: any[],
  page: string,
  pageSize: object,
  stat:string
}
// 热点信息
export function getHotNews(data: any) {
  return request.get<requestType>('/toutiao/index', {
    params: data,
    headers: {
      'Content-Type':'application/json;charset-utf-8'
    }
  })
}
