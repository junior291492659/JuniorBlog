import React, { useEffect, useState } from "react";
import { Spin, Table, message, Button, Modal } from "antd";
import { getBlogArticleList, BlogArticleListI } from "../../../api/service";
import { ArticleType, ArticleSourceType } from "../../../const";
import style from "./index.module.less";

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

function ArticleList() {
  const [data, setData] = useState<ArticleListI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const columns = [
    {
      title: "标题",
      dataIndex: "articleTitle",
      render: (text: string) => <a style={{ color: "#47ACFF" }}>{text}</a>,
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
      dataIndex: "operation",
      render: (item: ArticleListI) => {
        return (
          <div>
            <Button
              className={style["operation-btn"]}
              type="link"
              onClick={() => {
                updateArticle(item.articleTitle);
              }}
            >
              修改
            </Button>
            <Button
              className={style["operation-btn"]}
              danger
              type="text"
              onClick={() => {
                delArticle(item.articleTitle);
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const updateArticle = (articleTitle: string) => {};

  const delArticle = (articleTitle: string) => {};

  const onChange = (selectedRowKeys: any, selectedRows: any) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  useEffect(() => {
    getBlogArticleList()
      .then((res) => {
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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  }, []);
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

export default ArticleList;
