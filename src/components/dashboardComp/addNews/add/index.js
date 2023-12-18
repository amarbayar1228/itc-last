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
import { Editor } from "@tinymce/tinymce-react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
    offset: 0,
  },
};
const formItemLayoutBtn = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 26,
    offset: 4,
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    span: 26,
    offset: 4,
  },
};
const { TextArea } = Input;

const Add = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toogleImg, setToogleImg] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState();
  const [imageName, setImageName] = useState("");
  const [formDisable, setFormDisable] = useState(false);
  const [fileListBgImg, setFileListBgImg] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressBg, setProgressBg] = useState(0);
  const [form] = Form.useForm();
  const [valueDoc, setValue] = useState([{ data: "" }]);
  const [requirement, setRequirement] = useState([{ data: "" }]);
  const [description, setDescription] = useState("");

  const showModal = () => {
    setDescription("");
    setFileListBgImg([]);
    setFileList([]);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setRequirement([]);
    setValue([]);
    form.resetFields();
    setIsModalOpen(false);
    setDescription("");
  };

  const onFinish = (values) => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    const docList = [];
    if (requirement || valueDoc) {
      requirement.forEach((e, i) => {
        docList.push({
          title: e,
          document: valueDoc.filter((e, index) => index === i)[0],
        });
      });
    }

    const body = {
      title: values.title,
      description: description,
      image: imageName,
      backgroundImage: backgroundImage,
      status: values.status,
      ytubeUrl: 0,
      type: 1,
      // newsDocumentList: docList,
    };

    setFormDisable(true);
    axios
      .post("/api/postBT/main/saveNews", body, { headers: header })
      .then((res) => {
        message.success(res.data);
        setIsModalOpen(false);
        props.getNews();
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

  const handleChangeSel = (value) => {
    console.log(`selected ${value}`);
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

  const editorFunc = (e, index) => {
    const list = [...valueDoc];
    list[index] = e;
    setValue(list);
  };
  const requirementFunc = (e, index) => {
    const list = [...requirement];
    list[index] = e.target.value;
    setRequirement(list);
  };
  const handleServiceRemove = (index) => {
    const list = [...requirement];
    list.splice(index, 1);
    setRequirement(list);

    const list2 = [...valueDoc];
    list2.splice(index, 1);
    setValue(list);
  };
  return (
    <div className="w-full flex justify-end mb-2">
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Мэдээ нэмэх +
      </Button>
      <Modal
        title="Мэдээ нэмэх"
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
          <Form.Item
            label="Background зураг"
            name="background"
            rules={[
              {
                required: true,
                message: "Зураг аа оруулна уу!",
              },
            ]}
          >
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
              name="background"
              rules={[
                {
                  required: true,
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
            label="Зураг"
            name={"img2"}
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
              onPreview={() => (setPreviewVisible(true), setToogleImg(true))}
            >
              {fileList.length >= 1 ? null : "Зураг нэмэх"}
            </Upload>
            {progress > 0 ? <Progress percent={progress} /> : null}
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

          <Form.Item label="Дэлгэрэнгуй" name="purposeDescription">
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
                message: "Youtube url аа оруулна уу!",
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
              defaultValue={1}
              style={{
                width: 120,
              }}
              onChange={handleChangeSel}
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
          {/* <Form.List name="requirementDescList">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "Тавигдах шаардлага" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item noStyle>
                      <Input
                        placeholder="Гарчиг"
                        style={{
                          width: "94%",
                        }}
                        onChange={(e) => requirementFunc(e, index)}
                      />
                      <div className="mt-4">
                        <Editor
                          apiKey="77amhxnucifbte4whcmtbp57f995exk5lyb1e4iqa5dmzm40"
                          onEditorChange={(e) => editorFunc(e, index)}
                          onInit={(evt, editor) => {}}
                          init={{
                            plugins:
                              "mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                            toolbar:
                              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                          }}
                        />
                      </div>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="ml-2"
                        onClick={() => (
                          remove(field.name), handleServiceRemove(index)
                        )}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item {...formItemLayoutBtn}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{
                      width: "100%",
                    }}
                    icon={<PlusOutlined />}
                  >
                    Тавигдах шаардлага нэмэх
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List> */}

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
    </div>
  );
};

export default Add;
