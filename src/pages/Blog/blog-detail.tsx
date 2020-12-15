import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import LeeCard from "../../components/LeeCard";
import ArticleMenu from "../../components/ArticleMenu";
import CodeBlock from "../../components/CodeBlock";
import { PageHeader, Divider, message, Affix } from "antd";
import {
  FieldTimeOutlined,
  FireFilled,
  LikeFilled,
  BorderlessTableOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import style from "./blog.detail.module.less";
import "../../publicCSS/style.css";
import heart from "../../image/heart.png";
import { blogData1 } from "./mockData";

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

interface BlogaricleI {
  id: number;
  type: number;
  title: string;
  introduction: string;
  tagName: string;
  time: number;
  fire: number;
  remark: number;
  markdown: string;
}

function BlogDetail() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<BlogaricleI | null>(null);
  const [isAsisted, setIsAsisted] = useState<boolean>(false);

  const handleAsist = (ev: React.MouseEvent) => {
    if (isAsisted) {
      message.info("你已经在本次浏览中点过赞了，感谢。");
    } else {
      const remark = (data?.remark as number) + 1;
      message.success("点赞成功，感谢你的赞！");
      setData({ ...(data as BlogaricleI), remark });
      setIsAsisted(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(blogData1);
    }, 1000);
  }, []);
  return (
    <Loader loading={loading}>
      <Header />
      <Container>
        {/* {中间主栏目} */}
        <div className={`${style["md-wrap"]} animated rollIn`}>
          <PageHeader
            title="返回首页"
            className={style["md-back"]}
            onBack={() => window.history.pushState(null, "", "/")}
          />
          <div className={style["md-header"]}>
            <div className={style["md-title"]}>
              <strong>{data?.type == 1 ? "【转载】" : "【原创】"}</strong>
              {data?.title}
            </div>
            <div className={style["md-icon-list"]}>
              <span className={style["md-icon"]}>
                <FieldTimeOutlined />
                {moment(data?.time && new Date(data.time)).format(
                  "YYYY年MM月DD日 HH:mm"
                )}
              </span>
              <span className={style["md-icon"]}>
                <BorderlessTableOutlined /> {data?.tagName}
              </span>
              <span className={style["md-icon"]}>
                <FireFilled /> {data?.fire}
              </span>
              <span className={style["md-icon"]}>
                <LikeFilled /> {data?.remark}
              </span>
            </div>
          </div>
          <div className={`${style["md-context"]} markdown`}>
            <ReactMarkdown
              source={data?.markdown as string}
              escapeHtml={false}
              renderers={{
                code: CodeBlock,
              }}
            />
            <Divider dashed className={style["ending"]}>
              Ending
            </Divider>
            {/* <div className={style["ending"]}>-- Endding --</div> */}
            <div
              className={`${style["assist"]} ${
                isAsisted ? style["heart"] : ""
              }`}
            >
              <img src={heart} alt="" />
              <img src={heart} alt="" />
              <div onClick={handleAsist}>赞</div>
            </div>
          </div>
        </div>
        {/* {右侧栏} */}
        <>
          <LeeCard />
          <ArticleMenu source={("\n" + data?.markdown) as string} />
        </>
      </Container>
    </Loader>
  );
}

export default withRouter(BlogDetail);
