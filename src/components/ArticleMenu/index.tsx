import React from "react";
import MarkNav from "markdown-navbar";
import { Divider, Affix } from "antd";
import style from "./index.module.less";
import "markdown-navbar/dist/navbar.css";

interface AsideProps {
  source: string;
}

export default function Aside(props: AsideProps) {
  const { source } = props;
  return (
    <Affix offsetTop={70}>
      <div className={style["detailed-nav"]}>
        <Divider className={style["nav-title"]}>文章目录</Divider>
        <MarkNav
          className={style["article-menu"]}
          source={source}
          ordered={false}
        />
      </div>
    </Affix>
  );
}
