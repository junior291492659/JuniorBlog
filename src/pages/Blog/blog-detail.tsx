import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import LeeCard from "../../components/LeeCard";

import { PageHeader, Divider, message, Affix } from "antd";
import {
  FieldTimeOutlined,
  FireFilled,
  LikeFilled,
  BorderlessTableOutlined,
} from "@ant-design/icons";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
// import moment from "moment";
import style from "./blog.detail.module.less";
import "../../publicCSS/style.css";
import heart from "../../image/heart.png";
// import { blogData1 } from "./mockData";
import {
  getBlogArticleById,
  BlogArticleListI,
  addView,
  addAssit,
} from "../../api/service";
import { ArticleType, ArticleSourceType } from "../../const";
import Tocify from "../../components/Tocify";

message.config({
  top: 100,
  duration: 2,
  maxCount: 2,
});

interface BlogaricleI {
  id: number;
  type: string; // 文章来源类型
  title: string;
  introduction: string;
  tagName: string; // 文章类型
  time: string;
  fire: number;
  remark: number;
  markdown: string;
}

function BlogDetail(props: RouteComponentProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<BlogaricleI | null>(null);
  const [isAsisted, setIsAsisted] = useState<boolean>(false);

  // markdown 代码高亮设置
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true, //启动类似Github样式的Markdown,填写true或者false
    pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    //tables: true, //支持Github形式的表格，必须打开gfm选项
    breaks: true, //支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  // 右侧文章导航栏设置
  const tocify = new Tocify();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  let html = marked(data?.markdown || "");

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

  // 获取文章内容
  useEffect(() => {
    const pathname = props.location.pathname;
    // console.log(/^\/article\d+$/.test(pathname));
    if (/\d+$/.test(pathname)) {
      const id = pathname.split("/").reverse()[0].slice(7);
      // console.log("id", id);
      getBlogArticleById(parseInt(id))
        .then((res) => {
          console.log("by id", res);
          if (res.data) {
            const filterData = res.data as BlogArticleListI;
            setData({
              id: filterData.id,
              type: ArticleSourceType[filterData.assit_count],
              title: filterData.article_title,
              introduction: filterData.introducemd,
              tagName: ArticleType[filterData.article_type],
              time: filterData.publish_date,
              fire: filterData.view_count + 1,
              remark: filterData.assit_count,
              markdown: filterData.article_content,
            });
          } else {
            // 文章不存在 TODO直接跳转至首页
            setTimeout(() => {
              message.warning("opps,找不到该文章");
              props.history.replace("/");
            }, 1000);
          }
          setLoading(false);
        })
        .catch((error) => {
          message.error("不好意思，服务器出错了");
          console.log(error);
          // setLoading(false);
        });
    } else {
      //  url不对，获取不到文章 id，直接跳转至首页
      console.log("error");
      message.warning("opps,找不到该文章");
      // 必须得异步，不然会有严重警告，因为每日一句里面得ajax请求的回调函数
      setTimeout(() => {
        props.history.replace("/");
      }, 1000);
    }
  }, [props.location.pathname]);

  // 添加浏览次数
  useEffect(() => {
    if (data) {
      addView({ id: data.id, view_count: data.fire }).catch((error) => {
        message.error("不好意思，服务器出错了");
        console.log(error);
      });
    }
  }, [data]);

  // 添加点赞数
  useEffect(() => {
    if (isAsisted) {
      console.log("assit effect");
      addAssit({
        id: data?.id as number,
        assit_count: data?.remark as number,
      }).catch((error) => {
        message.error("不好意思，服务器出错了");
        console.log(error);
      });
    }
  }, [isAsisted]);
  return (
    <Loader loading={loading}>
      <Header />
      <Container title="博客">
        {/* {中间主栏目} */}
        <div className={`${style["md-wrap"]} animated rollIn`}>
          <PageHeader
            title="返回首页"
            className={style["md-back"]}
            onBack={() => {
              console.log("back");
              props.history.push("/");
            }}
          />
          <div className={style["md-header"]}>
            <div className={style["md-title"]}>
              <strong>{`【${data?.type}】`}</strong>
              {data?.title}
            </div>
            <div className={style["md-icon-list"]}>
              <span className={style["md-icon"]}>
                <FieldTimeOutlined />
                {/* {moment(data?.time && new Date(data.time)).format(
                  "YYYY年MM月DD日 HH:mm"
                )} */}
                {data?.time}
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
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
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
          {/* <ArticleMenu source={("\n" + data?.markdown) as string} /> */}
          <Affix offsetTop={70}>
            <div className={style["detailed-nav"]}>
              <div className={style["nav-title"]}>文章目录</div>
              <div className={style["nav-list"]}>
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </>
      </Container>
    </Loader>
  );
}

export default withRouter(BlogDetail);
