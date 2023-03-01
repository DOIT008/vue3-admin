import router from '../router'
import store from '../store'
import { Message } from 'element-plus';
import {getToken} from './auth'
router.beforeEach(async(to, from, next) => {
  const hasToken = getToken();
  // 有token->登陆过
  if (hasToken) {
    if (to.path === '/login') {
      next()
    } else {
      // 看下有用户名，如果没有就重新请求，否则直接来到目标界面
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // 有用户名->直接登录
        next()
      } else {
        // 没有用户名->重新请求
        try {
          // 请求用户信息
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // 重新设置token
          await store.dispatch('resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (to.fullPath === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})
