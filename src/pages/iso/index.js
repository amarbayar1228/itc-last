import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Title from "@/components/title";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import SimpleMotion from "@/components/assist/simpleMotion";
import Head from "next/head";
import axios from "axios";
// export async function getServerSideProps() {
//   const data = [];
//   await axios
//     .post(`${process.env.ITC_GOV_SERVICE_URL}` + "/banner/getBanner")
//     .then((res) => {
//       if (res.data.result) {
//         res.data.result.forEach((element) => {
//           data.push(element);
//         });
//       }
//     })
//     .catch((err) => {
//       console.log("err: ", err);
//     });

//   return {
//     props: {
//       data:
//         data.length > 0
//           ? data.filter((e) => e.type === 4).length > 0
//             ? data.filter((e) => e.type === 1)
//             : data.filter((e) => e.type === 0)
//           : "/images/news/news1.jpg",
//     },
//   };
// }
const Iso = ({ data }) => {
  return (
    <div className="text-brand-50">
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <meta name="description" content="Тавтай морилно уу." />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb name={"ISO"} router={"/iso"} />
      <SimpleMotion>
        <div className="mt-4 max-w-[1400px] mx-auto bg-white">
          <Title name={"ISO/IEC 27001:2013 Олон улсын стандарт"} />
          <div className="px-9">
            "Гааль, Татвар, Санхүүгийн мэдээллийн технологийн төв" Улсын
            үйлдвэрийн газар нь Мэдээллийн Аюулгүй Байдлын Удирдлагын Тогтолцоог
            амжилттай нэвтрүүлж, ISO/IEC 27001:2013 Олон улсын стандартын
            батламжийг мэдээллийн технологийн чиглэлийн төрийн байгууллагууд
            дотроос анх удаа хүлээн авлаа.
          </div>
          <div className="border-t mt-8 p-8 px-9 flex gap-8 max-lg:flex-col">
            <div className="">
              <Swiper
                effect={"coverflow"}
                slide={"true"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                // navigation={{
                //   nextEl: ".swiper-button-next",
                //   prevEl: ".swiper-button-prev",
                //   clickable: true,
                // }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container h-[530px] w-[430px]"
              >
                <SwiperSlide>
                  <Image
                    priority={true}
                    width={2000}
                    height={2000}
                    className="border"
                    src={"/images/sertificate/sert1.png"}
                    alt="slide_image"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    priority={true}
                    className="border"
                    width={2000}
                    height={2000}
                    src={"/images/sertificate/sert2.png"}
                    //   src={"/images/news/news3.jpg"}
                    alt="slide_image"
                  />
                </SwiperSlide>

                <div className="slider-controler z-50">
                  <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                  </div>
                  <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </Swiper>
            </div>
            <div className="text-justify w-3/5 max-lg:w-full">
              "Гааль, Татвар, Санхүүгийн мэдээллийн технологийн төв " Улсын
              үйлдвэрийн газар нь Цахим төлбөрийн баримтын систем /ebarimt.mn/,
              Цахим татварын систем /etax.mta.mn/, зэрэг төрийн байгууллагуудын
              30 гаруй системүүдийг хариуцан шаардлагатай нэмэлт хөгжүүлэлт,
              нэвтрүүлэлт, хэвийн найдвартай ажиллагагааг хангах чиг үүргийг
              хэрэгжүүлдэг бөгөөд үйл ажиллагаандаа мэдээллийн дэвшилтэт
              технологийг нэвтрүүлэн ашиглаж байна. Үүнтэй холбоотойгоор
              үйлдвэрийн газарт хэрэгжүүлж буй бүхий л үйл ажиллагаа болон
              мэдээллийн хөрөнгүүдийг хамруулан Мэдээллийн Аюулгүй Байдлын
              Удирдлагын Тогтолцоог амжилттай нэвтрүүлж, ISO/IEC 27001:2013 Олон
              улсын стандартын батламжийг төрийн байгууллагууд дотроос анх удаа
              хүлээн авлаа. ISO/IEC 27001:2013 бол мэдээллийн аюулгүй байдлыг
              хэрхэн удирдах олон улсын стандарт юм. Стандартыг анх Олон улсын
              стандартчиллын байгууллага /ISO/ ба Олон улсын цахилгаан техникийн
              комисс /IEC/ хамтран 2005 онд гарган 2013 онд шинэчлэн найруулж
              хэвлүүлсэн байна. Мэдээллийн аюулгүй байдлын удирдлагын тогтолцоог
              бий болгох, хэрэгжүүлэх, хадгалах, тасралтгүй сайжруулахад
              тавигдах шаардлагыг нарийвчлан тодорхойлж байгууллагын эзэмшиж буй
              мэдээллийн хөрөнгийн нууцлал, бүрэн бүтэн байдал, хүртээмжтэй
              байдлыг илүү найдвартай болгоход үндсэн зорилго нь байдаг.
              Стандартын шаардлагыг хангасан байгууллагууд олон улсын эрх бүхий
              байгууллагын аудитыг амжилттай хийж дууссаны дараа итгэмжлэгдсэн
              гэрчилгээг баталгаажуулан олгодог. Энэхүү стандартын шаардлагыг
              хангасан эсэхийг Олон улсад магадлан итгэмжлэгдсэн “LMS
              Certification Pvt Ltd.” байгууллагаас “Гааль, Татвар, Санхүүгийн
              мэдээллийн технологийн төв” Улсын үйлдвэрийн газрын үйл
              ажиллагаанд хөндлөнгийн аудит хийж, тус стандартын шаардлагуудыг
              бүрэн хангасан байгууллага хэмээн дүгнэснээр ISO/IEC27001:2013
              Олон улсын стандартыг нэвтрүүлсэн байгууллага хэмээн гэрчилгээ
              олголоо.
            </div>
          </div>
        </div>
      </SimpleMotion>
      <Footer />
    </div>
  );
};
export default Iso;
