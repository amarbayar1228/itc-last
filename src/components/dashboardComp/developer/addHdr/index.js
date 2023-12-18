import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  Popconfirm,
  Table,
  Typography,
  message,
  Image,
} from "antd";
import axios from "axios";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

import Add from "./add";
import Delete from "./delete";
import config from "../../../../../config";

const AddDevHdr = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loadingTable, setLoadingTable] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imgName, setImageName] = useState();
  const isEditing = (record) => record.key === editingKey;
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      dataIndex === "status" ? (
        <Select
          defaultValue={1}
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
      ) : dataIndex === "image" ? (
        <Upload
          style={{ display: "flex" }}
          multiple={false}
          accept="jpg"
          customRequest={(option) => uploadFileImg(option, 0)}
          onChange={uploadFunc}
          listType="picture-card"
          fileList={fileList}
          onRemove={null}
        >
          {fileList.length >= 1 ? null : "Зураг нэмэх"}
        </Upload>
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const uploadFileImg = async (options, param) => {
    const { onSuccess, file } = options;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error(` Заавал зураг оруулна уу`);
      setFileList([]);
    } else {
      // const fmData = new FormData();
      // const config = {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // };
      // fmData.append("file", file);
      // const res = await axios.post(`/api/upload`, fmData, config);
      // file.url = `/api/v1/getFile?file=${res.data}`;
      // file.imgName = res.data;
      // if (res.status == 200) {
      //   message.success("Амжилтай файл хууллаа");
      // }
      // setImageName(res.data);
      // // setFileList(file);
      // onSuccess("Ok");
    }
  };
  const edit = (record) => {
    setFileList([
      {
        uid: "-1",
        name: record.image,
        status: "done",
        url: config.data.uploadUrl + record.image,
      },
    ]);
    setImageName(record.image);

    form.setFieldsValue({
      title: "",
      type: "",
      image: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const uploadFunc = async ({ fileList }) => {
    if (fileList.length > 0) {
      fileList[0].status = "done";
      const fmData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      fmData.append("file", fileList[0].originFileObj);
      const res = await axios.post(`/api/upload`, fmData, config);
      setImageName(res.data);

      setFileList(fileList);
    } else {
      setFileList(fileList);
    }
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];

        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        const item2 = newData[index];
        item2.image = imgName;

        updateOption(item2);
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const updateOption = async (item) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    setLoadingTable(true);
    const body = {
      id: item.key,
      title: item.title,
      image: item.image,
      status: item.status,
    };
    await axios
      .post("/api/postBT/developer/devHdrUpdate", body, {
        headers: headers,
      })
      .then((res) => {
        getDevHdr();
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally((err) => {
        props.getDeveloper();
        setLoadingTable(false);
      });
  };
  const columns = [
    {
      title: "Нэр",
      dataIndex: "title",
      editable: true,
    },
    {
      title: "Зураг",
      dataIndex: "image",
      editable: true,
      width: 100,
      render: (img) => (
        <div>
          <Image alt="ITC" preview={true} src={config.data.uploadUrl + img} />
        </div>
      ),
    },
    {
      title: "Төрөл",
      dataIndex: "status",
      editable: true,
      width: 120,
      render: (_, record) => {
        return <div>{record.status === 1 ? "Идэвхтэй" : "Идэвхгүй"}</div>;
      },
    },
    {
      title: "Үйлдэл",
      dataIndex: "operation",
      width: 120,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div className="flex gap-2">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </Typography.Link>
            <Delete
              id={record.key}
              getDeveloper={props.getDeveloper}
              getDevHdr={getDevHdr}
              tableLoad={tableLoad}
            />
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        title: col.title,
        status: col.status,
        image: col.image,
        dataIndex: col.dataIndex,
        editing: isEditing(record),
      }),
    };
  });
  const showModal = () => {
    getDevHdr();
    setIsModalOpen(true);
  };
  const tableLoad = () => {
    setLoadingTable(true);
  };
  const getDevHdr = async () => {
    setLoadingTable(true);
    const body = {
      page: 0,
      size: 4,
    };
    await axios
      .post("/api/post/developer/getDevHdr", body)
      .then((res) => {
        const originData1 = [];
        if (res.data.code === 1) {
          res.data.result.forEach((element) => {
            originData1.push({
              key: element.id,
              title: element.title,
              image: element.image,
              status: element.status,
              type: element.type,
            });
          });
        }
        setData(originData1);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-end mb-2">
      <Button
        type="dashed"
        onClick={showModal}
        style={{ width: "100%" }}
        icon={<PlusOutlined />}
      >
        {" "}
        Алба{" "}
      </Button>
      <Modal
        title="Алба"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <Add getDeveloper={props.getDeveloper} getDevHdr={getDevHdr} />
        <Form form={form} component={false}>
          <Table
            loading={loadingTable}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AddDevHdr;
