import Link from "next/link";
import Arrow from "../assist/arrow";

const Programm = () => {
  return (
    <div className="bg-white max-w-[1400px] mx-auto mt-4 text-brand-50 text-xl font-semibold">
      <div className="grid grid-cols-2 max-md:grid-cols-1">
        <Link
          href="https://ebarimt.mn/posapi"
          passHref={true}
          target="_blank"
          className="flex items-center group px-9 gap-4 py-8 hover:border-brand-50 hover:border border border-white"
        >
          <div className="group-hover:translate-x-4 duration-300 flex items-center pr-2">
            <Arrow />
          </div>
          <div className="group-hover:underline group-hover:underline-offset-8 ">
            Хэрэглэгчийн систем нийлүүлэгчийн хүсэлт гаргах
          </div>
        </Link>
        <Link
          href="https://developer.itc.gov.mn"
          passHref={true}
          target="_blank"
          className="flex items-center group px-6 gap-4 py-8 border-l max-md:border-t hover:border-brand-50 hover:border"
        >
          <div className="group-hover:translate-x-4 duration-300 flex items-center pr-2">
            <Arrow />
          </div>
          <div className="group-hover:underline group-hover:underline-offset-8">
            Development.itc.gov.mn
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Programm;
