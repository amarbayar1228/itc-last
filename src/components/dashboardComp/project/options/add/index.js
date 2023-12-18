import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import axios from "axios";
const { TextArea } = Input;
const Add = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDisable, setFormDisable] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    form.resetFields();
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
    setFormDisable(true);
    axios
      .post("/api/postBT/project/saveProjectType", values, { headers: header })
      .then((res) => {
        message.success(res.data.msg);
        props.getProject();
        props.getOption();
        setIsModalOpen(false);
      })
      .catch((err) => {
        message.success("error");
      })
      .finally(() => {
        setFormDisable(false);
        form.resetFields();
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-end mb-2">
      <Button
        type="primary"
        onClick={showModal}
        className="bg-blue-500  right-0"
      >
        + Төслийн төрөл нэмэх
      </Button>
      <Modal
        title="нэмэх"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 1000,
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
            label="Дэлгэрэнгуй"
            name="description"
            rules={[
              {
                required: true,
                message: "Дэлгэрэнгуй мэдээлэл оруулна уу!",
              },
            ]}
          >
            <TextArea style={{ height: "200px" }} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
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
