import Arrow from "@/components/assist/arrow";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import { notification, message } from "antd";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

const FeedBack = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    description: "",
  });
  const sendData = async () => {
    if (
      data.username === "" ||
      data.email === "" ||
      data.phoneNumber === "" ||
      data.address === "" ||
      data.description === ""
    ) {
      api.error({
        message: `Алдаа`,
        description: <div>Бүх талбарыг бөглөнө үү!</div>,
      });
    } else {
      setLoading(true);
      await axios
        .post("/api/post/main/saveFeedBack", data)
        .then((res) => {
          if (res.data.code === 1) {
            setLoading(false);
            setData({
              username: "",
              email: "",
              phoneNumber: "",
              address: "",
              description: "",
            });
            api.success({
              message: `Амжилттай`,
              description: <div>Амжилттай илгээлэээ....</div>,
            });
          } else {
            message.error("Error");
          }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  };
  return (
    <div>
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb name={"Санал хүсэлт"} router={"feedback"} />
      <div className="mt-4 max-w-[1400px] mx-auto bg-white">
        <Title name={"Санал хүсэлт"} />
        {contextHolder}
        <div className="flex w-full max-md:flex-col px-14 mt-2 text-brand-50">
          <div className="w-4/6  max-md:w-full">
            <div className="flex gap-10 max-sm:gap-2">
              <div className="w-2/4">
                <label htmlFor="firstname" className="font-medium mb-3">
                  Нэр
                </label>
                <input
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  placeholder=""
                  id="firstname"
                  className="appearance-none  block w-full  text-brand-50 border border-brand-50 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-brand-100"
                />
              </div>
              <div className="w-2/4">
                <label htmlFor="mail" className="font-medium mb-3">
                  Цахим шуудан
                </label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder=""
                  id="mail"
                  name="email"
                  type="email"
                  className="appearance-none  block w-full  text-brand-50 border border-brand-50 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-brand-100"
                />
              </div>
            </div>
            <div className="flex gap-10 my-6 max-sm:gap-2">
              <div className="w-2/4">
                <label htmlFor="phone" className="font-medium mb-3">
                  Утас
                </label>
                {/* <Input type="number" size="large" /> */}
                <input
                  value={data.phoneNumber}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  type="number"
                  placeholder=""
                  id="phone"
                  className="appearance-none  block w-full  text-brand-50 border border-brand-50 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-brand-100"
                />
              </div>
              <div className="w-2/4">
                <label htmlFor="location" className="font-medium mb-3">
                  Байршил
                </label>
                <input
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  placeholder=""
                  id="location"
                  className="appearance-none  block w-full  text-brand-50 border border-brand-50 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-brand-100"
                />
              </div>
            </div>
          </div>
          <div className="w-2/4 ml-10  max-md:w-full max-md:ml-0">
            <label className="font-medium mb-2" htmlFor="sanal">
              Санал хүсэлт
            </label>
            <textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              placeholder=""
              id="sanal"
              className="appearance-none  block w-full h-32  text-brand-50 border border-brand-50 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-brand-100"
            />
          </div>
        </div>
        <div className="flex justify-end px-14 max-sm:flex-col-reverse gap-3 pb-6 max-md:py-6">
          {/* <WarningButton name="Авлига мэдээлэх утас: +976 110" /> */}
          <div className="">
            <button
              // loading={loading}
              loading={loading}
              onClick={sendData}
              className="group border-2 z-20 disabled:bg-red-200  cursor-pointer   border-white text-white font-medium   flex justify-center items-center duration-300 hover:border-brand-50"
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
                    "py-2 bg-brand-50 px-3 border disabled:bg-red-200 border-white group-hover:border-white flex gap-4"
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
          {/* <ArrayButton name="Илгээх" data={sendData} loading={loading} /> */}
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-72 max-md:relative">
        <Footer />
      </div>
    </div>
  );
};
export default FeedBack;
