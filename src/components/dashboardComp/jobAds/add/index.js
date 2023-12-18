import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
  message,
  InputNumber,
  Divider,
} from "antd";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  const [fileList, setFileList] = useState([]);
  const [formDisable, setFormDisable] = useState(false);
  const [form] = Form.useForm();
  const [jobPurposeDescription, setJobPurposeDescription] = useState("");
  const [valueDoc, setValue] = useState([{ data: "" }]);
  const [requirement, setRequirement] = useState([{ data: "" }]);
  const showModal = () => {
    setFormDisable(false);
    setFileList([]);
    setJobPurposeDescription("");
    setIsModalOpen(true);

    setRequirement([]);
    setValue([]);
    form.resetFields();
  };
  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setJobPurposeDescription("");
  };

  const onFinish = async (values) => {
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
    const body1 = {
      title: values.title,
      description: values.description,
      image: "",
      quantity: values.quantity,
      type: 0,
      jobPurpose: "",
      jobPurposeDescription: jobPurposeDescription,
      requirement: "",
      requirementDescription: "",
      jobAdsDocumentList: docList,
    };
    setFormDisable(true);
    await axios
      .post("/api/postBT/jobads/saveAdsJob", body1, { headers: header })
      .then((res) => {
        message.success(res.data.msg);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setIsModalOpen(false);
        props.getData();
        setFormDisable(false);
        setJobPurposeDescription("");
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
    <div className="flex justify-end mb-2">
      <Button type="primary" onClick={showModal} className="bg-blue-500">
        Ажлын зар +
      </Button>
      <Modal
        width={900}
        title="Ажлын зар нэмэх"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
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
            status: 1,
            ytubeUrl: "0",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={formDisable}
        >
          {/* <Form.Item
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
          </Form.Item> */}
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
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Тоо ширхэг"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Тоо ширхэг ээ оруулна уу!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Divider orientation="left" orientationMargin={10}>
            Ажлын зарын дэлгэрэнгуй
          </Divider>

          {/* <Form.Item
            label="Зураг"
            name="image2"
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
            label="Гарчиг"
            name="titleDetail"
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
            name="descriptionDetail"
            rules={[
              {
                required: true,
                message: "Дэлгэрэнгуй мэдээлэл оруулна уу!",
              },
            ]}
          >
            <TextArea />
          </Form.Item> */}

          {/* <Form.Item
            label="Зорилго"
            name="purpose"
            rules={[
              {
                required: true,
                message: "Гарчиг аа оруулна уу!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item label="Дэлгэрэнгуй" name="">
            <div className="mt-4">
              <Editor
                apiKey="77amhxnucifbte4whcmtbp57f995exk5lyb1e4iqa5dmzm40"
                onEditorChange={(newValue, editor) => {
                  setJobPurposeDescription(newValue);
                }}
                onInit={(evt, editor) => {}}
                value={jobPurposeDescription}
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

          {/* <Form.Item
            label="Тавигдах шаардлага гарчиг"
            name="requirement"
            rules={[
              {
                required: true,
                message: "Гарчиг аа оруулна уу!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.List
            name="requirementDescList"
            rules={[
              {
                validator: async (_, requirementDescList) => {
                  if (!requirementDescList || requirementDescList.length < 2) {
                    return Promise.reject(
                      new Error("Тавигдах шаардлага 2-оос дээш байх ёстой")
                    );
                  }
                },
              },
            ]}
          >
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
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Талбарыг бөглөнө үү!",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Тавигдах шаардлага"
                        style={{
                          width: "94%",
                        }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="ml-2"
                        onClick={() => remove(field.name)}
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
              offset: 20,
              span: 14,
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
