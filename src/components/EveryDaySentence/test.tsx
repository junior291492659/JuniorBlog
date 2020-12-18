import { Button } from "antd";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getImage } from "../../api/service";

interface TestPropsI extends RouteComponentProps {}

function Test(props: TestPropsI) {
  console.log(props);
  const [img, setImg] = useState();

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
        click2
      </Button>
      {/* <Button onClick={() => {
        getImage("1608283622090zhengfeng.jpg")
      }}>访问图片</Button> */}
      <img
        src="http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg"
        alt=""
      />
    </div>
  );
}

export default Test;
