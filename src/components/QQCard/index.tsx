import React from "react";
import { QqOutlined } from "@ant-design/icons";
import style from "./index.module.less";
import QQQRcode from "../../image/QQQRcode.png";

function QQCard() {
  return (
    <div className={`${style["card-container"]} animated fadeInRight`}>
      <div className={style["card-header"]}>
        <QqOutlined /> 我的QQ
      </div>
      <div className={style["card-note"]}>麻烦备注从博客扫码来的哦</div>
      <img src={QQQRcode} alt="" />
    </div>
  );
}

export default React.memo(QQCard);
