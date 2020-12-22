import React from "react";
import { WechatOutlined } from "@ant-design/icons";
import style from "./index.module.less";
import wechatQRcode from "../../image/wechatQRcode.png";

function WechatCard() {
  return (
    <div className={style["card-container"]}>
      <div className={style["card-header"]}>
        <WechatOutlined /> 我的微信
      </div>
      <div className={style["card-note"]}>麻烦备注从博客扫码来的哦</div>
      <img src={wechatQRcode} alt="" />
    </div>
  );
}

export default React.memo(WechatCard);
