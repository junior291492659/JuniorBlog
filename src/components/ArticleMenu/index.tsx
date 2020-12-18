import React from "react";
import { Divider, Affix } from "antd";
import style from "./index.module.less";
import marked from "marked";
import hljs from "highlight.js";
import Tocify from "../../components/Tocify";

// const renderer = new marked.Renderer();
// marked.setOptions({
//   renderer: renderer,
//   gfm: true, //启动类似Github样式的Markdown,填写true或者false
//   pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
//   sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
//   //tables: true, //支持Github形式的表格，必须打开gfm选项
//   breaks: true, //支持Github换行符，必须打开gfm选项，填写true或者false
//   smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
//   smartypants: true,
//   highlight: function (code) {
//     return hljs.highlightAuto(code).value;
//   },
// });
// const tocify = new Tocify();
// renderer.heading = function (text, level, raw) {
//   const anchor = tocify.add(text, level);
//   return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
// };

interface AsideProps {
  source: string;
}

export default function Aside(props: AsideProps) {
  const { source } = props;
  return (
    // <Affix offsetTop={70}>
    <div className={style["detailed-nav"]}>
      <Divider className={style["nav-title"]}>文章目录</Divider>
      {/* {console.log("tocify", tocify)}
        <div className={style["nav-list"]}>{tocify && tocify.render()}</div> */}
    </div>
    // </Affix>
  );
}
