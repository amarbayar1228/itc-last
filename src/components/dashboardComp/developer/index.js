import { Badge, Divider, Image, Space, Table, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../../config";
import AddDevDetail from "./addDetail";
import AddDevHdr from "./addHdr";
import Edit from "./edit";
import Delete from "./delete";
import { useRouter } from "next/router";
const DeveloperComp = () => {
  const [dev, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [addHdrDialog, setAddHdrDialog] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getDeveloper();
  }, []);

  const getDeveloper = async () => {
    if (localStorage.getItem("token")) {
      setLoadingTable(true);
      const header = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const body = {
        page: 0,
        size: 10,
      };
      await axios
        .post("/api/postBT/developer/getDeveloper", body, { headers: header })
        .then((res) => {
          setData(res.data.result);
        })
        .catch((err) => {
          console.log("err: ", err);
        })
        .finally(() => {
          setLoadingTable(false);
        });
    }
  };

  const columns = [
    {
      title: <div>Огноо</div>,
      dataIndex: "createdDateStr",
      key: "createdDateStr",
      width: 160,
      fixed: "left",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      ellipsis: true,
    },
    {
      title: <div>Зураг</div>,
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (img) => (
        <div>
          <Image alt="ITC" preview={true} src={config.data.uploadUrl + img} />
        </div>
      ),
      ellipsis: true,
    },
    {
      title: <div>Албаны нэр</div>,
      dataIndex: "title",
      key: "title",
      // width: 120,
      ellipsis: true,
    },

    {
      title: <div>Төлөв</div>,
      dataIndex: "status",
      key: "status",
      width: 120,
      sorter: (a, b) => a.status - b.status,
      render: (a) => (
        <div>
          <Tooltip title={a === 1 ? "Идэвхтэй" : "Идэвхгүй"}>
            <Badge
              status={a === 1 ? "success" : "error"}
              text={a === 1 ? "Идэвхтэй" : "Идэвхгүй"}
              // style={{ color: "red" }}
            />
          </Tooltip>
        </div>
      ),
      ellipsis: true,
    },
  ];

  const data = dev
    ? dev.map((e, i) => ({
        key: i,
        title: e.title,
        image: e.image,
        createdDateStr: e.createdDateStr,
        type: e.type,
        status: e.status,
        id: e.id,
        developerDetails: e.developerDetails,
      }))
    : [];
  const expandedRowRender = (params) => {
    const columns = [
      {
        title: "Date",
        dataIndex: "createdDateStr",
        key: "createdDateStr",
        width: 140,
      },
      {
        title: "Нэр",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "Албан тушаал",
        dataIndex: "jobPosition",
        key: "jobPosition",
        render: (params) => (
          <div>
            {params === 0
              ? "Албаны менежер"
              : params === 1
              ? "Ахлах"
              : "Мэргэжилтэн"}
          </div>
        ),
      },
      {
        title: <div>Зураг</div>,
        dataIndex: "image",
        key: "image",
        width: 80,
        render: (img) => (
          <div>
            <Image alt="ITC" preview={true} src={config.data.uploadUrl + img} />
          </div>
        ),
        ellipsis: true,
      },
      {
        title: "Төлөв",
        key: "status",
        sorter: (a, b) => a.status - b.status,
        render: (a) => (
          <Tooltip title={a.status === 1 ? "Идэвхтэй" : "Идэвхгүй"}>
            <Badge
              status={a.status === 1 ? "success" : "error"}
              text={a.status === 1 ? "Идэвхтэй" : "Идэвхгүй"}
            />
          </Tooltip>
        ),
      },
      {
        title: "Үйлдэл",
        dataIndex: "operation",
        width: 120,
        key: "operation",
        render: (params) => (
          <Space size="small">
            <Edit data={params} getDeveloper={getDeveloper} />
            <Delete getDeveloper={getDeveloper} id={params.id} />
          </Space>
        ),
      },
    ];
    const data = params.developerDetails
      ? params.developerDetails.map((e, i) => ({
          key: i,
          fullName: e.fullName,
          createdDateStr: e.createdDateStr,
          image: e.image,
          type: e.type,
          status: e.status,
          id: e.id,
          jobPosition: e.jobPosition,
          operation: e,
        }))
      : [];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  return (
    <div>
      <div className="grid grid-cols-3 items-center">
        <Divider orientation="left" className="col-span-2">
          Team
        </Divider>
        <div className="flex justify-end mb-2 gap-2">
          <AddDevDetail getDeveloper={getDeveloper} />
          <AddDevHdr getDeveloper={getDeveloper} />
        </div>
      </div>
      <Table
        loading={loadingTable}
        columns={columns}
        scroll={{ y: 450 }}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={data}
      />
    </div>
  );
};
export default DeveloperComp;
