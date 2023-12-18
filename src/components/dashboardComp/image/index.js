import { Button, Divider, Input, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../../config";
import Add from "./add";
import Image from "next/image";
import { ReloadOutlined } from "@ant-design/icons";
import Delete from "./delete";
const { Paragraph } = Typography;
const ImageComponent = ({ getUrl }) => {
  const [getData, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  useEffect(() => {
    getImages();
  }, []);
  const getImages = async () => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      g: 0,
    };
    setLoadingTable(true);
    await axios
      .post("/api/postBT/main/images", body, { headers: header })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };
  const columns = [
    {
      title: <div>Нэр</div>,
      dataIndex: "name",
      key: "name",
      width: 200,
      ellipsis: true,
    },
    {
      title: <div>Зураг линк</div>,
      dataIndex: "url",
      key: "url",
      ellipsis: true,
      render: (url) => (
        <div className="flex text-left items-center gap-2">
          <Paragraph
            copyable={{ text: url }}
            strong
            type="success"
            style={{ marginBottom: 0 }}
          ></Paragraph>
          {url}
        </div>
      ),
    },
    {
      title: <div>Зураг</div>,
      dataIndex: "image",
      key: "image",
      width: 200,
      render: (img) => (
        <div>
          <Image
            alt="ITC"
            height={80}
            width={80}
            preview={true}
            src={config.data.uploadUrl + img}
          />
        </div>
      ),
      ellipsis: true,
    },
    {
      title: <div>Үйлдэл</div>,
      key: "id",
      fixed: "right",
      width: 140,
      render: (params) => (
        <div>
          <div className="flex gap-2">
            <Delete getData={getImages} id={params.id} url={getUrl} />
          </div>
        </div>
      ),
    },
  ];

  const data =
    getData.length > 0
      ? getData.map((e, i) => ({
          key: i,
          id: e.id,
          name: e.name,
          image: e.image,
          url: e.url,
        }))
      : [];

  const searchImgs = async (event) => {
    const searchData = event.target.value;
    if (searchData.length > 3) {
      const header = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const body = {
        name: searchData,
      };
      setLoadingTable(true);
      await axios
        .post("/api/postBT/main/searchImage", body, { headers: header })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log("err: ", err);
        })
        .finally(() => {
          setLoadingTable(false);
        });
    }
  };
  return (
    <div>
      <div className="grid grid-cols-4 items-center">
        <Divider orientation="left" className="col-span-3">
          Зураг
        </Divider>
        <div className="w-full flex justify-end mb-2 px-2">
          <Button
            onClick={getImages}
            icon={<ReloadOutlined style={{ padding: "0px 5px" }} />}
          ></Button>
          <Input
            allowClear
            placeholder="Хайх"
            size="small"
            onChange={searchImgs}
            className="mr-2"
          />
          <Add getData={getImages} url={getUrl} />
        </div>
      </div>
      <Table
        size="middle"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 500 }}
        loading={loadingTable}
      />
    </div>
  );
};
export default ImageComponent;
