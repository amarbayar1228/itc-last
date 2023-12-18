import Arrow from "@/components/assist/arrow";
import SimpleMotion from "@/components/assist/simpleMotion";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import { Collapse, Empty } from "antd";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `${process.env.ITC_GOV_SERVICE_URL}` +
      "/project/getProjectHdrId?id=" +
      `${query.projectId}`
  );
  const data = await res.json();

  const res2 = await fetch(
    `${process.env.ITC_GOV_SERVICE_URL}` +
      "/project/getProjectId?id=" +
      `${query.projectId}`
  );
  const projectHdr = await res2.json();

  return {
    props: {
      data: data,
      projectHdr: projectHdr,
    },
  };
}

const ProjectDetails = ({ data, projectHdr }) => {
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
      <Breadcrumb
        title="Төсөл"
        name={projectHdr ? projectHdr.title : "Систем нэр"}
        router={"project"}
        routerId={"id"}
      />
      <div className="relative">
        <SimpleMotion>
          <div className="max-w-[1400px] mx-auto mt-4 bg-white">
            <div className="bg-white">
              <Title name={projectHdr ? projectHdr.title : "Систем нэр"} />
            </div>
            <div className="bg-white px-9 pb-6 text-brand-50 text-sm">
              <div className="w-3/5">{projectHdr.description}</div>
            </div>
            {data ? (
              <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 text-brand-50">
                {data.map((e, i) => (
                  <Link
                    key={i}
                    href={`/project/${e.projectId}/${e.id}`}
                    className="py-6 px-9 border cursor-pointer hover:border-brand-50 group"
                  >
                    <div className="flex justify-between text-xl items-baseline font-semibold mb-2">
                      <div className="w-11/12 leading-5">{e.title}</div>
                      <div className="group-hover:translate-x-4 duration-300 flex items-baseline">
                        <Arrow />
                      </div>
                    </div>
                    <div className="text-sm text-justify leading-5 font-medium">
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
      </div>
      <div className="absolute -bottom-28 w-full h-72 max-md:relative">
        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetails;
