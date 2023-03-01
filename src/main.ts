import { createApp } from "vue"; // 引入createApp函数
import App from "./App.vue"; // 其实其实就是一个对象
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import "./style.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 图标文件
// 拿到路由对象
import router from "@/router/index";
import $http from '@/common/http';
import '@/permission' // permission control
// 引入pinia
import { createPinia } from 'pinia';
// 执行挂载进行实例化
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
// 全局注入
app.config.globalProperties.$http = $http
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 使用ElementUI
app.use(ElementPlus)
// 使用路由
app.use(router);
app.mount("#app");