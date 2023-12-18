import React, { useState } from "react";
import { Button, Form, Input, Modal, Tooltip, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const Add = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDisable, setFormDisable] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const showModal = () => {
    setFileList([]);
    form.resetFields();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setFileList([]);
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setFileList([]);
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    setFormDisable(true);
    const body = {
      image: values.image.file.imgName,
      title: values.title,
    };
    axios
      .post("/api/postBT/developer/saveHdr", body, { headers: header })
      .then((res) => {
        message.success(res.data.msg);
        props.getDeveloper();
        props.getDevHdr();
        setIsModalOpen(false);
      })
      .catch((err) => {
        // message.success("error");
      })
      .finally(() => {
        setIsModalOpen(false);
        setFormDisable(false);
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
    <div className="flex justify-end">
      <Tooltip title="Алба нэмэх">
        <Button
          type="primary"
          onClick={showModal}
          size="middle"
          className="bg-blue-500 flex items-center my-3 right-0"
        >
          <PlusOutlined />
        </Button>
      </Tooltip>
      <Modal
        title="Алба нэмэх"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 700,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={formDisable}
        >
          <Form.Item
            label="Албаны нэр"
            name="title"
            rules={[
              {
                required: true,
                message: "Албаны нэр оруулна уу!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Зураг"
            name="image"
            rules={[
              {
                required: true,
                message: "Зураг оруулна уу!",
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
              offset: 20,
              span: 20,
            }}
          >
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Хадгалах
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
