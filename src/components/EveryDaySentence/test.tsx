import { Button } from "antd";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface TestPropsI extends RouteComponentProps {}

function Test(props: TestPropsI) {
  console.log(props);

  return (
    <div>
      Test
      <Button
        onClick={() => {
          props.history.push("/admin");
        }}
      >
        click1
      </Button>
      <Button
        onClick={() => {
          props.history.push("/admin/addArticle");
        }}
      >
        click1
      </Button>
    </div>
  );
}

export default Test;
