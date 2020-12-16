import {
  CalendarFilled,
  HeartFilled,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import { Button, Popover } from "antd";
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
        const res = {
          content: result.content,
          note: result.note,
          pic: result.picture2,
          date: result.dateline,
          love: result.love,
        };
        setData(res);
      },
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
      <Popover placement="bottom" content={cardNode} trigger="hover">
        <span>
          {data
            ? data.content
            : "台阶是一层一层筑起的，目前的现实是未来理想的基础。 —— 徐特立"}
        </span>
      </Popover>
    </div>
  );
}

//  EveryDaySentence;
