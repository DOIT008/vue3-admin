import { createRouter, createWebHashHistory } from 'vue-router';
// import * as VueRouter from "vue-router"; 可以查看VueRouter里面都有啥

import routes from './routes';

// 创建router实例
const router = createRouter({
  history: createWebHashHistory(),
  routes, // 传入routes来初始化router对象
});
// 路由全局守卫
router.beforeEach((to, from, next) => {
  next();
});
// 导出以供在main.ts入口处使用
export default router;
