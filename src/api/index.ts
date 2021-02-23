import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";

const service = axios.create();

message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
});

// 请求拦截器，在发送请求前先做点什么
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log("发送请求了");
    config.headers["authorization"] = localStorage.getItem("token") || "";
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxqeCIsInBhc3N3b3JkIjoiNjI4NjI4IiwiaWF0IjoxNjA4MDQxMDE5fQ.LbbmcyGbXYAxQQiEPj_hkYfVnAF6-JIKYJ0pzNrQeKE";
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器，在收到响应后先做点什么
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("收到响应了");
    const code = response.data.code;
    if (code === 100 && window.location.pathname !== "/login") {
      message.warn(response.data.message + "请重新登录");
      window.location.replace("/login");
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default service;
