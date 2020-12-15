import React from "react";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button, Checkbox } from "antd";
import style from "./index.module.less";
import { login, ILogin, addBlogArticle } from "../../../api/service";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

interface LoginData extends ILogin {
  remember: boolean;
}

function Login() {
  const [form] = Form.useForm();

  const onFinish = (values: LoginData) => {
    console.log("Success:", values);
    login({ username: values.username, password: values.password })
      .then((res) => {
        console.log("res in login", res);
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

  const onTest = () => {
    addBlogArticle().then((res) => {
      console.log(res);
    });
  };

  return (
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
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
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
          <Button className={style["reset"]} htmlType="button" onClick={onTest}>
            Test
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
