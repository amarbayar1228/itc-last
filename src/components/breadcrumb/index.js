import Link from "next/link";

const Breadcrumb = ({ name, router, routerId, title }) => {
  return (
    <div className="w-full py-4 text-brand-50 px-6 bg-white text-sm">
      <div className="flex items-center gap-4 max-md:flex-col max-md:gap-0 max-md:items-start">
        <Link
          href={`/`}
          className="font-medium hover:underline hover:underline-offset-4"
        >
          Нүүр хуудас
        </Link>
        {title ? (
          <div className="">
            <div className="inline-block w-2 h-2 border-t-[1px] border-r-[1px] rotate-45 border-brand-50"></div>
            <Link
              href={`/${router}`}
              className="text-brand-50 hover:underline hover:underline-offset-4 pl-4"
            >
              {title}
            </Link>
          </div>
        ) : null}
        <div>
          <div className="inline-block w-2 h-2 border-t-[1px] border-r-[1px] rotate-45 border-brand-50"></div>
          <Link
            href={"/"}
            className="text-brand-150 hover:underline hover:underline-offset-4 pl-4"
          >
            {name}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Breadcrumb;
