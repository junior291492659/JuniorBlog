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

import img1 from "../../image/intro1.jpg";

export interface BlogArticleI {
  type: number;
  title: string;
  introduction: string;
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
              <strong>{data.type == 1 ? "【转载】" : "【原创】"}</strong>
              <Link to={`/blogassign/article/TODO`}>{data.title}</Link>
              <div className={style["blog-icon-list"]}>
                <span className={style["blog-icon"]}>
                  <Link to={`/blog/tag/TODO`}>
                    <BorderlessTableOutlined /> 技术分享
                  </Link>
                </span>
                <span className={style["blog-icon"]}>
                  <Link to={`/blogassign/article/TODO`}>
                    <FireFilled /> {666}
                  </Link>
                </span>
                <span className={style["blog-icon"]}>
                  <Link to={`/blogassign/article/TODO`}>
                    <LikeFilled /> {18}
                  </Link>
                </span>
              </div>
            </div>
            <div className={style["blog-time"]}>
              <div className={style["blog-day"]}>
                <span className={style["blog-highlight"]}>{11}</span>日
              </div>
              <div className={style["blog-else"]}>
                <span className={style["blog-highlight"]}>{2020}</span> 年-
                <span className={style["blog-highlight"]}>{12}</span> 月
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
                to={`/blogassign/article/TODO`}
                style={{ color: "inherit" }}
              >
                <div className={style["text-title"]}>文章简介：</div>
                <div className={style["text-context"]}>{data.introduction}</div>
                <div className={style["text-look"]}>
                  <Button
                    type="link"
                    onClick={() =>
                      window.history.pushState(
                        null,
                        "",
                        `/blogassign/article/TODO`
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
              <Link to={`/blogassign/article/TODO`}>
                <img src={img1} />
              </Link>
            </Col>
          </Row>
        </div>
        <div className={style["blog-footer"]}>www.juniorlee.city</div>
      </div>
    </LazyLoad>
  );
}
