import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import config from "../../../../../config";
const Edit = ({ id, getDeveloper, data, url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filesBgImg, setFilesBgImg] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setFilesBgImg([
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
    // console.log("getNews: ", getNews);
    setLoading(true);
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      id: values.id,
      fullName: values.fullName,
      jobPosition: values.jobPosition,
      image: values.image.file ? values.image.file.imgName : values.image,
      status: values.status,
    };
    axios
      .post("/api/postBT/developer/devDetailUpdate", body, { headers: header })
      .then((res) => {
        res.data.code === 1
          ? message.success(res.data.msg)
          : message.error(res.data.msg);
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
        setIsModalOpen(false);
        getDeveloper();
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const uploadFileImg = async (options, param) => {
    const { onSuccess, file } = options;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error(` Заавал зураг оруулна уу`);
      setFilesBgImg([]);
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
        title="засах"
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
          disabled={loading}
          initialValues={{
            id: data.id,
            fullName: data.fullName,
            jobPosition: data.jobPosition,
            image: data.image,
            status: data.status,
          }}
        >
          <Form.Item label="ID" name="id">
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
              customRequest={(option) => uploadFileImg(option, 1)}
              onChange={({ fileList }) => setFilesBgImg(fileList)}
              listType="picture-card"
              fileList={filesBgImg}
              onRemove={null}
            >
              {filesBgImg.length >= 1 ? null : "Зураг нэмэх"}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Овог нэр"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Гарчиг аа оруулна уу!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Албан тушаал"
            name="jobPosition"
            rules={[
              {
                required: true,
                message: "Гарчиг аа оруулна уу!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: 0,
                  label: "Албаны менежер",
                },
                {
                  value: 1,
                  label: "Ахлах",
                },
                {
                  value: 2,
                  label: "Мэргэжилтэн",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Төрөл"
            name="status"
            rules={[
              {
                required: true,
                message: "Төрөл өө оруулна уу!",
              },
            ]}
          >
            <Select
              style={{
                width: 120,
              }}
              // onChange={handleChangeSel}
              options={[
                {
                  value: 0,
                  label: "Идэвхгүй",
                },
                {
                  value: 1,
                  label: "Идэвхтэй",
                },
              ]}
            />
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
