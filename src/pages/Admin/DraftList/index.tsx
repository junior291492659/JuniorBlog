import React, { useEffect, useState } from "react";
import { Spin, Table, message, Button, Modal } from "antd";
import {
  getBlogArticleList,
  BlogArticleListI,
  deleteBlogArticleById,
} from "../../../api/service";
import { ArticleType, ArticleSourceType } from "../../../const";
import style from "./index.module.less";
import { RouteComponentProps } from "react-router-dom";

const { confirm } = Modal;

interface ArticleListI {
  articleId: number; // 0; // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  // oldarticleTitle: ""; //以前的标题(保存后在数据库依照此标题修改)
  articleTitle: string; // ""; //文章标题
  publishDate: string; // ""; //发布日期
  updateDate: string; // ""; //修改日志的日期(未使用)
  // typeInfo: []; // 文章类别信息(未使用)
  selectedType: number | string; //选择的文章类别
  sourceType: number | string; // ""; //文章来源  原创 || 转载
}

function DraftList(props: RouteComponentProps) {
  const [data, setData] = useState<ArticleListI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // 删除之后自增用于重渲染
  const [counter, setCounter] = useState<number>(0);
  const columns = [
    {
      title: "标题",
      render: (item: ArticleListI) => (
        <a
          href={`/blogdetail/article${item.articleId}`}
          style={{ color: "#47ACFF" }}
        >
          {item.articleTitle}
        </a>
      ),
    },
    {
      title: "类别",
      dataIndex: "selectedType",
      render: (type: number) => ArticleType[type],
    },
    {
      title: "来源",
      dataIndex: "sourceType",
      render: (type: number) => ArticleSourceType[type],
    },
    {
      title: "发布时间",
      dataIndex: "publishDate",
    },
    {
      title: "浏览量",
      dataIndex: "viewCount",
    },
    {
      title: "点赞数",
      dataIndex: "assitCount",
    },
    {
      title: "操作",
      render: (item: ArticleListI) => {
        return (
          <div>
            <Button
              className={style["operation-btn"]}
              type="link"
              onClick={() => {
                updateArticle(item.articleId);
              }}
            >
              修改
            </Button>
            <Button
              className={style["operation-btn"]}
              danger
              type="text"
              onClick={() => {
                deleteArticle(item.articleId, item.articleTitle);
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const updateArticle = (articleId: number) => {
    props.history.push("/admin/addArticle/" + articleId);
  };

  const deleteArticle = (articleId: number, articleTitle: string) => {
    confirm({
      title: "确定要删除这篇博客文章吗？",
      content: `你要删除的文章标题为《${articleTitle}》如果你点击OK按钮，文章将从数据库删除，无法恢复，冲动是魔鬼！`,
      onOk() {
        setLoading(true);
        deleteBlogArticleById(articleId)
          .then((res) => {
            if (res.code === 200) {
              message.success(res.message);
              setCounter((counter) => counter + 1);
            } else {
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            message.error(error);
          });
      },
    });
  };

  const onChange = (selectedRowKeys: any, selectedRows: any) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  // 获取列表
  useEffect(() => {
    getBlogArticleList()
      .then((res) => {
        if (res.code === 200) {
          const filterData = [...res.data].map((item: BlogArticleListI) => ({
            articleId: item.id,
            articleTitle: item.article_title,
            selectedType: item.article_type,
            sourceType: item.article_source_type,
            publishDate: item.publish_date,
            updateDate: item.update_date,
            viewCount: item.view_count,
            assitCount: item.assit_count,
          }));
          console.log(filterData);
          setData(filterData);
        } else {
          message.error(res.message);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  }, [counter]);
  return (
    <div>
      <Spin spinning={loading}>
        <Table
          rowKey={(record) => record.articleId}
          columns={columns}
          dataSource={data}
          rowSelection={{ type: "checkbox", onChange }}
        />
      </Spin>
    </div>
  );
}

export default DraftList;
