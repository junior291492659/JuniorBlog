import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import logo from "../../image/Overwatch-big.png";
import { UpSquareOutlined, DownSquareOutlined } from "@ant-design/icons";
import style from "./index.module.less";
import { Link, withRouter } from "react-router-dom";

/**
 * 导航栏
 * props：暂无，由于内容较为固定，暂时 hard-code
 */
function Header() {
  // 控制当前header元素所在的高亮
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // 控制header元素的显隐，用于移动端
  const [headerVisible, setHeaderVisible] = useState<boolean>(false);

  const HeaderPop = (
    <div className={style["pop-content"]}>
      <span>欢迎来到我(守)的(望)空(先)间(锋)，冲鸭！！！</span>
    </div>
  );

  const HeaderItem = () => {
    //手机端的Header-item
    return (
      <div className={style["h-item"]}>
        <li
          className={
            currentIndex === 0
              ? `${style["item-ph"]} ${style["current-ph"]}`
              : style["item-ph"]
          }
        >
          <Link to="/">技术博客</Link>
        </li>
        <li
          className={
            currentIndex === 1
              ? `${style["item-ph"]} ${style["current-ph"]}`
              : style["item-ph"]
          }
        >
          <Link to="/interact">留言板</Link>
        </li>
        <li
          className={
            currentIndex === 2
              ? `${style["item-ph"]} ${style["current-ph"]}`
              : style["item-ph"]
          }
        >
          <Link to="/life">历程</Link>
        </li>
        <li
          className={
            currentIndex === 3
              ? `${style["item-ph"]} ${style["current-ph"]}`
              : style["item-ph"]
          }
        >
          <Link to="/friendLink">友链</Link>
        </li>
      </div>
    );
  };

  useEffect(() => {
    const path = window.location.pathname.split("/"); // 解析path
    let index = currentIndex;
    switch (path[1]) {
      case "":
        index = 0;
        break;
      case "images":
        index = 1;
        break;
      case "interact":
        index = 2;
        break;
      case "about":
        index = 3;
        break;
    }
    setCurrentIndex(index);
  }, [window.location.pathname]);
  return (
    <div className={style.header}>
      <div className={style.nav}>
        <Popover placement="bottom" content={HeaderPop} trigger="hover">
          <span className={`${style["header-title"]} animated`}>
            <img src={logo} alt="Junior_Lee" />
            <span className={style.text}>Junior_Lee个人博客</span>
          </span>
        </Popover>

        <ul className={style["header-menu"]}>
          <li
            className={
              currentIndex === 0
                ? `${style.item} animated ${style.current}`
                : `${style.item} animated`
            }
          >
            <Link to="/">技术博客</Link>
          </li>
          <li
            className={
              currentIndex === 1
                ? `${style.item} animated ${style.current}`
                : `${style.item} animated`
            }
          >
            <Link to="/images">图片</Link>
          </li>
          <li
            className={
              currentIndex === 2
                ? `${style.item} animated ${style.current}`
                : `${style.item} animated`
            }
          >
            <Link to="/interact">留言板</Link>
          </li>
          <li
            className={
              currentIndex === 3
                ? `${style.item} animated ${style.current}`
                : `${style.item} animated`
            }
          >
            <Link to="/friendLink">友链</Link>
          </li>
        </ul>
        <Popover
          placement="bottom"
          content={HeaderItem}
          trigger="hover"
          visible={headerVisible}
          onVisibleChange={(visible: boolean) => setHeaderVisible(visible)}
        >
          <span
            className={style["header-menu-ph"]}
            onClick={() => setHeaderVisible(!headerVisible)}
          >
            {headerVisible ? <UpSquareOutlined /> : <DownSquareOutlined />}
          </span>
        </Popover>
      </div>
    </div>
  );
}

export default withRouter(Header);
