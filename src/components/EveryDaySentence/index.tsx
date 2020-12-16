import {
  CalendarFilled,
  HeartFilled,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import { Button, message, Popover } from "antd";
import React, { useEffect, useState } from "react";
import style from "./index.module.less";
import { getEverydaySentence } from "../../api/service";

interface EveryDaySentenceI {
  content: string;
  note: string;
  pic: string;
  date: string;
  love: number;
}

export default function EveryDaySentence() {
  const [data, setData] = useState<EveryDaySentenceI | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    $.ajax({
      url: "http://open.iciba.com/dsapi",
      dataType: "jsonp", //加上这行代码即可
      success: function (result) {
        console.log(result, typeof result);
        try {
          const res = {
            content: result.content,
            note: result.note,
            pic: result.picture2,
            date: result.dateline,
            love: result.love,
          };
          setData(res);
        } catch {
          message.error("每日一句服务获取出错");
        }
      },
    }).catch((error) => {
      console.log(error);
      message.error("每日一句服务获取出错");
    });
  }, []);

  const cardNode = (
    <div className={style["card"]}>
      <div className={style["header"]}>
        <div className={style["left-side"]}>
          <span className={style["title"]}>每日一句</span>
          <div className={style["date"]}>
            <CalendarFilled />
            <span>{data?.date}</span>
          </div>
          <div className={style["love"]}>
            <HeartFilled />
            <span>{data?.love}</span>
          </div>
        </div>
        <img className={style["banner"]} src={data?.pic} alt="" />
      </div>
      <div className={style["content"]}>{data?.content}</div>
      <div className={`${style["note"]} ${!visible ? style["hide"] : ""}`}>
        {data?.note}
      </div>
      <div className={style["btn"]}>
        <Button
          type="default"
          icon={visible ? <EyeInvisibleFilled /> : <EyeFilled />}
          onClick={() => {
            console.log("click");
            setVisible(!visible);
          }}
        >
          {visible ? "隐藏译文" : "显示译文"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={style["everyday-sentence"]}>
      <Popover
        placement="bottom"
        content={cardNode}
        trigger="hover"
        getPopupContainer={() =>
          document.getElementById("everyday-sentence") as HTMLElement
        }
      >
        <span className="animated" id="everyday-sentence">
          {data ? data.content : "loading..."}
        </span>
      </Popover>
    </div>
  );
}

//  EveryDaySentence;
