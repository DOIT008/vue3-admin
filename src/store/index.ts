import { defineStore } from "pinia";
// 引入其他store
import { alinStore } from "./alian";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { login, logout, getInfo } from "@/api/user";
type tabItem = {
  path: string;
  title: string;
};
export const mainStore = defineStore("main", {
  // 存放数据的地方
  state: () => {
    return {
      tabList: new Array<tabItem>(),
      token: getToken(),
      userName: "",
      avatar: "",
    };
  },
  // 计算属性
  getters: {},
  actions: {
    SET_TOKEN(token: string){
      this.token = token;
    },
    SET_NAME(name: string){
      this.userName = name;
    },
    SET_AVATAR(avatar: string){
      this.avatar = avatar;
    },
    // user login
    login(userInfo:any) {
      const { name, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ name: name.trim(), password: password })
          .then((response) => {
            const { data } = response;
            console.log("🪶 ~ file: index.ts:39 ~ .then ~ data:", data)
            this.SET_TOKEN(data.token)
            setToken(data.token);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo(this.token)
          .then((response) => {
            const { data } = response;
            const { userName, avatar } = data;
            this.SET_NAME(userName);
            
            this.SET_AVATAR(avatar)
            resolve(data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    // 退出登录
    logout() {
      return new Promise((resolve, reject) => {
        logout().then(res => { 
          removeToken(); // must remove  token  first
          resolve();
        })
      });
    },

    // remove token
    resetToken() {
      return new Promise((resolve) => {
        removeToken(); // must remove  token  first
        resolve();
      });
    },
  },
});
