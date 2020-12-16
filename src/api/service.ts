import service from "./index";

const baseUrl = "http://127.0.0.1:7001";

// 登录接口
export interface ILogin {
  username: string;
  password: string;
}

export function login(data: ILogin) {
  return service
    .request({
      method: "post",
      url: baseUrl + "/admin/login",
      data,
    })
    .then((res) => res.data);
}

export function checkLogin() {
  return service
    .request({
      method: "get",
      url: baseUrl + "/admin/checkLogin",
    })
    .then((res) => res.data);
}

export function addBlogArticle() {
  return service
    .request({
      method: "post",
      url: baseUrl + "/admin/addBlogAritcle",
    })
    .then((res) => res.data);
}
