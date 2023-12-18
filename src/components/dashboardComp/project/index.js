import { Badge, Divider, Image, Space, Table, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Add from "./add";
import Delete from "./delete";
import Edit from "./edit";
import Options from "./options";
const ProjectComp = (props) => {
  const [project, setProject] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    if (localStorage.getItem("token")) {
      setLoadingTable(true);
      const body = {
        page: 0,
        size: 10,
      };
      await axios
        .post("/api/post/project/getProject", body)
        .then((res) => {
          setProject(res.data.result);
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
      title: <div>Нэр</div>,
      dataIndex: "title",
      key: "title",
      // width: 120,
      ellipsis: true,
    },
    {
      title: <div>Дэлгэрэнгуй</div>,
      dataIndex: "description",
      key: "description",
      // width: 120,
      ellipsis: true,
    },
    {
      title: <div>Төлөв</div>,
      dataIndex: "type",
      key: "type",
      width: 120,
      sorter: (a, b) => a.type - b.type,
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

  const data = project.map((e, i) => ({
    key: i,
    title: e.title,
    description: e.description,
    createdDateStr: e.createdDateStr,
    type: e.type,
    id: e.id,
    hdrs: e.projectHdrs,
  }));
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
        dataIndex: "title",
        key: "title",
      },
      // {
      //   title: <div>Лого</div>,
      //   dataIndex: "image",
      //   key: "image",
      //   width: 80,
      //   render: (img) => (
      //     <div>
      //       <Image alt="ITC" preview={true} src={config.data.uploadUrl + img} />
      //     </div>
      //   ),
      //   ellipsis: true,
      // },
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
            <Edit data={params} getProject={getProject} />
            {/* <ProjectDetal getProject={getProject} id={params.id} /> */}
            <Delete getProject={getProject} id={params.id} />
          </Space>
        ),
      },
    ];
    const data = params.hdrs
      ? params.hdrs.map((e, i) => ({
          key: i,
          title: e.title,
          description: e.description,
          createdDateStr: e.createdDateStr,
          image: e.image,
          type: e.type,
          status: e.status,
          id: e.id,
          operation: e,
        }))
      : [];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  return (
    <div>
      <div className="grid grid-cols-4 items-center">
        <Divider orientation="left" className="col-span-3">
          Төсөл
        </Divider>
        <div className="flex justify-end gap-2">
          <Add getProject={getProject} URL={props.props.URL} />
          <Options getProject={getProject} URL={props.props.URL} />
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
export default ProjectComp;
