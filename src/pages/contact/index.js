import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import Head from "next/head";
import Image from "next/image";
import config from "../../../config";

const Contact = () => {
  return (
    <div>
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb name={"Холбоо барих"} router={"contact"} />
      <div className="mt-4 max-w-[1400px] mx-auto">
        <Title name={"Холбоо барих"} />
        <div className="grid grid-cols-9 border-t text-brand-50 text-base p-6 gap-6 max-md:grid-cols-1 bg-white max-md:px-6">
          <div className="flex items-center justify-center">
            <Image
              priority
              className="w-56"
              // src={"/images/loading/1000w.jpg"}
              src={"/images/background/contact.png"}
              alt="ITC GOV"
              width={5000}
              height={5000}
            />
          </div>
          <div className="col-span-5 max-md:col-span-1 grid grid-cols-1 gap-4 border-l pl-6 max-md:border-t max-md:border-l-0 max-md:pt-6 max-md:pl-0">
            <div className="flex flex-col gap-2">
              <div>Утас</div>
              <div className="font-semibold text-2xl">7577-7507</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Хаяг байршил:</div>
              <div className="font-semibold leading-5">
                15160 Улаанбаатар хот, Чингэлтэй дүүрэг, Нэгдсэн Үндэстний
                гудамж 38, <br /> Мон жигүүр ХХК-ийн байр, 4-р дүгээр давхар
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Цахим шуудан:</div>
              <div className="font-semibold">info.itc.gov.mn</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 h-0 col-span-2  max-md:h-full">
            <div>Цагийн хуваарь:</div>
            <div className="font-semibold ">
              Даваа-Баасан
              <div className="text-2xl">08:30-17:30</div>
            </div>
            <div className="font-semibold">Бямба, Ням амрана</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-72 max-md:relative">
        <Footer />
      </div>
    </div>
  );
};
export default Contact;
