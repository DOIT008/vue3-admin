import { getToken } from '@/utils/auth';
//  封装Axios请求
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { ElMessage } from 'element-plus';
import qs from 'qs';

enum CodeInt {
  '请求成功' = 200,
  '请求异常' = 501,
}
// 类型声明
declare module 'vue' {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
  }
}
// 创建实例
const $http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 所有的请求都会在请求路径前添加baseURL
  timeout: 5000, // 超时
  // 请求头
  headers: {
    'Session-Id': getToken(),
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 请求发送之前进行拦截,
$http.interceptors.request.use((config) => {
  const { method, data } = config;
  if (method?.toLocaleLowerCase() === 'get') {
    config.url =
      `${config.url + (config.url?.indexOf('?') !== -1 ? '&' : '?')}timestamp=${Date.now()}`;
    config.params = data;
  } else if (method?.toLocaleLowerCase() === 'post') {
    if (config.headers?.getContentType().indexOf('application/x-www-form-urlencoded') === -1) {
      config.data = data;
    } else {
      config.data = qs.stringify(data, {
        arrayFormat: 'repeat',
      });
    }
  }
  return config;
});

// 对返回结果进行拦截
$http.interceptors.response.use(
  (res) => {
    const code: number = res.data?.status;
    if (code !== 200) {
      ElMessage.error(CodeInt[code]);
      return Promise.reject(res.data);
    } else {
      return res.data;
    }
  },
  (err) => {},
);
export default $http;
