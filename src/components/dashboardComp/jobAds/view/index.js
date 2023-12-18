import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Upload,
  message,
} from "antd";
import axios from "axios";
import {
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import config from "../../../../../config";
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

const View = ({ id, getData, data, url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobAdsDetail, setJobAdsDetail] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [formDisable, setFormDisable] = useState(false);
  const [requirementDescList, setRequirementDescList] = useState();
  const [docList, setDocList] = useState([]);
  const [jobPurposeDescription, setJobPurposeDescription] = useState("");

  const showModal = () => {
    setLoading(true);
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      jobAdsHdrId: data.id,
    };
    // getJobAdsDetailById
    axios
      .post("/api/postBT/jobads/getJobAdsDetailDocById", body, {
        headers: header,
      })
      .then((res) => {
        console.log("res: ", res.data);
        setDocList(res.data.result.jobAdsDocumentList);
        setJobPurposeDescription(res.data.result.jobPurposeDescription);
        // if (res.data.code === 1) {
        //   const requirementList = [];
        //   res.data.result.forEach((element) => {
        //     console.log("element: ", element);
        //     if (element.type === 0) {
        //       setJobAdsDetail(element);
        //       setFileList([
        //         {
        //           uid: "-1",
        //           name: data.image,
        //           status: "done",
        //           url: config.data.uploadUrl + data.image,
        //         },
        //       ]);
        //     } else {
        //       requirementList.push(element.requirementDescription);
        //     }
        //   });
        //   setRequirementDescList(requirementList);
        //   //requirementDescription
        // }
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setJobPurposeDescription("");
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    // console.log("values: ", values);
    console.log("data id=> ", data.id);
    const body1 = {
      id: data.id,
      title: values.title,
      description: values.description,
      image: "",
      quantity: values.quantity,
      type: values.type,

      // detailTitle: values.titleDetail,
      // detailDescription: values.descriptionDetail,
      // detailImage: values.image2.file
      // ? values.image2.file.imgName
      // : values.image2,
      jobAdsDocumentList: docList,
      jobPurpose: "",
      jobPurposeDescription: jobPurposeDescription,
      requirement: "",
      requirementDescription: "",
    };
    console.log("body1: ", body1);

    setFormDisable(true);
    await axios
      .post("/api/postBT/jobads/saveAdsJobUpdate", body1, { headers: header })
      .then((res) => {
        message.success(res.data.msg);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setIsModalOpen(false);
        getData();
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
    const listDoc = [...docList];
    listDoc[index].document = e;
    setDocList(listDoc);
  };
  const requirementFunc = (e, index) => {
    const list = [...docList];
    list[index].documentTitle = e.target.value;
    setDocList(list);
  };
  const handleServiceRemove = (index) => {
    const list = [...docList];
    list.splice(index, 1);
    setDocList(list);
  };
  const addDocument = () => {
    const list = [...docList];
    list.push({
      document: "",
      documentTitle: "",
    });
    setDocList(list);
  };
  return (
    <div>
      <Button
        size="small"
        type="primary"
        onClick={showModal}
        className="bg-blue-500"
        icon={<EyeOutlined />}
      ></Button>
      <Modal
        title="Дэлгэрэнгуй"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <div>
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
              initialValues={{
                title: data.title,
                description: data.description,
                image: data.image,
                quantity: data.quantity,
                type: data.type,

                // titleDetail: jobAdsDetail.title,
                // descriptionDetail: jobAdsDetail.description,
                // image2: jobAdsDetail.image,
                purpose: jobAdsDetail.jobPurpose,
                purposeDescription: jobAdsDetail.jobPurposeDescription,
                requirement: jobAdsDetail.requirement,
                requirementDescList: requirementDescList,
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
                  style={{
                    width: 120,
                  }}
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
              <Form.Item label="Дэлгэрэнгуй" name="jobPurposeDescription">
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

              <Divider orientation="left" orientationMargin={10}>
                Ажлын зарын дэлгэрэнгуй
              </Divider>
              <Form.List name="requirementDescList">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {docList.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "Дэлгэрэнгуй" : ""}
                        required={false}
                        key={index}
                      >
                        <Form.Item noStyle>
                          <Input
                            placeholder="Гарчиг"
                            style={{
                              width: "100%",
                            }}
                            value={field.documentTitle}
                            onChange={(e) => requirementFunc(e, index)}
                          />
                          <div className="mt-4">
                            <Editor
                              apiKey="77amhxnucifbte4whcmtbp57f995exk5lyb1e4iqa5dmzm40"
                              onEditorChange={(e) => editorFunc(e, index)}
                              onInit={(evt, editor) => {}}
                              value={field.document}
                              init={{
                                plugins:
                                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                toolbar:
                                  "undo redo | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                              }}
                            />
                          </div>
                        </Form.Item>
                        <div
                          className=" font-semibold flex gap-1 mt-2 cursor-pointer hover:text-red-500"
                          onClick={() => (
                            remove(field.name), handleServiceRemove(index)
                          )}
                        >
                          <MinusCircleOutlined className="text-red-500" />
                          Устгах
                        </div>
                      </Form.Item>
                    ))}
                    <Form.Item {...formItemLayoutBtn}>
                      <Button
                        type="dashed"
                        onClick={() => addDocument()}
                        style={{
                          width: "100%",
                        }}
                        icon={<PlusOutlined />}
                      >
                        Дэлгэрэнгуй нэмэх
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>

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
              </Form.Item> */}

              {/* <Form.List
                name="requirementDescList"
                rules={[
                  {
                    validator: async (_, requirementDescList) => {
                      if (
                        !requirementDescList ||
                        requirementDescList.length < 2
                      ) {
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
                  Хадгалах
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default View;
