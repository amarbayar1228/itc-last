import { Badge, Divider, Image, Table, Tooltip } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import Add from "./add";
import Delete from "./delete";
import View from "./view";
import config from "../../../../config";

const JobAdsComp = (props) => {
  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoadingTable(true);
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      a: 0,
    };
    axios
      .post("/api/postBT/jobads/getJobAds", body, { headers: header })
      .then((res) => {
        if (res.data.code === 1) {
          setData(res.data.result);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };
  const handleTableChange = (pagination, filters, sorter) => {};

  const columns = [
    {
      title: <div>Огноо</div>,
      dataIndex: "createdDateStr",
      key: "createdDateStr",
      // width: 120,
      fixed: "left",
      ellipsis: true,
    },
    // {
    //   title: <div>Зураг</div>,
    //   dataIndex: "image",
    //   key: "image",
    //   width: 100,
    //   render: (img) => (
    //     <div>
    //       <Image
    //         alt="Obertech"
    //         preview={true}
    //         src={config.data.uploadUrl + img}
    //       />
    //     </div>
    //   ),
    //   ellipsis: true,
    // },
    {
      title: <div>Гарчиг</div>,
      dataIndex: "title",
      key: "title",
      // width: 120,
      ellipsis: true,
    },
    {
      title: <div>Дэлгэрэнгүй</div>,
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: <div>Тоо ширхэг</div>,
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: true,
      width: 110,
    },
    {
      title: "Төлөв",
      key: "type",
      sorter: (a, b) => a.type - b.type,
      render: (a) => (
        <Tooltip title={a.type === 1 ? "Идэвхтэй" : "Идэвхгүй"}>
          <Badge
            status={a.type === 1 ? "success" : "error"}
            text={a.type === 1 ? "Идэвхтэй" : "Идэвхгүй"}
          />
        </Tooltip>
      ),
    },
    {
      title: <div>Үйлдэл</div>,
      key: "id",
      fixed: "right",
      width: 140,
      render: (params) => (
        <div>
          <div className="flex gap-2">
            <View getData={getData} id={params.id} data={params} />
            <Delete getData={getData} id={params.id} url={props.props.URL} />
          </div>
        </div>
      ),
    },
  ];

  const tableData = data
    ? data.map((e, i) => ({
        key: i,
        id: e.id,
        title: e.title,
        description: e.description,
        quantity: e.quantity,
        image: e.image,
        type: e.type,
        createdDateStr: e.createdDateStr,
      }))
    : [];
  return (
    <div>
      <div className="grid grid-cols-4 items-center">
        <Divider orientation="left" className="col-span-3">
          Ажлын зарууд
        </Divider>
        <Add getData={getData} URL={props.props.URL} />
      </div>
      <Table
        size="middle"
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 1000, y: 500 }}
        loading={loadingTable}
        onChange={handleTableChange}
      />
    </div>
  );
};
export default JobAdsComp;
