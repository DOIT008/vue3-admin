//  封装Axios请求
import axios from "axios";
import {AxiosInstance} from "axios";
import { ElMessage } from "element-plus";
import qs from 'qs';
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
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
const $http = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL, // 所有的请求都会在请求路径前添加baseURL
  timeout: 5000, // 超时
  // 请求头
  // headers: {
  //   "Content-Type": "application/json;chartset=utf-8",
  // },
});

// 请求发送之前进行拦截,
$http.interceptors.request.use((config) => {
  let { method } = config;
  // console.log(config);
  config.data = config.data.data
  // if (method === 'post') {
  //   config.data = qs.stringify(config.data.data, {
  //     arrayFormat: "repeat"
  //   });
  // }
  config.headers = config.headers || {}; // 请求头
  // config.headers.token = 123,一般应该是从缓存中拿的
  return config;
});

//对返回结果进行拦截
$http.interceptors.response.use(
  (res) => {
    console.log("🪶 ~ file: http.ts:45 ~ res:", res)
    const code: number = res.data?.status;
    if (code !== 200) {
      ElMessage.error(CodeInt[code]);
      return Promise.reject(res.data);
    } else {
      return res.data;
    }
  },
  (err) => {
  }
);
export default $http;
