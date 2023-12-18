import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Skeleton,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import config from "../../../../../config";
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
const Edit = ({ getProject, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filesBgImg, setFilesBgImg] = useState([]);
  const [logoGray, setLogoGray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadinghdrDtl, setLoadingData] = useState(false);
  const [getHdrDtl, setHdrDtl] = useState();
  const [valueDoc, setValue] = useState([{ data: "" }]);
  const [requirement, setRequirement] = useState([{ data: "" }]);
  const [docList, setDocList] = useState([]);
  const showModal = () => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      hdrId: data.id,
    };

    setLoadingData(true);
    axios
      .post("/api/postBT/project/getProjectDetailDoc", body, {
        headers: header,
      })
      .then((res) => {
        setHdrDtl(res.data);
        setValue(res.data.description);
        setDocList(res.data.projectDocumentList);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoadingData(false);
      });
    // setFilesBgImg([
    //   {
    //     uid: "-1",
    //     name: data.image,
    //     status: "done",
    //     url: config.data.uploadUrl + data.image,
    //   },
    // ]);
    // setLogoGray([
    //   {
    //     uid: "-1",
    //     name: data.logoGray,
    //     status: "done",
    //     url: config.data.uploadUrl + data.logoGray,
    //   },
    // ]);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      id: values.id,
      title: values.title,
      description: valueDoc,
      hdrDescription: values.hdrDescription,
      image: "",
      logoGray: "",
      status: values.status,
      projectDocumentList: docList,
    };
    console.log("body: ", body);
    setLoading(true);
    axios
      .post("/api/postBT/project/projectHdrDtlUpdate", body, {
        headers: header,
      })
      .then((res) => {
        message.success(res.data.msg);
      })
      .catch((err) => {
        message.success("error");
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
        setIsModalOpen(false);
        getProject();
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const uploadFileImg = async (options, param) => {
  //   const { onSuccess, file } = options;
  //   if (file.type !== "image/png" && file.type !== "image/jpeg") {
  //     message.error(` Заавал зураг оруулна уу`);
  //     setFilesBgImg([]);
  //   } else {
  //     const fmData = new FormData();
  //     const config = {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     };
  //     fmData.append("file", file);
  //     const res = await axios.post(`/api/upload`, fmData, config);
  //     file.url = `/api/v1/getFile?file=${res.data}`;
  //     file.imgName = res.data;
  //     if (res.status == 200) {
  //       message.success("Амжилтай файл хууллаа");
  //     }
  //     onSuccess("Ok");
  //   }
  // };
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
        icon={<EditOutlined />}
      ></Button>
      <Modal
        title="Төсөл засах"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        {loadinghdrDtl ? (
          <Skeleton active />
        ) : (
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              id: data.id,
              title: data.title,
              hdrDescription: data.description,
              // image: data.image,
              // logoGray: data.logoGray,
              status: data.status,
            }}
            disabled={loading}
          >
            <Form.Item label="ID" name="id">
              <Input disabled={true} />
            </Form.Item>
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
            name="logoGray"
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
              onChange={({ fileList }) => setLogoGray(fileList)}
              listType="picture-card"
              fileList={logoGray}
              onRemove={null}
            >
              {logoGray.length >= 1 ? null : "Зураг нэмэх"}
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
              label="Cистем дэлгэрэнгуй"
              name="hdrDescription"
              rules={[
                {
                  required: true,
                  message: "Cистем дэлгэрэнгуй оруулна уу!",
                },
              ]}
            >
              <TextArea style={{ height: "150px" }} />
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
                  width: 200,
                }}
                // onChange={handleChangeSel}
                options={[
                  {
                    value: 0,
                    label: <div className="text-red-500">Идэвхгүй</div>,
                  },
                  {
                    value: 1,
                    label: <div className="text-green-500">Идэвхтэй</div>,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Дэлгэрэнгуй">
              <div className="mt-4">
                <Editor
                  apiKey="77amhxnucifbte4whcmtbp57f995exk5lyb1e4iqa5dmzm40"
                  onEditorChange={(newValue, editor) => {
                    setValue(newValue);
                  }}
                  onInit={(evt, editor) => {}}
                  value={valueDoc}
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
        )}
      </Modal>
    </div>
  );
};

export default Edit;
