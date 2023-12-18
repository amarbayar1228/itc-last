import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import AddNews from "@/components/dashboardComp/addNews";
import axios from "axios";
import ProjectComp from "@/components/dashboardComp/project";
import FeedBack from "@/components/dashboardComp/feedBack";
import JobAdsComp from "@/components/dashboardComp/jobAds";
import CvComponent from "@/components/dashboardComp/cv";
import DeveloperComp from "@/components/dashboardComp/developer";
import BannerComponent from "@/components/dashboardComp/Banner";
import Head from "next/head";
import { useRouter } from "next/router";
import ImageComponent from "@/components/dashboardComp/image";
const { Header, Content, Footer, Sider } = Layout;

export async function getServerSideProps(props) {
  const data = {
    URL: process.env.KEYCLOAK_URL,
    ITC_URL: process.env.ITC_GOV_SERVICE_URL,
  };
  return {
    props: {
      data,
    },
  };
}
const header = [
  { id: 0, label: "Мэдээ мэдээлэл" },
  { id: 1, label: "Төсөл" },
  { id: 2, label: "Ажлын байрны зарууд" },
  { id: 3, label: "Санал хүсэлт" },
  { id: 3, label: "Танилцуулга" },
  { id: 4, label: "Анкет" },
  { id: 4, label: "Certificate" },
  { id: 4, label: "Хүний нөөц" },
  { id: 4, label: "Баннер" },
  { id: 5, label: "Тохиргоо" },
];
const Dashboard = ({ data }) => {
  const [menuValue, setMenuValue] = useState("1");
  const [routerData, setRouterData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        const header = {
          Authorization: "Bearer " + localStorage.getItem("token"),
        };
        const body = {
          aaa: 0,
        };
        axios
          .post("/api/postBT/main/getRoleMenu", body, { headers: header })
          .then((res) => {
            console.log("res: ", res);
            if (res.data === "") {
              router.push("/auth/logout");
            }
            const data = res.data.find((e) => e.isDefault === 0);
            setMenuValue(data.routeUrl);

            setRouterData(res.data);
            // setHdrData(res.data);
          })
          .catch((err) => {
            console.log("err: ", err);
          });
      } else {
        return router.push("/");
      }
    }
  }, []);

  const items =
    routerData.length != 0
      ? routerData.map((e, i) => {
          if (e.isDefault === 0) {
            return {
              key: e.routeUrl,
              label: e.name,
            };
          }
        })
      : [];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menufunc = (params, data) => {
    setMenuValue(params.key);
  };
  const menuHandler = (a, b) => {};
  return (
    <div>
      <Head>
        <title>{"Хяналтын самбар"}</title>
        <meta name={"Хяналтын самбар"} content={"Хяналтын самбар"} key="desc" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Layout>
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <div className="mt-4" />
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[menuValue]}
            // defaultSelectedKeys={[menuValue]}
            items={items}
            onChange={menuHandler}
            onClick={menufunc}
            className="bg-white"
          />
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0 }} /> */}
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: "75.4vh",
                background: colorBgContainer,
              }}
            >
              {menuValue === "0" ? <AddNews props={data} /> : null}
              {menuValue === "1" ? <ProjectComp props={data} /> : null}
              {menuValue === "2" ? <JobAdsComp props={data} /> : null}
              {menuValue === "3" ? <FeedBack props={data} /> : null}
              {menuValue === "4" ? <CvComponent props={data} /> : null}
              {menuValue === "5" ? "ISO" : null}
              {menuValue === "6" ? <BannerComponent /> : null}
              {menuValue === "7" ? <DeveloperComp /> : null}
              {menuValue === "8" ? (
                <ImageComponent getUrl={data.ITC_URL} />
              ) : null}
            </div>
          </Content>

          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Itc gov ©2023 Created by Itc-gov.mn
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
