import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import LeeCard from "../../components/LeeCard";
import QQCard from "../../components/QQCard";
import WechatCard from "../../components/WechatCard";
import style from "./index.module.less";
import { Row } from "antd";

const friendlinks: FriendLinkProps[] = [
  {
    title: "后盾人",
    imageSource:
      "https://houdunren-image.oss-cn-qingdao.aliyuncs.com/11552521685.png",
    description:
      "把JS和CSS讲得很清晰，特别是JS把JS和CSS讲得很清晰，特别是JS把JS和CSS讲得很清晰，特别是JS",
    url: "www.houdunren.com",
  },
  {
    title: "后盾人",
    imageSource:
      "https://houdunren-image.oss-cn-qingdao.aliyuncs.com/11552521685.png",
    description: "把JS和CSS讲得很清晰，特别是JS",
    url: "www.houdunren.com",
  },
  {
    title: "后盾人",
    imageSource:
      "https://houdunren-image.oss-cn-qingdao.aliyuncs.com/11552521685.png",
    description: "把JS和CSS讲得很清晰，特别是JS",
    url: "www.houdunren.com",
  },
  {
    title: "后盾人",
    imageSource:
      "https://houdunren-image.oss-cn-qingdao.aliyuncs.com/11552521685.png",
    description: "把JS和CSS讲得很清晰，特别是JS",
    url: "www.houdunren.com",
  },
  {
    title: "后盾人",
    imageSource:
      "https://houdunren-image.oss-cn-qingdao.aliyuncs.com/11552521685.png",
    description: "把JS和CSS讲得很清晰，特别是JS",
    url: "www.houdunren.com",
  },
];

function About() {
  return (
    <div>
      <Header />
      <Container title="关于">
        <>
          <div className={style["about-wrap"]}>
            <h2 className={style["about-title"]}>关于 Junior_Lee本人</h2>
            <div className={style["about-text"]}>
              本人名为LJX(姓名拼音首字母)，性别男，90后，是一个比较感性的人。
            </div>
            <div className={style["about-text"]}>
              关于学习，本科和硕士分别就读于湖南某211和上海某985院校，专业均为软件工程，
              但研究生期间的研究方向为测试方向，我本身是一个对很直观的看得见摸得着的东西更感兴趣些，所以在coding
              这方面更喜欢前端开发，所以也是作为一个新人在摸索着，怀挺！在经历了某大厂的暑期实习后，
              目前对于主流框架的掌握是React，之前也有过Vue开发，但后面没怎么用了，确实也忘了不少。当然了，
              对于React以及前端的学习，要学习的还有不少。
            </div>
            <div className={style["about-text"]}>
              关于生活,毋庸置疑是个宅，但不肥(肥过，但某一年狂减25+斤，现在还在尽量维持)。喜欢
              看视频和守望先锋，偶尔和朋友出去恰个饭，特别欢迎对OW、美剧和韩剧感兴趣的小伙伴！
            </div>
            <div className={style["about-text"]}>想到什么再加吧~</div>
            <h2 className={style["about-title"]}>关于 这个博客</h2>
            <div className={style["about-text"]}>
              前面也说了，在接触了解了前端这一方向后，发现这个体系是很庞大的，自己要学习的地方还有太多太多，基本的
              Javascript、CSS，熟悉React、掌握Typescript、Webpack和NodeJS等等，以及设计模式、小程序等移动端开发，
              自己要学习的东西还有太多太多。
            </div>
            <div className={style["about-text"]}>
              在浏览了各种“前端er”自己开发的酷炫的个人博客后，自己觉得这是一个不能跳过的锻炼机会，于是实现了目前这个相对来说比较简易的Blog，前后台的内容主要涉及React.js,
              Typescript, Less,
              Egg.js等，本人也会不断维护下去，同时把自己想分享的各种内容post上去，也欢迎各位大佬留言指点！
            </div>
          </div>
          <div className={style["friendlink-wrapper"]}>
            <h2 className={style["about-title"]}>友情链接</h2>
            <Row justify="space-between">
              {friendlinks.map((item, index) => (
                <FriendLink key={index} {...item} />
              ))}
            </Row>
          </div>
        </>
        <>
          <LeeCard />
          <WechatCard />
          <QQCard />
        </>
      </Container>
    </div>
  );
}

interface FriendLinkProps {
  title: string;
  description: string;
  url: string;
  imageSource: string;
}

function FriendLink(props: FriendLinkProps) {
  const { title, description, url, imageSource } = props;

  return (
    <div className={style["friendlink-item"]}>
      <a href={url} target="_blank" className="animated bounceIn">
        <img src={imageSource} alt="" />
        <h2 className={style["friendlink-title"]}>{title}</h2>
        <p className={style["friendlink-description"]} title={description}>
          {description}
        </p>
      </a>
    </div>
  );
}

export default About;
