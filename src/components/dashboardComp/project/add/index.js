import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import axios from "axios";
import Addcomp from "../options/add";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
const { TextArea } = Input;
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
const Add = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filesBgImg1, setFilesBgImg1] = useState([]);
  const [logoGray, setLogoGray] = useState([]);
  const [logoWhite, setLogoWhite] = useState([]);
  const [formDisable, setFormDisable] = useState(false);
  const [optionData, setOptionData] = useState([]);
  const [disabledOptionData, setDisabledOptionData] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [valueDoc, setValue] = useState([{ data: "" }]);
  const [description, setDescription] = useState([{ data: "" }]);
  const [requirement, setRequirement] = useState([{ data: "" }]);
  const showModal = () => {
    console.log("object");
    setDescription([{ data: "ehllo" }]);
    setLogoGray([]);
    setLogoWhite([]);
    setLogoGray([]);
    setFilesBgImg1([]);
    setFileList([]);
    form.resetFields();
    getOption();

    setIsModalOpen(true);
  };
  const getOption = async () => {
    setDisabledOptionData(true);
    const body = {
      page: 0,
      size: 4,
    };
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    await axios
      .post("/api/postBT/project/getProjectType", body, { headers: header })
      .then((res) => {
        setOptionData(res.data.result);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setDisabledOptionData(false);
      });
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
    setLogoGray([]);
    setFilesBgImg1([]);
    setFileList([]);
    setLogoWhite([]);
    setLogoGray([]);
    setDescription([]);
  };
  const handleCancel = () => {
    setDescription([]);
    setIsModalOpen(false);
    form.resetFields();
    setLogoGray([]);
    setFilesBgImg1([]);
    setFileList([]);

    setRequirement([]);
    setValue([]);
    setDescription([]);
  };

  const onFinish = (values) => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    const docList = [];
    if (requirement || valueDoc) {
      requirement.forEach((e, i) => {
        docList.push({
          documentTitle: e,
          document: valueDoc.filter((e, index) => index === i)[0],
        });
      });
    }

    const body = {
      id: values.projectId,
      hdrTitle: values.hdrTitle,
      detailTitle: values.detailTitle,
      detailDescription: description,
      description: values.description,
      requirement: "",
      imageHdr: "",
      imageHdrDetail: "",
      logoGray: "",
      logoWhite: "",
      projectDocList: docList,
    };
    setFormDisable(true);
    axios
      .post("/api/postBT/project/saveProject", body, { headers: header })
      .then((res) => {
        message.success(res.data);
        setIsModalOpen(false);
        props.getProject();
        form.resetFields();
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
      })
      .finally(() => {
        setDescription([]);
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
    <div>
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Төсөл нэмэх +
      </Button>
      <Modal
        title="Төсөл нэмэх"
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
            span: 24,
          }}
          style={{
            maxWidth: 1000,
          }}
          initialValues={{
            remember: true,
          }}
          labelAlign="left"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={formDisable}
        >
          <Divider orientation="right">Төрөл</Divider>
          <Form.Item label="Төслийн төрөл" name="projectId" key={11}>
            <div className="flex items-center w-full -mb-5">
              <Form.Item
                className="w-full"
                name="projectId"
                rules={[
                  {
                    required: true,
                    message: "Төслийн нэр ээ оруулна уу!",
                  },
                ]}
                key={11}
              >
                <Select
                  loading={disabledOptionData}
                  disabled={disabledOptionData}
                  options={optionData.map((e, i) => ({
                    value: e.id,
                    label: e.title,
                  }))}
                />
              </Form.Item>
              <Form.Item key={11111}>
                <Addcomp getProject={props.getProject} getOption={getOption} />
              </Form.Item>
            </div>
          </Form.Item>

          <Divider orientation="right">Төслийн нэр</Divider>
          <Form.Item
            label="Cистем нэр"
            name="hdrTitle"
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
            label="Cистем дэлгэрэнгуй"
            name="description"
            rules={[
              {
                required: true,
                message: "Cистем дэлгэрэнгуй оруулна уу!",
              },
            ]}
          >
            <TextArea style={{ height: "150px" }} />
          </Form.Item>
          {/* <Form.Item
            label="Лого"
            rules={[
              {
                required: true,
                message: "Лог оо оруулна уу!",
              },
            ]}
          >
            <div className="flex">
              <Form.Item
                name="imageHdr"
                rules={[
                  {
                    required: true,
                    message: "Лог оо оруулна уу!",
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
                label="Gray"
                name="logoGray"
                rules={[
                  {
                    required: true,
                    message: "Лог оо оруулна уу!",
                  },
                ]}
              >
                <Upload
                  style={{ display: "flex" }}
                  multiple={false}
                  accept="jpg"
                  customRequest={(option) => uploadFileImg(option, 0)}
                  onChange={({ fileList }) => setLogoGray(fileList)}
                  listType="picture-card"
                  fileList={logoGray}
                  onRemove={null}
                >
                  {logoGray.length >= 1 ? null : "Зураг нэмэх"}
                </Upload>
              </Form.Item>
              <Form.Item
                label="white"
                name="logoWhite"
                rules={[
                  {
                    required: true,
                    message: "Лог оо оруулна уу!",
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
            </div>
          </Form.Item> */}

          {/* <Divider orientation="right">Системийн дэлгэрэнгуй</Divider> */}
          {/* <Form.Item
            label="Тайлбар"
            name="detailTitle"
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
            label="Зураг"
            name="imageHdrDetail"
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
              onChange={({ fileList }) => setFilesBgImg1(fileList)}
              listType="picture-card"
              fileList={filesBgImg1}
              onRemove={null}
            >
              {filesBgImg1.length >= 1 ? null : "Зураг нэмэх"}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Гарчиг"
            name="requirement"
            rules={[
              {
                required: true,
                message: "requirement мэдээлэл оруулна уу!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
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

          <Form.List name="requirementDescList">
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
                              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                            toolbar:
                              "undo redo | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
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
          </Form.List>
          <Form.Item {...formItemLayoutBtn}>
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
