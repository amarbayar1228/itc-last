import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import config from "../../../../../config";
import { Editor } from "@tinymce/tinymce-react";
const { TextArea } = Input;

const Edit = ({ data, getNews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filesBgImg, setFilesBgImg] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [featuredNews, setFeaturedNews] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [description, setDescription] = useState(false);

  const showModal = () => {
    setFeaturedNews(data.type === 2 ? true : false);
    setDescription(data.description);
    setFileList([
      {
        uid: "-1",
        name: data.image,
        status: "done",
        url: config.data.uploadUrl + data.image,
      },
    ]);
    setFilesBgImg([
      {
        uid: "-1",
        name: data.backgroundImage,
        status: "done",
        url: config.data.uploadUrl + data.backgroundImage,
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
    setDisableForm(true);
    const body = {
      id: values.id,
      title: values.title,
      description: description,
      image: values.image.file ? values.image.file.imgName : values.image,
      backgroundImage: values.backgroundImage.file
        ? values.backgroundImage.file.imgName
        : values.backgroundImage,
      status: values.status,
      ytubeUrl: 0,
      type: featuredNews ? 2 : 1,
    };
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios
      .post("/api/postBT/main/updateNews", body, { headers: header })
      .then((res) => {
        message.success(res.data);
        setIsModalOpen(false);
        getNews();
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
      })
      .finally(() => {
        setDisableForm(false);
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
        title="Мэдээ засах"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 1000,
          }}
          disabled={disableForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            id: data.id,
            title: data.title,
            description: data.description,
            image: data.image,
            backgroundImage: data.backgroundImage,
            status: data.status,
            // ytubeUrl: data.ytubeUrl,
          }}
        >
          <Form.Item label="ID" name="id">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            label="Background Зураг"
            name="backgroundImage"
            rules={[
              {
                required: true,
                message: "Background аа оруулна уу!",
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

          <Form.Item label="Дэлгэрэнгуй">
            <div className="mt-4">
              <Editor
                apiKey="77amhxnucifbte4whcmtbp57f995exk5lyb1e4iqa5dmzm40"
                onEditorChange={(newValue, editor) => {
                  setDescription(newValue);
                }}
                onInit={(evt, editor) => {}}
                value={description}
                init={{
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                  toolbar:
                    "undo redo | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                }}
              />
            </div>
          </Form.Item>
          {/* <Form.Item
            label="Link"
            name="ytubeUrl"
            rules={[
              {
                required: true,
                message: "Link аа оруулна уу!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
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
              options={[
                {
                  value: 1,
                  label: "Идэвхгүй",
                },
                {
                  value: 3,
                  label: "Идэвхтэй",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Mэдээ" name="type">
            <Checkbox
              onChange={(e) => setFeaturedNews(e.target.checked)}
              checked={featuredNews}
            >
              Онцлох мэдээ
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 20,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500"
              size="large"
            >
              Шинэчлэх
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
