import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

let baseUrl = "http://129.204.231.203:3306/";

const service = axios.create();

// 请求拦截器，在发送请求前先做点什么
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log("发送请求了");
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器，在收到响应后先做点什么
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("收到响应了");
    return response;
  },
  (error) => Promise.reject(error)
);

export default service;
