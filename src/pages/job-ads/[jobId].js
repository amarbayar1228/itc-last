import Arrow from "@/components/assist/arrow";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import { Collapse, Empty, Modal, Upload, notification } from "antd";
import Head from "next/head";
import {
  PhoneOutlined,
  EyeOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import SimpleMotion from "@/components/assist/simpleMotion";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Exo_2, Roboto, Ubuntu } from "next/font/google";
const inter = Exo_2({
  subsets: ["latin"],
  weight: "400",
});
export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.ITC_GOV_SERVICE_URL}` + "/jobads/getJobAdsParam"
  );
  const data = await res.json();
  const paths = data.map((post) => {
    return {
      params: {
        jobId: `${post.id}`,
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
      "/jobads/getJobAdsDtlDoc?id=" +
      `${params.jobId}`
  );
  const data = await res.json();

  return {
    props: {
      post: data.length > 0 ? data : null,
    },
    revalidate: 10,
  };
};

const JobIds = ({ post }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [captcha, setCaptcha] = useState(true);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const recaptchaRef = useRef();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    education: "",
    fileName: "",
    email: "",
  });
  const onChange = (key) => {
    console.log(key);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const propsPdf = {
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: <EyeOutlined />,
      showRemoveIcon: true,
      removeIcon: (
        <DeleteOutlined
          onClick={(e) => console.log(e, "custom removeIcon event")}
        />
      ),
    },
  };
  const uploadFile = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    // if (file.type !== "image/png" && file.type !== "image/jpeg") {
    //   message.error(` Заавал зураг оруулна уу`);
    //   setFileList([]);
    // } else {
    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      // onUploadProgress: (event) => {
      //   const percent = Math.floor((event.loaded / event.total) * 100);
      //   setProgress(percent);
      //   if (percent === 100) {
      //     setTimeout(() => setProgress(0), 1000);
      //   }
      //   onProgress({ percent: (event.loaded / event.total) * 100 });
      // },
    };
    fmData.append("file", file);
    const res = await axios.post(`/api/upload`, fmData, config);
    file.url = `/api/v1/getFile?file=${res.data}`;
    if (res.status == 200) {
      // message.success("Амжилтай файл хууллаа");
      api.success({
        message: `Амжилттай`,
        description: <div>Амжилтай файл хууллаа.</div>,
      });
    }
    onSuccess("Ok");
    setData({ ...data, fileName: res.data });
    // setImageName(res.data);
    // }
  };
  const send = () => {
    setLoading(true);
    setCaptcha(true);
    if (
      data.firstName === "" ||
      data.email === "" ||
      data.phoneNumber === "" ||
      data.lastName === "" ||
      data.fileName === "" ||
      data.education === ""
    ) {
      api.error({
        message: `Алдаа`,
        description: <div>Бүх талбарыг бөглөнө үү!</div>,
      });
      setCaptcha(false);
      setLoading(false);
    } else {
      // add
      const body = {
        jobAdsHdrId: post[0].id,
        jobAdsHdrTitle: post[0].title,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        education: data.education,
        fileName: data.fileName,
        email: data.email,
      };

      axios
        .post("/api/post/jobads/sendCV", body)
        .then((res) => {
          setIsModalOpen(false);
          api.success({
            message: `Амжилттай`,
            description: <div>Амжилттай илгээлээ</div>,
          });
          setData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            education: "",
            fileName: "",
            email: "",
          });
        })
        .catch((err) => {
          console.log("err: ", err);
        })
        .finally((fn) => {
          setLoading(false);
          setCaptcha(false);
        });
    }
  };
  const onChangeCaptcha = (a) => {
    if (a != null) {
      setCaptcha(false);
      return;
    }
    setCaptcha(true);
    setLoading(false);
  };
  const errorCapt = (err) => {
    console.log("err", err);
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
        title="Нээлттэй ажлын байр"
        name={post ? post[0].title : ""}
        router={"job-ads"}
        routerId={"id"}
      />
      <SimpleMotion>
        <div className="max-w-[1400px] mx-auto p-4">
          {post ? (
            <div className="flex gap-4  ">
              <div className="bg-white w-3/4 pb-20 relative">
                <div className="flex items-center justify-between">
                  <Title name={post[0].title} />
                  <div className="bg-brand-50 px-3 py-2 text-gray-100 flex items-center text-sm w-36">
                    <div className="flex items-center pr-2">
                      <ClockCircleOutlined />
                    </div>
                    <div className="flex items-center">
                      {post[0].createdDateStr.slice(0, 10)}
                    </div>
                  </div>
                </div>
                {/* <div className="px-9 text-justify leading-5">
                  {post[0].description}
                </div> */}
                {contextHolder}
                <div
                  className="px-9  text-brand-50 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: post[0].jobPurposeDescription,
                  }}
                ></div>
                <div className="px-9 mt-10">
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
                            className="name text-brand-50 px-2"
                            dangerouslySetInnerHTML={{ __html: e.document }}
                          ></div>
                        </div>
                      ),
                    }))}
                    // defaultActiveKey={["1"]}
                  />
                </div>
                <div className="w-[161px] absolute bottom-6 right-10">
                  <div
                    href={"/"}
                    onClick={() => setIsModalOpen(true)}
                    className="group border-2   cursor-pointer   border-white text-white mx-1 font-medium   flex justify-center items-center duration-300 hover:border-brand-50"
                  >
                    <span className="py-2 bg-brand-50 px-3 border border-white group-hover:border-white flex gap-4">
                      <div className="group-hover:translate-x-2 duration-300">
                        <Arrow name={"white"} />
                      </div>
                      Анкет илгээх
                    </span>
                  </div>
                </div>
                <Modal
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                  width={800}
                  className="!p-0 "
                >
                  <div className={`${inter.className}`}>
                    <div className="flex -my-5 -mx-6 bg-white max-sm:flex-col text-brand-50">
                      <div className="w-1/2 p-12 max-sm:w-full max-sm:p-8">
                        <div className="w-full">
                          <label
                            htmlFor="location"
                            className="font-semibold mb-3"
                          >
                            Овог
                          </label>
                          <input
                            placeholder=""
                            id="location"
                            value={data.lastName}
                            onChange={(e) =>
                              setData({ ...data, lastName: e.target.value })
                            }
                            className="appearance-none  block w-full  text-gray-700 border border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                        <div className="w-full mt-2">
                          <label
                            htmlFor="location"
                            className="font-semibold mb-3"
                          >
                            Нэр
                          </label>
                          <input
                            placeholder=""
                            id="location"
                            value={data.firstName}
                            onChange={(e) =>
                              setData({ ...data, firstName: e.target.value })
                            }
                            className="appearance-none  block w-full  text-gray-700 border border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                        <div className="w-full mt-2">
                          <label
                            htmlFor="location"
                            className="font-semibold mb-3"
                          >
                            Утас
                          </label>
                          <input
                            value={data.phoneNumber}
                            onChange={(e) =>
                              setData({ ...data, phoneNumber: e.target.value })
                            }
                            placeholder=""
                            id="location"
                            className="appearance-none  block w-full  text-gray-700 border border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                        <div className="w-full mt-2">
                          <label
                            htmlFor="location"
                            className="font-semibold mb-3"
                          >
                            Цахим шуудан
                          </label>
                          <input
                            value={data.email}
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                            placeholder=""
                            id="location"
                            className="appearance-none  block w-full  text-gray-700 border border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                        <div className="w-full mt-2">
                          <label
                            htmlFor="location"
                            className="font-semibold mb-3"
                          >
                            Боловсролын зэрэг
                          </label>
                          <input
                            value={data.education}
                            onChange={(e) =>
                              setData({ ...data, education: e.target.value })
                            }
                            placeholder=""
                            id="location"
                            className="appearance-none  block w-full  text-gray-700 border border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                        <div className="w-full mt-2">
                          <ReCAPTCHA
                            onErrored={errorCapt}
                            ref={recaptchaRef}
                            sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t"
                            onChange={onChangeCaptcha}
                          />
                        </div>
                        <div className="flex justify-end mt-8">
                          <div className="">
                            <button
                              disabled={captcha}
                              // loading={loading}
                              loading={true}
                              onClick={send}
                              className="group border-2 z-20 disabled:bg-red-200  cursor-pointer   border-white text-white mx-1 font-medium   flex justify-center items-center duration-300 hover:border-brand-50"
                            >
                              {loading ? (
                                <span className="py-2 bg-brand-50 px-3 border disabled:bg-red-200 border-white group-hover:border-white flex gap-4">
                                  <div className="group-hover:translate-x-2 duration-300 disabled:bg-red-200">
                                    <Arrow name={"white"} />
                                  </div>
                                  Уншиж байна...
                                </span>
                              ) : (
                                <span
                                  className={
                                    captcha
                                      ? "py-2 bg-gray-300 px-3 border disabled:bg-red-200 border-white group-hover:border-white flex gap-4 cursor-not-allowed "
                                      : "py-2 bg-brand-50 px-3 border disabled:bg-red-200 border-white group-hover:border-white flex gap-4"
                                  }
                                >
                                  <div className="group-hover:translate-x-2 duration-300 disabled:bg-red-200">
                                    <Arrow name={"white"} />
                                  </div>
                                  Илгээх
                                </span>
                              )}
                            </button>
                          </div>
                          {/* <SendButton
                        name="Илгээх"
                        disable={captcha}
                        loading={loading}
                        data={send}
                      /> */}
                        </div>
                      </div>
                      <div className="w-1/2 bg-brand-50 flex flex-col items-center justify-center max-sm:w-full max-sm:h-80">
                        <Image
                          fill={false}
                          priority={true}
                          src={"/images/anket/cloud.png"}
                          width={709}
                          height={710}
                          alt="aaa"
                          className="w-24 h-24"
                        />

                        <Upload
                          {...propsPdf}
                          customRequest={uploadFile}
                          className="flex flex-col items-center justify-center"
                        >
                          <div className={`${inter.className}`}>
                            <button className="border cursor-pointer font-semibold border-blue-700 px-10 py-1 mt-9 bg-white focus:outline-none focus:ring focus:ring-blue-300">
                              CV Хавсаргах
                            </button>
                          </div>
                        </Upload>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
              <div className="w-1/4">
                <div className="bg-white">
                  <div className="w-full p-6 text-brand-50 font-semibold text-sm flex items-center justify-between">
                    <div className="font-semibold text-xl ">Бусад</div>
                    <div className="text-sm text-brand-50">
                      {post[0].createdDateStr.slice(0, 10)}
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 px-6 pb-6 text-brand-50 text-sm font-medium">
                      <div className="flex flex-col font-semibold">
                        <div>Байршил</div>
                        <div className="font-medium">
                          Улаанбаатар хот, Чингэлтэй дүүрэг
                        </div>
                      </div>
                      <div className="flex flex-col font-semibold">
                        <div>Түвшин</div>
                        <div className="font-medium">Мэргэжилтэн</div>
                      </div>
                      <div className="flex flex-col font-semibold">
                        <div>Төрөл</div>
                        <div className="font-medium">Бүтэн цагийн</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-50 mt-4 grid grid-cols-2 text-white p-2">
                  <div className="w-full bg-brand-50 p-6 text-white font-medium text-sm flex items-center justify-center border-r">
                    <div className="font-medium text-5xl">
                      <PhoneOutlined rotate={95} />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 p-6  font-medium">
                      <div className="flex flex-col text-sm font-medium">
                        <div>Холбоо барих:</div>
                        <div className="text-sm font-medium text-gray-200">
                          7012-1033
                        </div>
                      </div>
                      <div className="flex flex-col text-sm font-medium">
                        <div>имэйл хаяг:</div>
                        <div className="text-sm font-medium text-gray-200">
                          hr@itc.gov.mn
                        </div>
                      </div>
                      <div className="flex flex-col text-sm font-medium">
                        <div>Цагийн хуваарь</div>
                        <div className="text-sm font-medium text-gray-200">
                          08:30-17:30
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </SimpleMotion>
      <div className="relative h-[350px]">
        <div className="absolute bottom-0 w-full h-56">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default JobIds;
