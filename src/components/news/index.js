import { Skeleton } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import config from "../../../config";

const News = () => {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const [pageTotal, setPageTotal] = useState(10);
  const router = useRouter();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoad(true);
    const body = {
      page: 0,
      size: 4,
    };
    await axios
      .post("/api/post/main/getNewsActive", body)
      .then((res) => {
        setPosts(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <div className="bg-white max-w-[1400px] mx-auto mt-4 text-brand-50 text-base font-semibold py-6 px-9 max-md:w-full">
      <div className="grid grid-cols-4 gap-6 max-md:overflow-auto max-md:w-full w-full max-md:flex">
        {load ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : posts ? (
          posts.map((post, i) => (
            <Link
              href={`/news/${post.id}`}
              className="flex flex-col group max-md:w-40 max-md:pb-6"
              key={i}
            >
              <div className="relative block overflow-hidden group bg-cover bg-no-repeat bg-gray-100">
                <Image
                  priority={true}
                  className="transition duration-300 ease-in-out group-hover:scale-110 cursor-pointer bg-no-repeat max-md:w-full max-md:h-full w-full h-56"
                  // src={"/images/news/news2.jpg"}
                  src={config.data.uploadUrl + post.image}
                  alt="ITC"
                  width={500}
                  height={500}
                />
              </div>
              <div className="text-left mt-4 group-hover:underline group-hover:underline-offset-4 max-md:truncate">
                {post.title}
              </div>
            </Link>
          ))
        ) : null}
      </div>
    </div>
  );
};
export default News;
