import router from '../router';
import pinia from '@/store/store';
import {mainStore} from '@/store/index';
import { Message } from 'element-plus';
import { getToken } from './auth'
const store = mainStore();
console.log("🪶 ~ file: permission.ts:6 ~ store:", store)
router.beforeEach(async (to, from, next) => {
  console.log("🪶 ~ file: permission.ts:7 ~ router.beforeEach ~ to, from, next:", to, from, next)
  const hasToken = getToken();
  // 有token->登陆过
  if (hasToken) {
    if (to.path === '/login') {
      next()
    } else {
      // 看下有用户名，如果没有就重新请求，否则直接来到目标界面
      const hasGetUserInfo = store.name
      if (hasGetUserInfo) {
        // 有用户名->直接登录
        next()
      } else {
        // 没有用户名->重新请求
        try {
          // 请求用户信息
          await store.getInfo()
          next()
        } catch (error) {
          // 重新设置token
          await store.resetToken()
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
