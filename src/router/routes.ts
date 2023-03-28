// 路由配置对象
import { RouteRecordRaw } from 'vue-router';
import NotFound from '@views/not-found.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    redirect: '/home', // 表示初始化的时候重定向到path为/home的路由并显示其对应的组件
  },
  {
    path: '/login',
    name: 'login',
    // 路由懒加载，当然你也可以直接先把对应的组件先引过来再说
    component: () => import(/* webpackChunkName: "login" */ '@views/login.vue'),
    meta: {
      // 路由元信息，组件中route.meta.title访问
      title: 'xxx',
      icon: 'icon-xxx',
    },
  },
  {
    path: '/home',
    name: 'home',
    // 路由懒加载，当然你也可以直接先把对应的组件先引过来再说
    component: () => import(/* webpackChunkName: "home" */ '@views/home.vue'),
    // 重定向到navigator1
    redirect: '/navigator1',
    children: [
      {
        path: '/navigator1',
        name: 'navigator1',
        component: () =>
          import(/* webpackChunkName: "navigator1" */ '@views/home-page/navigator1.vue'),
        meta: {
          title: '导航一',
        },
      },
      {
        path: '/navigator2',
        name: 'navigator2',
        component: () =>
          import(/* webpackChunkName: "navigator2" */ '@views/home-page/navigator2.vue'),
        meta: {
          title: '导航二',
        },
      },
    ],
  },
  // 一般放到最后，啥也没匹配到的时候使用404组件
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
export default routes;
