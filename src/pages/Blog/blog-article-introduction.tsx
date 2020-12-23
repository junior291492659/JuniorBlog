import React from "react";
import LazyLoad from "react-lazyload";
import { Row, Col, Button } from "antd";
import {
  FireFilled,
  BorderlessTableOutlined,
  LikeFilled,
} from "@ant-design/icons";
import style from "./introduction.module.less";
import { Link } from "react-router-dom";

export interface BlogArticleI {
  id: number;
  articleType: string;
  sourceType: string;
  title: string;
  introduction: string;
  viewCount: number;
  assitCount: number;
  introduceImage: string;
  publishDate: string;
}

interface BlogArticleProps {
  data: BlogArticleI;
}

export default function BlogArticleIntroduction(props: BlogArticleProps) {
  const { data } = props;
  return (
    <LazyLoad height={400}>
      <div className={`${style["blog-item"]} animated rollIn`}>
        <div className={style["blog-header"]}>
          <div className={style["blog-title-wrap"]}>
            <div className={style["blog-title"]}>
              <strong>{`【${data.sourceType}】`}</strong>
              <Link to={`/blogdetail/article${data.id}`}>{data.title}</Link>
              <div className={style["blog-icon-list"]}>
                <span className={style["blog-icon"]}>
                  <Link to={`/blog/tag/TODO`}>
                    <BorderlessTableOutlined /> {data.articleType}
                  </Link>
                </span>
                <span className={style["blog-icon"]}>
                  <Link to={`/blogdetail/article${data.id}`}>
                    <FireFilled /> {data.viewCount}
                  </Link>
                </span>
                <span className={style["blog-icon"]}>
                  <Link to={`/blogdetail/article${data.id}`}>
                    <LikeFilled /> {data.assitCount}
                  </Link>
                </span>
              </div>
            </div>
            <div className={style["blog-time"]}>
              <div className={style["blog-day"]}>
                <span className={style["blog-highlight"]}>
                  {data.publishDate.split("-")[2]}
                </span>
                日
              </div>
              <div className={style["blog-else"]}>
                <span className={style["blog-highlight"]}>
                  {data.publishDate.split("-")[0]}
                </span>{" "}
                年-
                <span className={style["blog-highlight"]}>
                  {data.publishDate.split("-")[1]}
                </span>{" "}
                月
              </div>
            </div>
          </div>
        </div>
        <div className={style["blog-context"]}>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={14}
              lg={14}
              xl={14}
              className={style["text"]}
            >
              <Link
                to={`/blogdetail/article${data.id}`}
                style={{ color: "inherit" }}
              >
                <div className={style["text-title"]}>文章简介：</div>
                <div className={style["text-context"]}>{data.introduction}</div>
                <div className={style["text-look"]}>
                  <Button
                    type="link"
                    onClick={() =>
                      // props.history.push(`/blogdetail/article${data.id}`)
                      window.history.pushState(
                        null,
                        "",
                        `/blogdetail/article${data.id}`
                      )
                    }
                  >
                    阅读全文
                  </Button>
                </div>
              </Link>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={10}
              lg={10}
              xl={10}
              className={style["img"]}
            >
              <Link to={`/blogdetail/article${data.id}`}>
                <img src={data.introduceImage} alt="" />
              </Link>
            </Col>
          </Row>
        </div>
        <div className={style["blog-footer"]}>welcome to tap in</div>
      </div>
    </LazyLoad>
  );
}
