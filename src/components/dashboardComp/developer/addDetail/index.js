import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import axios from "axios";
import Add from "../addHdr/add";

const AddDevDetail = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDisable, setFormDisable] = useState(false);
  const [devHdrData, setDevHdrData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoad] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setFileList([]);
    getDevHdr();
    setIsModalOpen(true);
  };
  const getDevHdr = async () => {
    setLoad(true);
    const body = {
      page: 0,
      size: 4,
    };
    await axios
      .post("/api/post/developer/getDevHdr", body)
      .then((res) => {
        if (res.data.result) {
          setDevHdrData(res.data.result);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoad(false);
      });
  };
  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
    setFileList([]);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const onFinish = (values) => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      devHdrId: values.devHdrId,
      fullName: values.fullName,
      image: values.image.file.imgName,
      jobPosition: values.jobPosition,
      type: 0,
    };
    setFormDisable(true);
    axios
      .post("/api/postBT/developer/saveDetail", body, { headers: header })
      .then((res) => {
        message.success("Амжилттай");
        setIsModalOpen(false);
        props.getDeveloper();
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
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Хөгжүүлэгч +
      </Button>
      <Modal
        title="Хөгжүүлэгч нэмэх"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelAlign="left"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
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
            label="Алба"
            name="devHdrId"
            rules={[
              {
                required: true,
                message: "Төслийн нэр ээ оруулна уу!",
              },
            ]}
            key={11}
            className="-mb-3 "
          >
            <div className="flex items-center">
              <Form.Item
                name="devHdrId"
                rules={[
                  {
                    required: true,
                    message: "Төслийн нэр ээ оруулна уу!",
                  },
                ]}
                key={222}
                className="w-full"
              >
                <Select
                  className="w-full"
                  disabled={loading}
                  loading={loading}
                  options={
                    devHdrData.length > 0
                      ? devHdrData.map((e, i) => ({
                          value: e.id,
                          label: e.title,
                        }))
                      : []
                  }
                />
              </Form.Item>
              <Form.Item key={22332}>
                <Add getDeveloper={props.getDeveloper} getDevHdr={getDevHdr} />
              </Form.Item>
            </div>
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
                message: "Албан тушаал аа оруулна уу!",
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

export default AddDevDetail;
