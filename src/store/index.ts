import { defineStore } from "pinia";
// 引入其他store
import { alinStore } from "./alian";
import { getToken, setToken, removeToken } from '@/utils/auth';
import {login, logout, getInfo} from '@/api/user'
type tabItem = {
  path:string;
  title:string
}
export const mainStore = defineStore('main',{
  // 存放数据的地方
  state:()=>{
    return {
      tabList: new Array<tabItem>(),
      token: getToken()
    }
  },
  // 计算属性
  getters:{

  },
  actions:{
    // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        // 设置头像
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      resolve()
    })
  },
  },


  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  }
});