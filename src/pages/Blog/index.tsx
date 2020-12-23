import React from "react";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Container from "../../components/Container";
import LeeCard from "../../components/LeeCard";
import ArticleTag from "../../components/ArticleTag";

import { withRouter, RouteComponentProps } from "react-router-dom";
import { getBlogArticleList, BlogArticleListI } from "../../api/service";
import BlogArticleIntroduction, {
  BlogArticleI,
} from "./blog-article-introduction";
import { ArticleType, ArticleSourceType } from "../../const";
import { message } from "antd";

function Blog(props: RouteComponentProps<any, any, { type: number }>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogList, setBlogList] = useState<BlogArticleI[]>([]);

  useEffect(() => {
    const tagId = props.location.state?.type;
    // console.log("tagId", tagId);
    setLoading(true);
    getBlogArticleList()
      .then((res) => {
        const filterData = [...res.data].map((item: BlogArticleListI) => ({
          id: item.id,
          articleType: ArticleType[item.article_type],
          articleTypeNumber: item.article_type,
          sourceType: ArticleSourceType[item.article_source_type],
          title: item.article_title,
          introduction: item.introducemd,
          viewCount: item.view_count,
          assitCount: item.assit_count,
          introduceImage: item.introduce_image,
          publishDate: item.publish_date,
        }));
        // console.log("filterData", filterData);
        setBlogList(
          tagId !== undefined
            ? filterData.filter((item) => item.articleTypeNumber === tagId)
            : filterData
        );
        setLoading(false);
      })
      .catch((error) => {
        message.error("不好意思，服务器出错了");
        console.log(error);
        setLoading(false);
      });
  }, [props.location.state]);
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
          <ArticleTag />
        </>
      </Container>
    </Loader>
  );
}

export default withRouter(Blog);
