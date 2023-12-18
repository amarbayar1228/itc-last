import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";
import Footer from "@/components/footer";
import Head from "next/head";
import Title from "@/components/title";
import SimpleMotion from "@/components/assist/simpleMotion";
const Law = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Хууль</title>
        <meta name={"page"} content={"Хууль"} key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <SimpleMotion>
        <div className="max-w-[1400px] mx-auto mt-4 bg-white">
          <Title name={"Хууль"} />
          <div className="grid  grid-cols-1  px-14  max-lg:grid-cols-3 border-t pt-5">
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=367"}
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border px-1"
              passHref={true}
              target="_blank"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Монгол улсын үндэс хууль
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=299"}
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
              passHref={true}
              target="_blank"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">Иргэний хууль</div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=14403"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Татварын ерөнхий хууль
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=11227"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Нэмэгдсэн өртгийн албан татварын тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=209"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">Гаалийн тухай</div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=208"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Гаалийн тариф, гаалийн татварын тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=12254"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">Төсвийн тухай</div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=10497"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Шилэн дансны тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=492"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Төрийн болон орон нутгийн өмчийн тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=493"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Төрийн болон орон нутгийн өмчийн хөрөнгөөр бараа, ажил,
                үйлчилгээ худалдан авах тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=16230709635751"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Хөдөлмөрийн тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=564"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн тухай хууль
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=12408"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Төрийн болон албаны нууцын тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=16390263044601"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Нийтийн мэдээллийн ил тод байдлын тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=16390288615991"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Хүний хувийн мэдээлэл хамгаалах тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=16390355252531"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Цахим гарын үсгийн тухай
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=16390365491061"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Кибер аюулгүй байдлын тухай
              </div>
            </Link>
          </div>
          <div className="mt-4"></div>
          <Title name={"Дүрэм, Журам, Тогтоол"} />
          <div className="flex flex-col   px-14 border-t pt-5 pb-20">
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=12333"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Улсын төсөвт үйлдвэрийн газрыг өөрчлөн зохион байгуулах тухай
                /Гааль, татвар, санхүүгийн мэдээллийн технологийн төв/
              </div>
            </Link>
            <Link
              href={"https://legalinfo.mn/mn/detail?lawId=207535&showType=1"}
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                &quot;Гааль, татвар, санхүүгийн мэдээллийн технологийн төв&quot;
                УҮГ-ын дүрэм
              </div>
            </Link>
            <Link
              href={
                "https://legalinfo.mn/mn/detail?lawId=16530298796001&showType=1"
              }
              passHref={true}
              target="_blank"
              className="flex items-center gap-2 font-medium text-brand-50 hover:bg-gray-100 py-1 border-b border-l border-r px-1"
            >
              <LinkOutlined />
              <div className="underline underline-offset-2">
                Үндсэн системийн үйл ажиллагааг зохицуулах, систем ашиглаж
                үйлчилгээ үзүүлэх, мэдээлэл солилцох журам
              </div>
            </Link>
          </div>
        </div>
      </SimpleMotion>
      <div className="mt-24"></div>
      <Footer />
    </div>
  );
};
export default Law;
