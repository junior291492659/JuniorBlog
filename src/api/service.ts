import service from "./index";

// 登录接口
export interface ILogin {
  username: string;
  password: string;
}

export function login(data: ILogin) {
  return service
    .request({
      method: "post",
      url: "http://127.0.0.1:7001/admin/login",
      data,
    })
    .then((res) => res.data);
}

export function addBlogArticle() {
  return service
    .request({
      method: "post",
      url: "http://127.0.0.1:7001/admin/addBlogAritcle",
    })
    .then((res) => res.data);
}
