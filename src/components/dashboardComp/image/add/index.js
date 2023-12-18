import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Upload,
  message,
} from "antd";
import axios from "axios";
import Image from "next/image";
import config from "../../../../../config";
const Add = ({ getData, url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toogleImg, setToogleImg] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState();
  const [imageName, setImageName] = useState("");
  const [formDisable, setFormDisable] = useState(false);
  const [fileListBgImg, setFileListBgImg] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [progressBg, setProgressBg] = useState(0);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setBackgroundImage();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    if (
      backgroundImage === null ||
      backgroundImage === "" ||
      backgroundImage === undefined
    ) {
      return message.error("Зураг оруулна уу!");
    }
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      name: values.name,
      image: backgroundImage,
      url: url,
    };
    console.log("body: ", body);
    console.log("localUrl: ", url);

    setFormDisable(true);
    axios
      .post("/api/postBT/main/saveImages", body, { headers: header })
      .then((res) => {
        console.log("res: ", res);
        message.success("Амжилттай");
        setIsModalOpen(false);
        getData();
        form.resetFields();
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
      })
      .finally(() => {
        setFormDisable(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadFileBgImg = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error(` Заавал зураг оруулна уу`);
      setFileListBgImg([]);
    } else {
      const fmData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgressBg(percent);
          if (percent === 100) {
            setTimeout(() => setProgressBg(0), 1000);
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
      setBackgroundImage(res.data);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Зураг нэмэх +
      </Button>
      <Modal
        title="Зураг нэмэх"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Form
          form={form}
          name="basic"
          labelAlign=" "
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 1000,
          }}
          initialValues={{
            status: 1,
            ytubeUrl: "0",
          }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={formDisable}
        >
          <Form.Item label="Зураг" name="image">
            <Modal
              open={previewVisible}
              title={"Зураг"}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              <Image
                alt="aaa"
                fill={false}
                width={2000}
                height={2000}
                src={
                  toogleImg
                    ? config.data.uploadUrl + imageName
                    : config.data.uploadUrl + backgroundImage
                }
              />
            </Modal>
            <Form.Item
              name="Зураг"
              rules={[
                {
                  required: false,
                  message: "Зураг аа оруулна уу!",
                },
              ]}
              className="-mb-3"
            >
              <Upload
                style={{ display: "flex" }}
                multiple={false}
                accept="jpg"
                customRequest={uploadFileBgImg}
                onChange={({ fileList }) => setFileListBgImg(fileList)}
                listType="picture-card"
                fileList={fileListBgImg}
                onRemove={null}
                onPreview={() => (setPreviewVisible(true), setToogleImg(false))}
              >
                {fileListBgImg.length >= 1 ? null : "Зураг нэмэх"}
              </Upload>
              {progressBg > 0 ? <Progress percent={progressBg} /> : null}
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Нэр"
            name="name"
            rules={[
              {
                required: true,
                message: "Нэр аа оруулна уу!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500"
              size="large"
            >
              Хадгалах
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
