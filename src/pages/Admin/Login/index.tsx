import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button, message } from "antd";
import Loader from "../../../components/Loader";
import style from "./index.module.less";
import { login, checkLogin, ILogin } from "../../../api/service";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { RouteComponentProps } from "react-router-dom";
// import { withRouter } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

interface LoginData extends ILogin {
  remember: boolean;
}

function Login(props: RouteComponentProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken, removeToken] = useLocalStorage("token", null, {
    raw: true,
  });

  const onFinish = (values: LoginData) => {
    console.log("Success:", values);
    login({ username: values.username, password: values.password })
      .then((res) => {
        console.log("res in login", res);
        if (res.code === 200) {
          message.success("登录成功");
          //是否记住token
          setToken(res.token);

          // window.location.replace("/admin");
          props.history.replace("/admin");
        } else {
          message.error(res.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  // 验证是否已经登录，若已经登录则直接跳转至后台界面
  useEffect(() => {
    checkLogin().then((res) => {
      if (res.code === 200) {
        console.log("在登录界面。检测到已经登录");
        window.location.replace("/admin");
      }
      setLoading(false);
    });
  }, []);

  return (
    <Loader loading={loading}>
      <div className={style["form-container"]}>
        <Helmet>
          <title>登录 | Junior_Lee的个人博客管理</title>
        </Helmet>
        <div className={style["title"]}>Junior Lee博客后台管理登录</div>
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              className={style["reset"]}
              htmlType="button"
              onClick={onReset}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Loader>
  );
}

export default Login;
