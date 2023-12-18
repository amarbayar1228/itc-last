import React, { useState } from "react";
import { Button, Form, Modal, Progress, Select, Upload, message } from "antd";
import axios from "axios";

const Add = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageName, setImageName] = useState("");
  const [formDisable, setFormDisable] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [optionData, setOptionData] = useState([]);
  const [form] = Form.useForm();
  const showModal = () => {
    setFileList([]);
    axios
      .post("/api/post/banner/getBannerMenu")
      .then((res) => {
        setOptionData(res.data.result);
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
      });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      image: imageName,
      type: values.type,
    };
    console.log("values", values);
    setFormDisable(true);
    axios
      .post("/api/postBT/banner/saveBanner", body, { headers: header })
      .then((res) => {
        res.data.code === 1
          ? message.success(res.data.msg)
          : message.error(res.data.msg);
        setIsModalOpen(false);
        props.getBanner();
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
      })
      .finally(() => {
        setFormDisable(false);
        form.resetFields();
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadFileImg = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error(` Заавал зураг оруулна уу`);
      setFileList([]);
    } else {
      const fmData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgress(percent);
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000);
          }
          onProgress({ percent: (event.loaded / event.total) * 100 });
        },
      };
      fmData.append("file", file);

      const res = await axios.post(`/api/upload`, fmData, config);
      file.url = `/api/v1/getFile?file=${res.data}`;

      if (res.status == 200) {
        message.success("Амжилтай файл хууллаа");
      }
      onSuccess("Ok");
      setImageName(res.data);
    }
  };
  return (
    <div className="w-full flex justify-end mb-2">
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Banner нэмэх +
      </Button>
      <Modal
        title="Баннер нэмэх"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
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
            maxWidth: 600,
          }}
          initialValues={{
            type: 0,
            status: 1,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={formDisable}
        >
          <Form.Item
            label="Төрөл"
            name="type"
            rules={[
              {
                required: true,
                message: "Төрөл өө оруулна уу!",
              },
            ]}
          >
            <Select
              defaultValue={0}
              options={
                optionData.length > 0
                  ? optionData.map((e) => ({ label: e.title, value: e.id }))
                  : []
              }
            />
          </Form.Item>
          <Form.Item
            label="Зураг"
            name="img"
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
              customRequest={uploadFileImg}
              onChange={({ fileList }) => setFileList(fileList)}
              listType="picture-card"
              fileList={fileList}
              onRemove={null}
              onPreview={() => setPreviewVisible(true)}
            >
              {fileList.length >= 1 ? null : "Зураг нэмэх"}
            </Upload>
            {progress > 0 ? <Progress percent={progress} /> : null}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 19,
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
