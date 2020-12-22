import React, { PropsWithChildren, ReactNode } from "react";
import { Comment, Avatar } from "antd";

interface ReplyPropsI extends PropsWithChildren<any> {
  name: string;
  author: string | ReactNode;
  headImg: string;
  context: string;
  reply: ReactNode;
}

function Reply(props: ReplyPropsI) {
  const { name, author, headImg, context, reply, children } = props;
  return (
    <Comment
      className="animated fadeInRight"
      content={context}
      author={author}
      avatar={<Avatar src={headImg} alt={name} />}
      actions={[<span key="comment-nested-reply-to">{reply}</span>]}
    >
      {children}
    </Comment>
  );
}

export default Reply;
