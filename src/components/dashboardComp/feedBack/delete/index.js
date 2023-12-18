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
      .post("/api/postBT/main/deleteFeedBackId", body, { headers: headers })
      .then((res) => {
        message.success(res.data);
        props.getdata();
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
          loading={loading}
          size="small"
          icon={<DeleteOutlined className="text-red-500" />}
        ></Button>
      </Popconfirm>
    </div>
  );
};
export default Delete;
