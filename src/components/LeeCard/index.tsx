import React from "react";
import { Row, Col, Divider } from "antd";
import headImg from "../../image/zhengfeng.jpg";
import banner from "../../image/banner.jpg";
import lv from "../../image/LV1.png";
import { QqOutlined, GithubOutlined, ZhihuOutlined } from "@ant-design/icons";
import style from "./index.module.less";

function LeeCard() {
  return (
    <div className={`${style["visiting-card"]} animated fadeInRight`}>
      <div
        className={style["card-banner"]}
        // style={{ backgroundImage: `url(${banner})` }}
      >
        <img src={banner} alt="" />
        <img src={headImg} alt="" />
      </div>
      <div className={style["card-context"]}>
        <div className={style["card-name"]}>Junior Lee</div>
        <div className={style["card-tag"]}>
          <i>前端攻城狮</i>
          <img src={lv} alt="" />
        </div>
        <div className={style["card-mail"]}>291492659@qq.com</div>
        <div className={style["card-smalltext"]}>
          一个爱看影视剧爱打守望先锋的96后萌新程序猿一枚，想在前端开发的路上不断前进。希望通过我在这里分享的踩坑记录可以帮助一些人更好更快的掌握一些知识或者技巧。
        </div>
      </div>
      <div className={style["card-footer"]}>
        <Divider className={style.divider}>社交账号</Divider>
      </div>
      <div className={style["card-link"]}>
        <Row>
          <Col span={8}>
            <div className={style["link-item"]}>
              <a
                href="http://wpa.qq.com/msgrd?v=3&uin=291492659&site=qq&menu=yes"
                className={style["card-qq"]}
              >
                <QqOutlined />
              </a>
            </div>
          </Col>
          <Col span={8}>
            <div className={style["link-item"]}>
              <a
                href="https://github.com/soul-of-code"
                className={style["card-github"]}
              >
                <GithubOutlined />
              </a>
            </div>
          </Col>
          <Col span={8}>
            <div className={style["link-item"]}>
              <a
                href="https://www.zhihu.com/people/cong-ba-ba-bu-ge-you"
                className={style["card-zhihu"]}
              >
                <ZhihuOutlined />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default React.memo(LeeCard);
