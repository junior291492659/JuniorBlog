import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import style from "./index.module.less";
import "../../../../publicCSS/style.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true, //启动类似Github样式的Markdown,填写true或者false
  pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
  sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
  //tables: true, //支持Github形式的表格，必须打开gfm选项
  breaks: true, //支持Github换行符，必须打开gfm选项，填写true或者false
  smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
  smartypants: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

interface ArticleI {
  articleId: number; // 0; // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  // oldarticleTitle: ""; //以前的标题(保存后在数据库依照此标题修改)
  articleTitle: string; // ""; //文章标题
  articleContent: string; // ""; //markdown的编辑内容
  markdownContent: string; // "预览内容"; //html内容
  introducemd: string; // ""; //简介的markdown内容
  introducehtml: string; // "等待编辑"; //简介的html内容
  publishDate: Moment | null; // ""; //发布日期
  updateDate: number; // ""; //修改日志的日期(未使用)
  // typeInfo: []; // 文章类别信息(未使用)
  selectedType: number | string; //选择的文章类别
  sourceType: number | string; // ""; //文章来源  原创 || 转载

  //   disabled: false; //修改文章后按钮不可点击
  //   titledisabled: false; //标题改变控制按钮不可点击
}

export default function AddArticle() {
  const initial: ArticleI = {
    articleId: 0, // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    articleTitle: "", //文章标题
    articleContent: "", //markdown的编辑内容
    markdownContent: "预览内容", //html内容
    introducemd: "", //简介的markdown内容
    introducehtml: "等待编辑", //简介的html内容
    publishDate: null, //发布日期
    updateDate: 0, //修改日志的日期(未使用)
    // typeInfo: [], // 文章类别信息(未使用)
    selectedType: -1, //选择的文章类别
    sourceType: -1, //文章来源
  };
  const [article, setArticle] = useState<ArticleI>(initial);

  const changeContent = (value: string) => {
    const html = marked(value);
    setArticle({ ...article, articleContent: value, markdownContent: html });
  };

  const changeIntroduce = (value: string) => {
    const html = marked(value);
    setArticle({ ...article, introducemd: value, introducehtml: html });
  };

  const saveArticle = () => {};

  const publishArticle = () => {};

  const condition = () => {
    if (!article.articleTitle) {
      message.warning("文章标题不能为空");
      return false;
    } else if (!article.selectedType) {
      message.warning("必须选择文章类型");
      return false;
    } else if (!article.articleContent) {
      message.warning("文章内容不能为空");
      return false;
    } else if (!article.introducemd) {
      message.warning("文章简介不能为空");
      return false;
    } else if (!article.publishDate) {
      message.warning("发布日期不能为空");
      return false;
    } else if (!article.sourceType) {
      message.warning("文章来源不能为空");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const handleSave = (e: KeyboardEvent) => {
      if (
        e.key == "s" &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        alert("modified, saved");
      }
    };

    document.addEventListener("keydown", handleSave);
  }, []);
  return (
    <div>
      <Row gutter={10}>
        {/* 主体内容左侧部分 */}
        <Col span={18}>
          <Row gutter={10}>
            <Col span={16}>
              <Input
                placeholder="博客标题"
                value={article.articleTitle}
                onChange={(e) => {
                  setArticle({ ...article, articleTitle: e.target.value });
                }}
                size="large"
              />
            </Col>

            <Col span={4} style={{ paddingLeft: "21px" }}>
              <Select
                className={style["select"]}
                value={
                  article.selectedType === -1
                    ? "请选择文章类型"
                    : article.selectedType
                }
                size="large"
                onChange={(value) =>
                  setArticle({ ...article, selectedType: value })
                }
              >
                <Option value={0}>博客分享</Option>
                <Option value={1}>Leetcode训练</Option>
              </Select>
            </Col>

            <Col span={4}>
              <Select
                className={style["select"]}
                value={
                  article.sourceType === -1
                    ? "请选择文章来源"
                    : article.selectedType
                }
                size="large"
                onChange={(value) =>
                  setArticle({ ...article, sourceType: value })
                }
              >
                <Option value={0}>博主原创</Option>
                <Option value={1}>美文转载</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={article.articleContent}
                className={style["markdown-content"]}
                rows={60}
                placeholder="文章内容"
                onChange={(e) => changeContent(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <div
                className={`${style["show-html"]} markdown`}
                dangerouslySetInnerHTML={{ __html: article.markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        {/* 主体内容右侧部分 */}
        <Col span={6}>
          <Row>
            {/* <Col span={24}> */}
            <Col span={8}>
              <Button size="large" onClick={saveArticle}>
                暂存文章
              </Button>
            </Col>
            <Col span={8}>
              <Button type="primary" size="large" onClick={publishArticle}>
                {article.articleId > 0 ? "确认修改" : "发布文章"}
              </Button>
            </Col>
            {/* </Col> */}
            <Col span={24}>
              <br />
              <TextArea
                className={style["introduce-content"]}
                rows={8}
                placeholder="文章简介"
                value={article.introducemd}
                onChange={(e) => {
                  changeIntroduce(e.target.value);
                }}
              />
              <br />
              <br />
              <div
                className={`${style["introduce-html"]} markdown`}
                dangerouslySetInnerHTML={{ __html: article.introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className={style["date-select"]}>
                <DatePicker
                  value={
                    article.publishDate === null
                      ? null
                      : moment(article.publishDate)
                  }
                  placeholder="发布日期"
                  size="large"
                  onChange={(date) =>
                    setArticle({ ...article, publishDate: date })
                  }
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
