import React from "react";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Container from "../../components/Container";
import LeeCard from "../../components/LeeCard";

import { withRouter, Link } from "react-router-dom";
import { getBlogArticleList, BlogArticleListI } from "../../api/service";
import BlogArticleIntroduction, {
  BlogArticleI,
} from "./blog-article-introduction";
import { ArticleType, ArticleSourceType } from "../../const";
import { message } from "antd";

function Blog() {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogList, setBlogList] = useState<BlogArticleI[]>([]);

  useEffect(() => {
    // setLoading(true);
    getBlogArticleList()
      .then((res) => {
        const filterData = [...res.data].map((item: BlogArticleListI) => ({
          id: item.id,
          articleType: ArticleType[item.article_type],
          sourceType: ArticleSourceType[item.article_source_type],
          title: item.article_title,
          introduction: item.introducemd,
          viewCount: item.view_count,
          assitCount: item.assit_count,
          introduceImage: item.introduce_image,
          publishDate: item.publish_date,
        }));
        console.log("filterData", filterData);
        setBlogList(filterData);
        setLoading(false);
      })
      .catch((error) => {
        message.error("不好意思，服务器出错了");
        console.log(error);
      });
  }, []);
  return (
    <Loader loading={loading}>
      <Header />
      <Container>
        <>
          {blogList.map((blog, index) => (
            <BlogArticleIntroduction key={index} data={blog} />
          ))}
        </>
        <>
          <LeeCard />
        </>
      </Container>
    </Loader>
  );
}

export default withRouter(Blog);
