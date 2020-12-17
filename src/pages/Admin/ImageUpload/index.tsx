import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile, UploadFileStatus } from "antd/lib/upload/interface";

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
    {
      uid: "-1",
      type: "image",
      size: 1024,
      name: "image1.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      type: "image",
      size: 1024,
      name: "image2.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      type: "image",
      size: 1024,
      name: "image3.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ],
};

function ImageUpload() {
  const [imageList, setImageList] = useState<ImageListI>(init);

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

  const handleChange: (param: any) => void = ({ fileList }) =>
    setImageList({ ...imageList, fileList });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="http://127.0.0.1:7001/admin/uploadImage"
        listType="picture-card"
        fileList={imageList.fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {imageList.fileList.length >= 8 ? null : uploadButton}
      </Upload>
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
