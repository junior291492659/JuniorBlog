import React from "react";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Container from "../../components/Container";

import { withRouter, Link } from "react-router-dom";

import BlogArticleIntroduction, {
  BlogArticleI,
} from "./blog-article-introduction";
import Aside from "../../components/Aside";

function Blog() {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogList, setBlogList] = useState<BlogArticleI[]>([]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setBlogList([
        { type: 1, title: "Test1", introduction: "简介1。。。" },
        { type: 1, title: "Test2", introduction: "简介2。。。" },
        { type: 2, title: "Test3", introduction: "简介3。。。" },
        { type: 1, title: "Test4", introduction: "简介4。。。" },
        { type: 1, title: "Test5", introduction: "简介5。。。" },
        { type: 2, title: "Test6", introduction: "简介6。。。" },
        { type: 1, title: "Test7", introduction: "简介7。。。" },
        { type: 1, title: "Test8", introduction: "简介8。。。" },
        { type: 2, title: "Test9", introduction: "简介9。。。" },
      ]);
    }, 1000);
  }, []);
  return (
    <Loader loading={loading}>
      <Container>
        <>
          {blogList.map((blog, index) => (
            <BlogArticleIntroduction key={index} data={blog} />
          ))}
        </>
        <Aside />
      </Container>
    </Loader>
  );
}

export default withRouter(Blog);
