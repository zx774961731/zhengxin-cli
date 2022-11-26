import axios from 'axios';
import router from '@/router';
// import { message } from 'ant-design-vue';
const TimeOut = 3600; // 定义超时时间
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // 配置开发环境的baseApi
  timeout: 5000 // 超时时间
});

// 请求拦截器
service.interceptors.request
  .use
  // (config) => {
  //   // 注入token 判断token在不在
  //   if (store.getters.token) {
  //     // 判断是否超时
  //     if (checkTimeOut()) {
  //       // 超时了 删除token 跳到登录页
  //       store.dispatch('user/logout');
  //       router.push('/login');
  //       return Promise.reject(new Error('token超时了'));
  //     }
  //     config.headers['Authorization'] = `Bearer ${store.getters.token}`;
  //   }
  //   return config; // config必须返回
  // },
  // (error) => {
  //   return Promise.reject(error);
  // }
  ();

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // response.data
    // const { success, message, data } = response.data;
    //   根据成功与否 执行操作
    // if (success) {
    //   return data;
    // } else {
    //   message.error(message);
    //   return Promise.reject(new Error(message));
    // }
    if (response.status == 200) return response.data;
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      // 表示后端返回token失效
      store.dispatch('user/logout');
      router.push('/login');
    } else {
      Message.error(error.message); // 提示错误信息
    }
    return Promise.reject(error); // 返回执行错误的错误的promise对象 进入catch
  }
);

export default service;
