const ArrowL = ({ name }) => {
  return (
    <div
      className={
        name === "white"
          ? "inline-block w-4 h-4 border-t-[2px] border-r-[2px] rotate-45 border-white"
          : "inline-block w-4 h-4 border-t-[2px] border-r-[2px] rotate-45 border-brand-50"
      }
    ></div>
  );
};
export default ArrowL;
