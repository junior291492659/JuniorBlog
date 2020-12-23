import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { getArticleTags } from "../../api/service";
import style from "./index.module.less";

interface TagI {
  id: number;
  type: number;
  type_name: string;
}
function ArticleTag() {
  const [tags, setTags] = useState<TagI[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // 获取文章标签
  useEffect(() => {
    getArticleTags().then((res) => {
      //   console.log("res in article tags", res);
      setTags(res.data);
    });
  }, []);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    let index = "-1";
    if (path[1] === "blog") {
      index = path[2].replace(/[^0-9]/gi, "");
    }
    // console.log("index", index);
    setCurrentIndex(parseInt(index));
  });
  return (
    <div className={`${style["tag-wrap"]} animated fadeInRight`}>
      <div className={style["tag-header"]}>文章分类</div>
      <ul className={style["tag-context"]}>
        <Link to="/">
          <li
            className={`${style["tag"]} ${
              currentIndex === -1 ? style["current"] : ""
            }`}
          >
            全部文章
          </li>
        </Link>
        {tags.map((item) => (
          <Link
            to={{
              pathname: "/blog/tag" + item.type,
              state: { type: item.type },
            }}
            key={item.id}
          >
            <li
              className={`${style["tag"]} ${
                currentIndex === item.type ? style["current"] : ""
              }`}
            >
              {item.type_name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(ArticleTag);
