import React, { useEffect, useState } from "react";
import moment from "moment";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import style from "./index.module.less";
import "../../../../publicCSS/style.css";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  DatePicker,
  message,
  Modal,
} from "antd";
import {
  addBlogArticle,
  AddBlogArticleI,
  BlogArticleListI,
  getBlogArticleById,
  updateBlogArticleById,
  updateBlogArticleByIdI,
} from "../../../../api/service";
import Loader from "../../../../components/Loader";
import { RouteComponentProps } from "react-router-dom";
import imageselect from "../../../../image/imageselect.png";
import ImageUpload from "../../../Admin/ImageUpload";
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

export interface ArticleI {
  articleId: number; // 0; // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  // oldarticleTitle: ""; //以前的标题(保存后在数据库依照此标题修改)
  articleTitle: string; // ""; //文章标题
  articleContent: string; // ""; //markdown的编辑内容
  markdownContent: string; // "预览内容"; //html内容
  introducemd: string; // ""; //简介的markdown内容
  introducehtml: string; // "等待编辑"; //简介的html内容
  publishDate: string; // ""; //发布日期
  updateDate: string; // ""; //修改日志的日期(未使用)
  // typeInfo: []; // 文章类别信息(未使用)
  selectedType: number | string; //选择的文章类别
  sourceType: number | string; // ""; //文章来源  原创 || 转载
  introduceImage: string; // 列表页简介图片

  //   disabled: false; //修改文章后按钮不可点击
  //   titledisabled: false; //标题改变控制按钮不可点击
}

interface RouterInfo {
  id: string;
}

export default function AddArticle(props: RouteComponentProps<RouterInfo>) {
  const initial: ArticleI = {
    articleId: 0, // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    articleTitle: "", //文章标题
    articleContent: "", //markdown的编辑内容
    markdownContent: "预览内容", //html内容
    introducemd: "", //简介的markdown内容
    introducehtml: "等待编辑", //简介的html内容
    publishDate: "", //发布日期
    updateDate: "", //修改日志的日期(未使用)
    // typeInfo: [], // 文章类别信息(未使用)
    selectedType: -1, //选择的文章类别
    sourceType: -1, //文章来源
    introduceImage: "",
  };
  const [article, setArticle] = useState<ArticleI>(initial);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const changeContent = (value: string) => {
    const html = marked(value);
    setArticle({ ...article, articleContent: value, markdownContent: html });
  };

  const changeIntroduce = (value: string) => {
    const html = marked(value);
    setArticle({ ...article, introducemd: value, introducehtml: html });
  };

  const publishArticle = () => {
    if (condition()) {
      message.success("存储校验通过");
      if (!article.articleId) {
        message.success("新的存储");
        const article_title = article.articleTitle;
        const article_content = article.articleContent;
        const markdown_content = article.markdownContent;
        const introducemd = article.introducemd;
        const introducehtml = article.introducehtml;
        const publish_date = article.publishDate;
        const update_date = "";
        const article_type = article.selectedType as number;
        const article_source_type = article.sourceType as number;
        const introduce_image = article.introduceImage;

        const data: AddBlogArticleI = {
          article_title,
          article_content,
          markdown_content,
          introducemd,
          introducehtml,
          publish_date,
          update_date,
          article_type,
          article_source_type,
          introduce_image,
        };

        setLoading(true);
        addBlogArticle(data)
          .then((res) => {
            setLoading(false);
            if (res.code === 200) {
              message.success(res.message);
              props.history.push("/admin/articleList");
            } else {
              message.error(res.message);
            }
          })
          .catch((error) => {
            setLoading(false);
            message.error("不好意思，服务器出错了");
            console.log(error);
          });
      } else {
        message.success("修改之前已存储的");
        const id = article.articleId;
        const article_title = article.articleTitle;
        const article_content = article.articleContent;
        const markdown_content = article.markdownContent;
        const introducemd = article.introducemd;
        const introducehtml = article.introducehtml;
        const publish_date = article.publishDate;
        const update_date = "";
        const article_type = article.selectedType as number;
        const article_source_type = article.sourceType as number;
        const introduce_image = article.introduceImage;

        const data: updateBlogArticleByIdI = {
          id,
          article_title,
          article_content,
          markdown_content,
          introducemd,
          introducehtml,
          publish_date,
          update_date,
          article_type,
          article_source_type,
          introduce_image,
        };
        updateBlogArticleById(data)
          .then((res) => {
            setLoading(false);
            if (res.code === 200) {
              message.success(res.message);
              props.history.push("/admin/articleList");
            } else {
              message.error(res.message);
            }
          })
          .catch((error) => {
            setLoading(false);
            message.error("不好意思，服务器出错了");
            console.log(error);
          });
      }
    }
  };

  const saveArticle = () => {
    if (condition()) {
      message.success("存储校验通过");
      if (!article.articleId) {
        message.success("新的存储");
      } else {
      }
    }
  };

  const condition = () => {
    if (!article.articleTitle) {
      message.warning("文章标题不能为空");
      return false;
    } else if (article.selectedType === -1) {
      message.warning("必须选择文章类型");
      return false;
    } else if (article.sourceType === -1) {
      message.warning("文章来源不能为空");
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
    } else if (!article.introduceImage) {
      message.warning("简介图片不能为空");
    }
    return true;
  };

  // 如果是查看页面，根据url的id初始化data
  useEffect(() => {
    console.log("id", props.match.params.id);
    const id = props.match.params.id;
    if (id) {
      getBlogArticleById(parseInt(id))
        .then((res) => {
          console.log("by id", res);
          if (res.data) {
            const filterData = res.data as BlogArticleListI;
            setArticle({
              articleId: filterData.id,
              articleTitle: filterData.article_title, //文章标题
              articleContent: filterData.article_content, //markdown的编辑内容
              markdownContent: filterData.markdown_content, //html内容
              introducemd: filterData.introducemd, //简介的markdown内容
              introducehtml: filterData.introducehtml, //简介的html内容
              publishDate: filterData.publish_date, //发布日期
              updateDate: filterData.update_date, //修改日志的日期(未使用)
              // typeInfo: [], // 文章类别信息(未使用)
              selectedType: filterData.article_type, //选择的文章类别
              sourceType: filterData.article_source_type, //文章来源
              introduceImage: filterData.introduce_image,
            });
          } else {
            // 文章不存在 TODO直接跳转至首页
            setTimeout(() => {
              message.warning("opps,找不到该文章");
              props.history.replace("/admin/articleList");
            }, 1000);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          message.error("不好意思，服务器出错了");
          console.log(error);
        });
    }
  }, []);

  // 监听保存快捷键的 effect
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

    return () => document.removeEventListener("keydown", handleSave);
  }, []);
  return (
    <Loader loading={loading}>
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
              {/* <br /> */}
              {/* <div
                className={`${style["introduce-html"]} markdown`}
                dangerouslySetInnerHTML={{ __html: article.introducehtml }}
              ></div> */}
            </Col>
            <Col span={12}>
              <div className={style["date-select"]}>
                <DatePicker
                  value={
                    !article.publishDate ? null : moment(article.publishDate)
                  }
                  placeholder="发布日期"
                  size="large"
                  onChange={(date, dateString) =>
                    setArticle({ ...article, publishDate: dateString })
                  }
                />
              </div>
            </Col>
            <Col span={12} style={{ display: "flex", alignItems: "flex-end" }}>
              <div className={style["introduce-image-select"]}>
                <Input
                  placeholder="博客简介图片"
                  value={article.introduceImage}
                  size="large"
                  onChange={(e) => {
                    setArticle({ ...article, introduceImage: e.target.value });
                  }}
                />
              </div>
            </Col>
            <Col span={12} style={{ display: "flex", alignItems: "flex-end" }}>
              <div
                className={style["image-select"]}
                onClick={() => setVisible(true)}
              >
                <img src={imageselect} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        visible={visible}
        maskClosable={false}
        width={1366}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <ImageUpload />
      </Modal>
    </Loader>
  );
}
