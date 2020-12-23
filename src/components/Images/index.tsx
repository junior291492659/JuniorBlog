import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import "./picture.css";
import { useImperativeDialog } from "../../components/imperative-dialog";
import ImageViewer from "../../components/image-viewer";
import { Col, Row, Spin, Tooltip } from "antd";
import { ImageDataI } from "../../pages/Admin/ImageUpload";
import { CopyOutlined, EyeOutlined } from "@ant-design/icons";

const baseUrl = "http://127.0.0.1:7001/default/getImage/";

interface ImagesI {
  category: string; // 图片分类
  imageData: ImageDataI[]; // 图片数量
  header?: boolean;
}
/**
 * 和 pages 中的 Images大致相同，只不过这个可以接收参数（之前那个路由组件传参不方便）
 * @param props : ImagesI
 */
function Images(props: ImagesI) {
  const { imageData, header = true } = props;

  // const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isload = useRef<number>(0);
  const [modal, open] = useImperativeDialog(ImageViewer as any, {
    images: imageData.map((item) => `${baseUrl}${item.source}`),
  });

  // useEffect(() => {
  //   isload.current = 0;
  //   console.log("images effect");
  //   let arr = new Array(74);
  //   for (let i = 0; i < arr.length; ++i) {
  //     arr[i] = i;
  //   }
  //   setData(arr);
  // }, []);

  const domPull = () => {
    var main = document.getElementById("main") as HTMLElement;
    var box = document.getElementsByClassName("box");
    //实现瀑布流布局
    // setTimeout(()=>{ //图片如未加载完成 则布局错误
    waterFull(main, box);
    // },1000)

    // //加载数据
    // var timer1: any = null;
    // window.addEventListener("scroll", function (e) {
    //   if (timer1) clearTimeout(timer1);
    //   //节流
    //   timer1 = setTimeout(function () {
    //     if (checkWillLoadNewBox(main, box)) {
    //       //假数据模仿数据加载
    //       let arr = new Array(74); //30-60数组
    //       for (let i = 0; i < arr.length; i++) {
    //         arr[i] = i;
    //       }
    //       //遍历数据
    //       for (let i = 0; i < arr.length; i++) {
    //         var newBox = document.createElement("div");
    //         newBox.className = "box";
    //         main.appendChild(newBox);

    //         var newPic = document.createElement("div");
    //         newPic.className = "pic";
    //         newBox.appendChild(newPic);

    //         var newImg = document.createElement("img");
    //         newImg.src =
    //           "https://www.jsfan.net/some/lifeimg/life%20(" + arr[i] + ").jpg";
    //         console.log("newImg.src", newImg.src);
    //         // newImg.addEventListener('click',()=>{Zmage.browsing({ src:"https://www.jsfan.net/some/lifeimg/life%20("+arr[i]+").jpg" })})
    //         newPic.appendChild(newImg);
    //       }
    //       //重新进行瀑布流布局
    //       waterFull(main, box);
    //     }
    //   }, 200);
    // });

    //页面尺寸发生改变重新布局
    var timer2: any = null;
    window.addEventListener("resize", function () {
      if (timer2) clearTimeout(timer2);
      //节流
      timer2 = setTimeout(function () {
        waterFull(main, box);
      }, 200);
    });
  };

  const waterFull = (parent: any, child: any) => {
    //(1)父盒子居中
    //1.1 获取所有子盒子
    //1.2 获取其中一个子盒子的宽度
    try {
      var boxWidth = child[0].offsetWidth;
    } catch (error) {
      return;
    }

    //1.3 获取窗口的宽度
    // var screenW = document.body.clientWidth
    //1.3 获取col的宽度
    var coldom = document.getElementsByClassName("comm-left")[0] as HTMLElement;
    var screenW = coldom.offsetWidth as number;
    // console.log(screenW)
    //1.4 求出列数
    var cols = Math.floor(screenW / boxWidth);
    // console.log(cols)
    //1.5 父盒子居中
    parent.style.width = cols * boxWidth + "px";
    parent.style.margin = "0 auto";

    //(2)子盒子定位
    //2.1 定义变量
    var heightArr = [];
    var boxHeight = 0;
    var minBoxHeight = 0;
    var minBoxIndex;
    //2.2 遍历所有盒子获取高度
    for (let i = 0; i < child.length; i++) {
      boxHeight = child[i].offsetHeight;
      //2.3 判断是否为第一行
      if (i < cols) {
        heightArr.push(boxHeight);
        child[i].style = ""; //(响应式布局)保证第一行没有添加样式
      } else {
        //剩余行做定位
        //2.4 取出数组中最矮盒子的高度
        let arrSort = heightArr.slice(0); //sort排序后，会影响原始数组 解决方案
        arrSort.sort(function (a, b) {
          return a - b;
        });
        // console.log(arrSort[0]) //最小
        //console.log(arrSort[arrSort.length-1]) //最大
        minBoxHeight = arrSort[0];
        //2.5 取出最矮盒子在数组中的索引
        minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
        // console.log(minBoxIndex)
        //2.6 剩余子盒子的定位
        child[i].style.position = "absolute";
        child[i].style.left = minBoxIndex * boxWidth + "px";
        child[i].style.top = minBoxHeight + "px";
      }
      //2.7 更新高度
      heightArr[minBoxIndex as number] += boxHeight;
    }

    // console.log(heightArr, minBoxHeight)
    let arrSortmax = heightArr.slice(0); //sort排序后，会影响原始数组 解决方案
    arrSortmax.sort(function (a, b) {
      return a - b;
    });
    // console.log(arrSortmax[arrSortmax.length-1]) //最大
    coldom.style.height = arrSortmax[arrSortmax.length - 1] + "px";
  };
  const getMinBoxIndex = (arr: any, val: any) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return i;
      }
    }
    return 0;
  };
  // const checkWillLoadNewBox = (parent: any, child: any) => {
  //   //1. 获取最后的盒子
  //   var lastBox = child[child.length - 1];
  //   //2. 求最后盒子高度的一半
  //   try {
  //     var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
  //   } catch (error) {
  //     return;
  //   }

  //   //3. 求出页面高度
  //   var screenH =
  //     document.body.clientHeight || document.documentElement.clientHeight;
  //   //4. 求出页面滚出浏览器高度
  //   var scrollTopH = document.documentElement.scrollTop;
  //   //5. 返回结果
  //   return lastBoxDis <= screenH + scrollTopH;
  // };

  const load = () => {
    isload.current += 1;
    if (isload.current === imageData.length) {
      setLoading(false);
      domPull();
    }
  };

  return (
    <div>
      {header ? <Header /> : null}

      <Row
        className="comm-main"
        justify={header ? "center" : "start"}
        style={header ? { paddingTop: "5rem" } : { paddingTop: "1rem" }}
      >
        <Col
          className="comm-left"
          xs={24}
          sm={24}
          md={23}
          lg={23}
          xl={header ? 18 : 24}
          style={{
            padding: 0,
            backgroundColor: "rgba(255,255,255,.4)",
            borderRadius: "1rem",
          }}
        >
          <Spin tip="加载中..." spinning={loading}>
            <div id="main">
              {imageData.length > 0 ? (
                imageData.map((item, key) => (
                  <div className="box" key={key}>
                    <div className="pic">
                      <div className="suofanga" style={{ overflow: "hidden" }}>
                        <img
                          className="divimg"
                          src={`${baseUrl}${item.source}`}
                          onLoad={() => load()}
                          alt=""
                        />
                        <div className="cover">
                          <span
                            onClick={(e) => {
                              open({ initialIndex: key }, e);
                            }}
                          >
                            <EyeOutlined />
                          </span>
                          <Tooltip
                            title={`${baseUrl}${item.source}`}
                            placement="top"
                          >
                            <span>
                              <CopyOutlined />
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{ padding: "1rem", fontSize: "1rem", color: "#666" }}
                >
                  该分类暂无图片。
                </div>
              )}
            </div>
          </Spin>
        </Col>
      </Row>
      {modal}
    </div>
  );
}

export default React.memo(Images);
