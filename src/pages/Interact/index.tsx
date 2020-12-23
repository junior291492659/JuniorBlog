import React, { useEffect, useState } from "react";
import { Row, Col, Input, Form, Button, Switch, message, Divider } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Loader from "../../components/Loader";
import LeeCard from "../../components/LeeCard";
import QQCard from "../../components/QQCard";
import WechatCard from "../../components/WechatCard";
import Reply from "../../components/Reply";
import style from "./index.module.less";
import defaultHeadImg from "../../image/defaultImg.jpg";
import genji from "../../image/genji.png";
import moment from "moment";
import LazyLoad from "react-lazyload";
import {
  addInteract,
  AddInteractI,
  getInteract,
  addInteractReply,
  AddInteractReplyI,
  checkLogin,
} from "../../api/service";

interface ReplyI {
  isReply: boolean;
  replyItem: ReplyItem | null;
}

interface ReplyItem {
  id: number;
  name: string;
  context: string;
  email: string;
  is_master: number;
}

interface InteractDataI {
  id: number;
  name: string;
  context: string;
  can_reply: number;
  is_master: number;
  email: string;
  create_time: number;
  children: InteractDataChildrenI[];
}

interface InteractDataChildrenI {
  id: number;
  name: string;
  context: string;
  email: string;
  is_master: number;
  can_reply: number;
  create_time: number;
  fid: number;
  fname: string;
  femail: string;
  fis_master: number;
}

function Interact() {
  const [loading, setLoading] = useState<boolean>(false);
  const [reply, setReply] = useState<ReplyI | null>({
    isReply: false,
    replyItem: {
      id: 0,
      is_master: 1,
      context: "hello",
      name: "",
      email: "",
    },
  });
  // 添加完邮箱后显示QQ头像
  const [headImg, setHeadImg] = useState<string>("");
  const [singleReply, setSingleReply] = useState<boolean>(false);
  const [interactData, setInteractData] = useState<InteractDataI[]>([]);
  const [counter, setCounter] = useState<number>(0); // 用于提交之后重渲染
  const [form] = Form.useForm();

  //   console.log("interactData.length", interactData.length, interactData);

  const addRow = () => {
    // console.log("finish");
    setLoading(true);

    // 验证邮箱格式
    const emailValue = form.getFieldValue("email").trim();
    if (!/^[\w-]+@qq\.com$/i.test(emailValue)) {
      message.error("QQ邮箱格式不正确");
      setTimeout(() => setLoading(false), 2000);
      return;
    }

    const name = form.getFieldValue("name");
    const context = form.getFieldValue("context");
    const create_time = new Date().getTime() / 1000;
    // console.log(name, context, create_time);

    if (!reply?.isReply) {
      // 添加留言
      setLoading(true);
      const data: AddInteractI = {
        name,
        context,
        can_reply: !singleReply ? 1 : 0,
        is_master: 0,
        email: emailValue,
        create_time,
      };
      addInteract(data)
        .then((res) => {
          setLoading(false);
          setCounter((counter) => counter + 1);
          message.success(res.message);
        })
        .catch((error) => {
          setLoading(false);
          message.error("不好意思，服务器出错了");
          console.log(error);
        });
    } else {
      // 添加回复
      setLoading(true);
      const data: AddInteractReplyI = {
        name,
        context,
        can_reply: !singleReply ? 1 : 0,
        is_master: 0,
        email: emailValue,
        create_time,
        fid: reply.replyItem?.id as number,
        fname: reply.replyItem?.name as string,
        femail: reply.replyItem?.email as string,
        fis_master: reply.replyItem?.is_master as number,
      };

      addInteractReply(data)
        .then((res) => {
          setLoading(false);
          setCounter((counter) => counter + 1);
          message.success(res.message);
        })
        .catch((error) => {
          setLoading(false);
          message.error("不好意思，服务器出错了");
          console.log(error);
        });
    }
  };

  const handleMail = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value.trim();
    if (value === "" || !/^[\w-]+@qq\.com$/i.test(value)) {
      setHeadImg("");
      return;
    } else setHeadImg(`http://q4.qlogo.cn/g?b=qq&nk=${value}&s=3`);
  };

  const handleReply = (fitem: InteractDataI, citem?: InteractDataChildrenI) => {
    const data = { ...fitem };
    if (citem) {
      // 说明是对回复的回复，将属性进行覆盖
      data.name = citem.name;
      data.context = citem.context;
      data.email = citem.email;
      data.is_master = citem.is_master;
    }
    setReply({ replyItem: data, isReply: true });
  };

  const handleCancel = () => {
    setReply({ replyItem: null, isReply: false });
  };

  const masterReply = (fitem: InteractDataI, citem?: InteractDataChildrenI) => {
    checkLogin()
      .then((res) => {
        if (res.code === 200) {
          const data = { ...fitem };
          if (citem) {
            // 说明是对回复的回复，将属性进行覆盖
            data.name = citem.name;
            data.context = citem.context;
            data.email = citem.email;
            data.is_master = citem.is_master;
          }
          setReply({ replyItem: data, isReply: true });
        } else {
          message.info("不好意思，这位朋友设置了仅博主回复");
        }
      })
      .catch((error) => {
        console.log("error in checkLogin in Interact.masterReply()", error);
      });
  };

  // 获取留言
  useEffect(() => {
    setLoading(true);
    getInteract()
      .then((res) => {
        console.log("getInteract", res);
        setInteractData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        message.error("不好意思，服务器出错了");
        console.log(error);
        setLoading(false);
      });
  }, [counter]);

  return (
    <div>
      <Header />
      <Container>
        <div className={style["interact-wrap"]}>
          <div className={style["interact-title"]}>
            <div className={style["interact-title-header"]}>
              Junior_Lee 的留言板
            </div>
            <div className={style["interact-title-context-wrap"]}>
              <div className={style["interact-title-context"]}>
                <div className={style["context-line"]}>
                  If I should meet thee
                </div>
                <div className={style["context-line"]}>After long years,</div>
                <div className={style["context-line"]}>
                  How should I greet thee?
                </div>
                <div className={style["context-line"]}>
                  With silence and tears.
                </div>
                <br />
                <div className={style["context-line"]}>若我在见到你，</div>
                <div className={style["context-line"]}>事搁经年，</div>
                <div className={style["context-line"]}>我该如何贺你？</div>
                <div className={style["context-line"]}>以沉默，以眼泪。</div>
                <div className={style["context-author"]}>——拜伦</div>
              </div>
              <img src={genji} alt="" className={style["poster"]} />
            </div>
          </div>
          <div id="reply-holder"></div>
          <div className={style["interact-edit-wrap"]}>
            <div className={style["interact-edit-header"]}>留个言吧~</div>
            {reply?.isReply ? (
              <div className={style["interact-reply"]}>
                <div className={style["reply-item"]}>
                  回复{" "}
                  {reply?.replyItem?.is_master ? (
                    <span className={style["master"]}>博主</span>
                  ) : (
                    reply?.replyItem?.name
                  )}{" "}
                  的一条留言：
                </div>
                <div className={style["reply-item"]}>
                  {reply?.replyItem?.context}
                </div>
                <div className={style["reply-item"]}>
                  <a onClick={handleCancel}>取消回复</a>
                </div>
              </div>
            ) : null}

            <Form
              layout="horizontal"
              requiredMark={false}
              form={form}
              onFinish={addRow}
            >
              <Row justify="space-between" style={{ marginBottom: "5px" }}>
                <Col xs={20} sm={20} md={20} lg={20} xl={21}>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "留个ID好分辨？" }]}
                  >
                    <Input
                      className={style["interact-inputarea"]}
                      placeholder="留个ID日后好相认？"
                    />
                  </Form.Item>
                </Col>
                <Col xs={4} sm={3} md={4} lg={4} xl={3}>
                  {" "}
                  {headImg == "" ? (
                    <img
                      src={defaultHeadImg}
                      className={style["interact-headImg"]}
                      alt=""
                    />
                  ) : (
                    <img
                      src={headImg}
                      className={style["interact-headImg"]}
                      alt=""
                    />
                  )}
                </Col>
              </Row>
              <Form.Item
                name="context"
                rules={[
                  {
                    required: true,
                    message: "这也不能留个寂寞啊，来个战网ID好友位也行啊",
                  },
                ]}
              >
                <Input.TextArea
                  rows={6}
                  className={style["interact-inputarea"]}
                  placeholder="旁友，来个战网ID好友位也行啊"
                />
              </Form.Item>

              <Row
                className={style["interact-edit-subline"]}
                justify="space-between"
              >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Row>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                      <MailOutlined className={style["email"]} />
                    </Col>
                    <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                      <Form.Item
                        name="email"
                        rules={[
                          { required: true, message: "旁友，你的邮箱还没留呐" },
                        ]}
                      >
                        <Input
                          className={style["email-input"]}
                          placeholder="你的QQ邮箱~"
                          onChange={handleMail}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Row justify="end">
                    <Col style={{ marginRight: "15px" }}>
                      <span className={style["canreply"]}>
                        是否仅博主回复：
                      </span>
                      <Form.Item name="canreply" noStyle={true}>
                        <Switch
                          checked={singleReply}
                          checkedChildren="开"
                          unCheckedChildren="关"
                          onChange={(checked: boolean) =>
                            setSingleReply(checked)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Button
                        className={style["interact-submit"]}
                        htmlType="submit"
                        //   onClick={() => .submit()}
                      >
                        留言
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
          <div className={style["interact-list"]}>
            <div className={`${style["interact-list-header"]}`}>留言列表</div>
            {interactData.length > 0 ? (
              <Loader loading={loading}>
                {interactData.map((fitem: InteractDataI, index: number) => (
                  <LazyLoad
                    height={300}
                    classNamePrefix="animated fadeInRight"
                    key={index}
                  >
                    <div className={style["interact-list-context"]}>
                      <Reply
                        name={fitem.name}
                        author={
                          fitem.is_master ? (
                            <span className={style["master"]}>博主</span>
                          ) : (
                            fitem.name
                          )
                        }
                        context={fitem.context}
                        headImg={`http://q4.qlogo.cn/g?b=qq&nk=${fitem.email}&s=3`}
                        reply={
                          <span>
                            {moment(new Date(fitem.create_time * 1000)).format(
                              "YYYY年MM月DD日 HH:mm:ss"
                            )}
                            {fitem.can_reply ? (
                              <a
                                href="#reply-holder"
                                style={{ marginLeft: "10px" }}
                                onClick={() => handleReply(fitem)}
                              >
                                回复
                              </a>
                            ) : (
                              <span
                                style={{ marginLeft: "10px" }}
                                onClick={() => masterReply(fitem)}
                              >
                                这位朋友设置了仅博主回复
                              </span>
                            )}{" "}
                          </span>
                        }
                      >
                        {fitem.children.map(
                          (citem: InteractDataChildrenI, index: number) => (
                            <Reply
                              key={index}
                              name={citem.name}
                              author={
                                <span>
                                  {citem.is_master ? (
                                    <span className={style["master"]}>
                                      博主
                                    </span>
                                  ) : (
                                    citem.name
                                  )}{" "}
                                  回复{" "}
                                  {citem.fis_master ? (
                                    <span className={style["master"]}>
                                      博主
                                    </span>
                                  ) : (
                                    citem.fname
                                  )}{" "}
                                  ：
                                </span>
                              }
                              context={citem.context}
                              headImg={`http://q4.qlogo.cn/g?b=qq&nk=${citem.email}&s=3`}
                              reply={
                                <span>
                                  {moment(
                                    new Date(citem.create_time * 1000)
                                  ).format("YYYY年MM月DD日 HH:mm:ss")}
                                  {citem.can_reply ? (
                                    <a
                                      href="#reply-a"
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => handleReply(fitem, citem)}
                                    >
                                      回复
                                    </a>
                                  ) : (
                                    <span
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => masterReply(fitem, citem)}
                                    >
                                      这位朋友设置了仅博主回复
                                    </span>
                                  )}{" "}
                                </span>
                              }
                            ></Reply>
                          )
                        )}
                      </Reply>
                    </div>
                  </LazyLoad>
                ))}
              </Loader>
            ) : (
              <div className={style["no-reply"]}>暂时还没有留言噢~</div>
            )}
          </div>
          <Divider dashed className={style["ending"]}>
            已经到底了
          </Divider>
        </div>

        <>
          <LeeCard />
          <WechatCard />
          <QQCard />
        </>
      </Container>
    </div>
  );
}

export default Interact;
