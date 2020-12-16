import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const spinIcon = <LoadingOutlined style={{ fontSize: "1.5rem" }} />;

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = (props) => {
  const { loading, children } = props;
  return (
    <Spin
      tip={"急速加载中"}
      indicator={spinIcon}
      spinning={loading}
      style={{ top: "10rem", color: "#f1c000" }}
    >
      {children}
    </Spin>
  );
};

export default Loader;
