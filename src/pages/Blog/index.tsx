import React from "react";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Container from "../../components/Container";

import { withRouter, Link } from "react-router-dom";

import { BlogArticleProps } from "./blog-article";

function Blog() {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogList, setBlogList] = useState<BlogArticleProps[]>([]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setBlogList([
        { title: "Test1", introduction: "简介1。。。" },
        { title: "Test2", introduction: "简介2。。。" },
        { title: "Test3", introduction: "简介3。。。" },
      ]);
    }, 2000);
  }, []);
  return (
    <Loader loading={loading}>
      <Container center={<h1>Center</h1>} aside={<h3>aside</h3>} />
    </Loader>
  );
}

export default withRouter(Blog);
