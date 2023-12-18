import { Exo_2, Roboto, Ubuntu } from "next/font/google";
const inter = Exo_2({
  subsets: ["latin"],
  weight: "800",
});
const Title = ({ name, size }) => {
  return (
    <section
      style={{ background: "#fff", width: "100%" }}
      className={`${inter.className}`}
    >
      <div className="py-6 font-black text-3xl text-brand-50 flex items-start">
        <div className="w-3 h-7 bg-brand-50"></div>
        <div
          className={
            size
              ? "text-lg leading-5 pl-6 w-11/12"
              : "text-3xl max-md:text-2xl leading-7 pl-6 w-11/12"
          }
        >
          {name}
        </div>
      </div>
    </section>
  );
};
export default Title;
