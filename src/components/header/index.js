import { Drawer, Menu, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [selectKeys, setSelectKeys] = useState("0");
  const [userToken, setUserToken] = useState(null);
  // const keyContext = useContext(keycloakContext);
  const [hdrData, setHdrData] = useState([]);
  const [hdrMobile, setHdrMobile] = useState([]);
  const [skeletonList, setSkeletonList] = useState(true);
  const router = useRouter();
  const hdrData2 = [
    { label: "Нүүр хуудас", key: "/", router: "/" },
    { label: "Мэдээ мэдээлэл", key: "/news", router: "/news" },
    { label: "Төсөл", key: "/project", router: "/project" },
    {
      label: "Хүний нөөц",
      key: "/human-resources",
      router: "/human-resources",
    },
    { label: "Шилэн данс", key: "/project", router: "/project" },
    { label: "Нэвтрэх", key: "/auth/login", router: "/auth/login" },
    { label: "Гарах", key: "/auth/logout", router: "/auth/logout" },
  ];
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSkeletonList(false);
    } else {
    }

    // selectKey();
  }, [userToken]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const menuFunc = (params, kk) => {
    router.push(params.router);
    setSelectKeys(params.router);
  };
  return (
    <section>
      <div className="bg-brand-50 w-full text-white text-base font-normal px-6 border-b-[6px] border-brand-100">
        <div className="py-4 flex justify-between items-center">
          <Link href={"/"} className="text-3xl uppercase cursor-pointer">
            <Image
              priority={true}
              className="h-full w-60 "
              src={"/images/logo/logoL.svg"}
              alt="ITC GOV"
              width={1000}
              height={1000}
            />
          </Link>
          <div className="flex items-center max-lg:hidden">
            {!skeletonList ? (
              <Link
                href={"/dashboard"}
                className="p-4 border border-brand-50 bg-brand-50 hover:border-white mx-1"
              >
                Хяналтын самбар
              </Link>
            ) : null}
            <Link
              href={"/about"}
              className="p-4 border border-brand-50 bg-brand-50 hover:border-white mx-1"
            >
              Бидний тухай
            </Link>
            <Link
              href={"/human-resource"}
              className="p-4 border border-brand-50 bg-brand-50 hover:border-white mx-1"
            >
              Хүний нөөц
            </Link>

            <Link
              href={skeletonList ? "/auth/login" : "/auth/logout"}
              className="group border-4 bg-white border-brand-50 text-brand-50 mx-1 font-medium   flex justify-center items-center duration-300 hover:border-white"
            >
              <span className="py-2 px-3 border border-white group-hover:border-black">
                {skeletonList ? "Нэвтрэх" : "Гарах"}
              </span>
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={showDrawer}>
              <MenuUnfoldOutlined className="text-3xl hover:text-brand-150" />
            </button>
            <Drawer
              title="Нүүр хуудас"
              placement="left"
              onClose={onClose}
              open={open}
              width={310}
            >
              <Menu
                mode="inline"
                selectedKeys={selectKeys}
                style={{ width: 256, border: "none" }}
                items={hdrData2}
                onClick={menuFunc}
              />
            </Drawer>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Header;
