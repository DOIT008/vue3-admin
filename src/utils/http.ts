//  封装Axios请求
import axios from "axios";
import {AxiosInstance} from "axios";
import { ElMessage } from "element-plus";
enum CodeInt {
  "请求成功" = 200,
  "请求异常" = 501,
}
// 类型声明
declare module 'vue' {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
  }
}
// 创建实例
const $http = axios.create({
  baseURL: "/api", // 所有的请求都会在请求路径前添加"/api"
  timeout: 5000, // 超时
  // 请求头
  headers: {
    "Content-Type": "application/json;chartset=utf-8",
  },
});

// 请求发送之前进行拦截,
$http.interceptors.request.use((config) => {
  config.headers = config.headers || {}; // 请求头
  // config.headers.token = 123,一般应该是从缓存中拿的
  return config;
});

//对返回结果进行拦截
$http.interceptors.response.use(
  (res) => {
    const code: number = res.data?.code;
    if (code !== 200) {
      ElMessage.error(CodeInt[code]);
      return Promise.reject(res.data);
    } else {
      return res.data;
    }
  },
  (err) => {}
);
export default $http;
