import Arrow from "@/components/assist/arrow";
import ArrowL from "@/components/assist/arrowL";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import { Collapse, Empty } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ClockCircleOutlined } from "@ant-design/icons";
import SimpleMotion from "@/components/assist/simpleMotion";
import axios from "axios";
import config from "../../../config";
export async function getServerSideProps() {
  const data = [];
  const body = {
    page: 0,
    size: 100,
  };
  await axios
    .post(`${process.env.ITC_GOV_SERVICE_URL}` + "/main/getNewsActive", body)
    .then((res) => {
      data.push(res.data.result);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
  const newsType2 = [];
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
      data: data,
      head: data[0].length > 0 ? data[0][0].title : "Мэдээ мэдээлэл",
      newsType2: newsType2,
    },
  };
}
const News = (props) => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb name="Мэдээ мэдээлэл" router={"news"} />
      <SimpleMotion>
        <div className="max-w-[1400px] mx-auto mt-4">
          {props.data[0].length ? (
            <div className="flex gap-4 max-md:flex-col">
              <div className="w-3/4 max-md:w-full bg-white">
                <div className="relative bg-cover h-[323px] bg-gray-200">
                  <Image
                    priority
                    blurDataURL="/images/news/1100w.png"
                    className="relative h-full bg-[url('/images/news/1100w.png')]  "
                    placeholder="blur"
                    // src={"/images/loading/1000w.jpg"}
                    src={
                      config.data.uploadUrl + props.data[0][0].backgroundImage
                    }
                    alt="ITC GOV"
                    width={5000}
                    height={5000}
                  />
                </div>
                <div className="pb-[60px] relative max-h-full bg-white">
                  <div className="flex items-center justify-between">
                    <Title name={props.data[0][0].title} />
                    <div className="bg-brand-50 px-4 py-1 text-gray-100 flex items-center text-sm w-36">
                      <div className="flex items-center pr-2">
                        <ClockCircleOutlined />
                      </div>
                      <div className="flex items-center">
                        {props.data[0][0].createdDateStr.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <div className="px-9 text-justify  bg-white">
                    <div
                      className="name text-brand-50 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: props.data[0][0].description,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 max-md:w-full">
                <div className="bg-white">
                  <div className="w-full text-brand-50 p-6 font-semibold text-xl ">
                    Бусад мэдээ
                  </div>
                  <div className="flex flex-col gap-2 px-6 text-brand-50 font-medium h-[232px] overflow-auto text-sm">
                    {props.data[0].map((e, i) => (
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
                    ))}
                  </div>
                </div>
                <div className="mt-4 bg-white group h-[304px] relative z-10 ">
                  {props.newsType2[0] ? (
                    <Link
                      href={`/news/${props.newsType2[0].id}`}
                      className="relative"
                    >
                      <div className="flex justify-between z-0">
                        {/* <Title name={props.newsType2[0].title} size="small" /> */}
                        <div className="text-xl font-semibold p-6">
                          {props.newsType2[0].title}
                        </div>
                        <div className="group-hover:translate-x-4 duration-300 flex items-center pr-10">
                          <Arrow />
                        </div>
                      </div>
                      <div
                        className="name text-brand-50 text-justify px-6 pb-16 text-sm leading-5 z-0 relative overflow-hidden h-48"
                        dangerouslySetInnerHTML={{
                          __html: props.newsType2[0].description,
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
export default News;
