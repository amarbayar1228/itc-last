import { Badge, Divider, Image, Table, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../../config";
import Add from "./add";
import Delete from "./delete";
import Edit from "./edit";

const BannerComponent = (props) => {
  const [getData, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    getBanner();
  }, []);

  const getBanner = async () => {
    setLoadingTable(true);
    const body = {
      page: 0,
      size: 10,
    };
    await axios
      .post("/api/post/banner/getBanner", body)
      .then((res) => {
        setData(res.data.result);
        setLoadingTable(false);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const columns = [
    {
      title: <div>Огноо</div>,
      dataIndex: "createdDateStr",
      key: "createdDateStr",
      width: 160,
      fixed: "left",
      ellipsis: true,
    },
    {
      title: <div>Зураг</div>,
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (img) => (
        <div>
          <Image
            alt="Obertech"
            preview={true}
            src={config.data.uploadUrl + img}
          />
        </div>
      ),
      ellipsis: true,
    },
    {
      title: <div>Нэр</div>,
      dataIndex: "title",
      key: "title",
      // width: 120,
      ellipsis: true,
    },
    {
      title: <div>Төлөв</div>,
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status - b.status,
      width: 90,
      render: (status) => (
        <div>
          <Tooltip title={"Идэвхтэй"}>
            <Badge status={"success"} text={"Идэвхтэй"} />
          </Tooltip>
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
            {/* <Button size="small" icon={<EditOutlined />}></Button> */}
            <Edit getBanner={getBanner} id={params.id} data={params} />
            <Delete getBanner={getBanner} id={params.id} />
          </div>
        </div>
      ),
    },
  ];

  const data =
    getData.length > 0
      ? getData.map((e, i) => ({
          key: i,
          title: e.title,
          createdDateStr: e.createdDateStr,
          type: e.type,
          image: e.image,
          id: e.id,
          tags: [e.type === 0 ? "nice" : "developer"],
        }))
      : [];
  return (
    <div>
      <div className="grid grid-cols-4 items-center">
        <Divider orientation="left" className="col-span-3">
          Banner
        </Divider>
        <Add getBanner={getBanner} />
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
export default BannerComponent;
