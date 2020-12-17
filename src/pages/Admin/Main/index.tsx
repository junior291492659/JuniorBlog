import React, { useEffect, useState } from "react";
import style from "./index.module.less";
import { checkLogin } from "../../../api/service";
import Loader from "../../../components/Loader";
import { Link, Route, Switch, withRouter } from "react-router-dom";

import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  ToolOutlined,
  FileImageOutlined,
  BookOutlined,
} from "@ant-design/icons";

import { Helmet } from "react-helmet-async";
import Index from "./IndexPage";
import AddArticle from "./AddArticle";
import ImageUpload from "../ImageUpload";
import Test from "../../../components/EveryDaySentence/test";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Main() {
  const [loading, setLoading] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: any) => {
    console.log(collapsed);
    setCollapsed(collapsed);
    // this.setState({ collapsed });
  };

  useEffect(() => {
    console.log("use Effect in Main");
    checkLogin().then((res) => {
      res.code === 200 && setLoading(false);
    });
  }, []);

  return (
    <Loader loading={loading}>
      <Helmet>
        <title>管理页 | Junior_Lee的个人博客</title>
      </Helmet>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className={style["side"]}
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <div className="logo" />
          <Menu
            className={style["side-menu"]}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/admin/">工作台</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<BookOutlined />} title="文章">
              <Menu.Item key="3">文章列表</Menu.Item>
              <Menu.Item key="4">
                <Link to="/admin/addArticle">添加文章</Link>
              </Menu.Item>
              <Menu.Item key="5">草稿列表</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileImageOutlined />} title="图片">
              <Menu.Item key="6">
                <Link to="/admin/uploadImage">上传图片</Link>
              </Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<ToolOutlined />}>
              待定功能
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className={style["header"]} style={{ padding: 0 }}>
            <Breadcrumb style={{ margin: "16px" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <span>Junior_Lee博客后台管理</span>
            <Button className={style["exit"]} type="link">
              退出登录
            </Button>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                padding: "16px 24px",
                minHeight: "360px",
                minWidth: "1000px",
              }}
            >
              <Route path="/admin" exact component={Index}></Route>
              <Route
                path="/admin/addArticle"
                exact
                component={AddArticle}
              ></Route>
              <Route
                path="/admin/uploadImage"
                exact
                component={ImageUpload}
              ></Route>
              <Route path="/admin/test" exact component={Test}></Route>
            </div>
          </Content>
          <Footer className={style["footer"]}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Loader>
  );
}

export default withRouter(Main);
