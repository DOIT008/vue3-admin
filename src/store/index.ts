import { defineStore } from "pinia";
// 引入其他store
import { alinStore } from "./alian";
type tabItem = {
  path:string;
  title:string
}
export const mainStore = defineStore('main',{
  // 存放数据的地方
  state:()=>{
    return {
      tabList:new Array<tabItem>()
    }
  },
  // 计算属性
  getters:{

  },
  actions:{

  }
});