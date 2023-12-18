import Image from "next/image";
import Arrow from "../assist/arrow";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-brand-50 border-t-[6px] mt-24  border-brand-100 text-white p-6 ">
      <div className="max-w-[1400px] mx-auto mt-4 flex justify-between max-md:flex-col">
        <div className="flex flex-col">
          <div className="flex gap-4  items-center text-base">
            <div className="border-r pr-4">
              <Image
                priority={true}
                className="transition duration-300 ease-in-out group-hover:scale-110 h-14 w-14 cursor-pointer bg-no-repeat max-md:w-16 max-md:h-16"
                src={"/images/logo/logoS.svg"}
                alt="ITC GOV"
                width={500}
                height={500}
              />
            </div>
            <div className="w-2/5 leading-4 max-md:w-3/4">
              {
                "Санхүүгийн салбарын мэдээллийн технологийг хөгжүүлэх, \n цахим засаглалыг бэхжүүлэх манлайлагч байгууллага болно."
              }
            </div>
          </div>
          <div className="flex justify-between mt-8 text-base max-md:flex-col">
            <div className="flex gap-48 max-md:flex-col max-md:gap-2 ">
              <div className="flex flex-col gap-2">
                <Link
                  href={"/about"}
                  className="flex items-center gap-6 group "
                >
                  <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                    <div className="group-hover:translate-x-3 duration-300">
                      <Arrow name={"white"} />
                    </div>
                    <div>Бидний тухай</div>
                  </div>
                </Link>
                <Link
                  href={"/project"}
                  className="flex items-center gap-6 group "
                >
                  <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                    <div className="group-hover:translate-x-3 duration-300">
                      <Arrow name={"white"} />
                    </div>
                    <div>Хэрэгжүүлж буй төслүүд</div>
                  </div>
                </Link>
                <Link
                  href={"/human-resource"}
                  className="flex items-center gap-6 group "
                >
                  <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                    <div className="group-hover:translate-x-3 duration-300">
                      <Arrow name={"white"} />
                    </div>
                    <div>Хүний нөөц</div>
                  </div>
                </Link>
              </div>
              <div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={"/law"}
                    className="flex items-center gap-6 group "
                  >
                    <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                      <div className="group-hover:translate-x-3 duration-300">
                        <Arrow name={"white"} />
                      </div>
                      <div>Хууль, Эрх зүй</div>
                    </div>
                  </Link>
                  {/* <Link
                  href={"/transparency"}
                  className="flex items-center gap-6 group "
                >
                  <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                    <div className="group-hover:translate-x-3 duration-300">
                      <Arrow name={"white"} />
                    </div>
                    <div>Ил тод байдал</div>
                  </div>
                </Link> */}
                  <Link
                    passHref={true}
                    target="_blank"
                    href={"https://shilendans.gov.mn/organization/25056"}
                    className="flex items-center gap-6 group "
                  >
                    <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                      <div className="group-hover:translate-x-3 duration-300">
                        <Arrow name={"white"} />
                      </div>
                      <div>Шилэн данс</div>
                    </div>
                  </Link>
                  <Link
                    href={"/iso"}
                    className="flex items-center gap-6 group "
                  >
                    <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                      <div className="group-hover:translate-x-3 duration-300">
                        <Arrow name={"white"} />
                      </div>
                      <div>ISO/IEC 27001:2013</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={"/contact"}
                  className="flex items-center gap-6 group "
                >
                  <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                    <div className="group-hover:translate-x-3 duration-300">
                      <Arrow name={"white"} />
                    </div>
                    <div>Холбоо барих </div>
                  </div>
                </Link>
                <Link
                  href={"/feedback"}
                  className="flex items-center gap-6 group "
                >
                  <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                    <div className="group-hover:translate-x-3 duration-300">
                      <Arrow name={"white"} />
                    </div>
                    <div>Санал хүсэлт </div>
                  </div>
                </Link>
                <Link
                  href={"tel:96262047"}
                  className="flex items-center gap-6 group "
                >
                  <div className="flex items-center gap-6 group-hover:bg-brand-150 py-1 pr-3">
                    <div className="group-hover:translate-x-3 duration-300">
                      <Arrow name={"white"} />
                    </div>
                    <div>Авлига мэдээлэх утас: +976 110</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-64 h-64 max-md:mt-6 max-md:w-full">
          <iframe
            title="Itc"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4496.4988317111465!2d106.91224346458343!3d47.924114969801806!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96934d73f1f4c5%3A0x9ee8d42e8754ef8a!2z0JPQotCh0JzQotCiINCj0q7Qkw!5e0!3m2!1sen!2sbd!4v1688541066149!5m2!1sen!2sbd"
            width="256"
            height="256"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border max-sm:w-full max-sm:h-full"
          ></iframe>
        </div> */}
      </div>
      <div className="border-t p-6 mt-8 max-w-[1400px]  mx-auto">
        <div className="max-w-[1400px] mx-auto flex justify-between max-md:flex-col max-md:gap-5 text-base">
          <div className="flex gap-10">
            <Link
              passHref={true}
              target="_blank"
              href={"https://www.facebook.com/ebarimt"}
              className="flex items-start gap-2"
            >
              <Image
                priority={true}
                className=""
                src={"/images/human/facebook.png"}
                alt="ITC"
                width={24}
                height={24}
              />
              Facebook
            </Link>
            <Link
              passHref={true}
              target="_blank"
              href={"https://twitter.com/ebarimt"}
              className="flex items-start gap-2"
            >
              <Image
                priority={true}
                className=""
                src={"/images/human/twitter.png"}
                alt="ITC"
                width={24}
                height={24}
              />
              Twitter
            </Link>
            <Link
              passHref={true}
              target="_blank"
              className="flex items-start gap-2"
              href={
                "https://www.youtube.com/channel/UC7bIwoMoRj88vyumG5gUYyQ/featured"
              }
            >
              <Image
                priority={true}
                className=""
                src={"/images/human/youtube.png"}
                alt="ITC"
                width={24}
                height={24}
              />{" "}
              Youtube
            </Link>
          </div>
          <div className="flex flex-col font-medium">
            <div>
              Гааль, Татвар, Санхүүгийн мэдээллийн технологийн төв Улсын
              үйлдвэрийн газар
            </div>
            <div className="text-right max-md:text-left max-md:mt-2">
              ISO/IEC 27001:2013
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
