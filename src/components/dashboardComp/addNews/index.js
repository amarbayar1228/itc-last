import { Badge, Divider, Image, Table, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Add from "./add";
import Delete from "./delete";
import Edit from "./edit";
import config from "../../../../config";

const AddNews = (props) => {
  const [news, setNews] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    setLoadingTable(true);
    const body = {
      page: 0,
      size: 10,
    };
    await axios
      .post("/api/post/main/getNews", body)
      .then((res) => {
        console.log("res: ", res.data);
        setNews(res.data.result);
        setTableParams({
          ...tableParams,
          pagination: {
            current: 1,
            pageSize: 10,
            total: res.data.totalItems,
          },
        });
        setLoadingTable(false);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setLoadingTable(true);
    const body = {
      page: pagination.current - 1,
      size: pagination.pageSize,
    };
    axios
      .post("/api/post/main/getNews", body)
      .then((res) => {
        console.log("res: ", res.data);
        setNews(res.data.result);
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
      // width: 120,
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
      title: <div>Дэлгэрэнгүй</div>,
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: <div>Арын Зураг</div>,
      dataIndex: "backgroundImage",
      key: "backgroundImage",
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
      title: <div>Link</div>,
      dataIndex: "ytubeUrl",
      key: "ytubeUrl",
      ellipsis: true,
      width: 110,
    },
    {
      title: <div>Төлөв</div>,
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status - b.status,
      width: 90,
      render: (status) => (
        <div>
          <Tooltip
            title={
              status === 3 ? "Идэвхтэй" : status === 1 ? "Идэвхгүй" : "Идэвхгүй"
            }
          >
            <Badge
              status={
                status === 3 ? "success" : status === 1 ? "error" : "error"
              }
              text={
                status === 3
                  ? "Идэвхтэй"
                  : status === 1
                  ? "Идэвхгүй"
                  : "Идэвхгүй"
              }
            />
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
            <Edit
              getNews={getNews}
              id={params.id}
              url={props.props.URL}
              data={params}
            />
            <Delete getNews={getNews} id={params.id} url={props.props.URL} />
          </div>
        </div>
      ),
    },
  ];

  const data =
    news.length > 0
      ? news.map((e, i) => ({
          key: i,
          title: e.title,
          createdDateStr: e.createdDateStr,
          type: e.type,
          image: e.image,
          ytubeUrl: e.ytubeUrl,
          backgroundImage: e.backgroundImage,
          status: e.status,
          description: e.description,
          id: e.id,
          tags: [e.type === 0 ? "nice" : "developer"],
        }))
      : [];
  return (
    <div>
      <div className="grid grid-cols-4 items-center">
        <Divider orientation="left" className="col-span-3">
          Мэдээ мэдээлэл
        </Divider>
        <Add getNews={getNews} URL={props.props.URL} />
      </div>
      <Table
        size="middle"
        pagination={tableParams.pagination}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1000, y: 500 }}
        loading={loadingTable}
        onChange={handleTableChange}
      />
    </div>
  );
};
export default AddNews;
