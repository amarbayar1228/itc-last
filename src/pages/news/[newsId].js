import Arrow from "@/components/assist/arrow";

import { ClockCircleOutlined } from "@ant-design/icons";
import ArrowL from "@/components/assist/arrowL";
import SimpleMotion from "@/components/assist/simpleMotion";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import { Collapse, Empty, Image } from "antd";
import Head from "next/head";

import Link from "next/link";
import config from "../../../config";
import axios from "axios";
import { Roboto, Exo_2 } from "next/font/google";
const inter = Exo_2({
  subsets: ["latin"],
  weight: "400",
});

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.ITC_GOV_SERVICE_URL}` + "/main/news");
  const data = await res.json();
  const paths = data.map((post) => {
    return {
      params: {
        newsId: `${post.id}`,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `${process.env.ITC_GOV_SERVICE_URL}` +
      "/main/getNewsIdDoc?id=" +
      `${params.newsId}`
  );
  const data = await res.json();

  const news = [];
  const body = {
    page: 0,
    size: 100,
  };
  // bvh news
  await axios
    .post(`${process.env.ITC_GOV_SERVICE_URL}` + "/main/getNewsActive", body)
    .then((res) => {
      news.push(res.data.result);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
  const newsType2 = [];
  // ontsloh medee
  await axios
    .post(`${process.env.ITC_GOV_SERVICE_URL}` + "/main/getNewsType2", body)
    .then((res) => {
      if (res.data) {
        newsType2.push(res.data);
      }
    })
    .catch((err) => {
      console.log("ontsloh medee: ", err);
    });
  return {
    props: {
      post: data.length > 0 ? data : null,
      news: news.length > 0 ? news[0] : null,
      newsType2: newsType2.length > 0 ? newsType2[0] : null,
    },
    revalidate: 10,
  };
};
const NewsId = ({ post, news, newsType2 }) => {
  return (
    <div>
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb
        title="Мэдээ мэдээлэл"
        name={post ? post[0].title : ""}
        router={"news"}
        routerId={"id"}
      />
      <SimpleMotion>
        {/*an*/}
        <div className="mt-4 max-w-[1400px] mx-auto text-brand-50">
          {post ? (
            <div className="flex gap-4 max-md:flex-col">
              <div className="w-3/4 max-md:w-full bg-white">
                <div className="bg-gray-200 h-[323px]  max-md:h-full">
                  <Image
                    style={{ height: "323px", width: "1038px" }}
                    // src={"/images/background/background3.png"}
                    className="max-md:w-full max-md:h-full"
                    src={config.data.uploadUrl + post[0].backgroundImage}
                    alt="ITC GOV"
                  />
                </div>

                <div className="  bg-white ">
                  <div className="flex items-start justify-between">
                    <Title name={post[0].title} />
                    <div className="bg-brand-50 px-4 py-1 my-6 text-gray-100 flex items-center text-sm w-36">
                      <div className="flex items-center pr-2">
                        <ClockCircleOutlined />
                      </div>
                      <div className="flex items-center">
                        {post[0].createdDateStr.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <div className="text-justify text-sm h-[229px] max-h-full bg-white">
                    <div
                      className={`${inter.className}`}
                      style={{
                        backgroundColor: "#fff",
                        paddingLeft: "36px",
                        paddingRight: "36px",
                      }}
                    >
                      <div
                        className="name text-brand-50 pb-8"
                        dangerouslySetInnerHTML={{
                          __html: post[0].description,
                        }}
                      ></div>
                    </div>
                  </div>
                  {/* {post[0].docTitle ? (
                    <div className="text-brand-50 mt-10 px-9">
                      <Collapse
                        style={{
                          background: "#fff",
                          borderRadius: "0px",

                          borderRight: "0px",
                          borderLeft: "0px",
                        }}
                        expandIconPosition="end"
                        items={post.map((e, i) => ({
                          key: i,
                          label: (
                            <div className="font-medium text-lg text-brand-50">
                              {e.docTitle}
                            </div>
                          ),
                          children: (
                            <div
                              className="name text-brand-50"
                              dangerouslySetInnerHTML={{ __html: e.document }}
                            ></div>
                          ),
                        }))}
                        // defaultActiveKey={["1"]}
                      />
                    </div>
                  ) : null} */}
                </div>
              </div>
              <div className="w-1/4 max-md:w-full">
                <div className="bg-white">
                  <div className="w-full p-6 text-brand-50 font-semibold text-xl ">
                    Бусад мэдээ
                  </div>
                  <div className="flex flex-col gap-2 px-6 text-brand-50 font-medium h-[232px]  overflow-auto text-sm">
                    {news ? (
                      news.map((e, i) => (
                        <Link
                          key={i}
                          href={`/news/${e.id}`}
                          className="flex items-center gap-4 hover:translate-x-2 duration-300 group"
                        >
                          <Arrow name={"black"} />
                          <div className="group-hover:underline group-hover:underline-offset-8 group-hover:text-brand-50 leading-5 w-11/12">
                            {e.title}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <Empty />
                    )}
                  </div>
                </div>
                <div className="mt-4 bg-white group h-[304px]">
                  {newsType2 ? (
                    <Link href={`/news/${newsType2.id}`}>
                      <div className="flex justify-between">
                        {/* <Title name={newsType2.title} size="small" /> */}
                        <div className="text-xl font-semibold p-6">
                          {newsType2.title}
                        </div>
                        <div className="group-hover:translate-x-4 duration-300 flex items-center pr-8">
                          <Arrow />
                        </div>
                      </div>
                      <div
                        className="text-justify px-6 pb-16 text-sm leading-5 name text-brand-50 overflow-hidden h-48"
                        dangerouslySetInnerHTML={{
                          __html: newsType2.description,
                        }}
                      ></div>
                    </Link>
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </SimpleMotion>
      <div className="relative h-[250px]">
        <div className="absolute bottom-0 w-full h-56">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default NewsId;
