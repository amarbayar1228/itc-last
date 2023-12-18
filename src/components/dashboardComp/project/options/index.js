import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import Add from "./add";
import Delete from "./delete";
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
    dataIndex === "type" ? (
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
    ) : (
      <TextArea />
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
const Options = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loadingTable, setLoadingTable] = useState(false);
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      title: "",
      description: "",
      type: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
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
    console.log("item: ", item);
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    setLoadingTable(true);
    const body = {
      id: item.key,
      title: item.title,
      description: item.description,
      type: item.type,
    };
    await axios
      .post("/api/postBT/project/projectTypeUpdate", body, {
        headers: headers,
      })
      .then((res) => {
        getOption();
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally((err) => {
        props.getProject();
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
      title: "Дэлгэрэнгуй",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      editable: true,
      render: (_, record) => {
        return <div>{record.type === 1 ? "Идэвхтэй" : "Идэвхгүй"}</div>;
      },
    },
    {
      title: "Үйлдэл",
      dataIndex: "operation",
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
              Хадгалах
            </Typography.Link>
            <Popconfirm title="Цуцлахдаа итгэлтэй байна уу?" onConfirm={cancel}>
              <a>Цуцлах</a>
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
              getProject={props.getProject}
              getOption={getOption}
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
        type: col.type,
        dataIndex: col.dataIndex,
        editing: isEditing(record),
      }),
    };
  });
  const showModal = () => {
    getOption();
    setIsModalOpen(true);
  };
  const tableLoad = () => {
    setLoadingTable(true);
  };
  const getOption = async () => {
    setLoadingTable(true);
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
        const originData1 = [];
        res.data.result.forEach((element) => {
          originData1.push({
            key: element.id,
            title: element.title,
            description: element.description,
            type: element.type,
          });
        });
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
        Төслийн төрөл{" "}
      </Button>
      <Modal
        title="Төслийн төрөл"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <Add getProject={props.getProject} getOption={getOption} />
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

export default Options;
