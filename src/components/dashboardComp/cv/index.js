import { Divider, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Delete from "./delete";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
const CvComponent = (props) => {
  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setLoadingTable(true);
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      page: 0,
      size: 10,
    };
    await axios
      .post("/api/postBT/jobads/getCV", body, { headers: header })
      .then((res) => {
        setData(res.data.result);
        // setTableParams({
        //   ...tableParams,
        //   pagination: {
        //     current: 1,
        //     pageSize: 10,
        //     total: res.data.totalItems,
        //   },
        // });
        setLoadingTable(false);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const handleTableChange = (pagination, filters, sorter) => {
    console.log("pagination: ", pagination);
    setLoadingTable(true);
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const body = {
      page: pagination.current - 1,
      size: pagination.pageSize,
    };
    axios
      .post("/api/postBT/main/getFeedBack", body, { headers: header })
      .then((res) => {
        console.log("res: ", res.data);
        setData(res.data.result);
        setTableParams({
          ...tableParams,
          pagination: {
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: res.data.totalItems,
          },
        });
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
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      ellipsis: true,
    },
    {
      title: <div>Овог</div>,
      dataIndex: "lastName",
      key: "lastName",
      // width: 120,
      ellipsis: true,
    },
    {
      title: <div>Нэр</div>,
      dataIndex: "firstName",
      key: "firstName",
      // width: 120,
      ellipsis: true,
    },
    {
      title: <div>Имэйл</div>,
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: <div>Утасны дугаар</div>,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      title: <div>Боловсрол</div>,
      dataIndex: "education",
      key: "education",
      ellipsis: true,
    },
    {
      title: <div>Ажлын зар</div>,
      dataIndex: "jobAdsHdrTitle",
      key: "jobAdsHdrTitle",
      ellipsis: true,
    },
    {
      title: <div>Үйлдэл</div>,
      key: "key",
      width: 100,
      render: (params) => (
        <div>
          <div className="flex gap-2">
            {/* <Button size="small" icon={<EditOutlined />}></Button> */}
            <Link
              href={`/api/v1/getPdf?file=${params.fileName}`}
              passHref={true}
              target="_blank"
            >
              <EyeOutlined />
            </Link>
            <Delete getdata={getdata} id={params.id} url={props.props.URL} />
          </div>
        </div>
      ),
    },
  ];

  const data1 = data.map((e, i) => ({
    key: i,
    firstName: e.firstName,
    createdDateStr: e.createdDateStr,
    lastName: e.lastName,
    email: e.email,
    phoneNumber: e.phoneNumber,
    education: e.education,
    jobAdsHdrTitle: e.jobAdsHdrTitle,
    fileName: e.fileName,
    id: e.id,
  }));
  return (
    <div>
      <Divider orientation="left">Анкет</Divider>
      <Table
        size="middle"
        pagination={tableParams.pagination}
        columns={columns}
        dataSource={data1}
        scroll={{ x: 1000, y: 500 }}
        loading={loadingTable}
        onChange={handleTableChange}
      />
    </div>
  );
};
export default CvComponent;
