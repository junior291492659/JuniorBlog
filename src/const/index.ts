export enum ArticleType {
  "博客分享" = 0,
  "Leetcode训练" = 1,
}

export enum ArticleSourceType {
  "博主原创" = 0,
  "美文转载" = 1,
}

export enum ImagesType {
  "收藏图库" = 0,
  "文章用图" = 1,
}

export const ProductionApi = "http://129.204.231.203:7001";

export const DevelopmentApi = "http://127.0.0.1:7001";

export const ProductionImageUploadApi = "http://129.204.231.203:82/imgspace/";

export const DevelopmentImageUploadApi =
  "http://127.0.0.1:7001/default/getImage/";
