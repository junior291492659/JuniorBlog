import { Button } from "antd";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getImage } from "../../api/service";
import { useImperativeDialog } from "../imperative-dialog";
import ImageViewer from "../image-viewer";

interface TestPropsI extends RouteComponentProps {}

function Test(props: TestPropsI) {
  console.log(props);
  const [img, setImg] = useState();

  const [modal, open] = useImperativeDialog(ImageViewer as any, {
    images: [
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",

      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",

      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
      "https://images.unsplash.com/photo-1587334096951-1523ecad29ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "http://127.0.0.1:7001/default/getImage/1608283622090zhengfeng.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608226205845&di=03c50dd024f74d35291c9cc58f242775&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e5103cfc0f648a7d933c9950d8a.jpg",
      "https://example.com/error.jpg",
    ],
  });

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
      <Button onClick={(e) => open({ initialIndex: 6 }, e)}>图片1</Button>
      {modal}
    </div>
  );
}

export default Test;
