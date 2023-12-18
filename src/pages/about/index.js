import Arrow from "@/components/assist/arrow";
import SimpleMotion from "@/components/assist/simpleMotion";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProjectComp from "@/components/project";
import Title from "@/components/title";
import Head from "next/head";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <Head>
        <title>ГТСМТТ</title>
        <meta name="page" content="Тавтай морилно уу." key="desc" />
        <link rel="icon" href="/images/brand/itc.svg" />
      </Head>
      <Breadcrumb name={"Бидний тухай"} router={"about"} />
      <SimpleMotion>
        <div className="max-w-[1400px] mx-auto mt-4 bg-white text-brand-50">
          <Title name={"Танилцуулга"} />
          <div className="text-justify px-9 text-sm">
            Монгол Улсын Засгийн Газрын 2016 оны 02 дугаар сарын 22-ны өдрийн
            120 дугаар тогтоолоор "Гааль, татвар, санхүүгийн мэдээллийн
            технологийн төв" Улсын Үйлдвэрийн Газар нь Гааль, Татварын бүртгэл,
            мэдээллийн нэгдсэн системийг нэвтрүүлэх, түүний үйл ажиллагааны
            аюулгүй байдлыг хангах, техник, технологийн хэвийн үйл ажиллагааг
            хариуцах чиг үүрэгтэй байгуулагдан төсвийн орлого, зарлагын хяналтыг
            сайжруулах, үйл ажиллагааг цахимжуулах ажлын хүрээнд 6 яам, 6
            агентлагийн 30 гаруй цахим системийг хариуцан хөгжүүлэлт,
            тасралтгүй, найдвартай ажиллагааг ханган ажиллаж байна. 2021 онд
            PMBOK төслийн удирдлагын тогтолцоо, мэдээллийн аюулгүй байдлын
            удирдлагын тогтолцоог /ISO27001:2013/олон улсын байгуулагаар аудит
            хийлгэн үйл ажиллагаандаа нэвтрүүлэн ажиллаж байна
          </div>
          <div className="flex border-t mt-8 max-md:flex-col">
            <div className="w-1/2 flex items-center justify-center  py-10 max-md:w-full">
              <div className="w-16 h-16 rounded mr-10">
                <Image
                  priority={true}
                  className="transition duration-300 ease-in-out group-hover:scale-110 h-14 w-14 cursor-pointer bg-no-repeat max-md:w-16 max-md:h-16"
                  src={"/images/human/alsiinHaraa.png"}
                  alt="ITC GOV"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-2/3">
                <div className="text-xl font-semibold">Алсын хараа</div>
                <div className="leading-5 mt-2 text-sm">
                  Ажлын байрны шаардлагыг хангасан ажил горилогчтой холбогдон
                  ярилцлагад урих
                </div>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center py-10 border-l max-md:w-full max-md:border-t">
              <div className="w-16 h-16   rounded mr-10">
                <Image
                  priority={true}
                  className="transition duration-300 ease-in-out group-hover:scale-110 h-14 w-14 cursor-pointer bg-no-repeat max-md:w-16 max-md:h-16"
                  src={"/images/human/erhemZorligo.png"}
                  alt="ITC GOV"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-2/3">
                <div className="text-xl font-semibold">Эрхэм зорилго</div>
                <div className="leading-5 mt-2 text-sm">
                  Ажлын байрны шаардлагыг хангасан ажил горилогчтой холбогдон
                  ярилцлагад урих
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-4">
          <Title name={"Байгууллагын үндсэн чиг үүрэг"} />
          <div className="border-t h-[168.5px]">
            <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 text-brand-50">
              <div className="relative">
                <div className="px-9 py-3 border z-30 bg-white cursor-pointer hover:shadow-shadowRB absolute group w-full transition-all h-14 duration-300 hover:h-48 hover:absolute hover:w-full hover:bg-white">
                  <div className="flex justify-between items-center text-xl font-semibold ">
                    <div>Бодлог, даалгавар</div>
                    <div className="transition duration-300 ease-in-out group-hover:rotate-90 flex items-center">
                      <Arrow />
                    </div>
                  </div>

                  <div className="hidden duration-300 animate-fadeIn h-10 group-hover:h-32 transition-all group-hover:block text-sm text-justify pr-10 pl-6 leading-5 font-light bg-white mt-4">
                    Гааль, татвар, санхүүгийн мэдээллийн нэгдсэн системийн
                    программ хангамжийг холбогдох байгууллагын бодлого,
                    даалгаврын дагуу хөгжүүлэх.
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="px-9 py-3 border z-30 bg-white cursor-pointer hover:shadow-shadowRB absolute group w-full transition-all h-14 duration-300 hover:h-48 hover:absolute hover:w-full hover:bg-white">
                  <div className="flex justify-between items-center text-xl font-semibold ">
                    <div>Хяналт</div>
                    <div className="transition duration-300 ease-in-out group-hover:rotate-90 flex items-center">
                      <Arrow />
                    </div>
                  </div>

                  <div className="hidden duration-300 animate-fadeIn h-10 group-hover:h-32 transition-all group-hover:block text-sm text-justify pr-10 pl-6 leading-5 font-light bg-white mt-4">
                    Гааль, татвар, санхүүгийн мэдээллийн нэгдсэн системийг хянах
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="px-9 py-3 border z-30 bg-white cursor-pointer hover:shadow-shadowRB absolute group w-full transition-all h-14 duration-300 hover:h-48 hover:absolute hover:w-full hover:bg-white">
                  <div className="flex justify-between items-center text-xl font-semibold ">
                    <div>Өгөгдлийн сан</div>
                    <div className="transition duration-300 ease-in-out group-hover:rotate-90 flex items-center">
                      <Arrow />
                    </div>
                  </div>

                  <div className="hidden duration-300 animate-fadeIn h-10 group-hover:h-32 transition-all group-hover:block text-sm text-justify pr-10 pl-6 leading-5 font-light bg-white mt-4">
                    Гааль, татвар, санхүүгийн мэдээллийн технологийн өгөгдлийн
                    санг сайжруулах асуудал болон түүний зохицуулалтыг хариуцах
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="px-9 py-3 top-14  border z-20 bg-white cursor-pointer hover:shadow-shadowRB absolute group w-full transition-all h-14 duration-300 hover:h-48 hover:absolute hover:w-full hover:bg-white">
                  <div className="flex justify-between items-center text-xl font-semibold ">
                    <div>Технологи</div>
                    <div className="transition duration-300 ease-in-out group-hover:rotate-90 flex items-center">
                      <Arrow />
                    </div>
                  </div>

                  <div className="hidden duration-300 animate-fadeIn h-10 group-hover:h-32 transition-all group-hover:block text-sm text-justify pr-10 pl-6 leading-5 font-light bg-white mt-4">
                    Гааль, татвар, санхүүгийн мэдээллийн технологийн нэгдсэн
                    системийг сайжруулах, техник, технологийн иновацийг үйл
                    ажиллагаандаа нэвтрүүлэх
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="px-9 py-3 top-14  border z-20 bg-white cursor-pointer hover:shadow-shadowRB absolute group w-full transition-all h-14 duration-300 hover:h-48 hover:absolute hover:w-full hover:bg-white">
                  <div className="flex justify-between items-center text-xl font-semibold ">
                    <div>Системийн уялдаа</div>
                    <div className="transition duration-300 ease-in-out group-hover:rotate-90 flex items-center">
                      <Arrow />
                    </div>
                  </div>

                  <div className="hidden duration-300 animate-fadeIn h-10 group-hover:h-32 transition-all group-hover:block text-sm text-justify pr-10 pl-6 leading-5 font-light bg-white mt-4">
                    Гааль, татвар, санхүүгийн мэдээллийн системийг төрийн бусад
                    байгууллагын мэдээллийн системтэй уялдуулах, тэдгээртэй
                    мэдээлэл солилцох боломжийг бүрдүүлэх
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="px-9 py-3 top-14  border z-20 bg-white cursor-pointer hover:shadow-shadowRB absolute group w-full transition-all h-14 duration-300 hover:h-48 hover:absolute hover:w-full hover:bg-white">
                  <div className="flex justify-between items-center text-xl font-semibold ">
                    <div>Зөвлөх</div>
                    <div className="transition duration-300 ease-in-out group-hover:rotate-90 flex items-center">
                      <Arrow />
                    </div>
                  </div>

                  <div className="hidden duration-300 animate-fadeIn h-10 group-hover:h-32 transition-all group-hover:block text-sm text-justify pr-10 pl-6 leading-5 font-light bg-white mt-4">
                    Мэдээллийн технологийн зөвлөх үйлчилгээ үзүүлэх
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="px-9 py-3 top-28  border z-10 bg-white cursor-pointer hover:shadow-shadowRB absolute group w-full transition-all h-14 duration-300 hover:h-48 hover:absolute hover:w-full hover:bg-white">
                  <div className="flex justify-between items-center text-xl font-semibold ">
                    <div>Аюулгүй байдал</div>
                    <div className="transition duration-300 ease-in-out group-hover:rotate-90 flex items-center">
                      <Arrow />
                    </div>
                  </div>

                  <div className="hidden duration-300 animate-fadeIn h-10 group-hover:h-32 transition-all group-hover:block text-sm text-justify pr-10 pl-6 leading-5 font-light bg-white mt-4">
                    Гааль, татвар, санхүүгийн мэдээллийн системийн нууцлал,
                    хадгалалт, хамгаалалт, аюулгүй байдлыг хангах
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ProjectComp />
        </div>
      </SimpleMotion>
      <Footer />
    </div>
  );
};
export default About;
