import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";
import Footer from "@/components/footer";
import Head from "next/head";
import Title from "@/components/title";
import SimpleMotion from "@/components/assist/simpleMotion";
const Transparency = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Ил тод байдал</title>
        <meta name={"page"} content={"Ил тод байдал"} key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <SimpleMotion>
        <div className="max-w-[1400px] mx-auto mt-4 bg-white">
          <Title name={"Ил тод байдал"} />
          <div className="grid  grid-cols-1 px-14 pb-40">
            <Link
              href={"/"}
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 px-1 py-1 border"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Монгол улсын үндэс хууль
              </div>
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 px-1 py-1 border-b border-r border-l"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Монгол улсын үндэс хууль
              </div>
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 px-1 py-1 border-b border-r border-l"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Монгол улсын үндэс хууль
              </div>
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 px-1 py-1 border-b border-r border-l"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Монгол улсын үндэс хууль
              </div>
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 px-1 py-1 border-b border-r border-l"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Монгол улсын үндэс хууль
              </div>
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 px-1 py-1 border-b border-r border-l"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2 ">
                Монгол улсын үндэс хууль
              </div>
            </Link>
          </div>
        </div>
      </SimpleMotion>
      <div className="absolute bottom-0 w-full h-72 max-md:relative">
        <Footer />
      </div>
    </div>
  );
};
export default Transparency;
