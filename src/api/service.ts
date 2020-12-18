import service from "./index";
import { ArticleI } from "../pages/Admin/Main/AddArticle";
import { post } from "jquery";

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

export interface AddBlogArticleI {
  article_title: string;
  article_content: string;
  markdown_content: string;
  introducemd: string;
  introducehtml: string;
  publish_date: string;
  update_date: string;
  article_type: number;
  article_source_type: number;
  introduce_image: string;
}

// 新增一条博客
export function addBlogArticle(data: AddBlogArticleI) {
  return service
    .request({
      method: "post",
      url: baseUrl + "/admin/addBlogAritcle",
      data,
    })
    .then((res) => res.data);
}

export interface BlogArticleListI extends AddBlogArticleI {
  id: number;
  view_count: number;
  assit_count: number;
}

// 获取博客列表
export function getBlogArticleList() {
  return service
    .request({
      method: "get",
      url: baseUrl + "/admin/getBlogArticleList",
    })
    .then((res) => res.data);
}

// 根据 ID 获取某一条博客
export function getBlogArticleById(id: number) {
  return service
    .request({
      method: "post",
      url: baseUrl + "/admin/getBlogArticleById",
      data: { id },
    })
    .then((res) => res.data);
}

export function getEverydaySentence() {
  return service
    .request({
      method: "get",
      url: "http://open.iciba.com/dsapi/",
    })
    .then((res) => res.data);
}
