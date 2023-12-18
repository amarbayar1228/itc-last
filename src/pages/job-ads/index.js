import Arrow from "@/components/assist/arrow";
import SimpleMotion from "@/components/assist/simpleMotion";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProjectComp from "@/components/project";
import Title from "@/components/title";
import { Empty } from "antd";
import axios from "axios";
import Link from "next/link";
import { ClockCircleOutlined } from "@ant-design/icons";
import Head from "next/head";

export async function getServerSideProps() {
  const data = [];
  const body = {
    page: 0,
    size: 4,
  };
  await axios
    .post(
      `${process.env.ITC_GOV_SERVICE_URL}` + "/jobads/getJobAdsActive",
      body
    )
    .then((res) => {
      data.push(res.data.result);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
  // const data = await res.json();
  return {
    props: {
      data: data[0],
    },
  };
}

const JobAds = ({ data }) => {
  return (
    <div>
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb name="Нээлттэй ажлын байр" router={"/job-ads"} />
      <SimpleMotion>
        <div className="bg-white max-w-[1400px] mx-auto mt-4">
          <Title name="Нээлттэй ажлын байр" />

          {data ? (
            <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 text-brand-50">
              {data.map((e, i) => (
                <Link
                  key={i}
                  href={`/job-ads/${e.id}`}
                  className="py-6 px-9 border cursor-pointer hover:border-brand-50 group"
                >
                  <div className="flex justify-between text-xl font-semibold mb-2">
                    <div className="w-11/12">{e.title}</div>
                    <div className="group-hover:translate-x-4 duration-300 flex items-center pr-6">
                      <Arrow />
                    </div>
                  </div>
                  <div className="text-sm text-justify leading-5 font-light">
                    {e.description}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </SimpleMotion>
      <div className="absolute bottom-0 w-full h-72 max-md:relative">
        <Footer />
      </div>
    </div>
  );
};
export default JobAds;
