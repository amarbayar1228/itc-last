import React, { useState } from "react";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import config from "../../../../../config";

const Edit = ({ getBanner, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setFileList([
      {
        uid: "-1",
        name: data.image,
        status: "done",
        url: config.data.uploadUrl + data.image,
      },
    ]);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    const body = {
      id: values.id,
      image: values.image.file ? values.image.file.imgName : values.image,
      type: data.type,
    };
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    console.log("body: ", body);
    axios
      .post("/api/postBT/banner/bannerUpdate", body, { headers: header })
      .then((res) => {
        message.success(res.data.msg);
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(true);
        setIsModalOpen(false);
        getBanner();
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadFileImg = async (options, param) => {
    const { onSuccess, file } = options;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error(` Заавал зураг оруулна уу`);
      setFileList([]);
    } else {
      const fmData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      fmData.append("file", file);
      const res = await axios.post(`/api/upload`, fmData, config);
      file.url = `/api/v1/getFile?file=${res.data}`;
      file.imgName = res.data;
      if (res.status == 200) {
        message.success("Амжилтай файл хууллаа");
      }
      onSuccess("Ok");
    }
  };
  return (
    <div>
      <Button
        size="small"
        type="primary"
        onClick={showModal}
        className="bg-blue-500"
        icon={<EditOutlined />}
      ></Button>
      <Modal
        title="Баннер засах"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            id: data.id,
            image: data.image,
            title: data.title,
          }}
          disabled={loading}
        >
          <Form.Item label="ID" name="id">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Нэр" name="title">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            label="Зураг"
            name="image"
            rules={[
              {
                required: true,
                message: "Зураг аа оруулна уу!",
              },
            ]}
          >
            <Upload
              style={{ display: "flex" }}
              multiple={false}
              accept="jpg"
              customRequest={(option) => uploadFileImg(option, 0)}
              onChange={({ fileList }) => setFileList(fileList)}
              listType="picture-card"
              fileList={fileList}
              onRemove={null}
            >
              {fileList.length >= 1 ? null : "Зураг нэмэх"}
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 19,
              span: 20,
            }}
          >
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Шинэчлэх
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
