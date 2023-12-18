import ArrowL from "@/components/assist/arrowL";
import SimpleMotion from "@/components/assist/simpleMotion";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import config from "../../../config";
export async function getServerSideProps() {
  const data = [];
  await axios
    .post(`${process.env.ITC_GOV_SERVICE_URL}` + "/banner/getBanner")
    .then((res) => {
      if (res.data.result) {
        res.data.result.forEach((element) => {
          data.push(element);
        });
      }
    })
    .catch((err) => {
      console.log("err: ", err);
    });

  return {
    props: {
      data:
        data.length > 0
          ? data.filter((e) => e.type === 1).length > 0
            ? data.filter((e) => e.type === 1)
            : data.filter((e) => e.type === 0)
          : "/images/news/news1.jpg",
    },
  };
}

const HumanResource = ({ data }) => {
  return (
    <div className="text-brand-50 text-sm">
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb name={"Хүний нөөц"} router={"human-resource"} />
      <SimpleMotion>
        <div className="mt-4 max-w-[1400px] mx-auto bg-white">
          <div className="flex max-xl:flex-col-reverse">
            <div className="w-1/2 max-xl:w-full">
              <Title name={"Хүний нөөцийн мэдээлэл"} />
              <div className="px-9 text-justify text-brand-50 pb-10">
                Бид Гааль, Татвар, Санхүүгийн Мэдээллийн технологийн нэгдсэн
                системийн хяналт, програм хангамжийн хөгжүүлэлтийг хариуцах
                замаар гааль, татвар, санхүүгийн үйл ажиллагаанд мэдээллийн
                дэвшилтэт өндөр технологийн шийдлүүдийг боловсруулан нэвтрүүлж,
                санхүүгийн салбарын мэдээллийн санг бий болгохтой холбогдсон
                цогц арга хэмжээг авч хэрэгжүүлэх эрхэм зорилгынхоо хүрээнд
                "Гааль, татвар, санхүүгийн мэдээллийн технологийн төв" УҮГ нь
                нийт 60 гаруй ажиллагчидтайгаас 90 хувь нь мэргэжлийн мэдээллийн
                технологийн инженер, програмистууд, 35 хувь нь дэлхийн нэр
                хүндтэй ORACLE, CISCO, EMPASOFT, APTECH зэрэг байгууллагуудын
                албан ёсны батламжит инженер, програмистууд юм. Бид олон улсын
                санхүүгийн салбарын мэдээлэл технологийн өндөр хөгжлийг Монгол
                улсдаа цогцлоох эрхэм зорилгын дор эх орныхоо хөгжил цэцэглэлтэд
                хувь нэмрээ оруулахын төлөө хамтын хүчээр хичээл зүтгэлээ
                зориулан ажиллаж байна. Бид ажилтнууддаа адил тэгш боломжыг
                олгох үүднээс үнэнч шударга ажиллах зарчмыг дээдлэн ажилладаг.
                Энэхүү хуудсаар дамжуулан "Гааль, татвар, санхүүгийн мэдээллийн
                технологийн төв" УҮГ-аас зарлагдаж буй нээлттэй ажлын байр,
                ажилтан сонгон шалгаруулах үе шат, үйл явцын мэдээллийг авах
                болно.
              </div>
            </div>

            <div className="w-1/2 max-xl:w-full bg-cover bg-no-repeat bg-[url('/images/news/1100w.png')]  h-full">
              <Image
                priority={true}
                className="h-full"
                src={config.data.uploadUrl + data[0].image}
                alt="ITC GOV"
                width={2000}
                height={2000}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 max-w-[1400px] mx-auto bg-white">
          <div className="relative pb-5 text-3xl text-brand-50">
            <Title name={"Манай байгууллагыг сонгосноор"} />
            <div className="text-lg font-semibold text-left pl-9 absolute top-12">
              танд дараах боломжуудыг олгох болно.
            </div>
          </div>
          <div className="grid grid-cols-2 mx-auto max-md:w-full max-md:grid-cols-1 border-t">
            <div className="flex items-center justify-center py-10 ">
              <div className="w-16 h-16 rounded mr-8">
                <Image
                  priority={true}
                  className=""
                  src={"/images/human/hr2.png"}
                  alt="ITC"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-2/3">
                <div className="text-xl font-semibold leading-5">
                  Эрч хүчтэй чадварлаг хамт олонд нэгдэх
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-10 border-l">
              <div className="w-16 h-16 rounded mr-8">
                <Image
                  priority={true}
                  className=""
                  src={"/images/human/hr3.png"}
                  alt="ITC"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-2/3">
                <div className="text-xl font-semibold leading-5">
                  Ажилтан бүрт ахиж дэвших орчныг бүрдүүлсэн адил тэгш боломжууд
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-10 border-t">
              <div className="w-16 h-16rounded mr-8">
                <Image
                  priority={true}
                  className=""
                  src={"/images/human/hr4.png"}
                  alt="ITC"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-2/3">
                <div className="text-xl font-semibold leading-5">
                  Ажлыг үр дүнд тулгуурласан өрсөлдөхүйц цалин урамшуулал
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-10 border-l border-t">
              <div className="w-16 h-16rounded mr-8">
                <Image
                  priority={true}
                  className=""
                  src={"/images/human/hr1.png"}
                  alt="ITC"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-2/3">
                <div className="text-xl font-semibold leading-5">
                  {" "}
                  Мэргэжлийн дагуу олон улсын сургалт, арга хэмжээнд оролцо
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 max-w-[1400px] mx-auto bg-white ">
          <Title name={"Сонгон шалгаруулалтын үе шат"} />
          <div className="grid grid-cols-2 mx-auto max-md:w-full max-md:grid-cols-1 border-t">
            <div className="flex items-center justify-center w-full px-20 py-10 max-xl:px-10 ">
              <div className="py-12 px-10 bg-gray-100 w-full relative flex items-center justify-center">
                <div className="w-16 h-16 m-2 text-4xl bg-brand-50 text-white absolute -top-7 -left-7 flex justify-center items-center">
                  01
                </div>
                <div className="w-10/12 max-xl:w-11/12">
                  <div className="text-xl font-semibold">
                    Эхний шатны ярилцлага
                  </div>
                  <div className="leading-5 mt-2">
                    Ажлын байрны шаардлагыг хангасан ажил горилогчтой холбогдон
                    ярилцлагад урих
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full px-20 py-10  max-xl:px-10 border-l">
              <div className="py-12 px-10 bg-gray-100 w-full relative flex items-center justify-center">
                <div className="w-16 h-16 m-2 text-4xl bg-brand-50 text-white absolute -top-7 -left-7 flex justify-center items-center">
                  02
                </div>
                <div className="w-10/12 max-xl:w-11/12">
                  <div className="text-xl font-semibold">
                    Мэргэжлийн шалгалт
                  </div>
                  <div className="leading-5 mt-2">
                    Тухайн ажлын байрны онцлогт тохирсон ажлын даалгавар,
                    тестээр шалгалт авах
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full px-20 py-10  max-xl:px-10 border-t">
              <div className="py-12 px-10 bg-gray-100 w-full relative flex items-center justify-center">
                <div className="w-16 h-16 m-2 text-4xl bg-brand-50 text-white absolute -top-7 -left-7 flex justify-center items-center">
                  03
                </div>
                <div className="w-10/12 max-xl:w-11/12 py-3">
                  <div className="text-xl font-semibold">
                    Дараагийн шатны ярилцлага
                  </div>
                  <div className="leading-5 mt-2">
                    Удирдах ажилтантай хийх ярилцлагад урих
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full px-20 py-10  max-xl:px-10 border-l border-t">
              <div className="py-12 px-10 bg-gray-100 w-full relative flex items-center justify-center">
                <div className="w-16 h-16 m-2 text-4xl bg-brand-50 text-white absolute -top-7 -left-7 flex justify-center items-center">
                  04
                </div>
                <div className="w-10/12 max-xl:w-11/12">
                  <div className="text-xl font-semibold">
                    Ажилд авах шийдвэр гаргалт
                  </div>
                  <div className="leading-5 mt-2">
                    Сонгон шалгаруулалтын журмын дагуу шаардлага хангасан ажил
                    горилогчийг ажилд авах
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 max-w-[1400px] mx-auto bg-brand-50 text-white h-40 group">
          <div className="flex text-3xl font-medium max-sm:items-center max-sm:h-full">
            <Link
              href="/job-ads"
              className="w-1/2 flex items-center justify-center gap-6 max-sm:w-full"
            >
              <div className="group-hover:translate-x-2 duration-300 mr-2 flex items-center">
                <ArrowL name={"white"} />
              </div>
              <div className="group-hover:underline group-hover:underline-offset-4">
                Нээлттэй ажлын байр
              </div>
            </Link>

            <div className="w-1/2 max-sm:w-full max-sm:hidden">
              <Image
                priority={true}
                className="h-40 object-none"
                src={"/images/background/background3.png"}
                alt="ITC GOV"
                width={2000}
                height={2000}
              />
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto text-center mt-12">
          <div className="text-xl w-11/12 mx-auto leading-6 font-semibold">
            Энэхүү хуудсаар танд “Гааль, татвар, санхүүгийн мэдээллийн
            технологийн төв” УҮГ-т ажилд орох хүсэлт гаргах алхмууд, шинэ ажлын
            байрны зарууд болон ажилтан сонгон шалгаруулах үйл явцыг
            танилцуулахыг зорилоо.
          </div>
          <div className="text-2xl text-center font-bold uppercase mt-6">
            Танд амжилт хүсье!
          </div>
        </div>
      </SimpleMotion>
      <Footer />
    </div>
  );
};
export default HumanResource;
