import Link from "next/link";
import Arrow from "../assist/arrow";
import Title from "../title";
import { useEffect, useState } from "react";
import axios from "axios";
import { Empty, Skeleton } from "antd";

const ProjectComp = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProject();
  }, []);
  const getProject = () => {
    setLoading(true);
    const body = {
      page: 0,
    };
    axios
      .get("/api/post/project/getProjectActive", body)
      .then((res) => {
        if (res.data.code === 1) {
          setData(res.data.result);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="max-w-[1400px] mx-auto mt-4">
      <div className="bg-white">
        <Title name="Хэрэгжүүлж буй төслүүд" />
      </div>
      <div
        className={
          loading
            ? "grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 text-brand-50 bg-white"
            : "grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 text-brand-50"
        }
      >
        {loading ? (
          <>
            <Skeleton active className="pr-8 pl-8" />
            <Skeleton active className="pr-8" />
            <Skeleton active className="pr-8 mb-8" />
          </>
        ) : data ? (
          data.map((e, i) => (
            <Link
              key={i}
              href={`/project/${e.id}`}
              className="px-9 py-6 border cursor-pointer hover:border-brand-50 group bg-white"
            >
              <div className="flex justify-between items-center text-xl font-semibold mb-2">
                <div>{e.title}</div>
                <div className="group-hover:translate-x-4 duration-300 flex items-center pr-1">
                  <Arrow />
                </div>
              </div>
              <div className="text-sm text-justify leading-5 font-light">
                {e.description}
              </div>
            </Link>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default ProjectComp;
