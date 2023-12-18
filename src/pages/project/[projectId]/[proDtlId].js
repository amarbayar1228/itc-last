import Arrow from "@/components/assist/arrow";
import SimpleMotion from "@/components/assist/simpleMotion";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import { Collapse, Empty } from "antd";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Exo_2, Roboto, Ubuntu } from "next/font/google";
const inter = Exo_2({
  subsets: ["latin"],
  weight: "400",
});
export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.ITC_GOV_SERVICE_URL}` + "/project/getProjectHdr"
  );
  const data = await res.json();
  const paths = data.map((post) => {
    return {
      params: {
        projectId: `${post.id}`,
        proDtlId: `${post.id}`,
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `${process.env.ITC_GOV_SERVICE_URL}` +
      "/project/getProjectDetailDocument?id=" +
      `${params.proDtlId}`
  );
  const data = await res.json();
  const projectList = [];
  const body = {
    page: 0,
  };
  await axios
    .post(
      `${process.env.ITC_GOV_SERVICE_URL}` + "/project/getProjectActive",
      body
    )
    .then((res) => {
      if (res.data.code === 1) {
        projectList.push(res.data.result);
      }
    })
    .catch((err) => {
      console.log("err: ", err);
    });
  return {
    props: {
      post: data.length > 0 ? data : null,
      projectList: projectList.length > 0 ? projectList[0] : null,
    },
    revalidate: 10,
  };
};

const ProjectDetailsId = ({ post, projectList }) => {
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
      {post ? (
        <div className="text-brand-50">
          <Breadcrumb
            title="Төсөл"
            name={post.projectTitle}
            router={"project"}
            routerId={"id"}
          />
          <SimpleMotion>
            <div className="max-w-[1400px] mx-auto mt-4">
              <div className="flex gap-4">
                <div className="bg-white w-3/4 pb-20">
                  <Title
                    name={post[0].hdrDescription + " - " + post[0].projectTitle}
                  />
                  <div className="px-9">
                    <div
                      className="name text-brand-50 text-sm"
                      dangerouslySetInnerHTML={{ __html: post[0].description }}
                    ></div>
                  </div>
                  <div className="px-9">
                    {post[0].documentTitle ? (
                      <div className="text-brand-50 mt-10">
                        <Collapse
                          defaultActiveKey={0}
                          style={{
                            background: "#fff",
                            borderRadius: "0px",
                            borderRight: "0px",
                            borderLeft: "0px",
                            borderTop: "1px solid #ededed",
                            borderBottomLeftRadius: "0px",
                          }}
                          expandIconPosition="start"
                          items={post.map((e, i) => ({
                            key: i,
                            label: (
                              <div className={`${inter.className}`}>
                                <div className="text-lg font-semibold text-brand-50">
                                  {e.documentTitle}
                                </div>
                              </div>
                            ),
                            children: (
                              <div className={`${inter.className}`}>
                                <div
                                  className="name text-brand-50  px-2"
                                  dangerouslySetInnerHTML={{
                                    __html: e.document,
                                  }}
                                ></div>
                              </div>
                            ),
                          }))}
                          // defaultActiveKey={["1"]}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="bg-white w-1/4">
                  <div className="w-full text-brand-50 p-6 font-semibold text-xl ">
                    Бусад төсөл
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 px-6 pb-6 text-brand-50 font-medium h-64 overflow-auto text-sm">
                      {projectList ? (
                        projectList.map((e, i) => (
                          <Link
                            key={i}
                            href={`/project/${e.id}`}
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
                </div>
              </div>
            </div>
          </SimpleMotion>
          <div className="relative h-[350px]">
            <div className="absolute bottom-0 w-full h-56">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsId;
