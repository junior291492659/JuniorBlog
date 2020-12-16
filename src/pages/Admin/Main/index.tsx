import React, { useEffect, useState } from "react";
import style from "./index.module.less";
import { checkLogin } from "../../../api/service";
import Loader from "../../../components/Loader";
import { Spin } from "antd";
// import { withRouter } from "react-router-dom";

function Main() {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log("use Effect in Main");
    checkLogin().then((res) => {
      res.code === 200 && setLoading(false);
    });
  }, []);

  return (
    <Loader loading={loading}>
      <div>{loading ? null : <h1>Main</h1>}</div>
    </Loader>
  );
}

export default Main;
