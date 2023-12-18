import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

const Delete = (props) => {
  const [loading, setLoading] = useState(false);
  const deleteFunc = async () => {
    setLoading(true);
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      id: props.id,
    };
    axios
      .post("/api/postBT/project/projectHdrDetailDelete", body, {
        headers: headers,
      })
      .then((res) => {
        message.success(res.data.msg);
        props.getProject();
      })
      .catch((er) => {
        console.log("er", er);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        okText={"Тийм"}
        okType={"default"}
        onConfirm={deleteFunc}
        cancelText="Үгүй"
      >
        <Button
          size="small"
          loading={loading}
          icon={<DeleteOutlined color="red" />}
        ></Button>
      </Popconfirm>
    </div>
  );
};
export default Delete;
