import React, { useEffect, useState } from "react";
import { Upload, Modal, Row, Col, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import Images from "../../../components/Images";
import style from "./index.module.less";
import { getImages } from "../../../api/service";

const { Option } = Select;

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

interface ImageListI {
  previewVisible: boolean;
  previewImage: string;
  previewTitle: string;
  fileList: UploadFile<any>[];
}

const init: ImageListI = {
  previewVisible: false,
  previewImage: "",
  previewTitle: "",
  fileList: [
    // {
    //   uid: "-1",
    //   type: "image",
    //   size: 1024,
    //   name: "image1.png",
    //   status: "done",
    //   url:
    //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ],
};

export interface ImageDataI {
  id: number;
  name: string;
  category: number;
  create_time: Date;
  source: string;
}

function ImageUpload() {
  const [imageList, setImageList] = useState<ImageListI>(init);
  const [category, setCategory] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [data, setData] = useState<ImageDataI[]>([]);

  const handleCancel = () =>
    setImageList({ ...imageList, previewVisible: false });

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setImageList({
      ...imageList,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange: (param: any) => void = ({ file, fileList }) => {
    console.log("file", file);
    setImageList({ ...imageList, fileList });
    if (file.status === "done") {
      setCounter((counter) => counter + 1);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    getImages({ category })
      .then((res) => {
        console.log("res in upload image", res);
        setData(res.data);
        message.success(res.message);
      })
      .catch((error) => {
        message.error("不好意思，服务器出错了。");
        console.log(error);
      });
  }, [counter, category]);

  return (
    <>
      <Row justify="space-between">
        <Col xs={24} sm={24} md={24} lg={6} xl={6} id="main-left">
          <div className={style["upload-container"]}>
            <Select
              value={category}
              size="large"
              className={style["category-select"]}
              onChange={(value) => {
                setCategory(value);
              }}
            >
              <Option value={0}>收藏图库</Option>
              <Option value={1}>文章用图</Option>
              <Option value={2}>其它图片</Option>
            </Select>
            <Upload
              action="http://127.0.0.1:7001/admin/uploadImage"
              data={() => ({ category, xxx: "666" })}
              headers={{
                category: category + "",
                authorization: localStorage.getItem("token") || "",
              }}
              method="post"
              listType="picture-card"
              fileList={imageList.fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {imageList.fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={18} xl={18} id="main-right">
          <Images header={false} category="images" imageData={data} />
        </Col>
      </Row>

      <Modal
        visible={imageList.previewVisible}
        title={imageList.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={imageList.previewImage}
        />
      </Modal>
    </>
  );
}

export default ImageUpload;
