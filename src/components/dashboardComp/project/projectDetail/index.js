import React, { useState } from "react";
import { Button, Form, Input, Modal, Skeleton, Upload, message } from "antd";
import axios from "axios";
import { FundViewOutlined } from "@ant-design/icons";
import config from "../../../../../config";
const { TextArea } = Input;
const ProjectDetal = ({ id, getProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [logoWhite, setLogoWhite] = useState([]);
  const [logoGray, setLogoGray] = useState([]);
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setLoading(true);
    setIsModalOpen(true);
    const body = {
      hdrId: id,
    };
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios
      .post("/api/postBT/project/getProjectDetail", body, { headers: header })
      .then((res) => {
        setData(res.data.result);
        setLogoWhite([
          {
            uid: "-1",
            name: res.data.result.logoWhite,
            status: "done",
            url: config.data.uploadUrl + res.data.result.logoWhite,
          },
        ]);
        setFileList([
          {
            uid: "-1",
            name: res.data.result.imageHdr,
            status: "done",
            url: config.data.uploadUrl + res.data.result.imageHdr,
          },
        ]);

        setLoading(false);
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
        setLoading(false);
      });
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
      title: "",
      description: values.description,
      requirement: "",
      imageHdr: "",
      logoWhite: "",
    };
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios
      .post("/api/postBT/project/projectDetailUpdate", body, {
        headers: header,
      })
      .then((res) => {
        message.success(res.data.msg);
        setIsModalOpen(false);
        getProject();
      })
      .catch((err) => {
        message.success("error");
      })
      .finally(() => {
        setLoading(false);
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
        icon={<FundViewOutlined />}
      ></Button>
      <Modal
        title="Төсөл дэлгэрэнгуй засах"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {loading ? (
          <Skeleton loading={true} active />
        ) : (
          <Form
            disabled={loading}
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
              // title: data.title,
              description: data.description,
              // imageHdr: data.imageHdr,
              // logoWhite: data.logoWhite,
              // requirement: data.requirement,
            }}
          >
            <Form.Item label="ID" name="id">
              <Input disabled={true} />
            </Form.Item>
            {/* <Form.Item
              label="Нүүр зураг"
              name="imageHdr"
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
            </Form.Item> */}

            {/* <Form.Item
              label="Цагаан"
              name="logoWhite"
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
                onChange={({ fileList }) => setLogoWhite(fileList)}
                listType="picture-card"
                fileList={logoWhite}
                onRemove={null}
              >
                {logoWhite.length >= 1 ? null : "Зураг нэмэх"}
              </Upload>
            </Form.Item>
            <Form.Item
              label="Гарчиг"
              name="title"
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
              label="Тайлбар"
              name="requirement"
              rules={[
                {
                  required: true,
                  message: "requirement аа оруулна уу!",
                },
              ]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              label="Дэлгэрэнгуй"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Дэлгэрэнгуй мэдээлэл оруулна уу!",
                },
              ]}
            >
              <TextArea style={{ height: "150px" }} />
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
        )}
      </Modal>
    </div>
  );
};

export default ProjectDetal;
