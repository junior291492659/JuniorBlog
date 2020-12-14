import React from "react";
import { Row, Col } from "antd";
import { Helmet } from "react-helmet-async";
import style from "./index.module.less";

const Container: React.FC = (props) => {
  const content = React.Children.map(props.children, (child) => child);
  // const [main, ...aside] = content;

  return (
    <div className={style.center}>
      <Helmet>
        <title>博客 | Junior_Lee的个人博客</title>
      </Helmet>
      <div className={style["everyday-sentence"]}>
        台阶是一层一层筑起的，目前的现实是未来理想的基础。 —— 徐特立
      </div>

      <Row justify="space-between">
        <Col xs={24} sm={24} md={24} lg={17} xl={17} id="main-left">
          {content && content[0]}
        </Col>
        <Col xs={0} sm={0} md={0} lg={7} xl={7} id="main-right">
          {content && content[1]}
        </Col>
      </Row>
    </div>
  );
};

export default Container;
